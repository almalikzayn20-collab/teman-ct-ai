"use client";

import { useState } from "react";

export default function ImageToVideoPage() {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  async function handleRender() {
    setLoading(true);
    setVideoUrl(null);

    await new Promise((r) => setTimeout(r, 2000));

    setVideoUrl("/demo/demo-video.mp4");
    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-bold">Image → Video</h1>

      <button
        onClick={handleRender}
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-emerald-600 text-white disabled:opacity-50"
      >
        {loading ? "Rendering..." : "🎥 Render Video"}
      </button>

      {videoUrl && (
        <video
          src={videoUrl}
          controls
          className="w-full rounded-xl border mt-4"
        />
      )}
    </div>
  );
}
