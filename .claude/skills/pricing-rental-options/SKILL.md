---
name: pricing-rental-options
description: Use whenever rental durations, rental option structures, or rental pricing for Nero Lefkada Rental&Retail is discussed or edited – including website pricing sections, booking forms, flyer updates, customer quotes, email replies about duration options, and any code change in `src/data/jetskis.ts`. Provides the single authoritative list of offered rental durations and tells agents where prices live and how to handle missing prices (never invent).
---

# Pricing & Rental Options – Nero Lefkada Rental&Retail

## Purpose
Single reference for **which rental durations Nero Lefkada offers** and **where the prices live**. No agent may invent prices; if a duration is needed but not filled in below, ask Kristina.

## Canonical source of prices
**`DECISIONS.md`** is the only authoritative source for prices. `src/data/jetskis.ts` mirrors those values for the website. If the two diverge, `DECISIONS.md` wins and `jetskis.ts` must be updated.

## Rental options matrix (aktualisiert 2026-04-19, von Flyer 2026 bestätigt)

Legend: ✅ offered & priced · 🟡 offered but price TBD · ❌ not offered

**Alle 4 Neros (Ena/Dio/Tria/Tessera) kosten in jeder Kategorie IDENTISCH.** Es gibt KEINE Modell-spezifischen Preise mehr.

### Beach Rides (kurze Dock-Fahrten)
| Duration | Status | Price |
|----------|--------|-------|
| 10 min   | ✅     | €80   |
| 15 min   | ✅     | €90 (BEST) |
| 20 min   | ✅     | €100  |
| 30 min   | ✅     | €130  |
| 60 min   | ✅     | €200 (BESTSELLER) |

### Exclusive Experiences
| Option               | Status | Price |
|----------------------|--------|-------|
| Sunset Ride (30 min, 1 person) | ✅ | €130 |
| Couple Ride (30 min, 2 persons) | ✅ | €150 |

### VIP Delivery Service (Lieferung an Strand/Yacht/Boot)
| Option     | Status | Price |
|------------|--------|-------|
| 1 hour     | ✅     | €350  |
| Half Day (4h) | ✅  | €450  |
| Full Day (8h) | ✅  | €650  |
| Week       | 🟡     | On Request |

- **Fuel NOT included** (immer *klein dazuschreiben)
- **Kaution: €1.500** nur bei VIP Delivery
- Keine Kaution für Beach Rides / Exclusive / Towable

### Water Fun / Towable
| Option                | Status | Price |
|-----------------------|--------|-------|
| 10 min tube (pro Person) | ✅  | €30   |

- Tube-Modell (official flyer name): **„Jobe Ridge Towable 3P"** / Marketing-Name: „Great Big Mable"
- Gezogen von einem der Sea-Doos mit Guide

### Classic (hourly/half-day/full-day pro Jetski)
**Nicht mehr offiziell im Flyer 2026.** Falls Kristina das reaktivieren will, hier ergänzen.

## Pflicht-Vermerke (klein, auf jeder Preisliste)

- EN: `*without fuel — fuel billed separately at end of rental`
- DE: `*ohne Benzin — Kraftstoff wird am Ende der Miete separat abgerechnet`
- GR: `*χωρίς καύσιμα — τα καύσιμα χρεώνονται στο τέλος της ενοικίασης`

Plus auf Flotten-Section:
- EN: `*3-seater, but 2 persons recommended`
- DE: `*3-Sitzer, aber 2 Personen empfohlen`
- GR: `*3θέσιο, αλλά συνιστώνται 2 άτομα`

## How to handle missing prices
If a quote / booking / copy task needs a price that is marked 🟡 TBD:
- Say so explicitly to Kristina before continuing.
- Offer a template reply that doesn't commit to a number.
- Do **not** extrapolate from hourly rates (e.g., „30 min = half hour = €47.50").

## Updating this file
When David/Kristina confirm prices for currently-TBD options:
1. Update `DECISIONS.md` first (authoritative).
2. Update `src/data/jetskis.ts` to mirror new pricing fields.
3. Update the matrix above (🟡 → ✅, fill price source).
4. Update the flyer description at `assets/brand/flyer-2026-description.md`.
5. Update website pricing sections.

## Offene Punkte
- Wochenpreis VIP Delivery – „On Request"
- Anfangskaution für Beach Rides (nicht Delivery) – noch nicht definiert
