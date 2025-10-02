# Cursor AI - Deployment Instructies

Kopieer en plak deze prompt in Cursor nadat je de v0 design hebt geëxporteerd naar GitHub:

---

## PROMPT VOOR CURSOR:

\`\`\`
Ik heb een Vercel v0 design geëxporteerd naar GitHub (repo: wearejobpilot-design) en wil dit mergen met mijn bestaande engine repo (repo: wearejobpilot-engine).

**Context:**
- v0 Design Repo: bevat frontend UI (app/, components/, public/, globals.css)
- Engine Repo: bevat backend logic (Supabase, API routes, database, auth)
- Doel: Merge frontend design met backend engine en deploy naar www.wearejobpilot.com

**Stappen die ik wil dat je helpt:**

1. **Analyseer beide repos:**
   - Lees CURSOR_HANDOFF.md in de v0 design repo
   - Identificeer conflicten tussen design en engine repos
   - Maak een merge plan

2. **Merge Frontend Layers:**
   - Kopieer /app/* van design naar engine (behoud engine's API routes)
   - Kopieer /components/* van design naar engine (check voor duplicaten)
   - Kopieer /public/* afbeeldingen naar engine
   - Merge globals.css (behoud design tokens van beide)

3. **Fix Imports & Dependencies:**
   - Update alle imports die verwijzen naar engine's utilities
   - Merge package.json dependencies
   - Fix TypeScript errors
   - Zorg dat Supabase clients correct zijn geïmporteerd

4. **Test Lokaal:**
   - Run `pnpm install`
   - Run `pnpm dev`
   - Controleer of alle pagina's laden zonder errors
   - Test database connecties

5. **Prepare voor Deployment:**
   - Controleer environment variables
   - Zorg dat alle images laden
   - Fix eventuele console errors
   - Optimaliseer voor productie

**Belangrijke Regels:**
- NIET overschrijven: /lib/db, /lib/supabase, /api routes met backend logic
- WEL overschrijven: /app/page.tsx, /components/ui, /public/images
- Merge voorzichtig: app/layout.tsx, globals.css, package.json
- Behoud alle Supabase configuratie van de engine repo

**Verwachte Output:**
- Werkende merge zonder errors
- Alle v0 design componenten zichtbaar
- Backend functionaliteit intact
- Klaar voor `vercel --prod` deployment

Begin met het analyseren van CURSOR_HANDOFF.md en geef me een merge plan.
\`\`\`

---

## Wanneer deze prompt gebruiken:

**STAP 1: Export van v0 (DOE DIT NU)**
1. Klik op "Push to GitHub" in v0 (rechtsboven)
2. Naam: `wearejobpilot-design`
3. Wacht op bevestiging

**STAP 2: Clone beide repos**
\`\`\`bash
git clone https://github.com/jouw-username/wearejobpilot-engine.git engine
git clone https://github.com/jouw-username/wearejobpilot-design.git design
\`\`\`

**STAP 3: Open engine repo in Cursor**
\`\`\`bash
cd engine
cursor .
\`\`\`

**STAP 4: Geef Cursor de prompt**
- Kopieer de prompt hierboven (tussen de ``` markeringen)
- Plak in Cursor's chat
- Cursor zal CURSOR_HANDOFF.md lezen en een merge plan maken

**STAP 5: Volg Cursor's instructies**
- Cursor zal stap-voor-stap de merge uitvoeren
- Test lokaal met `pnpm dev`
- Deploy met `vercel --prod`

---

## Alternatieve Korte Prompt (als je snel wilt):

\`\`\`
Read CURSOR_HANDOFF.md from the wearejobpilot-design repo and help me merge the v0 frontend design with my existing wearejobpilot-engine backend. Keep all backend logic intact, only update frontend layers (app/, components/, public/). Then prepare for deployment to www.wearejobpilot.com.
\`\`\`

---

## Troubleshooting:

**Als Cursor vraagt om de v0 code:**
- Zeg: "The v0 design is already exported to GitHub at wearejobpilot-design repo"
- Geef Cursor toegang tot beide repos

**Als Cursor niet weet waar te beginnen:**
- Zeg: "Start by reading CURSOR_HANDOFF.md in the design repo"

**Als er merge conflicten zijn:**
- Zeg: "Keep engine's backend logic, use design's frontend components"

---

Succes met de deployment! 🚀
