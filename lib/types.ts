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
  type: string // Changed from employment_type to match DB
  salary_min: number | null
  salary_max: number | null
  salary_currency?: string
  description: string
  requirements: string[] | string // Can be array or JSON string from DB
  benefits: string[] | string // Can be array or JSON string from DB
  category?: string
  experience_level?: string
  requires_screening?: boolean
  status: string // Changed from is_active to match DB
  posted_date: string // Changed from posted_at to match DB
  deadline: string | null // Changed from expires_at to match DB
  created_at?: string
  updated_at?: string
  embedding?: any
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

export interface ChatConversation {
  id: string
  user_id: string
  title: string | null
  language: string
  location: string | null
  country_code: string | null
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  conversation_id: string
  role: "user" | "assistant" | "system"
  content: string
  metadata?: Record<string, any>
  created_at: string
}

export interface AIGeneratedContent {
  id: string
  user_id: string
  content_type:
    | "resume_optimization"
    | "cover_letter"
    | "interview_prep"
    | "career_path"
    | "salary_insight"
    | "company_research"
  input_data: Record<string, any>
  output_data: Record<string, any>
  created_at: string
}

export interface LocationData {
  country: string
  country_code: string
  city: string | null
  region: string | null
  currency: string
  language: string
}

export interface JobGPTModule {
  id: string
  name: string
  description: string
  icon: string
  action: string
}

export interface PaddleSubscription {
  id: string
  user_id: string
  tier: "free" | "basic" | "pro" | "enterprise"
  status: "active" | "paused" | "canceled" | "expired"
  paddle_subscription_id: string | null
  paddle_customer_id: string | null
  amount: number
  currency: string
  billing_period: "monthly" | "yearly"
  current_period_start: string
  current_period_end: string
  canceled_at: string | null
  created_at: string
  updated_at: string
}

export interface PaddleScreeningUpgrade {
  id: string
  user_id: string
  application_id: string
  amount: number
  currency: string
  payment_status: "pending" | "completed" | "failed"
  paddle_transaction_id: string | null
  paid_at: string | null
  created_at: string
}

export interface EmailContact {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  company: string | null
  job_title: string | null
  phone: string | null
  source: "manual" | "signup" | "import" | "hunter"
  status: "active" | "unsubscribed" | "bounced" | "complained"
  tags: string[]
  custom_fields: Record<string, any>
  subscribed_at: string
  unsubscribed_at: string | null
  last_contacted: string | null
  engagement_score: number
  created_at: string
  updated_at: string
}

export interface EmailCampaign {
  id: string
  name: string
  subject: string
  preview_text: string | null
  from_name: string
  from_email: string
  reply_to: string | null
  template_id: string | null
  content_html: string | null
  content_text: string | null
  status: "draft" | "scheduled" | "sending" | "sent" | "paused" | "cancelled"
  scheduled_for: string | null
  sent_at: string | null
  total_recipients: number
  total_sent: number
  total_delivered: number
  total_opened: number
  total_clicked: number
  total_bounced: number
  total_unsubscribed: number
  created_at: string
  updated_at: string
}

export interface EmailTemplate {
  id: string
  name: string
  description: string | null
  category: "welcome" | "newsletter" | "promotion" | "transactional"
  subject: string | null
  preview_text: string | null
  content_html: string
  content_text: string | null
  variables: string[]
  thumbnail_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SocialAccount {
  id: string
  platform: "facebook" | "instagram" | "twitter" | "linkedin" | "youtube" | "tiktok" | "reddit"
  account_name: string
  account_id: string | null
  is_active: boolean
  followers_count: number
  last_synced_at: string | null
  created_at: string
  updated_at: string
}

export interface SocialPost {
  id: string
  platform: string
  caption: string | null
  media_url: string | null
  content_type: "text" | "image" | "video" | "carousel" | "story"
  hashtags: string[]
  status: string
  ai_generated: boolean
  scheduled_for: string | null
  published_at: string | null
  performance_score: number | null
  campaign_id: string | null
}

export interface MarketingWorkflow {
  id: string
  name: string
  description: string | null
  trigger_type: "signup" | "job_application" | "subscription" | "abandoned_cart" | "time_based" | "manual"
  trigger_config: Record<string, any>
  is_active: boolean
  total_triggered: number
  total_completed: number
  created_at: string
  updated_at: string
}

export interface ABTest {
  id: string
  name: string
  description: string | null
  test_type: "email_subject" | "email_content" | "landing_page" | "cta_button" | "social_post"
  variant_a: Record<string, any>
  variant_b: Record<string, any>
  variant_c: Record<string, any> | null
  status: "draft" | "running" | "completed" | "paused"
  traffic_split: Record<string, number>
  winner: string | null
  confidence_level: number | null
  started_at: string | null
  ended_at: string | null
  created_at: string
}

export interface GrowthMetrics {
  id: string
  metric_date: string
  total_subscribers: number
  new_subscribers: number
  unsubscribes: number
  net_growth: number
  email_open_rate: number
  email_click_rate: number
  social_engagement_rate: number
  website_visitors: number
  conversion_rate: number
  target_progress: number
  created_at: string
}

export interface MarketingAILog {
  id: string
  action_type: "content_generation" | "optimization" | "scheduling" | "analysis" | "escalation"
  action_description: string
  input_data: Record<string, any> | null
  output_data: Record<string, any> | null
  success: boolean
  error_message: string | null
  execution_time_ms: number | null
  created_at: string
}

export interface MarketingHypothesis {
  id: string
  hypothesis: string
  test_type: string
  expected_outcome: string | null
  actual_outcome: string | null
  status: "testing" | "validated" | "rejected" | "inconclusive"
  confidence_score: number | null
  started_at: string
  completed_at: string | null
  created_at: string
}
