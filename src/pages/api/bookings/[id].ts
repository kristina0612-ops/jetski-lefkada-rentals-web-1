export const prerender = false;

// PATCH /api/bookings/:id – Status einer Buchung ändern (z.B. Storno)
// Kein Hard-Delete (red-lines.md: Kundendaten niemals löschen).
// Bei status='cancelled' oder 'no_show' gibt der DB-Constraint den Slot wieder frei.

import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import { checkRateLimit, rateLimitHeaders } from "../../../lib/rate-limit";
import { isEnum, jsonError } from "../../../lib/validate";

const PATCH_LIMIT = 20;
const PATCH_WINDOW_MS = 5 * 60 * 1000;

const ALLOWED_STATUSES = [
  "pending", "confirmed", "completed", "cancelled", "no_show",
] as const;

// UUID v4 Pattern (Supabase-IDs sind v4)
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const PATCH: APIRoute = async ({ request, params, cookies, clientAddress }) => {
  const ip = clientAddress ?? "unknown";
  const rl = await checkRateLimit(`bookings-patch:${ip}`, PATCH_LIMIT, PATCH_WINDOW_MS);
  const rlHeaders = rateLimitHeaders(rl, PATCH_LIMIT);
  if (!rl.allowed) return jsonError(429, "Rate limit", rlHeaders);

  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) return jsonError(401, "Unauthorized", rlHeaders);

  const id = params.id;
  if (!id || !UUID_RE.test(id)) return jsonError(400, "Invalid booking id", rlHeaders);

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return jsonError(400, "Invalid JSON body", rlHeaders);
  }

  const body = rawBody as { status?: unknown; notes?: unknown };
  if (!isEnum(body.status, ALLOWED_STATUSES)) {
    return jsonError(400, "status required and must be valid", rlHeaders);
  }
  const newStatus = body.status as typeof ALLOWED_STATUSES[number];

  if (!supabase) return jsonError(503, "Supabase nicht konfiguriert", rlHeaders);

  const { data: userData, error: userErr } = await supabase.auth.getUser(accessToken);
  if (userErr || !userData?.user) return jsonError(401, "Unauthorized", rlHeaders);

  const updatePayload: Record<string, unknown> = { status: newStatus };
  if (body.notes !== undefined) {
    if (typeof body.notes !== "string" || body.notes.length > 2000) {
      return jsonError(400, "notes too long", rlHeaders);
    }
    updatePayload.notes = body.notes;
  }

  const { data, error } = await supabase
    .from("bookings")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[api/bookings PATCH]", error);
    return jsonError(500, "Serverfehler beim Update", rlHeaders);
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json", ...rlHeaders },
  });
};
