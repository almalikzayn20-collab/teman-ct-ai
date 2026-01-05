import fs from "fs";
import path from "path";

const PIKA_API = "https://api.pika.art/v1";
const API_KEY = process.env.PIKA_API_KEY;
const MODEL = process.env.PIKA_MODEL || "pika-1.0";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// =================================================
// PIKA IMAGE → VIDEO (1 SCENE)
// =================================================
export async function renderPikaVideo({
  scenes,
  abortSignal,
  onProgress,
}) {
  if (!API_KEY) {
    throw new Error("PIKA_API_KEY_MISSING");
  }

  const scene = scenes[0]; // 1 job = 1 scene

  if (!scene.image) {
    throw new Error("PIKA_IMAGE_REQUIRED");
  }

  // ==============================
  // 1️⃣ CREATE GENERATION
  // ==============================
  onProgress?.(5, "Submitting Pika job...");

  const res = await fetch(`${PIKA_API}/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    signal: abortSignal,
    body: JSON.stringify({
      model: MODEL,
      prompt: scene.prompt,
      image_url: scene.image,
      duration: Number(scene.duration?.replace("s", "") || 5),
      aspect_ratio: "16:9",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PIKA_CREATE_FAILED: ${err}`);
  }

  const job = await res.json();
  const jobId = job.id;

  // ==============================
  // 2️⃣ POLLING STATUS
  // ==============================
  let status = "queued";
  let outputUrl = null;

  while (status !== "completed") {
    if (abortSignal?.aborted) {
      throw new Error("JOB_CANCELLED");
    }

    await sleep(2000);

    const poll = await fetch(`${PIKA_API}/generations/${jobId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!poll.ok) {
      throw new Error("PIKA_POLL_FAILED");
    }

    const data = await poll.json();
    status = data.status;

    if (status === "failed") {
      throw new Error("PIKA_JOB_FAILED");
    }

    if (status === "completed") {
      outputUrl = data.output?.video_url;
      break;
    }

    onProgress?.(30, `Pika rendering (${status})...`);
  }

  if (!outputUrl) {
    throw new Error("PIKA_NO_OUTPUT");
  }

  // ==============================
  // 3️⃣ DOWNLOAD VIDEO
  // ==============================
  onProgress?.(60, "Downloading video...");

  const videoRes = await fetch(outputUrl);
  const buffer = Buffer.from(await videoRes.arrayBuffer());

  const fileName = `pika-${Date.now()}.mp4`;
  const outputPath = path.join(
    process.cwd(),
    "public",
    "renders",
    fileName
  );

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buffer);

  onProgress?.(100, "Pika render complete");

  // PUBLIC URL
  return `/renders/${fileName}`;
}
if (res.status === 429) {
  throw new Error("RATE_LIMIT_429");
}
