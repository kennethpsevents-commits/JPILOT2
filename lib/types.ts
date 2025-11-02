export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  subscription_tier: "free" | "basic" | "pro" | "enterprise"
  subscription_status: "active" | "cancelled" | "expired"
  subscription_expires_at: string | null
  screening_credits: number
  created_at: string
  updated_at: string
}

export interface Job {
  id: string
  title: string
  company: string
  company_logo: string | null
  location: string
  location_type: "onsite" | "remote" | "hybrid"
  employment_type: "full-time" | "part-time" | "contract" | "internship"
  salary_min: number | null
  salary_max: number | null
  salary_currency: string
  description: string
  requirements: string[]
  benefits: string[]
  category: string
  experience_level: "entry" | "mid" | "senior" | "lead" | "executive"
  requires_screening: boolean
  is_active: boolean
  posted_at: string
  expires_at: string | null
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  user_id: string
  job_id: string
  status: "pending" | "screening" | "reviewed" | "interview" | "accepted" | "rejected"
  cover_letter: string | null
  resume_url: string | null
  screening_completed: boolean
  screening_score: number | null
  applied_at: string
  updated_at: string
}

export interface SearchFilters {
  query?: string
  location?: string
  location_type?: string[]
  employment_type?: string[]
  category?: string[]
  experience_level?: string[]
  salary_min?: number
  requires_screening?: boolean
}
