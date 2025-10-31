import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { createEmbedding } from "@/lib/ai/embeddings"
import { calculateCombinedScore, DEFAULT_WEIGHTS } from "@/lib/jobs/scoring"
import { maskJobDescription, getUserTier } from "@/lib/subscription/tiers"

export const dynamic = "force-dynamic"

const SearchSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  type: z.enum(["full-time", "part-time", "contract", "internship"]).optional(),
  remote: z.boolean().optional(),
  salaryMin: z.number().int().min(0).optional(),
  salaryMax: z.number().int().min(0).optional(),
  postedSince: z.string().datetime().optional(), // ISO 8601
  sortBy: z.enum(["relevance", "newest"]).optional().default("relevance"),
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(50).optional().default(20),
  userId: z.string().uuid().optional(), // For subscription tier checking
})

/**
 * POST /api/jobs/search
 * Advanced job search with semantic + time-based ranking
 */
export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => ({}))
    const params = SearchSchema.parse(json)

    const supabase = await createClient()

    // Get user's subscription tier
    const tier = params.userId ? await getUserTier(params.userId) : "free"

    let query = supabase.from("jobs").select("*").eq("status", "active")

    // Apply filters
    if (params.location) {
      query = query.ilike("location", `%${params.location}%`)
    }
    if (params.type) {
      query = query.eq("type", params.type)
    }
    if (params.salaryMin) {
      query = query.gte("salary_min", params.salaryMin)
    }
    if (params.salaryMax) {
      query = query.lte("salary_max", params.salaryMax)
    }
    if (params.postedSince) {
      query = query.gte("posted_date", params.postedSince)
    }

    // Semantic search if query provided
    if (params.query && params.sortBy === "relevance") {
      const queryEmbedding = await createEmbedding(params.query)

      // Use RPC for vector similarity
      const { data: matches, error: rpcError } = await supabase.rpc("match_jobs", {
        query_embedding: queryEmbedding,
        match_threshold: 0.5,
        match_count: 100, // Get more for filtering
        posted_since: params.postedSince || null,
      })

      if (rpcError) throw rpcError

      // Apply additional filters and scoring
      const scoredJobs = matches
        .map((match: any) => ({
          ...match,
          combinedScore: calculateCombinedScore(match.similarity, new Date(match.posted_date), DEFAULT_WEIGHTS),
        }))
        .sort((a: any, b: any) => b.combinedScore - a.combinedScore)

      // Pagination
      const offset = (params.page - 1) * params.limit
      const paginatedJobs = scoredJobs.slice(offset, offset + params.limit)

      // Fetch full job details
      const jobIds = paginatedJobs.map((j: any) => j.job_id)
      const { data: fullJobs, error: jobsError } = await supabase.from("jobs").select("*").in("id", jobIds)

      if (jobsError) throw jobsError

      // Apply subscription masking
      const maskedJobs = fullJobs.map((job: any) => {
        const { masked, isFullyVisible } = maskJobDescription(job.description, tier)
        return {
          ...job,
          description: masked,
          isFullyVisible,
          matchScore: paginatedJobs.find((p: any) => p.job_id === job.id)?.combinedScore,
        }
      })

      return NextResponse.json({
        jobs: maskedJobs,
        total: scoredJobs.length,
        page: params.page,
        limit: params.limit,
        hasMore: offset + params.limit < scoredJobs.length,
      })
    }

    // Simple keyword/time-based search
    if (params.sortBy === "newest") {
      query = query.order("posted_date", { ascending: false })
    }

    // Pagination
    const offset = (params.page - 1) * params.limit
    query = query.range(offset, offset + params.limit - 1)

    const { data: jobs, error, count } = await query

    if (error) throw error

    // Apply subscription masking
    const maskedJobs = (jobs || []).map((job: any) => {
      const { masked, isFullyVisible } = maskJobDescription(job.description, tier)
      return {
        ...job,
        description: masked,
        isFullyVisible,
      }
    })

    return NextResponse.json({
      jobs: maskedJobs,
      total: count || 0,
      page: params.page,
      limit: params.limit,
      hasMore: offset + params.limit < (count || 0),
    })
  } catch (error: any) {
    console.error("[API] Job search error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request parameters", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
