# 🛠️ TECHNICAL RECOVERY ROADMAP
## WeAreJobPilot.com - System Restoration & Implementation Guide

**Current Alignment: 41%**
**Target: 95% MVP Readiness**
**Timeline: 4 Phases**

---

## 📊 EXECUTIVE SUMMARY

This roadmap addresses the critical gap between the v0 design (frontend) and the functional specification. The platform has excellent UI/UX but lacks backend integration, AI functionality, and data systems.

**Critical Issues:**
- AI systems: 0% functional
- Authentication: Broken
- Job data: Not connected
- Subscriptions: Non-functional
- GDPR: Missing
- Multilingual: Not implemented

---

## 🎯 PHASE 1: SYSTEM STABILIZATION (Week 1-2)

### Priority: Critical Infrastructure

#### 1.1 Authentication System Restoration

**Current State:** Login forms render but OAuth fails
**Target:** Working authentication with Google OAuth + email/password

**Implementation:**

\`\`\`typescript
// lib/supabase/auth.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Google OAuth setup
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  return { data, error }
}

// Email/Password
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}
\`\`\`

**Supabase Setup:**
1. Enable Google OAuth in Supabase Dashboard → Authentication → Providers
2. Add Google Client ID and Secret
3. Set redirect URLs: `https://wearejobpilot.com/auth/callback`

**Environment Variables:**
\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
\`\`\`

#### 1.2 Database Schema Setup

**Create Core Tables:**

\`\`\`sql
-- scripts/001_create_users_table.sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- scripts/002_create_jobs_table.sql
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'EUR',
  description TEXT,
  requirements TEXT[],
  benefits TEXT[],
  job_type TEXT, -- full-time, part-time, contract
  remote_option BOOLEAN DEFAULT false,
  source TEXT, -- adzuna, eures, manual
  external_id TEXT,
  url TEXT,
  posted_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- scripts/003_create_applications_table.sql
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'applied', -- applied, screening, interview, offer, rejected
  notes TEXT,
  applied_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- scripts/004_create_user_profiles.sql
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skills TEXT[],
  experience_years INTEGER,
  education_level TEXT,
  preferred_locations TEXT[],
  preferred_salary_min INTEGER,
  preferred_salary_max INTEGER,
  cv_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- scripts/005_create_job_alerts.sql
CREATE TABLE IF NOT EXISTS job_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  keywords TEXT[],
  locations TEXT[],
  salary_min INTEGER,
  job_types TEXT[],
  frequency TEXT DEFAULT 'daily', -- instant, daily, weekly
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

**Run Scripts:**
\`\`\`bash
# In Supabase SQL Editor, run each script in order
# Or use Supabase CLI:
supabase db push
\`\`\`

#### 1.3 Subscription System Fix

**Current State:** Broken; backend errors on subscribe
**Target:** Working Stripe integration with 3 tiers

**Implementation:**

\`\`\`typescript
// lib/stripe/config.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
})

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['Basic job search', '5 applications/month', 'Basic CV builder']
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    features: ['Unlimited applications', 'AI CV optimization', 'Job alerts', 'Salary insights']
  },
  premium: {
    name: 'Premium',
    price: 19.99,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID!,
    features: ['Everything in Pro', 'AI interview prep', 'Company intelligence', 'Priority support']
  }
}

// app/api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { stripe, SUBSCRIPTION_PLANS } from '@/lib/stripe/config'

export async function POST(req: NextRequest) {
  try {
    const { plan, userId } = await req.json()
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: SUBSCRIPTION_PLANS[plan as keyof typeof SUBSCRIPTION_PLANS].priceId,
          quantity: 1
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      client_reference_id: userId
    })
    
    return NextResponse.json({ url: session.url })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
\`\`\`

**Stripe Setup:**
1. Create products in Stripe Dashboard
2. Get Price IDs for Pro and Premium
3. Set up webhook endpoint: `/api/stripe/webhook`
4. Add webhook secret to env vars

**Environment Variables:**
\`\`\`bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_PREMIUM_PRICE_ID=price_...
\`\`\`

---

## 🤖 PHASE 2: AI SYSTEM ACTIVATION (Week 3-4)

### Priority: Core AI Features

#### 2.1 AI SDK Integration

**Current State:** No AI functionality
**Target:** Working AI chat, CV generation, job matching

**Implementation:**

\`\`\`typescript
// lib/ai/config.ts
import { createOpenAI } from '@ai-sdk/openai'

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

// app/api/ai/chat/route.ts
import { streamText } from 'ai'
import { openai } from '@/lib/ai/config'

export async function POST(req: Request) {
  const { messages, context } = await req.json()
  
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages,
    system: `You are the AI Flight Companion for WeAreJobPilot, a friendly career guide for young Europeans (18-28). 
    
    Context: ${JSON.stringify(context)}
    
    Your role:
    - Help users find jobs matching their skills
    - Provide career advice
    - Assist with CV and cover letter writing
    - Explain salary expectations
    - Guide through application process
    
    Be encouraging, professional, and specific to European job markets.`
  })
  
  return result.toDataStreamResponse()
}

// app/api/ai/cv-generate/route.ts
import { generateText } from 'ai'
import { openai } from '@/lib/ai/config'

export async function POST(req: Request) {
  const { profile, jobDescription } = await req.json()
  
  const { text } = await generateText({
    model: openai('gpt-4-turbo'),
    prompt: `Generate a professional CV tailored for this job:
    
    Job: ${jobDescription}
    
    Candidate Profile:
    - Skills: ${profile.skills.join(', ')}
    - Experience: ${profile.experience_years} years
    - Education: ${profile.education_level}
    
    Format as a structured CV with sections: Summary, Experience, Skills, Education.
    Make it ATS-friendly and highlight relevant skills for the job.`
  })
  
  return Response.json({ cv: text })
}
\`\`\`

**Environment Variables:**
\`\`\`bash
OPENAI_API_KEY=sk-...
# Or use Vercel AI Gateway (already configured in v0)
\`\`\`

#### 2.2 Job Matching AI

\`\`\`typescript
// lib/ai/job-matching.ts
import { generateObject } from 'ai'
import { openai } from './config'
import { z } from 'zod'

export async function matchJobsToProfile(profile: any, jobs: any[]) {
  const { object } = await generateObject({
    model: openai('gpt-4-turbo'),
    schema: z.object({
      matches: z.array(z.object({
        jobId: z.string(),
        matchScore: z.number().min(0).max(100),
        reasons: z.array(z.string()),
        missingSkills: z.array(z.string())
      }))
    }),
    prompt: `Analyze how well these jobs match the candidate profile:
    
    Profile: ${JSON.stringify(profile)}
    Jobs: ${JSON.stringify(jobs)}
    
    For each job, provide:
    - Match score (0-100)
    - Reasons why it's a good match
    - Skills the candidate is missing`
  })
  
  return object.matches
}
\`\`\`

---

## 📡 PHASE 3: JOB DATA INTEGRATION (Week 5-6)

### Priority: Live Job Feed

#### 3.1 Adzuna API Integration

**Setup:**

\`\`\`typescript
// lib/jobs/adzuna.ts
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID!
const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY!

export async function searchJobs(params: {
  query?: string
  location?: string
  country?: string
  page?: number
}) {
  const { query = '', location = '', country = 'nl', page = 1 } = params
  
  const url = new URL(`https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`)
  url.searchParams.set('app_id', ADZUNA_APP_ID)
  url.searchParams.set('app_key', ADZUNA_API_KEY)
  url.searchParams.set('results_per_page', '20')
  url.searchParams.set('what', query)
  url.searchParams.set('where', location)
  
  const response = await fetch(url.toString())
  const data = await response.json()
  
  return data.results.map((job: any) => ({
    id: job.id,
    title: job.title,
    company: job.company.display_name,
    location: job.location.display_name,
    salary_min: job.salary_min,
    salary_max: job.salary_max,
    description: job.description,
    url: job.redirect_url,
    posted_at: job.created,
    source: 'adzuna'
  }))
}

// app/api/jobs/search/route.ts
import { searchJobs } from '@/lib/jobs/adzuna'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  
  const jobs = await searchJobs({
    query: searchParams.get('q') || '',
    location: searchParams.get('location') || '',
    country: searchParams.get('country') || 'nl',
    page: parseInt(searchParams.get('page') || '1')
  })
  
  return Response.json({ jobs })
}
\`\`\`

**Adzuna Setup:**
1. Register at https://developer.adzuna.com/
2. Get App ID and API Key
3. Add to environment variables

**Environment Variables:**
\`\`\`bash
ADZUNA_APP_ID=your-app-id
ADZUNA_API_KEY=your-api-key
\`\`\`

#### 3.2 Job Caching & Storage

\`\`\`typescript
// lib/jobs/sync.ts
import { supabase } from '@/lib/supabase/auth'
import { searchJobs } from './adzuna'

export async function syncJobsToDatabase() {
  const countries = ['nl', 'de', 'fr', 'pl']
  
  for (const country of countries) {
    const jobs = await searchJobs({ country, page: 1 })
    
    for (const job of jobs) {
      await supabase.from('jobs').upsert({
        external_id: `adzuna-${job.id}`,
        title: job.title,
        company: job.company,
        location: job.location,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        description: job.description,
        url: job.url,
        source: 'adzuna',
        posted_at: job.posted_at
      }, {
        onConflict: 'external_id'
      })
    }
  }
}

// Run as cron job via Vercel Cron
// vercel.json
{
  "crons": [{
    "path": "/api/cron/sync-jobs",
    "schedule": "0 */6 * * *"
  }]
}
\`\`\`

---

## 🌍 PHASE 4: COMPLIANCE & LOCALIZATION (Week 7-8)

### Priority: GDPR & Multilingual

#### 4.1 GDPR Implementation

**Cookie Consent:**

\`\`\`typescript
// components/gdpr-consent.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function GDPRConsent() {
  const [show, setShow] = useState(false)
  
  useEffect(() => {
    const consent = localStorage.getItem('gdpr-consent')
    if (!consent) setShow(true)
  }, [])
  
  const acceptAll = () => {
    localStorage.setItem('gdpr-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }))
    setShow(false)
  }
  
  const acceptNecessary = () => {
    localStorage.setItem('gdpr-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }))
    setShow(false)
  }
  
  if (!show) return null
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <p className="text-sm">
          We use cookies to improve your experience. By continuing, you accept our use of cookies.
          <a href="/privacy" className="underline ml-1">Learn more</a>
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={acceptNecessary}>
            Necessary Only
          </Button>
          <Button onClick={acceptAll}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  )
}
\`\`\`

**Data Export/Deletion:**

\`\`\`typescript
// app/api/user/data-export/route.ts
import { supabase } from '@/lib/supabase/auth'

export async function GET(req: Request) {
  const userId = req.headers.get('x-user-id')
  
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
    
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
    
  const { data: applications } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', userId)
  
  return Response.json({
    user,
    profile,
    applications,
    exportedAt: new Date().toISOString()
  })
}

// app/api/user/delete/route.ts
export async function DELETE(req: Request) {
  const userId = req.headers.get('x-user-id')
  
  // Cascade delete will handle related records
  await supabase.from('users').delete().eq('id', userId)
  
  return Response.json({ success: true })
}
\`\`\`

#### 4.2 Multilingual Support

**i18n Setup:**

\`\`\`typescript
// lib/i18n/config.ts
export const languages = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  fr: 'Français',
  pl: 'Polski'
}

export const translations = {
  en: {
    'nav.jobs': 'Jobs',
    'nav.career': 'Career Autopilot',
    'nav.companies': 'Companies',
    'nav.pricing': 'Pricing',
    'hero.title': 'Your AI-Powered Career Companion',
    'hero.subtitle': 'Find your dream job in Europe with AI guidance',
    // ... more translations
  },
  nl: {
    'nav.jobs': 'Vacatures',
    'nav.career': 'Carrière Autopilot',
    'nav.companies': 'Bedrijven',
    'nav.pricing': 'Prijzen',
    'hero.title': 'Jouw AI-Aangedreven Carrière Begeleider',
    'hero.subtitle': 'Vind je droombaan in Europa met AI begeleiding',
    // ... more translations
  }
  // ... other languages
}

export function t(key: string, lang: string = 'en') {
  return translations[lang as keyof typeof translations]?.[key] || key
}
\`\`\`

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 1: System Stabilization
- [ ] Set up Supabase authentication
- [ ] Configure Google OAuth
- [ ] Create database schema (run all SQL scripts)
- [ ] Set up Stripe integration
- [ ] Test login flow
- [ ] Test subscription flow
- [ ] Add environment variables to Vercel

### Phase 2: AI Activation
- [ ] Set up OpenAI API or Vercel AI Gateway
- [ ] Implement AI chat endpoint
- [ ] Implement CV generation
- [ ] Implement job matching algorithm
- [ ] Test AI responses
- [ ] Add AI context memory

### Phase 3: Job Data
- [ ] Register for Adzuna API
- [ ] Implement job search endpoint
- [ ] Set up job caching in database
- [ ] Create cron job for job sync
- [ ] Test job search functionality
- [ ] Add filters and sorting

### Phase 4: Compliance
- [ ] Implement GDPR consent banner
- [ ] Create privacy policy page
- [ ] Add data export functionality
- [ ] Add account deletion
- [ ] Implement multilingual support
- [ ] Test all languages

---

## 🚀 DEPLOYMENT STEPS

\`\`\`bash
# 1. Clone the v0 design repo
git clone https://github.com/kennethpsevents/[v0-repo-name].git
cd [v0-repo-name]

# 2. Install dependencies
npm install

# 3. Add all environment variables
cp .env.example .env.local
# Fill in all values

# 4. Run database migrations
# In Supabase SQL Editor, run scripts/001-005

# 5. Test locally
npm run dev

# 6. Deploy to Vercel
vercel --prod

# 7. Add environment variables to Vercel
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add OPENAI_API_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add ADZUNA_APP_ID
vercel env add ADZUNA_API_KEY

# 8. Add custom domain
vercel domains add www.wearejobpilot.com

# 9. Set up DNS records at your registrar
# CNAME: www -> cname.vercel-dns.com
# A: @ -> 76.76.21.21
\`\`\`

---

## 📊 SUCCESS METRICS

After implementation, verify:

- [ ] Users can sign up and log in (OAuth + email)
- [ ] Subscription flow works end-to-end
- [ ] AI chat responds intelligently
- [ ] CV generation produces quality output
- [ ] Job search returns real results
- [ ] Job matching scores are accurate
- [ ] GDPR consent is collected
- [ ] All 5 languages work
- [ ] Mobile experience is smooth
- [ ] Page load times < 3s
- [ ] No console errors
- [ ] All API endpoints return 200

**Target Alignment: 95%+**

---

## 🆘 TROUBLESHOOTING

### Common Issues:

**1. Supabase Connection Fails**
- Check environment variables are set
- Verify Supabase project is active
- Check RLS policies allow access

**2. OAuth Redirect Fails**
- Verify redirect URLs in Supabase Dashboard
- Check callback route exists: `/auth/callback`
- Ensure HTTPS in production

**3. Stripe Webhook Not Working**
- Verify webhook secret is correct
- Check endpoint is publicly accessible
- Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

**4. AI Responses Slow**
- Use streaming for better UX
- Consider caching common responses
- Upgrade to GPT-4-turbo for speed

**5. Job Search Returns No Results**
- Verify Adzuna API credentials
- Check country code is valid
- Test API directly in browser

---

## 📞 SUPPORT RESOURCES

- **Supabase Docs:** https://supabase.com/docs
- **Vercel AI SDK:** https://sdk.vercel.ai/docs
- **Stripe Integration:** https://stripe.com/docs/payments/checkout
- **Adzuna API:** https://developer.adzuna.com/docs
- **Next.js 15:** https://nextjs.org/docs

---

**End of Technical Recovery Roadmap**

This roadmap provides complete implementation details for restoring WeAreJobPilot.com to full functionality. Follow phases sequentially for best results.
