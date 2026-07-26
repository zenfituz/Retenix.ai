-- Retenix Production Database Schema & Seed Script

-- 1. GYMS TABLE
CREATE TABLE IF NOT EXISTS public.gyms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Toshkent',
  address TEXT,
  plan_tier TEXT NOT NULL DEFAULT 'pro' CHECK (plan_tier IN ('starter', 'pro', 'network', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'risk', 'churned')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. GYM STAFF TABLE (Owners & Trainers)
CREATE TABLE IF NOT EXISTS public.gym_staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'trainer')),
  specialty TEXT,
  assigned_clients_count INTEGER DEFAULT 0,
  performance_score INTEGER DEFAULT 90,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. MEMBERSHIP PLANS TABLE
CREATE TABLE IF NOT EXISTS public.membership_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'UZS',
  billing_cycle TEXT NOT NULL DEFAULT 'monthly',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_trainer_id UUID REFERENCES public.gym_staff(id) ON DELETE SET NULL,
  membership_plan_id UUID REFERENCES public.membership_plans(id) ON DELETE SET NULL,
  telegram_user_id TEXT,
  telegram_username TEXT,
  telegram_first_name TEXT,
  telegram_last_name TEXT,
  telegram_photo_url TEXT,
  telegram_linked_at TIMESTAMPTZ,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'risk', 'new', 'churned')),
  current_streak INTEGER DEFAULT 0,
  xp INTEGER DEFAULT 0,
  gym_rank INTEGER DEFAULT 0,
  today_workout TEXT DEFAULT 'Oyoq va Yelka mashg’uloti',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_checkin_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for Telegram single account linking rule
CREATE UNIQUE INDEX IF NOT EXISTS idx_members_telegram_user_id_unique 
ON public.members (telegram_user_id) 
WHERE telegram_user_id IS NOT NULL AND status != 'churned';

-- 5. CHECKINS TABLE
CREATE TABLE IF NOT EXISTS public.checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
  checked_in_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source TEXT NOT NULL DEFAULT 'qr' CHECK (source IN ('qr', 'manual', 'bot')),
  qr_token_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. MEMBER ACTIVITY EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.member_activity_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. CHURN SCORES TABLE
CREATE TABLE IF NOT EXISTS public.churn_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  risk_tier TEXT NOT NULL CHECK (risk_tier IN ('low', 'mid', 'high')),
  factor_breakdown JSONB DEFAULT '{}'::jsonb,
  computed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. INTERVENTIONS TABLE (Signal Guarantee Tracking)
CREATE TABLE IF NOT EXISTS public.interventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  staff_id UUID REFERENCES public.gym_staff(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('message', 'call', 'discount', 'other')),
  notes TEXT,
  outcome TEXT CHECK (outcome IN ('retained', 'churned', 'pending')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. WORKOUT PLANS & ITEMS
CREATE TABLE IF NOT EXISTS public.workout_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  gym_id UUID REFERENCES public.gyms(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  goal TEXT,
  days_per_week INTEGER DEFAULT 3,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.workout_plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES public.workout_plans(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL,
  exercise_name TEXT NOT NULL,
  sets INTEGER DEFAULT 3,
  reps TEXT DEFAULT '10-12',
  weight_kg NUMERIC DEFAULT 0,
  order_index INTEGER DEFAULT 0
);

-- 10. UZBEK FOOD REFERENCE DATASET
CREATE TABLE IF NOT EXISTS public.uzbek_food_reference (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_uz TEXT NOT NULL UNIQUE,
  default_portion_g INTEGER NOT NULL DEFAULT 300,
  calories INTEGER NOT NULL,
  protein_g INTEGER NOT NULL,
  carbs_g INTEGER NOT NULL,
  fat_g INTEGER NOT NULL
);

-- Seed Uzbek Food Reference
INSERT INTO public.uzbek_food_reference (name_uz, default_portion_g, calories, protein_g, carbs_g, fat_g)
VALUES
  ('Osh (Toshkent palov)', 350, 720, 25, 88, 28),
  ('Somsa (Mol go''shti)', 180, 420, 16, 38, 22),
  ('Manti (Tugilgan)', 250, 480, 20, 52, 20),
  ('Lag''mon (Qovurma)', 400, 650, 24, 75, 26),
  ('Shashlik (Lula/Qiyma)', 200, 450, 38, 4, 32),
  ('Tandir non', 150, 390, 11, 78, 3),
  ('Mastava sho''rva', 350, 380, 18, 42, 15),
  ('Dimlama', 350, 410, 26, 30, 18),
  ('Chuchvara', 300, 510, 22, 58, 21),
  ('Qozon kabob', 300, 680, 42, 15, 50)
ON CONFLICT (name_uz) DO NOTHING;

-- 11. FOOD LOGS
CREATE TABLE IF NOT EXISTS public.food_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  food_name TEXT NOT NULL,
  portion_g INTEGER NOT NULL,
  calories INTEGER NOT NULL,
  protein_g INTEGER DEFAULT 0,
  carbs_g INTEGER DEFAULT 0,
  fat_g INTEGER DEFAULT 0,
  source TEXT DEFAULT 'ai_estimated',
  logged_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. XP TRANSACTIONS (Idempotent XP Ledger)
CREATE TABLE IF NOT EXISTS public.xp_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  source_type TEXT NOT NULL,
  source_id UUID NOT NULL,
  points INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_xp_member_source UNIQUE (member_id, source_type, source_id)
);

-- 13. BADGES & CHALLENGES
CREATE TABLE IF NOT EXISTS public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT NOT NULL,
  xp_reward INTEGER DEFAULT 50
);

INSERT INTO public.badges (code, title, description, icon_name, xp_reward)
VALUES
  ('first_workout', 'Birinchi qadam', 'Birinchi trenirovkani yakunladingiz', 'Flame', 50),
  ('streak_3', 'Impuls', '3 kunlik uzluksiz streak', 'Zap', 100),
  ('streak_7', 'Temir iroda', '7 kunlik mukammal streak', 'Trophy', 200),
  ('gym_master', 'Zal Afsonasi', '50+ bor check-in qildingiz', 'Medal', 500),
  ('nutrition_pro', 'Oqilona Ovqatlanish', '10 ta taomni AI bilan hisobladingiz', 'Apple', 150)
ON CONFLICT (code) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.member_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_member_badge UNIQUE (member_id, badge_id)
);

-- 14. AI COPILOT LOGS
CREATE TABLE IF NOT EXISTS public.ai_copilot_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  role_context TEXT NOT NULL,
  message_role TEXT NOT NULL CHECK (message_role IN ('user', 'ai')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ai_usage_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID REFERENCES public.gyms(id) ON DELETE CASCADE,
  user_id UUID,
  tokens_used INTEGER NOT NULL DEFAULT 0,
  cost_usd NUMERIC NOT NULL DEFAULT 0.000,
  endpoint TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ENABLE RLS ON ALL TABLES
ALTER TABLE public.gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_activity_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.churn_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_copilot_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_log ENABLE ROW LEVEL SECURITY;

-- BASIC RLS POLICIES
CREATE POLICY "Permissive public select on gyms" ON public.gyms FOR SELECT TO public USING (true);
CREATE POLICY "Permissive public select on staff" ON public.gym_staff FOR SELECT TO public USING (true);
CREATE POLICY "Permissive public select on members" ON public.members FOR SELECT TO public USING (true);
CREATE POLICY "Permissive public select on plans" ON public.membership_plans FOR SELECT TO public USING (true);
