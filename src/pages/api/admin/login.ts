export const prerender = false;

// POST /api/admin/login
// Body: { email, password }
// Bei Erfolg: Session-Cookie setzen, 200 OK
// Bei Fehler: 401 mit error message

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "E-Mail und Passwort erforderlich" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // TODO: Ersetzen durch echten Supabase-Auth-Call sobald Keys da sind
    //
    // import { createClient } from '@supabase/supabase-js';
    // const supabase = createClient(
    //   import.meta.env.PUBLIC_SUPABASE_URL,
    //   import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    // );
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    // if (error) return new Response(JSON.stringify({ error: error.message }), { status: 401 });
    //
    // cookies.set('sb-access-token', data.session.access_token, {
    //   httpOnly: true, secure: true, sameSite: 'lax', path: '/',
    //   maxAge: 60 * 60 * 8, // 8h
    // });
    // cookies.set('sb-refresh-token', data.session.refresh_token, {
    //   httpOnly: true, secure: true, sameSite: 'lax', path: '/',
    //   maxAge: 60 * 60 * 24 * 7,
    // });

    // STUB: verweigert bis Supabase aktiv ist
    return new Response(
      JSON.stringify({
        error:
          "Login ist noch nicht aktiviert — Supabase muss erst eingerichtet werden. Siehe .claude/plans/WELLE-2-STATUS.md",
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
