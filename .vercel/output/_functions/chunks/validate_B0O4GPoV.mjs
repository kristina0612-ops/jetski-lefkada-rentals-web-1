function isObject(v) {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
function isStr(v, min = 0, max = 500) {
  return typeof v === "string" && v.length >= min && v.length <= max;
}
function isInt(v, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return typeof v === "number" && Number.isInteger(v) && v >= min && v <= max;
}
function isNum(v, min = -1e9, max = 1e9) {
  return typeof v === "number" && Number.isFinite(v) && v >= min && v <= max;
}
function isEnum(v, allowed) {
  return typeof v === "string" && allowed.includes(v);
}
function isISODate(v) {
  if (typeof v !== "string") return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(v);
  return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}
function isTimeHHMM(v) {
  return typeof v === "string" && /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
}
function isEmail(v) {
  return typeof v === "string" && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}
function isPhone(v) {
  return typeof v === "string" && v.length >= 6 && v.length <= 30 && /^[+\d\s\-().]+$/.test(v);
}
const ALLOWED_JETSKI_IDS = ["nero-ena", "nero-dio", "nero-tria", "nero-tessera"];
const ALLOWED_UNIT_IDS = ALLOWED_JETSKI_IDS;
const ALLOWED_SERVICE_CATEGORIES = [
  "beach_rides",
  "exclusive_experiences",
  "vip_delivery",
  "towable"
];
const ALLOWED_BOOKING_SOURCES = [
  "website",
  "whatsapp",
  "walk_in",
  "maintenance",
  "weather",
  "admin_block"
];
const BLOCKER_SOURCES = ["maintenance", "weather", "admin_block"];
function validateBookingBody(body) {
  if (!isObject(body)) return { ok: false, error: "Body must be a JSON object" };
  if (!isISODate(body.booking_date)) return { ok: false, error: "booking_date must be YYYY-MM-DD" };
  if (!isTimeHHMM(body.start_time)) return { ok: false, error: "start_time must be HH:MM (24h)" };
  if (!isInt(body.duration_minutes, 10, 10080)) return { ok: false, error: "duration_minutes out of range" };
  if (body.buffer_minutes !== void 0 && !isInt(body.buffer_minutes, 0, 120)) return { ok: false, error: "buffer_minutes out of range" };
  if (!isEnum(body.source, ALLOWED_BOOKING_SOURCES)) return { ok: false, error: "source not allowed" };
  if (!isEnum(body.jetski_unit_id, ALLOWED_UNIT_IDS)) return { ok: false, error: "jetski_unit_id not allowed" };
  if (body.jetski_id !== void 0 && !isEnum(body.jetski_id, ALLOWED_JETSKI_IDS)) return { ok: false, error: "jetski_id not allowed" };
  if (body.service_category !== void 0 && !isEnum(body.service_category, ALLOWED_SERVICE_CATEGORIES)) return { ok: false, error: "service_category not allowed" };
  if (body.service_type !== void 0 && !isStr(body.service_type, 1, 60)) return { ok: false, error: "service_type too long" };
  const source = body.source;
  const isBlocker = BLOCKER_SOURCES.includes(source);
  if (!isBlocker) {
    if (!isStr(body.customer_name, 2, 120)) return { ok: false, error: "customer_name 2-120 chars required" };
    if (!isPhone(body.customer_phone)) return { ok: false, error: "customer_phone required and must be valid" };
  } else {
    if (body.customer_name !== void 0 && !isStr(body.customer_name, 0, 120)) return { ok: false, error: "customer_name too long" };
    if (body.customer_phone !== void 0 && !isPhone(body.customer_phone)) return { ok: false, error: "customer_phone invalid" };
  }
  if (body.customer_email !== void 0 && !isEmail(body.customer_email)) return { ok: false, error: "customer_email invalid" };
  if (body.customer_country !== void 0 && !isStr(body.customer_country, 2, 60)) return { ok: false, error: "customer_country invalid" };
  if (body.towable_persons !== void 0 && !isInt(body.towable_persons, 1, 8)) return { ok: false, error: "towable_persons 1-8" };
  if (body.delivery_location !== void 0 && !isStr(body.delivery_location, 2, 200)) return { ok: false, error: "delivery_location too long" };
  if (body.total_price !== void 0 && !isNum(body.total_price, 0, 1e4)) return { ok: false, error: "total_price out of range" };
  if (body.deposit_amount !== void 0 && !isNum(body.deposit_amount, 0, 1e4)) return { ok: false, error: "deposit_amount out of range" };
  if (body.notes !== void 0 && !isStr(body.notes, 0, 2e3)) return { ok: false, error: "notes too long" };
  return {
    ok: true,
    data: {
      booking_date: body.booking_date,
      start_time: body.start_time,
      duration_minutes: body.duration_minutes,
      buffer_minutes: body.buffer_minutes,
      source,
      jetski_unit_id: body.jetski_unit_id,
      jetski_id: body.jetski_id,
      service_category: body.service_category,
      service_type: body.service_type,
      customer_name: body.customer_name ? body.customer_name.trim() : void 0,
      customer_email: body.customer_email ? body.customer_email.trim().toLowerCase() : void 0,
      customer_phone: body.customer_phone ? body.customer_phone.trim() : void 0,
      customer_country: body.customer_country,
      towable_persons: body.towable_persons,
      delivery_location: body.delivery_location,
      total_price: body.total_price,
      deposit_amount: body.deposit_amount,
      notes: body.notes
    }
  };
}
const ALLOWED_EXPENSE_CATEGORIES = ["fuel", "maintenance", "insurance", "other"];
function validateExpenseBody(body) {
  if (!isObject(body)) return { ok: false, error: "Body must be a JSON object" };
  if (!isISODate(body.expense_date)) return { ok: false, error: "expense_date must be YYYY-MM-DD" };
  if (!isEnum(body.category, ALLOWED_EXPENSE_CATEGORIES)) return { ok: false, error: "category not allowed" };
  if (!isNum(body.amount, 0, 1e5)) return { ok: false, error: "amount out of range" };
  if (!isStr(body.description, 2, 500)) return { ok: false, error: "description 2-500 chars" };
  if (body.receipt_url !== void 0 && !isStr(body.receipt_url, 5, 1e3)) return { ok: false, error: "receipt_url too long" };
  if (body.notes !== void 0 && !isStr(body.notes, 0, 2e3)) return { ok: false, error: "notes too long" };
  if (body.receipt_url !== void 0) {
    const url = body.receipt_url;
    if (!/^https?:\/\//.test(url) || /^javascript:/i.test(url)) {
      return { ok: false, error: "receipt_url must be http(s)://" };
    }
  }
  return {
    ok: true,
    data: {
      expense_date: body.expense_date,
      category: body.category,
      amount: body.amount,
      description: body.description.trim(),
      receipt_url: body.receipt_url,
      notes: body.notes
    }
  };
}
function jsonError(status, error, extraHeaders = {}) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders }
  });
}

export { ALLOWED_JETSKI_IDS as A, isEnum as a, validateExpenseBody as b, isISODate as i, jsonError as j, validateBookingBody as v };
