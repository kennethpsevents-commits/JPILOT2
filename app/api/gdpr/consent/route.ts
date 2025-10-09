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

    const { data: consents, error } = await supabase
      .from("consent_records")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ consents: consents || [] })
  } catch (error) {
    console.error("[v0] Get consent error:", error)
    return NextResponse.json({ error: "Failed to fetch consent records" }, { status: 500 })
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
    const { consentType, consentGiven } = body

    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Check if consent record exists
    const { data: existing } = await supabase
      .from("consent_records")
      .select("id")
      .eq("user_id", user.id)
      .eq("consent_type", consentType)
      .single()

    if (existing) {
      // Update existing consent
      const { data: updated, error } = await supabase
        .from("consent_records")
        .update({
          consent_given: consentGiven,
          ip_address: ipAddress,
          user_agent: userAgent,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json({ consent: updated })
    } else {
      // Create new consent record
      const { data: created, error } = await supabase
        .from("consent_records")
        .insert({
          user_id: user.id,
          consent_type: consentType,
          consent_given: consentGiven,
          ip_address: ipAddress,
          user_agent: userAgent,
        })
        .select()
        .single()

      if (error) throw error
      return NextResponse.json({ consent: created })
    }
  } catch (error) {
    console.error("[v0] Save consent error:", error)
    return NextResponse.json({ error: "Failed to save consent" }, { status: 500 })
  }
}
