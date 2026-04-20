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

| File | Used where | Purpose |
|------|------------|---------|
| `nero-guest-01.jpg` | `src/data/jetskis.ts` | Fleet card for **Nero Ena** (David + son, silver-yellow Sea-Doo) |
| `nero-guest-02.jpg` | `src/components/v2/Gallery2.astro` | Gallery card **„Family time"** |
| `nero-guest-03.jpg` | **UNUSED** | Pool — available for new cards |
| `nero-guest-04.jpg` | `src/data/jetskis.ts` | Fleet card for **Nero Dio** (couple, grey-yellow Sea-Doo) |
| `nero-guest-05.jpg` | `src/components/v2/Gallery2.astro` | Gallery card **„Couple on the bay"** |
| `nero-guest-06.jpg` | **UNUSED** | Pool |
| `nero-guest-07.jpg` | `src/components/v2/Gallery2.astro` | Gallery card **„Thumbs up"** |
| `nero-guest-08.jpg` | `src/data/jetskis.ts` | Fleet card for **Nero Tria** (group shot, three jetskis) |
| `nero-guest-09.jpg` | `src/components/v2/Gallery2.astro` | Gallery card **„Muscle flex"** (red Nero Dio) |
| `nero-guest-10.jpg` | **UNUSED** | Pool |
| `nero-guest-11.jpg` | `src/data/jetskis.ts` | Fleet card for **Nero Tessera** (couple, blue Sea-Doo „Nestor") |

### Gallery assets (`public/images/gallery/`)

| File | Used where |
|------|------------|
| `waterfun-jobe-action.jpg` | `src/components/v2/Booking2.astro` (Water Fun block) + `src/components/v2/Gallery2.astro` (**„Water Fun"** card) |
| `waterfun-tube-in-water.jpg` | `src/components/v2/Gallery2.astro` (**„Tube moment"** card) |
| `fleet-at-lygia-collage.jpg` | **UNUSED** (removed 2026-04-20 per Kristina — keep file in case we need it later) |

**Exception:** `waterfun-jobe-action.jpg` appears twice (Booking2 + Gallery2). This is a known deliberate choice — the Water Fun add-on is the single most commercially important card and is worth the visual repetition. If it still bothers someone, use `nero-guest-09.jpg` in Gallery2 "Muscle flex" already covers the colour/energy — we can swap it there.

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

When Kristina asks for a new gallery card, first peek at these three.
