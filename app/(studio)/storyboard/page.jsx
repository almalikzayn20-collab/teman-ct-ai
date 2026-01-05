"use client";

import { useState } from "react";

export default function StoryboardPage() {
  const [scenes, setScenes] = useState([]);

  function addScene(file) {
    const url = URL.createObjectURL(file);

    setScenes((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        image: url,
        duration: 3,
        transition: "fade",
      },
    ]);
  }

  function updateScene(id, key, value) {
    setScenes((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, [key]: value } : s
      )
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-bold">Storyboard Builder</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => addScene(e.target.files[0])}
      />

      <div className="grid md:grid-cols-2 gap-4">
        {scenes.map((scene) => (
          <div
            key={scene.id}
            className="border rounded-xl p-4 space-y-2"
          >
            <img
              src={scene.image}
              className="w-full h-40 object-cover rounded"
            />

            <input
              type="number"
              value={scene.duration}
              onChange={(e) =>
                updateScene(scene.id, "duration", +e.target.value)
              }
              className="w-full p-2 border rounded"
            />

            <select
              value={scene.transition}
              onChange={(e) =>
                updateScene(scene.id, "transition", e.target.value)
              }
              className="w-full p-2 border rounded"
            >
              <option value="fade">Fade</option>
              <option value="cut">Cut</option>
              <option value="slide">Slide</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
