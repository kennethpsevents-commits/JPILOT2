import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { paddleClient } from "@/lib/paddle/server"

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get("paddle-signature")

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    // Verify webhook signature
    const isValid = paddleClient.verifyWebhook(signature, body)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)
    const supabase = await createClient()

    console.log("[v0] Paddle webhook event:", event.event_type)

    switch (event.event_type) {
      case "transaction.completed": {
        const transaction = event.data
        const customData = transaction.custom_data

        if (customData.type === "screening_upgrade") {
          // Handle screening upgrade payment
          await supabase
            .from("screening_upgrades")
            .update({
              payment_status: "completed",
              paid_at: new Date().toISOString(),
            })
            .eq("paddle_transaction_id", transaction.id)

          // Update application with screening status
          await supabase
            .from("applications")
            .update({
              screening_status: "premium",
            })
            .eq("id", customData.application_id)
        } else {
          // Handle subscription payment
          const subscriptionId = transaction.subscription_id

          if (subscriptionId) {
            const subscription = await paddleClient.getSubscription(subscriptionId)

            await supabase.from("subscriptions").upsert({
              user_id: customData.user_id,
              tier: customData.tier,
              status: "active",
              paddle_subscription_id: subscriptionId,
              paddle_customer_id: transaction.customer_id,
              current_period_start: subscription.data.current_billing_period.starts_at,
              current_period_end: subscription.data.current_billing_period.ends_at,
            })

            // Update user profile tier
            await supabase.from("profiles").update({ subscription_tier: customData.tier }).eq("id", customData.user_id)
          }
        }
        break
      }

      case "subscription.updated": {
        const subscription = event.data

        await supabase
          .from("subscriptions")
          .update({
            status: subscription.status,
            current_period_start: subscription.current_billing_period.starts_at,
            current_period_end: subscription.current_billing_period.ends_at,
          })
          .eq("paddle_subscription_id", subscription.id)
        break
      }

      case "subscription.canceled": {
        const subscription = event.data

        await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
            canceled_at: new Date().toISOString(),
          })
          .eq("paddle_subscription_id", subscription.id)

        // Update user profile tier to free
        const { data: sub } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("paddle_subscription_id", subscription.id)
          .single()

        if (sub) {
          await supabase.from("profiles").update({ subscription_tier: "free" }).eq("id", sub.user_id)
        }
        break
      }

      case "subscription.paused": {
        const subscription = event.data

        await supabase
          .from("subscriptions")
          .update({
            status: "paused",
          })
          .eq("paddle_subscription_id", subscription.id)
        break
      }

      case "subscription.resumed": {
        const subscription = event.data

        await supabase
          .from("subscriptions")
          .update({
            status: "active",
          })
          .eq("paddle_subscription_id", subscription.id)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Paddle webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
