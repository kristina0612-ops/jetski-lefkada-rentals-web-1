import { useCallback, useMemo, useState } from "react";
import { jetskis, VAT_RATE, netFromGross, vatFromGross } from "../data/jetskis";

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00",
] as const;

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

const TOTAL_STEPS = 5;
const STEP_LABELS = ["Activity", "Boating licence", "Contact", "Price summary", "Consent"];

export default function BookingForm() {
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

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

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

  const licenceWarningNeeded =
    hasLicence === "no" &&
    (category.startsWith("vip") || category.startsWith("beach-6") || category === "beach-30");

  const allChecked = acceptPrivacy && acceptTerms && acceptWaiver;

  const handlePersonsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPersons(Math.max(1, Math.min(3, Number(e.target.value))));
  }, []);

  function validateStep(step: number): string[] {
    const errs: string[] = [];
    if (step === 1) {
      if (!date) errs.push("Please choose a date.");
    }
    if (step === 2) {
      if (!hasLicence) errs.push("Please indicate whether you hold a boating licence.");
    }
    if (step === 3) {
      if (!firstName.trim() || !lastName.trim()) errs.push("Please enter your full name.");
      if (!dob) errs.push("Please enter your date of birth.");
      else {
        const age = (Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 3600 * 1000);
        if (age < 18) errs.push("Driver must be at least 18 years old.");
      }
      if (!email.trim()) errs.push("Email is required for booking confirmation.");
      if (!phone.trim()) errs.push("Phone / WhatsApp is required (Greek Port Police requirement).");
      if (!nationality.trim()) errs.push("Nationality is required (Port Police).");
      if (wantsInvoice && (!street.trim() || !postalCode.trim() || !city.trim() || !country.trim()))
        errs.push("Billing address is required when requesting an invoice with VAT.");
    }
    if (step === 5) {
      if (!acceptPrivacy || !acceptTerms || !acceptWaiver)
        errs.push("All three consent checkboxes are mandatory.");
    }
    return errs;
  }

  const handleContinue = () => {
    const errs = validateStep(currentStep);
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: document.getElementById("booking-form")?.offsetTop ?? 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setErrors([]);
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: document.getElementById("booking-form")?.offsetTop ?? 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allErrs = [
      ...validateStep(1),
      ...validateStep(2),
      ...validateStep(3),
      ...validateStep(5),
    ];
    if (allErrs.length) {
      setErrors(allErrs);
      return;
    }
    setErrors([]);

    const cat = selectedCategory.label;
    const total = totalEstimate !== null ? `€${totalEstimate}` : "on request";
    const dep = deposit !== null ? `€${deposit}` : "on request";
    const jetLabel = jetskiId === "any" ? "Any available" : jetskis.find((j) => j.id === jetskiId)?.name ?? jetskiId;

    const lines = [
      "*New Booking Request - Nero Lefkada*",
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
      `Boating licence: ${hasLicence === "yes" ? "YES, solo rental OK" : "NO, guided tour with David only"}`,
      "",
      `*Estimated total:* ${total} (${category === "towable" ? "per person x " + persons : "flat rate"})`,
      `*Deposit (30%):* ${dep}`,
      "",
      "Customer has accepted: Privacy · Terms · Waiver (online timestamp logged).",
    ];
    const msg = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/306955612777?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={styles.successCard}>
        <div style={styles.successIcon}>✓</div>
        <h3 style={styles.successTitle}>Request sent.</h3>
        <p style={styles.successText}>
          A WhatsApp draft to David has opened. Send it to receive a price
          confirmation and deposit payment link. Usually answered within the hour.
        </p>
        <button type="button" onClick={() => { setSubmitted(false); setCurrentStep(1); }} style={styles.secondaryBtn}>
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form} className="p-5 sm:p-8" noValidate>
      {/* Progress indicator */}
      <div style={styles.progressWrap}>
        <div style={styles.dots}>
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const n = i + 1;
            const isCurrent = n === currentStep;
            const isDone = n < currentStep;
            return (
              <span
                key={n}
                style={{
                  ...styles.dot,
                  ...(isDone ? styles.dotDone : {}),
                  ...(isCurrent ? styles.dotCurrent : {}),
                }}
                aria-label={`Step ${n} ${isDone ? "completed" : isCurrent ? "current" : "upcoming"}`}
              />
            );
          })}
        </div>
        <div style={styles.progressLabel}>
          Step {currentStep} of {TOTAL_STEPS} · {STEP_LABELS[currentStep - 1]}
        </div>
      </div>

      {errors.length > 0 && (
        <div style={styles.errorBox}>
          <strong>Please fix before continuing:</strong>
          <ul style={{margin: "8px 0 0 20px"}}>
            {errors.map((err, i) => (<li key={i}>{err}</li>))}
          </ul>
        </div>
      )}

      {currentStep === 1 && (
        <section style={styles.section}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label style={styles.field}>
              <span style={styles.fieldLabel}>Category</span>
              <select value={category} onChange={(e) => setCategory(e.target.value as Category)} style={styles.select}>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label} · {priceLabel(c.price)}{c.note ? ` (${c.note})` : ""}
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
                    {j.name} · {j.hp} HP · {j.topSpeed} km/h
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
      )}

      {currentStep === 2 && (
        <section style={styles.section}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label style={{...styles.radioCard, ...(hasLicence === "yes" ? styles.radioCardActive : {})}}>
              <input type="radio" name="licence" value="yes" checked={hasLicence === "yes"} onChange={() => setHasLicence("yes")} style={styles.radio} />
              <span style={styles.radioTitle}>Yes, I have a licence</span>
              <span style={styles.radioSub}>You can operate solo within the rules.</span>
            </label>
            <label style={{...styles.radioCard, ...(hasLicence === "no" ? styles.radioCardActive : {})}}>
              <input type="radio" name="licence" value="no" checked={hasLicence === "no"} onChange={() => setHasLicence("no")} style={styles.radio} />
              <span style={styles.radioTitle}>No licence</span>
              <span style={styles.radioSub}>Guided tour with David only. You still drive, he stays close.</span>
            </label>
          </div>

          {hasLicence === "no" && (
            <div style={styles.info}>
              <strong>Good news:</strong> Without a licence, you still get the full Nero experience.
              David will guide your ride personally, staying close to ensure safety. You drive the
              jetski yourself. He just makes sure you stay within the rules.
            </div>
          )}
          {licenceWarningNeeded && (
            <div style={styles.warn}>
              <strong>Heads up:</strong> VIP Delivery and longer rentals normally assume a licence.
              Since you don't have one, David will contact you to arrange a guided version.
            </div>
          )}
        </section>
      )}

      {currentStep === 3 && (
        <section style={styles.section}>
          <p style={styles.sectionHint}>Required for booking confirmation and Greek Port Police (Λιμεναρχείο) registration.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+49 ..." style={styles.input} autoComplete="tel" required />
            </label>
          </div>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <label style={styles.field} className="sm:col-span-2">
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
              <label style={styles.field} className="sm:col-span-2">
                <span style={styles.fieldLabel}>Country *</span>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} style={styles.input} autoComplete="country-name" required />
              </label>
            </div>
          )}

          <div style={styles.infoSubtle}>
            Photo ID (passport or national ID card) will be verified at the dock before departure. Not required online.
          </div>
        </section>
      )}

      {currentStep === 4 && (
        <section style={styles.section}>
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
              *without fuel. Fuel billed separately at end of rental.
              {category.startsWith("vip") && <><br/>*VIP Delivery requires €1,500 deposit (refundable).</>}
            </div>
          </div>
        </section>
      )}

      {currentStep === 5 && (
        <section style={styles.section}>
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
              I have read, understood and accept the <a href="/waiver" target="_blank" rel="noopener">Liability Waiver</a>, including the acknowledged risks and my personal responsibility on the water.
            </span>
          </label>

          <p style={styles.footNote}>
            On submit, a pre-filled WhatsApp message opens. David confirms availability and sends
            the Viva Wallet deposit link within the hour. Your timestamp, IP and checkbox states
            are logged as proof of consent.
          </p>
        </section>
      )}

      {/* Navigation buttons */}
      <div style={styles.navRow}>
        {currentStep > 1 ? (
          <button type="button" onClick={handleBack} style={styles.backBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M19 12H5M11 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
        ) : (
          <span />
        )}

        {currentStep < TOTAL_STEPS && (
          <button type="button" onClick={handleContinue} style={styles.continueBtn}>
            Continue
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </button>
        )}

        {currentStep === TOTAL_STEPS && (
          <button type="submit" disabled={!allChecked} style={{...styles.submitBtn, ...(!allChecked ? styles.submitBtnDisabled : {})}}>
            {allChecked ? "Request booking & pay 30% deposit" : "Tick all three boxes to continue"}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.75rem",
    background: "rgba(253,251,244,0.04)",
    border: "1px solid rgba(253,251,244,0.15)",
    borderRadius: 24,
    color: "#fdfbf4",
  },
  progressWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid rgba(253,251,244,0.1)",
  },
  dots: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "rgba(253,251,244,0.2)",
    transition: "background 0.3s, transform 0.3s",
  },
  dotCurrent: {
    background: "#ffc233",
    transform: "scale(1.35)",
    boxShadow: "0 0 0 4px rgba(255,194,51,0.18)",
  },
  dotDone: {
    background: "#00b3a7",
  },
  progressLabel: {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "0.72rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(253,251,244,0.85)",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
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
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    paddingTop: "0.5rem",
    borderTop: "1px solid rgba(253,251,244,0.1)",
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.25rem",
    background: "transparent",
    color: "rgba(253,251,244,0.8)",
    border: "1.5px solid rgba(253,251,244,0.25)",
    borderRadius: 9999,
    fontFamily: "inherit",
    fontSize: "0.88rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.2s, border 0.2s",
  },
  continueBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.85rem 1.5rem",
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
    marginTop: "0.5rem",
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
