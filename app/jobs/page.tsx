import { createClient } from "@/lib/supabase/server"
import { JobsClient } from "@/components/jobs/jobs-client"
import type { Job } from "@/lib/types"

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string
    location?: string
    location_type?: string
    employment_type?: string
    category?: string
    experience_level?: string
  }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Build query
  let query = supabase.from("jobs").select("*").eq("is_active", true).order("posted_at", { ascending: false })

  // Apply filters
  if (params.query) {
    query = query.or(
      `title.ilike.%${params.query}%,company.ilike.%${params.query}%,description.ilike.%${params.query}%`,
    )
  }

  if (params.location) {
    query = query.ilike("location", `%${params.location}%`)
  }

  if (params.location_type) {
    query = query.eq("location_type", params.location_type)
  }

  if (params.employment_type) {
    query = query.eq("employment_type", params.employment_type)
  }

  if (params.category) {
    query = query.eq("category", params.category)
  }

  if (params.experience_level) {
    query = query.eq("experience_level", params.experience_level)
  }

  const { data: jobs, error } = await query

  if (error) {
    console.error("[v0] Error fetching jobs:", error)
  }

  return <JobsClient initialJobs={(jobs as Job[]) || []} />
}
