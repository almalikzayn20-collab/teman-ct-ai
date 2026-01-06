"use client";

import { useEffect, useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("video_jobs");
    if (stored) {
      setJobs(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">📂 Render Jobs</h1>
        <p className="text-gray-500 text-sm">
          List of all video render requests
        </p>
      </div>

      {/* EMPTY STATE */}
      {jobs.length === 0 && (
        <div className="border rounded-xl p-8 text-center text-gray-500">
          No render jobs yet.
        </div>
      )}

      {/* JOB LIST */}
      {jobs.length > 0 && (
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3">Job ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Scenes</th>
                <th className="px-4 py-3">Engine</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.jobId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-mono">
                    {job.jobId}
                  </td>
                  <td className="px-4 py-3">{job.title}</td>
                  <td className="px-4 py-3">
                    {job.scenesCount}
                  </td>
                  <td className="px-4 py-3">{job.engine}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(job.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
