export function JagoYTPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Jago YT</h1>

      <div className="bg-[#121826] p-6 rounded-2xl space-y-4">
        <input
          placeholder="Video topic"
          className="w-full bg-[#0b0e18] p-3 rounded-xl border border-neutral-700"
        />

        <select className="bg-[#0b0e18] p-3 rounded-xl border border-neutral-700">
          <option>Short</option>
          <option>Long Form</option>
        </select>

        <button className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold">
          Generate Script + Hook
        </button>
      </div>

      <div className="bg-[#121826] p-6 rounded-2xl">
        <h2 className="font-semibold mb-2">Generated Script</h2>
        <div className="h-40 border border-dashed border-neutral-600 rounded-xl flex items-center justify-center text-neutral-400">
          Script Output
        </div>
      </div>
    </div>
  );
}
