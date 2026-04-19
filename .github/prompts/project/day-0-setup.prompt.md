---
agent: "agent"
description: "Use when: setting up day-0 structure for DA Hotel CRM with Vanilla TypeScript + Vite + Supabase, ESLint + Prettier and TDD-first standards."
---

# Day 0 Setup — DA Hotel CRM

## Goal

Create or validate the Day-0 project setup. Keine Business-Features implementieren —
nur Fundament und Werkzeuge bereitstellen.

## Requirements

1. Monorepo-Struktur: `frontend/`, `shared/`, `supabase/`, `docs/`.
2. Vite + TypeScript Frontend-Scaffold (kein Framework).
3. ESLint + Prettier konfiguriert und für alle `.ts`-Dateien aktiv.
4. Vitest als Testing-Framework eingerichtet — eine Smoke-Test-Datei vorhanden.
5. Shared-Ordner mit initialen Typen für die 7 Domains.
6. Supabase-Projekt verknüpft — `.env.local` mit `VITE_SUPABASE_URL` und `VITE_SUPABASE_ANON_KEY` (nie commiten).
7. Supabase CLI installiert (`npx supabase init`), erste Migration vorhanden.
8. RLS für alle Tabellen aktiviert — Policies: `deny all` als Ausgangsbasis.
9. `supabase gen types typescript` eingerichtet, Output in `shared/contracts/database.types.ts`.
10. `README.md` mit Setup-Schritten für neue Contributors.
11. `CONTRIBUTING.md` mit Commit-Konventionen und Branch-Strategie.

## Open Decisions (Mentor klärt vor Start)

- [ ] Auth: Supabase Auth ODER eigenes JWT?
- [ ] Clientseitiges Routing: eigener Mini-Router ODER Bibliothek (z.B. `navigo`)?

## Output Format

1. Erstellte oder aktualisierte Dateien (mit Pfad)
2. Ausgeführte Befehle
3. Offene Entscheidungen (mit Kontext)
4. Empfohlener erster Feature-Slice (TDD-first): Auth
