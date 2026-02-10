# Website-structuur skelet (lean, modulair, uitbreidbaar)

Dit document vertaalt de gewenste productrichting naar een **uitvoerbaar skelet** voor een klein team (1–2 personen), met focus op snelle validatie en lage operationele complexiteit.

## 1) Informatie-architectuur: pagina's en routes

### Publiek

- `/` — Landing met duidelijke nichepositionering (EU tech starters) en CTA naar intake.
- `/how-it-works` — Uitleg van de flow: profiel → matches → actieplan.
- `/pricing` — Tiers en limieten per plan.
- `/privacy` en `/terms` — Juridische basis + transparantie over datagebruik.
- `/guides/*` en `/jobs/*` — SEO-hubs (gefaseerd uitrollen).

### Onboarding

- `/start` — Korte intake (land, taal, roltype, senioriteit, locatie/remote).
- `/import` — CV-upload of plakken van profieltekst met expliciete consent.
- `/report` — Eerste fit-resultaat met uitleg en next steps.

### Logged-in werkzoeker

- `/app` — Dashboard: status, nieuwe matches, acties.
- `/app/chat` — JobPilot Agent met context.
- `/app/matches` — Matchlijst met fitscore en redenen.
- `/app/pipeline` — Saved → Applied → Interview → Offer → Rejected.
- `/app/profile` — Skills, voorkeuren, salarisrange, talen, locatie.
- `/app/documents` — CV-versies en sollicitatiedocumenten.
- `/app/settings` — Consentbeheer, export en verwijdering.

### Werkgever (later)

- `/employers` — Landing + wachtlijst (MVP: geen volledige portal).
- `/employers/app` — Dashboard in fase 2/3.

### Admin (intern)

- `/admin` — Brongezondheid, dedupe, abuse, billing, logs.

## 2) Software-architectuur: lean monolith + workers

### Principes

- **Monorepo** met één webapp + API (Next.js).
- **Geen microservices/Kubernetes in jaar 1**.
- Asynchrone ingest en verwerking via workers + queue.

### Kernonderdelen

1. Auth & Accounts
2. User Profile
3. Consent & GDPR
4. Job Catalog
5. Search/Ranking
6. Matching
7. Agent Controller (LLM gateway)
8. Billing
9. Notifications (email)
10. Analytics/Event tracking
11. Admin Ops

### Ingest-pipeline (worker-jobs)

- `jobs:ingest`
- `jobs:normalize`
- `jobs:dedupe`
- `jobs:freshness`
- `jobs:index`

Queue-opties:

- BullMQ + Redis, of
- platform-native queue (bijv. Supabase queues)

### Externe services (minimale stack)

- Postgres (source of truth)
- Zoeklaag: Postgres FTS of Meilisearch (Elasticsearch pas bij duidelijke schaaldruk)
- Email provider
- Stripe voor subscriptions
- Sentry + basis metrics

## 3) Data-architectuur: kernmodel + auditability

### Kern-tabellen

1. `users`
2. `sessions` / `accounts`
3. `profiles`
4. `profile_skills`
5. `consents`
6. `jobs`
7. `job_sources`
8. `job_raw`
9. `job_dedupe_links`
10. `job_events`
11. `matches`
12. `saved_jobs`
13. `applications`
14. `documents`
15. `messages`
16. `billing_customers`, `subscriptions`, `invoices`
17. `events`

### Trust-principe

Voor `matches` niet alleen score opslaan, maar ook:

- `reasons[]`
- `confidence`
- `version` (algoritmeversie)
- `data_snapshot_ref` (welke profiel/jobversie)

Dit maakt aanbevelingen uitlegbaar en verdedigbaar richting gebruikers en audits.

## 4) Faseringsadvies

### Fase 1 (0–8 weken): Job Fit Report MVP

- Legale job sources (2–5)
- Normalisatie + dedupe + freshness basis
- Profiel + consent
- Matchscore + uitleg
- Buddy-agent op eigen data

### Fase 2 (2–4 maanden): subscriptions + Manager mode

- Stripe-subscriptions
- Email alerts
- Document-assistent
- Usage caps per tier

### Fase 3 (4–8 maanden): marketing + SEO scale

- Programmatic pages (`/jobs/*`, `/guides/*`)
- Referrals, digests, content loops
- Dashboarding op groei-metrics

### Fase 4 (8–12 maanden): werkgever/ATS (optioneel)

- Employer intake + postings
- ATS-adapters
- Recruiter dashboard

## 5) Guardrails (bewuste niet-keuzes voor jaar 1)

- Geen Kubernetes/EKS.
- Geen werkgeversportaal in MVP.
- Geen multi-region/multi-DB setup.
- Geen scraping van verboden platformdata.
- Geen overcomplexe search-stack zonder tractie-signaal.

## 6) Concreet MVP-routepakket

Bouw als eerste:

- `/`
- `/start`
- `/import`
- `/report`
- `/app`
- `/app/chat`
- `/app/matches`
- `/app/profile`
- `/app/settings`
- `/privacy`
- `/terms`

Alles daarbuiten blijft voorbereid in structuur, maar gefaseerd geactiveerd.
