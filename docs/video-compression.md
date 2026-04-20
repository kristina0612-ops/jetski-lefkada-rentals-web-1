# Hero-Video verkleinern (für Kristina)

**Problem:** `hero-nero.mp4` ist aktuell **33 MB**. Das ist 5× zu groß für ein Hintergrund-Video im Web. Auf Deiner DSL-Verbindung ruckelt das Laden, mobile Besucher warten 10+ Sekunden.

**Ziel:** Datei auf **5-8 MB** verkleinern ohne merklichen Qualitätsverlust.

## Die einfachste Lösung: Clideo.com (kostenlos, Browser)

1. Browser öffnen → https://clideo.com/compress-video
2. Button **„Choose File"** klicken
3. Datei auswählen: `c:\Users\User\OneDrive\Dokumente\GitHub\jetski-lefkada-rentals-web\public\videos\hero-nero.mp4`
4. Hochladen abwarten (1-2 Min auf DSL)
5. **Einstellungen:**
   - **Compression level:** „Medium" (gibt beste Balance)
   - **Format:** MP4 beibehalten
6. **„Compress"** klicken
7. Warten bis fertig (3-5 Min)
8. **„Download"** klicken → Datei heißt z.B. `hero-nero-compressed.mp4`

## Die Datei austauschen

1. Im Windows-Explorer: Öffne den Projekt-Ordner:
   ```
   c:\Users\User\OneDrive\Dokumente\GitHub\jetski-lefkada-rentals-web\public\videos\
   ```
2. **Die alte Datei nicht löschen**, stattdessen umbenennen:
   - `hero-nero.mp4` → `hero-nero-OLD-33MB.mp4` (rechter Mausklick → Umbenennen)
3. Die heruntergeladene komprimierte Datei **reinziehen** in diesen Ordner
4. Umbenennen: `hero-nero-compressed.mp4` → `hero-nero.mp4` (neuer Name = alter Name)
5. Fertig. Die Website nutzt automatisch das neue Video (gleicher Pfad).

## Test

- VS Code öffnen
- Terminal öffnen (Ctrl + `)
- Eingabe: `git add public/videos/hero-nero.mp4 && git commit -m "perf(hero): komprimiertes Video" && git push origin master`
- Ca. 2 Minuten warten bis Vercel deployt
- Website öffnen → Video sollte schneller laden

## Alternative Tools (falls Clideo nicht passt)

### HandBrake (Desktop-App, fortgeschritten, mehr Kontrolle)
- Download: https://handbrake.fr/
- Preset: **„Web > Vimeo YouTube HQ 1080p60"**
- Resultat: typisch 30-50% kleiner bei besserer Qualität

### FreeConvert.com
- https://www.freeconvert.com/video-compressor
- Limit: 1 GB kostenlos, sollte für Dich passen
- Einfacher als HandBrake, weniger Optionen

## Tipps

- **Nicht überkomprimieren.** Wenn das Video pixelig wirkt, nochmal mit höherer Bitrate probieren.
- **Auflösung:** 1920×1080 ist ideal für Hero-Videos. Wenn das Quellvideo kleiner ist (z.B. 1280×720), das beibehalten.
- **Framerate:** 30 fps reicht für Hero-Hintergründe. 60 fps ist Verschwendung.
- **Audio entfernen:** Das Hero-Video hat sowieso `muted` — du kannst die Audio-Spur entfernen und nochmal 30-40% sparen. In Clideo findest Du das unter „Advanced options".

## Warum nicht automatisch komprimieren?

Astro hat keinen eingebauten Video-Komprimierer. Es gibt Tools wie `ffmpeg` die ich (Claude) lokal bei Dir laufen lassen könnte — aber dafür müsste ffmpeg auf Deinem Laptop installiert sein, was es aktuell nicht ist. Das einmal aufzusetzen ist mehr Aufwand als Clideo.

Wenn Du das öfter machen willst (z.B. neue Videos pro Saison), können wir später `ffmpeg` installieren — dann läuft Komprimierung in einem Command.

## Wenn Du fertig bist

Sag mir kurz **„Video komprimiert"**, dann verifiziere ich dass die neue Größe live ist (`curl -I` auf die URL). Danach sollte der Hero-Bereich auch auf DSL-Verbindung smooth laden.
