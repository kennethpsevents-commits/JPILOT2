# 🚀 WeAreJobPilot - Render Deployment Guide

## 📋 Prerequisites
- GitHub account
- Render account
- Supabase project

## 🔧 Setup Steps

### 1. Prepare for Deployment
```bash
# Run the production build script
./build-production.sh
```

### 2. Push to GitHub
```bash
git add .
git commit -m "Production ready for Render deployment"
git push origin main
```

### 3. Deploy on Render

#### A. Create New Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository: `wearejobpilot`

#### B. Configure Service
- **Name**: `wearejobpilot`
- **Environment**: `Node`
- **Region**: `Oregon (US West)`
- **Branch**: `main`
- **Root Directory**: `apps/web`
- **Build Command**: `npm install --production && npm run build`
- **Start Command**: `npm start`

#### C. Environment Variables
Set these in Render dashboard:

```
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_BASE_URL=https://wearejobpilot.onrender.com
OPENAI_API_KEY=your_openai_key
XAI_API_KEY=your_xai_key
PADDLE_API_KEY=your_paddle_key
PADDLE_WEBHOOK_SECRET=your_paddle_webhook_secret
```

### 4. Database Setup (Supabase)
1. Create new Supabase project
2. Run the SQL from `supabase/schema.sql`
3. Copy the URL and keys to Render

### 5. Custom Domain (Optional)
- Go to Render dashboard → Settings → Custom Domains
- Add your domain: `www.wearejobpilot.com`
- Update DNS records as instructed

## 🎯 Features Included
- ✅ Full Next.js 15.2 app
- ✅ Aviation-themed UI
- ✅ Job search & filtering
- ✅ AI chat system
- ✅ Admin dashboard
- ✅ Referral system
- ✅ Legal packs (NL/PL/DE/FR/ES/IT/UK)
- ✅ Analytics & monitoring
- ✅ Performance optimization

## 📊 Monitoring
- Health check: `/api/health/live`
- Version info: `/api/health/version`
- Admin dashboard: `/admin`

## 🔧 Troubleshooting
- Check Render logs for build errors
- Verify environment variables
- Test health endpoints
- Check Supabase connection

## 💰 Cost Estimate
- **Render Starter**: $7/month
- **Supabase Free**: $0/month (up to 50MB)
- **Total**: ~$7/month

---
**Ready to deploy! 🚀**
