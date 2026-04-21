# Synology DS220+ — Datenschutz-Setup für Nero Lefkada

**Ziel:** Sensible Kundendaten (Waiver, Passkopien, Zahlungsbelege, Kunden-Fotos) leben ausschließlich auf Deiner Synology zuhause — verschlüsselt, täglich auf USB gebackupt, DSGVO-konform. Claude Code und andere Cloud-Dienste bekommen **nur** anonymisierte oder nicht-personenbezogene Inhalte.

Stand: 2026-04-21 · Gilt für: Kristina (Single-User-Setup) · USB-Backup-Platte: bereits vorhanden

> 💡 **Für Kristina:** Wenn Du bei einem Schritt hängst, benutze die fertigen Prompts in [`synology-setup-prompts.md`](./synology-setup-prompts.md) — einfach kopieren, Zustand einfügen, an Claude schicken.

---

## Teil A — Ordnerstruktur anlegen

Logge Dich in der DSM-Weboberfläche der Synology ein (`http://<deine-synology-ip>:5000` oder über QuickConnect).

### A.1 Neue Top-Level-Freigabe „NeroLefkada"

1. **Systemsteuerung** → **Gemeinsamer Ordner** → **Erstellen** → **Erstellen**
2. Name: `NeroLefkada`
3. Beschreibung: „Alle Geschäftsdaten Nero Lefkada Rental&Retail"
4. Speicherort: `Volume 1`
5. ☑ **Daten verschlüsseln** anhaken (später Passwort vergeben — siehe A.3)
6. ☐ Papierkorb aktivieren (kannst Du an lassen, erleichtert Unfälle)
7. Weiter → **Verschlüsselungspasswort** vergeben
   - Mindestens 16 Zeichen, gemischt
   - **NICHT im Chat, NICHT auf dem Laptop** — auf Papier in einem Schrank, evtl. zusätzlich im Bitwarden/Passwort-Manager
8. Schlüssel-Manager aktivieren? **JA** — Synology kann sonst nach Neustart den Ordner nicht automatisch wieder einhängen
9. Berechtigungen: nur Dein User `kristina` (admin-Rechte), alle anderen auf **Kein Zugriff**

### A.2 Unterordner anlegen

Im Explorer (DSM → **File Station**) die folgende Struktur in `NeroLefkada/` erstellen:

```
NeroLefkada/
├── 01_SENSIBEL/                (🔴 rot)
│   ├── waiver/
│   │   └── 2026/
│   ├── passkopien/
│   │   └── 2026/
│   ├── zahlungen/
│   │   └── 2026/
│   └── schaeden/
│       └── 2026/
│
├── 02_GESCHAEFT/               (🟡 gelb)
│   ├── rechnungen-ausgang/
│   ├── rechnungen-eingang/
│   ├── buchhaltung/
│   └── versicherung/
│
├── 03_MARKETING/               (🟢 grün)
│   ├── fotos-jetskis/
│   ├── fotos-spots/
│   ├── flyer/
│   └── social-media/
│
├── 04_KUNDEN-FOTOS/            (🔴 rot — mit Einwilligung, trotzdem personenbezogen)
│   ├── 2025_mit-einwilligung/
│   ├── 2026_mit-einwilligung/
│   └── WIDERRUFEN/
│
└── 05_CLAUDE-ARBEITSORDNER/    (🟢 grün — nur anonymisierte Kopien)
    ├── entwuerfe/
    ├── vorlagen/
    └── recherchen/
```

**Tipp:** Leg in jeden Ordner eine `_LIESMICH.txt` mit 2 Zeilen was rein gehört + Aufbewahrungsfrist. In 6 Monaten weißt Du sonst nicht mehr, was „zahlungen" vs. „rechnungen-ausgang" ist.

### A.3 Aufbewahrungsfristen

| Ordner | Frist | Grund |
|---|---|---|
| `01_SENSIBEL/waiver/` | **5 Jahre** | Versicherungsregress (GR) |
| `01_SENSIBEL/passkopien/` | **Minimal — nach Rückgabe + 30 Tage löschen** | DSGVO Art. 5 Datenminimierung |
| `01_SENSIBEL/zahlungen/` | **10 Jahre** | AADE / griechische Buchhaltung |
| `01_SENSIBEL/schaeden/` | **3 Jahre** | Verjährung GR |
| `02_GESCHAEFT/rechnungen-*` | **10 Jahre** | myDATA / AADE |
| `02_GESCHAEFT/buchhaltung/` | **10 Jahre** | GR Buchhaltungsrecht |
| `02_GESCHAEFT/versicherung/` | **bis Vertragsende + 3 Jahre** | — |
| `03_MARKETING/` | **unbefristet** | keine personenbezogenen Daten |
| `04_KUNDEN-FOTOS/` | **bis Einwilligungs-Widerruf** | DSGVO Art. 6(1)(a) |
| `05_CLAUDE-ARBEITSORDNER/` | **laufend bereinigen** (alte Entwürfe löschen) | — |

**Jährlich im November:** Ordner durchgehen, abgelaufene Einträge löschen. In `feedback/aufbewahrung-audit-YYYY.md` kurz protokollieren was gelöscht wurde (nicht WAS, sondern „Ordner waiver/2020 → gelöscht am XX.XX.XXXX").

### A.4 Zusätzliche Synology-Härtung

Einmal einrichten, nie wieder anfassen:

1. **Systemsteuerung → Benutzer**: `admin`-User deaktivieren (nur `kristina` behalten)
2. **Systemsteuerung → Sicherheit → Konto**: Auto-Block nach 5 Fehlversuchen, 2FA AN
3. **Systemsteuerung → Anmeldeportal → DSM**: HTTPS erzwingen, Port 5001
4. **Systemsteuerung → Netzwerk → Verbindung → Erweitert**: VPN oder nur lokales Netz erlauben (kein öffentliches Internet auf DSM)
5. **Paket-Zentrum → Security Advisor** installieren und einmal laufen lassen

---

## Teil B — Hyper Backup auf USB-Platte einrichten

Da die USB-Platte schon angeschlossen ist, direkt los:

### B.1 USB-Platte prüfen und formatieren

1. **Systemsteuerung → Externe Geräte → Externe Geräte** → USB-Platte sollte erscheinen
2. Wenn neu: **Storage Manager → HDD/SSD → USB-Platte** → **Format**
   - Dateisystem: **BTRFS**
   - ☑ **Verschlüsseln** anhaken
   - Passwort: **anders als A.1 Passwort** (zweite Schutzlinie) — auch auf Papier
3. Bezeichnung: `Backup-Nero-2026`

⚠️ **Vor dem Formatieren:** ist wirklich nichts Wichtiges drauf? Formatieren löscht alles.

### B.2 Hyper Backup installieren

1. **Paket-Zentrum** → Suche „Hyper Backup" → **Installieren**
2. Öffnen → **+** (Neue Aufgabe) → **Datensicherungsaufgabe**

### B.3 Backup-Aufgabe anlegen

**Sicherungsziel:**
- Typ: **Lokaler Ordner & USB** → **Lokaler gemeinsamer Ordner / USB**
- Ziel wählen: die USB-Platte `Backup-Nero-2026`
- Verzeichnisname: `NeroLefkada-Backup`

**Datenquelle:**
- Nur diese Ordner anhaken:
  - ☑ `NeroLefkada/01_SENSIBEL/`
  - ☑ `NeroLefkada/02_GESCHAEFT/`
  - ☑ `NeroLefkada/04_KUNDEN-FOTOS/`
  - ☐ `NeroLefkada/03_MARKETING/` (nicht nötig — Website-Repo ist eh Backup)
  - ☐ `NeroLefkada/05_CLAUDE-ARBEITSORDNER/` (nur Entwürfe, kein Drama bei Verlust)

**Anwendungssicherung:**
- ☐ Keine Apps (wir sichern nur Dateien)

**Sicherungseinstellungen:**
- Aufgabenname: `Taeglich-02-Uhr-USB`
- ☑ **Client-seitige Verschlüsselung aktivieren** → Passwort setzen (drittes Passwort, auch auf Papier)
  - ⚠️ **Das Passwort ist die einzige Chance zur Wiederherstellung.** Wenn weg → Backup wertlos.
- ☑ Komprimierung aktivieren
- ☑ Blockbasierte Sicherung
- Zeitplan:
  - ☑ Zeitplan aktivieren
  - **Täglich um 02:00**
  - Wenn Synology am 02:00 aus ist: „Ausgelassenes Backup sofort beim Start nachholen" AN
- Integritätsprüfung: **wöchentlich, Sonntag 03:00**
- ☑ Benachrichtigung bei Fehler per E-Mail an `info@jetski-lefkada-rentals.com`

**Sicherungsrotation:**
- ☑ Aktivieren
- Rotation: **Smart Recycle**
- Anzahl Versionen: **30**
  - Smart Recycle behält: die letzten 24 stündlich, die letzten 30 täglich, die letzten 8 wöchentlich, alle älteren bis zum Limit
- Bei 30 Versionen: Du hast also grob 1 Monat Rückblick — für eine „huch, habe gestern die falsche Datei überschrieben"-Situation völlig ausreichend

**Fertigstellen** → **„Jetzt sichern?"** JA — der erste Durchlauf dauert je nach Datenmenge 30 min bis mehrere Stunden.

### B.4 Test-Wiederherstellung — PFLICHT

**Ohne diesen Test ist es kein Backup.**

Nach dem ersten erfolgreichen Durchlauf (Benachrichtigung abwarten):

1. **Hyper Backup** öffnen → deine Aufgabe → **Wiederherstellen** → **Daten**
2. **Version wählen** → neueste
3. **Datei wählen**: eine beliebige kleine Testdatei (z.B. aus `02_GESCHAEFT/`)
4. Ziel: **Wiederherstellen an anderen Ort** → z.B. `NeroLefkada/_WIEDERHERSTELLUNGS-TEST/`
5. Starten
6. ☑ Prüfen: Datei liegt am Zielort und lässt sich öffnen

Wenn das klappt: Test-Ordner wieder löschen. Du weißt jetzt: das Backup funktioniert und Du kommst im Ernstfall wieder dran.

### B.5 Monatliche Routine (Offsite-Option, SPÄTER)

Kristinas Antwort war „USB vorhanden" — eine USB reicht für jetzt. Für später die „3-2-1-Regel":

- **3** Kopien (Original + 2 Backups)
- **2** verschiedene Medien (Synology-Platten + USB)
- **1** offsite (außer Haus, z.B. bei Verwandten, in der Bankschließfach, in Davids Wohnung)

Konkret später: zweite USB-Platte, gleiches Verfahren, monatlich tauschen. Eine bleibt zuhause eingesteckt, die andere liegt offsite. Bei Einbruch/Brand ist mindestens eine sicher.

→ **JETZT / SPÄTER / SKIP?** Ich nehme das auf `feedback/todo.md` wenn Du „SPÄTER" sagst.

---

## Teil C — Was auf die Synology gehört (Entscheidungshilfe)

| Was kommt rein | Ordner | Claude-Zugriff |
|---|---|---|
| Unterschriebener Waiver-PDF | `01_SENSIBEL/waiver/2026/` | 🔴 nie |
| Kopie vom Pass (Mietbeginn) | `01_SENSIBEL/passkopien/2026/` | 🔴 nie |
| IBAN für Kautionsrückgabe | `01_SENSIBEL/zahlungen/2026/` | 🔴 nie |
| Schadensprotokoll mit Namen | `01_SENSIBEL/schaeden/2026/` | 🔴 nie |
| Ausgangsrechnung via myDATA | `02_GESCHAEFT/rechnungen-ausgang/` | 🟡 anonymisiert OK |
| Eingangsrechnung (Sprit, Werkstatt) | `02_GESCHAEFT/rechnungen-eingang/` | 🟢 Beträge OK |
| Buchhaltungs-Export | `02_GESCHAEFT/buchhaltung/` | 🟡 anonymisiert |
| Versicherungspolice | `02_GESCHAEFT/versicherung/` | 🟢 ok (keine Personen) |
| Marketing-Foto Jetski | `03_MARKETING/fotos-jetskis/` | 🟢 ja |
| Kunde auf Jetski (mit Einwilligung) | `04_KUNDEN-FOTOS/2026_mit-einwilligung/` | 🔴 nie (trotz Einwilligung) |
| Kunde zieht Einwilligung zurück | `04_KUNDEN-FOTOS/WIDERRUFEN/` + sofort aus Marketing-Orten löschen | 🔴 nie |
| Anonymisierter Mail-Entwurf | `05_CLAUDE-ARBEITSORDNER/entwuerfe/` | 🟢 ja |
| Textbausteine ohne echte Namen | `05_CLAUDE-ARBEITSORDNER/vorlagen/` | 🟢 ja |

---

## Teil D — Checkliste für Kristina (einmalig)

- [ ] Freigabe `NeroLefkada/` angelegt mit Verschlüsselung
- [ ] Unterordner laut A.2 erstellt
- [ ] `_LIESMICH.txt` in jedem sensiblen Ordner
- [ ] 3 Passwörter auf Papier im Schrank (Synology-User, Freigabe-Verschlüsselung, Hyper-Backup-Verschlüsselung)
- [ ] `admin`-User deaktiviert, 2FA aktiv
- [ ] USB-Platte formatiert BTRFS verschlüsselt
- [ ] Hyper-Backup-Aufgabe angelegt und erster Durchlauf erfolgreich
- [ ] **Test-Wiederherstellung einer Datei geklappt** ✅ erst dann ist es ein echtes Backup
- [ ] E-Mail-Benachrichtigung bei Backup-Fehler getestet (absichtlich Ziel kurz trennen, Fehler abwarten)
- [ ] `.claude/rules/daten-regel.md` ausgedruckt und neben Laptop gelegt
- [ ] Merkzettel Platzhalter-Tabelle ausgedruckt (aus `privacy-workflow`-Skill)

---

## Teil E — Was tun wenn…

### …das Backup-Passwort verloren geht

Pech. Ohne Passwort kein Zugriff aufs Backup. Synology kann nicht helfen (client-seitig verschlüsselt). Deshalb: Papier im Schrank + Bitwarden.

### …die Synology kaputt geht

Kauf neue Synology, Hyper Backup installieren, „Wiederherstellen aus vorhandenem Repository" → USB-Platte anschließen → Passwort eingeben → Wiederherstellen. Dauert ein paar Stunden. Alle Daten sind dann wieder da.

### …ein Kunde seine Daten zurück will (DSGVO Auskunftsrecht Art. 15)

1. Ordner `NeroLefkada/01_SENSIBEL/waiver/` und `04_KUNDEN-FOTOS/` nach Name durchsuchen
2. Funde in ZIP → verschlüsselt per Mail an Kunden
3. In `02_GESCHAEFT/buchhaltung/` DSGVO-Log-Datei anlegen mit Datum + wer gefragt hat

### …ein Kunde Löschung verlangt (DSGVO Art. 17)

1. Löschen aus `04_KUNDEN-FOTOS/` (in `WIDERRUFEN/` verschieben — nicht endgültig weg, siehe `red-lines.md` keine Löschung ohne Nachweis; archiviert reicht)
2. Passkopie nach Mietende eh löschen (siehe A.3)
3. Waiver **nicht** löschen — gesetzliche Aufbewahrungspflicht (Versicherung), Kunde darüber informieren
4. In DSGVO-Log eintragen

### …jemand versehentlich einen Passscan in den Chat zieht

Siehe `.claude/rules/privacy-stopp.md`. Claude stoppt und warnt. Chat-Nachricht löschen, Chat neu starten, Passkopie ist nur von Dir → kein externer Leak.

---

## Teil F — Best-Practice-Härtung (über die Basics hinaus)

Teil A–E bringt Dich auf „sicher und funktional". Teil F ist die professionelle Härtung: was ein Security-Auditor von einem Unternehmen erwartet, das echte Kundendaten verarbeitet. Jeder Unterteil hat einen passenden Prompt in [`synology-setup-prompts.md`](./synology-setup-prompts.md) Teil C.

### F.1 Firewall + Auto-Block + DoS-Schutz

**Warum:** Selbst wenn Du nur im LAN zugreifst — ohne Firewall ist jede offene Synology-Schnittstelle im Heimnetz erreichbar, wenn z.B. ein Gerät infiziert wird (Smart-TV, IoT-Lampe).

**Einrichtung:**
1. **Systemsteuerung → Sicherheit → Firewall** → **Firewall aktivieren**
2. Profil „default" → **Regeln bearbeiten**:
   - Regel 1 (ALLOW): aus **Deinem LAN** (z.B. `192.168.1.0/24`) alle Ports erlauben
   - Regel 2 (DENY): alles andere ablehnen
   - Reihenfolge: Allow zuerst, Deny als Catch-All
3. ⚠️ **Bevor Du „Deny alles andere" klickst:** prüfe Deine aktuelle LAN-Range (Windows: `ipconfig` → IPv4-Adresse). Wenn falsch → Du sperrst Dich aus und musst physisch an die Synology.

**Auto-Block:**
4. **Systemsteuerung → Sicherheit → Schutz → Automatisches Blockieren**
5. Aktivieren: **5 Anmeldeversuche in 5 Minuten → 24h IP-Sperre**
6. Whitelist: Deine lokale IP eintragen (Eigenschutz)

**DoS-Schutz:**
7. **Systemsteuerung → Sicherheit → Schutz → DoS-Schutz** → aktivieren für LAN-Interface
8. Anwendbare Regeln: Standard belassen

→ Prompt: `TEIL C.1` in `synology-setup-prompts.md`

### F.2 HTTPS mit Let's-Encrypt-Zertifikat

**Warum:** Das Synology-Self-Signed-Zertifikat produziert jedes Mal eine Browser-Warnung. Unabhängig vom LAN-only-Szenario: der Login-Dialog geht damit als „unsicher" durch — erhöht das Risiko dass Du Warnungen generell wegklickst (klassisches „banner blindness"-Problem).

**Voraussetzung:** eine Domain die auf Deine Synology zeigt. Drei Optionen:
- **Synology QuickConnect** — einfachste, aber Traffic läuft über Synology-Server (Datenschutz-Trade-off)
- **Synology DDNS** (`kristina.synology.me`) — kostenlos, direkt, empfohlen wenn nur LAN-Nutzung
- **Subdomain Deiner echten Domain** (`nas.jetski-lefkada-rentals.com` per A-Record auf Dein LAN) — nur wenn Du eh schon DNS-Zugriff hast

**Empfehlung:** Synology DDNS. Schnell, kostenlos, unabhängig.

**Einrichtung:**
1. **Systemsteuerung → Externer Zugriff → DDNS** → **Hinzufügen** → Synology wählen → Hostname vergeben
2. **Systemsteuerung → Sicherheit → Zertifikat** → **Hinzufügen** → Zertifikat von Let's Encrypt anfordern
3. Domain: der DDNS-Name aus Schritt 1
4. E-Mail: `info@jetski-lefkada-rentals.com`
5. Auto-Erneuerung ist standardmäßig AN (alle 90 Tage, Let's Encrypt-Vorgabe)
6. **Zertifikat zuweisen** → DSM, File Station, Hyper Backup

⚠️ **Wichtig für reines LAN-Szenario:** Port 80 muss kurz für Let's-Encrypt-Challenge offen sein (Router-Port-Forwarding). Danach kannst Du den Port wieder schließen. Synology macht das automatisch bei Auto-Erneuerung — dafür muss die Router-Regel aber dauerhaft stehen, oder Du erneuerst manuell.

**Alternative wenn Du keine Ports öffnen willst:** DNS-Challenge statt HTTP-Challenge (Let's Encrypt → DNS-01). Komplexer, aber ohne offenen Port.

→ Prompt: `TEIL C.2` in `synology-setup-prompts.md`

### F.3 Ransomware-Schutz: BTRFS-Snapshots mit Immutability

**Warum:** Backup allein schützt nicht vor Ransomware, wenn der Ransomware-Verschlüsseler auch das Backup erwischt (Netzlaufwerk ist gemountet → auch das Backup wird verschlüsselt). Snapshots sind **lokale Versionen auf dem gleichen Volume** und können so konfiguriert werden, dass selbst ein kompromittierter Admin-Account sie nicht löschen kann.

**Voraussetzung:** Die Freigabe `NeroLefkada/` muss auf einem BTRFS-Volume liegen (Standard bei DS220+ seit DSM 7).

**Einrichtung:**
1. **Paket-Zentrum → Snapshot Replication** → Installieren
2. **Snapshot Replication öffnen → Gemeinsamer Ordner → NeroLefkada** → **Einstellungen**
3. **Zeitplan:**
   - Stündlich, behalten: **24** (letzte 24 Stunden)
   - Täglich, behalten: **30** (letzter Monat)
   - Wöchentlich, behalten: **12** (letzte 3 Monate)
4. **Erweitert → Snapshots sichtbar machen** → AN (`#snapshot`-Ordner im Root der Freigabe)
5. **Unveränderlich machen (Immutability):** Snapshots mit der Einstellung **„Für X Tage nicht löschbar"** anlegen → z.B. 7 Tage. Auch ein Admin kann sie vor Ablauf nicht löschen — schützt vor dem Fall „Angreifer bekommt Admin-Zugang".

**Test-Szenario (mach ihn einmal!):**
- Lege eine Testdatei `ransomware-test.txt` in `NeroLefkada/03_MARKETING/` an
- Warte bis zum nächsten stündlichen Snapshot (Status in Snapshot Replication)
- Lösche `ransomware-test.txt`
- Rechts-Klick auf `NeroLefkada/` → **Snapshots** → letzten Snapshot wählen → `ransomware-test.txt` → **Wiederherstellen**
- Datei ist zurück. ✅

**Admin-Account-Trennung (optional, aber Best Practice):**
Lege einen **zweiten Admin-User** an (nicht Dein Tages-User `kristina`), der **ausschließlich** für Snapshot-Verwaltung gedacht ist. Tages-User hat „Benutzer-Rechte", Snapshot-User hat „Admin-Rechte". Beim Ransomware-Angriff: Angreifer bekommt Tages-Zugang, aber kann Snapshots nicht löschen.

→ Prompt: `TEIL C.3` in `synology-setup-prompts.md`

### F.4 Angriffsfläche reduzieren — Pakete deaktivieren

**Warum:** Jedes installierte Paket ist potenziell angreifbar. Du nutzt die Synology als reinen Datei-Server + Backup — also weg mit allem was Du nicht brauchst.

**Default-Pakete die Nero Lefkada NICHT braucht (deinstallieren):**

| Paket | Was es tut | Weg damit? |
|---|---|---|
| Photo Station / Synology Photos | Foto-Galerie | ✅ WEG (wir nutzen nicht) |
| Video Station | Video-Streaming | ✅ WEG |
| Audio Station / Synology Audio | Musik-Streaming | ✅ WEG |
| Download Station | Torrent-Client | ✅ WEG (+ Attack-Vektor) |
| VPN Server | Server eingehend | ✅ WEG (wenn Du kein VPN brauchst) |
| Web Station | Web-Hosting | ✅ WEG |
| MariaDB / PostgreSQL | Datenbank | ✅ WEG (wenn keine App sie braucht) |
| Surveillance Station | IP-Kameras | ✅ WEG (keine Kameras) |
| Mail Plus / Mail Server | E-Mail-Server | ✅ WEG (wir nutzen Ionos-Mail) |
| Note Station | Notizen | ✅ WEG |
| Drive Server | Cloud-Sync | ✅ WEG (wenn nicht genutzt) |

**Behalten (NICHT löschen!):**

| Paket | Warum |
|---|---|
| **Hyper Backup** | Das ist Dein Backup — PFLICHT |
| **Snapshot Replication** | Ransomware-Schutz — PFLICHT |
| **Storage Analyzer** | Zeigt Speicher-Verbrauch |
| **Security Advisor** | Läuft Security-Audits |
| **File Station** | Datei-Browser (integriert) |
| **Universal Search** | Suche über Dateien |
| **Synology Directory Server** | Nur wenn Du Domain-Auth nutzt (bei Dir NEIN) — kannst WEG |

**Vorgehen:**
1. **Paket-Zentrum → Installiert**
2. Jedes unnötige Paket → **Aktion → Deinstallieren**
3. Nach dem Deinstallieren: DSM-Update prüfen (manche deinstallierte Pakete hinterlassen Meldungen)

→ Prompt: `TEIL C.4` in `synology-setup-prompts.md`

### F.5 Monitoring & Benachrichtigungen

**Warum:** Ein Backup, das wochenlang kaputt ist und niemand merkt's, ist kein Backup.

**Einrichtung:**
1. **Systemsteuerung → Benachrichtigung → E-Mail** → SMTP einrichten
   - Empfehlung: eigene Business-Adresse `info@jetski-lefkada-rentals.com`
   - SMTP-Daten von Deinem E-Mail-Anbieter (Ionos: `smtp.ionos.de`, Port 587, STARTTLS, Login = E-Mail + Passwort)
2. **Systemsteuerung → Benachrichtigung → Regeln** → diese Events einschalten:
   - ☑ Speicher kritisch (< 15 % frei)
   - ☑ SMART-Warnungen von Festplatten
   - ☑ Hyper Backup Fehler
   - ☑ Hyper Backup Erfolg (erste 2 Wochen, danach kannst Du abschalten)
   - ☑ Anmeldefehler (Auto-Block-Trigger)
   - ☑ DSM-Update verfügbar
   - ☑ Verschlüsselter Ordner konnte nicht entsperrt werden
3. **Test:** Synology → **Benachrichtigung → Testmail senden**. Kommt nach ~30 Sekunden, landet im Spam → in Whitelist

**2. Überwachungs-Schicht: wöchentlicher Security-Advisor-Lauf**
4. **Security Advisor → Zeitplan** → **wöchentlich Montag 08:00**
5. Ergebnisbericht per Mail

### F.6 DSM-Update-Policy

**Regel:** Minor-Updates (7.2.1 → 7.2.2) **automatisch** einspielen. Major-Updates (7.2 → 8.0) **manuell** — 2 Wochen warten, Release-Notes lesen, Forum checken, dann updaten.

**Einrichtung:**
1. **Systemsteuerung → Aktualisieren & Wiederherstellen → Aktualisierungs-Einstellungen**
2. **Nur DSM-Update:** „Wichtige Updates automatisch installieren" — AN
3. **Synology-Paket-Updates:** „Automatisch" — AN
4. Zeitplan: Updates prüfen **täglich 05:00**, Installation **Mittwoch 03:00** (wenn niemand arbeitet)

⚠️ **Vor JEDEM Major-Update:** letzten Hyper-Backup-Lauf manuell prüfen (Status grün), Snapshot manuell anlegen, **dann** updaten. Rollback ist schmerzhaft.

### F.7 Physische Sicherheit (non-technisch, aber wichtig)

- Synology steht in einem Raum, der abschließbar ist (Büro zuhause, kein offener Durchgang)
- USB-Backup-Platte wird **nicht daneben** geparkt — wenn einer die Synology klaut, hätte er sonst auch das Backup
- Monatlich (siehe SPÄTER-Option 3-2-1): zweite USB woanders parken (Davids Wohnung, Bank-Schließfach, Elternhaus)
- Papier-Passwörter: in verschlossenem Schrank / Tresor, nicht im gleichen Raum wie die Synology

---

## Referenzen

- [`docs/synology-setup-prompts.md`](./synology-setup-prompts.md) — Copy-Paste-Prompts für Claude zu jedem Schritt
- `.claude/rules/daten-regel.md` — Ampel-Merkzettel
- `.claude/rules/privacy-stopp.md` — Claudes Stopp-Regel
- `.claude/skills/privacy-workflow/SKILL.md` — Anonymisierungs-Workflow
- `.claude/skills/security/SKILL.md` — zentrale Security-Referenz (OWASP, Incident-Response)
- `.claude/skills/compliance-high-standard/SKILL.md` — Compliance-Standard HOCH
- `src/pages/privacy.astro` — öffentliche Datenschutzerklärung (sagt Kunden was wir tun)
- Synology offizielle Doku: <https://kb.synology.com/de-de/DSM/help/HyperBackup>
- Synology Security Hardening Guide: <https://kb.synology.com/en-global/WP/Synology_NAS_Security_Hardening_Guide>
