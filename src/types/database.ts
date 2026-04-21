// Welle 2: Datenbank-Schema & API-Typen
// Quelle der Wahrheit für Supabase RLS, API-Endpunkte, CRM-Formulare
// Stand 2026-04-21: Bookings erweitert um source + buffer_minutes (Overlap-Schutz)

export type JetskiUnitId =
  | "nero-ena"
  | "nero-dio"
  | "nero-tria"
  | "nero-tessera";

export type BookingSource =
  | "website"
  | "whatsapp"
  | "walk_in"
  | "maintenance"
  | "weather"
  | "admin_block";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export type ServiceCategory =
  | "beach_rides"
  | "exclusive_experiences"
  | "vip_delivery"
  | "towable";

export interface Booking {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string | null; // NULL wenn Admin-User später gelöscht wird (FK ON DELETE SET NULL)

  // Slot-Kerndaten
  jetski_unit_id: JetskiUnitId;
  booking_date: string; // YYYY-MM-DD
  start_time: string; // HH:MM
  duration_minutes: number;
  buffer_minutes: number; // Default 15, pro Buchung anpassbar

  // Klassifizierung
  source: BookingSource;
  status: BookingStatus;

  // Modell-Referenz (für Preise/Reporting, aktuell == jetski_unit_id da jede Unit 1 Modell ist)
  jetski_id?: string;
  service_category?: ServiceCategory;
  service_type?: string;

  // Kundendaten (nullable bei source in maintenance/weather/admin_block)
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_country?: string;

  // Zusätze
  towable_persons?: number;
  delivery_location?: string;

  // Preise (nullable bei Blockern)
  total_price?: number;
  deposit_amount?: number;

  notes?: string;
}

export interface Payment {
  id: string;
  created_at: string;
  user_id: string;

  booking_id: string;
  amount: number;
  payment_method: "viva_wallet" | "bank_transfer" | "cash";
  payment_date: string;
  notes?: string;

  updated_at: string;
}

export interface Expense {
  id: string;
  created_at: string;
  user_id: string;

  expense_date: string;
  category: "fuel" | "maintenance" | "insurance" | "other";
  amount: number;
  description: string;
  receipt_url?: string;
  notes?: string;

  updated_at: string;
}

export interface Invoice {
  id: string;
  created_at: string;
  user_id: string;

  invoice_number: string;
  booking_id: string;

  pdf_url: string;

  sent_to_accountant: boolean;
  sent_date?: string;
  notes?: string;

  updated_at: string;
}

// Row-Level Security (RLS) Policies:
// - bookings: RLS aktiviert, keine Policies → nur service_role (Server) hat Zugriff.
//   Der Client bekommt Buchungsdaten nie direkt, sondern nur über API-Endpoints.
// - Andere Tabellen (Payments/Expenses/Invoices): user_id = auth.uid()

// Public availability-Endpoint leakt nur startISO/endISO-Paare, keine PII.
