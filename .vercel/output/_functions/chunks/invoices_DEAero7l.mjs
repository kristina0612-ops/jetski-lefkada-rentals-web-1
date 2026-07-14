import { c as createComponent } from './astro-component_crrHDtXr.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead, a3 as addAttribute } from './params-and-props_C6QB6PI8.mjs';
import { r as renderComponent } from './entrypoint_CNYytdjO.mjs';
import { $ as $$AdminShell } from './AdminShell_BYMkLdeD.mjs';

const prerender = false;
const $$Invoices = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Invoices;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return Astro2.redirect("/admin/login");
  }
  const invoices = [];
  const nextInvoiceNumber = String(invoices.length + 1).padStart(3, "0");
  return renderTemplate`${renderComponent($$result, "AdminShell", $$AdminShell, { "title": "Rechnungen", "activePath": "invoices", "data-astro-cid-dz2m7ak3": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;" data-astro-cid-dz2m7ak3> <div data-astro-cid-dz2m7ak3> <h1 style="font-family: 'Fraunces Variable', Georgia, serif; font-size: 2.5rem; font-weight: 400; letter-spacing: -0.02em;" data-astro-cid-dz2m7ak3>
Rechnungen
</h1> <p style="color: rgba(253, 251, 244, 0.65); margin-top: 0.5rem;" data-astro-cid-dz2m7ak3>
Nächste Rechnungsnummer: <strong style="color: #ffc233;" data-astro-cid-dz2m7ak3>${nextInvoiceNumber}</strong> </p> </div> </div>  <div class="blocker-box" data-astro-cid-dz2m7ak3> <h3 data-astro-cid-dz2m7ak3>Rechnungsmodul wartet auf 3 Klärungen</h3> <ol data-astro-cid-dz2m7ak3> <li data-astro-cid-dz2m7ak3> <strong data-astro-cid-dz2m7ak3>USt-Nummer</strong> <span class="status-tag pending" data-astro-cid-dz2m7ak3>ausstehend</span> <div class="blocker-note" data-astro-cid-dz2m7ak3>Kommt demnächst von Kristina. Pflichtbestandteil jeder Rechnung.</div> </li> <li data-astro-cid-dz2m7ak3> <strong data-astro-cid-dz2m7ak3>Buchhaltungssystem der Buchhalterin</strong> <span class="status-tag pending" data-astro-cid-dz2m7ak3>ausstehend</span> <div class="blocker-note" data-astro-cid-dz2m7ak3>
Softone, Epsilon, Elorus, Tebi oder anderes? Entscheidet ob Rechnungen direkt ins System oder nur als PDF zugeschickt werden.
</div> </li> <li data-astro-cid-dz2m7ak3> <strong data-astro-cid-dz2m7ak3>myDATA / AADE Anbindung (griechisches Recht)</strong> <span class="status-tag blocker" data-astro-cid-dz2m7ak3>Rechtlicher Blocker</span> <div class="blocker-note" data-astro-cid-dz2m7ak3>
Seit 2021 müssen alle Rechnungen in Griechenland elektronisch an die AADE übermittelt werden.
          Das muss mit der Buchhalterin geklärt werden, BEVOR Rechnungen rausgehen können.
</div> </li> </ol> <p class="blocker-footer" data-astro-cid-dz2m7ak3>
Sobald diese drei Punkte geklärt sind, wird das Modul aktiviert.<br data-astro-cid-dz2m7ak3>
Fortlaufende Nummer startet bei <strong style="color: #ffc233;" data-astro-cid-dz2m7ak3>001</strong>.
</p> </div>  <h3 style="font-family: 'Fraunces Variable', Georgia, serif; font-size: 1.5rem; margin: 3rem 0 1rem;" data-astro-cid-dz2m7ak3>
Bisherige Rechnungen
</h3> ${invoices.length === 0 ? renderTemplate`<div class="empty-state" data-astro-cid-dz2m7ak3> <p data-astro-cid-dz2m7ak3>Noch keine Rechnungen erstellt.</p> </div>` : renderTemplate`<div class="table-wrap" data-astro-cid-dz2m7ak3> <table data-astro-cid-dz2m7ak3> <thead data-astro-cid-dz2m7ak3> <tr data-astro-cid-dz2m7ak3> <th data-astro-cid-dz2m7ak3>Nummer</th> <th data-astro-cid-dz2m7ak3>Datum</th> <th data-astro-cid-dz2m7ak3>Kunde</th> <th data-astro-cid-dz2m7ak3>Buchung</th> <th data-astro-cid-dz2m7ak3>Summe</th> <th data-astro-cid-dz2m7ak3>Versandt</th> <th data-astro-cid-dz2m7ak3></th> </tr> </thead> <tbody data-astro-cid-dz2m7ak3> ${invoices.map((inv) => renderTemplate`<tr data-astro-cid-dz2m7ak3> <td style="color: #ffc233; font-family: 'JetBrains Mono', monospace;" data-astro-cid-dz2m7ak3>${inv.invoice_number}</td> <td data-astro-cid-dz2m7ak3>${new Date(inv.created_at).toLocaleDateString("de-DE")}</td> <td data-astro-cid-dz2m7ak3>-</td> <td data-astro-cid-dz2m7ak3>-</td> <td data-astro-cid-dz2m7ak3>-</td> <td data-astro-cid-dz2m7ak3>${inv.sent_to_accountant ? "✓" : "-"}</td> <td data-astro-cid-dz2m7ak3> ${inv.pdf_url && renderTemplate`<a${addAttribute(inv.pdf_url, "href")} target="_blank" rel="noopener" style="color: #ffc233;" data-astro-cid-dz2m7ak3>PDF</a>`} </td> </tr>`)} </tbody> </table> </div>`}` })}`;
}, "C:/Users/User/jetski-LIVE/src/pages/admin/invoices.astro", void 0);

const $$file = "C:/Users/User/jetski-LIVE/src/pages/admin/invoices.astro";
const $$url = "/admin/invoices";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Invoices,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
