import { generateScenes, generateImage } from "@/lib/ai/gemini";

export default async function ctGenerateAgent(payload) {
  const prompt = payload?.prompt || "";
  const scenePrompt = payload?.scenePrompt;

  // =============================
  // A. GENERATE FULL SCENES
  // =============================
  if (!scenePrompt) {
    const aiResult = await generateScenes(prompt);

    return {
      title: aiResult.title,
      scenes: aiResult.scenes.map((s, i) => ({
        scene: i + 1,
        prompt: s.prompt,
        duration: s.duration || "5s",
        image_url: `/placeholder/scene${i + 1}.png`,
      })),
    };
  }

  // =============================
  // B. REGENERATE SINGLE IMAGE
  // =============================
  const imageUrl = await generateImage(scenePrompt);

  return {
    image_url: imageUrl,
  };
}
