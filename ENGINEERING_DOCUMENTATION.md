# JobPilot / WeAreJobPilot.com - Engineering Documentation

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Status:** Production-Ready MVP

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Current Features](#current-features)
4. [Database Schema](#database-schema)
5. [Authentication Flow](#authentication-flow)
6. [API Routes](#api-routes)
7. [Component Architecture](#component-architecture)
8. [Design System](#design-system)
9. [Missing Features & Gaps](#missing-features--gaps)
10. [Roadmap & Priorities](#roadmap--priorities)
11. [Setup Instructions](#setup-instructions)
12. [Testing & Validation](#testing--validation)
13. [Deployment](#deployment)
14. [Known Issues](#known-issues)

---

## Project Overview

**JobPilot** (branded as **WeAreJobPilot.com**) is an aviation-themed job matching platform designed to connect job seekers with opportunities through AI-powered matching and a premium user experience.

### Mission
Provide a world-class job search experience with enterprise-grade reliability (99.9% uptime, <2s load time, 10K+ concurrent users) and AI-assisted job matching.

### Target Audience
- Job seekers in aviation and related industries
- Companies looking to hire qualified candidates
- Career coaches and HR professionals

### Key Differentiators
- Aviation-themed UX (Radar, Cockpit, Mission Control metaphors)
- AI Buddy System (4 personas: Buddy, Coach, Manager, Lawyer)
- Premium dark theme design (Facebook/Instagram/Apple level)
- No dead-ends guarantee (every link works, every page accessible)

---

## Architecture & Tech Stack

### Frontend
- **Framework:** Next.js 15.5.4 (App Router)
- **Language:** TypeScript 5.x (strict mode)
- **UI Library:** React 19.1.0
- **Styling:** TailwindCSS 4.1.9 + shadcn/ui components
- **Icons:** Lucide React 0.454.0
- **Fonts:** Geist (sans-serif)
- **State Management:** React hooks + SWR (planned)
- **Form Handling:** React Hook Form 7.60.0 + Zod 3.25.76

### Backend
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (email/password, OTP planned)
- **API:** Next.js API Routes + Edge Functions
- **File Storage:** Vercel Blob (for resumes, profile images)
- **Payments:** Stripe (integrated, not fully implemented)

### Infrastructure
- **Hosting:** Vercel (Edge Network, Global CDN)
- **Analytics:** Vercel Analytics
- **Monitoring:** Built-in health checks
- **CI/CD:** GitHub Actions (planned) + Vercel auto-deploy

### Development Tools
- **Package Manager:** pnpm
- **Linting:** ESLint + Prettier
- **Testing:** Playwright (E2E), validation scripts
- **Type Checking:** TypeScript strict mode

---

## Current Features

### ✅ Implemented Features

#### 1. **Authentication System**
- Email/password sign up and login
- Email verification flow
- Protected routes via middleware
- Session management with Supabase
- Auto-profile creation on signup
- Rate limiting on auth endpoints

#### 2. **Job Browsing**
- Job listings page with search and filters
- Job detail pages with full descriptions
- Dynamic routing (`/jobs/[id]`)
- Job card components with company info
- Salary range display
- Job type badges (Full-time, Remote, etc.)

#### 3. **Job Application**
- Application form with cover letter
- Resume upload (planned integration with Vercel Blob)
- Application status tracking
- Duplicate application prevention

#### 4. **User Dashboard**
- View applied jobs
- Application status overview
- Quick stats (applications, interviews, offers)
- Recent activity feed

#### 5. **User Profile**
- Profile editing (name, email, phone, location)
- Skills management
- Experience tracking
- Resume upload section

#### 6. **Navigation System**
- Responsive navigation panel (sidebar on desktop, bottom bar on mobile)
- Active page highlighting
- User authentication state detection
- Aviation-themed branding (Plane icon, cyan-400 accents)
- Mobile-friendly collapsible menu

#### 7. **Design System**
- Locked color palette (slate-900, cyan-400, emerald-400)
- World-class typography system
- Backdrop-blur cards with premium effects
- Professional office imagery with contrast filters
- Grid overlay background pattern
- Consistent header/footer across all pages

#### 8. **SEO & Performance**
- Dynamic metadata generation
- Open Graph images for job listings
- Sitemap generation
- Robots.txt configuration
- PWA manifest
- Image optimization with Next.js Image

#### 9. **Compliance & Privacy**
- GDPR banner with cookie consent
- Privacy policy page
- Terms of service (planned)
- Data protection measures

#### 10. **Developer Experience**
- Comprehensive validation scripts
- Route coverage checking
- Function validation
- Error boundaries
- Loading states
- 404 and error pages

---

## Database Schema

### Tables

#### `profiles`
User profile information linked to Supabase Auth.

\`\`\`sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  resume_url TEXT,
  skills TEXT[],
  experience_years INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

**RLS Policies:**
- Users can read/update their own profile
- Auto-created on user signup via trigger

#### `jobs`
Job listings posted by companies.

\`\`\`sql
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL, -- full-time, part-time, contract, remote
  salary_min INTEGER,
  salary_max INTEGER,
  description TEXT NOT NULL,
  requirements TEXT[],
  benefits TEXT[],
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deadline TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active', -- active, closed, filled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

**RLS Policies:**
- Public read access (all users can view jobs)
- Admin-only write access (not yet implemented)

#### `applications`
Job applications submitted by users.

\`\`\`sql
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- pending, reviewing, interview, rejected, accepted
  cover_letter TEXT,
  resume_url TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);
\`\`\`

**RLS Policies:**
- Users can read/create/update/delete their own applications
- Unique constraint prevents duplicate applications

#### `saved_jobs`
Bookmarked jobs for later viewing.

\`\`\`sql
CREATE TABLE public.saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, user_id)
);
\`\`\`

**RLS Policies:**
- Users can read/create/delete their own saved jobs

### Database Triggers

**Auto-Profile Creation:**
\`\`\`sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
\`\`\`

Automatically creates a profile entry when a user signs up.

---

## Authentication Flow

### Sign Up Flow
1. User submits email/password on `/auth/sign-up`
2. Zod validation checks input format
3. Supabase creates auth user
4. Email verification sent
5. Trigger creates profile entry
6. User redirected to `/auth/verify-email`
7. User clicks verification link in email
8. Redirected to dashboard

### Login Flow
1. User submits credentials on `/auth/login`
2. Supabase validates credentials
3. Session cookie set via middleware
4. User redirected to `/dashboard`

### Protected Routes
Middleware checks for valid session on all routes except:
- `/auth/*` (login, signup, verify)
- `/` (homepage)
- `/about` (landing page)
- `/jobs` (public job listings)
- `/privacy` (privacy policy)

### Session Management
- Sessions stored in HTTP-only cookies
- Middleware refreshes tokens on each request
- Auto-logout on token expiration

---

## API Routes

### Current API Endpoints

#### `GET /api/health`
Health check endpoint for monitoring.

**Response:**
\`\`\`json
{
  "status": "ok",
  "timestamp": "2025-01-30T12:00:00Z"
}
\`\`\`

#### `GET /api/edge-example`
Example Edge Function demonstrating Vercel Edge Runtime.

**Response:**
\`\`\`json
{
  "message": "Hello from Edge Function",
  "timestamp": "2025-01-30T12:00:00Z",
  "region": "iad1"
}
\`\`\`

### Missing API Endpoints (Planned)

- `POST /api/jobs` - Create job listing (admin only)
- `PUT /api/jobs/[id]` - Update job listing
- `DELETE /api/jobs/[id]` - Delete job listing
- `POST /api/applications` - Submit job application
- `GET /api/applications` - Get user's applications
- `PUT /api/applications/[id]` - Update application status
- `POST /api/saved-jobs` - Save job for later
- `DELETE /api/saved-jobs/[id]` - Remove saved job
- `POST /api/ai/chat` - AI Buddy chat endpoint
- `POST /api/ai/match` - AI job matching
- `POST /api/stripe/checkout` - Create Stripe checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks

---

## Component Architecture

### Layout Components

#### `app/layout.tsx`
Root layout with global providers (Analytics, Theme, GDPR).

#### `components/layout-wrapper.tsx`
Client-side wrapper that manages navigation panel state.

#### `components/navigation-panel.tsx`
Responsive sidebar navigation with user authentication detection.

#### `components/footer.tsx`
Global footer with links to key pages and sections.

### Page Components

All pages follow this structure:
\`\`\`tsx
export default async function Page() {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Page content */}
      </div>
      <Footer />
    </div>
  )
}
\`\`\`

### Reusable Components

#### `components/job-card.tsx`
Job listing card with company info, salary, and apply button.

#### `components/ai-logo.tsx`
Gradient AI badge used throughout the app.

#### `components/image-grid.tsx`
2-image side-by-side grid for professional office photos.

#### `components/gdpr-banner.tsx`
Cookie consent banner with local storage persistence.

### UI Components (shadcn/ui)

Full suite of 50+ components including:
- Forms: Input, Textarea, Select, Checkbox, Radio, Switch
- Feedback: Alert, Toast, Dialog, Sheet, Drawer
- Navigation: Tabs, Accordion, Dropdown, Command
- Data Display: Card, Badge, Avatar, Table, Chart
- Layout: Separator, Scroll Area, Resizable Panels

---

## Design System

### Color Palette (Locked)

\`\`\`typescript
const colors = {
  bg: "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900",
  text: "text-white",
  muted: "text-slate-300",
  primary: "text-cyan-400",
  accent: "text-emerald-400",
  button: "bg-cyan-500 hover:bg-cyan-400 text-slate-900",
  card: "bg-slate-800/50 backdrop-blur border border-slate-700/50"
};
\`\`\`

### Typography

**Headings:**
\`\`\`tsx
className="text-5xl md:text-6xl font-bold text-white text-center tracking-tight leading-tight mb-12"
\`\`\`

**Subtext:**
\`\`\`tsx
className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto text-center leading-relaxed mb-16"
\`\`\`

**Body:**
\`\`\`tsx
className="text-base text-slate-300 leading-relaxed"
\`\`\`

### Spacing

- Container: `container mx-auto px-6 py-24`
- Section gap: `mb-16` or `mb-24`
- Card padding: `p-10`
- Grid gap: `gap-8`

### Images

**Professional Office Photos:**
\`\`\`tsx
className="w-full h-auto object-contain object-top filter contrast-60 brightness-105 rounded-none md:rounded-2xl shadow-2xl"
\`\`\`

**Rules:**
- Always show full heads and shoulders (no cropping)
- Use `object-contain` and `object-top`
- Apply contrast-60 brightness-105 filter
- Max height: 400px for side-by-side images

---

## Missing Features & Gaps

### Critical Missing Features

#### 1. **AI Integration**
- ❌ OpenAI JobGPT mode via Vercel AI SDK
- ❌ AI Buddy chat interface (4 personas)
- ❌ AI-powered job matching
- ❌ Resume parsing with AI
- ❌ Cover letter generation

#### 2. **Advanced Job Features**
- ❌ Job recommendations based on profile
- ❌ Semantic search with pgvector
- ❌ Job alerts and notifications
- ❌ Saved searches
- ❌ Job comparison tool

#### 3. **Company Features**
- ❌ Company profiles
- ❌ Company dashboard for posting jobs
- ❌ Applicant tracking system (ATS)
- ❌ Interview scheduling
- ❌ Candidate messaging

#### 4. **Premium Features**
- ❌ Stripe subscription flow
- ❌ Premium job listings (featured, urgent)
- ❌ Resume builder
- ❌ Career coaching sessions
- ❌ Interview preparation tools

#### 5. **Social Features**
- ❌ User reviews and ratings
- ❌ Referral system
- ❌ Social sharing
- ❌ Community forum

#### 6. **Admin Features**
- ❌ Admin dashboard
- ❌ Job moderation
- ❌ User management
- ❌ Analytics dashboard
- ❌ Content management system

### Technical Gaps

#### 1. **Testing**
- ❌ Unit tests (Jest/Vitest)
- ❌ Integration tests
- ❌ E2E test coverage (only smoke tests exist)
- ❌ Performance testing (10K concurrent users)
- ❌ Load testing

#### 2. **Monitoring**
- ❌ Real-time error tracking (Sentry)
- ❌ Performance monitoring (Web Vitals)
- ❌ User analytics (Mixpanel/Amplitude)
- ❌ Uptime monitoring
- ❌ Database query performance

#### 3. **Security**
- ❌ Rate limiting on all API routes
- ❌ CSRF protection
- ❌ XSS sanitization
- ❌ SQL injection prevention (using Supabase RLS)
- ❌ Security headers (CSP, HSTS)

#### 4. **Performance**
- ❌ Image CDN optimization
- ❌ Database query optimization
- ❌ Caching strategy (Redis/KV)
- ❌ Code splitting optimization
- ❌ Bundle size analysis

#### 5. **Accessibility**
- ⚠️ Partial ARIA labels
- ⚠️ Keyboard navigation (needs testing)
- ❌ Screen reader testing
- ❌ WCAG 2.1 AA compliance audit

---

## Roadmap & Priorities

### Phase 1: MVP Completion (Current)
**Timeline:** 2-4 weeks

1. **Complete Core Features**
   - ✅ Authentication system
   - ✅ Job browsing and search
   - ✅ Job application flow
   - ✅ User dashboard
   - ✅ Profile management
   - ⚠️ Resume upload (needs Vercel Blob integration)

2. **Fix Critical Issues**
   - ✅ Navigation panel integration
   - ✅ Route validation
   - ⚠️ Image optimization
   - ⚠️ Mobile responsiveness testing

### Phase 2: AI Integration (Next)
**Timeline:** 4-6 weeks

1. **AI Buddy System**
   - Implement OpenAI integration via Vercel AI SDK
   - Create chat interface with 4 personas
   - Add streaming responses
   - Implement conversation history

2. **AI Job Matching**
   - Implement pgvector for semantic search
   - Create job recommendation algorithm
   - Add "Match Score" to job cards
   - Implement "Why this job?" explanations

3. **AI Resume Tools**
   - Resume parsing and analysis
   - Cover letter generation
   - Resume optimization suggestions

### Phase 3: Premium Features
**Timeline:** 6-8 weeks

1. **Stripe Integration**
   - Complete checkout flow
   - Implement subscription management
   - Add premium job listings
   - Create billing dashboard

2. **Advanced Features**
   - Job alerts and notifications
   - Saved searches
   - Interview preparation tools
   - Career coaching booking

### Phase 4: Company Portal
**Timeline:** 8-12 weeks

1. **Company Features**
   - Company registration and profiles
   - Job posting dashboard
   - Applicant tracking system
   - Interview scheduling
   - Candidate messaging

2. **Admin Tools**
   - Admin dashboard
   - Job moderation
   - User management
   - Analytics and reporting

### Phase 5: Scale & Optimize
**Timeline:** Ongoing

1. **Performance**
   - Load testing (10K concurrent users)
   - Database optimization
   - Caching implementation
   - CDN optimization

2. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - User analytics
   - Uptime monitoring

3. **Testing**
   - Comprehensive test suite
   - CI/CD pipeline
   - Automated deployments

---

## Setup Instructions

### Prerequisites

- Node.js 18+ (recommended: 20.x)
- pnpm 8+ (or npm/yarn)
- Supabase account
- Vercel account (for deployment)
- Stripe account (for payments, optional)

### Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Supabase Auth Redirect (for development)
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# Stripe (optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Vercel (auto-populated on Vercel)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
\`\`\`

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/your-org/jobpilot.git
cd jobpilot

# Install dependencies
pnpm install

# Run database migrations
# (Execute scripts/001_create_jobpilot_schema.sql in Supabase SQL Editor)

# Start development server
pnpm dev
\`\`\`

### Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the migration script: `scripts/001_create_jobpilot_schema.sql`
4. Verify tables are created in Table Editor
5. Check RLS policies are enabled

### Seed Data (Optional)

Create sample jobs for testing:

\`\`\`sql
INSERT INTO public.jobs (title, company, location, type, salary_min, salary_max, description, requirements, benefits)
VALUES 
  ('Senior Pilot', 'SkyHigh Airlines', 'New York, NY', 'full-time', 120000, 180000, 'Experienced pilot needed...', ARRAY['Commercial license', '5+ years experience'], ARRAY['Health insurance', '401k']),
  ('Flight Attendant', 'Global Airways', 'Los Angeles, CA', 'full-time', 45000, 65000, 'Join our cabin crew...', ARRAY['Customer service', 'Safety training'], ARRAY['Travel benefits', 'Flexible schedule']);
\`\`\`

---

## Testing & Validation

### Validation Scripts

Run comprehensive validation checks:

\`\`\`bash
# Validate all routes and links
pnpm validate:routes

# Validate all functions and components
pnpm validate:functions

# Run all validations
pnpm validate:all
\`\`\`

### E2E Testing

\`\`\`bash
# Run Playwright tests
pnpm test

# Run in UI mode
pnpm playwright test --ui

# Run specific test
pnpm playwright test tests/smoke.spec.ts
\`\`\`

### Manual Testing Checklist

- [ ] Sign up with new email
- [ ] Verify email and login
- [ ] Browse jobs and search
- [ ] View job details
- [ ] Apply to a job
- [ ] Check dashboard for application
- [ ] Edit profile
- [ ] Upload resume
- [ ] Save a job
- [ ] Test mobile navigation
- [ ] Test all footer links
- [ ] Test GDPR banner

---

## Deployment

### Vercel Deployment

1. **Connect Repository**
   - Go to Vercel dashboard
   - Import Git repository
   - Select Next.js framework preset

2. **Configure Environment Variables**
   - Add all environment variables from `.env.local`
   - Ensure Supabase integration is connected

3. **Deploy**
   - Push to main branch
   - Vercel auto-deploys
   - Check deployment logs for errors

### Pre-Deployment Checklist

\`\`\`bash
# Run all checks
pnpm ci:check

# This runs:
# - Format check
# - Linting
# - Type checking
# - Route validation
# - Function validation
# - Build
\`\`\`

### Custom Domain

1. Add domain in Vercel dashboard
2. Update DNS records
3. Enable HTTPS (automatic)
4. Update `NEXT_PUBLIC_BASE_URL` environment variable

---

## Known Issues

### Critical Issues

1. **Resume Upload Not Implemented**
   - **Status:** Planned
   - **Impact:** Users cannot upload resumes
   - **Workaround:** Text input for resume URL
   - **Fix:** Integrate Vercel Blob storage

2. **No Job Creation Interface**
   - **Status:** Planned
   - **Impact:** Jobs must be added via SQL
   - **Workaround:** Use Supabase SQL Editor
   - **Fix:** Build admin dashboard

### Minor Issues

1. **Mobile Navigation Overlap**
   - **Status:** Under investigation
   - **Impact:** Navigation panel may overlap content on some mobile devices
   - **Workaround:** Adjust padding in layout
   - **Fix:** Refine responsive breakpoints

2. **Image Loading Performance**
   - **Status:** Optimization needed
   - **Impact:** Large images slow initial page load
   - **Workaround:** Use Next.js Image component
   - **Fix:** Implement CDN and lazy loading

3. **Search Not Persistent**
   - **Status:** Enhancement
   - **Impact:** Search filters reset on page navigation
   - **Workaround:** None
   - **Fix:** Implement URL query params

### Technical Debt

1. **No Unit Tests**
   - Need comprehensive test coverage
   - Priority: High

2. **Hardcoded Mock Data**
   - Some pages use placeholder data
   - Priority: Medium

3. **Missing Error Boundaries**
   - Not all components have error handling
   - Priority: Medium

4. **Accessibility Gaps**
   - Need WCAG 2.1 AA compliance audit
   - Priority: High

---

## Contact & Support

**Project Lead:** [Your Name]  
**Email:** support@wearejobpilot.com  
**Documentation:** [Link to docs]  
**Issue Tracker:** [GitHub Issues]

---

## Appendix

### Useful Commands

\`\`\`bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm typecheck        # Check TypeScript types

# Testing
pnpm test             # Run E2E tests
pnpm validate:all     # Run all validations

# CI/CD
pnpm ci:check         # Run all pre-deployment checks
\`\`\`

### Key Files

- `app/layout.tsx` - Root layout
- `middleware.ts` - Auth middleware
- `lib/supabase/server.ts` - Supabase server client
- `lib/supabase/client.ts` - Supabase browser client
- `components/navigation-panel.tsx` - Main navigation
- `scripts/001_create_jobpilot_schema.sql` - Database schema

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

**Last Updated:** January 30, 2025  
**Document Version:** 1.0.0
