---
agent: "agent"
description: "Use when: starting any new feature, onboarding a new contributor, or when an agent needs full project context before working on Dev2K Hotel CRM."
---

# Dev2K Hotel CRM — Projekt-Context für Agenten

## Was wir bauen

Ein produktionsreifes TypeScript-CRM für Hotelverwaltung.
Kontext: Dev2K Eigenprojekt.

**Domains:** Hotels & Hotelketten, Kunden/Kontakte, Buchungen/Termine, Lieferanten, Rechnungen, Dashboard.

## Tech-Stack

- **Frontend:** Vanilla TypeScript + Vite (kein Framework)
- **Datenbank:** Supabase (PostgreSQL + RLS)
- **Testing:** Vitest
- **Linting:** ESLint + Prettier
- **Struktur:** Monorepo

## Ordnerstruktur

```
hotel-app-dev2k/
├── frontend/src/
│   ├── features/        ← auth/, hotels/, bookings/, suppliers/, invoices/, dashboard/
│   ├── services/        ← Supabase-Wrapper + Business-Logik (ein Service pro Domain)
│   ├── components/      ← wiederverwendbare UI ohne Domain-Wissen
│   └── router/          ← clientseitiges Routing
├── shared/
│   ├── types/           ← alle TypeScript Interfaces
│   ├── contracts/       ← generierte DB-Typen (supabase gen types)
│   └── constants/       ← Rollen, Status-Werte
└── supabase/
    ├── migrations/      ← SQL Migrations (nie manuell in DB ändern)
    └── functions/       ← Edge Functions
```

## Architekturregeln

- Kein direkter Supabase-Call im View-Layer — ausschließlich über `services/`
- Kein `any` in TypeScript
- Business-Logik gehört in Services, nicht in UI-Komponenten
- Shared Types in `shared/types/` — nie duplizieren
- SOLID: ein Service = eine Domain-Verantwortung

## Security

- Supabase RLS für jede Tabelle aktiviert — kein `USING (true)` in Production
- Rollenprüfung im Frontend UND in RLS Policies
- Secrets niemals committen — `.env.local` bleibt lokal

## Definition of Done (DoD)

Ein Feature ist fertig wenn:

- Feature funktioniert wie spezifiziert
- TypeScript fehlerfrei, kein `any`
- ESLint sauber
- Tests grün (Vitest)
- Keine Architekturgrenzen verletzt
- PR erstellt und Lead-approved

## Prioritäten bei Entscheidungen

1. Sicherheit
2. Korrektheit
3. Wartbarkeit
4. Lesbarkeit
5. Performance
6. Komfort

## Weiterführende Dokumente

- Architektur-Details: `docs/architecture/tech-stack.md`
- Projektphasen: `docs/PROJECT-PLAN.md`
- Entwicklungsplan: `docs/training/8-week-plan.md`
- Agent-Regeln: `.github/AGENTS.md`
- Vollständige Coding-Regeln: `.github/copilot-instructions.md`
