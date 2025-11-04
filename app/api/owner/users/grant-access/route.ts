import { NextResponse } from "next/server"
import { verifyOwnerSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const isAuthenticated = await verifyOwnerSession()
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId, type, expiresAt } = await request.json()
    const supabase = await createClient()

    // Create access override
    const { error } = await supabase.from("user_access_overrides").upsert({
      user_id: userId,
      override_type: type, // 'grant_free' or 'grant_feature'
      reason: "Granted by owner",
      expires_at: expiresAt || null,
      created_by: "owner",
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Owner Grant Access Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
