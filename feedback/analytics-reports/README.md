# Analytics Reports – Jetski Lefkada Rentals

Protokoll aller Website-Analytics-Reports vom `website-analyst`-Agent.

## Zweck
- Nachvollziehbare Datenhistorie ueber die Saison
- Messbarkeit ob Verbesserungen wirken
- Basis fuer Saison-End-Review und Folge-Jahr-Planung

## Dateistruktur
```
feedback/analytics-reports/
  README.md
  2026-04-20-kw16.md         woechentlich (Sonntag)
  2026-04-27-kw17.md
  2026-05-01-monat-april.md  monatlich (1. Folgemonat)
```

## Format
Vollstaendiges Template in `.claude/agents/website-analyst.md`. Kurz:
- TL;DR (3 Saetze)
- Traffic + Vorperioden-Vergleich
- Top-Seiten
- Funnel + Drop-offs
- Benchmark (recherchiert)
- 3-5 priorisierte Verbesserungsvorschlaege mit JETZT/SPAETER/SKIP
- Offene Fragen

## Rhythmus
- **Woechentlich:** Sonntag 20:00 EET (Schedule-Job)
- **Ad-hoc:** auf Zuruf von Kristina
- **Monatlich:** 1. des Folgemonats
- **Saison-Review:** 1. Mai + 30. September

## Nutzung
- Kristina liest TL;DR + entscheidet JETZT/SPAETER/SKIP
- JETZT: zustaendiger Agent setzt um
- SPAETER: `feedback/todo.md`
- Alte Reports bleiben, Historie ist wichtig

## Status
Noch keine Reports – erste kommt nach erster aktiver Woche mit echten Daten.
