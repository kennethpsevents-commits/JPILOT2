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

    // Log the data access
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    await supabase.from("data_access_logs").insert({
      user_id: user.id,
      action: "export",
      data_type: "all",
      ip_address: ipAddress,
      user_agent: userAgent,
    })

    // Fetch all user data
    const [profile, applications, savedJobs, conversations, consents, jobAlerts] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase.from("applications").select("*").eq("user_id", user.id),
      supabase.from("saved_jobs").select("*").eq("user_id", user.id),
      supabase.from("ai_conversations").select("*").eq("user_id", user.id),
      supabase.from("consent_records").select("*").eq("user_id", user.id),
      supabase.from("job_alerts").select("*").eq("user_id", user.id),
    ])

    const userData = {
      exportDate: new Date().toISOString(),
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.created_at,
      },
      profile: profile.data,
      applications: applications.data || [],
      savedJobs: savedJobs.data || [],
      aiConversations: conversations.data || [],
      consentRecords: consents.data || [],
      jobAlerts: jobAlerts.data || [],
    }

    return NextResponse.json(userData, {
      headers: {
        "Content-Disposition": `attachment; filename="jobpilot-data-${user.id}-${Date.now()}.json"`,
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("[v0] Export data error:", error)
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 })
  }
}
