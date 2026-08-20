-- Aura MVP: run in Supabase after creating a project.
create table if not exists public.profiles (id uuid primary key references auth.users(id) on delete cascade, display_name text, preferences jsonb not null default '{}'::jsonb, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists public.wardrobe_items (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, attributes jsonb not null, image_path text not null, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists public.outfits (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, name text, occasion text, ai_generated boolean not null default false, created_at timestamptz not null default now());
create table if not exists public.outfit_items (outfit_id uuid not null references public.outfits(id) on delete cascade, wardrobe_item_id uuid not null references public.wardrobe_items(id) on delete cascade, slot text not null, primary key (outfit_id, wardrobe_item_id));
create table if not exists public.feedback_events (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, outfit_id uuid references public.outfits(id) on delete cascade, item_id uuid references public.wardrobe_items(id) on delete cascade, signal text not null check (signal in ('like','dislike','save','skip','wear')), created_at timestamptz not null default now());
create table if not exists public.style_profiles (user_id uuid primary key references auth.users(id) on delete cascade, profile jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now());
create table if not exists public.ai_requests (id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete set null, provider text, model text, task text not null, latency_ms integer, input_tokens integer, output_tokens integer, estimated_cost numeric, success boolean not null, created_at timestamptz not null default now());
alter table public.profiles enable row level security; alter table public.wardrobe_items enable row level security; alter table public.outfits enable row level security; alter table public.outfit_items enable row level security; alter table public.feedback_events enable row level security; alter table public.style_profiles enable row level security; alter table public.ai_requests enable row level security;
create policy "own profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own wardrobe" on public.wardrobe_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own outfits" on public.outfits for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own feedback" on public.feedback_events for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own style profile" on public.style_profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own ai audit" on public.ai_requests for select using (auth.uid() = user_id);
create policy "own outfit items" on public.outfit_items for all using (exists (select 1 from public.outfits where id = outfit_id and user_id = auth.uid())) with check (exists (select 1 from public.outfits where id = outfit_id and user_id = auth.uid()));
create index if not exists wardrobe_items_user_created on public.wardrobe_items(user_id, created_at desc);
create index if not exists feedback_events_user_created on public.feedback_events(user_id, created_at desc);

-- Private wardrobe photos. Never change this bucket to public.
insert into storage.buckets (id, name, public) values ('wardrobe-images', 'wardrobe-images', false) on conflict (id) do update set public = false;
create policy "private wardrobe upload" on storage.objects for insert to authenticated with check (bucket_id = 'wardrobe-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "private wardrobe read" on storage.objects for select to authenticated using (bucket_id = 'wardrobe-images' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "private wardrobe delete" on storage.objects for delete to authenticated using (bucket_id = 'wardrobe-images' and (storage.foldername(name))[1] = auth.uid()::text);
