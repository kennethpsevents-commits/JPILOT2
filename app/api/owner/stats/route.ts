import { NextResponse } from "next/server"
import { verifyOwnerSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const isAuthenticated = await verifyOwnerSession()
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Get total users
    const { count: total_users } = await supabase.from("profiles").select("*", { count: "exact", head: true })

    // Get active users today
    const { count: active_users_today } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("updated_at", today.toISOString())

    // Get total conversations
    const { count: total_conversations } = await supabase
      .from("chat_conversations")
      .select("*", { count: "exact", head: true })

    // Get conversations today
    const { count: conversations_today } = await supabase
      .from("chat_conversations")
      .select("*", { count: "exact", head: true })
      .gte("created_at", today.toISOString())

    // Get total errors
    const { count: total_errors } = await supabase.from("error_logs").select("*", { count: "exact", head: true })

    // Get critical errors
    const { count: critical_errors } = await supabase
      .from("error_logs")
      .select("*", { count: "exact", head: true })
      .eq("severity", "critical")
      .eq("status", "new")

    // Get total applications
    const { count: total_applications } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })

    // Get applications today
    const { count: applications_today } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .gte("applied_at", today.toISOString())

    return NextResponse.json({
      stats: {
        total_users: total_users || 0,
        active_users_today: active_users_today || 0,
        total_conversations: total_conversations || 0,
        conversations_today: conversations_today || 0,
        total_errors: total_errors || 0,
        critical_errors: critical_errors || 0,
        total_applications: total_applications || 0,
        applications_today: applications_today || 0,
      },
    })
  } catch (error) {
    console.error("[Owner Stats Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
