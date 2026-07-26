# Elias Portfolio — React + Supabase

بورتفوليو React متصل بـ Supabase (Auth + Database)، بنفس تصميم الـ Figma reference، مع أنيميشن وصفحة Admin لإدارة المحتوى.

## 1) تثبيت المشروع (على جهازك، لازم Node.js 18+)

```bash
npm install
```

الـ `.env` جاهز فيه بيانات الـ Supabase بتاعتك بالفعل (URL + anon key).

## 2) إنشاء الجداول في Supabase

1. افتح مشروعك في [supabase.com/dashboard](https://supabase.com/dashboard)
2. من القائمة الجانبية: **SQL Editor** → **New query**
3. افتح ملف `supabase_schema.sql` من المشروع، انسخ محتواه، الصقه، ودوس **Run**
4. ده هيعمل الجداول: `profile`, `projects`, `skills`, `contact_messages` + صلاحيات (Row Level Security) + بيانات تجريبية (starter data) تقدر تعدلها من الأدمن

## 3) إنشاء حساب الأدمن (إنت بس اللي تقدر تعدل)

1. من القائمة الجانبية في Supabase: **Authentication** → **Users** → **Add user**
2. حط إيميلك وباسورد (فعّل "Auto Confirm User")
3. ده هو الحساب اللي هتسجل بيه دخول على `/admin/login`

## 4) تشغيل المشروع محليًا

```bash
npm run dev
```

هيفتح على `http://localhost:5173`. صفحة الأدمن على `/admin/login`.

## 5) رفع صورتك المفرغة (transparent PNG)

- فرّغ خلفية صورتك (فيه مواقع زي remove.bg، أو ابعتهالي أنا وهعملها)
- ارفعها لأي مكان استضافة صور (مثلاً Supabase Storage، أو Imgur، أو GitHub)، وحط اللينك في حقل **Hero photo URL** و **About section photo URL** من صفحة الأدمن → تاب Profile

### (اختياري) استخدام Supabase Storage للصور
1. في Supabase: **Storage** → **New bucket** → اسمه مثلاً `portfolio-assets` → خليه **Public**
2. ارفع الصورة، وانسخ الـ Public URL، وحطه في الأدمن

## 6) لينكات المشاريع

كل مشروع من صفحة الأدمن فيه حقول: `live_url`, `demo_url`, `github_url`, `cached_url`, `figma_url`, `linkedin_url` — املا اللي محتاجه بس وهيظهر كزرار لينك في الكارد.

## 7) الديبلوي (نشر الموقع)

أسهل حاجة: [Vercel](https://vercel.com) أو [Netlify](https://netlify.com)

1. ارفع المشروع على GitHub
2. من Vercel/Netlify: **Import project** من الريبو
3. حط الـ Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy

بعد كده هيبقى عندك لينك تحطه في LinkedIn/GitHub bio.

## هيكل المشروع

```
src/
  components/   # Navbar, Hero, ProjectCard, Contact, ...
  pages/        # Home, Projects
  pages/admin/  # Login, Dashboard, ProfileEditor, ProjectsEditor, SkillsEditor, Messages
  context/      # AuthContext (Supabase session)
  hooks/        # usePortfolioData (fetches profile/projects/skills)
  lib/          # supabaseClient.js
supabase_schema.sql   # شغله مرة واحدة في Supabase SQL Editor
```

## ملاحظة أمان

الـ anon key اللي بعتهولي (اللي في `.env`) دي مصممة تتحط في الفرونت اند وتبقى عامة — مش سيرية، والحماية الحقيقية بتيجي من الـ Row Level Security (RLS) policies اللي في `supabase_schema.sql`، فبس محدش غيرك يقدر يعدل الداتا غير بعد ما يعمل login بالحساب اللي عملته في الخطوة 3.
