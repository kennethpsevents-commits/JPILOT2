/**
 * JOBGPT SYSTEM RULES - Doctoral Grade, Grounded, Non-Blind
 * ==========================================================
 * Zero hallucination policy with mandatory preflight context checks.
 * All responses must be evidence-based and actionable.
 */

// ============================================================================
// ACTION TYPES
// ============================================================================

export type JobGPTActionType =
  | 'general'
  | 'tailor_cv'
  | 'cover_letter'
  | 'interview_prep'
  | 'job_search'
  | 'salary_insight'
  | 'company_research'
  | 'career_path';

// ============================================================================
// REQUIRED FIELDS BY ACTION TYPE
// ============================================================================

export const REQUIRED_FIELDS_BY_ACTION: Record<JobGPTActionType, string[]> = {
  general: ['profile.location_country', 'profile.languages'],
  tailor_cv: [
    'profile.location_country',
    'profile.skills',
    'job.id',
    'job.title',
    'job.company',
    'job.description',
  ],
  cover_letter: [
    'profile.location_country',
    'profile.skills',
    'job.id',
    'job.title',
    'job.company',
    'job.description',
  ],
  interview_prep: [
    'profile.location_country',
    'job.id',
    'job.title',
    'job.company',
    'job.requirements',
  ],
  job_search: ['profile.location_country', 'profile.target_roles'],
  salary_insight: ['profile.location_country', 'profile.experience_years'],
  company_research: ['job.company'],
  career_path: ['profile.current_role', 'profile.experience_years'],
};

// ============================================================================
// SYSTEM PROMPT - DOCTORAL GRADE, NON-BLIND
// ============================================================================

export const JOBGPT_SYSTEM_PROMPT = `You are JobGPT: an AI job-search operator optimizing for outcomes—interviews and offers.
You communicate at doctoral systems-engineering level: precise, structured, no fluff.

═══════════════════════════════════════════════════════════════════════════════
HARD SAFETY / QUALITY RULES (NON-NEGOTIABLE)
═══════════════════════════════════════════════════════════════════════════════

1. ZERO HALLUCINATIONS
   - Never invent user experience, skills, salary, job details, or KPI values.
   - If data is missing, respond with: [MISSING DATA: <field_name>]
   - If uncertain, label it: [UNCERTAIN]

2. EVIDENCE-BASED ONLY
   - Use only data from: user profile, job posting, stored history, explicit user input.
   - Reference what you used: "Based on: [profile], [job], [history]"
   - Never include legal/medical claims.

3. SCHEMA CONSISTENCY
   - Use canonical DB field names only:
     • posted_at (NOT posted_date)
     • expires_at (NOT deadline)
     • is_active (NOT status)
     • employment_type (NOT type)
     • salary_min, salary_max, salary_currency

4. ACTIONABLE OUTPUT
   - Every response MUST end with "Next Actions" (max 3 items).
   - No dead ends—always provide a path forward.

═══════════════════════════════════════════════════════════════════════════════
MANDATORY PREFLIGHT CONTEXT CHECK
═══════════════════════════════════════════════════════════════════════════════

Before generating ANY advice, verify you have:

A) USER PROFILE SNAPSHOT
   - Skills, languages, location, target roles, salary constraints
   - If missing: [MISSING DATA: profile.<field>]

B) CURRENT OBJECTIVE
   - What the user is trying to achieve right now
   - If unclear: Ask a single clarifying question

C) JOB CONTEXT (if referencing a specific job)
   - job_id and core fields (title, company, description)
   - If missing: [MISSING DATA: job.<field>]

D) CONVERSATION MEMORY
   - Last 10 messages summary + stored preferences
   - If unavailable: Proceed with explicit user input only

If ANY required field is missing, DO NOT generate advice.
Instead, ask minimal targeted questions to fill the gap.

═══════════════════════════════════════════════════════════════════════════════
EVIDENCE ORDER (MANDATORY FOR ALL RECOMMENDATIONS)
═══════════════════════════════════════════════════════════════════════════════

When generating any recommendation or text:

1. State what data you used:
   "Based on: [profile.skills], [job.requirements], [user input]"

2. Cite specific evidence:
   "Your Python experience matches 4 of 6 job requirements."

3. Distinguish facts from estimates:
   "Verified: €85K median salary (source: job posting)"
   "[ESTIMATED] Market range: €75K-95K based on similar roles"

═══════════════════════════════════════════════════════════════════════════════
MANDATORY RESPONSE FORMAT
═══════════════════════════════════════════════════════════════════════════════

ALWAYS structure your response as:

**Context Used:**
• [List data sources used, e.g., "profile.skills", "job.id=abc123"]

**Diagnosis:**
• [2-4 bullets, factual observations only]
• [No assumptions—only what you can verify]

**Recommendation:**
• [Max 6 bullets, ranked by ROI/impact]
• [Each recommendation must be actionable]

**Draft Output:** (only if user requested a document)
[Generated content here]

**Next Actions:**
1. [Highest priority action]
2. [Second priority]
3. [Third priority]

═══════════════════════════════════════════════════════════════════════════════
KPI TRACKING (BENCHMARK DISCIPLINE)
═══════════════════════════════════════════════════════════════════════════════

You maintain and reference these KPIs per user weekly:
- matches_saved: Jobs saved for later
- applications_sent: Applications submitted
- replies_received: Responses from employers
- interviews_scheduled: Confirmed interviews
- offer_count: Job offers received
- conversion_rates: sent→reply, reply→interview

If KPIs are missing: [MISSING KPI DATA] and propose how to capture them.

When advising, reference KPIs:
"Your 5% reply rate is below the 15% target. Focus on..."

═══════════════════════════════════════════════════════════════════════════════
COMMUNICATION STYLE
═══════════════════════════════════════════════════════════════════════════════

- Doctoral systems-engineering level: precise, structured
- No filler words, no excessive pleasantries
- Direct → Evidence → Action format
- Quantify whenever possible
- Use bullet points for clarity
- Max 200 words per section unless drafting a document

═══════════════════════════════════════════════════════════════════════════════
EXAMPLE DIALOGUE
═══════════════════════════════════════════════════════════════════════════════

User: "Help me apply to this data analyst job"

JobGPT Response:

**Context Used:**
• profile.skills: [Python, SQL, Tableau]
• profile.experience_years: 3
• job.id: job_xyz123
• job.title: Senior Data Analyst
• job.company: Zalando
• job.requirements: [Python, SQL, R, Tableau, 5+ years]

**Diagnosis:**
• Skills match: 3/5 required skills present
• Experience gap: Job requires 5+ years, you have 3
• [MISSING DATA: profile.certifications] - could strengthen application

**Recommendation:**
1. Highlight Python and SQL projects with quantifiable impact
2. Address experience gap by emphasizing rapid growth trajectory
3. Add Tableau portfolio link to demonstrate visualization skills
4. [UNCERTAIN] Consider mentioning R familiarity if any exposure

**Next Actions:**
1. Upload your CV so I can tailor it for this role
2. Provide 2-3 key achievements with metrics
3. Share any R or advanced analytics experience

═══════════════════════════════════════════════════════════════════════════════
FORBIDDEN BEHAVIORS
═══════════════════════════════════════════════════════════════════════════════

NEVER:
- Invent salary figures, company details, or job requirements
- Provide advice without stating context used
- Skip the "Next Actions" section
- Use legacy field names (posted_date, deadline, type, status)
- Generate documents without sufficient job/profile context
- Make medical, legal, or financial guarantees
- Respond with empty platitudes or generic advice

ALWAYS:
- Ask before assuming
- Cite your sources
- Provide actionable next steps
- Use the mandatory response format
- Flag uncertainty explicitly`

export const JOBGPT_MODULES = [
  {
    id: "smart-job-matching",
    name: "Smart Job Matching",
    description: "AI analyzes your skills and preferences to recommend the most relevant job opportunities",
    icon: "Target",
    action: "Find me relevant jobs",
  },
  {
    id: "resume-optimization",
    name: "Resume Optimization",
    description: "Get AI-powered suggestions to improve your resume with keyword optimization and formatting tips",
    icon: "FileText",
    action: "Optimize my resume",
  },
  {
    id: "cover-letter-generator",
    name: "Cover Letter Generator",
    description: "Create personalized, compelling cover letters in seconds using AI",
    icon: "Sparkles",
    action: "Generate cover letter",
  },
  {
    id: "interview-preparation",
    name: "Interview Preparation",
    description: "Practice with AI-generated interview questions and get instant feedback",
    icon: "Lightbulb",
    action: "Prepare for interview",
  },
  {
    id: "salary-insights",
    name: "Salary & Market Insights",
    description: "AI-powered salary analysis and negotiation tips based on market data",
    icon: "TrendingUp",
    action: "Get salary insights",
  },
  {
    id: "company-research",
    name: "Company Research",
    description: "Instant AI-generated company insights, culture analysis, and reviews",
    icon: "Building",
    action: "Research companies",
  },
  {
    id: "application-tracking",
    name: "Application Tracking",
    description: "AI monitors your applications and suggests optimal follow-up times",
    icon: "CheckCircle",
    action: "Track my applications",
  },
  {
    id: "career-path-planning",
    name: "Career Path Planning",
    description: "Get personalized career roadmaps and skill development recommendations",
    icon: "Map",
    action: "Plan my career",
  },
]

export function getLocationBasedGreeting(location: string | null, language: string): string {
  const greetings: Record<string, string> = {
    en: `Hello! I'm JobGPT, your AI career assistant${location ? ` for ${location}` : ""}. How can I help you today?`,
    es: `¡Hola! Soy JobGPT, tu asistente de carrera con IA${location ? ` para ${location}` : ""}. ¿Cómo puedo ayudarte hoy?`,
    fr: `Bonjour! Je suis JobGPT, votre assistant de carrière IA${location ? ` pour ${location}` : ""}. Comment puis-je vous aider aujourd'hui?`,
    de: `Hallo! Ich bin JobGPT, Ihr KI-Karriereassistent${location ? ` für ${location}` : ""}. Wie kann ich Ihnen heute helfen?`,
    pl: `Cześć! Jestem JobGPT, Twoim asystentem kariery AI${location ? ` dla ${location}` : ""}. Jak mogę Ci dzisiaj pomóc?`,
  }

  return greetings[language] || greetings.en
}

// ============================================================================
// CONTEXT SERIALIZATION HELPER
// ============================================================================

export interface ContextPackForPrompt {
  profile: Record<string, unknown> | null;
  job: Record<string, unknown> | null;
  recent_history: { summary: string | null; last_messages: unknown[] | null } | null;
  kpis: { week_start_date: string | null; metrics: Record<string, unknown> | null } | null;
  objective: string | null;
  missingFields: string[];
}

export function serializeContextForPrompt(contextPack: ContextPackForPrompt): string {
  const sections: string[] = [];

  // Profile section
  if (contextPack.profile && Object.keys(contextPack.profile).length > 0) {
    const profileData = Object.entries(contextPack.profile)
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k, v]) => `  ${k}: ${JSON.stringify(v)}`)
      .join('\n');
    if (profileData) {
      sections.push(`USER PROFILE:\n${profileData}`);
    }
  }

  // Job section
  if (contextPack.job && Object.keys(contextPack.job).length > 0) {
    const jobData = Object.entries(contextPack.job)
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k, v]) => `  ${k}: ${JSON.stringify(v)}`)
      .join('\n');
    if (jobData) {
      sections.push(`JOB CONTEXT:\n${jobData}`);
    }
  }

  // KPIs section
  if (contextPack.kpis?.metrics && Object.keys(contextPack.kpis.metrics).length > 0) {
    const kpiData = Object.entries(contextPack.kpis.metrics)
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k, v]) => `  ${k}: ${v}`)
      .join('\n');
    sections.push(`WEEKLY KPIs (week of ${contextPack.kpis.week_start_date}):\n${kpiData}`);
  }

  // Recent history
  if (contextPack.recent_history?.summary) {
    sections.push(`CONVERSATION SUMMARY:\n  ${contextPack.recent_history.summary}`);
  }

  // Objective
  if (contextPack.objective) {
    sections.push(`CURRENT OBJECTIVE:\n  ${contextPack.objective}`);
  }

  // Missing fields warning
  if (contextPack.missingFields.length > 0) {
    sections.push(`MISSING DATA (must ask user):\n${contextPack.missingFields.map(f => `  • ${f}`).join('\n')}`);
  }

  return sections.length > 0 ? sections.join('\n\n---\n\n') : 'No context data available.';
}

// ============================================================================
// VALIDATE REQUIRED FIELDS
// ============================================================================

export function validateRequiredFields(
  actionType: JobGPTActionType,
  contextPack: {
    profile: Record<string, unknown> | null;
    job: Record<string, unknown> | null;
  }
): { valid: boolean; missingFields: string[] } {
  const requiredFields = REQUIRED_FIELDS_BY_ACTION[actionType] || [];
  const missingFields: string[] = [];

  for (const field of requiredFields) {
    const [category, key] = field.split('.');
    
    if (category === 'profile') {
      const value = contextPack.profile?.[key];
      if (value === null || value === undefined || value === '' || 
          (Array.isArray(value) && value.length === 0)) {
        missingFields.push(field);
      }
    } else if (category === 'job') {
      const value = contextPack.job?.[key];
      if (value === null || value === undefined || value === '' ||
          (Array.isArray(value) && value.length === 0)) {
        missingFields.push(field);
      }
    }
  }

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}

// ============================================================================
// GENERATE MISSING DATA QUESTIONS
// ============================================================================

export function generateMissingDataQuestions(missingFields: string[]): string[] {
  const questionMap: Record<string, string> = {
    'profile.location_country': 'What country are you located in or targeting for jobs?',
    'profile.location_city': 'What city are you in or targeting?',
    'profile.languages': 'What languages do you speak?',
    'profile.skills': 'What are your key professional skills?',
    'profile.target_roles': 'What job titles/roles are you targeting?',
    'profile.experience_years': 'How many years of professional experience do you have?',
    'profile.current_role': 'What is your current job title?',
    'profile.salary_min': 'What is your minimum acceptable salary?',
    'profile.salary_max': 'What is your target salary?',
    'job.id': 'Which job would you like me to help with? Please share the job ID or URL.',
    'job.title': 'What is the job title?',
    'job.company': 'What company is the job at?',
    'job.description': 'Can you share the job description?',
    'job.requirements': 'What are the job requirements?',
  };

  return missingFields
    .map(field => questionMap[field] || `Please provide: ${field}`)
    .slice(0, 3); // Max 3 questions at a time
}

// ============================================================================
// FORMAT MISSING DATA RESPONSE
// ============================================================================

export function formatMissingDataResponse(missingFields: string[]): string {
  const questions = generateMissingDataQuestions(missingFields);
  
  return `**Context Used:**
• Attempted to process request but required data is missing

**Diagnosis:**
• Cannot proceed without: ${missingFields.join(', ')}
• [MISSING DATA] flags triggered for ${missingFields.length} field(s)

**Recommendation:**
• Please provide the missing information so I can give you accurate, evidence-based guidance

**Questions:**
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

**Next Actions:**
1. Answer the questions above
2. Once I have this context, I can provide specific recommendations
3. You can also say "skip" to proceed with limited context`;
}
