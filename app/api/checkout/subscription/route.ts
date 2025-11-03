import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { paddleClient } from "@/lib/paddle/server"

export async function POST(request: Request) {
  try {
    const { price_id, tier } = await request.json()

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user profile
    const { data: profile } = await supabase.from("profiles").select("email, full_name").eq("id", user.id).single()

    let customerId: string | undefined

    // Check if customer already exists in Paddle
    const { data: existingSubscription } = await supabase
      .from("subscriptions")
      .select("paddle_customer_id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (existingSubscription?.paddle_customer_id) {
      customerId = existingSubscription.paddle_customer_id
    } else if (profile?.email) {
      // Create new Paddle customer
      const customer = await paddleClient.createCustomer({
        email: profile.email,
        name: profile.full_name || undefined,
      })
      customerId = customer.data.id
    }

    // Create Paddle transaction (checkout)
    const transaction = await paddleClient.createTransaction({
      items: [
        {
          price_id,
          quantity: 1,
        },
      ],
      customer_id: customerId,
      customer_email: profile?.email,
      custom_data: {
        user_id: user.id,
        tier,
      },
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?subscription=success`,
    })

    return NextResponse.json({ url: transaction.data.checkout.url })
  } catch (error) {
    console.error("[v0] Error creating subscription checkout:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
