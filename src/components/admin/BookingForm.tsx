import { useMemo, useState } from "react";
import { jetskis, jetskiUnits, pricingExtras, type Jetski } from "../../data/jetskis";

type ServiceCategory = "beach_rides" | "exclusive_experiences" | "vip_delivery";

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  beach_rides: "Beach Rides (10-60 min)",
  exclusive_experiences: "Exclusive Experiences",
  vip_delivery: "VIP Delivery Service",
};

function computeSuggestedPrice(
  jetski: Jetski,
  category: ServiceCategory,
  serviceType: string,
): number | null {
  if (category === "beach_rides") {
    const key = serviceType as keyof Jetski["beachRides"];
    return jetski.beachRides[key] ?? null;
  }
  if (category === "exclusive_experiences") {
    if (serviceType === "sunsetRide30") return jetski.exclusiveExperiences.sunsetRide30;
    if (serviceType === "coupleRide30") return jetski.exclusiveExperiences.coupleRide30;
  }
  if (category === "vip_delivery") {
    const key = serviceType as keyof Jetski["vipDelivery"];
    const val = jetski.vipDelivery[key];
    return typeof val === "number" ? val : null;
  }
  return null;
}

export default function BookingForm() {
  const [bookingDate, setBookingDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState("10:00");
  const [durationMin, setDurationMin] = useState(60);
  const [jetskiUnitId, setJetskiUnitId] = useState(jetskiUnits[0].id);
  const selectedUnit = jetskiUnits.find((u) => u.id === jetskiUnitId) ?? jetskiUnits[0];
  const jetskiId = selectedUnit.modelId;
  const [category, setCategory] = useState<ServiceCategory>("beach_rides");
  const [serviceType, setServiceType] = useState("min60");

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCountry, setCustomerCountry] = useState("");

  const [towablePersons, setTowablePersons] = useState<number | "">("");
  const [deliveryLocation, setDeliveryLocation] = useState("");

  const [priceOverride, setPriceOverride] = useState<string>("");
  const [depositOverride, setDepositOverride] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"pending" | "confirmed">("pending");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const jetski = jetskis.find((j) => j.id === jetskiId) ?? jetskis[0];

  const serviceTypeOptions = useMemo(() => {
    if (category === "beach_rides") {
      return [
        { v: "min10", l: "10 min", d: 10 },
        { v: "min15", l: "15 min", d: 15 },
        { v: "min20", l: "20 min", d: 20 },
        { v: "min30", l: "30 min", d: 30 },
        { v: "min60", l: "60 min", d: 60 },
      ];
    }
    if (category === "exclusive_experiences") {
      return [
        { v: "sunsetRide30", l: "Sunset Ride (30 min)", d: 30 },
        { v: "coupleRide30", l: "Couple Ride (30 min)", d: 30 },
      ];
    }
    if (category === "vip_delivery") {
      return [
        { v: "hour1", l: "1 hour", d: 60 },
        { v: "halfDay4h", l: "Half Day (4h)", d: 240 },
        { v: "fullDay8h", l: "Full Day (8h)", d: 480 },
        { v: "week", l: "Full week", d: 10080 },
      ];
    }
    return [];
  }, [category]);

  const suggestedPrice = computeSuggestedPrice(jetski, category, serviceType);
  const effectivePrice = priceOverride ? Number(priceOverride) : suggestedPrice;

  const defaultDeposit = useMemo(() => {
    if (category === "vip_delivery") return pricingExtras.depositDelivery;
    if (typeof effectivePrice === "number") return Math.round(effectivePrice * 0.3);
    return null;
  }, [category, effectivePrice]);
  const effectiveDeposit = depositOverride ? Number(depositOverride) : defaultDeposit;

  const handleCategoryChange = (c: ServiceCategory) => {
    setCategory(c);
    if (c === "beach_rides") {
      setServiceType("min60");
      setDurationMin(60);
    } else if (c === "exclusive_experiences") {
      setServiceType("sunsetRide30");
      setDurationMin(30);
    } else {
      setServiceType("hour1");
      setDurationMin(60);
    }
  };

  const handleServiceTypeChange = (st: string) => {
    setServiceType(st);
    const opt = serviceTypeOptions.find((o) => o.v === st);
    if (opt) setDurationMin(opt.d);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (effectivePrice === null) {
      setMessage({ type: "error", text: "Preis fehlt. Bitte manuell eingeben." });
      return;
    }

    setSubmitting(true);
    try {
      const body = {
        booking_date: bookingDate,
        start_time: startTime,
        duration_minutes: durationMin,
        jetski_id: jetskiId,
        jetski_unit_id: jetskiUnitId,
        service_category: category,
        service_type: serviceType,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        customer_country: customerCountry || undefined,
        towable_persons: towablePersons || undefined,
        delivery_location: deliveryLocation || undefined,
        total_price: effectivePrice,
        deposit_amount: effectiveDeposit ?? 0,
        status,
        notes: notes || undefined,
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Fehler beim Anlegen" });
        return;
      }

      setMessage({ type: "success", text: "Buchung angelegt! Weiterleitung…" });
      setTimeout(() => (window.location.href = "/admin/bookings"), 900);
    } catch (err) {
      setMessage({ type: "error", text: "Netzwerkfehler. Erneut versuchen." });
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.6rem 0.875rem",
    background: "rgba(253, 251, 244, 0.05)",
    border: "1px solid rgba(253, 251, 244, 0.15)",
    borderRadius: "8px",
    color: "#fdfbf4",
    fontSize: "0.95rem",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "rgba(253, 251, 244, 0.5)",
    marginBottom: "0.5rem",
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 800 }}>
      {/* Datum + Zeit + Dauer */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <label style={labelStyle}>Datum</label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Startzeit</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Dauer (Min)</label>
          <input
            type="number"
            value={durationMin}
            onChange={(e) => setDurationMin(Number(e.target.value))}
            min={1}
            required
            style={inputStyle}
          />
        </div>
      </div>

      {/* Jetski Unit (konkrete physische Einheit) */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle}>Welcher Jetski konkret</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {jetskiUnits.map((u) => {
            const model = jetskis.find((j) => j.id === u.modelId);
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => setJetskiUnitId(u.id)}
                style={{
                  padding: "0.875rem 1rem",
                  borderRadius: "8px",
                  border: jetskiUnitId === u.id ? "1px solid #ffc233" : "1px solid rgba(253,251,244,0.15)",
                  background: jetskiUnitId === u.id ? "rgba(255,194,51,0.1)" : "transparent",
                  color: "#fdfbf4",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <div style={{ fontFamily: "'Fraunces Variable', Georgia, serif", fontSize: "1.1rem" }}>{u.label}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(253,251,244,0.65)", marginTop: "0.2rem" }}>
                  {model?.model} · {model?.hp} HP
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Service-Kategorie + Typ */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <label style={labelStyle}>Kategorie</label>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value as ServiceCategory)}
            style={inputStyle}
          >
            {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
              <option key={v} value={v} style={{ background: "#071d30" }}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Option</label>
          <select
            value={serviceType}
            onChange={(e) => handleServiceTypeChange(e.target.value)}
            style={inputStyle}
          >
            {serviceTypeOptions.map((o) => (
              <option key={o.v} value={o.v} style={{ background: "#071d30" }}>
                {o.l}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kundendaten */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle}>Kunde Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <label style={labelStyle}>E-Mail</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Telefon</label>
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Land (optional)</label>
          <input
            type="text"
            value={customerCountry}
            onChange={(e) => setCustomerCountry(e.target.value)}
            placeholder="DE, AT, IT, GR…"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Conditional: Delivery */}
      {category === "vip_delivery" && (
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Lieferort (Strand, Boot, Yacht, Katamaran)</label>
          <input
            type="text"
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            placeholder="z.B. Porto Katsiki Beach"
            style={inputStyle}
          />
        </div>
      )}

      {/* Preis + Anzahlung */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <label style={labelStyle}>
            Preis (€)
            {suggestedPrice !== null && (
              <span style={{ textTransform: "none", letterSpacing: "normal", color: "rgba(253,251,244,0.4)", marginLeft: "0.5rem" }}>
                Vorschlag: €{suggestedPrice}
              </span>
            )}
          </label>
          <input
            type="number"
            value={priceOverride}
            onChange={(e) => setPriceOverride(e.target.value)}
            placeholder={suggestedPrice !== null ? String(suggestedPrice) : "Preis fehlt, manuell eingeben"}
            step="0.01"
            required={suggestedPrice === null}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>
            Anzahlung (€)
            {defaultDeposit !== null && (
              <span style={{ textTransform: "none", letterSpacing: "normal", color: "rgba(253,251,244,0.4)", marginLeft: "0.5rem" }}>
                Vorschlag: €{defaultDeposit}
              </span>
            )}
          </label>
          <input
            type="number"
            value={depositOverride}
            onChange={(e) => setDepositOverride(e.target.value)}
            placeholder={defaultDeposit !== null ? String(defaultDeposit) : ""}
            step="0.01"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Status */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle}>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value as any)} style={inputStyle}>
          <option value="pending" style={{ background: "#071d30" }}>Ausstehend (noch nicht bezahlt)</option>
          <option value="confirmed" style={{ background: "#071d30" }}>Bestätigt (Anzahlung eingegangen)</option>
        </select>
      </div>

      {/* Notizen */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle}>Notizen (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
          placeholder="Besonderheiten, Uhrzeit-Absprachen, Gruppengröße…"
        />
      </div>

      {/* Submit */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "0.875rem 2rem",
            background: "#ffc233",
            color: "#071d30",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.5 : 1,
          }}
        >
          {submitting ? "Speichere…" : "Buchung anlegen"}
        </button>
        <a
          href="/admin/bookings"
          style={{
            padding: "0.875rem 1.5rem",
            color: "rgba(253,251,244,0.7)",
            textDecoration: "none",
            fontSize: "0.9rem",
          }}
        >
          Abbrechen
        </a>
      </div>

      {message && (
        <div
          style={{
            marginTop: "1.25rem",
            padding: "0.875rem 1.25rem",
            borderRadius: "8px",
            background: message.type === "error" ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)",
            border: `1px solid ${message.type === "error" ? "rgba(239,68,68,0.4)" : "rgba(34,197,94,0.4)"}`,
            color: message.type === "error" ? "#fca5a5" : "#86efac",
            fontSize: "0.9rem",
          }}
        >
          {message.text}
        </div>
      )}
    </form>
  );
}
