# Vercel v0.dev Prompt for Building WeAreJobPilot AI Agent & Full Features

Paste this prompt directly into Vercel v0.dev (https://v0.dev/) to generate the updated Next.js app code for your jpilot-2 project. It incorporates **ALL functions from our chat** (live job mining from open APIs, end-to-end AI job help from search to onboarding, subscription tiers limiting access, document uploads/editing, email integrations, security fallbacks with 200 excuses, multilingual EU support, user personalization via data collection/IP, emotional/behavioral adjustments, recruiter hub, career journey gamification, dynamic profiles, cross-platform comms, AI transparency, and personality/humor engine). 

## Priority #1: Vercel Building Rules

- Use serverless API routes (Next.js App Router)
- Environment variables for secrets (e.g., OPENAI_API_KEY, ADZUNA_APP_KEY)
- Vercel KV for caching/context
- Cron jobs via dashboard (not code)
- Pagination/infinite scroll to prevent crashes
- Dynamic imports for heavy libs (e.g., OpenAI, Sharp.js)
- Edge functions for fast responses
- No heavy build-time deps (avoid geoip-lite; use Vercel headers for IP region)
- GDPR consent modals
- Prisma/Supabase for DB (with schema for jobs, missions, laws, audits)

Deploy generated code to jpilot-2 for seamless update without new project.

---

## Full v0.dev Prompt

Build a production-ready Next.js 14+ App Router app for WeAreJobPilot, an AI-powered EU job search platform. Override the existing static promotional landing page with full interactivity, ensuring Vercel compliance: serverless functions, env vars for keys (OPENAI_API_KEY, ADZUNA_APP_ID/KEY, SUPABASE_URL/KEY, SENDGRID_API_KEY, STRIPE_SECRET, TWILIO_SID, POSTMARK_KEY, EURLEX_KEY, PINECONE_API_KEY, CRON_SECRET), KV for user context/cache, cron via dashboard for hourly mining, dynamic imports (e.g., import('openai')), edge runtime for APIs, pagination/infinite scroll (react-infinite-scroll-component) for large data (5-10M jobs), no build-time heavy deps, GDPR modals (shadcn/ui Dialog for consent), NextAuth for auth/RBAC/tiers, Stripe webhooks for subscriptions, Sentry for monitoring.

### Core AI Agent

Unified `/api/ai/core/route.ts` (POST {type, payload}) handling all modules (mining, interviews, laws, comms) with OpenAI (gpt-4o-mini); Vercel KV for context (#region from x-vercel-ip-country header fallback 'EU', #profile json); personalization tags (user.skills); fallback on keywords (regex /error|hallucinate|loop/i) switching sessions with random excuse from 200-array (e.g., "Sorry, connecting to colleague...", generate variations); embed functions like analyzeLaw; adjust tone for emotional layer (sentiment prompt "Analyze mood: {input} → frustrated/positive/neutral", 8% culture-aware humor puns e.g., NL "Don't clog canals!"); "luchtig/inspirerend" preset for personality; client-side humor randomization in footers (50+ puns array); Framer Motion for ChatAvatar.jsx animations (bounce on positive, wave greet).

### Subscription Tiers (Stripe/NextAuth roles)

- **AI Buddy** (free/limited: 50 jobs/basic sources, 10 queries/day)
- **AI Coach** (€9.99: 500 jobs/full details, 50 queries, personalized guidance)
- **AI Manager** (€19.99: unlimited, 100 queries, full process support)
- **Job Pilot** (subscription-gated, mirrors Buddy but proactive searches)

Enforce limits in APIs (e.g., Prisma take: tier==='buddy' ? 50 : undefined); /pricing page with plans.

### Live Job Mining

`/api/live-jobs/route.ts` (GET with params region/category/remote/sort/page/limit); aggregate from 8+ open APIs:

1. **Arbeitnow** - GET /api/jobs?location=netherlands&remote=true
2. **Adzuna** - GET /api/jobs/eu/search/1?app_id=ID&app_key=KEY&what=dev&where=amsterdam&category=it
3. **Jooble** - POST /api/KEY {keywords:'dev',location:'europe'}
4. **Arbeitsamt** - GET /jobs?region=berlin
5. **GraphQL Jobs** - {jobs{title location remote}}
6. **DevITjobs** - GET /job_feed.xml (xml2js parse)
7. **Findwork** - GET /api/jobs?location=europe
8. **Careerjet** - GET /search?location=france

Normalize/dedup (MD5 hash title+company+url), upsert Prisma jobs table (id Int, source String, region String @index, category String @index, remote Boolean, salary Int?, details Json, embedding Float[]); batch-embed OpenAI for Pinecone index 'jobs-eu' semantic search; tiered sources/limits; `/api/cron/mine-jobs` (dashboard cron hourly with CRON_SECRET auth).

### End-to-End Job Help

AI guides from search to onboarding (drafts recruiter/company messages, CV/cover prep via copy-paste edits, interview sims, contract review); `/api/upload-cv/route.ts` (POST formData file, Sharp.js optimize photo crop/contrast/resize if image, store Supabase/S3, AI review with OpenAI suggestions).

### Email/Comms

`/api/comms/route.ts` (POST send template/to, AI-generated templates, Prisma consent check, OpenAI moderation); scan outbound emails for addresses; Twilio webhook `/api/whatsapp/webhook` for messages routing to AI core; WebSockets (pusher.js) for chats.

### 9 Layers

1. **Regional Legal**: `/api/regional-laws/route.ts` (GET fetch/cache KV EUR-Lex REST (register eur-lex.europa.eu/webservice), N-Lex, wetten.overheid.nl XML; Prisma laws table (id Int, region String, duties/rights/procedures Text, instances Jsonb); analyzeLaw OpenAI summary; MyRightsTab.jsx dashboard with shadcn consent modal, GDPR audit log Prisma.

2. **Unified AI Core**: As above.

3. **Emotional/Behavioral**: Integrate sentiment/humor in core; regex detection; ChatAvatar Framer bounce.

4. **Recruiter Hub**: `/dashboard/recruiter/page.tsx` (Chart.js heatmap from Prisma trends, MatchScore OpenAI soft skills parse 0-100); cron `/api/cron/matches` SendGrid emails; RBAC recruiter role, Stripe sub check.

5. **Career Journey**: Prisma missions (id Int, userId String, task String, status Enum[pending,done]); `/api/journey/route.ts` POST suggestTasks OpenAI gaps; StatusTracker.jsx Framer progress/badges, gamified streaks; email fallback notifications.

6. **Dynamic Profiles**: `/profile/page.tsx` shadcn Tabs (CV/Education/Experience/Preferences/Salary/Region/Status); `/api/profile/bio` GET OpenAI witty 8% humor emojis/puns; quick-edit Dialogs; Sharp photo; Teal-like cards; auth-protected; Vercel image opt.

7. **Cross-Platform Comms**: As above.

8. **AI Transparency**: explainMatch in core (score breakdown skills 40% etc., EUR-Lex links); ExplainButton.jsx shadcn modal.

9. **Personality/Humor**: As above.

### User Data/Personalization

Onboarding forms collect demographics/location (IP headers)/distance/remote prefs; proactive best-job search.

### Multilingual

i18next for 24+ EU languages (en/nl/de/fr/es/it/pl/sv/da/no/fi/pt/cs/hu/ro/bg/hr/sk/sl/et/lv/lt/mt/el/cy); consistent AI responses via multilingual prompts.

### UI

shadcn components, Framer animations, react-infinite-scroll for jobs; /jobs page filters, /dashboard metrics, /ai chat interface.

### Testing

Add Jest for units (e.g., test fallback triggers), curl scripts for APIs.

---

Generate complete code/structure for Vercel deploy, beautiful v0.dev design with gradients/professional typography, interactive AI widget.
