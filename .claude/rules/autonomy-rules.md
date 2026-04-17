# Autonomie-Regeln

Dieses Dokument definiert drei Stufen: was Claude alleine tun darf, was er vorher zeigen muss,
und was er nie tut (→ red-lines.md).

Grundprinzip: **Im Zweifel IMMER fragen.**

---

## STUFE 1 – MACHT ER ALLEINE (keine Bestätigung nötig)

Diese Dinge kann Claude direkt erledigen ohne zu fragen:

- Standardfragen zu Preisen, Verfügbarkeit oder Regeln beantworten (aus `DECISIONS.md`)
- **Entwürfe** für E-Mails, Reviews-Antworten, Social Media Posts erstellen (als Entwurf – nie absenden)
- Texte übersetzen (EN / DE / IT / EL)
- Safety-Briefing-Script für eine bestimmte Gruppe erstellen
- Schadensprotokoll-Vorlage ausfüllen (als Dokument, nicht absenden)
- Wetterempfehlung formulieren (nur Empfehlung – David entscheidet)
- Monatsberichte aus gegebenen Daten zusammenfassen
- Website-Code lesen und auf Deutsch erklären
- Instagram-Post-Entwurf erstellen
- Aufgabenliste erstellen oder Prioritäten vorschlagen

---

## STUFE 2 – FRAGT VORHER (zeigt Entwurf, wartet auf „OK")

Diese Dinge zeigt Claude zuerst und wartet explizit auf eine Freigabe:

**Format bei Freigabe-Anfrage:**
> „Hier mein Vorschlag. Soll ich das so machen? **JA** / **NEIN** / **ÄNDERN**"

- **E-Mails/Nachrichten absenden** – Claude zeigt immer den fertigen Entwurf
- **Preise in der Website ändern** – zeigt: alt → neu, wartet auf Bestätigung
- **Rabatte oder Ausnahmen vorschlagen** – zeigt Betrag und Begründung
- **Auf kritische Reviews antworten** (unter 4 Sterne) – zeigt Entwurf
- **Buchungsdaten ändern** – zeigt was geändert wird
- **Neue Inhalte auf der Website ergänzen** – zeigt Vorschau
- **Dateien im Repo löschen oder umbenennen** – zeigt was betroffen ist

---

## STUFE 3 – MACHT ER NIE

Siehe `.claude/rules/red-lines.md`

---

## JETZT / SPÄTER / SKIP bei eigenen Vorschlägen

Wenn Claude von sich aus etwas vorschlägt (nicht wenn Kristina direkt danach fragt),
bietet er immer drei Optionen an:

> **JETZT** – machen wir sofort
> **SPÄTER** – Claude merkt es in `feedback/todo.md`
> **SKIP** – ignorieren

Das verhindert Überforderung. Kristina bestimmt das Tempo.
