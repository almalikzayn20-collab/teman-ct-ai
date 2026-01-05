import path from "path";
import fs from "fs";

import { buildFFmpegTimeline } from "./timeline";
import { runFFmpeg } from "./ffmpeg";
import { renderAIVideo } from "./ai";
import { mergeVideos } from "./ffmpeg/merge";

// ==============================
// Helper: should fallback?
// ==============================
function shouldFallbackToFFmpeg(err) {
  const fallbackErrors = [
    "AI_TIMEOUT",
    "AI_SCENE_LIMIT_EXCEEDED",
    "AI_DURATION_LIMIT_EXCEEDED",
    "RUNWAY_ERROR",
    "PIKA_ERROR",
  ];

  return fallbackErrors.includes(err.message);
}

// =====================================================
// MAIN VIDEO RENDERER (AI + FALLBACK)
// =====================================================
export async function renderVideoFromScenes({
  title,
  scenes,
  engine = "ffmpeg",
  abortSignal,
  onProgress,
}) {
  // =================================================
  // AI PIPELINE (RUNWAY / PIKA)
  // =================================================
  if (engine === "runway" || engine === "pika") {
    try {
      const workDir = path.join(
        process.cwd(),
        "public",
        "renders",
        Date.now().toString()
      );

      fs.mkdirSync(workDir, { recursive: true });

      const sceneVideos = [];

      for (let i = 0; i < scenes.length; i++) {
        if (abortSignal?.aborted) {
          throw new Error("JOB_CANCELLED");
        }

        onProgress?.(
          Math.floor((i / scenes.length) * 70),
          `AI rendering scene ${i + 1}/${scenes.length}`
        );

        const videoUrl = await renderAIVideo({
          provider: engine,
          scenes: [scenes[i]],
          abortSignal,
        });

        sceneVideos.push(
          path.join(process.cwd(), "public", videoUrl)
        );
      }

      onProgress?.(80, "Merging AI scenes...");

      const finalPath = path.join(workDir, "final.mp4");

      await mergeVideos({
        videoPaths: sceneVideos,
        outputPath: finalPath,
        abortSignal,
      });

      onProgress?.(100, "Render complete");

      return finalPath.replace(
        path.join(process.cwd(), "public"),
        ""
      );
    } catch (err) {
      // ⛔ CANCEL = STOP TOTAL
      if (err.message === "JOB_CANCELLED") {
        throw err;
      }

      // 🔁 FALLBACK
      if (shouldFallbackToFFmpeg(err)) {
        console.warn(
          "⚠️ AI failed, fallback to FFmpeg:",
          err.message
        );

        onProgress?.(0, "AI failed, switching to FFmpeg...");
        engine = "ffmpeg";
      } else {
        throw err;
      }
    }
  }

  // =================================================
  // FFmpeg PIPELINE (DEFAULT / FALLBACK)
  // =================================================
  const workDir = path.join(
    process.cwd(),
    "public",
    "renders",
    Date.now().toString()
  );

  fs.mkdirSync(workDir, { recursive: true });

  onProgress?.(5, "Preparing FFmpeg timeline...");

  const timelinePath = buildFFmpegTimeline(scenes, workDir);
  const outputPath = path.join(workDir, "final.mp4");

  await runFFmpeg({
    args: [
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      timelinePath,
      "-pix_fmt",
      "yuv420p",
      outputPath,
    ],
    abortSignal,
    onProgress,
  });

  onProgress?.(100, "Render complete");

  return outputPath.replace(
    path.join(process.cwd(), "public"),
    ""
  );
}
