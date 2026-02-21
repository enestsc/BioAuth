import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: process.env.NEXT_PUBLIC_APP_NAME || "BioAuth",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
}
