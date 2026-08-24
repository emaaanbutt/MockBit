-- MockBit Supabase PostgreSQL schema draft.
-- Supabase Auth stores credentials in auth.users. App tables only store product data.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  preferred_region text not null default 'remote-south-asia',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.interviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role_title text not null,
  company_style text not null,
  job_description text not null,
  region text not null,
  accent_model text not null,
  status text not null default 'draft',
  provider text,
  started_at timestamptz,
  ended_at timestamptz,
  duration_seconds integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.transcript_turns (
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

create table public.evaluation_reports (
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

alter table public.profiles enable row level security;
alter table public.interviews enable row level security;
alter table public.transcript_turns enable row level security;
alter table public.evaluation_reports enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can read their own interviews"
  on public.interviews for select
  using (auth.uid() = user_id);

create policy "Users can insert their own interviews"
  on public.interviews for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own interviews"
  on public.interviews for update
  using (auth.uid() = user_id);

create policy "Users can read their own transcript turns"
  on public.transcript_turns for select
  using (auth.uid() = user_id);

create policy "Users can insert their own transcript turns"
  on public.transcript_turns for insert
  with check (auth.uid() = user_id);

create policy "Users can read their own reports"
  on public.evaluation_reports for select
  using (auth.uid() = user_id);

create policy "Users can insert their own reports"
  on public.evaluation_reports for insert
  with check (auth.uid() = user_id);

create index interviews_user_created_idx on public.interviews(user_id, created_at desc);
create index transcript_turns_interview_idx on public.transcript_turns(interview_id, started_at);
create index reports_user_created_idx on public.evaluation_reports(user_id, created_at desc);
