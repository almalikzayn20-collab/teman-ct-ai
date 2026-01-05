import { Worker } from "bullmq";
import { redis } from "./redis";
import { renderVideoFromScenes } from "@/lib/video/render";

// ==============================
// Helper: check cancel flag
// ==============================
async function isJobCancelled(jobId) {
  return (await redis.get(`video:cancel:${jobId}`)) === "1";
}

// ==============================
// Helper: cleanup redis keys
// ==============================
async function cleanupRedis(jobId) {
  await redis.del(
    `video:cancel:${jobId}`,
    `video:progress:${jobId}`
  );
}

// ==============================
// VIDEO RENDER WORKER (SINGLE INSTANCE)
// ==============================
new Worker(
  "video-render",
  async (job) => {
    const { title, scenes, engine } = job.data;
    const jobId = job.id;

    // ⛔ CANCEL BEFORE START
    if (await isJobCancelled(jobId)) {
      return { status: "cancelled" };
    }

    try {
      const videoUrl = await renderVideoFromScenes({
        title,
        scenes,
        engine,

        // 🔄 Progress callback (STREAM KE REDIS + UI)
        onProgress: async (progress, status) => {
          // ⛔ CANCEL DURING RENDER
          if (await isJobCancelled(jobId)) {
            throw new Error("JOB_CANCELLED");
          }

          await job.updateProgress({
            progress,
            status,
          });
        },
      });

      return {
        status: "completed",
        videoUrl,
      };
    } catch (err) {
      // ==========================
      // HANDLE CANCEL (NORMAL FLOW)
      // ==========================
      if (err.message === "JOB_CANCELLED") {
        await job.updateProgress({
          progress: 0,
          status: "Render cancelled",
        });

        return { status: "cancelled" };
      }

      // ==========================
      // REAL ERROR
      // ==========================
      console.error("❌ Video worker error:", err);
      throw err;
    } finally {
      // 🧹 CLEANUP REDIS FLAGS (WAJIB)
      await cleanupRedis(jobId);
    }
  },
  {
    connection: redis,

    // 🔁 Retry policy (AMAN)
    attempts: 2,
    backoff: {
      type: "exponential",
      delay: 5000,
    },

    // 🧹 Auto cleanup BullMQ data
    removeOnComplete: {
      age: 3600, // 1 jam
    },
    removeOnFail: {
      age: 86400, // 1 hari
    },
  }
);

console.log(
  "🎬 Video Worker running (cancel + retry + cleanup enabled)"
);
