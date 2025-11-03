-- SOPs (Standard Operating Procedures) for Owner
CREATE TABLE IF NOT EXISTS sops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'operations', 'marketing', 'customer_support', 'technical', 'legal'
  content TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active', -- 'active', 'archived', 'draft'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  last_updated_by UUID REFERENCES auth.users(id)
);

-- Email logs for tracking sent/received emails
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  direction TEXT NOT NULL, -- 'sent', 'received'
  to_address TEXT,
  from_address TEXT,
  subject TEXT,
  body TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'delivered', 'failed', 'bounced'
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);

-- Email templates
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  variables JSONB DEFAULT '[]', -- Array of variable names like ["firstName", "jobTitle"]
  category TEXT, -- 'application', 'follow_up', 'screening', 'notification'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sops_category ON sops(category);
CREATE INDEX IF NOT EXISTS idx_sops_status ON sops(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_user ON email_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created ON email_logs(created_at DESC);

-- RLS Policies
ALTER TABLE sops ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

-- SOPs: Only accessible by authenticated users (owner will check via separate auth)
CREATE POLICY "SOPs are viewable by authenticated users" ON sops
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "SOPs are insertable by authenticated users" ON sops
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "SOPs are updatable by authenticated users" ON sops
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Email logs: Users can only see their own
CREATE POLICY "Users can view their own email logs" ON email_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Email logs are insertable by system" ON email_logs
  FOR INSERT WITH CHECK (true);

-- Email templates: Readable by all authenticated users
CREATE POLICY "Email templates are viewable by authenticated users" ON email_templates
  FOR SELECT USING (auth.role() = 'authenticated');
