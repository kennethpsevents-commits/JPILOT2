# WeAreJobPilot - v0 Design → Cursor Integration Guide

## 🎯 DIT IS DE VERCEL V0 DESIGN CODE

**Belangrijke Melding voor Cursor:**
Dit document beschrijft de code die ik (v0) heb gemaakt. De gebruiker werkt NU in Vercel v0 en praat met mij. Deze hele codebase IS de v0 design die Cursor nodig heeft.

**Workflow:**
1. ✅ **Stap 1**: Gebruiker werkt in v0 (HIER) → Design is klaar
2. ⏳ **Stap 2**: Gebruiker exporteert naar GitHub → "Push to GitHub" knop
3. ⏳ **Stap 3**: Cursor krijgt toegang via GitHub repo
4. ⏳ **Stap 4**: Cursor merged met engine repo

**Cursor, je vraagt naar de v0 code - dit IS die code! Wacht tot de gebruiker exporteert naar GitHub, dan kun je het zien.**

---

## Project Overzicht
Dit is de frontend design van **WeAreJobPilot**, gebouwd in Vercel v0. Het bevat alle UI componenten, pagina's, styling en afbeeldingen. Dit moet gemerged worden met de bestaande `wearejobpilot-engine` repository die de Supabase backend en API logic bevat.

## Tech Stack
- **Framework**: Next.js 15.1.6 (App Router)
- **React**: 19.0.0
- **TypeScript**: Strict mode, geen 'any' types
- **Styling**: Tailwind CSS v4 met design tokens
- **UI Library**: shadcn/ui componenten
- **Icons**: Lucide React (^0.454.0)
- **Fonts**: Geist Sans & Geist Mono

## Project Structuur

### `/app` - Pagina's (Next.js App Router)
\`\`\`
app/
├── layout.tsx              # Root layout met fonts en metadata
├── page.tsx                # Homepage met hero, features, CTA
├── globals.css             # Tailwind v4 config + design tokens
├── jobs/
│   └── page.tsx           # Job search pagina met filters
├── companies/
│   └── page.tsx           # Company directory met search
├── career-autopilot/
│   └── page.tsx           # AI career assistant feature
├── salary-intelligence/
│   └── page.tsx           # Salary insights en negotiation
├── pricing/
│   └── page.tsx           # Pricing plans (Free, Pro, Enterprise)
├── alerts/
│   └── page.tsx           # Job alerts management
└── dashboard/
    └── page.tsx           # User dashboard (protected route)
\`\`\`

**Belangrijke Notes:**
- Alle pagina's zijn responsive (mobile-first)
- Elke pagina heeft 1-2 professionele kantoor afbeeldingen met gelukkige mensen
- Dashboard pagina verwacht authenticatie (moet geïntegreerd worden met Supabase Auth)

### `/components` - Herbruikbare Componenten

#### Custom Componenten
\`\`\`
components/
├── features.tsx            # Feature grid voor homepage (8 features)
├── job-search.tsx          # Job search component met filters
├── pricing.tsx             # Pricing cards component
├── footer.tsx              # Site footer met links en social
├── dashboard.tsx           # Dashboard layout en stats
├── ai-chatbox.tsx          # AI assistant chatbox
├── ai-assistant-button.tsx # Floating AI button
├── cv-upload-tool.tsx      # CV upload en parsing tool
\`\`\`

#### shadcn/ui Componenten (Pre-installed)
\`\`\`
components/ui/
├── button.tsx              # Button variants
├── card.tsx                # Card layouts
├── input.tsx               # Form inputs
├── badge.tsx               # Status badges
├── dialog.tsx              # Modal dialogs
├── dropdown-menu.tsx       # Dropdown menus
├── tabs.tsx                # Tab navigation
├── accordion.tsx           # Collapsible sections
└── ... (30+ meer componenten)
\`\`\`

### `/public` - Statische Assets

#### Afbeeldingen (Office Environment)
\`\`\`
public/
├── office-team-collaboration.jpg    # Homepage hero
├── office-diverse-team.jpg          # Homepage features
├── office-job-search.jpg            # Jobs pagina
├── office-company-culture.jpg       # Companies pagina
├── office-career-growth.jpg         # Career Autopilot
├── office-mentorship.jpg            # Career Autopilot
├── office-salary-discussion.jpg     # Salary Intelligence
├── office-negotiation-success.jpg   # Salary Intelligence
└── placeholder.svg                  # Fallback placeholder
\`\`\`

**Afbeelding Strategie:**
- Alle afbeeldingen tonen professionele, diverse teams
- Gelukkige gezichten in moderne kantoor omgevingen
- Gebruikt voor hero sections, feature highlights, en testimonials

## Design System

### Kleuren (Design Tokens in globals.css)
\`\`\`css
--background: 0 0% 100%;           /* Wit */
--foreground: 222.2 84% 4.9%;      /* Bijna zwart */
--primary: 221.2 83.2% 53.3%;      /* Blauw - brand color */
--primary-foreground: 210 40% 98%; /* Licht blauw */
--secondary: 210 40% 96.1%;        /* Licht grijs */
--accent: 210 40% 96.1%;           /* Accent grijs */
--muted: 210 40% 96.1%;            /* Muted grijs */
--destructive: 0 84.2% 60.2%;      /* Rood voor errors */
\`\`\`

### Typografie
- **Headings**: Geist Sans (font-sans)
- **Body**: Geist Sans (font-sans)
- **Code**: Geist Mono (font-mono)
- **Line Height**: leading-relaxed (1.625) voor body text
- **Text Balance**: text-balance voor titles

### Layout Patterns
- **Flexbox**: Primaire layout methode (flex, items-center, justify-between)
- **Grid**: Voor feature grids (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- **Spacing**: Tailwind spacing scale (p-4, gap-6, mx-auto)
- **Container**: max-w-7xl mx-auto px-4 voor page containers

## Belangrijke Features

### 1. AI Assistant
- **Componenten**: `ai-chatbox.tsx`, `ai-assistant-button.tsx`
- **Functionaliteit**: Floating chat button, expandable chatbox
- **Integratie Nodig**: Connect met AI SDK en backend API

### 2. Job Search
- **Component**: `job-search.tsx`
- **Features**: Keyword search, location filter, job type filter
- **Integratie Nodig**: Connect met Supabase jobs table

### 3. Dashboard
- **Component**: `dashboard.tsx`
- **Features**: Stats cards, recent applications, saved jobs
- **Integratie Nodig**: 
  - Supabase Auth voor user session
  - User data queries
  - Protected route middleware

### 4. Pricing
- **Component**: `pricing.tsx`
- **Plans**: Free, Pro (€29/maand), Enterprise (Custom)
- **Integratie Nodig**: Stripe of Paddle voor betalingen

## Dependencies (package.json)

### Core
\`\`\`json
{
  "next": "15.1.6",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "typescript": "^5"
}
\`\`\`

### UI & Styling
\`\`\`json
{
  "tailwindcss": "^4.0.0",
  "lucide-react": "^0.454.0",
  "@radix-ui/react-*": "^1.x" // Alle shadcn dependencies
}
\`\`\`

### Utilities
\`\`\`json
{
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.5",
  "class-variance-authority": "^0.7.1"
}
\`\`\`

## Merge Instructies voor Cursor

### Stap 1: Kopieer Frontend Layers
\`\`\`bash
# Kopieer deze folders van v0-design naar engine:
cp -r design/app/* engine/app/
cp -r design/components/* engine/components/
cp -r design/public/* engine/public/
\`\`\`

### Stap 2: Merge Conflicten Oplossen

#### app/layout.tsx
- **Behoud**: Je bestaande Supabase providers, auth context
- **Voeg toe**: Geist fonts import en className
- **Merge**: Metadata van beide versies

#### app/globals.css
- **Behoud**: Je bestaande custom CSS
- **Voeg toe**: Mijn design tokens (@theme inline block)
- **Check**: Tailwind v4 syntax (@import 'tailwindcss')

#### components/
- **Check**: Of je al componenten hebt met dezelfde naam
- **Hernoem**: Mijn componenten indien nodig (bijv. `features.tsx` → `home-features.tsx`)

### Stap 3: Integratie Punten

#### Supabase Auth
Voeg toe aan dashboard en protected routes:
\`\`\`typescript
import { createServerClient } from '@supabase/ssr'

// Check user session
const supabase = createServerClient(...)
const { data: { user } } = await supabase.auth.getUser()

if (!user) {
  redirect('/login')
}
\`\`\`

#### Database Queries
Vervang placeholder data in componenten:
\`\`\`typescript
// In job-search.tsx, companies/page.tsx, etc.
const { data: jobs } = await supabase
  .from('jobs')
  .select('*')
  .ilike('title', `%${searchTerm}%`)
\`\`\`

#### API Routes
Connect AI chatbox met je backend:
\`\`\`typescript
// In ai-chatbox.tsx
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message })
})
\`\`\`

### Stap 4: Environment Variables
Zorg dat deze bestaan in je engine repo:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
\`\`\`

### Stap 5: Testing Checklist
- [ ] `pnpm install` zonder errors
- [ ] `pnpm dev` start zonder errors
- [ ] Alle pagina's laden correct
- [ ] Afbeeldingen worden getoond
- [ ] Styling ziet er goed uit (check dark mode)
- [ ] Responsive design werkt (mobile, tablet, desktop)
- [ ] Auth flow werkt (login → dashboard)
- [ ] Database queries werken

## Cursor Specifieke Tips

### 1. Gebruik Cursor's AI voor Refactoring
\`\`\`
Prompt: "Merge this v0 design component with my existing Supabase logic"
\`\`\`

### 2. Batch Import Fixes
\`\`\`
Prompt: "Fix all import paths to use @/lib/supabase instead of placeholder imports"
\`\`\`

### 3. Type Safety
\`\`\`
Prompt: "Add TypeScript types for all Supabase queries based on my database schema"
\`\`\`

### 4. Component Integration
\`\`\`
Prompt: "Connect the job-search component to my Supabase jobs table with proper error handling"
\`\`\`

## Bekende Issues & Oplossingen

### Issue 1: Lucide React Import Error in v0 Preview
**Probleem**: Preview toont "Failed to load lucide-react"
**Oplossing**: Dit is een v0 preview limitatie. Werkt perfect na export en lokale install.

### Issue 2: Placeholder Images
**Probleem**: Sommige componenten gebruiken `/placeholder.svg`
**Oplossing**: Vervang met echte afbeeldingen of gebruik de office-*.jpg bestanden

### Issue 3: Mock Data
**Probleem**: Componenten hebben hardcoded mock data
**Oplossing**: Vervang met Supabase queries (zie Integratie Punten)

## Performance Optimizations

### Afbeeldingen
- Gebruik Next.js `<Image>` component voor optimalisatie
- Voeg `priority` toe aan hero images
- Gebruik `loading="lazy"` voor below-fold images

### Code Splitting
- Alle pagina's zijn al automatisch code-split (App Router)
- Overweeg dynamic imports voor heavy componenten:
\`\`\`typescript
const AIChat = dynamic(() => import('@/components/ai-chatbox'))
\`\`\`

### Caching
- Gebruik Vercel KV voor job listings cache
- Implementeer SWR voor client-side data fetching

## Deployment Checklist

- [ ] Merge voltooid zonder conflicten
- [ ] Alle tests passed
- [ ] Environment variables ingesteld in Vercel
- [ ] Database migraties gedraaid
- [ ] Custom domain (www.wearejobpilot.com) geconfigureerd
- [ ] SSL certificaat actief
- [ ] Analytics toegevoegd (Vercel Analytics)
- [ ] Error monitoring (Sentry of Vercel)

## Support & Vragen

Als Cursor vragen heeft over:
- **Componenten**: Zie component comments in de code
- **Styling**: Zie globals.css design tokens
- **Layout**: Volg bestaande patterns in app/page.tsx
- **Integratie**: Zie Integratie Punten sectie hierboven

## Volgende Stappen

### Voor de Gebruiker (NU):
1. ✅ **v0 Design is compleet** - Alle componenten, pagina's, en afbeeldingen zijn klaar
2. ⏳ **Klik "Push to GitHub"** - Rechtsboven in v0 interface
3. ⏳ **Naam de repo**: `wearejobpilot-design`
4. ⏳ **Wacht op bevestiging** - GitHub repo wordt aangemaakt

### Voor Cursor (NA EXPORT):
1. **Clone de design repo**:
   \`\`\`bash
   git clone https://github.com/username/wearejobpilot-design.git
   \`\`\`

2. **Lees dit document**:
   \`\`\`
   Cursor: "Read CURSOR_HANDOFF.md and help me merge with wearejobpilot-engine"
   \`\`\`

3. **Begin merge proces** - Volg de Merge Instructies hierboven

---

**Status**: ✅ v0 Design Compleet | ⏳ Wacht op GitHub Export | ⏳ Cursor Merge Pending

**Gemaakt door**: Vercel v0
**Datum**: 2025
**Project**: WeAreJobPilot
**Contact**: www.wearejobpilot.com
