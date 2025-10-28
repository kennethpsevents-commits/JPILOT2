# JobPilot Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Vercel CLI installed: `npm i -g vercel`
- Supabase project configured
- All environment variables set

## Environment Variables

Ensure these are set in your Vercel project:

\`\`\`bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# Database (auto-configured by Supabase integration)
POSTGRES_URL=your_postgres_url
\`\`\`

## Deployment Steps

### 1. Run Database Migrations

Execute the SQL scripts in order:

\`\`\`bash
# From Vercel dashboard or v0 interface
1. scripts/001_create_jobpilot_schema.sql
2. scripts/002_seed_sample_jobs.sql
\`\`\`

### 2. Deploy to Vercel

\`\`\`bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
\`\`\`

### 3. Verify Deployment

Check these endpoints:

- `https://your-domain.com` - Homepage loads
- `https://your-domain.com/api/health` - Returns healthy status
- `https://your-domain.com/jobs` - Job listings display
- `https://your-domain.com/auth/login` - Auth works

### 4. Post-Deployment Checklist

- [ ] Database schema created successfully
- [ ] Sample jobs seeded
- [ ] Authentication flow working
- [ ] Job search and filters functional
- [ ] Application submission working
- [ ] Dashboard displays correctly
- [ ] GDPR banner appears
- [ ] All images loading
- [ ] No console errors
- [ ] Lighthouse score > 90

## Monitoring

- Check `/api/health` endpoint regularly
- Monitor Vercel Analytics dashboard
- Review Supabase logs for database issues
- Set up error tracking (Sentry recommended)

## Troubleshooting

### Build Errors

\`\`\`bash
# Clear cache and rebuild
vercel --force
\`\`\`

### Database Connection Issues

- Verify environment variables in Vercel dashboard
- Check Supabase project status
- Ensure RLS policies are enabled

### Image Loading Issues

- Verify image paths in public folder
- Check Next.js image optimization settings
- Ensure remote patterns configured in next.config.mjs

## Performance Optimization

- Enable Vercel Edge Functions for auth
- Configure CDN caching headers
- Optimize images with next/image
- Enable React Compiler in production

## Security

- RLS policies enabled on all tables
- Rate limiting on auth endpoints
- CSRF protection via Supabase
- Environment variables secured
- HTTPS enforced

## Support

For issues, check:
1. Vercel deployment logs
2. Supabase dashboard logs
3. Browser console errors
4. Network tab for failed requests
