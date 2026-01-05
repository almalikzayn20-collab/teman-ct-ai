"use client";

import { useState } from "react";

// ================================
// SSE LISTENER (STEP N)
// ================================
function listenProgress(jobId, onMessage) {
  const es = new EventSource(`/api/video/progress?jobId=${jobId}`);

  es.onmessage = (e) => {
    const data = JSON.parse(e.data);
    onMessage(data);

    if (data.type === "completed" || data.type === "error") {
      es.close();
    }
  };

  return () => es.close();
}

export default function CTGeneratePage() {
  const [idea, setIdea] = useState("");
  const [title, setTitle] = useState("");
  const [scenes, setScenes] = useState([]);
  const [engine, setEngine] = useState("ffmpeg");

  const [loading, setLoading] = useState(false);
  const [rendering, setRendering] = useState(false);

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  // ================================
  // STEP K — GENERATE SCENES
  // ================================
  async function handleGenerate() {
    if (!idea.trim()) return;

    setLoading(true);
    setScenes([]);
    setTitle("");
    setVideoUrl("");
    setError("");

    try {
      const res = await fetch("/api/agent/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent: "ct-generate",
          payload: { prompt: idea },
        }),
      });

      const data = await res.json();

      setTitle(data.title || "Untitled Project");
      setScenes(
        (data.scenes || []).map((s, i) => ({
          id: i + 1,
          prompt: s.prompt,
          duration: s.duration || "5s",
          image: s.image_url,
        }))
      );
    } catch (e) {
      console.error(e);
      setError("Failed to generate scenes");
    } finally {
      setLoading(false);
    }
  }

  // ================================
  // STEP N — RENDER VIDEO (JOB + SSE)
  // ================================
  async function startRender() {
    if (!scenes.length) return;

    setRendering(true);
    setProgress(0);
    setStatus("Starting render...");
    setVideoUrl("");

    const res = await fetch("/api/video/render", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        scenes,
        engine,
      }),
    });

    const { jobId } = await res.json();

    listenProgress(jobId, (data) => {
      if (data.type === "progress") {
        setProgress(data.progress ?? 0);
        setStatus(data.status ?? "");
      }

      if (data.type === "completed") {
        setVideoUrl(data.videoUrl);
        setRendering(false);
        setStatus("DONE ✅");
      }

      if (data.type === "error") {
        setRendering(false);
        setStatus("ERROR ❌");
      }
    });
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">CT Generate</h1>

      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Describe your cinematic idea..."
        className="w-full h-32 p-4 rounded bg-neutral-800"
      />

      <div className="flex gap-3 items-center">
        <select
          value={engine}
          onChange={(e) => setEngine(e.target.value)}
          className="bg-neutral-800 border rounded px-3 py-2"
        >
          <option value="ffmpeg">FFmpeg</option>
          <option value="runway">Runway</option>
          <option value="pika">Pika</option>
        </select>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          {loading ? "Generating..." : "Generate Scenes"}
        </button>

        {scenes.length > 0 && (
          <button
            onClick={startRender}
            className="bg-emerald-600 px-4 py-2 rounded"
          >
            Render Video
          </button>
        )}
      </div>

      {rendering && (
        <div className="space-y-2">
          <div className="w-full bg-neutral-800 h-3 rounded">
            <div
              className="bg-purple-600 h-3 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs">{status}</p>
        </div>
      )}

      {videoUrl && (
        <video
          src={videoUrl}
          controls
          className="w-full rounded border"
        />
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
