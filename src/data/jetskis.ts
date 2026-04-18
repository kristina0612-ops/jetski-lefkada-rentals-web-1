// Preistypen-Hinweis für alle Agenten:
// - Stand 2026-04-18: Flyer-Preise sind für BEIDE Jetskis IDENTISCH (von Kristina bestätigt).
// - Stunden-/Halbtag-/Ganztag-Preise bleiben UNTERSCHIEDLICH pro Jetski (Classic-Preise).
// - Beach Rides, Exclusive Experiences, VIP Delivery: gleich teuer bei Challenger + Acrobat.
// - Water Fun: 30€/Person, Jobe Ridge III (3 Sitze).
//
// FLOTTE: Wir haben 4 PHYSISCHE Einheiten (2× Challenger + 2× Acrobat).
// Buchungen, Umsatzanalyse und Kalender arbeiten auf Unit-Ebene (jetski_unit_id),
// nicht auf Modell-Ebene (jetski_id). Der fleet-utilization-analyst-Agent
// aggregiert Umsatz + Auslastung pro Unit.

export interface BeachRides {
  min10: number | null;
  min15: number | null;
  min20: number | null;
  min30: number | null;
  min60: number | null;
}

export interface ExclusiveExperiences {
  sunsetRide30: number | null;
  coupleRide30: number | null;
}

export interface VipDelivery {
  hour1: number | null;
  halfDay4h: number | null;
  fullDay8h: number | null;
  week: number | "onRequest" | null;
}

export interface JetskiUnit {
  id: string; // z.B. "challenger-1", "acrobat-2"
  label: string; // z.B. "Challenger #1", "Acrobat Gelb"
  modelId: string; // FK zu Jetski.id (seadoo-rxtx | seadoo-spark-trixx)
  serialNumber: string | null; // Hersteller-Seriennummer, später füllen
  registrationNumber: string | null; // griechische ΛΣ-Registrierung, später füllen
  color: string | null; // z.B. "yellow-black", "cream"
  status: "active" | "maintenance" | "retired";
  commissionedAt: string | null; // YYYY-MM-DD, wann in Dienst gestellt
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
  hp: number;
  topSpeed: number;
  pricePerHour: number;
  priceHalfDay: number;
  priceFullDay: number;
  beachRides: BeachRides;
  exclusiveExperiences: ExclusiveExperiences;
  vipDelivery: VipDelivery;
  features: string[];
  image: string;
  accent: string;
  availableToday: number;
  totalUnits: number;
}

export const jetskis: Jetski[] = [
  {
    id: "seadoo-rxtx",
    name: "The Challenger",
    tagline: "300 horses say hello",
    brand: "Sea-Doo",
    model: "RXT-X 300",
    year: 2024,
    seats: 3,
    hp: 300,
    topSpeed: 110,
    pricePerHour: 140,
    priceHalfDay: 420,
    priceFullDay: 690,
    beachRides: {
      min10: 80,
      min15: 90,
      min20: 100,
      min30: 130,
      min60: 200,
    },
    exclusiveExperiences: {
      sunsetRide30: 130,
      coupleRide30: 150,
    },
    vipDelivery: {
      hour1: 350,
      halfDay4h: 450,
      fullDay8h: 650,
      week: "onRequest",
    },
    features: ["Ergolock race seat", "Launch control", "iBR brake", "T3-R hull"],
    image: "https://images.unsplash.com/photo-1595351298020-038700609878?w=1400&q=85&auto=format&fit=crop",
    accent: "#ffa500",
    availableToday: 2,
    totalUnits: 2,
  },
  {
    id: "seadoo-spark-trixx",
    name: "The Acrobat",
    tagline: "Pure playfulness",
    brand: "Sea-Doo",
    model: "Spark Trixx",
    year: 2024,
    seats: 2,
    hp: 90,
    topSpeed: 80,
    pricePerHour: 70,
    priceHalfDay: 210,
    priceFullDay: 350,
    beachRides: {
      min10: 80,
      min15: 90,
      min20: 100,
      min30: 130,
      min60: 200,
    },
    exclusiveExperiences: {
      sunsetRide30: 130,
      coupleRide30: 150,
    },
    vipDelivery: {
      hour1: 350,
      halfDay4h: 450,
      fullDay8h: 650,
      week: "onRequest",
    },
    features: ["Adjustable riser", "iBR", "Ergolock handlebar", "Stunt-friendly"],
    image: "https://images.unsplash.com/photo-1625194398019-62a5362c1e52?w=1400&q=85&auto=format&fit=crop",
    accent: "#b8925a",
    availableToday: 2,
    totalUnits: 2,
  },
];

// FLOTTEN-EINHEITEN — 4 physische Jetskis
// Jede Buchung referenziert GENAU eine Unit. Labels/Seriennummern liefert Kristina nach.
export const jetskiUnits: JetskiUnit[] = [
  {
    id: "challenger-1",
    label: "Challenger #1",
    modelId: "seadoo-rxtx",
    serialNumber: null,
    registrationNumber: null,
    color: null,
    status: "active",
    commissionedAt: null,
  },
  {
    id: "challenger-2",
    label: "Challenger #2",
    modelId: "seadoo-rxtx",
    serialNumber: null,
    registrationNumber: null,
    color: null,
    status: "active",
    commissionedAt: null,
  },
  {
    id: "acrobat-1",
    label: "Acrobat #1",
    modelId: "seadoo-spark-trixx",
    serialNumber: null,
    registrationNumber: null,
    color: null,
    status: "active",
    commissionedAt: null,
  },
  {
    id: "acrobat-2",
    label: "Acrobat #2",
    modelId: "seadoo-spark-trixx",
    serialNumber: null,
    registrationNumber: null,
    color: null,
    status: "active",
    commissionedAt: null,
  },
];

// Globale Preisextras (nicht pro Jetski)
export const pricingExtras = {
  towableWaterFun: {
    pricePerPerson: 30,
    durationMin: 10,
    tubeModel: "Jobe Ridge III",
    tubeSeats: 3,
    label: "Water Fun – Jobe Ridge III Tubing (3 Sitze) hinter dem Jetski",
  },
  // Kaution: 1.500 € nur bei VIP Delivery Service
  // Quelle: Flyer 2026 ("Deposit: 1,500 € (delivery only)")
  depositDelivery: 1500,
  // Kaution für Beach Rides am Dock: Wert wartet auf Kristina/David
  depositStandard: null as number | null,
};
