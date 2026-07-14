import { c as createComponent } from './astro-component_crrHDtXr.mjs';
import 'piccolore';
import { bh as renderHead, a3 as addAttribute, Q as renderTemplate, C as renderSlot } from './params-and-props_C6QB6PI8.mjs';
import 'clsx';
import { r as renderScript } from './script_DNeVu_GM.mjs';

const $$AdminShell = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AdminShell;
  const { title, activePath } = Astro2.props;
  const navItems = [
    { path: "dashboard", href: "/admin", label: "Dashboard" },
    { path: "bookings", href: "/admin/bookings", label: "Buchungen" },
    { path: "cash-book", href: "/admin/cash-book", label: "Kassabuch" },
    { path: "invoices", href: "/admin/invoices", label: "Rechnungen" },
    { path: "calendar", href: "/admin/calendar", label: "Kalender" }
  ];
  return renderTemplate`<html lang="de" data-astro-cid-gqtn3ehg> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} · Nero Lefkada · Admin</title><meta name="robots" content="noindex, nofollow">${renderHead()}</head> <body data-astro-cid-gqtn3ehg> <aside data-astro-cid-gqtn3ehg> <div class="brand" data-astro-cid-gqtn3ehg> <div class="brand-title" data-astro-cid-gqtn3ehg>Nero <em data-astro-cid-gqtn3ehg>CRM</em></div> <div class="brand-subtitle" data-astro-cid-gqtn3ehg>Kristina · Admin</div> </div> <nav data-astro-cid-gqtn3ehg> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(activePath === item.path ? "active" : "", "class")} data-astro-cid-gqtn3ehg> <span data-astro-cid-gqtn3ehg>${item.label}</span> </a>`)} </nav> <button class="logout-btn" id="logout-btn" data-astro-cid-gqtn3ehg>Abmelden</button> </aside> <main data-astro-cid-gqtn3ehg> ${renderSlot($$result, $$slots["default"])} </main> ${renderScript($$result, "C:/Users/User/jetski-LIVE/src/components/admin/AdminShell.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/User/jetski-LIVE/src/components/admin/AdminShell.astro", void 0);

export { $$AdminShell as $ };
