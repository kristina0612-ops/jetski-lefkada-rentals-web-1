---
name: security
description: Zentrale Security-Referenz für Nero Lefkada Rental&Retail. Nutze diesen Skill bei JEDEM Code-Change, der Auth, API-Routes, Datenbank-Zugriff, File-Uploads, externe Skripte oder ENV-Variablen berührt. Enthält OWASP-Top-10-Checkliste, Stack-spezifische Fallen (Astro/Vercel/Supabase/React), Secret-Management-Regeln und Incident-Response. Wird bei jedem /security-review und bei jedem Commit konsultiert.
---

# Security – Jetski Lefkada Rentals

Kristinas Anweisung vom 2026-04-18: „Bitte stelle auch immer sicher und prüfe
immer alles ob alles auch richtig ist die codes und alles damit wir keinen
hackangrif erleben, bitte bei diesem skill unbedingt immer recherchieren und wachsen."

Dieser Skill ist die **zentrale Security-Referenz**. Jeder Agent (und Claude
selbst) muss ihn konsultieren, sobald Code geändert wird, der Auth, Daten oder
externe Ressourcen berührt.

**Letztes Review:** 2026-04-18
**Nächstes geplantes Review:** monatlich + nach jedem npm-Audit-Alert

---

## 1. Aktueller Schutz-Stand (Snapshot 2026-04-18)

### Was bereits aktiv ist ✓

- **HTTPS erzwungen** via HSTS (`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`) in [vercel.json](vercel.json)
- **Clickjacking-Schutz** via `X-Frame-Options: DENY`
- **MIME-Sniffing-Schutz** via `X-Content-Type-Options: nosniff`
- **Referrer-Leak-Schutz** via `Referrer-Policy: strict-origin-when-cross-origin`
- **Permissions-Policy** restriktiv (camera/mic deaktiviert, geolocation nur self)
- **Admin/API nicht in Google indexierbar** (`X-Robots-Tag: noindex` für `/admin/*` + `/api/*`)
- **Secrets-Schutz im Repo:** `.gitignore` ignoriert `.env*` → Supabase-Keys können nicht versehentlich committed werden
- **`.env.example`** als sichere Vorlage ohne echte Secrets
- **DSGVO-Cookie-Banner** → GA4 nur mit Consent
- **SSL-Zertifikat** auto-managed via Vercel (Let's Encrypt, rotiert alle 90 Tage)

### Was fehlt – in Priorität ❌

| # | Lücke | Risiko | Aufwand | Status |
|---|---|---|---|---|
| 1 | **Rate-Limiting auf `/api/admin/login` + `/api/bookings` POST + `/api/expenses` POST** | Brute-Force auf Passwort, Spam-Buchungen/Ausgaben | 30 Min | ✅ erledigt 2026-04-18 (`src/lib/rate-limit.ts`: Login 5/15Min, Bookings & Expenses 20/5Min) |
| 2 | **Content-Security-Policy (CSP)** | XSS-Angriffe via injected Scripts | 2 h (wg. Inline-Styles/-Scripts prüfen) | 🟡 Report-Only ist aktiv in `vercel.json` (2026-04-18). Enforce-Umstellung nach 1–2 Wochen Monitoring. Aktuelle Allowlist: Google Tag Manager, Vercel Analytics, Supabase, GA4, Speed Insights, mixkit.co (Video) |
| 3 | **Preview-Deployment-Protection** | `/admin/*` auf öffentlichen Preview-URLs | 1 Klick Dashboard | 🎯 Pro ist aktiv – Dashboard-Klick offen: <https://vercel.com/kristina0612-ops-projects/jetski-lefkada-rentals.com/settings/deployment-protection> |
| 4 | **Dependabot** (GitHub) | Bekannte CVEs in Dependencies | 2 Klicks GitHub-Settings | ✅ erledigt 2026-04-18 (Kristina) |
| 5 | **`npm audit`** Routine | Siehe 4 | manuell / via Dependabot | läuft via Dependabot |
| 6 | **Admin-Passwort-Hashing** | Bei Leak direkt verwendbar | 1 h (bcrypt/argon2 prüfen) | 🔒 gesperrt auf Supabase-Aktivierung (Login ist STUB) |
| 7 | **CSRF-Token** auf State-Changing API-Routes | Session-Hijacking bei eingeloggtem Admin | 1 h | 🔒 gesperrt auf Supabase-Aktivierung |
| 8 | **Input-Validation** (zod o. ä.) auf API-Payloads | SQL-Injection via Supabase-RPC, NoSQL-Injection, Type-Confusion | 2-3 h | offen |
| 9 | **Subresource Integrity (SRI)** auf externe Scripts | Supply-Chain-Angriff auf CDN | 15 Min (aber GA4 rotiert → tricky) | Abwägung |
| 10 | **Vercel-Token rotieren** (Kristinas Chat-Leak 2026-04-18) | Vollzugriff auf Deploy-Pipeline | 2 Min Dashboard | **akut** |
| 11 | **Middleware JWT-Verify** | Auth-Bypass mit beliebigem Dummy-Cookie sobald Supabase aktiv | 30 Min | 🔒 gesperrt auf Supabase-Aktivierung |
| 12 | **Secret-Scanning + Push-Protection** (GitHub) | Versehentlicher Secret-Leak | 2 Klicks | ✅ erledigt 2026-04-18 (Kristina) |

---

## 2. OWASP Top 10 – Projekt-spezifisch

Referenz: <https://owasp.org/Top10/> (2021, aktualisiert laufend)

### A01: Broken Access Control
- **Unser Risiko:** `/admin/*`-Routes per Supabase-Session geschützt. Middleware
  [src/middleware.ts](src/middleware.ts) prüft Session. Wenn Middleware-Logik
  Bugs hat → unauthenticated Zugriff möglich.
- **Check:** Bei jedem Edit in `middleware.ts` oder `/api/admin/*` manuell
  testen: eingeloggt vs. nicht eingeloggt vs. falsche Role.
- **Tool:** Vercel Logs live beobachten bei Test.

### A02: Cryptographic Failures
- **Unser Risiko:** `ADMIN_PASSWORD_HASH` in ENV-Variablen.
- **Regel:** NIEMALS Klartext-Passwörter speichern, IMMER bcrypt (Kosten ≥ 12)
  oder argon2id.
- **Check:** `grep -r "password" src/ --include="*.ts"` – keine Klartext-Vergleiche
  (`password === "…"`). Nur Hash-Vergleich (`bcrypt.compare()`).

### A03: Injection
- **Unser Risiko:** Supabase-Client benutzen → parameterisierte Queries ja,
  aber `rpc()`-Calls + dynamische Filter können gefährlich sein. Auch:
  user-supplied Data in HTML (XSS).
- **Regel:**
  - Supabase: IMMER `.eq()`, `.filter()` etc. – niemals User-Input in
    raw SQL konkatenieren
  - HTML-Output: Astro escaped standardmäßig `{variable}`, aber `set:html={..}`
    umgeht das – mit Vorsicht nutzen, nur mit validiertem Input
- **Check:** `grep -r "set:html" src/` – jede Stelle auf vertrauenswürdigen
  Input prüfen.

### A04: Insecure Design
- **Unser Risiko:** Admin-Login hat aktuell keinen Brute-Force-Schutz → Angreifer
  kann beliebig viele Passwörter probieren.
- **Fix geplant:** Rate-Limiting (siehe §3 unten).

### A05: Security Misconfiguration
- **Schon ok:** `vercel.json` mit Security-Headers, `.gitignore` mit `.env*`.
- **Check:** Bei jedem Deploy die Headers via
  <https://securityheaders.com/?q=jetski-lefkada-rentals.com> prüfen.
  Ziel: Note **A** oder besser.

### A06: Vulnerable and Outdated Components
- **Unser Risiko:** React, Astro, Supabase-JS, weitere 200+ transitive Deps.
- **Routine:**
  - GitHub-Dependabot (sobald aktiviert) schickt PRs bei CVEs
  - Monatlich manuell `npm audit` laufen (braucht Node.js – derzeit nur auf Vercel)
  - Major-Updates mit Vorsicht (Breaking Changes – wie Astro 4→5)

### A07: Identification and Authentication Failures
- **Unser Risiko:** Nur Kristina hat Admin-Login. Session-Token-Handling via Supabase.
- **Regeln:**
  - Session-Cookies mit `Secure; HttpOnly; SameSite=Strict` (Supabase macht das default)
  - Kein Passwort in URL, Logs, Error-Messages
  - Password-Reset via sicheren Link (nicht implementiert – gewollt, weil nur eine User)

### A08: Software and Data Integrity Failures
- **Unser Risiko:** Externe Scripts ohne SRI (gtag.js von Google, Lenis via NPM).
- **Abwägung:** SRI auf GA4 ist schwierig, weil Google das Script rotiert.
  Akzeptables Risiko – Google ist vertrauenswürdige Quelle.

### A09: Security Logging and Monitoring Failures
- **Unser Risiko:** Kein zentrales Log-Monitoring. Vercel Runtime-Logs sind
  flüchtig (begrenzte Retention).
- **Heute:** Manuell im Vercel-Dashboard nachschauen bei Vorfällen.
- **Später:** Logging-Integration (Axiom, Better Stack, Logtail) wenn CRM produktiv.

### A10: Server-Side Request Forgery (SSRF)
- **Unser Risiko:** Niedrig – wir machen keine Server-Side-Requests zu
  user-supplied URLs. Wenn wir später Webhook-Features bauen: vorher Check.

---

## 3. Konkrete Fix-Rezepte (für offene Punkte aus §1)

### Rate-Limiting für `/api/admin/login`

Im einfachsten Fall: In-Memory Counter pro IP. Für uns OK, weil nur 1 Login-User
existiert und serverless-Instanzen kurzlebig sind. Robuster: Supabase-Table als
Counter-Store.

Skeleton:
```typescript
// src/pages/api/admin/login.ts
const attempts = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 15 * 60 * 1000; // 15 Min
const MAX_ATTEMPTS = 5;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress ?? "unknown";
  const now = Date.now();
  const rec = attempts.get(ip) ?? { count: 0, first: now };
  if (now - rec.first > WINDOW_MS) { rec.count = 0; rec.first = now; }
  if (rec.count >= MAX_ATTEMPTS) {
    return new Response("Too many attempts", { status: 429 });
  }
  rec.count++;
  attempts.set(ip, rec);
  // … normale Login-Logik
};
```

### Content-Security-Policy

**Vorsicht:** CSP zu strikt → Seite bricht. Erst im Report-Only-Modus testen:

```json
// vercel.json – ZUERST NUR ReportOnly, nicht enforce
{
  "key": "Content-Security-Policy-Report-Only",
  "value": "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://va.vercel-scripts.com; font-src 'self' data:; frame-ancestors 'none';"
}
```

Nach 1-2 Wochen Report-Only ohne Fehler: auf `Content-Security-Policy` (enforce) umstellen.

### Dependabot aktivieren

1. `https://github.com/kristina0612-ops/jetski-lefkada-rentals-web-1/settings/security_analysis`
2. „Dependabot alerts" einschalten
3. „Dependabot security updates" einschalten → automatische PRs bei CVEs
4. Optional: `.github/dependabot.yml` für wöchentliche Version-Updates

---

## 4. Secret-Management – harte Regeln

Siehe auch Memory: `feedback_secrets_handling.md`, `feedback_payment_red_line.md`.

- **Niemals Secrets im Chat** (Tokens, API-Keys, Passwörter, Private Keys)
- **Niemals Secrets im Git** (auch nicht in Kommentaren, Test-Daten, Docs)
- **Niemals Secrets in Logs** (bei Error-Messages: Redaction)
- **Secrets-Location:**
  - Lokal: `.env.local` (ignoriert in Git via `.gitignore`)
  - Production: Vercel Environment Variables
- **Rotation-Regel:** Token/Key der versehentlich geleakt wurde = KOMPROMITTIERT.
  Sofort rotieren (im jeweiligen Anbieter-Dashboard), selbst wenn „vielleicht
  niemand gesehen hat".

---

## 5. Security-Checkliste bei jedem Code-Change

Bevor Claude committed, diese Liste mental durchgehen:

**API-Routes (`src/pages/api/*`):**
- [ ] `export const prerender = false;` gesetzt?
- [ ] Input-Validation (Typen, Ranges, Format)?
- [ ] Auth-Check (Session-Cookie prüfen)?
- [ ] Rate-Limit (bei Login/Schreib-Operationen)?
- [ ] Error-Messages leaken keine internen Infos (keine Stack-Traces an Client)?
- [ ] SQL/NoSQL-Injection-sicher (parameterisiert)?

**Admin-Pages (`src/pages/admin/*`):**
- [ ] `export const prerender = false;`
- [ ] Session-Check im Frontmatter (redirect falls nicht eingeloggt)?
- [ ] Keine sensiblen Daten im HTML-Quelltext (API-Keys, etc.)?

**Frontend (`src/components/**/*.astro|tsx`):**
- [ ] Kein `set:html` mit User-Input (XSS)?
- [ ] Kein `dangerouslySetInnerHTML` in React ohne Sanitization?
- [ ] Externe Links mit `rel="noopener noreferrer"`?

**Dependencies:**
- [ ] Neue NPM-Packages geprüft? (Downloads pro Woche, letzter Commit, Maintainer, Reviews auf Snyk)
- [ ] Peer-Dependencies verstanden?
- [ ] Lockfile committed?

**Environment Variables:**
- [ ] Neue Secrets in `.env.example` dokumentiert (ohne Werte)?
- [ ] Neue Secrets im Vercel-Dashboard gesetzt?
- [ ] Korrekter Scope (Production / Preview / Development)?
- [ ] `PUBLIC_`-Prefix nur wenn Client-Exposure gewollt ist?

---

## 6. Incident Response – was tun wenn's passiert

### Szenario A: Secret geleakt (Chat, Commit, Log)
1. **Secret sofort rotieren** im Anbieter-Dashboard
2. Falls committed: `git rebase -i` + force-push (Secret auch aus History entfernen) – oder neuen Repo starten wenn unklar
3. Impact prüfen: Logs des Anbieters nach verdächtigen Zugriffen durchsuchen
4. Notiz in `feedback/security-incidents.md` (YYYY-MM-DD, Was passiert, Was wurde getan)

### Szenario B: Login-Bruteforce entdeckt (viele 401/403 in Vercel-Logs)
1. Rate-Limit sofort einbauen (siehe §3)
2. Admin-Passwort rotieren
3. Session-Tokens invalidieren (Supabase → Auth → Users → sign out user)
4. Optional: IP-Ban in `vercel.json` oder Cloudflare davor

### Szenario C: Verdächtiger Eintrag in Supabase
1. Supabase-Audit-Log checken (welcher Key hat die Änderung gemacht?)
2. Service-Role-Key rotieren
3. Datenbank-Backup einspielen (Supabase hat Point-in-Time-Recovery im Pro-Plan)
4. Kristina + David sofort informieren

### Szenario D: Website unerwartet offline / seltsame Inhalte
1. Vercel-Dashboard → Rollback zum letzten bekannt-guten Deploy
2. Git-History prüfen (`git log` – fremde Commits?)
3. GitHub → Security-Tab → Audit-Log (wer hat was gepusht?)
4. Alle Passwörter rotieren (Vercel, GitHub, Supabase, Google)

### Kontakte
- **Griechische Behörde für Cyber-Vorfälle:** Διεύθυνση Δίωξης Ηλεκτρονικού Εγκλήματος <https://www.astynomia.gr>
- **Datenschutzvorfall (Pflicht, DSGVO Art. 33, binnen 72 h):** HDPA <https://www.dpa.gr>

---

## 7. Regelmäßige Routinen

### Bei jedem Commit (automatisch durch Claude)
- `§5 Checkliste` durchgehen
- Bei auffälligen Findings: Fix in denselben Commit

### Wöchentlich
- Dependabot-Alerts checken und mergen (falls aktiv)
- Vercel-Deploy-Logs kurz überfliegen (Errors? Exceptions?)

### Monatlich
- `npm audit` ausführen (via Vercel CI oder manuell)
- Security-Headers-Check <https://securityheaders.com>
- Diesen Skill auf Aktualität prüfen (§1 Snapshot-Tabelle updaten)
- Neue Einträge in `feedback/security-incidents.md` reviewen

### Quartalsweise
- Passwort-Rotation (Admin-Login, Vercel-Token, falls vorhanden)
- OWASP Top 10 Changelog lesen – neue Risiken?
- Research-Blöcke: AI-Coding-Risks, Supply-Chain-News, Astro/Vercel-CVEs

---

## 8. Research-Quellen (zum Aktuell-halten)

- **OWASP Top 10:** <https://owasp.org/Top10/>
- **OWASP Cheat Sheet Series:** <https://cheatsheetseries.owasp.org/>
- **MDN Web Security:** <https://developer.mozilla.org/en-US/docs/Web/Security>
- **Snyk Vulnerability DB:** <https://security.snyk.io/>
- **GitHub Advisory Database:** <https://github.com/advisories>
- **Vercel Security Docs:** <https://vercel.com/docs/security>
- **Supabase Security:** <https://supabase.com/docs/guides/auth>
- **Astro Security:** <https://docs.astro.build/en/concepts/rendering-modes/#server-output>
- **Have I Been Pwned:** <https://haveibeenpwned.com/> – Kristinas E-Mail regelmäßig checken

---

## 9. Zusammenspiel mit anderen Skills und Agenten

| Partner | Interaktion |
|---|---|
| `vercel` | Security-Headers in `vercel.json`, Preview-Protection, Token-Handling |
| `domain-hosting` | DNS-Hijack-Prävention, Registrar-Lock, DNSSEC-Option |
| `/security-review` (Slash-Command) | Läuft diesen Skill als Basis + analysiert pending Changes |
| `website-analyst` (Agent) | Nutzt anonymisierte Daten (kein PII in Reports) |
| `review-responder` (Agent) | Antwortet nie mit internen Infos (Kunden-Namen aus anderen Reviews) |

---

## 10. Wartung dieses Skills

**Wann aktualisieren?**
- Nach jedem `/security-review`-Lauf (neue Findings dokumentieren)
- Nach jedem Security-Incident (Lessons Learned in §6 oder §1)
- Nach jedem Stack-Upgrade (Astro Major, Supabase Major, Vercel-API)
- Monatlich Stichprobe: sind die Links in §8 noch live? Gibt es neue OWASP-Einträge?

**Pflege-Regel:** Bei jeder Nutzung §1 (Snapshot) + §2 (OWASP-Liste für uns)
kurz durchfliegen. Wenn ein Punkt überfällig ist: Kristina mit JETZT/SPÄTER/SKIP
fragen.
