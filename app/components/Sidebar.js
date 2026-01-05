"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  const menus = [
    {
      label: "CT-Generate",
      children: [
        { label: "Text to Video", href: "/ct-generate/text-to-video" },
        { label: "Image to Video", href: "/ct-generate/image-to-video" },
      ],
    },
    {
      label: "CT-Story",
      children: [
        { label: "Story Weaver", href: "/ct-story/story-weaver" },
        { label: "NanoBanana / Imagen", href: "/ct-story/nanobanana" },
      ],
    },
    { label: "Jago YT", href: "/jago-yt" },
    { label: "UGC Generator", href: "/ugcg" },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0d1117] text-white border-r border-neutral-800 p-6 space-y-6">

      <h1 className="text-xl font-bold text-green-400">CT AI Studio</h1>
      <p className="text-gray-400 text-sm">Veo Bot</p>

      <nav className="space-y-4">
        {menus.map((menu, index) => (
          <div key={index}>
            <p className="text-gray-400 text-xs uppercase mb-1">{menu.label}</p>

            {/* If menu has children */}
            {menu.children ? (
              <div className="space-y-1 ml-3">
                {menu.children.map((sub) => (
                  <Link key={sub.href} href={sub.href}>
                    <div
                      className={`p-2 rounded-lg cursor-pointer ${
                        path === sub.href
                          ? "bg-green-500 text-black font-bold"
                          : "hover:bg-[#1a1f27]"
                      }`}
                    >
                      {sub.label}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <Link href={menu.href}>
                <div
                  className={`p-2 rounded-lg cursor-pointer ${
                    path === menu.href
                      ? "bg-green-500 text-black font-bold"
                      : "hover:bg-[#1a1f27]"
                  }`}
                >
                  {menu.label}
                </div>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
