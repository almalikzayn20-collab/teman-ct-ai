import fs from "fs";
import path from "path";
import { getJob, updateJob, removeJob } from "@/lib/video/ai/jobStore";
import { concatVideos } from "@/lib/video/ai/concat";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("job");

  const payload = await req.json();
  const job = getJob(jobId);

  if (!job) {
    return new Response("Unknown job", { status: 404 });
  }

  // ==========================
  // DOWNLOAD VIDEO
  // ==========================
  const videoRes = await fetch(payload.output.video);
  const buffer = Buffer.from(await videoRes.arrayBuffer());

  const sceneIndex = job.current + 1;
  const outPath = path.join(
    job.workDir,
    `scene-${sceneIndex}.mp4`
  );

  fs.writeFileSync(outPath, buffer);
  job.files.push(outPath);

  job.current++;

  // ==========================
  // NEXT OR CONCAT
  // ==========================
  if (job.current < job.scenes.length) {
    const { startScene } = await import("@/lib/video/ai/runway");
    await startScene(jobId);
  } else {
    job.onProgress?.({
      progress: 90,
      status: "Concatenating final video",
    });

    const finalPath = await concatVideos(
      job.files,
      job.workDir
    );

    job.onProgress?.({
      progress: 100,
      status: "Done",
      video_url: finalPath.replace(
        path.join(process.cwd(), "public"),
        ""
      ),
    });

    removeJob(jobId);
  }

  return new Response("OK");
}
