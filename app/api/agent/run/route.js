import { NextResponse } from "next/server";

import imageToVideoAgent from "@/lib/agents/imageToVideo.agent";
import textToVideoAgent from "@/lib/agents/textToVideo.agent"; // nanti
// import storyboardAgent from "@/lib/agents/storyboard.agent"; // future

export async function POST(req) {
  try {
    const body = await req.json();
    const { agent, payload } = body;

    if (!agent) {
      return NextResponse.json(
        { error: "Agent not specified" },
        { status: 400 }
      );
    }

    // 🔀 ROUTER AGENT
    if (agent === "image-to-video") {
      const result = await imageToVideoAgent(payload);
      return NextResponse.json(result);
    }

    if (agent === "text-to-video") {
      const result = await textToVideoAgent(payload);
      return NextResponse.json(result);
    }

    return NextResponse.json(
      { error: "Unknown agent" },
      { status: 400 }
    );
  } catch (err) {
    console.error("AGENT ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
