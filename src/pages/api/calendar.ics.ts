export const prerender = false;

// GET /api/calendar.ics?token=XYZ
// Generiert iCalendar-Feed für Outlook
// Token-basierter Zugriff (kein Login nötig, aber Token muss gültig sein)

import type { APIRoute } from "astro";
import type { Booking } from "../../types/database";
import { timingSafeEqual } from "../../lib/rate-limit";

function formatIcsDate(date: string, time: string): string {
  // YYYY-MM-DD + HH:MM → YYYYMMDDTHHMMSS
  const d = date.replace(/-/g, "");
  const t = time.replace(":", "") + "00";
  return `${d}T${t}`;
}

function buildIcs(bookings: Booking[]): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jetski Lefkada Rentals//CRM//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Jetski Lefkada Rentals · Buchungen",
    "X-WR-TIMEZONE:Europe/Athens",
  ];

  for (const b of bookings) {
    const startIso = formatIcsDate(b.booking_date, b.start_time);
    const endHour = parseInt(b.start_time.split(":")[0], 10);
    const endMin = parseInt(b.start_time.split(":")[1], 10) + b.duration_minutes;
    const endH = endHour + Math.floor(endMin / 60);
    const endM = endMin % 60;
    const endTime = `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
    const endIso = formatIcsDate(b.booking_date, endTime);

    lines.push(
      "BEGIN:VEVENT",
      `UID:${b.id}@jetski-lefkada-rentals.com`,
      `DTSTAMP:${startIso}Z`,
      `DTSTART;TZID=Europe/Athens:${startIso}`,
      `DTEND;TZID=Europe/Athens:${endIso}`,
      `SUMMARY:${b.jetski_id === "seadoo-rxtx" ? "The Challenger" : "The Acrobat"} · ${b.customer_name}`,
      `DESCRIPTION:${b.service_category} / ${b.duration_minutes} min · €${b.total_price}\\nTel: ${b.customer_phone}\\n${b.notes ?? ""}`,
      `STATUS:${b.status === "confirmed" || b.status === "completed" ? "CONFIRMED" : "TENTATIVE"}`,
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get("token");
  const validToken = import.meta.env.CALENDAR_FEED_TOKEN;

  // Timing-safe Vergleich (schützt gegen Timing-Attacks auf das Secret)
  if (!token || !validToken || !timingSafeEqual(token, validToken)) {
    return new Response("Forbidden", { status: 403 });
  }

  // TODO: Bookings aus Supabase laden — nur confirmed/completed
  // const { data: bookings } = await supabase
  //   .from('bookings')
  //   .select('*')
  //   .in('status', ['confirmed', 'completed']);

  const bookings: Booking[] = [];
  const icsContent = buildIcs(bookings);

  return new Response(icsContent, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="jetski-bookings.ics"',
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
};
