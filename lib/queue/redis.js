import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});
export async function cancelJob(jobId) {
  await redis.set(`video:cancel:${jobId}`, "1");
}

export async function isJobCancelled(jobId) {
  return (await redis.get(`video:cancel:${jobId}`)) === "1";
}
