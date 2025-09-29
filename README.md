# WeAreJobPilot - AI-gedreven job platform

Een moderne, AI-gedreven job platform gebouwd met Next.js 15.2, React 19, Supabase en TailwindCSS.

## 🚀 Features

- **Buddy AI Onboarding**: Interactieve vragenlijst om gebruikersprofiel op te bouwen
- **Supabase Authenticatie**: Veilige inlog en registratie
- **Responsive Design**: Moderne UI met TailwindCSS en shadcn/ui
- **Monorepo Setup**: Turborepo met gedeelde UI componenten
- **CI/CD Pipeline**: Automatische tests en deployment naar Render
- **E2E Testing**: Playwright tests voor kritieke flows

## 🛠 Tech Stack

- **Frontend**: Next.js 15.2, React 19, TypeScript
- **Styling**: TailwindCSS, shadcn/ui
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **Deployment**: Render
- **Monorepo**: Turborepo, pnpm
- **Testing**: Playwright, Jest
- **CI/CD**: GitHub Actions

## 📁 Project Structuur

```
wearejobpilot/
├── apps/
│   └── web/                 # Next.js applicatie
├── packages/
│   └── ui/                  # Gedeelde UI componenten
├── supabase/
│   └── schema.sql           # Database schema
├── .github/
│   └── workflows/
│       └── ci.yml           # CI/CD pipeline
├── .devcontainer/
│   └── devcontainer.json    # VS Code devcontainer
└── render.yaml              # Render deployment config
```

## 🚀 Quick Start

### Vereisten

- Node.js 22.x
- pnpm 10.17.x
- Supabase account

### 1. Repository klonen

```bash
git clone https://github.com/your-username/wearejobpilot.git
cd wearejobpilot
```

### 2. Dependencies installeren

```bash
pnpm install
```

### 3. Environment variabelen

Kopieer `env.example` naar `.env.local` en vul je Supabase credentials in:

```bash
cp env.example .env.local
```

Vul de volgende variabelen in:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 4. Database setup

Voer het Supabase schema uit in je Supabase project:

```sql
-- Kopieer en voer uit: supabase/schema.sql
```

### 5. Development server starten

```bash
pnpm dev
```

De applicatie is nu beschikbaar op [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Unit tests

```bash
pnpm test
```

### E2E tests

```bash
pnpm test:e2e
```

### Linting en type checking

```bash
pnpm lint
pnpm typecheck
```

## 🚀 Deployment

### Render Deployment

1. Verbind je GitHub repository met Render
2. Configureer de environment variabelen in Render dashboard
3. Deploy automatisch via GitHub Actions

### Environment Variabelen voor Productie

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 📱 Features Overzicht

### Buddy AI Onboarding
- 5 interactieve vragen over carrière voorkeuren
- Progress bar en conversational UI
- Lokale opslag van antwoorden

### Authenticatie
- Supabase Auth met email/wachtwoord
- Automatische redirects na login/signup
- Protected routes met middleware

### Job Search
- Dummy dataset met 8 voorbeeld vacatures
- Locked content achter signup wall
- Responsive job cards

### Dashboard
- Persoonlijke begroeting
- Opgeslagen vacatures (dummy data)
- Quick stats en recente activiteit

## 🔧 Development

### Monorepo Commands

```bash
# Alle packages
pnpm build          # Build alle packages
pnpm dev            # Start development servers
pnpm lint           # Lint alle packages
pnpm typecheck      # Type check alle packages
pnpm test           # Run alle tests
pnpm clean          # Clean build artifacts

# Specifieke package
pnpm --filter web dev
pnpm --filter ui build
```

### Code Style

- Prettier voor formatting
- ESLint voor linting
- TypeScript strict mode
- TailwindCSS voor styling

## 📊 Database Schema

### Tabellen

- `users` - Gebruikersprofielen (extends Supabase auth)
- `answers` - Onboarding antwoorden
- `jobs` - Vacature data
- `saved_jobs` - Opgeslagen vacatures
- `applications` - Sollicitaties

### Row Level Security

Alle tabellen hebben RLS policies:
- Gebruikers kunnen alleen hun eigen data zien/bewerken
- Jobs zijn leesbaar voor alle geauthenticeerde gebruikers
- Admin rechten voor toekomstige uitbreidingen

## 🚀 Roadmap

### Phase 1 (MVP) ✅
- [x] Buddy AI onboarding
- [x] Supabase authenticatie
- [x] Basic job search
- [x] Responsive design

### Phase 2 (Growth)
- [ ] Echte job data integratie
- [ ] CV/cover letter tools
- [ ] Advanced search filters
- [ ] Email notificaties

### Phase 3 (Scale)
- [ ] Recruiter dashboard
- [ ] Payment integratie (Stripe)
- [ ] Analytics dashboard
- [ ] Mobile app

## 🤝 Contributing

1. Fork de repository
2. Maak een feature branch (`git checkout -b feature/amazing-feature`)
3. Commit je changes (`git commit -m 'Add amazing feature'`)
4. Push naar de branch (`git push origin feature/amazing-feature`)
5. Open een Pull Request

## 📄 License

Dit project is gelicenseerd onder de MIT License - zie [LICENSE](LICENSE) voor details.

## 📞 Support

Voor vragen of support, open een issue in de GitHub repository.

---

Gebouwd met ❤️ door het WeAreJobPilot team
