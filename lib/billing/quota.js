import { redis } from "@/lib/queue/redis";

// =============================
// CONFIG
// =============================
const DAILY_LIMIT_SECONDS = {
  free: 60,        // 1 menit / hari
  pro: 600,        // 10 menit
  enterprise: 3600 // 1 jam
};

// =============================
// GET USER DAILY USAGE
// =============================
async function getUsage(userId) {
  const key = `quota:video:${userId}`;
  const used = await redis.get(key);
  return Number(used || 0);
}

// =============================
// INCREMENT USAGE
// =============================
async function addUsage(userId, seconds) {
  const key = `quota:video:${userId}`;

  const used = await redis.incrby(key, seconds);

  // expire setiap 24 jam
  if (used === seconds) {
    await redis.expire(key, 60 * 60 * 24);
  }

  return used;
}

// =============================
// MAIN CHECK
// =============================
export async function checkQuota({
  userId,
  estimatedSeconds,
  tier = "free",
}) {
  const limit = DAILY_LIMIT_SECONDS[tier] ?? 0;
  const used = await getUsage(userId);

  if (used + estimatedSeconds > limit) {
    throw new Error("QUOTA_EXCEEDED");
  }

  // reserve quota di awal
  await addUsage(userId, estimatedSeconds);
}
