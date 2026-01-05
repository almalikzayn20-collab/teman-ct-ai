import { redis } from "@/lib/queue/redis";

const PREFIX = "ct:job:";

export async function createJob(jobId, data) {
  await redis.set(
    PREFIX + jobId,
    JSON.stringify(data)
  );
}

export async function getJob(jobId) {
  const raw = await redis.get(PREFIX + jobId);
  return raw ? JSON.parse(raw) : null;
}

export async function updateJob(jobId, data) {
  const existing = await getJob(jobId);
  if (!existing) return;

  await redis.set(
    PREFIX + jobId,
    JSON.stringify({
      ...existing,
      ...data,
    })
  );
}

export async function removeJob(jobId) {
  await redis.del(PREFIX + jobId);
}
