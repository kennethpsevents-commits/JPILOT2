import { type NextRequest, NextResponse } from "next/server"
import { verifyOwnerSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await verifyOwnerSession()
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const supabase = await createClient()
    let query = supabase.from("error_logs").select("*").order("created_at", { ascending: false }).limit(100)

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data: errors, error } = await query

    if (error) throw error

    return NextResponse.json({ errors })
  } catch (error) {
    console.error("[Owner Errors Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
