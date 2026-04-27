# Definition of Done (DoD) — Dev2K Hotel CRM

Ein Feature gilt als fertig, wenn alle Punkte dieser Checkliste erfüllt sind.
Kein PR wird gemergt, bevor die DoD vollständig erfüllt ist.

---

## Allgemein

- [ ] Code ist gegen `main` gerebased oder gemerged, keine Konflikte
- [ ] Alle Lint-Fehler behoben — kein `--force`, keine Fehler ignoriert
- [ ] TypeScript: kein `any`, kein `@ts-ignore`
- [ ] Kein `console.log` im finalen Code
- [ ] Kein Secret / API Key committed

## Tests

- [ ] Neue Logik hat mindestens 1 Unit-Test
- [ ] `npm test` — alle Tests grün
- [ ] `npm run typecheck` fehlerfrei
- [ ] Coverage ist nicht gefallen

## Datenbank (bei DB-Änderungen)

- [ ] Migration vorhanden (`supabase/migrations/`)
- [ ] RLS Policies definiert und geprüft (`deny all` als Ausgangsbasis)
- [ ] Generierte Typen aktuell: `supabase gen types typescript`

## Code-Qualität

- [ ] Keine Business-Logik im View-Layer — nur Services kennen Supabase
- [ ] SOLID-Prinzipien eingehalten — eine Verantwortung pro Service / Funktion
- [ ] Keine doppelten Code-Blöcke, die besser als shared util ausgelagert gehören

## Git & PR

- [ ] PR-Titel folgt Conventional Commits (`feat(hotels): add hotel list`)
- [ ] PR-Beschreibung erklärt Was und Warum
- [ ] PR-Template vollständig ausgefüllt
- [ ] Branch-Name folgt Konvention (`feature/`, `fix/`, `docs/`, `refactor/`)
- [ ] Lead hat reviewed und approved

## UI-Änderungen

- [ ] Screenshot oder kurze Demo im PR vorhanden
- [ ] Mobile First geprüft (kein horizontales Scrollen auf kleinen Screens)

---

## Quick-Reference (3-Sekunden-Check vor dem PR)

```
1. npm test             → alle grün?
2. npm run lint         → keine Errors?
3. npm run typecheck    → kein any, kein Fehler?
4. Kein console.log?
5. Lead informed?
```

---

Quelle: [workflow-backlog.md](./workflow-backlog.md) — Phase 1, Aufgabe 1.2
