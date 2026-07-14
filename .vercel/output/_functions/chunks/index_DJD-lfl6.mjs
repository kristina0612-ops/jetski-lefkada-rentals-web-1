import { c as checkRateLimit, r as rateLimitHeaders } from './rate-limit_DMG4b8og.mjs';
import { j as jsonError, b as validateExpenseBody } from './validate_B0O4GPoV.mjs';

const prerender = false;
const POST_LIMIT = 20;
const POST_WINDOW_MS = 5 * 60 * 1e3;
const GET = async ({ cookies }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response(JSON.stringify([]), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const POST = async ({ request, cookies, clientAddress }) => {
  const ip = clientAddress ?? "unknown";
  const rl = await checkRateLimit(`expenses-post:${ip}`, POST_LIMIT, POST_WINDOW_MS);
  const rlHeaders = rateLimitHeaders(rl, POST_LIMIT);
  if (!rl.allowed) {
    return new Response(
      JSON.stringify({
        error: `Zu viele Anfragen. Bitte in ${rl.retryAfterSeconds} Sekunden erneut versuchen.`
      }),
      { status: 429, headers: { "Content-Type": "application/json", ...rlHeaders } }
    );
  }
  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...rlHeaders }
    });
  }
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return jsonError(400, "Invalid JSON body", rlHeaders);
  }
  const check = validateExpenseBody(rawBody);
  if (!check.ok) {
    return jsonError(400, `Validation failed: ${check.error}`, rlHeaders);
  }
  const body = check.data;
  try {
    void body;
    return new Response(
      JSON.stringify({
        error: "Expenses-API ist noch nicht aktiviert, Supabase muss erst live sein."
      }),
      { status: 503, headers: { "Content-Type": "application/json", ...rlHeaders } }
    );
  } catch (err) {
    console.error("[api/expenses POST] Fehler:", err);
    return jsonError(500, "Serverfehler", rlHeaders);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
