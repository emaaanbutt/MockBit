-- MockBit database draft for PostgreSQL/Supabase.
-- Keep provider API keys outside this database; store only user-owned interview records.

create table app_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text,
  preferred_region text not null default 'remote-south-asia',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table interviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
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

create table transcript_turns (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid not null references interviews(id) on delete cascade,
  speaker text not null,
  text text not null,
  confidence numeric(4, 3),
  local_context_tags text[] not null default '{}',
  started_at timestamptz not null,
  ended_at timestamptz,
  created_at timestamptz not null default now()
);

create table evaluation_reports (
  id uuid primary key default gen_random_uuid(),
  interview_id uuid not null unique references interviews(id) on delete cascade,
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

create index interviews_user_created_idx on interviews(user_id, created_at desc);
create index transcript_turns_interview_idx on transcript_turns(interview_id, started_at);
