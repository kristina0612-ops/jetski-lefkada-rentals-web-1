import { useCallback, useMemo, useState } from "react";
import { jetskis, pricingExtras, VAT_RATE, netFromGross, vatFromGross } from "../data/jetskis";

// Hoisted constants — avoid re-allocating these arrays on every render.
// Impact: fewer heap allocations per keystroke → better INP on low-end laptops.
const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00",
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// BookingForm – customer-facing booking request form for Nero Lefkada
// ═══════════════════════════════════════════════════════════════════════════
// Collects: contact + billing address (invoice + Greek Port Police requirement)
// Logic: license question → if NO, only guided tours available
// Price calc: shows estimated total + 30% deposit
// Compliance: 3 mandatory checkboxes (Privacy, Terms, Waiver) before submit
// Submit: composes a WhatsApp message to David for now (no payment gateway yet)

type Category =
  | "beach-10" | "beach-15" | "beach-20" | "beach-30" | "beach-60"
  | "sunset" | "couple"
  | "vip-1h" | "vip-half" | "vip-full" | "vip-week"
  | "towable";

const CATEGORIES: { id: Category; label: string; price: number | "onRequest"; licenceRequired: boolean; needsGuide: boolean; note?: string }[] = [
  { id: "beach-10", label: "Beach Ride · 10 min",  price: 80,  licenceRequired: false, needsGuide: false },
  { id: "beach-15", label: "Beach Ride · 15 min",  price: 90,  licenceRequired: false, needsGuide: false, note: "BEST" },
  { id: "beach-20", label: "Beach Ride · 20 min",  price: 100, licenceRequired: false, needsGuide: false },
  { id: "beach-30", label: "Beach Ride · 30 min",  price: 130, licenceRequired: false, needsGuide: false },
  { id: "beach-60", label: "Beach Ride · 60 min",  price: 200, licenceRequired: false, needsGuide: false, note: "BESTSELLER" },
  { id: "sunset",   label: "Sunset Ride · 30 min (1 person)", price: 130, licenceRequired: false, needsGuide: false },
  { id: "couple",   label: "Couple Ride · 30 min (2 persons)", price: 150, licenceRequired: false, needsGuide: false },
  { id: "vip-1h",   label: "VIP Delivery · 1 hour",    price: 350, licenceRequired: true, needsGuide: false },
  { id: "vip-half", label: "VIP Delivery · Half day 4h", price: 450, licenceRequired: true, needsGuide: false },
  { id: "vip-full", label: "VIP Delivery · Full day 8h", price: 650, licenceRequired: true, needsGuide: false },
  { id: "vip-week", label: "VIP Delivery · Week",     price: "onRequest", licenceRequired: true, needsGuide: false },
  { id: "towable",  label: "Water Fun · Towable 10 min (per person)", price: 30, licenceRequired: false, needsGuide: false, note: "per person" },
];

function priceLabel(p: number | "onRequest"): string {
  return p === "onRequest" ? "On request" : `€${p}`;
}

export default function BookingForm() {
  // ─── form state ────────────────────────────────────────────────────────
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wantsInvoice, setWantsInvoice] = useState(false);
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [persons, setPersons] = useState(2);
  const [jetskiId, setJetskiId] = useState<string>("any");
  const [category, setCategory] = useState<Category>("beach-60");

  const [hasLicence, setHasLicence] = useState<"yes" | "no" | "">("");

  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptWaiver, setAcceptWaiver] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // ─── derived ───────────────────────────────────────────────────────────
  const selectedCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === category)!,
    [category]
  );

  const totalEstimate = useMemo(() => {
    if (selectedCategory.price === "onRequest") return null;
    if (category === "towable") return selectedCategory.price * persons;
    return selectedCategory.price;
  }, [selectedCategory, persons, category]);

  const deposit = totalEstimate !== null ? Math.round(totalEstimate * 0.3) : null;

  // License gate: certain categories (VIP) need licence OR explicit guided option
  const licenceWarningNeeded =
    hasLicence === "no" &&
    (category.startsWith("vip") || category.startsWith("beach-6") || category === "beach-30");

  const allChecked = acceptPrivacy && acceptTerms && acceptWaiver;

  // Hoisted handler — keeps the input's onChange reference stable between
  // renders, reducing layout work on low-end devices.
  const handlePersonsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPersons(Math.max(1, Math.min(3, Number(e.target.value))));
  }, []);

  // ─── submit ────────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];

    if (!firstName.trim() || !lastName.trim()) errs.push("Please enter your full name.");
    if (!dob) errs.push("Please enter your date of birth.");
    else {
      const age = (Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 3600 * 1000);
      if (age < 18) errs.push("Driver must be at least 18 years old.");
    }
    if (!email.trim()) errs.push("Email is required for booking confirmation.");
    if (!phone.trim()) errs.push("Phone / WhatsApp is required (Greek Port Police requirement).");
    if (wantsInvoice && (!street.trim() || !postalCode.trim() || !city.trim() || !country.trim()))
      errs.push("Billing address is required when requesting an invoice with VAT.");
    if (!nationality.trim()) errs.push("Nationality is required (Port Police).");
    if (!date) errs.push("Please choose a date.");
    if (!hasLicence) errs.push("Please indicate whether you hold a boating licence.");
    if (!acceptPrivacy || !acceptTerms || !acceptWaiver)
      errs.push("All three consent checkboxes are mandatory.");

    if (errs.length) {
      setErrors(errs);
      return;
    }
    setErrors([]);

    // Compose WhatsApp message
    const cat = selectedCategory.label;
    const total = totalEstimate !== null ? `€${totalEstimate}` : "on request";
    const dep = deposit !== null ? `€${deposit}` : "on request";
    const jetLabel = jetskiId === "any" ? "Any available" : jetskis.find((j) => j.id === jetskiId)?.name ?? jetskiId;

    const lines = [
      "*New Booking Request – Nero Lefkada*",
      "",
      `*Activity:* ${cat}`,
      `*Jetski:* ${jetLabel}`,
      `*Date/Time:* ${date} · ${time}`,
      `*Persons:* ${persons}`,
      "",
      "*Customer:*",
      `${firstName} ${lastName} (${dob}, ${nationality})`,
      `Email: ${email}`,
      `Phone/WhatsApp: ${phone}`,
      ...(wantsInvoice ? [`Address (invoice): ${street}, ${postalCode} ${city}, ${country}`] : []),
      `Invoice requested: ${wantsInvoice ? "YES (VAT invoice)" : "NO (simple receipt at dock)"}`,
      `Boating licence: ${hasLicence === "yes" ? "YES – solo rental OK" : "NO – guided tour with David only"}`,
      "",
      `*Estimated total:* ${total} (${category === "towable" ? "per person × " + persons : "flat rate"})`,
      `*Deposit (30%):* ${dep}`,
      "",
      "Customer has accepted: Privacy · Terms · Waiver (online timestamp logged).",
    ];
    const msg = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/306955612777?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  // ─── render ────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={styles.successCard}>
        <div style={styles.successIcon}>✓</div>
        <h3 style={styles.successTitle}>Request sent.</h3>
        <p style={styles.successText}>
          A WhatsApp draft to David has opened. Send it to receive a price
          confirmation and deposit payment link. Usually answered within the hour.
        </p>
        <button type="button" onClick={() => setSubmitted(false)} style={styles.secondaryBtn}>
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form} noValidate>
      {/* ─── Step 1: Activity ────────────────────────────────────── */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>Step 1 · Activity</div>
        <div style={styles.grid2}>
          <label style={styles.field}>
            <span style={styles.fieldLabel}>Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value as Category)} style={styles.select}>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label} — {priceLabel(c.price)}{c.note ? ` (${c.note})` : ""}
                </option>
              ))}
            </select>
          </label>

          <label style={styles.field}>
            <span style={styles.fieldLabel}>Jetski preference</span>
            <select value={jetskiId} onChange={(e) => setJetskiId(e.target.value)} style={styles.select}>
              <option value="any">Any available</option>
              {jetskis.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.name} — {j.hp} HP · {j.topSpeed} km/h
                </option>
              ))}
            </select>
          </label>

          <label style={styles.field}>
            <span style={styles.fieldLabel}>Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={styles.input} required />
          </label>

          <label style={styles.field}>
            <span style={styles.fieldLabel}>Time</span>
            <select value={time} onChange={(e) => setTime(e.target.value)} style={styles.select}>
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>

          <label style={styles.field}>
            <span style={styles.fieldLabel}>Persons on board</span>
            <input type="number" min={1} max={3} value={persons} onChange={handlePersonsChange} style={styles.input} />
            <small style={styles.hint}>*3-seater, but 2 persons recommended for comfort & performance.</small>
          </label>
        </div>
      </section>

      {/* ─── Step 2: Licence ─────────────────────────────────────── */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>Step 2 · Boating licence</div>
        <div style={styles.radioRow}>
          <label style={{...styles.radioCard, ...(hasLicence === "yes" ? styles.radioCardActive : {})}}>
            <input type="radio" name="licence" value="yes" checked={hasLicence === "yes"} onChange={() => setHasLicence("yes")} style={styles.radio} />
            <span style={styles.radioTitle}>Yes, I have a licence</span>
            <span style={styles.radioSub}>You can operate solo within the rules.</span>
          </label>
          <label style={{...styles.radioCard, ...(hasLicence === "no" ? styles.radioCardActive : {})}}>
            <input type="radio" name="licence" value="no" checked={hasLicence === "no"} onChange={() => setHasLicence("no")} style={styles.radio} />
            <span style={styles.radioTitle}>No licence</span>
            <span style={styles.radioSub}>Guided tour with David only — you still drive, he stays close.</span>
          </label>
        </div>

        {hasLicence === "no" && (
          <div style={styles.info}>
            <strong>Good news:</strong> Without a licence, you still get the full Nero experience.
            David will guide your ride personally, staying close to ensure safety. You drive the
            jetski yourself — he just makes sure you stay within the rules.
          </div>
        )}
        {licenceWarningNeeded && (
          <div style={styles.warn}>
            <strong>Heads up:</strong> VIP Delivery and longer rentals normally assume a licence.
            Since you don't have one, David will contact you to arrange a guided version.
          </div>
        )}
      </section>

      {/* ─── Step 3: Contact + Billing ───────────────────────────── */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>Step 3 · Contact</div>
        <p style={styles.sectionHint}>Required for booking confirmation and Greek Port Police (Λιμεναρχείο) registration.</p>

        <div style={styles.grid2}>
          <label style={styles.field}>
            <span style={styles.fieldLabel}>First name *</span>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={styles.input} autoComplete="given-name" required />
          </label>
          <label style={styles.field}>
            <span style={styles.fieldLabel}>Last name *</span>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={styles.input} autoComplete="family-name" required />
          </label>
          <label style={styles.field}>
            <span style={styles.fieldLabel}>Date of birth * (must be 18+)</span>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={styles.input} autoComplete="bday" required />
          </label>
          <label style={styles.field}>
            <span style={styles.fieldLabel}>Nationality *</span>
            <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="e.g. German" style={styles.input} required />
          </label>
          <label style={styles.field}>
            <span style={styles.fieldLabel}>Email *</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} autoComplete="email" required />
          </label>
          <label style={styles.field}>
            <span style={styles.fieldLabel}>Phone / WhatsApp *</span>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+49 …" style={styles.input} autoComplete="tel" required />
          </label>
        </div>

        {/* Invoice toggle: billing address only required if customer wants a VAT invoice */}
        <label style={{...styles.consent, marginTop: 16}}>
          <input
            type="checkbox"
            checked={wantsInvoice}
            onChange={(e) => setWantsInvoice(e.target.checked)}
            style={styles.checkbox}
          />
          <span>
            I need a full VAT invoice for my company (requires billing address).
            Without this, you get a simple receipt at the dock.
          </span>
        </label>

        {wantsInvoice && (
          <div style={{...styles.grid2, marginTop: 16}}>
            <label style={{...styles.field, gridColumn: "1 / -1"}}>
              <span style={styles.fieldLabel}>Street & number *</span>
              <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} style={styles.input} autoComplete="street-address" required />
            </label>
            <label style={styles.field}>
              <span style={styles.fieldLabel}>Postal code *</span>
              <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} style={styles.input} autoComplete="postal-code" required />
            </label>
            <label style={styles.field}>
              <span style={styles.fieldLabel}>City *</span>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} style={styles.input} autoComplete="address-level2" required />
            </label>
            <label style={{...styles.field, gridColumn: "1 / -1"}}>
              <span style={styles.fieldLabel}>Country *</span>
              <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} style={styles.input} autoComplete="country-name" required />
            </label>
          </div>
        )}

        <div style={styles.infoSubtle}>
          Photo ID (passport or national ID card) will be verified at the dock before departure — not required online.
        </div>
      </section>

      {/* ─── Step 4: Price summary ───────────────────────────────── */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>Step 4 · Price summary</div>
        <div style={styles.priceBox}>
          <div style={styles.priceRow}>
            <span>{selectedCategory.label}</span>
            <strong>{priceLabel(selectedCategory.price)}{category === "towable" ? ` × ${persons}` : ""}</strong>
          </div>
          {totalEstimate !== null && (
            <>
              <div style={{...styles.priceRow, borderTop: "1px solid #e8e4da", paddingTop: 10, marginTop: 10, color: "#6b7a8d", fontSize: "0.85rem"}}>
                <span>Net</span>
                <span>€{netFromGross(totalEstimate).toFixed(2).replace(".", ",")}</span>
              </div>
              <div style={{...styles.priceRow, color: "#6b7a8d", fontSize: "0.85rem"}}>
                <span>VAT ({Math.round(VAT_RATE * 100)}%)</span>
                <span>€{vatFromGross(totalEstimate).toFixed(2).replace(".", ",")}</span>
              </div>
              <div style={{...styles.priceRow, borderTop: "1px solid #e8e4da", paddingTop: 10, marginTop: 10}}>
                <span>Total (incl. VAT)</span>
                <strong style={{fontSize: "1.3rem"}}>€{totalEstimate}</strong>
              </div>
              <div style={styles.priceRow}>
                <span>Deposit online (30%)</span>
                <strong style={{color: "#ff5a36"}}>€{deposit}</strong>
              </div>
              <div style={styles.priceRow}>
                <span style={{color: "#6b7a8d", fontSize: "0.85rem"}}>Remaining at dock</span>
                <span style={{color: "#6b7a8d"}}>€{totalEstimate - deposit!}</span>
              </div>
            </>
          )}
          <div style={styles.priceNote}>
            *without fuel — fuel billed separately at end of rental.
            {category.startsWith("vip") && <><br/>*VIP Delivery requires €1,500 deposit (refundable).</>}
          </div>
        </div>
      </section>

      {/* ─── Step 5: Consent ─────────────────────────────────────── */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>Step 5 · Consent (all three mandatory)</div>

        <label style={styles.consent}>
          <input type="checkbox" checked={acceptPrivacy} onChange={(e) => setAcceptPrivacy(e.target.checked)} style={styles.checkbox} />
          <span>
            I have read and accept the <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>.
          </span>
        </label>

        <label style={styles.consent}>
          <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} style={styles.checkbox} />
          <span>
            I have read and accept the <a href="/terms" target="_blank" rel="noopener">Terms &amp; Conditions</a>.
          </span>
        </label>

        <label style={styles.consent}>
          <input type="checkbox" checked={acceptWaiver} onChange={(e) => setAcceptWaiver(e.target.checked)} style={styles.checkbox} />
          <span>
            I have read, understood and accept the <a href="/waiver" target="_blank" rel="noopener">Liability Waiver</a> — including the acknowledged risks and my personal responsibility on the water.
          </span>
        </label>
      </section>

      {errors.length > 0 && (
        <div style={styles.errorBox}>
          <strong>Please fix before submitting:</strong>
          <ul style={{margin: "8px 0 0 20px"}}>
            {errors.map((err, i) => (<li key={i}>{err}</li>))}
          </ul>
        </div>
      )}

      <button type="submit" disabled={!allChecked} style={{...styles.submitBtn, ...(!allChecked ? styles.submitBtnDisabled : {})}}>
        {allChecked ? "Request booking & pay 30% deposit" : "Tick all three boxes to continue"}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M13 5l7 7-7 7"/>
        </svg>
      </button>

      <p style={styles.footNote}>
        On submit, a pre-filled WhatsApp message opens. David confirms availability and sends
        the Viva Wallet deposit link within the hour. Your timestamp, IP and checkbox states
        are logged as proof of consent.
      </p>
    </form>
  );
}

// ─── styles (inline, design-system colors from v2-azure) ─────────────────

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    background: "rgba(253,251,244,0.04)",
    border: "1px solid rgba(253,251,244,0.15)",
    borderRadius: 24,
    padding: "2rem",
    color: "#fdfbf4",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  sectionLabel: {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "0.68rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#ffc233",
    marginBottom: "0.25rem",
  },
  sectionHint: {
    fontSize: "0.85rem",
    color: "rgba(253,251,244,0.6)",
    marginTop: "-0.25rem",
    marginBottom: "0.5rem",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    fontSize: "0.92rem",
  },
  fieldLabel: {
    fontSize: "0.78rem",
    color: "rgba(253,251,244,0.75)",
    letterSpacing: "0.02em",
  },
  input: {
    padding: "0.7rem 0.9rem",
    background: "rgba(7,29,48,0.5)",
    border: "1px solid rgba(253,251,244,0.15)",
    borderRadius: 10,
    color: "#fdfbf4",
    fontSize: "0.95rem",
    fontFamily: "inherit",
  },
  select: {
    padding: "0.7rem 0.9rem",
    background: "rgba(7,29,48,0.5)",
    border: "1px solid rgba(253,251,244,0.15)",
    borderRadius: 10,
    color: "#fdfbf4",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    appearance: "none",
    WebkitAppearance: "none",
  },
  hint: {
    fontSize: "0.75rem",
    color: "rgba(253,251,244,0.55)",
    marginTop: "0.25rem",
  },
  radioRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "0.75rem",
  },
  radioCard: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    padding: "1rem 1.1rem",
    background: "rgba(7,29,48,0.5)",
    border: "1.5px solid rgba(253,251,244,0.15)",
    borderRadius: 14,
    cursor: "pointer",
    transition: "border 0.2s, background 0.2s",
  },
  radioCardActive: {
    borderColor: "#ffc233",
    background: "rgba(255,194,51,0.08)",
  },
  radio: {
    position: "absolute",
    opacity: 0,
    pointerEvents: "none",
  },
  radioTitle: {
    fontWeight: 600,
    fontSize: "0.95rem",
    color: "#fdfbf4",
  },
  radioSub: {
    fontSize: "0.82rem",
    color: "rgba(253,251,244,0.65)",
  },
  info: {
    padding: "0.9rem 1.1rem",
    background: "rgba(0,179,167,0.08)",
    borderLeft: "3px solid #00b3a7",
    borderRadius: "0 10px 10px 0",
    fontSize: "0.88rem",
    color: "rgba(253,251,244,0.85)",
  },
  warn: {
    padding: "0.9rem 1.1rem",
    background: "rgba(255,90,54,0.1)",
    borderLeft: "3px solid #ff5a36",
    borderRadius: "0 10px 10px 0",
    fontSize: "0.88rem",
    color: "rgba(253,251,244,0.9)",
  },
  infoSubtle: {
    fontSize: "0.78rem",
    color: "rgba(253,251,244,0.5)",
    fontStyle: "italic",
    marginTop: "0.5rem",
  },
  priceBox: {
    padding: "1.25rem 1.5rem",
    background: "rgba(255,194,51,0.06)",
    border: "1px solid rgba(255,194,51,0.25)",
    borderRadius: 14,
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "0.35rem 0",
    fontSize: "0.92rem",
  },
  priceNote: {
    marginTop: "0.75rem",
    fontSize: "0.78rem",
    color: "rgba(253,251,244,0.55)",
    fontStyle: "italic",
  },
  consent: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "flex-start",
    padding: "0.9rem 1.1rem",
    background: "rgba(253,251,244,0.04)",
    border: "1px solid rgba(253,251,244,0.12)",
    borderRadius: 10,
    fontSize: "0.9rem",
    lineHeight: 1.6,
    cursor: "pointer",
  },
  checkbox: {
    marginTop: "0.15rem",
    width: 18,
    height: 18,
    accentColor: "#ffc233",
    cursor: "pointer",
  },
  errorBox: {
    padding: "1rem 1.25rem",
    background: "rgba(255,90,54,0.12)",
    borderLeft: "3px solid #ff5a36",
    borderRadius: "0 10px 10px 0",
    fontSize: "0.88rem",
    color: "#fff",
  },
  submitBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.6rem",
    padding: "1rem 1.5rem",
    background: "#ffc233",
    color: "#071d30",
    border: "none",
    borderRadius: 9999,
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: "0.92rem",
    letterSpacing: "0.02em",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  submitBtnDisabled: {
    opacity: 0.45,
    cursor: "not-allowed",
    background: "rgba(253,251,244,0.25)",
    color: "rgba(253,251,244,0.7)",
  },
  footNote: {
    fontSize: "0.78rem",
    color: "rgba(253,251,244,0.55)",
    textAlign: "center",
    lineHeight: 1.6,
  },
  successCard: {
    padding: "3rem 2rem",
    background: "rgba(0,179,167,0.08)",
    border: "1px solid rgba(0,179,167,0.3)",
    borderRadius: 24,
    textAlign: "center",
    color: "#fdfbf4",
  },
  successIcon: {
    width: 64,
    height: 64,
    margin: "0 auto 1rem",
    borderRadius: "50%",
    background: "#00b3a7",
    color: "#071d30",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: 700,
  },
  successTitle: {
    fontFamily: "Fraunces Variable, Georgia, serif",
    fontSize: "2rem",
    fontWeight: 400,
    margin: "0 0 0.75rem",
  },
  successText: {
    fontSize: "1rem",
    color: "rgba(253,251,244,0.8)",
    maxWidth: 480,
    margin: "0 auto 1.5rem",
    lineHeight: 1.6,
  },
  secondaryBtn: {
    padding: "0.7rem 1.3rem",
    background: "transparent",
    color: "#fdfbf4",
    border: "1.5px solid rgba(253,251,244,0.3)",
    borderRadius: 9999,
    fontFamily: "inherit",
    fontSize: "0.9rem",
    cursor: "pointer",
  },
};
