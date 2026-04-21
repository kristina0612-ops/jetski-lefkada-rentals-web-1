// Kleine, abhängigkeitsfreie Validation-Helfer für API-Bodies.
// Ziel: Angriffe durch malformed-Input verhindern (SQL-/NoSQL-Injection,
// Buffer-Overflow-artige Probleme, Type-Verwechslung), ohne Zod o.ä. zu
// installieren. Prinzip: Allow-List, nur explizit erlaubte Felder + Typen
// + Längen werden akzeptiert, alles andere wird verworfen.
//
// Pattern pro Endpoint:
//   const body = await request.json();
//   const check = validateBookingBody(body);
//   if (!check.ok) return json400(check.error);
//   // check.data ist typed + sauber
//
// WICHTIG: Dieses Modul ersetzt KEINE Datenbank-Constraints (RLS, CHECK-
// Constraints). Es ist die erste Schutzebene vor der DB.

// ─── Low-level guards ─────────────────────────────────────────────────────

export function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function isStr(v: unknown, min = 0, max = 500): v is string {
  return typeof v === "string" && v.length >= min && v.length <= max;
}

export function isInt(v: unknown, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= min && v <= max;
}

export function isNum(v: unknown, min = -1e9, max = 1e9): v is number {
  return typeof v === "number" && Number.isFinite(v) && v >= min && v <= max;
}

export function isEnum<T extends string>(v: unknown, allowed: readonly T[]): v is T {
  return typeof v === "string" && (allowed as readonly string[]).includes(v);
}

export function isISODate(v: unknown): v is string {
  if (typeof v !== "string") return false;
  // YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(v);
  return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}

export function isTimeHHMM(v: unknown): v is string {
  return typeof v === "string" && /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
}

export function isEmail(v: unknown): v is string {
  // Pragmatischer Check, kein vollständiger RFC-5322, aber sicher genug
  // gegen Injection und reicht für Newsletter-/Buchungs-Empfang
  return typeof v === "string"
    && v.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

export function isPhone(v: unknown): v is string {
  // Plus-Zeichen + Ziffern + Leerzeichen/Bindestriche/Klammern, min 6 max 30
  return typeof v === "string"
    && v.length >= 6 && v.length <= 30
    && /^[+\d\s\-().]+$/.test(v);
}

// ─── Endpoint-specific schemas ────────────────────────────────────────────

export interface BookingInput {
  booking_date: string;
  start_time: string;
  duration_minutes: number;
  buffer_minutes?: number;
  source: BookingSourceType;
  jetski_unit_id: string;
  jetski_id?: string;
  service_category?: string;
  service_type?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_country?: string;
  towable_persons?: number;
  delivery_location?: string;
  total_price?: number;
  deposit_amount?: number;
  notes?: string;
}

type Result<T> = { ok: true; data: T } | { ok: false; error: string };

export const ALLOWED_JETSKI_IDS = ["nero-ena", "nero-dio", "nero-tria", "nero-tessera"] as const;
const ALLOWED_UNIT_IDS = ALLOWED_JETSKI_IDS;
const ALLOWED_SERVICE_CATEGORIES = [
  "beach_rides", "exclusive_experiences", "vip_delivery", "towable",
] as const;
const ALLOWED_BOOKING_SOURCES = [
  "website", "whatsapp", "walk_in", "maintenance", "weather", "admin_block",
] as const;
type BookingSourceType = typeof ALLOWED_BOOKING_SOURCES[number];

// Sources bei denen Kundendaten NICHT erforderlich sind (Blocker statt echte Buchung)
const BLOCKER_SOURCES: readonly BookingSourceType[] = ["maintenance", "weather", "admin_block"];

export function validateBookingBody(body: unknown): Result<BookingInput> {
  if (!isObject(body)) return { ok: false, error: "Body must be a JSON object" };

  if (!isISODate(body.booking_date)) return { ok: false, error: "booking_date must be YYYY-MM-DD" };
  if (!isTimeHHMM(body.start_time)) return { ok: false, error: "start_time must be HH:MM (24h)" };
  // 10 Min bis 1 Woche (10080 Min) für VIP-Wochen-Buchungen
  if (!isInt(body.duration_minutes, 10, 10080)) return { ok: false, error: "duration_minutes out of range" };
  if (body.buffer_minutes !== undefined && !isInt(body.buffer_minutes, 0, 120)) return { ok: false, error: "buffer_minutes out of range" };
  if (!isEnum(body.source, ALLOWED_BOOKING_SOURCES)) return { ok: false, error: "source not allowed" };
  if (!isEnum(body.jetski_unit_id, ALLOWED_UNIT_IDS)) return { ok: false, error: "jetski_unit_id not allowed" };
  if (body.jetski_id !== undefined && !isEnum(body.jetski_id, ALLOWED_JETSKI_IDS)) return { ok: false, error: "jetski_id not allowed" };
  if (body.service_category !== undefined && !isEnum(body.service_category, ALLOWED_SERVICE_CATEGORIES)) return { ok: false, error: "service_category not allowed" };
  if (body.service_type !== undefined && !isStr(body.service_type, 1, 60)) return { ok: false, error: "service_type too long" };

  const source = body.source as BookingSourceType;
  const isBlocker = BLOCKER_SOURCES.includes(source);

  // Bei echten Buchungen (source = website/whatsapp/walk_in) sind Kunden-Felder Pflicht.
  // Bei Blockern (maintenance/weather/admin_block) sind sie optional.
  if (!isBlocker) {
    if (!isStr(body.customer_name, 2, 120)) return { ok: false, error: "customer_name 2-120 chars required" };
    if (!isPhone(body.customer_phone)) return { ok: false, error: "customer_phone required and must be valid" };
  } else {
    if (body.customer_name !== undefined && !isStr(body.customer_name, 0, 120)) return { ok: false, error: "customer_name too long" };
    if (body.customer_phone !== undefined && !isPhone(body.customer_phone)) return { ok: false, error: "customer_phone invalid" };
  }

  if (body.customer_email !== undefined && !isEmail(body.customer_email)) return { ok: false, error: "customer_email invalid" };
  if (body.customer_country !== undefined && !isStr(body.customer_country, 2, 60)) return { ok: false, error: "customer_country invalid" };
  if (body.towable_persons !== undefined && !isInt(body.towable_persons, 1, 8)) return { ok: false, error: "towable_persons 1-8" };
  if (body.delivery_location !== undefined && !isStr(body.delivery_location, 2, 200)) return { ok: false, error: "delivery_location too long" };
  if (body.total_price !== undefined && !isNum(body.total_price, 0, 10000)) return { ok: false, error: "total_price out of range" };
  if (body.deposit_amount !== undefined && !isNum(body.deposit_amount, 0, 10000)) return { ok: false, error: "deposit_amount out of range" };
  if (body.notes !== undefined && !isStr(body.notes, 0, 2000)) return { ok: false, error: "notes too long" };

  return {
    ok: true,
    data: {
      booking_date: body.booking_date as string,
      start_time: body.start_time as string,
      duration_minutes: body.duration_minutes as number,
      buffer_minutes: body.buffer_minutes as number | undefined,
      source,
      jetski_unit_id: body.jetski_unit_id as string,
      jetski_id: body.jetski_id as string | undefined,
      service_category: body.service_category as string | undefined,
      service_type: body.service_type as string | undefined,
      customer_name: body.customer_name ? (body.customer_name as string).trim() : undefined,
      customer_email: body.customer_email ? (body.customer_email as string).trim().toLowerCase() : undefined,
      customer_phone: body.customer_phone ? (body.customer_phone as string).trim() : undefined,
      customer_country: body.customer_country as string | undefined,
      towable_persons: body.towable_persons as number | undefined,
      delivery_location: body.delivery_location as string | undefined,
      total_price: body.total_price as number | undefined,
      deposit_amount: body.deposit_amount as number | undefined,
      notes: body.notes as string | undefined,
    },
  };
}

export interface ExpenseInput {
  expense_date: string;
  category: string;
  amount: number;
  description: string;
  receipt_url?: string;
  notes?: string;
}

const ALLOWED_EXPENSE_CATEGORIES = ["fuel", "maintenance", "insurance", "other"] as const;

export function validateExpenseBody(body: unknown): Result<ExpenseInput> {
  if (!isObject(body)) return { ok: false, error: "Body must be a JSON object" };

  if (!isISODate(body.expense_date)) return { ok: false, error: "expense_date must be YYYY-MM-DD" };
  if (!isEnum(body.category, ALLOWED_EXPENSE_CATEGORIES)) return { ok: false, error: "category not allowed" };
  if (!isNum(body.amount, 0, 100000)) return { ok: false, error: "amount out of range" };
  if (!isStr(body.description, 2, 500)) return { ok: false, error: "description 2-500 chars" };
  if (body.receipt_url !== undefined && !isStr(body.receipt_url, 5, 1000)) return { ok: false, error: "receipt_url too long" };
  if (body.notes !== undefined && !isStr(body.notes, 0, 2000)) return { ok: false, error: "notes too long" };

  // URL format check (wenn vorhanden), muss https:// sein, kein javascript:
  if (body.receipt_url !== undefined) {
    const url = body.receipt_url as string;
    if (!/^https?:\/\//.test(url) || /^javascript:/i.test(url)) {
      return { ok: false, error: "receipt_url must be http(s)://" };
    }
  }

  return {
    ok: true,
    data: {
      expense_date: body.expense_date as string,
      category: body.category as string,
      amount: body.amount as number,
      description: (body.description as string).trim(),
      receipt_url: body.receipt_url as string | undefined,
      notes: body.notes as string | undefined,
    },
  };
}

// ─── Response helper ──────────────────────────────────────────────────────

export function jsonError(
  status: number,
  error: string,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}
