import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The "setAll" method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  })
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn("[Supabase] Missing environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
}

/**
 * Admin client with service role key for server-side operations
 * Use with caution - bypasses RLS policies
 */
export const supabaseAdmin = createServerClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  cookies: {
    getAll() {
      return []
    },
    setAll() {},
  },
  auth: {
    persistSession: false,
  },
})

/**
 * Fetch user profile by ID
 */
export async function getProfileById(userId: string) {
  const { data, error } = await supabaseAdmin.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("[Supabase] getProfileById error:", error)
    throw new Error(`Failed to fetch profile: ${error.message}`)
  }

  return data
}

/**
 * Fetch multiple jobs by IDs
 */
export async function getJobsByIds(jobIds: string[]) {
  if (jobIds.length === 0) return []

  const { data, error } = await supabaseAdmin.from("jobs").select("*").in("id", jobIds)

  if (error) {
    console.error("[Supabase] getJobsByIds error:", error)
    throw new Error(`Failed to fetch jobs: ${error.message}`)
  }

  return data || []
}

/**
 * Call match_jobs RPC with user embedding vector
 * Returns jobs ranked by semantic similarity
 */
export async function matchJobsWithEmbedding(userEmbedding: number[], limit = 10) {
  const { data, error } = await supabaseAdmin.rpc("match_jobs", {
    user_vector: userEmbedding,
    limit_count: limit,
  })

  if (error) {
    console.error("[Supabase] matchJobsWithEmbedding error:", error)
    throw new Error(`Failed to match jobs: ${error.message}`)
  }

  return data || []
}
