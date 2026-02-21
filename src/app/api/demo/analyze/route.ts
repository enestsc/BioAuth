import { NextResponse } from "next/server";
import { simulateAnalysis, Scenario, ChallengeType } from "@/lib/server/demo-simulation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { session_id, scenario, challenge_type } = body;

    if (!session_id || !scenario || !challenge_type) {
      return NextResponse.json(
        { error: "Missing required fields (session_id, scenario, challenge_type)" },
        { status: 400 }
      );
    }

    const t0 = performance.now();
    
    // Call the serverless simulation logic
    const analysis = await simulateAnalysis(scenario as Scenario, challenge_type as ChallengeType);
    
    const t1 = performance.now();
    const processing_ms = Math.round(t1 - t0);

    return NextResponse.json({
      ...analysis,
      processing_ms,
      analysis_id: `ana_${crypto.randomUUID()}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process analysis" },
      { status: 500 }
    );
  }
}
