-- Seed 2000+ realistic job listings for Professor Scienta
-- This creates a comprehensive, market-accurate job dataset

-- First, clear existing jobs if needed
-- DELETE FROM jobs WHERE true;

-- Insert realistic jobs across various companies and roles
-- This will be executed by the realistic-jobs-dataset.ts seeder
-- Run: node scripts/seed-jobs.js

-- Add compatibility scoring column
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS compatibility_score INTEGER DEFAULT 0;

-- Add verification badge
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false;

-- Create index for faster semantic search
CREATE INDEX IF NOT EXISTS idx_jobs_title_description ON jobs USING gin(to_tsvector('english', title || ' ' || description));

-- Create index for compatibility scoring
CREATE INDEX IF NOT EXISTS idx_jobs_compatibility ON jobs(compatibility_score DESC);

-- Add ATS scoring for applications
ALTER TABLE applications ADD COLUMN IF NOT EXISTS ats_score INTEGER DEFAULT 0;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS match_score INTEGER DEFAULT 0;

-- Add read receipts for applications
ALTER TABLE applications ADD COLUMN IF NOT EXISTS viewed_by_employer BOOLEAN DEFAULT false;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS viewed_at TIMESTAMPTZ;

-- Add rejection feedback
ALTER TABLE applications ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS rejection_feedback TEXT;

COMMENT ON COLUMN jobs.compatibility_score IS 'AI-calculated compatibility score (0-100) based on user profile';
COMMENT ON COLUMN jobs.verified IS 'Verified job posting (not a scam)';
COMMENT ON COLUMN applications.ats_score IS 'Applicant Tracking System score (0-100)';
COMMENT ON COLUMN applications.match_score IS 'Job match score (0-100)';
COMMENT ON COLUMN applications.viewed_by_employer IS 'Whether employer has viewed the application';
COMMENT ON COLUMN applications.rejection_feedback IS 'Feedback provided when application is rejected';
