import { spawn } from "child_process";

export function runFFmpeg({ args, onProgress, abortSignal }) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", args);

    // 🔥 ABORT SUPPORT
    abortSignal?.addEventListener("abort", () => {
      ffmpeg.kill("SIGKILL");
      reject(new Error("Render aborted"));
    });

    ffmpeg.stderr.on("data", (data) => {
      const msg = data.toString();

      // contoh parsing progress (optional)
      if (onProgress && msg.includes("frame=")) {
        onProgress(msg);
      }
    });

    ffmpeg.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error("FFmpeg failed"));
    });
  });
}
