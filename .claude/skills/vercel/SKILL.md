---
name: vercel
description: Vollständiges Wissen zu Vercel-Hosting für Nero Lefkada Rental&Retail – Deployment-Workflow, Environment Variables, Security-Headers, Adapter-Konfiguration, Analytics, Limits, Troubleshooting, CLI. Nutze diesen Skill bei ALLEN Fragen rund um Deploy, Build, Preview-URLs, Domains, ENV-Vars, Rollbacks oder Vercel-spezifischen Astro-Integrationen.
---

# Vercel – Jetski Lefkada Rentals

Dieser Skill ist die zentrale Referenz für alles, was mit Vercel zu tun hat.
Von allen Agenten lesbar. Bei jeder Nutzung: **am Anfang prüfen, ob der Stand
unten noch aktuell ist** (Stichproben machen, bei Zweifel Kristina fragen).

**Letztes Review:** 2026-04-18
**Nächstes geplantes Review:** bei jedem Deploy-Fehler oder alle 90 Tage

---

## 1. Aktueller Stand (Snapshot 2026-04-18)

| Komponente | Wert |
|---|---|
| Account/Team | `kristina0612-ops-projects` (Team-Slug) |
| Plan | **Pro** (bestätigt 2026-04-18 von Kristina). Commercial Use ist damit rechtlich abgedeckt (Hobby-Plan erlaubt Commercial Use explizit NICHT). |
| Projekt-Slug | `jetski-lefkada-rentals.com` |
| Produktions-URL | https://jetski-lefkada-rentals.com |
| Preview-URLs | `{branch}-{hash}-kristina0612-ops-projects.vercel.app` |
| Framework | Astro 5.1 Hybrid |
| Adapter | `@astrojs/vercel` ^8.0 (serverless) |
| Node-Version | Default (Vercel nimmt die LTS aus `.nvmrc` oder Node 22) |
| Region | Auto (Vercel Edge Network) |
| SSL | Auto-managed (Let's Encrypt) |
| Domain | bei Vercel Domains registriert, Auto-Renewal |
| Analytics | Vercel Web Analytics (via `@vercel/analytics/astro`) + GA4 (`G-MBLR2ODZES`) parallel |
| Speed Insights | **nicht aktiviert** (Empfehlung: einschalten, siehe §8) |
| Preview Protection | **zu prüfen** – auf Pro möglich, Dashboard-Setting (siehe §11) |

---

## 2. Deployment-Workflow (Zwei-Repo-Setup)

**Wichtig:** Es gibt zwei GitHub-Repos – Vercel watcht den einen, wir arbeiten am anderen.

| Remote-Name | GitHub-Repo | Branch | Zweck |
|---|---|---|---|
| `origin` | `kristina0612-ops/jetski-lefkada-rentals-web-1` | `master` | Arbeits-Remote |
| `vercel` | `kristina0612-ops/jetski-lefkada-rentals-web` | `main` | Deploy-Trigger |

**Nach jedem normalen Push:**
```bash
git push origin master
git push vercel master:main --force
```

Der zweite Push überträgt den Master-Stand als `main` ins Vercel-Repo → Vercel
baut automatisch. Force-Push ist OK, weil der Repo nur als Deploy-Spiegel dient.

**Merken:** Wenn die Website sich trotz erfolgreichem `origin`-Push nicht
aktualisiert → `vercel`-Remote wurde vergessen.

**Sauberer Weg (TODO für Kristina):** Im Vercel-Dashboard →
Project Settings → Git → Repo auf `…-web-1` + Branch auf `master` umbiegen.
Dann fällt der zweite Push weg. Ein Klick, aber Dashboard-Zugriff nötig.

---

## 3. Build-Prozess

**Vercel führt bei jedem Deploy aus:**
1. `git clone` des Vercel-Repos
2. `npm install` (liest `package.json` + `package-lock.json`)
3. `npm run build` → `astro build`
4. Output wird hochgeladen:
   - Statische Seiten (`/`, `/v1`, `/v3`, `/terms`, `/privacy`, `/imprint`, `/safety`) → Edge CDN
   - Dynamische Routen (`/admin/*`, `/api/*`) → Serverless Functions

**Build-Logs ansehen:** Dashboard → Project → Deployments → auf den Commit klicken.

**Wenn Build fehlschlägt:** Logs lesen (häufigste Ursachen: fehlende ENV-Var,
Syntax-Fehler, neue Dependency nicht in `package.json`, TypeScript-Fehler).

---

## 4. Environment Variables

### Wo werden sie gesetzt?

| Umgebung | Wo | Wie |
|---|---|---|
| **Production** (jetski-lefkada-rentals.com) | Vercel Dashboard → Settings → Environment Variables | Scope: Production + Preview |
| **Preview** (PR-/Branch-Deploys) | gleich wie Production, Scope „Preview" | Optional separate Werte möglich |
| **Lokal** (`npm run dev`) | `.env.local` im Repo-Root (in `.gitignore`, nie committen) | Kopie von `.env.example`, Werte eintragen |

### Variablen des Projekts (Stand 2026-04-18)

Siehe `.env.example` als Vorlage. Aktuell verwendet der Code:

| Name | Zweck | Scope | Client-sichtbar? |
|---|---|---|---|
| `PUBLIC_SUPABASE_URL` | Supabase Projekt-URL | Prod + Preview + Dev | Ja (`PUBLIC_`-Prefix) |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon-Key (RLS-geschützt) | Prod + Preview + Dev | Ja |
| `SUPABASE_SERVICE_ROLE_KEY` | Super-User-Key (Server-Side only!) | Prod + Preview + Dev | **Nein** – darf nie im Client-Bundle landen |
| `CALENDAR_FEED_TOKEN` | iCal-Feed-Authentifizierung | Prod + Preview + Dev | Nein |
| `ADMIN_EMAIL` | Kristinas Login | Prod | Nein |
| `ADMIN_PASSWORD_HASH` | bcrypt-Hash des Admin-PW | Prod | Nein |

### Regeln
- **`PUBLIC_`-Prefix** → Variable wird ins Client-Bundle gebacken (Browser-sichtbar). Nur für Dinge benutzen, die ohnehin öffentlich sind (Anon-Keys mit RLS).
- **Ohne Prefix** → Nur Server-Side verfügbar (Serverless Functions, API-Routes).
- **Secrets niemals** in `.env.example`, im Chat oder in Commits.

### CLI (optional, wenn Vercel-CLI installiert ist)
```bash
vercel env pull .env.local              # Zieht alle Prod-Vars lokal
vercel env add MEINE_VAR production     # Legt neue Var in Prod an
vercel env rm MEINE_VAR production      # Löscht Var
```

---

## 5. `vercel.json` (Security-Headers + Routing)

Liegt im Repo-Root. Aktuell konfiguriert:

- **Global:** HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- **`/admin/*`:** `X-Robots-Tag: noindex, nofollow` (damit Admin nicht in Google-Suche landet) + `Cache-Control: no-store`
- **`/api/*`:** `X-Robots-Tag: noindex` + `Cache-Control: no-store`

**Wann ändern?**
- Neue Security-Headers: z. B. CSP (Content-Security-Policy) wenn wir Inline-Scripts auditieren
- Redirects: `redirects:` Key ergänzen (aktuell keiner, `/v2 → /` ist in `astro.config.mjs`)
- Rewrites: z. B. proxy zu externer API – nur wenn nötig

**Regel:** `vercel.json` so minimal wie möglich halten. Viele Sachen kann
Astro selbst (Redirects, Meta-Tags, `robots.txt`).

---

## 6. Domain & DNS

- **Registriert bei:** Vercel Domains
- **Kosten:** ~$11,25/Jahr, Auto-Renewal
- **DNS:** Zero-Config (Vercel managed Nameserver)
- **SSL:** Auto (Let's Encrypt, rotiert alle 90 Tage)

### Google Search Console anbinden (offene Aufgabe)

Schritte:
1. https://search.google.com/search-console öffnen → **Eigenschaft hinzufügen → Domain** (nicht „URL-Präfix")
2. Google zeigt einen TXT-Record à la `google-site-verification=abc123…`
3. Vercel Dashboard → Domains → `jetski-lefkada-rentals.com` → DNS Records → **Add** → Type `TXT`, Name `@`, Value der Google-Wert
4. Zurück zu Search Console → „Verify" klicken
5. Nach Verification in Search Console **Sitemap einreichen:** `https://jetski-lefkada-rentals.com/sitemap-index.xml` (Astro generiert die automatisch – falls nicht: Integration `@astrojs/sitemap` hinzufügen, separate Aufgabe)

Danach sieht Kristina in Search Console:
- Welche Suchanfragen bringen Traffic
- Welche Seiten sind indexiert
- Rankings und Klick-Raten

---

## 7. Analytics (zwei Systeme parallel)

### Vercel Web Analytics
- Eingebaut via `@vercel/analytics/astro` als `<Analytics />` Component in beiden Layouts
- Dashboard: https://vercel.com/kristina0612-ops-projects/jetski-lefkada-rentals.com/analytics
- **Cookie-frei → DSGVO-konform ohne Banner**
- Daten: Pageviews, Referrer, Länder, Geräte, Top-Pfade
- Retention: auf Pro **länger als 30 Tage** (siehe §12 zum genauen Limit)

### Google Analytics 4
- Tracking-ID: `G-MBLR2ODZES`
- Script in beiden Layouts (gtag.js)
- Setzt Cookies → **DSGVO-Banner vermutlich pflichtig** (offen – siehe `feedback/todo.md`)
- Dashboard: https://analytics.google.com
- Daten: alles von Vercel + Events, Funnel, User-Flow

**Warum beides?** Vercel = schneller Überblick + cookie-frei für Traffic-Zahlen.
GA4 = Tiefenanalyse (Custom Events, Funnel, Kohorten) für Ads-Integration.

### Custom Events (nächster Schritt)
Mit `@vercel/analytics` kann man Custom Events tracken:
```astro
<script>
  import { track } from '@vercel/analytics';
  document.querySelector('[data-cro="booking-whatsapp"]')
    ?.addEventListener('click', () => track('whatsapp_clicked'));
</script>
```
Geplant:
- `booking_started` – Booking-Form öffnet
- `calculator_used` – Preisrechner benutzt
- `whatsapp_clicked` – WhatsApp-Link geklickt

Umsetzung: `website-analyst`-Agent koordiniert mit diesem Skill.

---

## 8. Speed Insights (nicht aktiv – Empfehlung: aktivieren)

**Was:** Vercel misst Core Web Vitals (LCP, CLS, INP, FID) direkt im Browser
der echten Besucher. Ergänzt Analytics um Performance-Daten.

**Einbau:**
1. `npm i @vercel/speed-insights`
2. In beide Layouts importieren: `import SpeedInsights from "@vercel/speed-insights/astro"`
3. Component vor `</body>` rendern: `<SpeedInsights />`
4. Im Vercel-Dashboard → Settings → Speed Insights aktivieren

**Warum wichtig:** Google nutzt Core Web Vitals als Ranking-Faktor. Langsame
Mobile-Performance = schlechteres SEO.

**Kosten auf Pro:** im Plan enthalten.

---

## 9. Preview Deployments

Jeder Push auf einen Nicht-Production-Branch erzeugt automatisch eine Preview-URL.
Nützlich, um Änderungen vor dem Live-Gehen zu prüfen.

**Problem:** Die Preview-URLs sind standardmäßig **öffentlich** erreichbar.
Das ist ein Problem, weil `/admin/*` dort auch öffentlich ist.

**Lösung auf Pro:** Vercel **Deployment Protection** aktivieren.
- Dashboard → Settings → Deployment Protection
- Optionen: „Vercel Authentication" (Login nötig), „Password Protection" (ein Passwort für alle), „Trusted IPs"
- **Empfehlung:** Password Protection für Preview (leicht zu teilen mit Kristina, Testern)

→ Konkreter Dashboard-Schritt ist in `feedback/todo.md` eingetragen.

---

## 10. Limits (Pro-Plan) – Grobe Orientierung

Vercel-Seite aktuell prüfen, diese Werte ändern sich. Stand 2026-04:

| Ressource | Hobby (Gratis) | Pro (~20 $/User) |
|---|---|---|
| Bandwidth | 100 GB / Monat | 1 TB / Monat (Hard-Limit: Fair Use) |
| Serverless Function Invocations | 100k / Monat | 1 Mio / Monat |
| Function Duration | 10 s | 300 s |
| Function Memory | 1 GB | 3 GB |
| Build-Minuten | 100 min / Monat | 6.000 min / Monat |
| Team-Mitglieder | 1 | 20+ |
| Password Protection | ✘ | ✓ |
| Commercial Use | ✘ | ✓ |
| Analytics Retention | 30 Tage | 1 Jahr |

→ Für Jetski Lefkada mit Saisonbetrieb Mai–September und erwarteten
~500–3.000 Besuchern pro Monat: **Pro ist großzügig dimensioniert**. Limits
werden praktisch nie relevant.

---

## 11. Protected Deployments & Admin-Zugriff

Zwei Schutzebenen, die unabhängig voneinander wirken:

### (a) SEO-Schutz – schon im Code
- `vercel.json` setzt `X-Robots-Tag: noindex, nofollow` für `/admin/*`
- → Admin landet nicht in Google-Suche

### (b) Zugriffs-Schutz – Dashboard-Setting
- **Option 1 (empfohlen):** Admin-Login im Code (Supabase Auth) + Password Protection für Preview-Deploys
- **Option 2:** Vercel Authentication für Previews, kein Code-Login → weniger flexibel, nicht empfohlen weil Admin auch auf Production geschützt sein muss

**Stand 2026-04-18:** Admin-Login via Supabase ist in Arbeit (siehe
`src/pages/api/admin/login.ts` + Memory `project_crm_access.md`). Preview-Protection
im Dashboard noch nicht gesetzt → Aufgabe für Kristina.

---

## 12. Plan: Pro (bestätigt 2026-04-18)

**Bestätigung:** Kristina hat am 2026-04-18 den Link
<https://vercel.com/kristina0612-ops-projects> geschickt und „Pro Version"
bestätigt. Das Suffix `-projects` im Slug zeigt an, dass sie ein **Team-Account**
aufgesetzt hat (Standard-Form bei Pro).

### Pro-Features, die uns konkret helfen

| Feature | Nutzen für uns | Aktivierung |
|---|---|---|
| **Commercial Use** | Rechtlich abgedeckt – Hobby erlaubte das gar nicht | automatisch mit Pro |
| **Deployment Protection** | Passwort-Schutz für Preview-URLs → `/admin/*` nicht mehr öffentlich auf Previews | Dashboard → Settings → Deployment Protection |
| **Analytics 1 Jahr Retention** | statt 30 Tage auf Hobby | automatisch mit Pro |
| **Speed Insights Pro** | Core Web Vitals mit mehr Samples | Dashboard → Settings → Speed Insights |
| **300s Function Duration** | statt 10s → sichere Zeit für CRM-Operationen | automatisch |
| **3 GB Function Memory** | statt 1 GB | automatisch |
| **1 TB Bandwidth / Monat** | statt 100 GB → komfortabel | automatisch |
| **Audit Logs** | sichtbar wer wann was am Projekt gemacht hat | automatisch |

### Zahlungsdetails

- Zahlungsmethode: Visa …4704 (gültig bis 10/2029) – laut Billing-Screenshot
- Tax-ID: aktuell leer (offen bis griechische AFM mit VAT-Registrierung da ist
  → dann Format `EL` + 9 Ziffern, siehe `feedback/todo.md`)

### Dashboard-URLs

- Team-Übersicht: <https://vercel.com/kristina0612-ops-projects>
- Projekt: <https://vercel.com/kristina0612-ops-projects/jetski-lefkada-rentals.com>
- Deployments: <https://vercel.com/kristina0612-ops-projects/jetski-lefkada-rentals.com/deployments>
- Analytics: <https://vercel.com/kristina0612-ops-projects/jetski-lefkada-rentals.com/analytics>
- Settings: <https://vercel.com/kristina0612-ops-projects/jetski-lefkada-rentals.com/settings>
- Deployment Protection: <https://vercel.com/kristina0612-ops-projects/jetski-lefkada-rentals.com/settings/deployment-protection>
- Billing Information: <https://vercel.com/account/settings/billing-information>
- Tokens: <https://vercel.com/account/settings/tokens>

---

## 13. Troubleshooting – Häufige Situationen

### Website ist nicht erreichbar
1. https://www.vercel-status.com/ checken → liegt Vercel selbst down?
2. Dashboard → Deployments → ist der letzte Deploy „Error" oder „Ready"?
3. Wenn „Error": Logs lesen, Ursache fixen, neu deployen
4. Wenn „Ready" aber Seite trotzdem weg: Domain-Status checken (Settings → Domains → Valid Configuration?)
5. DNS-Probleme: https://dnschecker.org

### Push macht keinen neuen Deploy
- Wurde zu `origin/master` gepusht statt `vercel/main`? (Zwei-Repo-Setup, siehe §2)
- Ist Vercel-Auto-Deploy im Dashboard deaktiviert? (Settings → Git)

### Build schlägt fehl: „Module not found"
- Neue Dependency in `package.json` aber nicht committed → commit + push
- Package-Lock out-of-sync → lokal `npm install`, dann `package-lock.json` committen

### Build schlägt fehl: „Missing env var"
- Variable in `src/` referenziert, aber nicht im Vercel-Dashboard gesetzt
- Dashboard → Settings → Environment Variables → hinzufügen

### Serverless Function timeout
- Default 10 s (Hobby) / 300 s (Pro). Meistens Supabase-Call zu langsam.
- Fix: Query-Performance, Indizes, Abfrage-Strategie

### „500 Internal Server Error" auf `/admin/*` oder `/api/*`
- Function-Logs: Dashboard → Deployments → Deploy → Runtime Logs
- Fehlende ENV-Var oder Exception in API-Route

### Preview-URLs funktionieren, Production nicht
- Manchmal cachet Edge-CDN alte Version → Dashboard → Deployments → Commit → „Redeploy" mit „Use existing Build Cache: OFF"

---

## 14. Vercel CLI (optional)

Installieren mit:
```bash
npm i -g vercel
vercel login
```

Dann nutzbar:
| Befehl | Zweck |
|---|---|
| `vercel` | Ad-hoc Preview-Deploy vom lokalen Stand (ohne Git-Push) |
| `vercel --prod` | Direkt auf Production deployen |
| `vercel env pull .env.local` | Prod-ENV-Vars lokal ziehen |
| `vercel logs {url}` | Live-Logs eines Deploys |
| `vercel ls` | Deploys auflisten |
| `vercel domains ls` | Domains im Account |
| `vercel inspect {url}` | Details zu einem Deploy |

**Regel:** CLI ist optional. Dashboard reicht für 95 % aller Aufgaben.

---

## 15. Wartung dieses Skills

**Wann aktualisieren?**
- Bei jeder Plan-Änderung (Upgrade/Downgrade)
- Wenn neue ENV-Var dazukommt → in §4 ergänzen
- Wenn `vercel.json` geändert wird → §5 anpassen
- Wenn Speed Insights aktiviert wird → §8 auf „aktiv" setzen
- Wenn Zwei-Repo-Setup gefixt wird → §2 entschärfen
- Nach jedem Preis-/Limit-Update bei Vercel (mind. 1× pro Jahr)

**Pflege-Regel:** Bei jeder Nutzung dieses Skills **die Sections 1 + 12
kurz auf Aktualität checken**. Wenn unsicher: Kristina fragen mit
„Ist XY bei Vercel noch so aktuell?"

---

## 16. Zusammenspiel mit anderen Skills und Agenten

| Partner | Interaktion |
|---|---|
| `domain-hosting` | Domain-Registrar-Wissen – überlappt mit §6 (Domain & DNS). Beide müssen synchron gehalten werden. |
| `website-analytics` | Analytics-Datenquellen und API-Details – §7 verweist dorthin. |
| `website-analyst` (Agent) | Nutzt Vercel Analytics API für Reports. Zugriff via `VERCEL_ACCESS_TOKEN`. |
| `fleet-utilization-analyst` (Agent) | Deployment-Irrelevanz, aber kennt CRM-Supabase → teilt sich ENV-Vars. |
| `update-config` (Skill) | Permissions für Bash (Vercel-CLI) oder WebFetch (Vercel-Dashboard-URLs) werden dort konfiguriert. |

---

## 17. Was dieser Skill NICHT ist

- **Kein** Ersatz für die offizielle Vercel-Dokumentation. Bei tiefen technischen Fragen (z. B. ISR-Implementierung, Edge-Middleware-Details): https://vercel.com/docs
- **Keine** Rechtsberatung (DSGVO-Banner-Frage → separat klären)
- **Kein** allgemeiner Astro-Skill (Astro-Spezifika sind im Repo + Astro-Docs)
