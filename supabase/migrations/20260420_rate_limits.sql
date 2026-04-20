-- Rate-Limits-Tabelle (Sec #3, 2026-04-20)
-- ─────────────────────────────────────────────────────────────────────────
-- Ersetzt den In-Memory-Rate-Limiter. Persistent über Vercel Cold-Starts,
-- damit Brute-Force-Angriffe nicht durch parallele Serverless-Instanzen
-- umgangen werden können.
--
-- Nutzung: Apps rufen die RPC `check_rate_limit(key, limit, window_seconds)`
-- auf. Die Funktion ist ATOMAR (einziger UPSERT), keine Race-Conditions
-- zwischen Read und Write.
--
-- Kristina: Diese Migration per Supabase-Dashboard ausführen:
--   Database → SQL Editor → Paste this file → Run.
-- Siehe docs/supabase-migration-setup.md für Schritt-für-Schritt.
-- ─────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.rate_limits (
  key           text        PRIMARY KEY,
  count         integer     NOT NULL DEFAULT 0,
  window_start  timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- RLS aktivieren, aber keine Public-Policies — nur Service-Role darf rein
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Index fürs nightly cleanup
CREATE INDEX IF NOT EXISTS idx_rate_limits_window_start
  ON public.rate_limits (window_start);

-- ─────────────────────────────────────────────────────────────────────────
-- RPC: check_rate_limit (atomar UPSERT + Fenster-Reset)
-- Parameters:
--   p_key            Eindeutiger Counter-Key (z.B. "login:1.2.3.4")
--   p_limit          Maximale Requests pro Fenster
--   p_window_seconds Fenster-Länge in Sekunden
-- Returns: TABLE (allowed boolean, remaining int, reset_at timestamptz)
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_key             text,
  p_limit           integer,
  p_window_seconds  integer
) RETURNS TABLE (
  allowed   boolean,
  remaining integer,
  reset_at  timestamptz
) AS $$
DECLARE
  v_window_start  timestamptz;
  v_count         integer;
  v_window_age    interval;
BEGIN
  v_window_age := (p_window_seconds || ' seconds')::interval;

  -- Atomic upsert with window-reset logic:
  -- If window expired → start new window with count=1
  -- Else → increment count, keep window_start
  INSERT INTO public.rate_limits (key, count, window_start, updated_at)
  VALUES (p_key, 1, now(), now())
  ON CONFLICT (key) DO UPDATE
  SET
    count = CASE
      WHEN public.rate_limits.window_start < now() - v_window_age THEN 1
      ELSE public.rate_limits.count + 1
    END,
    window_start = CASE
      WHEN public.rate_limits.window_start < now() - v_window_age THEN now()
      ELSE public.rate_limits.window_start
    END,
    updated_at = now()
  RETURNING public.rate_limits.window_start, public.rate_limits.count
  INTO v_window_start, v_count;

  allowed   := v_count <= p_limit;
  remaining := GREATEST(0, p_limit - v_count);
  reset_at  := v_window_start + v_window_age;
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Nur Service-Role darf die RPC aufrufen (API-Routes nutzen Service-Role-Key)
REVOKE ALL ON FUNCTION public.check_rate_limit(text, integer, integer) FROM public;
REVOKE ALL ON FUNCTION public.check_rate_limit(text, integer, integer) FROM anon;
REVOKE ALL ON FUNCTION public.check_rate_limit(text, integer, integer) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, integer, integer) TO service_role;

-- Housekeeping: alte Einträge aufräumen (älter als 1 Tag)
-- Optional als pg_cron Job täglich laufen lassen
CREATE OR REPLACE FUNCTION public.rate_limits_cleanup() RETURNS integer AS $$
DECLARE
  v_deleted integer;
BEGIN
  DELETE FROM public.rate_limits
  WHERE window_start < now() - interval '1 day'
  RETURNING 1 INTO v_deleted;
  RETURN COALESCE(v_deleted, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

REVOKE ALL ON FUNCTION public.rate_limits_cleanup() FROM public;
GRANT EXECUTE ON FUNCTION public.rate_limits_cleanup() TO service_role;

-- ─────────────────────────────────────────────────────────────────────────
-- Kommentar zur pg_cron-Einrichtung (optional, in Supabase-Dashboard):
--   SELECT cron.schedule('rate-limits-cleanup-nightly', '0 3 * * *',
--                        'SELECT public.rate_limits_cleanup()');
-- Falls nicht via pg_cron: Cleanup manuell monatlich laufen lassen oder
-- via Vercel Cron Job.
-- ─────────────────────────────────────────────────────────────────────────
