import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://www.jetski-lefkada-rentals.com",
  // output: "static" ist Default in Astro 6. Dynamische Routes (/admin/*, /api/*)
  // markieren sich selbst per `export const prerender = false;`
  adapter: vercel(),
  build: {
    // Inline all CSS into HTML. The two stylesheets total ~78KB uncompressed
    // (~17KB gzipped) and are render-blocking when external. Inlining trades
    // a slightly bigger HTML for one fewer round-trip on first paint, which
    // is a clear win on mobile 4G where round-trip latency dominates.
    inlineStylesheets: "always",
  },
  redirects: {
    "/v1": "/",
    "/v2": "/",
    "/v3": "/",
    // Betrieb dauerhaft geschlossen (08/2026): Seiten, die einen aktiven
    // Verleih beschreiben, gibt es nicht mehr. Alte Links und Google-Treffer
    // landen auf der Abschluss-Seite statt im 404. Die Inhalte liegen
    // weiterhin in der Git-Historie (Commit 751ffba).
    "/safety": "/",
    "/terms": "/",
    "/waiver": "/",
  },
  integrations: [
    react(),
    // Nur noch die vier verbliebenen öffentlichen Seiten in die Sitemap:
    // Abschluss-Seite EN/DE plus Impressum und Datenschutz.
    sitemap({
      filter: (page) =>
        !page.includes("/admin") && !page.includes("/api"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
  server: {
    port: 4330,
    host: true,
    allowedHosts: true,
  },
});
