---
name: booking-confirmation
description: Nutze diesen Skill WANN IMMER Kristina eine neue Buchungsanfrage im Chat teilt („Neue Buchung: ..."). Der Skill enthält Templates in DE/EN/IT/EL für WhatsApp-Buchungsbestätigungen, die Kristina dann per Copy-Paste sendet. Wichtig: Namen/E-Mails/Telefonnummern NIE in den Chat, nur Buchungsmetadaten (Datum, Uhrzeit, Paket, Jetski, Personen, Sprache).
---

# Booking-Confirmation-Skill

**Zweck:** Kristina bekommt Buchungen via WhatsApp (Stepper-Form generiert die Nachricht an David). Sie trägt die Buchung in ihren ClickUp-Kalender ein und lässt mich die Bestätigungs-WhatsApp schreiben. Sie kopiert dann nur den Entwurf, setzt den Namen beim Versenden ein, fertig.

## Workflow (seit 2026-04-21)

1. Buchungsanfrage landet per WhatsApp bei David (über das Kontaktformular auf der Website)
2. Kristina trägt die Buchung manuell in ClickUp ein
3. Kristina öffnet einen Chat mit mir und postet **nur anonymisierte Buchungs-Metadaten**:
   ```
   Neue Buchung:
   - Paket: Beach Ride 60 min
   - Datum: 2026-06-15
   - Uhrzeit: 10:00
   - Jetski: Any available (oder Nero Ena / Dio / Tria / Tessera)
   - Personen: 2
   - Sprache: DE (oder EN / IT / EL)
   ```
4. Ich schreibe sofort den passenden Bestätigungs-Entwurf in der richtigen Sprache mit Platzhalter `[VORNAME]`
5. Kristina kopiert, setzt beim Versenden den echten Namen ein, schickt via WhatsApp

## Privacy-Regel (HART)

Kristina darf mir **NIEMALS** Klarnamen, E-Mails, Telefonnummern oder Passdaten geben. Falls doch: `privacy-stopp.md` greift → stoppen + warnen.

Daten die ich bekomme und nutze:
- Paket-Name (Beach Ride, Sunset Ride, Couple Ride, VIP Delivery, Water Fun)
- Datum (kalendarisch)
- Uhrzeit (HH:MM)
- Jetski-Name (optional, „Any available" bei undefiniert)
- Personen-Anzahl
- Sprache

## Templates (Entwürfe, Kristina passt ggf. an)

### 🇩🇪 Deutsch

```
Hey [VORNAME]! 🌊

Super, Deine Buchung für {PAKET} am {DATUM} um {UHRZEIT} ist bei uns angekommen.
Treffpunkt: Lygia Port, Lefkada. Bitte sei 15 Min vorher am Steg.

Was Du mitbringen sollst:
• Lichtbildausweis (Pflicht)
• Badesachen, Handtuch, Sonnencreme
• Gute Laune :)

David macht mit Dir das 10-Min-Safety-Briefing am Dock.
Fragen vorher? Einfach hier per WhatsApp melden.

Bis bald auf dem Wasser!
– Nero Lefkada
```

### 🇬🇧 English

```
Hey [FIRST NAME]! 🌊

Great, your booking for {PACKAGE} on {DATE} at {TIME} is confirmed.
Meeting point: Lygia Port, Lefkada. Please be at the dock 15 min before.

What to bring:
• Photo ID (required)
• Swimwear, towel, sunscreen
• Good vibes :)

David will walk you through the 10-min safety briefing at the dock.
Any questions beforehand? Just WhatsApp us here.

See you on the water!
– Nero Lefkada
```

### 🇮🇹 Italiano

```
Ciao [NOME]! 🌊

Perfetto, la tua prenotazione per {PACCHETTO} il {DATA} alle {ORA} è confermata.
Punto d'incontro: Lygia Port, Lefkada. Arriva al molo 15 min prima.

Cosa portare:
• Documento d'identità (obbligatorio)
• Costume, asciugamano, crema solare
• Buon umore :)

David ti farà il briefing di sicurezza di 10 minuti al molo.
Domande prima? Scrivici qui su WhatsApp.

A presto sull'acqua!
– Nero Lefkada
```

### 🇬🇷 Ελληνικά

```
Γεια σου [ΟΝΟΜΑ]! 🌊

Τέλεια, η κράτησή σου για {ΠΑΚΕΤΟ} στις {ΗΜΕΡΟΜΗΝΙΑ} στις {ΩΡΑ} επιβεβαιώθηκε.
Σημείο συνάντησης: Λιμάνι Λυγιάς, Λευκάδα. Να είσαι στην προβλήτα 15 λεπτά νωρίτερα.

Τι να φέρεις:
• Ταυτότητα ή διαβατήριο (υποχρεωτικό)
• Μαγιό, πετσέτα, αντηλιακό
• Καλή διάθεση :)

Ο David θα σου κάνει το 10λεπτο safety briefing στην προβλήτα.
Ερωτήσεις πριν; Γράψε μας εδώ στο WhatsApp.

Τα λέμε στη θάλασσα!
– Nero Lefkada
```

## Platzhalter-Bezeichnungen

| Platzhalter | Bedeutung | Einsetz-Beispiel |
|---|---|---|
| `[VORNAME]` / `[FIRST NAME]` / `[NOME]` / `[ΟΝΟΜΑ]` | Kristina setzt vor dem Versenden Kundenname ein | „Max" |
| `{PAKET}` / `{PACKAGE}` / `{PACCHETTO}` / `{ΠΑΚΕΤΟ}` | Buchungs-Paket | „Beach Ride 60 min" |
| `{DATUM}` / `{DATE}` / `{DATA}` / `{ΗΜΕΡΟΜΗΝΙΑ}` | Datum | „Sonntag, 15. Juni" (DE) / „Sunday, 15 June" (EN) |
| `{UHRZEIT}` / `{TIME}` / `{ORA}` / `{ΩΡΑ}` | Uhrzeit | „10:00" |

## Sonderfälle

### Water Fun (3er-Tube)
Zusatz-Zeile: „Kein Fahren nötig, einfach festhalten und Spaß haben. Alle 3 Plätze sind reserviert." (DE / analog in anderen Sprachen)

### VIP Delivery (Skipper-Service)
Zusatz-Zeile: „David bringt den Jetski zur vereinbarten Zeit an Deinen Standort." + Hinweis auf VIP-Deposit (€1.500 refundable)

### Ohne Führerschein (guided tour)
Zusatz-Zeile: „Als Guided Tour mit David. Du fährst selbst, David bleibt nah dran." (DE / analog)

### Gruppen-Buchung (2 Jetskis gleichzeitig)
Entweder zwei einzelne Bestätigungen oder Kombi-Text (Kristina entscheidet).

## Stil-Regeln

- **„Du" immer** (keine „Sie"-Form bei Kunden)
- **Keine Gedankenstriche** (em-/en-dash), nur normale Bindestriche oder Kommas/Punkte (Memory `feedback_no_em_dashes`)
- **Kurz und freundlich**, keine Marketing-Phrasen
- **Emojis sparsam** (🌊 am Gruß, sonst nicht)
- **Kein „Sehr geehrter"**, kein „Ihr Team"
- **Unterschrift immer „– Nero Lefkada"** (kein Name)

## Was NIEMALS in den Entwurf kommt

- Der echte Kundenname (nur Platzhalter, Kristina setzt beim Versenden ein)
- Die Kunden-E-Mail oder Telefonnummer
- Pass- oder Ausweisnummer
- Andere Buchungen des Kunden (keine Kombination)
- Preise (diese kommuniziert David beim Ankern / nach dem Deposit)

## Bei Unsicherheit

Wenn mir Kristina Daten schickt, die nicht ins Template passen (unbekanntes Paket, Sonderwunsch, Rabatt), frage ich nach bevor ich schreibe. Nie raten.
