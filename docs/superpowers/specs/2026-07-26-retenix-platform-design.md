# Technical Architecture & Design Document: Retenix Platform

## 1. System Overview
Retenix is a production-grade B2B SaaS platform designed to predict and prevent gym member churn using a 5-factor AI analysis engine. The platform serves 4 distinct user roles: SuperAdmin, Gym Owner, Trainer, and Member (Telegram Mini App).

## 2. Design System & Tokens (Locked 1:1)
- **Typography**:
  - `Unbounded` (display font)
  - `DM Sans` (body font)
  - `JetBrains Mono` (numbers, badges, monospace labels)
- **Colors**:
  - Background: `#080810`
  - Surfaces: `#0d0d16` (surface1), `#13131c` (surface2), `#1a1a26` (surface3)
  - Borders: `#1e1e2c` (border1), `#2a2a3a` (border2)
  - Accents: `#E8FF47` (accent neon), `rgba(232,255,71,0.10)` (accentDim), `rgba(232,255,71,0.30)` (accentBorder)
  - Status: `#5DCAA5` (good/active), `#E24B4A` (bad/high risk), `#E8C547` (warn/mid risk), `#7BB6E8` (info)
- **Responsive Shell & Dual-Render Pattern**:
  - Breakpoint 1: `≥ 1024px` (Desktop sidebar 232px + main content col)
  - Breakpoint 2: `< 1024px` (Mobile/Tablet topbar + bottom nav, no sidebar)
  - Breakpoint 3: `≤ 640px` (Dense single column layout)
  - CSS Dual-Render: `.vf-desktop-only` vs `.vf-mobile-only` for instant responsive view switching without JS hydration delay.

## 3. Technology Stack & Database Schemas
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS with custom design tokens, Lucide icons, Recharts.
- **Database & Auth**: Supabase Postgres with RLS policies, Supabase Auth (JWT claims for `role` & `gym_id`), Server-side HMAC for Telegram InitData.
- **Backend APIs**: Next.js Route Handlers (`src/app/api/`) with Supabase Service-Role Admin client.
- **AI Integration**: Anthropic Claude API for AI Copilot chat & Uzbek nutrition estimation.

### Core Tables & RLS Hierarchy
1. `gyms` (id, name, city, address, plan_tier, status, created_at)
2. `gym_staff` (id, gym_id FK, user_id FK -> auth.users, full_name, role [owner/trainer], created_at)
3. `members` (id, gym_id FK, assigned_trainer_id FK -> gym_staff, telegram_user_id, telegram_username, telegram_first_name, telegram_last_name, full_name, status, joined_at, current_streak, xp, gym_rank, today_workout, last_checkin_at)
4. `membership_plans` (id, gym_id FK, name, price, currency, billing_cycle)
5. `checkins` (id, member_id FK, gym_id FK, checked_in_at, source, qr_token_hash)
6. `member_activity_events` (id, member_id FK, event_type, metadata JSONB, occurred_at)
7. `churn_scores` (id, member_id FK, score 0-100, risk_tier [low/mid/high], factor_breakdown JSONB, computed_at)
8. `interventions` (id, member_id FK, staff_id FK, type, notes, outcome, created_at)
9. `workout_plans` & `workout_plan_items` (id, member_id FK, gym_id FK, day_of_week, exercise_name, sets, reps, weight_kg)
10. `food_logs` & `uzbek_food_reference` (id, member_id FK, food_name, calories, protein_g, carbs_g, fat_g, source)
11. `gamification_streaks`, `badges`, `member_badges`, `challenges`
12. `ai_copilot_messages` & `ai_usage_log`

## 4. Churn Signal Engine Logic (5 Factors)
- **Attendance Decline (35%)**: Compares checkins over last 14 days vs prior 14 days.
- **Streak State (25%)**: Evaluates streak breaks or inactivity length.
- **Engagement Drop (20%)**: Tracks AI chat, food logging, and app interactions.
- **Plan Staleness (10%)**: Measures workout plan age and completion rate.
- **Tenure Risk (10%)**: Higher vulnerability for new members in first 30 days.

## 5. Execution Plan (Phases 0 - 10)
- **Phase 0**: Project skeleton, globals.css design tokens, Supabase SQL migration script.
- **Phase 1**: Production Auth (Login/Signup split layout matching `retenix_login_signup_screen.html`, JWT role resolution, Supabase server/admin clients).
- **Phase 2**: Core CRM for Gym Owner (`/owner/dashboard`, `/owner/members`, `/owner/members/[id]`, `/owner/trainers`).
- **Phase 3**: Churn Signal Engine API & Recharts visualizer.
- **Phase 4**: Trainer Dashboard & Client Management (`/trainer/dashboard`, `/trainer/clients`, `/trainer/schedule`).
- **Phase 5**: Gamification Engine (Streaks, Badges, Gym Leaderboard `/member/top`).
- **Phase 6**: Telegram Mini App & Uzbek AI Nutrition (`/member`, `/member/plan`, `/member/checkin`, `/member/food`, `/member/profile`, `/member/onboarding`).
- **Phase 7**: Real AI Copilot & AI Usage Tracking (`/owner/copilot`, `/trainer/copilot`, `/superadmin/copilot`, `/superadmin/aiusage`).
- **Phase 8**: SuperAdmin & Global Platform CRM (`/superadmin/dashboard`, `/superadmin/gyms`, `/superadmin/billing`).
- **Phase 9**: Intervention Guarantee Logging & Outcome Tracking.
- **Phase 10**: Build Verification, HTTP Automated Test Suite, and Final Deployment.
