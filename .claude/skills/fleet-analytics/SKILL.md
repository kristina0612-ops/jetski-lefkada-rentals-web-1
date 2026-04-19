---
name: fleet-analytics
description: Nutze diesen Skill wann immer Auslastung, Umsatz, ROI oder Buchungsverteilung pro Jetski-Einheit (Nero Ena/Dio/Tria/Tessera) fuer Nero Lefkada Rental&Retail berechnet werden soll. Enthaelt Formeln, Kennzahlen, Report-Format und Supabase-Query-Patterns. Wird vom fleet-utilization-analyst-Agent bei jedem Report konsultiert und komplementiert den website-analytics-Skill (der Website-Traffic abdeckt).
---

# Fleet Analytics – Nero Lefkada Rental&Retail

## Purpose
Berechnungs-Referenz fuer **Auslastung, Umsatz und ROI pro physischer Jetski-Einheit**. Der `fleet-utilization-analyst`-Agent nutzt dieses Skill als Formelsammlung. Andere Agenten koennen es konsultieren wenn sie unit-spezifische Kennzahlen brauchen.

---

## Die Flotte – final 2026-04-19

Vier physische Einheiten, Quelle: `src/data/jetskis.ts` → `jetskiUnits`. **Alle Sea-Doo supercharged, alle 3-Sitzer (mit 2-Personen-Empfehlung).**

| Unit-ID | Label | Modell | PS | Top-Speed | Status |
|---|---|---|---|---|---|
| `nero-ena` | Nero Ena | Sea-Doo 260 GTX Ltd Ed Supercharged | 310 | 120 km/h | active · Flagship |
| `nero-dio` | Nero Dio | Sea-Doo 260 RXT RS Riva Racing | 260 | 110 km/h | active |
| `nero-tria` | Nero Tria | Sea-Doo 260 GTX Ltd Ed Supercharged | 260 | 110 km/h | active |
| `nero-tessera` | Nero Tessera | Sea-Doo 260 GTX Ltd Ed Supercharged | 260 | 110 km/h | active |

Seriennummern, griechische ΛΣ-Registrierungen, Farben: werden nachgetragen wenn Kristina sie liefert.

**Preisgleichheit:** Alle 4 Neros kosten pro Kategorie IDENTISCH (Flyer 2026). ROI-Unterschiede entstehen nur durch unterschiedliche Buchungsverteilung + Wartungskosten, NICHT durch Preise.

---

## Datenquelle

**Supabase:** Tabelle `bookings`
- Relevante Spalten: `jetski_unit_id`, `booking_date`, `start_time`, `duration_minutes`, `total_price`, `status`
- Nur `status IN ('confirmed', 'completed')` fuer „aktive" Buchungen
- Nur `status = 'completed'` fuer **realisierten** Umsatz (Geld ist geflossen)

**Supabase:** Tabelle `payments`
- Summe aller `amount` pro `booking_id` → tatsaechlich eingegangener Betrag
- Wichtig wenn Anzahlung != Endpreis

**Quellen zur Auslastungs-Berechnung:**
- `DECISIONS.md` – Oeffnungszeiten: 10:00–13:00 + 16:00–19:00, Mai–September

---

## Kernformeln

### Auslastung
```
verfuegbare_stunden(zeitraum) = anzahl_offnungstage × 6h
gebuchte_stunden(unit, zeitraum) = SUM(duration_minutes) / 60
auslastung_prozent(unit, zeitraum) = (gebucht / verfuegbar) × 100
```

**Oeffnungstage** = Anzahl Tage im Zeitraum **intersected** mit Saison (Mai–September). Ausserhalb der Saison: 0 verfuegbare Stunden (Auslastung nicht sinnvoll).

### Umsatz
```
brutto_umsatz(unit, zeitraum) = SUM(total_price) WHERE status IN ('confirmed','completed')
realisiert_umsatz(unit, zeitraum) = SUM(payments.amount) JOIN bookings ON unit
netto_umsatz(unit, zeitraum) = brutto / 1.24  (falls 24% USt in GR zutrifft)
```

**Wichtig:** USt-Satz ist noch nicht 100% bestaetigt (siehe `project_mydata_compliance.md`). Aktuell rechne Netto nur wenn Kristina den Satz bestaetigt hat, sonst Brutto zeigen.

### Durchschnittswerte
```
avg_preis_pro_buchung(unit) = brutto_umsatz / anzahl_buchungen
umsatz_pro_stunde(unit) = brutto_umsatz / gebuchte_stunden
```

### Vergleich
```
delta_prozent = (aktueller_wert − vorperiode_wert) / vorperiode_wert × 100
delta_punkte (fuer Prozente) = aktueller_% − vorperiode_%
```

---

## Supabase-Query-Beispiele

**Umsatz pro Unit, letzte 7 Tage:**
```sql
SELECT
  jetski_unit_id,
  COUNT(*) AS bookings,
  SUM(duration_minutes) / 60.0 AS hours_booked,
  SUM(total_price) AS revenue,
  AVG(total_price) AS avg_price
FROM bookings
WHERE status IN ('confirmed', 'completed')
  AND booking_date >= CURRENT_DATE - INTERVAL '7 days'
  AND booking_date < CURRENT_DATE
GROUP BY jetski_unit_id
ORDER BY revenue DESC;
```

**Service-Mix pro Unit:**
```sql
SELECT
  jetski_unit_id,
  service_category,
  COUNT(*) AS count
FROM bookings
WHERE status = 'completed'
  AND booking_date >= '2026-05-01'
GROUP BY jetski_unit_id, service_category;
```

**Saison-Vergleich (Mai–September):**
```sql
SELECT
  EXTRACT(YEAR FROM booking_date) AS season,
  jetski_unit_id,
  SUM(total_price) AS revenue
FROM bookings
WHERE status = 'completed'
  AND EXTRACT(MONTH FROM booking_date) BETWEEN 5 AND 9
GROUP BY season, jetski_unit_id
ORDER BY season, jetski_unit_id;
```

---

## Kennzahlen die im Report auftauchen sollen

| Kennzahl | Einheit | Ziel-Wert (Hochsaison) |
|---|---|---|
| Auslastung pro Unit | % | > 60% |
| Umsatz pro Unit/Woche | € | je nach Modell |
| Durchschnittspreis pro Buchung | € | ~€110 (Mix-Schaetzung) |
| Umsatz/Stunde (Unit) | € | Challenger > €100, Acrobat > €60 |
| Service-Mix Beach Rides | % | 40-60% |
| Service-Mix Exclusive | % | 15-25% |
| Service-Mix VIP Delivery | % | 20-40% |

Zielwerte sind Orientierung, nicht Vorgabe. Je nach Saison-Phase variabel.

---

## Wartungs-Flags

Sea-Doo-Empfehlung:
- 10-Stunden-Inspektion (erste)
- 50-Stunden-Service
- 100-Stunden-Service (Oel, Impeller)
- 200-Stunden-Service (grosser Service)

**Flag-Logik im Report:**
- Wenn Gesamt-Stunden seit Kauf/letztem Service > 180 → **Mittel**
- Wenn > 200 → **Hoch**: „Service einplanen vor Hochsaison-Peak"

Die „Stunden seit Service"-Historie muss Kristina manuell pflegen — geplant: Feld in `jetskiUnits` (`hoursSinceLastService`) oder eigene `maintenance_log` Tabelle. Bis dahin: Agent kann Gesamtstunden aus Buchungen aggregieren und warnen.

---

## Report-Rhythmus

- **Woechentlich:** Sonntag 21:00 EET (Schedule-Job)
- **Monatlich:** 1. des Folgemonats
- **Ad-hoc:** auf Zuruf
- **Saison-Review:** 30. September (grosser Report mit Jahresvergleich)

---

## Empfehlungs-Framework

Wenn der Agent Empfehlungen gibt:

**Unterauslastung (<30% in Hochsaison):**
- Hypothese: Positionierung, Sichtbarkeit, Zustand
- Empfehlung: auf Website sichtbarer machen, Foto auffrischen, Preis-Test
- Kollaboration: `brand-assets` fuer neue Fotos, `website-analyst` fuer Fleet-Card-CTR

**Ueberauslastung (>90% konstant):**
- Hypothese: unterpriced, hohe Nachfrage
- Empfehlung: Preis-Test +10% fuer diese Unit, oder 5. Jetski pruefen
- Achtung: Preis-Tests nur nach Kristinas OK (`red-lines.md`)

**Wartungs-Bedarf:**
- Empfehlung: Service-Termin vor dem naechsten Peak-Weekend
- Kommunikation: „Diese Woche Mo/Di Wartung, Challenger #2 als Ersatz"

---

## Offene Punkte
- USt-Satz fuer Netto-Umsatz-Berechnung (kommt mit USt-Nr. + Buchhalterin-Klaerung)
- Wartungs-Log-Tabelle in Supabase (separates Modul spaeter)
- Saison-Schaetzung: Wie viele Oeffnungstage in 2026? (abhaengig von Wetter-Absagen)