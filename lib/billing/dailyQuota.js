import { redis } from "@/lib/queue/redis";

const DAILY_LIMITS = {
  free: 3,
  pro: Infinity,
  enterprise: Infinity,
};

function todayKey(userId) {
  const today = new Date().toISOString().slice(0, 10);
  return `video:daily:${userId}:${today}`;
}

export async function checkDailyQuota({ userId, tier }) {
  const limit = DAILY_LIMITS[tier] ?? 3;
  if (limit === Infinity) return;

  const key = todayKey(userId);
  const count = Number((await redis.get(key)) || 0);

  if (count >= limit) {
    throw new Error("DAILY_RENDER_LIMIT_EXCEEDED");
  }
}

export async function incrementDailyQuota(userId) {
  const key = todayKey(userId);

  const tx = redis.multi();
  tx.incr(key);
  tx.expire(key, 60 * 60 * 24); // auto reset 24 jam
  await tx.exec();
}
