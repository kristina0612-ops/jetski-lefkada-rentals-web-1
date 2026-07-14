import { c as createComponent } from './astro-component_crrHDtXr.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead, a3 as addAttribute, F as Fragment } from './params-and-props_C6QB6PI8.mjs';
import { r as renderComponent } from './entrypoint_CNYytdjO.mjs';
import { r as renderScript } from './script_DNeVu_GM.mjs';
import { $ as $$AdminShell } from './AdminShell_BYMkLdeD.mjs';
import { j as jetskiUnits, a as jetskis } from './jetskis_Dk2rqqiG.mjs';

const prerender = false;
const $$Calendar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Calendar;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return Astro2.redirect("/admin/login");
  }
  const bookingsThisWeek = [];
  const today = /* @__PURE__ */ new Date();
  const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - dayOfWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      date: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" }),
      isToday: d.toDateString() === today.toDateString()
    };
  });
  const token = "";
  const siteUrl = Astro2.site?.toString() ?? "https://jetski-lefkada-rentals.com";
  const tokenIsSet = token.length >= 20;
  const feedUrl = tokenIsSet ? `${siteUrl.replace(/\/$/, "")}/api/calendar.ics?token=${token}` : "";
  return renderTemplate`${renderComponent($$result, "AdminShell", $$AdminShell, { "title": "Kalender", "activePath": "calendar", "data-astro-cid-zd4g3ebl": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="margin-bottom: 2rem;" data-astro-cid-zd4g3ebl> <h1 style="font-family: 'Fraunces Variable', Georgia, serif; font-size: 2.5rem; font-weight: 400; letter-spacing: -0.02em;" data-astro-cid-zd4g3ebl>
Flotten-Kalender
</h1> <p style="color: rgba(253, 251, 244, 0.65); margin-top: 0.5rem;" data-astro-cid-zd4g3ebl>
Wer hat wann welchen Jetski? Alle 4 Einheiten auf einen Blick.
</p> </div>  <section style="margin-bottom: 4rem;" data-astro-cid-zd4g3ebl> <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;" data-astro-cid-zd4g3ebl> <h3 style="font-family: 'Fraunces Variable', Georgia, serif; font-size: 1.25rem; font-weight: 400; margin: 0;" data-astro-cid-zd4g3ebl>
Diese Woche (${weekDays[0].date}, ${weekDays[6].date})
</h3> <div style="display: flex; gap: 0.5rem;" data-astro-cid-zd4g3ebl> <button class="btn-secondary" disabled data-astro-cid-zd4g3ebl>&larr; Vorherige</button> <button class="btn-secondary" data-astro-cid-zd4g3ebl>Heute</button> <button class="btn-secondary" disabled data-astro-cid-zd4g3ebl>Nächste &rarr;</button> </div> </div> <div class="fleet-grid" data-astro-cid-zd4g3ebl> <!-- Header-Zeile: Wochentage --> <div class="grid-cell header-cell" data-astro-cid-zd4g3ebl>Jetski</div> ${weekDays.map((d) => renderTemplate`<div${addAttribute(`grid-cell header-cell ${d.isToday ? "is-today" : ""}`, "class")} data-astro-cid-zd4g3ebl> ${d.label} ${d.isToday && renderTemplate`<span class="today-dot" data-astro-cid-zd4g3ebl></span>`} </div>`)} <!-- Pro Unit eine Zeile --> ${jetskiUnits.map((unit) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-zd4g3ebl": true }, { "default": async ($$result3) => renderTemplate` <div class="grid-cell unit-cell" data-astro-cid-zd4g3ebl> <div class="unit-label" data-astro-cid-zd4g3ebl>${unit.label}</div> <div class="unit-sub" data-astro-cid-zd4g3ebl>${jetskis.find((j) => j.id === unit.modelId)?.model ?? unit.modelId}</div> <div${addAttribute(`unit-status status-${unit.status}`, "class")} data-astro-cid-zd4g3ebl>${unit.status}</div> </div> ${weekDays.map((d) => {
    const daysBookings = bookingsThisWeek.filter(
      (b) => b.jetski_unit_id === unit.id && b.booking_date === d.date
    );
    return renderTemplate`<div${addAttribute(`grid-cell slot-cell ${d.isToday ? "is-today" : ""}`, "class")} data-astro-cid-zd4g3ebl> ${daysBookings.length === 0 ? renderTemplate`<span class="empty-slot" data-astro-cid-zd4g3ebl>-</span>` : daysBookings.map((b) => renderTemplate`<a${addAttribute(`/admin/bookings/${b.id}`, "href")} class="booking-pill" data-astro-cid-zd4g3ebl> <div class="booking-time" data-astro-cid-zd4g3ebl>${b.start_time} · ${b.duration_minutes}min</div> <div class="booking-name" data-astro-cid-zd4g3ebl>${b.customer_name}</div> </a>`)} </div>`;
  })}` })}`)} </div> ${bookingsThisWeek.length === 0 && renderTemplate`<div class="empty-banner" data-astro-cid-zd4g3ebl>
Noch keine Buchungen diese Woche, sobald Supabase angebunden ist und Du Buchungen eintragst, erscheinen sie hier automatisch in der richtigen Zeile + Spalte.
</div>`} </section>  <div style="margin: 3rem 0 2rem;" data-astro-cid-zd4g3ebl> <h2 style="font-family: 'Fraunces Variable', Georgia, serif; font-size: 1.75rem; font-weight: 400; letter-spacing: -0.02em;" data-astro-cid-zd4g3ebl>
Outlook-Kalender-Sync (optional)
</h2> <p style="color: rgba(253, 251, 244, 0.65); margin-top: 0.5rem;" data-astro-cid-zd4g3ebl>
Abonniere Deine CRM-Buchungen zusätzlich in Outlook auf dem Laptop.
</p> </div> ${!tokenIsSet && renderTemplate`<div class="warning-box" data-astro-cid-zd4g3ebl> <h3 data-astro-cid-zd4g3ebl>⚠ Kalender-Token noch nicht eingerichtet</h3> <p data-astro-cid-zd4g3ebl>
Lege in <code data-astro-cid-zd4g3ebl>.env.local</code> folgende Zeile an:<br data-astro-cid-zd4g3ebl> <code class="code-block" data-astro-cid-zd4g3ebl>CALENDAR_FEED_TOKEN=ein-langes-geheimes-passwort-hier</code> </p> <p style="margin-top: 0.75rem;" data-astro-cid-zd4g3ebl>Das Token muss mindestens 32 Zeichen lang sein. Dann Server neu starten.</p> </div>`} <div class="feed-box" data-astro-cid-zd4g3ebl> <label data-astro-cid-zd4g3ebl>Dein privater iCal-Feed:</label> <div class="url-row" data-astro-cid-zd4g3ebl> <input type="text"${addAttribute(feedUrl, "value")} readonly id="feed-url" data-astro-cid-zd4g3ebl> <button id="copy-btn" data-astro-cid-zd4g3ebl>Kopieren</button> </div> <p class="note" data-astro-cid-zd4g3ebl>
⚠ Behalte diese URL geheim. Sie gibt Lesezugriff auf alle Deine Buchungen.
</p> </div>  <h3 class="section-title" data-astro-cid-zd4g3ebl>Outlook einrichten (Windows-Laptop)</h3> <ol class="setup-list" data-astro-cid-zd4g3ebl> <li data-astro-cid-zd4g3ebl> <strong data-astro-cid-zd4g3ebl>Outlook öffnen</strong> <p data-astro-cid-zd4g3ebl>Desktop-App auf Deinem Laptop (nicht die Web-Version).</p> </li> <li data-astro-cid-zd4g3ebl> <strong data-astro-cid-zd4g3ebl>Datei → Kontoeinstellungen → Kontoeinstellungen</strong> <p data-astro-cid-zd4g3ebl>Oben links in Outlook → Dropdown mit Kontoverwaltung.</p> </li> <li data-astro-cid-zd4g3ebl> <strong data-astro-cid-zd4g3ebl>Tab „Internetkalender" → „Neu"</strong> <p data-astro-cid-zd4g3ebl>Auf den Tab wechseln und auf den Neu-Button klicken.</p> </li> <li data-astro-cid-zd4g3ebl> <strong data-astro-cid-zd4g3ebl>Die URL oben kopieren und einfügen</strong> <p data-astro-cid-zd4g3ebl>Das Feld heißt „Ort des Internetkalenders".</p> </li> <li data-astro-cid-zd4g3ebl> <strong data-astro-cid-zd4g3ebl>Bestätigen + Name vergeben</strong> <p data-astro-cid-zd4g3ebl>
Name: <code data-astro-cid-zd4g3ebl>Jetski Lefkada Rentals · Buchungen</code><br data-astro-cid-zd4g3ebl>
Beschreibung: <code data-astro-cid-zd4g3ebl>CRM-Buchungen (schreibgeschützt)</code> </p> </li> <li data-astro-cid-zd4g3ebl> <strong data-astro-cid-zd4g3ebl>Fertig</strong> <p data-astro-cid-zd4g3ebl>
Outlook zeigt Deine Buchungen jetzt automatisch an. Aktualisierung erfolgt alle 1-2 Stunden.
</p> </li> </ol>  <h3 class="section-title" data-astro-cid-zd4g3ebl>Wichtig</h3> <ul class="info-list" data-astro-cid-zd4g3ebl> <li data-astro-cid-zd4g3ebl>📖 <strong data-astro-cid-zd4g3ebl>Schreibgeschützt:</strong> Du siehst in Outlook, kannst aber nicht direkt editieren. Änderungen im CRM machen → Outlook updatet sich automatisch.</li> <li data-astro-cid-zd4g3ebl>🔄 <strong data-astro-cid-zd4g3ebl>Sync-Rhythmus:</strong> Outlook fragt die URL alle 1-2 Stunden ab. Für sofortige Aktualisierung: Rechtsklick auf Kalender → „Senden/Empfangen".</li> <li data-astro-cid-zd4g3ebl>🔒 <strong data-astro-cid-zd4g3ebl>Sicherheit:</strong> URL niemals weitergeben. Bei Verdacht auf Missbrauch: neues Token generieren.</li> <li data-astro-cid-zd4g3ebl>📱 <strong data-astro-cid-zd4g3ebl>Handy:</strong> Funktioniert auch mit iOS/Android-Kalendern (als „Internetkalender" hinzufügen).</li> </ul> ` })}  ${renderScript($$result, "C:/Users/User/jetski-LIVE/src/pages/admin/calendar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/jetski-LIVE/src/pages/admin/calendar.astro", void 0);
const $$file = "C:/Users/User/jetski-LIVE/src/pages/admin/calendar.astro";
const $$url = "/admin/calendar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Calendar,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
