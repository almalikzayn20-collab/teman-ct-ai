import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

/**
 * MOCK VIDEO RENDER API (WITH DB)
 */

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, scenes, engine = "ffmpeg" } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(scenes) || scenes.length === 0) {
      return NextResponse.json(
        { error: "Scenes invalid" },
        { status: 400 }
      );
    }

    // ============================
    // INSERT JOB TO SUPABASE
    // ============================
    const { data, error } = await supabase
      .from("video_jobs")
      .insert({
        title,
        scenes,
        engine,
        status: "queued",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      jobId: data.id,
      status: data.status,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/video/render",
  });
}
