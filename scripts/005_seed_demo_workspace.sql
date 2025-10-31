-- Seed data for demo workspace mode
-- Creates sample users, posts, jobs, messages for fully functional demo

-- Demo users (these will be created in auth.users via Supabase Auth)
-- For demo purposes, we'll reference existing user IDs or create profiles

-- Insert demo profiles (assuming auth.users exist)
INSERT INTO public.profiles (id, full_name, email, skills, experience_years, location, resume_url)
VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, 'Sarah Chen', 'sarah.chen@demo.com', ARRAY['React', 'TypeScript', 'Node.js', 'AWS'], 5, 'San Francisco, CA', '/demo/resumes/sarah-chen.pdf'),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'Marcus Johnson', 'marcus.j@demo.com', ARRAY['Python', 'Machine Learning', 'TensorFlow', 'Docker'], 7, 'New York, NY', '/demo/resumes/marcus-johnson.pdf'),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'Elena Rodriguez', 'elena.r@demo.com', ARRAY['Product Management', 'Agile', 'SQL', 'Analytics'], 4, 'Austin, TX', '/demo/resumes/elena-rodriguez.pdf')
ON CONFLICT (id) DO NOTHING;

-- Demo feed posts
INSERT INTO public.feed_posts (id, user_id, content, likes_count, comments_count, created_at)
VALUES
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001'::uuid, 'Just landed my dream job as a Senior Frontend Engineer! The AI matching on JobPilot was spot-on. 🚀', 24, 8, NOW() - INTERVAL '2 hours'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000002'::uuid, 'Looking for ML engineers to join our team. We''re building the future of AI-powered recruitment. DM me!', 15, 5, NOW() - INTERVAL '1 day'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000003'::uuid, 'Pro tip: Always customize your cover letter for each application. JobPilot''s AI Coach helped me craft perfect ones!', 42, 12, NOW() - INTERVAL '3 days')
ON CONFLICT DO NOTHING;

-- Demo messages (conversation threads)
INSERT INTO public.messages (sender_id, recipient_id, content, read_at, created_at)
VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, '00000000-0000-0000-0000-000000000002'::uuid, 'Hi Marcus! I saw your post about ML engineer positions. I''d love to learn more!', NOW(), NOW() - INTERVAL '5 hours'),
  ('00000000-0000-0000-0000-000000000002'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Hey Sarah! Thanks for reaching out. Let''s schedule a call this week?', NOW(), NOW() - INTERVAL '4 hours'),
  ('00000000-0000-0000-0000-000000000003'::uuid, '00000000-0000-0000-0000-000000000001'::uuid, 'Congrats on the new role! How did you prepare for the interviews?', NULL, NOW() - INTERVAL '1 hour')
ON CONFLICT DO NOTHING;

-- Demo notifications
INSERT INTO public.notifications (user_id, type, title, message, link, created_at)
VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, 'match', 'New Job Match!', 'Senior Frontend Engineer at TechCorp matches your profile 95%', '/jobs/demo-job-1', NOW() - INTERVAL '30 minutes'),
  ('00000000-0000-0000-0000-000000000001'::uuid, 'application', 'Application Update', 'Your application to Startup Inc. is under review', '/dashboard', NOW() - INTERVAL '2 hours'),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'message', 'New Message', 'Sarah Chen sent you a message', '/workspace/messages', NOW() - INTERVAL '5 hours')
ON CONFLICT DO NOTHING;

-- Demo subscriptions (all demo users start as free tier)
INSERT INTO public.subscriptions (user_id, tier, status)
VALUES
  ('00000000-0000-0000-0000-000000000001'::uuid, 'free', 'active'),
  ('00000000-0000-0000-0000-000000000002'::uuid, 'premium', 'active'),
  ('00000000-0000-0000-0000-000000000003'::uuid, 'free', 'active')
ON CONFLICT (user_id) DO NOTHING;

COMMENT ON TABLE public.feed_posts IS 'Demo workspace includes fully functional activity feed';
COMMENT ON TABLE public.messages IS 'Demo workspace includes working messaging system';
