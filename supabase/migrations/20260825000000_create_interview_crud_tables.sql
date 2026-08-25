-- Idempotent migration for MockBit interview CRUD and report persistence.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  preferred_region text not null default 'remote-south-asia',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.interviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role_title text not null,
  company_name text,
  company_style text not null,
  job_description text not null,
  region text not null,
  accent_model text not null,
  interview_mode text,
  meeting_link text,
  location_note text,
  scheduled_at timestamptz,
  status text not null default 'draft',
  provider text,
  started_at timestamptz,
  ended_at timestamptz,
  duration_seconds integer not null default 0,
  difficulty integer not null default 60,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.interviews add column if not exists difficulty integer not null default 60;

create table if not exists public.transcript_turns (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid not null references public.interviews(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  speaker text not null,
  text text not null,
  confidence numeric(4, 3),
  local_context_tags text[] not null default '{}',
  started_at timestamptz not null,
  ended_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.evaluation_reports (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid not null unique references public.interviews(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  confidence_score integer not null,
  technical_score integer not null,
  delivery_score integer not null,
  average_score integer not null,
  comparisons jsonb not null,
  filler_words jsonb not null,
  next_practice_plan text[] not null default '{}',
  model_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.interview_reminders (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid not null references public.interviews(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  reminder_type text not null,
  remind_at timestamptz not null,
  channel text not null default 'in-app',
  status text not null default 'scheduled',
  created_at timestamptz not null default now()
);

create table if not exists public.interview_tips (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid references public.interviews(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  tip text not null,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.interviews enable row level security;
alter table public.transcript_turns enable row level security;
alter table public.evaluation_reports enable row level security;
alter table public.interview_reminders enable row level security;
alter table public.interview_tips enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "Users can read their own interviews" on public.interviews;
create policy "Users can read their own interviews"
  on public.interviews for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own interviews" on public.interviews;
create policy "Users can insert their own interviews"
  on public.interviews for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own interviews" on public.interviews;
create policy "Users can update their own interviews"
  on public.interviews for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete their own interviews" on public.interviews;
create policy "Users can delete their own interviews"
  on public.interviews for delete
  using (auth.uid() = user_id);

drop policy if exists "Users can read their own transcript turns" on public.transcript_turns;
create policy "Users can read their own transcript turns"
  on public.transcript_turns for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own transcript turns" on public.transcript_turns;
create policy "Users can insert their own transcript turns"
  on public.transcript_turns for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can read their own reports" on public.evaluation_reports;
create policy "Users can read their own reports"
  on public.evaluation_reports for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own reports" on public.evaluation_reports;
create policy "Users can insert their own reports"
  on public.evaluation_reports for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own reports" on public.evaluation_reports;
create policy "Users can update their own reports"
  on public.evaluation_reports for update
  using (auth.uid() = user_id);

drop policy if exists "Users can read their own reminders" on public.interview_reminders;
create policy "Users can read their own reminders"
  on public.interview_reminders for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own reminders" on public.interview_reminders;
create policy "Users can insert their own reminders"
  on public.interview_reminders for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own reminders" on public.interview_reminders;
create policy "Users can update their own reminders"
  on public.interview_reminders for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete their own reminders" on public.interview_reminders;
create policy "Users can delete their own reminders"
  on public.interview_reminders for delete
  using (auth.uid() = user_id);

drop policy if exists "Users can read their own tips" on public.interview_tips;
create policy "Users can read their own tips"
  on public.interview_tips for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own tips" on public.interview_tips;
create policy "Users can insert their own tips"
  on public.interview_tips for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own tips" on public.interview_tips;
create policy "Users can update their own tips"
  on public.interview_tips for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete their own tips" on public.interview_tips;
create policy "Users can delete their own tips"
  on public.interview_tips for delete
  using (auth.uid() = user_id);

create index if not exists interviews_user_created_idx on public.interviews(user_id, created_at desc);
create index if not exists interviews_user_scheduled_idx on public.interviews(user_id, scheduled_at);
create index if not exists transcript_turns_interview_idx on public.transcript_turns(interview_id, started_at);
create index if not exists reports_user_created_idx on public.evaluation_reports(user_id, created_at desc);
create index if not exists reminders_user_remind_idx on public.interview_reminders(user_id, remind_at);
