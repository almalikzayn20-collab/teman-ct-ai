import fs from "fs";
import path from "path";

const RUNWAY_API = "https://api.runwayml.com/v1";
const API_KEY = process.env.RUNWAY_API_KEY;
const MODEL = process.env.RUNWAY_MODEL || "gen-2";

// ==============================
// HELPER: sleep
// ==============================
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ==============================
// RUNWAY IMAGE → VIDEO
// ==============================
export async function renderRunwayVideo({
  scenes,
  abortSignal,
  onProgress,
}) {
  if (!API_KEY) {
    throw new Error("RUNWAY_API_KEY_MISSING");
  }

  const scene = scenes[0]; // runway 1 job = 1 scene

  if (!scene.image) {
    throw new Error("RUNWAY_IMAGE_REQUIRED");
  }

  // ==============================
  // 1️⃣ CREATE JOB
  // ==============================
  onProgress?.(5, "Submitting Runway job...");

  const res = await fetch(`${RUNWAY_API}/image_to_video`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    signal: abortSignal,
    body: JSON.stringify({
      model: MODEL,
      image_url: scene.image,
      prompt: scene.prompt,
      duration: Number(scene.duration?.replace("s", "") || 5),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`RUNWAY_CREATE_FAILED: ${err}`);
  }

  const job = await res.json();
  const jobId = job.id;

  // ==============================
  // 2️⃣ POLL STATUS
  // ==============================
  let status = "pending";
  let outputUrl = null;

  while (status !== "completed") {
    if (abortSignal?.aborted) {
      throw new Error("JOB_CANCELLED");
    }

    await sleep(2000);

    const poll = await fetch(`${RUNWAY_API}/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!poll.ok) {
      throw new Error("RUNWAY_POLL_FAILED");
    }

    const data = await poll.json();
    status = data.status;

    if (status === "failed") {
      throw new Error("RUNWAY_JOB_FAILED");
    }

    if (status === "completed") {
      outputUrl = data.output?.video;
      break;
    }

    onProgress?.(30, `Runway rendering (${status})...`);
  }

  if (!outputUrl) {
    throw new Error("RUNWAY_NO_OUTPUT");
  }

  // ==============================
  // 3️⃣ DOWNLOAD VIDEO
  // ==============================
  onProgress?.(60, "Downloading video...");

  const videoRes = await fetch(outputUrl);
  const buffer = Buffer.from(await videoRes.arrayBuffer());

  const fileName = `runway-${Date.now()}.mp4`;
  const outputPath = path.join(
    process.cwd(),
    "public",
    "renders",
    fileName
  );

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buffer);

  onProgress?.(100, "Runway render complete");

  // PUBLIC URL
  return `/renders/${fileName}`;
}
if (res.status === 429) {
  throw new Error("RATE_LIMIT_429");
}
