/**
 * JOBPILOT: Canonical Job Type Definition
 * ========================================
 * This file contains the single source of truth for Job-related types.
 * Field names match the database schema exactly (no aliases).
 * 
 * Database columns (canonical):
 * - posted_at (NOT posted_date)
 * - expires_at (NOT deadline)
 * - is_active (NOT status)
 * - employment_type (NOT type)
 */

// ============================================================================
// ENUMS
// ============================================================================

export type LocationType = 'onsite' | 'remote' | 'hybrid';

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';

export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';

export type JobCategory =
  | 'Engineering'
  | 'Design'
  | 'Marketing'
  | 'Sales'
  | 'Finance'
  | 'Healthcare'
  | 'Education'
  | 'Legal'
  | 'Human Resources'
  | 'Operations'
  | 'Customer Service'
  | 'Data Science'
  | 'Product'
  | 'Other';

// ============================================================================
// MAIN JOB INTERFACE
// ============================================================================

/**
 * Job entity matching the Supabase `public.jobs` table exactly.
 * All field names are canonical database column names.
 */
export interface Job {
  /** UUID primary key */
  id: string;

  /** Job title (required) */
  title: string;

  /** Company name (required) */
  company: string;

  /** Company logo URL (optional) */
  company_logo: string | null;

  /** Job location - city, country, or "Remote" (required) */
  location: string;

  /** Work arrangement: onsite, remote, or hybrid */
  location_type: LocationType;

  /** Employment type: full-time, part-time, contract, internship, freelance */
  employment_type: EmploymentType;

  /** Minimum salary (optional) */
  salary_min: number | null;

  /** Maximum salary (optional) */
  salary_max: number | null;

  /** Salary currency code (default: EUR) */
  salary_currency: string;

  /** Full job description (required) */
  description: string;

  /** Array of job requirements */
  requirements: string[];

  /** Array of job benefits */
  benefits: string[];

  /** Job category for filtering */
  category: JobCategory | string;

  /** Required experience level */
  experience_level: ExperienceLevel;

  /** Whether job requires paid screening */
  requires_screening: boolean;

  /** Whether job is currently active and visible */
  is_active: boolean;

  /** When the job was posted (ISO timestamp) */
  posted_at: string;

  /** When the job listing expires (ISO timestamp, optional) */
  expires_at: string | null;

  /** Record creation timestamp */
  created_at: string;

  /** Record last update timestamp */
  updated_at: string;
}

// ============================================================================
// DATABASE ROW TYPE (for Supabase responses)
// ============================================================================

/**
 * Raw database row type - handles cases where arrays might be JSON strings
 */
export interface JobRow {
  id: string;
  title: string;
  company: string;
  company_logo: string | null;
  location: string;
  location_type: string;
  employment_type: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  description: string;
  requirements: string[] | string; // May be JSON string from DB
  benefits: string[] | string; // May be JSON string from DB
  category: string;
  experience_level: string;
  requires_screening: boolean;
  is_active: boolean;
  posted_at: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Parse a JobRow from database into a properly typed Job
 */
export function parseJobRow(row: JobRow): Job {
  return {
    ...row,
    location_type: row.location_type as LocationType,
    employment_type: row.employment_type as EmploymentType,
    experience_level: row.experience_level as ExperienceLevel,
    requirements: parseStringArray(row.requirements),
    benefits: parseStringArray(row.benefits),
  };
}

/**
 * Parse string array that might be JSON string from database
 */
function parseStringArray(value: string[] | string | null): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// ============================================================================
// SEARCH & FILTER TYPES
// ============================================================================

/**
 * Filters for job search queries
 */
export interface JobSearchFilters {
  /** Text search query */
  query?: string;

  /** Location filter */
  location?: string;

  /** Filter by work arrangement */
  location_type?: LocationType[];

  /** Filter by employment type */
  employment_type?: EmploymentType[];

  /** Filter by category */
  category?: string[];

  /** Filter by experience level */
  experience_level?: ExperienceLevel[];

  /** Minimum salary filter */
  salary_min?: number;

  /** Filter jobs requiring screening */
  requires_screening?: boolean;

  /** Only show active jobs (default: true) */
  is_active?: boolean;
}

/**
 * Pagination options for job listings
 */
export interface JobPaginationOptions {
  /** Number of jobs per page */
  limit: number;

  /** Offset for pagination */
  offset: number;

  /** Sort field */
  sort_by?: 'posted_at' | 'salary_max' | 'title';

  /** Sort direction */
  sort_order?: 'asc' | 'desc';
}

/**
 * Paginated job list response
 */
export interface JobListResponse {
  jobs: Job[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// ============================================================================
// CREATE/UPDATE TYPES
// ============================================================================

/**
 * Data required to create a new job
 */
export type JobCreateInput = Omit<Job, 'id' | 'created_at' | 'updated_at' | 'posted_at'> & {
  posted_at?: string;
};

/**
 * Data for updating an existing job
 */
export type JobUpdateInput = Partial<Omit<Job, 'id' | 'created_at' | 'updated_at'>>;

// ============================================================================
// LEGACY COMPATIBILITY (DEPRECATED)
// ============================================================================

/**
 * @deprecated Use Job interface instead. This maps old field names to new ones.
 * Will be removed in next major version.
 */
export interface LegacyJob {
  id: string;
  title: string;
  company: string;
  company_logo: string | null;
  location: string;
  type: string; // DEPRECATED: Use employment_type
  salary_min: number | null;
  salary_max: number | null;
  salary_currency?: string;
  description: string;
  requirements: string[] | string;
  benefits: string[] | string;
  category?: string;
  experience_level?: string;
  requires_screening?: boolean;
  status: string; // DEPRECATED: Use is_active
  posted_date: string; // DEPRECATED: Use posted_at
  deadline: string | null; // DEPRECATED: Use expires_at
  created_at?: string;
  updated_at?: string;
}

/**
 * @deprecated Convert legacy job format to canonical format
 */
export function convertLegacyJob(legacy: LegacyJob): Job {
  return {
    id: legacy.id,
    title: legacy.title,
    company: legacy.company,
    company_logo: legacy.company_logo,
    location: legacy.location,
    location_type: 'onsite',
    employment_type: (legacy.type as EmploymentType) || 'full-time',
    salary_min: legacy.salary_min,
    salary_max: legacy.salary_max,
    salary_currency: legacy.salary_currency || 'EUR',
    description: legacy.description,
    requirements: parseStringArray(legacy.requirements),
    benefits: parseStringArray(legacy.benefits),
    category: legacy.category || 'Engineering',
    experience_level: (legacy.experience_level as ExperienceLevel) || 'mid',
    requires_screening: legacy.requires_screening || false,
    is_active: legacy.status === 'active',
    posted_at: legacy.posted_date,
    expires_at: legacy.deadline,
    created_at: legacy.created_at || new Date().toISOString(),
    updated_at: legacy.updated_at || new Date().toISOString(),
  };
}
