import path from "path";
import fs from "fs";
import { runFFmpeg } from "../ffmpeg";

export async function concatVideos(videos, workDir) {
  const listPath = path.join(workDir, "list.txt");

  fs.writeFileSync(
    listPath,
    videos.map((v) => `file '${v}'`).join("\n")
  );

  const outputPath = path.join(workDir, "final.mp4");

  await runFFmpeg({
    args: [
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      listPath,
      "-c",
      "copy",
      outputPath,
    ],
  });

  return outputPath;
}
