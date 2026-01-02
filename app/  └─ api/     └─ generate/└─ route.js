import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { prompt } = body;

  return NextResponse.json({
    success: true,
    input: prompt,
    result: "API Teman CT AI sudah aktif 🚀"
  });
}
