import { type NextRequest, NextResponse } from "next/server"
import { marketingAI } from "@/lib/marketing/self-marketing-ai"
import { createClient } from "@/lib/supabase/server"

export const runtime = "edge"
export const dynamic = "force-dynamic"

/**
 * Marketing AI Agent Endpoint
 * Handles autonomous marketing operations
 */
export async function POST(req: NextRequest) {
  try {
    const { action, data } = await req.json()

    const startTime = Date.now()

    switch (action) {
      case "analyze_growth":
        const trajectory = await marketingAI.analyzeGrowthTrajectory()
        await marketingAI.logAction(
          "analysis",
          "Analyzed growth trajectory",
          {},
          trajectory,
          true,
          undefined,
          Date.now() - startTime,
        )
        return NextResponse.json({ success: true, data: trajectory })

      case "generate_content":
        const { platform, topic } = data
        const content = await marketingAI.generateSocialContent(platform, topic)
        await marketingAI.logAction(
          "content_generation",
          `Generated ${platform} content`,
          { platform, topic },
          { content },
          true,
          undefined,
          Date.now() - startTime,
        )
        return NextResponse.json({ success: true, data: { content } })

      case "record_metrics":
        await marketingAI.recordDailyMetrics()
        await marketingAI.logAction(
          "analysis",
          "Recorded daily growth metrics",
          {},
          {},
          true,
          undefined,
          Date.now() - startTime,
        )
        return NextResponse.json({ success: true })

      case "create_hypothesis":
        const { hypothesis, testType, expectedOutcome } = data
        const hypothesisId = await marketingAI.createHypothesis(hypothesis, testType, expectedOutcome)
        return NextResponse.json({ success: true, data: { id: hypothesisId } })

      default:
        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("[Marketing AI Error]:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

/**
 * Get Marketing AI Status
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Get recent logs
    const { data: logs } = await supabase
      .from("marketing_ai_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)

    // Get active hypotheses
    const { data: hypotheses } = await supabase.from("marketing_hypotheses").select("*").eq("status", "testing")

    // Get growth trajectory
    const trajectory = await marketingAI.analyzeGrowthTrajectory()

    return NextResponse.json({
      success: true,
      data: {
        trajectory,
        recentLogs: logs,
        activeHypotheses: hypotheses,
        systemPrompt: marketingAI.getSystemPrompt(),
      },
    })
  } catch (error: any) {
    console.error("[Marketing AI Status Error]:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
