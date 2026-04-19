import { useMemo, useState } from "react";
import { jetskis, pricingExtras, type Jetski } from "../data/jetskis";

type Category = "beach" | "exclusive" | "delivery" | "waterFun";

const WHATSAPP_BASE = "https://wa.me/306955612777?text=";

interface PriceResult {
  price: number | null;
  unit: string;
  label: string;
  whatsappMsg: string;
}

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

export default function Calculator() {
  const [jetskiId, setJetskiId] = useState(jetskis[0].id);
  const [category, setCategory] = useState<Category>("beach");
  const [option, setOption] = useState<string>("min30");
  const [persons, setPersons] = useState<number>(2);

  const jetski = jetskis.find((j) => j.id === jetskiId) ?? jetskis[0];

  const optionSets: Record<Category, Array<{ value: string; label: string }>> = {
    beach: [
      { value: "min10", label: "10 min" },
      { value: "min15", label: "15 min (BEST)" },
      { value: "min20", label: "20 min" },
      { value: "min30", label: "30 min" },
      { value: "min60", label: "60 min (BESTSELLER)" },
    ],
    exclusive: [
      { value: "sunset", label: "Sunset Ride (30 min)" },
      { value: "couple", label: "Couple Ride (30 min)" },
    ],
    delivery: [
      { value: "hour1", label: "1 hour" },
      { value: "halfDay4h", label: "Half Day (4h)" },
      { value: "fullDay8h", label: "Full Day (8h)" },
      { value: "week", label: "Full week" },
    ],
    waterFun: [{ value: "tube", label: "3-seat tube · 10 min (Great Big Mable)" }],
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
      className="rounded-2xl border p-8 lg:p-10"
      style={{
        borderColor: "rgba(253,251,244,0.15)",
        background: "rgba(253,251,244,0.04)",
      }}
    >
      <div
        className="v2-eyebrow mb-3"
        style={{ color: "var(--v2-sun-400)" }}
      >
        <span>Price calculator</span>
      </div>
      <h3
        className="font-display text-3xl lg:text-4xl mb-8"
        style={{ color: "var(--v2-cream-50)" }}
      >
        Find your price.
      </h3>

      {/* Jetski */}
      <div className="mb-6">
        <label
          className="block text-xs uppercase tracking-[0.15em] mb-3"
          style={{ color: "rgba(253,251,244,0.65)" }}
        >
          Your jetski
        </label>
        <div className="grid grid-cols-2 gap-3">
          {jetskis.map((j) => (
            <button
              key={j.id}
              type="button"
              onClick={() => setJetskiId(j.id)}
              className={`p-4 rounded-xl border text-left transition-colors ${
                jetskiId === j.id
                  ? "border-[var(--v2-sun-400)] bg-[rgba(255,194,51,0.1)]"
                  : "border-white/15 hover:border-white/40"
              }`}
            >
              <div
                className="font-display text-xl"
                style={{ color: "var(--v2-cream-50)" }}
              >
                {j.name}
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: "rgba(253,251,244,0.65)" }}
              >
                {j.model} · {j.hp} HP · {j.seats} seats
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
          Service
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(
            [
              { v: "beach", l: "Beach Rides" },
              { v: "exclusive", l: "Exclusive" },
              { v: "delivery", l: "VIP Delivery" },
              { v: "waterFun", l: "Water Fun" },
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
          {category === "waterFun" ? "Tube" : "Duration"}
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
            Persons
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
          </>
        ) : (
          <div>
            <div
              className="font-display text-3xl lg:text-4xl italic"
              style={{ color: "var(--v2-sun-400)" }}
            >
              On request
            </div>
            <div
              className="text-sm mt-2"
              style={{ color: "rgba(253,251,244,0.65)" }}
            >
              WhatsApp David for a quote.
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
            Note: VIP Delivery requires a €{depositDelivery} security deposit.
            Fuel not included.
          </div>
        )}
      </div>

      {/* WhatsApp */}
      <a
        href={WHATSAPP_BASE + encodeURIComponent(result.whatsappMsg)}
        target="_blank"
        rel="noopener"
        className="v2-btn w-full justify-center"
        style={{
          background: "var(--v2-sun-400)",
          color: "var(--v2-ink-950)",
        }}
        data-cro="v2-calculator-whatsapp"
      >
        WhatsApp David to book
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
