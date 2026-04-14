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
    id: "yamaha-vx-cruiser",
    name: "The Cruiser",
    tagline: "Built for hours, not minutes",
    brand: "Yamaha",
    model: "VX Cruiser HO",
    year: 2024,
    seats: 3,
    hp: 180,
    topSpeed: 104,
    pricePerHour: 95,
    priceHalfDay: 290,
    priceFullDay: 490,
    features: ["Bluetooth audio", "Cruise assist", "RiDE reverse", "Tilt steering"],
    image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=1400&q=85&auto=format&fit=crop",
    accent: "#ff5a36",
    availableToday: 2,
    totalUnits: 2,
  },
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
    availableToday: 1,
    totalUnits: 2,
  },
  {
    id: "yamaha-fx-svho",
    name: "The Voyager",
    tagline: "Island-hopping. Refined",
    brand: "Yamaha",
    model: "FX SVHO",
    year: 2024,
    seats: 3,
    hp: 250,
    topSpeed: 107,
    pricePerHour: 120,
    priceHalfDay: 360,
    priceFullDay: 590,
    features: ["Nanoxcel 2 hull", "6.8'' display", "Heated seat option", "Fuel-smart"],
    image: "https://images.unsplash.com/photo-1569251898438-7a87f2f49bf9?w=1400&q=85&auto=format&fit=crop",
    accent: "#4a90b8",
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
    availableToday: 0,
    totalUnits: 2,
  },
];
