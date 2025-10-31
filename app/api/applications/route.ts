import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

const ApplicationSchema = z.object({
  userId: z.string().uuid(),
  jobId: z.string().uuid(),
  coverLetter: z.string().min(50).max(5000).optional(),
  resumeUrl: z.string().url().optional(),
})

/**
 * POST /api/applications
 * Create job application with validation
 */
export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => ({}))
    const { userId, jobId, coverLetter, resumeUrl } = ApplicationSchema.parse(json)

    const supabase = await createClient()

    // Check if already applied
    const { data: existing } = await supabase
      .from("applications")
      .select("id")
      .eq("user_id", userId)
      .eq("job_id", jobId)
      .single()

    if (existing) {
      return NextResponse.json({ error: "Already applied to this job" }, { status: 409 })
    }

    // Create application
    const { data: application, error } = await supabase
      .from("applications")
      .insert({
        user_id: userId,
        job_id: jobId,
        cover_letter: coverLetter,
        resume_url: resumeUrl,
        status: "pending",
      })
      .select()
      .single()

    if (error) throw error

    // Create notification
    await supabase.from("notifications").insert({
      user_id: userId,
      type: "application",
      title: "Application Submitted",
      message: "Your application has been submitted successfully",
      link: `/dashboard`,
    })

    return NextResponse.json({ application }, { status: 201 })
  } catch (error: any) {
    console.error("[API] Application error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

/**
 * GET /api/applications
 * Fetch user's applications
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: applications, error } = await supabase
      .from("applications")
      .select(`
        *,
        jobs (
          id,
          title,
          company,
          location,
          type
        )
      `)
      .eq("user_id", userId)
      .order("applied_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ applications: applications || [] })
  } catch (error: any) {
    console.error("[API] Applications fetch error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
