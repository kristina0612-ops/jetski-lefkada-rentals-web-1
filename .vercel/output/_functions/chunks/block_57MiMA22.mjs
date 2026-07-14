import { c as createComponent } from './astro-component_crrHDtXr.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_C6QB6PI8.mjs';
import { r as renderComponent } from './entrypoint_CNYytdjO.mjs';
import { $ as $$AdminShell } from './AdminShell_BYMkLdeD.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { j as jetskiUnits } from './jetskis_Dk2rqqiG.mjs';

const BLOCK_REASONS = [
  { value: "maintenance", label: "Wartung / Reparatur" },
  { value: "weather", label: "Wetter (Sturm, Wellen)" },
  { value: "walk_in", label: "Walk-in Kunde vor Ort" },
  { value: "admin_block", label: "Sonstiges" }
];
const DURATION_PRESETS = [
  { minutes: 30, label: "30 Minuten" },
  { minutes: 60, label: "1 Stunde" },
  { minutes: 240, label: "4 Stunden" },
  { minutes: 480, label: "8 Stunden" },
  { minutes: 720, label: "Ganzer Tag (12h)" }
];
function BlockSlotForm() {
  const [jetskiUnitId, setJetskiUnitId] = useState(jetskiUnits[0].id);
  const [bookingDate, setBookingDate] = useState(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState("10:00");
  const [durationMin, setDurationMin] = useState(60);
  const [reason, setReason] = useState("maintenance");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const selectedUnit = jetskiUnits.find((u) => u.id === jetskiUnitId) ?? jetskiUnits[0];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);
    try {
      const body = {
        source: reason,
        booking_date: bookingDate,
        start_time: startTime,
        duration_minutes: durationMin,
        jetski_unit_id: jetskiUnitId,
        notes: notes || void 0
      };
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({
          type: "error",
          text: res.status === 409 ? `Dieser Slot ist bereits belegt. ${data.error ?? ""}` : data.error || "Fehler beim Anlegen"
        });
        return;
      }
      setMessage({ type: "success", text: "Slot gesperrt. Weiterleitung…" });
      setTimeout(() => window.location.href = "/admin/bookings", 900);
    } catch {
      setMessage({ type: "error", text: "Netzwerkfehler. Erneut versuchen." });
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, style: styles.form, children: [
    message && /* @__PURE__ */ jsx("div", { style: {
      ...styles.msg,
      background: message.type === "error" ? "rgba(192, 57, 43, 0.15)" : "rgba(0, 179, 167, 0.15)",
      borderLeft: message.type === "error" ? "3px solid #c0392b" : "3px solid #00b3a7"
    }, children: message.text }),
    /* @__PURE__ */ jsxs("div", { style: styles.row, children: [
      /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
        /* @__PURE__ */ jsx("span", { style: styles.label, children: "Jetski" }),
        /* @__PURE__ */ jsx("select", { value: jetskiUnitId, onChange: (e) => setJetskiUnitId(e.target.value), style: styles.input, children: jetskiUnits.map((u) => /* @__PURE__ */ jsx("option", { value: u.id, children: u.label }, u.id)) }),
        /* @__PURE__ */ jsxs("small", { style: styles.hint, children: [
          selectedUnit.label,
          " wird für den gewählten Zeitraum gesperrt."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
        /* @__PURE__ */ jsx("span", { style: styles.label, children: "Grund" }),
        /* @__PURE__ */ jsx("select", { value: reason, onChange: (e) => setReason(e.target.value), style: styles.input, children: BLOCK_REASONS.map((r) => /* @__PURE__ */ jsx("option", { value: r.value, children: r.label }, r.value)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: styles.row, children: [
      /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
        /* @__PURE__ */ jsx("span", { style: styles.label, children: "Datum" }),
        /* @__PURE__ */ jsx("input", { type: "date", value: bookingDate, onChange: (e) => setBookingDate(e.target.value), style: styles.input, required: true })
      ] }),
      /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
        /* @__PURE__ */ jsx("span", { style: styles.label, children: "Startzeit" }),
        /* @__PURE__ */ jsx("input", { type: "time", value: startTime, onChange: (e) => setStartTime(e.target.value), style: styles.input, required: true })
      ] }),
      /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
        /* @__PURE__ */ jsx("span", { style: styles.label, children: "Dauer" }),
        /* @__PURE__ */ jsx("select", { value: durationMin, onChange: (e) => setDurationMin(Number(e.target.value)), style: styles.input, children: DURATION_PRESETS.map((p) => /* @__PURE__ */ jsx("option", { value: p.minutes, children: p.label }, p.minutes)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
      /* @__PURE__ */ jsx("span", { style: styles.label, children: "Notiz (optional)" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: notes,
          onChange: (e) => setNotes(e.target.value),
          style: { ...styles.input, minHeight: 80, resize: "vertical" },
          placeholder: "z.B. 'Walk-in Familie Schmidt' oder 'Ölwechsel'"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { style: styles.actions, children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => window.location.href = "/admin/bookings", style: styles.cancelBtn, children: "Abbrechen" }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: submitting, style: styles.submitBtn, children: submitting ? "Sperrt…" : "Slot sperren" })
    ] })
  ] });
}
const styles = {
  form: { display: "flex", flexDirection: "column", gap: "1.5rem" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  label: {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "0.72rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(253, 251, 244, 0.75)"
  },
  input: {
    width: "100%",
    padding: "0.6rem 0.875rem",
    background: "rgba(253, 251, 244, 0.05)",
    border: "1px solid rgba(253, 251, 244, 0.15)",
    borderRadius: "8px",
    color: "#fdfbf4",
    fontSize: "0.95rem",
    fontFamily: "inherit"
  },
  hint: {
    fontSize: "0.78rem",
    color: "rgba(253, 251, 244, 0.5)"
  },
  msg: {
    padding: "0.75rem 1rem",
    borderRadius: "6px",
    color: "#fdfbf4",
    fontSize: "0.9rem"
  },
  actions: {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "flex-end",
    paddingTop: "0.5rem",
    borderTop: "1px solid rgba(253, 251, 244, 0.08)"
  },
  cancelBtn: {
    padding: "0.6rem 1.25rem",
    background: "transparent",
    border: "1px solid rgba(253, 251, 244, 0.2)",
    borderRadius: "8px",
    color: "rgba(253, 251, 244, 0.8)",
    cursor: "pointer",
    fontSize: "0.88rem"
  },
  submitBtn: {
    padding: "0.6rem 1.5rem",
    background: "#ff5a36",
    border: "1px solid #ff5a36",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.88rem",
    fontWeight: 600
  }
};

const prerender = false;
const $$Block = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Block;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return Astro2.redirect("/admin/login");
  }
  return renderTemplate`${renderComponent($$result, "AdminShell", $$AdminShell, { "title": "Slot sperren", "activePath": "bookings" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="margin-bottom: 2rem;"> <a href="/admin/bookings" style="color: rgba(253, 251, 244, 0.5); font-size: 0.85rem; text-decoration: none;">
← Zurück zu Buchungen
</a> <h1 style="font-family: 'Fraunces Variable', Georgia, serif; font-size: 2.5rem; font-weight: 400; letter-spacing: -0.02em; margin-top: 0.75rem;">
Slot sperren
</h1> <p style="color: rgba(253, 251, 244, 0.65); margin-top: 0.5rem;">
Walk-in-Kunde, Wartung, Wetter – hier ein Jetski für einen Zeitraum blockieren.
      Ohne Kundendaten. Erscheint sofort als „belegt" auf der öffentlichen Website.
</p> </div> ${renderComponent($$result2, "BlockSlotForm", BlockSlotForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/User/jetski-LIVE/src/components/admin/BlockSlotForm.tsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/User/jetski-LIVE/src/pages/admin/bookings/block.astro", void 0);

const $$file = "C:/Users/User/jetski-LIVE/src/pages/admin/bookings/block.astro";
const $$url = "/admin/bookings/block";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Block,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
