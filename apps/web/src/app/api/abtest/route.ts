import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface ABTestRequest {
  name: string;
  variant: string;
  outcome?: string;
  metadata?: any;
}

export async function POST(req: Request) {
  try {
    const { name, variant, outcome, metadata }: ABTestRequest = await req.json();

    if (!name || !variant) {
      return NextResponse.json(
        { error: "Name and variant are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user already has this test
    const { data: existingTest } = await supabase
      .from("ab_tests")
      .select("id")
      .eq("name", name)
      .eq("user_id", user.id)
      .single();

    if (existingTest) {
      // Update existing test with outcome
      if (outcome) {
        const { error } = await supabase
          .from("ab_tests")
          .update({ outcome, metadata })
          .eq("id", existingTest.id);

        if (error) {
          console.error("AB test update error:", error);
          return NextResponse.json({ error: "Update failed" }, { status: 500 });
        }
      }
    } else {
      // Create new test entry
      const { error } = await supabase.from("ab_tests").insert({
        name,
        variant,
        user_id: user.id,
        outcome: outcome || null,
        metadata: metadata || null
      });

      if (error) {
        console.error("AB test insert error:", error);
        return NextResponse.json({ error: "Insert failed" }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("AB test API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get A/B test results for admin dashboard
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const testName = searchParams.get("name");

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let query = supabase
      .from("ab_tests")
      .select("*")
      .eq("user_id", user.id);

    if (testName) {
      query = query.eq("name", testName);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("AB test fetch error:", error);
      return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }

    return NextResponse.json({ tests: data });
  } catch (error) {
    console.error("AB test GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
