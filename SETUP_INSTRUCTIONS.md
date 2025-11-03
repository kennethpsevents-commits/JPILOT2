# 🚀 JobPilot - Automated Setup Instructions

## One-Command Setup

Run this single command to set up your entire database with 3000 realistic jobs:

\`\`\`bash
npm run setup-database
\`\`\`

This automated script will:

1. ✅ Add missing columns to the jobs table (category, experience_level, salary_currency, etc.)
2. ✅ Check for existing jobs and ask if you want to replace them
3. ✅ Generate and insert 3000 unique, realistic job listings across 30 European cities
4. ✅ Display real-time progress as jobs are inserted

## What You Get

- **3000 Unique Jobs** - No duplicates, each with unique descriptions
- **30 European Cities** - Amsterdam, Berlin, London, Paris, Madrid, and 25 more
- **14 Job Categories** - Software Engineering, Data Science, Marketing, Sales, etc.
- **5 Experience Levels** - Entry, Mid, Senior, Lead, Executive
- **Realistic Salaries** - Adjusted by country and experience level
- **Multiple Currencies** - EUR, GBP, SEK, NOK, CHF, and more

## Expected Output

\`\`\`
🚀 Starting automated database setup...

📊 Step 1: Adding missing columns to jobs table...
   ✓ Schema updated successfully

📋 Step 2: Checking existing jobs...
   ℹ️  Found 0 existing jobs

🌍 Step 3: Generating 3000 realistic jobs across Europe...
   This may take 2-3 minutes...

   Progress: 3000/3000 jobs inserted (100%)

✅ Database setup complete!
   📊 Total jobs inserted: 3000
   🌍 Locations covered: 30 European cities
   💼 Categories: 14 different job categories

🚀 Your JobPilot platform is ready to use!
\`\`\`

## Troubleshooting

If you encounter any errors:

1. **Check environment variables** - Ensure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
2. **Check Supabase connection** - Make sure your Supabase project is active
3. **Check permissions** - Ensure the service role key has admin permissions

## Manual Alternative

If the automated script doesn't work, you can:

1. Go to Supabase Dashboard → SQL Editor
2. Run the SQL from `scripts/011_fix_jobs_schema.sql`
3. Then run `npm run seed-jobs`

## Next Steps

After setup is complete:

1. Visit `/jobs` to see all 3000 jobs with infinite scroll
2. Use the search bar to filter by keywords, location, category
3. Test the subscription-based access (Free: 10 jobs, Pro: 200 jobs, Enterprise: unlimited)
4. Access owner dashboard at `/owner/login` (password: `Wearejobpilot_Psevents_in`)

---

**Need help?** Contact support at info@wearejobpilot.com
