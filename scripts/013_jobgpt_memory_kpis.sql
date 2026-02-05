-- ============================================================================
-- JOBPILOT: JobGPT Memory, KPIs, and Actions Tables
-- ============================================================================
-- Purpose: Store user profile snapshots, conversation memory, weekly KPIs,
-- and action logs for grounded AI responses (zero hallucination).
-- ============================================================================

-- Step 1: Candidate Profile Table
-- Stores user profile snapshot for AI context
CREATE TABLE IF NOT EXISTS public.candidate_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Location
  location_city TEXT,
  location_country TEXT,
  
  -- Skills & Experience
  languages TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  target_roles TEXT[] DEFAULT '{}',
  experience_years INTEGER,
  
  -- Salary Preferences
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT DEFAULT 'EUR',
  
  -- Work Preferences
  remote_preference TEXT CHECK (remote_preference IN ('onsite', 'remote', 'hybrid', 'flexible')),
  employment_type_preference TEXT[] DEFAULT '{}',
  
  -- Additional Context
  current_role TEXT,
  industry TEXT,
  education_level TEXT,
  availability TEXT,
  
  -- Bio/Summary
  professional_summary TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT candidate_profile_user_unique UNIQUE (user_id)
);

-- Step 2: JobGPT Memory Table
-- Stores key-value pairs for conversation memory and user preferences
CREATE TABLE IF NOT EXISTS public.jobgpt_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Memory key (e.g., 'last_search_query', 'preferred_companies', 'conversation_summary')
  key TEXT NOT NULL,
  
  -- Memory value (JSONB for flexibility)
  value JSONB NOT NULL DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint: one key per user
  CONSTRAINT jobgpt_memory_user_key_unique UNIQUE (user_id, key)
);

-- Step 3: JobGPT Weekly KPIs Table
-- Tracks user performance metrics per week
CREATE TABLE IF NOT EXISTS public.jobgpt_kpis_weekly (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Week identifier (Monday of the week)
  week_start_date DATE NOT NULL,
  
  -- KPI Metrics (JSONB for flexibility)
  metrics JSONB NOT NULL DEFAULT '{
    "matches_saved": 0,
    "applications_sent": 0,
    "replies_received": 0,
    "interviews_scheduled": 0,
    "offer_count": 0,
    "conversion_sent_to_reply": null,
    "conversion_reply_to_interview": null
  }',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint: one record per user per week
  CONSTRAINT jobgpt_kpis_user_week_unique UNIQUE (user_id, week_start_date)
);

-- Step 4: JobGPT Actions Log Table
-- Logs all AI actions for audit and analytics
CREATE TABLE IF NOT EXISTS public.jobgpt_actions_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Action details
  action_type TEXT NOT NULL CHECK (action_type IN (
    'general', 'tailor_cv', 'cover_letter', 'interview_prep',
    'job_search', 'salary_insight', 'company_research', 'career_path'
  )),
  
  -- Optional job reference
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  
  -- Request hash for deduplication
  prompt_hash TEXT,
  
  -- Context snapshot (what data was used)
  context_used TEXT[] DEFAULT '{}',
  
  -- Missing data flagged
  missing_data TEXT[] DEFAULT '{}',
  
  -- Response metadata
  response_length INTEGER,
  next_actions TEXT[] DEFAULT '{}',
  
  -- Performance
  latency_ms INTEGER,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 5: Enable Row Level Security
ALTER TABLE public.candidate_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobgpt_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobgpt_kpis_weekly ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobgpt_actions_log ENABLE ROW LEVEL SECURITY;

-- Step 6: RLS Policies - Users can only access their own data

-- candidate_profile policies
DROP POLICY IF EXISTS "Users can view own candidate profile" ON public.candidate_profile;
CREATE POLICY "Users can view own candidate profile" ON public.candidate_profile
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own candidate profile" ON public.candidate_profile;
CREATE POLICY "Users can insert own candidate profile" ON public.candidate_profile
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own candidate profile" ON public.candidate_profile;
CREATE POLICY "Users can update own candidate profile" ON public.candidate_profile
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own candidate profile" ON public.candidate_profile;
CREATE POLICY "Users can delete own candidate profile" ON public.candidate_profile
  FOR DELETE USING (auth.uid() = user_id);

-- jobgpt_memory policies
DROP POLICY IF EXISTS "Users can view own memory" ON public.jobgpt_memory;
CREATE POLICY "Users can view own memory" ON public.jobgpt_memory
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own memory" ON public.jobgpt_memory;
CREATE POLICY "Users can insert own memory" ON public.jobgpt_memory
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own memory" ON public.jobgpt_memory;
CREATE POLICY "Users can update own memory" ON public.jobgpt_memory
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own memory" ON public.jobgpt_memory;
CREATE POLICY "Users can delete own memory" ON public.jobgpt_memory
  FOR DELETE USING (auth.uid() = user_id);

-- jobgpt_kpis_weekly policies
DROP POLICY IF EXISTS "Users can view own KPIs" ON public.jobgpt_kpis_weekly;
CREATE POLICY "Users can view own KPIs" ON public.jobgpt_kpis_weekly
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own KPIs" ON public.jobgpt_kpis_weekly;
CREATE POLICY "Users can insert own KPIs" ON public.jobgpt_kpis_weekly
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own KPIs" ON public.jobgpt_kpis_weekly;
CREATE POLICY "Users can update own KPIs" ON public.jobgpt_kpis_weekly
  FOR UPDATE USING (auth.uid() = user_id);

-- jobgpt_actions_log policies (insert only, no updates/deletes)
DROP POLICY IF EXISTS "Users can view own action logs" ON public.jobgpt_actions_log;
CREATE POLICY "Users can view own action logs" ON public.jobgpt_actions_log
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own action logs" ON public.jobgpt_actions_log;
CREATE POLICY "Users can insert own action logs" ON public.jobgpt_actions_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Step 7: Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_candidate_profile_user_id ON public.candidate_profile(user_id);
CREATE INDEX IF NOT EXISTS idx_jobgpt_memory_user_id ON public.jobgpt_memory(user_id);
CREATE INDEX IF NOT EXISTS idx_jobgpt_memory_user_key ON public.jobgpt_memory(user_id, key);
CREATE INDEX IF NOT EXISTS idx_jobgpt_kpis_user_id ON public.jobgpt_kpis_weekly(user_id);
CREATE INDEX IF NOT EXISTS idx_jobgpt_kpis_user_week ON public.jobgpt_kpis_weekly(user_id, week_start_date DESC);
CREATE INDEX IF NOT EXISTS idx_jobgpt_actions_user_id ON public.jobgpt_actions_log(user_id);
CREATE INDEX IF NOT EXISTS idx_jobgpt_actions_created ON public.jobgpt_actions_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobgpt_actions_type ON public.jobgpt_actions_log(action_type);

-- Step 8: Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 9: Apply updated_at triggers
DROP TRIGGER IF EXISTS update_candidate_profile_updated_at ON public.candidate_profile;
CREATE TRIGGER update_candidate_profile_updated_at
  BEFORE UPDATE ON public.candidate_profile
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_jobgpt_memory_updated_at ON public.jobgpt_memory;
CREATE TRIGGER update_jobgpt_memory_updated_at
  BEFORE UPDATE ON public.jobgpt_memory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_jobgpt_kpis_updated_at ON public.jobgpt_kpis_weekly;
CREATE TRIGGER update_jobgpt_kpis_updated_at
  BEFORE UPDATE ON public.jobgpt_kpis_weekly
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 10: Service role access for backend operations
DROP POLICY IF EXISTS "Service role full access candidate_profile" ON public.candidate_profile;
CREATE POLICY "Service role full access candidate_profile" ON public.candidate_profile
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

DROP POLICY IF EXISTS "Service role full access jobgpt_memory" ON public.jobgpt_memory;
CREATE POLICY "Service role full access jobgpt_memory" ON public.jobgpt_memory
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

DROP POLICY IF EXISTS "Service role full access jobgpt_kpis" ON public.jobgpt_kpis_weekly;
CREATE POLICY "Service role full access jobgpt_kpis" ON public.jobgpt_kpis_weekly
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

DROP POLICY IF EXISTS "Service role full access jobgpt_actions" ON public.jobgpt_actions_log;
CREATE POLICY "Service role full access jobgpt_actions" ON public.jobgpt_actions_log
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- Step 11: Verification
DO $$
BEGIN
  RAISE NOTICE 'JobGPT Memory & KPIs tables created successfully.';
  RAISE NOTICE 'Tables: candidate_profile, jobgpt_memory, jobgpt_kpis_weekly, jobgpt_actions_log';
  RAISE NOTICE 'All tables have RLS enabled with per-user policies.';
END $$;
