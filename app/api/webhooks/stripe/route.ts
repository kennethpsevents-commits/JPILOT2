import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature provided" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    console.error("[v0] Webhook signature verification failed:", error)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.metadata?.type === "screening_upgrade") {
          // Handle screening upgrade payment
          await supabaseAdmin
            .from("screening_upgrades")
            .update({
              payment_status: "completed",
            })
            .eq("stripe_payment_id", session.id)

          await supabaseAdmin
            .from("applications")
            .update({
              screening_completed: true,
              status: "screening",
            })
            .eq("id", session.metadata.application_id)
        } else {
          // Handle subscription
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

          await supabaseAdmin.from("subscriptions").insert({
            user_id: session.metadata?.user_id,
            tier: session.metadata?.tier,
            amount: (subscription.items.data[0].price.unit_amount || 0) / 100,
            currency: subscription.currency.toUpperCase(),
            billing_period: subscription.items.data[0].price.recurring?.interval === "year" ? "yearly" : "monthly",
            stripe_subscription_id: subscription.id,
            stripe_customer_id: subscription.customer as string,
            status: "active",
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })

          await supabaseAdmin
            .from("profiles")
            .update({
              subscription_tier: session.metadata?.tier,
              subscription_status: "active",
              subscription_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq("id", session.metadata?.user_id)
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription

        await supabaseAdmin
          .from("subscriptions")
          .update({
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq("stripe_subscription_id", subscription.id)

        const { data: sub } = await supabaseAdmin
          .from("subscriptions")
          .select("user_id, tier")
          .eq("stripe_subscription_id", subscription.id)
          .single()

        if (sub) {
          await supabaseAdmin
            .from("profiles")
            .update({
              subscription_status: subscription.status,
              subscription_expires_at: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq("id", sub.user_id)
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription

        await supabaseAdmin
          .from("subscriptions")
          .update({
            status: "cancelled",
          })
          .eq("stripe_subscription_id", subscription.id)

        const { data: sub } = await supabaseAdmin
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_subscription_id", subscription.id)
          .single()

        if (sub) {
          await supabaseAdmin
            .from("profiles")
            .update({
              subscription_tier: "free",
              subscription_status: "cancelled",
            })
            .eq("id", sub.user_id)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Error processing webhook:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
