// Welle 2: Datenbank-Schema & API-Typen
// Quelle der Wahrheit für Supabase RLS, API-Endpunkte, CRM-Formulare

export interface Booking {
  id: string;
  created_at: string;
  user_id: string; // Kristina's Supabase UID

  // Booking-Details
  booking_date: string; // YYYY-MM-DD
  start_time: string; // HH:MM (09:00)
  duration_minutes: number;
  jetski_id: "seadoo-rxtx" | "seadoo-spark-trixx"; // Modell (für Pricing)
  jetski_unit_id: "challenger-1" | "challenger-2" | "acrobat-1" | "acrobat-2"; // Konkrete Einheit
  service_category: "beach_rides" | "exclusive_experiences" | "vip_delivery";
  service_type?: string; // z.B. "sunsetRide30", "coupleRide30"

  // Kundendaten
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_country?: string;

  // Zusätze
  towable_persons?: number; // Water Fun: wie viele Personen
  delivery_location?: string; // VIP Delivery: Strand-/Koordinaten-Angabe

  // Preise
  total_price: number; // EUR
  deposit_amount: number; // 30% oder 1500 bei Delivery

  // Status
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;

  // Automatisch
  updated_at: string;
}

export interface Payment {
  id: string;
  created_at: string;
  user_id: string; // Kristina's UID

  booking_id: string; // FK → bookings
  amount: number; // EUR
  payment_method: "viva_wallet" | "bank_transfer" | "cash";
  payment_date: string; // YYYY-MM-DD
  notes?: string;

  updated_at: string;
}

export interface Expense {
  id: string;
  created_at: string;
  user_id: string; // Kristina's UID

  expense_date: string; // YYYY-MM-DD
  category: "fuel" | "maintenance" | "insurance" | "other";
  amount: number; // EUR
  description: string;
  receipt_url?: string; // optional S3/Supabase Storage
  notes?: string;

  updated_at: string;
}

export interface Invoice {
  id: string;
  created_at: string;
  user_id: string; // Kristina's UID

  invoice_number: string; // "001", "002", etc., global counter
  booking_id: string; // FK → bookings

  // PDF
  pdf_url: string; // Supabase Storage URL oder externe PDF-URL

  // Status
  sent_to_accountant: boolean;
  sent_date?: string; // YYYY-MM-DD
  notes?: string;

  updated_at: string;
}

// Row-Level Security (RLS) Policies:
// - Bookings: user_id = auth.uid() (nur Kristina sieht ihre Bookings)
// - Payments: user_id = auth.uid()
// - Expenses: user_id = auth.uid()
// - Invoices: user_id = auth.uid()
// - Service-Accounts (Agenten) bekommen eingeschränkte Rechte über separate JWT

// Kalender-Feed (public, aber token-protected):
// - Lesezugriff auf bookings (nur confirmed/completed) für iCal-Generation
// - Token = nicht-ratbarer Secret in URL (?token=xyz)
