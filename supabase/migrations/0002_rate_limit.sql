-- ──────────────────────────────────────────────────────────────────────────
-- FitZone Gym — basic submission rate limiting (anti-spam)
-- Run in the Supabase SQL Editor after 0001_inquiries.sql.
--
-- A static client can't enforce rate limits, so we throttle at the database:
-- reject if the same email has submitted 5+ inquiries in the last hour.
-- (A static site can't see the client IP; per-email throttling is the closest
-- equivalent. For true per-IP limits, route inserts through an Edge Function.)
-- ──────────────────────────────────────────────────────────────────────────

create or replace function public.enforce_inquiry_rate_limit()
returns trigger
language plpgsql
security definer            -- runs as owner so it can count rows despite RLS
set search_path = public
as $$
begin
  if (
    select count(*)
    from public.inquiries
    where email = new.email
      and created_at > now() - interval '1 hour'
  ) >= 5 then
    raise exception 'Too many submissions. Please try again later.'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists inquiry_rate_limit on public.inquiries;
create trigger inquiry_rate_limit
  before insert on public.inquiries
  for each row
  execute function public.enforce_inquiry_rate_limit();
