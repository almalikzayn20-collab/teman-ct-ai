// lib/ai/tts.js
import fs from "fs";
import fetch from "node-fetch";

export async function generateVoice(text) {
  const API_KEY = process.env.TTS_API_KEY;
  if (!API_KEY) throw new Error("Missing TTS_API_KEY");
  // contoh stub: panggil provider TTS -> return URL atau base64
  // return { url: "https://..." }
  return { url: "https://example.com/audio.mp3" };
}
