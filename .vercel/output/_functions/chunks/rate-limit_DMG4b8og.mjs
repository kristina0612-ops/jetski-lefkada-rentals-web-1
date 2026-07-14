import { s as supabase } from './supabase_z0w-xlsH.mjs';

const memStore = /* @__PURE__ */ new Map();
let lastGc = Date.now();
const GC_INTERVAL_MS = 5 * 60 * 1e3;
function gcMem(now) {
  if (now - lastGc < GC_INTERVAL_MS) return;
  lastGc = now;
  for (const [key, rec] of memStore) {
    if (now - rec.windowStart > GC_INTERVAL_MS * 2) memStore.delete(key);
  }
}
async function checkRateLimit(key, limit, windowMs) {
  const windowSeconds = Math.max(1, Math.floor(windowMs / 1e3));
  if (!supabase) {
    return checkRateLimitMemory(key, limit, windowMs);
  }
  try {
    const { data, error } = await supabase.rpc("check_rate_limit", {
      p_key: key,
      p_limit: limit,
      p_window_seconds: windowSeconds
    });
    if (!error && Array.isArray(data) && data.length > 0) {
      const row = data[0];
      const resetAt = new Date(row.reset_at).getTime();
      const retryAfterSeconds = Math.max(0, Math.ceil((resetAt - Date.now()) / 1e3));
      return {
        allowed: row.allowed,
        remaining: row.remaining,
        resetAt,
        retryAfterSeconds,
        persistent: true
      };
    }
  } catch {
  }
  return checkRateLimitMemory(key, limit, windowMs);
}
function checkRateLimitMemory(key, limit, windowMs) {
  const now = Date.now();
  gcMem(now);
  const rec = memStore.get(key);
  if (!rec || now - rec.windowStart > windowMs) {
    memStore.set(key, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt: now + windowMs,
      retryAfterSeconds: Math.ceil(windowMs / 1e3),
      persistent: false
    };
  }
  rec.count += 1;
  const resetAt = rec.windowStart + windowMs;
  const retryAfterSeconds = Math.max(0, Math.ceil((resetAt - now) / 1e3));
  return {
    allowed: rec.count <= limit,
    remaining: Math.max(0, limit - rec.count),
    resetAt,
    retryAfterSeconds,
    persistent: false
  };
}
function rateLimitHeaders(res, limit) {
  const headers = {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(res.remaining),
    "X-RateLimit-Reset": String(Math.ceil(res.resetAt / 1e3))
  };
  if (!res.allowed) {
    headers["Retry-After"] = String(res.retryAfterSeconds);
  }
  return headers;
}

export { checkRateLimit as c, rateLimitHeaders as r };
