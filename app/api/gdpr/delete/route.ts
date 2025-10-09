import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

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

    // Create deletion request
    const { data: deletionRequest, error: requestError } = await supabase
      .from("data_deletion_requests")
      .insert({
        user_id: user.id,
        status: "pending",
      })
      .select()
      .single()

    if (requestError) throw requestError

    // Log the request
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    await supabase.from("data_access_logs").insert({
      user_id: user.id,
      action: "delete",
      data_type: "all",
      ip_address: ipAddress,
      user_agent: userAgent,
    })

    return NextResponse.json({
      message: "Data deletion request submitted. Your data will be deleted within 30 days as required by GDPR.",
      request: deletionRequest,
    })
  } catch (error) {
    console.error("[v0] Delete request error:", error)
    return NextResponse.json({ error: "Failed to submit deletion request" }, { status: 500 })
  }
}

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

    const { data: requests, error } = await supabase
      .from("data_deletion_requests")
      .select("*")
      .eq("user_id", user.id)
      .order("requested_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ requests: requests || [] })
  } catch (error) {
    console.error("[v0] Get deletion requests error:", error)
    return NextResponse.json({ error: "Failed to fetch deletion requests" }, { status: 500 })
  }
}
