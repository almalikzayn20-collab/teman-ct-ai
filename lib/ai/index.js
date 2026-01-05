import { renderRunwayVideo } from "./runway";
import { renderPikaVideo } from "./pika";

export async function renderAIVideo({ provider, scenes }) {
  if (provider === "runway") {
    return renderRunwayVideo({ scenes });
  }

  if (provider === "pika") {
    return renderPikaVideo({ scenes });
  }

  throw new Error("Unknown AI video provider");
}
