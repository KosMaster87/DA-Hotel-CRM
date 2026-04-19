---
agent: "ask"
description: "Use when: investigating a bug or unexpected behavior in DA Hotel CRM"
argument-hint: "Bereich oder Datei wo der Bug auftritt (z.B. BookingService, hotel-form.view.ts)"
---

# Bug analysieren: $input

Lies zuerst: `.github/copilot-instructions.md` — dort stehen die Architekturregeln, nach denen wir suchen.

---

## 1. Symptom beschreiben

Beantworte diese Fragen bevor du weitermachst:

- **Was passiert?** (konkretes Fehlverhalten, Fehlermeldung, falscher Wert)
- **Wann passiert es?** (immer / nur bei bestimmten Eingaben / nach einem bestimmten Schritt)
- **Was sollte stattdessen passieren?**
- **Was hast du schon probiert?**

---

## 2. Bereich eingrenzen

Mögliche Ursachen in der Hotel-CRM-Architektur — von außen nach innen:

```
UI-Event (View)
  → Service-Call
    → Supabase-Query
      → RLS Policy
        → PostgreSQL
```

Prüfe der Reihe nach:

1. **View** — kommt das Event an? Was wird an den Service übergeben?
2. **Service** — ist der Supabase-Aufruf korrekt (`.eq()`, `.select()`, `.single()`)? Wird der Fehler geworfen?
3. **Supabase Client** — ist `VITE_SUPABASE_URL` und `VITE_SUPABASE_ANON_KEY` korrekt gesetzt?
4. **RLS** — blockiert eine Policy den Zugriff? (Supabase Dashboard → Table Editor → Policies)
5. **Migration** — ist die Tabelle / Spalte vorhanden? (`supabase/migrations/` prüfen)

---

## 3. Diagnose-Commands

```bash
# TypeScript-Fehler prüfen
npx tsc --noEmit

# ESLint-Fehler prüfen
npx eslint frontend/src

# Supabase Logs prüfen (lokal)
npx supabase logs

# Tests rund um den Fehler laufen lassen
npx vitest run src/services/$input.service.test.ts
```

---

## 4. Fix-Protokoll

Analysiere mögliche Ursachen, sortiert nach Wahrscheinlichkeit.

**Format für den Fix:**
1. **Root Cause** — was war wirklich falsch?
2. **Fix** — minimale, gezielte Änderung (kein Refactoring nebenbei)
3. **Betroffene Dateien** — welche Dateien ändern wir?
4. **Test** — welcher Test hätte diesen Bug gefangen?

---

## 5. Regression verhindern

Nach dem Fix:

- [ ] Test schreiben der den Bug reproduziert (erst rot, dann grün)
- [ ] `npx vitest run` — alle Tests grün
- [ ] `npx tsc --noEmit` — keine TypeScript-Fehler
- [ ] Commit mit `fix(bereich): <was war kaputt>`

```bash
git commit -m "fix($input): <beschreibung des bugs>"
```
