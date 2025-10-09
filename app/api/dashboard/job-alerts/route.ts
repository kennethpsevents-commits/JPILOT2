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

    const { data: alerts, error } = await supabase
      .from("job_alerts")
      .select("*")
      .eq("user_id", user.id)
      .eq("active", true)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ alerts: alerts || [] })
  } catch (error) {
    console.error("[v0] Job alerts error:", error)
    return NextResponse.json({ error: "Failed to fetch job alerts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { keywords, location, remote, frequency } = body

    const { data: alert, error } = await supabase
      .from("job_alerts")
      .insert({
        user_id: user.id,
        keywords,
        location,
        remote: remote || false,
        frequency: frequency || "daily",
        active: true,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ alert })
  } catch (error) {
    console.error("[v0] Create job alert error:", error)
    return NextResponse.json({ error: "Failed to create job alert" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const alertId = searchParams.get("id")

    if (!alertId) {
      return NextResponse.json({ error: "Alert ID required" }, { status: 400 })
    }

    const { error } = await supabase.from("job_alerts").delete().eq("id", alertId).eq("user_id", user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Delete job alert error:", error)
    return NextResponse.json({ error: "Failed to delete job alert" }, { status: 500 })
  }
}
