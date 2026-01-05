export default function PreviewSkeleton() {
  return (
    <div className="bg-[#121826] p-6 rounded-2xl space-y-6 animate-pulse">

      {/* TITLE */}
      <div className="h-6 w-2/3 bg-neutral-700 rounded"></div>
      <div className="h-4 w-1/3 bg-neutral-800 rounded"></div>

      {/* VIDEO PREVIEW */}
      <div className="w-full h-64 bg-neutral-800 rounded-xl"></div>

      {/* SCENE LIST */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 space-y-2"
          >
            <div className="h-4 w-1/4 bg-neutral-700 rounded"></div>
            <div className="h-3 w-full bg-neutral-800 rounded"></div>
            <div className="h-3 w-5/6 bg-neutral-800 rounded"></div>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4">
        <div className="flex-1 h-12 bg-neutral-700 rounded-xl"></div>
        <div className="flex-1 h-12 bg-neutral-800 rounded-xl"></div>
      </div>
    </div>
  );
}
