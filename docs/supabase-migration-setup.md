# Supabase-Migrations ausführen (für Kristina)

**Stand:** 2026-04-20

Wenn Du Code pushst, der auf eine Supabase-Tabelle oder RPC zugreift, musst Du die zugehörige SQL-Migration **einmalig** in Deinem Supabase-Projekt ausführen. Das passiert **nicht automatisch** — Vercel deployed nur den Astro-Code, nicht die Datenbank-Schemas.

## Schritt-für-Schritt

1. Browser öffnen → https://supabase.com
2. Einloggen mit Deinem Konto
3. Dein Projekt auswählen (meistens nur eins sichtbar)
4. Linke Sidebar: **„SQL Editor"** klicken (Symbol: `</>`)
5. Oben rechts: **„New query"** klicken
6. Neue Datei öffnen:
   - Im Repo: `supabase/migrations/YYYYMMDD_name.sql`
   - Aktuell verfügbar: `supabase/migrations/20260420_rate_limits.sql`
7. **Inhalt komplett kopieren** (Strg+A → Strg+C im VS Code Editor)
8. **Ins Supabase-SQL-Editor-Fenster einfügen** (Strg+V)
9. **„Run"** klicken (oder Strg+Enter)
10. Erwartete Ausgabe: `Success. No rows returned` oder ähnlich

**Das wars.** Die Tabelle/RPC ist jetzt in Deiner Supabase-Datenbank und die Website kann sie sofort nutzen.

## Wichtig

- **SQL-Migrationen sind kumulativ.** Einmal ausgeführt, nicht nochmal laufen lassen (außer die Datei wurde explizit geändert). Jede Migration hat `IF NOT EXISTS` oder `CREATE OR REPLACE` → Idempotent, kann theoretisch mehrfach laufen ohne Schaden.
- **Reihenfolge beachten.** Bei mehreren Migrationen die kleinere Datum-Zahl zuerst (YYYYMMDD-Präfix sortiert chronologisch).
- **Fehler-Fall:** Wenn die Migration nicht durchläuft, kopiere die Fehlermeldung und schreibs mir (neue Session). Oft ist es ein Permission-Problem (die Service-Role muss ausreichend Rechte haben) — das lösen wir dann zusammen.

## Wie ich es tracke

Alle SQL-Migrationen, die Du ausführen musst, liegen in `supabase/migrations/`. Jede hat ein Datum-Präfix (z.B. `20260420_rate_limits.sql`) und einen beschreibenden Namen. Der Inhalt hat oben immer einen Kommentar-Block der erklärt was die Migration tut und warum.

## Aktuelle Migrationen (Stand 2026-04-20)

| Datum | Datei | Zweck |
|---|---|---|
| 2026-04-20 | `20260420_rate_limits.sql` | Rate-Limit-Tabelle + RPC für persistenten Schutz gegen Brute-Force |

Nach Ausführung bitte mir kurz „Migration XYZ gelaufen" schreiben — dann aktualisiere ich diese Tabelle auf „✅ live".

## Optional: pg_cron für Aufräum-Jobs

Die Rate-Limit-Tabelle wächst mit der Zeit. Um alte Einträge automatisch zu löschen, kannst Du einen pg_cron-Job einrichten:

```sql
-- Nur einmal ausführen:
SELECT cron.schedule(
  'rate-limits-cleanup-nightly',
  '0 3 * * *',
  'SELECT public.rate_limits_cleanup()'
);
```

Das löscht täglich um 3 Uhr nachts alle Einträge, die älter als 1 Tag sind. Ohne diesen Job wächst die Tabelle langsam, schadet aber nicht (ein Eintrag ist < 100 Byte). Kannst Du auch später machen.
