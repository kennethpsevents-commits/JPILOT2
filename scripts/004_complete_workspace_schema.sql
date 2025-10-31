-- Complete LinkedIn-style workspace schema
-- Adds: feed posts, messages, notifications, subscriptions, jobgpt_queries, system_logs

-- Feed/Activity system
CREATE TABLE IF NOT EXISTS public.feed_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_urls TEXT[],
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.feed_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.feed_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.feed_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.feed_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Messaging system
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_recipient ON public.messages(recipient_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON public.messages(sender_id, created_at DESC);

-- Notifications system
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'application', 'match', 'message', 'like', 'comment'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, created_at DESC);

-- Subscriptions (Free/Premium tiers)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  tier TEXT NOT NULL DEFAULT 'free', -- 'free', 'premium'
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- JobGPT query logging
CREATE TABLE IF NOT EXISTS public.jobgpt_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  query TEXT NOT NULL,
  persona TEXT, -- 'JobHunter', 'RecruitAnalyst', 'MarketScout'
  result_job_ids UUID[],
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jobgpt_queries_user ON public.jobgpt_queries(user_id, created_at DESC);

-- System logs for observability
CREATE TABLE IF NOT EXISTS public.system_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level TEXT NOT NULL, -- 'info', 'warn', 'error'
  category TEXT NOT NULL, -- 'ingestion', 'jobgpt', 'rate_limit', 'auth'
  message TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_system_logs_category ON public.system_logs(category, created_at DESC);

-- Job sources tracking
CREATE TABLE IF NOT EXISTS public.job_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL, -- 'rss', 'api', 'scraper'
  url TEXT NOT NULL,
  config JSONB, -- connector-specific configuration
  last_fetched_at TIMESTAMPTZ,
  status TEXT DEFAULT 'active', -- 'active', 'paused', 'error'
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Update jobs table to add source tracking
ALTER TABLE public.jobs 
ADD COLUMN IF NOT EXISTS source TEXT,
ADD COLUMN IF NOT EXISTS source_id TEXT,
ADD COLUMN IF NOT EXISTS source_url TEXT,
ADD COLUMN IF NOT EXISTS fetched_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS raw_payload JSONB;

-- Create unique constraint on source + source_id
CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_source_unique ON public.jobs(source, source_id) WHERE source IS NOT NULL AND source_id IS NOT NULL;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_posted_date ON public.jobs(posted_date DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_embedding ON public.jobs USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX IF NOT EXISTS idx_feed_posts_user ON public.feed_posts(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_user ON public.applications(user_id, applied_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_user ON public.saved_jobs(user_id, saved_at DESC);

-- RPC function for semantic job matching with time filtering
CREATE OR REPLACE FUNCTION match_jobs(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10,
  posted_since timestamptz DEFAULT NULL
)
RETURNS TABLE (
  job_id uuid,
  similarity float,
  title text,
  company text,
  location text,
  posted_date timestamptz
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    jobs.id AS job_id,
    1 - (jobs.embedding <=> query_embedding) AS similarity,
    jobs.title,
    jobs.company,
    jobs.location,
    jobs.posted_date
  FROM public.jobs
  WHERE 
    jobs.status = 'active'
    AND (posted_since IS NULL OR jobs.posted_date >= posted_since)
    AND (1 - (jobs.embedding <=> query_embedding)) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

COMMENT ON FUNCTION match_jobs IS 'Semantic job search using pgvector with optional time filtering';
