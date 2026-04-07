-- Server-side aggregated analytics summary for faster admin dashboard loading.

create or replace function public.get_admin_analytics_summary()
returns table (
  published_theories bigint,
  draft_theories bigint,
  published_vocabulary bigint,
  draft_vocabulary bigint,
  published_quizzes bigint,
  draft_quizzes bigint,
  unique_users bigint,
  total_engagement_events bigint
)
language sql
stable
as $$
  select
    count(*) filter (where t.status = 'published') as published_theories,
    count(*) filter (where t.status = 'draft') as draft_theories,
    (select count(*) from public.vocabulary_terms v where v.status = 'published') as published_vocabulary,
    (select count(*) from public.vocabulary_terms v where v.status = 'draft') as draft_vocabulary,
    (select count(*) from public.quizzes q where q.status = 'published') as published_quizzes,
    (select count(*) from public.quizzes q where q.status = 'draft') as draft_quizzes,
    (
      select count(distinct coalesce(ue.user_id::text, ue.metadata ->> 'anon_user_id'))
      from public.user_engagement ue
      where coalesce(ue.user_id::text, ue.metadata ->> 'anon_user_id') is not null
    ) as unique_users,
    (select count(*) from public.user_engagement) as total_engagement_events
  from public.theories t;
$$;
