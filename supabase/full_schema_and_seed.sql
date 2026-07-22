-- ====================================================================
-- RETENIX AI - SUPABASE COMPLETE DATABASE SCHEMA & DEMO SEED
-- Execute this script directly in your Supabase SQL Editor:
-- Supabase Dashboard -> SQL Editor -> New Query -> Paste & Run
-- ====================================================================

-- 1. GYMS TABLE
CREATE TABLE IF NOT EXISTS public.gyms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT DEFAULT 'Toshkent',
    address TEXT,
    plan_tier TEXT DEFAULT 'Pro',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. GYM STAFF / TRAINERS TABLE
CREATE TABLE IF NOT EXISTS public.gym_staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID REFERENCES public.gyms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT,
    role TEXT NOT NULL CHECK (role IN ('owner', 'trainer', 'superadmin')),
    rating NUMERIC(3,2) DEFAULT 4.90,
    clients_count INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. MEMBERSHIP PLANS
CREATE TABLE IF NOT EXISTS public.membership_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID REFERENCES public.gyms(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    currency TEXT DEFAULT 'USD',
    billing_cycle TEXT DEFAULT 'monthly',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID REFERENCES public.gyms(id) ON DELETE CASCADE,
    assigned_trainer_id UUID REFERENCES public.gym_staff(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT,
    membership_plan_id UUID REFERENCES public.membership_plans(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'risk', 'new', 'inactive')),
    streak_days INT DEFAULT 0,
    xp_points INT DEFAULT 0,
    churn_risk_score INT DEFAULT 15,
    joined_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. USER ACTIVITY LOGS TABLE (AUDIT TRAIL)
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID REFERENCES public.gyms(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    user_role TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. WORKOUT PLANS TABLE
CREATE TABLE IF NOT EXISTS public.workout_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
    day_name TEXT NOT NULL,
    title TEXT NOT NULL,
    duration TEXT DEFAULT '60 min',
    is_completed BOOLEAN DEFAULT false,
    exercises JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. NUTRITION & FOOD LOGS TABLE
CREATE TABLE IF NOT EXISTS public.nutrition_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES public.members(id) ON DELETE CASCADE,
    meal_name TEXT NOT NULL,
    food_items TEXT NOT NULL,
    calories INT NOT NULL,
    protein_grams INT NOT NULL,
    meal_time TEXT NOT NULL,
    log_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. TRAINER SCHEDULE SESSIONS
CREATE TABLE IF NOT EXISTS public.trainer_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainer_id UUID REFERENCES public.gym_staff(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    day_name TEXT NOT NULL,
    session_time TEXT NOT NULL,
    training_type TEXT NOT NULL,
    room_zone TEXT DEFAULT 'Zona A',
    status TEXT DEFAULT 'Upcoming' CHECK (status IN ('Completed', 'Upcoming', 'Risk Alert')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ====================================================================
-- CREATE INDEXES FOR FAST PERFORMANCE
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_members_gym_id ON public.members(gym_id);
CREATE INDEX IF NOT EXISTS idx_members_status ON public.members(status);
CREATE INDEX IF NOT EXISTS idx_members_assigned_trainer ON public.members(assigned_trainer_id);
CREATE INDEX IF NOT EXISTS idx_gym_staff_gym_id ON public.gym_staff(gym_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_gym_id ON public.activity_logs(gym_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) & POLICIES
-- ====================================================================
ALTER TABLE public.gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainer_schedules ENABLE ROW LEVEL SECURITY;

-- Allow public / authenticated access for demo testing
CREATE POLICY "Public read gyms" ON public.gyms FOR SELECT USING (true);
CREATE POLICY "Public read gym_staff" ON public.gym_staff FOR SELECT USING (true);
CREATE POLICY "Public read members" ON public.members FOR SELECT USING (true);
CREATE POLICY "Public read activity_logs" ON public.activity_logs FOR SELECT USING (true);
CREATE POLICY "Public read workout_plans" ON public.workout_plans FOR SELECT USING (true);
CREATE POLICY "Public read nutrition_logs" ON public.nutrition_logs FOR SELECT USING (true);
CREATE POLICY "Public read trainer_schedules" ON public.trainer_schedules FOR SELECT USING (true);

-- Allow authenticated users to insert/update activity logs & plans
CREATE POLICY "Allow all writes to activity_logs" ON public.activity_logs FOR ALL USING (true);
CREATE POLICY "Allow all writes to members" ON public.members FOR ALL USING (true);
CREATE POLICY "Allow all writes to workout_plans" ON public.workout_plans FOR ALL USING (true);

-- ====================================================================
-- SAMPLE DEMO DATA INSERTION
-- ====================================================================
INSERT INTO public.gyms (id, name, city, address, plan_tier, status)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'FitZone Gym Yunusobod', 'Toshkent', 'Yunusobod 14-mavze', 'Pro', 'active')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.gym_staff (id, gym_id, full_name, email, role, rating, clients_count)
VALUES 
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Botir Niyozov', 'owner@fitzone.uz', 'owner', 5.00, 0),
('b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Coach Aziz', 'trainer@fitzone.uz', 'trainer', 4.90, 18),
('b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Coach Dilshod', 'dilshod@fitzone.uz', 'trainer', 4.85, 14)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.members (id, gym_id, assigned_trainer_id, full_name, email, status, streak_days, xp_points, churn_risk_score)
VALUES 
('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Jasur Toshmatov', 'jasur@example.com', 'active', 14, 2340, 10),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Nilufar Mirzaeva', 'nilufar@example.com', 'active', 7, 1890, 15),
('c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a77', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Doniyor Raxmonov', 'doniyor@example.com', 'risk', 0, 420, 85)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.activity_logs (gym_id, user_name, user_role, action, details)
VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Jasur Toshmatov', 'Member', 'QR Check-in', 'FitZone Yunusobod turniketi orqali kirdi'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Coach Aziz', 'Trainer', 'Mashg''ulot yakunlandi', 'Jasur Toshmatov bilan Personal Training bajarildi'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Botir Niyozov', 'Owner', 'Trener biriktirildi', 'Doniyor Raxmonov -> Coach Aziz ga biriktirildi');
