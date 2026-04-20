// Welle 2: Supabase-Client Setup
// Initialisierung für API-Routes und Server-Komponenten.
//
// ══════════════════════════════════════════════════════════════════════════
// Wichtig (2026-04-20): KEIN throw am Modul-Load mehr.
// ══════════════════════════════════════════════════════════════════════════
// Vorher warf dieses Modul sofort eine Exception sobald `PUBLIC_SUPABASE_URL`
// oder `SUPABASE_SERVICE_ROLE_KEY` fehlen. Weil `middleware.ts` und
// `rate-limit.ts` dieses Modul importieren, ist der Vercel-Build ab dem
// JWT-Fix (c8b5fb8) jedes Mal abgestürzt wenn die ENV-Vars in Vercel noch
// nicht gesetzt waren (siehe 9 aufeinanderfolgende rote Deployments).
//
// Jetzt: `supabase` ist `null` wenn ENV fehlt. Aufrufer müssen den Null-Case
// behandeln (rate-limit fällt auf In-Memory zurück, middleware denied den
// Zugriff auf /admin). Damit baut die Seite auch ohne Supabase-Keys, was
// für reine Marketing-Deploys (keine Admin/API-Nutzung) völlig OK ist.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null;

// Supabase Secrets (in Vercel Env-Vars UND .env.local, NICHT in Git):
// PUBLIC_SUPABASE_URL = https://your-project.supabase.co
// SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
// (Kopiert aus Supabase Dashboard → Settings → API)
//
// WICHTIG: Service Role Key ist super-mächtig. Nur Server-seitig benutzen.
// Für Client-Auth (Kristinas Login): anon key + Supabase Auth UI