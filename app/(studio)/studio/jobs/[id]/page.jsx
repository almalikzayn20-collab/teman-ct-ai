"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("video_jobs")) || [];
    const found = stored.find((j) => String(j.jobId) === String(id));

    if (!found) {
      router.push("/studio/jobs");
      return;
    }

    setJob(found);
  }, [id, router]);

  if (!job) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">🎬 Job Detail</h1>
          <p className="text-sm text-gray-500">Job ID: {job.jobId}</p>
        </div>

        <button
          onClick={() => router.back()}
          className="text-sm border rounded px-3 py-1 hover:bg-gray-100"
        >
          ← Back
        </button>
      </div>

      {/* SUMMARY */}
      <div className="bg-white border rounded-xl p-5 space-y-3">
        <Row label="Title" value={job.title} />
        <Row label="Engine" value={job.engine} />
        <Row label="Scenes" value={job.scenesCount} />
        <Row label="Status">
          <StatusBadge status={job.status} />
        </Row>
      </div>

      {/* RAW DATA */}
      <div className="bg-gray-900 text-green-200 rounded-xl p-5 text-sm overflow-auto">
        <div className="text-gray-400 mb-2">Raw Job Data</div>
        <pre>{JSON.stringify(job, null, 2)}</pre>
      </div>
    </div>
  );
}

// ============================
// SMALL COMPONENTS
// ============================
function Row({ label, value, children }) {
  return (
    <div className="flex justify-between border-b last:border-0 py-2 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">
        {children || value}
      </span>
    </div>
  );
}

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
