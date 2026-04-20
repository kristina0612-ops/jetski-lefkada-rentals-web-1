# Entwurf – E-Mail an Daniel (AURA Web)

**Status:** Freigegeben von Kristina 2026-04-20, noch NICHT gesendet.
Vor dem Versand: Druckerei-Specs in Platzhalter einfügen und aktuelle Flyer-
Dateien anhängen.

---

**An:** Daniel (AURA Web)
**Betreff:** Flyer 2026 – Bleed + Text-Overlap-Fix vor Druck

Hi Daniel,

die Druckerei hat unseren 2026er-Flyer als nicht druckfertig zurückgewiesen –
Verschnitt passt nicht. Beim Nochmal-Hinschauen sind uns gleich zwei Dinge
aufgefallen, die wir zusammen fixen sollten, bevor die Auflage rausgeht:

## 1) Bleed fehlt (Druckerei-Problem)

Im Canva-PDF sind zwar die Schnittmarken an den Ecken gesetzt, aber der
Design-Bereich endet exakt auf der Endformat-Linie. Zwischen Motiv-Rand und
Schnittmarken ist alles weiß – kein echter 3-mm-Anschnitt. Das Hintergrundbild
muss an allen vier Seiten um 3 mm nach außen verlängert werden (Generative
Fill / Content-Aware klappt da gut).

## 2) Text-Overlap auf der Vorderseite

Die Jetski-Fahrerin in der Mitte verdeckt mehrere Textstellen:

- „weekly **montals**," → muss „weekly **rentals**," heißen
- „hourly rat…" → muss „hourly rates" sein (vollständig)
- „Ride with modern, well-maintained jet skis for a safe and amazing
  experience" → rechter Rand verschwindet hinter dem Motiv

Vorschlag: Textblöcke leicht nach links rücken oder das Jetski-Motiv einen
Tick kleiner – Hauptsache, alle Bullets liegen in der Safety Zone (5 mm
innerer Rand).

Details und Pixel-Positionen der drei Stellen findest Du im Anhang
`flyer-2026-problem-annotations.md`.

## 3) Bitte auch Rückseite (Preisliste) prüfen

Dort vermuten wir dasselbe Bleed-Problem, und „Delivery to any beach that you
want" steht unten direkt am Rand ohne Safety Margin.

## Druck-Specs

[PLATZHALTER – bitte vor dem Versand ausfüllen, wenn die Druckerei-Mail da ist]

Fallback-Werte falls noch nichts Schriftliches vorliegt:

- Endformat: A5 (148 × 210 mm)
- Bleed: +3 mm an allen 4 Seiten
- Safety Zone: 5 mm innerer Rand
- Farbprofil: CMYK FOGRA39
- Auflösung: 300 DPI at Endformat
- Dateiformat: PDF/X-1a
- Schnittmarken + Bleed Marks

## Anhänge

- `flyer-2026-print.jpg` (Vorderseite, aktueller Stand)
- `flyer-2026-pricelist.jpeg` (Rückseite, aktueller Stand)
- `flyer-2026-problem-annotations.md` (genaue Beschreibung der drei Text-
  Overlap-Stellen mit Bild-Bereichsangaben)
- [Druckerei-Spec-PDF, sobald vorhanden]

Kannst Du Dir das anschauen und mir sagen, wann Du es geschafft hast und was
es kostet? Wir brauchen am Ende ein PDF/X-1a, CMYK, 300 DPI, mit Schnittmarken
& Bleed Marks – bevor es zur Druckerei geht, machen wir gern noch eine
Preflight-Runde.

Danke Dir!
Kristina
