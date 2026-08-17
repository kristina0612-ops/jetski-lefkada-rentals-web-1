export const prerender = false;

// GET /api/availability - STILLGELEGT (Betrieb dauerhaft geschlossen, 08/2026)
//
// War der einzige öffentliche, unauthentifizierte Endpoint mit Supabase-Zugriff.
// Da es keinen Verleih und keine Buchungsstrecke mehr gibt, hat er keinen Zweck
// mehr und wird als 410 Gone beantwortet: kein DB-Zugriff, keine Angriffsfläche,
// keine Supabase-Requests von Bots.
//
// Die vollständige Implementierung liegt in der Git-Historie (Commit 751ffba).

import type { APIRoute } from "astro";

const GONE_BODY = JSON.stringify({
  error: "Nero Lefkada has permanently closed. This endpoint is no longer available.",
});

const gone = (): Response =>
  new Response(GONE_BODY, {
    status: 410,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });

export const GET: APIRoute = gone;
export const POST: APIRoute = gone;