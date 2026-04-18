// Middleware: Auth-Guard für /admin Routes
// Läuft bei jedem Request, blockt Zugriff auf /admin/* ohne Session-Cookie

import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ url, cookies, redirect }, next) => {
  const pathname = url.pathname;

  if (!pathname.startsWith("/admin")) {
    return next();
  }

  // Login-Seite selbst ist öffentlich
  if (pathname === "/admin/login") {
    return next();
  }

  // Alle anderen /admin-Routes: Session prüfen
  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return redirect("/admin/login");
  }

  // TODO: Supabase JWT verifizieren, nicht nur prüfen ob Cookie vorhanden
  // Das reicht für ersten Scaffold — wird ersetzt sobald Supabase live ist
  //
  // import { createClient } from '@supabase/supabase-js';
  // const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
  // const { data, error } = await supabase.auth.getUser(accessToken);
  // if (error || !data.user) { cookies.delete('sb-access-token'); return redirect('/admin/login'); }

  return next();
});
