import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getProfileById, getJobsByIds, matchJobsWithEmbedding } from "@/lib/supabase/server"
import { createEmbedding, buildProfileSummary } from "@/lib/ai/embeddings"

export const runtime = "edge"
export const dynamic = "force-dynamic"

const RequestSchema = z.object({
  userId: z.string().uuid(),
  limit: z.number().int().min(1).max(50).optional().default(10),
})

/**
 * Generate deterministic explanation for job match (≤60 words)
 * Uses skill overlap analysis for fast, auditable explanations
 */
function generateMatchExplanation(profile: any, job: any, score: number): string {
  const profileSkills = Array.isArray(profile.skills) ? profile.skills.map((s: string) => s.toLowerCase()) : []
  const jobReqs = Array.isArray(job.requirements) ? job.requirements.map((s: string) => s.toLowerCase()) : []

  const overlap = profileSkills.filter((s: string) => jobReqs.includes(s))

  if (overlap.length === 0) {
    const reasons: string[] = []
    if (profile.experience_years && job.requirements) {
      reasons.push(`${profile.experience_years}+ years experience`)
    }
    if (profile.location && job.location && job.location.toLowerCase().includes(profile.location.toLowerCase())) {
      reasons.push("location match")
    }
    return reasons.length > 0 ? reasons.join(" • ") : "Relevant role aligned with your background"
  }

  const topSkills = overlap.slice(0, 3).join(", ")
  return `Strong match: ${topSkills}. ${Math.round(score)}% compatibility.`
}

/**
 * POST /api/ai/match
 * AI-powered job matching using semantic embeddings
 */
export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => ({}))
    const { userId, limit } = RequestSchema.parse(json)

    console.log("[v0] AI Match: Starting for userId:", userId)

    // 1. Fetch user profile
    const profile = await getProfileById(userId)
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    console.log("[v0] AI Match: Profile fetched:", profile.full_name)

    // 2. Build profile summary and create embedding
    const profileSummary = buildProfileSummary(profile)
    console.log("[v0] AI Match: Profile summary:", profileSummary.slice(0, 100) + "...")

    const userEmbedding = await createEmbedding(profileSummary)
    console.log("[v0] AI Match: Embedding created, dimensions:", userEmbedding.length)

    // 3. Call Supabase RPC for vector similarity search
    const matches = await matchJobsWithEmbedding(userEmbedding, limit)
    console.log("[v0] AI Match: Found", matches.length, "matches")

    if (matches.length === 0) {
      return NextResponse.json({ matches: [] }, { status: 200 })
    }

    // 4. Fetch full job details
    const jobIds = matches.map((m: any) => m.job_id)
    const jobs = await getJobsByIds(jobIds)

    // 5. Create job map and enrich results
    const jobMap = new Map(jobs.map((j: any) => [j.id, j]))

    const enrichedMatches = matches
      .map((m: any) => {
        const job = jobMap.get(m.job_id)
        if (!job) return null

        const score = Math.round((m.score ?? 0) * 100) // 0-100
        const explanation = generateMatchExplanation(profile, job, score)

        return {
          job,
          score,
          explanation,
        }
      })
      .filter(Boolean)

    console.log("[v0] AI Match: Returning", enrichedMatches.length, "enriched matches")

    return NextResponse.json(
      { matches: enrichedMatches },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, max-age=60",
        },
      },
    )
  } catch (error: any) {
    console.error("[v0] AI Match error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
