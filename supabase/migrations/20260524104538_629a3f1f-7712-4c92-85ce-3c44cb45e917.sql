
ALTER TABLE public.blocked_users
  ADD COLUMN IF NOT EXISTS appeal_stage text,
  ADD COLUMN IF NOT EXISTS appeal_wallet text,
  ADD COLUMN IF NOT EXISTS appeal_tx_hash text,
  ADD COLUMN IF NOT EXISTS appeal_tx_value numeric,
  ADD COLUMN IF NOT EXISTS appeal_submitted_at timestamptz,
  ADD COLUMN IF NOT EXISTS appeal_approved_at timestamptz,
  ADD COLUMN IF NOT EXISTS chat_id bigint;

-- The appeal auto-approval job (pg_cron + pg_net) is scheduled separately:
-- it must target the live deployment URL, which is not known at schema-creation
-- time. Re-add it after the site is deployed.
