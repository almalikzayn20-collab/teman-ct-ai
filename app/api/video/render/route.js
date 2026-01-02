import { NextResponse } from "next/server";

/**
 * MOCK VIDEO RENDER API
 * - No Redis
 * - No Queue
 * - No Billing
 * - No API Key
 * - Safe for Vercel
 */

export async function POST(req) {
  try {
    // ============================
    // BODY PARSE
    // ============================
    const body = await req.json();
    const { title, scenes, engine = "ffmpeg" } = body;

    // ============================
    // BASIC VALIDATION
    // ============================
    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(scenes) || scenes.length === 0) {
      return NextResponse.json(
        { error: "Scenes must be a non-empty array" },
        { status: 400 }
      );
    }

    if (scenes.length > 20) {
      return NextResponse.json(
        { error: "Too many scenes (max 20)" },
        { status: 400 }
      );
    }

    // ============================
    // MOCK RESPONSE (NO QUEUE)
    // ============================
    return NextResponse.json({
      success: true,
      jobId: "mock-" + Date.now(),
      engine,
      title,
      scenesCount: scenes.length,
      status: "queued",
      note: "Mock render job (no AI engine yet)",
    });
  } catch (err) {
    console.error("❌ /api/video/render error:", err);

    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 500 }
    );
  }
}
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/video/render",
    method: "POST",
    note: "Use POST with JSON body to render video",
  });
}
