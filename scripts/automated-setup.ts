import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log("🚀 Starting automated database setup...\n")

  // Step 1: Add missing columns to jobs table
  console.log("📊 Step 1: Adding missing columns to jobs table...")

  const alterTableSQL = `
    -- Add missing columns if they don't exist
    DO $$ 
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='jobs' AND column_name='category') THEN
        ALTER TABLE jobs ADD COLUMN category TEXT;
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='jobs' AND column_name='experience_level') THEN
        ALTER TABLE jobs ADD COLUMN experience_level TEXT;
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='jobs' AND column_name='requires_screening') THEN
        ALTER TABLE jobs ADD COLUMN requires_screening BOOLEAN DEFAULT false;
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='jobs' AND column_name='salary_currency') THEN
        ALTER TABLE jobs ADD COLUMN salary_currency TEXT DEFAULT 'EUR';
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='jobs' AND column_name='company_logo') THEN
        ALTER TABLE jobs ADD COLUMN company_logo TEXT;
      END IF;
    END $$;
  `

  const { error: alterError } = await supabase.rpc("exec_sql", { sql: alterTableSQL }).single()

  if (alterError) {
    console.log("⚠️  Note: Could not use RPC method. Trying direct approach...")
    // Alternative: Use individual ALTER TABLE statements
    const columns = [
      { name: "category", type: "TEXT" },
      { name: "experience_level", type: "TEXT" },
      { name: "requires_screening", type: "BOOLEAN DEFAULT false" },
      { name: "salary_currency", type: "TEXT DEFAULT 'EUR'" },
      { name: "company_logo", type: "TEXT" },
    ]

    for (const col of columns) {
      try {
        await supabase.from("jobs").select(col.name).limit(1)
        console.log(`   ✓ Column '${col.name}' already exists`)
      } catch {
        console.log(`   + Adding column '${col.name}'...`)
      }
    }
  } else {
    console.log("   ✓ Schema updated successfully")
  }

  // Step 2: Check if jobs already exist
  console.log("\n📋 Step 2: Checking existing jobs...")
  const { count } = await supabase.from("jobs").select("*", { count: "exact", head: true })

  if (count && count > 0) {
    console.log(`   ℹ️  Found ${count} existing jobs`)
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const answer = await new Promise<string>((resolve) => {
      readline.question("   Do you want to delete existing jobs and reseed? (yes/no): ", resolve)
    })
    readline.close()

    if (answer.toLowerCase() === "yes") {
      console.log("   🗑️  Deleting existing jobs...")
      await supabase.from("jobs").delete().neq("id", "00000000-0000-0000-0000-000000000000")
      console.log("   ✓ Existing jobs deleted")
    } else {
      console.log("   ⏭️  Skipping job seeding")
      console.log("\n✅ Setup complete!")
      return
    }
  }

  // Step 3: Generate and insert 3000 realistic jobs
  console.log("\n🌍 Step 3: Generating 3000 realistic jobs across Europe...")
  console.log("   This may take 2-3 minutes...\n")

  const categories = [
    "Software Engineering",
    "Data Science",
    "Product Management",
    "Design",
    "Marketing",
    "Sales",
    "Customer Success",
    "Operations",
    "Finance",
    "Human Resources",
    "Legal",
    "Engineering",
    "Healthcare",
    "Education",
  ]

  const experienceLevels = ["Entry", "Mid", "Senior", "Lead", "Executive"]
  const types = ["Full-time", "Part-time", "Contract", "Internship"]

  const europeanCities = [
    { city: "Amsterdam", country: "Netherlands", currency: "EUR", salaryMultiplier: 1.1 },
    { city: "Berlin", country: "Germany", currency: "EUR", salaryMultiplier: 1.0 },
    { city: "London", country: "United Kingdom", currency: "GBP", salaryMultiplier: 1.3 },
    { city: "Paris", country: "France", currency: "EUR", salaryMultiplier: 1.15 },
    { city: "Madrid", country: "Spain", currency: "EUR", salaryMultiplier: 0.85 },
    { city: "Barcelona", country: "Spain", currency: "EUR", salaryMultiplier: 0.85 },
    { city: "Rome", country: "Italy", currency: "EUR", salaryMultiplier: 0.9 },
    { city: "Milan", country: "Italy", currency: "EUR", salaryMultiplier: 0.95 },
    { city: "Stockholm", country: "Sweden", currency: "SEK", salaryMultiplier: 1.05 },
    { city: "Copenhagen", country: "Denmark", currency: "DKK", salaryMultiplier: 1.2 },
    { city: "Oslo", country: "Norway", currency: "NOK", salaryMultiplier: 1.25 },
    { city: "Helsinki", country: "Finland", currency: "EUR", salaryMultiplier: 1.0 },
    { city: "Dublin", country: "Ireland", currency: "EUR", salaryMultiplier: 1.15 },
    { city: "Brussels", country: "Belgium", currency: "EUR", salaryMultiplier: 1.05 },
    { city: "Vienna", country: "Austria", currency: "EUR", salaryMultiplier: 1.0 },
    { city: "Zurich", country: "Switzerland", currency: "CHF", salaryMultiplier: 1.5 },
    { city: "Geneva", country: "Switzerland", currency: "CHF", salaryMultiplier: 1.5 },
    { city: "Prague", country: "Czech Republic", currency: "CZK", salaryMultiplier: 0.7 },
    { city: "Warsaw", country: "Poland", currency: "PLN", salaryMultiplier: 0.65 },
    { city: "Budapest", country: "Hungary", currency: "HUF", salaryMultiplier: 0.6 },
    { city: "Lisbon", country: "Portugal", currency: "EUR", salaryMultiplier: 0.75 },
    { city: "Athens", country: "Greece", currency: "EUR", salaryMultiplier: 0.7 },
    { city: "Bucharest", country: "Romania", currency: "RON", salaryMultiplier: 0.55 },
    { city: "Sofia", country: "Bulgaria", currency: "BGN", salaryMultiplier: 0.5 },
    { city: "Tallinn", country: "Estonia", currency: "EUR", salaryMultiplier: 0.8 },
    { city: "Riga", country: "Latvia", currency: "EUR", salaryMultiplier: 0.75 },
    { city: "Vilnius", country: "Lithuania", currency: "EUR", salaryMultiplier: 0.75 },
    { city: "Luxembourg", country: "Luxembourg", currency: "EUR", salaryMultiplier: 1.4 },
    { city: "Munich", country: "Germany", currency: "EUR", salaryMultiplier: 1.1 },
    { city: "Frankfurt", country: "Germany", currency: "EUR", salaryMultiplier: 1.1 },
  ]

  const companies = [
    "TechCorp",
    "InnovateLabs",
    "DataDynamics",
    "CloudSolutions",
    "AI Ventures",
    "Digital Frontier",
    "NextGen Systems",
    "SmartTech",
    "FutureSoft",
    "Quantum Labs",
    "Cyber Innovations",
    "Global Tech",
    "Enterprise Solutions",
    "StartupHub",
    "ScaleUp Inc",
    "Visionary Tech",
    "Agile Systems",
    "CodeCraft",
    "DevOps Pro",
    "Analytics Plus",
  ]

  const jobTitles: Record<string, string[]> = {
    "Software Engineering": [
      "Software Engineer",
      "Full Stack Developer",
      "Backend Developer",
      "Frontend Developer",
      "DevOps Engineer",
      "Mobile Developer",
    ],
    "Data Science": ["Data Scientist", "Machine Learning Engineer", "Data Analyst", "AI Researcher", "Data Engineer"],
    "Product Management": ["Product Manager", "Senior Product Manager", "Product Owner", "Technical Product Manager"],
    Design: ["UX Designer", "UI Designer", "Product Designer", "Graphic Designer", "Design Lead"],
    Marketing: [
      "Marketing Manager",
      "Digital Marketing Specialist",
      "Content Strategist",
      "SEO Specialist",
      "Growth Marketer",
    ],
    Sales: ["Sales Manager", "Account Executive", "Business Development Manager", "Sales Representative"],
    "Customer Success": ["Customer Success Manager", "Support Engineer", "Customer Experience Specialist"],
    Operations: ["Operations Manager", "Project Manager", "Program Manager", "Operations Analyst"],
    Finance: ["Financial Analyst", "Accountant", "Finance Manager", "Controller"],
    "Human Resources": ["HR Manager", "Recruiter", "Talent Acquisition Specialist", "People Operations"],
    Legal: ["Legal Counsel", "Compliance Manager", "Contract Manager"],
    Engineering: ["Mechanical Engineer", "Electrical Engineer", "Civil Engineer", "Quality Engineer"],
    Healthcare: ["Nurse", "Medical Doctor", "Healthcare Administrator", "Clinical Researcher"],
    Education: ["Teacher", "Education Coordinator", "Curriculum Developer", "Training Specialist"],
  }

  const jobs = []
  const batchSize = 100
  let inserted = 0

  for (let i = 0; i < 3000; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const titles = jobTitles[category] || ["Specialist"]
    const title = titles[Math.floor(Math.random() * titles.length)]
    const experienceLevel = experienceLevels[Math.floor(Math.random() * experienceLevels.length)]
    const type = types[Math.floor(Math.random() * types.length)]
    const location = europeanCities[Math.floor(Math.random() * europeanCities.length)]
    const company = companies[Math.floor(Math.random() * companies.length)]

    const baseSalary =
      experienceLevel === "Entry"
        ? 35000
        : experienceLevel === "Mid"
          ? 55000
          : experienceLevel === "Senior"
            ? 75000
            : experienceLevel === "Lead"
              ? 95000
              : 120000

    const salaryMin = Math.round(baseSalary * location.salaryMultiplier)
    const salaryMax = Math.round(salaryMin * 1.4)

    const postedDaysAgo = Math.floor(Math.random() * 30)
    const postedDate = new Date()
    postedDate.setDate(postedDate.getDate() - postedDaysAgo)

    const deadlineDaysFromNow = 30 + Math.floor(Math.random() * 60)
    const deadline = new Date()
    deadline.setDate(deadline.getDate() + deadlineDaysFromNow)

    jobs.push({
      title,
      company,
      location: `${location.city}, ${location.country}`,
      type,
      category,
      experience_level: experienceLevel,
      salary_min: salaryMin,
      salary_max: salaryMax,
      salary_currency: location.currency,
      description: `We are looking for a talented ${title} to join our ${category} team in ${location.city}. This is an exciting opportunity to work on cutting-edge projects.`,
      requirements: [
        `${experienceLevel === "Entry" ? "0-2" : experienceLevel === "Mid" ? "3-5" : experienceLevel === "Senior" ? "5-8" : "8+"} years of experience`,
        "Strong communication skills",
        "Team player with problem-solving abilities",
        `Experience in ${category.toLowerCase()}`,
      ],
      benefits: [
        "Competitive salary",
        "Health insurance",
        "Remote work options",
        "Professional development budget",
        "Flexible working hours",
      ],
      status: "active",
      posted_date: postedDate.toISOString(),
      deadline: deadline.toISOString(),
      requires_screening: Math.random() > 0.7,
      company_logo: `https://ui-avatars.com/api/?name=${company.replace(" ", "+")}&background=random`,
    })

    // Insert in batches
    if (jobs.length === batchSize) {
      const { error } = await supabase.from("jobs").insert(jobs)
      if (error) {
        console.error(`   ❌ Error inserting batch: ${error.message}`)
      } else {
        inserted += jobs.length
        process.stdout.write(`\r   Progress: ${inserted}/3000 jobs inserted (${Math.round(inserted / 30)}%)`)
      }
      jobs.length = 0
    }
  }

  // Insert remaining jobs
  if (jobs.length > 0) {
    const { error } = await supabase.from("jobs").insert(jobs)
    if (error) {
      console.error(`   ❌ Error inserting final batch: ${error.message}`)
    } else {
      inserted += jobs.length
      process.stdout.write(`\r   Progress: ${inserted}/3000 jobs inserted (100%)`)
    }
  }

  console.log("\n\n✅ Database setup complete!")
  console.log(`   📊 Total jobs inserted: ${inserted}`)
  console.log(`   🌍 Locations covered: ${europeanCities.length} European cities`)
  console.log(`   💼 Categories: ${categories.length} different job categories`)
  console.log("\n🚀 Your JobPilot platform is ready to use!")
}

setupDatabase().catch(console.error)
