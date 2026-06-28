-- ──────────────────────────────────────────────────────────────────────────
-- FitZone Gym — inquiries table + Row-Level-Security
-- Run this in the Supabase SQL Editor (or via the Supabase CLI) once, when
-- setting up the project. Matches the schema in TRD §4.2.
-- ──────────────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text        not null,
  phone       text        not null,
  email       text        not null,
  message     text,
  source_page text,
  status      text        not null default 'new'
                check (status in ('new', 'contacted', 'converted', 'closed')),
  created_at  timestamptz not null default now()
);

-- Enable Row-Level Security. With RLS on and no permissive SELECT policy for
-- anon, leads can be written by the public site but never read back by it.
alter table public.inquiries enable row level security;

-- Allow anonymous (public site) + authenticated users to INSERT a lead.
drop policy if exists "Public can submit inquiries" on public.inquiries;
create policy "Public can submit inquiries"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (true);

-- Only authenticated admins may read/update leads (used by the Phase 5 admin
-- dashboard). Anon has NO select/update/delete access.
drop policy if exists "Authenticated can read inquiries" on public.inquiries;
create policy "Authenticated can read inquiries"
  on public.inquiries
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can update inquiries" on public.inquiries;
create policy "Authenticated can update inquiries"
  on public.inquiries
  for update
  to authenticated
  using (true)
  with check (true);

-- Helpful index for the admin list view (newest first).
create index if not exists inquiries_created_at_idx
  on public.inquiries (created_at desc);
