-- Create tables
CREATE TABLE public.gyms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT,
    address TEXT,
    plan_tier TEXT DEFAULT 'starter',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.gym_staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('owner', 'trainer', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.membership_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    currency TEXT DEFAULT 'UZS',
    billing_cycle TEXT DEFAULT 'monthly',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gym_id UUID NOT NULL REFERENCES public.gyms(id) ON DELETE CASCADE,
    assigned_trainer_id UUID REFERENCES public.gym_staff(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    telegram_user_id TEXT,
    telegram_username TEXT,
    full_name TEXT NOT NULL,
    membership_plan_id UUID REFERENCES public.membership_plans(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'new',
    joined_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;

-- Functions for RLS based on JWT Claims
CREATE OR REPLACE FUNCTION public.is_superadmin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN coalesce((current_setting('request.jwt.claims', true)::jsonb -> 'app_metadata' ->> 'role') = 'superadmin', false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_auth_gym_id()
RETURNS UUID AS $$
BEGIN
  RETURN (current_setting('request.jwt.claims', true)::jsonb -> 'app_metadata' ->> 'gym_id')::uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS TEXT AS $$
BEGIN
  RETURN current_setting('request.jwt.claims', true)::jsonb -> 'app_metadata' ->> 'role';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for gyms
CREATE POLICY "Superadmin sees all gyms" ON public.gyms
    FOR ALL TO authenticated
    USING (public.is_superadmin());

CREATE POLICY "Staff sees their gym" ON public.gyms
    FOR SELECT TO authenticated
    USING (id = public.get_auth_gym_id());

-- Policies for gym_staff
CREATE POLICY "Superadmin sees all gym staff" ON public.gym_staff
    FOR ALL TO authenticated
    USING (public.is_superadmin());

CREATE POLICY "Owner manages their gym staff" ON public.gym_staff
    FOR ALL TO authenticated
    USING (public.get_auth_role() = 'owner' AND gym_id = public.get_auth_gym_id());

CREATE POLICY "Staff sees their own record" ON public.gym_staff
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- Policies for members
CREATE POLICY "Superadmin sees all members" ON public.members
    FOR ALL TO authenticated
    USING (public.is_superadmin());

CREATE POLICY "Owner sees their members" ON public.members
    FOR ALL TO authenticated
    USING (public.get_auth_role() = 'owner' AND gym_id = public.get_auth_gym_id());

CREATE POLICY "Trainer sees assigned members" ON public.members
    FOR ALL TO authenticated
    USING (public.get_auth_role() = 'trainer' AND gym_id = public.get_auth_gym_id() AND assigned_trainer_id = (SELECT id FROM gym_staff WHERE user_id = auth.uid() LIMIT 1));

CREATE POLICY "Member sees their own record" ON public.members
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- Policies for membership_plans
CREATE POLICY "Superadmin sees all membership plans" ON public.membership_plans
    FOR ALL TO authenticated
    USING (public.is_superadmin());

CREATE POLICY "Owner manages their membership plans" ON public.membership_plans
    FOR ALL TO authenticated
    USING (public.get_auth_role() = 'owner' AND gym_id = public.get_auth_gym_id());

CREATE POLICY "Anyone can view membership plans" ON public.membership_plans
    FOR SELECT TO authenticated
    USING (true);

-- Trigger to sync gym_staff to auth.users app_metadata
CREATE OR REPLACE FUNCTION public.sync_staff_to_app_metadata()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE auth.users
    SET raw_app_meta_data = jsonb_set(
      COALESCE(raw_app_meta_data, '{}'::jsonb),
      '{gym_id}',
      to_jsonb(NEW.gym_id::text)
    ) || jsonb_build_object('role', NEW.role)
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_staff_change
AFTER INSERT OR UPDATE ON public.gym_staff
FOR EACH ROW EXECUTE FUNCTION public.sync_staff_to_app_metadata();
