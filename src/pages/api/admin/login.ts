export const prerender = false;

// POST /api/admin/login
// Body: { email, password }
// Bei Erfolg: Session-Cookie setzen, 200 OK
// Bei Fehler: 401 mit error message
// Bei Brute-Force: 429 Too Many Requests

import type { APIRoute } from "astro";
import { checkRateLimit, rateLimitHeaders } from "../../../lib/rate-limit";

const LOGIN_LIMIT = 5; // Versuche
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 Minuten

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- cookies used once Supabase login is live
export const POST: APIRoute = async ({ request, cookies: _cookies, clientAddress }) => {
  // Rate-Limit pro IP – greift auch solange der Login-Endpoint ein Stub ist,
  // damit ein Angreifer nicht unbegrenzt probieren kann sobald Supabase live geht.
  // Seit Sec #3 async + persistent (Supabase-RPC), überlebt Cold-Starts.
  const ip = clientAddress ?? "unknown";
  const rl = await checkRateLimit(`login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  const rlHeaders = rateLimitHeaders(rl, LOGIN_LIMIT);

  if (!rl.allowed) {
    return new Response(
      JSON.stringify({
        error: `Zu viele Login-Versuche. Bitte in ${rl.retryAfterSeconds} Sekunden erneut versuchen.`,
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", ...rlHeaders },
      },
    );
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "E-Mail und Passwort erforderlich" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...rlHeaders },
        },
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
      {
        status: 503,
        headers: { "Content-Type": "application/json", ...rlHeaders },
      },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Serverfehler" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...rlHeaders },
    });
  }
};
