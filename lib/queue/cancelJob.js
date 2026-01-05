import { redis } from "./redis";

const CANCEL_TTL = 60 * 10; // 10 menit

export async function cancelVideoJob(jobId) {
  await redis.set(`video:cancel:${jobId}`, "1", "EX", CANCEL_TTL);
}
