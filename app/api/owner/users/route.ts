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

    const { data: users, error } = await supabase
      .from("users")
      .select(`
        *,
        subscription:user_subscriptions(
          status,
          tier:subscription_tiers(name, slug)
        )
      `)
      .order("created_at", { ascending: false })

    if (error) throw error

    // Format response
    const formattedUsers = users?.map((user: any) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
      subscription_status: user.subscription?.[0]?.status || "free",
      tier_name: user.subscription?.[0]?.tier?.name || "Free",
    }))

    return NextResponse.json(formattedUsers || [])
  } catch (error) {
    console.error("[Owner Users Error]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
