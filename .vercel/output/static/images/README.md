# Bilder-Ordner für die Website

## Was bereits drin liegt (Stand 2026-04-19)

### `customers/` – 11 echte Kundenfotos
- `nero-guest-01.jpg` bis `nero-guest-11.jpg`
- Quelle: WhatsApp, 19. April 2026 (PHOTO-2026-04-19-22-00-33…)
- DSGVO-Einwilligung: liegt vor (siehe `src/pages/privacy.astro` §10)
- Nutzung: Gallery2 (Auswahl), Testimonials-Hintergrund (optional), Hero-Poster

### `gallery/` – Highlight-Shots
- `fleet-at-lygia-collage.jpg` – 4er-Collage unserer Flotte am Dock
- `waterfun-jobe-action.jpg` – 3 Gäste auf dem Jobe-Tube in voller Action (auch auf Booking2)
- `waterfun-tube-in-water.jpg` – Tube im stillen Wasser, ruhiger Moment

### `jetskis/` – noch leer
Hier kommen saubere Einzel-Portraits der 4 Neros rein, sobald David bei ruhigem Wetter am Dock jeweils ein Foto pro Jetski macht (ohne Personen, ohne Wasserspritzer, Querformat).

---

## Wohin neue Bilder gehören

| Was | Ordner | Dateiname-Muster |
|---|---|---|
| Jetski-Einzelportrait (ohne Personen) | `jetskis/` | `nero-ena.jpg`, `nero-dio.jpg`, `nero-tria.jpg`, `nero-tessera.jpg` |
| Kundenfoto (mit Einverständnis) | `customers/` | `nero-guest-XX.jpg` (fortlaufend) |
| Spots, Dock, Action, Sonnenuntergang | `gallery/` | sinnvoller Name: `lygia-dock-01.jpg`, `sunset-ride.jpg`, `action-wave.jpg` |
| Preisliste, Flyer (nicht Website, nur intern) | `../../assets/brand/` | bleibt dort |
| Videos (Hero-Background) | `../videos/` | `hero-nero.mp4` (wird in Hero2 eingebunden) |

---

## Wie neue Bilder ins Projekt kommen

**Einfachster Weg:**
1. Windows-Explorer öffnen
2. Pfad eingeben: `C:\Users\User\OneDrive\Dokumente\GitHub\jetski-lefkada-rentals-web\public\images\<unterordner>`
3. Bilder reinziehen
4. Mir Bescheid sagen – ich baue sie in Gallery/Fleet/Hero ein

**NICHT:**
- auf Desktop in anderen Ordnern ablegen (z.B. „Kassabuch Jetski") – Astro pickt nur aus `public/`
- Online hochladen – alles läuft lokal, dann via Vercel-Build automatisch online

---

## Dateinamen-Konvention

- Nur Kleinbuchstaben + Bindestriche: `nero-ena.jpg` ✅, nicht `Nero Ena.JPG` ❌
- Keine Leerzeichen, keine Umlaute
- Format: `.jpg` oder `.webp`
- Empfohlene Breite: 1600 px (für Desktop-Retina)

---

## Bild-Qualität verbessern

Siehe `/docs/bildbearbeitung-guide.md` – Snapseed + Upscale.media Workflow für typische Problem­situationen (zu dunkle Gesichter, graues Wasser, unscharf).
