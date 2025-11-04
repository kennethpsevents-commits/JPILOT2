# Access Control System - Owner Guide

## Overview
The JobPilot access control system gives you complete control over who can access your platform and what features they can use. This is an industry-standard subscription management system integrated with Stripe.

## Quick Start

1. **Access the Control Panel**
   - Login to owner dashboard at `/owner/login`
   - Password: `Wearejobpilot_Psevents_in`
   - Click "Access Control" in the header

2. **Run Database Setup**
   \`\`\`bash
   npm run setup-database
   \`\`\`
   This creates all necessary tables and default subscription tiers.

## Features

### 1. User Management
**Control individual user access:**
- View all registered users
- See their subscription status and tier
- Grant free access to specific users
- Block/unblock users manually
- Override subscription requirements

**Actions:**
- ✅ **Grant Free Access**: Give a user full platform access without payment
- 🚫 **Block User**: Prevent a user from accessing the platform
- 📊 **View Details**: See user activity, applications, and subscription history

### 2. Subscription Tiers
**Manage pricing plans:**

**Default Tiers:**
- **Free**: $0/month - Basic job browsing, 10 applications/month
- **Basic**: $9.99/month - Unlimited applications, AI cover letters
- **Pro**: $29.99/month - AI interview prep, salary insights, InMail credits
- **Enterprise**: $99.99/month - Dedicated support, API access, white-label

**Tier Management:**
- Edit pricing (monthly/yearly)
- Add/remove features
- Set usage limits (applications, AI credits, etc.)
- Enable/disable tiers
- Reorder display priority

### 3. Feature Access Rules
**Define what's free vs paid:**

**Default Rules:**
- ✅ Free: Browse jobs, save jobs, basic profile
- 💰 Basic+: Apply to jobs, AI cover letters, resume builder
- 💰 Pro+: AI interview prep, salary insights, company reviews
- 💰 Enterprise+: API access, custom AI training

**Rule Configuration:**
- Toggle features on/off globally
- Set minimum tier requirement
- Make features free for everyone
- Create custom access rules

## How It Works

### Access Check Flow
\`\`\`
User requests feature
    ↓
Check manual overrides (block/grant)
    ↓
Check if feature is free
    ↓
Check user's subscription tier
    ↓
Compare tier level with requirement
    ↓
Grant or deny access
\`\`\`

### Subscription Status
- **active**: User has valid paid subscription
- **trial**: User in trial period
- **cancelled**: Subscription cancelled, access until period end
- **expired**: Subscription ended, no access
- **blocked**: Manually blocked by owner
- **free**: No subscription, free tier only

## Common Use Cases

### 1. Give Beta Access
Grant free access to beta testers:
1. Go to Users tab
2. Find user by email
3. Click ✅ Grant Free Access
4. User gets full platform access without payment

### 2. Block Abusive User
Prevent user from accessing platform:
1. Go to Users tab
2. Find user
3. Click 🚫 Block User
4. User immediately loses all access

### 3. Create Limited-Time Promotion
Make a paid feature temporarily free:
1. Go to Features tab
2. Find feature (e.g., "AI Cover Letter")
3. Toggle "Free Access" to ON
4. All users can now use it
5. Toggle back OFF when promotion ends

### 4. Add New Pricing Tier
Create custom subscription plan:
1. Go to Tiers tab
2. Click "Add New Tier"
3. Set name, price, features, limits
4. Connect Stripe price ID
5. Enable tier

### 5. Adjust Feature Requirements
Change which tier unlocks a feature:
1. Go to Features tab
2. Find feature
3. Change "Required Tier" dropdown
4. Feature now requires new tier level

## Integration with Stripe

### Setup
1. Create products in Stripe Dashboard
2. Copy price IDs (monthly/yearly)
3. Add to subscription tiers in database
4. System automatically handles:
   - Checkout sessions
   - Webhook events
   - Subscription updates
   - Payment failures

### Webhook Events Handled
- `checkout.session.completed`: Create subscription
- `customer.subscription.updated`: Update status
- `customer.subscription.deleted`: Cancel subscription
- `invoice.payment_failed`: Handle failed payment

## Database Schema

### Tables Created
- `subscription_tiers`: Pricing plans and features
- `user_subscriptions`: User subscription records
- `access_control_rules`: Feature access requirements
- `user_access_overrides`: Manual access grants/blocks

### Key Relationships
\`\`\`
users → user_subscriptions → subscription_tiers
users → user_access_overrides
access_control_rules (standalone)
\`\`\`

## API Endpoints

### Owner APIs (Authenticated)
- `GET /api/owner/users`: List all users
- `GET /api/owner/subscription-tiers`: List tiers
- `GET /api/owner/access-rules`: List rules
- `POST /api/owner/users/block`: Block/unblock user
- `POST /api/owner/users/grant-access`: Grant free access

### Public APIs
- `GET /api/subscription-tiers`: View available plans
- `POST /api/checkout`: Create Stripe checkout session
- `POST /api/webhooks/stripe`: Handle Stripe events

## Security Features

✅ **Owner Authentication**: All management requires owner login
✅ **Row Level Security**: Database policies prevent unauthorized access
✅ **Server-side Validation**: All access checks on server
✅ **Audit Logging**: Track all access grants/blocks
✅ **Secure Cookies**: HTTP-only, secure session cookies

## Best Practices

1. **Regular Audits**: Review user access monthly
2. **Clear Communication**: Email users about tier changes
3. **Gradual Rollout**: Test new tiers with small group first
4. **Monitor Metrics**: Track conversion rates per tier
5. **Fair Limits**: Set reasonable usage limits
6. **Grace Periods**: Give users time before blocking access

## Troubleshooting

**User can't access paid feature:**
1. Check subscription status in Users tab
2. Verify tier includes feature in Tiers tab
3. Check for manual blocks in user overrides
4. Confirm feature is enabled in Features tab

**Stripe payment not updating:**
1. Check webhook configuration in Stripe
2. Verify webhook secret in environment variables
3. Check error logs for webhook failures
4. Manually sync subscription if needed

**Feature not showing as free:**
1. Go to Features tab
2. Find feature
3. Toggle "Free Access" to ON
4. Clear user cache/cookies

## Support

For technical issues:
- Check error logs in Owner Dashboard → Errors tab
- Review system health in Overview tab
- Contact Vercel support for deployment issues

For business questions:
- Review analytics in Marketing tab
- Check subscription funnel metrics
- Monitor user growth trends
