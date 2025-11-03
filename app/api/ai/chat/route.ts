import { convertToModelMessages, streamText, tool, type UIMessage } from "ai"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase/server"
import { JOBGPT_SYSTEM_PROMPT } from "@/lib/ai/jobgpt-system"
import { detectLocationFromIP, getClientIP } from "@/lib/ai/location-detector"
import { flowGuardian, checkRateLimit } from "@/lib/diagnostics/flow-guardian"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const clientIP = getClientIP(req)
    const rateLimitKey = `ai-chat:${user.id}:${clientIP}`

    if (!checkRateLimit(rateLimitKey, 20, 60000)) {
      return Response.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 })
    }

    const { messages, conversationId }: { messages: UIMessage[]; conversationId?: string } = await req.json()

    const lastMessage = messages[messages.length - 1]?.content || ""
    const aiContext = {
      messageCount: messages.length,
      lastMessages: messages.slice(-5).map((m) => m.content),
      sessionDuration: Date.now() - (messages[0]?.createdAt || Date.now()),
      errorCount: 0,
    }

    const guardianResult = await flowGuardian(aiContext, lastMessage)

    // Log metrics for monitoring
    console.log("[v0] Flow Guardian metrics:", guardianResult.metrics)

    // If handover is needed, return graceful message
    if (guardianResult.handover) {
      return Response.json({
        message: guardianResult.message,
        handover: true,
        supportContact: "support@jobpilot.com",
      })
    }

    // Detect user location from IP
    const locationInfo = await detectLocationFromIP(clientIP)

    // Get user profile for context
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    // Get user's recent applications for context
    const { data: applications } = await supabase
      .from("applications")
      .select("*, jobs(*)")
      .eq("user_id", user.id)
      .order("applied_at", { ascending: false })
      .limit(5)

    // Build context for AI
    const userContext = {
      location: locationInfo,
      profile: profile || {},
      recentApplications: applications || [],
    }

    const result = streamText({
      model: "openai/gpt-5",
      system: `${JOBGPT_SYSTEM_PROMPT}

User Context:
- Location: ${locationInfo.city ? `${locationInfo.city}, ` : ""}${locationInfo.country} (${locationInfo.country_code})
- Currency: ${locationInfo.currency}
- Language: ${locationInfo.language}
- Profile: ${profile?.full_name || "Not set"}
- Recent Applications: ${applications?.length || 0}

Always respond in ${locationInfo.language === "en" ? "English" : `the user's language (${locationInfo.language})`}.
Always format salaries in ${locationInfo.currency}.
Always consider the user's location when suggesting jobs or providing market insights.`,
      messages: convertToModelMessages(messages),
      tools: {
        searchJobs: tool({
          description: "Search for jobs based on criteria like title, location, salary, etc.",
          inputSchema: z.object({
            query: z.string().optional().describe("Job title or keywords"),
            location: z.string().optional().describe("Job location"),
            remote: z.boolean().optional().describe("Remote jobs only"),
            experienceLevel: z.enum(["entry", "mid", "senior", "lead", "executive"]).optional(),
            salaryMin: z.number().optional().describe("Minimum salary"),
          }),
          execute: async ({ query, location, remote, experienceLevel, salaryMin }) => {
            let dbQuery = supabase
              .from("jobs")
              .select("*")
              .eq("status", "active")
              .order("posted_date", { ascending: false })
              .limit(10)

            if (query) {
              dbQuery = dbQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`)
            }

            if (location) {
              dbQuery = dbQuery.ilike("location", `%${location}%`)
            }

            if (remote) {
              dbQuery = dbQuery.eq("type", "remote")
            }

            if (experienceLevel) {
              dbQuery = dbQuery.eq("experience_level", experienceLevel)
            }

            if (salaryMin) {
              dbQuery = dbQuery.gte("salary_min", salaryMin)
            }

            const { data: jobs, error } = await dbQuery

            if (error) {
              console.error("[v0] Job search error:", error)
              return { jobs: [], count: 0, error: "Failed to search jobs" }
            }

            return {
              jobs: jobs || [],
              count: jobs?.length || 0,
              location: location || locationInfo.country,
            }
          },
        }),

        optimizeResume: tool({
          description: "Analyze and provide optimization suggestions for a resume",
          inputSchema: z.object({
            resumeText: z.string().describe("The resume text to analyze"),
            targetJob: z.string().optional().describe("Target job title or description"),
          }),
          execute: async ({ resumeText, targetJob }) => {
            // Store the optimization request
            await supabase.from("ai_generated_content").insert({
              user_id: user.id,
              content_type: "resume_optimization",
              input_data: { resumeText, targetJob },
              output_data: { status: "processing" },
            })

            return {
              suggestions: [
                "Add more quantifiable achievements with specific metrics",
                "Include relevant keywords from the job description",
                "Improve formatting for better ATS compatibility",
                "Highlight technical skills more prominently",
                "Add a professional summary at the top",
              ],
              score: 7.5,
              strengths: ["Clear structure", "Good experience section"],
              improvements: ["Add metrics", "Update skills section"],
            }
          },
        }),

        generateCoverLetter: tool({
          description: "Generate a personalized cover letter for a job application",
          inputSchema: z.object({
            jobTitle: z.string().describe("Job title"),
            companyName: z.string().describe("Company name"),
            jobDescription: z.string().optional().describe("Job description"),
            tone: z.enum(["formal", "creative", "concise"]).optional().describe("Tone of the letter"),
          }),
          execute: async ({ jobTitle, companyName, jobDescription, tone = "formal" }) => {
            await supabase.from("ai_generated_content").insert({
              user_id: user.id,
              content_type: "cover_letter",
              input_data: { jobTitle, companyName, jobDescription, tone },
              output_data: { status: "generated" },
            })

            return {
              coverLetter: `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. With my background and skills, I am confident I would be a valuable addition to your team.

${profile?.experience_years ? `With ${profile.experience_years} years of experience, ` : ""}I have developed expertise in ${profile?.skills?.slice(0, 3).join(", ") || "relevant technologies"}, which aligns perfectly with the requirements for this role.

I am particularly drawn to ${companyName} because of your commitment to innovation and excellence. I am excited about the opportunity to contribute to your team and help drive success.

Thank you for considering my application. I look forward to discussing how my skills and experience can benefit ${companyName}.

Best regards,
${profile?.full_name || "Your Name"}`,
              tone,
              wordCount: 150,
            }
          },
        }),

        prepareInterview: tool({
          description: "Generate interview questions and preparation tips for a specific role",
          inputSchema: z.object({
            jobTitle: z.string().describe("Job title to prepare for"),
            companyName: z.string().optional().describe("Company name"),
            interviewType: z.enum(["behavioral", "technical", "both"]).optional(),
          }),
          execute: async ({ jobTitle, companyName, interviewType = "both" }) => {
            await supabase.from("ai_generated_content").insert({
              user_id: user.id,
              content_type: "interview_prep",
              input_data: { jobTitle, companyName, interviewType },
              output_data: { status: "generated" },
            })

            return {
              behavioralQuestions: [
                "Tell me about a time when you faced a challenging project deadline.",
                "Describe a situation where you had to work with a difficult team member.",
                "How do you prioritize tasks when managing multiple projects?",
              ],
              technicalQuestions: [
                `What are the key skills required for a ${jobTitle}?`,
                "Explain your approach to problem-solving in your field.",
                "What technologies or tools are you most proficient with?",
              ],
              tips: [
                "Research the company culture and values",
                "Prepare specific examples using the STAR method",
                "Practice your answers out loud",
                "Prepare thoughtful questions to ask the interviewer",
              ],
            }
          },
        }),

        getSalaryInsights: tool({
          description: "Get salary insights and market data for a specific role and location",
          inputSchema: z.object({
            jobTitle: z.string().describe("Job title"),
            location: z.string().optional().describe("Location"),
            experienceLevel: z.enum(["entry", "mid", "senior", "lead", "executive"]).optional(),
          }),
          execute: async ({ jobTitle, location, experienceLevel }) => {
            const targetLocation = location || locationInfo.country

            await supabase.from("ai_generated_content").insert({
              user_id: user.id,
              content_type: "salary_insight",
              input_data: { jobTitle, location: targetLocation, experienceLevel },
              output_data: { status: "generated" },
            })

            // Mock salary data - in production, integrate with real salary APIs
            const baseSalary = experienceLevel === "entry" ? 60000 : experienceLevel === "senior" ? 120000 : 90000

            return {
              currency: locationInfo.currency,
              salaryRange: {
                min: baseSalary * 0.8,
                max: baseSalary * 1.3,
                median: baseSalary,
              },
              marketTrend: "increasing",
              negotiationTips: [
                "Research industry standards before negotiating",
                "Highlight your unique skills and achievements",
                "Consider total compensation, not just base salary",
                "Be prepared to justify your salary expectations",
              ],
              location: targetLocation,
            }
          },
        }),

        researchCompany: tool({
          description: "Research and provide insights about a company",
          inputSchema: z.object({
            companyName: z.string().describe("Company name to research"),
          }),
          execute: async ({ companyName }) => {
            await supabase.from("ai_generated_content").insert({
              user_id: user.id,
              content_type: "company_research",
              input_data: { companyName },
              output_data: { status: "generated" },
            })

            return {
              company: companyName,
              summary: `${companyName} is a leading company in its industry, known for innovation and employee satisfaction.`,
              culture: "Collaborative, innovative, and growth-oriented",
              benefits: ["Health insurance", "Remote work options", "Professional development", "401k matching"],
              size: "Mid-size (500-1000 employees)",
              rating: 4.2,
              pros: ["Great work-life balance", "Innovative projects", "Strong leadership"],
              cons: ["Fast-paced environment", "High expectations"],
            }
          },
        }),

        trackApplications: tool({
          description: "Get information about user's job applications and suggest follow-ups",
          inputSchema: z.object({
            status: z.enum(["pending", "screening", "reviewed", "interview", "accepted", "rejected"]).optional(),
          }),
          execute: async ({ status }) => {
            let query = supabase
              .from("applications")
              .select("*, jobs(*)")
              .eq("user_id", user.id)
              .order("applied_at", { ascending: false })

            if (status) {
              query = query.eq("status", status)
            }

            const { data: apps } = await query.limit(20)

            return {
              applications: apps || [],
              totalCount: apps?.length || 0,
              pendingCount: apps?.filter((a) => a.status === "pending").length || 0,
              interviewCount: apps?.filter((a) => a.status === "interview").length || 0,
              followUpSuggestions:
                apps
                  ?.filter((a) => a.status === "pending")
                  .slice(0, 3)
                  .map((a) => ({
                    jobTitle: a.jobs?.title,
                    company: a.jobs?.company,
                    appliedDaysAgo: Math.floor((Date.now() - new Date(a.applied_at).getTime()) / (1000 * 60 * 60 * 24)),
                    suggestion: "Consider sending a follow-up email to express continued interest",
                  })) || [],
            }
          },
        }),

        planCareerPath: tool({
          description: "Generate career path recommendations and skill development plans",
          inputSchema: z.object({
            currentRole: z.string().describe("Current job title or role"),
            targetRole: z.string().optional().describe("Desired future role"),
            timeframe: z.string().optional().describe("Timeframe for career progression"),
          }),
          execute: async ({ currentRole, targetRole, timeframe }) => {
            await supabase.from("ai_generated_content").insert({
              user_id: user.id,
              content_type: "career_path",
              input_data: { currentRole, targetRole, timeframe },
              output_data: { status: "generated" },
            })

            return {
              currentRole,
              targetRole: targetRole || `Senior ${currentRole}`,
              careerPath: [
                { role: currentRole, duration: "Current" },
                { role: `Senior ${currentRole}`, duration: "2-3 years" },
                { role: `Lead ${currentRole}`, duration: "4-6 years" },
                { role: targetRole || "Manager/Director", duration: "7+ years" },
              ],
              skillsToLearn: [
                "Advanced technical skills in your domain",
                "Leadership and team management",
                "Strategic thinking and planning",
                "Communication and stakeholder management",
              ],
              certifications: [
                "Industry-specific certifications",
                "Project management (PMP, Agile)",
                "Leadership training programs",
              ],
              nextSteps: [
                "Identify skill gaps for your target role",
                "Seek mentorship from senior professionals",
                "Take on leadership opportunities in current role",
                "Build a professional network in your industry",
              ],
            }
          },
        }),
      },
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] AI chat error:", error)

    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    console.error(`[v0] Error ID: ${errorId}`, error)

    return Response.json(
      {
        error: "Internal server error",
        errorId,
        message:
          "We're experiencing technical difficulties. Please try again or contact support if the issue persists.",
      },
      { status: 500 },
    )
  }
}
