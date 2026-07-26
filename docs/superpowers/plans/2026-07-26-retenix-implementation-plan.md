# Implementation Plan: Retenix Platform

## Task Breakdown & Checkpoints

- [ ] **Phase 0: Database & Design System Core**
  - Write complete Supabase SQL Migration (`supabase/migrations/20260726000000_retenix_schema.sql`) with RLS policies, tables, and Uzbek food reference dataset.
  - Implement Supabase Client Utils (`src/lib/supabase/client.ts`, `server.ts`, `admin.ts`).
  - Configure `globals.css` with locked color tokens, fonts, and `.vf-shell` dual-render media queries.

- [ ] **Phase 1: Real Supabase Auth & Redesigned Login Screen**
  - Implement `/login` page matching `retenix_login_signup_screen.html` (Mobile & Desktop split-screen layout with Interactive Dot Grid, Tab switcher `Kirish` / `Ro'yxatdan o'tish`, Telegram 1-click button, Email/Password form).
  - Role-based server redirect: user signs in -> query `gym_staff` / `members` -> redirect to `/owner/dashboard`, `/trainer/dashboard`, `/superadmin/dashboard`, or `/member`.

- [ ] **Phase 2: AppShell Component & Core Gym Owner CRM**
  - Build `AppShell` (`src/components/layout/app-shell.tsx`) with 2-breakpoint dual-render logic.
  - Build `/owner/dashboard`, `/owner/members`, `/owner/members/[id]`, `/owner/trainers`.

- [ ] **Phase 3: Churn Signal Engine & Analytics**
  - Build `/api/churn/calculate` and factor breakdown endpoints.
  - Build `/owner/analytics` with Recharts graphs (Retention trend, MRR growth, Churn distribution, DAU histogram).

- [ ] **Phase 4: Trainer Workspace**
  - Build `/trainer/dashboard`, `/trainer/clients`, `/trainer/schedule`, `/trainer/analytics`.

- [ ] **Phase 5: Gamification Engine**
  - Build `/api/member/checkins`, `/api/member/workouts/complete`, `/member/top` Leaderboard, Badges, Streaks.

- [ ] **Phase 6: Member Telegram Mini App & Uzbek AI Nutrition**
  - Build `/member`, `/member/plan`, `/member/checkin`, `/member/food` (Uzbek dishes calorie estimator & logger), `/member/profile`, `/member/onboarding` (2-question AI wow moment).

- [ ] **Phase 7: Real AI Copilot & AI Usage Monitoring**
  - Build `/api/copilot/message` using Anthropic Claude API with context injection.
  - Build `/owner/copilot`, `/trainer/copilot`, `/superadmin/copilot`, `/superadmin/aiusage`.

- [ ] **Phase 8: SuperAdmin Global CRM & Billing**
  - Build `/superadmin/dashboard`, `/superadmin/gyms`, `/superadmin/billing`, `/owner/billing`.

- [ ] **Phase 9: Interventions & Outcome Tracking**
  - Build intervention logging modal and outcome tracking.

- [ ] **Phase 10: Build Verification & Deployment**
  - Run Next.js build (`npm run build`).
  - Run automated HTTP test suite (`test_platform.js`).
  - Push to GitHub `main` branch.
