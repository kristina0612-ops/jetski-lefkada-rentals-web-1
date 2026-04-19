---
name: domain-hosting
description: Wissen rund um Domain-Registrierung und Hosting für Nero Lefkada Rental&Retail. Nutze diesen Skill wenn es um Domain-Kauf, Domain-Verlängerung, Hosting-Wechsel, DNS-Einstellungen, SSL-Zertifikate, E-Mail-Einrichtung auf der eigenen Domain oder ähnliche Infrastruktur-Themen geht.
---

# Domain & Hosting – Jetski Lefkada Rentals

Stand: 2026-04-17 – letztes Review bei jeder Nutzung auf Aktualität prüfen und Kristina fragen ob Update nötig ist.

---

## Aktuelle Einrichtung

- **Domain:** jetski-lefkada-rentals.com
- **Registrar:** Vercel Domains (~$11,25/Jahr, automatische Verlängerung)
- **Hosting:** Vercel (Hobby Plan, kostenlos)
- **Repo:** github.com/kristina0612-ops/jetski-lefkada-rentals-web-1
- **Framework:** Astro 5 (statisch, super schnell)
- **SSL:** automatisch von Vercel verwaltet

**Warum diese Setup-Entscheidung:**
- Kristina ist keine Programmiererin → alles an einem Ort = weniger Stress
- Vercel konfiguriert DNS automatisch bei eigenen Domains (Zero-Config)
- Automatische Renewals für Domain und SSL-Zertifikat

---

## Entscheidungsregeln

### Welche Domain-Endung (TLD)?

**.com ist die richtige Wahl für uns.** Gründe:
- Kundschaft kommt international (DE, AT, IT, UK, EL)
- `.com` ist weltweit Standard und genießt das höchste Vertrauen
- SEO-mäßig identisch zu anderen TLDs bei internationaler Zielgruppe
- Günstig (~$11/Jahr)

**Wann ccTLD (z.B. `.gr`) sinnvoll wäre:**
- Nur wenn wir ausschließlich griechische Kunden ansprechen würden
- Dann würde Google die Seite bei lokalen Suchen bevorzugen
- Für uns nicht zutreffend – internationale Zielgruppe

### Domain-Registrar-Alternativen (nur informativ)

Wir bleiben bei Vercel, weil die Website dort gehostet wird. Für Wissen:

| Registrar | .com/Jahr | Besonderheit |
|-----------|-----------|--------------|
| Vercel Domains | ~$11,25 | Zero-Config bei Vercel-Hosting |
| Cloudflare | ~$10,46 | At-cost, kein Aufpreis |
| Porkbun | ~$11,08 | Einsteigerfreundlich |
| Spaceship | ~$9,98 | Günstig, gute UX |
| IONOS | 1. Jahr oft ~€1, ab 2. Jahr ~€15 | Deutscher Support |
| GoDaddy | oft teurer | viele Upsells, für uns nicht relevant |

**Faustregel:** Wer bei Vercel hostet, sollte die Domain bei Vercel registrieren. Wenn Hosting wechselt, kann Domain einfach auf neuen Host umgezogen werden.

---

## Häufige Fragen / Situationen

### „Die Domain-Rechnung kam – ist das normal?"
Ja. Vercel erneuert die Domain jährlich automatisch. Rechnung dokumentiert als Betriebsausgabe für die Buchhaltung.

### „Kann ich eine E-Mail-Adresse mit der Domain nutzen (z.B. info@jetski-lefkada-rentals.com)?"
Ja, aber Vercel selbst bietet keinen E-Mail-Hosting an. Optionen:
- **Google Workspace:** ~€6/Monat, beste Lösung (Gmail-Interface + Kalender + Drive)
- **Zoho Mail:** kostenlos für 1 Nutzer bei eigener Domain – einfachste Einstiegs-Option
- **Microsoft 365:** ~€5,50/Monat, für Office-Nutzer

Bei Fragen zur E-Mail-Einrichtung IMMER Kristina fragen welche Option sie möchte, nicht selbst entscheiden.

### „Die Website ist nicht erreichbar – was tun?"
1. Vercel-Dashboard öffnen, Deployments-Tab checken → ist das letzte Deployment grün?
2. Domain-Einstellungen: Domain-Status im Vercel-Dashboard → „Valid Configuration"?
3. Bei DNS-Problemen: https://dnschecker.org nutzen um zu prüfen ob Domain weltweit erreichbar ist
4. Wenn unklar: David / Kristina informieren, nicht selbst rumbasteln

### „Wir wollen umziehen – weg von Vercel"
Seltener Fall. Bevor irgendetwas gemacht wird:
- Kristina fragen WARUM (Kosten, Features, Problem?)
- NICHT Domain und Hosting gleichzeitig wechseln – erst eins, dann das andere
- Backup von Repo + aktuellem Deployment sichern

---

## Was dieser Skill NICHT abdeckt

- Rechtliche Fragen zu Domain-Eigentum (→ Anwalt)
- Komplexe DNS-Szenarien mit Subdomains für mehrere Services (→ erst fragen)
- Marketing/SEO-Strategie (anderes Thema, eigener Skill wenn nötig)

---

## Pflege dieses Skills

**Wann aktualisieren:**
- Wenn Preise/Anbieter sich geändert haben (mindestens 1x pro Jahr prüfen)
- Wenn neuer Hosting- oder Domain-Anbieter genutzt wird
- Wenn neue Situation auftritt die hier nicht dokumentiert ist

**Regel:** Bei jeder Nutzung dieses Skills kurz prüfen ob Infos noch aktuell sind.
Wenn unsicher → Kristina fragen: „Ist XY noch so aktuell? Soll ich den Skill updaten?"

---

## Quellen der Recherche (April 2026)

- [Vercel Domains – offizielle Seite](https://vercel.com/domains)
- [Vercel – Working with domains](https://vercel.com/docs/domains/working-with-domains)
- [Top 7 domain extensions 2026](https://hosting.com/blog/top-7-domain-extensions-for-businesses-in-2026-and-when-to-use-each/)
- [Choosing a Domain Extension: Complete 2026 Guide](https://www.hostpapa.com/blog/web-hosting/choosing-a-domain-extension-complete-2026-guide-for-business/)
- [Best Domain Registrars Compared 2026](https://domaindetails.com/kb/getting-started/best-domain-registrars-compared)
