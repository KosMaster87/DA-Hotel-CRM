# Contributing — DA Hotel CRM

Willkommen im DA Hotel CRM Projekt. Dieses Repository dient als Vorlage und Lernprojekt
im Rahmen der Developer-Akademie Weiterbildung.

---

## Erste Schritte

```bash
# Setup
npm install
npx supabase start
npx supabase db reset
npx supabase gen types typescript --local > shared/contracts/database.types.ts
cp .env.example .env
npm run dev
```

Detaillierte Anleitung: [README.md](README.md)

---

## Grundregeln

1. Arbeite in kleinen, reviewbaren Pull Requests — eine Feature pro Branch
2. **TDD-first** — Tests schreiben bevor der Code existiert (Red → Green → Refactor)
3. Kein `any` in TypeScript — Typen sind Pflicht
4. Kein direkter Supabase-Call im View-Layer — immer über Services
5. Neue Tabellen brauchen immer eine Migration und RLS Policies

---

## Branching

```
feature/<kurze-beschreibung>    — neues Feature
fix/<kurze-beschreibung>        — Bugfix
docs/<kurze-beschreibung>       — Dokumentation
refactor/<kurze-beschreibung>   — Refactoring ohne Verhaltensänderung
```

## Conventional Commits

```
feat(hotels): add hotel list view with pagination
fix(booking): correct date validation logic
test(supplier): add service unit tests
docs(readme): update installation steps
refactor(auth): extract role check to helper
```

---

## Pull Request Checklist

- [ ] `npx tsc --noEmit` fehlerfrei
- [ ] `npx eslint frontend/src shared/` fehlerfrei
- [ ] `npx vitest run` — alle Tests grün
- [ ] Neue Features haben Tests
- [ ] RLS Policies für neue Tabellen vorhanden
- [ ] `shared/contracts/database.types.ts` aktuell
- [ ] Keine `console.log`, keine `any`, keine Secrets

Den vollständigen Deploy-Check: `.github/prompts/quality/deploy-check.prompt.md`

---

## AI-Unterstützung nutzen

Dieses Projekt hat Copilot-Prompts für die häufigsten Aufgaben:

```
new-feature-slice   → neues Domain-Feature end-to-end
add-migration       → Supabase Migration + RLS
code-review         → Code gegen Projekt-Standards prüfen
debug               → Bug systematisch analysieren
deploy-check        → vor dem Merge
```

Alle Prompts in `.github/prompts/` — in VS Code via `@workspace /promptname` aufrufbar.

---

## Fragen?

Über GitHub Issues oder direkt im Team-Kanal der Developer-Akademie.
