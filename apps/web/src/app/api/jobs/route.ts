import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getUserTier } from "@/lib/auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");
  const location = searchParams.get("location");
  const contract = searchParams.get("contract");
  const minSalary = searchParams.get("minSalary");

  const tier = await getUserTier(req); // "buddy" | "coach" | "pro"

  let query = supabase.from("jobs").select("*").order("posted_at", { ascending: false });

  if (role) query = query.ilike("title", `%${role}%`);
  if (location) query = query.ilike("location", `%${location}%`);
  if (contract) query = query.eq("contract_type", contract);
  if (minSalary) query = query.gte("salary_min", minSalary);

  const { data, error } = await query.limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Tier-based gating
  const results = data.map((job) => {
    if (tier === "buddy") {
      return {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
      };
    }
    if (tier === "coach") {
      return {
        ...job,
        description: job.description,
        skills: job.skills,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        contract_type: job.contract_type,
      };
    }
    if (tier === "pro") {
      return {
        ...job,
        ai_match_score: Math.floor(Math.random() * 20) + 80, // demo 80–100%
        legal_insights: "This role is covered by EU standard remote contract law.",
        application_tips: "Highlight your TypeScript experience in the first bullet.",
      };
    }
  });

  return NextResponse.json({ tier, results });
}