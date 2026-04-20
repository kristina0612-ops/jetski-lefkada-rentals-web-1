---
name: google-business-profile
description: Nutze diesen Skill wenn es um das Google Business Profile (Google Maps-Eintrag) von Nero Lefkada Rental&Retail geht – Einrichtung, Verifizierung, Optimierung (Kategorien, Fotos, Öffnungszeiten), Beantwortung von Google-Bewertungen, oder Synchronisierung von NAP-Daten (Name/Adresse/Telefon) mit Website und Flyer. Enthält mehrsprachige Antwort-Templates (DE/EN/IT/EL) für den review-responder-Agent.
---

# Google Business Profile – Jetski Lefkada Rentals

## Wann diesen Skill nutzen

Automatisch triggern sobald die aktuelle Aufgabe einen dieser Bereiche berührt:

- Google Business Profile (ehemals Google My Business) einrichten, verifizieren oder optimieren
- Google Maps-Eintrag prüfen, aktualisieren oder einen Fehler korrigieren lassen
- Neue Google-Bewertung → Antwort erstellen (→ review-responder-Agent)
- NAP-Daten (Name/Adresse/Telefon) auf Website, Flyer und Google synchronisieren
- Lokales SEO (Kategorien, Keywords, Produktlistings, Fotos)
- Antworten auf Fragen von Interessenten die per Google Maps reinkommen
- Google-Posts für die Saison vorbereiten

## Stammdaten (autoritativ für alle Google-Felder)

| Feld | Wert |
|---|---|
| **Business name** | Jetski Lefkada Rentals |
| **Adresse** | Lygia Port (Λιμάνι Λυγιάς), 311 00 Lefkada, Griechenland |
| **GPS** | 38.7893°N, 20.7192°E |
| **Telefon** | +30 695 561 2777 (David, WhatsApp) |
| **Website** | https://www.jetski-lefkada-rentals.com |
| **Instagram** | @jetski__lefkada (doppelter Underscore!) |
| **Öffnungszeiten** | Mai–Oktober: Mo–So 09:00–21:00 durchgehend |
| **Nebensaison** | November–April: geschlossen (Saison-Business) |
| **Primärkategorie** | Jet Ski Rental Service |
| **Sekundärkategorien** | Boat Rental Service, Water Sports Equipment Rental Service |
| **Gegründet** | 2019 |
| **Geschäftsführerin (Impressum)** | Kristina Goldberg · öffentliche Marke „Nero Lefkada" · David = Guide/Ops vor Ort (Nachname nie im Marketing) |
| **Zahlungsmethoden** | Bar (EUR), Mastercard, Visa, Viva Wallet |

Datenquellen (nie duplizieren, immer auf diese verweisen):
- Geschäftsdaten: `DECISIONS.md`
- Kontakt/Brand: `.claude/skills/brand-assets/SKILL.md`
- Flotte: `src/data/jetskis.ts`
- GPS-Herkunft: `src/pages/imprint.astro` (autoritative Quelle seit Standortwechsel 2026-04-18) + `src/components/v2/Faq2.astro`

## Einrichtung

Vollständige Schritt-für-Schritt-Anleitung: `setup-anleitung.md`

Kurzversion:
1. Business-Google-Account vorbereiten
2. business.google.com → Profil anlegen
3. Adresse + GPS-Pin setzen (38.7893°N, 20.7192°E)
4. Videoverifizierung (schneller als Postkarte)
5. Website + Instagram einpflegen
6. Fotos hochladen (min. 10)
7. Öffnungszeiten mit Saison-Logik
8. Produkte (4 Jetskis) + Services anlegen
9. Q&A vorbefüllen
10. Place-ID im Website-Footer + Impressum verlinken

## Optimierungs-Checkliste

- [ ] **Fotos** – min. 10: je ein Foto pro Jetski (Nero Ena, Dio, Tria, Tessera), Dock von oben, Action-Shot, Safety-Briefing, Team-Foto David (Kristina nicht namentlich), Logo/Flyer, Sonnenuntergang, Water-Fun-Tube
- [ ] **Produkte** – 4 Produkte (Nero Ena, Dio, Tria, Tessera) mit Kurz-Specs (HP / Top-Speed / Sitze) + Link zur Website
- [ ] **Attribute** – *Online-Reservierung*, *Familienfreundlich*, *Parkplatz vorhanden*
- [ ] **Services** – Stundenmiete, Halbtagesmiete (4h), Ganztagesmiete (8h); Kurzfahrten 10/20/30 min + Wochenmiete erst wenn Preise final (offen seit 2026-04-17)
- [ ] **Beschreibung** – 750 Zeichen, Slogan *„Feel the Thrill. Live the Moment."* + „Family-run since 2019"
- [ ] **Q&A** – 3 selbst angelegte Fragen (aus FAQ-Draft übernehmen): Bootsführerschein / Stundenpreis / Treffpunkt
- [ ] **Google-Posts** – 1× pro Woche in der Saison (neue Fotos, Verfügbarkeit, Wetter-Tipp)

## Review-Management-Workflow

**Wer macht was:**

1. Google schickt Kristina eine E-Mail bei neuer Bewertung
2. Kristina wirft die Bewertung in den Chat – **oder** der wöchentliche Schedule holt sie Montags 09:00
3. `review-responder`-Agent erkennt Sprache (DE/EN/IT/EL), Sterne-Zahl und Kernthema
4. Agent lädt passendes Template aus `review-templates/{lang}.md` und erstellt 2–3 Varianten
5. Agent fragt Kristina: *„Hier mein Vorschlag. Soll ich das so machen? **JA / NEIN / ÄNDERN**"*
6. Bei **JA** → Text in `feedback/review-log.md` protokollieren, Kristina kopiert ihn und postet bei Google als Inhaber-Antwort
7. **Claude sendet niemals selbst** – rote Linie aus `.claude/rules/red-lines.md`
8. Bei **unter 4★**: Agent flaggt *„bitte David kurz abstimmen"* vor der Freigabe-Frage (siehe `.claude/rules/autonomy-rules.md`, STUFE 2)

**Templates nach Sprache:**
- `review-templates/de.md` – Deutsch
- `review-templates/en.md` – English
- `review-templates/it.md` – Italiano
- `review-templates/el.md` – Ελληνικά

Pro Sprache 4 Sterne-Stufen: 5★, 4★, 3★, 1–2★.

## Wöchentlicher Auto-Check

Aktiviert über den `schedule`-Skill (wird erst eingerichtet wenn das Google-Profil live ist):

- **Zeit:** Jeden Montag 09:00 Europe/Athens
- **Aktion:** `review-responder` prüft Bewertungen der letzten 7 Tage per WebFetch der öffentlichen Google-Maps-Seite
- **Benachrichtigung:** Kristina bekommt eine Zusammenfassung – auch wenn keine neuen Bewertungen da sind
- **Fallback:** Wenn Google den WebFetch blockt, sagt der Agent das explizit und bittet um manuelle Eingabe. Keine stillen Fehler.

## Guardrails (rote Linien)

- **Niemals selbst absenden** – nur Entwurf, Freigabe durch Kristina, Copy-Paste durch sie (siehe `.claude/rules/red-lines.md`, Abschnitt „Im Namen sprechen")
- **Niemals Preise in Google-Posts oder Antworten erfinden** – nur Werte aus `DECISIONS.md` / `src/data/jetskis.ts`
- **Niemals auf medizinische Fragen fachlich antworten** → immer Verweis auf 112
- **Niemals versuchen negative Bewertungen löschen zu lassen** oder Kunden dafür angreifen
- **Niemals Waiver-Inhalte öffentlich diskutieren** → Verweis auf direkten Kontakt (David WhatsApp)
- **Niemals griechisches Recht in Reviews interpretieren** → *„Das klären wir direkt, schreib David eine WhatsApp"*

## Verwandte Skills

- `brand-assets` – Slogans, Farben, Signatur („– David & Kristina")
- `pricing-rental-options` – wenn Bewertung Preis-Fragen enthält
- `domain-hosting` – für Website-Link-Konsistenz
- FAQ-Draft (`.claude/drafts/faq-content-draft.md`) – Quelle für Q&A-Texte im Profil

## Referenz-Dateien

- `setup-anleitung.md` – Profil anlegen, Schritt für Schritt
- `review-templates/` – mehrsprachige Antwort-Vorlagen
- `feedback/review-log.md` – Protokoll aller gesichteten Bewertungen
- `.claude/agents/review-responder.md` – Agent-Definition
