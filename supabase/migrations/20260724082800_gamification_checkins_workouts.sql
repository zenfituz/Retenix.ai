-- Migration: gamification, checkins, workouts
-- Tables: workout_plans, workout_plan_items, badges, member_badges, challenges, challenge_participants, member_notification_preferences, food_logs, uzbek_food_reference

CREATE TABLE IF NOT EXISTS public.workout_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL,
    gym_id UUID NOT NULL,
    title TEXT NOT NULL,
    goal TEXT,
    days_per_week INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.workout_plan_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES public.workout_plans(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL,
    exercise_name TEXT NOT NULL,
    sets INTEGER NOT NULL,
    reps TEXT NOT NULL,
    weight_kg NUMERIC,
    order_index INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon_name TEXT,
    xp_reward INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.member_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL,
    badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(member_id, badge_id)
);

CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    xp_reward INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.challenge_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    member_id UUID NOT NULL,
    progress INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    UNIQUE(challenge_id, member_id)
);

CREATE TABLE IF NOT EXISTS public.member_notification_preferences (
    member_id UUID PRIMARY KEY,
    workout_reminders BOOLEAN DEFAULT true,
    streak_reminders BOOLEAN DEFAULT true,
    challenge_updates BOOLEAN DEFAULT true,
    ai_insights BOOLEAN DEFAULT true,
    quiet_hours_start TIME DEFAULT '22:00',
    quiet_hours_end TIME DEFAULT '07:00'
);

CREATE TABLE IF NOT EXISTS public.food_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL,
    food_name TEXT NOT NULL,
    portion_g NUMERIC,
    calories INTEGER,
    protein_g NUMERIC,
    carbs_g NUMERIC,
    fat_g NUMERIC,
    source TEXT,
    logged_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.uzbek_food_reference (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_uz TEXT UNIQUE NOT NULL,
    default_portion_g INTEGER NOT NULL,
    calories INTEGER NOT NULL,
    protein_g NUMERIC NOT NULL,
    carbs_g NUMERIC NOT NULL,
    fat_g NUMERIC NOT NULL
);

-- Seed uzbek_food_reference
INSERT INTO public.uzbek_food_reference (name_uz, default_portion_g, calories, protein_g, carbs_g, fat_g) VALUES
('Osh', 350, 720, 25, 88, 28),
('Somsa', 180, 420, 16, 38, 22),
('Manti', 250, 480, 20, 52, 20),
('Lag''mon', 400, 650, 24, 75, 26),
('Shashlik', 200, 450, 38, 4, 32),
('Non', 150, 390, 11, 78, 3),
('Mastava', 350, 380, 18, 42, 15),
('Dimlama', 350, 410, 26, 30, 18),
('Chuchvara', 300, 510, 22, 58, 21),
('Qozon kabob', 300, 680, 42, 15, 50)
ON CONFLICT (name_uz) DO NOTHING;

-- Seed default badges
INSERT INTO public.badges (code, title, description, icon_name, xp_reward) VALUES
('first_workout', 'First Workout', 'Completed your first workout.', 'dumbbell', 50),
('streak_3', '3-Day Streak', 'Maintained a workout streak for 3 days.', 'flame', 100),
('streak_7', '7-Day Streak', 'Maintained a workout streak for 7 days.', 'flame', 200),
('gym_master', 'Gym Master', 'Accumulated 1000 XP.', 'trophy', 500),
('nutrition_pro', 'Nutrition Pro', 'Logged food for 7 consecutive days.', 'apple', 150)
ON CONFLICT (code) DO NOTHING;

-- RLS
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uzbek_food_reference ENABLE ROW LEVEL SECURITY;

-- Policies (Basic member self-access)
CREATE POLICY "Members can view their own workout plans" ON public.workout_plans FOR SELECT USING (member_id = auth.uid());
CREATE POLICY "Members can view items for their workout plans" ON public.workout_plan_items FOR SELECT USING (plan_id IN (SELECT id FROM public.workout_plans WHERE member_id = auth.uid()));
CREATE POLICY "Badges are viewable by everyone" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Members can view their own badges" ON public.member_badges FOR SELECT USING (member_id = auth.uid());
CREATE POLICY "Challenges are viewable by everyone" ON public.challenges FOR SELECT USING (true);
CREATE POLICY "Members can view their challenge participation" ON public.challenge_participants FOR SELECT USING (member_id = auth.uid());
CREATE POLICY "Members can manage their own notification preferences" ON public.member_notification_preferences FOR ALL USING (member_id = auth.uid());
CREATE POLICY "Members can manage their own food logs" ON public.food_logs FOR ALL USING (member_id = auth.uid());
CREATE POLICY "Uzbek food reference is viewable by everyone" ON public.uzbek_food_reference FOR SELECT USING (true);
