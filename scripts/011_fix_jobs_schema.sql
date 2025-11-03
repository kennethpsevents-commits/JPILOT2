-- Add missing columns to jobs table
ALTER TABLE jobs
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Engineering',
ADD COLUMN IF NOT EXISTS experience_level TEXT DEFAULT 'mid',
ADD COLUMN IF NOT EXISTS requires_screening BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS salary_currency TEXT DEFAULT 'EUR',
ADD COLUMN IF NOT EXISTS company_logo TEXT,
ADD COLUMN IF NOT EXISTS employment_type TEXT DEFAULT 'full-time';

-- Update existing jobs to have proper values
UPDATE jobs
SET 
  category = COALESCE(category, 'Engineering'),
  experience_level = COALESCE(experience_level, 'mid'),
  requires_screening = COALESCE(requires_screening, false),
  salary_currency = COALESCE(salary_currency, 'EUR'),
  employment_type = COALESCE(type, 'full-time')
WHERE category IS NULL OR experience_level IS NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_status_posted ON jobs(status, posted_date DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
