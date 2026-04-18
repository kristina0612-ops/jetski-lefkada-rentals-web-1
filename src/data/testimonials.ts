// Kundenstimmen & Live-Buchungen
//
// WICHTIG (2026-04-18): Diese Datei war mit erfundenen Testimonials/Buchungen
// gefüllt – entfernt um UWG-/Google-Review-Verstöße zu vermeiden.
// Arrays bleiben leer, bis ECHTE Kundenreviews vorliegen (z. B. aus dem
// Google Business Profile, Instagram-DMs mit Freigabe, oder schriftlichen
// Zitaten mit Einverständnis des Gastes).
//
// Beim Auffüllen:
// 1. Nur Zitate die der Gast explizit freigegeben hat.
// 2. `source` muss die tatsächliche Plattform sein (Google / TripAdvisor /
//    Viator / Instagram) – nicht erfunden.
// 3. Wenn nur ein Vorname ohne Nachname-Initial freigegeben ist, das so lassen.

export interface Testimonial {
  quote: string;
  author: string;
  origin: string;
  date: string;
  rating: number;
  source: "TripAdvisor" | "Google" | "Viator" | "Instagram";
}

export const testimonials: Testimonial[] = [];

export const liveBookings: Array<{
  name: string;
  from: string;
  when: string;
  jetski: string;
}> = [];
