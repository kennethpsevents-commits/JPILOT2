import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface FunnelEventRequest {
  stage: string;
  sessionId?: string;
  stepOrder?: number;
  metadata?: any;
}

export async function POST(req: Request) {
  try {
    const { stage, sessionId, stepOrder, metadata }: FunnelEventRequest = await req.json();

    if (!stage) {
      return NextResponse.json(
        { error: "Stage is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase.from("funnel_events").insert({
      user_id: user.id,
      session_id: sessionId || null,
      stage,
      step_order: stepOrder || 0,
      metadata: metadata || null
    });

    if (error) {
      console.error("Funnel event insert error:", error);
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Funnel API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get funnel analytics for admin dashboard
export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get funnel events for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data, error } = await supabase
      .from("funnel_events")
      .select("*")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Funnel fetch error:", error);
      return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }

    // Calculate funnel metrics
    const stageCounts = data.reduce((acc, event) => {
      acc[event.stage] = (acc[event.stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const conversionRate = data.length > 0 
      ? ((stageCounts['upgrade_completed'] || 0) / (stageCounts['pricing_view'] || 1)) * 100
      : 0;

    return NextResponse.json({
      events: data,
      metrics: {
        stageCounts,
        conversionRate: Math.round(conversionRate * 100) / 100,
        totalEvents: data.length
      }
    });
  } catch (error) {
    console.error("Funnel GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
