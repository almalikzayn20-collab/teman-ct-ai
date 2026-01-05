"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-neutral-400 text-sm">
          Welcome to CT AI Pro
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* CT Generate */}
        <Link
          href="/ct-generate"
          className="p-6 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-blue-500 transition"
        >
          <h2 className="text-xl font-semibold">🎬 CT Generate</h2>
          <p className="text-sm text-neutral-400 mt-2">
            Generate cinematic scenes from idea
          </p>
        </Link>

        {/* Image → Video */}
        <Link
          href="/ct-generate/image-to-video"
          className="p-6 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-emerald-500 transition"
        >
          <h2 className="text-xl font-semibold">🎥 Image to Video</h2>
          <p className="text-sm text-neutral-400 mt-2">
            Render scenes into video
          </p>
        </Link>

        {/* Future */}
        <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 opacity-50">
          <h2 className="text-xl font-semibold">🚧 More Tools</h2>
          <p className="text-sm text-neutral-400 mt-2">
            Coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
