import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://jetski-lefkada-rentals.com",
  output: "hybrid", // Hybrid-Mode: Marketing-Pages statisch, CRM/API dynamisch
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  redirects: {
    "/v2": "/",
  },
  integrations: [react()],
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
