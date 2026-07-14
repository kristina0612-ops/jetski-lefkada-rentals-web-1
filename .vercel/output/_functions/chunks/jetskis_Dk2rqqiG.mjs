const VAT_RATE = 0.24;
const netFromGross = (gross) => Math.round(gross / (1 + VAT_RATE) * 100) / 100;
const vatFromGross = (gross) => Math.round((gross - netFromGross(gross)) * 100) / 100;
const COMMON_BEACH_RIDES = {
  min10: 80,
  min15: 90,
  min20: 100,
  min30: 130,
  min60: 200
};
const COMMON_EXCLUSIVE = {
  sunsetRide30: 130,
  // 1 Person
  coupleRide30: 150
  // 2 Personen
};
const COMMON_VIP_DELIVERY = {
  hour1: 350,
  halfDay4h: 450,
  fullDay8h: 650,
  week: "onRequest"
};
const COMMON_FEATURES_GTX = [
  "Intelligent Brake & Reverse (iBR)",
  "Ergolock seat",
  "Bluetooth Audio",
  "LinQ attachment system"
];
const COMMON_FEATURES_RXT_RS = [
  "Riva Racing tuning",
  "Launch control",
  "T3-R hull",
  "Race-tuned exhaust"
];
const jetskis = [
  {
    id: "nero-ena",
    name: "Nero Ena",
    tagline: "The flagship. Fastest on the island.",
    brand: "Sea-Doo",
    model: "260 GTX Limited Edition Supercharged",
    year: 2026,
    seats: 3,
    recommendedSeats: 2,
    hp: 310,
    topSpeed: 120,
    pricePerHour: 200,
    // = 60-min Beach Ride
    priceHalfDay: null,
    priceFullDay: null,
    beachRides: COMMON_BEACH_RIDES,
    exclusiveExperiences: COMMON_EXCLUSIVE,
    vipDelivery: COMMON_VIP_DELIVERY,
    features: COMMON_FEATURES_GTX,
    image: "/images/fleet/nero-ena.jpg",
    accent: "#ffc233",
    availableToday: 1,
    totalUnits: 1,
    featured: true
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
    image: "/images/fleet/nero-tessera.jpg",
    accent: "#4fb3bf",
    availableToday: 1,
    totalUnits: 1
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
    image: "/images/fleet/nero-dio-2026.jpg",
    accent: "#ff5a36",
    availableToday: 1,
    totalUnits: 1
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
    image: "/images/fleet/nero-tria.jpg",
    accent: "#00b3a7",
    availableToday: 1,
    totalUnits: 1
  }
];
const jetskiUnits = [
  {
    id: "nero-ena",
    label: "Nero Ena",
    modelId: "nero-ena",
    serialNumber: null,
    registrationNumber: null,
    color: "grey-black (2026 repaint)",
    status: "active",
    commissionedAt: null,
    notes: "Flaggschiff: 310 PS, 120 km/h. Sea-Doo 260 GTX Limited Edition. 2026 neu lackiert in grey-black."
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
    notes: "Race-tuned: 260 PS, 110 km/h. Sea-Doo 260 RXT RS Riva Racing."
  },
  {
    id: "nero-tria",
    label: "Nero Tria",
    modelId: "nero-tria",
    serialNumber: null,
    registrationNumber: null,
    color: "grey-black (2026 repaint)",
    status: "active",
    commissionedAt: null,
    notes: "260 PS, 110 km/h. Sea-Doo 260 GTX Limited Edition. 2026 neu lackiert in grey-black."
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
    notes: "260 PS, 110 km/h. Sea-Doo 260 GTX Limited Edition."
  }
];
jetskis.map((j) => ({
  id: j.id,
  brand: j.brand,
  model: j.model,
  name: j.name,
  tagline: j.tagline,
  badge: j.featured ? `2026 · Supercharged · Flagship` : `2026 · Supercharged`,
  hp: j.hp,
  topSpeed: j.topSpeed,
  seats: j.seats,
  recommendedSeats: j.recommendedSeats,
  image: j.image,
  accent: j.accent,
  featured: j.featured,
  availableToday: j.availableToday
}));
const pricingExtras = {
  towableWaterFun: {
    pricePerPerson: 30},
  // Kaution: 1.500 € nur bei VIP Delivery Service
  depositDelivery: 1500,
  // Sitze-Hinweis (IMMER klein auf Flotten-Section)
  seatsNote: {
    en: "*3-seater, but 2 persons recommended",
    de: "*3-Sitzer, aber 2 Personen empfohlen",
    gr: "*3θέσιο, αλλά συνιστώνται 2 άτομα"
  }
};

export { VAT_RATE as V, jetskis as a, jetskiUnits as j, netFromGross as n, pricingExtras as p, vatFromGross as v };
