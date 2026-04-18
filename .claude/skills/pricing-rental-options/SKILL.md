---
name: pricing-rental-options
description: Use whenever rental durations, rental option structures, or rental pricing for Jetski Lefkada Rentals is discussed or edited – including website pricing sections, booking forms, flyer updates, customer quotes, email replies about duration options, and any code change in `src/data/jetskis.ts`. Provides the single authoritative list of offered rental durations and tells agents where prices live and how to handle missing prices (never invent).
---

# Pricing & Rental Options – Jetski Lefkada Rentals

## Purpose
Single reference for **which rental durations Jetski Lefkada offers** and **where the prices live**. No agent may invent prices; if a duration is needed but not filled in below, ask David/Kristina.

## Canonical source of prices
**`DECISIONS.md`** is the only authoritative source for prices. `src/data/jetskis.ts` mirrors those values for the website. If the two diverge, `DECISIONS.md` wins and `jetskis.ts` must be updated.

## Rental options matrix (aktualisiert 2026-04-18)

Legend: ✅ offered & priced · 🟡 offered but price TBD · ❌ not offered

**WICHTIG:** Flyer-Preise (Beach Rides, Exclusive, VIP Delivery) gelten für BEIDE Jetskis IDENTISCH. Classic-Preise (hourly/half/full) bleiben pro Jetski unterschiedlich.

### Classic (pro Jetski unterschiedlich)
| Option              | Status | Challenger | Acrobat |
|---------------------|--------|-----------|---------|
| 1 hour              | ✅     | €140      | €70     |
| Half-day (4 hours)  | ✅     | €420      | €210    |
| Full-day (8 hours)  | ✅     | €690      | €350    |

### Beach Rides (kurze Dock-Fahrten) – beide Jetskis gleich
| Duration | Status | Price |
|----------|--------|-------|
| 10 min   | ✅     | €80   |
| 15 min   | ✅     | €90 (BEST) |
| 20 min   | ✅     | €100  |
| 30 min   | ✅     | €130  |
| 60 min   | ✅     | €200 (BESTSELLER) |

### Exclusive Experiences – beide Jetskis gleich
| Option               | Status | Price |
|----------------------|--------|-------|
| Sunset Ride (30 min) | ✅     | €130  |
| Couple Ride (30 min) | ✅     | €150  |

### VIP Delivery Service – beide Jetskis gleich
| Option     | Status | Price |
|------------|--------|-------|
| 1 hour     | ✅     | €350  |
| Half Day (4h) | ✅  | €450  |
| Full Day (8h) | ✅  | €650  |
| Week       | 🟡     | On Request |

- Kraftstoff NICHT inklusive
- Kaution: **€1.500** nur bei Delivery

### Water Fun / Towable
| Option                | Status | Price |
|-----------------------|--------|-------|
| 10 min tube (pro Person) | ✅  | €30   |

- Tube-Modell: **Jobe Ridge III** (3 Sitze)
- Offene Detailfragen: Mindestalter, Mindestpersonenzahl

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
