"use client";
import { useState } from "react";

export default function SceneCard({
  scene,
  index,
  onEditPrompt,
  onMoveUp,
  onMoveDown,
  onRegenerate,
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(scene.prompt);

  function save() {
    onEditPrompt(scene.id, text);
    setEditing(false);
  }

  return (
    <div className="border border-neutral-700 rounded-xl overflow-hidden bg-neutral-900">
      {/* IMAGE */}
      <img
        src={scene.image}
        alt={`Scene ${scene.id}`}
        className="w-full h-48 object-cover"
      />

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between text-xs text-neutral-400">
          <span>Scene {scene.id}</span>
          <span>{scene.duration}</span>
        </div>

        {!editing ? (
          <p
            className="text-sm cursor-pointer hover:text-white"
            onClick={() => setEditing(true)}
          >
            {scene.prompt}
          </p>
        ) : (
          <>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-24 bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-sm"
            />

            <div className="flex gap-2">
              <button
                onClick={save}
                className="px-3 py-1 bg-green-500 text-black rounded text-sm font-bold"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-3 py-1 bg-neutral-700 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {/* ACTIONS */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onMoveUp(index)}
            className="px-2 py-1 rounded bg-neutral-700"
          >
            ↑
          </button>

          <button
            onClick={() => onMoveDown(index)}
            className="px-2 py-1 rounded bg-neutral-700"
          >
            ↓
          </button>

          <button
            onClick={() => onRegenerate(scene.id)}
            disabled={scene.loading}
            className="flex-1 py-1 rounded bg-blue-600 disabled:opacity-50"
          >
            {scene.loading ? "Regenerating..." : "Regenerate"}
          </button>
        </div>
      </div>
    </div>
  );
}
