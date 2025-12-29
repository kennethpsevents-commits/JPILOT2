# Groei- en Structuurdocument (v1–v3)

Dit document beschrijft de KPI-doelen per jaar, doelgroepgerichte user-flows, een schaalbare site-map per fase, domeinmodules met groeipad, datastromen die omzet sturen en een gefaseerd groeimodel richting **100k subscriptions in jaar 1** en **100% YoY growth**, waardoor **500k+ subscriptions** en **€5M/jaar** uiterlijk in jaar 3–4 haalbaar zijn.

## 1) KPI-doelen per jaar (Jaar 1–5)

**Assumpties**
- Core metric: betaalde subscription (B2C job seeker + B2B employer).  
- ARPU is blended (B2C + B2B).  
- Retentie en churn per maand.  
- CAC per geactiveerde subscription.  
- LTV = ARPU / churn (vereenvoudigde monthly SaaS-formule).

| Jaar | Omzet (€) | Subscriptions (eind jaar) | Net add/jaar | Churn (mnd) | CAC (€) | ARPU (mnd) | LTV (€) | LTV:CAC |
|------|-----------|---------------------------|-------------|-------------|--------|------------|---------|---------|
| 1    | 1.7M      | 100k                      | 100k        | 5.5%        | 20     | 4.5        | 82      | 4.1x    |
| 2    | 3.4M      | 200k                      | 100k        | 4.5%        | 18     | 4.8        | 107     | 5.9x    |
| 3    | 5.0M      | 400k                      | 200k        | 3.5%        | 16     | 5.2        | 149     | 9.3x    |
| 4    | 6.0M      | 800k                      | 400k        | 2.8%        | 14     | 5.5        | 196     | 14.0x   |
| 5    | 7.5M      | 1,600k                    | 800k        | 2.2%        | 12     | 5.9        | 268     | 22.3x   |

**KPI-notities**
- **Jaar 1**: **Hard marketing** focus en agressieve acquisitie om **100k subscriptions** te halen.
- **Jaar 2–5**: **100% YoY growth** in subscriptions als target; retention en ARPU omhoog.
- Deze targets vereisen een **always-on growth engine** (zie sectie 2.5 en 5.2).

## 2) User-flows per doelgroep (incl. conversiepaden)

### Job seekers (B2C)
1. **Awareness** → landing (SEO/ads/partners)  
2. **Activation** → account + profiel + voorkeuren + CV upload  
3. **Engagement** → job discovery + matching + aanbevolen acties  
4. **Conversion** → premium trial → paid subscription  
5. **Retention** → job alerts + success tracking + upgrades (AI assist)

**Conversiepaden**
- Free → Premium: waarde-activatie binnen 24–72 uur (match score + 1 snelle sollicitatie).
- Upsell: CV-review, AI-verbetering, priority apply.

### Werkgevers (B2B)
1. **Awareness** → employer landing (sector/role use cases)  
2. **Activation** → bedrijfspagina + vacature plaatsen  
3. **Engagement** → kandidaten pipeline + matching  
4. **Conversion** → trial → employer subscription of credits  
5. **Retention** → time-to-hire reporting + team seats

**Conversiepaden**
- Free vacature → betaalde sponsoring of subscription.
- Team seats + compliance reports → mid/enterprise.

### Admins (intern)
1. **Onboarding** → rollen + permissions  
2. **Operations** → content moderation + compliance  
3. **Insights** → KPI dashboards (funnel & churn)  
4. **Automation** → SLA & escalatie management

### Partners (opleiders, communities, affiliates)
1. **Onboarding** → partner portal + tracking  
2. **Activation** → referrals/pipelines configureren  
3. **Conversion** → revenue share  
4. **Retention** → dashboards + marketing assets

## 2.5) Zelf-marketing growth engine (always-on)

**Doel**: een slimme growth engine die continu campagnes optimaliseert en SEO/SEA/paid acquisition versterkt om **100k subs in jaar 1** te halen en **100% YoY growth** te ondersteunen.

**Wat is wel realistisch?**  
Een “non-stop marketing prompt” kan een **automatiseringslaag** zijn die marketing- en growth-signalen vertaalt naar acties. Het is geen magisch systeem dat vanzelf #1 in Google wordt, maar een **growth engine** die continu experimenten uitvoert en optimaliseert.

**Kerncomponenten (v1 → v3)**
1. **Signal & Insight Layer**  
   - Capture: zoektermen, ad performance, on-site behavior, cohort data.  
   - Output: prioriteiten voor landing pages, ad creatives, messaging, niches.
2. **Experiment & Content Engine**  
   - SEO: long-tail landings, programmatic SEO, structured data.  
   - SEA: ad copy varianten + budget shifts per conversie.  
   - Social: creatives + audiences per sector/rol.
3. **Automation & Feedback Loop**  
   - LLM-ondersteunde copy/asset generation + A/B testing.  
   - Budget allocatie op basis van CAC/LTV per cohort.  
   - Alerts bij churn/retentie daling en re-engagement flows.

**Hard Marketing plan (Jaar 1)**
- 60% budget op bewezen kanalen (Google Ads, Meta, LinkedIn).  
- 25% SEO + programmatic content (jobs, sector/skill pages).  
- 15% partnerships + affiliates.  
- **Weekly cadence**: test 3–5 nieuwe ads/landings + kill/scale op CAC.

**Output**  
- Blended CAC ≤ €20, conversie van activatie → subscription ≥ 2.5–3.0%.
- “Always-on” marketing automation die elke week optimaliseert.

## 3) Schaalbare site-map per fase

### v1 (MVP: activation + basic subscription)
- **Home / Landing**
- **Job zoekers**: sign-up, profiel, job search, job detail, apply
- **Werkgevers**: employer landing, employer sign-up, vacature aanmaken
- **Pricing**: B2C + B2B
- **Billing**: checkout, subscription management
- **Admin**: basic moderation, user management
- **Support**: help center, contact

### v2 (Growth: matching + pipeline + analytics)
- **AI matching**: match score, aanbevolen kandidaten/banen
- **Applications pipeline**: stages, notes, messaging
- **Employer portal**: team seats, templates, talent pool
- **Analytics**: funnels, cohort, churn, CAC, LTV
- **Partner portal**: referrals + tracking
- **Compliance**: GDPR requests, audit logs (basic)

### v3 (Scale: enterprise + automation)
- **Enterprise**: SSO, SCIM, custom roles
- **Automation**: workflow rules, auto-screening
- **Advanced analytics**: predictive churn, LTV
- **Compliance/Audit**: full audit trails, retention policies
- **Marketplace**: integrations (ATS, HRIS, CRM)

## 4) Domeinmodules met groeipad

1. **AI Matching**  
   - v1: rules-based + filters  
   - v2: ML ranking + explainability  
   - v3: personalization + cohort optimization

2. **Jobs**  
   - v1: CRUD vacatures + basis search  
   - v2: targeting + sponsored jobs  
   - v3: multi-location, templates, A/B

3. **Applications Pipeline**  
   - v1: apply + status  
   - v2: stages, messaging, notes  
   - v3: automation + SLA tracking

4. **Employer Portal**  
   - v1: single-user account  
   - v2: team seats + roles  
   - v3: enterprise controls

5. **Billing**  
   - v1: subscriptions + basic invoices  
   - v2: metered billing + coupons  
   - v3: enterprise billing + PO workflows

6. **Analytics**  
   - v1: core KPIs  
   - v2: funnel + cohort  
   - v3: predictive + benchmark

7. **Compliance/Audit**  
   - v1: GDPR basics  
   - v2: audit logs  
   - v3: retention + DLP

## 5) Datastromen die omzet sturen (activation → conversion → retention)

**Activation**
- Channel → landing → sign-up → profiel compleet  
- Event tracking: `signup`, `profile_complete`, `first_search`, `first_apply`

**Conversion**
- Trigger: AI match + 1st apply → paywall  
- Event tracking: `trial_start`, `subscription_start`, `payment_success`

**Retention**
- Job alerts + match improvements + employer pipeline success  
- Event tracking: `weekly_active`, `renewal`, `churn`

**Datastroom**
1. **Event capture** → analytics warehouse  
2. **Segmentation** → activation cohorts  
3. **Lifecycle automation** → nudges + upsell  
4. **Revenue attribution** → channel ROI & CAC

## 5.2) Growth engine datastromen (marketing automation)
- **Input events**: ad_click, keyword_intent, landing_view, signup, activation, trial_start.  
- **Modeling**: cohort LTV per channel + funnel drop-off analysis.  
- **Actions**: dynamic budget shifts, auto-generated ads/landing variants, retargeting rules.  
- **Output metric**: CAC, conversion rate, LTV:CAC per cohort.

## 6) Resultaat: pad naar 500k+ subscriptions en €5M/jaar

**Fase 1 (v1, Jaar 1)**
- Focus: hard marketing + activatie + eerste conversions  
- KPI: **100k subs**, €1.7M omzet  
- Kern: growth engine + bewezen kanalen + snelle iteratie

**Fase 2 (v2, Jaar 2–3)**
- Focus: matching, pipeline, partners  
- KPI: **400k subs**, €5.0M omzet  
- Kern: retention verbeteren & CAC dalen

**Fase 3 (v3, Jaar 4–5)**
- Focus: enterprise, automation, analytics  
- KPI: **1.6M subs**, €7.5M omzet  
- Kern: schaal + hogere ARPU

**Mijlpaal**: 500k subscriptions wordt verwacht in **jaar 4** met deze 100% YoY growth curve.

---

## 7) Deep-dive: “trusted code” en stabiliteit (audit + upgrades)

**Doel**: het niveau van betrouwbaarheid en stabiliteit van een “major website” benaderen, zonder code te kopiëren.  
Dit is een **kwaliteits- en architectuur-audit** van de huidige codebase met concrete verbeteringen.

### 7.1 Core stabiliteitspijlers (wat “trusted” betekent)
1. **Reliability**: foutafhandeling, retries, timeouts, idempotency.  
2. **Security**: auth, input validation, secrets, dependency hygiene.  
3. **Performance**: page speed, server response, caching, DB indexes.  
4. **Observability**: logging, metrics, tracing, alerting.  
5. **Maintainability**: tests, linting, CI/CD, code standards.  
6. **Scalability**: stateless services, queueing, rate limits.

### 7.2 Deep-dive checklist (audit in stappen)
**A. Code kwaliteit & tests**
- Unit/integration tests dekken kritieke flows (auth, billing, matching).
- Static analysis: lint, typechecks, security scanning.
- CI gates: tests + lint verplicht op elke PR.

**B. Security & compliance**
- OWASP top 10 review (XSS, CSRF, auth/session, SSRF).
- Secrets in vault + rotation policy.
- GDPR flows: data export, delete requests, audit logs.

**C. Performance & scaling**
- Page speed audits (LCP/TTFB/CLS) en caching strategy.
- DB performance: indices, query optimization, pooling.
- Async jobs voor heavy tasks (matching, bulk email).

**D. Observability**
- Central logging (request-id, error correlation).
- Metrics: error rates, latency, conversion drop-offs.
- Alerts: p95 latency, payment failures, churn spikes.

**E. Release & ops**
- Staging environment + canary releases.
- Feature flags + rollbacks.
- Backups + disaster recovery plan.

### 7.3 Upgrade roadmap (prioriteit)
**P0 (direct, stabiliteit)**
- Basis test coverage op core flows + error handling.
- Security scan + dependency updates.
- Central logging + alerts.

**P1 (scale & performance)**
- Caching layer + DB optimizations.
- Queue/worker voor matching en email.
- Rate-limits + abuse detection.

**P2 (enterprise readiness)**
- SSO, audit trails, data retention policies.
- SOC2-ready practices, IaC hardening.

### 7.4 Output van de deep-dive
- **Auditrapport** met “good things” en “downfalls”.
- Concrete backlog (per module) met verbeteringen.
- KPI’s: error rate < 0.5%, uptime 99.9%, p95 < 500ms.

---

## 8) Technical Specification (academic framing for stability + architecture)

Deze sectie vertaalt de richting naar **Systems Architecture** en **Algorithmic Theory**. Het doel is niet marketing, maar **audit‑proof** technische fundamenten die stabiliteit en schaalbaarheid garanderen.

### 8.1 Executive Abstract (Architectural Upgrade)
We pivot from deterministic keyword retrieval to a **Hybrid RAG architecture** with semantic vector search, enabling higher match precision while maintaining strict reliability and observability guarantees.

### 8.2 Neural Architecture & Information Retrieval
- **Vector Embeddings**: transformer embeddings for CVs en vacatures (bijv. 1,536‑dimensional vectors).  
- **Semantic Scoring**: cosine similarity + **MMR** voor diversiteit in aanbevelingen.  
- **Hybrid Retrieval**: combineer vector search met structured filters (location, contract type, salary).

**Stability safeguards**
- Fallback naar structured search als vector service degradeert.  
- Cache hot queries + embeddings om latency spikes te beperken.

### 8.3 Human‑Parity Agentic Support (HPAS)
- **Supervisor‑Worker Pattern** voor agentic flows:  
  1. **Primary Agent**: produceert antwoorden/adviezen.  
  2. **Supervisor**: detecteert herhaling of lage confidence.  
  3. **Handover**: serialize `CurrentSessionState` naar specialist persona.

**Reliability focus**
- Rate‑limits + timeout guards.  
- Deterministic fallbacks voor kernflows (support, billing).

### 8.4 Proposed Technical Stack Upgrade (indicatief)
| Component | Baseline | Upgrade |
| --- | --- | --- |
| Search Logic | Keyword | Vector Semantic + filters |
| UI | Form‑based | Conversational + task flows |
| Data | SQL | SQL + Vector DB + Graph |
| Logic | Monolith | Multi‑agent workflows |
| Support | Template bots | Supervisor‑Worker agents |

### 8.5 Algorithmic Error Protection
**Recursive Error Correction (REC)**:  
1. Detecteer inconsistenties (self‑check).  
2. Verifieer tegen “truth anchors” (real‑time data).  
3. Render output pas na verificatie.

### 8.6 Stabiliteitsimpact (concreet)
- **Latency control** via caching + fallback search.  
- **Reliability** door supervisor‑agent en deterministic guardrails.  
- **Observability**: trace IDs voor agent steps + error taxonomie.  
- **Security**: input sanitization + model prompt hardening.

**Succesformule**
- **Activation**: snelle waarde (match + apply)  
- **Conversion**: duidelijke premium waarde  
- **Retention**: job success + employer ROI  
- **Scale**: B2B + partners → blended ARPU omhoog
