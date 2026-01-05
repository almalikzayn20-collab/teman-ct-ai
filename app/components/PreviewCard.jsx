"use client";
import { useState } from "react";
import SceneCard from "./SceneCard";

export default function PreviewCard({ data }) {
  const [scenes, setScenes] = useState(data.scenes);

  function updateScene(sceneNumber, newPrompt) {
    setScenes((prev) =>
      prev.map((s) =>
        s.scene === sceneNumber
          ? { ...s, prompt: newPrompt }
          : s
      )
    );
  }

  return (
    <div className="bg-[#121826] p-6 rounded-2xl space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <p className="text-sm text-neutral-400">
          Style: {data.style} · Ratio: {data.ratio}
        </p>
      </div>

      {/* VIDEO PREVIEW */}
      <div className="w-full h-64 rounded-xl bg-black flex items-center justify-center text-neutral-500">
        🎬 Video Preview (placeholder)
      </div>

      {/* SCENES */}
      <div className="space-y-4">
        {scenes.map((scene) => (
          <SceneCard
            key={scene.scene}
            scene={scene}
            onUpdate={updateScene}
          />
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button className="flex-1 bg-green-500 text-black py-3 rounded-xl font-bold">
          ▶ Render Video
        </button>
        <button className="flex-1 bg-neutral-800 py-3 rounded-xl font-bold">
          🧠 Re-run Agent
        </button>
      </div>
    </div>
  );
}
