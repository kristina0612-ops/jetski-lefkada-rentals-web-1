import { useMemo, useState } from "react";
import { jetskis, pricingExtras, vatFromGross, VAT_RATE, type Jetski } from "../data/jetskis";

type Category = "beach" | "exclusive" | "delivery" | "waterFun";
type Lang = "en" | "de" | "gr";

const WHATSAPP_BASE = "https://wa.me/306955612777?text=";

interface PriceResult {
  price: number | null;
  unit: string;
  label: string;
  whatsappMsg: string;
}

// UI-Labels pro Sprache. GR fällt bis zur EL-Gegenlese auf EN zurück.
// WhatsApp-Texte bleiben EN weil David sie auf Englisch liest.
const UI = {
  en: {
    eyebrow: "Price calculator",
    title: "Find your price.",
    yourJetski: "Your jetski",
    service: "Service",
    duration: "Duration",
    tube: "Tube",
    persons: "Persons",
    seats: "seats",
    onRequest: "On request",
    quoteHint: "WhatsApp David for a quote.",
    vatIncl: (vat: number, amount: string) => `incl. ${vat}% VAT · €${amount}`,
    depositHint: (deposit: number) =>
      `Note: VIP Delivery requires a €${deposit} security deposit. Fuel not included.`,
    btn: "WhatsApp David to book",
    categories: { beach: "Beach Rides", exclusive: "Exclusive", delivery: "VIP Delivery", waterFun: "Water Fun" },
    durations: {
      min10: "10 min", min15: "15 min (BEST)", min20: "20 min", min30: "30 min", min60: "60 min (BESTSELLER)",
      sunset: "Sunset Ride (30 min)", couple: "Couple Ride (30 min)",
      hour1: "1 hour", halfDay4h: "Half Day (4h)", fullDay8h: "Full Day (8h)", week: "Full week",
      tube: "3-seat tube · 10 min (Great Big Mable)",
    },
  },
  de: {
    eyebrow: "Preisrechner",
    title: "Finde Deinen Preis.",
    yourJetski: "Dein Jetski",
    service: "Service",
    duration: "Dauer",
    tube: "Tube",
    persons: "Personen",
    seats: "Sitze",
    onRequest: "Auf Anfrage",
    quoteHint: "WhatsApp David für ein Angebot.",
    vatIncl: (vat: number, amount: string) => `inkl. ${vat}% MwSt · €${amount}`,
    depositHint: (deposit: number) =>
      `Hinweis: VIP-Delivery benötigt €${deposit} Kaution. Treibstoff nicht inkludiert.`,
    btn: "Per WhatsApp buchen",
    categories: { beach: "Beach Rides", exclusive: "Exclusive", delivery: "VIP Delivery", waterFun: "Water Fun" },
    durations: {
      min10: "10 Min.", min15: "15 Min. (TOP)", min20: "20 Min.", min30: "30 Min.", min60: "60 Min. (BESTSELLER)",
      sunset: "Sunset-Ride (30 Min.)", couple: "Couple-Ride (30 Min.)",
      hour1: "1 Stunde", halfDay4h: "Halber Tag (4h)", fullDay8h: "Ganzer Tag (8h)", week: "Ganze Woche",
      tube: "3-Sitz-Tube · 10 Min. (Great Big Mable)",
    },
  },
  gr: {
    eyebrow: "Price calculator",
    title: "Find your price.",
    yourJetski: "Your jetski",
    service: "Service",
    duration: "Duration",
    tube: "Tube",
    persons: "Persons",
    seats: "seats",
    onRequest: "On request",
    quoteHint: "WhatsApp David for a quote.",
    vatIncl: (vat: number, amount: string) => `incl. ${vat}% VAT · €${amount}`,
    depositHint: (deposit: number) =>
      `Note: VIP Delivery requires a €${deposit} security deposit. Fuel not included.`,
    btn: "WhatsApp David to book",
    categories: { beach: "Beach Rides", exclusive: "Exclusive", delivery: "VIP Delivery", waterFun: "Water Fun" },
    durations: {
      min10: "10 min", min15: "15 min (BEST)", min20: "20 min", min30: "30 min", min60: "60 min (BESTSELLER)",
      sunset: "Sunset Ride (30 min)", couple: "Couple Ride (30 min)",
      hour1: "1 hour", halfDay4h: "Half Day (4h)", fullDay8h: "Full Day (8h)", week: "Full week",
      tube: "3-seat tube · 10 min (Great Big Mable)",
    },
  },
} as const;

function computePrice(
  jetski: Jetski,
  category: Category,
  option: string,
  persons: number,
): PriceResult {
  if (category === "beach") {
    const map: Record<string, keyof Jetski["beachRides"]> = {
      min10: "min10",
      min15: "min15",
      min20: "min20",
      min30: "min30",
      min60: "min60",
    };
    const key = map[option];
    const price = key ? jetski.beachRides[key] : null;
    const labels: Record<string, string> = {
      min10: "10 min",
      min15: "15 min",
      min20: "20 min",
      min30: "30 min",
      min60: "60 min",
    };
    return {
      price,
      unit: "",
      label: `${jetski.name} · Beach Ride ${labels[option]}`,
      whatsappMsg: `Hi David, I'd like to book a Beach Ride on the ${jetski.name} (${labels[option]}).`,
    };
  }

  if (category === "exclusive") {
    if (option === "sunset") {
      return {
        price: jetski.exclusiveExperiences.sunsetRide30,
        unit: "",
        label: `${jetski.name} · Sunset Ride (30 min)`,
        whatsappMsg: `Hi David, I'd like to book a Sunset Ride on the ${jetski.name} (30 min).`,
      };
    }
    if (option === "couple") {
      return {
        price: jetski.exclusiveExperiences.coupleRide30,
        unit: "",
        label: `${jetski.name} · Couple Ride (30 min)`,
        whatsappMsg: `Hi David, I'd like to book a Couple Ride on the ${jetski.name} (30 min).`,
      };
    }
  }

  if (category === "delivery") {
    const map: Record<string, keyof Jetski["vipDelivery"]> = {
      hour1: "hour1",
      halfDay4h: "halfDay4h",
      fullDay8h: "fullDay8h",
      week: "week",
    };
    const key = map[option];
    const rawVal = key ? jetski.vipDelivery[key] : null;
    const labels: Record<string, string> = {
      hour1: "1 hour",
      halfDay4h: "half day (4h)",
      fullDay8h: "full day (8h)",
      week: "full week",
    };
    if (rawVal === "onRequest") {
      return {
        price: null,
        unit: "",
        label: `${jetski.name} · VIP Delivery · ${labels[option]}`,
        whatsappMsg: `Hi David, I'd like a quote for a VIP Delivery booking (${jetski.name}, ${labels[option]}).`,
      };
    }
    return {
      price: typeof rawVal === "number" ? rawVal : null,
      unit: "",
      label: `${jetski.name} · VIP Delivery · ${labels[option]}`,
      whatsappMsg: `Hi David, I'd like to book VIP Delivery on the ${jetski.name} (${labels[option]}).`,
    };
  }

  if (category === "waterFun") {
    const perPerson = pricingExtras.towableWaterFun.pricePerPerson;
    const total = perPerson * Math.max(1, persons);
    return {
      price: total,
      unit: ` (${persons}× €${perPerson}/person)`,
      label: `Water Fun · ${persons} person${persons === 1 ? "" : "s"}`,
      whatsappMsg: `Hi David, I'd like to book Water Fun for ${persons} person${persons === 1 ? "" : "s"} (€${total} total).`,
    };
  }

  return {
    price: null,
    unit: "",
    label: "",
    whatsappMsg: "Hi David, I'd like more info about your jetski options.",
  };
}

interface CalculatorProps {
  lang?: Lang;
}

export default function Calculator({ lang = "en" }: CalculatorProps) {
  const t = UI[lang];

  const [jetskiId, setJetskiId] = useState(jetskis[0].id);
  const [category, setCategory] = useState<Category>("beach");
  const [option, setOption] = useState<string>("min30");
  const [persons, setPersons] = useState<number>(2);

  const jetski = jetskis.find((j) => j.id === jetskiId) ?? jetskis[0];

  const optionSets: Record<Category, Array<{ value: string; label: string }>> = {
    beach: [
      { value: "min10", label: t.durations.min10 },
      { value: "min15", label: t.durations.min15 },
      { value: "min20", label: t.durations.min20 },
      { value: "min30", label: t.durations.min30 },
      { value: "min60", label: t.durations.min60 },
    ],
    exclusive: [
      { value: "sunset", label: t.durations.sunset },
      { value: "couple", label: t.durations.couple },
    ],
    delivery: [
      { value: "hour1", label: t.durations.hour1 },
      { value: "halfDay4h", label: t.durations.halfDay4h },
      { value: "fullDay8h", label: t.durations.fullDay8h },
      { value: "week", label: t.durations.week },
    ],
    waterFun: [{ value: "tube", label: t.durations.tube }],
  };

  const result = useMemo(
    () => computePrice(jetski, category, option, persons),
    [jetski, category, option, persons],
  );

  const handleCategoryChange = (c: Category) => {
    setCategory(c);
    setOption(optionSets[c][0].value);
  };

  const depositDelivery = pricingExtras.depositDelivery;
  const showDepositHint = category === "delivery";

  return (
    <div
      className="rounded-2xl border p-5 sm:p-8 lg:p-10"
      style={{
        borderColor: "rgba(253,251,244,0.15)",
        background: "rgba(253,251,244,0.04)",
      }}
    >
      <div
        className="v2-eyebrow mb-3"
        style={{ color: "var(--v2-sun-400)" }}
      >
        <span>{t.eyebrow}</span>
      </div>
      <h3
        className="font-display text-3xl lg:text-4xl mb-8"
        style={{ color: "var(--v2-cream-50)" }}
      >
        {t.title}
      </h3>

      {/* Jetski */}
      <div className="mb-6">
        <label
          className="block text-xs uppercase tracking-[0.15em] mb-3"
          style={{ color: "rgba(253,251,244,0.65)" }}
        >
          {t.yourJetski}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {jetskis.map((j) => (
            <button
              key={j.id}
              type="button"
              onClick={() => setJetskiId(j.id)}
              className={`p-3 sm:p-4 rounded-xl border text-left transition-colors ${
                jetskiId === j.id
                  ? "border-[var(--v2-sun-400)] bg-[rgba(255,194,51,0.1)]"
                  : "border-white/15 hover:border-white/40"
              }`}
            >
              <div
                className="font-display text-lg sm:text-xl"
                style={{ color: "var(--v2-cream-50)" }}
              >
                {j.name}
              </div>
              <div
                className="text-[10px] sm:text-xs mt-1 leading-tight"
                style={{ color: "rgba(253,251,244,0.65)" }}
              >
                {j.model} · {j.hp} HP · {j.seats} {t.seats}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label
          className="block text-xs uppercase tracking-[0.15em] mb-3"
          style={{ color: "rgba(253,251,244,0.65)" }}
        >
          {t.service}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(
            [
              { v: "beach", l: t.categories.beach },
              { v: "exclusive", l: t.categories.exclusive },
              { v: "delivery", l: t.categories.delivery },
              { v: "waterFun", l: t.categories.waterFun },
            ] as const
          ).map((c) => (
            <button
              key={c.v}
              type="button"
              onClick={() => handleCategoryChange(c.v)}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                category === c.v
                  ? "bg-[var(--v2-sun-400)] text-[var(--v2-ink-950)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {c.l}
            </button>
          ))}
        </div>
      </div>

      {/* Option / Duration */}
      <div className="mb-6">
        <label
          className="block text-xs uppercase tracking-[0.15em] mb-3"
          style={{ color: "rgba(253,251,244,0.65)" }}
        >
          {category === "waterFun" ? t.tube : t.duration}
        </label>
        <select
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[var(--v2-sun-400)]"
        >
          {optionSets[category].map((o) => (
            <option
              key={o.value}
              value={o.value}
              style={{ background: "var(--v2-ink-950)" }}
            >
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Persons (Water Fun only) */}
      {category === "waterFun" && (
        <div className="mb-6">
          <label
            className="block text-xs uppercase tracking-[0.15em] mb-3"
            style={{ color: "rgba(253,251,244,0.65)" }}
          >
            {t.persons}
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPersons(Math.max(1, persons - 1))}
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 text-white hover:bg-white/10"
              aria-label="Minus"
            >
              −
            </button>
            <div
              className="text-2xl font-display min-w-[3rem] text-center"
              style={{ color: "var(--v2-cream-50)" }}
            >
              {persons}
            </div>
            <button
              type="button"
              onClick={() => setPersons(Math.min(6, persons + 1))}
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 text-white hover:bg-white/10"
              aria-label="Plus"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Price display */}
      <div className="py-6 border-t border-white/15 mb-6">
        {result.price !== null ? (
          <>
            <div
              className="font-display text-5xl lg:text-6xl"
              style={{ color: "var(--v2-sun-400)" }}
            >
              €{result.price}
              <span
                className="text-base opacity-70 font-sans"
                style={{ color: "rgba(253,251,244,0.65)" }}
              >
                {result.unit}
              </span>
            </div>
            <div
              className="text-sm mt-2"
              style={{ color: "rgba(253,251,244,0.65)" }}
            >
              {result.label}
            </div>
            <div
              className="text-xs mt-1 font-mono uppercase tracking-wider"
              style={{ color: "rgba(253,251,244,0.45)" }}
            >
              {t.vatIncl(Math.round(VAT_RATE * 100), vatFromGross(result.price).toFixed(2).replace(".", ","))}
            </div>
          </>
        ) : (
          <div>
            <div
              className="font-display text-3xl lg:text-4xl italic"
              style={{ color: "var(--v2-sun-400)" }}
            >
              {t.onRequest}
            </div>
            <div
              className="text-sm mt-2"
              style={{ color: "rgba(253,251,244,0.65)" }}
            >
              {t.quoteHint}
            </div>
          </div>
        )}
        {showDepositHint && (
          <div
            className="text-xs mt-4 p-3 rounded-lg"
            style={{
              background: "rgba(255,194,51,0.08)",
              color: "rgba(253,251,244,0.8)",
            }}
          >
            {t.depositHint(depositDelivery)}
          </div>
        )}
      </div>

      {/* WhatsApp — Mobile: schmaler, whitespace-normal damit Button im Container bleibt */}
      <a
        href={WHATSAPP_BASE + encodeURIComponent(result.whatsappMsg)}
        target="_blank"
        rel="noopener"
        className="v2-btn w-full justify-center !px-3 sm:!px-8 !py-3 sm:!py-[1.1rem] !text-[11px] sm:!text-sm !gap-2 whitespace-normal text-center"
        style={{
          background: "var(--v2-sun-400)",
          color: "var(--v2-ink-950)",
        }}
        data-cro="v2-calculator-whatsapp"
      >
        <span>{t.btn}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
        </svg>
      </a>
    </div>
  );
}
