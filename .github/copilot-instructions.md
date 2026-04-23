# Copilot Instructions — Dev2K Hotel CRM

## Projektziel

Baue ein TypeScript-CRM für die Hotelverwaltung als Dev2K Eigenprojekt.
Ziel: produktionsreife Architektur umsetzen und demonstrieren.

Features: Hotels & Hotelketten, Kunden/Kontakte, Buchungen/Termine, Lieferanten, Rechnungen, Dashboard.

## Tech-Stack (bestätigt)

- **Frontend**: Vanilla TypeScript + Vite (kein Framework)
- **Datenbank**: Supabase (PostgreSQL)
- **Linting**: ESLint + Prettier
- **Struktur**: Monorepo (frontend/ + shared/ + supabase/)
- **Testing**: Vitest

## Offene Entscheidungen (Lead Decision Points)

- Auth: Supabase Auth ODER eigenes JWT-System
- Client-Router: Bibliothek (z.B. `navigo`) ODER eigener Mini-Router

## Harte Regeln

1. TDD-first: erst Tests, dann Implementierung.
2. Mobile First in allen UI-Entscheidungen.
3. Neue Features nur mit klarer Definition of Done (DoD).
4. Keine Business-Logik in UI-Komponenten oder Event-Handlern — nur in Services.
5. Keine direkten Supabase-Calls im View-Layer — nur über Services.
6. Keine Secret-Werte in Repos oder Beispiel-Dateien.
7. Immer kleine, reviewbare Commits mit Conventional Commits.
8. Shared Types in shared/ — nie zwischen frontend und supabase duplizieren.
9. SOLID-Prinzipien einhalten: ein Service = eine Verantwortung, Services gegen Interfaces.
10. Kein `any` in TypeScript — alle Typen explizit.

## Architekturregeln

- `frontend/src/features/` — Domain-Ordner (hotels, bookings, suppliers, invoices, auth, dashboard)
- `frontend/src/services/` — Supabase-Wrapper und Business-Logik
- `frontend/src/components/` — wiederverwendbare UI-Bausteine ohne Domain-Wissen
- `frontend/src/router/` — clientseitiges Routing
- `shared/types/` — alle TypeScript-Typen und Interfaces
- `shared/contracts/` — Daten-Verträge (Tabellen-Shapes und DB-Typen)
- `supabase/` — Migrations, RLS Policies, Edge Functions

## Security-Basis

- Supabase Row Level Security (RLS) ist die primäre Sicherheitsschicht — für jede Tabelle aktivieren
- RLS Policies müssen alle Lese-/Schreibzugriffe explizit erlauben — kein `USING (true)`
- Input-Validierung clientseitig UND in DB Constraints / Policies
- Keine sensiblen Daten in localStorage — nur Supabase Session-Tokens

## Entwicklungsworkflow

1. Scope klären
2. Typen in shared/ definieren
3. Testfälle formulieren (Vitest)
4. Service implementieren
5. UI verdrahten
6. Review auf Architekturgrenzen
7. Lint/Test grün
8. Commit

## MVP Scope (V1)

In Scope:

- Auth (Login/Logout + Rollen: admin, manager, viewer)
- Hotel-Stammdaten (Hotels, Hotelketten)
- Kunden/Kontakte (CRM-Kern)
- Buchungen / Termine
- Lieferanten
- Rechnungen / Invoices
- Dashboard / Reports (Basiskennzahlen)

Nicht in V1:

- Mobile App (PWA-Vorbereitung, aber kein vollständiges PWA)
- komplexe Automatisierungen
- Payment-Integrationen
