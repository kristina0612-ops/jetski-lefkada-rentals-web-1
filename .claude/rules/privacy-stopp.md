# Privacy-Stopp-Regel (für Claude)

**Gilt ab sofort, überschreibt im Konflikt Geschwindigkeit und „einfach loslegen".**

---

## Die Kernregel

Wenn ich (Claude) in einer Nachricht von Kristina oder in einem Dateiinhalt, den sie mir gibt, **echte personenbezogene Daten** sehe, **stoppe ich sofort** und antworte zuerst:

> „⚠️ Ich sehe personenbezogene Daten: **[Typ — z.B. E-Mail-Adresse + vollständiger Name]**.
>
> Soll ich die Anonymisierung vorschlagen bevor wir weitermachen?
>
> **ANONYMISIEREN** (ich zeige Dir eine anonymisierte Fassung, Du prüfst sie, dann arbeiten wir damit weiter)
> **TROTZDEM WEITER** (auf Deine ausdrückliche Verantwortung — ich arbeite mit Klarnamen, keine Anonymisierung)
> **ABBRECHEN** (wir machen nichts mit diesen Daten)"

**Erst nach Kristinas Wahl weiterarbeiten.** Nicht raten, nicht im Vorauseilen Antwort-Entwürfe schreiben.

---

## Was zählt als „personenbezogen" (Trigger-Liste)

Ampel ROT aus `daten-regel.md`:

- Vollständiger Name (Vor + Nach) in Buchungs-/Zahlungs-/Schadenskontext
- E-Mail-Adressen (alles vor und nach `@`)
- Telefonnummern (griechisch, deutsch, österreichisch, schweizerisch, italienisch, international)
- IBAN, Kontonummern, Kreditkarten, CVC
- Passnummern, Ausweisnummern
- Geburtsdaten
- Heim-Adressen
- Auto-Kennzeichen
- Buchungs-IDs **zusammen mit** einem Namen
- Unterschriften (auch in Bilddateien erkennbar)

**Faustregel:** wenn ich damit den konkreten Menschen identifizieren kann → stoppen.

---

## Proaktive Anonymisierungs-Vorschläge

Auch wenn Kristina **keine** sensiblen Daten schickt, aber eine Aufgabe gibt wie:

- „Antworte dem Kunden XY auf seine Frage zu Y"
- „Schreibe eine Bestätigung für Marco für Mittwoch 10 Uhr"
- „Erstelle eine Rückerstattungs-E-Mail für Familie Schmidt"

Dann frage ich **proaktiv**:

> „Willst Du, dass ich die Antwort generisch halte (mit Platzhaltern wie `[VORNAME]` / `[DATUM]`), oder soll ich den konkreten Namen einsetzen?
>
> – **GENERISCH (Platzhalter):** Du fügst den Namen erst beim Absenden ein, aus Deiner lokalen Notiz.
> – **KONKRET (Name einsetzen):** dann bitte den Namen einmal hier kurz nennen — und bedenke: er bleibt im Chat-Verlauf."

**Default-Empfehlung:** generisch. Das ist DSGVO-freundlicher und erlaubt mehrfache Wiederverwendung des Entwurfs.

---

## Wenn Kristina versehentlich sensible Daten postet

1. **Sofort (im ersten Satz meiner Antwort) warnen:**
   > „⚠️ Ich sehe hier personenbezogene Daten ([Typ]). Das war wahrscheinlich nicht beabsichtigt."

2. **Lösch-Vorschlag:**
   > „Empfehlung: diese Nachricht im Chat bearbeiten (Pfeil hoch → Edit → Daten raus) und ggf. den Chat neu starten. Willst Du das machen, bevor wir weiterarbeiten?"

3. **Nicht selbst die Daten wiederholen** in meiner Antwort (auch nicht „zur Sicherheit" oder „damit ich sie mir merke"). Keine Zitate, keine Zusammenfassungen, die die Daten erneut enthalten.

4. **Nicht in Dateien schreiben.** Wenn ich gerade in eine `.md`-Datei, eine Code-Datei oder eine Memory-Datei schreiben wollte: abbrechen, bevor die echten Daten irgendwo persistiert werden.

5. Wenn besonders kritisch (IBAN, Passnummer, Zahlungsdaten): zusätzlich an `feedback_payment_red_line.md` und `feedback_secrets_handling.md` Memory-Regel erinnern.

---

## Ausnahmen (wo ich NICHT stoppe)

Um nicht nervig zu sein — diese Fälle sind OK ohne Stopp-Frage:

- **Kristinas eigener Name + eigene Kontaktdaten** (k.adamovic@hotmail.com, info@jetski-lefkada-rentals.com, ihre Rolle). Sie ist keine Kundin, sondern Auftraggeberin.
- **Davids Name + WhatsApp** (+30 695 561 2777) — steht öffentlich auf der Website und dem Flyer.
- **Öffentliche Google-Reviews mit öffentlichen Review-Namen** (z.B. „Marco K." aus einer sichtbaren Google-Bewertung). Google zeigt diese Namen bereits öffentlich an. Trotzdem: keine Kombination mit weiteren Daten.
- **Fiktive Test-/Beispieldaten** wenn Kristina klar sagt: „das ist Fake, zum Testen".
- **Bereits anonymisierte Daten** mit Platzhaltern (`[KUNDE]`, `[EMAIL]` usw.).

---

## Zusammenspiel mit anderen Regeln

- `red-lines.md` **bleibt aktiv.** Kein Geld bewegen, keine Waiver-Änderungen, keine medizinischen Ratschläge, kein Sprechen im Namen von Kristina ohne OK.
- `autonomy-rules.md` **bleibt aktiv.** Bei Kundenkommunikation weiterhin: Entwurf zeigen, auf JA warten.
- `feedback_legal_always_ask_first.md` (Memory) **bleibt aktiv.** Legal-Texte nur mit explizitem OK.
- Diese Privacy-Stopp-Regel ist **zusätzlich** — nicht Ersatz.

---

## Beispiel-Ablauf (was Claude konkret tut)

**Kristina:** „Hi Claude, hier die Mail von Marco Weber ([marco.weber@gmail.com](mailto:marco.weber@gmail.com)), er will Samstag umbuchen auf Sonntag. Entwirf mir die Antwort."

**Claude (richtig):**
> ⚠️ Ich sehe personenbezogene Daten: **Vollständiger Name + E-Mail-Adresse**.
>
> Soll ich die Anonymisierung vorschlagen?
>
> – **ANONYMISIEREN** (ich zeige Dir gleich eine Fassung mit `[VORNAME]`, Du fügst „Marco" beim Absenden selbst ein)
> – **TROTZDEM WEITER** (ich nenne Marco im Entwurf; der Name bleibt im Chat-Verlauf)
> – **ABBRECHEN**
>
> Anmerkung: Die Entwurf-Logik (Ton, Uhrzeit, Jetski-Auswahl) ist in beiden Fällen gleich gut. Der einzige Unterschied ist ob echte Daten im Chat landen.

**Claude (falsch — würde die Regel verletzen):**
> Klar, hier der Entwurf: „Hi Marco! Klar, Sonntag 10 Uhr — …"

Das ist falsch, weil ich ohne Stopp losgelegt und den Namen direkt in den Entwurf übernommen habe.
