"use client";

import { useState } from "react";

export default function VideoToolPage() {
  const [title, setTitle] = useState("");
  const [scenes, setScenes] = useState(
    JSON.stringify(
      [
        {
          prompt: "Cinematic sunrise over mountains",
          duration: "5s",
        },
      ],
      null,
      2
    )
  );

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError(null);
    setResult(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    let parsedScenes;
    try {
      parsedScenes = JSON.parse(scenes);
    } catch {
      setError("Scenes JSON is invalid");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/video/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          scenes: parsedScenes,
          engine: "ffmpeg",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Render failed");

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">🎬 Video Generator</h1>
        <p className="text-gray-500 text-sm">
          Generate mock video render jobs using JSON scenes
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white border rounded-xl p-6 space-y-5 shadow-sm">
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Video Title
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My AI Video"
          />
        </div>

        {/* SCENES */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Scenes (JSON)
          </label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black"
            rows={9}
            value={scenes}
            onChange={(e) => setScenes(e.target.value)}
          />
        </div>

        {/* ACTION */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white px-5 py-2 rounded-lg text-sm disabled:opacity-60"
          >
            {loading ? "Rendering..." : "Render Video"}
          </button>

          {loading && (
            <span className="text-sm text-gray-500">
              Sending request…
            </span>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-lg p-3">
            ❌ {error}
          </div>
        )}
      </div>

      {/* RESULT CARD */}
      {result && (
        <div className="bg-gray-900 text-green-200 rounded-xl p-5 text-sm overflow-auto">
          <div className="mb-2 text-gray-400">Render Result</div>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
