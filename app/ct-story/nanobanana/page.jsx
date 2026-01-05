export function NanoBananaPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">NanoBanana (Imagen)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#121826] p-6 rounded-2xl space-y-4">
          <textarea
            placeholder="Describe the image..."
            className="w-full h-32 bg-[#0b0e18] border border-neutral-700 rounded-xl p-4"
          />

          <select className="bg-[#0b0e18] p-3 rounded-xl border border-neutral-700">
            <option>Photorealistic</option>
            <option>Illustration</option>
            <option>Anime</option>
          </select>

          <button className="w-full bg-green-500 text-black py-3 rounded-xl font-bold">
            Generate Image
          </button>
        </div>

        <div className="bg-[#121826] p-6 rounded-2xl flex items-center justify-center">
          <div className="w-full h-64 border border-dashed border-neutral-600 rounded-xl flex items-center justify-center text-neutral-400">
            Image Preview
          </div>
        </div>
      </div>
    </div>
  );
}
