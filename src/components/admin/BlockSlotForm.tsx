import { useState } from "react";
import { jetskiUnits } from "../../data/jetskis";

const BLOCK_REASONS = [
  { value: "maintenance", label: "Wartung / Reparatur" },
  { value: "weather", label: "Wetter (Sturm, Wellen)" },
  { value: "walk_in", label: "Walk-in Kunde vor Ort" },
  { value: "admin_block", label: "Sonstiges" },
] as const;

const DURATION_PRESETS = [
  { minutes: 30, label: "30 Minuten" },
  { minutes: 60, label: "1 Stunde" },
  { minutes: 240, label: "4 Stunden" },
  { minutes: 480, label: "8 Stunden" },
  { minutes: 720, label: "Ganzer Tag (12h)" },
];

export default function BlockSlotForm() {
  const [jetskiUnitId, setJetskiUnitId] = useState(jetskiUnits[0].id);
  const [bookingDate, setBookingDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState("10:00");
  const [durationMin, setDurationMin] = useState(60);
  const [reason, setReason] = useState<(typeof BLOCK_REASONS)[number]["value"]>("maintenance");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const selectedUnit = jetskiUnits.find((u) => u.id === jetskiUnitId) ?? jetskiUnits[0];

  const handleSubmit = async (e: React.FormEvent) => {
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
        notes: notes || undefined,
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({
          type: "error",
          text: res.status === 409
            ? `Dieser Slot ist bereits belegt. ${data.error ?? ""}`
            : (data.error || "Fehler beim Anlegen"),
        });
        return;
      }

      setMessage({ type: "success", text: "Slot gesperrt. Weiterleitung…" });
      setTimeout(() => (window.location.href = "/admin/bookings"), 900);
    } catch {
      setMessage({ type: "error", text: "Netzwerkfehler. Erneut versuchen." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {message && (
        <div style={{
          ...styles.msg,
          background: message.type === "error" ? "rgba(192, 57, 43, 0.15)" : "rgba(0, 179, 167, 0.15)",
          borderLeft: message.type === "error" ? "3px solid #c0392b" : "3px solid #00b3a7",
        }}>
          {message.text}
        </div>
      )}

      <div style={styles.row}>
        <label style={styles.field}>
          <span style={styles.label}>Jetski</span>
          <select value={jetskiUnitId} onChange={(e) => setJetskiUnitId(e.target.value)} style={styles.input}>
            {jetskiUnits.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
          <small style={styles.hint}>{selectedUnit.label} wird für den gewählten Zeitraum gesperrt.</small>
        </label>

        <label style={styles.field}>
          <span style={styles.label}>Grund</span>
          <select value={reason} onChange={(e) => setReason(e.target.value as typeof reason)} style={styles.input}>
            {BLOCK_REASONS.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div style={styles.row}>
        <label style={styles.field}>
          <span style={styles.label}>Datum</span>
          <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} style={styles.input} required />
        </label>

        <label style={styles.field}>
          <span style={styles.label}>Startzeit</span>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={styles.input} required />
        </label>

        <label style={styles.field}>
          <span style={styles.label}>Dauer</span>
          <select value={durationMin} onChange={(e) => setDurationMin(Number(e.target.value))} style={styles.input}>
            {DURATION_PRESETS.map((p) => (
              <option key={p.minutes} value={p.minutes}>{p.label}</option>
            ))}
          </select>
        </label>
      </div>

      <label style={styles.field}>
        <span style={styles.label}>Notiz (optional)</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ ...styles.input, minHeight: 80, resize: "vertical" }}
          placeholder="z.B. 'Walk-in Familie Schmidt' oder 'Ölwechsel'"
        />
      </label>

      <div style={styles.actions}>
        <button type="button" onClick={() => (window.location.href = "/admin/bookings")} style={styles.cancelBtn}>
          Abbrechen
        </button>
        <button type="submit" disabled={submitting} style={styles.submitBtn}>
          {submitting ? "Sperrt…" : "Slot sperren"}
        </button>
      </div>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: { display: "flex", flexDirection: "column", gap: "1.5rem" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  label: {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "0.72rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(253, 251, 244, 0.75)",
  },
  input: {
    width: "100%",
    padding: "0.6rem 0.875rem",
    background: "rgba(253, 251, 244, 0.05)",
    border: "1px solid rgba(253, 251, 244, 0.15)",
    borderRadius: "8px",
    color: "#fdfbf4",
    fontSize: "0.95rem",
    fontFamily: "inherit",
  },
  hint: {
    fontSize: "0.78rem",
    color: "rgba(253, 251, 244, 0.5)",
  },
  msg: {
    padding: "0.75rem 1rem",
    borderRadius: "6px",
    color: "#fdfbf4",
    fontSize: "0.9rem",
  },
  actions: {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "flex-end",
    paddingTop: "0.5rem",
    borderTop: "1px solid rgba(253, 251, 244, 0.08)",
  },
  cancelBtn: {
    padding: "0.6rem 1.25rem",
    background: "transparent",
    border: "1px solid rgba(253, 251, 244, 0.2)",
    borderRadius: "8px",
    color: "rgba(253, 251, 244, 0.8)",
    cursor: "pointer",
    fontSize: "0.88rem",
  },
  submitBtn: {
    padding: "0.6rem 1.5rem",
    background: "#ff5a36",
    border: "1px solid #ff5a36",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.88rem",
    fontWeight: 600,
  },
};
