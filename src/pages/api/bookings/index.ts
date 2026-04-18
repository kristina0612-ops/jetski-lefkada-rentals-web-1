export const prerender = false;

// GET /api/bookings — Liste (nur eingeloggt)
// POST /api/bookings — Neue Buchung anlegen

import type { APIRoute } from "astro";
import type { Booking } from "../../../types/database";

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

export const POST: APIRoute = async ({ request, cookies }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();

    // TODO: Validation mit zod oder ähnlich
    // TODO: Supabase-Insert + Rückgabe der angelegten Buchung

    return new Response(
      JSON.stringify({
        error:
          "Buchung-API ist noch nicht aktiviert — Supabase muss erst live sein.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Serverfehler" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
