# Bildbearbeitung für die Nero-Website – Guide für Kristina

> Ziel: Deine Kunden-Fotos und Jetski-Fotos so aufbereiten dass sie
> auf der Website schärfer, hellerer und professioneller aussehen.
> Keine Photoshop-Kenntnisse nötig – alles was ich hier empfehle ist
> kostenlos und Browser-/Handy-basiert.

---

## Was die Kunden-Fotos typisch brauchen (basierend auf den 11 Bildern die Du geschickt hast)

| Problem | Was hilft | Tool |
|---------|----------|------|
| Etwas unscharf (Handy-Kamera bei Sonne) | AI-Sharpen + Upscale | Upscale.media |
| Gesichter zu dunkel (Gegenlicht Sonne) | Shadows +40, Highlights -20 | Snapseed |
| Wasser wirkt grau statt türkis | Saturation + Vibrance leicht rauf | Snapseed |
| Komposition nicht gerade (schräger Horizont) | Auto-Rotate / Straighten | Jede App |
| Kontrast flau | +Contrast und +Clarity | Snapseed |
| Rauschen/Körnung (Handy bei Schatten) | AI-Denoise + Upscale | Topaz / Upscale.media |
| Hintergrund-Personen unscharf machen (Privacy) | Face-Blur | Photopea (Desktop im Browser) |

---

## Empfohlener 2-App-Workflow (kostenlos, 3 Minuten pro Foto)

### Schritt 1 – Handy: **Snapseed** (Android + iPhone)
Warum: 100% kostenlos, keine Werbung, 29 Tools, speichert ohne Qualitätsverlust.

1. App öffnen → Bild öffnen
2. Unten **„Tools" → „Tune Image"** (Bild optimieren)
   - Brightness: +10 bis +20 (heller)
   - Ambience: +15 (verstärkt Atmosphäre)
   - Saturation: +10 (mehr Farbe)
   - Shadows: +30 bis +50 (Gesichter im Schatten heller)
   - Highlights: -15 bis -30 (Himmel/Sonne nicht ausgebrannt)
   - Warmth: -5 (weniger Gelbstich, mehr frisch)
3. **„Details" → Structure: +25** (schärft ohne künstlich zu wirken)
4. **„Selective"** (wenn Gesichter immer noch dunkel):
   - Auf Gesicht tippen, nach oben wischen = Helligkeit punktuell erhöhen
5. **„Crop" → 16:9 oder 4:3** je nach Einsatz (siehe unten „Website-Formate")
6. Oben rechts **Häkchen → Export → „Speichern"** (überschreibt NICHT das Original)

**Profi-Trick für Lefkada-Türkis:** Tool **„White Balance" → Temperatur leicht kühler (-5), Tint leicht grüner (-3)**. Das Ionische Meer wird sofort türkiser.

### Schritt 2 – Browser: **Upscale.media** (optional, bei unscharfen Fotos)

Wenn das Handy-Foto zu klein oder zu unscharf für Desktop-Display ist:

1. <https://www.upscale.media> öffnen
2. Foto reinziehen
3. Option **„2x Enhance"** wählen (reicht meistens)
4. „Upscale Image" klicken
5. Nach ~10 Sek. fertig → „Download"
6. Datei in `public/images/gallery/` oder `public/images/customers/` ablegen

Alternative wenn upscale.media überlastet: <https://imgupscaler.ai> oder <https://www.iloveimg.com/upscale-image>

---

## Für Laptop-User (besser als Handy)

### Web-basiert (kein Download nötig)

| Tool | Was es gut kann | Link |
|------|----------------|------|
| **Photopea** | Wie Photoshop im Browser, kostenlos | <https://www.photopea.com> |
| **Canva** | Schnell Text/Layout auf Fotos | <https://canva.com> |
| **Pixlr** | Mid-level Editor, gute Presets | <https://pixlr.com/e> |
| **Upscale.media** | AI-Sharpen/Upscale (2–4×) | <https://www.upscale.media> |
| **Topaz (Web)** | Best-in-class Upscale, 10 Credits gratis | <https://www.topazlabs.com/tools/image-upscale> |

### Desktop (Download, kostenlos, pro-level)
- **Darktable** – wie Lightroom, open source (für RAW-Fotos)
- **GIMP** – wie Photoshop, open source

---

## Für schnelle Social-Media-Posts (Insta/Facebook)

**Adobe Lightroom Mobile** (Gratis-Version):
- Bessere Auto-Farbkorrektur als Snapseed
- Presets („Natural", „Vivid") treffen Mediterranean-Look direkt
- Gleiches Foto: 30 Sekunden bis zum fertigen Post
- Synct direkt mit Instagram

**VSCO** (Gratis-Version):
- Kult-Filter wie „A6" oder „C1" passen perfekt zu Strand/Jetski-Content
- 10 kostenlose Presets, dann Abo (wollen wir nicht)

---

## Website-Formate – Export-Einstellungen

**Wichtig: immer aus dem Original exportieren, nicht aus bereits komprimierter Version.**

| Einsatz | Breite | Höhe | Format | Qualität |
|---------|--------|------|--------|----------|
| Hero-Video-Alternative | 1920 px | 1080 px | WebP oder JPG | 82 |
| Fleet-Card (Jetski-Portrait) | 1600 px | 1100 px | WebP oder JPG | 82 |
| Gallery-Bild | 1400 px | variabel | WebP oder JPG | 80 |
| Testimonial-Avatar | 400 px | 400 px | WebP oder JPG | 85 |
| Instagram-Post | 1080 px | 1080 px (quadrat) oder 1350 px (Portrait) | JPG | 90 |

**Faustregel:** Dateigröße pro Foto sollte **unter 300 KB** liegen. Darüber wird die Website langsam und Google straft ab.

**Schnell komprimieren ohne Qualitätsverlust:** <https://squoosh.app> (von Google) – Foto reinziehen, Format WebP wählen, Quality auf 82, Download.

---

## Problem-Rezepte für typische Situationen

### „Das Gesicht ist komplett im Schatten"
Snapseed → Selective → Tippen auf Gesicht → hochwischen → Brightness +60.
Alternativ: Tune Image → Shadows +80.

### „Das Wasser sieht grau aus, sollte türkis sein"
Snapseed → White Balance → Temperatur −5, Tint +5.
Dann Tune Image → Saturation +15.
Beachten: NICHT über +25 gehen – sieht künstlich aus.

### „Der Himmel ist ausgebrannt, komplett weiß"
Snapseed → Tune Image → Highlights −50.
Wenn immer noch weiß: Selective auf Himmel → Brightness −30, Saturation +20.

### „Das Foto ist leicht schräg"
Snapseed → Perspective → Auto. Oder manuell Straighten-Tool (das mit der Wasserwaage).

### „Ich will Personen im Hintergrund unkenntlich machen"
Photopea (Browser) → Foto öffnen → Rechteck auswählen um Gesicht → Filter → Blur → Gaussian Blur → Radius 30. Speichern als JPG.

### „Ich will das Nero-Logo / Registriernummer im Bild retuschieren"
Snapseed → Healing Tool → Finger drüberziehen. Für präzise Arbeit: Photopea → Clone Stamp (S-Taste).

---

## Tools für Video (später, wenn das neue Hero-Video kommt)

- **CapCut** (kostenlos, Mobile + Desktop) – einfachster Video-Editor
- **DaVinci Resolve** (kostenlos, Desktop) – Pro-Level Color Grading
- **Adobe Express** (kostenlos, Browser) – schnelle Kürzung, Filter, Music

**Export für Website-Background:**
- MP4, H.264 Codec
- 1920×1080, 24 oder 30 fps
- Bitrate 4–6 Mbps
- Unter 15 MB halten (sonst zu langsam)
- **Ton entfernen** (Hero-Video läuft stumm, spart 50% Dateigröße)

---

## Mein Workflow-Tipp

Nicht jedes Foto einzeln editieren. Batch-Workflow:

1. Alle Kunden-Fotos von WhatsApp in einen Ordner „rohfotos-woche-XY" speichern
2. In Snapseed einmal ein Foto perfekt bearbeiten
3. **„Copy Edits"** (im Menü oben rechts)
4. Nächstes Foto öffnen → „Paste Edits" → nur noch minimal anpassen
5. So schaffst Du 20 Fotos in 10 Minuten

---

## Wenn Du unsicher bist

- Schick mir das Original-Foto + das bearbeitete Foto.
- Ich sage Dir konkret was noch fehlt.
- Oder: AURA Web (Daniel) macht für besonders wichtige Fotos (Hero / Homepage) einmal eine Pro-Bearbeitung.

---

## Quellen & Tool-Liste (Stand April 2026)

- [Snapseed](https://snapseed.online/) – 100% gratis, Google-App, 29 Tools
- [Upscale.media](https://www.upscale.media/) – AI-Upscale bis 8× kostenlos
- [iloveimg Upscale](https://www.iloveimg.com/upscale-image) – Backup-Tool
- [Imgupscaler.ai](https://imgupscaler.ai/) – bis 16K, kein Account nötig
- [Topaz Photo AI](https://www.topazlabs.com/tools/image-upscale) – Pro-Tool, 10 Credits gratis
- [Photopea](https://www.photopea.com) – Photoshop im Browser, kostenlos
- [Squoosh](https://squoosh.app) – Komprimierung von Google
- [Let's Enhance](https://letsenhance.io/) – alternative AI-Verbesserung
- [Canva](https://canva.com) – Layout + Text
- [Pixlr E](https://pixlr.com/e) – mittlerer Editor
- [Adobe Lightroom Mobile](https://lightroom.adobe.com) – Gratis-Version
- [Miricanvas](https://www.miricanvas.com/features/en/image-upscaler) – 1-Klick Upscale
- Artikelübersicht: [7 Best AI Image Enhancers 2026](https://aienhancer.ai/blog/7-best-ai-image-enhancers-for-sharpening-upscaling-in-2026)
- Apps-Übersicht: [Best photo editing apps 2026 – Amateur Photographer](https://amateurphotographer.com/round-ups/best-photo-apps-for-phones/)

---

**Investitionszeit:** 1× Snapseed installieren (2 Min), dann pro Foto 2–3 Min bearbeiten.
**Wirkung:** Kunden sehen Website-Fotos mit Wow-Effekt statt Handy-Schnappschuss-Look.
