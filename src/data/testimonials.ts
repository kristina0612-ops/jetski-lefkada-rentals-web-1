export interface Testimonial {
  quote: string;
  author: string;
  origin: string;
  date: string;
  rating: number;
  source: "TripAdvisor" | "Google" | "Viator";
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "David knows every hidden bay on Lefkada. We went out for an hour and came back three hours later completely changed people.",
    author: "Marco R.",
    origin: "Milan, Italy",
    date: "August 2025",
    rating: 5,
    source: "TripAdvisor",
  },
  {
    quote:
      "Booked online in 90 seconds, paid deposit, showed up. No paperwork. No surprises. Exactly what a vacation should feel like.",
    author: "Sophie K.",
    origin: "Munich, Germany",
    date: "July 2025",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "The Sea-Doo RXT-X is a monster. David gave us a proper safety briefing, great gear, and a map of the best coves. Felt taken care of.",
    author: "James W.",
    origin: "London, UK",
    date: "September 2025",
    rating: 5,
    source: "TripAdvisor",
  },
  {
    quote:
      "First time on a jetski. David patient, professional, spoke perfect English. We rode to Porto Katsiki and back. Life changing.",
    author: "Elena P.",
    origin: "Athens, Greece",
    date: "June 2025",
    rating: 5,
    source: "Viator",
  },
  {
    quote:
      "Absolutely the best on the island. We rented twice in one week. Clean machines, honest pricing, no hidden fees.",
    author: "Lukas H.",
    origin: "Vienna, Austria",
    date: "August 2025",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "If you only do one thing on Lefkada - do this. The Blue Lagoon from a jetski at sunrise is unmatched.",
    author: "Sara L.",
    origin: "Amsterdam, Netherlands",
    date: "July 2025",
    rating: 5,
    source: "TripAdvisor",
  },
];

export const liveBookings = [
  { name: "Maria", from: "Munich", when: "2 hours ago", jetski: "The Challenger" },
  { name: "Paolo", from: "Rome", when: "4 hours ago", jetski: "The Acrobat" },
  { name: "Emma", from: "London", when: "6 hours ago", jetski: "The Challenger" },
  { name: "Klaus", from: "Berlin", when: "yesterday", jetski: "The Acrobat" },
  { name: "Chloe", from: "Paris", when: "yesterday", jetski: "The Challenger" },
  { name: "Marco", from: "Milan", when: "2 days ago", jetski: "The Acrobat" },
];
