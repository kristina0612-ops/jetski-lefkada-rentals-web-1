export const prerender = false;

// GET /api/expenses — Liste
// POST /api/expenses — Neue Ausgabe

import type { APIRoute } from "astro";
import type { Expense } from "../../../types/database";

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

    // TODO: Validation + Supabase Insert
    return new Response(
      JSON.stringify({
        error: "Expenses-API ist noch nicht aktiviert – Supabase muss erst live sein.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  } catch {
    return new Response(JSON.stringify({ error: "Serverfehler" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
