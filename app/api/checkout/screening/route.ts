import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(request: Request) {
  try {
    const { application_id } = await request.json()

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify application belongs to user
    const { data: application } = await supabase
      .from("applications")
      .select("*, jobs(*)")
      .eq("id", application_id)
      .eq("user_id", user.id)
      .single()

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Premium Screening Service",
              description: `For ${application.jobs.title} at ${application.jobs.company}`,
            },
            unit_amount: 2999, // $29.99
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/applications/${application_id}?success=true&screening=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/upgrade/screening?application_id=${application_id}`,
      metadata: {
        application_id,
        user_id: user.id,
        type: "screening_upgrade",
      },
    })

    // Create screening upgrade record
    await supabase.from("screening_upgrades").insert({
      user_id: user.id,
      application_id,
      amount: 29.99,
      currency: "USD",
      payment_status: "pending",
      stripe_payment_id: session.id,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[v0] Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
