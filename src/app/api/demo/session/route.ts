import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const sessionId = `sess_${crypto.randomUUID()}`;
    
    return NextResponse.json({
      session_id: sessionId,
      created_at: new Date().toISOString(),
      demo_mode: true,
      available_scenarios: ["genuine", "replay", "deepfake_like", "poor_lighting", "high_motion"],
      available_challenges: ["head_turn", "blink", "mixed"]
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to initialize session" }, { status: 500 });
  }
}
