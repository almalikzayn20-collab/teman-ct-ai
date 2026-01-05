export async function renderPikaVideo({ scenes }) {
  console.log("🎥 Pika AI rendering", scenes.length, "scenes");

  await new Promise((r) => setTimeout(r, 4000));

  return "/demo/demo-video.mp4";
}
