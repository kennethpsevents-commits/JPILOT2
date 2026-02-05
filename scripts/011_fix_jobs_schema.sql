-- ============================================================================
-- JOBPILOT: Jobs Schema Reconciliation Migration
-- ============================================================================
-- Purpose: Align jobs table to canonical schema with zero conflicts
-- Canonical columns: posted_at, expires_at, is_active, employment_type
-- ============================================================================

-- Step 1: Add any missing canonical columns (idempotent)
ALTER TABLE public.jobs
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Engineering',
ADD COLUMN IF NOT EXISTS experience_level TEXT DEFAULT 'mid' 
  CHECK (experience_level IN ('entry', 'mid', 'senior', 'lead', 'executive')),
ADD COLUMN IF NOT EXISTS requires_screening BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS salary_currency TEXT DEFAULT 'EUR',
ADD COLUMN IF NOT EXISTS company_logo TEXT,
ADD COLUMN IF NOT EXISTS location_type TEXT DEFAULT 'onsite'
  CHECK (location_type IN ('onsite', 'remote', 'hybrid'));

-- Step 2: Ensure employment_type exists with correct constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'jobs' 
    AND column_name = 'employment_type'
  ) THEN
    ALTER TABLE public.jobs ADD COLUMN employment_type TEXT DEFAULT 'full-time';
  END IF;
END $$;

-- Step 3: Backfill from legacy columns if they exist
-- Legacy: type -> employment_type
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'jobs' 
    AND column_name = 'type'
  ) THEN
    UPDATE public.jobs 
    SET employment_type = COALESCE(employment_type, type, 'full-time')
    WHERE employment_type IS NULL;
    
    ALTER TABLE public.jobs DROP COLUMN IF EXISTS type;
  END IF;
END $$;

-- Legacy: posted_date -> posted_at
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'jobs' 
    AND column_name = 'posted_date'
  ) THEN
    UPDATE public.jobs 
    SET posted_at = COALESCE(posted_at, posted_date::timestamptz, NOW())
    WHERE posted_at IS NULL;
    
    ALTER TABLE public.jobs DROP COLUMN IF EXISTS posted_date;
  END IF;
END $$;

-- Legacy: deadline -> expires_at
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'jobs' 
    AND column_name = 'deadline'
  ) THEN
    UPDATE public.jobs 
    SET expires_at = COALESCE(expires_at, deadline::timestamptz)
    WHERE expires_at IS NULL AND deadline IS NOT NULL;
    
    ALTER TABLE public.jobs DROP COLUMN IF EXISTS deadline;
  END IF;
END $$;

-- Legacy: status -> is_active
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'jobs' 
    AND column_name = 'status'
  ) THEN
    UPDATE public.jobs 
    SET is_active = CASE 
      WHEN status = 'active' THEN true 
      WHEN status = 'inactive' THEN false
      ELSE COALESCE(is_active, true)
    END
    WHERE is_active IS NULL;
    
    ALTER TABLE public.jobs DROP COLUMN IF EXISTS status;
  END IF;
END $$;

-- Step 4: Ensure NOT NULL constraints on required columns
ALTER TABLE public.jobs 
  ALTER COLUMN posted_at SET DEFAULT NOW(),
  ALTER COLUMN is_active SET DEFAULT true,
  ALTER COLUMN employment_type SET DEFAULT 'full-time';

-- Step 5: Add/update constraints
DO $$
BEGIN
  -- Drop old constraint if exists
  ALTER TABLE public.jobs DROP CONSTRAINT IF EXISTS jobs_employment_type_check;
  
  -- Add new constraint
  ALTER TABLE public.jobs ADD CONSTRAINT jobs_employment_type_check 
    CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship', 'freelance'));
EXCEPTION WHEN OTHERS THEN
  NULL; -- Constraint may already exist with correct definition
END $$;

-- Step 6: Backfill any NULL values with defaults
UPDATE public.jobs SET
  category = COALESCE(category, 'Engineering'),
  experience_level = COALESCE(experience_level, 'mid'),
  requires_screening = COALESCE(requires_screening, false),
  salary_currency = COALESCE(salary_currency, 'EUR'),
  employment_type = COALESCE(employment_type, 'full-time'),
  is_active = COALESCE(is_active, true),
  posted_at = COALESCE(posted_at, NOW()),
  location_type = COALESCE(location_type, 'onsite')
WHERE 
  category IS NULL 
  OR experience_level IS NULL 
  OR requires_screening IS NULL
  OR employment_type IS NULL
  OR is_active IS NULL
  OR posted_at IS NULL;

-- Step 7: Create performance indexes
CREATE INDEX IF NOT EXISTS idx_jobs_posted_at ON public.jobs(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON public.jobs(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_jobs_category ON public.jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON public.jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_employment_type ON public.jobs(employment_type);
CREATE INDEX IF NOT EXISTS idx_jobs_experience_level ON public.jobs(experience_level);
CREATE INDEX IF NOT EXISTS idx_jobs_location_type ON public.jobs(location_type);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_jobs_active_posted ON public.jobs(is_active, posted_at DESC) 
  WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_jobs_active_category ON public.jobs(is_active, category) 
  WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_jobs_search ON public.jobs(is_active, category, location, employment_type) 
  WHERE is_active = true;

-- Full text search index
CREATE INDEX IF NOT EXISTS idx_jobs_title_search ON public.jobs USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_jobs_description_search ON public.jobs USING gin(to_tsvector('english', description));

-- Step 8: Verify final schema
DO $$
DECLARE
  missing_cols TEXT[];
BEGIN
  SELECT array_agg(col) INTO missing_cols
  FROM unnest(ARRAY['id', 'title', 'company', 'location', 'employment_type', 
                    'is_active', 'posted_at', 'expires_at', 'description']) AS col
  WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'jobs' 
    AND column_name = col
  );
  
  IF missing_cols IS NOT NULL AND array_length(missing_cols, 1) > 0 THEN
    RAISE EXCEPTION 'Missing required columns: %', missing_cols;
  END IF;
  
  RAISE NOTICE 'Jobs schema reconciliation complete. All canonical columns verified.';
END $$;
