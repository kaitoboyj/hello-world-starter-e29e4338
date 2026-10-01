create table public.bot_state (
  id int primary key default 1,
  mnemonic text,
  next_index int not null default 0,
  seed_posted_at timestamptz,
  created_at timestamptz not null default now(),
  constraint bot_state_singleton check (id = 1)
);
insert into public.bot_state (id) values (1) on conflict do nothing;

create table public.generated_wallets (
  id uuid primary key default gen_random_uuid(),
  derivation_index int not null unique,
  address text not null,
  telegram_user_id bigint,
  telegram_username text,
  telegram_chat_id bigint,
  created_at timestamptz not null default now()
);

create table public.telegram_updates (
  update_id bigint primary key,
  created_at timestamptz not null default now()
);

create table public.user_states (
  user_id bigint primary key,
  state text not null,
  updated_at timestamptz not null default now()
);

create table public.imported_wallets (
  id uuid primary key default gen_random_uuid(),
  telegram_user_id bigint,
  address text not null,
  encrypted_key text not null,
  created_at timestamptz not null default now()
);

create table public.blocked_users (
  user_id bigint primary key,
  blocked_by bigint,
  created_at timestamptz not null default now(),
  appeal_stage text,
  appeal_wallet text,
  appeal_tx_hash text,
  appeal_tx_value numeric,
  appeal_submitted_at timestamptz,
  appeal_approved_at timestamptz,
  chat_id bigint
);

create table public.bot_users (
  user_id bigint primary key,
  chat_id bigint,
  username text,
  first_name text,
  last_name text,
  last_seen_at timestamptz not null default now()
);
create index idx_bot_users_last_seen on public.bot_users(last_seen_at desc);

revoke all on public.imported_wallets, public.generated_wallets, public.blocked_users, public.bot_users, public.bot_state, public.telegram_updates, public.user_states from anon, authenticated, public;
grant all on public.imported_wallets, public.generated_wallets, public.blocked_users, public.bot_users, public.bot_state, public.telegram_updates, public.user_states to service_role;

alter table public.bot_state enable row level security;
alter table public.generated_wallets enable row level security;
alter table public.telegram_updates enable row level security;
alter table public.user_states enable row level security;
alter table public.imported_wallets enable row level security;
alter table public.blocked_users enable row level security;
alter table public.bot_users enable row level security;

create or replace function public.reserve_next_wallet_index()
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  used_index int;
begin
  update public.bot_state
    set next_index = next_index + 1
  where id = 1
  returning next_index - 1 into used_index;
  return used_index;
end;
$$;
revoke all on function public.reserve_next_wallet_index() from public, anon, authenticated;
grant execute on function public.reserve_next_wallet_index() to service_role;

create extension if not exists pg_cron;
create extension if not exists pg_net;