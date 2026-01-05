import Link from "next/link";

export default function StudioLayout({ children }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-neutral-900 p-4 space-y-4">
        <h1 className="font-bold text-xl">CT Studio</h1>

        <nav className="space-y-2">
          <Link href="/studio" className="block text-neutral-300 hover:text-white">
            Dashboard
          </Link>
          <Link href="/ct-generate" className="block text-neutral-300 hover:text-white">
            CT Generate
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
