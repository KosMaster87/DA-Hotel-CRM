# Projektplan — DA Hotel CRM

**Ausbildungskontext:** Developer-Akademie | Mentor + Schüler-Team
**Ziel:** Produktionsreifes TypeScript-CRM für Hotelverwaltung

---

## Phase -1 — Engineering Setup (Mentor-Phase)

> Diese Phase gehört dem Mentor. Kein Schüler schreibt Code, bevor diese Entscheidungen getroffen und dokumentiert sind.

**Architektur:**

- [ ] Architekturdiagramm erstellen (Mermaid oder Draw.io)
- [ ] Datenbankschema skizzieren (alle 7 Domains, Relationen)
- [ ] Rollenmodell definieren (`admin`, `manager`, `viewer` — was darf was?)
- [ ] Offene Tech-Entscheidungen finalisieren (Auth, Router — siehe tech-stack.md)

**Team-Standards:**

- [ ] Naming Conventions dokumentieren (Dateien, Funktionen, DB-Tabellen)
- [ ] ESLint-Regeln festlegen und einige Schüler validieren lassen
- [ ] Branch- und PR-Regeln kommunizieren
- [ ] Definition of Done (DoD) mit dem Team besprechen und bestätigen
- [ ] Review-Checkliste für PRs erstellen

**Lernziel dieser Phase:** Schüler verstehen, _warum_ Architektur vor Code kommt.

---

## Phase 0 — Fundament (Day 0)

> Blocker: Mentor klärt 2 offene Entscheidungen (siehe tech-stack.md) bevor Code geschrieben wird.

**Aufgaben:**

- [ ] GitHub-Repo anlegen, Schüler als Contributors einladen
- [ ] Monorepo-Struktur anlegen (`frontend/`, `shared/`, `supabase/`, `docs/`)
- [ ] Vite + TypeScript Frontend-Scaffold (`npm create vite@latest`)
- [ ] ESLint + Prettier konfigurieren
- [ ] Vitest einrichten + erste Smoke-Test-Datei
- [ ] husky + lint-staged für Pre-commit-Hook
- [ ] Supabase-Projekt anlegen, `.env.local` mit `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` (`.gitignore` prüfen!)
- [ ] Supabase CLI: `npx supabase init`, erste Migration anlegen
- [ ] RLS für alle Tabellen aktivieren: `deny all` als Ausgangsbasis
- [ ] `supabase gen types typescript` → `shared/contracts/database.types.ts`
- [ ] Shared Types Skelett: `Hotel`, `Booking`, `Supplier`, `Invoice`, `User`
- [ ] README mit Setup-Anleitung für neue Contributors
- [ ] Branch-Schutzregeln auf `main` aktivieren (keine Direct Pushes)

**✅ Prompt dafür:** `.github/prompts/project/day-0-setup.prompt.md`

---

## Phase 1 — Auth (Feature Slice 1)

> TDD-first: Tests vor Implementierung

**Scope:**

- Login / Logout
- Rollen: `admin`, `manager`, `viewer`
- Route Guards: geschützte Seiten nur für eingeloggte User

**Datenmodell (`shared/types/user.types.ts`):**

```ts
type UserRole = "admin" | "manager" | "viewer";

interface AppUser {
  uid: string;
  email: string;
  role: UserRole;
  displayName: string;
  createdAt: Date;
}
```

**Supabase RLS Policy Erweiterung:**

- Nur authentifizierte User können Daten lesen/schreiben
- `admin` darf alles, `viewer` darf nur lesen (via `auth.jwt() ->> 'role'`)

---

## Phase 2 — Hotel-Stammdaten

**Scope:**

- Hotels anlegen, bearbeiten, archivieren
- Hotelketten verwalten (eine Kette = N Hotels)
- Ein Kunde kann mehrere Hotelketten haben

**Datenmodell:**

```ts
interface Hotel {
  id: string;
  name: string;
  chainId: string | null; // null = eigenständiges Hotel
  address: Address;
  contactEmail: string;
  status: "active" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

interface HotelChain {
  id: string;
  name: string;
  ownerId: string; // referenz auf Customer/User
  hotelIds: string[];
}
```

---

## Phase 3 — Kunden / Kontakte (CRM-Kern)

**Scope:**

- Kundenstammdaten (Firmen und Einzelpersonen)
- Ansprechpartner pro Kunde
- Notizen und Aktivitäten

---

## Phase 4 — Buchungen / Termine

**Scope:**

- Buchung anlegen (Kunde + Hotel + Zeitraum)
- Buchungsstatus: `pending`, `confirmed`, `cancelled`
- Kalenderansicht (Monatsübersicht)

---

## Phase 5 — Lieferanten

**Scope:**

- Lieferanten anlegen und verwalten
- Zuordnung zu Hotels (welcher Lieferant beliefert welches Hotel)
- Kategorien: Lebensmittel, Reinigung, Technik, ...

---

## Phase 6 — Rechnungen / Invoices

**Scope:**

- Rechnung anlegen (Bezug zu Buchung oder Lieferant)
- Status: `draft`, `sent`, `paid`, `overdue`
- PDF-Export (Supabase Edge Function oder clientseitig mit jsPDF)

---

## Phase 7 — Dashboard / Reports

**Scope:**

- Kennzahlen: aktive Buchungen, offene Rechnungen, Lieferantenanzahl
- Filter nach Hotel / Hotelkette
- Einfache Datums-Range-Auswahl

---

## Team-Workflow

```
main (geschützt)
  └── develop
        └── feature/<beschreibung>   ← Schüler arbeiten hier
```

**Branch-Konvention:**

- `feature/auth-login`
- `feature/hotel-crud`
- `fix/booking-date-validation`
- `docs/readme-setup`

**PR Merge-Kriterien** — kein Merge ohne:

- [ ] Build grün
- [ ] Tests grün (Vitest)
- [ ] Kein ESLint-Fehler
- [ ] Mentor Code-Review und Approval

---

## Definition of Done (DoD) — pro Feature

Jedes Feature gilt als fertig, wenn alle Punkte erfüllt sind:

- [ ] Feature funktioniert wie spezifiziert
- [ ] Unit Tests vorhanden (alle grün)
- [ ] TypeScript-Typen sauber — kein `any`
- [ ] Kein ESLint-Fehler
- [ ] Keine Business-Logik im View-Layer
- [ ] PR erstellt mit aussagekräftiger Beschreibung
- [ ] Mentor hat approved

---

## Testing-Strategie (Test-Pyramide)

```
E2E / Integration   (wenige) — Login → Booking → Invoice Flow
Integration Tests   (einige) — Service + Supabase Interaktion
Unit Tests          (viele)  — Validatoren, Utils, Rollenlogik, Statuswechsel
```

**Unit Tests (Vitest) — Pflicht für:**

- Validator-Funktionen
- Util-Funktionen
- Rollenprüfungslogik
- Statusübergänge (z.B. Booking: pending → confirmed)
- Preisberechnungen (Invoices)

**Integration Tests — Pflicht für:**

- Auth Login/Logout Flow
- CRUD-Operationen pro Domain-Service

**E2E (optional, Phase 2+):**

- Kompletter User-Flow: Login → Dashboard → Buchung anlegen → Rechnung erstellen

---

## Offene Entscheidungen (Blocker für Day 0)

| Entscheidung  | Option A            | Option B           | Verantwortlich |
| ------------- | ------------------- | ------------------ | -------------- |
| Auth-System   | Supabase Auth       | Eigenes JWT        | Mentor         |
| Client-Router | Bibliothek (navigo) | Mini-Custom-Router | Mentor         |
