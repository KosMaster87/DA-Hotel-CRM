---
agent: "agent"
description: "Use when: implementing a new domain feature end-to-end in Dev2K Hotel CRM (types → migration → service → view)"
argument-hint: "DomainName (hotel | booking | supplier | invoice | customer | auth)"
---

# Neuer Feature Slice: $input

Vollständiger TDD-first Ablauf für eine neue Domain im Dev2K Hotel CRM.
Lies zuerst: `.github/copilot-instructions.md` und `.github/instructions/fullstack-architecture.instructions.md`

---

## Phase 1 — Typen definieren

**Datei:** `shared/types/$input.types.ts`

- Interface für die Entität (Felder aus dem Datenmodell in `docs/architecture/data-model.md`)
- `Create$InputDto` = Omit<$Input, 'id' | 'created_at' | 'updated_at'>
- `Update$InputDto` = Partial<Create$InputDto>
- Status-Werte als Union-Type (nicht als enum)
- Kein `any`

---

## Phase 2 — Supabase Migration

**Datei:** `supabase/migrations/<timestamp>_create_$input.sql`

```sql
-- Tabelle anlegen
CREATE TABLE $input (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- ... Domain-Felder
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS aktivieren (Pflicht)
ALTER TABLE $input ENABLE ROW LEVEL SECURITY;

-- Policies: deny all als Ausgangsbasis, dann explizit erlauben
CREATE POLICY "$input_select_authenticated"
  ON $input FOR SELECT
  TO authenticated
  USING (true);  -- später auf Rollenprüfung einschränken

CREATE POLICY "$input_insert_manager"
  ON $input FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' IN ('admin', 'manager'));

CREATE POLICY "$input_update_manager"
  ON $input FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('admin', 'manager'));
```

Migration ausführen:
```bash
npx supabase db reset
npx supabase gen types typescript --local > shared/contracts/database.types.ts
```

---

## Phase 3 — Service Tests (Red Phase)

**Datei:** `frontend/src/services/$input.service.test.ts`

Tests schreiben — **bevor** der Service existiert:
- `getAll()` — gibt Array zurück, wirft Error bei DB-Fehler
- `getById(id)` — gibt ein Objekt zurück
- `create(dto)` — gibt neues Objekt zurück
- `update(id, dto)` — gibt aktualisiertes Objekt zurück
- Domain-spezifische Business Rules (z.B. Statuswechsel)

```bash
npx vitest run src/services/$input.service.test.ts
# → Tests müssen ROT sein
```

---

## Phase 4 — Service implementieren (Green Phase)

**Datei:** `frontend/src/services/$input.service.ts`

- Klasse `$InputService` + exportierte Singleton-Instanz
- Supabase-Client aus `lib/supabase-client.ts` importieren
- Typen aus `shared/types/$input.types.ts` nutzen
- Alle Methoden: `async`, expliziter Return-Type, `throw new Error(error.message)`
- Kein `any`

```bash
npx vitest run src/services/$input.service.test.ts
# → Tests müssen GRÜN sein
```

---

## Phase 5 — Views bauen

**Dateien:**
- `frontend/src/features/$input/$input-list.view.ts`
- `frontend/src/features/$input/$input-form.view.ts`

Regeln:
- Kein direkter Supabase-Call — nur über `$inputService`
- Fehlerfall im UI anzeigen (kein stilles Scheitern)
- `extractFormData()` als separate Funktion
- Keine Business-Logik im Event-Handler

---

## Phase 6 — Router eintragen

**Datei:** `frontend/src/router/routes.ts`

```typescript
{ path: '/$input', render: render$InputList },
{ path: '/$input/new', render: render$InputForm },
{ path: '/$input/:id/edit', render: (el, p) => render$InputForm(el, p.id) },
```

---

## Definition of Done

- [ ] Types in `shared/types/` vollständig, kein `any`
- [ ] Migration in `supabase/migrations/` vorhanden
- [ ] RLS Policies für SELECT / INSERT / UPDATE
- [ ] `supabase gen types` aktuell in `shared/contracts/`
- [ ] Service-Tests alle grün
- [ ] Views laden Daten und zeigen Fehler an
- [ ] Router-Einträge vorhanden
- [ ] ESLint fehlerfrei

## Commit

```bash
git commit -m "feat($input): add $input feature slice (types, service, views)"
```
