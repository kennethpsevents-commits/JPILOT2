import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import type { Job, EmploymentType, LocationType } from "@/lib/types/job"

// ============================================================================
// TYPES
// ============================================================================

interface JobsApiResponse {
  jobs: Job[]
  nextCursor: string | null
  hasMore: boolean
}

interface CursorData {
  posted_at: string
  id: string
}

// ============================================================================
// RATE LIMITING (Lightweight in-memory)
// ============================================================================

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100 // 100 requests per minute

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetAt < now) {
        rateLimitMap.delete(key)
      }
    }
  }

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 }
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - entry.count }
}

// ============================================================================
// CURSOR ENCODING/DECODING
// ============================================================================

function encodeCursor(posted_at: string, id: string): string {
  const data: CursorData = { posted_at, id }
  return Buffer.from(JSON.stringify(data)).toString("base64url")
}

function decodeCursor(cursor: string): CursorData | null {
  try {
    const decoded = Buffer.from(cursor, "base64url").toString("utf-8")
    const data = JSON.parse(decoded) as CursorData
    if (typeof data.posted_at === "string" && typeof data.id === "string") {
      return data
    }
    return null
  } catch {
    return null
  }
}

// ============================================================================
// QUERY HELPERS
// ============================================================================

const JOB_SELECT_FIELDS = `
  id,
  title,
  company,
  company_logo,
  location,
  location_type,
  employment_type,
  salary_min,
  salary_max,
  salary_currency,
  description,
  requirements,
  benefits,
  category,
  experience_level,
  requires_screening,
  is_active,
  posted_at,
  expires_at,
  created_at,
  updated_at
`

function parseIntParam(value: string | null, defaultValue: number): number {
  if (!value) return defaultValue
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? defaultValue : parsed
}

function parseArrayParam(value: string | null): string[] {
  if (!value) return []
  return value.split(",").map((s) => s.trim()).filter(Boolean)
}

// ============================================================================
// GET /api/jobs
// ============================================================================

export async function GET(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
             request.headers.get("x-real-ip") || 
             "anonymous"
  const rateLimit = checkRateLimit(ip)
  
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      { 
        status: 429,
        headers: {
          "X-RateLimit-Remaining": "0",
          "Retry-After": "60",
        }
      }
    )
  }

  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const cursor = searchParams.get("cursor")
    const limit = Math.min(parseIntParam(searchParams.get("limit"), 20), 50) // Max 50
    const location = searchParams.get("location")
    const remoteType = parseArrayParam(searchParams.get("remote_type")) as LocationType[]
    const employmentType = parseArrayParam(searchParams.get("employment_type")) as EmploymentType[]
    const salaryMin = parseIntParam(searchParams.get("salary_min"), 0)
    const salaryMax = parseIntParam(searchParams.get("salary_max"), 0)
    const postedWithinDays = parseIntParam(searchParams.get("posted_within_days"), 0)
    const category = parseArrayParam(searchParams.get("category"))
    const experienceLevel = parseArrayParam(searchParams.get("experience_level"))
    const query = searchParams.get("q")

    // Build query - fetch one extra to determine if there are more results
    let dbQuery = supabase
      .from("jobs")
      .select(JOB_SELECT_FIELDS)
      .eq("is_active", true)
      .order("posted_at", { ascending: false })
      .order("id", { ascending: false }) // Secondary sort for deterministic pagination
      .limit(limit + 1)

    // Apply cursor pagination
    if (cursor) {
      const cursorData = decodeCursor(cursor)
      if (cursorData) {
        // Use compound cursor: (posted_at, id) for deterministic pagination
        dbQuery = dbQuery.or(
          `posted_at.lt.${cursorData.posted_at},and(posted_at.eq.${cursorData.posted_at},id.lt.${cursorData.id})`
        )
      }
    }

    // Apply filters
    if (location) {
      dbQuery = dbQuery.ilike("location", `%${location}%`)
    }

    if (remoteType.length > 0) {
      dbQuery = dbQuery.in("location_type", remoteType)
    }

    if (employmentType.length > 0) {
      dbQuery = dbQuery.in("employment_type", employmentType)
    }

    if (salaryMin > 0) {
      dbQuery = dbQuery.gte("salary_min", salaryMin)
    }

    if (salaryMax > 0) {
      dbQuery = dbQuery.lte("salary_max", salaryMax)
    }

    if (postedWithinDays > 0) {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - postedWithinDays)
      dbQuery = dbQuery.gte("posted_at", cutoffDate.toISOString())
    }

    if (category.length > 0) {
      dbQuery = dbQuery.in("category", category)
    }

    if (experienceLevel.length > 0) {
      dbQuery = dbQuery.in("experience_level", experienceLevel)
    }

    // Text search (basic ILIKE on title and company)
    if (query) {
      dbQuery = dbQuery.or(`title.ilike.%${query}%,company.ilike.%${query}%`)
    }

    const { data, error } = await dbQuery

    if (error) {
      console.error("[api/jobs] Database error:", error)
      return NextResponse.json(
        { error: "Failed to fetch jobs" },
        { status: 500 }
      )
    }

    // Determine if there are more results
    const hasMore = data && data.length > limit
    const jobs = hasMore ? data.slice(0, limit) : (data || [])

    // Generate next cursor from last job
    let nextCursor: string | null = null
    if (hasMore && jobs.length > 0) {
      const lastJob = jobs[jobs.length - 1]
      nextCursor = encodeCursor(lastJob.posted_at, lastJob.id)
    }

    // Parse requirements and benefits arrays
    const parsedJobs: Job[] = jobs.map((job) => ({
      ...job,
      requirements: parseJsonArray(job.requirements),
      benefits: parseJsonArray(job.benefits),
    }))

    const response: JobsApiResponse = {
      jobs: parsedJobs,
      nextCursor,
      hasMore,
    }

    return NextResponse.json(response, {
      headers: {
        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    })
  } catch (error) {
    console.error("[api/jobs] Unexpected error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// ============================================================================
// HELPERS
// ============================================================================

function parseJsonArray(value: string[] | string | null): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
