## RLS Policy Notes

Paste the SQL below into the Supabase SQL Editor.

```sql
-- 1) Ensure base tables exist
create table if not exists public.theories (
	id uuid primary key default gen_random_uuid(),
	title text not null,
	slug text not null unique,
	category text,
	overview text,
	history text,
	key_points text[],
	key_thinkers text[],
	representative_films text[],
	citations text[],
	status text not null check (status in ('draft', 'published')) default 'draft',
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table if not exists public.vocabulary (
	id uuid primary key default gen_random_uuid(),
	term text not null,
	definition text not null,
	category text,
	related_theory_slug text,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
	user_id uuid primary key references auth.users(id) on delete cascade
);

-- 2) Enable RLS
alter table public.theories enable row level security;
alter table public.vocabulary enable row level security;

-- 3) Drop old policies if they already exist
drop policy if exists "public can read published theories" on public.theories;
drop policy if exists "admins can manage theories" on public.theories;
drop policy if exists "public can read vocabulary" on public.vocabulary;
drop policy if exists "admins can manage vocabulary" on public.vocabulary;

-- 4) Public read policies
create policy "public can read published theories"
on public.theories
for select
to public
using (status = 'published');

create policy "public can read vocabulary"
on public.vocabulary
for select
to public
using (true);

-- 5) Admin write policies
create policy "admins can manage theories"
on public.theories
for all
to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));

create policy "admins can manage vocabulary"
on public.vocabulary
for all
to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));
```

## Schema Verification Queries

Run these to verify final columns match expected architecture:

```sql
select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public' and table_name = 'theories'
order by ordinal_position;

select column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public' and table_name = 'vocabulary'
order by ordinal_position;
```
