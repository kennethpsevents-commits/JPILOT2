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

    const { data: rules, error } = await supabase.from("access_control_rules").select("*").order("feature_name")

    if (error) throw error

    return NextResponse.json(rules || [])
  } catch (error) {
    console.error("[Owner Access Rules Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const isAuthenticated = await verifyOwnerSession()
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { feature_key, updates } = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("access_control_rules")
      .update(updates)
      .eq("feature_key", feature_key)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[Owner Update Rule Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
