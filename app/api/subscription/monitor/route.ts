import { NextResponse } from "next/server"
import { calculateFunnelMetrics } from "@/lib/subscription/funnel-monitor"

export const runtime = "edge"
export const dynamic = "force-dynamic"

/**
 * GET /api/subscription/monitor
 * Returns real-time subscription funnel metrics
 */
export async function GET() {
  try {
    const metrics = await calculateFunnelMetrics()

    return NextResponse.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Error fetching subscription metrics:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch subscription metrics",
      },
      { status: 500 },
    )
  }
}
