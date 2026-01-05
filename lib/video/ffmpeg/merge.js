import fs from "fs";
import path from "path";
import { runFFmpeg } from "../ffmpeg";

export async function mergeVideos({
  videoPaths,
  outputPath,
  abortSignal,
  onProgress,
}) {
  const listFile = outputPath.replace(".mp4", ".txt");

  // buat concat list
  fs.writeFileSync(
    listFile,
    videoPaths.map((p) => `file '${p}'`).join("\n")
  );

  onProgress?.(90, "Merging scenes...");

  await runFFmpeg({
    args: [
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      listFile,
      "-c",
      "copy",
      outputPath,
    ],
    abortSignal,
  });

  onProgress?.(100, "Final video ready");
}
