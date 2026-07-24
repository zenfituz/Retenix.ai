-- Phase 1 Migration: Telegram Integration

-- 1. ALTER members table
ALTER TABLE members
ADD COLUMN IF NOT EXISTS telegram_first_name TEXT,
ADD COLUMN IF NOT EXISTS telegram_last_name TEXT,
ADD COLUMN IF NOT EXISTS telegram_photo_url TEXT,
ADD COLUMN IF NOT EXISTS telegram_linked_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS telegram_notifications_enabled BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS gym_rank INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS today_workout TEXT,
ADD COLUMN IF NOT EXISTS last_checkin_at TIMESTAMPTZ;

-- Ensure telegram_user_id and telegram_username exist just in case they don't
ALTER TABLE members
ADD COLUMN IF NOT EXISTS telegram_user_id TEXT,
ADD COLUMN IF NOT EXISTS telegram_username TEXT;

-- Drop index if it exists and recreate
DROP INDEX IF EXISTS idx_members_telegram_user_id_active;
CREATE UNIQUE INDEX IF NOT EXISTS idx_members_telegram_user_id_active 
ON members(telegram_user_id) 
WHERE status != 'inactive';

-- 2. telegram_link_tokens table
CREATE TABLE IF NOT EXISTS telegram_link_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_telegram_link_tokens_token_hash ON telegram_link_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_telegram_link_tokens_member_id ON telegram_link_tokens(member_id);

ALTER TABLE telegram_link_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "superadmin_full_access_link_tokens" ON telegram_link_tokens
    FOR ALL TO authenticated
    USING (is_superadmin());

CREATE POLICY "gym_owner_access_link_tokens" ON telegram_link_tokens
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM members m 
            WHERE m.id = telegram_link_tokens.member_id 
            AND m.gym_id = get_auth_gym_id()
        )
    );

-- 3. checkins table
CREATE TABLE IF NOT EXISTS checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    gym_id UUID NOT NULL REFERENCES gyms(id) ON DELETE CASCADE,
    checked_in_at TIMESTAMPTZ DEFAULT now(),
    source TEXT DEFAULT 'qr' CHECK (source IN ('qr', 'manual', 'bot')),
    qr_token_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_checkins_member_checked_in_at ON checkins(member_id, checked_in_at);

ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;

-- Allow superadmin access
CREATE POLICY "superadmin_all_checkins" ON checkins
    FOR ALL TO authenticated USING (is_superadmin());

-- Members can see their own checkins
CREATE POLICY "member_see_own_checkins" ON checkins
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM members m WHERE m.id = checkins.member_id AND m.user_id = auth.uid()
        )
    );

-- Staff can see checkins for their gym
CREATE POLICY "staff_see_gym_checkins" ON checkins
    FOR ALL TO authenticated
    USING (gym_id = get_auth_gym_id());

-- 4. member_activity_events table
CREATE TABLE IF NOT EXISTS member_activity_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    event_data JSONB DEFAULT '{}',
    occurred_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_member_occurred ON member_activity_events(member_id, occurred_at);
CREATE INDEX IF NOT EXISTS idx_activity_member_event ON member_activity_events(member_id, event_type);

ALTER TABLE member_activity_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "superadmin_all_activities" ON member_activity_events
    FOR ALL TO authenticated USING (is_superadmin());

CREATE POLICY "member_see_own_activities" ON member_activity_events
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM members m WHERE m.id = member_activity_events.member_id AND m.user_id = auth.uid()
        )
    );

CREATE POLICY "staff_see_gym_activities" ON member_activity_events
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM members m 
            WHERE m.id = member_activity_events.member_id 
            AND m.gym_id = get_auth_gym_id()
        )
    );

-- 5. xp_transactions table
CREATE TABLE IF NOT EXISTS xp_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    source_type TEXT NOT NULL,
    source_id UUID NOT NULL,
    points INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(member_id, source_type, source_id)
);

CREATE INDEX IF NOT EXISTS idx_xp_member_created ON xp_transactions(member_id, created_at);

ALTER TABLE xp_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "superadmin_all_xp" ON xp_transactions
    FOR ALL TO authenticated USING (is_superadmin());

CREATE POLICY "member_see_own_xp" ON xp_transactions
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM members m WHERE m.id = xp_transactions.member_id AND m.user_id = auth.uid()
        )
    );

CREATE POLICY "staff_see_gym_xp" ON xp_transactions
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM members m 
            WHERE m.id = xp_transactions.member_id 
            AND m.gym_id = get_auth_gym_id()
        )
    );

-- 6. telegram_webhook_events table
CREATE TABLE IF NOT EXISTS telegram_webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    update_id BIGINT UNIQUE NOT NULL,
    event_type TEXT NOT NULL,
    chat_id BIGINT,
    payload JSONB,
    processed_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_telegram_webhook_update_id ON telegram_webhook_events(update_id);

ALTER TABLE telegram_webhook_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "superadmin_only_webhooks" ON telegram_webhook_events
    FOR ALL TO authenticated
    USING (is_superadmin());

-- 7. RPC get_member_by_telegram_id
CREATE OR REPLACE FUNCTION get_member_by_telegram_id(tg_id TEXT)
RETURNS JSON AS $$
DECLARE
    result JSON;
    member_rec RECORD;
    gym_rec RECORD;
BEGIN
    SELECT * INTO member_rec FROM members WHERE telegram_user_id = tg_id AND status != 'inactive' LIMIT 1;
    
    IF NOT FOUND THEN
        RETURN json_build_object('is_linked', false);
    END IF;

    SELECT * INTO gym_rec FROM gyms WHERE id = member_rec.gym_id;

    RETURN json_build_object(
        'is_linked', true,
        'member_id', member_rec.id,
        'first_name', member_rec.first_name,
        'last_name', member_rec.last_name,
        'telegram_first_name', member_rec.telegram_first_name,
        'telegram_last_name', member_rec.telegram_last_name,
        'streak', member_rec.current_streak,
        'xp', member_rec.xp,
        'rank', member_rec.gym_rank,
        'today_workout', member_rec.today_workout,
        'gym', json_build_object(
            'id', gym_rec.id,
            'name', gym_rec.name,
            'logo_url', gym_rec.logo_url
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. RPC link_telegram_to_member
CREATE OR REPLACE FUNCTION link_telegram_to_member(
    p_token_hash TEXT,
    p_tg_user_id TEXT,
    p_tg_username TEXT,
    p_tg_first_name TEXT,
    p_tg_last_name TEXT
)
RETURNS JSON AS $$
DECLARE
    token_rec RECORD;
    member_rec RECORD;
BEGIN
    -- Validate token
    SELECT * INTO token_rec FROM telegram_link_tokens 
    WHERE token_hash = p_token_hash 
    AND used_at IS NULL 
    AND expires_at > now()
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Invalid or expired token');
    END IF;

    -- Update token as used
    UPDATE telegram_link_tokens SET used_at = now() WHERE id = token_rec.id;

    -- Link member
    UPDATE members 
    SET 
        telegram_user_id = p_tg_user_id,
        telegram_username = p_tg_username,
        telegram_first_name = p_tg_first_name,
        telegram_last_name = p_tg_last_name,
        telegram_linked_at = now()
    WHERE id = token_rec.member_id
    RETURNING * INTO member_rec;

    RETURN json_build_object(
        'success', true, 
        'member_id', member_rec.id,
        'first_name', member_rec.first_name,
        'last_name', member_rec.last_name
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
