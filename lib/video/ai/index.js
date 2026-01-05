import { renderRunwayVideo } from "./runway";
import { renderPikaVideo } from "./pika";
import { withRetry } from "./retry";

const MAX_SCENES_AI = 10;
const MAX_DURATION_SEC = 60;

export async function renderAIVideo({
  provider,
  scenes,
  abortSignal,
  onProgress,
}) {
  // ==========================
  // GUARD LIMIT
  // ==========================
  if (scenes.length > MAX_SCENES_AI) {
    throw new Error("AI_SCENE_LIMIT_EXCEEDED");
  }

 const duration = scenes.reduce(
  (t, s) => t + Number(s.duration?.replace("s", "") || 5),
  0
);

if (scenes.length > MAX_SCENES_AI) {
  throw new Error("AI_SCENE_LIMIT_EXCEEDED");
}

if (duration > MAX_DURATION_AI) {
  throw new Error("AI_DURATION_LIMIT_EXCEEDED");
}


  // ==========================
  // RETRY WRAPPER
  // ==========================
  return withRetry({
    retries: 3,
    delay: 3000,
    backoff: 2,
    abortSignal,

    isRetryable: (err) => {
      const msg = err.message || "";
      return (
        msg.includes("429") ||
        msg.includes("RATE_LIMIT") ||
        msg.includes("timeout") ||
        msg.includes("NETWORK")
      );
    },

    fn: async (attempt) => {
      onProgress?.(
        5 + attempt * 5,
        `AI attempt ${attempt + 1}/3`
      );

      if (provider === "runway") {
        return renderRunwayVideo({
          scenes,
          abortSignal,
          onProgress,
        });
      }

      if (provider === "pika") {
        return renderPikaVideo({
          scenes,
          abortSignal,
          onProgress,
        });
      }

      throw new Error("UNKNOWN_AI_PROVIDER");
    },
  });
}
