# WeAreJobPilot.com - Complete Technical Specification & Deployment Package (Original Draft)

**Document Version:** 1.0  
**Last Updated:** December 2024  
**Project Status:** Production Ready  
**Platform:** Next.js 16 + Supabase + Stripe

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Tech Stack & Architecture](#tech-stack--architecture)
3. [Design System](#design-system)
4. [Database Schema](#database-schema)
5. [Environment Variables](#environment-variables)
6. [Project Structure](#project-structure)
7. [Installation Guide](#installation-guide)
8. [Deployment Checklist](#deployment-checklist)
9. [API Integrations](#api-integrations)
10. [Security & Compliance](#security--compliance)

---

## Executive Summary

WeAreJobPilot.com is an AI-powered job search and career navigation platform with an aviation-themed user experience. Built with enterprise-grade reliability featuring 20-step validation systems, real-time monitoring, and bulletproof error handling.

### Key Metrics
- **Target Users:** 100K+ within 12 months
- **Uptime:** 99.9% availability
- **Performance:** <2s global load time
- **Scalability:** 10,000+ concurrent users
- **Error Rate:** <0.1%

### Core Features
- AI-Powered Job Matching
- Aviation-Themed UX (Radar → Cockpit → Mission Control → Routeplanner)
- Comprehensive Procedure Engine
- AI Buddy System (Buddy, Coach, Manager, Lawyer personas)
- Real-time job market insights
- Document management & portfolio

---

## Tech Stack & Architecture

### Frontend Framework
```json
{
  "framework": "Next.js 16.0.7",
  "react": "19.2.0",
  "language": "TypeScript 5.x",
  "router": "App Router (app directory)",
  "deployment": "Vercel (Global CDN + Edge Computing)"
}
```

### UI & Styling
```json
{
  "css": "Tailwind CSS v4.1.9",
  "components": "Shadcn UI (Radix UI primitives)",
  "fonts": {
    "sans": "Geist",
    "mono": "Geist Mono"
  },
  "animations": "tailwindcss-animate + tw-animate-css",
  "themes": "next-themes (light/dark mode)",
  "icons": "lucide-react"
}
```

### Backend & Database
```json
{
  "database": "Supabase (PostgreSQL)",
  "auth": "Supabase Auth (JWT + OAuth)",
  "storage": "Supabase Storage",
  "realtime": "Supabase Realtime",
  "payments": "Stripe",
  "analytics": "@vercel/analytics"
}
```

### Key Dependencies
```json
{
  "form": "react-hook-form + zod + @hookform/resolvers",
  "charts": "recharts 2.15.4",
  "date": "date-fns 4.1.0 + react-day-picker 9.8.0",
  "ui-primitives": "@radix-ui/* (40+ components)",
  "notifications": "sonner",
  "carousel": "embla-carousel-react",
  "drawer": "vaul"
}
```

---

## Design System

### Color Palette

#### Light Mode (Primary Colors)
```css
:root {
  /* Backgrounds */
  --background: oklch(1 0 0);              /* Pure White */
  --card: oklch(1 0 0);                    /* Pure White */
  --popover: oklch(1 0 0);                 /* Pure White */
  
  /* Foregrounds (Text) */
  --foreground: oklch(0.145 0 0);          /* Near Black */
  --card-foreground: oklch(0.145 0 0);     /* Near Black */
  
  /* Primary (Brand Color) */
  --primary: oklch(0.205 0 0);             /* Dark Gray/Black */
  --primary-foreground: oklch(0.985 0 0);  /* Off-White */
  
  /* Secondary */
  --secondary: oklch(0.97 0 0);            /* Very Light Gray */
  --secondary-foreground: oklch(0.205 0 0);/* Dark Gray */
  
  /* Muted (Subtle Elements) */
  --muted: oklch(0.97 0 0);                /* Very Light Gray */
  --muted-foreground: oklch(0.556 0 0);    /* Medium Gray */
  
  /* Accent */
  --accent: oklch(0.97 0 0);               /* Very Light Gray */
  --accent-foreground: oklch(0.205 0 0);   /* Dark Gray */
  
  /* Destructive (Errors) */
  --destructive: oklch(0.577 0.245 27.325);/* Red */
  
  /* Borders & Inputs */
  --border: oklch(0.922 0 0);              /* Light Gray */
  --input: oklch(0.922 0 0);               /* Light Gray */
  --ring: oklch(0.708 0 0);                /* Medium Gray (Focus Ring) */
  
  /* Border Radius */
  --radius: 0.625rem;                      /* 10px */
}
```

#### Dark Mode
```css
.dark {
  /* Backgrounds */
  --background: oklch(0.145 0 0);          /* Near Black */
  --card: oklch(0.145 0 0);                /* Near Black */
  --popover: oklch(0.145 0 0);             /* Near Black */
  
  /* Foregrounds (Text) */
  --foreground: oklch(0.985 0 0);          /* Off-White */
  --card-foreground: oklch(0.985 0 0);     /* Off-White */
  
  /* Primary (Brand Color) */
  --primary: oklch(0.985 0 0);             /* Off-White */
  --primary-foreground: oklch(0.205 0 0);  /* Dark Gray */
  
  /* Secondary */
  --secondary: oklch(0.269 0 0);           /* Dark Gray */
  --secondary-foreground: oklch(0.985 0 0);/* Off-White */
  
  /* Muted */
  --muted: oklch(0.269 0 0);               /* Dark Gray */
  --muted-foreground: oklch(0.708 0 0);    /* Medium Gray */
  
  /* Borders & Inputs */
  --border: oklch(0.269 0 0);              /* Dark Gray */
  --input: oklch(0.269 0 0);               /* Dark Gray */
  --ring: oklch(0.439 0 0);                /* Medium Dark Gray */
}
```

#### Chart Colors
```css
/* Available in both light and dark mode */
--chart-1: oklch(0.646 0.222 41.116);  /* Orange */
--chart-2: oklch(0.6 0.118 184.704);   /* Teal */
--chart-3: oklch(0.398 0.07 227.392);  /* Blue */
--chart-4: oklch(0.828 0.189 84.429);  /* Yellow-Green */
--chart-5: oklch(0.769 0.188 70.08);   /* Yellow */
```

#### Sidebar Theme
```css
/* Light Mode Sidebar */
--sidebar: oklch(0.985 0 0);
--sidebar-foreground: oklch(0.145 0 0);
--sidebar-primary: oklch(0.205 0 0);
--sidebar-primary-foreground: oklch(0.985 0 0);

/* Dark Mode Sidebar */
--sidebar: oklch(0.205 0 0);
--sidebar-foreground: oklch(0.985 0 0);
--sidebar-primary: oklch(0.488 0.243 264.376);  /* Purple accent */
```

### Typography

#### Font Families
```css
@theme inline {
  --font-sans: 'Geist', 'Geist Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
}
```

#### Usage
```tsx
// Layout implementation
import { Geist, Geist_Mono } from 'next/font/google'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// Apply via className
<body className="font-sans antialiased">
```

#### Typography Scale (Tailwind)
```
text-xs    → 0.75rem (12px)
text-sm    → 0.875rem (14px)
text-base  → 1rem (16px)
text-lg    → 1.125rem (18px)
text-xl    → 1.25rem (20px)
text-2xl   → 1.5rem (24px)
text-3xl   → 1.875rem (30px)
text-4xl   → 2.25rem (36px)
text-5xl   → 3rem (48px)
```

### Spacing System
```
p-1  → 0.25rem (4px)
p-2  → 0.5rem (8px)
p-4  → 1rem (16px)
p-6  → 1.5rem (24px)
p-8  → 2rem (32px)
p-12 → 3rem (48px)
p-16 → 4rem (64px)
```

### Border Radius
```
rounded-sm  → calc(var(--radius) - 4px)  [6px]
rounded-md  → calc(var(--radius) - 2px)  [8px]
rounded-lg  → var(--radius)              [10px]
rounded-xl  → calc(var(--radius) + 4px)  [14px]
rounded-full → 9999px
```

### Component Styling Patterns

#### Buttons
```tsx
// Primary Button
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Primary Action
</Button>

// Secondary Button
<Button variant="secondary" className="bg-secondary text-secondary-foreground">
  Secondary Action
</Button>

// Destructive Button
<Button variant="destructive">Delete</Button>
```

#### Cards
```tsx
<Card className="bg-card text-card-foreground border-border">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

---

## Database Schema

### Supabase Configuration

#### Connection Details
```env
SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_JWT_SECRET=your_supabase_jwt_secret

POSTGRES_URL=your_postgres_connection_string
POSTGRES_PRISMA_URL=your_postgres_prisma_connection_string
POSTGRES_URL_NON_POOLING=your_postgres_non_pooling_connection_string
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DATABASE=your_postgres_database
POSTGRES_HOST=your_postgres_host
```

### Database Tables Schema

#### 1. User Profiles Table
```sql
-- scripts/001_create_profiles.sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  avatar_url text,
  bio text,
  phone text,
  location text,
  skills text[],
  experience_level text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- RLS Policies
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- Create indexes for performance
create index profiles_user_id_idx on public.profiles(id);
```

#### 2. Auto-Create Profile Trigger
```sql
-- scripts/002_profile_trigger.sql
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', null),
    coalesce(new.raw_user_meta_data ->> 'last_name', null)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
```

#### 3. Jobs Table
```sql
-- scripts/003_create_jobs.sql
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text,
  job_type text, -- 'full-time', 'part-time', 'contract', 'remote'
  description text not null,
  requirements text[],
  salary_range text,
  industry text,
  posted_by uuid references public.profiles(id) on delete cascade,
  status text default 'active', -- 'active', 'closed', 'draft'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.jobs enable row level security;

-- Anyone can view active jobs
create policy "jobs_select_active"
  on public.jobs for select
  using (status = 'active');

-- Only job owner can update
create policy "jobs_update_own"
  on public.jobs for update
  using (auth.uid() = posted_by);

-- Only job owner can delete
create policy "jobs_delete_own"
  on public.jobs for delete
  using (auth.uid() = posted_by);

-- Authenticated users can create jobs
create policy "jobs_insert_authenticated"
  on public.jobs for insert
  with check (auth.uid() = posted_by);

create index jobs_status_idx on public.jobs(status);
create index jobs_industry_idx on public.jobs(industry);
create index jobs_posted_by_idx on public.jobs(posted_by);
```

#### 4. Job Applications Table
```sql
-- scripts/004_create_applications.sql
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete cascade not null,
  applicant_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'pending', -- 'pending', 'reviewing', 'interview', 'accepted', 'rejected'
  cover_letter text,
  resume_url text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(job_id, applicant_id) -- One application per user per job
);

alter table public.applications enable row level security;

-- Applicants can view their own applications
create policy "applications_select_own"
  on public.applications for select
  using (auth.uid() = applicant_id);

-- Job owners can view applications for their jobs
create policy "applications_select_job_owner"
  on public.applications for select
  using (
    exists (
      select 1 from public.jobs
      where jobs.id = applications.job_id
      and jobs.posted_by = auth.uid()
    )
  );

-- Authenticated users can create applications
create policy "applications_insert_own"
  on public.applications for insert
  with check (auth.uid() = applicant_id);

-- Applicants can update their own applications
create policy "applications_update_own"
  on public.applications for update
  using (auth.uid() = applicant_id);

-- Job owners can update application status
create policy "applications_update_job_owner"
  on public.applications for update
  using (
    exists (
      select 1 from public.jobs
      where jobs.id = applications.job_id
      and jobs.posted_by = auth.uid()
    )
  );

create index applications_job_id_idx on public.applications(job_id);
create index applications_applicant_id_idx on public.applications(applicant_id);
create index applications_status_idx on public.applications(status);
```

#### 5. User Documents Table
```sql
-- scripts/005_create_documents.sql
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  document_type text not null, -- 'resume', 'cover_letter', 'portfolio', 'certificate'
  title text not null,
  file_url text not null,
  file_size integer,
  file_type text,
  is_primary boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.documents enable row level security;

-- Users can manage their own documents
create policy "documents_select_own"
  on public.documents for select
  using (auth.uid() = user_id);

create policy "documents_insert_own"
  on public.documents for insert
  with check (auth.uid() = user_id);

create policy "documents_update_own"
  on public.documents for update
  using (auth.uid() = user_id);

create policy "documents_delete_own"
  on public.documents for delete
  using (auth.uid() = user_id);

create index documents_user_id_idx on public.documents(user_id);
create index documents_document_type_idx on public.documents(document_type);
```

#### 6. AI Chat History Table
```sql
-- scripts/006_create_chat_history.sql
create table if not exists public.chat_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  ai_persona text not null, -- 'buddy', 'coach', 'manager', 'lawyer'
  message_role text not null, -- 'user', 'assistant'
  message_content text not null,
  session_id uuid not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.chat_history enable row level security;

-- Users can view their own chat history
create policy "chat_history_select_own"
  on public.chat_history for select
  using (auth.uid() = user_id);

-- Users can insert their own messages
create policy "chat_history_insert_own"
  on public.chat_history for insert
  with check (auth.uid() = user_id);

create index chat_history_user_id_idx on public.chat_history(user_id);
create index chat_history_session_id_idx on public.chat_history(session_id);
create index chat_history_created_at_idx on public.chat_history(created_at desc);
```

---

## Environment Variables

### Required Environment Variables

#### Supabase (Database & Auth)
```env
# Public Supabase URLs (client-side safe)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Server-side Supabase variables
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_JWT_SECRET=your-jwt-secret

# PostgreSQL Direct Connection
POSTGRES_URL=postgresql://postgres:[PASSWORD]@xxxxx.supabase.co:5432/postgres
POSTGRES_PRISMA_URL=postgresql://postgres:[PASSWORD]@xxxxx.supabase.co:5432/postgres?pgbouncer=true
POSTGRES_URL_NON_POOLING=postgresql://postgres:[PASSWORD]@xxxxx.supabase.co:5432/postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=postgres
POSTGRES_HOST=xxxxx.supabase.co
```

#### Stripe (Payments)
```env
# Public Stripe Keys (client-side safe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Server-side Stripe Keys (NEVER expose to client)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_MCP_KEY=sk_test_...

# Stripe Webhooks
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Product IDs
STRIPE_PRO_PRICE_ID=price_...
PADDLE_SCREENING_PRICE_ID=price_...
```

#### Application Configuration
```env
# Base URL (for OAuth redirects, emails, etc.)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Development redirect URL for Supabase auth
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback

# Build configuration
ANALYZE=false
CI=false
```

#### Email (Optional - for transactional emails)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### AI Integration (Optional - if using OpenAI)
```env
OPENAI_API_KEY=sk-...
```

#### Paddle (Alternative Payment Provider)
```env
PADDLE_API_KEY=your_paddle_api_key
PADDLE_WEBHOOK_SECRET=your_paddle_webhook_secret
PADDLE_ENVIRONMENT=sandbox # or 'production'
```

### Environment Variable Setup Instructions

#### For Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Link your project
vercel link

# Add environment variables
vercel env add SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_URL
# ... repeat for all variables

# Or import from .env file
vercel env pull .env.local
```

#### For Local Development
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local with your values
nano .env.local
```

---

## Project Structure

```
vizify/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with fonts & metadata
│   ├── globals.css              # Global styles + design tokens
│   ├── page.tsx                 # Homepage (not created yet)
│   ├── auth/                    # Authentication pages
│   │   ├── login/
│   │   ├── sign-up/
│   │   └── callback/
│   ├── dashboard/               # User dashboard
│   ├── jobs/                    # Job listings & details
│   ├── profile/                 # User profile pages
│   ├── applications/            # Application management
│   └── api/                     # API routes
│       ├── auth/
│       ├── jobs/
│       └── applications/
│
├── components/                   # React components
│   ├── ui/                      # Shadcn UI components (56 components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── ... (50+ more)
│   ├── theme-provider.tsx       # Dark/light mode provider
│   └── [custom components]      # Your app-specific components
│
├── lib/                         # Utility functions
│   ├── utils.ts                 # cn() function + helpers
│   ├── supabase/               # Supabase clients
│   │   ├── client.ts           # Browser client
│   │   ├── server.ts           # Server client
│   │   └── proxy.ts            # Middleware helper
│   └── stripe/                 # Stripe utilities
│       └── stripe.ts
│
├── hooks/                       # Custom React hooks
│   ├── use-mobile.ts           # Mobile detection
│   └── use-toast.ts            # Toast notifications
│
├── public/                      # Static assets
│   ├── icon.svg
│   ├── icon-light-32x32.png
│   ├── icon-dark-32x32.png
│   ├── apple-icon.png
│   ├── placeholder.svg
│   └── placeholder-logo.svg
│
├── scripts/                     # Database scripts
│   ├── 001_create_profiles.sql
│   ├── 002_profile_trigger.sql
│   ├── 003_create_jobs.sql
│   ├── 004_create_applications.sql
│   ├── 005_create_documents.sql
│   └── 006_create_chat_history.sql
│
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
├── postcss.config.mjs          # PostCSS config
├── components.json             # Shadcn config
├── .env.local                  # Local environment variables
└── README.md                   # Project documentation
```

---

## Installation Guide

### Prerequisites
```bash
Node.js >= 18.x
pnpm >= 8.x (or npm/yarn)
Git
Supabase Account
Stripe Account (optional)
```

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/vizify.git
cd vizify
```

### Step 2: Install Dependencies
```bash
pnpm install
# or
npm install
# or
yarn install
```

### Step 3: Setup Supabase

#### 3.1 Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in project details
4. Wait for database to initialize

#### 3.2 Get Supabase Credentials
1. Go to Project Settings → API
2. Copy Project URL
3. Copy anon/public key
4. Copy service_role key

#### 3.3 Run Database Migrations
1. Go to SQL Editor in Supabase Dashboard
2. Run each script from `scripts/` folder in order:
   - 001_create_profiles.sql
   - 002_profile_trigger.sql
   - 003_create_jobs.sql
   - 004_create_applications.sql
   - 005_create_documents.sql
   - 006_create_chat_history.sql

### Step 4: Setup Stripe (Optional)

#### 4.1 Create Stripe Account
1. Go to https://stripe.com
2. Create account or sign in
3. Switch to Test Mode

#### 4.2 Get Stripe Keys
1. Go to Developers → API keys
2. Copy Publishable key
3. Copy Secret key
4. Create webhook endpoint for `/api/webhooks/stripe`

### Step 5: Configure Environment Variables
```bash
# Copy example env file
cp .env.example .env.local

# Edit with your credentials
nano .env.local
```

### Step 6: Run Development Server
```bash
pnpm dev
# or
npm run dev

# Open http://localhost:3000
```

### Step 7: Build for Production
```bash
pnpm build
pnpm start

# Or deploy to Vercel
vercel deploy
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] All environment variables configured in Vercel
- [ ] Database migrations run in production Supabase
- [ ] Supabase RLS policies tested and verified
- [ ] Stripe webhook endpoint configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Analytics configured (@vercel/analytics)

### Supabase Production Setup

- [ ] Enable email confirmations in Auth settings
- [ ] Configure email templates
- [ ] Set up custom SMTP (optional)
- [ ] Configure OAuth providers (Google, GitHub, etc.)
- [ ] Enable 2FA for admin accounts
- [ ] Set up database backups
- [ ] Configure database connection pooling
- [ ] Review and test all RLS policies

### Stripe Production Setup

- [ ] Switch to Live mode
- [ ] Update STRIPE_SECRET_KEY with live key
- [ ] Update STRIPE_PUBLISHABLE_KEY with live key
- [ ] Configure production webhook endpoint
- [ ] Test payment flows in production
- [ ] Set up customer portal
- [ ] Configure subscription plans

### Security Checklist

- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables secured (never in client code)
- [ ] RLS enabled on all tables
- [ ] API routes protected with auth checks
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Input validation on all forms
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection (React auto-escapes)
- [ ] CSRF protection for mutations

### Performance Checklist

- [ ] Images optimized (next/image)
- [ ] Fonts optimized (next/font)
- [ ] Code splitting configured
- [ ] Tree shaking enabled
- [ ] Bundle size analyzed
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing
- [ ] CDN caching configured
- [ ] Database indexes created

### Monitoring & Analytics

- [ ] Vercel Analytics enabled
- [ ] Error tracking active
- [ ] Uptime monitoring configured
- [ ] Performance monitoring active
- [ ] User behavior analytics
- [ ] Database query performance monitoring

---

## API Integrations

### Supabase Client Setup

#### Browser Client
```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

#### Server Client
```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie errors
          }
        },
        remove(name: string, options) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookie errors
          }
        },
      },
    }
  )
}
```

#### Middleware (Token Refresh)
```typescript
// proxy.ts or middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### Stripe Integration

```typescript
// lib/stripe/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

// Create checkout session
export async function createCheckoutSession(
  priceId: string,
  userId: string,
  customerEmail: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: customerEmail,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
    metadata: {
      userId,
    },
  })

  return session
}
```

---

## Security & Compliance

### Row Level Security (RLS) Best Practices

1. **Enable RLS on ALL tables**
```sql
alter table public.your_table enable row level security;
```

2. **Create specific policies** (never use `using (true)`)
```sql
-- Good: Specific policy
create policy "users_can_view_own_data"
  on public.profiles for select
  using (auth.uid() = id);

-- Bad: Too permissive
create policy "allow_all"
  on public.profiles for select
  using (true);
```

3. **Test policies thoroughly**
```sql
-- Test as different users
set local role authenticated;
set request.jwt.claim.sub to 'user-uuid';
select * from profiles; -- Should only see own data
```

### Authentication Security

- **JWT Expiration:** Tokens expire after 1 hour
- **Refresh Tokens:** Automatically refreshed in middleware
- **Session Storage:** HTTP-only cookies (not localStorage)
- **Password Requirements:** Enforced by Supabase (min 6 chars)
- **Email Verification:** Required before access

### GDPR Compliance

- User data export functionality
- Right to be forgotten (cascade deletes)
- Consent tracking
- Data retention policies
- Privacy policy & terms of service

### Data Encryption

- **In Transit:** TLS 1.3 (HTTPS)
- **At Rest:** AES-256 encryption (Supabase default)
- **Passwords:** bcrypt hashing (Supabase Auth)
- **API Keys:** Never exposed to client

---

## Performance Optimization

### Next.js 16 Features

```typescript
// app/page.tsx - Use cache directive for better performance
'use cache'

export default async function HomePage() {
  // This page will be cached
  return <div>Content</div>
}
```

### Image Optimization

```tsx
import Image from 'next/image'

<Image
  src="/profile-picture.jpg"
  alt="User Profile"
  width={200}
  height={200}
  priority={false}  // Only true for above-fold images
  loading="lazy"
  placeholder="blur"
/>
```

### Font Optimization

```tsx
// Already configured in layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({ 
  subsets: ["latin"],
  display: 'swap',  // Prevents invisible text
})
```

### Database Query Optimization

```typescript
// Use indexes for frequently queried columns
create index jobs_status_idx on public.jobs(status);
create index jobs_created_at_idx on public.jobs(created_at desc);

// Select only needed columns
const { data } = await supabase
  .from('jobs')
  .select('id, title, company')  // Not select('*')
  .eq('status', 'active')
  .limit(20)
```

---

## Support & Resources

### Documentation Links

- **Next.js 16:** https://nextjs.org/docs
- **Supabase:** https://supabase.com/docs
- **Stripe:** https://stripe.com/docs
- **Shadcn UI:** https://ui.shadcn.com
- **Tailwind CSS:** https://tailwindcss.com/docs

### Contact

- **Technical Support:** tech@wearejobpilot.com
- **Partnership Inquiries:** partnerships@wearejobpilot.com
- **Marketing:** marketing@wearejobpilot.com

---

## License & Copyright

```
© 2025 WeAreJobPilot.com
All Rights Reserved

This document is proprietary and confidential.
Unauthorized distribution is prohibited.
```

---

## Changelog

### Version 1.0 (December 2024)
- Initial technical specification
- Complete database schema
- Supabase + Stripe integration
- Design system documentation
- Deployment guide

---

**END OF DOCUMENT**
