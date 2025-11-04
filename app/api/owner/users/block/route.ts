import { NextResponse } from "next/server"
import { verifyOwnerSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const isAuthenticated = await verifyOwnerSession()
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId, action } = await request.json()
    const supabase = await createClient()

    if (action === "block") {
      // Create block override
      const { error } = await supabase.from("user_access_overrides").upsert({
        user_id: userId,
        override_type: "block",
        reason: "Blocked by owner",
        created_by: "owner",
      })

      if (error) throw error

      // Also update subscription status
      await supabase.from("user_subscriptions").update({ status: "blocked" }).eq("user_id", userId)
    } else if (action === "unblock") {
      // Remove block override
      const { error } = await supabase
        .from("user_access_overrides")
        .delete()
        .eq("user_id", userId)
        .eq("override_type", "block")

      if (error) throw error

      // Restore subscription status
      await supabase.from("user_subscriptions").update({ status: "active" }).eq("user_id", userId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Owner Block User Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
