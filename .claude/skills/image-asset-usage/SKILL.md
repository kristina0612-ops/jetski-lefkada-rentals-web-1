---
name: image-asset-usage
description: Use whenever a photo, video or image asset in `public/` is being referenced, moved, replaced or added to the Nero Lefkada website. Enforces the rule that every asset appears at MOST ONCE on the public site (no duplicates across Hero, Fleet, Gallery, Testimonials, etc.). Contains the authoritative assignment map and an unused-asset pool for new cards.
---

# Image & Media Asset Usage — no duplicates rule

## The rule

**Every file under `public/images/` and `public/videos/` may appear AT MOST ONCE on the public website.** Kristina explicitly flagged duplicate photos as a quality issue on 2026-04-20: *„bitte keine fotos doppelt auf website, achte darauf"*.

Before adding a photo anywhere, **check the assignment map below**. If the photo is already in use, pick from the unused pool instead.

## Current assignment map (source of truth, 2026-04-20)

### Customer photos (`public/images/customers/`)

**Status 2026-04-20 Abend:** Alle Fleet-Karten zeigen bis zur Lieferung
der echten Studio-Fotos den `PhotoComingSoon`-Placeholder (keine Customer-
Fotos mehr auf Fleet-Karten). Entsprechend sind nero-guest-01/04/08/11
wieder im Pool, bis Kristina die echten Jetski-Fotos liefert.

| File | Used where | Purpose |
|------|------------|---------|
| `nero-guest-01.jpg` | **UNUSED** | Pool — war Fleet-Ena bis Abend 2026-04-20, jetzt frei |
| `nero-guest-02.jpg` | `src/components/v2/Gallery2.astro` | Gallery card **„Family time"** |
| `nero-guest-03.jpg` | **UNUSED** | Pool — available for new cards |
| `nero-guest-04.jpg` | **UNUSED** | Pool — war Fleet-Dio bis Abend 2026-04-20, jetzt frei |
| `nero-guest-05.jpg` | `src/components/v2/Gallery2.astro` | Gallery card **„Couple on the bay"** |
| `nero-guest-06.jpg` | **UNUSED** | Pool |
| `nero-guest-07.jpg` | `src/components/v2/Gallery2.astro` | Gallery card **„Thumbs up"** |
| `nero-guest-08.jpg` | **UNUSED** | Pool — war Fleet-Tria bis Abend 2026-04-20, jetzt frei |
| `nero-guest-09.jpg` | `src/components/v2/Gallery2.astro` | Gallery card **„Muscle flex"** (red Nero Dio) |
| `nero-guest-10.jpg` | **UNUSED** | Pool |
| `nero-guest-11.jpg` | **UNUSED** | Pool — war Fleet-Tessera bis Abend 2026-04-20, jetzt frei |
| `nero-guest-12.jpg` | `src/components/v2/Gallery2.astro` | Gallery card **„Group ride"** (three jetskis, group tour) — added 2026-04-20 |

### Gallery assets (`public/images/gallery/`)

| File | Used where |
|------|------------|
| `waterfun-jobe-action.jpg` | `src/components/v2/Booking2.astro` (Water Fun block — echter Jetski + Jobe-Tube, assigned 2026-04-20) |
| `waterfun-tube-action.jpg` | **UNUSED** — war bis 2026-04-20 in Booking2, zeigte aber Motorboot statt Jetski. File bleibt im Repo, sollte aber nicht mehr auf der Website landen. |
| `waterfun-tube-in-water.jpg` | **UNUSED** — Pool-Reserve für weitere Water-Fun-Flächen. |
| `fleet-at-lygia-collage.jpg` | `src/components/v2/Spots2.astro` (Position 6 „Lygia return" — assigned 2026-04-20, ersetzt das ortsbild-lastige `/spots/lygia.jpg`) |

### Videos (`public/videos/`)

| File | Used where |
|------|------------|
| `hero-nero.mp4` | `src/components/v2/Hero2.astro` (full-frame background, native loop) |
| `hero-nero-OLD-with-instagram-overlay.mp4` | **ARCHIVE** — do not use (Instagram Reel UI baked in, superseded 2026-04-20) |

### Brand assets (`assets/brand/`)

These are internal references (flyer PDFs, etc.) not shown on the website — no duplicate check needed there.

## How to use this skill

### When adding a new card/image to any component

1. Decide which file you want to use.
2. Check the table above — is it already listed with a "Used where"?
   - **Yes → pick a different file** from the "UNUSED / Pool" rows.
   - **No → use it, and update this skill's table** in the same commit.
3. After the commit, the table must still be complete (every used file listed).

### When removing a card/image

1. Find the file in the table, change "Used where" to "UNUSED / Pool" or delete the row if the file itself is gone.
2. Do NOT just delete the line without updating — the table is the only way agents know what's safe to reuse.

### When replacing one file with another

Treat it as remove-old + add-new, update both rows.

## Automated check (optional future work)

A tiny Node script could scan `src/` for every path like `/images/...` or `/videos/...` and flag duplicates. Not built yet. If it's built, place it at `scripts/check-image-duplicates.mjs` and run it in CI before deploy.

## Why this matters

- Kristina notices duplicates at a glance and reads them as sloppy craftsmanship.
- Visitors scrolling the site unconsciously register repetition as "small catalogue" — hurts conversion.
- Future agents without this skill file will unknowingly pair the wrong photo with an invented caption (GDPR risk per `project_no_fake_reviews.md` + DSGVO rules).

## Pool (photos currently unused, ready for new cards)

- `nero-guest-03.jpg` — need to check what it shows before assigning
- `nero-guest-06.jpg` — same
- `nero-guest-10.jpg` — same
- `waterfun-tube-action.jpg` — retired aus Booking2 am 2026-04-20 (Motorboot statt Jetski). Nicht erneut auf Website verwenden.
- `waterfun-tube-in-water.jpg` — Pool-Reserve für Water-Fun-Flächen.
- `/images/spots/lygia.jpg` — ausrangiert aus Spots am 2026-04-20 (zeigte Ort/Hafenufer, passte nicht zur Sea-Narrativ). Datei bleibt im Repo.

When Kristina asks for a new gallery card, first peek at these.
