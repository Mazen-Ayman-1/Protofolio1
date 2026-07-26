-- Run this AFTER supabase_schema.sql, in Supabase SQL Editor.
-- This fills your site with your real CV data instead of the placeholder demo content.
-- Safe to re-run: it clears and re-inserts experience/skills/projects, and updates the single profile row.

-- ========== PROFILE ==========
update profile set
  name = 'Mazen Ayman',
  role_line_1 = 'mobile app developer',
  role_line_2 = 'Flutter & Dart specialist',
  tagline = 'Computer Science student building responsive, clean-architecture mobile apps with Flutter and Dart.',
  currently_working_on = 'Lift Log (gym tracking app)',
  bio = E'Hello, I''m Mazen! I''m a Computer Science student at Ain Shams University (Information Systems Department) and a Junior Mobile Application Developer specializing in Flutter.\n\nI have experience building multiple mobile apps with Flutter and Dart, focusing on responsive UI, smooth UX, and clean code. I have a strong foundation in OOP, data structures, and database management, with hands-on experience across real-world projects — including apps built with clean architecture (UI, Cubit, Data Source layers), state management with Cubit/BLoC, and REST API integration.\n\nI earned a Flutter Development Certificate from Route Academy and I''m continuously improving my skills in mobile and backend development.',
  quote_text = 'With great power comes great electricity bill',
  quote_author = 'Dr. Who',
  email = 'mazenghaly034@gmail.com',
  phone = '+20 115 353 2383',
  university = 'Ain Shams University – Faculty of Computer and Information Sciences',
  location = 'Giza, Egypt',
  years_experience = '1+',
  projects_count = '11+',
  committed_percent = '100%',
  short_title = 'Mobile app developer and Flutter specialist',
  fun_facts = array[
    'B2 English Certificate holder',
    'Studying Information Systems at Ain Shams University',
    'Flutter Development Certificate from Route Academy'
  ]
where true;

-- ========== EXPERIENCE ==========
delete from experience;

insert into experience (role, company, date_range, points, sort_order) values
(
  'Flutter Developer Trainee', 'Route Academy', 'January 2026 - June 2026',
  array[
    'Built mobile applications using Flutter and Dart',
    'Developed responsive and user-friendly UI designs',
    'Applied OOP principles and clean code practices',
    'Worked with navigation, state management, and APIs',
    'Improved problem-solving and debugging skills through real projects'
  ],
  1
),
(
  'Mobile Development (Flutter) Intern', 'NTI (National Telecommunication Institute)', 'June 2026 - August 2026',
  array[
    'Built multiple Flutter apps (BMI Calculator, Notes, Meals, and LiftLog — a gym-tracking graduation project) using clean architecture (UI, Cubit, Data Source layers)',
    'Managed state with Cubit/BLoC and integrated local, remote, and RESTful API data sources for offline support and real-time sync',
    'Designed fully responsive UIs adaptable across screen sizes and devices'
  ],
  2
),
(
  'Front-End Developer Intern', 'Ain Shams University Summer Training', 'July 2024 - Present',
  array[
    'Built responsive web pages using Flexbox and Grid',
    'Tested and debugged websites for better performance',
    'Enhanced teamwork and project collaboration skills'
  ],
  3
);

-- ========== SKILLS ==========
delete from skills;

insert into skills (name, category) values
  ('Dart', 'Languages'),
  ('C++', 'Languages'),
  ('Java', 'Languages'),
  ('Python', 'Languages'),
  ('SQL', 'Languages'),
  ('JavaScript', 'Languages'),
  ('HTML', 'Languages'),
  ('CSS', 'Languages'),
  ('Flutter', 'Frameworks'),
  ('.NET', 'Frameworks'),
  ('Cubit / BLoC', 'Frameworks'),
  ('Git', 'Tools'),
  ('Firebase', 'Tools'),
  ('Hive', 'Tools'),
  ('Database Management', 'Other'),
  ('RESTful APIs', 'Other'),
  ('Clean Architecture', 'Other'),
  ('Teamwork', 'Soft Skills'),
  ('Problem Solving', 'Soft Skills'),
  ('Communication', 'Soft Skills'),
  ('Project Management', 'Soft Skills'),
  ('Flutter Development Certificate — Route Academy', 'Certifications'),
  ('B2 English Certificate — AUC', 'Certifications'),
  ('Fundamentals of Databases — Maharatak', 'Certifications'),
  ('Mobile App Development (Flutter) — NTI', 'Certifications');

-- ========== PROJECTS ==========
delete from projects;

insert into projects (title, description, tech_stack, group_name, is_featured, is_private, sort_order) values
  ('Lift Log', 'Comprehensive gym workout tracking app (graduation project) with clean architecture, local + remote data sources, REST API integration, and Firebase.', 'Flutter Dart Cubit Firebase REST', 'flutter-apps', true, false, 1),
  ('Evently', 'Event management mobile app focused on responsive UI, smooth UX, and clean code practices.', 'Flutter Dart', 'flutter-apps', true, false, 2),
  ('Solar System App – SpaceX', 'Displays the solar system with interactive 3D planet models, smooth UI, and animations.', 'Flutter Dart', 'flutter-apps', true, false, 3),
  ('Mini Facebook Clone', 'Social media mobile app with user authentication, login validation, responsive UI, and basic state handling.', 'Flutter Dart', 'flutter-apps', false, false, 4),
  ('News App', 'Mobile news application with real-time news fetching, clean UI, and organized news categories.', 'Flutter Dart', 'flutter-apps', false, false, 5),
  ('Islami App', 'Islamic mobile application featuring Quran, Azkar, prayer times, and a clean intuitive UI.', 'Flutter Dart', 'flutter-apps', false, false, 6),
  ('Contact App', 'Contact management app with Cubit state management and local persistence via Hive for offline storage.', 'Flutter Cubit Hive', 'flutter-apps', false, false, 7),
  ('Meals App', 'Meals discovery app integrating Firebase and RESTful APIs for real-time data, with Cubit-based state management.', 'Flutter Cubit Firebase REST', 'flutter-apps', false, false, 8),
  ('BMI App', 'BMI calculator app with Cubit state management and a clean, responsive UI.', 'Flutter Cubit', 'flutter-apps', false, false, 9),
  ('Notes App', 'Notes-taking app with Cubit state management and local persistence via Hive for offline storage.', 'Flutter Cubit Hive', 'flutter-apps', false, false, 10),
  ('Library Management System', 'Full-stack library management web app (college team project) with CRUD operations, user management, and database integration.', 'Node.js', 'web-projects', false, false, 11);
