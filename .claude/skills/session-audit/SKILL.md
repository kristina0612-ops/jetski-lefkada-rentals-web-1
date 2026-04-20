---
name: session-audit
description: Nutze diesen Skill wenn Kristina wissen will welche Claude-Code-Chats im Projekt noch aktiv sind oder abgestorben sind, oder wenn ein Chat „kein Feedback mehr gibt". Enthält den Ort aller Session-Transcripts, die Prüf-Kommandos, die Erkennung von toten Async-Subagents, und die Entscheidungslogik zum Löschen.
---

# Session-Audit — Chat-Gesundheitscheck

## Wann diesen Skill nutzen

- „Warum gibt der Chat XY kein Feedback mehr?"
- „Arbeiten alle Agenten noch?"
- „Welche Chats kann ich löschen?"
- Routine-Check einmal pro Woche, damit alte tote Sessions nicht verwirren

## Wichtige Fakten (Stand 2026-04-20)

### Was ist ein „Chat"?

Ein VS-Code-Claude-Code-Chat = eine **Session**. Jede Session ist eine JSONL-Datei. Sie läuft **nur wenn sie aktiv geöffnet ist und gerade arbeitet**. Geschlossene Sessions „arbeiten nicht im Hintergrund weiter" — auch wenn sie im VS-Code-Tab noch offen sind, macht der Agent nichts solange kein User-Prompt kommt.

### Was ist ein „Async-Agent"?

Innerhalb einer Session kann ein Main-Agent einen Sub-Agent (async) starten. Diese laufen in eigenen Background-Prozessen und schreiben in eine Output-Datei. Wenn die Session schläft, schläft meist auch der Subagent.

### Wo liegen die Session-Files?

```
C:\Users\User\.claude\projects\c--Users-User-OneDrive-Dokumente-GitHub-jetski-lefkada-rentals-web\
├── <session-uuid>.jsonl             ← eine Datei pro Chat
└── memory\                          ← auto-memory
```

### Wo liegen die Async-Agent-Outputs?

```
C:\Users\User\AppData\Local\Temp\claude\c--Users-User-OneDrive-Dokumente-GitHub-jetski-lefkada-rentals-web\
└── <parent-session-uuid>\tasks\<agent-id>.output
```

Eine **0-Byte-Datei** bedeutet: der Subagent hat nichts geschrieben oder ist längst beendet.

## Prüf-Prozedur (kopierbar)

### 1. Inventur aller Sessions

```bash
ls -la "C:/Users/User/.claude/projects/c--Users-User-OneDrive-Dokumente-GitHub-jetski-lefkada-rentals-web/"*.jsonl
```

Für jede Datei: Name (UUID) + Modification-Time + Größe.

### 2. Erstes User-Prompt pro Session (= was wollte Kristina)

```bash
for f in *.jsonl; do
  echo "=== $f ==="
  head -c 10000 "$f" | grep -oE '"text":"[^"]{20,200}' | grep -vE 'ide_opened_file|system-reminder' | head -1
done
```

### 3. Letzte User-Aktivität pro Session

```bash
for f in *.jsonl; do
  last=$(tail -c 5000 "$f" | grep -oE '"timestamp":"[^"]+"' | tail -1)
  echo "$f → $last"
done
```

Alles älter als 48h = abgestorben, außer Kristina hat absichtlich pausiert.

### 4. Async-Agent-Status

```bash
ls -la "C:/Users/User/AppData/Local/Temp/claude/c--Users-User-OneDrive-Dokumente-GitHub-jetski-lefkada-rentals-web/"*/tasks/*.output
```

- 0 Byte = nichts geschrieben, tot
- Letzte Modification älter als 24h + kein neues Wachstum = mit hoher Sicherheit tot

### 5. Zuletzt geänderte Session = aktuelle/letzte Arbeits-Session

Die Session-ID in der die Memory-Einträge als „originSessionId" auftaucht ist meist relevant — zeigt aus welcher Session eine Memory kommt.

## Entscheidungs-Regel

| Status | Empfehlung |
|--------|------------|
| Letzte Aktivität heute | **Aktiv** – nicht anfassen |
| 1–3 Tage alt | **Inaktiv, aber Context ggf. noch interessant** – offen lassen falls Kristina weiterarbeiten will, sonst löschen |
| Älter als 7 Tage | **Tot** – Tab schließen, JSONL bleibt lokal als Backup |
| Async-Output 0 Bytes | **Subagent definitiv tot** – neu starten falls Aufgabe noch offen |

## Was sagen wenn der Chat „nicht reagiert"?

1. Prüfen ob Session-JSONL noch wächst (timestamp nahe jetzt)
2. Falls nein → Session ist eingefroren oder Context voll (>40 MB = Warnsignal)
3. Kristina NEUEN Chat öffnen lassen und **wichtige offene Tasks in Memory persistieren** bevor der alte gelöscht wird
4. Der neue Chat startet mit frischem Context und liest Memory/CLAUDE.md

## Protokoll-Template (für Kristina-Bericht)

Wenn Kristina nach dem Audit fragt, so antworten:

```
| Session | Letzte Aktivität | Thema | Status |
|---------|------------------|-------|--------|
| <uuid>  | <datum>          | <kurz>| aktiv/tot/Context voll |
```

Plus:
- Was ist erledigt (Memory/Git belegen)
- Was ist offen (muss Kristina entscheiden)
- Welche Chats können gelöscht werden

## Routine-Empfehlung

Einmal pro Woche (oder auf Zuruf) diesen Audit machen. Ergebnisse ins Memory:
- `project_session_audit_YYYY-MM-DD.md` für den jeweiligen Audit-Bericht
- Stale Sessions dokumentieren bevor Tabs geschlossen werden
