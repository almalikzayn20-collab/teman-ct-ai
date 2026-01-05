export function TextToVideoPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Text → Video</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUT */}
        <div className="bg-[#121826] p-6 rounded-2xl space-y-4">
          <h2 className="text-xl font-semibold">Prompt</h2>
          <textarea
            placeholder="Describe your video scene in detail..."
            className="w-full h-40 bg-[#0b0e18] border border-neutral-700 rounded-xl p-4"
          />

          <div className="grid grid-cols-2 gap-4">
            <select className="bg-[#0b0e18] border border-neutral-700 rounded-xl p-3">
              <option>Cinematic</option>
              <option>Anime</option>
              <option>Realistic</option>
            </select>
            <select className="bg-[#0b0e18] border border-neutral-700 rounded-xl p-3">
              <option>9:16</option>
              <option>16:9</option>
            </select>
          </div>

          <button className="w-full bg-green-500 text-black py-3 rounded-xl font-bold">
            Generate Video
          </button>
        </div>

        {/* PREVIEW */}
        <div className="bg-[#121826] p-6 rounded-2xl flex items-center justify-center">
          <div className="w-full h-64 border border-dashed border-neutral-600 rounded-xl flex items-center justify-center text-neutral-400">
            Video Preview
          </div>
        </div>
      </div>
    </div>
  );
}
