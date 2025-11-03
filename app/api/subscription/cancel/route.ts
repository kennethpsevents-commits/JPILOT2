import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { paddleClient } from "@/lib/paddle/server"

export async function POST(request: Request) {
  try {
    const { subscription_id } = await request.json()

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify subscription belongs to user
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("paddle_subscription_id", subscription_id)
      .eq("user_id", user.id)
      .single()

    if (!subscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    // Cancel subscription in Paddle
    await paddleClient.cancelSubscription(subscription_id)

    // Update subscription status in database
    await supabase
      .from("subscriptions")
      .update({
        status: "canceled",
        canceled_at: new Date().toISOString(),
      })
      .eq("paddle_subscription_id", subscription_id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error canceling subscription:", error)
    return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 })
  }
}
