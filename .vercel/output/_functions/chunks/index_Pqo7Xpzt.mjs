import { s as supabase } from './supabase_z0w-xlsH.mjs';
import { c as checkRateLimit, r as rateLimitHeaders } from './rate-limit_DMG4b8og.mjs';
import { j as jsonError, i as isISODate, a as isEnum, A as ALLOWED_JETSKI_IDS } from './validate_B0O4GPoV.mjs';

const prerender = false;
const AVAIL_LIMIT = 60;
const AVAIL_WINDOW_MS = 5 * 60 * 1e3;
function addDays(isoDate, delta) {
  const d = /* @__PURE__ */ new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}
function okJson(body, rlH) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=30",
      ...rlH
    }
  });
}
const GET = async ({ url, clientAddress }) => {
  const ip = clientAddress ?? "unknown";
  const rl = await checkRateLimit(`avail:${ip}`, AVAIL_LIMIT, AVAIL_WINDOW_MS);
  const rlH = rateLimitHeaders(rl, AVAIL_LIMIT);
  if (!rl.allowed) return jsonError(429, "Rate limit", rlH);
  const date = url.searchParams.get("date");
  const unit = url.searchParams.get("jetski_unit_id");
  if (!isISODate(date)) return jsonError(400, "date=YYYY-MM-DD required", rlH);
  if (!isEnum(unit, ALLOWED_JETSKI_IDS)) return jsonError(400, "jetski_unit_id invalid", rlH);
  if (!supabase) {
    return okJson({ busy: [], fallback: true }, rlH);
  }
  const fromDate = addDays(date, -7);
  const { data, error } = await supabase.from("bookings").select("booking_date, start_time, duration_minutes, buffer_minutes").eq("jetski_unit_id", unit).gte("booking_date", fromDate).lte("booking_date", date).not("status", "in", "(cancelled,no_show)");
  if (error) {
    console.error("[api/availability]", error);
    return okJson({ busy: [], fallback: true }, rlH);
  }
  const busy = (data ?? []).map((row) => {
    const startIso = toNaiveIso(row.booking_date, row.start_time, 0);
    const endIso = toNaiveIso(
      row.booking_date,
      row.start_time,
      row.duration_minutes + row.buffer_minutes
    );
    return { startISO: startIso, endISO: endIso };
  });
  const dayStart = `${date}T00:00`;
  const dayEnd = `${addDays(date, 1)}T00:00`;
  const relevant = busy.filter((iv) => iv.endISO > dayStart && iv.startISO < dayEnd);
  return okJson({ busy: relevant }, rlH);
};
function toNaiveIso(date, time, addMinutes) {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  const totalMin = h * 60 + min + addMinutes;
  const dayOffset = Math.floor(totalMin / (24 * 60));
  const remainingMin = (totalMin % (24 * 60) + 24 * 60) % (24 * 60);
  const hh = Math.floor(remainingMin / 60);
  const mm = remainingMin % 60;
  const base = new Date(Date.UTC(y, m - 1, d));
  base.setUTCDate(base.getUTCDate() + dayOffset);
  const yy = base.getUTCFullYear();
  const mo = String(base.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(base.getUTCDate()).padStart(2, "0");
  return `${yy}-${mo}-${dd}T${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
