-- City whisper suggestions from /cities (server uses service role; no public policies)
create table public.outpost_city_suggestions (
  id uuid primary key default gen_random_uuid(),
  city text not null check (char_length(trim(city)) >= 2 and char_length(city) <= 80),
  created_at timestamptz not null default now()
);

create index outpost_city_suggestions_created_at_idx
  on public.outpost_city_suggestions (created_at desc);

comment on table public.outpost_city_suggestions is
  'Visitor-suggested cities for future Outpost locations';

alter table public.outpost_city_suggestions enable row level security;
