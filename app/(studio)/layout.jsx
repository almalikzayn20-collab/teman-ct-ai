export default function StudioLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{
        width: 220,
        background: "#111",
        color: "#fff",
        padding: 16
      }}>
        <h3>🎬 Studio</h3>
        <ul style={{ marginTop: 12 }}>
          <li>Dashboard</li>
          <li>Video</li>
          <li>Storyboard</li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: 24 }}>
        {children}
      </main>
    </div>
  );
}
