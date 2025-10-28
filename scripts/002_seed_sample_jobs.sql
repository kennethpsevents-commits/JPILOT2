-- Insert sample job listings
INSERT INTO public.jobs (title, company, location, type, salary_min, salary_max, description, requirements, benefits, deadline) VALUES
(
  'Senior Full-Stack Developer',
  'TechCorp Solutions',
  'San Francisco, CA',
  'full-time',
  120000,
  180000,
  'We are seeking an experienced Full-Stack Developer to join our innovative team. You will work on cutting-edge web applications using modern technologies.',
  ARRAY['5+ years experience with React and Node.js', 'Strong TypeScript skills', 'Experience with cloud platforms (AWS/Azure)', 'Excellent problem-solving abilities'],
  ARRAY['Health insurance', '401k matching', 'Remote work options', 'Professional development budget'],
  NOW() + INTERVAL '30 days'
),
(
  'Frontend Engineer',
  'StartupXYZ',
  'Remote',
  'remote',
  90000,
  130000,
  'Join our fast-growing startup as a Frontend Engineer. Build beautiful, responsive user interfaces that delight our customers.',
  ARRAY['3+ years React experience', 'Strong CSS and design skills', 'Experience with modern build tools', 'Passion for user experience'],
  ARRAY['Equity options', 'Flexible hours', 'Home office stipend', 'Unlimited PTO'],
  NOW() + INTERVAL '45 days'
),
(
  'DevOps Engineer',
  'CloudScale Inc',
  'Austin, TX',
  'full-time',
  110000,
  160000,
  'Looking for a DevOps Engineer to help scale our infrastructure. You will work with Kubernetes, CI/CD pipelines, and cloud infrastructure.',
  ARRAY['Experience with Kubernetes and Docker', 'Strong scripting skills (Python/Bash)', 'AWS or GCP certification preferred', 'Infrastructure as Code experience'],
  ARRAY['Competitive salary', 'Stock options', 'Learning budget', 'Gym membership'],
  NOW() + INTERVAL '60 days'
),
(
  'Product Designer',
  'DesignHub',
  'New York, NY',
  'full-time',
  95000,
  140000,
  'We need a talented Product Designer to create intuitive and beautiful user experiences. You will work closely with product and engineering teams.',
  ARRAY['5+ years product design experience', 'Proficiency in Figma and design systems', 'Strong portfolio demonstrating UX/UI skills', 'Experience with user research'],
  ARRAY['Health & dental insurance', 'Design conference budget', 'Latest design tools', 'Collaborative environment'],
  NOW() + INTERVAL '40 days'
),
(
  'Backend Developer',
  'DataFlow Systems',
  'Seattle, WA',
  'full-time',
  100000,
  150000,
  'Join our backend team to build scalable APIs and microservices. Work with cutting-edge technologies in a collaborative environment.',
  ARRAY['Strong experience with Node.js or Python', 'Database design expertise (PostgreSQL/MongoDB)', 'RESTful API development', 'Microservices architecture knowledge'],
  ARRAY['Competitive compensation', 'Remote flexibility', 'Professional growth opportunities', 'Team events'],
  NOW() + INTERVAL '35 days'
),
(
  'Mobile Developer (React Native)',
  'AppMakers Co',
  'Los Angeles, CA',
  'contract',
  80000,
  120000,
  'Contract position for an experienced React Native developer to build cross-platform mobile applications.',
  ARRAY['3+ years React Native experience', 'Published apps on App Store and Play Store', 'Strong JavaScript/TypeScript skills', 'Experience with mobile CI/CD'],
  ARRAY['Flexible contract terms', 'Remote work', 'Potential for full-time conversion'],
  NOW() + INTERVAL '20 days'
),
(
  'Data Scientist',
  'AI Innovations',
  'Boston, MA',
  'full-time',
  130000,
  190000,
  'Seeking a Data Scientist to develop machine learning models and extract insights from large datasets.',
  ARRAY['PhD or Masters in Computer Science/Statistics', 'Strong Python and ML libraries (TensorFlow, PyTorch)', 'Experience with big data tools', 'Published research preferred'],
  ARRAY['Cutting-edge research opportunities', 'Conference attendance', 'Comprehensive benefits', 'Collaborative research environment'],
  NOW() + INTERVAL '50 days'
),
(
  'QA Engineer',
  'QualityFirst Tech',
  'Chicago, IL',
  'full-time',
  75000,
  110000,
  'Join our QA team to ensure the highest quality standards for our software products. Automate testing and improve our CI/CD pipeline.',
  ARRAY['Experience with test automation frameworks', 'Strong understanding of QA methodologies', 'Programming skills (JavaScript/Python)', 'API testing experience'],
  ARRAY['Health benefits', 'Professional certifications', 'Work-life balance', 'Growth opportunities'],
  NOW() + INTERVAL '25 days'
);
