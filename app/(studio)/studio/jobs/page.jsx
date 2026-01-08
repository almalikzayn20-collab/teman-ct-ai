"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  // ============================
  // LOAD JOBS (SAFE)
  // ============================
  function loadJobs() {
    let stored = [];

    try {
      stored = JSON.parse(localStorage.getItem("video_jobs")) || [];
    } catch {
      stored = [];
    }

    // MOCK STATUS UPDATE (AUTO PROGRESS)
    const updated = stored.map((job) => {
      if (job.status === "queued") {
        return { ...job, status: "processing" };
      }
      if (job.status === "processing") {
        return { ...job, status: "completed" };
      }
      return job;
    });

    localStorage.setItem("video_jobs", JSON.stringify(updated));
    setJobs(updated);
  }

  // ============================
  // POLLING (NO SPINNER)
  // ============================
  useEffect(() => {
    loadJobs(); // first load

    const interval = setInterval(loadJobs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">📂 Render Jobs</h1>
        <p className="text-gray-500 text-sm">
          Auto-updating every 5 seconds
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Scenes</th>
              <th className="text-left p-3">Engine</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {jobs.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500"
                >
                  No render jobs yet
                </td>
              </tr>
            )}

            {jobs.map((job) => (
              <tr
                key={job.jobId}
                onClick={() =>
                  router.push(`/studio/jobs/${job.jobId}`)
                }
                className="border-t hover:bg-gray-50 cursor-pointer transition"
              >
                <td className="p-3 font-medium">
                  {job.title}
                </td>
                <td className="p-3">
                  {job.scenesCount}
                </td>
                <td className="p-3">
                  {job.engine}
                </td>
                <td className="p-3">
                  <StatusBadge status={job.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================
// STATUS BADGE
// ============================
function StatusBadge({ status }) {
  const styles = {
    queued: "bg-gray-200 text-gray-700",
    processing: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        styles[status] || styles.queued
      }`}
    >
      {status}
    </span>
  );
}
