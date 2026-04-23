---
applyTo: "frontend/src/**/*.ts,shared/**/*.ts,supabase/**/*.ts,supabase/**/*.sql"
description: "Use when: implementing TypeScript + Vite + Supabase features that touch architecture boundaries, services, shared types, or database data flow."
---

# Architecture Instruction — Dev2K Hotel CRM

## Frontend (Vanilla TypeScript + Vite)

- View-Dateien (HTML + TS) bleiben schlank und delegieren Logik an Services.
- Kein direkter Supabase-Aufruf im View-Layer — ausschließlich über `services/`.
- Feature-Ordner nach fachlicher Domäne: `hotels/`, `bookings/`, `suppliers/`, `invoices/`, `auth/`, `dashboard/`.
- `components/` enthält nur wiederverwendbare UI-Teile ohne Domain-Logik.
- Routing-Logik gehört in `router/` — nie in Views oder Services.

## Services

- Ein Service pro Domain (z.B. `hotel.service.ts`, `booking.service.ts`).
- Services kapseln alle Supabase-Datenbankoperationen für ihre Domain.
- Services geben typisierte Promises zurück — keine rohen Supabase-Response-Typen im UI.
- Validierung vor dem Schreiben in die DB immer im Service durchführen.

## Shared

- Alle TypeScript-Typen und Interfaces in `shared/types/`.
- Tabellen-Shapes und generierte DB-Typen in `shared/contracts/` (via `supabase gen types`).
- Konstanten (Rollen, Status-Werte) in `shared/constants/`.
- Keine Import-Richtung: `frontend` → `shared` ✓ | `shared` → `frontend` ✗

## Supabase / PostgreSQL

- Row Level Security (RLS) ist für jede Tabelle zu aktivieren — kein `USING (true)`.
- Migrations in `supabase/migrations/` — nie direkt die DB manuell ändern.
- DB-Typen mit `supabase gen types typescript` generieren und in `shared/contracts/database.types.ts` einchecken.
- Edge Functions nur für serverseitige Logik (z.B. Rechnungs-PDF-Generierung, Webhooks).

## Qualitätsregeln

- TDD-first für neue Features und Bugfixes (Vitest).
- Bei Änderungen an Auth oder RLS Policies immer Security-Review mitdenken.
- Breaking Changes an `shared/types/` erfordern Update in allen betroffenen Services.
- Scope strikt auf MVP halten — kein Feature-Creep.
