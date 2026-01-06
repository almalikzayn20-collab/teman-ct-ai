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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          scenes: parsedScenes,
          engine: "ffmpeg",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Render failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">🎬 Video Generator</h1>

      {/* TITLE */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Video Title
        </label>
        <input
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My AI Video"
        />
      </div>

      {/* SCENES */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Scenes (JSON)
        </label>
        <textarea
          className="w-full border rounded p-2 font-mono text-sm"
          rows={8}
          value={scenes}
          onChange={(e) => setScenes(e.target.value)}
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {loading ? "Rendering..." : "Render Video"}
      </button>

      {/* ERROR */}
      {error && (
        <div className="mt-4 text-red-600 text-sm">
          ❌ {error}
        </div>
      )}

      {/* RESULT */}
      {result && (
        <pre className="mt-4 bg-gray-100 p-3 rounded text-sm overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
