# JobPilot - AI-Powered Job Search Platform

A world-class job aggregator platform with AI-powered job matching, resume optimization, and automated application tracking.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase account
- Stripe/Paddle account (for payments)
- SMTP email credentials

### Installation

1. Clone and install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up environment variables (see `.env.example`)

3. Run database migrations:
\`\`\`bash
# Run all SQL scripts in order from the scripts/ folder
# Execute them in your Supabase SQL editor
\`\`\`

4. Seed 3000 realistic jobs:
\`\`\`bash
npm run seed-jobs
\`\`\`

5. Start development server:
\`\`\`bash
npm run dev
\`\`\`

## 🔐 Owner Dashboard Access

### How to Access:

1. **Via Navigation**: Click "Owner" in the top navigation bar
2. **Direct URL**: Navigate to `/owner/login`
3. **Password**: `Wearejobpilot_Psevents_in`

### Owner Dashboard Features:
- **Main Dashboard** (`/owner/dashboard`): System overview, user stats, error logs
- **Conversation Monitor**: View all AI chat conversations with users
- **Error Manager**: Track and resolve website errors
- **System Health**: Monitor performance metrics
- **User Management**: View all registered users
- **Marketing Funnel** (`/owner/subscription-funnel`): Track subscription progress
- **SOPs** (`/owner/sops`): Manage Standard Operating Procedures

## 📊 Seeding 3000 Dummy Jobs

The platform includes a sophisticated job seeding system that generates 3000+ unique, realistic job listings across Europe.

### Running the Job Seeder:

\`\`\`bash
npm run seed-jobs
\`\`\`

### What Gets Generated:
- **3000+ unique jobs** across 10 categories
- **30 European cities** with proper salary adjustments
- **Realistic job descriptions** for each position
- **No duplicates** - each job is unique
- **Proper requirements** based on experience level
- **Benefits packages** (5-7 benefits per job)
- **Salary ranges** adjusted by country and experience

### Job Categories:
- Engineering (20 roles)
- Data Science (10 roles)
- Design (10 roles)
- Marketing (10 roles)
- Sales (9 roles)
- Product (9 roles)
- Operations (9 roles)
- Customer Support (6 roles)
- Finance (8 roles)
- Human Resources (7 roles)

## 📧 Email Integration

### Setup SMTP:

Add these environment variables:

\`\`\`env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
\`\`\`

### Features:
- **Automated sending** with retry logic (3 attempts with exponential backoff)
- **Email templates** with variable substitution
- **Email logging** - track all sent/received emails
- **Delivery tracking** - monitor email status
- **DLQ (Dead Letter Queue)** for failed emails

### API Endpoints:

**Send Email:**
\`\`\`typescript
POST /api/email/send
{
  "to": "user@example.com",
  "subject": "Welcome to JobPilot",
  "html": "<p>Welcome!</p>",
  "templateId": "optional-template-id",
  "variables": { "firstName": "John" }
}
\`\`\`

## 🎯 Key Features

### For Job Seekers:
- **AI Job Matching** - Smart recommendations based on skills and preferences
- **Resume Optimization** - AI-powered suggestions
- **Cover Letter Generator** - Personalized cover letters
- **Interview Preparation** - Practice with AI
- **Application Tracking** - Monitor all applications
- **Salary Insights** - Market data and negotiation tips
- **Career Path Planning** - Personalized roadmaps

### For Owners:
- **Real-time Monitoring** - Track all system activity
- **Conversation Logs** - View all AI interactions
- **Error Management** - Identify and fix issues quickly
- **Marketing Analytics** - Track subscription funnel
- **SOPs Management** - Document procedures
- **Email Tracking** - Monitor all communications

## 🔒 Security Features

- **Row Level Security (RLS)** on all database tables
- **CSRF Protection** via middleware
- **XSS Prevention** with proper sanitization
- **Rate Limiting** on API routes
- **Secure Headers** (CSP, HSTS, etc.)
- **Environment Variable Protection**
- **Owner Authentication** with session management

## 📈 SEO Optimization

- **Dynamic Meta Tags** on all pages
- **Structured Data (JSON-LD)** for search engines
- **Sitemap.xml** auto-generated
- **Robots.txt** configured
- **Open Graph Tags** for social sharing
- **Canonical URLs** to prevent duplicates
- **Image Alt Text** for accessibility

## 🎨 Design System

- **Soft Green Theme** with dark green accents
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG 2.1 AA compliant
- **Dark Mode Support** (optional)
- **Consistent Typography** - 2 font families max
- **Design Tokens** in globals.css

## 🚀 Deployment

### Vercel (Recommended):

1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy!

### Environment Variables Needed:

\`\`\`env
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=

# Payments (Paddle)
PADDLE_API_KEY=
PADDLE_WEBHOOK_SECRET=
PADDLE_ENVIRONMENT=sandbox

# Email
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=

# AI (Optional - uses Vercel AI Gateway by default)
OPENAI_API_KEY=

# Base URL
NEXT_PUBLIC_BASE_URL=https://your-domain.com
\`\`\`

## 📝 Standard Operating Procedures (SOPs)

Access SOPs at `/owner/sops` after logging into the owner dashboard.

### SOP Categories:
- **Operations** - Day-to-day procedures
- **Marketing** - Campaign management
- **Customer Support** - Support workflows
- **Technical** - Development procedures
- **Legal** - Compliance and policies

## 🐛 Troubleshooting

### Jobs Not Showing:
1. Check if jobs were seeded: `npm run seed-jobs`
2. Verify database connection in Supabase
3. Check RLS policies are enabled

### Owner Dashboard Not Accessible:
1. Verify password: `Wearejobpilot_Psevents_in`
2. Check cookies are enabled
3. Try clearing browser cache

### Email Not Sending:
1. Verify SMTP credentials
2. Check email logs in database
3. Review error messages in owner dashboard

## 📚 Documentation

- **Technical Specification**: See `docs/TECHNICAL_SPECIFICATION.md`
- **API Documentation**: See `docs/API.md` (coming soon)
- **User Guide**: See `docs/USER_GUIDE.md` (coming soon)

## 🤝 Support

For issues or questions:
- Email: support@jobpilot.com
- Owner Dashboard: Monitor errors in real-time
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

## 📄 License

Proprietary - All rights reserved

---

Built with ❤️ using Next.js 16, React 19, Supabase, and AI SDK
