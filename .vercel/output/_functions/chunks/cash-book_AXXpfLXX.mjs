import { c as createComponent } from './astro-component_crrHDtXr.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead, a3 as addAttribute } from './params-and-props_C6QB6PI8.mjs';
import { r as renderComponent } from './entrypoint_CNYytdjO.mjs';
import { r as renderScript } from './script_DNeVu_GM.mjs';
import { $ as $$AdminShell } from './AdminShell_BYMkLdeD.mjs';

const prerender = false;
const $$CashBook = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CashBook;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return Astro2.redirect("/admin/login");
  }
  const payments = [];
  const expenses = [];
  const totalIncome = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const balance = totalIncome - totalExpenses;
  const currentMonth = (/* @__PURE__ */ new Date()).toLocaleDateString("de-DE", { month: "long", year: "numeric" });
  return renderTemplate`${renderComponent($$result, "AdminShell", $$AdminShell, { "title": "Kassabuch", "activePath": "cash-book", "data-astro-cid-3yyaponc": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;" data-astro-cid-3yyaponc> <div data-astro-cid-3yyaponc> <h1 style="font-family: 'Fraunces Variable', Georgia, serif; font-size: 2.5rem; font-weight: 400; letter-spacing: -0.02em;" data-astro-cid-3yyaponc>
Kassabuch
</h1> <p style="color: rgba(253, 251, 244, 0.65); margin-top: 0.5rem;" data-astro-cid-3yyaponc>
Einnahmen und Ausgaben · ${currentMonth} </p> </div> <div style="display: flex; gap: 0.75rem;" data-astro-cid-3yyaponc> <button id="export-csv-btn" class="btn-secondary" data-astro-cid-3yyaponc>CSV-Export</button> <a href="/admin/cash-book/expense" class="btn-primary" data-astro-cid-3yyaponc>+ Ausgabe erfassen</a> </div> </div>  <div class="balance-grid" data-astro-cid-3yyaponc> <div class="balance-card" style="border-color: rgba(34, 197, 94, 0.3);" data-astro-cid-3yyaponc> <div class="balance-label" data-astro-cid-3yyaponc>Einnahmen</div> <div class="balance-value" style="color: #86efac;" data-astro-cid-3yyaponc>€${totalIncome.toFixed(2)}</div> <div class="balance-sub" data-astro-cid-3yyaponc>${payments.length} Zahlungseingänge</div> </div> <div class="balance-card" style="border-color: rgba(239, 68, 68, 0.3);" data-astro-cid-3yyaponc> <div class="balance-label" data-astro-cid-3yyaponc>Ausgaben</div> <div class="balance-value" style="color: #fca5a5;" data-astro-cid-3yyaponc>€${totalExpenses.toFixed(2)}</div> <div class="balance-sub" data-astro-cid-3yyaponc>${expenses.length} Ausgaben erfasst</div> </div> <div class="balance-card"${addAttribute(`border-color: ${balance >= 0 ? "rgba(255, 194, 51, 0.3)" : "rgba(239, 68, 68, 0.3)"};`, "style")} data-astro-cid-3yyaponc> <div class="balance-label" data-astro-cid-3yyaponc>Saldo</div> <div class="balance-value"${addAttribute(`color: ${balance >= 0 ? "#ffc233" : "#fca5a5"};`, "style")} data-astro-cid-3yyaponc>€${balance.toFixed(2)}</div> <div class="balance-sub" data-astro-cid-3yyaponc>Einnahmen − Ausgaben</div> </div> </div>  <div class="tabs" data-astro-cid-3yyaponc> <button class="tab-btn active" data-tab="income" data-astro-cid-3yyaponc>Einnahmen (${payments.length})</button> <button class="tab-btn" data-tab="expense" data-astro-cid-3yyaponc>Ausgaben (${expenses.length})</button> </div>  <div class="tab-content" data-tab-content="income" data-astro-cid-3yyaponc> ${payments.length === 0 ? renderTemplate`<div class="empty-state" data-astro-cid-3yyaponc> <h3 data-astro-cid-3yyaponc>Noch keine Einnahmen</h3> <p data-astro-cid-3yyaponc>Sobald Buchungen Zahlungen enthalten, erscheinen sie hier automatisch.</p> </div>` : renderTemplate`<div class="table-wrap" data-astro-cid-3yyaponc> <table data-astro-cid-3yyaponc> <thead data-astro-cid-3yyaponc> <tr data-astro-cid-3yyaponc> <th data-astro-cid-3yyaponc>Datum</th> <th data-astro-cid-3yyaponc>Buchung</th> <th data-astro-cid-3yyaponc>Betrag</th> <th data-astro-cid-3yyaponc>Zahlart</th> <th data-astro-cid-3yyaponc>Notiz</th> </tr> </thead> <tbody data-astro-cid-3yyaponc> ${payments.map((p) => renderTemplate`<tr data-astro-cid-3yyaponc> <td data-astro-cid-3yyaponc>${p.payment_date}</td> <td data-astro-cid-3yyaponc>${p.bookings?.customer_name ?? "-"}</td> <td style="color: #86efac;" data-astro-cid-3yyaponc>+€${p.amount}</td> <td data-astro-cid-3yyaponc>${p.payment_method}</td> <td data-astro-cid-3yyaponc>${p.notes ?? "-"}</td> </tr>`)} </tbody> </table> </div>`} </div>  <div class="tab-content" data-tab-content="expense" style="display: none;" data-astro-cid-3yyaponc> ${expenses.length === 0 ? renderTemplate`<div class="empty-state" data-astro-cid-3yyaponc> <h3 data-astro-cid-3yyaponc>Noch keine Ausgaben</h3> <p data-astro-cid-3yyaponc>
Kraftstoff, Wartung, Versicherung und andere Kosten hier erfassen.<br data-astro-cid-3yyaponc> <a href="/admin/cash-book/expense" style="color: #ffc233; text-decoration: underline;" data-astro-cid-3yyaponc>Erste Ausgabe erfassen →</a> </p> </div>` : renderTemplate`<div class="table-wrap" data-astro-cid-3yyaponc> <table data-astro-cid-3yyaponc> <thead data-astro-cid-3yyaponc> <tr data-astro-cid-3yyaponc> <th data-astro-cid-3yyaponc>Datum</th> <th data-astro-cid-3yyaponc>Kategorie</th> <th data-astro-cid-3yyaponc>Beschreibung</th> <th data-astro-cid-3yyaponc>Betrag</th> <th data-astro-cid-3yyaponc>Beleg</th> </tr> </thead> <tbody data-astro-cid-3yyaponc> ${expenses.map((e) => renderTemplate`<tr data-astro-cid-3yyaponc> <td data-astro-cid-3yyaponc>${e.expense_date}</td> <td data-astro-cid-3yyaponc><span class="badge" data-astro-cid-3yyaponc>${e.category}</span></td> <td data-astro-cid-3yyaponc>${e.description}</td> <td style="color: #fca5a5;" data-astro-cid-3yyaponc>−€${e.amount}</td> <td data-astro-cid-3yyaponc> ${e.receipt_url ? renderTemplate`<a${addAttribute(e.receipt_url, "href")} target="_blank" rel="noopener" style="color: #ffc233;" data-astro-cid-3yyaponc>Ansehen</a>` : "-"} </td> </tr>`)} </tbody> </table> </div>`} </div> ` })}  ${renderScript($$result, "C:/Users/User/jetski-LIVE/src/pages/admin/cash-book.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/jetski-LIVE/src/pages/admin/cash-book.astro", void 0);

const $$file = "C:/Users/User/jetski-LIVE/src/pages/admin/cash-book.astro";
const $$url = "/admin/cash-book";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CashBook,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
