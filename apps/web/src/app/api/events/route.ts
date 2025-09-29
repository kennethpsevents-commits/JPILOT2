import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface EventRequest {
  eventType: string;
  metadata?: any;
}

export async function POST(req: Request) {
  try {
    const { eventType, metadata }: EventRequest = await req.json();

    if (!eventType) {
      return NextResponse.json({ error: "Missing event type" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Add timestamp and user context to metadata
    const enrichedMetadata = {
      ...metadata,
      timestamp: new Date().toISOString(),
      user_agent: req.headers.get('user-agent'),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
    };

    const { error } = await supabase.from("user_events").insert({
      user_id: user.id,
      event_type: eventType,
      metadata: enrichedMetadata
    });

    if (error) {
      console.error("Event insert error:", error);
      return NextResponse.json({ error: "Failed to insert event" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Event API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET endpoint for fetching user events (for dashboard)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const eventType = searchParams.get('event_type');

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let query = supabase
      .from("user_events")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (eventType) {
      query = query.eq("event_type", eventType);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Event fetch error:", error);
      return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }

    return NextResponse.json({ events: data });
  } catch (err) {
    console.error("Event GET API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
