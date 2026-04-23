---
agent: "ask"
description: "Use when: reviewing a pull request, checking code quality, or auditing a file against Dev2K Hotel CRM standards"
argument-hint: "Dateipfad oder Feature-Name (z.B. src/services/hotel.service.ts)"
---

# Code Review: $input

Prüfe den Code gegen die Standards des Dev2K Hotel CRM.
Referenz: `.github/copilot-instructions.md` + `.github/AGENTS.md`

---

## 1. TypeScript-Qualität

- [ ] Kein `any` — alle Typen explizit
- [ ] Alle Funktionen haben expliziten Return-Type
- [ ] Interfaces aus `shared/types/` genutzt (nicht lokal dupliziert)
- [ ] `Create...Dto` / `Update...Dto` für Schreiboperationen genutzt
- [ ] `import type` für reine Typ-Imports

## 2. Architekturregeln

- [ ] Kein direkter Supabase-Call im View-Layer (`features/`)
- [ ] Business-Logik im Service, nicht im Event-Handler
- [ ] Services importieren aus `lib/supabase-client.ts` — kein eigener Client-Setup
- [ ] Shared Types aus `shared/` — nicht zwischen Dateien dupliziert
- [ ] Router-Logik nur in `router/` — nicht in Views oder Services

## 3. Service-Qualität

- [ ] Eine Klasse = eine Domain (kein Mega-Service)
- [ ] Fehler als `throw new Error(error.message)` — keine stillen Fehler
- [ ] Singleton-Instanz exportiert (`export const hotelService = new HotelService()`)
- [ ] Klasse separat exportiert (für Tests mockbar)

## 4. Tests

- [ ] Test-Datei vorhanden (`*.test.ts` oder `*.spec.ts`)
- [ ] Happy Path getestet
- [ ] Fehlerfall getestet (Supabase-Fehler)
- [ ] Domain-spezifische Business Rules getestet
- [ ] Kein `any` in Tests
- [ ] Tests laufen ohne echte DB (Supabase gemockt)

## 5. Security

- [ ] Keine Secrets oder API-Keys im Code
- [ ] Keine sensiblen Daten in `localStorage`
- [ ] Rollenprüfung im Frontend konsistent mit RLS Policies
- [ ] Neue Tabellen: RLS aktiviert und Policies vorhanden

## 6. Code-Hygiene

- [ ] ESLint fehlerfrei
- [ ] Keine auskommentierten Code-Blöcke
- [ ] Keine `console.log` in Produktionscode
- [ ] Naming Conventions eingehalten (camelCase Funktionen, PascalCase Klassen/Interfaces)
- [ ] Keine Magic Strings — Konstanten aus `shared/constants/`

## 7. Scope

- [ ] Kein Feature-Creep — PR macht nur was der Branch-Name verspricht
- [ ] Keine unnötigen Refactorings außerhalb des Scope
- [ ] Keine neuen Dependencies ohne Absprache

---

## Review-Ausgabe

Für jedes Problem angeben:
- **Datei + Zeile**
- **Problem** (was ist falsch)
- **Begründung** (welche Regel wird verletzt)
- **Vorschlag** (wie es besser wäre)

Format:
```
❌ frontend/src/features/hotels/hotel-list.view.ts:14
   Problem: Direkter Supabase-Call im View
   Regel: Kein Supabase-Call im View-Layer
   Vorschlag: hotelService.getAll() nutzen
```
