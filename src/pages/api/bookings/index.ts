export const prerender = false;

// GET /api/bookings – Liste (nur eingeloggt)
// POST /api/bookings – Neue Buchung oder Slot-Block anlegen
//
// Overlap-Schutz läuft DB-seitig via EXCLUDE USING gist in der bookings-Tabelle
// (Migration 20260421_bookings.sql). Ein PostgreSQL-Error-Code 23P01
// (exclusion_violation) wird in eine HTTP 409 Antwort übersetzt.

import type { APIRoute } from "astro";
import type { Booking } from "../../../types/database";
import { supabase } from "../../../lib/supabase";
import { checkRateLimit, rateLimitHeaders } from "../../../lib/rate-limit";
import { validateBookingBody, jsonError } from "../../../lib/validate";

const POST_LIMIT = 20;
const POST_WINDOW_MS = 5 * 60 * 1000;

function isBookingsLive(): boolean {
  return process.env.BOOKINGS_LIVE === "true";
}

export const GET: APIRoute = async ({ cookies }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!isBookingsLive() || !supabase) {
    return new Response(JSON.stringify([] as Booking[]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: userData, error: userErr } = await supabase.auth.getUser(accessToken);
  if (userErr || !userData?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("booking_date", { ascending: false })
    .limit(500);

  if (error) {
    console.error("[api/bookings GET]", error);
    return jsonError(500, "Serverfehler");
  }

  return new Response(JSON.stringify(data ?? []), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  const ip = clientAddress ?? "unknown";
  const rl = await checkRateLimit(`bookings-post:${ip}`, POST_LIMIT, POST_WINDOW_MS);
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
    return jsonError(401, "Unauthorized", rlHeaders);
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return jsonError(400, "Invalid JSON body", rlHeaders);
  }

  const check = validateBookingBody(rawBody);
  if (!check.ok) {
    return jsonError(400, `Validation failed: ${check.error}`, rlHeaders);
  }
  const body = check.data;

  if (!isBookingsLive()) {
    return jsonError(503, "Buchungs-API ist noch nicht aktiviert (BOOKINGS_LIVE=false)", rlHeaders);
  }
  if (!supabase) {
    return jsonError(503, "Supabase-Verbindung fehlt", rlHeaders);
  }

  const { data: userData, error: userErr } = await supabase.auth.getUser(accessToken);
  if (userErr || !userData?.user) {
    return jsonError(401, "Unauthorized", rlHeaders);
  }

  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        user_id: userData.user.id,
        jetski_unit_id: body.jetski_unit_id,
        booking_date: body.booking_date,
        start_time: body.start_time,
        duration_minutes: body.duration_minutes,
        buffer_minutes: body.buffer_minutes ?? 15,
        source: body.source,
        status: "confirmed",
        jetski_id: body.jetski_id ?? null,
        service_category: body.service_category ?? null,
        service_type: body.service_type ?? null,
        customer_name: body.customer_name ?? null,
        customer_email: body.customer_email ?? null,
        customer_phone: body.customer_phone ?? null,
        customer_country: body.customer_country ?? null,
        towable_persons: body.towable_persons ?? null,
        delivery_location: body.delivery_location ?? null,
        total_price: body.total_price ?? null,
        deposit_amount: body.deposit_amount ?? null,
        notes: body.notes ?? null,
      })
      .select()
      .single();

    if (error) {
      // Postgres exclusion_violation - der eigentliche Doppelbuchungs-Schutz
      if (error.code === "23P01") {
        return jsonError(409, "Dieser Slot ist bereits belegt.", rlHeaders);
      }
      console.error("[api/bookings POST]", error);
      return jsonError(500, "Serverfehler beim Anlegen", rlHeaders);
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "Content-Type": "application/json", ...rlHeaders },
    });
  } catch (err) {
    console.error("[api/bookings POST] Fehler:", err);
    return jsonError(500, "Serverfehler", rlHeaders);
  }
};
