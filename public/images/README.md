# Bilder-Ordner für die Website

So legst Du Bilder ins Projekt damit ich sie einbauen kann:

## 1. Wohin welche Bilder?

### `jetskis/` – Einzelne Jetski-Portraits
Saubere Fotos von je einem Nero (möglichst ohne Personen, fürs Produkt-Grid):

- `nero-ena.jpg` – der Sea-Doo 260 GTX Ltd 310 PS (Flaggschiff)
- `nero-dio.jpg` – der Sea-Doo 260 RXT RS Riva Racing
- `nero-tria.jpg` – der Sea-Doo 260 GTX Ltd 260 PS
- `nero-tessera.jpg` – der Sea-Doo 260 GTX Ltd 260 PS

Empfohlen: Querformat ca. 1600×1100 px, Jetski mittig/leicht rechts, viel Wasser/Himmel.

### `gallery/` – Fotos von Spots, Fahrten, Flotte
Landschaftsbilder + Action-Fotos aus Lefkada:

- `lygia-dock-01.jpg`, `lygia-dock-02.jpg` – Dock/Flotte am Hafen
- `action-01.jpg`, `action-02.jpg`, ... – mehrere Jetskis fahren / Wellen
- `sunset-01.jpg` – Sonnenuntergang-Ride
- Beliebige weitere mit aussagekräftigen Namen

### `customers/` – Kundenfotos (mit Einverständnis)
Nur Fotos mit dokumentierter Einwilligung der abgebildeten Personen:

- `customer-2024-01.jpg`, `customer-2024-02.jpg`, ...
- `customer-2025-01.jpg`, ...

## 2. Wie die Bilder ins Projekt kommen

**Variante A – Windows Explorer:**
Einfach die Bilder in den jeweiligen Unterordner ziehen:
`C:\Users\User\OneDrive\Dokumente\GitHub\jetski-lefkada-rentals-web\public\images\<unterordner>\`

**Variante B – VS Code:**
1. Linke Seitenleiste: öffne den Ordner `public/images/jetskis/` (oder `gallery/` / `customers/`)
2. Ziehe die Bilder per Drag&Drop direkt in die Dateiliste
3. Fertig

**Variante C – WhatsApp Desktop:**
Rechtsklick auf Bild → „Speichern unter…" → wähle den passenden Ordner oben.

## 3. Dateinamen

- Nur Kleinbuchstaben und Bindestriche: `nero-ena.jpg`, nicht `Nero Ena.JPG`
- Keine Umlaute oder Sonderzeichen
- Format `.jpg` oder `.webp` – Claude kümmert sich um die Optimierung beim Build

## 4. Auflösung

Minimum 1600 px Breite für Fleet-Section und Hero-Backgrounds, sonst werden sie auf Desktop unscharf. Handy-Fotos vom iPhone/Android sind standardmäßig groß genug.

## 5. Was danach passiert

Sobald die Bilder hier liegen, sag einfach „Bilder sind da" – ich baue sie in Fleet2, Gallery2 und ggf. Testimonials ein und passe alt-Texte korrekt an.
