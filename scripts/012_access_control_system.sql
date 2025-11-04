-- Create subscription tiers table
CREATE TABLE IF NOT EXISTS subscription_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price_monthly INTEGER NOT NULL, -- in cents
  price_yearly INTEGER, -- in cents (optional annual pricing)
  stripe_price_id_monthly TEXT,
  stripe_price_id_yearly TEXT,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  limits JSONB NOT NULL DEFAULT '{}'::jsonb, -- e.g., {"applications_per_month": 50, "ai_credits": 100}
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tier_id UUID REFERENCES subscription_tiers(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active, cancelled, expired, trial, blocked
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create access control rules table
CREATE TABLE IF NOT EXISTS access_control_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_key TEXT UNIQUE NOT NULL, -- e.g., "job_applications", "ai_chat", "resume_builder"
  feature_name TEXT NOT NULL,
  description TEXT,
  is_free BOOLEAN DEFAULT false, -- if true, available to all users
  required_tier_slug TEXT, -- minimum tier required (e.g., "basic", "pro", "enterprise")
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user access overrides table (for manual control)
CREATE TABLE IF NOT EXISTS user_access_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  override_type TEXT NOT NULL, -- "block", "grant_free", "grant_feature"
  feature_key TEXT, -- specific feature to grant/block (null for account-level)
  reason TEXT,
  expires_at TIMESTAMPTZ,
  created_by TEXT DEFAULT 'owner',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, feature_key)
);

-- Insert default subscription tiers
INSERT INTO subscription_tiers (name, slug, description, price_monthly, price_yearly, features, limits, display_order) VALUES
('Free', 'free', 'Get started with basic job search', 0, 0, 
  '["Browse jobs", "Save up to 10 jobs", "Basic profile", "Email alerts"]'::jsonb,
  '{"applications_per_month": 10, "saved_jobs": 10, "ai_credits": 0}'::jsonb, 1),
  
('Basic', 'basic', 'Perfect for active job seekers', 999, 9990, 
  '["Everything in Free", "Unlimited applications", "AI cover letter generator", "Resume optimization", "Priority support"]'::jsonb,
  '{"applications_per_month": -1, "saved_jobs": 100, "ai_credits": 50}'::jsonb, 2),
  
('Pro', 'pro', 'For serious professionals', 2999, 29990, 
  '["Everything in Basic", "AI interview prep", "Salary insights", "Company reviews", "InMail credits", "Advanced analytics"]'::jsonb,
  '{"applications_per_month": -1, "saved_jobs": -1, "ai_credits": 200, "inmail_credits": 20}'::jsonb, 3),
  
('Enterprise', 'enterprise', 'Complete career management', 9999, 99990, 
  '["Everything in Pro", "Dedicated account manager", "Custom AI training", "API access", "White-label options", "Priority placement"]'::jsonb,
  '{"applications_per_month": -1, "saved_jobs": -1, "ai_credits": -1, "inmail_credits": -1}'::jsonb, 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert default access control rules
INSERT INTO access_control_rules (feature_key, feature_name, description, is_free, required_tier_slug) VALUES
('browse_jobs', 'Browse Jobs', 'View job listings', true, null),
('save_jobs', 'Save Jobs', 'Save jobs for later', true, null),
('apply_jobs', 'Apply to Jobs', 'Submit job applications', false, 'basic'),
('ai_cover_letter', 'AI Cover Letter', 'Generate cover letters with AI', false, 'basic'),
('ai_resume', 'AI Resume Builder', 'Build and optimize resume with AI', false, 'basic'),
('ai_interview', 'AI Interview Prep', 'Practice interviews with AI', false, 'pro'),
('salary_insights', 'Salary Insights', 'View salary data and trends', false, 'pro'),
('company_reviews', 'Company Reviews', 'Read and write company reviews', false, 'pro'),
('inmail', 'InMail Messages', 'Send direct messages to recruiters', false, 'pro'),
('analytics', 'Application Analytics', 'Track application performance', false, 'pro'),
('api_access', 'API Access', 'Programmatic access to platform', false, 'enterprise')
ON CONFLICT (feature_key) DO NOTHING;

-- Enable RLS
ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_control_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_access_overrides ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active tiers" ON subscription_tiers FOR SELECT USING (is_active = true);
CREATE POLICY "Users can view their own subscription" ON user_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view enabled rules" ON access_control_rules FOR SELECT USING (is_enabled = true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_user_access_overrides_user_id ON user_access_overrides(user_id);
CREATE INDEX IF NOT EXISTS idx_subscription_tiers_slug ON subscription_tiers(slug);
