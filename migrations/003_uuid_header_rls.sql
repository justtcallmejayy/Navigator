-- UUID header + RLS mode for admin access
-- This keeps admin login passwordless (UUID only) while enforcing table policies.

begin;

-- Re-enable RLS on admin-managed tables.
alter table public.admin_users enable row level security;
alter table public.theories enable row level security;
alter table public.vocabulary_terms enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;

-- Parse x-admin-uuid request header safely.
create or replace function public.request_admin_uuid()
returns uuid
language plpgsql
stable
as $$
declare
  header_value text;
begin
  header_value := nullif(current_setting('request.headers', true)::json ->> 'x-admin-uuid', '');

  if header_value is null then
    return null;
  end if;

  begin
    return header_value::uuid;
  exception
    when others then
      return null;
  end;
end;
$$;

-- ------------------------------------------------------------
-- admin_users
-- ------------------------------------------------------------
drop policy if exists "admins can read admin_users" on public.admin_users;
create policy "admins can read admin_users"
on public.admin_users
for select
to public
using (user_id = public.request_admin_uuid());

-- ------------------------------------------------------------
-- theories
-- ------------------------------------------------------------
drop policy if exists "admins can read theories" on public.theories;
create policy "admins can read theories"
on public.theories
for select
to public
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "admins can insert theories" on public.theories;
create policy "admins can insert theories"
on public.theories
for insert
to public
with check (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "admins can update theories" on public.theories;
create policy "admins can update theories"
on public.theories
for update
to public
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
)
with check (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "admins can delete theories" on public.theories;
create policy "admins can delete theories"
on public.theories
for delete
to public
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

-- Keep public published-only read policy.
drop policy if exists "public can read published theories" on public.theories;
create policy "public can read published theories"
on public.theories
for select
to public
using (status = 'published');

-- ------------------------------------------------------------
-- vocabulary_terms
-- ------------------------------------------------------------
drop policy if exists "admins can read vocabulary_terms" on public.vocabulary_terms;
create policy "admins can read vocabulary_terms"
on public.vocabulary_terms
for select
to public
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "admins can insert vocabulary_terms" on public.vocabulary_terms;
create policy "admins can insert vocabulary_terms"
on public.vocabulary_terms
for insert
to public
with check (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "admins can update vocabulary_terms" on public.vocabulary_terms;
create policy "admins can update vocabulary_terms"
on public.vocabulary_terms
for update
to public
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
)
with check (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "admins can delete vocabulary_terms" on public.vocabulary_terms;
create policy "admins can delete vocabulary_terms"
on public.vocabulary_terms
for delete
to public
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "public can read published vocabulary_terms" on public.vocabulary_terms;
create policy "public can read published vocabulary_terms"
on public.vocabulary_terms
for select
to public
using (status = 'published');

-- ------------------------------------------------------------
-- quizzes
-- ------------------------------------------------------------
drop policy if exists "admins can read quizzes" on public.quizzes;
create policy "admins can read quizzes"
on public.quizzes
for select
to public
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "admins can insert quizzes" on public.quizzes;
create policy "admins can insert quizzes"
on public.quizzes
for insert
to public
with check (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "admins can update quizzes" on public.quizzes;
create policy "admins can update quizzes"
on public.quizzes
for update
to public
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
)
with check (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "admins can delete quizzes" on public.quizzes;
create policy "admins can delete quizzes"
on public.quizzes
for delete
to public
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "public can read published quizzes" on public.quizzes;
create policy "public can read published quizzes"
on public.quizzes
for select
to public
using (status = 'published');

-- ------------------------------------------------------------
-- quiz_questions
-- ------------------------------------------------------------
drop policy if exists "admins can read quiz_questions" on public.quiz_questions;
create policy "admins can read quiz_questions"
on public.quiz_questions
for select
to public
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "admins can insert quiz_questions" on public.quiz_questions;
create policy "admins can insert quiz_questions"
on public.quiz_questions
for insert
to public
with check (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "admins can update quiz_questions" on public.quiz_questions;
create policy "admins can update quiz_questions"
on public.quiz_questions
for update
to public
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
)
with check (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "admins can delete quiz_questions" on public.quiz_questions;
create policy "admins can delete quiz_questions"
on public.quiz_questions
for delete
to public
using (
  exists (
    select 1
    from public.admin_users au
    where au.user_id = public.request_admin_uuid()
  )
);

drop policy if exists "public can read quiz_questions for published quizzes" on public.quiz_questions;
create policy "public can read quiz_questions for published quizzes"
on public.quiz_questions
for select
to public
using (
  exists (
    select 1
    from public.quizzes q
    where q.id = quiz_questions.quiz_id
      and q.status = 'published'
  )
);

commit;