import { PricingClient } from "@/components/pricing/pricing-client"
import { createClient } from "@/lib/supabase/server"

export default async function PricingPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let currentTier = "free"
  if (user) {
    const { data: profile } = await supabase.from("profiles").select("subscription_tier").eq("id", user.id).single()

    currentTier = profile?.subscription_tier || "free"
  }

  return <PricingClient currentTier={currentTier} isAuthenticated={!!user} />
}
