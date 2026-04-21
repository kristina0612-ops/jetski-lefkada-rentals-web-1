# Synology-Setup — Copy-Paste-Prompts für Claude

**Für Kristina.** Wenn Du bei einem Schritt aus `docs/synology-setup.md` hängst, kopiere einfach den passenden Prompt unten in einen Claude-Chat. Jeder Prompt gibt Claude genug Kontext, damit er **genau** an Deiner Stelle weitermacht — ohne Nachfragen und ohne Wissens-Lücken.

Alle Prompts sind auf Deutsch, kurz, und enthalten eine Lücke `[BESCHREIBE WAS DU SIEHST]` — da schreibst Du rein was gerade auf Deinem Bildschirm passiert. So weiß Claude immer den echten Zustand, nicht den Lehrbuch-Zustand.

---

## Meta-Regeln (gelten für ALLE Prompts unten)

Diese drei Sätze stehen am Anfang JEDES Prompts — sie sagen Claude worauf er achten soll. Wenn Du einen Prompt benutzt, sind sie schon drin. Du musst nichts extra tippen.

> 1. **Kein Fachjargon** ohne Erklärung — ich bin keine Technikerin.
> 2. Bei **jedem sicherheitskritischen Schritt** (Passwort, Verschlüsselung, Ports) erst WARNEN bevor Du mich klicken lässt.
> 3. Wenn etwas **nicht wie in der Anleitung** aussieht: lieber STOPP sagen und nachfragen, als raten.

---

## TEIL A — Ordnerstruktur anlegen

### A.1 — „Ich melde mich gerade auf der Synology an"

```
Ich fange jetzt mit dem Synology-Setup an (laut docs/synology-setup.md Teil A.1).
Ich bin gerade im DSM eingeloggt als User `kristina` (oder `admin`, je nachdem
was geklappt hat).

Bitte führe mich Schritt für Schritt durch:
1. „NeroLefkada" als neuen gemeinsamen Ordner anlegen (mit Verschlüsselung)
2. Die Sicherheits-Härtung aus Teil A.4 (admin-User deaktivieren, 2FA, HTTPS)

WARNE MICH bevor ich das Verschlüsselungspasswort vergebe — ich brauche vorher
eine Passwort-Strategie (Papier? Bitwarden? Wo liegt es physisch sicher?).

Meta-Regeln: kein Fachjargon, Warnung vor kritischen Klicks, bei Abweichung
von der Anleitung STOPP.

Zustand jetzt: [BESCHREIBE WAS DU SIEHST, z.B. „Systemsteuerung ist offen,
ich sehe links ‚Gemeinsamer Ordner‘ aber keinen Erstellen-Button"]
```

### A.2 — „Ich lege die Unterordner an"

```
Ich bin bei Teil A.2 der Synology-Anleitung. `NeroLefkada/` ist angelegt und
verschlüsselt. Jetzt muss ich die 5 Top-Level-Ordner und ihre Unterordner
erstellen (01_SENSIBEL, 02_GESCHAEFT, 03_MARKETING, 04_KUNDEN-FOTOS,
05_CLAUDE-ARBEITSORDNER).

Bitte:
1. Erkläre mir den schnellsten Weg in File Station (oder per SMB vom Laptop aus?)
2. Gib mir eine Kopier-Vorlage für die `_LIESMICH.txt` in jedem sensiblen Ordner
   (2 Zeilen: was kommt rein + Aufbewahrungsfrist aus A.3)
3. Sage mir, welche Option schneller ist, wenn ich 20+ Unterordner habe

Meta-Regeln wie oben. Zustand: [WAS SIEHST DU GERADE?]
```

### A.4 — „Synology härten (Security)"

```
Ich bin bei Teil A.4 — Synology-Härtung. Ich will:
- admin-User deaktivieren
- 2FA aktivieren (welche App empfiehlst Du? Ich habe iPhone)
- HTTPS auf Port 5001 erzwingen
- Zugang aus öffentlichem Internet blockieren
- Security Advisor einmal laufen lassen

Bitte führe mich durch — UND warne mich **bevor** ich admin deaktiviere, ob
mein `kristina`-User wirklich volle Admin-Rechte hat (sonst sperre ich mich
aus).

Nach jedem Schritt sag mir kurz: „OK, nächster Schritt?" und wartet auf mein OK.

Meta-Regeln. Zustand: [WO BIST DU GERADE IN DSM?]
```

---

## TEIL B — Hyper Backup einrichten

### B.1 — „USB-Platte prüfen & formatieren"

```
Ich bin bei Teil B.1 der Synology-Anleitung. USB-Platte ist angeschlossen,
ich will sie als BTRFS verschlüsselt formatieren.

⚠️ VORHER: bitte hilf mir prüfen ob ALLES drauf entbehrlich ist. Formatieren
löscht alles. Gib mir eine 3-Punkte-Checkliste (was anschauen bevor ich klicke).

Dann:
1. Storage Manager → USB-Platte wählen
2. Format mit BTRFS + Verschlüsselung
3. Passwort setzen (ANDERS als das NeroLefkada-Passwort aus A.1) — warum
   getrennt? (erkläre mir das)

Zustand: [BESCHREIBE: welche Platte ist angeschlossen, welche Größe, wie heißt
sie gerade im DSM?]

Meta-Regeln wie oben.
```

### B.3 — „Backup-Aufgabe anlegen"

```
Ich bin bei Teil B.3 der Synology-Anleitung — Hyper Backup Aufgabe anlegen.
USB ist formatiert und als `Backup-Nero-2026` benannt.

Bitte führe mich durch den Hyper-Backup-Wizard mit GENAU diesen Einstellungen
aus B.3:
- Quelle: 01_SENSIBEL, 02_GESCHAEFT, 04_KUNDEN-FOTOS (NICHT 03 und 05)
- Client-seitige AES-256-Verschlüsselung AN (drittes Passwort!)
- Zeitplan: täglich 02:00
- Smart Recycle, 30 Versionen
- Integritätscheck wöchentlich Sonntag
- E-Mail-Benachrichtigung bei Fehler an info@jetski-lefkada-rentals.com

⚠️ Zweites wichtiges: bei der client-seitigen Verschlüsselung zeigt Synology
eine Schlüsseldatei .pem zum Download. ERKLÄRE mir was ich damit tun muss
(wo speichern? wie sicher? was wenn weg?).

Zustand: [AN WELCHEM SCHRITT DES WIZARDS BIST DU?]

Meta-Regeln.
```

### B.4 — „Test-Wiederherstellung (PFLICHT)"

```
Das erste Hyper-Backup ist durchgelaufen. Jetzt mache ich Teil B.4 — die
Test-Wiederherstellung, damit ich weiß das Backup funktioniert wirklich.

Bitte:
1. Welche Testdatei empfiehlst Du? (klein, unwichtig, gut erkennbar)
2. Wohin wiederherstellen? (Du hast `NeroLefkada/_WIEDERHERSTELLUNGS-TEST/`
   vorgeschlagen — wie lege ich den Ordner am schnellsten an?)
3. Nach dem Test: wie prüfe ich ob die Datei echt identisch ist?
   (Checksumme? Einfach öffnen?)
4. Wann kann ich den Test-Ordner wieder löschen?

Zustand: [WAS ZEIGT DIR HYPER BACKUP GERADE? Status grün? Letzter Lauf wann?]

Meta-Regeln.
```

---

## TEIL C — Best-Practice-Härtung (aus Teil F der Anleitung)

### C.1 — „Firewall + Auto-Block"

```
Ich will Teil F.1 meiner Anleitung umsetzen: Firewall + Auto-Block.

Bitte führe mich durch:
1. Firewall aktivieren, Regeln so setzen dass NUR aus meinem Heim-Netz
   (LAN-Range) zugegriffen werden kann
2. Auto-Block: 5 Fehlversuche in 5 Minuten → 24h IP-Sperre
3. DoS-Schutz aktivieren

⚠️ VORWARNUNG: wenn ich die Firewall falsch einstelle, sperre ich mich selbst
aus und muss physisch an die Synology (Reset-Knopf). Gib mir VORHER eine
„Notfall-Backdoor"-Anleitung (z.B. Whitelist-Regel für meine aktuelle IP
BEVOR ich „Deny alles andere" aktiviere).

Meine aktuelle LAN-Range ist vermutlich 192.168.1.0/24 oder 192.168.0.0/24
— wie finde ich das heraus?

Zustand: [WAS SIEHST DU IN DER FIREWALL-MASKE?]

Meta-Regeln.
```

### C.2 — „SSL-Zertifikat (Let's Encrypt)"

```
Ich will Teil F.2 — HTTPS mit echtem Let's-Encrypt-Zertifikat, damit ich ohne
Browser-Warnung auf DSM komme.

Voraussetzung: ich brauche eine Domain die auf meine Synology zeigt (DynDNS).
Hilf mir entscheiden:
- Synology QuickConnect (einfach, aber über Synology-Server)
- Eigene DDNS (z.B. meine-synology.duckdns.org) — unabhängiger
- Eine Subdomain meiner echten Domain jetski-lefkada-rentals.com nutzen?

Welche Option empfiehlst Du für einen reinen LOKAL-Zugriff (ich will NICHT
aus dem Internet auf die Synology zugreifen — nur Zertifikats-Validierung)?

Dann: Schritt-für-Schritt zum Zertifikat + Auto-Erneuerung.

Meta-Regeln. Zustand: [HAST DU SCHON EINE DOMAIN AUF DIE SYNOLOGY GESETZT?]
```

### C.3 — „Ransomware-Schutz (Snapshots + Immutability)"

```
Teil F.3 der Anleitung — Ransomware-Schutz durch BTRFS-Snapshots.

Bitte:
1. Snapshot Replication Paket installieren (welches? es gibt mehrere)
2. Snapshot-Zeitplan für `NeroLefkada/` einrichten:
   - stündlich, letzte 24
   - täglich, letzte 30
   - Snapshots gegen Löschung schützen (immutability) — wie genau?
3. Admin-Account-Trennung: WARUM darf der Snapshot-Lösch-User ein anderer
   sein als der Tages-User? (Prinzip: auch wenn mein Login kompromittiert ist,
   sind Snapshots sicher)
4. Test: ich lege eine Datei an, lösche sie, stelle sie aus Snapshot wieder
   her. Schritt für Schritt.

Zustand: [HAST DU SNAPSHOT REPLICATION INSTALLIERT?]

Meta-Regeln.
```

### C.4 — „Paket-Aufräumen (alles deaktivieren was nicht gebraucht wird)"

```
Teil F.4 — Synology-Pakete aufräumen. Default-Pakete die ich NICHT brauche
für mein Use-Case (nur Datei-Backup, kein Photo-Server, kein Video, kein
Web-Hosting) sollen weg.

Bitte:
1. Liste mir typische Pakete die Nero Lefkada NICHT braucht (z.B. Photo
   Station, Video Station, Plex, Download Station, VPN Server, Web Station,
   MariaDB/PostgreSQL wenn nicht genutzt, Surveillance Station wenn keine
   Kameras)
2. Gib mir für jedes Paket 1 Satz: was tut es + warum kann ich es weg lassen
3. WARNE MICH: welche Pakete muss ich BEHALTEN (Hyper Backup!, Security
   Advisor, Storage Analyzer...)?
4. Reihenfolge: erst deaktivieren, dann deinstallieren? Oder gleich deinst-
   allieren?

Zustand: [LISTE MIR KURZ WELCHE PAKETE AKTUELL INSTALLIERT SIND]

Meta-Regeln.
```

---

## TEIL D — Wartung & Monitoring (Routine)

### D.1 — „Monatliche Kontrolle — was prüfen?"

```
Es ist der Erste des Monats. Ich will die Synology einmal kurz checken.

Bitte führe mich durch die 10-Minuten-Routine:
1. Hyper Backup Status (letzte 30 Tage alle grün?)
2. Security Advisor erneut laufen lassen — welche Warnungen sind OK,
   welche fixen?
3. Storage Manager: SMART-Status der Platten (Warnzeichen?)
4. Aufbewahrungsfristen: ist ein Ordner fällig für „löschen" (Passkopien
   von vor 30 Tagen z.B.)?
5. DSM-Update verfügbar? (WARNE mich vor Auto-Update wenn Major-Version)

Gib mir am Ende: „Alles grün" oder „Achtung bei X".

Zustand: [IST GERADE GERADE ERSTER DES MONATS?]

Meta-Regeln.
```

### D.2 — „Jährlicher Aufbewahrungs-Audit (November)"

```
Es ist November, Zeit für den jährlichen Aufbewahrungs-Audit (laut
docs/synology-setup.md Teil A.3).

Bitte führe mich Ordner für Ordner durch:
1. 01_SENSIBEL/waiver/ → was ist älter als 5 Jahre? (aktuelles Jahr minus 5)
2. 01_SENSIBEL/passkopien/ → alles außer „letzte 30 Tage" raus
3. 01_SENSIBEL/zahlungen/ → älter als 10 Jahre raus
4. 01_SENSIBEL/schaeden/ → älter als 3 Jahre raus
5. 04_KUNDEN-FOTOS/ → gibt es Widerrufe in WIDERRUFEN/? Einmal
   cross-checken ob die Fotos wirklich auch aus Marketing raus sind

Für jeden Ordner:
- zeige mir File-Station-Ansicht-Anleitung (nach Datum sortieren)
- lass mich eine Liste der Kandidaten zum Löschen machen
- LÖSCHE NICHTS automatisch — nur Vorschläge

Am Ende: Protokoll in feedback/aufbewahrung-audit-2026.md (Anzahl +
Ordnername, KEINE echten Kundennamen!)

Meta-Regeln.
```

### D.3 — „Irgendwas stimmt nicht — Fehlerdiagnose"

```
Meine Synology verhält sich komisch. [BESCHREIBE DAS PROBLEM:
z.B. „DSM antwortet nicht" / „Hyper Backup Aufgabe ist rot" /
„Ich kann nicht mehr auf 01_SENSIBEL zugreifen" / „USB-Platte wird
nicht erkannt"]

Bitte:
1. Gib mir eine 3-Schritt-Diagnose (vom Harmlosesten zum Dringensten)
2. Bei JEDEM Schritt: erst DU sagst mir was ich eintippen/klicken soll,
   ich mache es, dann ICH berichte was ich sehe
3. Keine vorschnellen Reboots oder Resets — erst die Diagnose-Kette

Wenn Du nach 3 Schritten nicht weiterkommst: sage „ich empfehle
Synology-Support kontaktieren" und gib mir den Link.

Meta-Regeln.
```

---

## TEIL E — DSGVO-Anfragen von Kunden

### E.1 — „Kunde fragt: welche Daten habt ihr über mich?"

```
Ein Kunde hat per Mail/WhatsApp eine DSGVO-Auskunft (Art. 15) angefragt.
Der Name ist [HIER STEHT BEI DIR DER ECHTE NAME — aber SCHREIBE IHN NICHT
IN DEN CLAUDE-CHAT, sondern ersetze ihn durch [KUNDE]].

Bitte hilf mir:
1. Welche Ordner muss ich auf der Synology durchsuchen?
   (01_SENSIBEL/waiver, /passkopien, /zahlungen, /schaeden, 04_KUNDEN-FOTOS)
2. Wie suche ich in File Station nach einem Namen?
3. Wie packe ich die Funde in ein verschlüsseltes ZIP?
4. Wie schicke ich dem Kunden die Daten sicher? (kein ungeschütztes Mail-ZIP!)
5. Wo protokolliere ich die Anfrage? (DSGVO-Log in 02_GESCHAEFT/buchhaltung/)

KEIN ECHTER NAME IM CHAT — nur [KUNDE]. Ich fülle den Namen selbst ein
bevor ich die Antwort abschicke.

Meta-Regeln.
```

### E.2 — „Kunde will Löschung"

```
Ein Kunde fordert Löschung seiner Daten (DSGVO Art. 17). Name bleibt
[KUNDE] im Chat.

Bitte:
1. Welche Daten DARF ich löschen? (Fotos aus 04_KUNDEN-FOTOS/ → WIDERRUFEN/,
   Passkopien wenn eh fällig)
2. Welche Daten DARF ich NICHT löschen? (Waiver = Versicherungspflicht,
   Rechnungen = AADE 10 Jahre)
3. Wie formuliere ich freundlich und DSGVO-korrekt dass manche Daten
   bleiben müssen?
4. Muss ich ihn über die Ablehnung informieren? Bis wann? (DSGVO: 1 Monat)

Entwurf bitte mit [KUNDE] / [DATUM] als Platzhalter. Ich setze echte
Daten lokal ein.

Meta-Regeln.
```

---

## TEIL F — Notfälle

### F.1 — „Eine Passkopie ist im falschen Chat gelandet"

```
STOPP — ich brauche sofortige Hilfe. Ich habe gerade aus Versehen eine
Passkopie in [WO? Claude? ChatGPT? WhatsApp? Mail?] gesendet. Der Kunde
heißt [NICHT NENNEN — sag „Kunde X"].

Bitte in dieser Reihenfolge:
1. Ist die Chat-Nachricht noch löschbar? (wie genau im jeweiligen Tool?)
2. Wenn gelöscht: ist der Screenshot/das Bild damit WEG vom Server?
3. Was muss ich sonst noch tun? (Kunden informieren? Datenpanne-Meldung
   an HDPA nach DSGVO Art. 33 binnen 72h?)
4. Wie bewerten wir: ist das meldepflichtig? (Kriterium: hohes Risiko für
   betroffene Person)

Beruhige mich kurz bevor Du die Schritte gibst — ich bin gerade panisch.

Meta-Regeln. SEHR WICHTIG: keine echten Namen im Chat.
```

### F.2 — „Die Synology ist kaputt / gestohlen / Wasserschaden"

```
Notfall: die Synology ist [WAS IST PASSIERT? kaputt / gestohlen / Wasser-
schaden / brennt].

USB-Backup-Platte ist [WO? noch da? mitgeklaut? in Davids Wohnung?].

Bitte:
1. Was jetzt sofort tun? (Versicherung? Polizei? Datenpanne-Meldung HDPA?)
2. Welche Daten sind gefährdet (Diebstahl-Szenario: wer hat jetzt theoretisch
   Zugriff? Stichwort Verschlüsselung — ist die Platte verschlüsselt, werden
   Daten beim Dieb nutzlos?)
3. Wie baue ich das Setup auf einer neuen Synology wieder auf?
   (Schritt-für-Schritt, Hyper Backup Restore)
4. Müssen Kunden informiert werden? (DSGVO Art. 34 — Benachrichtigung
   Betroffener)

Meta-Regeln. Ich bin gestresst, bitte RUHIG und in kurzen Sätzen.
```

---

## Wie Du diese Prompts benutzt

1. **Finde den richtigen Prompt** (Schritt-Nummer in `docs/synology-setup.md` → gleicher Buchstabe hier)
2. **Kopiere ihn** komplett
3. **Fülle die `[…]`-Lücken** mit dem echten Zustand — aber **niemals** mit Kundennamen oder IBANs (das ist der ganze Sinn der Privacy-Regel)
4. **Paste in Claude-Chat**
5. Claude führt Dich durch. Wenn er zu schnell ist: „Moment, erkläre mir [X] nochmal einfacher."
6. Wenn Du fertig bist: Häkchen in der Checkliste in `docs/synology-setup.md` Teil D setzen.

## Was Du NICHT in diese Prompts schreibst

- Echte Kundennamen, E-Mails, Telefonnummern (→ `[KUNDE]`, `[EMAIL]`, `[TEL]`)
- Passwörter (kein Passwort jemals in einen Chat — auch nicht zum „nur kurz prüfen")
- IBANs, Kartendaten, Passnummern
- Die Schlüsseldatei (.pem) von Hyper Backup — die liegt lokal, wird nie geteilt

Alles andere (Ordnernamen, Menü-Klicks, Port-Nummern, Fehlermeldungen) darf rein.

---

**Referenzen:**
- `docs/synology-setup.md` — die eigentliche Anleitung
- `.claude/rules/daten-regel.md` — Ampel-Merkzettel (was darf in Chat)
- `.claude/rules/privacy-stopp.md` — meine Stopp-Regel bei echten Daten
- `.claude/skills/privacy-workflow/SKILL.md` — Anonymisierungs-Workflow
