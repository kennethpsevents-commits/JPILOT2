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

    const { data: tiers, error } = await supabase.from("subscription_tiers").select("*").order("display_order")

    if (error) throw error

    return NextResponse.json(tiers || [])
  } catch (error) {
    console.error("[Owner Tiers Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const isAuthenticated = await verifyOwnerSession()
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase.from("subscription_tiers").insert(body).select().single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[Owner Create Tier Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
