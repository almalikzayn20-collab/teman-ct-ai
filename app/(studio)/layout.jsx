import Link from "next/link";

export default function StudioLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: "#0f172a",
          color: "white",
          padding: 20,
        }}
      >
        <h2 style={{ marginBottom: 24 }}>🎬 Studio</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Link href="/studio" style={{ color: "white", textDecoration: "none" }}>
            Dashboard
          </Link>
          <Link
            href="/studio/video"
            style={{ color: "white", textDecoration: "none" }}
          >
            Video Generator
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: 32 }}>{children}</main>
    </div>
  );
}
