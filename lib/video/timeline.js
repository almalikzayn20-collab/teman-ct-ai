import fs from "fs";
import path from "path";

export function buildFFmpegTimeline(scenes, workDir) {
  const timelinePath = path.join(workDir, "timeline.txt");

  const content = scenes
    .map((scene) => {
      const duration = parseFloat(scene.duration) || 3;
      return `file '${scene.image}'
duration ${duration}`;
    })
    .join("\n");

  fs.writeFileSync(timelinePath, content);

  return timelinePath;
}
