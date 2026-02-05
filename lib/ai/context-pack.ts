/**
 * JOBGPT CONTEXT PACK BUILDER
 * ============================
 * Builds a complete context pack for AI requests.
 * All fields are nullable-safe; never throws on missing data.
 */

import { createServerClient } from '@/lib/supabase/server';
import {
  getProfile,
  getWeeklyKpis,
  getRecentMemory,
  type CandidateProfile,
  type WeeklyKpis,
} from '@/lib/db/jobgpt';

// ============================================================================
// TYPES
// ============================================================================

export interface ProfileContext {
  location_city: string | null;
  location_country: string | null;
  languages: string[] | null;
  skills: string[] | null;
  target_roles: string[] | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  remote_preference: string | null;
  experience_years: number | null;
  current_role: string | null;
  industry: string | null;
  professional_summary: string | null;
}

export interface JobContext {
  id: string | null;
  title: string | null;
  company: string | null;
  company_logo: string | null;
  location: string | null;
  location_type: string | null;
  employment_type: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  posted_at: string | null;
  expires_at: string | null;
  description: string | null;
  requirements: string[] | null;
  benefits: string[] | null;
  category: string | null;
  experience_level: string | null;
}

export interface RecentHistory {
  summary: string | null;
  last_messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    created_at: string;
  }> | null;
}

export interface KpisContext {
  week_start_date: string | null;
  metrics: {
    matches_saved: number;
    applications_sent: number;
    replies_received: number;
    interviews_scheduled: number;
    offer_count: number;
    conversion_sent_to_reply: number | null;
    conversion_reply_to_interview: number | null;
  } | null;
}

export interface ContextPack {
  profile: ProfileContext | null;
  job: JobContext | null;
  recent_history: RecentHistory | null;
  kpis: KpisContext | null;
  objective: string | null;
  missingFields: string[];
  timestamp: string;
}

// ============================================================================
// MAIN BUILDER FUNCTION
// ============================================================================

/**
 * Build a complete context pack for AI requests.
 * Never throws on missing data—returns nulls and a missingFields array.
 */
export async function buildContextPack(
  userId: string,
  jobId?: string,
  objective?: string
): Promise<ContextPack> {
  const timestamp = new Date().toISOString();
  const missingFields: string[] = [];

  // Initialize with nulls
  let profile: ProfileContext | null = null;
  let job: JobContext | null = null;
  let recent_history: RecentHistory | null = null;
  let kpis: KpisContext | null = null;

  try {
    // Fetch all data in parallel for performance
    const [profileData, kpisData, memoryData, jobData] = await Promise.all([
      getProfile(userId).catch(() => null),
      getWeeklyKpis(userId).catch(() => null),
      getRecentMemory(userId).catch(() => null),
      jobId ? fetchJobById(jobId).catch(() => null) : Promise.resolve(null),
    ]);

    // Transform profile data
    if (profileData) {
      profile = transformProfile(profileData);
    } else {
      missingFields.push('profile');
    }

    // Transform job data
    if (jobData) {
      job = transformJob(jobData);
    } else if (jobId) {
      missingFields.push('job');
    }

    // Transform KPIs
    if (kpisData) {
      kpis = transformKpis(kpisData);
    }

    // Transform memory
    if (memoryData) {
      recent_history = transformMemory(memoryData);
    }
  } catch (error) {
    // Log but don't throw - return partial context
    console.error('[JobGPT] Error building context pack:', error);
  }

  return {
    profile,
    job,
    recent_history,
    kpis,
    objective: objective || null,
    missingFields,
    timestamp,
  };
}

// ============================================================================
// DATA FETCHERS
// ============================================================================

async function fetchJobById(jobId: string): Promise<Record<string, unknown> | null> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

// ============================================================================
// TRANSFORMERS
// ============================================================================

function transformProfile(data: CandidateProfile): ProfileContext {
  return {
    location_city: data.location_city || null,
    location_country: data.location_country || null,
    languages: data.languages || null,
    skills: data.skills || null,
    target_roles: data.target_roles || null,
    salary_min: data.salary_min || null,
    salary_max: data.salary_max || null,
    salary_currency: data.salary_currency || null,
    remote_preference: data.remote_preference || null,
    experience_years: data.experience_years || null,
    current_role: data.current_role || null,
    industry: data.industry || null,
    professional_summary: data.professional_summary || null,
  };
}

function transformJob(data: Record<string, unknown>): JobContext {
  return {
    id: (data.id as string) || null,
    title: (data.title as string) || null,
    company: (data.company as string) || null,
    company_logo: (data.company_logo as string) || null,
    location: (data.location as string) || null,
    location_type: (data.location_type as string) || null,
    employment_type: (data.employment_type as string) || null,
    salary_min: (data.salary_min as number) || null,
    salary_max: (data.salary_max as number) || null,
    salary_currency: (data.salary_currency as string) || null,
    posted_at: (data.posted_at as string) || null,
    expires_at: (data.expires_at as string) || null,
    description: (data.description as string) || null,
    requirements: parseStringArray(data.requirements),
    benefits: parseStringArray(data.benefits),
    category: (data.category as string) || null,
    experience_level: (data.experience_level as string) || null,
  };
}

function transformKpis(data: WeeklyKpis): KpisContext {
  const metrics = data.metrics as Record<string, unknown> | null;
  return {
    week_start_date: data.week_start_date || null,
    metrics: metrics ? {
      matches_saved: (metrics.matches_saved as number) || 0,
      applications_sent: (metrics.applications_sent as number) || 0,
      replies_received: (metrics.replies_received as number) || 0,
      interviews_scheduled: (metrics.interviews_scheduled as number) || 0,
      offer_count: (metrics.offer_count as number) || 0,
      conversion_sent_to_reply: (metrics.conversion_sent_to_reply as number) || null,
      conversion_reply_to_interview: (metrics.conversion_reply_to_interview as number) || null,
    } : null,
  };
}

function transformMemory(data: Record<string, unknown>): RecentHistory {
  return {
    summary: (data.conversation_summary as string) || null,
    last_messages: (data.last_messages as RecentHistory['last_messages']) || null,
  };
}

// ============================================================================
// HELPERS
// ============================================================================

function parseStringArray(value: unknown): string[] | null {
  if (!value) return null;
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
}

// ============================================================================
// CONTEXT PACK VALIDATION
// ============================================================================

/**
 * Check if context pack has minimum required data for a specific action.
 */
export function hasMinimumContext(
  contextPack: ContextPack,
  actionType: 'general' | 'tailor_cv' | 'cover_letter' | 'interview_prep'
): boolean {
  switch (actionType) {
    case 'general':
      return contextPack.profile !== null;
    case 'tailor_cv':
    case 'cover_letter':
      return contextPack.profile !== null && contextPack.job !== null;
    case 'interview_prep':
      return contextPack.job !== null;
    default:
      return true;
  }
}

/**
 * Get a summary of what context is available.
 */
export function getContextSummary(contextPack: ContextPack): string[] {
  const available: string[] = [];

  if (contextPack.profile) {
    const profileFields = Object.entries(contextPack.profile)
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k]) => `profile.${k}`);
    available.push(...profileFields);
  }

  if (contextPack.job) {
    const jobFields = Object.entries(contextPack.job)
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k]) => `job.${k}`);
    available.push(...jobFields);
  }

  if (contextPack.kpis?.metrics) {
    available.push('kpis.metrics');
  }

  if (contextPack.recent_history?.summary) {
    available.push('history.summary');
  }

  return available;
}
