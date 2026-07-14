import { c as createComponent } from './astro-component_crrHDtXr.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_C6QB6PI8.mjs';
import { r as renderComponent } from './entrypoint_CNYytdjO.mjs';
import { $ as $$AdminShell } from './AdminShell_BYMkLdeD.mjs';

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return Astro2.redirect("/admin/login");
  }
  const stats = {
    bookingsToday: 0,
    bookingsThisWeek: 0,
    revenueThisMonth: 0,
    pendingPayments: 0
  };
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const greeting = hour < 11 ? "Guten Morgen" : hour < 17 ? "Hallo" : "Guten Abend";
  return renderTemplate`${renderComponent($$result, "AdminShell", $$AdminShell, { "title": "Dashboard", "activePath": "dashboard", "data-astro-cid-u2h3djql": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 style="font-family: 'Fraunces Variable', Georgia, serif; font-size: 2.5rem; font-weight: 400; letter-spacing: -0.02em;" data-astro-cid-u2h3djql> ${greeting}, <em style="color: #ffc233; font-style: italic;" data-astro-cid-u2h3djql>Kristina</em> </h1> <p style="color: rgba(253, 251, 244, 0.65); margin: 0.5rem 0 3rem;" data-astro-cid-u2h3djql>${today}</p> <div class="stats-grid" data-astro-cid-u2h3djql> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-label" data-astro-cid-u2h3djql>Heute</div> <div class="stat-value" data-astro-cid-u2h3djql>${stats.bookingsToday}<span class="stat-unit" data-astro-cid-u2h3djql>Buchungen</span></div> </div> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-label" data-astro-cid-u2h3djql>Diese Woche</div> <div class="stat-value" data-astro-cid-u2h3djql>${stats.bookingsThisWeek}<span class="stat-unit" data-astro-cid-u2h3djql>Buchungen</span></div> </div> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-label" data-astro-cid-u2h3djql>Umsatz diesen Monat</div> <div class="stat-value" data-astro-cid-u2h3djql>€${stats.revenueThisMonth}</div> </div> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-label" data-astro-cid-u2h3djql>Offene Zahlungen</div> <div class="stat-value" data-astro-cid-u2h3djql>€${stats.pendingPayments}</div> </div> </div>  <h3 class="section-title" data-astro-cid-u2h3djql>Schnelle Aktionen</h3> <div class="actions-grid" data-astro-cid-u2h3djql> <a href="/admin/bookings/new" class="action-card" data-astro-cid-u2h3djql> <div class="action-title" data-astro-cid-u2h3djql>+ Neue Buchung</div> <div class="action-sub" data-astro-cid-u2h3djql>WhatsApp-Anfrage eintragen</div> </a> <a href="/admin/bookings/block" class="action-card action-card-block" data-astro-cid-u2h3djql> <div class="action-title action-title-block" data-astro-cid-u2h3djql>⛔ Slot sperren</div> <div class="action-sub" data-astro-cid-u2h3djql>Walk-in · Wartung · Wetter</div> </a> <a href="/admin/bookings" class="action-card" data-astro-cid-u2h3djql> <div class="action-title" data-astro-cid-u2h3djql>Buchungen anzeigen</div> <div class="action-sub" data-astro-cid-u2h3djql>Alle Buchungen + Filter</div> </a> <a href="/admin/cash-book" class="action-card" data-astro-cid-u2h3djql> <div class="action-title" data-astro-cid-u2h3djql>Kassabuch</div> <div class="action-sub" data-astro-cid-u2h3djql>Einnahmen / Ausgaben</div> </a> <a href="/admin/calendar" class="action-card" data-astro-cid-u2h3djql> <div class="action-title" data-astro-cid-u2h3djql>Kalender-Feed</div> <div class="action-sub" data-astro-cid-u2h3djql>Outlook-Sync-URL</div> </a> </div>  <h3 class="section-title" data-astro-cid-u2h3djql>System-Status</h3> <div class="status-list" data-astro-cid-u2h3djql> <div class="status-item" data-astro-cid-u2h3djql> <span class="dot pending" data-astro-cid-u2h3djql></span> <strong data-astro-cid-u2h3djql>Supabase-Datenbank:</strong> <span class="status-text" data-astro-cid-u2h3djql>Wartet auf Keys in .env.local</span> </div> <div class="status-item" data-astro-cid-u2h3djql> <span class="dot pending" data-astro-cid-u2h3djql></span> <strong data-astro-cid-u2h3djql>Preisrechner:</strong> <span class="status-text" data-astro-cid-u2h3djql>Classic funktioniert · neue Kategorien warten auf Preise pro Jetski</span> </div> <div class="status-item" data-astro-cid-u2h3djql> <span class="dot ok" data-astro-cid-u2h3djql></span> <strong data-astro-cid-u2h3djql>Vercel Analytics:</strong> <span class="status-text" data-astro-cid-u2h3djql>Aktiv auf der Produktiv-Seite</span> </div> <div class="status-item" data-astro-cid-u2h3djql> <span class="dot blocker" data-astro-cid-u2h3djql></span> <strong data-astro-cid-u2h3djql>Rechnungsmodul:</strong> <span class="status-text" data-astro-cid-u2h3djql>Wartet auf USt-Nr. + myDATA-Klärung</span> </div> </div> ` })}`;
}, "C:/Users/User/jetski-LIVE/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/User/jetski-LIVE/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
