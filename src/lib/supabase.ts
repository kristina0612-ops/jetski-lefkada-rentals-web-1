// Welle 2: Supabase-Client Setup
// Initialisierung für API-Routes und Server-Komponenten

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL und Service Role Key fehlen. Überprüfe .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Supabase Secrets (in .env.local, NICHT in Git):
// PUBLIC_SUPABASE_URL = https://your-project.supabase.co
// SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
// (Kopiert aus Supabase Dashboard → Settings → API)

// WICHTIG: Service Role Key ist super-mächtig. Nur Server-seitig benutzen.
// Für Client-Auth (Kristinas Login): anon key + Supabase Auth UI
