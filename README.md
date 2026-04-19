# DA Hotel CRM

Vollständige CRM-WebApp zur Verwaltung von Hotels, Buchungen, Kunden, Lieferanten und Rechnungen. Gebaut im Rahmen der Developer-Akademie Weiterbildung mit Mentor und Schüler-Team.

**Stack:** Vanilla TypeScript · Vite · Supabase · Vitest

---

## Features

- **Hotels** — Stammdaten verwalten (Name, Adresse, Sterne, Kontakt)
- **Kunden** — Gäste und Firmen anlegen und pflegen
- **Buchungen** — Buchungsvorgang von Pending bis Checked-Out
- **Lieferanten** — Verträge und Kontakte verwalten
- **Rechnungen** — Rechnungen aus Buchungen generieren und nachverfolgen
- **Dashboard** — Kennzahlen auf einen Blick (KPIs, offene Buchungen, Umsatz)
- **Auth** — Rollenbasierter Zugriff (Admin / Manager / Viewer)

---

## Installation

```bash
# 1. Clone & install
git clone https://github.com/<user>/da-hotel-crm.git && cd da-hotel-crm/hotel-crm
npm install

# 2. Supabase lokal starten (Docker erforderlich)
npx supabase start

# 3. Datenbank-Schema anlegen
npx supabase db reset

# 4. TypeScript-Typen generieren
npx supabase gen types typescript --local > shared/contracts/database.types.ts

# 5. Environment konfigurieren
cp .env.example .env
# .env mit den Werten aus Schritt 2 befüllen (supabase start gibt sie aus)

# 6. Dev-Server starten
npm run dev
```

Frontend läuft auf `http://localhost:5173`.

---

## Configuration

`.env.example` kopieren und befüllen:

```env
# Supabase Verbindung (Werte kommen von: npx supabase start)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

| Variable                 | Pflicht | Beschreibung                                              |
| ------------------------ | ------- | --------------------------------------------------------- |
| `VITE_SUPABASE_URL`      | ja      | Supabase-Projekt-URL (lokal: `http://localhost:54321`)    |
| `VITE_SUPABASE_ANON_KEY` | ja      | Anon Key des Projekts (kein Secret — nur für Public APIs) |

---

## Testing

```bash
npm test              # alle Tests einmalig ausführen
npm run test:watch    # Watch-Modus während der Entwicklung
npm run test:coverage # Coverage-Report
```

Supabase-Aufrufe werden in Tests via `vi.mock` gemockt — kein laufender Supabase-Server nötig.

---

## Commands

```bash
npm run dev      # Dev-Server (Vite)
npm run build    # Production Build
npm run preview  # Build lokal vorschauen
npm test         # Vitest
npm run lint     # ESLint
npm run format   # Prettier
```

---

## Projektstruktur

```
hotel-crm/
  frontend/
    src/
      features/       — Domain-Views (hotels, bookings, ...)
      services/       — Business Logic + Supabase-Aufrufe
      components/     — Wiederverwendbare UI-Elemente
      router/         — Client-Side Routing
      lib/            — supabase-client.ts
  shared/
    types/            — TypeScript Interfaces + DTOs
    contracts/        — Generierte Supabase-Typen (database.types.ts)
    constants/        — Projekt-weite Konstanten
  supabase/
    migrations/       — SQL-Migrationen (versioniert)
    functions/        — Edge Functions (falls genutzt)
  docs/
    architecture/     — Tech-Stack, Datenmodell
    governance/       — Mission Statement, Policies
    training/         — 8-Wochen-Plan
```

---

## AI-Unterstützung

Dieses Projekt nutzt GitHub Copilot mit project-spezifischen Anweisungen:

| Prompt              | Beschreibung                            |
| ------------------- | --------------------------------------- |
| `new-feature-slice` | Neues Domain-Feature end-to-end anlegen |
| `add-migration`     | Supabase Migration + RLS Policies       |
| `code-review`       | Code gegen Projekt-Standards prüfen     |
| `debug`             | Bug analysieren und fixen               |
| `deploy-check`      | Vor dem Merge / Deploy prüfen           |

Dateien in `.github/prompts/` und `.github/instructions/`.

---

## Architektur-Entscheide (offen)

| Bereich              | Optionen                      | Entscheid durch   |
| -------------------- | ----------------------------- | ----------------- |
| Auth-Implementierung | Supabase Auth vs. eigenes JWT | Mentor (Phase -1) |
| Client-Router        | Eigener Router vs. navigo     | Mentor (Phase -1) |

Details: [docs/architecture/tech-stack.md](docs/architecture/tech-stack.md)

---

## Tech Stack

Vanilla TypeScript · Vite · Supabase (PostgreSQL + Auth + RLS) · Vitest · ESLint · Prettier

---

## License

Apache 2.0
