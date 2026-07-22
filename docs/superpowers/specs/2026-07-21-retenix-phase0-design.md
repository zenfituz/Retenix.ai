# Retenix Phase 0 & 1 Design Doc

## 1. Architecture Overview
Retenix is a churn prediction engine.
- **Frontend**: Next.js 15 (App Router), Tailwind v4.
- **Backend**: FastAPI (Python 3.12), async SQLAlchemy.
- **Database**: Supabase (PostgreSQL) with RLS.
- **Auth**: Supabase Auth.

## 2. Supabase Schema (Initial)
Tables needed: `gyms`, `gym_staff`, `members`, `membership_plans`.

`gyms`:
- id (uuid)
- name (text)
- city (text)
- address (text)
- plan_tier (text)
- status (text)
- created_at (timestamptz)

`gym_staff`:
- id (uuid)
- gym_id (uuid, fk to gyms)
- user_id (uuid, fk to auth.users)
- full_name (text)
- role (text: owner/trainer)
- created_at (timestamptz)

`members`:
- id (uuid)
- gym_id (uuid, fk to gyms)
- assigned_trainer_id (uuid, fk to gym_staff)
- telegram_user_id (text)
- telegram_username (text)
- full_name (text)
- membership_plan_id (uuid, fk to membership_plans)
- status (text)
- joined_at (timestamptz)
- created_at (timestamptz)

`membership_plans`:
- id (uuid)
- gym_id (uuid, fk to gyms)
- name (text)
- price (numeric)
- currency (text)
- billing_cycle (text)

**RLS Policies**:
- `gyms`: Accessible by `SuperAdmin` (all), `Gym Owner/Trainer` (where id = their gym_id).
- `gym_staff`: Accessible by `SuperAdmin`, `Gym Owner` (same gym).
- `members`: Accessible by `Owner` (same gym), `Trainer` (assigned_trainer_id = their id), `Member` (themselves).

## 3. FastAPI Backend
- Framework: FastAPI
- ORM: SQLAlchemy (async)
- DB Driver: asyncpg
- Health endpoint: `GET /health`

## 4. Implementation Plan
1. **Supabase Setup**: Create Supabase project, run initial migrations for the 4 tables + RLS.
2. **FastAPI Setup**: Scaffold FastAPI project, configure DB connection, implement health check.
3. **CI Pipeline**: Setup GitHub Actions for linting.
