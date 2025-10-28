# Vercel Deployment Guide

## Pre-deployment Checklist

### 1. Environment Variables
Ensure all required environment variables are set in Vercel dashboard:

**Required:**
- `SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` (for development)

**Optional:**
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 2. Run Local Checks
\`\`\`bash
# Install dependencies
pnpm install

# Run all checks
pnpm ci:check

# This will run:
# - Prettier format check
# - ESLint (with --max-warnings=0)
# - TypeScript type checking
# - Next.js build
\`\`\`

### 3. Run Tests
\`\`\`bash
# Install Playwright browsers
pnpm exec playwright install

# Run smoke tests
pnpm test
\`\`\`

### 4. Database Setup
\`\`\`bash
# Run SQL scripts in Supabase
# 1. scripts/001_create_jobpilot_schema.sql
# 2. scripts/002_seed_sample_jobs.sql
\`\`\`

## Deployment Steps

### Option 1: Vercel CLI (Recommended)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
\`\`\`

### Option 2: GitHub Integration
1. Push code to GitHub
2. Connect repository in Vercel dashboard
3. Configure environment variables
4. Deploy automatically on push

## Post-Deployment

### 1. Verify Deployment
- Check homepage loads: `https://your-domain.vercel.app`
- Test authentication flow
- Verify database connections
- Check API health: `https://your-domain.vercel.app/api/health`

### 2. Run Smoke Tests Against Production
\`\`\`bash
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app pnpm test
\`\`\`

### 3. Monitor
- Check Vercel Analytics
- Monitor error logs in Vercel dashboard
- Set up alerts for critical errors

## CI/CD Pipeline

### GitHub Actions
The `.github/workflows/ci.yml` workflow runs on every push and PR:
- Format checking
- Linting (zero warnings enforced)
- Type checking (strict mode)
- Build verification
- Playwright smoke tests

### Branch Protection
Recommended settings:
- Require status checks to pass before merging
- Require CI workflow to succeed
- Require code review for production branch

## Edge Runtime Compatibility

### Safe for Edge:
- `fetch` API
- Web Crypto API
- TextEncoder/TextDecoder
- URL, URLSearchParams
- Headers, Request, Response

### NOT Safe for Edge:
- `fs` module
- `child_process`
- Node.js native modules
- Long-lived database connections (use connection pooling)

### Example Edge Route:
See `app/api/edge-example/route.ts` for a template.

## Troubleshooting

### Build Fails
1. Check TypeScript errors: `pnpm typecheck`
2. Check ESLint errors: `pnpm lint`
3. Verify environment variables are set

### Runtime Errors
1. Check Vercel function logs
2. Verify database connection
3. Check environment variables in Vercel dashboard

### Performance Issues
1. Enable Vercel Analytics
2. Check bundle size
3. Optimize images with Next.js Image component
4. Use Edge runtime for API routes where possible

## Production Checklist

- [ ] All environment variables configured
- [ ] Database schema deployed
- [ ] CI/CD pipeline passing
- [ ] Smoke tests passing
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] Error monitoring configured
- [ ] Branch protection enabled
- [ ] Team access configured
