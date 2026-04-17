# SPÄTER-Queue & offene Fragen

## CRM-Gesamtsystem (Auftrag vom 2026-04-17)

Bevor Module gebaut werden können, braucht Claude Antworten auf folgende Fragen:

1. **Kalender**: Welchen Kalender nutzt Du auf dem Laptop? (Outlook / Google Calendar / Apple iCloud / anderer)
2. **Buchungsweg heute**: Kommen Buchungen per WhatsApp/E-Mail und Du trägst sie manuell ein? Oder habt Ihr schon ein Online-Buchungstool?
3. **Buchhalterin Lefkada**: Welches Buchhaltungsprogramm nutzt sie? (Softone / Epsilon / Elorus / Tebi / anderes) — entscheidet ob wir Rechnungen selbst bauen oder in ihr System integrieren
4. **USt-Nummer**: Wann kommt sie ungefähr? (ohne geht keine Rechnung raus)
5. **Analytics**: Reicht Vercel Analytics (gratis, sofort aktivierbar) oder willst Du Google Analytics?

## Geplante Modul-Reihenfolge

1. **Preisrechner** – rein Website, kein Rechtsrisiko – kann starten sobald Fragen 1+2 geklärt sind (oder sogar vorher)
2. **Website-Analytics** aktivieren
3. **CRM + Kalender-Sync**
4. **Kassabuch**
5. **Rechnungssystem** – zuletzt, nach myDATA-Klärung mit Buchhalterin

## Referenzen
- Memory: `project_crm_roadmap.md`
- Memory: `project_mydata_compliance.md`
