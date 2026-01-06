import Link from "next/link";

export default function StudioLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">🎬 Studio</h2>

        <nav className="flex flex-col gap-2">
          <Link href="/studio" className="hover:underline">
            Dashboard
          </Link>

          <Link href="/studio/video" className="hover:underline">
            Video Tool
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-white">{children}</main>
    </div>
  );
}
