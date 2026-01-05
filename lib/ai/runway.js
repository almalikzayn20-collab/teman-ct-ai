export async function renderRunwayVideo({ scenes }) {
  // 🔥 REAL FLOW (NANTI)
  // 1. Upload image
  // 2. Submit motion prompt
  // 3. Poll job status
  // 4. Get video URL

  console.log("🎬 Runway AI rendering", scenes.length, "scenes");

  // dummy dulu
  await new Promise((r) => setTimeout(r, 4000));

  return "/demo/demo-video.mp4";
}
