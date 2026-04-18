export const prerender = false;

// GET /api/bookings — Liste (nur eingeloggt)
// POST /api/bookings — Neue Buchung anlegen

import type { APIRoute } from "astro";
import type { Booking } from "../../../types/database";
import { checkRateLimit, rateLimitHeaders } from "../../../lib/rate-limit";

// Großzügig: 20 Schreibversuche / 5 Minuten pro IP.
// Soll Spam/Fake-Buchungen bei Supabase-Go-Live verhindern, ohne echte Nutzer
// zu blockieren.
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

  // TODO: Mit Supabase-Client verbinden, bookings lesen
  // const { data, error } = await supabase.from('bookings').select('*').order('booking_date', { ascending: false });
  // return new Response(JSON.stringify(data ?? []), ...);

  return new Response(JSON.stringify([] as Booking[]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request, cookies, clientAddress }) => {
  // Rate-Limit vor Auth-Check (damit auch anonyme Requests limitiert werden)
  const ip = clientAddress ?? "unknown";
  const rl = checkRateLimit(`bookings-post:${ip}`, POST_LIMIT, POST_WINDOW_MS);
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

  try {
    await request.json(); // TODO: Validation mit zod, Ergebnis als `body` weiterreichen

    // TODO: Supabase-Insert + Rückgabe der angelegten Buchung

    return new Response(
      JSON.stringify({
        error:
          "Buchung-API ist noch nicht aktiviert — Supabase muss erst live sein.",
      }),
      { status: 503, headers: { "Content-Type": "application/json", ...rlHeaders } },
    );
  } catch (err) {
    console.error("[api/bookings POST] Fehler:", err);
    return new Response(JSON.stringify({ error: "Serverfehler" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...rlHeaders },
    });
  }
};
