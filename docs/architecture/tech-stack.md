# Tech-Stack — DA Hotel CRM

## Status der Entscheidungen

| Bereich        | Entscheidung                           | Status             |
| -------------- | -------------------------------------- | ------------------ |
| Frontend       | Vanilla TypeScript + Vite              | ✅ bestätigt       |
| Datenbank      | Supabase (PostgreSQL)                  | ✅ bestätigt       |
| Auth           | Supabase Auth vs. eigenes JWT          | ⏳ Mentor Decision |
| Linting        | ESLint + Prettier                      | ✅ bestätigt       |
| Struktur       | Monorepo                               | ✅ bestätigt       |
| Testing        | Vitest                                 | ✅ bestätigt       |
| Client-Routing | Eigener Router vs. Bibliothek (navigo) | ⏳ Mentor Decision |

---

## Bestätigte Entscheidungen

### Frontend: Vanilla TypeScript + Vite

**Begründung:** Im Ausbildungskontext lernen die Schüler zuerst ohne Framework-Magie.
Vanilla TS + Vite zeigt klar, wie DOM-Manipulation, Event-Handling, Services und
Routing wirklich funktionieren — bevor Abstraktion durch Frameworks hinzukommt.

**Konsequenz:** Kein Two-Way-Binding, kein reactives State-Management Framework.
State und Rendering werden manuell oder über einfache Service-Patterns verwaltet.

### Datenbank: Supabase (PostgreSQL)

**Begründung:** Supabase kombiniert PostgreSQL mit einer REST/Realtime-API und einem
integrierten Auth-System. Relational statt NoSQL — klarer für Schüler, die SQL lernen.
Row Level Security (RLS) ersetzt serverseitige Validierungsschichten.

**Konsequenz:** Relationales Datenmodell mit Migrationen. Typen werden automatisch
generiert (`supabase gen types typescript`). RLS Policies müssen für jede Tabelle
bewusst definiert werden — nie `USING (true)` in Production.

### Linting: ESLint + Prettier

**Begründung:** Weit verbreitet, viel Community-Support, IDE-Integration gut.
Alle Teammitglieder haben das gleiche Code-Format — keine Style-Diskussionen in Reviews.

**Konsequenz:** `.eslintrc.json` und `.prettierrc` im Root des Repos.
Pre-commit Hook (husky + lint-staged) sorgt für automatische Prüfung.

---

## Offene Entscheidungen (Mentor)

### Auth: Option A — Supabase Auth

```
Browser (TS + Vite)
    ↓
Supabase JS Client
    ↓
Supabase Auth + PostgreSQL (RLS)
```

**Vorteile:** Direkt integriert, kein eigener Auth-Server, JWT automatisch verwaltet.
**Nachteile:** Abhängigkeit von Supabase-Plattform.

---

### Auth: Option B — Eigenes JWT-System

```
Browser (TS + Vite)
    ↓
Eigene Auth-API (Node.js + Express)
    ↓
JWT signieren/prüfen + Supabase Service Role Key
```

**Vorteile:** Volle Kontrolle, klassischer Lernpfad für JWT-Konzepte.
**Nachteile:** Mehr Infrastruktur, eigener Token-Refresh, Komplexität steigt.

---

## Monorepo-Struktur (geplant)

```
hotel-crm/
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── hotels/
│   │   │   ├── bookings/
│   │   │   ├── suppliers/
│   │   │   ├── invoices/
│   │   │   └── dashboard/
│   │   ├── services/       ← Supabase-Wrapper + Business-Logik
│   │   ├── components/     ← wiederverwendbare UI-Elemente
│   │   ├── router/         ← clientseitiges Routing
│   │   └── utils/
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── shared/
│   ├── types/              ← Hotel, Booking, Supplier, Invoice, User ...
│   ├── contracts/          ← generierte DB-Typen (supabase gen types)
│   └── constants/          ← Rollen, Status-Werte
├── supabase/
│   ├── migrations/         ← SQL-Migrationsdateien
│   ├── seed.sql            ← Testdaten für Entwicklung
│   └── functions/          ← Edge Functions (optional)
├── docs/
│   ├── architecture/
│   └── governance/
└── .github/
    ├── copilot-instructions.md
    ├── AGENTS.md
    └── instructions/
```
