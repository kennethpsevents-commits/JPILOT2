import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { paddleClient } from "@/lib/paddle/server"

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

    // Get user profile
    const { data: profile } = await supabase.from("profiles").select("email").eq("id", user.id).single()

    // Create Paddle transaction for one-time payment
    // Note: You'll need to create a price in Paddle dashboard for screening ($29.99)
    const transaction = await paddleClient.createTransaction({
      items: [
        {
          price_id: process.env.PADDLE_SCREENING_PRICE_ID || "pri_screening_upgrade", // Replace with actual Paddle price ID
          quantity: 1,
        },
      ],
      customer_email: profile?.email,
      custom_data: {
        application_id,
        user_id: user.id,
        type: "screening_upgrade",
      },
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/applications/${application_id}?success=true&screening=true`,
    })

    // Create screening upgrade record
    await supabase.from("screening_upgrades").insert({
      user_id: user.id,
      application_id,
      amount: 29.99,
      currency: "USD",
      payment_status: "pending",
      paddle_transaction_id: transaction.data.id,
    })

    return NextResponse.json({ url: transaction.data.checkout.url })
  } catch (error) {
    console.error("[v0] Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
