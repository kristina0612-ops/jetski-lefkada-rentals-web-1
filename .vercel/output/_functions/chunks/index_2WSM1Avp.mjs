import { c as createComponent } from './astro-component_crrHDtXr.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead, a3 as addAttribute } from './params-and-props_C6QB6PI8.mjs';
import { r as renderComponent } from './entrypoint_CNYytdjO.mjs';
import { r as renderScript } from './script_DNeVu_GM.mjs';
import { $ as $$AdminShell } from './AdminShell_BYMkLdeD.mjs';
import { a as jetskis } from './jetskis_Dk2rqqiG.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return Astro2.redirect("/admin/login");
  }
  const bookings = [];
  return renderTemplate`${renderComponent($$result, "AdminShell", $$AdminShell, { "title": "Buchungen", "activePath": "bookings", "data-astro-cid-wql3pjmu": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;" data-astro-cid-wql3pjmu> <div data-astro-cid-wql3pjmu> <h1 style="font-family: 'Fraunces Variable', Georgia, serif; font-size: 2.5rem; font-weight: 400; letter-spacing: -0.02em;" data-astro-cid-wql3pjmu>
Buchungen
</h1> <p style="color: rgba(253, 251, 244, 0.65); margin-top: 0.5rem;" data-astro-cid-wql3pjmu> ${bookings.length} Buchungen insgesamt
</p> </div> <div style="display: flex; gap: 0.75rem;" data-astro-cid-wql3pjmu> <button id="export-csv-btn" class="btn-secondary" data-astro-cid-wql3pjmu>CSV-Export</button> <a href="/admin/bookings/new" class="btn-primary" data-astro-cid-wql3pjmu>+ Neue Buchung</a> </div> </div>  <div class="filter-bar" data-astro-cid-wql3pjmu> <input type="text" id="filter-search" placeholder="Suche nach Kundenname…" data-astro-cid-wql3pjmu> <select id="filter-jetski" data-astro-cid-wql3pjmu> <option value="" data-astro-cid-wql3pjmu>Alle Jetskis</option> <option value="nero-ena" data-astro-cid-wql3pjmu>Nero Ena</option> <option value="nero-dio" data-astro-cid-wql3pjmu>Nero Dio</option> <option value="nero-tria" data-astro-cid-wql3pjmu>Nero Tria</option> <option value="nero-tessera" data-astro-cid-wql3pjmu>Nero Tessera</option> </select> <select id="filter-status" data-astro-cid-wql3pjmu> <option value="" data-astro-cid-wql3pjmu>Alle Status</option> <option value="pending" data-astro-cid-wql3pjmu>Ausstehend</option> <option value="confirmed" data-astro-cid-wql3pjmu>Bestätigt</option> <option value="completed" data-astro-cid-wql3pjmu>Abgeschlossen</option> <option value="cancelled" data-astro-cid-wql3pjmu>Storniert</option> </select> <input type="date" id="filter-date" data-astro-cid-wql3pjmu> </div>  ${bookings.length === 0 ? renderTemplate`<div class="empty-state" data-astro-cid-wql3pjmu> <h3 data-astro-cid-wql3pjmu>Noch keine Buchungen</h3> <p data-astro-cid-wql3pjmu>
Sobald Supabase angebunden ist, erscheinen hier Deine Buchungen.<br data-astro-cid-wql3pjmu> <a href="/admin/bookings/new" style="color: #ffc233; text-decoration: underline;" data-astro-cid-wql3pjmu>Erste Buchung manuell anlegen →</a> </p> </div>` : renderTemplate`<div class="table-wrap" data-astro-cid-wql3pjmu> <table data-astro-cid-wql3pjmu> <thead data-astro-cid-wql3pjmu> <tr data-astro-cid-wql3pjmu> <th data-astro-cid-wql3pjmu>Datum</th> <th data-astro-cid-wql3pjmu>Zeit</th> <th data-astro-cid-wql3pjmu>Jetski</th> <th data-astro-cid-wql3pjmu>Kunde</th> <th data-astro-cid-wql3pjmu>Service</th> <th data-astro-cid-wql3pjmu>Preis</th> <th data-astro-cid-wql3pjmu>Status</th> <th data-astro-cid-wql3pjmu></th> </tr> </thead> <tbody id="bookings-tbody" data-astro-cid-wql3pjmu> ${bookings.map((b) => renderTemplate`<tr data-astro-cid-wql3pjmu> <td data-astro-cid-wql3pjmu>${b.booking_date}</td> <td data-astro-cid-wql3pjmu>${b.start_time}</td> <td data-astro-cid-wql3pjmu>${jetskis.find((j) => j.id === b.jetski_id)?.name ?? b.jetski_id}</td> <td data-astro-cid-wql3pjmu>${b.customer_name}</td> <td data-astro-cid-wql3pjmu>${b.service_category}</td> <td data-astro-cid-wql3pjmu>€${b.total_price}</td> <td data-astro-cid-wql3pjmu><span${addAttribute(`status status-${b.status}`, "class")} data-astro-cid-wql3pjmu>${b.status}</span></td> <td data-astro-cid-wql3pjmu><a${addAttribute(`/admin/bookings/${b.id}`, "href")} class="edit-link" data-astro-cid-wql3pjmu>Edit</a></td> </tr>`)} </tbody> </table> </div>`}` })}  ${renderScript($$result, "C:/Users/User/jetski-LIVE/src/pages/admin/bookings/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/jetski-LIVE/src/pages/admin/bookings/index.astro", void 0);

const $$file = "C:/Users/User/jetski-LIVE/src/pages/admin/bookings/index.astro";
const $$url = "/admin/bookings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
