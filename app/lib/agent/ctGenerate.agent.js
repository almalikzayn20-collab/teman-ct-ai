import { renderVideoFromScenes } from "@/lib/video/render";

export default async function imageToVideoAgent(payload) {
  const { images, title } = payload;

  // dummy scenes (nanti dari AI)
  const scenes = images.map((img, i) => ({
    id: i + 1,
    image: img,
    duration: 3,
  }));

  const videoUrl = await renderVideoFromScenes({
    title: title || "Image To Video",
    scenes,
  });

  return {
    success: true,
    videoUrl,
  };
}
