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
    features: ["Adjustable riser", "iBR", "Ergolock handlebar", "Stunt-friendly"],
    image: "https://images.unsplash.com/photo-1625194398019-62a5362c1e52?w=1400&q=85&auto=format&fit=crop",
    accent: "#b8925a",
    availableToday: 2,
    totalUnits: 2,
  },
];
