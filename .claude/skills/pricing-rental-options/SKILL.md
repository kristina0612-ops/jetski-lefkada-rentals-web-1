---
name: pricing-rental-options
description: Use whenever rental durations, rental option structures, or rental pricing for Jetski Lefkada Rentals is discussed or edited – including website pricing sections, booking forms, flyer updates, customer quotes, email replies about duration options, and any code change in `src/data/jetskis.ts`. Provides the single authoritative list of offered rental durations and tells agents where prices live and how to handle missing prices (never invent).
---

# Pricing & Rental Options – Jetski Lefkada Rentals

## Purpose
Single reference for **which rental durations Jetski Lefkada offers** and **where the prices live**. No agent may invent prices; if a duration is needed but not filled in below, ask David/Kristina.

## Canonical source of prices
**`DECISIONS.md`** is the only authoritative source for prices. `src/data/jetskis.ts` mirrors those values for the website. If the two diverge, `DECISIONS.md` wins and `jetskis.ts` must be updated.

## Rental options matrix

Legend: ✅ offered & priced · 🟡 offered but price TBD · ❌ not offered

| Duration / Option   | Status | Price source                                 |
|---------------------|--------|----------------------------------------------|
| 10 minutes          | 🟡 TBD | *Flyer mentions it – David/Kristina to confirm price & which jetskis* |
| 20 minutes          | 🟡 TBD | *Flyer mentions it – David/Kristina to confirm price & which jetskis* |
| 30 minutes          | 🟡 TBD | *Flyer mentions it – David/Kristina to confirm price & which jetskis* |
| 1 hour              | ✅     | `DECISIONS.md` · `jetskis.ts.pricePerHour`   |
| Half-day (4 hours)  | ✅     | `DECISIONS.md` · `jetskis.ts.priceHalfDay`   |
| Full-day (8 hours)  | ✅     | `DECISIONS.md` · `jetskis.ts.priceFullDay`   |
| Weekly rental       | 🟡 TBD | *Flyer mentions it – David/Kristina to confirm price & conditions* |
| **Water Fun** (3-Reifen-Tubing hinter Jetski) | ✅ **€30/Person** | *Bestätigt von Kristina 2026-04-17 – Offene Detailfragen: Mindestalter, Dauer pro Runde, Mindestpersonenzahl* |

## Open questions (as of 2026-04-17)

The 2026 flyer advertises **„10–20–30 minute rides"** and **„weekly rentals"** – these are not yet in `DECISIONS.md` or `jetskis.ts`. Until David/Kristina confirm, agents must:

1. Not quote a price for these durations.
2. If a customer asks about them: reply „Das klären wir kurz mit David und melden uns sofort." (or equivalent in customer language).
3. Not add 10/20/30-min or weekly options to the website until this file is updated.

## How to handle missing prices
If a quote / booking / copy task needs a price that is marked 🟡 TBD:
- Say so explicitly to Kristina before continuing.
- Offer a template reply that doesn't commit to a number.
- Do **not** extrapolate from hourly rates (e.g., „30 min = half hour = €47.50").

## Updating this file
When David/Kristina confirm prices for currently-TBD options:
1. Update `DECISIONS.md` first (authoritative).
2. Update `src/data/jetskis.ts` to mirror new pricing fields (add `priceByDuration` or similar if needed).
3. Update the matrix above (🟡 → ✅, fill price source).
4. Update the flyer description at `assets/brand/flyer-2026-description.md` (remove the „Hinweis zur Konsistenz" warning).
5. Update website pricing sections.
