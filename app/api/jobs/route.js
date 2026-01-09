import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("video_jobs")
      .insert([{ prompt }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ job: data });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
