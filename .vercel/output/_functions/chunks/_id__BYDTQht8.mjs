import { c as createComponent } from './astro-component_crrHDtXr.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_C6QB6PI8.mjs';
import { r as renderComponent } from './entrypoint_CNYytdjO.mjs';
import { $ as $$AdminShell } from './AdminShell_BYMkLdeD.mjs';
import './jetskis_Dk2rqqiG.mjs';

const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return Astro2.redirect("/admin/login");
  }
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "AdminShell", $$AdminShell, { "title": `Buchung ${id}`, "activePath": "bookings", "data-astro-cid-eaebfa3d": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="margin-bottom: 2rem;" data-astro-cid-eaebfa3d> <a href="/admin/bookings" style="color: rgba(253, 251, 244, 0.5); font-size: 0.85rem; text-decoration: none;" data-astro-cid-eaebfa3d>
&larr; Zurueck zu Buchungen
</a> <h1 style="font-family: 'Fraunces Variable', Georgia, serif; font-size: 2.5rem; font-weight: 400; letter-spacing: -0.02em; margin-top: 0.75rem;" data-astro-cid-eaebfa3d>
Buchung
</h1> <p style="color: rgba(253, 251, 244, 0.65); margin-top: 0.5rem; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;" data-astro-cid-eaebfa3d>
ID: ${id} </p> </div> ${renderTemplate`<div class="empty-state" data-astro-cid-eaebfa3d> <h3 data-astro-cid-eaebfa3d>Buchung nicht gefunden</h3> <p data-astro-cid-eaebfa3d>
Diese Buchung existiert nicht oder Supabase ist noch nicht verbunden.<br data-astro-cid-eaebfa3d> <a href="/admin/bookings" style="color: #ffc233;" data-astro-cid-eaebfa3d>Zurueck zur Liste</a> </p> </div>` }` })}`;
}, "C:/Users/User/jetski-LIVE/src/pages/admin/bookings/[id].astro", void 0);

const $$file = "C:/Users/User/jetski-LIVE/src/pages/admin/bookings/[id].astro";
const $$url = "/admin/bookings/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
