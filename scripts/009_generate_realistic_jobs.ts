import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// European cities with their countries
const europeanCities = [
  { city: "London", country: "United Kingdom" },
  { city: "Berlin", country: "Germany" },
  { city: "Paris", country: "France" },
  { city: "Amsterdam", country: "Netherlands" },
  { city: "Madrid", country: "Spain" },
  { city: "Barcelona", country: "Spain" },
  { city: "Rome", country: "Italy" },
  { city: "Milan", country: "Italy" },
  { city: "Munich", country: "Germany" },
  { city: "Hamburg", country: "Germany" },
  { city: "Vienna", country: "Austria" },
  { city: "Stockholm", country: "Sweden" },
  { city: "Copenhagen", country: "Denmark" },
  { city: "Oslo", country: "Norway" },
  { city: "Helsinki", country: "Finland" },
  { city: "Dublin", country: "Ireland" },
  { city: "Brussels", country: "Belgium" },
  { city: "Zurich", country: "Switzerland" },
  { city: "Geneva", country: "Switzerland" },
  { city: "Lisbon", country: "Portugal" },
  { city: "Porto", country: "Portugal" },
  { city: "Warsaw", country: "Poland" },
  { city: "Prague", country: "Czech Republic" },
  { city: "Budapest", country: "Hungary" },
  { city: "Athens", country: "Greece" },
  { city: "Edinburgh", country: "United Kingdom" },
  { city: "Manchester", country: "United Kingdom" },
  { city: "Lyon", country: "France" },
  { city: "Frankfurt", country: "Germany" },
  { city: "Rotterdam", country: "Netherlands" },
]

// Job titles by category
const jobTitles = {
  Engineering: [
    "Senior Full Stack Engineer",
    "Frontend Developer",
    "Backend Engineer",
    "DevOps Engineer",
    "Cloud Architect",
    "Mobile Developer",
    "Software Engineer",
    "Platform Engineer",
    "Site Reliability Engineer",
    "Security Engineer",
    "Data Engineer",
    "ML Engineer",
    "iOS Developer",
    "Android Developer",
    "React Developer",
    "Node.js Developer",
    "Python Developer",
    "Java Developer",
    "Go Developer",
    "Rust Developer",
  ],
  "Data Science": [
    "Data Scientist",
    "Machine Learning Engineer",
    "AI Researcher",
    "Data Analyst",
    "Business Intelligence Analyst",
    "Analytics Engineer",
    "Research Scientist",
    "Computer Vision Engineer",
    "NLP Engineer",
    "Deep Learning Engineer",
  ],
  Design: [
    "Product Designer",
    "UX Designer",
    "UI Designer",
    "UX Researcher",
    "Design System Lead",
    "Brand Designer",
    "Motion Designer",
    "Graphic Designer",
    "Interaction Designer",
    "Visual Designer",
  ],
  Marketing: [
    "Marketing Manager",
    "Growth Marketing Manager",
    "Content Marketing Manager",
    "SEO Specialist",
    "Social Media Manager",
    "Brand Manager",
    "Product Marketing Manager",
    "Digital Marketing Manager",
    "Performance Marketing Manager",
    "Marketing Analyst",
  ],
  Sales: [
    "Account Executive",
    "Sales Development Representative",
    "Customer Success Manager",
    "Enterprise Sales Manager",
    "Business Development Manager",
    "Sales Engineer",
    "Regional Sales Manager",
    "Inside Sales Representative",
    "Partner Manager",
  ],
  Product: [
    "Product Manager",
    "Senior Product Manager",
    "Product Owner",
    "Technical Product Manager",
    "Group Product Manager",
    "Associate Product Manager",
    "Product Analyst",
    "Product Operations Manager",
    "Platform Product Manager",
  ],
  Operations: [
    "Operations Manager",
    "Supply Chain Manager",
    "Logistics Coordinator",
    "Operations Analyst",
    "Process Improvement Manager",
    "Project Manager",
    "Program Manager",
    "Scrum Master",
    "Agile Coach",
  ],
  "Customer Support": [
    "Customer Support Specialist",
    "Technical Support Engineer",
    "Support Team Lead",
    "Customer Success Specialist",
    "Help Desk Analyst",
    "Customer Experience Manager",
  ],
  Finance: [
    "Financial Analyst",
    "Accountant",
    "Finance Manager",
    "Controller",
    "FP&A Analyst",
    "Treasury Analyst",
    "Tax Specialist",
    "Audit Manager",
  ],
  "Human Resources": [
    "HR Manager",
    "Recruiter",
    "Talent Acquisition Specialist",
    "HR Business Partner",
    "People Operations Manager",
    "Compensation Analyst",
    "Learning & Development Manager",
  ],
}

// Company names by industry
const companies = [
  "TechVision",
  "DataFlow",
  "CloudScale",
  "InnovateLabs",
  "DigitalEdge",
  "SmartSolutions",
  "FutureWorks",
  "NexGen Systems",
  "Quantum Dynamics",
  "Apex Technologies",
  "Velocity Software",
  "Horizon Digital",
  "Catalyst Group",
  "Pinnacle Tech",
  "Vertex Solutions",
  "Momentum Labs",
  "Synergy Systems",
  "Elevate Digital",
  "Fusion Technologies",
  "Zenith Corp",
  "Prism Analytics",
  "Nexus Innovations",
  "Orbit Technologies",
  "Stellar Systems",
  "Vanguard Tech",
  "Eclipse Software",
  "Phoenix Digital",
  "Atlas Solutions",
  "Titan Technologies",
  "Nova Systems",
  "Pulse Digital",
  "Spark Innovations",
  "Summit Tech",
  "Beacon Systems",
  "Compass Digital",
  "Anchor Technologies",
  "Bridge Solutions",
  "Crown Digital",
  "Delta Systems",
  "Echo Tech",
  "Forge Innovations",
  "Gateway Solutions",
  "Harbor Tech",
  "Insight Digital",
  "Junction Systems",
]

// Generate unique job descriptions
function generateJobDescription(title: string, company: string, category: string, level: string): string {
  const descriptions = {
    Engineering: [
      `Join ${company} as a ${title} and help build scalable, high-performance applications that serve millions of users across Europe. You'll work with cutting-edge technologies and collaborate with talented engineers to solve complex technical challenges.`,
      `${company} is seeking a ${title} to architect and develop innovative solutions for our growing platform. You'll have the opportunity to work on greenfield projects and make significant technical decisions that shape our product.`,
      `As a ${title} at ${company}, you'll be responsible for designing and implementing robust systems that power our core business. We're looking for someone passionate about clean code, best practices, and continuous improvement.`,
    ],
    "Data Science": [
      `${company} is looking for a ${title} to drive data-driven decision making across the organization. You'll build predictive models, analyze complex datasets, and translate insights into actionable business strategies.`,
      `Join our data team at ${company} as a ${title} and work on challenging problems in machine learning and AI. You'll have access to large-scale datasets and the latest ML infrastructure.`,
      `We're seeking a ${title} at ${company} to develop advanced analytics solutions and ML models that directly impact our product roadmap and business outcomes.`,
    ],
    Design: [
      `${company} is hiring a ${title} to create beautiful, intuitive user experiences for our products. You'll work closely with product and engineering teams to design solutions that delight our users.`,
      `As a ${title} at ${company}, you'll lead design initiatives from concept to launch, conducting user research and creating high-fidelity prototypes that solve real user problems.`,
      `Join ${company}'s design team as a ${title} and help shape the visual identity and user experience of our platform. You'll have creative freedom and the support of a collaborative team.`,
    ],
    Marketing: [
      `${company} is seeking a ${title} to drive growth and brand awareness across European markets. You'll develop and execute marketing strategies that resonate with our target audience.`,
      `As a ${title} at ${company}, you'll lead multi-channel marketing campaigns, analyze performance metrics, and optimize our marketing funnel to drive conversions.`,
      `Join ${company} as a ${title} and help us tell our story to the world. You'll work on exciting campaigns, content strategy, and brand positioning initiatives.`,
    ],
    Sales: [
      `${company} is looking for a ${title} to drive revenue growth by building relationships with enterprise clients. You'll manage the full sales cycle and work with a supportive team.`,
      `As a ${title} at ${company}, you'll identify new business opportunities, conduct product demonstrations, and close deals with key decision makers across Europe.`,
      `Join our sales team at ${company} as a ${title} and help us expand our market presence. You'll have uncapped earning potential and excellent career growth opportunities.`,
    ],
  }

  const categoryDescriptions = descriptions[category as keyof typeof descriptions] || descriptions.Engineering
  const randomDesc = categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)]

  return randomDesc
}

// Generate requirements based on level and category
function generateRequirements(category: string, level: string): string[] {
  const baseRequirements = {
    entry: [
      "Bachelor's degree or equivalent experience",
      "Strong problem-solving skills",
      "Excellent communication abilities",
      "Eagerness to learn and grow",
      "Team player with collaborative mindset",
    ],
    mid: [
      "3-5 years of relevant experience",
      "Proven track record of success",
      "Strong technical/domain expertise",
      "Ability to work independently",
      "Mentorship capabilities",
    ],
    senior: [
      "7+ years of relevant experience",
      "Leadership and strategic thinking",
      "Deep domain expertise",
      "Track record of delivering complex projects",
      "Excellent stakeholder management",
    ],
  }

  const categorySpecific = {
    Engineering: ["Proficiency in modern tech stack", "System design knowledge", "CI/CD experience"],
    "Data Science": ["Python, SQL, ML frameworks", "Statistical analysis", "Data visualization"],
    Design: ["Figma/Sketch expertise", "User research experience", "Portfolio required"],
    Marketing: ["Digital marketing tools", "Analytics platforms", "Content creation"],
    Sales: ["CRM proficiency", "Negotiation skills", "Pipeline management"],
  }

  const base = baseRequirements[level as keyof typeof baseRequirements] || baseRequirements.mid
  const specific = categorySpecific[category as keyof typeof categorySpecific] || []

  return [...base.slice(0, 3), ...specific.slice(0, 2)]
}

// Generate benefits
function generateBenefits(): string[] {
  const allBenefits = [
    "Competitive salary and equity",
    "Health insurance (medical, dental, vision)",
    "Flexible working hours",
    "Remote work options",
    "Professional development budget",
    "Annual learning stipend",
    "Gym membership",
    "Mental health support",
    "Parental leave",
    "Pension/retirement plan",
    "25+ days vacation",
    "Home office setup budget",
    "Team events and offsites",
    "Stock options",
    "Performance bonuses",
    "Commuter benefits",
    "Meal allowance",
    "Relocation assistance",
    "Visa sponsorship",
    "Career growth opportunities",
  ]

  // Randomly select 5-7 benefits
  const numBenefits = 5 + Math.floor(Math.random() * 3)
  const shuffled = allBenefits.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numBenefits)
}

// Generate salary range based on level and location
function generateSalary(level: string, country: string): { min: number; max: number } {
  const baseSalaries = {
    entry: { min: 35000, max: 55000 },
    mid: { min: 55000, max: 85000 },
    senior: { min: 85000, max: 130000 },
  }

  // Country multipliers
  const countryMultipliers: Record<string, number> = {
    Switzerland: 1.5,
    "United Kingdom": 1.3,
    Germany: 1.2,
    Netherlands: 1.2,
    Sweden: 1.15,
    Denmark: 1.15,
    Norway: 1.15,
    France: 1.1,
    Austria: 1.1,
    Belgium: 1.05,
    Ireland: 1.1,
    Finland: 1.05,
    Italy: 0.95,
    Spain: 0.9,
    Portugal: 0.8,
    Poland: 0.7,
    "Czech Republic": 0.7,
    Hungary: 0.65,
    Greece: 0.75,
  }

  const base = baseSalaries[level as keyof typeof baseSalaries] || baseSalaries.mid
  const multiplier = countryMultipliers[country] || 1.0

  return {
    min: Math.round(base.min * multiplier),
    max: Math.round(base.max * multiplier),
  }
}

// Main generation function
async function generateJobs() {
  console.log("Starting job generation...")

  const jobs = []
  const locationTypes = ["remote", "onsite", "hybrid"]
  const employmentTypes = ["full-time", "part-time", "contract"]
  const experienceLevels = ["entry", "mid", "senior"]

  let jobCount = 0
  const targetJobs = 3000

  // Generate jobs for each category
  for (const [category, titles] of Object.entries(jobTitles)) {
    for (const title of titles) {
      // Generate multiple jobs for each title across different cities
      const jobsPerTitle = Math.ceil(targetJobs / Object.values(jobTitles).flat().length)

      for (let i = 0; i < jobsPerTitle && jobCount < targetJobs; i++) {
        const location = europeanCities[Math.floor(Math.random() * europeanCities.length)]
        const company = companies[Math.floor(Math.random() * companies.length)]
        const level = experienceLevels[Math.floor(Math.random() * experienceLevels.length)]
        const locationType = locationTypes[Math.floor(Math.random() * locationTypes.length)]
        const employmentType = employmentTypes[Math.floor(Math.random() * employmentTypes.length)]
        const requiresScreening = Math.random() > 0.6

        const salary = generateSalary(level, location.country)
        const description = generateJobDescription(title, company, category, level)
        const requirements = generateRequirements(category, level)
        const benefits = generateBenefits()

        const fullLocation =
          locationType === "remote" ? `Remote (${location.country})` : `${location.city}, ${location.country}`

        jobs.push({
          title,
          company,
          company_logo: `/placeholder.svg?height=80&width=80&query=${company}`,
          location: fullLocation,
          type: employmentType,
          category,
          experience_level: level,
          requires_screening: requiresScreening,
          salary_currency: "EUR",
          salary_min: salary.min,
          salary_max: salary.max,
          description,
          requirements: JSON.stringify(requirements),
          benefits: JSON.stringify(benefits),
          status: "active",
          posted_date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          deadline: new Date(Date.now() + (30 + Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString(),
        })

        jobCount++
      }
    }
  }

  console.log(`Generated ${jobs.length} unique jobs`)

  // Insert in batches of 100
  const batchSize = 100
  for (let i = 0; i < jobs.length; i += batchSize) {
    const batch = jobs.slice(i, i + batchSize)
    const { error } = await supabase.from("jobs").insert(batch)

    if (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, error)
    } else {
      console.log(`Inserted batch ${i / batchSize + 1} (${batch.length} jobs)`)
    }
  }

  console.log("Job generation complete!")
}

generateJobs()
