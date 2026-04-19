---
name: website-analytics
description: Nutze diesen Skill wann immer Website-Traffic, Besucher-Verhalten, Drop-offs, Conversion-Rates oder CRM-Korrelation fuer Nero Lefkada Rental&Retail untersucht werden soll. Enthaelt alle Datenquellen (GA4, Vercel Analytics, Supabase), API-Zugriffe, Analyse-Methoden, Funnel-Definitionen und Benchmark-Quellen. Wird vom website-analyst-Agent bei jedem Report konsultiert.
---

# Website & CRM Analytics – Jetski Lefkada Rentals

## Purpose
Single reference fuer **Datenquellen, Analyse-Methoden, Benchmarks und Report-Logik**. Der `website-analyst`-Agent konsultiert dieses Skill bei jeder Analyse.

---

## Datenquellen

### 1. Vercel Web Analytics
- **Status:** Aktiv seit 2026-04-18 (Script-Tag `/_vercel/insights/script.js` in beiden Layouts)
- **Dashboard:** https://vercel.com/kristina0612-ops/{project}/analytics
- **API:** REST, Bearer Token noetig
- **Daten:** Pageviews, Referrers, Laender, Geraete, Top-Pfade
- **Cookie:** keine, DSGVO-konform
- **Retention:** 30 Tage auf Free

### 2. Google Analytics 4 (GA4)
- **Status:** Aktiv seit 2026-04-18 (gtag.js in beiden Layouts)
- **Tracking-ID:** `G-MBLR2ODZES`
- **Dashboard:** https://analytics.google.com
- **API:** Google Analytics Data API v1 (OAuth / Service-Account)
- **Daten:** alles Vercel + Events, Funnel, Kohorten, User-Flow, Engagement, Scroll
- **Cookie:** ja, DSGVO: Banner-Frage noch offen
- **Retention:** 14 Monate

### 3. Supabase (CRM)
- **Status:** geplant fuer Welle 2, wartet auf Keys
- **API:** supabase-js
- **Daten:** `bookings`, `payments`, `expenses`, `invoices`

### 4. Google Search Console (optional)
- **Status:** nicht aktiv, Domain-Verifizierung offen
- **Daten:** Suchanfragen, Klicks, Rankings

---

## Conversion-Funnel

| # | Schritt | Messen in |
|---|---|---|
| 1 | Landing `/` | GA4 / Vercel |
| 2 | Fleet-Scroll >= 40% | GA4 Scroll |
| 3 | Klick auf Fleet-Card | GA4 Event |
| 4 | Booking-Scroll >= 70% | GA4 |
| 5 | Calculator-Kategorie | GA4 Event |
| 6 | Preis-Berechnung | GA4 |
| 7 | WhatsApp-Click | GA4 `data-cro="v2-calculator-whatsapp"` |
| 8 | CRM-Buchung | Supabase |

**Drop-off** = Verlust zwischen N und N+1.
**Conversion Rate** = Schritt 8 / Schritt 1.

---

## Custom Events (data-cro Attribute)

- `v2-booking-waterfun` – Water Fun Klick
- `v2-booking-whatsapp` – Fallback-WhatsApp
- `v2-calculator-whatsapp` – Calculator WhatsApp

**TODO:** weitere Attribute auf Fleet-Cards, Hero-CTAs, FAQ.

---

## Benchmarks (Stand 2026-04)

| Metrik | Tourism | Premium | Unser Ziel |
|---|---|---|---|
| Bounce Rate | 55-65% | 45-55% | < 50% |
| Session Duration | 2:00-3:00 | 2:30-4:00 | > 2:30 |
| Mobile Share | 65-75% | 60-70% | – |
| Conversion (Visit-Buchung) | 1-3% | 2-4% | > 2% |
| Booking Abandonment | 60-80% | 50-70% | < 60% |

**Quellen:** Baymard Institute, Statista, Similarweb, Think with Google.

---

## Report-Format

Vollstaendiges Template im Agent-File. Kurz:
- TL;DR (3 Saetze)
- Traffic + Vorperiode
- Top-Seiten
- Funnel + Drop-offs
- Benchmark
- 3-5 Verbesserungsvorschlaege priorisiert
- Offene Fragen

---

## Verbesserungsvorschlag-Struktur

1. Beobachtung (Daten)
2. Hypothese (Ursache)
3. Empfehlung (konkrete Aenderung)
4. Erwarteter Impact (+Quelle)
5. Aufwand (Stunden)
6. Prioritaet (Hoch/Mittel/Niedrig)
7. JETZT / SPAETER / SKIP

---

## Zeitplan

- Taeglich: kein Report, Dashboard direkt
- Woechentlich: Sonntag 20:00 EET via Schedule
- Monatlich: 1. Folgemonat
- Saison: 1. Mai, 30. September

---

## Privacy

- GA4 mit Cookies, Banner-Pflicht pruefen
- Vercel Analytics cookielos
- IP-Anonymisierung in GA4 aktivieren
