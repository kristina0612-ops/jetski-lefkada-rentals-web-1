// Rate-Limiter für Serverless-Functions.
//
// Architektur (Sec #3, 2026-04-20):
//   • PRIMÄR: Supabase-persistent via RPC `check_rate_limit`
//     → Atomare PostgreSQL-Operation, überlebt Vercel Cold-Starts.
//     → Verhindert Brute-Force-Umgehung durch parallele Serverless-Instanzen.
//     → Migration: supabase/migrations/20260420_rate_limits.sql
//   • FALLBACK: In-Memory-Counter pro Instanz
//     → Greift wenn Supabase nicht erreichbar ist oder ENV fehlt.
//     → Weicher Schutz, keine harte Garantie.
//
// Verwendung (sync-ähnliches Pattern beibehalten für Backward-Compat):
//   const rl = await checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
//   if (!rl.allowed) return json429(...);
//
// Siehe: .claude/skills/security/SKILL.md A04 (Insecure Design)

import { supabase } from "./supabase";

interface LocalRecord {
  count: number;
  windowStart: number;
}

// Fallback-Memory-Store für wenn Supabase down ist.
const memStore = new Map<string, LocalRecord>();
let lastGc = Date.now();
const GC_INTERVAL_MS = 5 * 60 * 1000;

function gcMem(now: number) {
  if (now - lastGc < GC_INTERVAL_MS) return;
  lastGc = now;
  for (const [key, rec] of memStore) {
    if (now - rec.windowStart > GC_INTERVAL_MS * 2) memStore.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Unix-Timestamp (ms), zu dem das aktuelle Fenster endet */
  resetAt: number;
  /** Sekunden bis zum Reset – praktisch für Retry-After-Header */
  retryAfterSeconds: number;
  /** true wenn persistent via Supabase, false wenn nur In-Memory-Fallback */
  persistent: boolean;
}

/**
 * Prüft und erhöht einen Rate-Limit-Zähler.
 * Verwendet primär Supabase-RPC (atomar, persistent).
 * Fällt auf In-Memory zurück wenn Supabase nicht erreichbar ist.
 *
 * @param key      Eindeutiger Zähler-Schlüssel (z. B. `login:${ip}`)
 * @param limit    Maximale Requests pro Fenster
 * @param windowMs Länge des Zeitfensters in Millisekunden
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const windowSeconds = Math.max(1, Math.floor(windowMs / 1000));

  // ─── Primary: Supabase RPC ────────────────────────────────────────────
  try {
    const { data, error } = await supabase.rpc("check_rate_limit", {
      p_key: key,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    });

    if (!error && Array.isArray(data) && data.length > 0) {
      const row = data[0] as { allowed: boolean; remaining: number; reset_at: string };
      const resetAt = new Date(row.reset_at).getTime();
      const retryAfterSeconds = Math.max(0, Math.ceil((resetAt - Date.now()) / 1000));
      return {
        allowed: row.allowed,
        remaining: row.remaining,
        resetAt,
        retryAfterSeconds,
        persistent: true,
      };
    }
    // Error oder leeres Ergebnis → fallback
  } catch {
    // Netzwerkfehler / Supabase down → fallback
  }

  // ─── Fallback: In-Memory ──────────────────────────────────────────────
  return checkRateLimitMemory(key, limit, windowMs);
}

/**
 * Reiner In-Memory-Rate-Limiter (Fallback, nicht-persistent).
 * Öffentlich exportiert falls jemand bewusst keine Supabase-Abhängigkeit will.
 */
export function checkRateLimitMemory(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  gcMem(now);

  const rec = memStore.get(key);
  if (!rec || now - rec.windowStart > windowMs) {
    memStore.set(key, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt: now + windowMs,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
      persistent: false,
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
    persistent: false,
  };
}

/**
 * Hilfs-Funktion: liefert passende Headers für eine Rate-Limit-Antwort.
 * Kompatibel mit dem „de-facto Standard" (GitHub, Twitter, Stripe).
 */
export function rateLimitHeaders(
  res: RateLimitResult,
  limit: number,
): Record<string, string> {
  const headers: Record<string, string> = {
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
