-- Bookings-Tabelle (CRM Welle 1, 2026-04-21)
-- ─────────────────────────────────────────────────────────────────────────
-- Speichert alle belegten Slots: echte Kundenbuchungen UND Blocker
-- (Wartung, Walk-in, Wetter). Unterschieden durch die Spalte `source`.
--
-- Kernziel: Doppelbuchungen physikalisch unmöglich machen. Der EXCLUDE-
-- Constraint am Ende greift auf DB-Ebene, auch bei exakt gleichzeitigen
-- Inserts. Application-Locks sind nicht nötig.
--
-- Kristina: Diese Migration per Supabase-Dashboard ausführen:
--   Database → SQL Editor → Paste this file → Run.
-- Siehe docs/supabase-migration-setup.md für Schritt-für-Schritt.
-- ─────────────────────────────────────────────────────────────────────────

-- Voraussetzung für den Overlap-Schutz: btree_gist kombiniert =-Vergleich
-- (für jetski_unit_id) mit &&-Range-Overlap (für time_range).
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- ─────────────────────────────────────────────────────────────────────────
-- Enums
-- ─────────────────────────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE booking_source AS ENUM (
    'website',      -- Direkte Website-Buchung (Welle 2, aktuell ungenutzt)
    'whatsapp',     -- Manuell eingetragen aus WhatsApp-Bestätigung
    'walk_in',      -- Kunde steht am Dock
    'maintenance',  -- Wartung blockiert Slot
    'weather',      -- Sturm/Wellengang blockiert
    'admin_block'   -- Sonstiges manuelles Blockieren
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM (
    'pending', 'confirmed', 'completed', 'cancelled', 'no_show'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ─────────────────────────────────────────────────────────────────────────
-- Tabelle
-- ─────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.bookings (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),

  -- FK auf Supabase-Auth-User (NULL falls User später gelöscht wird,
  -- Historie bleibt erhalten — red-lines.md "niemals Kundendaten löschen")
  user_id          uuid REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Slot-Kerndaten
  jetski_unit_id   text NOT NULL
                   CHECK (jetski_unit_id IN
                          ('nero-ena','nero-dio','nero-tria','nero-tessera')),
  booking_date     date NOT NULL,
  start_time       time NOT NULL,
  duration_minutes int  NOT NULL CHECK (duration_minutes BETWEEN 10 AND 10080),

  -- Puffer zwischen Buchungen (Umrüsten, Tanken, Briefing).
  -- Standard 15 Min, bei großen Gruppen oder langen VIP-Touren pro Buchung
  -- auf 30+ anhebbar.
  buffer_minutes   int  NOT NULL DEFAULT 15
                   CHECK (buffer_minutes BETWEEN 0 AND 120),

  -- Generierte Zeitbereichs-Spalte für den EXCLUDE-Constraint.
  -- Halboffen [start, end): 10:00-10:30 und 10:30-11:00 kollidieren NICHT.
  -- AT TIME ZONE 'Europe/Athens' sorgt für DST-korrekte Konversion nach
  -- timestamptz.
  time_range tstzrange GENERATED ALWAYS AS (
    tstzrange(
      (booking_date + start_time) AT TIME ZONE 'Europe/Athens',
      (booking_date + start_time
         + ((duration_minutes + buffer_minutes) || ' minutes')::interval
      ) AT TIME ZONE 'Europe/Athens',
      '[)'
    )
  ) STORED,

  -- Klassifizierung
  source           booking_source NOT NULL,
  status           booking_status NOT NULL DEFAULT 'pending',

  -- Referenz auf Jetski-Modell (optional, für Reporting)
  jetski_id        text,
  service_category text,
  service_type     text,

  -- Kundendaten (bei source in maintenance/weather/admin_block nullable)
  customer_name    text,
  customer_email   text,
  customer_phone   text,
  customer_country text,
  towable_persons  int CHECK (towable_persons IS NULL OR towable_persons BETWEEN 1 AND 3),
  delivery_location text,
  total_price      numeric(10,2) CHECK (total_price IS NULL OR total_price >= 0),
  deposit_amount   numeric(10,2) CHECK (deposit_amount IS NULL OR deposit_amount >= 0),
  notes            text,

  -- Bei echten Buchungen (website/whatsapp/walk_in) sind Name + Telefon Pflicht,
  -- bei Blockern (maintenance/weather/admin_block) optional.
  CONSTRAINT customer_required_for_bookings CHECK (
    source IN ('maintenance','weather','admin_block')
    OR (customer_name IS NOT NULL AND customer_phone IS NOT NULL)
  )
);

-- ─────────────────────────────────────────────────────────────────────────
-- Doppelbuchungs-Schutz (Herzstück der Migration)
-- ─────────────────────────────────────────────────────────────────────────
-- Verhindert auf DB-Ebene, dass zwei aktive Buchungen am selben Jetski
-- überlappen. Partial-Exclude: cancelled- und no_show-Buchungen geben
-- den Slot wieder frei.
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_no_overlap;
ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_no_overlap
  EXCLUDE USING gist (
    jetski_unit_id WITH =,
    time_range     WITH &&
  ) WHERE (status NOT IN ('cancelled','no_show'));

-- ─────────────────────────────────────────────────────────────────────────
-- Indexe
-- ─────────────────────────────────────────────────────────────────────────

-- Standard-Query im Availability-Endpoint: pro Unit + Datum
CREATE INDEX IF NOT EXISTS idx_bookings_unit_date
  ON public.bookings (jetski_unit_id, booking_date)
  WHERE status NOT IN ('cancelled','no_show');

-- Range-Index für schnelle Overlap-Suchen (Wochen-Buchungen, Kalender-Views)
CREATE INDEX IF NOT EXISTS idx_bookings_time_range_gist
  ON public.bookings USING gist (time_range)
  WHERE status NOT IN ('cancelled','no_show');

-- ─────────────────────────────────────────────────────────────────────────
-- updated_at-Trigger
-- ─────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.bookings_set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_bookings_updated_at ON public.bookings;
CREATE TRIGGER trg_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.bookings_set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────
-- Row-Level-Security
-- ─────────────────────────────────────────────────────────────────────────
-- Keine Policies = kein Zugriff für anon/authenticated.
-- Unser Server-Code nutzt den Service-Role-Key, der RLS umgeht.
-- Damit können Kundendaten niemals versehentlich an den Browser geleakt
-- werden (auch nicht über Supabase-JS im Admin-UI).
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
