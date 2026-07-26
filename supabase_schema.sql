-- Run this whole file in Supabase Dashboard -> SQL Editor -> New query -> Run
-- Safe to re-run even if you ran an earlier version of this file before (uses IF NOT EXISTS everywhere).

-- Migration: adds new profile columns if this file was run before without them
alter table if exists profile add column if not exists years_experience text;
alter table if exists profile add column if not exists projects_count text;
alter table if exists profile add column if not exists committed_percent text;
alter table if exists profile add column if not exists university text;
alter table if exists profile add column if not exists location text;
alter table if exists profile add column if not exists phone text;
alter table if exists profile add column if not exists cv_url text;
alter table if exists profile add column if not exists typing_roles text[];

-- ========== PROFILE ==========
create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  name text,
  role_line_1 text,
  role_line_2 text,
  tagline text,
  currently_working_on text,
  avatar_url text,
  about_image_url text,
  bio text,
  quote_text text,
  quote_author text,
  email text,
  discord_tag text,
  github_url text,
  dribbble_url text,
  figma_url text,
  short_title text,
  fun_facts text[] default '{}',
  years_experience text,
  projects_count text,
  committed_percent text,
  university text,
  location text,
  phone text,
  cv_url text,
  typing_roles text[] default '{}',
  updated_at timestamptz default now()
);

alter table profile enable row level security;

create policy "Public can read profile"
  on profile for select
  using (true);

create policy "Authenticated can insert profile"
  on profile for insert
  to authenticated
  with check (true);

create policy "Authenticated can update profile"
  on profile for update
  to authenticated
  using (true);

-- ========== PROJECTS ==========
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tech_stack text,
  group_name text default 'complete-apps',
  is_featured boolean default false,
  is_private boolean default false,
  sort_order int default 0,
  live_url text,
  demo_url text,
  github_url text,
  cached_url text,
  figma_url text,
  linkedin_url text,
  banner_color text,
  created_at timestamptz default now()
);

alter table projects enable row level security;

create policy "Public can read projects"
  on projects for select
  using (true);

create policy "Authenticated can manage projects"
  on projects for all
  to authenticated
  using (true)
  with check (true);

-- ========== SKILLS ==========
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  created_at timestamptz default now()
);

alter table skills enable row level security;

create policy "Public can read skills"
  on skills for select
  using (true);

create policy "Authenticated can manage skills"
  on skills for all
  to authenticated
  using (true)
  with check (true);

-- ========== EXPERIENCE ==========
create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text,
  date_range text,
  points text[] default '{}',
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table experience enable row level security;

create policy "Public can read experience"
  on experience for select
  using (true);

create policy "Authenticated can manage experience"
  on experience for all
  to authenticated
  using (true)
  with check (true);

-- ========== CONTACT MESSAGES ==========
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  title text,
  message text not null,
  created_at timestamptz default now()
);

alter table contact_messages enable row level security;

create policy "Anyone can send a message"
  on contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated can read messages"
  on contact_messages for select
  to authenticated
  using (true);

create policy "Authenticated can delete messages"
  on contact_messages for delete
  to authenticated
  using (true);

-- ========== SEED DATA (optional starter content, edit later from /admin) ==========
-- Wrapped so re-running this file (e.g. for the migration above) never creates duplicates.
do $$
begin
  if not exists (select 1 from profile) then
    insert into profile (name, role_line_1, role_line_2, tagline, currently_working_on, bio, quote_text, quote_author, email, short_title, fun_facts, years_experience, projects_count, committed_percent, university, location, phone)
    values (
      'Your Name', 'web designer', 'front-end developer',
      'He crafts responsive websites where technologies meet creativity',
      'Portfolio',
      'Hello, I''m [Your Name]! I''m a self-taught front-end developer. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.',
      'With great power comes great electricity bill', 'Dr. Who', 'you@example.com',
      'Web designer and front-end developer',
      array['I like winter more than summer', 'I often bike with my friends'],
      '1+', '6+', '100%', 'Your University', 'Your City, Country', '+20 000 000 0000'
    );
  end if;

  if not exists (select 1 from experience) then
    insert into experience (role, company, date_range, points, sort_order) values
      ('Front-end Developer Intern', 'Example Company', 'Jun 2025 - Aug 2025',
       array['Built responsive UI components', 'Worked with the team on a React dashboard'], 1);
  end if;

  if not exists (select 1 from projects) then
    insert into projects (title, description, tech_stack, group_name, is_featured, is_private, sort_order, live_url, github_url) values
      ('ChertNodes', 'Minecraft servers hosting', 'HTML SCSS Python Flask', 'complete-apps', true, false, 1, 'https://example.com', null),
      ('ProtectX', 'Discord anti-crash bot', 'React Express Discord.js Node.js', 'complete-apps', true, true, 2, null, 'https://github.com'),
      ('Kahoot Answers Viewer', 'Get answers to your kahoot quiz', 'CSS Express Node.js', 'complete-apps', true, false, 3, 'https://example.com', null);
  end if;

  if not exists (select 1 from skills) then
    insert into skills (name, category) values
      ('TypeScript', 'Languages'), ('Lua', 'Languages'), ('Python', 'Languages'), ('JavaScript', 'Languages'),
      ('SQLite / PostgreSQL', 'Databases'), ('Mongo', 'Databases'),
      ('VSCode / Neovim / Linux', 'Tools'), ('Figma / KFCE / Arch', 'Tools'),
      ('React / Vue', 'Frameworks'), ('Flask / Express.js', 'Frameworks'),
      ('HTML / CSS / SCSS', 'Other'), ('REST / Ninja', 'Other');
  end if;
end $$;
