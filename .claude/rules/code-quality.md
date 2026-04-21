# Code-Qualität – wann Claude was tut

**Gilt für ALLE Code-Tasks in diesem Projekt.** Ergänzt `autonomy-rules.md` (Stufen 1/2/3) und `basics.md` um konkrete Regeln für Code-Arbeit.

---

## Bei kleinen Changes (1–2 Dateien, < 30 Zeilen)

- Direkt umsetzen (fällt unter STUFE 1 in autonomy-rules)
- **Keine Kommentare** außer bei nicht-offensichtlichem WHY (z.B. ein Workaround für einen bekannten Bug, eine stille Annahme)
- **Keine ungefragten Refactors drumherum** – nur das ändern, was gefragt war
- Kurz rückmelden was geändert wurde (1 Satz), nicht was der Code tut

---

## Bei größeren Features (≥3 Dateien ODER neues Feature)

- **Schrittplan zeigen** bevor Code geschrieben wird, z.B.:
  > „Ich baue das in 3 Schritten:
  > 1. Datenmodell (Supabase-Tabelle)
  > 2. UI-Komponente
  > 3. Validierung + Fehlerbehandlung
  > Ich fange mit Schritt 1 an und stoppe danach."
- **Nach jedem Schritt: stoppen, auf JA warten** (JA / NEIN / ÄNDERN)
- **Nicht vorauseilen** – auch wenn Schritt 2 „offensichtlich" wäre

---

## Beim Reviewen von Code („check mal", „ist das okay?")

Checkliste in dieser Reihenfolge:

1. **Performance** – gibt es offensichtliche Bremsen? (N+1 Queries, unnötige Re-Renders, fehlende Caches)
2. **Readability** – würde eine neue Entwicklerin das in 5 Minuten verstehen?
3. **Error-Handling** – werden System-Boundaries validiert? (User-Input, externe APIs, ENV-Variablen)
4. **Struktur** – passt es in die v2-Architektur? (`src/components/v2/` für neue Komponenten)

**Ergebnis-Format:**
> „Gut: [...] – Fixbar: [...] – Ich würde ändern: [...]. **JA** ändern / **NEIN** so lassen / **ÄNDERN** in Richtung X?"

---

## Widersprüche zur „alten" Best-Practice-Schule (≠ 2022er-Stil)

Wir folgen **NICHT** folgenden Regeln, auch wenn sie in generischen „Best Practice"-Listen stehen:

- ❌ „Add comments explaining important parts" → Kommentare NUR bei nicht-offensichtlichem WHY
- ❌ „Always suggest improvements" → keine Scope-Erweiterung ohne Frage
- ❌ „Handle all edge cases" → nur System-Boundaries validieren, keine unmöglichen Szenarien

**Quelle:** Claude-Code-Systemprompt + bestehende Regeln in diesem Projekt.

---

## Verweise

- `autonomy-rules.md` – die 3 Autonomie-Stufen
- `basics.md` – Sprache, Kommunikationsstil
- `red-lines.md` – was nie geht
- `.claude/skills/security/SKILL.md` – Security-Review
- `.claude/skills/compliance-high-standard/SKILL.md` – Legal/Compliance-Standard
