"use client";

import { useEffect, useState } from "react";

export default function JobsPage() {
  const [prompt, setPrompt] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================
  // CREATE JOB
  // =========================
  async function createJob() {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const text = await res.text();
      if (!text) {
        throw new Error("Empty response from API");
      }

      const data = JSON.parse(text);

      if (data.job) {
        setJobs(prev => [data.job, ...prev]);
        setPrompt("");
      } else {
        throw new Error("Job not returned from API");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // LOAD JOBS
  // =========================
  async function loadJobs() {
    try {
      const res = await fetch("/api/jobs/list");
      const text = await res.text();
      if (!text) return;

      const data = JSON.parse(text);
      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Load jobs error:", err);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 700 }}>
      <h1>🎬 Video Jobs</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Masukkan prompt video..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={createJob} disabled={loading}>
          {loading ? "Processing..." : "Generate"}
        </button>
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: 12 }}>
          ❌ {error}
        </div>
      )}

      <ul>
        {jobs.map(job => (
          <li key={job.id} style={{ marginBottom: 8 }}>
            <strong>[{job.status}]</strong> {job.prompt}
            {job.progress !== null && (
              <span> — {job.progress}%</span>
            )}
          </li>
        ))}
      </ul>

      {jobs.length === 0 && (
        <p style={{ opacity: 0.6 }}>Belum ada job</p>
      )}
    </div>
  );
}
