import { createClient } from '@supabase/supabase-js';
import { c as checkRateLimit, r as rateLimitHeaders } from './rate-limit_DMG4b8og.mjs';

const prerender = false;
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1e3;
const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 8;
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7;
const POST = async ({ request, cookies, clientAddress }) => {
  const ip = clientAddress ?? "unknown";
  const rl = await checkRateLimit(`login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  const rlHeaders = rateLimitHeaders(rl, LOGIN_LIMIT);
  if (!rl.allowed) {
    return new Response(
      JSON.stringify({
        error: `Zu viele Login-Versuche. Bitte in ${rl.retryAfterSeconds} Sekunden erneut versuchen.`
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", ...rlHeaders }
      }
    );
  }
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "E-Mail und Passwort erforderlich" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...rlHeaders }
        }
      );
    }
    const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(
        JSON.stringify({ error: "Login-System noch nicht konfiguriert" }),
        {
          status: 503,
          headers: { "Content-Type": "application/json", ...rlHeaders }
        }
      );
    }
    const authClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    const { data, error } = await authClient.auth.signInWithPassword({
      email,
      password
    });
    if (error || !data.session) {
      return new Response(
        JSON.stringify({ error: "E-Mail oder Passwort falsch" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...rlHeaders }
        }
      );
    }
    cookies.set("sb-access-token", data.session.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_TOKEN_MAX_AGE
    });
    cookies.set("sb-refresh-token", data.session.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_TOKEN_MAX_AGE
    });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...rlHeaders }
    });
  } catch {
    return new Response(JSON.stringify({ error: "Serverfehler" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...rlHeaders }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
