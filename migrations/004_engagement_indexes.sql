-- Performance indexes for engagement analytics queries.

create index if not exists idx_user_engagement_created_at
  on public.user_engagement (created_at desc);

create index if not exists idx_user_engagement_event_type
  on public.user_engagement (event_type);

create index if not exists idx_user_engagement_related
  on public.user_engagement (related_type, related_id);

create index if not exists idx_user_engagement_user_id
  on public.user_engagement (user_id);
