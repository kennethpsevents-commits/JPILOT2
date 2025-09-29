import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface SnapshotRequest {
  sessionId: string;
  snapshot: any; // session state
}

export async function POST(req: Request) {
  try {
    const { sessionId, snapshot }: SnapshotRequest = await req.json();

    if (!sessionId || !snapshot) {
      return NextResponse.json(
        { error: "Session ID and snapshot required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Calculate score and label
    const { score, label } = calculateScore(snapshot);

    const { error } = await supabase.from("ai_snapshots").insert({
      session_id: sessionId,
      user_id: user.id,
      snapshot,
      score,
      label
    });

    if (error) {
      console.error("Snapshot insert error:", error);
      return NextResponse.json(
        { error: "Failed to insert snapshot" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, score, label });
  } catch (error) {
    console.error("Snapshot API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function calculateScore(snapshot: any): { score: number; label: string } {
  let score = 0;

  // Weighted criteria (total possible: 100 points)
  
  // Job Match Quality (40 points max)
  if (snapshot.jobMatch) {
    score += Math.min(snapshot.jobMatch * 0.4, 40);
  }

  // User Engagement (20 points max)
  if (snapshot.engagement) {
    score += Math.min(snapshot.engagement * 0.2, 20);
  }

  // AI Confidence (20 points max)
  if (snapshot.aiConfidence) {
    score += Math.min(snapshot.aiConfidence * 0.2, 20);
  }

  // Conversion Intent (20 points max)
  if (snapshot.conversionIntent) {
    score += Math.min(snapshot.conversionIntent * 0.2, 20);
  }

  // Additional scoring factors
  if (snapshot.messageCount && snapshot.messageCount > 5) {
    score += 5; // Bonus for longer conversations
  }

  if (snapshot.questionsAnswered && snapshot.questionsAnswered > 3) {
    score += 5; // Bonus for completing onboarding
  }

  if (snapshot.jobApplications && snapshot.jobApplications > 0) {
    score += 10; // Bonus for taking action
  }

  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, Math.round(score)));

  // Determine label based on score
  let label = "dropout";
  if (score >= 70) {
    label = "qualified";
  } else if (score >= 40) {
    label = "needs_followup";
  }

  return { score, label };
}
