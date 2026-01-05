import { redis } from "@/lib/queue/redis";

export async function rateLimit({
  key,
  limit = 20,
  windowSec = 60,
}) {
  const redisKey = `rl:${key}`;
  const count = await redis.incr(redisKey);

  if (count === 1) {
    await redis.expire(redisKey, windowSec);
  }

  if (count > limit) {
    throw new Error("RATE_LIMIT_EXCEEDED");
  }
}
