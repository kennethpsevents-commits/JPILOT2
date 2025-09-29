# Vercel Environment Variables

Copy these environment variables to your Vercel dashboard:

## Required Environment Variables

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Application Configuration
```
NEXT_PUBLIC_BASE_URL=https://wearejobpilot.vercel.app
NODE_ENV=production
```

### AI API Keys
```
OPENAI_API_KEY=your_openai_api_key
XAI_API_KEY=your_xai_api_key
```

### Payment Processing
```
PADDLE_API_KEY=your_paddle_api_key
PADDLE_WEBHOOK_SECRET=your_paddle_webhook_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Analytics & Monitoring
```
SENTRY_DSN=your_sentry_dsn
GOOGLE_ANALYTICS_ID=your_ga_id
```

### Security
```
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://wearejobpilot.vercel.app
```

## How to Add Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with its value
5. Make sure to set them for Production, Preview, and Development
