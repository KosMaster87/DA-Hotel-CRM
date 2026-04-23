# Datenmodell — Dev2K Hotel CRM

Supabase PostgreSQL Schema. Alle Tabellen mit RLS. Typen via `supabase gen types` in `shared/contracts/database.types.ts`.

---

## Tabellen-Übersicht

| Tabelle              | Beschreibung             | Wichtige Relations               |
| -------------------- | ------------------------ | -------------------------------- |
| `hotels`             | Hotel-Stammdaten         | → `bookings`                     |
| `customers`          | Gäste / Firmen           | → `bookings`                     |
| `bookings`           | Buchungsvorgang          | → `hotels`, `customers`, `rooms` |
| `rooms`              | Zimmer eines Hotels      | → `hotels`, `bookings`           |
| `suppliers`          | Lieferanten              | → `supplier_contracts`           |
| `supplier_contracts` | Verträge mit Lieferanten | → `suppliers`, `hotels`          |
| `invoices`           | Rechnungen               | → `bookings`                     |
| `users`              | Ergänzt Supabase Auth    | — (via `auth.users`)             |

---

## Schema

### `hotels`

```sql
CREATE TABLE hotels (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  address      TEXT NOT NULL,
  city         TEXT NOT NULL,
  country      TEXT NOT NULL DEFAULT 'DE',
  stars        SMALLINT CHECK (stars BETWEEN 1 AND 5),
  phone        TEXT,
  email        TEXT,
  website      TEXT,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

```typescript
// shared/types/hotel.types.ts
export interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  stars: number | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type CreateHotelDto = Omit<Hotel, "id" | "created_at" | "updated_at">;
export type UpdateHotelDto = Partial<CreateHotelDto>;
```

---

### `customers`

```sql
CREATE TABLE customers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name   TEXT NOT NULL,
  last_name    TEXT NOT NULL,
  email        TEXT NOT NULL UNIQUE,
  phone        TEXT,
  company      TEXT,
  address      TEXT,
  city         TEXT,
  country      TEXT NOT NULL DEFAULT 'DE',
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

```typescript
// shared/types/customer.types.ts
export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  address: string | null;
  city: string | null;
  country: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateCustomerDto = Omit<
  Customer,
  "id" | "created_at" | "updated_at"
>;
export type UpdateCustomerDto = Partial<CreateCustomerDto>;
```

---

### `rooms`

```sql
CREATE TABLE rooms (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id     UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  room_number  TEXT NOT NULL,
  room_type    TEXT NOT NULL,  -- 'single' | 'double' | 'suite' | 'apartment'
  capacity     SMALLINT NOT NULL DEFAULT 2,
  price_per_night NUMERIC(10,2) NOT NULL,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(hotel_id, room_number)
);
```

```typescript
// shared/types/room.types.ts
export type RoomType = "single" | "double" | "suite" | "apartment";

export interface Room {
  id: string;
  hotel_id: string;
  room_number: string;
  room_type: RoomType;
  capacity: number;
  price_per_night: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type CreateRoomDto = Omit<Room, "id" | "created_at" | "updated_at">;
export type UpdateRoomDto = Partial<CreateRoomDto>;
```

---

### `bookings`

```sql
CREATE TABLE bookings (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number TEXT NOT NULL UNIQUE,  -- z.B. BK-2024-0001
  hotel_id       UUID NOT NULL REFERENCES hotels(id),
  room_id        UUID NOT NULL REFERENCES rooms(id),
  customer_id    UUID NOT NULL REFERENCES customers(id),
  check_in       DATE NOT NULL,
  check_out      DATE NOT NULL,
  total_price    NUMERIC(10,2) NOT NULL,
  status         TEXT NOT NULL DEFAULT 'pending',
  -- status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
  notes          TEXT,
  created_by     UUID REFERENCES auth.users(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (check_out > check_in)
);
```

```typescript
// shared/types/booking.types.ts
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "checked_in"
  | "checked_out"
  | "cancelled";

export interface Booking {
  id: string;
  booking_number: string;
  hotel_id: string;
  room_id: string;
  customer_id: string;
  check_in: string;
  check_out: string;
  total_price: number;
  status: BookingStatus;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateBookingDto = Omit<
  Booking,
  "id" | "booking_number" | "created_at" | "updated_at"
>;
export type UpdateBookingDto = Partial<
  Pick<Booking, "status" | "check_in" | "check_out" | "notes">
>;
```

---

### `suppliers`

```sql
CREATE TABLE suppliers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  category     TEXT NOT NULL,  -- 'food' | 'linen' | 'cleaning' | 'tech' | 'other'
  contact_name TEXT,
  email        TEXT,
  phone        TEXT,
  address      TEXT,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

```typescript
// shared/types/supplier.types.ts
export type SupplierCategory = "food" | "linen" | "cleaning" | "tech" | "other";

export interface Supplier {
  id: string;
  name: string;
  category: SupplierCategory;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type CreateSupplierDto = Omit<
  Supplier,
  "id" | "created_at" | "updated_at"
>;
export type UpdateSupplierDto = Partial<CreateSupplierDto>;
```

---

### `invoices`

```sql
CREATE TABLE invoices (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number  TEXT NOT NULL UNIQUE,  -- z.B. INV-2024-0001
  booking_id      UUID NOT NULL REFERENCES bookings(id),
  amount          NUMERIC(10,2) NOT NULL,
  tax_rate        NUMERIC(4,2) NOT NULL DEFAULT 19.00,
  status          TEXT NOT NULL DEFAULT 'draft',
  -- status: 'draft' | 'sent' | 'paid' | 'cancelled'
  due_date        DATE,
  paid_at         TIMESTAMPTZ,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

```typescript
// shared/types/invoice.types.ts
export type InvoiceStatus = "draft" | "sent" | "paid" | "cancelled";

export interface Invoice {
  id: string;
  invoice_number: string;
  booking_id: string;
  amount: number;
  tax_rate: number;
  status: InvoiceStatus;
  due_date: string | null;
  paid_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type CreateInvoiceDto = Omit<
  Invoice,
  "id" | "invoice_number" | "created_at" | "updated_at"
>;
export type UpdateInvoiceDto = Partial<
  Pick<Invoice, "status" | "due_date" | "paid_at" | "notes">
>;
```

---

## User-Rollen (via Supabase Auth Metadata)

```typescript
// shared/types/auth.types.ts
export type UserRole = "admin" | "manager" | "viewer";

export interface AppUser {
  id: string;
  email: string;
  role: UserRole;
  full_name: string | null;
}
```

Rolle wird als `user_metadata.role` in Supabase Auth gespeichert und in JWT claims via Hook weitergeleitet (Lead-Aufgabe in Phase -1).

---

## Namenskonventionen

| Bereich               | Konvention                                                   | Beispiel                           |
| --------------------- | ------------------------------------------------------------ | ---------------------------------- |
| SQL-Tabellen          | snake_case                                                   | `hotel_bookings`                   |
| SQL-Spalten           | snake_case                                                   | `created_at`                       |
| TypeScript-Interfaces | PascalCase                                                   | `Hotel`, `BookingStatus`           |
| TypeScript-Properties | camelCase → **Ausnahme**: Supabase-Typen behalten snake_case | `hotel.created_at`                 |
| Dto-Types             | PascalCase + Suffix                                          | `CreateHotelDto`, `UpdateHotelDto` |
