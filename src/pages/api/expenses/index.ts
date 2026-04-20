export const prerender = false;

// GET /api/expenses — Liste
// POST /api/expenses — Neue Ausgabe

import type { APIRoute } from "astro";
import type { Expense } from "../../../types/database";
import { checkRateLimit, rateLimitHeaders } from "../../../lib/rate-limit";
import { validateExpenseBody, jsonError } from "../../../lib/validate";

const POST_LIMIT = 20;
const POST_WINDOW_MS = 5 * 60 * 1000;

export const GET: APIRoute = async ({ cookies }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // TODO: Supabase expenses lesen
  return new Response(JSON.stringify([] as Expense[]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  // Seit Sec #3: async, persistent via Supabase.
  const ip = clientAddress ?? "unknown";
  const rl = await checkRateLimit(`expenses-post:${ip}`, POST_LIMIT, POST_WINDOW_MS);
  const rlHeaders = rateLimitHeaders(rl, POST_LIMIT);
  if (!rl.allowed) {
    return new Response(
      JSON.stringify({
        error: `Zu viele Anfragen. Bitte in ${rl.retryAfterSeconds} Sekunden erneut versuchen.`,
      }),
      { status: 429, headers: { "Content-Type": "application/json", ...rlHeaders } },
    );
  }

  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...rlHeaders },
    });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return jsonError(400, "Invalid JSON body", rlHeaders);
  }

  // Input-Validation (Sec #2, 2026-04-20): verhindert SQL/NoSQL-Injection
  // + Oversized-Strings. Receipt-URL darf kein `javascript:` sein (XSS).
  const check = validateExpenseBody(rawBody);
  if (!check.ok) {
    return jsonError(400, `Validation failed: ${check.error}`, rlHeaders);
  }
  const body = check.data;

  try {
    // TODO: Supabase Insert — bis dahin dry-run
    void body;
    return new Response(
      JSON.stringify({
        error: "Expenses-API ist noch nicht aktiviert – Supabase muss erst live sein.",
      }),
      { status: 503, headers: { "Content-Type": "application/json", ...rlHeaders } },
    );
  } catch (err) {
    console.error("[api/expenses POST] Fehler:", err);
    return jsonError(500, "Serverfehler", rlHeaders);
  }
};
