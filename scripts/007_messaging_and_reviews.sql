-- Real-Time Messaging System (LinkedIn-style)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_1_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  participant_2_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(participant_1_id, participant_2_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id, read);

-- Company Reviews System (Glassdoor-like)
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  industry TEXT,
  size TEXT,
  founded INTEGER,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS company_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  employment_type TEXT NOT NULL, -- Full-time, Part-time, Intern, Contractor
  employment_status TEXT NOT NULL, -- Current, Former
  duration TEXT NOT NULL, -- 0-6mo, 6-12mo, 1-2yrs, 2-5yrs, 5+yrs
  department TEXT,
  overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  work_life_balance_rating INTEGER CHECK (work_life_balance_rating >= 1 AND work_life_balance_rating <= 5),
  compensation_rating INTEGER CHECK (compensation_rating >= 1 AND compensation_rating <= 5),
  career_growth_rating INTEGER CHECK (career_growth_rating >= 1 AND career_growth_rating <= 5),
  management_rating INTEGER CHECK (management_rating >= 1 AND management_rating <= 5),
  culture_rating INTEGER CHECK (culture_rating >= 1 AND culture_rating <= 5),
  pros TEXT NOT NULL,
  cons TEXT NOT NULL,
  advice_to_management TEXT,
  base_salary DECIMAL(10, 2),
  bonuses DECIMAL(10, 2),
  equity DECIMAL(10, 2),
  currency TEXT DEFAULT 'USD',
  display_name TEXT DEFAULT 'Anonymous',
  is_anonymous BOOLEAN DEFAULT TRUE,
  helpful_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_company_reviews_company ON company_reviews(company_id);
CREATE INDEX idx_company_reviews_status ON company_reviews(status);

-- Skills Assessment System
CREATE TABLE IF NOT EXISTS skill_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- Engineering, Marketing, Sales, etc.
  role TEXT NOT NULL,
  questions JSONB NOT NULL, -- AI-generated questions
  answers JSONB NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  breakdown JSONB NOT NULL, -- Skills breakdown
  feedback TEXT,
  recommendations TEXT[],
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_skill_assessments_user ON skill_assessments(user_id);
CREATE INDEX idx_skill_assessments_category ON skill_assessments(category);

-- Video Interview System (Skeleton)
CREATE TABLE IF NOT EXISTS video_interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  duration INTEGER, -- seconds
  questions TEXT[],
  status TEXT DEFAULT 'submitted', -- submitted, reviewed, accepted, rejected
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_video_interviews_job ON video_interviews(job_id);
CREATE INDEX idx_video_interviews_user ON video_interviews(user_id);

-- InMail Credits (Premium Feature)
CREATE TABLE IF NOT EXISTS inmail_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  credits INTEGER DEFAULT 0,
  last_reset_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE inmail_credits ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Conversations
CREATE POLICY "Users can view their own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

-- RLS Policies for Messages
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their received messages"
  ON messages FOR UPDATE
  USING (auth.uid() = receiver_id);

-- RLS Policies for Companies
CREATE POLICY "Anyone can view companies"
  ON companies FOR SELECT
  USING (true);

-- RLS Policies for Company Reviews
CREATE POLICY "Anyone can view approved reviews"
  ON company_reviews FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Users can create reviews"
  ON company_reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own reviews"
  ON company_reviews FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for Skill Assessments
CREATE POLICY "Users can view their own assessments"
  ON skill_assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create assessments"
  ON skill_assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for Video Interviews
CREATE POLICY "Users can view their own video interviews"
  ON video_interviews FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create video interviews"
  ON video_interviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for InMail Credits
CREATE POLICY "Users can view their own credits"
  ON inmail_credits FOR SELECT
  USING (auth.uid() = user_id);
