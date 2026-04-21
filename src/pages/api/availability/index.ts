export const prerender = false;

// GET /api/availability?date=YYYY-MM-DD&jetski_unit_id=nero-ena
//
// Public, kein Auth. Rate-Limit pro IP.
// Response: { busy: [{startISO, endISO}], fallback?: true }
//
// Fail-open: wenn Supabase nicht erreichbar → leeres Array + fallback=true,
// damit Kunden nie komplett ausgesperrt sind.
// Response enthält NUR startISO/endISO - KEINE PII (Namen/Emails/Notes).

import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import { checkRateLimit, rateLimitHeaders } from "../../../lib/rate-limit";
import { ALLOWED_JETSKI_IDS, isISODate, isEnum, jsonError } from "../../../lib/validate";

const AVAIL_LIMIT = 60;
const AVAIL_WINDOW_MS = 5 * 60 * 1000;

// Max. Buchungs-Dauer = 1 Woche (10080 Min). Für den Tag X müssen wir
// Buchungen holen, die bis zu 7 Tage VOR X gestartet sind (Wochen-Bookings).
const LOOKBACK_DAYS = 7;

function addDays(isoDate: string, delta: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

function okJson(body: unknown, rlH: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=30",
      ...rlH,
    },
  });
}

export const GET: APIRoute = async ({ url, clientAddress }) => {
  const ip = clientAddress ?? "unknown";
  const rl = await checkRateLimit(`avail:${ip}`, AVAIL_LIMIT, AVAIL_WINDOW_MS);
  const rlH = rateLimitHeaders(rl, AVAIL_LIMIT);
  if (!rl.allowed) return jsonError(429, "Rate limit", rlH);

  const date = url.searchParams.get("date");
  const unit = url.searchParams.get("jetski_unit_id");

  if (!isISODate(date)) return jsonError(400, "date=YYYY-MM-DD required", rlH);
  if (!isEnum(unit, ALLOWED_JETSKI_IDS)) return jsonError(400, "jetski_unit_id invalid", rlH);

  // Fail-open: Supabase offline → leere Busy-Liste, damit Kunden buchen können
  if (!supabase) {
    return okJson({ busy: [], fallback: true }, rlH);
  }

  const fromDate = addDays(date!, -LOOKBACK_DAYS);

  const { data, error } = await supabase
    .from("bookings")
    .select("booking_date, start_time, duration_minutes, buffer_minutes")
    .eq("jetski_unit_id", unit)
    .gte("booking_date", fromDate)
    .lte("booking_date", date!)
    .not("status", "in", "(cancelled,no_show)");

  if (error) {
    console.error("[api/availability]", error);
    return okJson({ busy: [], fallback: true }, rlH);
  }

  // Zeit-Berechnung server-seitig, ohne Timezone-Gymnastik für den Browser.
  // Output in Europe/Athens als naive ISO-Strings ohne Z-Suffix → der Browser
  // vergleicht sie rein als Strings gegen seinen eigenen Slot-ISO, auch
  // naiv als "YYYY-MM-DDTHH:MM". Damit kein DST-Fehlmatch.
  const busy = (data ?? []).map((row) => {
    const startIso = toNaiveIso(row.booking_date as string, row.start_time as string, 0);
    const endIso = toNaiveIso(
      row.booking_date as string,
      row.start_time as string,
      (row.duration_minutes as number) + (row.buffer_minutes as number),
    );
    return { startISO: startIso, endISO: endIso };
  });

  // Nur Intervalle die mit dem Abfrage-Tag überlappen
  const dayStart = `${date}T00:00`;
  const dayEnd = `${addDays(date!, 1)}T00:00`;
  const relevant = busy.filter((iv) => iv.endISO > dayStart && iv.startISO < dayEnd);

  return okJson({ busy: relevant }, rlH);
};

function toNaiveIso(date: string, time: string, addMinutes: number): string {
  // "YYYY-MM-DD" + "HH:MM" + delta Min → "YYYY-MM-DDTHH:MM"
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  const totalMin = h * 60 + min + addMinutes;
  const dayOffset = Math.floor(totalMin / (24 * 60));
  const remainingMin = ((totalMin % (24 * 60)) + 24 * 60) % (24 * 60);
  const hh = Math.floor(remainingMin / 60);
  const mm = remainingMin % 60;

  const base = new Date(Date.UTC(y, m - 1, d));
  base.setUTCDate(base.getUTCDate() + dayOffset);
  const yy = base.getUTCFullYear();
  const mo = String(base.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(base.getUTCDate()).padStart(2, "0");
  return `${yy}-${mo}-${dd}T${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
