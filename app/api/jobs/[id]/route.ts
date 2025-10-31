import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { maskJobDescription, getUserTier } from "@/lib/subscription/tiers"

export const dynamic = "force-dynamic"

/**
 * GET /api/jobs/[id]
 * Fetch job details with subscription-based masking
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    const supabase = await createClient()

    // Fetch job
    const { data: job, error } = await supabase.from("jobs").select("*").eq("id", id).single()

    if (error || !job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Get user's subscription tier
    const tier = userId ? await getUserTier(userId) : "free"

    // Apply subscription masking
    const { masked, isFullyVisible } = maskJobDescription(job.description, tier)

    return NextResponse.json({
      ...job,
      description: masked,
      isFullyVisible,
      tier,
    })
  } catch (error: any) {
    console.error("[API] Job fetch error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
