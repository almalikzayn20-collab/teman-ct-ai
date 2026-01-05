export function StoryWeaverPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Story Weaver</h1>

      <div className="bg-[#121826] p-6 rounded-2xl space-y-4">
        <textarea
          placeholder="Story idea..."
          className="w-full h-32 bg-[#0b0e18] border border-neutral-700 rounded-xl p-4"
        />

        <div className="grid grid-cols-3 gap-4">
          <input
            placeholder="Scenes"
            className="bg-[#0b0e18] p-3 rounded-xl border border-neutral-700"
          />
          <select className="bg-[#0b0e18] p-3 rounded-xl border border-neutral-700">
            <option>9:16</option>
            <option>16:9</option>
          </select>
          <select className="bg-[#0b0e18] p-3 rounded-xl border border-neutral-700">
            <option>Cinematic</option>
            <option>Documentary</option>
          </select>
        </div>

        <button className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold">
          Weave Story
        </button>
      </div>

      <div className="bg-[#121826] p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-2">Storyboard Output</h2>
        <div className="h-48 border border-dashed border-neutral-600 rounded-xl flex items-center justify-center text-neutral-400">
          Storyboard Preview
        </div>
      </div>
    </div>
  );
}
