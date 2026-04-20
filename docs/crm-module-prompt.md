# CRM-Prompt für neuen Chat (Module 3-7)

**Kopiere diesen Prompt in einen NEUEN Claude-Code-Chat wenn Du das CRM-Modul weiterbauen willst.**

Der alte CRM-Chat (`17fb3817` vom 17.04.) ist tot (Context-Overflow + Async-Agent seit Tagen beendet). Für einen sauberen Neustart: neuer Chat, klein und fokussiert, ein Modul nach dem anderen.

---

## Copy-Paste-Prompt (auf Deutsch)

```
Hi Claude, ich baue das CRM-System für Nero Lefkada Rental&Retail weiter.
Lies zuerst:
1. CLAUDE.md und DECISIONS.md
2. memory/MEMORY.md und alle Einträge unter memory/project_crm_*
3. memory/project_mydata_compliance.md (wichtig für Rechnungen)
4. memory/project_session_audit_2026-04-20.md (Status-Übersicht)
5. memory/feedback_legal_always_ask_first.md (meine Regel: vorher OK holen)
6. .claude/skills/fleet-analytics/SKILL.md
7. .claude/skills/website-analytics/SKILL.md

STATUS (20.04.2026):
- Modul 1 Preisrechner: ✅ fertig (Calculator.tsx)
- Modul 2 Website-Analytics: ✅ Skill + Agent konfiguriert
- Modul 3 CRM: ❌ noch nicht gebaut
- Modul 4 Kalender-Sync Outlook + Website: ❌
- Modul 5 Kassabuch: ❌
- Modul 6 Rechnungen (fortlaufend ab 001, myDATA/AADE): ❌
- Modul 7 USt-Nummer überall einpflegen: ⏳ wartet auf meine geschäftliche AFM

REGELN:
- Sprich immer Deutsch mit mir.
- Ein Modul nach dem anderen — nicht alles in einem Chat.
- Bei Legal/Steuer/Auth/Pflichtfelder: IMMER vorher mein JA abholen.
- Preise nur aus DECISIONS.md.
- Zugriff: CRM darf NUR ich + meine Agenten + mein Laptop haben (memory/project_crm_access.md).

Heutige Aufgabe: baue Modul 3 (CRM Buchungsübersicht).
Was ich mir vorstelle:
- Admin-Seite unter /admin/crm
- Login mit info@jetski-lefkada-rentals.com (Supabase Auth, existiert)
- Tabelle aller Buchungen: Datum, Zeit, Jetski (Ena/Dio/Tria/Tessera),
  Dauer, Kunde, Preis, Status (angefragt/bestätigt/durchgeführt/storniert)
- Filter nach Jetski-Einheit für Auslastung
- CSV-Export für die Buchhalterin

Schätz mir bitte zuerst wie lange das dauert und welche Fragen Du
hast, BEVOR Du anfängst zu coden. Wenn es passt geb ich Dir JA.
```

---

## Nach Modul 3: nächste Chats

Jedes Modul = ein eigener Chat. Kristina öffnet einen **neuen Chat** mit einem Prompt der:

1. Den aktuellen Stand liest (Memory + Code)
2. Nur DAS eine Modul baut
3. Bei Fertig → Memory-Eintrag `project_crm_module_X_done.md` erstellt
4. Bei Legal/Security-Entscheidung → Kristinas JA abholt

### Vorlage-Prompts für die weiteren Module

**Modul 4 — Kalender-Sync Outlook ↔ Website:**

```
Hi Claude, Modul 4: Outlook-Kalender mit Website-Buchungen synchronisieren.
Lies erst CLAUDE.md + memory/MEMORY.md + memory/project_crm_module_3_done.md.
Ziel: Jede bestätigte Buchung aus dem CRM erscheint als Termin in meinem
Outlook (Standard iCal-Feed). Falls ich einen Termin in Outlook anlege,
blockiert das den Jetski im CRM.
Fang mit einer Schätzung + Fragen an.
```

**Modul 5 — Kassabuch:**

```
Hi Claude, Modul 5: Kassabuch für Tageseinnahmen + Ausgaben.
Lies memory/project_crm_module_3_done.md + /admin/cash-book Code falls schon da.
Ziel: Einfache Tabelle pro Tag: Einnahmen (aus CRM-Buchungen) + Ausgaben
(manuell: Tankfüllung, Reparaturen, Marina-Gebühren etc.). Summe + Export.
Fang mit Schätzung + Fragen an.
```

**Modul 6 — Rechnungsmodul (myDATA/AADE):**

```
Hi Claude, Modul 6: Rechnungsmodul. ⚠️ GRIECHISCHES STEUERRECHT.
Lies ZWINGEND: memory/project_mydata_compliance.md + memory/project_open_legal_questions.md.
Meine geschäftliche AFM muss vorher da sein — prüfe das zuerst.
Ziel: aus jeder CRM-Buchung automatisch eine Rechnung mit fortlaufender
Nummer (startend bei 001), PDF-Export für die Buchhalterin, Upload an
AADE über myDATA API.
Bevor Du auch nur eine Zeile Code schreibst: frag mich alle offenen
Legal-Fragen durch und warte auf JA. Das hier ist kritisch.
```

**Modul 7 — USt-Nr. überall einpflegen:**

```
Hi Claude, Modul 7: Sobald meine geschäftliche AFM da ist, in allen
rechtlich relevanten Stellen eintragen.
Lies memory/project_company_nero.md + memory/project_legal_pages.md.
Stellen (aus dem Code greppen lassen):
- Impressum (/imprint)
- AGB (/terms)
- Datenschutz (/privacy)
- Rechnungen (Modul 6)
- Footer wenn nötig
Zeig mir den Diff bevor Du committest — Legal-Regel.
```

---

## Warum ein Modul = ein Chat

Im alten CRM-Chat wurden ALLE Module + Website-Polishing + Skill-Erstellung in einem Chat versucht. Ergebnis: 41 MB JSONL, Context-Overflow, Chat tot. Lektion:

- Ein Chat = ein klar umrissenes Ziel
- Memory als Schnittstelle zwischen Chats (Vorgänger-Chat dokumentiert Stand)
- Bei ersten Anzeichen von Überladung (Chat ist stundenlang offen, viele Themen gemischt): neuer Chat

---

## Wann Kristina um Hilfe bitten sollte

Bestimmte Dinge kann KEIN Chat alleine erledigen:

- **Geschäftliche AFM** — muss Kristina bei griechischer Steuerbehörde beantragen
- **myDATA-API-Zugang** — Antrag bei AADE, dauert 1–2 Wochen
- **Outlook-Kalender-iCal-Feed** — URL aus Outlook exportieren, Claude einfügen
- **Bank-Konto-Integration** — manuell, kein Claude-Tool dafür
- **Buchhalterin in Lefkada** — Fragen zu Vorsteuerabzug, Rechnungsformat etc.

Für diese Punkte bereitet Claude **eine Anleitung** vor — Kristina macht den externen Schritt.
