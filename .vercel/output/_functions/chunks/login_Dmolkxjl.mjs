import { c as createComponent } from './astro-component_crrHDtXr.mjs';
import 'piccolore';
import { bh as renderHead, Q as renderTemplate } from './params-and-props_C6QB6PI8.mjs';
import 'clsx';
import { r as renderScript } from './script_DNeVu_GM.mjs';

const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  const accessToken = Astro2.cookies.get("sb-access-token")?.value;
  if (accessToken) {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`<html lang="de" data-astro-cid-rf56lckb> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Admin Login · Jetski Lefkada Rentals</title><meta name="robots" content="noindex, nofollow">${renderHead()}</head> <body data-astro-cid-rf56lckb> <div class="card" data-astro-cid-rf56lckb> <h1 data-astro-cid-rf56lckb>Admin <em data-astro-cid-rf56lckb>Login</em></h1> <p class="subtitle" data-astro-cid-rf56lckb>Jetski Lefkada Rentals · Kristina only</p> <form id="login-form" data-astro-cid-rf56lckb> <label for="email" data-astro-cid-rf56lckb>Geschäftsmail</label> <input id="email" name="email" type="email" required autocomplete="email" placeholder="info@jetski-lefkada-rentals.com" data-astro-cid-rf56lckb> <label for="password" data-astro-cid-rf56lckb>Passwort</label> <input id="password" name="password" type="password" required autocomplete="current-password" data-astro-cid-rf56lckb> <button type="submit" id="submit-btn" data-astro-cid-rf56lckb>Einloggen</button> <div class="error" id="error-msg" data-astro-cid-rf56lckb></div> </form> <div class="footer-note" data-astro-cid-rf56lckb>
Login nur mit <strong style="color: rgba(253, 251, 244, 0.8);" data-astro-cid-rf56lckb>info@jetski-lefkada-rentals.com</strong><br data-astro-cid-rf56lckb>
Bei Problemen: David via WhatsApp.
</div> </div> ${renderScript($$result, "C:/Users/User/jetski-LIVE/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/User/jetski-LIVE/src/pages/admin/login.astro", void 0);

const $$file = "C:/Users/User/jetski-LIVE/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
