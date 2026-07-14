import { s as supabase } from './supabase_z0w-xlsH.mjs';
import { c as checkRateLimit, r as rateLimitHeaders } from './rate-limit_DMG4b8og.mjs';
import { j as jsonError, a as isEnum } from './validate_B0O4GPoV.mjs';

const prerender = false;
const PATCH_LIMIT = 20;
const PATCH_WINDOW_MS = 5 * 60 * 1e3;
const ALLOWED_STATUSES = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "no_show"
];
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PATCH = async ({ request, params, cookies, clientAddress }) => {
  const ip = clientAddress ?? "unknown";
  const rl = await checkRateLimit(`bookings-patch:${ip}`, PATCH_LIMIT, PATCH_WINDOW_MS);
  const rlHeaders = rateLimitHeaders(rl, PATCH_LIMIT);
  if (!rl.allowed) return jsonError(429, "Rate limit", rlHeaders);
  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) return jsonError(401, "Unauthorized", rlHeaders);
  const id = params.id;
  if (!id || !UUID_RE.test(id)) return jsonError(400, "Invalid booking id", rlHeaders);
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return jsonError(400, "Invalid JSON body", rlHeaders);
  }
  const body = rawBody;
  if (!isEnum(body.status, ALLOWED_STATUSES)) {
    return jsonError(400, "status required and must be valid", rlHeaders);
  }
  const newStatus = body.status;
  if (!supabase) return jsonError(503, "Supabase nicht konfiguriert", rlHeaders);
  const { data: userData, error: userErr } = await supabase.auth.getUser(accessToken);
  if (userErr || !userData?.user) return jsonError(401, "Unauthorized", rlHeaders);
  const updatePayload = { status: newStatus };
  if (body.notes !== void 0) {
    if (typeof body.notes !== "string" || body.notes.length > 2e3) {
      return jsonError(400, "notes too long", rlHeaders);
    }
    updatePayload.notes = body.notes;
  }
  const { data, error } = await supabase.from("bookings").update(updatePayload).eq("id", id).select().single();
  if (error) {
    console.error("[api/bookings PATCH]", error);
    return jsonError(500, "Serverfehler beim Update", rlHeaders);
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json", ...rlHeaders }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  PATCH,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
