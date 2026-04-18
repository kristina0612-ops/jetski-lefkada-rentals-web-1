// In-Memory Rate-Limiter für Serverless-Functions.
//
// Lebt pro Serverless-Instanz – nach Cold-Start fängt der Counter wieder bei 0 an.
// Das ist OK für "weiche" Schutzmaßnahmen wie Login-Brute-Force-Schutz, wo uns
// wichtig ist, dass ein Angreifer nicht tausende Requests pro Minute absetzen
// kann. Für harte Enforcement-Anforderungen (z. B. Billing) müsste ein
// persistenter Store (Supabase, Upstash Redis) dahinter – siehe Security-Skill §3.
//
// Siehe auch: .claude/skills/security/SKILL.md A04 (Insecure Design)

interface Record {
  count: number;
  windowStart: number;
}

const store = new Map<string, Record>();

// Damit die Map nicht unbegrenzt wächst – alle 5 Min abgelaufene Einträge löschen.
let lastGc = Date.now();
const GC_INTERVAL_MS = 5 * 60 * 1000;

function gc(now: number) {
  if (now - lastGc < GC_INTERVAL_MS) return;
  lastGc = now;
  for (const [key, rec] of store) {
    if (now - rec.windowStart > GC_INTERVAL_MS * 2) store.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Unix-Timestamp (ms), zu dem das aktuelle Fenster endet */
  resetAt: number;
  /** Sekunden bis zum Reset – praktisch für Retry-After-Header */
  retryAfterSeconds: number;
}

/**
 * Prüft und erhöht einen Rate-Limit-Zähler.
 * @param key      Eindeutiger Zähler-Schlüssel (z. B. `login:${ip}`)
 * @param limit    Maximale Requests pro Fenster
 * @param windowMs Länge des Zeitfensters in Millisekunden
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  gc(now);

  const rec = store.get(key);
  if (!rec || now - rec.windowStart > windowMs) {
    store.set(key, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt: now + windowMs,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  rec.count += 1;
  const resetAt = rec.windowStart + windowMs;
  const retryAfterSeconds = Math.max(0, Math.ceil((resetAt - now) / 1000));

  return {
    allowed: rec.count <= limit,
    remaining: Math.max(0, limit - rec.count),
    resetAt,
    retryAfterSeconds,
  };
}

/**
 * Hilfs-Funktion: liefert passende Headers für eine Rate-Limit-Antwort.
 * Kompatibel mit dem „de-facto Standard" (GitHub, Twitter, Stripe).
 */
export function rateLimitHeaders(
  res: RateLimitResult,
  limit: number,
): globalThis.Record<string, string> {
  const headers: globalThis.Record<string, string> = {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(res.remaining),
    "X-RateLimit-Reset": String(Math.ceil(res.resetAt / 1000)),
  };
  if (!res.allowed) {
    headers["Retry-After"] = String(res.retryAfterSeconds);
  }
  return headers;
}

/**
 * Timing-safe String-Vergleich für Secrets (Tokens, API-Keys).
 * Schützt gegen Timing-Attacks, die mit normalem === möglich wären.
 *
 * WICHTIG: Gibt erst bei gleicher Länge einen konstant-zeitigen Vergleich zurück.
 * Unterschiedliche Längen führen zu sofortigem false (dieser Längen-Leak ist in
 * der Praxis vernachlässigbar, weil Secret-Längen meist öffentlich bekannt sind).
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
