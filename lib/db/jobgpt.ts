/**
 * JOBGPT DATABASE HELPERS
 * ========================
 * Provides safe, idempotent database operations for JobGPT.
 * All functions return null/empty on missing data (never throw).
 */

import { createServerClient } from '@/lib/supabase/server';

// ============================================================================
// TYPES
// ============================================================================

export interface CandidateProfile {
  id: string;
  user_id: string;
  location_city: string | null;
  location_country: string | null;
  languages: string[] | null;
  skills: string[] | null;
  target_roles: string[] | null;
  experience_years: number | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  remote_preference: string | null;
  employment_type_preference: string[] | null;
  current_role: string | null;
  industry: string | null;
  education_level: string | null;
  availability: string | null;
  professional_summary: string | null;
  created_at: string;
  updated_at: string;
}

export interface WeeklyKpis {
  id: string;
  user_id: string;
  week_start_date: string;
  metrics: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface MemoryEntry {
  id: string;
  user_id: string;
  key: string;
  value: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ActionLog {
  id?: string;
  user_id: string;
  action_type: string;
  job_id?: string | null;
  prompt_hash?: string | null;
  context_used?: string[];
  missing_data?: string[];
  response_length?: number;
  next_actions?: string[];
  latency_ms?: number;
}

// ============================================================================
// PROFILE OPERATIONS
// ============================================================================

/**
 * Get candidate profile for a user.
 * Returns null if not found (never throws).
 */
export async function getProfile(userId: string): Promise<CandidateProfile | null> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('candidate_profile')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) return null;
    return data as CandidateProfile;
  } catch {
    return null;
  }
}

/**
 * Create or update candidate profile.
 * Upserts based on user_id.
 */
export async function upsertProfile(
  userId: string,
  profileData: Partial<Omit<CandidateProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
): Promise<CandidateProfile | null> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('candidate_profile')
      .upsert(
        { user_id: userId, ...profileData },
        { onConflict: 'user_id' }
      )
      .select()
      .single();

    if (error || !data) return null;
    return data as CandidateProfile;
  } catch {
    return null;
  }
}

// ============================================================================
// KPI OPERATIONS
// ============================================================================

/**
 * Get current week's KPIs for a user.
 * Returns null if not found.
 */
export async function getWeeklyKpis(userId: string): Promise<WeeklyKpis | null> {
  try {
    const supabase = await createServerClient();
    
    // Calculate current week's Monday
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - now.getDay() + 1);
    monday.setHours(0, 0, 0, 0);
    const weekStart = monday.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('jobgpt_kpis_weekly')
      .select('*')
      .eq('user_id', userId)
      .eq('week_start_date', weekStart)
      .single();

    if (error || !data) return null;
    return data as WeeklyKpis;
  } catch {
    return null;
  }
}

/**
 * Upsert weekly KPIs for a user.
 */
export async function upsertWeeklyKpis(
  userId: string,
  metrics: Record<string, unknown>
): Promise<WeeklyKpis | null> {
  try {
    const supabase = await createServerClient();
    
    // Calculate current week's Monday
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - now.getDay() + 1);
    monday.setHours(0, 0, 0, 0);
    const weekStart = monday.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('jobgpt_kpis_weekly')
      .upsert(
        { user_id: userId, week_start_date: weekStart, metrics },
        { onConflict: 'user_id,week_start_date' }
      )
      .select()
      .single();

    if (error || !data) return null;
    return data as WeeklyKpis;
  } catch {
    return null;
  }
}

/**
 * Increment a specific KPI metric.
 */
export async function incrementKpi(
  userId: string,
  metricKey: string,
  incrementBy: number = 1
): Promise<boolean> {
  try {
    const currentKpis = await getWeeklyKpis(userId);
    const metrics = (currentKpis?.metrics || {
      matches_saved: 0,
      applications_sent: 0,
      replies_received: 0,
      interviews_scheduled: 0,
      offer_count: 0,
    }) as Record<string, number>;

    metrics[metricKey] = (metrics[metricKey] || 0) + incrementBy;

    // Calculate conversion rates
    if (metrics.applications_sent > 0) {
      metrics.conversion_sent_to_reply = 
        Math.round((metrics.replies_received / metrics.applications_sent) * 100);
    }
    if (metrics.replies_received > 0) {
      metrics.conversion_reply_to_interview = 
        Math.round((metrics.interviews_scheduled / metrics.replies_received) * 100);
    }

    const result = await upsertWeeklyKpis(userId, metrics);
    return result !== null;
  } catch {
    return false;
  }
}

// ============================================================================
// MEMORY OPERATIONS
// ============================================================================

/**
 * Get recent memory/preferences for a user.
 * Returns combined memory entries as a single object.
 */
export async function getRecentMemory(userId: string): Promise<Record<string, unknown> | null> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('jobgpt_memory')
      .select('key, value')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(10);

    if (error || !data || data.length === 0) return null;

    // Combine all memory entries
    const memory: Record<string, unknown> = {};
    for (const entry of data) {
      memory[entry.key] = entry.value;
    }
    return memory;
  } catch {
    return null;
  }
}

/**
 * Get a specific memory entry.
 */
export async function getMemoryEntry(userId: string, key: string): Promise<unknown | null> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('jobgpt_memory')
      .select('value')
      .eq('user_id', userId)
      .eq('key', key)
      .single();

    if (error || !data) return null;
    return data.value;
  } catch {
    return null;
  }
}

/**
 * Upsert a memory entry.
 */
export async function upsertMemoryDelta(
  userId: string,
  key: string,
  value: Record<string, unknown>
): Promise<boolean> {
  try {
    const supabase = await createServerClient();
    const { error } = await supabase
      .from('jobgpt_memory')
      .upsert(
        { user_id: userId, key, value },
        { onConflict: 'user_id,key' }
      );

    return !error;
  } catch {
    return false;
  }
}

/**
 * Update conversation summary in memory.
 */
export async function updateConversationSummary(
  userId: string,
  summary: string,
  lastMessages: Array<{ role: string; content: string; created_at: string }>
): Promise<boolean> {
  return upsertMemoryDelta(userId, 'conversation_summary', {
    summary,
    last_messages: lastMessages.slice(-10), // Keep last 10 messages
    updated_at: new Date().toISOString(),
  });
}

// ============================================================================
// ACTION LOG OPERATIONS
// ============================================================================

/**
 * Log an AI action for audit purposes.
 * Non-blocking: failures are silently ignored.
 */
export async function logAction(action: ActionLog): Promise<void> {
  try {
    const supabase = await createServerClient();
    await supabase.from('jobgpt_actions_log').insert({
      user_id: action.user_id,
      action_type: action.action_type,
      job_id: action.job_id || null,
      prompt_hash: action.prompt_hash || null,
      context_used: action.context_used || [],
      missing_data: action.missing_data || [],
      response_length: action.response_length || null,
      next_actions: action.next_actions || [],
      latency_ms: action.latency_ms || null,
    });
  } catch {
    // Silently ignore logging failures
  }
}

/**
 * Get recent actions for a user.
 */
export async function getRecentActions(
  userId: string,
  limit: number = 10
): Promise<ActionLog[]> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('jobgpt_actions_log')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data as ActionLog[];
  } catch {
    return [];
  }
}

// ============================================================================
// HELPER: Create hash for deduplication
// ============================================================================

export function createPromptHash(content: string): string {
  // Simple hash for deduplication
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `ph_${Math.abs(hash).toString(16)}`;
}
