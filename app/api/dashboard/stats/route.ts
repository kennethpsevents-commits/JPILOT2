import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's saved jobs count
    const { count: savedJobsCount } = await supabase
      .from("saved_jobs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    // Get user's applications count
    const { count: applicationsCount } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    // Get applications from this week
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const { count: weekApplicationsCount } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", oneWeekAgo.toISOString())

    // Get AI conversations count
    const { count: aiConversationsCount } = await supabase
      .from("ai_conversations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    // Get recent applications with response status
    const { data: applications } = await supabase
      .from("applications")
      .select("status")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50)

    // Calculate response rate
    const totalApps = applications?.length || 0
    const responsesReceived =
      applications?.filter((app) => app.status === "interview" || app.status === "offer" || app.status === "rejected")
        .length || 0
    const responseRate = totalApps > 0 ? Math.round((responsesReceived / totalApps) * 100) : 0

    return NextResponse.json({
      stats: {
        jobsFound: savedJobsCount || 0,
        applicationsSent: applicationsCount || 0,
        weekApplications: weekApplicationsCount || 0,
        aiEdits: aiConversationsCount || 0,
        responseRate: responseRate,
      },
    })
  } catch (error) {
    console.error("[v0] Dashboard stats error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
