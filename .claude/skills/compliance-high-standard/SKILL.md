---
name: compliance-high-standard
description: Nutze diesen Skill bei JEDER Code-Änderung oder JEDEM Audit, der Security oder Legal-Themen berührt (Auth, API, Cookies, CSP, Impressum, AGB, Datenschutz, Haftungsausschluss, Payment). Legt fest dass Kristinas Compliance-Ziel IMMER HOCH ist, nicht MITTEL — keine offenen MITTEL-Risiken als akzeptabel stehenlassen. Enthält Prüf-Checkliste + Standard-Response-Format für Audits.
---

# Compliance-Standard HOCH — Arbeitsgrundlage

**Entscheidung durch Kristina (2026-04-20):**

> „du sagst agb ect alles geprüft und das ergebniss ist mittel, mit dem bin ich
> nicht zufrieden ich will ein hoch und kein mittel, bitte alles verbessern"

## Kernregel

Wenn Du ein Security- oder Legal-Audit durchführst und findest ein 🟡 MITTEL
oder 🟢 NIEDRIG:
- **NICHT** als „kann warten" klassifizieren
- **Sondern** im selben Commit-Batch mitfixen, solange technisch möglich
- Nur ausnehmen wenn es **externen Input braucht** (Anwalt, Behörde, Zahlungsdaten)

🔴 KRITISCH ist immer SOFORT zu fixen, nie zu vertagen.

## Zwei komplementäre Memory-Regeln

| Memory | Regel |
|---|---|
| `feedback_ok_before_security_legal.md` | Bei Legal/Security: Befund zeigen + OK einholen |
| `feedback_compliance_high_standard.md` | Nach OK: KOMPLETT fixen auf HOCH-Level |

Beide zusammen: **Erst fragen, dann komplett fixen, nicht halbgar stehenlassen.**

## Audit-Workflow für Claude

1. **Read-only prüfen** — Explore-Agent oder direkte Grep/Read.
2. **Findings strukturieren:**
   - 🔴 KRITISCH (abmahnbar / DSGVO-Bußgeld)
   - 🟡 MITTEL (Grauzone / UX-Compliance)
   - 🟢 NIEDRIG (Nachbesserung)
3. **Kristina präsentieren** mit Tabelle + Nummerierung (#1, #2, ...).
4. **JA/NEIN/SPÄTER-Antwort abwarten.**
5. **Bei JA:** Alle freigegebenen Punkte fixen, jeweils eigener Commit.
6. **Nach Fix:** Statusbericht mit Vorher→Nachher (MITTEL→HOCH).

## Check-Liste für HOCH

### Security
- [ ] JWT-Signatur wird verifiziert (nicht nur Cookie-Existenz)
- [ ] Alle POST/PUT-API-Routes haben Input-Validation (Allow-List)
- [ ] Rate-Limit ist persistent (Supabase/Redis, nicht nur In-Memory)
- [ ] CSP ist enforced (nicht Report-Only)
- [ ] Timing-safe Compare für Tokens
- [ ] `.env` in `.gitignore`, keine hardcoded Secrets
- [ ] Error-Messages verraten keine interne Struktur
- [ ] HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff aktiv
- [ ] `set:html` nur auf vertrauenswürdige Strings

### Legal (Griechenland + EU)
- [ ] Impressum: Firma + natürliche Person + Adresse + ΑΦΜ + GEMI + Aufsichtsbehörde
- [ ] Datenschutz: Alle Art.13/14 DSGVO-Pflichtangaben
- [ ] Datenschutz: Alle externen Datenverarbeiter namentlich genannt (Vercel, Supabase, Google, Unsplash, Payment-Provider, WhatsApp)
- [ ] Datenschutz: Widerrufsrecht + Beschwerde bei Aufsichtsbehörde erwähnt
- [ ] Datenschutz: IP/Timestamp-Logging transparent gemacht
- [ ] AGB: Widerrufsrechts-Ausschluss explizit nach EU-RL 2011/83 Art. 16(l) zitiert
- [ ] AGB: Stornierungsbedingungen klar, mit Tabelle
- [ ] AGB: Gerichtsstand + anwendbares Recht
- [ ] Cookie-Banner: Reject OPTISCH GLEICH prominent wie Accept (EDPB 03/2022)
- [ ] Cookie-Banner: Mehrsprachig (für internationale Kundschaft)
- [ ] Cookie-Banner: Consent hat Ablauf (max 12 Monate, dann erneut abfragen)
- [ ] Waiver: Minderjährigen-Klausel, Tubing-Klausel, Schadensmelde-Pflicht, Kaution-Regelung
- [ ] Kundenfotos: Privacy-Passus mit Widerrufsrecht + 72h-Löschfrist

## Was „MITTEL" vs „HOCH" in Zahlen

- **MITTEL:** 70-85% der Checkliste erfüllt, einzelne Lücken offen
- **HOCH:** ≥95% erfüllt, übrige Lücken klar dokumentiert als „wartet auf externen Input"
- **SEHR HOCH:** 100% erfüllt + Anwalts-Review durch

## Wann „MITTEL" trotzdem OK ist

Nur wenn der verbleibende Mangel eine externe Abhängigkeit hat:
- Anwalt noch nicht fertig mit Review
- GEMI-Nummer noch nicht vergeben
- Kristina hat konkrete Daten (Adresse, Steuer-ID) noch nicht geliefert
- Supabase noch nicht live → Rate-Limit-Migration steht noch aus

In diesen Fällen: im Code und Memory **sichtbar markieren als „wartet auf X, ETA YYYY-MM-DD"**, nicht ignorieren.

## Was NICHT als HOCH zählt

- ❌ „Ist unwahrscheinlich auszunutzen" (theoretisch ≠ real safe)
- ❌ „Kosten die Umstellung wären zu hoch" (Risiko × Abmahn-Wahrscheinlichkeit rechnet sich fast immer)
- ❌ „Machen wir später" ohne konkretes Datum/Ticket

## Dieser Skill ergänzt die Security-Skill

Der bestehende `security`-Skill enthält die OWASP-Checkliste + konkreten
Tech-Stack-Fallen. Dieser Skill hier legt das **Qualitäts-Level** fest,
auf das wir prüfen und fixen.

Bei jedem `/security-review` oder bei jedem Legal-Edit:
**Beide Skills konsultieren.** `security` = *Was prüfen?*, `compliance-high-standard` = *Wie hoch ist die Latte?*
