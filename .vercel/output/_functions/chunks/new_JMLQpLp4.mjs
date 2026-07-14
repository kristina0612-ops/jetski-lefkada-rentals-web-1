import { c as createComponent } from './astro-component_crrHDtXr.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_C6QB6PI8.mjs';
import { r as renderComponent } from './entrypoint_CNYytdjO.mjs';
import { $ as $$AdminShell } from './AdminShell_BYMkLdeD.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { j as jetskiUnits, a as jetskis, p as pricingExtras } from './jetskis_Dk2rqqiG.mjs';

const CATEGORY_LABELS = {
  beach_rides: "Beach Rides (10-60 min)",
  exclusive_experiences: "Exclusive Experiences",
  vip_delivery: "VIP Delivery Service"
};
function computeSuggestedPrice(jetski, category, serviceType) {
  if (category === "beach_rides") {
    const key = serviceType;
    return jetski.beachRides[key] ?? null;
  }
  if (category === "exclusive_experiences") {
    if (serviceType === "sunsetRide30") return jetski.exclusiveExperiences.sunsetRide30;
    if (serviceType === "coupleRide30") return jetski.exclusiveExperiences.coupleRide30;
  }
  if (category === "vip_delivery") {
    const key = serviceType;
    const val = jetski.vipDelivery[key];
    return typeof val === "number" ? val : null;
  }
  return null;
}
function BookingForm() {
  const [bookingDate, setBookingDate] = useState(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState("10:00");
  const [durationMin, setDurationMin] = useState(60);
  const [jetskiUnitId, setJetskiUnitId] = useState(jetskiUnits[0].id);
  const selectedUnit = jetskiUnits.find((u) => u.id === jetskiUnitId) ?? jetskiUnits[0];
  const jetskiId = selectedUnit.modelId;
  const [category, setCategory] = useState("beach_rides");
  const [serviceType, setServiceType] = useState("min60");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCountry, setCustomerCountry] = useState("");
  const [towablePersons, setTowablePersons] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [priceOverride, setPriceOverride] = useState("");
  const [depositOverride, setDepositOverride] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("pending");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const jetski = jetskis.find((j) => j.id === jetskiId) ?? jetskis[0];
  const serviceTypeOptions = useMemo(() => {
    if (category === "beach_rides") {
      return [
        { v: "min10", l: "10 min", d: 10 },
        { v: "min15", l: "15 min", d: 15 },
        { v: "min20", l: "20 min", d: 20 },
        { v: "min30", l: "30 min", d: 30 },
        { v: "min60", l: "60 min", d: 60 }
      ];
    }
    if (category === "exclusive_experiences") {
      return [
        { v: "sunsetRide30", l: "Sunset Ride (30 min)", d: 30 },
        { v: "coupleRide30", l: "Couple Ride (30 min)", d: 30 }
      ];
    }
    if (category === "vip_delivery") {
      return [
        { v: "hour1", l: "1 hour", d: 60 },
        { v: "halfDay4h", l: "Half Day (4h)", d: 240 },
        { v: "fullDay8h", l: "Full Day (8h)", d: 480 },
        { v: "week", l: "Full week", d: 10080 }
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
  const handleCategoryChange = (c) => {
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
  const handleServiceTypeChange = (st) => {
    setServiceType(st);
    const opt = serviceTypeOptions.find((o) => o.v === st);
    if (opt) setDurationMin(opt.d);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (effectivePrice === null) {
      setMessage({ type: "error", text: "Preis fehlt. Bitte manuell eingeben." });
      return;
    }
    setSubmitting(true);
    try {
      const body = {
        source: "whatsapp",
        // Manuell aus WhatsApp-Anfrage eingetragen
        booking_date: bookingDate,
        start_time: startTime,
        duration_minutes: durationMin,
        jetski_id: jetskiId,
        jetski_unit_id: jetskiUnitId,
        service_category: category,
        service_type: serviceType,
        customer_name: customerName,
        customer_email: customerEmail || void 0,
        customer_phone: customerPhone,
        customer_country: customerCountry || void 0,
        towable_persons: towablePersons || void 0,
        delivery_location: deliveryLocation || void 0,
        total_price: effectivePrice,
        deposit_amount: effectiveDeposit ?? 0,
        notes: notes || void 0
      };
      void status;
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Fehler beim Anlegen" });
        return;
      }
      setMessage({ type: "success", text: "Buchung angelegt! Weiterleitung…" });
      setTimeout(() => window.location.href = "/admin/bookings", 900);
    } catch (err) {
      setMessage({ type: "error", text: "Netzwerkfehler. Erneut versuchen." });
    } finally {
      setSubmitting(false);
    }
  };
  const inputStyle = {
    width: "100%",
    padding: "0.6rem 0.875rem",
    background: "rgba(253, 251, 244, 0.05)",
    border: "1px solid rgba(253, 251, 244, 0.15)",
    borderRadius: "8px",
    color: "#fdfbf4",
    fontSize: "0.95rem",
    fontFamily: "inherit"
  };
  const labelStyle = {
    display: "block",
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "rgba(253, 251, 244, 0.5)",
    marginBottom: "0.5rem"
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, style: { maxWidth: 800 }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Datum" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "date",
            value: bookingDate,
            onChange: (e) => setBookingDate(e.target.value),
            required: true,
            style: inputStyle
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Startzeit" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "time",
            value: startTime,
            onChange: (e) => setStartTime(e.target.value),
            required: true,
            style: inputStyle
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Dauer (Min)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: durationMin,
            onChange: (e) => setDurationMin(Number(e.target.value)),
            min: 1,
            required: true,
            style: inputStyle
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { marginBottom: "1.5rem" }, children: [
      /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Welcher Jetski konkret" }),
      /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }, children: jetskiUnits.map((u) => {
        const model = jetskis.find((j) => j.id === u.modelId);
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setJetskiUnitId(u.id),
            style: {
              padding: "0.875rem 1rem",
              borderRadius: "8px",
              border: jetskiUnitId === u.id ? "1px solid #ffc233" : "1px solid rgba(253,251,244,0.15)",
              background: jetskiUnitId === u.id ? "rgba(255,194,51,0.1)" : "transparent",
              color: "#fdfbf4",
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "inherit"
            },
            children: [
              /* @__PURE__ */ jsx("div", { style: { fontFamily: "'Fraunces Variable', Georgia, serif", fontSize: "1.1rem" }, children: u.label }),
              /* @__PURE__ */ jsxs("div", { style: { fontSize: "0.75rem", color: "rgba(253,251,244,0.65)", marginTop: "0.2rem" }, children: [
                model?.model,
                " · ",
                model?.hp,
                " HP"
              ] })
            ]
          },
          u.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Kategorie" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: category,
            onChange: (e) => handleCategoryChange(e.target.value),
            style: inputStyle,
            children: Object.entries(CATEGORY_LABELS).map(([v, l]) => /* @__PURE__ */ jsx("option", { value: v, style: { background: "#071d30" }, children: l }, v))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Option" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: serviceType,
            onChange: (e) => handleServiceTypeChange(e.target.value),
            style: inputStyle,
            children: serviceTypeOptions.map((o) => /* @__PURE__ */ jsx("option", { value: o.v, style: { background: "#071d30" }, children: o.l }, o.v))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { marginBottom: "1.5rem" }, children: [
      /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Kunde Name" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: customerName,
          onChange: (e) => setCustomerName(e.target.value),
          required: true,
          style: inputStyle
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "E-Mail" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: customerEmail,
            onChange: (e) => setCustomerEmail(e.target.value),
            required: true,
            style: inputStyle
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Telefon" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            value: customerPhone,
            onChange: (e) => setCustomerPhone(e.target.value),
            required: true,
            style: inputStyle
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Land (optional)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: customerCountry,
            onChange: (e) => setCustomerCountry(e.target.value),
            placeholder: "DE, AT, IT, GR…",
            style: inputStyle
          }
        )
      ] })
    ] }),
    category === "vip_delivery" && /* @__PURE__ */ jsxs("div", { style: { marginBottom: "1.5rem" }, children: [
      /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Lieferort (Strand, Boot, Yacht, Katamaran)" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: deliveryLocation,
          onChange: (e) => setDeliveryLocation(e.target.value),
          placeholder: "z.B. Porto Katsiki Beach",
          style: inputStyle
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { style: labelStyle, children: [
          "Preis (€)",
          suggestedPrice !== null && /* @__PURE__ */ jsxs("span", { style: { textTransform: "none", letterSpacing: "normal", color: "rgba(253,251,244,0.4)", marginLeft: "0.5rem" }, children: [
            "Vorschlag: €",
            suggestedPrice
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: priceOverride,
            onChange: (e) => setPriceOverride(e.target.value),
            placeholder: suggestedPrice !== null ? String(suggestedPrice) : "Preis fehlt, manuell eingeben",
            step: "0.01",
            required: suggestedPrice === null,
            style: inputStyle
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { style: labelStyle, children: [
          "Anzahlung (€)",
          defaultDeposit !== null && /* @__PURE__ */ jsxs("span", { style: { textTransform: "none", letterSpacing: "normal", color: "rgba(253,251,244,0.4)", marginLeft: "0.5rem" }, children: [
            "Vorschlag: €",
            defaultDeposit
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            value: depositOverride,
            onChange: (e) => setDepositOverride(e.target.value),
            placeholder: defaultDeposit !== null ? String(defaultDeposit) : "",
            step: "0.01",
            style: inputStyle
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { marginBottom: "1.5rem" }, children: [
      /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Status" }),
      /* @__PURE__ */ jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), style: inputStyle, children: [
        /* @__PURE__ */ jsx("option", { value: "pending", style: { background: "#071d30" }, children: "Ausstehend (noch nicht bezahlt)" }),
        /* @__PURE__ */ jsx("option", { value: "confirmed", style: { background: "#071d30" }, children: "Bestätigt (Anzahlung eingegangen)" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { marginBottom: "1.5rem" }, children: [
      /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Notizen (optional)" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: notes,
          onChange: (e) => setNotes(e.target.value),
          rows: 3,
          style: { ...inputStyle, resize: "vertical" },
          placeholder: "Besonderheiten, Uhrzeit-Absprachen, Gruppengröße…"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "0.75rem", alignItems: "center" }, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: submitting,
          style: {
            padding: "0.875rem 2rem",
            background: "#ffc233",
            color: "#071d30",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.5 : 1
          },
          children: submitting ? "Speichere…" : "Buchung anlegen"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/admin/bookings",
          style: {
            padding: "0.875rem 1.5rem",
            color: "rgba(253,251,244,0.7)",
            textDecoration: "none",
            fontSize: "0.9rem"
          },
          children: "Abbrechen"
        }
      )
    ] }),
    message && /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          marginTop: "1.25rem",
          padding: "0.875rem 1.25rem",
          borderRadius: "8px",
          background: message.type === "error" ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)",
          border: `1px solid ${message.type === "error" ? "rgba(239,68,68,0.4)" : "rgba(34,197,94,0.4)"}`,
          color: message.type === "error" ? "#fca5a5" : "#86efac",
          fontSize: "0.9rem"
        },
        children: message.text
      }
    )
  ] });
}

const prerender = false;
const $$New = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$New;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return Astro2.redirect("/admin/login");
  }
  return renderTemplate`${renderComponent($$result, "AdminShell", $$AdminShell, { "title": "Neue Buchung", "activePath": "bookings" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="margin-bottom: 2rem;"> <a href="/admin/bookings" style="color: rgba(253, 251, 244, 0.5); font-size: 0.85rem; text-decoration: none;">
← Zurück zu Buchungen
</a> <h1 style="font-family: 'Fraunces Variable', Georgia, serif; font-size: 2.5rem; font-weight: 400; letter-spacing: -0.02em; margin-top: 0.75rem;">
Neue Buchung
</h1> <p style="color: rgba(253, 251, 244, 0.65); margin-top: 0.5rem;">
WhatsApp-Anfrage hier eintragen. Preis wird aus <code style="font-family: 'JetBrains Mono', monospace; font-size: 0.85em;">jetskis.ts</code> vorgeschlagen.
</p> </div> ${renderComponent($$result2, "BookingForm", BookingForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/User/jetski-LIVE/src/components/admin/BookingForm.tsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/jetski-LIVE/src/pages/admin/bookings/new.astro", void 0);

const $$file = "C:/Users/User/jetski-LIVE/src/pages/admin/bookings/new.astro";
const $$url = "/admin/bookings/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
