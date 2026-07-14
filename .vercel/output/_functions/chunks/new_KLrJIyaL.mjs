import { c as createComponent } from './astro-component_crrHDtXr.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_C6QB6PI8.mjs';
import { r as renderComponent } from './entrypoint_CNYytdjO.mjs';
import { r as renderScript } from './script_DNeVu_GM.mjs';
import { $ as $$AdminShell } from './AdminShell_BYMkLdeD.mjs';

const prerender = false;
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$New;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return Astro2.redirect("/admin/login");
  }
  return renderTemplate`${renderComponent($$result, "AdminShell", $$AdminShell, { "title": "Neue Ausgabe", "activePath": "cash-book", "data-astro-cid-o2u3jvgw": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="margin-bottom: 2rem;" data-astro-cid-o2u3jvgw> <a href="/admin/cash-book" style="color: rgba(253, 251, 244, 0.5); font-size: 0.85rem; text-decoration: none;" data-astro-cid-o2u3jvgw>
&larr; Zurueck zum Kassabuch
</a> <h1 style="font-family: 'Fraunces Variable', Georgia, serif; font-size: 2.5rem; font-weight: 400; letter-spacing: -0.02em; margin-top: 0.75rem;" data-astro-cid-o2u3jvgw>
Neue Ausgabe
</h1> <p style="color: rgba(253, 251, 244, 0.65); margin-top: 0.5rem;" data-astro-cid-o2u3jvgw>
Kraftstoff, Wartung, Versicherung oder sonstige Ausgaben erfassen.
</p> </div> <form id="expense-form" style="max-width: 640px;" data-astro-cid-o2u3jvgw> <div class="row-2" data-astro-cid-o2u3jvgw> <div class="field" data-astro-cid-o2u3jvgw> <label for="expense_date" data-astro-cid-o2u3jvgw>Datum</label> <input id="expense_date" name="expense_date" type="date" required data-astro-cid-o2u3jvgw> </div> <div class="field" data-astro-cid-o2u3jvgw> <label for="category" data-astro-cid-o2u3jvgw>Kategorie</label> <select id="category" name="category" required data-astro-cid-o2u3jvgw> <option value="fuel" data-astro-cid-o2u3jvgw>Kraftstoff</option> <option value="maintenance" data-astro-cid-o2u3jvgw>Wartung / Reparatur</option> <option value="insurance" data-astro-cid-o2u3jvgw>Versicherung</option> <option value="other" data-astro-cid-o2u3jvgw>Sonstiges</option> </select> </div> </div> <div class="field" data-astro-cid-o2u3jvgw> <label for="amount" data-astro-cid-o2u3jvgw>Betrag (&euro;)</label> <input id="amount" name="amount" type="number" step="0.01" min="0" required data-astro-cid-o2u3jvgw> </div> <div class="field" data-astro-cid-o2u3jvgw> <label for="description" data-astro-cid-o2u3jvgw>Beschreibung</label> <input id="description" name="description" type="text" required placeholder="z.B. Tankfuellung bei Shell Lygia" data-astro-cid-o2u3jvgw> </div> <div class="field" data-astro-cid-o2u3jvgw> <label for="receipt_url" data-astro-cid-o2u3jvgw>Beleg-URL (optional)</label> <input id="receipt_url" name="receipt_url" type="url" placeholder="https://... (z.B. Supabase Storage Link)" data-astro-cid-o2u3jvgw> <p class="hint" data-astro-cid-o2u3jvgw>Foto vom Beleg mit dem Handy aufnehmen, in Cloud hochladen, URL hier einfuegen.</p> </div> <div class="field" data-astro-cid-o2u3jvgw> <label for="notes" data-astro-cid-o2u3jvgw>Notizen (optional)</label> <textarea id="notes" name="notes" rows="3" data-astro-cid-o2u3jvgw></textarea> </div> <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: 1rem;" data-astro-cid-o2u3jvgw> <button type="submit" class="btn-primary" data-astro-cid-o2u3jvgw>Ausgabe speichern</button> <a href="/admin/cash-book" class="btn-ghost" data-astro-cid-o2u3jvgw>Abbrechen</a> </div> <div class="message" id="message" data-astro-cid-o2u3jvgw></div> </form> ` })}  ${renderScript($$result, "C:/Users/User/jetski-LIVE/src/pages/admin/cash-book/expense/new.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/jetski-LIVE/src/pages/admin/cash-book/expense/new.astro", void 0);

const $$file = "C:/Users/User/jetski-LIVE/src/pages/admin/cash-book/expense/new.astro";
const $$url = "/admin/cash-book/expense/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
