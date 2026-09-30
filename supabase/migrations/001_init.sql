create extension if not exists "pgcrypto";

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 40),
  rage_score integer not null default 0 check (rage_score >= 0),
  created_at timestamptz not null default now()
);

-- Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

-- Products (catalog: public, read-only for clients)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  title text not null,
  author text not null,
  description text not null,
  price_amount numeric(14,2) not null check (price_amount >= 0),
  price_currency_symbol text not null default '₹',
  stock_count integer not null default 0 check (stock_count = 0),
  image_emoji text not null default '📕',
  created_at timestamptz not null default now()
);

-- Cart items ("falling out" is visual only; rows persist)
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null default 1 check (quantity between 1 and 99),
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

-- Rage sessions (one per browser session)
create table if not exists public.rage_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  total_clicks integer not null default 0,
  boss_bar_resets integer not null default 0,
  wrong_keys integer not null default 0,
  loader_regressions integer not null default 0,
  vanish_chases integer not null default 0,
  rage_score integer not null default 0
);

-- Rage events (append-only telemetry)
do $$ begin
  if not exists (select 1 from pg_type where typname = 'rage_event_type') then
    create type public.rage_event_type as enum (
      'loader_started','loader_regressed','loader_jumped','boss_bar_spawned',
      'boss_bar_reset','boss_bar_completed','wrong_key','key_swapped',
      'button_vanished','glitch_triggered','out_of_stock_seen','support_chat_used'
    );
  end if;
end $$;

create table if not exists public.rage_events (
  id bigint generated always as identity primary key,
  session_id uuid not null references public.rage_sessions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  event_type public.rage_event_type not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- AI taunt cache (avoid repeated Gemini calls)
create table if not exists public.taunt_cache (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('out_of_stock','review','loader_label','advisory','support_reply')),
  product_id uuid references public.products(id) on delete cascade,
  content jsonb not null,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_cart_user on public.cart_items(user_id);
create index if not exists idx_events_session on public.rage_events(session_id, created_at desc);
create index if not exists idx_sessions_score on public.rage_sessions(rage_score desc);
create index if not exists idx_profiles_score on public.profiles(rage_score desc);
create index if not exists idx_taunt_kind_product on public.taunt_cache(kind, product_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(nullif(split_part(new.email, '@', 1), ''), 'Anonymous Sufferer'))
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Enable Row Level Security (RLS)
alter table public.profiles      enable row level security;
alter table public.categories    enable row level security;
alter table public.products      enable row level security;
alter table public.cart_items    enable row level security;
alter table public.rage_sessions enable row level security;
alter table public.rage_events   enable row level security;
alter table public.taunt_cache   enable row level security;

-- Catalog Policies: readable by everyone, writable by no client
drop policy if exists "categories_read_all" on public.categories;
create policy "categories_read_all" on public.categories for select using (true);

drop policy if exists "products_read_all" on public.products;
create policy "products_read_all" on public.products for select using (true);

-- Profiles Policies: public leaderboard read, own-row update of display_name only
drop policy if exists "profiles_read_all" on public.profiles;
create policy "profiles_read_all" on public.profiles for select using (true);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update
  using (auth.uid() = id) with check (auth.uid() = id);

-- Cart: strictly per-user
drop policy if exists "cart_select_own" on public.cart_items;
create policy "cart_select_own" on public.cart_items for select using (auth.uid() = user_id);

drop policy if exists "cart_insert_own" on public.cart_items;
create policy "cart_insert_own" on public.cart_items for insert with check (auth.uid() = user_id);

drop policy if exists "cart_update_own" on public.cart_items;
create policy "cart_update_own" on public.cart_items for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "cart_delete_own" on public.cart_items;
create policy "cart_delete_own" on public.cart_items for delete using (auth.uid() = user_id);

-- Rage sessions: readable by all (leaderboard), written only via backend service role
drop policy if exists "sessions_read_all" on public.rage_sessions;
create policy "sessions_read_all" on public.rage_sessions for select using (true);

-- Rage events: a user may read only their own; inserts happen via backend service role
drop policy if exists "events_select_own" on public.rage_events;
create policy "events_select_own" on public.rage_events for select using (auth.uid() = user_id);

-- Taunt cache: readable by everyone, written via service role only
drop policy if exists "taunt_read_all" on public.taunt_cache;
create policy "taunt_read_all" on public.taunt_cache for select using (true);
