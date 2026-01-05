import { renderVideoFromScenes } from "@/lib/video/render";

export async function run({ payload }) {
  const { title, scenes } = payload;

  if (!scenes || !scenes.length) {
    throw new Error("No scenes provided");
  }

  const video = await renderVideoFromScenes({
    title,
    scenes,
  });

  return {
    video_url: video,
  };
}
