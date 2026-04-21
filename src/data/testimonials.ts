// Kundenstimmen (Testimonials)
//
// STAND 2026-04-19: Stand-in-Zitate mit erfundenen Vornamen/Initialen/Orten.
// Kristina hat bewusst entschieden, erfundene Namen zu nutzen, weil echte
// Kundennamen aus Datenschutzgründen NICHT veröffentlicht werden sollen.
//
// Die ZITATE selbst sind repräsentativ für das Feedback, das Kristina/David
// real von Gästen hören, also glaubwürdig, aber nicht wortgetreu zitiert.
// Ersetzen durch echte Google-Business-Profile-Reviews sobald diese einlaufen.
//
// WICHTIG: KEINE direkte Zuordnung zu den Fotos in public/images/customers/
// (falsche Namenszuschreibung wäre DSGVO-Risiko für die abgebildeten echten Personen).
// Deshalb zeigen Testimonials nur Initialen-Avatars, keine Fotos.

export interface Testimonial {
  quote: string;
  author: string;          // "Marco R.", Vorname + Initial, keine vollen Namen
  initials: string;        // "MR", für Avatar
  origin: string;          // "Milan, Italy"
  language: "EN" | "DE" | "IT" | "EL";
  date: string;            // "2025-07-18", plausibel in der letzten Saison
  rating: number;          // 5
  source: "TripAdvisor" | "Google" | "Viator" | "Instagram" | "Guest feedback";
  category?: string;       // Was hat der Gast gebucht? (optional für Kontext)
  accent: string;          // Farbe für Avatar-Gradient
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "David's briefing was spot-on. 10 minutes and I felt completely safe. The Sunset Ride was the highlight of the whole trip.",
    author: "Marco R.",
    initials: "MR",
    origin: "Milan, Italy",
    language: "EN",
    date: "2025-08-14",
    rating: 5,
    source: "Guest feedback",
    category: "Sunset Ride",
    accent: "#ff5a36",
  },
  {
    quote:
      "Wir haben den Water-Fun-Tube für die Kids gebucht. Zwei Stunden pures Lachen. Die Neros sind gepflegt, David total entspannt.",
    author: "Sophie K.",
    initials: "SK",
    origin: "München, Deutschland",
    language: "DE",
    date: "2025-07-22",
    rating: 5,
    source: "Guest feedback",
    category: "Water Fun",
    accent: "#ffc233",
  },
  {
    quote:
      "First time on a jetski, no licence. David guided us personally the whole time. Never felt pushed, only welcomed.",
    author: "James W.",
    initials: "JW",
    origin: "London, UK",
    language: "EN",
    date: "2025-09-03",
    rating: 5,
    source: "Guest feedback",
    category: "Beach Ride 60 min",
    accent: "#00b3a7",
  },
  {
    quote:
      "Η εμπειρία στον κόλπο της Λυγιάς ήταν τέλεια. Καθαρά jet skis, σωστές οδηγίες, δίκαιη τιμή. Ξανά του χρόνου.",
    author: "Αλέξανδρος Π.",
    initials: "ΑΠ",
    origin: "Athens, Greece",
    language: "EL",
    date: "2025-08-29",
    rating: 5,
    source: "Guest feedback",
    category: "Half Day",
    accent: "#4fb3bf",
  },
  {
    quote:
      "Der Couple-Ride bei Sonnenuntergang. Einer dieser Urlaubsmomente, die man nicht mehr vergisst. Preis völlig fair.",
    author: "Tobias H.",
    initials: "TH",
    origin: "Wien, Österreich",
    language: "DE",
    date: "2025-06-27",
    rating: 5,
    source: "Guest feedback",
    category: "Couple Ride",
    accent: "#ff5a36",
  },
  {
    quote:
      "Barca pulita, istruzioni chiare, David professionale. Il giro delle baie a sud di Lefkada è stato indimenticabile.",
    author: "Laura B.",
    initials: "LB",
    origin: "Bologna, Italy",
    language: "IT",
    date: "2025-07-11",
    rating: 5,
    source: "Guest feedback",
    category: "Beach Ride 60 min",
    accent: "#ffc233",
  },
];

// Live-Buchungen Feed (aktuell leer, Opt-In-only sobald Buchungssystem live ist)
export const liveBookings: Array<{
  name: string;
  from: string;
  when: string;
  jetski: string;
}> = [];
