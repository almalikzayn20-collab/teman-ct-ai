"use client";

import { useState, useEffect } from "react";

export default function JobsPage() {
  const [prompt, setPrompt] = useState("");
  const [jobs, setJobs] = useState([]);

  async function createJob() {
    if (!prompt) return;

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    if (data.job) {
      setJobs(prev => [data.job, ...prev]);
      setPrompt("");
    }
  }

  async function loadJobs() {
    const res = await fetch("/api/jobs/list");
    const data = await res.json();
    setJobs(data.jobs || []);
  }

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Video Jobs</h1>

      <input
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Prompt video..."
      />

      <button onClick={createJob}>Generate</button>

      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            [{job.status}] {job.prompt}
          </li>
        ))}
      </ul>
    </div>
  );
}
