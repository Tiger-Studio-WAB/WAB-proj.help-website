-- Proj.Help schema
-- Microsoft + allowed school domain only. RLS on every public table.

create schema if not exists private;

revoke all on schema private from public, anon, authenticated;
grant usage on schema private to postgres, supabase_auth_admin;

do $$ begin
  create type public.idea_category as enum (
    'stem',
    'arts',
    'community',
    'research',
    'entrepreneurship',
    'service',
    'other'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.content_language as enum ('en', 'zh');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  display_name text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  constraint profiles_school_email_chk check (email ~* '@wab\.edu$')
);

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  title text not null check (char_length(title) between 3 and 160),
  body text not null check (char_length(body) between 10 and 8000),
  help_needed text check (help_needed is null or char_length(help_needed) <= 1000),
  category public.idea_category not null default 'other',
  source_language public.content_language not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 2 and 4000),
  can_help boolean not null default false,
  source_language public.content_language not null default 'en',
  created_at timestamptz not null default now()
);

create table if not exists public.content_translations (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('idea', 'response')),
  entity_id uuid not null,
  language public.content_language not null,
  title text,
  body text not null,
  help_needed text,
  created_at timestamptz not null default now(),
  unique (entity_type, entity_id, language)
);

create index if not exists ideas_created_at_idx on public.ideas (created_at desc);
create index if not exists ideas_category_idx on public.ideas (category);
create index if not exists responses_idea_id_idx on public.responses (idea_id, created_at);
create index if not exists translations_entity_idx
  on public.content_translations (entity_type, entity_id, language);

create or replace function private.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists ideas_set_updated_at on public.ideas;
create trigger ideas_set_updated_at
before update on public.ideas
for each row execute function private.set_updated_at();

-- Reject non-Microsoft or non-school-domain signups before the auth user exists.
create or replace function public.hook_restrict_signup_to_school(event jsonb)
returns jsonb
language plpgsql
as $$
declare
  user_email text;
  provider text;
begin
  user_email := lower(coalesce(event -> 'user' ->> 'email', ''));
  provider := coalesce(event -> 'user' -> 'app_metadata' ->> 'provider', '');

  if provider is distinct from 'azure' then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'http_code', 403,
        'message', 'This site only accepts Microsoft sign-in.'
      )
    );
  end if;

  if user_email !~ '@wab\.edu$' then
    return jsonb_build_object(
      'error', jsonb_build_object(
        'http_code', 403,
        'message', 'Only authorized school Microsoft accounts can use this site.'
      )
    );
  end if;

  return '{}'::jsonb;
end;
$$;

revoke all on function public.hook_restrict_signup_to_school(jsonb) from public, anon, authenticated;
grant execute on function public.hook_restrict_signup_to_school(jsonb) to supabase_auth_admin;
grant usage on schema public to supabase_auth_admin;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1)
    ),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

revoke all on function private.handle_new_user() from public, anon, authenticated;
grant execute on function private.handle_new_user() to supabase_auth_admin;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

create or replace function private.is_school_member()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() ->> 'email') ~* '@wab\.edu$', false);
$$;

grant usage on schema private to authenticated;
grant execute on function private.is_school_member() to authenticated;

alter table public.profiles enable row level security;
alter table public.ideas enable row level security;
alter table public.responses enable row level security;
alter table public.content_translations enable row level security;

create policy profiles_select_members
  on public.profiles for select
  to authenticated
  using (private.is_school_member());

create policy profiles_update_own
  on public.profiles for update
  to authenticated
  using (id = auth.uid() and private.is_school_member())
  with check (id = auth.uid() and private.is_school_member());

create policy ideas_select_members
  on public.ideas for select
  to authenticated
  using (private.is_school_member());

create policy ideas_insert_own
  on public.ideas for insert
  to authenticated
  with check (author_id = auth.uid() and private.is_school_member());

create policy ideas_update_own
  on public.ideas for update
  to authenticated
  using (author_id = auth.uid() and private.is_school_member())
  with check (author_id = auth.uid() and private.is_school_member());

create policy ideas_delete_own
  on public.ideas for delete
  to authenticated
  using (author_id = auth.uid() and private.is_school_member());

create policy responses_select_members
  on public.responses for select
  to authenticated
  using (private.is_school_member());

create policy responses_insert_own
  on public.responses for insert
  to authenticated
  with check (author_id = auth.uid() and private.is_school_member());

create policy responses_update_own
  on public.responses for update
  to authenticated
  using (author_id = auth.uid() and private.is_school_member())
  with check (author_id = auth.uid() and private.is_school_member());

create policy responses_delete_own
  on public.responses for delete
  to authenticated
  using (author_id = auth.uid() and private.is_school_member());

create policy translations_select_members
  on public.content_translations for select
  to authenticated
  using (private.is_school_member());

create policy translations_insert_members
  on public.content_translations for insert
  to authenticated
  with check (private.is_school_member());
