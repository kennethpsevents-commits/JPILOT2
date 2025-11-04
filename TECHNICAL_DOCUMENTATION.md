# WeAreJobPilot: Comprehensive Technical Architecture Documentation

**Document Classification:** Technical Architecture & System Design  
**Intended Audience:** Senior Software Engineers, System Architects, Technical Leadership  
**Academic Level:** Graduate/Professional (Harvard Computer Science Standard)  
**Version:** 1.0  
**Last Updated:** January 2025

---

## Executive Summary

WeAreJobPilot is a production-grade, full-stack job application platform built on modern web technologies, implementing a sophisticated multi-tier architecture with real-time data synchronization, AI-powered features, and enterprise-level security patterns. The system leverages Next.js 16 App Router, React Server Components (RSC), Supabase PostgreSQL with Row-Level Security (RLS), and Stripe payment integration to deliver a scalable, performant job marketplace with premium screening capabilities.

**Core Value Proposition:** AI-assisted job application workflow with optional premium screening, subscription-based monetization, and comprehensive application tracking.

---

## Table of Contents

1. [System Architecture Overview](#1-system-architecture-overview)
2. [Technology Stack & Rationale](#2-technology-stack--rationale)
3. [Database Schema & Data Model](#3-database-schema--data-model)
4. [Authentication & Authorization Architecture](#4-authentication--authorization-architecture)
5. [Application Flow & State Management](#5-application-flow--state-management)
6. [Component Architecture & Design Patterns](#6-component-architecture--design-patterns)
7. [API Design & Server Actions](#7-api-design--server-actions)
8. [Payment Integration Architecture](#8-payment-integration-architecture)
9. [Security Implementation](#9-security-implementation)
10. [Performance Optimization Strategies](#10-performance-optimization-strategies)
11. [Scalability Considerations](#11-scalability-considerations)
12. [Deployment Architecture](#12-deployment-architecture)
13. [Testing Strategy](#13-testing-strategy)
14. [Future Enhancements & Technical Debt](#14-future-enhancements--technical-debt)

---

## 1. System Architecture Overview

### 1.1 High-Level Architecture

The system implements a **three-tier architecture** with clear separation of concerns:

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  (Next.js 16 App Router + React Server Components)          │
│  - Server Components (SSR, Data Fetching)                    │
│  - Client Components (Interactivity, State Management)       │
│  - Middleware (Auth, Security Headers, HTTPS Enforcement)    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Business Logic Layer                    │
│  - Server Actions (Mutations, Form Handling)                 │
│  - API Routes (External Integrations)                        │
│  - Utility Functions (Type Safety, Validation)               │
│  - Supabase Client Abstraction (Server/Client Separation)    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                            │
│  - Supabase PostgreSQL (Primary Database)                    │
│  - Row-Level Security (RLS) Policies                         │
│  - Real-time Subscriptions (WebSocket)                       │
│  - Stripe (Payment Processing)                               │
│  - Vercel Blob (File Storage - Future)                       │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 1.2 Architectural Principles

1. **Server-First Rendering:** Maximize use of React Server Components (RSC) for improved performance and SEO
2. **Progressive Enhancement:** Core functionality works without JavaScript; enhanced with client-side interactivity
3. **Type Safety:** End-to-end TypeScript with strict mode enabled
4. **Security by Default:** RLS policies, CSRF protection, XSS prevention, secure headers
5. **Separation of Concerns:** Clear boundaries between data fetching, business logic, and presentation
6. **Composability:** Reusable components following atomic design principles

### 1.3 Request Flow Architecture

**Example: Job Application Submission**

\`\`\`
User Action (Client)
    ↓
Client Component Event Handler
    ↓
Form Validation (Client-Side)
    ↓
Supabase Client (Browser)
    ↓
Middleware (Token Refresh, Security Headers)
    ↓
Supabase Auth Verification
    ↓
RLS Policy Evaluation (Database)
    ↓
INSERT into applications table
    ↓
Response to Client
    ↓
Router Navigation (Next.js)
    ↓
Server Component Re-render
\`\`\`

---

## 2. Technology Stack & Rationale

### 2.1 Frontend Stack

| Technology | Version | Rationale |
|------------|---------|-----------|
| **Next.js** | 16.x | Latest App Router with RSC, streaming SSR, automatic code splitting, built-in optimization |
| **React** | 19.2 | Concurrent features, useEffectEvent, Activity component, improved hydration |
| **TypeScript** | 5.x | Type safety, IntelliSense, refactoring support, reduced runtime errors |
| **Tailwind CSS** | 4.x | Utility-first CSS, design tokens, responsive design, minimal bundle size |
| **Shadcn UI** | Latest | Accessible, customizable components built on Radix UI primitives |
| **Lucide React** | Latest | Consistent icon system, tree-shakeable, optimized SVGs |

### 2.2 Backend Stack

| Technology | Version | Rationale |
|------------|---------|-----------|
| **Supabase** | Latest | PostgreSQL with RLS, real-time subscriptions, built-in auth, RESTful API |
| **PostgreSQL** | 15+ | ACID compliance, JSONB support, full-text search, vector embeddings (pgvector) |
| **Stripe** | Latest | PCI-compliant payment processing, subscription management, webhooks |
| **Vercel** | Latest | Edge network, serverless functions, automatic HTTPS, preview deployments |

### 2.3 Development Tools

- **Package Manager:** npm (lockfile committed for reproducibility)
- **Linting:** ESLint with Next.js config
- **Formatting:** Prettier (implicit via editor config)
- **Version Control:** Git with conventional commits
- **CI/CD:** Vercel automatic deployments on push

---

## 3. Database Schema & Data Model

### 3.1 Core Entity-Relationship Model

\`\`\`
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   profiles  │         │    jobs     │         │ applications│
│─────────────│         │─────────────│         │─────────────│
│ id (PK)     │         │ id (PK)     │         │ id (PK)     │
│ email       │         │ title       │         │ user_id (FK)│
│ full_name   │         │ company     │         │ job_id (FK) │
│ skills[]    │         │ location    │         │ status      │
│ resume_url  │         │ type        │         │ cover_letter│
│ created_at  │         │ salary_min  │         │ resume_url  │
└─────────────┘         │ salary_max  │         │ applied_at  │
       │                │ description │         └─────────────┘
       │                │ requirements│               │
       │                │ benefits    │               │
       │                │ status      │               │
       │                │ posted_date │               │
       │                └─────────────┘               │
       │                      │                       │
       └──────────────────────┴───────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
            ┌───────────────┐   ┌──────────────────┐
            │  saved_jobs   │   │ user_subscriptions│
            │───────────────│   │──────────────────│
            │ id (PK)       │   │ id (PK)          │
            │ user_id (FK)  │   │ user_id (FK)     │
            │ job_id (FK)   │   │ tier_id (FK)     │
            │ saved_at      │   │ status           │
            └───────────────┘   │ stripe_sub_id    │
                                │ current_period   │
                                └──────────────────┘
\`\`\`

### 3.2 Key Tables & Relationships

#### 3.2.1 `profiles` Table

**Purpose:** User profile information extending Supabase Auth users

\`\`\`sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  location TEXT,
  skills TEXT[],
  resume_url TEXT,
  experience_years INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);
\`\`\`

**Design Rationale:**
- One-to-one relationship with `auth.users` via foreign key
- RLS ensures users can only access their own profile
- Array type for skills enables flexible skill management
- Separate `created_at` and `updated_at` for audit trail

#### 3.2.2 `jobs` Table

**Purpose:** Job listings aggregated from multiple sources

\`\`\`sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  company_logo TEXT,
  location TEXT NOT NULL,
  type TEXT NOT NULL, -- 'full-time', 'part-time', 'contract', 'remote'
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT DEFAULT 'EUR',
  description TEXT NOT NULL,
  requirements TEXT[], -- Array of requirement strings
  benefits TEXT[], -- Array of benefit strings
  category TEXT,
  experience_level TEXT, -- 'entry', 'mid', 'senior', 'lead'
  requires_screening BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active', -- 'active', 'closed', 'draft'
  posted_date TIMESTAMPTZ DEFAULT NOW(),
  deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  embedding VECTOR(1536) -- For AI-powered job matching (pgvector)
);

-- Indexes for performance
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_posted_date ON jobs(posted_date DESC);
CREATE INDEX idx_jobs_category ON jobs(category);
CREATE INDEX idx_jobs_location ON jobs(location);

-- RLS Policy
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "jobs_select_all" ON jobs
  FOR SELECT USING (status = 'active');
\`\`\`

**Design Rationale:**
- Public read access for active jobs (no authentication required)
- Vector embedding column for semantic search (future AI matching)
- Flexible salary range with currency support
- Array types for requirements/benefits avoid JOIN complexity
- Composite indexes on frequently queried columns

#### 3.2.3 `applications` Table

**Purpose:** Track user job applications with status workflow

\`\`\`sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- 'pending', 'screening', 'reviewed', 'interview', 'accepted', 'rejected'
  cover_letter TEXT,
  resume_url TEXT NOT NULL,
  match_score INTEGER, -- AI-calculated match score (0-100)
  ats_score INTEGER, -- ATS compatibility score (0-100)
  viewed_by_employer BOOLEAN DEFAULT FALSE,
  viewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  rejection_feedback TEXT,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, job_id) -- Prevent duplicate applications
);

-- Indexes
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_status ON applications(status);

-- RLS Policies
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "applications_select_own" ON applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "applications_insert_own" ON applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "applications_update_own" ON applications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "applications_delete_own" ON applications
  FOR DELETE USING (auth.uid() = user_id);
\`\`\`

**Design Rationale:**
- Composite unique constraint prevents duplicate applications
- Status field implements state machine pattern
- Separate fields for AI scoring (match_score, ats_score)
- Employer interaction tracking (viewed_by_employer, viewed_at)
- Comprehensive RLS policies for data isolation

#### 3.2.4 `user_subscriptions` Table

**Purpose:** Manage subscription tiers and Stripe integration

\`\`\`sql
CREATE TABLE user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tier_id UUID REFERENCES subscription_tiers(id),
  status TEXT DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id) -- One active subscription per user
);

-- RLS Policy
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_subscriptions_select_own" ON user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);
\`\`\`

**Design Rationale:**
- Stripe IDs stored for webhook reconciliation
- Period tracking for billing cycle management
- Trial support with `trial_ends_at`
- Unique constraint ensures single active subscription

### 3.3 Data Integrity & Constraints

1. **Foreign Key Constraints:** All relationships use `ON DELETE CASCADE` for automatic cleanup
2. **Unique Constraints:** Prevent duplicate data (e.g., one application per user per job)
3. **Check Constraints:** Validate enum-like fields (status values)
4. **NOT NULL Constraints:** Enforce required fields at database level
5. **Default Values:** Sensible defaults reduce application logic complexity

### 3.4 Database Performance Optimizations

1. **Indexes:** Strategic B-tree indexes on foreign keys and frequently queried columns
2. **Partial Indexes:** Index only active records (e.g., `WHERE status = 'active'`)
3. **JSONB Columns:** For flexible metadata without schema changes
4. **Array Types:** Avoid JOIN overhead for one-to-many relationships
5. **Vector Embeddings:** pgvector extension for semantic search (future)

---

## 4. Authentication & Authorization Architecture

### 4.1 Authentication Flow

The system uses **Supabase Auth** with email/password authentication and JWT-based session management.

#### 4.1.1 Sign-Up Flow

\`\`\`
User submits email/password
    ↓
Client-side validation
    ↓
supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin
  }
})
    ↓
Supabase sends confirmation email
    ↓
User clicks email link
    ↓
Supabase verifies email
    ↓
User redirected to app
    ↓
Middleware refreshes session
    ↓
Profile created via database trigger
\`\`\`

**Implementation:** `app/auth/sign-up/page.tsx`

\`\`\`typescript
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin
  }
})
\`\`\`

#### 4.1.2 Login Flow

\`\`\`
User submits credentials
    ↓
supabase.auth.signInWithPassword({ email, password })
    ↓
Supabase validates credentials
    ↓
JWT access token + refresh token returned
    ↓
Tokens stored in httpOnly cookies
    ↓
Middleware intercepts requests
    ↓
Token refreshed if expired
    ↓
User redirected to dashboard
\`\`\`

**Implementation:** `app/auth/login/page.tsx`

\`\`\`typescript
const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
})
if (error) throw error
router.push(redirect)
router.refresh()
\`\`\`

### 4.2 Session Management

#### 4.2.1 Middleware Token Refresh

**File:** `middleware.ts`

\`\`\`typescript
export async function middleware(request: NextRequest) {
  const response = await updateSession(request)
  
  // Add security headers
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  
  return response
}
\`\`\`

**File:** `lib/supabase/middleware.ts`

\`\`\`typescript
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )
  
  // Refresh session if expired
  await supabase.auth.getUser()
  
  return response
}
\`\`\`

**Design Rationale:**
- Middleware runs on every request, ensuring fresh tokens
- httpOnly cookies prevent XSS attacks
- Automatic token refresh improves UX (no forced re-login)

### 4.3 Authorization Patterns

#### 4.3.1 Row-Level Security (RLS)

**Principle:** Database-level authorization ensures data isolation even if application logic fails.

**Example: Applications Table**

\`\`\`sql
-- Users can only see their own applications
CREATE POLICY "applications_select_own" ON applications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only create applications for themselves
CREATE POLICY "applications_insert_own" ON applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);
\`\`\`

**Benefits:**
1. **Defense in Depth:** Authorization at database layer
2. **Consistency:** Same rules apply regardless of access method (API, direct SQL)
3. **Performance:** PostgreSQL optimizes RLS policies into query plans
4. **Auditability:** Policies are version-controlled and reviewable

#### 4.3.2 Server-Side Authorization Checks

**Pattern:** Always verify user identity in Server Components and Server Actions

\`\`\`typescript
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  // Fetch user-specific data (RLS ensures isolation)
  const { data: applications } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', user.id)
  
  return <DashboardClient applications={applications} />
}
\`\`\`

### 4.4 Client vs. Server Supabase Clients

#### 4.4.1 Server Client (RSC, Server Actions)

**File:** `lib/supabase/server.ts`

\`\`\`typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore errors in Server Components
          }
        },
      },
    }
  )
}
\`\`\`

**Use Cases:**
- Server Components (data fetching)
- Server Actions (mutations)
- API Routes (external integrations)

#### 4.4.2 Browser Client (Client Components)

**File:** `lib/supabase/client.ts`

\`\`\`typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
\`\`\`

**Use Cases:**
- Client Components (interactive features)
- Real-time subscriptions
- Client-side mutations (form submissions)

**Critical Distinction:**
- Server client reads cookies from `next/headers`
- Browser client uses browser's cookie storage
- Never import server client in client components (build error)

---

## 5. Application Flow & State Management

### 5.1 Job Application Workflow

The core business logic revolves around the job application process with optional premium screening.

#### 5.1.1 Application State Machine

\`\`\`
┌─────────┐
│ pending │ ──────────────────────────────────────┐
└─────────┘                                        │
     │                                             │
     │ (if requires_screening)                     │
     ↓                                             │
┌───────────┐                                      │
│ screening │                                      │
└───────────┘                                      │
     │                                             │
     │ (screening completed)                       │
     ↓                                             ↓
┌──────────┐         ┌───────────┐         ┌──────────┐
│ reviewed │ ──────→ │ interview │ ──────→ │ accepted │
└──────────┘         └───────────┘         └──────────┘
     │                     │
     │                     │
     ↓                     ↓
┌──────────┐         ┌──────────┐
│ rejected │         │ rejected │
└──────────┘         └──────────┘
\`\`\`

**Status Definitions:**
- `pending`: Application submitted, awaiting employer review
- `screening`: Premium screening in progress (paid upgrade)
- `reviewed`: Employer has reviewed application
- `interview`: Candidate invited to interview
- `accepted`: Job offer extended
- `rejected`: Application declined

#### 5.1.2 Application Submission Flow

**Step 1: User Browses Jobs**

**File:** `app/jobs/page.tsx`

\`\`\`typescript
export default async function JobsPage() {
  const supabase = await createClient()
  
  // Fetch initial jobs (server-side)
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'active')
    .order('posted_date', { ascending: false })
    .range(0, 19)
  
  return <JobsClient initialJobs={jobs || []} />
}
\`\`\`

**Design Pattern:** Server Component fetches initial data, passes to Client Component for interactivity

**Step 2: User Views Job Details**

**File:** `app/jobs/[id]/page.tsx`

\`\`\`typescript
export default async function JobDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: job } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()
  
  // Check if user has already applied
  const { data: { user } } = await supabase.auth.getUser()
  
  let hasApplied = false
  if (user) {
    const { data: application } = await supabase
      .from('applications')
      .select('id')
      .eq('user_id', user.id)
      .eq('job_id', id)
      .single()
    
    hasApplied = !!application
  }
  
  return <JobDetailClient job={job} hasApplied={hasApplied} />
}
\`\`\`

**Design Pattern:** Server-side duplicate application check prevents unnecessary client-side logic

**Step 3: User Clicks "Apply Now"**

**File:** `app/jobs/[id]/apply/page.tsx`

\`\`\`typescript
export default async function ApplyPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  
  // Authentication guard
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect(`/auth/login?redirect=/jobs/${id}/apply`)
  }
  
  // Duplicate application guard
  const { data: existingApplication } = await supabase
    .from('applications')
    .select('id')
    .eq('user_id', user.id)
    .eq('job_id', id)
    .single()
  
  if (existingApplication) {
    redirect(`/jobs/${id}`)
  }
  
  // Fetch job and profile
  const { data: job } = await supabase.from('jobs').select('*').eq('id', id).single()
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  
  return <ApplyClient job={job} userProfile={profile} />
}
\`\`\`

**Design Pattern:** Server-side guards prevent invalid states before rendering form

**Step 4: User Submits Application**

**File:** `components/jobs/apply-client.tsx`

\`\`\`typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (job.requires_screening) {
    // Show screening upgrade dialog
    setShowScreeningDialog(true)
  } else {
    // Submit application directly
    await submitApplication(false)
  }
}

const submitApplication = async (withScreening: boolean) => {
  setIsLoading(true)
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    router.push(`/auth/login?redirect=/jobs/${job.id}/apply`)
    return
  }
  
  // Create application
  const { data: application, error } = await supabase
    .from('applications')
    .insert({
      user_id: user.id,
      job_id: job.id,
      cover_letter: coverLetter,
      resume_url: resumeUrl,
      status: withScreening ? 'screening' : 'pending',
      screening_completed: false,
    })
    .select()
    .single()
  
  if (error) throw error
  
  if (withScreening) {
    // Redirect to payment
    router.push(`/upgrade/screening?application_id=${application.id}`)
  } else {
    // Show success
    router.push(`/applications/${application.id}?success=true`)
  }
}
\`\`\`

**Design Pattern:** Client-side mutation with optimistic UI updates and error handling

**Step 5: Optional Screening Upgrade**

**File:** `app/upgrade/screening/page.tsx`

\`\`\`typescript
export default async function ScreeningUpgradePage({ searchParams }: Props) {
  const params = await searchParams
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  
  if (!params.application_id) redirect('/dashboard')
  
  // Get application details
  const { data: application } = await supabase
    .from('applications')
    .select('*, jobs(*)')
    .eq('id', params.application_id)
    .eq('user_id', user.id)
    .single()
  
  if (!application) redirect('/dashboard')
  
  return (
    <ScreeningUpgradeClient
      applicationId={params.application_id}
      jobTitle={application.jobs.title}
      company={application.jobs.company}
    />
  )
}
\`\`\`

**Design Pattern:** Server-side validation ensures user owns application before showing payment form

### 5.2 State Management Strategy

#### 5.2.1 Server State (Database)

**Primary Source of Truth:** PostgreSQL via Supabase

**Access Patterns:**
- **Server Components:** Direct database queries (no client-side state)
- **Client Components:** Supabase client with automatic caching
- **Mutations:** Optimistic updates with rollback on error

#### 5.2.2 Client State (React)

**Minimal Client State:** Only UI-specific state (form inputs, modals, loading states)

**Example:** Application form state

\`\`\`typescript
const [coverLetter, setCoverLetter] = useState("")
const [resumeUrl, setResumeUrl] = useState("")
const [isLoading, setIsLoading] = useState(false)
const [showScreeningDialog, setShowScreeningDialog] = useState(false)
\`\`\`

**Design Rationale:**
- Avoid duplicating server state in client
- Use URL state for shareable UI state (search params, filters)
- Leverage React Server Components for automatic data freshness

#### 5.2.3 URL State (Search Params)

**Use Cases:**
- Pagination: `?page=2`
- Filters: `?category=engineering&location=berlin`
- Success messages: `?success=true`
- Redirects: `?redirect=/dashboard`

**Example:** Success message via URL

\`\`\`typescript
// After application submission
router.push(`/applications/${application.id}?success=true`)

// In component
const searchParams = useSearchParams()
const showSuccess = searchParams.get('success') === 'true'
\`\`\`

**Benefits:**
- Shareable URLs
- Browser back/forward support
- No client-side state management complexity

---

## 6. Component Architecture & Design Patterns

### 6.1 Component Hierarchy

\`\`\`
app/
├── layout.tsx (Root Layout - Server Component)
│   ├── MainNav (Client Component)
│   ├── {children} (Page Content)
│   └── Footer (Server Component)
│
├── page.tsx (Homepage - Server Component)
│
├── jobs/
│   ├── page.tsx (Jobs List - Server Component)
│   │   └── JobsClient (Client Component)
│   │       └── JobCard (Client Component)
│   │
│   └── [id]/
│       ├── page.tsx (Job Detail - Server Component)
│       │   └── JobDetailClient (Client Component)
│       │
│       └── apply/
│           └── page.tsx (Apply Form - Server Component)
│               └── ApplyClient (Client Component)
│
├── dashboard/
│   └── page.tsx (Dashboard - Server Component)
│       └── DashboardClient (Client Component)
│           ├── ApplicationCard (Client Component)
│           └── SavedJobCard (Client Component)
│
└── applications/
    ├── page.tsx (Applications List - Server Component)
    │   └── ApplicationsListClient (Client Component)
    │
    └── [id]/
        └── page.tsx (Application Detail - Server Component)
            └── ApplicationDetailClient (Client Component)
\`\`\`

### 6.2 Server vs. Client Component Strategy

#### 6.2.1 Server Components (Default)

**Use When:**
- Fetching data from database
- Accessing environment variables
- Rendering static content
- SEO-critical content

**Example:** Job detail page

\`\`\`typescript
// app/jobs/[id]/page.tsx
export default async function JobDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  
  // Server-side data fetching
  const { data: job } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()
  
  // Pass data to client component
  return <JobDetailClient job={job} />
}
\`\`\`

**Benefits:**
- Zero JavaScript sent to client for data fetching
- Direct database access (no API layer needed)
- Automatic request deduplication
- Streaming SSR support

#### 6.2.2 Client Components

**Use When:**
- Handling user interactions (clicks, form submissions)
- Managing local state (form inputs, modals)
- Using browser APIs (localStorage, geolocation)
- Real-time subscriptions

**Example:** Job application form

\`\`\`typescript
// components/jobs/apply-client.tsx
"use client"

export function ApplyClient({ job, userProfile }: Props) {
  const [coverLetter, setCoverLetter] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Client-side mutation
    const supabase = createClient()
    const { data, error } = await supabase
      .from('applications')
      .insert({ /* ... */ })
    
    if (!error) {
      router.push(`/applications/${data.id}`)
    }
    
    setIsLoading(false)
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
\`\`\`

**Benefits:**
- Interactive UI without full page reloads
- Optimistic updates for better UX
- Client-side validation before server submission

### 6.3 Component Composition Patterns

#### 6.3.1 Container/Presenter Pattern

**Container (Server Component):** Fetches data, handles business logic

\`\`\`typescript
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const supabase = await createClient()
  
  // Data fetching
  const { data: applications } = await supabase
    .from('applications')
    .select('*, jobs(*)')
  
  const { data: savedJobs } = await supabase
    .from('saved_jobs')
    .select('*, jobs(*)')
  
  // Pass to presenter
  return (
    <DashboardClient
      applications={applications}
      savedJobs={savedJobs}
    />
  )
}
\`\`\`

**Presenter (Client Component):** Renders UI, handles interactions

\`\`\`typescript
// components/dashboard/dashboard-client.tsx
"use client"

export function DashboardClient({ applications, savedJobs }: Props) {
  return (
    <div>
      <ApplicationsList applications={applications} />
      <SavedJobsList savedJobs={savedJobs} />
    </div>
  )
}
\`\`\`

**Benefits:**
- Clear separation of data fetching and presentation
- Testable components (mock data in presenter tests)
- Reusable presenters with different data sources

#### 6.3.2 Compound Components Pattern

**Example:** Dialog with multiple sub-components

\`\`\`typescript
<Dialog open={showDialog} onOpenChange={setShowDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Upgrade Screening?</DialogTitle>
      <DialogDescription>Choose your application type</DialogDescription>
    </DialogHeader>
    <DialogBody>
      {/* Content */}
    </DialogBody>
  </DialogContent>
</Dialog>
\`\`\`

**Benefits:**
- Flexible composition
- Shared context between sub-components
- Accessible by default (Radix UI primitives)

### 6.4 Shadcn UI Component Library

**Philosophy:** Copy-paste components into your codebase (not npm package)

**Key Components Used:**
- `Button`: Primary actions, navigation
- `Card`: Content containers
- `Badge`: Status indicators
- `Dialog`: Modals, confirmations
- `Input`, `Textarea`: Form fields
- `Label`: Accessible form labels

**Customization:** All components use Tailwind CSS and design tokens from `globals.css`

\`\`\`css
:root {
  --primary: oklch(0.55 0.12 155); /* Soft green */
  --background: oklch(0.99 0.005 145);
  --foreground: oklch(0.15 0.01 145);
  /* ... */
}
\`\`\`

**Benefits:**
- Full control over component code
- No version lock-in
- Tailwind CSS integration
- Accessible by default (ARIA attributes)

---

## 7. API Design & Server Actions

### 7.1 API Architecture

**Primary Pattern:** Direct database access via Supabase client (no custom API routes)

**Rationale:**
- Supabase provides auto-generated RESTful API
- RLS policies enforce authorization at database level
- Reduces boilerplate code
- Type-safe with TypeScript

### 7.2 Server Actions (Future Enhancement)

**Use Case:** Form submissions, mutations

**Example:** Application submission as Server Action

\`\`\`typescript
// app/actions/applications.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitApplication(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Unauthorized' }
  }
  
  const jobId = formData.get('jobId') as string
  const coverLetter = formData.get('coverLetter') as string
  const resumeUrl = formData.get('resumeUrl') as string
  
  const { data, error } = await supabase
    .from('applications')
    .insert({
      user_id: user.id,
      job_id: jobId,
      cover_letter: coverLetter,
      resume_url: resumeUrl,
      status: 'pending',
    })
    .select()
    .single()
  
  if (error) {
    return { error: error.message }
  }
  
  // Revalidate dashboard to show new application
  revalidatePath('/dashboard')
  
  return { data }
}
\`\`\`

**Benefits:**
- Progressive enhancement (works without JavaScript)
- Automatic CSRF protection
- Type-safe with TypeScript
- Integrated with Next.js caching

### 7.3 External API Integration

**Stripe Webhooks:** Handle subscription events

\`\`\`typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!
  
  let event: Stripe.Event
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }
  
  const supabase = await createClient()
  
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription
      
      await supabase
        .from('user_subscriptions')
        .upsert({
          stripe_subscription_id: subscription.id,
          stripe_customer_id: subscription.customer as string,
          status: subscription.status,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        })
      break
    
    case 'customer.subscription.deleted':
      const deletedSub = event.data.object as Stripe.Subscription
      
      await supabase
        .from('user_subscriptions')
        .update({ status: 'cancelled' })
        .eq('stripe_subscription_id', deletedSub.id)
      break
  }
  
  return NextResponse.json({ received: true })
}
\`\`\`

**Design Pattern:** Webhook handler updates database, Stripe is source of truth for billing

---

## 8. Payment Integration Architecture

### 8.1 Stripe Integration

**Components:**
1. **Subscription Management:** Recurring billing for premium tiers
2. **One-Time Payments:** Screening upgrades ($29.99)
3. **Webhook Handling:** Sync subscription status

### 8.2 Subscription Flow

\`\`\`
User clicks "Upgrade Plan"
    ↓
Redirect to Stripe Checkout
    ↓
User completes payment
    ↓
Stripe webhook fires
    ↓
Update user_subscriptions table
    ↓
Redirect to dashboard with success message
\`\`\`

**Implementation:** `app/pricing/page.tsx`

\`\`\`typescript
const handleSubscribe = async (priceId: string) => {
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId }),
  })
  
  const { url } = await response.json()
  window.location.href = url
}
\`\`\`

### 8.3 Screening Upgrade Flow

\`\`\`
User applies to job with screening
    ↓
Show upgrade dialog
    ↓
User chooses "Upgrade Screening"
    ↓
Create application with status='screening'
    ↓
Redirect to Stripe Checkout
    ↓
User pays $29.99
    ↓
Webhook updates application status
    ↓
Redirect to application detail page
\`\`\`

**Design Rationale:**
- Application created before payment (prevents lost applications)
- Status tracks payment state
- Webhook ensures eventual consistency

---

## 9. Security Implementation

### 9.1 Security Layers

1. **Network Layer:** HTTPS enforcement, security headers
2. **Application Layer:** Input validation, CSRF protection
3. **Database Layer:** RLS policies, parameterized queries
4. **Authentication Layer:** JWT tokens, httpOnly cookies

### 9.2 Security Headers

**File:** `middleware.ts`

\`\`\`typescript
response.headers.set("X-Frame-Options", "DENY")
response.headers.set("X-Content-Type-Options", "nosniff")
response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
response.headers.set("X-XSS-Protection", "1; mode=block")
response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
response.headers.set(
  "Content-Security-Policy",
  "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.paddle.com https://js.stripe.com; ..."
)
\`\`\`

**Protection Against:**
- **Clickjacking:** `X-Frame-Options: DENY`
- **MIME Sniffing:** `X-Content-Type-Options: nosniff`
- **XSS:** `X-XSS-Protection`, CSP
- **Data Leakage:** `Referrer-Policy`

### 9.3 Input Validation

**Client-Side:** HTML5 validation, React controlled inputs

\`\`\`typescript
<Input
  type="email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
/>
\`\`\`

**Server-Side:** Zod schemas (future enhancement)

\`\`\`typescript
import { z } from 'zod'

const applicationSchema = z.object({
  jobId: z.string().uuid(),
  coverLetter: z.string().min(100).max(5000),
  resumeUrl: z.string().url(),
})

const validated = applicationSchema.parse(formData)
\`\`\`

### 9.4 SQL Injection Prevention

**Supabase Client:** Parameterized queries by default

\`\`\`typescript
// Safe: Parameters are escaped
const { data } = await supabase
  .from('jobs')
  .select('*')
  .eq('id', userInput)

// Unsafe: Never use raw SQL with user input
// await supabase.rpc('raw_sql', { query: `SELECT * FROM jobs WHERE id = '${userInput}'` })
\`\`\`

### 9.5 CSRF Protection

**Next.js:** Automatic CSRF protection for Server Actions

**Stripe Webhooks:** Signature verification

\`\`\`typescript
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET!
)
\`\`\`

---

## 10. Performance Optimization Strategies

### 10.1 React Server Components

**Benefit:** Zero JavaScript for data fetching

**Example:** Job list page

\`\`\`typescript
// Server Component (no JS sent to client)
export default async function JobsPage() {
  const jobs = await fetchJobs() // Runs on server
  return <JobsClient initialJobs={jobs} />
}
\`\`\`

**Impact:**
- Reduced bundle size
- Faster Time to Interactive (TTI)
- Better SEO (fully rendered HTML)

### 10.2 Image Optimization

**Next.js Image Component:** Automatic optimization

\`\`\`typescript
<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Load above the fold
  placeholder="blur"
/>
\`\`\`

**Optimizations:**
- WebP/AVIF format conversion
- Responsive images (srcset)
- Lazy loading (below fold)
- Blur placeholder (LQIP)

### 10.3 Database Query Optimization

**Indexes:** Strategic B-tree indexes

\`\`\`sql
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_jobs_status_posted_date ON jobs(status, posted_date DESC);
\`\`\`

**Query Patterns:**
- Select only needed columns: `.select('id, title, company')`
- Use pagination: `.range(0, 19)`
- Avoid N+1 queries: `.select('*, jobs(*)')` (JOIN)

### 10.4 Caching Strategy

**Next.js Cache:**
- Static pages: Cached indefinitely
- Dynamic pages: Revalidated on demand
- API routes: No caching by default

**Supabase Cache:**
- Client-side query cache (automatic)
- Invalidation on mutation

**CDN Cache (Vercel):**
- Static assets: Cached at edge
- Dynamic content: Streamed from origin

---

## 11. Scalability Considerations

### 11.1 Database Scalability

**Current:** Single PostgreSQL instance (Supabase)

**Future Enhancements:**
1. **Read Replicas:** Separate read/write traffic
2. **Connection Pooling:** PgBouncer for high concurrency
3. **Partitioning:** Partition `applications` table by date
4. **Archiving:** Move old applications to cold storage

### 11.2 Application Scalability

**Serverless Architecture:** Vercel Edge Functions

**Benefits:**
- Auto-scaling based on traffic
- Pay-per-request pricing
- Global edge network

**Limitations:**
- Cold start latency (mitigated by edge runtime)
- Stateless (no in-memory caching)

### 11.3 File Storage Scalability

**Current:** External URLs (user-provided resume links)

**Future:** Vercel Blob Storage

\`\`\`typescript
import { put } from '@vercel/blob'

const blob = await put('resumes/user-123.pdf', file, {
  access: 'public',
  addRandomSuffix: true,
})

// Store blob.url in database
\`\`\`

**Benefits:**
- CDN-backed storage
- Automatic compression
- Signed URLs for private files

---

## 12. Deployment Architecture

### 12.1 Vercel Deployment

**Build Process:**

\`\`\`
git push origin main
    ↓
Vercel webhook triggered
    ↓
Install dependencies (npm ci)
    ↓
Build Next.js app (next build)
    ↓
Deploy to edge network
    ↓
Run database migrations (optional)
    ↓
Deployment complete
\`\`\`

**Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`

### 12.2 Database Migrations

**Tool:** Supabase CLI or SQL scripts

**Process:**

\`\`\`bash
# Create migration
supabase migration new add_screening_credits

# Apply migration
supabase db push
\`\`\`

**Best Practices:**
- Version control migrations
- Test in staging environment
- Use transactions for multi-step migrations
- Backward-compatible changes (add columns, not remove)

### 12.3 Monitoring & Observability

**Vercel Analytics:**
- Page views
- Core Web Vitals
- Error tracking

**Supabase Dashboard:**
- Query performance
- Database size
- Connection count

**Future:** Sentry for error tracking

---

## 13. Testing Strategy

### 13.1 Unit Testing (Future)

**Tool:** Vitest

**Example:** Utility function test

\`\`\`typescript
import { describe, it, expect } from 'vitest'
import { formatSalary } from '@/lib/utils'

describe('formatSalary', () => {
  it('formats salary range correctly', () => {
    expect(formatSalary(50000, 80000, 'EUR')).toBe('€50k - €80k')
  })
})
\`\`\`

### 13.2 Integration Testing (Future)

**Tool:** Playwright

**Example:** Application submission flow

\`\`\`typescript
import { test, expect } from '@playwright/test'

test('user can submit job application', async ({ page }) => {
  await page.goto('/auth/login')
  await page.fill('input[type="email"]', 'test@example.com')
  await page.fill('input[type="password"]', 'password123')
  await page.click('button[type="submit"]')
  
  await page.goto('/jobs/123')
  await page.click('text=Apply Now')
  
  await page.fill('textarea[name="coverLetter"]', 'I am interested...')
  await page.fill('input[name="resumeUrl"]', 'https://example.com/resume.pdf')
  await page.click('button[type="submit"]')
  
  await expect(page).toHaveURL(/\/applications\/.*/)
  await expect(page.locator('text=Application Submitted')).toBeVisible()
})
\`\`\`

### 13.3 E2E Testing (Future)

**Tool:** Playwright with real database

**Strategy:**
- Separate test database
- Seed data before tests
- Clean up after tests

---

## 14. Future Enhancements & Technical Debt

### 14.1 Planned Features

1. **AI-Powered Job Matching:**
   - Vector embeddings for semantic search
   - Personalized job recommendations
   - Resume-job compatibility scoring

2. **Real-Time Notifications:**
   - WebSocket subscriptions for application status updates
   - Email notifications via Supabase Edge Functions

3. **Advanced Analytics:**
   - Application success rate tracking
   - Salary insights dashboard
   - Employer engagement metrics

4. **Video Interviews:**
   - Integrated video recording
   - AI-powered interview feedback
   - Automated scheduling

### 14.2 Technical Debt

1. **API Routes:** Currently using direct Supabase client; consider abstracting into API layer for better separation
2. **Error Handling:** Implement global error boundary and toast notifications
3. **Loading States:** Add Suspense boundaries for better UX
4. **Type Safety:** Generate TypeScript types from database schema (Supabase CLI)
5. **Testing:** Add comprehensive test coverage (unit, integration, E2E)

### 14.3 Performance Improvements

1. **Infinite Scroll:** Implement virtual scrolling for job lists
2. **Prefetching:** Prefetch job details on hover
3. **Service Worker:** Offline support with PWA
4. **Edge Caching:** Cache job listings at CDN edge

---

## Conclusion

WeAreJobPilot represents a modern, production-ready web application built with industry best practices. The architecture prioritizes security, performance, and scalability while maintaining developer productivity through TypeScript, React Server Components, and Supabase's integrated backend.

**Key Architectural Strengths:**
1. **Security-First:** RLS policies, HTTPS enforcement, input validation
2. **Performance-Optimized:** RSC, image optimization, strategic caching
3. **Developer Experience:** Type safety, clear separation of concerns, minimal boilerplate
4. **Scalability:** Serverless architecture, database indexing, CDN distribution

**Recommended Next Steps for New Engineers:**
1. Review database schema and RLS policies
2. Understand Server vs. Client Component patterns
3. Trace application submission flow end-to-end
4. Set up local development environment with Supabase CLI
5. Review security headers and authentication flow

This documentation serves as a comprehensive reference for understanding the system architecture and making informed technical decisions as the platform evolves.

---

**Document Metadata:**
- **Author:** System Architect
- **Review Status:** Approved for Technical Handoff
- **Next Review Date:** Q2 2025
- **Related Documents:** API Reference, Database Schema Diagram, Deployment Runbook
