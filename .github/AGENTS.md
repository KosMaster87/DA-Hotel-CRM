# DA Hotel CRM — Agent Playbook

## Grundsatz

Nutze Agenten für mehrstufige Multi-File-Aufgaben, nicht für triviale Einzeländerungen.

## Wann Agenten nutzen

- mehr als 3 betroffene Dateien
- Refactorings über frontend, shared und supabase
- Architekturänderungen oder Type-Restructure
- Security-Review bei Auth- oder RLS-Policy-Änderungen

## Wann direkt arbeiten

- kleine Einzeldatei-Anpassungen
- Text- und Label-Updates
- reine Styling-Korrekturen ohne Logikänderung

## Standard-Workflow

1. Explore: Auswirkungen und betroffene Module ermitteln
2. Plan: kleine, testbare Schritte definieren
3. Execute: Schrittweise umsetzen
4. Validate: Tests/Lint prüfen
5. Review: Diff und Risiken checken

## Kritische Bereiche

- `supabase/migrations/` — Migrations nie ohne Review ändern
- `supabase/policies/` — RLS Policies betreffen Datensicherheit direkt
- `shared/types/` — Breaking Changes an Typen betreffen alle Features
- `frontend/src/services/auth/` — Auth-Logik besonders sorgfältig
- `frontend/src/router/` — Routing-Änderungen betreffen alle Views

## Definition of Done

- Verhalten korrekt und getestet (Vitest)
- Types in shared/ vollständig und konsistent
- keine Architekturgrenzen verletzt (kein direkter Supabase-Call im View-Layer)
- RLS Policies geprüft bei Datenmodell-Änderungen
- kein Scope-Creep in V1

## Agenten dürfen NICHT

- ungefragt Architektur oder Ordnerstruktur ändern
- große Refactorings außerhalb des beauftragten Scope machen
- npm-Dependencies ohne explizite Anfrage installieren
- Sicherheit lockern (RLS deaktivieren, `any` einführen, Secrets hardcoden)
- Dateien löschen ohne klaren Auftrag
- Naming Conventions brechen

## Agenten SOLLEN

- bestehende Patterns und Strukturen aus dem Projekt übernehmen
- kleine, saubere Commits mit Conventional Commits erzeugen
- Typisierung konsequent einhalten — kein `any`
- Tests bei jeder Implementierung mitliefern
- Wiederverwendbare Teile aus `components/` und `shared/` nutzen

## Prioritäten-Reihenfolge

Wenn Entscheidungen getroffen werden müssen, gilt diese Reihenfolge:

1. **Sicherheit** — RLS, keine Secrets, Rollenprüfung
2. **Korrektheit** — Feature funktioniert wie spezifiziert
3. **Wartbarkeit** — SOLID, kleine Funktionen, klare Verantwortlichkeiten
4. **Lesbarkeit** — gute Namen, kein unnötiger Kommentar
5. **Performance** — nur wenn messbar notwendig
6. **Komfort** — DX-Verbesserungen als letztes

## Mentor Review Checkliste

Bei jedem PR prüfen:

- Ist der Code verständlich ohne Erklärung?
- Ist es zu komplex für eine Funktion / einen Service?
- Ist es testbar (kein versteckter State, keine harten Abhängigkeiten)?
- Ist das Naming eindeutig und konsistent?
- Gibt es Duplicate Code, der in `shared/` gehört?
- Ist Security berücksichtigt (RLS, Rollenprüfung)?
- Ist der Scope passend — kein Feature-Creep?
