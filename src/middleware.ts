// Middleware: Auth-Guard für /admin Routes
// Läuft bei jedem Request, blockt Zugriff auf /admin/* ohne gültige Session.
//
// ══════════════════════════════════════════════════════════════════════════
// Security: Verifiziert JWT-Signatur, nicht nur Cookie-Anwesenheit
// (Fix Sec #1 · 2026-04-20 · auf Kristinas Freigabe)
// ══════════════════════════════════════════════════════════════════════════
// Vorher: Middleware prüfte nur, ob das Cookie `sb-access-token` existiert.
// Das hätte einem Angreifer erlaubt, `sb-access-token=anything` zu setzen
// und den Admin-Bereich zu betreten, sobald Supabase-Login live wird.
//
// Jetzt: Supabase verifiziert die JWT-Signatur serverseitig. Nur echte,
// nicht-abgelaufene Tokens passieren.
//
// Siehe: .claude/skills/security/SKILL.md §2 A01, §3
// ══════════════════════════════════════════════════════════════════════════

import { defineMiddleware } from "astro:middleware";
import { supabase } from "./lib/supabase";

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

  // JWT-Signatur bei Supabase verifizieren. Das ist der eigentliche Auth-Check.
  // Bei ungültigem/abgelaufenem Token: Cookie löschen und zum Login schicken.
  // Wenn Supabase noch nicht konfiguriert ist (ENV-Vars fehlen), können wir
  // den Token nicht verifizieren → sicherheitshalber ablehnen.
  if (!supabase) {
    cookies.delete("sb-access-token", { path: "/" });
    return redirect("/admin/login");
  }
  try {
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error || !data?.user) {
      cookies.delete("sb-access-token", { path: "/" });
      return redirect("/admin/login");
    }
  } catch {
    // Netzwerkfehler / Supabase nicht erreichbar → aus Vorsicht blockieren
    cookies.delete("sb-access-token", { path: "/" });
    return redirect("/admin/login");
  }

  return next();
});
