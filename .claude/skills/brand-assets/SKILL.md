---
name: brand-assets
description: Use whenever working on customer-facing materials for Jetski Lefkada Rentals – marketing copy, social media posts, flyer updates, website text, email templates, Instagram captions, or any visual/design decision. Provides the official brand voice, slogans, taglines, color palette, contact details and flyer content so all agents stay consistent with Kristina's and David's brand identity.
---

# Brand Assets – Jetski Lefkada Rentals

## When to use this skill
Invoke this skill automatically when the current task involves any of:

- Writing or translating marketing copy (EN / DE / IT / EL)
- Drafting social media posts (Instagram, Facebook, TikTok)
- Creating or editing website content for `jetski-lefkada-rentals.com`
- Preparing email templates, booking confirmations, or customer replies where brand voice matters
- Designing or updating flyers, banners, signage, or any visual asset
- Answering questions about logo, colors, taglines or contact details

## Official slogans & taglines

- **Primary slogan:** *"Feel the Thrill. Live the Moment."*
- **Supporting tagline:** *"The Fastest Jet Skis on the Island."*
- **Availability badge:** *"Open Daily"*
- **Call to action:** *"Book Now!"*

Use these verbatim. Don't invent new slogans without Kristina's approval.

## Contact block (use exactly as written)

```
+30 69 55 61 2 777
www.jetski-lefkada-rentals.com
Instagram: jetski__lefkada   (double underscore!)
```

David's WhatsApp number `+30 695 561 2777` is the same phone – just differently spaced on the flyer.

## Color palette

| Role      | Hex approx   | Usage                                   |
|-----------|--------------|------------------------------------------|
| Sunset    | `#FF6B2C`    | Backgrounds, accents, warm gradients    |
| Deep blue | `#2B1B5E`    | Backgrounds, contrast areas             |
| Yellow    | `#FFD400`    | Headlines, checkmarks, CTAs – signal    |
| White     | `#FFFFFF`    | Body text on dark backgrounds           |

Yellow is the signal color – use it sparingly for the most important element on a page/post.

## Voice & tone (ties into `CLAUDE.md` and `feedback/tone.md`)

- „Du" bei deutschsprachigen Kunden – kein „Sie"
- Short sentences, active verbs, no marketing fluff
- Enthusiastic but honest – no empty promises
- Customer language: EN / DE / IT / EL depending on who writes

## Reference files

- **Full flyer content & visual description:** [`assets/brand/flyer-2026-description.md`](../../assets/brand/flyer-2026-description.md)
- **Original flyer image (once uploaded):** `assets/brand/flyer-2026.jpg`
- **Business context:** [`CLAUDE.md`](../../CLAUDE.md)
- **Pricing & policies:** [`DECISIONS.md`](../../DECISIONS.md)
- **Tone examples:** [`feedback/tone.md`](../../feedback/tone.md) and [`.claude/tone-examples.md`](../tone-examples.md)

## Guardrails

- **Never** change slogans, logo colors, or contact details without explicit OK from Kristina.
- **Never** invent pricing for marketing copy – always pull from `DECISIONS.md` / `src/data/jetskis.ts`.
- If new brand assets are created (logos, flyers, new motifs), document them in `assets/brand/` and update this skill.
