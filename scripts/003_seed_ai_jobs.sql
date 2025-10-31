-- Seed sample jobs with rich data for AI matching
-- Note: Embeddings will be computed server-side when jobs are created via API

INSERT INTO public.jobs (
  id,
  title,
  company,
  location,
  type,
  salary_min,
  salary_max,
  description,
  requirements,
  benefits,
  status
) VALUES
(
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'Senior Full-Stack Engineer',
  'TechCorp AI',
  'San Francisco, CA (Remote)',
  'full-time',
  150000,
  220000,
  'Join our AI-powered platform team building next-generation job matching technology. Work with React, Next.js, TypeScript, Node.js, and cutting-edge AI/ML systems.',
  ARRAY['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'AI/ML', '5+ years experience'],
  ARRAY['Health insurance', 'Stock options', 'Remote work', '401k matching', 'Learning budget'],
  'active'
),
(
  'a0000000-0000-0000-0000-000000000002'::uuid,
  'AI/ML Engineer',
  'DataFlow Systems',
  'New York, NY (Hybrid)',
  'full-time',
  160000,
  240000,
  'Build production ML pipelines for semantic search and recommendation systems. Work with Python, PyTorch, TensorFlow, and vector databases.',
  ARRAY['Python', 'PyTorch', 'TensorFlow', 'Vector databases', 'NLP', 'MLOps', '3+ years experience'],
  ARRAY['Health insurance', 'Equity', 'Flexible hours', 'Conference budget'],
  'active'
),
(
  'a0000000-0000-0000-0000-000000000003'::uuid,
  'Frontend Developer',
  'DesignHub',
  'Austin, TX (Remote)',
  'full-time',
  120000,
  160000,
  'Create beautiful, accessible user interfaces for our design collaboration platform. Expert in React, TypeScript, and modern CSS.',
  ARRAY['React', 'TypeScript', 'CSS', 'Tailwind', 'Accessibility', '3+ years experience'],
  ARRAY['Health insurance', 'Remote work', 'Unlimited PTO', 'Home office stipend'],
  'active'
),
(
  'a0000000-0000-0000-0000-000000000004'::uuid,
  'DevOps Engineer',
  'CloudScale Inc',
  'Seattle, WA (Remote)',
  'full-time',
  140000,
  190000,
  'Build and maintain cloud infrastructure on AWS/GCP. Kubernetes, Terraform, CI/CD pipelines, and monitoring systems.',
  ARRAY['Kubernetes', 'Docker', 'Terraform', 'AWS', 'GCP', 'CI/CD', '4+ years experience'],
  ARRAY['Health insurance', 'Stock options', 'Remote work', 'Professional development'],
  'active'
),
(
  'a0000000-0000-0000-0000-000000000005'::uuid,
  'Product Manager - AI',
  'InnovateLabs',
  'Boston, MA (Hybrid)',
  'full-time',
  130000,
  180000,
  'Lead product strategy for AI-powered features. Work with engineering, design, and data science teams to ship innovative products.',
  ARRAY['Product management', 'AI/ML understanding', 'Agile', 'Data-driven', '5+ years experience'],
  ARRAY['Health insurance', 'Equity', 'Flexible schedule', 'Learning budget'],
  'active'
);

-- Note: Run the embedding generation script after this to populate embeddings
