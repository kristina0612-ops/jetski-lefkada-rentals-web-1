import { c as createComponent } from './astro-component_crrHDtXr.mjs';
import 'piccolore';
import { Q as renderTemplate, bi as defineScriptVars, z as maybeRenderHead, C as renderSlot, bh as renderHead, bf as unescapeHTML, a3 as addAttribute } from './params-and-props_C6QB6PI8.mjs';
import { r as renderComponent } from './entrypoint_CNYytdjO.mjs';
import { r as renderScript } from './script_DNeVu_GM.mjs';
import 'clsx';
import { p as pricingExtras, a as jetskis, n as netFromGross, V as VAT_RATE, v as vatFromGross } from './jetskis_Dk2rqqiG.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useMemo, useCallback, useEffect } from 'react';

const $$Index$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index$1;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "C:/Users/User/jetski-LIVE/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/jetski-LIVE/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$CookieBanner = createComponent(($$result, $$props, $$slots) => {
  const GA_ID = "G-MBLR20DZES";
  return renderTemplate(_a$2 || (_a$2 = __template$2(["<!-- Confirmation toast shown for 3s after Accept/Reject click -->", '<div id="cookie-toast" role="status" aria-live="polite" hidden class="fixed inset-x-0 bottom-0 z-[9999] px-4 py-4 text-sm text-white backdrop-blur-md sm:px-6" style="background: rgba(0,179,167,0.95); border-top: 1px solid rgba(253,251,244,0.2);"> <div class="mx-auto max-w-6xl flex items-center gap-3"> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg> <span data-cb-label="saved">Your cookie preferences have been saved. You can change them any time under Privacy.</span> </div> </div> <div id="cookie-banner" role="dialog" aria-live="polite" aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-text" hidden class="fixed inset-x-0 bottom-0 z-[9999] border-t bg-[#050910]/97 px-4 py-5 text-sm text-white/95 backdrop-blur-md sm:px-6" style="border-color: rgba(253,251,244,0.15);"> <div class="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:gap-6"> <div class="flex-1"> <p id="cookie-banner-title" class="mb-1.5 font-semibold text-white" data-cb-label="title">\nYour privacy · Deine Privatsphäre · Η ιδιωτικότητά σου\n</p> <p id="cookie-banner-text" class="leading-relaxed text-white/80" data-cb-label="body"> <!-- Text wird per JS nach Sprache gesetzt. Fallback: EN. --> </p> </div> <div class="flex flex-shrink-0 flex-col gap-2 sm:flex-row sm:items-center"> <!-- Reject + Accept sind OPTISCH GLEICH PROMINENT (EDPB 03/2022, LG München I 17 O 14168/22):\n           beide solid Füllung, gleicher Kontrast gegen den dunklen Banner, gleiches Padding.\n           Nur die Farbe unterscheidet die Funktion, keine Dark-Pattern-Hierarchie. --> <button type="button" id="cookie-reject" class="rounded-md px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition" style="background: #fdfbf4; color: #071d30; border: 1px solid #fdfbf4;" data-cb-label="reject">Reject all</button> <button type="button" id="cookie-accept" class="rounded-md px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition" style="background: #ff5a36; color: #fdfbf4; border: 1px solid #ff5a36;" data-cb-label="accept">Accept all</button> </div> </div> <div class="mx-auto mt-3 max-w-6xl text-[11px] text-white/55"> <a href="/privacy#cookies" class="underline decoration-dotted underline-offset-2 hover:text-white" data-cb-label="more">\nCookie details & privacy policy\n</a> <span class="mx-2 opacity-40">·</span> <span data-cb-label="duration">Your choice is remembered for 12 months.</span> </div> </div> <script>(function(){', `
  (function () {
    const STORAGE_KEY = "cookie-consent";
    const STORAGE_TS_KEY = "cookie-consent-at";
    const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 12 Monate

    const banner = document.getElementById("cookie-banner");
    const accept = document.getElementById("cookie-accept");
    const reject = document.getElementById("cookie-reject");
    if (!banner || !accept || !reject) return;

    // ──────────────────────────────────────────────────────────────────────
    // Mehrsprachiger Text, ausgewählt anhand von <html lang="..">
    // ──────────────────────────────────────────────────────────────────────
    const LANG = (document.documentElement.lang || "en").toLowerCase().slice(0, 2);
    const T = {
      en: {
        title: "Your privacy matters",
        body:
          "We use essential cookies to run the site (no tracking) and optional analytics cookies (Google Analytics) to understand visits. Vercel Web Analytics runs cookie-free and anonymised. Both buttons are equal, your choice is respected, no pre-selection.",
        reject: "Reject all",
        accept: "Accept all",
        more: "Cookie details & privacy policy",
        duration: "Your choice is remembered for 12 months.",
        saved: "Your cookie preferences have been saved. You can change them any time under Privacy.",
      },
      de: {
        title: "Deine Privatsphäre",
        body:
          "Wir nutzen notwendige Cookies für den Betrieb (kein Tracking) und optionale Analyse-Cookies (Google Analytics) für Besucherstatistiken. Vercel Web Analytics läuft cookie-frei und anonymisiert. Beide Buttons sind gleichwertig, keine Vorauswahl, Du entscheidest.",
        reject: "Alle ablehnen",
        accept: "Alle akzeptieren",
        more: "Cookie-Details & Datenschutz",
        duration: "Deine Entscheidung wird 12 Monate gespeichert.",
        saved: "Deine Cookie-Einstellungen wurden gespeichert. Änderbar jederzeit unter Datenschutz.",
      },
      el: {
        title: "Η ιδιωτικότητά σου μετράει",
        body:
          "Χρησιμοποιούμε απαραίτητα cookies για τη λειτουργία του ιστοτόπου (χωρίς tracking) και προαιρετικά cookies ανάλυσης (Google Analytics). Το Vercel Web Analytics λειτουργεί χωρίς cookies και ανώνυμα. Και τα δύο κουμπιά είναι ισότιμα, εσύ αποφασίζεις.",
        reject: "Απόρριψη όλων",
        accept: "Αποδοχή όλων",
        more: "Λεπτομέρειες cookies & πολιτική απορρήτου",
        duration: "Η επιλογή σου αποθηκεύεται για 12 μήνες.",
        saved: "Οι προτιμήσεις cookies αποθηκεύτηκαν. Μπορείς να τις αλλάξεις οποιαδήποτε στιγμή στην Πολιτική Απορρήτου.",
      },
    };
    const labels = T[LANG] || T.en;
    banner.querySelectorAll("[data-cb-label]").forEach(function (el) {
      const key = el.getAttribute("data-cb-label");
      if (labels[key]) el.textContent = labels[key];
    });
    // Toast bekommt auch den passenden Sprach-Text
    const toast = document.getElementById("cookie-toast");
    if (toast) {
      toast.querySelectorAll("[data-cb-label]").forEach(function (el) {
        const key = el.getAttribute("data-cb-label");
        if (labels[key]) el.textContent = labels[key];
      });
    }

    function showToast() {
      if (!toast) return;
      toast.hidden = false;
      setTimeout(function () { toast.hidden = true; }, 3000);
    }

    // ──────────────────────────────────────────────────────────────────────
    // Consent-Storage mit Ablauf (DSGVO: Einwilligung nicht unbegrenzt)
    // ──────────────────────────────────────────────────────────────────────
    function getStoredConsent() {
      const value = localStorage.getItem(STORAGE_KEY);
      const ts = Number(localStorage.getItem(STORAGE_TS_KEY)) || 0;
      if (!value) return null;
      if (Date.now() - ts > CONSENT_TTL_MS) {
        // Abgelaufen → neu abfragen
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_TS_KEY);
        return null;
      }
      return value;
    }

    function storeConsent(value) {
      localStorage.setItem(STORAGE_KEY, value);
      localStorage.setItem(STORAGE_TS_KEY, String(Date.now()));
    }

    function loadGA() {
      if (window.__gaLoaded) return;
      window.__gaLoaded = true;
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag("js", new Date());
      // IP-Anonymisierung ist bei GA4 default-on, explizit gesetzt für Klarheit
      gtag("config", GA_ID, { anonymize_ip: true });
    }

    function hide() { banner.hidden = true; }
    function show() { banner.hidden = false; }

    const stored = getStoredConsent();
    if (stored === "accepted") {
      loadGA();
      hide();
    } else if (stored === "rejected") {
      hide();
    } else {
      show();
    }

    accept.addEventListener("click", function () {
      storeConsent("accepted");
      loadGA();
      hide();
      showToast();
    });

    reject.addEventListener("click", function () {
      storeConsent("rejected");
      hide();
      showToast();
    });

    // Von Privacy-Page triggerbar, damit User Wahl jederzeit ändern kann:
    //   document.dispatchEvent(new CustomEvent('cookie:reset'))
    document.addEventListener("cookie:reset", function () {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_TS_KEY);
      show();
    });
  })();
})();<\/script>`])), maybeRenderHead(), defineScriptVars({ GA_ID }));
}, "C:/Users/User/jetski-LIVE/src/components/CookieBanner.astro", void 0);

const $$CtaTracker = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "C:/Users/User/jetski-LIVE/src/components/CtaTracker.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/jetski-LIVE/src/components/CtaTracker.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$LayoutBare = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LayoutBare;
  const {
    title = "Nero Lefkada · Jetski Rental",
    description = "Rent a Sea-Doo jetski on Lefkada, Greece. Four supercharged Neros, operated by Nero Lefkada Rental&Retail with David as your guide at Lygia Port. Book online in ninety seconds.",
    themeColor = "#071d30",
    lang = "en",
    preloadHeroPoster = false
  } = Astro2.props;
  const htmlLang = lang === "gr" ? "el" : lang;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<html", '> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="generator"', "><title>", '</title><meta name="description"', '><!-- Google Search Console verification (do not remove) --><meta name="google-site-verification" content="SSY6upoAielJNZl8S6mN1RfOzK73xwPVmnnfVpbsbkE"><meta name="theme-color"', '><meta name="color-scheme" content="dark light"><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url" content="https://jetski-lefkada-rentals.com/"><meta property="og:image" content="https://jetski-lefkada-rentals.com/og-cover.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image" content="https://jetski-lefkada-rentals.com/og-cover.jpg"><script type="application/ld+json">', `<\/script><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23ffc233'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='20' font-style='italic' fill='%23071d30' text-anchor='middle' dominant-baseline='central'%3EJ%3C/text%3E%3C/svg%3E">`, "<!-- Google Analytics 4 wird NICHT direkt hier geladen, Opt-In via CookieBanner -->", '</head> <body class="!bg-transparent !min-h-0"> ', " ", " ", " ", " ", " </body> </html>"])), addAttribute(htmlLang, "lang"), addAttribute(Astro2.generator, "content"), title, addAttribute(description, "content"), addAttribute(themeColor, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": "Nero Lefkada",
    "legalName": "Nero Lefkada Rental and Retail Monoprosopi IKE",
    "vatID": "EL803268718",
    "taxID": "803268718",
    "slogan": "Fastest Jetskis on the Island",
    "description": "Sea-Doo jetski rentals at Lygia Port, Lefkada, Greece. Four supercharged Neros (Ena, Dio, Tria, Tessera), family-run by Kristina and David Goldberg.",
    "url": "https://jetski-lefkada-rentals.com/",
    "image": "https://jetski-lefkada-rentals.com/og-cover.jpg",
    "telephone": "+30 695 561 2777",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Lygia Port",
      "addressLocality": "Lefkada",
      "addressCountry": "GR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 38.7893,
      "longitude": 20.7192
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "21:00"
    },
    "priceRange": "€€",
    "areaServed": {
      "@type": "Place",
      "name": "Lefkada, Greece"
    },
    "sameAs": ["https://www.instagram.com/jetski__lefkada/"]
  })), preloadHeroPoster && renderTemplate`<link rel="preload" as="image" href="/images/hero-poster.webp" type="image/webp">`, renderHead(), renderSlot($$result, $$slots["default"]), renderComponent($$result, "CookieBanner", $$CookieBanner, {}), renderComponent($$result, "Analytics", $$Index$1, {}), renderComponent($$result, "CtaTracker", $$CtaTracker, {}), renderScript($$result, "C:/Users/User/jetski-LIVE/src/layouts/LayoutBare.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/User/jetski-LIVE/src/layouts/LayoutBare.astro", void 0);

const $$Navbar2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Navbar2;
  const currentLang = Astro2.props.lang ?? "en";
  const labels = {
    en: { fleet: "Fleet", waterFun: "Water Fun", how: "How it works", faq: "FAQ", book: "Book Now", bookShort: "Book", bookMobile: "Book your jetski", nav: "Navigation" },
    de: { fleet: "Flotte", waterFun: "Water Fun", how: "So geht's", faq: "FAQ", book: "Jetzt Buchen", bookShort: "Buchen", bookMobile: "Jetski buchen", nav: "Navigation" },
    gr: { fleet: "Στόλος", waterFun: "Water Fun", how: "Πώς λειτουργεί", faq: "Ερωτήσεις", book: "Κράτηση", bookShort: "Κράτηση", bookMobile: "Κράτησε το jet ski σου", nav: "Πλοήγηση" }
  };
  const t = labels[currentLang];
  const links = [
    { href: "#fleet", label: t.fleet },
    { href: "#water-fun", label: t.waterFun },
    { href: "#how", label: t.how },
    { href: "#faq", label: t.faq }
  ];
  const languages = [
    { code: "en", label: "English", flag: "🇬🇧", href: "/", available: true },
    { code: "de", label: "Deutsch", flag: "🇩🇪", href: "/de/", available: true }
  ];
  const currentLangObj = languages.find((l) => l.code === currentLang) ?? languages[0];
  return renderTemplate`${maybeRenderHead()}<nav class="absolute top-0 left-0 right-0 z-40 pointer-events-none pt-16" data-astro-cid-7aeusyys> <div class="pointer-events-auto mx-auto max-w-[1600px] px-6 lg:px-12 flex items-center justify-between" data-astro-cid-7aeusyys> <!-- Logo: jetski icon + Nero Lefkada --> <a${addAttribute(currentLangObj.href, "href")} class="group flex items-center gap-3" aria-label="Nero Lefkada Rental&Retail home" data-astro-cid-7aeusyys> <span class="relative inline-flex items-center justify-center w-11 h-11 rounded-full" style="background: var(--v2-sun-400); color: var(--v2-ink-950);" aria-hidden="true" data-astro-cid-7aeusyys> <!-- Jetski silhouette --> <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" data-astro-cid-7aeusyys> <path d="M4 22c2-1 4-1.5 6-1.5s4 .5 6 .5 4-.5 6-.5 4 .5 6 1.5v2c-2 1-4 1.5-6 1.5s-4-.5-6-.5-4 .5-6 .5-4-.5-6-1.5v-2zm4-6l3-4h10l3 4c.8 1 .6 2.5-.5 3-1.5.6-3-.3-4-1.5-.8-1-2.3-1-3.5-.5-1 .4-2.3.4-3 0-1.2-.5-2.7-.5-3.5.5-1 1.2-2.5 2.1-4 1.5-1.1-.5-1.3-2-.5-3zm4.5-5l1-3c.2-.6.8-1 1.5-1h4c.7 0 1.3.4 1.5 1l1 3h-9z" data-astro-cid-7aeusyys></path> </svg> </span> <div class="hidden sm:flex flex-col leading-none" data-astro-cid-7aeusyys> <span class="font-display text-xl tracking-tight" style="color: var(--v2-cream-50);" data-astro-cid-7aeusyys>Nero Lefkada</span> <span class="font-mono text-[9px] tracking-[0.18em] uppercase mt-1" style="color: rgba(253,251,244,0.6);" data-astro-cid-7aeusyys>Rental&amp;Retail</span> </div> </a> <!-- Center pills (desktop only) --> <div class="hidden md:flex items-center gap-1 rounded-full p-1.5 border backdrop-blur-md" style="background: rgba(7,29,48,0.4); border-color: rgba(253,251,244,0.18);" data-astro-cid-7aeusyys> ${links.map((l) => renderTemplate`<a${addAttribute(l.href, "href")} class="px-5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] rounded-full transition-all duration-500" style="color: rgba(253,251,244,0.85);" data-astro-cid-7aeusyys> ${l.label} </a>`)} </div> <!-- Right: Language switcher (sun) + CTA + Hamburger --> <div class="flex items-center gap-3" data-astro-cid-7aeusyys> <!-- Language switcher: the sun button --> <div id="lang-switch" data-astro-cid-7aeusyys> <button type="button" class="sun-btn" id="lang-toggle" aria-label="Select language" aria-haspopup="true" aria-expanded="false" data-cro="navbar-language" data-astro-cid-7aeusyys> <span style="position: relative; z-index: 2;" data-astro-cid-7aeusyys>${currentLangObj.code.toUpperCase()}</span> </button> <div id="lang-dropdown" role="menu" aria-label="Language selection" data-astro-cid-7aeusyys> ${languages.map((lang) => {
    const isActive = lang.code === currentLang;
    const isComingSoon = !lang.available;
    return renderTemplate`<a${addAttribute(isComingSoon ? void 0 : lang.href, "href")}${addAttribute(`lang-item ${isActive ? "active" : ""} ${isComingSoon ? "coming-soon" : ""}`, "class")} role="menuitem"${addAttribute(isComingSoon ? "true" : "false", "aria-disabled")}${addAttribute(lang.code === "gr" ? "el" : lang.code, "hreflang")}${addAttribute(`navbar-lang-${lang.code}`, "data-cro")}${addAttribute(isComingSoon ? "event.preventDefault()" : void 0, "onclick")} data-astro-cid-7aeusyys> <span class="lang-flag" aria-hidden="true" data-astro-cid-7aeusyys>${lang.flag}</span> <span data-astro-cid-7aeusyys>${lang.label}</span> ${isActive && renderTemplate`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left: auto;" aria-hidden="true" data-astro-cid-7aeusyys> <path d="M20 6L9 17l-5-5" data-astro-cid-7aeusyys></path> </svg>`} ${isComingSoon && renderTemplate`<span class="lang-soon" aria-label="Coming soon" data-astro-cid-7aeusyys>soon</span>`} </a>`;
  })} </div> </div> <!-- CTA (always visible), springt zum Booking-Bereich (Calculator + Form + Calendar).
           Mobile (<sm): verkürzter Text (t.bookShort) damit „Jetzt Buchen" auf 320px-
           Viewport neben Sun-Button + Hamburger nicht überläuft.
           Desktop (≥sm): voller Text (t.book). --> <a href="#booking-form" class="v2-btn !py-3 !px-4 sm:!px-5 !text-xs" style="background: var(--v2-sun-400); color: var(--v2-ink-950);" data-cro="navbar-cta-book" data-astro-cid-7aeusyys> <span class="sm:hidden" data-astro-cid-7aeusyys>${t.bookShort}</span> <span class="hidden sm:inline" data-astro-cid-7aeusyys>${t.book}</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" data-astro-cid-7aeusyys> <path d="M5 12h14M13 5l7 7-7 7" data-astro-cid-7aeusyys></path> </svg> </a> <!-- Hamburger button (mobile only) --> <button id="nav-toggle" class="md:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 rounded-full backdrop-blur-md border" style="background: rgba(7,29,48,0.4); border-color: rgba(253,251,244,0.18);" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav" data-astro-cid-7aeusyys> <span class="nav-bar-1 block w-5 h-[1.5px]" style="background: var(--v2-cream-50);" data-astro-cid-7aeusyys></span> <span class="nav-bar-2 block w-5 h-[1.5px]" style="background: var(--v2-cream-50);" data-astro-cid-7aeusyys></span> <span class="nav-bar-3 block w-5 h-[1.5px]" style="background: var(--v2-cream-50);" data-astro-cid-7aeusyys></span> </button> </div> </div> </nav> <!-- Mobile navigation drawer --> <div id="mobile-nav" role="dialog" aria-modal="true"${addAttribute(t.nav, "aria-label")} class="fixed inset-0 z-50 md:hidden flex flex-col" style="background: var(--v2-ink-950, #071d30); transform: translateX(100%); opacity: 0; pointer-events: none; visibility: hidden;" data-astro-cid-7aeusyys> <!-- Decorative glow --> <div class="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(0,179,167,0.08), transparent 70%);" data-astro-cid-7aeusyys></div> <div class="absolute top-1/3 left-0 w-64 h-64 rounded-full pointer-events-none" style="background: radial-gradient(circle, rgba(255,215,106,0.05), transparent 70%);" data-astro-cid-7aeusyys></div> <!-- Header row --> <div class="relative flex items-center justify-between px-6 pt-12 pb-6 border-b" style="border-color: rgba(253,251,244,0.1);" data-astro-cid-7aeusyys> <a${addAttribute(currentLangObj.href, "href")} class="flex items-center gap-3" data-astro-cid-7aeusyys> <span class="inline-flex items-center justify-center w-10 h-10 rounded-full" style="background: var(--v2-sun-400, #ffc233); color: var(--v2-ink-950, #071d30);" aria-hidden="true" data-astro-cid-7aeusyys> <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" data-astro-cid-7aeusyys> <path d="M4 22c2-1 4-1.5 6-1.5s4 .5 6 .5 4-.5 6-.5 4 .5 6 1.5v2c-2 1-4 1.5-6 1.5s-4-.5-6-.5-4 .5-6 .5-4-.5-6-1.5v-2zm4-6l3-4h10l3 4c.8 1 .6 2.5-.5 3-1.5.6-3-.3-4-1.5-.8-1-2.3-1-3.5-.5-1 .4-2.3.4-3 0-1.2-.5-2.7-.5-3.5.5-1 1.2-2.5 2.1-4 1.5-1.1-.5-1.3-2-.5-3zm4.5-5l1-3c.2-.6.8-1 1.5-1h4c.7 0 1.3.4 1.5 1l1 3h-9z" data-astro-cid-7aeusyys></path> </svg> </span> <span class="font-display text-lg tracking-tight" style="color: var(--v2-cream-50, #fdfbf4);" data-astro-cid-7aeusyys>Nero Lefkada</span> </a> <button id="nav-close" class="flex items-center justify-center w-11 h-11 rounded-full border backdrop-blur-md" style="background: rgba(253,251,244,0.05); border-color: rgba(253,251,244,0.18); color: var(--v2-cream-50, #fdfbf4);" aria-label="Close navigation" data-astro-cid-7aeusyys> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" data-astro-cid-7aeusyys> <path d="M18 6L6 18M6 6l12 12" data-astro-cid-7aeusyys></path> </svg> </button> </div> <!-- Nav links (centered) --> <nav class="relative flex-1 flex flex-col justify-center px-8 gap-2"${addAttribute(t.nav, "aria-label")} data-astro-cid-7aeusyys> ${links.map((l, i) => renderTemplate`<a${addAttribute(l.href, "href")} class="mob-link font-display text-5xl py-3"${addAttribute(`color: rgba(253,251,244,0.85); animation-delay: ${i * 0.05}s;`, "style")} data-astro-cid-7aeusyys> ${l.label} </a>`)} <!-- Mobile language switcher inline --> <div class="mt-8 pt-8 border-t flex gap-2" style="border-color: rgba(253,251,244,0.1);" data-astro-cid-7aeusyys> ${languages.map((lang) => {
    const isActive = lang.code === currentLang;
    const isComingSoon = !lang.available;
    return renderTemplate`<a${addAttribute(isComingSoon ? void 0 : lang.href, "href")}${addAttribute(isComingSoon ? "true" : "false", "aria-disabled")}${addAttribute(isComingSoon ? "event.preventDefault()" : void 0, "onclick")}${addAttribute(`flex-1 flex flex-col items-center justify-center gap-0.5 py-3 px-3 rounded-full font-mono text-[11px] uppercase tracking-[0.12em] border transition-all ${isActive ? "" : isComingSoon ? "" : "hover:bg-white/5"}`, "class")}${addAttribute(isActive ? "background: var(--v2-sun-400); color: var(--v2-ink-950); border-color: var(--v2-sun-400);" : isComingSoon ? "color: rgba(253,251,244,0.35); border-color: rgba(253,251,244,0.12); cursor: not-allowed;" : "color: rgba(253,251,244,0.7); border-color: rgba(253,251,244,0.2);", "style")} data-astro-cid-7aeusyys> <span class="flex items-center gap-2" data-astro-cid-7aeusyys> <span aria-hidden="true" data-astro-cid-7aeusyys>${lang.flag}</span> <span data-astro-cid-7aeusyys>${lang.code.toUpperCase()}</span> </span> ${isComingSoon && renderTemplate`<span class="text-[8px] tracking-[0.2em] opacity-70" data-astro-cid-7aeusyys>soon</span>`} </a>`;
  })} </div> </nav> <!-- Footer CTA, springt zum Booking-Bereich (Calculator + Form + Calendar) --> <div class="relative px-6 pb-12 pt-6 border-t" style="border-color: rgba(253,251,244,0.1);" data-astro-cid-7aeusyys> <a href="#booking-form" class="v2-btn w-full justify-center !py-4 !text-sm" style="background: var(--v2-sun-400, #ffc233); color: var(--v2-ink-950, #071d30);" data-cro="mobile-nav-cta-book" data-astro-cid-7aeusyys> ${t.bookMobile} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" data-astro-cid-7aeusyys> <path d="M5 12h14M13 5l7 7-7 7" data-astro-cid-7aeusyys></path> </svg> </a> <p class="font-mono text-[9px] tracking-[0.2em] uppercase text-center mt-4" style="color: rgba(253,251,244,0.35);" data-astro-cid-7aeusyys>
Lygia · Lefkada · Daily 09-21
</p> </div> </div> ${renderScript($$result, "C:/Users/User/jetski-LIVE/src/components/v2/Navbar2.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/Navbar2.astro", void 0);

const $$Hero2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Hero2;
  const lang = Astro2.props.lang ?? "en";
  const COPY = {
    en: {
      eyebrow: "Lefkada · Greece · Summer 2026",
      titlePre: "Ride the",
      titleItalic: "Ionian",
      titlePost: "like a local.",
      intro1: "Four supercharged Sea-Doo jetskis.",
      introMapLink: "A curated map",
      intro2: "of the island’s best secret coves. And David, your guide at Lygia Port, waiting with a ten-minute briefing and a throttle cable that begs to be pulled.",
      ctaPrimary: "Check availability",
      ctaSecondary: "Chat with David",
      stats: [
        { n: "500+", l: "Happy riders" },
        { n: "€80", l: "10 min ride" },
        { n: "1-click", l: "WhatsApp booking" }
      ]
    },
    de: {
      eyebrow: "Lefkada · Griechenland · Sommer 2026",
      titlePre: "Fahr durch das",
      titleItalic: "Ionische",
      titlePost: "wie ein Einheimischer.",
      intro1: "Vier supercharged Sea-Doo Jetskis.",
      introMapLink: "Eine kuratierte Karte",
      intro2: " der schönsten versteckten Buchten der Insel. Und David, Dein Guide am Lygia Port, mit 10-Minuten-Briefing und einem Gashebel, der darauf wartet, gezogen zu werden.",
      ctaPrimary: "Verfügbarkeit prüfen",
      ctaSecondary: "Mit David chatten",
      stats: [
        { n: "500+", l: "Glückliche Fahrer" },
        { n: "€80", l: "10-Min-Fahrt" },
        { n: "1-Klick", l: "WhatsApp-Buchung" }
      ]
    },
    gr: {
      // TODO: Kristina übersetzt finale EL-Fassung. Fallback EN bis dahin.
      eyebrow: "Lefkada · Greece · Summer 2026",
      titlePre: "Ride the",
      titleItalic: "Ionian",
      titlePost: "like a local.",
      intro1: "Four supercharged Sea-Doo jetskis.",
      introMapLink: "A curated map",
      intro2: "of the island’s best secret coves. And David, your guide at Lygia Port, waiting with a ten-minute briefing and a throttle cable that begs to be pulled.",
      ctaPrimary: "Check availability",
      ctaSecondary: "Chat with David",
      stats: [
        { n: "500+", l: "Happy riders" },
        { n: "€80", l: "10 min ride" },
        { n: "1-click", l: "WhatsApp booking" }
      ]
    }
  }[lang];
  return renderTemplate`${maybeRenderHead()}<section class="relative min-h-[100svh] overflow-hidden flex items-end" data-astro-cid-m3ufshkx> <!-- Video background: full frame, endless native loop --> <div class="absolute inset-0 z-0" style="background: var(--v2-ink-950);" data-astro-cid-m3ufshkx> <video id="hero-video" autoplay muted loop playsinline preload="metadata" poster="/images/hero-poster.webp" class="w-full h-full object-cover hero-video-full" aria-label="Cinematic footage of Nero Lefkada jetski adventures on the Ionian Sea" data-astro-cid-m3ufshkx> <!-- Mobile gets the 587KB / 400px-wide variant; desktop gets the full 2.6MB. --> <!-- Browser picks the first <source> whose media query matches. --> <source src="/videos/hero-nero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" data-astro-cid-m3ufshkx> <source src="/videos/hero-nero.mp4" type="video/mp4" data-astro-cid-m3ufshkx> <source src="/videos/hero-nero.mp4" type="video/quicktime" data-astro-cid-m3ufshkx> </video> </div> <!-- Multi-layer gradient overlay for text legibility (stays) --> <div class="absolute inset-0 z-10 pointer-events-none" data-astro-cid-m3ufshkx> <div class="absolute inset-0" style="background: linear-gradient(180deg, rgba(7,29,48,0.7) 0%, rgba(7,29,48,0.2) 30%, rgba(7,29,48,0.15) 60%, rgba(7,29,48,0.85) 100%);" data-astro-cid-m3ufshkx></div> <div class="absolute inset-0" style="background: radial-gradient(ellipse at 30% 40%, transparent 45%, rgba(7,29,48,0.55) 100%);" data-astro-cid-m3ufshkx></div> <!-- Warm mediterranean color bleed --> <div class="absolute inset-0 mix-blend-overlay opacity-50" style="background: radial-gradient(ellipse at 80% 20%, #ffc233, transparent 55%);" data-astro-cid-m3ufshkx></div> </div> <!-- Decorative sun (rotating slow) --> <div class="absolute top-24 right-[8%] z-10 w-32 h-32 lg:w-40 lg:h-40 opacity-60 pointer-events-none v2-sun hidden md:block" data-astro-cid-m3ufshkx> <svg viewBox="0 0 160 160" class="w-full h-full" aria-hidden="true" data-astro-cid-m3ufshkx> <defs data-astro-cid-m3ufshkx> <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%" data-astro-cid-m3ufshkx> <stop offset="0%" stop-color="#ffd76a" data-astro-cid-m3ufshkx></stop> <stop offset="100%" stop-color="#ffaa00" data-astro-cid-m3ufshkx></stop> </radialGradient> </defs> <circle cx="80" cy="80" r="22" fill="url(#sunGrad)" data-astro-cid-m3ufshkx></circle> <g stroke="#ffd76a" stroke-width="2" stroke-linecap="round" data-astro-cid-m3ufshkx> <line x1="80" y1="10" x2="80" y2="30" data-astro-cid-m3ufshkx></line> <line x1="80" y1="130" x2="80" y2="150" data-astro-cid-m3ufshkx></line> <line x1="10" y1="80" x2="30" y2="80" data-astro-cid-m3ufshkx></line> <line x1="130" y1="80" x2="150" y2="80" data-astro-cid-m3ufshkx></line> <line x1="30" y1="30" x2="44" y2="44" data-astro-cid-m3ufshkx></line> <line x1="116" y1="116" x2="130" y2="130" data-astro-cid-m3ufshkx></line> <line x1="30" y1="130" x2="44" y2="116" data-astro-cid-m3ufshkx></line> <line x1="116" y1="44" x2="130" y2="30" data-astro-cid-m3ufshkx></line> </g> </svg> </div> <!-- Content --> <div class="relative z-20 w-full pt-32 pb-16 lg:pb-20" data-astro-cid-m3ufshkx> <div class="mx-auto max-w-[1600px] px-6 lg:px-12" data-astro-cid-m3ufshkx> <div class="v2-reveal max-w-5xl" data-astro-cid-m3ufshkx> <div class="v2-eyebrow mb-8" style="color: var(--v2-sun-300);" data-astro-cid-m3ufshkx> <span data-astro-cid-m3ufshkx>${COPY.eyebrow}</span> </div> <h1 class="v2-display text-5xl md:text-6xl lg:text-[clamp(4.5rem,9vw,10rem)]" style="color: var(--v2-cream-50);" data-astro-cid-m3ufshkx> ${COPY.titlePre}<br data-astro-cid-m3ufshkx> <span class="v2-gradient-sun" data-astro-cid-m3ufshkx><em data-astro-cid-m3ufshkx>${COPY.titleItalic}</em></span><br data-astro-cid-m3ufshkx> <span class="text-[0.75em]" data-astro-cid-m3ufshkx>${COPY.titlePost}</span> </h1> <p class="mt-10 max-w-xl text-lg lg:text-xl leading-relaxed" style="color: rgba(253,251,244,0.85);" data-astro-cid-m3ufshkx> ${COPY.intro1}${" "}<a href="#spots" style="color: var(--v2-sun-300); border-bottom: 1px dotted currentColor;" data-astro-cid-m3ufshkx>${COPY.introMapLink}</a>${" "}${COPY.intro2} </p> <div class="mt-12 flex flex-wrap items-center gap-4" data-astro-cid-m3ufshkx> <a href="#booking-form" class="v2-btn" data-cro="v2-hero-primary" data-astro-cid-m3ufshkx> ${COPY.ctaPrimary} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" data-astro-cid-m3ufshkx> <path d="M5 12h14M13 5l7 7-7 7" data-astro-cid-m3ufshkx></path> </svg> </a> <a href="https://wa.me/306955612777" target="_blank" rel="noopener" class="v2-btn-ghost" style="color: var(--v2-cream-50); border-color: var(--v2-cream-50);" data-cro="v2-hero-whatsapp" data-astro-cid-m3ufshkx> <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-astro-cid-m3ufshkx> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" data-astro-cid-m3ufshkx></path> </svg> ${COPY.ctaSecondary} </a> </div> <!-- Stats Bar — auf Mobile 3 Spalten nebeneinander (Scrollzeit sparen) --> <div class="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-white/15 grid grid-cols-3 gap-3 md:gap-8 max-w-4xl" data-astro-cid-m3ufshkx> ${COPY.stats.map((stat) => renderTemplate`<div data-astro-cid-m3ufshkx> <div class="v2-display text-2xl md:text-4xl lg:text-5xl" style="color: var(--v2-sun-300);" data-astro-cid-m3ufshkx> ${stat.n} </div> <div class="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.14em] md:tracking-[0.18em] mt-1 md:mt-2" style="color: rgba(253,251,244,0.65);" data-astro-cid-m3ufshkx> ${stat.l} </div> </div>`)} </div> </div> </div> </div> <!-- Animated waves bottom --> <div class="absolute bottom-0 left-0 right-0 z-10 pointer-events-none h-24 overflow-hidden" data-astro-cid-m3ufshkx> <svg class="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true" data-astro-cid-m3ufshkx> <path fill="#071d30" d="M0,60 C240,100 480,20 720,50 C960,80 1200,20 1440,40 L1440,100 L0,100 Z" data-astro-cid-m3ufshkx> <animate attributeName="d" dur="8s" repeatCount="indefinite" values="
            M0,60 C240,100 480,20 720,50 C960,80 1200,20 1440,40 L1440,100 L0,100 Z;
            M0,50 C240,20 480,90 720,60 C960,30 1200,80 1440,50 L1440,100 L0,100 Z;
            M0,60 C240,100 480,20 720,50 C960,80 1200,20 1440,40 L1440,100 L0,100 Z
          " data-astro-cid-m3ufshkx></animate> </path> </svg> </div> </section>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/Hero2.astro", void 0);

const $$TrustMarquee2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TrustMarquee2;
  const lang = Astro2.props.lang ?? "en";
  const COPY = {
    en: [
      "Fully Insured",
      "Licensed",
      "Fastest Jetskis on the Island",
      "Locally Operated",
      "English · German · Italian · Greek",
      "Port Authority Lefkada",
      "Sea-Doo Only",
      "Viva Wallet Payments",
      "Free Cancel 48h"
    ],
    de: [
      "Voll Versichert",
      "Lizenziert",
      "Schnellste Jetskis der Insel",
      "Lokal Betrieben",
      "Englisch · Deutsch · Italienisch · Griechisch",
      "Hafenbehörde Lefkada",
      "Nur Sea-Doo",
      "Viva Wallet Zahlungen",
      "Kostenlose Stornierung 48h"
    ],
    gr: [
      "Fully Insured",
      "Licensed",
      "Fastest Jetskis on the Island",
      "Locally Operated",
      "English · German · Italian · Greek",
      "Port Authority Lefkada",
      "Sea-Doo Only",
      "Viva Wallet Payments",
      "Free Cancel 48h"
    ]
  }[lang];
  const doubled = [...COPY, ...COPY];
  return renderTemplate`${maybeRenderHead()}<section class="py-8 overflow-hidden border-y" style="background: var(--v2-ink-950); color: var(--v2-cream-50); border-color: var(--v2-ink-900);"> <div class="v2-marquee"> ${doubled.map((item) => renderTemplate`<div class="flex items-center gap-6 shrink-0"> <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" style="color: var(--v2-sun-400);"> <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z"></path> </svg> <span class="font-display text-3xl lg:text-5xl whitespace-nowrap" style="font-variation-settings: 'opsz' 144, 'SOFT' 40;"> ${item} </span> </div>`)} </div> </section>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/TrustMarquee2.astro", void 0);

const $$Experiences2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Experiences2;
  const lang = Astro2.props.lang ?? "en";
  const COPY = {
    en: {
      eyebrow: "What we do on the water · Three ways",
      titleLead: "Pick your",
      titleAccent: "style.",
      titleTail: "Leave the rest to us.",
      intro: "From first-timers without any licence to solo riders chasing 120 km/h, and a three-seat tube for the ones who just want to laugh. Everyone finds their line.",
      footnote: "Mix and match: guided plus tube is our most-booked combo for groups of three.",
      seeMore: "See more",
      experiences: [
        { eyebrow: "Experience 01 · Most popular", title: "Guided tours", titleAccent: "with David", body: "No boating licence? No problem. Thousands of guests ride with us every season. David rides alongside or keeps you in sight, chooses the line, and makes sure everyone feels safe on the throttle.", tag: "No licence needed", anchor: "#fleet", icon: "guided", image: "/images/customers/nero-guest-12.jpg" },
        { eyebrow: "Experience 02 · Full freedom", title: "Solo rides", titleAccent: "your own line", body: "Got a valid EU personal-watercraft licence? Pick a Nero, get the 10-minute safety briefing, and disappear into the Ionian on your terms. Up to 310 HP, 120 km/h top speed.", tag: "EU PWC licence required", anchor: "#fleet", icon: "solo", image: "/images/experiences/solo-couple.jpg" },
        { eyebrow: "Experience 03 · Pure laughter", title: "Water Fun", titleAccent: "3-seat tube", body: "A three-seat Great Big Mable towable pulled behind a Nero. No driving, no licence, just good vibes. Perfect for groups, families and anyone who wants the thrill without the handlebars.", tag: "€30 / person", anchor: "#water-fun", icon: "tube", image: "/images/gallery/waterfun-action.jpg" }
      ]
    },
    de: {
      eyebrow: "Was wir auf dem Wasser machen · Drei Wege",
      titleLead: "Wähle Deinen",
      titleAccent: "Style.",
      titleTail: "Den Rest machen wir.",
      intro: "Von Erstfahrern ohne Führerschein bis zu Solo-Piloten mit 120 km/h Ambitionen, und einem 3-Sitz-Tube für alle, die einfach nur lachen wollen. Jeder findet seine Linie.",
      footnote: "Beides kombinieren: Guided plus Tube ist unsere meistgebuchte Kombi für Dreier-Gruppen.",
      seeMore: "Mehr ansehen",
      experiences: [
        { eyebrow: "Experience 01 · Am beliebtesten", title: "Geführte Touren", titleAccent: "mit David", body: "Kein Bootsführerschein? Kein Problem. Tausende Gäste fahren jede Saison mit uns. David fährt an Deiner Seite oder hat Dich im Blick, wählt die Linie und sorgt dafür, dass alle sich am Gashebel sicher fühlen.", tag: "Kein Führerschein nötig", anchor: "#fleet", icon: "guided", image: "/images/customers/nero-guest-12.jpg" },
        { eyebrow: "Experience 02 · Volle Freiheit", title: "Solo-Fahrten", titleAccent: "Deine eigene Linie", body: "Hast Du einen gültigen EU-PWC-Führerschein? Wähle einen Nero, bekomme das 10-Minuten-Safety-Briefing und verschwinde ins Ionische nach Deinen Regeln. Bis zu 310 PS, 120 km/h Top-Speed.", tag: "EU-PWC-Führerschein erforderlich", anchor: "#fleet", icon: "solo", image: "/images/experiences/solo-couple.jpg" },
        { eyebrow: "Experience 03 · Pures Lachen", title: "Water Fun", titleAccent: "3-Sitz-Tube", body: "Ein Dreier-Tube (Great Big Mable) hinter einem Nero. Kein Fahren, kein Führerschein, einfach gute Laune. Perfekt für Gruppen, Familien und alle, die den Kick ohne Lenker wollen.", tag: "€30 / Person", anchor: "#water-fun", icon: "tube", image: "/images/gallery/waterfun-action.jpg" }
      ]
    },
    gr: {
      eyebrow: "What we do on the water · Three ways",
      titleLead: "Pick your",
      titleAccent: "style.",
      titleTail: "Leave the rest to us.",
      intro: "From first-timers without any licence to solo riders chasing 120 km/h, and a three-seat tube for the ones who just want to laugh. Everyone finds their line.",
      footnote: "Mix and match: guided plus tube is our most-booked combo for groups of three.",
      seeMore: "See more",
      experiences: [
        { eyebrow: "Experience 01 · Most popular", title: "Guided tours", titleAccent: "with David", body: "No boating licence? No problem. Thousands of guests ride with us every season. David rides alongside or keeps you in sight, chooses the line, and makes sure everyone feels safe on the throttle.", tag: "No licence needed", anchor: "#fleet", icon: "guided", image: "/images/customers/nero-guest-12.jpg" },
        { eyebrow: "Experience 02 · Full freedom", title: "Solo rides", titleAccent: "your own line", body: "Got a valid EU personal-watercraft licence? Pick a Nero, get the 10-minute safety briefing, and disappear into the Ionian on your terms. Up to 310 HP, 120 km/h top speed.", tag: "EU PWC licence required", anchor: "#fleet", icon: "solo", image: "/images/experiences/solo-couple.jpg" },
        { eyebrow: "Experience 03 · Pure laughter", title: "Water Fun", titleAccent: "3-seat tube", body: "A three-seat Great Big Mable towable pulled behind a Nero. No driving, no licence, just good vibes. Perfect for groups, families and anyone who wants the thrill without the handlebars.", tag: "€30 / person", anchor: "#water-fun", icon: "tube", image: "/images/gallery/waterfun-action.jpg" }
      ]
    }
  }[lang];
  const experiences = COPY.experiences;
  return renderTemplate`${maybeRenderHead()}<section id="experiences" class="relative py-20 lg:py-28" style="background: var(--v2-cream-100);"> <div class="mx-auto max-w-[1600px] px-6 lg:px-12"> <!-- Header --> <div class="grid grid-cols-12 gap-6 mb-10 lg:mb-14"> <div class="col-span-12 lg:col-span-8"> <div class="v2-eyebrow mb-6"><span>${COPY.eyebrow}</span></div> <h2 class="v2-display text-5xl lg:text-[clamp(3.5rem,5.5vw,6rem)]"> ${COPY.titleLead} <em>${COPY.titleAccent}</em><br>${COPY.titleTail} </h2> </div> <div class="col-span-12 lg:col-span-4 flex items-end"> <p class="text-lg leading-relaxed max-w-md" style="color: rgba(7,29,48,0.7);"> ${COPY.intro} </p> </div> </div> <!-- Three service cards --> <div class="flex md:grid md:grid-cols-3 gap-4 lg:gap-6 items-stretch overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-6 px-6 md:mx-0 md:px-0 pb-4 md:pb-0 scroll-smooth"> ${experiences.map((e) => renderTemplate`<a${addAttribute(e.anchor, "href")} class="group relative flex flex-col rounded-2xl overflow-hidden transition-transform duration-500 hover:-translate-y-1 shrink-0 w-[85vw] max-w-[22rem] md:w-auto md:max-w-none md:shrink snap-center" style="background: var(--v2-cream-50); border: 1px solid rgba(7,29,48,0.08);"${addAttribute(`experience-${e.icon}`, "data-cro")}>  <div class="relative aspect-[16/10] flex items-center justify-center overflow-hidden" style="background: linear-gradient(135deg, rgba(0,179,167,0.08), rgba(255,194,51,0.10));"> ${e.image && renderTemplate`<picture>  ${e.icon !== "guided" && renderTemplate`<source${addAttribute(e.image.replace(/\.(jpe?g|png)$/i, ".webp"), "srcset")} type="image/webp">`} <img${addAttribute(e.image, "src")}${addAttribute(`${e.title} ${e.titleAccent}`, "alt")} width="1400" height="875" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"> </picture>`} ${!e.image && renderTemplate`<svg class="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 250" preserveAspectRatio="none" aria-hidden="true"> <path d="M0,170 C80,140 160,190 240,160 C320,130 400,170 400,170 L400,250 L0,250 Z" fill="rgba(0,179,167,0.25)"></path> <path d="M0,195 C80,175 160,210 240,185 C320,165 400,195 400,195 L400,250 L0,250 Z" fill="rgba(0,179,167,0.4)"></path> </svg>`}  ${!e.image && e.icon === "guided" && renderTemplate`<svg width="120" height="120" viewBox="0 0 120 120" fill="none" class="relative z-10 transition-transform duration-[1.2s] ease-out group-hover:scale-110" aria-hidden="true">  <path d="M20 75 Q 35 60 60 60 L 95 60 L 100 72 L 100 78 L 25 78 Z" fill="var(--v2-ink-950)"></path> <path d="M25 78 L 100 78 L 100 82 L 18 82 Z" fill="var(--v2-turquoise-600)"></path>  <circle cx="78" cy="48" r="7" fill="var(--v2-ink-950)"></circle> <path d="M68 60 Q 68 52 78 52 Q 88 52 88 60 L 88 65 L 68 65 Z" fill="var(--v2-ink-950)"></path>  <circle cx="55" cy="50" r="7" fill="var(--v2-sun-500)"></circle> <path d="M45 62 Q 45 54 55 54 Q 65 54 65 62 L 65 65 L 45 65 Z" fill="var(--v2-sun-500)"></path>  <path d="M10 78 Q 14 72 18 78 M8 82 Q 12 76 16 82" stroke="var(--v2-turquoise-600)" stroke-width="2" stroke-linecap="round" fill="none"></path> </svg>`} ${!e.image && e.icon === "solo" && renderTemplate`<svg width="120" height="120" viewBox="0 0 120 120" fill="none" class="relative z-10 transition-transform duration-[1.2s] ease-out group-hover:scale-110" aria-hidden="true">  <path d="M25 72 Q 40 58 65 58 L 95 58 L 100 70 L 100 76 L 30 76 Z" fill="var(--v2-ink-950)"></path> <path d="M30 76 L 100 76 L 100 80 L 23 80 Z" fill="var(--v2-sun-500)"></path>  <circle cx="72" cy="44" r="7" fill="var(--v2-ink-950)"></circle> <path d="M62 58 Q 64 48 72 48 Q 82 48 84 58 L 82 63 L 64 63 Z" fill="var(--v2-ink-950)"></path>  <path d="M8 64 L 22 64 M5 70 L 25 70 M10 76 L 23 76" stroke="var(--v2-ink-950)" stroke-width="2.5" stroke-linecap="round" opacity="0.7"></path>  <path d="M96 82 Q 102 76 108 82 M100 86 Q 105 80 110 86" stroke="var(--v2-turquoise-600)" stroke-width="2" stroke-linecap="round" fill="none"></path> </svg>`} ${!e.image && e.icon === "tube" && renderTemplate`<svg width="140" height="120" viewBox="0 0 140 120" fill="none" class="relative z-10 transition-transform duration-[1.2s] ease-out group-hover:scale-110" aria-hidden="true">  <path d="M80 72 Q 90 60 105 60 L 125 60 L 130 70 L 130 76 L 85 76 Z" fill="var(--v2-ink-950)"></path> <path d="M85 76 L 130 76 L 130 80 L 83 80 Z" fill="var(--v2-turquoise-600)"></path> <circle cx="113" cy="51" r="5" fill="var(--v2-ink-950)"></circle>  <path d="M78 74 Q 60 78 42 78" stroke="var(--v2-ink-950)" stroke-width="1.5" stroke-dasharray="2 2" fill="none"></path>  <ellipse cx="28" cy="82" rx="22" ry="9" fill="var(--v2-sun-400)"></ellipse> <ellipse cx="28" cy="82" rx="22" ry="9" fill="none" stroke="var(--v2-ink-950)" stroke-width="1.5"></ellipse> <circle cx="16" cy="76" r="3" fill="var(--v2-ink-950)"></circle> <circle cx="28" cy="75" r="3" fill="var(--v2-ink-950)"></circle> <circle cx="40" cy="76" r="3" fill="var(--v2-ink-950)"></circle>  <path d="M4 88 Q 8 82 12 88 M2 92 Q 6 86 10 92" stroke="var(--v2-turquoise-600)" stroke-width="2" stroke-linecap="round" fill="none"></path> </svg>`} </div>  <div class="flex flex-col flex-1 p-7 lg:p-8"> <div class="font-mono text-[10px] uppercase tracking-[0.18em] mb-3" style="color: var(--v2-turquoise-600);"> ${e.eyebrow} </div> <h3 class="font-display text-3xl lg:text-4xl leading-tight mb-3" style="color: var(--v2-ink-950);"> ${e.title} <em style="color: var(--v2-sun-500);">${e.titleAccent}</em> </h3> <p class="text-base leading-relaxed mb-6 flex-1" style="color: rgba(7,29,48,0.72);"> ${e.body} </p> <div class="flex items-center justify-between pt-4" style="border-top: 1px solid rgba(7,29,48,0.1);"> <span class="font-mono text-[10px] uppercase tracking-[0.14em] font-semibold" style="color: var(--v2-ink-950);"> ${e.tag} </span> <span class="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] group-hover:gap-2.5 transition-all duration-300" style="color: var(--v2-ink-900);"> <span>${COPY.seeMore}</span> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"> <path d="M5 12h14M13 5l7 7-7 7"></path> </svg> </span> </div> </div> </a>`)} </div> <!-- Footnote --> <p class="mt-6 text-xs italic text-center max-w-2xl mx-auto" style="color: rgba(7,29,48,0.5);"> ${COPY.footnote} </p> </div> </section>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/Experiences2.astro", void 0);

const $$PhotoComingSoon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="photo-coming-soon relative w-full h-full overflow-hidden" role="img" aria-label="Photo coming soon, studio shots of this jetski are being prepared" style="background: #071d30;"> <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" class="absolute inset-0 w-full h-full" aria-hidden="true"> <!-- Two overlapping polaroid frames --> <g transform="translate(100 80)"> <!-- Frame 1 (back, slightly tilted) --> <g transform="rotate(-8 90 100)"> <rect x="0" y="0" width="180" height="180" rx="4" fill="none" stroke="#fdfbf4" stroke-width="6"></rect> <!-- Inner picture area --> <rect x="14" y="14" width="152" height="130" fill="none" stroke="#fdfbf4" stroke-width="3"></rect> <!-- Sun --> <circle cx="55" cy="55" r="14" fill="#fdfbf4"></circle> <!-- Wave --> <path d="M14 110 Q 45 95 90 105 T 166 100 L 166 144 L 14 144 Z" fill="#fdfbf4"></path> </g> <!-- Frame 2 (front, opposite tilt) --> <g transform="rotate(8 110 120) translate(30 30)"> <rect x="0" y="0" width="180" height="180" rx="4" fill="none" stroke="#fdfbf4" stroke-width="6"></rect> <rect x="14" y="14" width="152" height="130" fill="none" stroke="#fdfbf4" stroke-width="3"></rect> <circle cx="55" cy="55" r="14" fill="#fdfbf4"></circle> <path d="M14 110 Q 45 95 90 105 T 166 100 L 166 144 L 14 144 Z" fill="#fdfbf4"></path> </g> </g> <!-- Text --> <text x="200" y="330" text-anchor="middle" font-family="Fraunces Variable, Georgia, serif" font-size="36" font-weight="500" letter-spacing="2" fill="#fdfbf4">PHOTO</text> <text x="200" y="370" text-anchor="middle" font-family="Fraunces Variable, Georgia, serif" font-size="28" font-weight="400" letter-spacing="3" fill="#fdfbf4">COMING SOON</text> </svg> </div>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/PhotoComingSoon.astro", void 0);

const $$Fleet2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Fleet2;
  const lang = Astro2.props.lang ?? "en";
  const seatsNote = pricingExtras.seatsNote[lang] ?? pricingExtras.seatsNote.en;
  const COPY = {
    en: {
      eyebrow: "The Fleet · 4× Sea-Doo Supercharged",
      titleLead: "Pick your",
      titleAccent: "weapon.",
      titleTail: "Then ride it.",
      intro: "Every Sea-Doo is cleaned, fueled and ready within 15 minutes of your booking window. Live availability updates in real time.",
      badgeFlag: "★ Flagship",
      badgeRepainted: "✦ Repainted 2026",
      badgeFlagship: "2026 · Supercharged · Flagship",
      badgeStd: "2026 · Supercharged",
      bookedOut: "Booked out",
      leftToday: (n) => `${n} left today`,
      specHP: "HP",
      specKmh: "km/h",
      specSeats: "Seats",
      minLabel: "· 10 min",
      seeAllPrices: "See all prices",
      ctaBook: "WhatsApp to book",
      ctaWaitlist: "Join waitlist",
      whatsapp: (name, brand, model) => `Hi David, I'd like to book the ${name} (${brand} ${model}). Could I get today's price and availability?`
    },
    de: {
      eyebrow: "Die Flotte · 4× Sea-Doo Supercharged",
      titleLead: "Wähle Deine",
      titleAccent: "Waffe.",
      titleTail: "Dann fahr sie.",
      intro: "Jeder Sea-Doo wird innerhalb von 15 Minuten vor Deinem Buchungsfenster gereinigt, betankt und startklar gemacht. Verfügbarkeit in Echtzeit.",
      badgeFlag: "★ Flaggschiff",
      badgeRepainted: "✦ Neu lackiert 2026",
      badgeFlagship: "2026 · Supercharged · Flaggschiff",
      badgeStd: "2026 · Supercharged",
      bookedOut: "Ausgebucht",
      leftToday: (n) => `Noch ${n} heute`,
      specHP: "PS",
      specKmh: "km/h",
      specSeats: "Sitze",
      minLabel: "· 10 Min.",
      seeAllPrices: "Alle Preise sehen",
      ctaBook: "WhatsApp zum Buchen",
      ctaWaitlist: "Warteliste",
      whatsapp: (name, brand, model) => `Hallo David, ich möchte den ${name} (${brand} ${model}) buchen. Sag mir bitte Preis und Verfügbarkeit für heute.`
    },
    gr: {
      eyebrow: "The Fleet · 4× Sea-Doo Supercharged",
      titleLead: "Pick your",
      titleAccent: "weapon.",
      titleTail: "Then ride it.",
      intro: "Every Sea-Doo is cleaned, fueled and ready within 15 minutes of your booking window. Live availability updates in real time.",
      badgeFlag: "★ Flagship",
      badgeRepainted: "✦ Repainted 2026",
      badgeFlagship: "2026 · Supercharged · Flagship",
      badgeStd: "2026 · Supercharged",
      bookedOut: "Booked out",
      leftToday: (n) => `${n} left today`,
      specHP: "HP",
      specKmh: "km/h",
      specSeats: "Seats",
      minLabel: "· 10 min",
      seeAllPrices: "See all prices",
      ctaBook: "WhatsApp to book",
      ctaWaitlist: "Join waitlist",
      whatsapp: (name, brand, model) => `Hi David, I'd like to book the ${name} (${brand} ${model}). Could I get today's price and availability?`
    }
  }[lang];
  return renderTemplate`${maybeRenderHead()}<section id="fleet" class="relative py-24 lg:py-40" style="background: var(--v2-cream-50);"> <div class="mx-auto max-w-[1600px] px-6 lg:px-12"> <!-- Header --> <div class="grid grid-cols-12 gap-6 mb-16 lg:mb-24"> <div class="col-span-12 lg:col-span-8"> <div class="v2-eyebrow mb-6"><span>${COPY.eyebrow}</span></div> <h2 class="v2-display text-5xl lg:text-[clamp(3.5rem,6vw,6.5rem)]"> ${COPY.titleLead} <em>${COPY.titleAccent}</em><br>${COPY.titleTail} </h2> </div> <div class="col-span-12 lg:col-span-4 flex items-end"> <p class="text-lg leading-relaxed max-w-md" style="color: rgba(7,29,48,0.75);"> ${COPY.intro} </p> </div> </div> <!-- 2×2 grid - alle 4 Karten gleich groß. Davor 7/5/5/7 (asymmetrisches
         Bento), aber die schmalen 5er-Karten quetschten die Specs ("260110 3*")
         und brachen lange Namen wie "Tessera". Gleichgroß = konsistent lesbar
         für alle 4 Jetskis. Mobile bleibt 12 (stacked). --> <div class="grid grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-8"> ${jetskis.map((js, i) => {
    const spans = [
      "col-span-1 lg:col-span-6",
      "col-span-1 lg:col-span-6",
      "col-span-1 lg:col-span-6",
      "col-span-1 lg:col-span-6"
    ];
    const badge = js.featured ? COPY.badgeFlagship : COPY.badgeStd;
    const isRepainted = js.id === "nero-ena" || js.id === "nero-tria";
    const whatsappText = encodeURIComponent(COPY.whatsapp(js.name, js.brand, js.model));
    return renderTemplate`<article${addAttribute(["group v2-spotlight", spans[i]], "class:list")} data-spotlight> <div class="grid grid-cols-5 h-full">  <div class="col-span-5 md:col-span-2 relative overflow-hidden aspect-[2/1] md:aspect-auto md:min-h-[360px]"> ${js.image ? renderTemplate`<picture>  ${js.id !== "nero-dio" && renderTemplate`<source${addAttribute(js.image.replace(/\.(jpe?g|png)$/i, ".webp"), "srcset")} type="image/webp">`} <img${addAttribute(js.image, "src")}${addAttribute(`${js.name}, ${js.brand} ${js.model}`, "alt")} width="1400" height="700"${addAttribute(i < 2 ? "eager" : "lazy", "loading")} decoding="async" class="w-full h-full object-cover md:object-contain transition-transform duration-[1.2s] ease-out group-hover:scale-105"> </picture>` : renderTemplate`${renderComponent($$result, "PhotoComingSoon", $$PhotoComingSoon, {})}`} ${js.image && renderTemplate`<div class="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30"${addAttribute(`background: linear-gradient(135deg, transparent, ${js.accent})`, "style")}></div>`} ${(js.featured || isRepainted) && renderTemplate`<div class="hidden md:flex flex-col absolute top-5 left-5 items-start gap-2"> ${js.featured && renderTemplate`<div class="px-3 py-1.5 rounded-full" style="background: var(--v2-sun-400); color: var(--v2-ink-950);"> <span class="font-mono text-[10px] uppercase tracking-[0.14em] font-semibold">${COPY.badgeFlag}</span> </div>`} ${isRepainted && renderTemplate`<div class="px-3 py-1.5 rounded-full backdrop-blur-md" style="background: rgba(7,29,48,0.75); color: var(--v2-cream-50); border: 1px solid rgba(253,251,244,0.2);"> <span class="font-mono text-[10px] uppercase tracking-[0.14em] font-semibold">${COPY.badgeRepainted}</span> </div>`} </div>`}  <div class="hidden md:flex absolute bottom-5 left-5 items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md" style="background: rgba(253,251,244,0.9);"> <span class="relative flex h-2 w-2"> ${js.availableToday > 0 && renderTemplate`<span${addAttribute(["absolute inline-flex h-full w-full rounded-full opacity-75", js.availableToday === 1 ? "bg-orange-500" : "bg-green-500"], "class:list")} style="animation: pulse-dot 2s ease-in-out infinite;"></span>`} <span${addAttribute(["relative inline-flex rounded-full h-2 w-2", js.availableToday === 0 ? "bg-gray-400" : js.availableToday === 1 ? "bg-orange-500" : "bg-green-500"], "class:list")}></span> </span> <span class="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold" style="color: var(--v2-ink-900);"> ${js.availableToday === 0 ? COPY.bookedOut : COPY.leftToday(js.availableToday)} </span> </div> </div>  <div class="col-span-5 md:col-span-3 p-4 lg:p-9 flex flex-col justify-between" style="background: var(--v2-cream-100);"> <div> <div class="font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.18em] mb-2" style="color: var(--v2-turquoise-600);"> ${js.brand} · ${js.year} </div> <h3 class="font-display text-lg lg:text-3xl leading-tight mb-1 whitespace-nowrap" style="color: var(--v2-ink-950);">${js.name}</h3> <div class="font-mono text-[11px] uppercase tracking-[0.12em] mb-3" style="color: rgba(7,29,48,0.55);">${js.model}</div> <p class="font-display italic text-sm lg:text-lg mb-3 lg:mb-5 leading-snug" style="color: rgba(7,29,48,0.6);">${js.tagline}</p>  <div class="grid grid-cols-3 gap-2 lg:gap-3 mb-3"> <div> <div class="font-display text-lg lg:text-2xl" style="color: var(--v2-ink-950);">${js.hp}</div> <div class="font-mono text-[9px] uppercase tracking-[0.12em]" style="color: var(--v2-turquoise-600);">${COPY.specHP}</div> </div> <div> <div class="font-display text-lg lg:text-2xl" style="color: var(--v2-ink-950);">${js.topSpeed}</div> <div class="font-mono text-[9px] uppercase tracking-[0.12em]" style="color: var(--v2-turquoise-600);">${COPY.specKmh}</div> </div> <div> <div class="font-display text-lg lg:text-2xl" style="color: var(--v2-ink-950);">${js.seats}<span class="text-xs align-top" style="color: var(--v2-turquoise-600);">*</span></div> <div class="font-mono text-[9px] uppercase tracking-[0.12em]" style="color: var(--v2-turquoise-600);">${COPY.specSeats}</div> </div> </div>  <div class="hidden lg:block font-mono text-[9px] italic mb-5" style="color: rgba(7,29,48,0.5);">${seatsNote}</div>  <div class="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style="background: rgba(0,179,167,0.1); color: var(--v2-turquoise-600);"> <span class="font-mono text-[10px] uppercase tracking-[0.14em] font-semibold">${badge}</span> </div> </div> <div>  <div class="mb-4 mt-4 lg:mt-0"> <div class="flex items-baseline gap-1"> <span class="v2-display text-2xl lg:text-4xl v2-gradient-sun">€${js.beachRides.min10}</span> <span class="font-mono text-[10px] uppercase tracking-[0.18em]" style="color: var(--v2-turquoise-600);">${COPY.minLabel}</span> </div> <a href="#booking-form" class="inline-flex items-center gap-1.5 mt-1 font-mono text-[10px] uppercase tracking-[0.14em] hover:opacity-70 transition-opacity" style="color: var(--v2-ink-900);"> <span>${COPY.seeAllPrices}</span> <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"> <path d="M12 5v14M5 12l7 7 7-7"></path> </svg> </a> </div> <a${addAttribute(js.availableToday === 0 ? "#book" : `https://wa.me/306955612777?text=${whatsappText}`, "href")}${addAttribute(js.availableToday === 0 ? "_self" : "_blank", "target")}${addAttribute(js.availableToday === 0 ? "" : "noopener", "rel")}${addAttribute([
      "inline-flex items-center justify-center text-center w-full py-3 px-4 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] md:tracking-[0.14em] font-semibold transition-all duration-500",
      js.availableToday === 0 ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:scale-[1.02]"
    ], "class:list")}${addAttribute(js.availableToday === 0 ? "background: rgba(7,29,48,0.1); color: rgba(7,29,48,0.5);" : "background: var(--v2-ink-950); color: var(--v2-cream-50);", "style")}${addAttribute(`v2-fleet-whatsapp-${js.id}`, "data-cro")}> ${js.availableToday === 0 ? COPY.ctaWaitlist : COPY.ctaBook} ${js.availableToday > 0 && renderTemplate`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="ml-2 hidden md:inline-block" aria-hidden="true"> <path d="M5 12h14M13 5l7 7-7 7"></path> </svg>`} </a> </div> </div> </div> </article>`;
  })} </div>  <p class="mt-8 text-xs italic text-center" style="color: rgba(7,29,48,0.5);">${seatsNote}</p> </div> ${renderScript($$result, "C:/Users/User/jetski-LIVE/src/components/v2/Fleet2.astro?astro&type=script&index=0&lang.ts")} </section>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/Fleet2.astro", void 0);

const $$WaterFun2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$WaterFun2;
  const lang = Astro2.props.lang ?? "en";
  const COPY = {
    en: {
      eyebrow: "Add-on · Water Fun",
      title: "Three seats. One tube.",
      accent: "Pure adrenaline.",
      body: "Get pulled through the Ionian on a three-seat Great Big Mable towable behind one of our Neros. No driving required. Just hold on and laugh. Perfect for groups, families, and anyone who prefers the ride to the wheel.",
      person: "/person",
      cta: "Book Water Fun",
      whatsapp: "Hi David, I'd like to book Water Fun (€30 per person).",
      badge: "Great Big Mable · 3 seats"
    },
    de: {
      eyebrow: "Zusatz · Water Fun",
      title: "Drei Sitze. Ein Tube.",
      accent: "Pures Adrenalin.",
      body: "Lass Dich durchs Ionische ziehen auf einem 3-Sitz-Tube (Great Big Mable) hinter einem unserer Neros. Kein Fahren nötig. Einfach festhalten und lachen. Perfekt für Gruppen, Familien und alle, die den Ritt ohne Lenker wollen.",
      person: "/Person",
      cta: "Water Fun buchen",
      whatsapp: "Hallo David, ich würde gerne Water Fun buchen (30 € pro Person).",
      badge: "Great Big Mable · 3 Sitze"
    },
    gr: {
      eyebrow: "Add-on · Water Fun",
      title: "Three seats. One tube.",
      accent: "Pure adrenaline.",
      body: "Get pulled through the Ionian on a three-seat Great Big Mable towable behind one of our Neros. No driving required. Just hold on and laugh. Perfect for groups, families, and anyone who prefers the ride to the wheel.",
      person: "/person",
      cta: "Book Water Fun",
      whatsapp: "Hi David, I'd like to book Water Fun (€30 per person).",
      badge: "Great Big Mable · 3 seats"
    }
  }[lang];
  const waLink = `https://wa.me/306955612777?text=${encodeURIComponent(COPY.whatsapp)}`;
  return renderTemplate`${maybeRenderHead()}<section id="water-fun" class="relative py-20 lg:py-28 scroll-mt-24" style="background: var(--v2-ink-950);"> <div class="mx-auto max-w-[1600px] px-6 lg:px-12"> <div class="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"> <div class="relative aspect-[4/3] md:aspect-auto md:min-h-[380px] overflow-hidden"> <picture> <source srcset="/images/gallery/waterfun-action.webp" type="image/webp"> <img src="/images/gallery/waterfun-action.jpg" alt="Three riders on a Jobe Ridge towable tube behind a Sea-Doo on the Ionian Sea" width="1153" height="720" loading="lazy" decoding="async" class="w-full h-full object-cover"> </picture> <div class="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full z-10" style="background: rgba(7,29,48,0.75); color: var(--v2-sun-400); backdrop-filter: blur(6px);"> ${COPY.badge} </div> </div> <div class="p-8 lg:p-10 flex flex-col justify-center gap-4" style="background: rgba(253,251,244,0.04);"> <div class="v2-eyebrow" style="color: var(--v2-sun-400);"><span>${COPY.eyebrow}</span></div> <h3 class="font-display text-3xl lg:text-4xl" style="color: var(--v2-cream-50);"> ${COPY.title} <em style="color: var(--v2-sun-400);">${COPY.accent}</em> </h3> <p class="text-base lg:text-lg" style="color: rgba(253,251,244,0.8);"> ${COPY.body} </p> <div class="flex flex-wrap items-center justify-between gap-4 pt-2"> <div class="font-display text-5xl" style="color: var(--v2-sun-400);">€30<span class="text-xl opacity-75">${COPY.person}</span></div> <a${addAttribute(waLink, "href")} target="_blank" rel="noopener" class="v2-btn-ghost" style="color: var(--v2-cream-50); border-color: var(--v2-cream-50);" data-cro="v2-waterfun-book"> ${COPY.cta} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"> <path d="M5 12h14M13 5l7 7-7 7"></path> </svg> </a> </div> </div> </div> </div> </section>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/WaterFun2.astro", void 0);

const $$HowItWorks2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$HowItWorks2;
  const lang = Astro2.props.lang ?? "en";
  const COPY = {
    en: {
      eyebrow: "How it works",
      titleLead: "Ninety seconds.",
      titleTail: "Then the sea.",
      stepLabel: "Step",
      steps: [
        { n: "01", title: "Pick your machine", body: "Scroll the fleet above. Live availability, transparent pricing, no contacting us back and forth.", time: "30 sec", icon: "🏖️" },
        { n: "02", title: "Sign the waiver", body: "Tick the liability waiver online, sign the briefing form at the dock. Greek-law compliant with €700k third-party insurance.", time: "45 sec", icon: "✍️" },
        { n: "03", title: "Pay your deposit", body: "30% deposit now, remaining 70% at the dock. Cash (EUR), Mastercard, Visa or Viva Wallet. No hidden fees.", time: "20 sec", icon: "💳" },
        { n: "04", title: "Ride the Ionian", body: "Meet David at the marina. Ten-minute briefing. Then you disappear into the blue.", time: "On the day", icon: "🌊" }
      ]
    },
    de: {
      eyebrow: "So geht's",
      titleLead: "Neunzig Sekunden.",
      titleTail: "Dann das Meer.",
      stepLabel: "Schritt",
      steps: [
        { n: "01", title: "Wähle Deinen Jetski", body: "Scroll durch die Flotte oben. Echtzeit-Verfügbarkeit, transparente Preise, kein Hin und Her.", time: "30 Sek.", icon: "🏖️" },
        { n: "02", title: "Haftungsausschluss", body: "Online abhaken, am Steg das Briefing-Formular unterschreiben. Griechisch-konform, mit 700 T€ Haftpflicht.", time: "45 Sek.", icon: "✍️" },
        { n: "03", title: "Anzahlung", body: "30% Anzahlung jetzt, restliche 70% am Steg. Bar (EUR), Mastercard, Visa oder Viva Wallet. Keine versteckten Kosten.", time: "20 Sek.", icon: "💳" },
        { n: "04", title: "Fahr ins Ionische", body: "Triff David am Hafen. Zehn-Minuten-Briefing. Dann verschwindest Du ins Blaue.", time: "Am Tag selbst", icon: "🌊" }
      ]
    },
    gr: {
      eyebrow: "How it works",
      titleLead: "Ninety seconds.",
      titleTail: "Then the sea.",
      stepLabel: "Step",
      steps: [
        { n: "01", title: "Pick your machine", body: "Scroll the fleet above. Live availability, transparent pricing, no contacting us back and forth.", time: "30 sec", icon: "🏖️" },
        { n: "02", title: "Sign the waiver", body: "Tick the liability waiver online, sign the briefing form at the dock. Greek-law compliant with €700k third-party insurance.", time: "45 sec", icon: "✍️" },
        { n: "03", title: "Pay your deposit", body: "30% deposit now, remaining 70% at the dock. Cash (EUR), Mastercard, Visa or Viva Wallet. No hidden fees.", time: "20 sec", icon: "💳" },
        { n: "04", title: "Ride the Ionian", body: "Meet David at the marina. Ten-minute briefing. Then you disappear into the blue.", time: "On the day", icon: "🌊" }
      ]
    }
  }[lang];
  const steps = COPY.steps;
  return renderTemplate`${maybeRenderHead()}<section id="how" class="relative py-24 lg:py-40 overflow-hidden" style="background: var(--v2-cream-100);"> <!-- Decorative sun curve behind --> <div class="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style="background: radial-gradient(circle, var(--v2-sun-400), transparent 70%);"></div> <div class="relative mx-auto max-w-[1600px] px-6 lg:px-12"> <div class="grid grid-cols-12 gap-6 mb-16 lg:mb-24"> <div class="col-span-12 lg:col-span-8"> <div class="v2-eyebrow mb-6"><span>${COPY.eyebrow}</span></div> <h2 class="v2-display text-5xl lg:text-[clamp(3.5rem,6vw,6.5rem)]"> ${COPY.titleLead}<br><em>${COPY.titleTail}</em> </h2> </div> </div> <div class="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-6 px-6 md:mx-0 md:px-0 pb-4 md:pb-0 scroll-smooth"> ${steps.map((step) => renderTemplate`<div class="v2-bento-card p-8 shrink-0 w-[85vw] max-w-[22rem] md:w-auto md:max-w-none md:shrink snap-center"> <div class="flex items-start justify-between mb-10"> <div class="font-mono text-[11px] uppercase tracking-[0.2em]" style="color: var(--v2-turquoise-600);"> ${COPY.stepLabel} ${step.n} </div> <div class="text-4xl">${step.icon}</div> </div> <h3 class="font-display text-2xl md:text-3xl leading-tight mb-4 break-words" style="color: var(--v2-ink-950);"> ${step.title} </h3> <p class="text-base leading-relaxed mb-6" style="color: rgba(7,29,48,0.7);"> ${step.body} </p> <div class="pt-4 border-t border-ink-950/15 font-mono text-[10px] uppercase tracking-[0.18em]" style="border-color: rgba(7,29,48,0.15); color: var(--v2-coral-500);">
≈ ${step.time} </div> </div>`)} </div>  <div class="md:hidden mt-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]" style="color: var(--v2-turquoise-600);"> <span>${lang === "de" ? "Wischen" : "Swipe"}</span> <svg class="w-4 h-4 animate-slide-hint" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"> <path d="M5 12h14M13 5l7 7-7 7"></path> </svg> </div> </div> </section>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/HowItWorks2.astro", void 0);

const $$Gallery2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Gallery2;
  const lang = Astro2.props.lang ?? "en";
  const COPY = {
    en: {
      eyebrow: "Real riders · Real moments",
      titleLead: "The day",
      titleAccent: "you’ll remember.",
      intro: "Real photos from the 2025 season. Every person here gave us permission to share their smile. Yours could be next.",
      consent: "All guests depicted have given written consent for publication. See privacy policy for withdrawal options.",
      moments: [
        { title: "Group ride", caption: "Three jetskis, one crew, endless bay", tag: "Group · Lygia" },
        { title: "Couple on the bay", caption: "Sunglasses, smiles, and a full tank", tag: "Couple ride" },
        { title: "Family time", caption: "Thumbs up from dad and son", tag: "Family" },
        { title: "Thumbs up", caption: "Victory signs, peace signs, whatever fits", tag: "Solo" }
      ]
    },
    de: {
      eyebrow: "Echte Fahrer · Echte Momente",
      titleLead: "Der Tag,",
      titleAccent: "den Du nie vergisst.",
      intro: "Echte Fotos aus der Saison 2025. Jede Person hier hat uns die Erlaubnis gegeben, ihr Lächeln zu zeigen. Deins könnte als Nächstes kommen.",
      consent: "Alle abgebildeten Gäste haben schriftlich zugestimmt. Widerrufsmöglichkeiten in der Datenschutzerklärung.",
      moments: [
        { title: "Gruppenfahrt", caption: "Drei Jetskis, eine Crew, endlose Bucht", tag: "Gruppe · Lygia" },
        { title: "Paar auf dem Wasser", caption: "Sonnenbrille, Lächeln, voller Tank", tag: "Paar-Fahrt" },
        { title: "Familienzeit", caption: "Daumen hoch von Papa und Sohn", tag: "Familie" },
        { title: "Daumen hoch", caption: "Siegeszeichen, Peace-Zeichen, was auch immer passt", tag: "Solo" }
      ]
    },
    gr: {
      eyebrow: "Real riders · Real moments",
      titleLead: "The day",
      titleAccent: "you’ll remember.",
      intro: "Real photos from the 2025 season. Every person here gave us permission to share their smile. Yours could be next.",
      consent: "All guests depicted have given written consent for publication. See privacy policy for withdrawal options.",
      moments: [
        { title: "Group ride", caption: "Three jetskis, one crew, endless bay", tag: "Group · Lygia" },
        { title: "Couple on the bay", caption: "Sunglasses, smiles, and a full tank", tag: "Couple ride" },
        { title: "Family time", caption: "Thumbs up from dad and son", tag: "Family" },
        { title: "Thumbs up", caption: "Victory signs, peace signs, whatever fits", tag: "Solo" }
      ]
    }
  }[lang];
  const moments = [
    { title: COPY.moments[0].title, caption: COPY.moments[0].caption, tag: COPY.moments[0].tag, src: "/images/customers/nero-guest-12.jpg" },
    { title: COPY.moments[1].title, caption: COPY.moments[1].caption, tag: COPY.moments[1].tag, src: "/images/customers/nero-guest-05.jpg" },
    { title: COPY.moments[2].title, caption: COPY.moments[2].caption, tag: COPY.moments[2].tag, src: "/images/customers/nero-guest-02.jpg" },
    { title: COPY.moments[3].title, caption: COPY.moments[3].caption, tag: COPY.moments[3].tag, src: "/images/customers/nero-guest-07.jpg" }
  ];
  return renderTemplate`<!-- Scoped SVG unsharp-mask. Milder than Hero kernel (center 2.6 vs 3) because
     still photos should not exaggerate JPEG-artifact edges. -->${maybeRenderHead()}<svg aria-hidden="true" focusable="false" style="position: absolute; width: 0; height: 0; overflow: hidden;" data-astro-cid-vw3zaox2> <filter id="gallery-sharpen" color-interpolation-filters="sRGB" data-astro-cid-vw3zaox2> <feConvolveMatrix order="3" preserveAlpha="true" kernelMatrix="0 -0.4 0  -0.4 2.6 -0.4  0 -0.4 0" data-astro-cid-vw3zaox2></feConvolveMatrix> </filter> </svg> <section class="relative py-24 lg:py-40" style="background: var(--v2-cream-50);" data-astro-cid-vw3zaox2> <div class="mx-auto max-w-[1600px] px-6 lg:px-12" data-astro-cid-vw3zaox2> <div class="grid grid-cols-12 gap-6 mb-16 lg:mb-20" data-astro-cid-vw3zaox2> <div class="col-span-12 lg:col-span-8" data-astro-cid-vw3zaox2> <div class="v2-eyebrow mb-6" data-astro-cid-vw3zaox2><span data-astro-cid-vw3zaox2>${COPY.eyebrow}</span></div> <h2 class="v2-display text-5xl lg:text-[clamp(3.5rem,6vw,6.5rem)]" data-astro-cid-vw3zaox2> ${COPY.titleLead}<br data-astro-cid-vw3zaox2><em data-astro-cid-vw3zaox2>${COPY.titleAccent}</em> </h2> </div> <div class="col-span-12 lg:col-span-4 flex items-end" data-astro-cid-vw3zaox2> <p class="text-lg leading-relaxed" style="color: rgba(7,29,48,0.7);" data-astro-cid-vw3zaox2> ${COPY.intro} </p> </div> </div> <div class="grid grid-cols-12 gap-2 lg:gap-3 md:auto-rows-fr" data-astro-cid-vw3zaox2> ${moments.map((m, i) => {
    const spans = [
      "col-span-6 aspect-[4/5] md:col-span-7 md:aspect-auto md:h-[480px]",
      "col-span-6 aspect-[4/5] md:col-span-5 md:aspect-auto md:h-[480px]",
      "col-span-6 aspect-[4/5] md:col-span-5 md:aspect-auto md:h-[480px]",
      "col-span-6 aspect-[4/5] md:col-span-7 md:aspect-auto md:h-[480px]"
    ];
    return renderTemplate`<figure${addAttribute(["group relative overflow-hidden rounded-3xl", spans[i]], "class:list")} data-astro-cid-vw3zaox2> <picture data-astro-cid-vw3zaox2> <source${addAttribute(m.src.replace(/\.(jpe?g|png)$/i, ".webp"), "srcset")} type="image/webp" data-astro-cid-vw3zaox2> <img${addAttribute(m.src, "src")}${addAttribute(`${m.title}, ${m.caption}`, "alt")} width="1400" height="933" loading="lazy" decoding="async" class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 gallery-img-crisp" data-astro-cid-vw3zaox2> </picture> <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to top, rgba(7,29,48,0.85), transparent 50%);" data-astro-cid-vw3zaox2></div> <div class="absolute top-5 right-5 px-3 py-1.5 rounded-full backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.14em]" style="background: rgba(253,251,244,0.9); color: var(--v2-ink-900);" data-astro-cid-vw3zaox2> ${m.tag} </div> <figcaption class="absolute bottom-0 left-0 right-0 p-6 lg:p-8" data-astro-cid-vw3zaox2> <h3 class="font-display text-2xl lg:text-4xl mb-1" style="color: var(--v2-cream-50);" data-astro-cid-vw3zaox2> ${m.title} </h3> <p class="text-sm lg:text-base" style="color: rgba(253,251,244,0.8);" data-astro-cid-vw3zaox2> ${m.caption} </p> </figcaption> </figure>`;
  })} </div> <p class="mt-6 text-xs italic text-center" style="color: rgba(7,29,48,0.45);" data-astro-cid-vw3zaox2> ${COPY.consent} </p> </div> </section>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/Gallery2.astro", void 0);

const $$Spots2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Spots2;
  const lang = Astro2.props.lang ?? "en";
  const SPOTS_COPY = {
    en: {
      eyebrow: "Where the Neros go · Six stops",
      titleLead: "One loop.",
      titleAccent: "Six postcards.",
      intro: "Our favourite line around the island. Tap any stop for the Google Maps pin. Or just trust David when he points left.",
      homeBase: "Home base",
      openMaps: "Open in Maps ↗",
      footnote: "Route picks vary with the wind. David decides on the day. The goal is flat water and quiet bays.",
      captions: [
        "The postcard: white cliffs, deep blue, zero crowds from the sea.",
        "Secret swimming stop. Turquoise that doesn't look real.",
        "Village bay. Coffee on the water before the ride home.",
        "Crossing to the little sister island. Glassy water, few boats.",
        "Windsurfer paradise in the afternoon. Mornings are ours.",
        "Back to the dock. Salty, happy, already planning the next one."
      ]
    },
    de: {
      eyebrow: "Wo die Neros hinfahren · Sechs Stops",
      titleLead: "Eine Runde.",
      titleAccent: "Sechs Postkarten.",
      intro: "Unsere Lieblings-Route um die Insel. Tippe auf einen Spot für den Google-Maps-Pin. Oder vertrau einfach David, wenn er nach links zeigt.",
      homeBase: "Heimathafen",
      openMaps: "In Maps öffnen ↗",
      footnote: "Die Route richtet sich nach dem Wind. David entscheidet am Tag. Ziel sind flaches Wasser und ruhige Buchten.",
      captions: [
        "Die Postkarte: weiße Klippen, tiefes Blau, vom Meer aus keine Menschenmassen.",
        "Geheimer Badespot. Türkis, das nicht echt aussieht.",
        "Dorfbucht. Kaffee auf dem Wasser vor der Heimfahrt.",
        "Kurze Überfahrt zur kleinen Schwesterinsel. Glattes Wasser, kaum Boote.",
        "Nachmittags Windsurfer-Paradies. Morgens gehört es uns.",
        "Zurück zum Steg. Salzig, glücklich, schon der nächste Plan."
      ]
    },
    gr: {
      eyebrow: "Where the Neros go · Six stops",
      titleLead: "One loop.",
      titleAccent: "Six postcards.",
      intro: "Our favourite line around the island. Tap any stop for the Google Maps pin. Or just trust David when he points left.",
      homeBase: "Home base",
      openMaps: "Open in Maps ↗",
      footnote: "Route picks vary with the wind. David decides on the day. The goal is flat water and quiet bays.",
      captions: [
        "The postcard: white cliffs, deep blue, zero crowds from the sea.",
        "Secret swimming stop. Turquoise that doesn't look real.",
        "Village bay. Coffee on the water before the ride home.",
        "Crossing to the little sister island. Glassy water, few boats.",
        "Windsurfer paradise in the afternoon. Mornings are ours.",
        "Back to the dock. Salty, happy, already planning the next one."
      ]
    }
  }[lang];
  const spots = [
    {
      name: "Porto Katsiki",
      greekName: "Πόρτο Κατσίκι",
      caption: SPOTS_COPY.captions[0],
      distanceKm: 18,
      durationMin: 40,
      mapsUrl: "https://maps.google.com/?q=Porto+Katsiki+Lefkada",
      image: "/images/spots/porto-katsiki.jpg",
      gradient: "linear-gradient(135deg, #0a6080 0%, #4fb3bf 50%, #c8e8e2 100%)",
      icon: "cliff"
    },
    {
      name: "Egremni",
      greekName: "Εγκρεμνοί",
      caption: SPOTS_COPY.captions[1],
      distanceKm: 15,
      durationMin: 35,
      mapsUrl: "https://maps.google.com/?q=Egremni+Beach+Lefkada",
      image: "/images/spots/egremni.jpg",
      gradient: "linear-gradient(135deg, #035d81 0%, #5bc0be 60%, #e8f4d9 100%)",
      icon: "beach"
    },
    {
      name: "Agios Nikitas",
      greekName: "Άγιος Νικήτας",
      caption: SPOTS_COPY.captions[2],
      distanceKm: 11,
      durationMin: 25,
      mapsUrl: "https://maps.google.com/?q=Agios+Nikitas+Lefkada",
      image: "/images/spots/agios-nikitas.jpg",
      gradient: "linear-gradient(135deg, #1e4a6b 0%, #4a8fa8 50%, #ffd9b3 100%)",
      icon: "bay"
    },
    {
      name: "Meganisi Channel",
      greekName: "Μεγανήσι",
      caption: SPOTS_COPY.captions[3],
      distanceKm: 8,
      durationMin: 15,
      mapsUrl: "https://maps.google.com/?q=Meganisi+Island",
      image: "/images/spots/meganisi.jpg",
      gradient: "linear-gradient(135deg, #0d4a6b 0%, #2d8ba8 45%, #8ed4c8 100%)",
      icon: "channel"
    },
    {
      name: "Vasiliki Bay",
      greekName: "Βασιλική",
      caption: SPOTS_COPY.captions[4],
      distanceKm: 22,
      durationMin: 45,
      mapsUrl: "https://maps.google.com/?q=Vasiliki+Bay+Lefkada",
      image: "/images/spots/vasiliki.jpg",
      gradient: "linear-gradient(135deg, #0a3d5c 0%, #3b7bb8 50%, #ffb787 100%)",
      icon: "bay"
    },
    {
      name: "Lygia return",
      greekName: "Επιστροφή",
      caption: SPOTS_COPY.captions[5],
      distanceKm: 0,
      durationMin: 0,
      mapsUrl: "https://maps.google.com/?q=38.7893,20.7192",
      image: "/images/spots/lygia-port.jpg",
      gradient: "linear-gradient(135deg, #1a3a50 0%, #ff8a4a 60%, #ffd76a 100%)",
      icon: "return"
    }
  ];
  const iconPath = {
    cliff: "M3 20L8 12L12 15L16 8L21 20H3Z",
    beach: "M3 18C7 16 11 20 15 18C17 17 19 18 21 18L21 20H3V18Z M6 12C6 9 9 7 12 7C15 7 18 9 18 12",
    bay: "M3 14C6 10 9 14 12 10C15 6 18 14 21 10L21 20H3V14Z",
    channel: "M3 12C7 8 11 16 15 12C17 10 19 12 21 10L21 14C19 16 17 14 15 16C11 20 7 12 3 16V12Z",
    cove: "M3 15A9 4 0 0 1 21 15L21 20H3V15Z",
    return: "M5 12L10 7M5 12L10 17M5 12H19"
  };
  return renderTemplate`${maybeRenderHead()}<section id="spots" class="relative py-16 lg:py-24" style="background: var(--v2-cream-50);"> <div class="mx-auto max-w-[1600px] px-6 lg:px-12"> <!-- Header --> <div class="grid grid-cols-12 gap-6 mb-6 lg:mb-10"> <div class="col-span-12 lg:col-span-8"> <div class="v2-eyebrow mb-6"><span>${SPOTS_COPY.eyebrow}</span></div> <h2 class="v2-display text-5xl lg:text-[clamp(3.5rem,6vw,6.5rem)]"> ${SPOTS_COPY.titleLead}<br><em>${SPOTS_COPY.titleAccent}</em> </h2> </div> <div class="col-span-12 lg:col-span-4 flex items-end"> <p class="text-lg leading-relaxed" style="color: rgba(7,29,48,0.7);"> ${SPOTS_COPY.intro} </p> </div> </div> <!-- Bento grid: 6 cards --> <div class="grid grid-cols-12 gap-1 lg:gap-2"> ${spots.map((spot, i) => {
    const spans = [
      "col-span-12 md:col-span-8 aspect-[16/9]",
      "col-span-12 md:col-span-4 aspect-[4/5]",
      "col-span-6 md:col-span-4 aspect-square",
      "col-span-6 md:col-span-4 aspect-square",
      "col-span-12 md:col-span-4 aspect-square",
      "col-span-12 aspect-[21/9]"
    ];
    return renderTemplate`<a${addAttribute(spot.mapsUrl, "href")} target="_blank" rel="noopener"${addAttribute(["group relative overflow-hidden rounded-xl block", spans[i]], "class:list")}${addAttribute(`spot-${spot.name.toLowerCase().replace(/\s+/g, "-")}`, "data-cro")}> ${spot.image ? renderTemplate`<picture> <source${addAttribute(spot.image.replace(/\.(jpe?g|png)$/i, ".webp"), "srcset")} type="image/webp"> <img${addAttribute(spot.image, "src")}${addAttribute(`${spot.name}, ${spot.caption}`, "alt")} width="1400" height="933"${addAttribute(i === 0 ? "eager" : "lazy", "loading")}${addAttribute(i === 0 ? "high" : "auto", "fetchpriority")} decoding="async" class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"> </picture>` : renderTemplate`<div class="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-105"${addAttribute(`background: ${spot.gradient};`, "style")}>  <svg class="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true"> <path d="M0,200 C80,170 160,220 240,190 C320,160 400,200 400,200 L400,300 L0,300 Z" fill="rgba(255,255,255,0.3)"></path> <path d="M0,230 C80,210 160,250 240,220 C320,195 400,230 400,230 L400,300 L0,300 Z" fill="rgba(255,255,255,0.4)"></path> </svg>  <svg class="absolute top-6 left-6 w-12 h-12 lg:w-16 lg:h-16 opacity-70" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"> <path${addAttribute(iconPath[spot.icon], "d")}></path> </svg> </div>`}  <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to top, rgba(7,29,48,0.85) 0%, rgba(7,29,48,0.15) 55%, transparent 100%);"></div>  ${spot.distanceKm > 0 && renderTemplate`<div class="absolute top-5 right-5 px-3 py-1.5 rounded-full backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.14em]" style="background: rgba(253,251,244,0.9); color: var(--v2-ink-900);"> ${spot.distanceKm} km · ${spot.durationMin} min
</div>`} ${spot.distanceKm === 0 && renderTemplate`<div class="absolute top-5 right-5 px-3 py-1.5 rounded-full backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.14em]" style="background: var(--v2-sun-400); color: var(--v2-ink-950);"> ${SPOTS_COPY.homeBase} </div>`}  <figcaption class="absolute bottom-0 left-0 right-0 p-6 lg:p-8"> <div class="font-mono text-[10px] uppercase tracking-[0.16em] mb-1 opacity-80" style="color: rgba(253,251,244,0.8);"> ${spot.greekName} </div> <h3 class="font-display text-2xl lg:text-4xl leading-tight mb-1" style="color: var(--v2-cream-50);"> ${spot.name} </h3> <p class="text-sm lg:text-base max-w-lg" style="color: rgba(253,251,244,0.8);"> ${spot.caption} </p> </figcaption>  <div class="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-full backdrop-blur-md font-mono text-[9px] uppercase tracking-[0.14em]" style="background: rgba(7,29,48,0.75); color: var(--v2-cream-50);"> ${SPOTS_COPY.openMaps} </div> </a>`;
  })} </div> <p class="mt-4 text-xs italic text-center max-w-2xl mx-auto" style="color: rgba(7,29,48,0.45);"> ${SPOTS_COPY.footnote} </p> <p class="mt-3 text-[10px] text-center max-w-3xl mx-auto" style="color: rgba(7,29,48,0.4);">
Spots photography: Porto Katsiki © Dimitra Papadimitriou (CC BY-SA 4.0) ·
      Egremni © Dollbaby78 (Public Domain) ·
      Agios Nikitas © Blackberrijack (CC0) ·
      Meganisi aerial © Cabeza2000 (CC BY-SA 4.0) ·
      Vasiliki © DominikCK1999 (CC BY 4.0) ·
      via Wikimedia Commons &amp; Unsplash.
</p> </div> </section>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/Spots2.astro", void 0);

const testimonials = [
  {
    quote: "David's briefing was spot-on. 10 minutes and I felt completely safe. The Sunset Ride was the highlight of the whole trip.",
    author: "Marco R.",
    initials: "MR",
    origin: "Milan, Italy",
    language: "EN",
    date: "2025-08-14",
    rating: 5,
    source: "Guest feedback",
    category: "Sunset Ride",
    accent: "#ff5a36"
  },
  {
    quote: "Wir haben den Water-Fun-Tube für die Kids gebucht. Zwei Stunden pures Lachen. Die Neros sind gepflegt, David total entspannt.",
    author: "Sophie K.",
    initials: "SK",
    origin: "München, Deutschland",
    language: "DE",
    date: "2025-07-22",
    rating: 5,
    source: "Guest feedback",
    category: "Water Fun",
    accent: "#ffc233"
  },
  {
    quote: "First time on a jetski, no licence. David guided us personally the whole time. Never felt pushed, only welcomed.",
    author: "James W.",
    initials: "JW",
    origin: "London, UK",
    language: "EN",
    date: "2025-09-03",
    rating: 5,
    source: "Guest feedback",
    category: "Beach Ride 60 min",
    accent: "#00b3a7"
  },
  {
    quote: "Η εμπειρία στον κόλπο της Λυγιάς ήταν τέλεια. Καθαρά jet skis, σωστές οδηγίες, δίκαιη τιμή. Ξανά του χρόνου.",
    author: "Αλέξανδρος Π.",
    initials: "ΑΠ",
    origin: "Athens, Greece",
    language: "EL",
    date: "2025-08-29",
    rating: 5,
    source: "Guest feedback",
    category: "Half Day",
    accent: "#4fb3bf"
  },
  {
    quote: "Der Couple-Ride bei Sonnenuntergang. Einer dieser Urlaubsmomente, die man nicht mehr vergisst. Preis völlig fair.",
    author: "Tobias H.",
    initials: "TH",
    origin: "Wien, Österreich",
    language: "DE",
    date: "2025-06-27",
    rating: 5,
    source: "Guest feedback",
    category: "Couple Ride",
    accent: "#ff5a36"
  },
  {
    quote: "Barca pulita, istruzioni chiare, David professionale. Il giro delle baie a sud di Lefkada è stato indimenticabile.",
    author: "Laura B.",
    initials: "LB",
    origin: "Bologna, Italy",
    language: "IT",
    date: "2025-07-11",
    rating: 5,
    source: "Guest feedback",
    category: "Beach Ride 60 min",
    accent: "#ffc233"
  }
];

const $$Testimonials2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Testimonials2;
  const lang = Astro2.props.lang ?? "en";
  const COPY = {
    en: {
      eyebrow: "Guest voices · 2025 season",
      titleLead: "They came.",
      titleAccent: "They returned.",
      disclaimer: "Anonymised stand-in quotes. Verified Google reviews replace these once the 2026 season opens.",
      emptyState: "First reviews appear here once the 2026 season opens."
    },
    de: {
      eyebrow: "Gäste-Stimmen · Saison 2025",
      titleLead: "Sie kamen.",
      titleAccent: "Sie kamen wieder.",
      disclaimer: "Anonymisierte Platzhalter-Zitate. Echte Google-Reviews ersetzen sie, sobald die Saison 2026 startet.",
      emptyState: "Erste Bewertungen erscheinen hier mit Saisonstart 2026."
    },
    gr: {
      eyebrow: "Guest voices · 2025 season",
      titleLead: "They came.",
      titleAccent: "They returned.",
      disclaimer: "Anonymised stand-in quotes. Verified Google reviews replace these once the 2026 season opens.",
      emptyState: "First reviews appear here once the 2026 season opens."
    }
  }[lang];
  const track = [...testimonials, ...testimonials];
  return renderTemplate`${maybeRenderHead()}<section id="voices" class="relative py-16 lg:py-20" style="background: var(--v2-ink-950); color: var(--v2-cream-50);" data-astro-cid-kxs4xxa3> <div class="mx-auto max-w-[1600px] px-6 lg:px-12" data-astro-cid-kxs4xxa3> <!-- Compact header --> <div class="flex flex-wrap items-baseline justify-between gap-4 mb-8" data-astro-cid-kxs4xxa3> <div data-astro-cid-kxs4xxa3> <div class="v2-eyebrow mb-2" style="color: var(--v2-sun-300);" data-astro-cid-kxs4xxa3> <span data-astro-cid-kxs4xxa3>${COPY.eyebrow}</span> </div> <h2 class="v2-display text-3xl lg:text-5xl" style="color: var(--v2-cream-50);" data-astro-cid-kxs4xxa3> ${COPY.titleLead} <em class="v2-gradient-sun" data-astro-cid-kxs4xxa3>${COPY.titleAccent}</em> </h2> </div> <p class="text-xs italic max-w-xs" style="color: rgba(253,251,244,0.5);" data-astro-cid-kxs4xxa3> ${COPY.disclaimer} </p> </div> ${testimonials.length === 0 && renderTemplate`<div class="rounded-2xl p-8 text-center" style="background: rgba(253,251,244,0.04); border: 1px solid rgba(253,251,244,0.1);" data-astro-cid-kxs4xxa3> <p class="font-display text-lg" style="color: rgba(253,251,244,0.8);" data-astro-cid-kxs4xxa3>${COPY.emptyState}</p> </div>`} ${testimonials.length > 0 && renderTemplate`<div class="voices-marquee" data-astro-cid-kxs4xxa3> <div class="voices-track" data-astro-cid-kxs4xxa3> ${track.map((t, i) => renderTemplate`<article class="voice-card"${addAttribute(i >= testimonials.length ? "true" : "false", "aria-hidden")} data-astro-cid-kxs4xxa3> <div class="voice-avatar"${addAttribute(`background: linear-gradient(135deg, ${t.accent}, ${t.accent}aa); box-shadow: 0 4px 12px ${t.accent}33;`, "style")} aria-hidden="true" data-astro-cid-kxs4xxa3> ${t.initials} </div> <div class="min-w-0" data-astro-cid-kxs4xxa3> <p class="voice-quote" data-astro-cid-kxs4xxa3>&ldquo;${t.quote}&rdquo;</p> <div class="voice-meta" data-astro-cid-kxs4xxa3> <span class="stars"${addAttribute(`${t.rating} out of 5 stars`, "aria-label")} data-astro-cid-kxs4xxa3>${"★".repeat(t.rating)}</span> <span data-astro-cid-kxs4xxa3>${t.author}</span> <span aria-hidden="true" data-astro-cid-kxs4xxa3>·</span> <span data-astro-cid-kxs4xxa3>${t.origin}</span> </div> </div> </article>`)} </div> </div>`} </div> </section>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/Testimonials2.astro", void 0);

const $$Faq2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Faq2;
  const lang = Astro2.props.lang ?? "en";
  const COPY = {
    en: {
      eyebrow: "The small print, big",
      titleLead: "Questions we",
      titleAccent: "love.",
      showMore: "Show 6 more questions",
      showLess: "Show less",
      faqs: [
        { q: "Do I need a boat license?", a: "No licence? No problem. Thousands of happy guests ride with us every season without any boating licence. You simply join a guided tour with David (he rides alongside or escorts you in sight). WITH a valid boating licence (any EU personal-watercraft category) you can ride solo after the safety briefing. Minimum age 18 and a valid photo ID are always required." },
        { q: "What's included in the price?", a: "The Sea-Doo, life jackets for driver + passengers, our 10-minute safety briefing and €700,000 third-party liability insurance (Greek law). Fuel is NOT included. It's billed separately at the end of your rental based on actual usage." },
        { q: "What about Water Fun?", a: "€30 per person. A three-seat Great Big Mable tube pulled behind a Sea-Doo. No driving required, no licence needed, just good vibes. Perfect for groups, families and anyone who just wants the thrill. Book via WhatsApp." },
        { q: "How do I pay?", a: "30% deposit online at booking (Mastercard, Visa or Viva Wallet). The remaining 70% at the dock. Cash (EUR) is always welcome, or pay by Mastercard, Visa or Viva Wallet. No hidden fees." },
        { q: "Is insurance included?", a: "Yes. Third-party liability up to €700,000 per incident, required by Greek Law 4926/2022. Personal accident insurance for riders: we recommend you check your travel insurance separately." },
        { q: "Can my kids or friends ride with me?", a: "Yes. All our Sea-Doos seat up to three. Only the driver must be 18+. All passengers wear life jackets and should be comfortable in the water." },
        { q: "What about bad weather?", a: "Above Beaufort 5 we can't operate by law. Weather-grounded bookings are refunded 100% or rescheduled free." },
        { q: "Can I cancel?", a: "Free cancellation up to 48 hours before. 48 to 24h: 50% refund. Under 24h non-refundable unless weather grounds us." },
        { q: "Where do I meet?", a: "Lygia Port, Lefkada. GPS: 38.7893° N, 20.7192° E. Short walk from Lygia village. Free parking at the dock. Google Maps link sent with every booking confirmation." },
        { q: "How far can I ride?", a: "Lefkada Port Police rule: stay within 300 m of shore, never inside swim-zone buoys. Plenty of bays to explore within those limits. Full rules and the official Port Police video are on our Safety page." },
        { q: "What should I bring?", a: "Photo ID (required), swimwear, towel, reef-safe sunscreen, water bottle. Leave valuables at your accommodation. No lockers at the dock." }
      ]
    },
    de: {
      eyebrow: "Das Kleingedruckte, groß",
      titleLead: "Fragen, die wir",
      titleAccent: "lieben.",
      showMore: "Weitere 6 Fragen anzeigen",
      showLess: "Weniger anzeigen",
      faqs: [
        { q: "Brauche ich einen Bootsführerschein?", a: "Kein Führerschein? Kein Problem. Tausende Gäste fahren jede Saison ohne Führerschein mit uns. Du machst einfach eine geführte Tour mit David (er fährt an Deiner Seite oder hat Dich im Blick). MIT gültigem EU-PWC-Führerschein kannst Du nach dem Safety-Briefing solo fahren. Mindestalter 18 und gültiger Lichtbildausweis sind immer Pflicht." },
        { q: "Was ist im Preis enthalten?", a: "Der Sea-Doo, Rettungswesten für Fahrer + Mitfahrer, unser 10-Minuten-Safety-Briefing und 700 000 € Haftpflichtversicherung (griech. Recht). Treibstoff ist NICHT enthalten. Er wird am Ende der Miete nach tatsächlichem Verbrauch abgerechnet." },
        { q: "Wie läuft Water Fun?", a: "30 € pro Person. Ein Dreier-Tube (Great Big Mable), das hinter einem Sea-Doo gezogen wird. Kein Fahren, kein Führerschein, einfach gute Laune. Perfekt für Gruppen, Familien und alle, die nur den Kick wollen. Buchung via WhatsApp." },
        { q: "Wie bezahle ich?", a: "30% Anzahlung online bei der Buchung (Mastercard, Visa oder Viva Wallet). Die restlichen 70% am Steg. Bar (EUR) ist immer willkommen, oder mit Mastercard, Visa oder Viva Wallet. Keine versteckten Kosten." },
        { q: "Ist die Versicherung dabei?", a: "Ja. Haftpflicht bis 700 000 € pro Vorfall, vorgeschrieben durch griech. Gesetz 4926/2022. Unfallversicherung für Fahrer: prüf Deine Reiseversicherung separat, das empfehlen wir." },
        { q: "Können meine Kinder oder Freunde mitfahren?", a: "Ja. Jeder Sea-Doo fasst bis zu drei Personen. Nur der Fahrer muss 18+ sein. Alle Mitfahrer tragen Rettungswesten und sollten im Wasser sicher sein." },
        { q: "Was ist bei schlechtem Wetter?", a: "Über Beaufort 5 dürfen wir gesetzlich nicht raus. Wetterbedingt gestrichene Buchungen werden 100% erstattet oder kostenlos verschoben." },
        { q: "Kann ich stornieren?", a: "Kostenlos bis 48 Stunden vorher. 48 bis 24h: 50% Rückerstattung. Unter 24h nicht erstattbar, außer das Wetter stoppt uns." },
        { q: "Wo treffen wir uns?", a: "Lygia Port, Lefkada. GPS: 38.7893° N, 20.7192° E. Kurzer Spaziergang vom Dorf Lygia. Kostenlose Parkplätze am Hafen. Google-Maps-Link kommt mit jeder Buchungsbestätigung." },
        { q: "Wie weit darf ich fahren?", a: "Regel der Hafenpolizei Lefkada: innerhalb von 300 m vom Ufer bleiben, nie in Schwimmzonen-Bojen. Genug Buchten zum Erkunden in diesen Grenzen. Alle Regeln und das offizielle Hafenpolizei-Video findest Du auf unserer Safety-Seite." },
        { q: "Was soll ich mitbringen?", a: "Lichtbildausweis (Pflicht), Badesachen, Handtuch, riff-sichere Sonnencreme, Wasserflasche. Wertsachen lass in der Unterkunft. Am Hafen gibt es keine Schließfächer." }
      ]
    },
    gr: {
      eyebrow: "The small print, big",
      titleLead: "Questions we",
      titleAccent: "love.",
      showMore: "Show 6 more questions",
      showLess: "Show less",
      faqs: [
        { q: "Do I need a boat license?", a: "No licence? No problem. Thousands of happy guests ride with us every season without any boating licence. You simply join a guided tour with David (he rides alongside or escorts you in sight). WITH a valid boating licence (any EU personal-watercraft category) you can ride solo after the safety briefing. Minimum age 18 and a valid photo ID are always required." },
        { q: "What's included in the price?", a: "The Sea-Doo, life jackets for driver + passengers, our 10-minute safety briefing and €700,000 third-party liability insurance (Greek law). Fuel is NOT included. It's billed separately at the end of your rental based on actual usage." },
        { q: "What about Water Fun?", a: "€30 per person. A three-seat Great Big Mable tube pulled behind a Sea-Doo. No driving required, no licence needed, just good vibes. Perfect for groups, families and anyone who just wants the thrill. Book via WhatsApp." },
        { q: "How do I pay?", a: "30% deposit online at booking (Mastercard, Visa or Viva Wallet). The remaining 70% at the dock. Cash (EUR) is always welcome, or pay by Mastercard, Visa or Viva Wallet. No hidden fees." },
        { q: "Is insurance included?", a: "Yes. Third-party liability up to €700,000 per incident, required by Greek Law 4926/2022. Personal accident insurance for riders: we recommend you check your travel insurance separately." },
        { q: "Can my kids or friends ride with me?", a: "Yes. All our Sea-Doos seat up to three. Only the driver must be 18+. All passengers wear life jackets and should be comfortable in the water." },
        { q: "What about bad weather?", a: "Above Beaufort 5 we can't operate by law. Weather-grounded bookings are refunded 100% or rescheduled free." },
        { q: "Can I cancel?", a: "Free cancellation up to 48 hours before. 48 to 24h: 50% refund. Under 24h non-refundable unless weather grounds us." },
        { q: "Where do I meet?", a: "Lygia Port, Lefkada. GPS: 38.7893° N, 20.7192° E. Short walk from Lygia village. Free parking at the dock. Google Maps link sent with every booking confirmation." },
        { q: "How far can I ride?", a: "Lefkada Port Police rule: stay within 300 m of shore, never inside swim-zone buoys. Plenty of bays to explore within those limits. Full rules and the official Port Police video are on our Safety page." },
        { q: "What should I bring?", a: "Photo ID (required), swimwear, towel, reef-safe sunscreen, water bottle. Leave valuables at your accommodation. No lockers at the dock." }
      ]
    }
  }[lang];
  const faqs = COPY.faqs;
  return renderTemplate`${maybeRenderHead()}<section id="faq" class="relative py-24 lg:py-40" style="background: var(--v2-cream-50);"> <div class="mx-auto max-w-[1600px] px-6 lg:px-12"> <div class="grid grid-cols-12 gap-6 mb-16 lg:mb-24"> <div class="col-span-12 lg:col-span-8"> <div class="v2-eyebrow mb-6"><span>${COPY.eyebrow}</span></div> <h2 class="v2-display text-5xl lg:text-[clamp(3.5rem,6vw,6.5rem)]"> ${COPY.titleLead} <em>${COPY.titleAccent}</em> </h2> </div> </div> <div class="grid grid-cols-12 gap-6"> <div class="col-span-12 lg:col-span-10 lg:col-start-2"> ${faqs.slice(0, 5).map((f, i) => renderTemplate`<details class="group border-b" style="border-color: rgba(7,29,48,0.2);"> <summary class="cursor-pointer list-none py-6 flex items-start justify-between gap-3 md:gap-8 hover:opacity-80 transition-opacity"> <div class="flex items-start gap-3 lg:gap-10 min-w-0 flex-1"> <span class="font-display text-3xl italic shrink-0" style="color: var(--v2-sun-500);">${String(i + 1).padStart(2, "0")}</span> <h3 class="font-display text-xl lg:text-3xl leading-tight break-words min-w-0" style="color: var(--v2-ink-950);"> ${f.q} </h3> </div> <span class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-open:rotate-45" style="background: var(--v2-ink-950); color: var(--v2-cream-50);"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"> <path d="M12 5v14M5 12h14"></path> </svg> </span> </summary> <div class="pb-8 pl-12 lg:pl-20"> <p class="text-lg leading-relaxed max-w-3xl" style="color: rgba(7,29,48,0.75);"> ${f.a} </p> </div> </details>`)} <div id="faq-more" hidden> ${faqs.slice(5).map((f, idx) => {
    const i = idx + 5;
    return renderTemplate`<details class="group border-b" style="border-color: rgba(7,29,48,0.2);"> <summary class="cursor-pointer list-none py-6 flex items-start justify-between gap-3 md:gap-8 hover:opacity-80 transition-opacity"> <div class="flex items-start gap-3 lg:gap-10 min-w-0 flex-1"> <span class="font-display text-3xl italic shrink-0" style="color: var(--v2-sun-500);">${String(i + 1).padStart(2, "0")}</span> <h3 class="font-display text-xl lg:text-3xl leading-tight break-words min-w-0" style="color: var(--v2-ink-950);"> ${f.q} </h3> </div> <span class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-open:rotate-45" style="background: var(--v2-ink-950); color: var(--v2-cream-50);"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"> <path d="M12 5v14M5 12h14"></path> </svg> </span> </summary> <div class="pb-8 pl-12 lg:pl-20"> <p class="text-lg leading-relaxed max-w-3xl" style="color: rgba(7,29,48,0.75);"> ${f.a} </p> </div> </details>`;
  })} </div> <div class="mt-10 flex justify-center"> <button id="faq-toggle" type="button"${addAttribute(COPY.showMore, "data-show-text")}${addAttribute(COPY.showLess, "data-hide-text")} class="inline-flex items-center gap-3 px-6 py-3 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 hover:scale-[1.02]" style="background: var(--v2-ink-950); color: var(--v2-cream-50);"> <span data-faq-toggle-label>${COPY.showMore}</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="transition-transform duration-300" data-faq-toggle-icon aria-hidden="true"> <path d="M6 9l6 6 6-6"></path> </svg> </button> </div> </div> </div> </div> ${renderScript($$result, "C:/Users/User/jetski-LIVE/src/components/v2/Faq2.astro?astro&type=script&index=0&lang.ts")} </section>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/Faq2.astro", void 0);

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00"
];
const DURATION_BY_CATEGORY = {
  "beach-10": 10,
  "beach-15": 15,
  "beach-20": 20,
  "beach-30": 30,
  "beach-60": 60,
  "sunset": 30,
  "couple": 30,
  "vip-1h": 60,
  "vip-half": 240,
  "vip-full": 480,
  "vip-week": 10080,
  "towable": 10
};
const ALL_UNITS = ["nero-ena", "nero-dio", "nero-tria", "nero-tessera"];
const CATEGORIES = [
  { id: "beach-10", label: "Beach Ride · 10 min", price: 80, licenceRequired: false, needsGuide: false },
  { id: "beach-15", label: "Beach Ride · 15 min", price: 90, licenceRequired: false, needsGuide: false, note: "BEST" },
  { id: "beach-20", label: "Beach Ride · 20 min", price: 100, licenceRequired: false, needsGuide: false },
  { id: "beach-30", label: "Beach Ride · 30 min", price: 130, licenceRequired: false, needsGuide: false },
  { id: "beach-60", label: "Beach Ride · 60 min", price: 200, licenceRequired: false, needsGuide: false, note: "BESTSELLER" },
  { id: "sunset", label: "Sunset Ride · 30 min (1 person)", price: 130, licenceRequired: false, needsGuide: false },
  { id: "couple", label: "Couple Ride · 30 min (2 persons)", price: 150, licenceRequired: false, needsGuide: false },
  { id: "vip-1h", label: "VIP Delivery · 1 hour", price: 350, licenceRequired: true, needsGuide: false },
  { id: "vip-half", label: "VIP Delivery · Half day 4h", price: 450, licenceRequired: true, needsGuide: false },
  { id: "vip-full", label: "VIP Delivery · Full day 8h", price: 650, licenceRequired: true, needsGuide: false },
  { id: "vip-week", label: "VIP Delivery · Week", price: "onRequest", licenceRequired: true, needsGuide: false },
  { id: "towable", label: "Water Fun · Towable 10 min (per person)", price: 30, licenceRequired: false, needsGuide: false, note: "per person" }
];
function priceLabel(p) {
  return p === "onRequest" ? "On request" : `€${p}`;
}
function addDaysIso(isoDate, delta) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const base = new Date(Date.UTC(y, m - 1, d));
  base.setUTCDate(base.getUTCDate() + delta);
  const yy = base.getUTCFullYear();
  const mo = String(base.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(base.getUTCDate()).padStart(2, "0");
  return `${yy}-${mo}-${dd}`;
}
function formatDateLabel(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
}
function addMinutesNaiveIso(naiveIso, minutes) {
  const [datePart, timePart] = naiveIso.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [h, mi] = timePart.split(":").map(Number);
  const total = h * 60 + mi + minutes;
  const dayOffset = Math.floor(total / 1440);
  const rem = (total % 1440 + 1440) % 1440;
  const hh = Math.floor(rem / 60);
  const mm = rem % 60;
  const base = new Date(Date.UTC(y, m - 1, d));
  base.setUTCDate(base.getUTCDate() + dayOffset);
  const yy = base.getUTCFullYear();
  const mo = String(base.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(base.getUTCDate()).padStart(2, "0");
  return `${yy}-${mo}-${dd}T${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
const TOTAL_STEPS = 5;
const STEP_LABELS = ["Activity", "Boating licence", "Contact", "Price summary", "Consent"];
function BookingForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wantsInvoice, setWantsInvoice] = useState(false);
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [persons, setPersons] = useState(2);
  const [jetskiId, setJetskiId] = useState("any");
  const [category, setCategory] = useState("beach-60");
  const [hasLicence, setHasLicence] = useState("");
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptWaiver, setAcceptWaiver] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [availCache, setAvailCache] = useState({});
  const [availabilityFailed, setAvailabilityFailed] = useState(false);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const selectedCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === category),
    [category]
  );
  const totalEstimate = useMemo(() => {
    if (selectedCategory.price === "onRequest") return null;
    if (category === "towable") return selectedCategory.price * persons;
    return selectedCategory.price;
  }, [selectedCategory, persons, category]);
  const deposit = totalEstimate !== null ? Math.round(totalEstimate * 0.3) : null;
  const licenceWarningNeeded = hasLicence === "no" && (category.startsWith("vip") || category.startsWith("beach-6") || category === "beach-30");
  const allChecked = acceptPrivacy && acceptTerms && acceptWaiver;
  const handlePersonsChange = useCallback((e) => {
    setPersons(Math.max(1, Math.min(3, Number(e.target.value))));
  }, []);
  const fetchAvailability = useCallback(
    async (targetDate, units) => {
      const toFetch = units.filter((u) => !(`${targetDate}|${u}` in availCache));
      if (toFetch.length === 0) return false;
      const results = await Promise.all(
        toFetch.map(
          (u) => fetch(`/api/availability?date=${encodeURIComponent(targetDate)}&jetski_unit_id=${encodeURIComponent(u)}`, {
            headers: { Accept: "application/json" }
          }).then((r) => r.ok ? r.json() : Promise.reject(new Error(`${r.status}`))).then((j) => ({ unit: u, busy: j.busy ?? [], fallback: !!j.fallback })).catch(() => ({ unit: u, busy: [], fallback: true }))
        )
      );
      setAvailCache((prev) => {
        const next = { ...prev };
        for (const r of results) next[`${targetDate}|${r.unit}`] = r.busy;
        return next;
      });
      return results.some((r) => r.fallback);
    },
    [availCache]
  );
  useEffect(() => {
    if (!date) return;
    let cancelled = false;
    setAvailabilityLoading(true);
    fetchAvailability(date, ALL_UNITS).then((hadFallback) => {
      if (!cancelled) setAvailabilityFailed(hadFallback);
    }).finally(() => {
      if (!cancelled) setAvailabilityLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [date]);
  const isUnitSlotBlocked = useCallback(
    (unitId, targetDate, slotTime) => {
      if (availabilityFailed) return false;
      const busyList = availCache[`${targetDate}|${unitId}`];
      if (!busyList) return false;
      const dur = DURATION_BY_CATEGORY[category];
      const slotStart = `${targetDate}T${slotTime}`;
      const slotEnd = addMinutesNaiveIso(slotStart, dur);
      return busyList.some((b) => slotStart < b.endISO && slotEnd > b.startISO);
    },
    [category, availCache, availabilityFailed]
  );
  const isSlotBlocked = useCallback(
    (slotTime) => {
      if (!date) return false;
      if (jetskiId === "any") {
        return ALL_UNITS.every((u) => isUnitSlotBlocked(u, date, slotTime));
      }
      return isUnitSlotBlocked(jetskiId, date, slotTime);
    },
    [date, jetskiId, isUnitSlotBlocked]
  );
  const currentSlotBlocked = isSlotBlocked(time);
  const [alternatives, setAlternatives] = useState({ altJetski: null, altTime: null, altDate: null });
  useEffect(() => {
    if (!date || !currentSlotBlocked) return;
    const futureDates = [1, 2, 3].map((delta) => addDaysIso(date, delta));
    let cancelled = false;
    Promise.all(futureDates.map((d) => fetchAvailability(d, ALL_UNITS))).then(() => {
      if (cancelled) return;
    });
    return () => {
      cancelled = true;
    };
  }, [date, currentSlotBlocked]);
  useEffect(() => {
    if (!date || !currentSlotBlocked) {
      setAlternatives({ altJetski: null, altTime: null, altDate: null });
      return;
    }
    let altJetski = null;
    if (jetskiId !== "any") {
      for (const u of ALL_UNITS) {
        if (u === jetskiId) continue;
        if (!isUnitSlotBlocked(u, date, time)) {
          const j = jetskis.find((jj) => jj.id === u);
          if (j) {
            altJetski = { unitId: u, unitName: j.name };
            break;
          }
        }
      }
    }
    let altTime = null;
    const unitForTimeCheck = jetskiId === "any" ? ALL_UNITS[0] : jetskiId;
    for (const t of TIME_SLOTS) {
      if (t === time) continue;
      const blocked = jetskiId === "any" ? ALL_UNITS.every((u) => isUnitSlotBlocked(u, date, t)) : isUnitSlotBlocked(unitForTimeCheck, date, t);
      if (!blocked) {
        altTime = t;
        break;
      }
    }
    let altDate = null;
    for (const delta of [1, 2, 3]) {
      const d = addDaysIso(date, delta);
      const blocked = jetskiId === "any" ? ALL_UNITS.every((u) => isUnitSlotBlocked(u, d, time)) : isUnitSlotBlocked(unitForTimeCheck, d, time);
      const cacheKey = `${d}|${unitForTimeCheck}`;
      if (cacheKey in availCache && !blocked) {
        altDate = d;
        break;
      }
    }
    setAlternatives({ altJetski, altTime, altDate });
  }, [date, time, jetskiId, currentSlotBlocked, availCache, isUnitSlotBlocked]);
  const nextFreeSlot = alternatives.altTime;
  function validateStep(step) {
    const errs = [];
    if (step === 1) {
      if (!date) errs.push("Please choose a date.");
      if (date && currentSlotBlocked) {
        errs.push(
          nextFreeSlot ? `This slot is already booked. Next free slot: ${nextFreeSlot}.` : "This slot is already fully booked for the chosen jetski. Please pick another date or jetski."
        );
      }
    }
    if (step === 2) {
      if (!hasLicence) errs.push("Please indicate whether you hold a boating licence.");
    }
    if (step === 3) {
      if (!firstName.trim() || !lastName.trim()) errs.push("Please enter your full name.");
      if (!dob) errs.push("Please enter your date of birth.");
      else {
        const age = (Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 3600 * 1e3);
        if (age < 18) errs.push("Driver must be at least 18 years old.");
      }
      if (!email.trim()) errs.push("Email is required for booking confirmation.");
      if (!phone.trim()) errs.push("Phone / WhatsApp is required (Greek Port Police requirement).");
      if (!nationality.trim()) errs.push("Nationality is required (Port Police).");
      if (wantsInvoice && (!street.trim() || !postalCode.trim() || !city.trim() || !country.trim()))
        errs.push("Billing address is required when requesting an invoice with VAT.");
    }
    if (step === 5) {
      if (!acceptPrivacy || !acceptTerms || !acceptWaiver)
        errs.push("All three consent checkboxes are mandatory.");
    }
    return errs;
  }
  const handleContinue = () => {
    const errs = validateStep(currentStep);
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
    }
  };
  const handleBack = () => {
    setErrors([]);
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const allErrs = [
      ...validateStep(1),
      ...validateStep(2),
      ...validateStep(3),
      ...validateStep(5)
    ];
    if (allErrs.length) {
      setErrors(allErrs);
      return;
    }
    setErrors([]);
    const cat = selectedCategory.label;
    const total = totalEstimate !== null ? `€${totalEstimate}` : "on request";
    const dep = deposit !== null ? `€${deposit}` : "on request";
    const jetLabel = jetskiId === "any" ? "Any available" : jetskis.find((j) => j.id === jetskiId)?.name ?? jetskiId;
    const lines = [
      "*New Booking Request - Nero Lefkada*",
      "",
      `*Activity:* ${cat}`,
      `*Jetski:* ${jetLabel}`,
      `*Date/Time:* ${date} · ${time}`,
      `*Persons:* ${persons}`,
      "",
      "*Customer:*",
      `${firstName} ${lastName} (${dob}, ${nationality})`,
      `Email: ${email}`,
      `Phone/WhatsApp: ${phone}`,
      ...wantsInvoice ? [`Address (invoice): ${street}, ${postalCode} ${city}, ${country}`] : [],
      `Invoice requested: ${wantsInvoice ? "YES (VAT invoice)" : "NO (simple receipt at dock)"}`,
      `Boating licence: ${hasLicence === "yes" ? "YES, solo rental OK" : "NO, guided tour with David only"}`,
      "",
      `*Estimated total:* ${total} (${category === "towable" ? "per person x " + persons : "flat rate"})`,
      `*Deposit (30%):* ${dep}`,
      "",
      "Customer has accepted: Privacy · Terms · Waiver (online timestamp logged)."
    ];
    const msg = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/306955612777?text=${msg}`, "_blank");
    setSubmitted(true);
  };
  if (submitted) {
    return /* @__PURE__ */ jsxs("div", { style: styles.successCard, children: [
      /* @__PURE__ */ jsx("div", { style: styles.successIcon, children: "✓" }),
      /* @__PURE__ */ jsx("h3", { style: styles.successTitle, children: "Request sent." }),
      /* @__PURE__ */ jsx("p", { style: styles.successText, children: "A WhatsApp draft to David has opened. Send it to receive a price confirmation and deposit payment link. Usually answered within the hour." }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
        setSubmitted(false);
        setCurrentStep(1);
      }, style: styles.secondaryBtn, children: "Make another booking" })
    ] });
  }
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, style: styles.form, className: "p-5 sm:p-8", noValidate: true, children: [
    /* @__PURE__ */ jsxs("div", { style: styles.progressWrap, children: [
      /* @__PURE__ */ jsx("div", { style: styles.dots, children: Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const n = i + 1;
        const isCurrent = n === currentStep;
        const isDone = n < currentStep;
        return /* @__PURE__ */ jsx(
          "span",
          {
            style: {
              ...styles.dot,
              ...isDone ? styles.dotDone : {},
              ...isCurrent ? styles.dotCurrent : {}
            },
            "aria-label": `Step ${n} ${isDone ? "completed" : isCurrent ? "current" : "upcoming"}`
          },
          n
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { style: styles.progressLabel, children: [
        "Step ",
        currentStep,
        " of ",
        TOTAL_STEPS,
        " · ",
        STEP_LABELS[currentStep - 1]
      ] })
    ] }),
    errors.length > 0 && /* @__PURE__ */ jsxs("div", { style: styles.errorBox, children: [
      /* @__PURE__ */ jsx("strong", { children: "Please fix before continuing:" }),
      /* @__PURE__ */ jsx("ul", { style: { margin: "8px 0 0 20px" }, children: errors.map((err, i) => /* @__PURE__ */ jsx("li", { children: err }, i)) })
    ] }),
    currentStep === 1 && /* @__PURE__ */ jsxs("section", { style: styles.section, children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "Category" }),
          /* @__PURE__ */ jsx("select", { value: category, onChange: (e) => setCategory(e.target.value), style: styles.select, children: CATEGORIES.map((c) => /* @__PURE__ */ jsxs("option", { value: c.id, children: [
            c.label,
            " · ",
            priceLabel(c.price),
            c.note ? ` (${c.note})` : ""
          ] }, c.id)) })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "Jetski preference" }),
          /* @__PURE__ */ jsxs("select", { value: jetskiId, onChange: (e) => setJetskiId(e.target.value), style: styles.select, children: [
            /* @__PURE__ */ jsx("option", { value: "any", children: "Any available" }),
            jetskis.map((j) => {
              const blocked = date ? isUnitSlotBlocked(j.id, date, time) : false;
              return /* @__PURE__ */ jsxs("option", { value: j.id, disabled: blocked, style: blocked ? { color: "#bbb", textDecoration: "line-through" } : {}, children: [
                j.name,
                " · ",
                j.hp,
                " HP · ",
                j.topSpeed,
                " km/h",
                blocked ? " — booked" : ""
              ] }, j.id);
            })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "Date" }),
          /* @__PURE__ */ jsx("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value), style: styles.input, required: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
          /* @__PURE__ */ jsxs("span", { style: styles.fieldLabel, children: [
            "Time",
            availabilityLoading && /* @__PURE__ */ jsx("span", { style: { marginLeft: 8, fontSize: "0.75rem", color: "#6b7a8d" }, children: "checking availability..." })
          ] }),
          /* @__PURE__ */ jsx("select", { value: time, onChange: (e) => setTime(e.target.value), style: styles.select, children: TIME_SLOTS.map((t) => {
            const blocked = isSlotBlocked(t);
            return /* @__PURE__ */ jsxs("option", { value: t, disabled: blocked, style: blocked ? { color: "#bbb", textDecoration: "line-through" } : {}, children: [
              t,
              blocked ? " — booked" : ""
            ] }, t);
          }) }),
          date && !currentSlotBlocked && availabilityFailed && /* @__PURE__ */ jsx("small", { style: { ...styles.hint, marginTop: 4 }, children: "Live availability check unavailable - we'll confirm manually via WhatsApp." })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "Persons on board" }),
          /* @__PURE__ */ jsx("input", { type: "number", min: 1, max: 3, value: persons, onChange: handlePersonsChange, style: styles.input }),
          /* @__PURE__ */ jsx("small", { style: styles.hint, children: "*3-seater, but 2 persons recommended for comfort & performance." })
        ] })
      ] }),
      date && currentSlotBlocked && /* @__PURE__ */ jsxs("div", { style: {
        marginTop: "1rem",
        padding: "1rem 1.25rem",
        background: "#fff5f2",
        border: "1px solid #ffc4b3",
        borderLeft: "4px solid #ff5a36",
        borderRadius: "8px"
      }, children: [
        /* @__PURE__ */ jsx("strong", { style: { color: "#c0392b", display: "block", marginBottom: "0.5rem" }, children: "This slot is already booked." }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "0.88rem", color: "#5a3f14", margin: "0 0 0.75rem" }, children: "Pick one of the free alternatives below:" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem" }, children: [
          alternatives.altJetski && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setJetskiId(alternatives.altJetski.unitId),
              style: styles.altBtn,
              children: [
                /* @__PURE__ */ jsx("strong", { children: "Another jetski:" }),
                " ",
                alternatives.altJetski.unitName,
                " is free at ",
                time,
                " on ",
                formatDateLabel(date)
              ]
            }
          ),
          alternatives.altTime && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setTime(alternatives.altTime),
              style: styles.altBtn,
              children: [
                /* @__PURE__ */ jsx("strong", { children: "Another time:" }),
                " ",
                alternatives.altTime,
                " on ",
                formatDateLabel(date),
                " is free",
                jetskiId !== "any" ? ` for ${jetskis.find((j) => j.id === jetskiId)?.name}` : ""
              ]
            }
          ),
          alternatives.altDate && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setDate(alternatives.altDate),
              style: styles.altBtn,
              children: [
                /* @__PURE__ */ jsx("strong", { children: "Another day:" }),
                " ",
                formatDateLabel(alternatives.altDate),
                " at ",
                time,
                " is free",
                jetskiId !== "any" ? ` for ${jetskis.find((j) => j.id === jetskiId)?.name}` : ""
              ]
            }
          ),
          !alternatives.altJetski && !alternatives.altTime && !alternatives.altDate && /* @__PURE__ */ jsxs("p", { style: { fontSize: "0.85rem", color: "#6b7a8d", margin: 0, fontStyle: "italic" }, children: [
            "No quick alternatives found in the next 3 days. Try another date or WhatsApp David: ",
            /* @__PURE__ */ jsx("a", { href: "https://wa.me/306955612777", style: { color: "#00b3a7" }, children: "+30 695 561 2777" })
          ] })
        ] })
      ] })
    ] }),
    currentStep === 2 && /* @__PURE__ */ jsxs("section", { style: styles.section, children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("label", { style: { ...styles.radioCard, ...hasLicence === "yes" ? styles.radioCardActive : {} }, children: [
          /* @__PURE__ */ jsx("input", { type: "radio", name: "licence", value: "yes", checked: hasLicence === "yes", onChange: () => setHasLicence("yes"), style: styles.radio }),
          /* @__PURE__ */ jsx("span", { style: styles.radioTitle, children: "Yes, I have a licence" }),
          /* @__PURE__ */ jsx("span", { style: styles.radioSub, children: "You can operate solo within the rules." })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: { ...styles.radioCard, ...hasLicence === "no" ? styles.radioCardActive : {} }, children: [
          /* @__PURE__ */ jsx("input", { type: "radio", name: "licence", value: "no", checked: hasLicence === "no", onChange: () => setHasLicence("no"), style: styles.radio }),
          /* @__PURE__ */ jsx("span", { style: styles.radioTitle, children: "No licence" }),
          /* @__PURE__ */ jsx("span", { style: styles.radioSub, children: "Guided tour with David only. You still drive, he stays close." })
        ] })
      ] }),
      hasLicence === "no" && /* @__PURE__ */ jsxs("div", { style: styles.info, children: [
        /* @__PURE__ */ jsx("strong", { children: "Good news:" }),
        " Without a licence, you still get the full Nero experience. David will guide your ride personally, staying close to ensure safety. You drive the jetski yourself. He just makes sure you stay within the rules."
      ] }),
      licenceWarningNeeded && /* @__PURE__ */ jsxs("div", { style: styles.warn, children: [
        /* @__PURE__ */ jsx("strong", { children: "Heads up:" }),
        " VIP Delivery and longer rentals normally assume a licence. Since you don't have one, David will contact you to arrange a guided version."
      ] })
    ] }),
    currentStep === 3 && /* @__PURE__ */ jsxs("section", { style: styles.section, children: [
      /* @__PURE__ */ jsx("p", { style: styles.sectionHint, children: "Required for booking confirmation and Greek Port Police (Λιμεναρχείο) registration." }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "First name *" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: firstName, onChange: (e) => setFirstName(e.target.value), style: styles.input, autoComplete: "given-name", required: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "Last name *" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: lastName, onChange: (e) => setLastName(e.target.value), style: styles.input, autoComplete: "family-name", required: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "Date of birth * (must be 18+)" }),
          /* @__PURE__ */ jsx("input", { type: "date", value: dob, onChange: (e) => setDob(e.target.value), style: styles.input, autoComplete: "bday", required: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "Nationality *" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: nationality, onChange: (e) => setNationality(e.target.value), placeholder: "e.g. German", style: styles.input, required: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "Email *" }),
          /* @__PURE__ */ jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), style: styles.input, autoComplete: "email", required: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "Phone / WhatsApp *" }),
          /* @__PURE__ */ jsx("input", { type: "tel", value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "+49 ...", style: styles.input, autoComplete: "tel", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { style: { ...styles.consent, marginTop: 16 }, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: wantsInvoice,
            onChange: (e) => setWantsInvoice(e.target.checked),
            style: styles.checkbox
          }
        ),
        /* @__PURE__ */ jsx("span", { children: "I need a full VAT invoice for my company (requires billing address). Without this, you get a simple receipt at the dock." })
      ] }),
      wantsInvoice && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4", children: [
        /* @__PURE__ */ jsxs("label", { style: styles.field, className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "Street & number *" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: street, onChange: (e) => setStreet(e.target.value), style: styles.input, autoComplete: "street-address", required: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "Postal code *" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: postalCode, onChange: (e) => setPostalCode(e.target.value), style: styles.input, autoComplete: "postal-code", required: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: styles.field, children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "City *" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: city, onChange: (e) => setCity(e.target.value), style: styles.input, autoComplete: "address-level2", required: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { style: styles.field, className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsx("span", { style: styles.fieldLabel, children: "Country *" }),
          /* @__PURE__ */ jsx("input", { type: "text", value: country, onChange: (e) => setCountry(e.target.value), style: styles.input, autoComplete: "country-name", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { style: styles.infoSubtle, children: "Photo ID (passport or national ID card) will be verified at the dock before departure. Not required online." })
    ] }),
    currentStep === 4 && /* @__PURE__ */ jsx("section", { style: styles.section, children: /* @__PURE__ */ jsxs("div", { style: styles.priceBox, children: [
      /* @__PURE__ */ jsxs("div", { style: styles.priceRow, children: [
        /* @__PURE__ */ jsx("span", { children: selectedCategory.label }),
        /* @__PURE__ */ jsxs("strong", { children: [
          priceLabel(selectedCategory.price),
          category === "towable" ? ` × ${persons}` : ""
        ] })
      ] }),
      totalEstimate !== null && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { style: { ...styles.priceRow, borderTop: "1px solid #e8e4da", paddingTop: 10, marginTop: 10, color: "#6b7a8d", fontSize: "0.85rem" }, children: [
          /* @__PURE__ */ jsx("span", { children: "Net" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "€",
            netFromGross(totalEstimate).toFixed(2).replace(".", ",")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { ...styles.priceRow, color: "#6b7a8d", fontSize: "0.85rem" }, children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "VAT (",
            Math.round(VAT_RATE * 100),
            "%)"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            "€",
            vatFromGross(totalEstimate).toFixed(2).replace(".", ",")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { ...styles.priceRow, borderTop: "1px solid #e8e4da", paddingTop: 10, marginTop: 10 }, children: [
          /* @__PURE__ */ jsx("span", { children: "Total (incl. VAT)" }),
          /* @__PURE__ */ jsxs("strong", { style: { fontSize: "1.3rem" }, children: [
            "€",
            totalEstimate
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.priceRow, children: [
          /* @__PURE__ */ jsx("span", { children: "Deposit online (30%)" }),
          /* @__PURE__ */ jsxs("strong", { style: { color: "#ff5a36" }, children: [
            "€",
            deposit
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.priceRow, children: [
          /* @__PURE__ */ jsx("span", { style: { color: "#6b7a8d", fontSize: "0.85rem" }, children: "Remaining at dock" }),
          /* @__PURE__ */ jsxs("span", { style: { color: "#6b7a8d" }, children: [
            "€",
            totalEstimate - deposit
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.priceNote, children: [
        "*without fuel. Fuel billed separately at end of rental.",
        category.startsWith("vip") && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("br", {}),
          "*VIP Delivery requires €1,500 deposit (refundable)."
        ] })
      ] })
    ] }) }),
    currentStep === 5 && /* @__PURE__ */ jsxs("section", { style: styles.section, children: [
      /* @__PURE__ */ jsxs("label", { style: styles.consent, children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: acceptPrivacy, onChange: (e) => setAcceptPrivacy(e.target.checked), style: styles.checkbox }),
        /* @__PURE__ */ jsxs("span", { children: [
          "I have read and accept the ",
          /* @__PURE__ */ jsx("a", { href: "/privacy", target: "_blank", rel: "noopener", style: styles.consentLink, onClick: (e) => e.stopPropagation(), children: "Privacy Policy" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { style: styles.consent, children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: acceptTerms, onChange: (e) => setAcceptTerms(e.target.checked), style: styles.checkbox }),
        /* @__PURE__ */ jsxs("span", { children: [
          "I have read and accept the ",
          /* @__PURE__ */ jsx("a", { href: "/terms", target: "_blank", rel: "noopener", style: styles.consentLink, onClick: (e) => e.stopPropagation(), children: "Terms & Conditions" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { style: styles.consent, children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: acceptWaiver, onChange: (e) => setAcceptWaiver(e.target.checked), style: styles.checkbox }),
        /* @__PURE__ */ jsxs("span", { children: [
          "I have read, understood and accept the ",
          /* @__PURE__ */ jsx("a", { href: "/waiver", target: "_blank", rel: "noopener", style: styles.consentLink, onClick: (e) => e.stopPropagation(), children: "Liability Waiver" }),
          ", including the acknowledged risks and my personal responsibility on the water."
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { style: styles.footNote, children: "On submit, a pre-filled WhatsApp message opens. David confirms availability and sends the Viva Wallet deposit link within the hour. Your timestamp, IP and checkbox states are logged as proof of consent." })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: styles.navRow, children: [
      currentStep > 1 ? /* @__PURE__ */ jsxs("button", { type: "button", onClick: handleBack, style: styles.backBtn, children: [
        /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M19 12H5M11 19l-7-7 7-7" }) }),
        "Back"
      ] }) : /* @__PURE__ */ jsx("span", {}),
      currentStep < TOTAL_STEPS && /* @__PURE__ */ jsxs("button", { type: "button", onClick: handleContinue, style: styles.continueBtn, children: [
        "Continue",
        /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 5l7 7-7 7" }) })
      ] }),
      currentStep === TOTAL_STEPS && /* @__PURE__ */ jsxs("button", { type: "submit", disabled: !allChecked, style: { ...styles.submitBtn, ...!allChecked ? styles.submitBtnDisabled : {} }, children: [
        allChecked ? "Request booking & pay 30% deposit" : "Tick all three boxes to continue",
        /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M13 5l7 7-7 7" }) })
      ] })
    ] })
  ] });
}
const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.75rem",
    background: "rgba(253,251,244,0.04)",
    border: "1px solid rgba(253,251,244,0.15)",
    borderRadius: 24,
    color: "#fdfbf4"
  },
  altBtn: {
    textAlign: "left",
    padding: "0.65rem 0.9rem",
    borderRadius: 8,
    border: "1px solid #ffc4b3",
    background: "#fff",
    color: "#2a3a4a",
    fontSize: "0.88rem",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  progressWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid rgba(253,251,244,0.1)"
  },
  dots: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "rgba(253,251,244,0.2)",
    transition: "background 0.3s, transform 0.3s"
  },
  dotCurrent: {
    background: "#ffc233",
    transform: "scale(1.35)",
    boxShadow: "0 0 0 4px rgba(255,194,51,0.18)"
  },
  dotDone: {
    background: "#00b3a7"
  },
  progressLabel: {
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "0.72rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(253,251,244,0.85)"
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem"
  },
  sectionHint: {
    fontSize: "0.85rem",
    color: "rgba(253,251,244,0.6)",
    marginTop: "-0.25rem",
    marginBottom: "0.5rem"
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    fontSize: "0.92rem"
  },
  fieldLabel: {
    fontSize: "0.78rem",
    color: "rgba(253,251,244,0.75)",
    letterSpacing: "0.02em"
  },
  input: {
    padding: "0.7rem 0.9rem",
    background: "rgba(7,29,48,0.5)",
    border: "1px solid rgba(253,251,244,0.15)",
    borderRadius: 10,
    color: "#fdfbf4",
    fontSize: "0.95rem",
    fontFamily: "inherit"
  },
  select: {
    padding: "0.7rem 0.9rem",
    background: "rgba(7,29,48,0.5)",
    border: "1px solid rgba(253,251,244,0.15)",
    borderRadius: 10,
    color: "#fdfbf4",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    appearance: "none",
    WebkitAppearance: "none"
  },
  hint: {
    fontSize: "0.75rem",
    color: "rgba(253,251,244,0.55)",
    marginTop: "0.25rem"
  },
  radioCard: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    padding: "1rem 1.1rem",
    background: "rgba(7,29,48,0.5)",
    border: "1.5px solid rgba(253,251,244,0.15)",
    borderRadius: 14,
    cursor: "pointer",
    transition: "border 0.2s, background 0.2s"
  },
  radioCardActive: {
    borderColor: "#ffc233",
    background: "rgba(255,194,51,0.08)"
  },
  radio: {
    position: "absolute",
    opacity: 0,
    pointerEvents: "none"
  },
  radioTitle: {
    fontWeight: 600,
    fontSize: "0.95rem",
    color: "#fdfbf4"
  },
  radioSub: {
    fontSize: "0.82rem",
    color: "rgba(253,251,244,0.65)"
  },
  info: {
    padding: "0.9rem 1.1rem",
    background: "rgba(0,179,167,0.08)",
    borderLeft: "3px solid #00b3a7",
    borderRadius: "0 10px 10px 0",
    fontSize: "0.88rem",
    color: "rgba(253,251,244,0.85)"
  },
  warn: {
    padding: "0.9rem 1.1rem",
    background: "rgba(255,90,54,0.1)",
    borderLeft: "3px solid #ff5a36",
    borderRadius: "0 10px 10px 0",
    fontSize: "0.88rem",
    color: "rgba(253,251,244,0.9)"
  },
  infoSubtle: {
    fontSize: "0.78rem",
    color: "rgba(253,251,244,0.5)",
    fontStyle: "italic",
    marginTop: "0.5rem"
  },
  priceBox: {
    padding: "1.25rem 1.5rem",
    background: "rgba(255,194,51,0.06)",
    border: "1px solid rgba(255,194,51,0.25)",
    borderRadius: 14
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "0.35rem 0",
    fontSize: "0.92rem"
  },
  priceNote: {
    marginTop: "0.75rem",
    fontSize: "0.78rem",
    color: "rgba(253,251,244,0.55)",
    fontStyle: "italic"
  },
  consent: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "flex-start",
    padding: "0.9rem 1.1rem",
    background: "rgba(253,251,244,0.04)",
    border: "1px solid rgba(253,251,244,0.12)",
    borderRadius: 10,
    fontSize: "0.9rem",
    lineHeight: 1.6,
    cursor: "pointer"
  },
  consentLink: {
    color: "#00b3a7",
    textDecoration: "underline",
    fontWeight: 500
  },
  checkbox: {
    marginTop: "0.15rem",
    width: 18,
    height: 18,
    accentColor: "#ffc233",
    cursor: "pointer"
  },
  errorBox: {
    padding: "1rem 1.25rem",
    background: "rgba(255,90,54,0.12)",
    borderLeft: "3px solid #ff5a36",
    borderRadius: "0 10px 10px 0",
    fontSize: "0.88rem",
    color: "#fff"
  },
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    paddingTop: "0.5rem",
    borderTop: "1px solid rgba(253,251,244,0.1)"
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.25rem",
    background: "transparent",
    color: "rgba(253,251,244,0.8)",
    border: "1.5px solid rgba(253,251,244,0.25)",
    borderRadius: 9999,
    fontFamily: "inherit",
    fontSize: "0.88rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.2s, border 0.2s"
  },
  continueBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.85rem 1.5rem",
    background: "#ffc233",
    color: "#071d30",
    border: "none",
    borderRadius: 9999,
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: "0.92rem",
    letterSpacing: "0.02em",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s"
  },
  submitBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.6rem",
    padding: "1rem 1.5rem",
    background: "#ffc233",
    color: "#071d30",
    border: "none",
    borderRadius: 9999,
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: "0.92rem",
    letterSpacing: "0.02em",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s"
  },
  submitBtnDisabled: {
    opacity: 0.45,
    cursor: "not-allowed",
    background: "rgba(253,251,244,0.25)",
    color: "rgba(253,251,244,0.7)"
  },
  footNote: {
    fontSize: "0.78rem",
    color: "rgba(253,251,244,0.55)",
    textAlign: "center",
    lineHeight: 1.6,
    marginTop: "0.5rem"
  },
  successCard: {
    padding: "3rem 2rem",
    background: "rgba(0,179,167,0.08)",
    border: "1px solid rgba(0,179,167,0.3)",
    borderRadius: 24,
    textAlign: "center",
    color: "#fdfbf4"
  },
  successIcon: {
    width: 64,
    height: 64,
    margin: "0 auto 1rem",
    borderRadius: "50%",
    background: "#00b3a7",
    color: "#071d30",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: 700
  },
  successTitle: {
    fontFamily: "Fraunces Variable, Georgia, serif",
    fontSize: "2rem",
    fontWeight: 400,
    margin: "0 0 0.75rem"
  },
  successText: {
    fontSize: "1rem",
    color: "rgba(253,251,244,0.8)",
    maxWidth: 480,
    margin: "0 auto 1.5rem",
    lineHeight: 1.6
  },
  secondaryBtn: {
    padding: "0.7rem 1.3rem",
    background: "transparent",
    color: "#fdfbf4",
    border: "1.5px solid rgba(253,251,244,0.3)",
    borderRadius: 9999,
    fontFamily: "inherit",
    fontSize: "0.9rem",
    cursor: "pointer"
  }
};

const WHATSAPP_BASE = "https://wa.me/306955612777?text=";
const UI = {
  en: {
    eyebrow: "Price calculator",
    title: "Find your price.",
    yourJetski: "Your jetski",
    service: "Service",
    duration: "Duration",
    tube: "Tube",
    persons: "Persons",
    seats: "seats",
    onRequest: "On request",
    quoteHint: "WhatsApp David for a quote.",
    vatIncl: (vat, amount) => `incl. ${vat}% VAT · €${amount}`,
    depositHint: (deposit) => `Note: VIP Delivery requires a €${deposit} security deposit. Fuel not included.`,
    btn: "WhatsApp David to book",
    categories: { beach: "Beach Rides", exclusive: "Exclusive", delivery: "VIP Delivery", waterFun: "Water Fun" },
    durations: {
      min10: "10 min",
      min15: "15 min (BEST)",
      min20: "20 min",
      min30: "30 min",
      min60: "60 min (BESTSELLER)",
      sunset: "Sunset Ride (30 min)",
      couple: "Couple Ride (30 min)",
      hour1: "1 hour",
      halfDay4h: "Half Day (4h)",
      fullDay8h: "Full Day (8h)",
      week: "Full week",
      tube: "3-seat tube · 10 min (Great Big Mable)"
    }
  },
  de: {
    eyebrow: "Preisrechner",
    title: "Finde Deinen Preis.",
    yourJetski: "Dein Jetski",
    service: "Service",
    duration: "Dauer",
    tube: "Tube",
    persons: "Personen",
    seats: "Sitze",
    onRequest: "Auf Anfrage",
    quoteHint: "WhatsApp David für ein Angebot.",
    vatIncl: (vat, amount) => `inkl. ${vat}% MwSt · €${amount}`,
    depositHint: (deposit) => `Hinweis: VIP-Delivery benötigt €${deposit} Kaution. Treibstoff nicht inkludiert.`,
    btn: "Per WhatsApp buchen",
    categories: { beach: "Beach Rides", exclusive: "Exclusive", delivery: "VIP Delivery", waterFun: "Water Fun" },
    durations: {
      min10: "10 Min.",
      min15: "15 Min. (TOP)",
      min20: "20 Min.",
      min30: "30 Min.",
      min60: "60 Min. (BESTSELLER)",
      sunset: "Sunset-Ride (30 Min.)",
      couple: "Couple-Ride (30 Min.)",
      hour1: "1 Stunde",
      halfDay4h: "Halber Tag (4h)",
      fullDay8h: "Ganzer Tag (8h)",
      week: "Ganze Woche",
      tube: "3-Sitz-Tube · 10 Min. (Great Big Mable)"
    }
  },
  gr: {
    eyebrow: "Price calculator",
    title: "Find your price.",
    yourJetski: "Your jetski",
    service: "Service",
    duration: "Duration",
    tube: "Tube",
    persons: "Persons",
    seats: "seats",
    onRequest: "On request",
    quoteHint: "WhatsApp David for a quote.",
    vatIncl: (vat, amount) => `incl. ${vat}% VAT · €${amount}`,
    depositHint: (deposit) => `Note: VIP Delivery requires a €${deposit} security deposit. Fuel not included.`,
    btn: "WhatsApp David to book",
    categories: { beach: "Beach Rides", exclusive: "Exclusive", delivery: "VIP Delivery", waterFun: "Water Fun" },
    durations: {
      min10: "10 min",
      min15: "15 min (BEST)",
      min20: "20 min",
      min30: "30 min",
      min60: "60 min (BESTSELLER)",
      sunset: "Sunset Ride (30 min)",
      couple: "Couple Ride (30 min)",
      hour1: "1 hour",
      halfDay4h: "Half Day (4h)",
      fullDay8h: "Full Day (8h)",
      week: "Full week",
      tube: "3-seat tube · 10 min (Great Big Mable)"
    }
  }
};
function computePrice(jetski, category, option, persons) {
  if (category === "beach") {
    const map = {
      min10: "min10",
      min15: "min15",
      min20: "min20",
      min30: "min30",
      min60: "min60"
    };
    const key = map[option];
    const price = key ? jetski.beachRides[key] : null;
    const labels = {
      min10: "10 min",
      min15: "15 min",
      min20: "20 min",
      min30: "30 min",
      min60: "60 min"
    };
    return {
      price,
      unit: "",
      label: `${jetski.name} · Beach Ride ${labels[option]}`,
      whatsappMsg: `Hi David, I'd like to book a Beach Ride on the ${jetski.name} (${labels[option]}).`
    };
  }
  if (category === "exclusive") {
    if (option === "sunset") {
      return {
        price: jetski.exclusiveExperiences.sunsetRide30,
        unit: "",
        label: `${jetski.name} · Sunset Ride (30 min)`,
        whatsappMsg: `Hi David, I'd like to book a Sunset Ride on the ${jetski.name} (30 min).`
      };
    }
    if (option === "couple") {
      return {
        price: jetski.exclusiveExperiences.coupleRide30,
        unit: "",
        label: `${jetski.name} · Couple Ride (30 min)`,
        whatsappMsg: `Hi David, I'd like to book a Couple Ride on the ${jetski.name} (30 min).`
      };
    }
  }
  if (category === "delivery") {
    const map = {
      hour1: "hour1",
      halfDay4h: "halfDay4h",
      fullDay8h: "fullDay8h",
      week: "week"
    };
    const key = map[option];
    const rawVal = key ? jetski.vipDelivery[key] : null;
    const labels = {
      hour1: "1 hour",
      halfDay4h: "half day (4h)",
      fullDay8h: "full day (8h)",
      week: "full week"
    };
    if (rawVal === "onRequest") {
      return {
        price: null,
        unit: "",
        label: `${jetski.name} · VIP Delivery · ${labels[option]}`,
        whatsappMsg: `Hi David, I'd like a quote for a VIP Delivery booking (${jetski.name}, ${labels[option]}).`
      };
    }
    return {
      price: typeof rawVal === "number" ? rawVal : null,
      unit: "",
      label: `${jetski.name} · VIP Delivery · ${labels[option]}`,
      whatsappMsg: `Hi David, I'd like to book VIP Delivery on the ${jetski.name} (${labels[option]}).`
    };
  }
  if (category === "waterFun") {
    const perPerson = pricingExtras.towableWaterFun.pricePerPerson;
    const total = perPerson * Math.max(1, persons);
    return {
      price: total,
      unit: ` (${persons}× €${perPerson}/person)`,
      label: `Water Fun · ${persons} person${persons === 1 ? "" : "s"}`,
      whatsappMsg: `Hi David, I'd like to book Water Fun for ${persons} person${persons === 1 ? "" : "s"} (€${total} total).`
    };
  }
  return {
    price: null,
    unit: "",
    label: "",
    whatsappMsg: "Hi David, I'd like more info about your jetski options."
  };
}
function Calculator({ lang = "en" }) {
  const t = UI[lang];
  const [jetskiId, setJetskiId] = useState(jetskis[0].id);
  const [category, setCategory] = useState("beach");
  const [option, setOption] = useState("min30");
  const [persons, setPersons] = useState(2);
  const jetski = jetskis.find((j) => j.id === jetskiId) ?? jetskis[0];
  const optionSets = {
    beach: [
      { value: "min10", label: t.durations.min10 },
      { value: "min15", label: t.durations.min15 },
      { value: "min20", label: t.durations.min20 },
      { value: "min30", label: t.durations.min30 },
      { value: "min60", label: t.durations.min60 }
    ],
    exclusive: [
      { value: "sunset", label: t.durations.sunset },
      { value: "couple", label: t.durations.couple }
    ],
    delivery: [
      { value: "hour1", label: t.durations.hour1 },
      { value: "halfDay4h", label: t.durations.halfDay4h },
      { value: "fullDay8h", label: t.durations.fullDay8h },
      { value: "week", label: t.durations.week }
    ],
    waterFun: [{ value: "tube", label: t.durations.tube }]
  };
  const result = useMemo(
    () => computePrice(jetski, category, option, persons),
    [jetski, category, option, persons]
  );
  const handleCategoryChange = (c) => {
    setCategory(c);
    setOption(optionSets[c][0].value);
  };
  const depositDelivery = pricingExtras.depositDelivery;
  const showDepositHint = category === "delivery";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-2xl border p-5 sm:p-8 lg:p-10",
      style: {
        borderColor: "rgba(253,251,244,0.15)",
        background: "rgba(253,251,244,0.04)"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "v2-eyebrow mb-3",
            style: { color: "var(--v2-sun-400)" },
            children: /* @__PURE__ */ jsx("span", { children: t.eyebrow })
          }
        ),
        /* @__PURE__ */ jsx(
          "h3",
          {
            className: "font-display text-3xl lg:text-4xl mb-8",
            style: { color: "var(--v2-cream-50)" },
            children: t.title
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              className: "block text-xs uppercase tracking-[0.15em] mb-3",
              style: { color: "rgba(253,251,244,0.65)" },
              children: t.yourJetski
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: jetskis.map((j) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setJetskiId(j.id),
              className: `p-3 sm:p-4 rounded-xl border text-left transition-colors ${jetskiId === j.id ? "border-[var(--v2-sun-400)] bg-[rgba(255,194,51,0.1)]" : "border-white/15 hover:border-white/40"}`,
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "font-display text-lg sm:text-xl",
                    style: { color: "var(--v2-cream-50)" },
                    children: j.name
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "text-[10px] sm:text-xs mt-1 leading-tight",
                    style: { color: "rgba(253,251,244,0.65)" },
                    children: [
                      j.model,
                      " · ",
                      j.hp,
                      " HP · ",
                      j.seats,
                      " ",
                      t.seats
                    ]
                  }
                )
              ]
            },
            j.id
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              className: "block text-xs uppercase tracking-[0.15em] mb-3",
              style: { color: "rgba(253,251,244,0.65)" },
              children: t.service
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2", children: [
            { v: "beach", l: t.categories.beach },
            { v: "exclusive", l: t.categories.exclusive },
            { v: "delivery", l: t.categories.delivery },
            { v: "waterFun", l: t.categories.waterFun }
          ].map((c) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => handleCategoryChange(c.v),
              className: `px-3 py-2 rounded-lg text-sm transition-colors ${category === c.v ? "bg-[var(--v2-sun-400)] text-[var(--v2-ink-950)]" : "bg-white/5 text-white/70 hover:bg-white/10"}`,
              children: c.l
            },
            c.v
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              className: "block text-xs uppercase tracking-[0.15em] mb-3",
              style: { color: "rgba(253,251,244,0.65)" },
              children: category === "waterFun" ? t.tube : t.duration
            }
          ),
          /* @__PURE__ */ jsx(
            "select",
            {
              value: option,
              onChange: (e) => setOption(e.target.value),
              className: "w-full p-3 rounded-lg bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[var(--v2-sun-400)]",
              children: optionSets[category].map((o) => /* @__PURE__ */ jsx(
                "option",
                {
                  value: o.value,
                  style: { background: "var(--v2-ink-950)" },
                  children: o.label
                },
                o.value
              ))
            }
          )
        ] }),
        category === "waterFun" && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              className: "block text-xs uppercase tracking-[0.15em] mb-3",
              style: { color: "rgba(253,251,244,0.65)" },
              children: t.persons
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setPersons(Math.max(1, persons - 1)),
                className: "w-10 h-10 rounded-lg bg-white/5 border border-white/15 text-white hover:bg-white/10",
                "aria-label": "Minus",
                children: "−"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "text-2xl font-display min-w-[3rem] text-center",
                style: { color: "var(--v2-cream-50)" },
                children: persons
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setPersons(Math.min(6, persons + 1)),
                className: "w-10 h-10 rounded-lg bg-white/5 border border-white/15 text-white hover:bg-white/10",
                "aria-label": "Plus",
                children: "+"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "py-6 border-t border-white/15 mb-6", children: [
          result.price !== null ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "font-display text-5xl lg:text-6xl",
                style: { color: "var(--v2-sun-400)" },
                children: [
                  "€",
                  result.price,
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "text-base opacity-70 font-sans",
                      style: { color: "rgba(253,251,244,0.65)" },
                      children: result.unit
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "text-sm mt-2",
                style: { color: "rgba(253,251,244,0.65)" },
                children: result.label
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "text-xs mt-1 font-mono uppercase tracking-wider",
                style: { color: "rgba(253,251,244,0.45)" },
                children: t.vatIncl(Math.round(VAT_RATE * 100), vatFromGross(result.price).toFixed(2).replace(".", ","))
              }
            )
          ] }) : /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "font-display text-3xl lg:text-4xl italic",
                style: { color: "var(--v2-sun-400)" },
                children: t.onRequest
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "text-sm mt-2",
                style: { color: "rgba(253,251,244,0.65)" },
                children: t.quoteHint
              }
            )
          ] }),
          showDepositHint && /* @__PURE__ */ jsx(
            "div",
            {
              className: "text-xs mt-4 p-3 rounded-lg",
              style: {
                background: "rgba(255,194,51,0.08)",
                color: "rgba(253,251,244,0.8)"
              },
              children: t.depositHint(depositDelivery)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: WHATSAPP_BASE + encodeURIComponent(result.whatsappMsg),
            target: "_blank",
            rel: "noopener",
            className: "v2-btn w-full justify-center !px-3 sm:!px-8 !py-3 sm:!py-[1.1rem] !text-[11px] sm:!text-sm !gap-2 whitespace-normal text-center",
            style: {
              background: "var(--v2-sun-400)",
              color: "var(--v2-ink-950)"
            },
            "data-cro": "v2-calculator-whatsapp",
            children: [
              /* @__PURE__ */ jsx("span", { children: t.btn }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" })
                }
              )
            ]
          }
        )
      ]
    }
  );
}

const $$Booking2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Booking2;
  const lang = Astro2.props.lang ?? "en";
  const COPY = {
    en: {
      eyebrow: "Book your ride",
      titleLead: "Pick a date.",
      titleAccent: "We handle the rest.",
      calcEyebrow: "Step 1 · Quick price check",
      calcTitle: "Try the calculator.",
      calcAccent: "no booking yet.",
      formEyebrow: "Step 2 · Complete booking",
      formTitle: "Ready to book?",
      formAccent: "30% deposit online."
    },
    de: {
      eyebrow: "Buch Deine Fahrt",
      titleLead: "Wähl ein Datum.",
      titleAccent: "Den Rest machen wir.",
      calcEyebrow: "Schritt 1 · Schneller Preis-Check",
      calcTitle: "Probier den Rechner.",
      calcAccent: "noch keine Buchung.",
      formEyebrow: "Schritt 2 · Buchung abschließen",
      formTitle: "Bereit zu buchen?",
      formAccent: "30% Anzahlung online."
    },
    gr: {
      eyebrow: "Book your ride",
      titleLead: "Pick a date.",
      titleAccent: "We handle the rest.",
      calcEyebrow: "Step 1 · Quick price check",
      calcTitle: "Try the calculator.",
      calcAccent: "no booking yet.",
      formEyebrow: "Step 2 · Complete booking",
      formTitle: "Ready to book?",
      formAccent: "30% deposit online."
    }
  }[lang];
  return renderTemplate`${maybeRenderHead()}<section id="book" class="relative py-24 lg:py-32" style="background: var(--v2-ink-950);"> <div class="mx-auto max-w-[1600px] px-6 lg:px-12"> <div class="grid grid-cols-12 gap-6 mb-12"> <div class="col-span-12 lg:col-span-8"> <div class="v2-eyebrow mb-6" style="color: var(--v2-sun-400);"><span>${COPY.eyebrow}</span></div> <h2 class="v2-display text-5xl lg:text-[clamp(3.5rem,6vw,6.5rem)]" style="color: var(--v2-cream-50);"> ${COPY.titleLead}<br><em style="color: var(--v2-sun-400);">${COPY.titleAccent}</em> </h2> </div> </div> <!-- Price calculator: quick check without commitment --> <div id="calculator" class="mb-10 scroll-mt-24"> <div class="mb-4"> <div class="v2-eyebrow" style="color: var(--v2-sun-400);"><span>${COPY.calcEyebrow}</span></div> <h3 class="font-display text-2xl lg:text-3xl mt-2" style="color: var(--v2-cream-50);"> ${COPY.calcTitle} <em style="color: var(--v2-sun-400);">${COPY.calcAccent}</em> </h3> </div> ${renderComponent($$result, "Calculator", Calculator, { "lang": lang, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "C:/Users/User/jetski-LIVE/src/components/Calculator.tsx", "client:component-export": "default" })} </div> ${renderTemplate`<!-- Full booking form: contact, billing, licence gate, 30% deposit, 3 consents -->
      <div id="booking-form" class="scroll-mt-24"> <div class="mb-4"> <div class="v2-eyebrow" style="color: var(--v2-sun-400);"><span>${COPY.formEyebrow}</span></div> <h3 class="font-display text-2xl lg:text-3xl mt-2" style="color: var(--v2-cream-50);"> ${COPY.formTitle} <em style="color: var(--v2-sun-400);">${COPY.formAccent}</em> </h3> </div> ${renderComponent($$result, "BookingForm", BookingForm, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "C:/Users/User/jetski-LIVE/src/components/BookingForm.tsx", "client:component-export": "default" })} </div>`} </div> </section>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/Booking2.astro", void 0);

const $$CtaFinal2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CtaFinal2;
  const lang = Astro2.props.lang ?? "en";
  const COPY = {
    en: {
      eyebrow: "Your summer starts here",
      titleLead: "See you",
      titleTail: "on the water.",
      body: "Four supercharged Sea-Doo jetskis. Six secret bays. David waiting at the dock. And a single afternoon that will hang in your camera roll forever.",
      ctaPrimary: "Book your jetski",
      ctaSecondary: "Chat with David",
      badges: ["Free cancel 48h", "30% deposit accepted", "Instant confirmation"]
    },
    de: {
      eyebrow: "Dein Sommer startet hier",
      titleLead: "Bis bald",
      titleTail: "auf dem Wasser.",
      body: "Vier supercharged Sea-Doo Jetskis. Sechs geheime Buchten. David wartet am Steg. Und ein Nachmittag, der für immer in Deinem Fotoalbum bleibt.",
      ctaPrimary: "Jetski buchen",
      ctaSecondary: "Mit David chatten",
      badges: ["Kostenlose Stornierung 48h", "30% Anzahlung akzeptiert", "Sofortige Bestätigung"]
    },
    gr: {
      eyebrow: "Your summer starts here",
      titleLead: "See you",
      titleTail: "on the water.",
      body: "Four supercharged Sea-Doo jetskis. Six secret bays. David waiting at the dock. And a single afternoon that will hang in your camera roll forever.",
      ctaPrimary: "Book your jetski",
      ctaSecondary: "Chat with David",
      badges: ["Free cancel 48h", "30% deposit accepted", "Instant confirmation"]
    }
  }[lang];
  return renderTemplate`${maybeRenderHead()}<section class="relative py-24 lg:py-40 overflow-hidden" style="background: var(--v2-cream-100);"> <!-- Decorative background: huge gradient circle + animated sun --> <div class="absolute inset-0 pointer-events-none"> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square rounded-full opacity-50" style="background: radial-gradient(circle, var(--v2-sun-300) 0%, transparent 55%);"></div> </div> <div class="relative mx-auto max-w-[1200px] px-6 lg:px-12 text-center"> <div class="v2-eyebrow mb-8 justify-center inline-flex"><span>${COPY.eyebrow}</span></div> <h2 class="v2-display text-6xl lg:text-[clamp(5rem,11vw,12rem)]"> <em class="v2-gradient-sun">${COPY.titleLead}</em><br> ${COPY.titleTail} </h2> <p class="mt-12 max-w-xl mx-auto text-lg lg:text-xl leading-relaxed" style="color: rgba(7,29,48,0.75);"> ${COPY.body} </p> <div class="mt-12 flex flex-wrap items-center justify-center gap-4"> <a href="#fleet" class="v2-btn" data-cro="v2-final-cta"> ${COPY.ctaPrimary} <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"> <path d="M5 12h14M13 5l7 7-7 7"></path> </svg> </a> <a href="https://wa.me/306955612777" target="_blank" rel="noopener" class="v2-btn-ghost"> ${COPY.ctaSecondary} </a> </div> <div class="mt-14 pt-8 border-t flex flex-wrap items-center justify-center gap-8 max-w-2xl mx-auto" style="border-color: rgba(7,29,48,0.15);"> ${COPY.badges.map((b) => renderTemplate`<div class="font-mono text-[10px] uppercase tracking-[0.18em]" style="color: rgba(7,29,48,0.6);">${b}</div>`)} </div> </div> </section>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/CtaFinal2.astro", void 0);

const $$Footer2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Footer2;
  const lang = Astro2.props.lang ?? "en";
  const COPY = {
    en: {
      tagline: "Fastest jetskis on the island. Four supercharged Sea-Doo jetskis: Nero Ena, Dio, Tria & Tessera. Fully licensed, built around the best day you can have on water.",
      scanToFollow: "Scan to follow",
      scanCaption: "Boats · Beach · Best of Lefkada",
      chatWhatsApp: "WhatsApp David",
      exploreHeading: "Explore",
      exploreLinks: [
        { href: "#fleet", label: "Fleet" },
        { href: "#how", label: "How it works" },
        { href: "#voices", label: "Reviews" },
        { href: "#faq", label: "FAQ" }
      ],
      legalHeading: "Legal",
      legalLinks: [
        { href: "/imprint", label: "Imprint" },
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
        { href: "/waiver", label: "Waiver" },
        { href: "/safety", label: "Safety" }
      ],
      hoursHeading: "Operating hours",
      hoursMonSun: "Mon to Sun",
      hoursEveryDay: "Every day",
      hoursEveryDayValue: "12 hours open",
      hoursSeason: "Season",
      hoursSeasonValue: "May - Oct",
      rightsReserved: "All rights reserved · Alle Rechte vorbehalten · Με επιφύλαξη παντός δικαιώματος",
      forNero: "For Nero Lefkada · Lygia, Lefkada"
    },
    de: {
      tagline: "Die schnellsten Jetskis der Insel. Vier supercharged Sea-Doo Jetskis: Nero Ena, Dio, Tria & Tessera. Vollständig lizenziert, gebaut für den besten Tag, den Du auf dem Wasser haben kannst.",
      scanToFollow: "Folge uns",
      scanCaption: "Boote · Strand · Bestes von Lefkada",
      chatWhatsApp: "WhatsApp David",
      exploreHeading: "Entdecken",
      exploreLinks: [
        { href: "#fleet", label: "Flotte" },
        { href: "#how", label: "So geht's" },
        { href: "#voices", label: "Bewertungen" },
        { href: "#faq", label: "FAQ" }
      ],
      legalHeading: "Rechtliches",
      legalLinks: [
        { href: "/imprint", label: "Impressum" },
        { href: "/privacy", label: "Datenschutz" },
        { href: "/terms", label: "AGB" },
        { href: "/waiver", label: "Haftungsausschluss" },
        { href: "/safety", label: "Sicherheit" }
      ],
      hoursHeading: "Öffnungszeiten",
      hoursMonSun: "Mo bis So",
      hoursEveryDay: "Täglich",
      hoursEveryDayValue: "12 Stunden offen",
      hoursSeason: "Saison",
      hoursSeasonValue: "Mai - Okt",
      rightsReserved: "Alle Rechte vorbehalten · All rights reserved · Με επιφύλαξη παντός δικαιώματος",
      forNero: "Für Nero Lefkada · Lygia, Lefkada"
    },
    gr: {
      tagline: "Fastest jetskis on the island. Four supercharged Sea-Doo jetskis: Nero Ena, Dio, Tria & Tessera. Fully licensed, built around the best day you can have on water.",
      scanToFollow: "Scan to follow",
      scanCaption: "Boats · Beach · Best of Lefkada",
      chatWhatsApp: "WhatsApp David",
      exploreHeading: "Explore",
      exploreLinks: [
        { href: "#fleet", label: "Fleet" },
        { href: "#how", label: "How it works" },
        { href: "#voices", label: "Reviews" },
        { href: "#faq", label: "FAQ" }
      ],
      legalHeading: "Legal",
      legalLinks: [
        { href: "/imprint", label: "Imprint" },
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
        { href: "/waiver", label: "Waiver" },
        { href: "/safety", label: "Safety" }
      ],
      hoursHeading: "Operating hours",
      hoursMonSun: "Mon to Sun",
      hoursEveryDay: "Every day",
      hoursEveryDayValue: "12 hours open",
      hoursSeason: "Season",
      hoursSeasonValue: "May - Oct",
      rightsReserved: "All rights reserved · Alle Rechte vorbehalten · Με επιφύλαξη παντός δικαιώματος",
      forNero: "For Nero Lefkada · Lygia, Lefkada"
    }
  }[lang];
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="relative py-16 border-t" style="background: var(--v2-ink-950); color: var(--v2-cream-50); border-color: var(--v2-ink-900);"> <div class="mx-auto max-w-[1600px] px-6 lg:px-12"> <div class="grid grid-cols-12 gap-8"> <div class="col-span-12 lg:col-span-5"> <div class="flex items-center gap-3 mb-6"> <span class="relative inline-flex items-center justify-center w-12 h-12 rounded-full" style="background: var(--v2-sun-400); color: var(--v2-ink-950);" aria-hidden="true"> <!-- Jetski silhouette icon --> <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor"> <path d="M4 22c2-1 4-1.5 6-1.5s4 .5 6 .5 4-.5 6-.5 4 .5 6 1.5v2c-2 1-4 1.5-6 1.5s-4-.5-6-.5-4 .5-6 .5-4-.5-6-1.5v-2zm4-6l3-4h10l3 4c.8 1 .6 2.5-.5 3-1.5.6-3-.3-4-1.5-.8-1-2.3-1-3.5-.5-1 .4-2.3.4-3 0-1.2-.5-2.7-.5-3.5.5-1 1.2-2.5 2.1-4 1.5-1.1-.5-1.3-2-.5-3zm4.5-5l1-3c.2-.6.8-1 1.5-1h4c.7 0 1.3.4 1.5 1l1 3h-9z"></path> </svg> </span> <div> <div class="font-display text-2xl tracking-tight" style="color: var(--v2-cream-50);">Nero Lefkada</div> <div class="font-mono text-[10px] tracking-[0.18em] uppercase mt-1" style="color: var(--v2-sun-300);">Rental&amp;Retail · Lefkada, Greece</div> </div> </div> <p class="max-w-md text-sm leading-relaxed mb-5" style="color: rgba(253,251,244,0.6);"> ${COPY.tagline} </p> <!-- Social + contact buttons --> <div class="flex flex-wrap items-center gap-3"> <a href="https://instagram.com/jetski__lefkada" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 hover:scale-105" style="background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045); color: #fff;" aria-label="Follow Jetski Lefkada on Instagram" data-cro="footer-instagram"> <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path> </svg> <span>@jetski__lefkada</span> </a> <a href="https://wa.me/306955612777" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 hover:scale-105" style="background: #25d366; color: #fff;" aria-label="WhatsApp David" data-cro="footer-whatsapp"> <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488"></path> </svg> <span>WhatsApp David</span> </a> <a href="mailto:nerolefkada@outlook.de" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 hover:scale-105" style="background: var(--v2-sun-400); color: var(--v2-ink-950);" aria-label="Email Nero Lefkada" data-cro="footer-email"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"> <rect x="2" y="4" width="20" height="16" rx="2"></rect> <path d="m22 7-10 5L2 7"></path> </svg> <span>Email</span> </a> </div> <!-- Instagram QR code --> <div class="mt-6 inline-flex items-center gap-4 p-3 rounded-xl" style="background: rgba(253,251,244,0.05); border: 1px solid rgba(253,251,244,0.1);"> <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https%3A%2F%2Finstagram.com%2Fjetski__lefkada&bgcolor=fdfbf4&color=071d30&margin=0" alt="QR code to @jetski__lefkada on Instagram" width="96" height="96" class="rounded-md" loading="lazy"> <div> <div class="font-mono text-[10px] uppercase tracking-[0.14em] mb-1" style="color: var(--v2-sun-300);">Scan to follow</div> <div class="font-display text-lg leading-tight" style="color: var(--v2-cream-50);">@jetski__lefkada</div> <div class="font-mono text-[9px] tracking-[0.12em]" style="color: rgba(253,251,244,0.5);">Boats · Beach · Best of Lefkada</div> </div> </div> </div> <div class="col-span-6 lg:col-span-2"> <div class="font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style="color: var(--v2-sun-300);">Explore</div> <ul class="space-y-2 font-body text-sm"> <li><a href="#fleet" class="hover:text-sun-400 transition-colors">Fleet</a></li> <li><a href="#how">How it works</a></li> <li><a href="#voices">Reviews</a></li> <li><a href="#faq">FAQ</a></li> </ul> </div> <div class="col-span-6 lg:col-span-2"> <div class="font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style="color: var(--v2-sun-300);">Legal</div> <ul class="space-y-2 font-body text-sm"> <li><a href="/imprint">Imprint</a></li> <li><a href="/privacy">Privacy</a></li> <li><a href="/terms">Terms</a></li> <li><a href="/waiver">Waiver</a></li> <li><a href="/safety">Safety</a></li> </ul> </div> <div class="col-span-12 lg:col-span-3"> <div class="font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style="color: var(--v2-sun-300);">Operating hours</div> <div class="space-y-2 text-sm" style="color: rgba(253,251,244,0.8);"> <div class="flex justify-between"><span>Mon to Sun</span><span style="color: var(--v2-sun-300);">09:00 to 21:00</span></div> <div class="flex justify-between"><span>Every day</span><span style="color: var(--v2-sun-300);">12 hours open</span></div> <div class="flex justify-between pt-3 mt-3 border-t" style="border-color: rgba(253,251,244,0.15);"><span>Season</span><span style="color: var(--v2-sun-300);">May - Oct</span></div> </div> </div> </div> <div class="mt-14 pt-8 border-t" style="border-color: rgba(253,251,244,0.15);"> <!-- Copyright: giant stylised © next to business name, like the reference
           Kristina shared 2026-04-20 (big classic C-in-circle symbol). --> <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"> <div class="flex items-center gap-5"> <span class="font-display leading-none select-none" style="font-size: clamp(4rem, 7vw, 6rem); font-weight: 300; color: var(--v2-sun-300); line-height: 0.9;" aria-hidden="true">©</span> <div> <div class="font-display text-xl md:text-2xl leading-tight" style="color: var(--v2-cream-50);"> ${currentYear} Nero Lefkada Rental&amp;Retail
</div> <div class="font-mono text-[10px] uppercase tracking-[0.18em] mt-2" style="color: rgba(253,251,244,0.5);">
All rights reserved · Alle Rechte vorbehalten · Με επιφύλαξη παντός δικαιώματος
</div> </div> </div> <div class="font-mono text-[10px] uppercase tracking-[0.18em] text-right" style="color: rgba(253,251,244,0.5);"> <div>Website by <a href="#" class="hover:underline" style="color: var(--v2-sun-300);">AURA Web Studio · by Kristina Goldberg</a></div> <div class="mt-1 opacity-60">For Nero Lefkada · Lygia, Lefkada</div> </div> </div> </div> </div> </footer>`;
}, "C:/Users/User/jetski-LIVE/src/components/v2/Footer2.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutBare", $$LayoutBare, { "title": "Nero Lefkada · Fastest Jetskis on the Island", "description": "Rent a Sea-Doo jetski on Lefkada, Greece. Four supercharged Sea-Doo jetskis (2026 fleet: Nero Ena, Dio, Tria, Tessera), a ten-minute safety briefing, and the best coves of the Ionian.", "themeColor": "#071d30", "preloadHeroPoster": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "<\/script> ", '<div class="v2"> ', " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " </div> "])), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Nero Lefkada · Fastest Jetskis on the Island",
    "description": "Sea-Doo jetski experience on Lefkada, Greece. Four supercharged Neros, family-run by Kristina Goldberg, with David as your guide at Lygia Port.",
    "thumbnailUrl": "https://jetski-lefkada-rentals.com/og-cover.jpg",
    "uploadDate": "2026-04-01T00:00:00Z",
    "contentUrl": "https://jetski-lefkada-rentals.com/videos/hero-nero.mp4",
    "embedUrl": "https://jetski-lefkada-rentals.com/"
  })), maybeRenderHead(), renderComponent($$result2, "Navbar2", $$Navbar2, {}), renderComponent($$result2, "Hero2", $$Hero2, {}), renderComponent($$result2, "TrustMarquee2", $$TrustMarquee2, {}), renderComponent($$result2, "Experiences2", $$Experiences2, {}), renderComponent($$result2, "Fleet2", $$Fleet2, {}), renderComponent($$result2, "WaterFun2", $$WaterFun2, {}), renderComponent($$result2, "HowItWorks2", $$HowItWorks2, {}), renderComponent($$result2, "Gallery2", $$Gallery2, {}), renderComponent($$result2, "Spots2", $$Spots2, {}), renderComponent($$result2, "Testimonials2", $$Testimonials2, {}), renderComponent($$result2, "Faq2", $$Faq2, {}), renderComponent($$result2, "Booking2", $$Booking2, {}), renderComponent($$result2, "CtaFinal2", $$CtaFinal2, {}), renderComponent($$result2, "Footer2", $$Footer2, {})) })}`;
}, "C:/Users/User/jetski-LIVE/src/pages/index.astro", void 0);

const $$file = "C:/Users/User/jetski-LIVE/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
