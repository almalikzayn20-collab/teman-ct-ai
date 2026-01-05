export default function CtStoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">CT-Story</h1>

      <div className="bg-[#121826] p-6 rounded-2xl space-y-4">
        <textarea
          placeholder="Story idea..."
          className="w-full h-32 bg-[#0b0e18] p-4 rounded-xl border border-neutral-700"
        />
        <button className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold">
          Generate Storyboard
        </button>
      </div>
    </div>
  );
}

