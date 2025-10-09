import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get recent applications with job details
    const { data: applications, error: appsError } = await supabase
      .from("applications")
      .select(`
        id,
        status,
        created_at,
        job_id,
        jobs (
          title,
          company,
          location,
          salary_min,
          salary_max
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    if (appsError) throw appsError

    // Get recent saved jobs
    const { data: savedJobs, error: savedError } = await supabase
      .from("saved_jobs")
      .select(`
        id,
        created_at,
        job_id,
        jobs (
          title,
          company,
          location,
          remote
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)

    if (savedError) throw savedError

    return NextResponse.json({
      applications: applications || [],
      savedJobs: savedJobs || [],
    })
  } catch (error) {
    console.error("[v0] Recent activity error:", error)
    return NextResponse.json({ error: "Failed to fetch recent activity" }, { status: 500 })
  }
}
