export default function JagoYTPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Jago YT</h1>

      <div className="bg-[#121826] p-6 rounded-2xl space-y-4">
        <input
          placeholder="YouTube topic"
          className="w-full p-3 bg-[#0b0e18] rounded-xl border border-neutral-700"
        />
        <button className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold">
          Generate Script
        </button>
      </div>
    </div>
  );
}
