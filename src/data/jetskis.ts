// ═══════════════════════════════════════════════════════════════════════════
// NERO LEFKADA RENTAL&RETAIL – Fleet & Pricing
// Final Stand: 2026-04-19
// ═══════════════════════════════════════════════════════════════════════════
//
// FLOTTE: 4 Sea-Doo Jetskis, alle supercharged, alle 3-Sitzer.
//   Nero Ena    – Sea-Doo 260 GTX Limited Edition, 310 PS, 120 km/h (Flaggschiff)
//   Nero Dio    – Sea-Doo 260 RXT RS Riva Racing,  260 PS, 110 km/h
//   Nero Tria   – Sea-Doo 260 GTX Limited Edition, 260 PS, 110 km/h
//   Nero Tessera – Sea-Doo 260 GTX Limited Edition, 260 PS, 110 km/h
//
// VERMERK (immer klein auf der Website):
//   "*3-seater, but 2 persons recommended"
//
// PREISE: Alle 4 Jetskis kosten GLEICH in allen Kategorien (laut Flyer 2026).
//   Vermerk: "*without fuel – fuel billed separately at end of rental"
//
// BUCHUNGSMODELL: Jede Buchung referenziert GENAU eine Unit (jetski_unit_id).
// Der fleet-utilization-analyst-Agent aggregiert Umsatz/Auslastung pro Unit.

// ─── Types ───────────────────────────────────────────────────────────────

export interface BeachRides {
  min10: number | null;
  min15: number | null;
  min20: number | null;
  min30: number | null;
  min60: number | null;
}

export interface ExclusiveExperiences {
  sunsetRide30: number | null; // 1 Person
  coupleRide30: number | null; // 2 Persons
}

export interface VipDelivery {
  hour1: number | null;
  halfDay4h: number | null;
  fullDay8h: number | null;
  week: number | "onRequest" | null;
}

export interface JetskiUnit {
  id: string;                      // z.B. "nero-ena"
  label: string;                   // z.B. "Nero Ena"
  modelId: string;                 // FK zu Jetski.id
  serialNumber: string | null;     // Hersteller-Seriennummer (später)
  registrationNumber: string | null; // griechische ΛΣ-Registrierung (später)
  color: string | null;
  status: "active" | "maintenance" | "retired";
  commissionedAt: string | null;
  notes?: string;
}

export interface Jetski {
  id: string;
  name: string;
  tagline: string;
  brand: string;
  model: string;
  year: number;
  seats: number;
  recommendedSeats: number;  // NEU: Empfohlene Sitzzahl (bei Nero: 2, obwohl 3 möglich)
  hp: number;
  topSpeed: number;
  pricePerHour: number | null;     // = Beach Ride 60min
  priceHalfDay: number | null;     // nicht im Flyer 2026
  priceFullDay: number | null;     // nicht im Flyer 2026
  beachRides: BeachRides;
  exclusiveExperiences: ExclusiveExperiences;
  vipDelivery: VipDelivery;
  features: string[];
  image: string;
  accent: string;
  availableToday: number;
  totalUnits: number;
  featured?: boolean;  // Flaggschiff?
}

// ─── Gemeinsame Preis-Strukturen (alle Neros identisch) ─────────────────

const COMMON_BEACH_RIDES: BeachRides = {
  min10: 80,
  min15: 90,
  min20: 100,
  min30: 130,
  min60: 200,
};

const COMMON_EXCLUSIVE: ExclusiveExperiences = {
  sunsetRide30: 130, // 1 Person
  coupleRide30: 150, // 2 Personen
};

const COMMON_VIP_DELIVERY: VipDelivery = {
  hour1: 350,
  halfDay4h: 450,
  fullDay8h: 650,
  week: "onRequest",
};

const COMMON_FEATURES_GTX = [
  "Intelligent Brake & Reverse (iBR)",
  "Ergolock seat",
  "Bluetooth Audio",
  "LinQ attachment system",
];

const COMMON_FEATURES_RXT_RS = [
  "Riva Racing tuning",
  "Launch control",
  "T3-R hull",
  "Race-tuned exhaust",
];

// ─── FLOTTE: Die 4 Neros (authoritative source for website + calculator) ─

export const jetskis: Jetski[] = [
  {
    id: "nero-ena",
    name: "Nero Ena",
    tagline: "The flagship — fastest on the island.",
    brand: "Sea-Doo",
    model: "260 GTX Limited Edition Supercharged",
    year: 2026,
    seats: 3,
    recommendedSeats: 2,
    hp: 310,
    topSpeed: 120,
    pricePerHour: 200, // = 60-min Beach Ride
    priceHalfDay: null,
    priceFullDay: null,
    beachRides: COMMON_BEACH_RIDES,
    exclusiveExperiences: COMMON_EXCLUSIVE,
    vipDelivery: COMMON_VIP_DELIVERY,
    features: COMMON_FEATURES_GTX,
    image: "https://images.unsplash.com/photo-1595351298020-038700609878?w=1400&q=85&auto=format&fit=crop",
    accent: "#ffc233",
    availableToday: 1,
    totalUnits: 1,
    featured: true,
  },
  {
    id: "nero-dio",
    name: "Nero Dio",
    tagline: "Race-tuned edge, Riva DNA.",
    brand: "Sea-Doo",
    model: "260 RXT RS Riva Racing Supercharged",
    year: 2026,
    seats: 3,
    recommendedSeats: 2,
    hp: 260,
    topSpeed: 110,
    pricePerHour: 200,
    priceHalfDay: null,
    priceFullDay: null,
    beachRides: COMMON_BEACH_RIDES,
    exclusiveExperiences: COMMON_EXCLUSIVE,
    vipDelivery: COMMON_VIP_DELIVERY,
    features: COMMON_FEATURES_RXT_RS,
    image: "https://images.unsplash.com/photo-1625194398019-62a5362c1e52?w=1400&q=85&auto=format&fit=crop",
    accent: "#ff5a36",
    availableToday: 1,
    totalUnits: 1,
  },
  {
    id: "nero-tria",
    name: "Nero Tria",
    tagline: "All-day comfort, supercharged power.",
    brand: "Sea-Doo",
    model: "260 GTX Limited Edition Supercharged",
    year: 2026,
    seats: 3,
    recommendedSeats: 2,
    hp: 260,
    topSpeed: 110,
    pricePerHour: 200,
    priceHalfDay: null,
    priceFullDay: null,
    beachRides: COMMON_BEACH_RIDES,
    exclusiveExperiences: COMMON_EXCLUSIVE,
    vipDelivery: COMMON_VIP_DELIVERY,
    features: COMMON_FEATURES_GTX,
    image: "https://images.unsplash.com/photo-1569251898438-7a87f2f49bf9?w=1400&q=85&auto=format&fit=crop",
    accent: "#00b3a7",
    availableToday: 1,
    totalUnits: 1,
  },
  {
    id: "nero-tessera",
    name: "Nero Tessera",
    tagline: "Refined, reliable, ready.",
    brand: "Sea-Doo",
    model: "260 GTX Limited Edition Supercharged",
    year: 2026,
    seats: 3,
    recommendedSeats: 2,
    hp: 260,
    topSpeed: 110,
    pricePerHour: 200,
    priceHalfDay: null,
    priceFullDay: null,
    beachRides: COMMON_BEACH_RIDES,
    exclusiveExperiences: COMMON_EXCLUSIVE,
    vipDelivery: COMMON_VIP_DELIVERY,
    features: COMMON_FEATURES_GTX,
    image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=1400&q=85&auto=format&fit=crop",
    accent: "#4fb3bf",
    availableToday: 1,
    totalUnits: 1,
  },
];

// ─── FLOTTEN-EINHEITEN (für Kalender, Buchungen, Analytics) ──────────────

export const jetskiUnits: JetskiUnit[] = [
  {
    id: "nero-ena",
    label: "Nero Ena",
    modelId: "nero-ena",
    serialNumber: null,
    registrationNumber: null,
    color: null,
    status: "active",
    commissionedAt: null,
    notes: "Flaggschiff: 310 PS, 120 km/h. Sea-Doo 260 GTX Limited Edition.",
  },
  {
    id: "nero-dio",
    label: "Nero Dio",
    modelId: "nero-dio",
    serialNumber: null,
    registrationNumber: null,
    color: null,
    status: "active",
    commissionedAt: null,
    notes: "Race-tuned: 260 PS, 110 km/h. Sea-Doo 260 RXT RS Riva Racing.",
  },
  {
    id: "nero-tria",
    label: "Nero Tria",
    modelId: "nero-tria",
    serialNumber: null,
    registrationNumber: null,
    color: null,
    status: "active",
    commissionedAt: null,
    notes: "260 PS, 110 km/h. Sea-Doo 260 GTX Limited Edition.",
  },
  {
    id: "nero-tessera",
    label: "Nero Tessera",
    modelId: "nero-tessera",
    serialNumber: null,
    registrationNumber: null,
    color: null,
    status: "active",
    commissionedAt: null,
    notes: "260 PS, 110 km/h. Sea-Doo 260 GTX Limited Edition.",
  },
];

// ─── Homepage-Fleet-Display (Fleet2.astro) ──────────────────────────────
// Schlanke Struktur nur für die Produkt-Kacheln auf der Homepage.
// Wird aus `jetskis` abgeleitet damit keine Daten doppelt gehalten werden.

export interface JetskiModel2026 {
  id: string;
  brand: string;
  model: string;
  name: string;
  tagline: string;
  badge: string;
  hp: number;
  topSpeed: number;
  seats: number;
  recommendedSeats: number;
  image: string;
  accent: string;
  featured?: boolean;
  availableToday: number;
}

export const jetskiModels2026: JetskiModel2026[] = jetskis.map((j) => ({
  id: j.id,
  brand: j.brand,
  model: j.model,
  name: j.name,
  tagline: j.tagline,
  badge: j.featured
    ? `2026 · Supercharged · Flagship`
    : `2026 · Supercharged`,
  hp: j.hp,
  topSpeed: j.topSpeed,
  seats: j.seats,
  recommendedSeats: j.recommendedSeats,
  image: j.image,
  accent: j.accent,
  featured: j.featured,
  availableToday: j.availableToday,
}));

// ─── Globale Preis-Extras (nicht pro Jetski) ────────────────────────────

export const pricingExtras = {
  towableWaterFun: {
    pricePerPerson: 30,
    durationMin: 10,
    tubeModel: "Jobe Ridge Towable 3P",          // offizieller Flyer-Name
    tubeModelMarketing: "Great Big Mable",       // Marketing-Alias (3-Reifen-Tube)
    tubeSeats: 3,
    label: "Water Fun – Jobe Ridge Towable 3P (3 seats) behind the jetski",
  },
  // Kaution: 1.500 € nur bei VIP Delivery Service
  depositDelivery: 1500,
  // Kaution für Beach Rides am Dock: keine (laut Flyer: "No deposit is required for beach rides")
  depositStandard: 0,
  // Fuel-Hinweis (IMMER klein auf Preislisten)
  fuelNote: {
    en: "*without fuel — fuel billed separately at end of rental",
    de: "*ohne Benzin — Kraftstoff wird am Ende der Miete separat abgerechnet",
    gr: "*χωρίς καύσιμα — τα καύσιμα χρεώνονται στο τέλος της ενοικίασης",
  },
  // Sitze-Hinweis (IMMER klein auf Flotten-Section)
  seatsNote: {
    en: "*3-seater, but 2 persons recommended",
    de: "*3-Sitzer, aber 2 Personen empfohlen",
    gr: "*3θέσιο, αλλά συνιστώνται 2 άτομα",
  },
};
