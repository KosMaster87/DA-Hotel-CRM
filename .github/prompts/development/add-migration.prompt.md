---
agent: "agent"
description: "Use when: adding a new Supabase migration, changing the DB schema, or adding/updating RLS policies for a table in DA Hotel CRM"
argument-hint: "TableName (z.B. hotels, bookings, suppliers)"
---

# Supabase Migration hinzufügen: $input

Lies zuerst: `.github/instructions/supabase-patterns.instructions.md`

---

## Wann diesen Prompt nutzen?

- Neue Tabelle anlegen
- Spalte hinzufügen oder umbenennen
- RLS Policy hinzufügen oder ändern
- Index für eine Query hinzufügen

**Nie die Datenbank direkt im Supabase-Dashboard ändern** — immer via Migration.

---

## Phase 1 — Migration-Datei erstellen

```bash
# Timestamp-Format: YYYYMMDDHHMMSS
npx supabase migration new $input_<beschreibung>
```

Erzeugt: `supabase/migrations/<timestamp>_$input_<beschreibung>.sql`

---

## Phase 2 — SQL schreiben

### Neue Tabelle

```sql
CREATE TABLE $input (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Pflichtfelder aus data-model.md übernehmen
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS sofort aktivieren
ALTER TABLE $input ENABLE ROW LEVEL SECURITY;
```

### Spalte hinzufügen

```sql
ALTER TABLE $input ADD COLUMN <column_name> <type> [NOT NULL] [DEFAULT <value>];
```

### Foreign Key

```sql
ALTER TABLE $input
  ADD CONSTRAINT fk_$input_<ref>
  FOREIGN KEY (<column>) REFERENCES <ref_table>(id)
  ON DELETE CASCADE;  -- oder SET NULL, je nach Fachlogik
```

---

## Phase 3 — RLS Policies

**Pflicht für jede neue Tabelle.** Kein `USING (true)` in Production.

```sql
-- Viewer, Manager und Admin dürfen lesen
CREATE POLICY "$input_select"
  ON $input FOR SELECT
  TO authenticated
  USING (true);  -- SELECT ohne Einschränkung für alle authentifizierten User

-- Nur Manager und Admin dürfen schreiben
CREATE POLICY "$input_insert"
  ON $input FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() ->> 'role')::text IN ('admin', 'manager'));

CREATE POLICY "$input_update"
  ON $input FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'role')::text IN ('admin', 'manager'));

-- Nur Admin darf löschen (soft delete bevorzugen)
CREATE POLICY "$input_delete"
  ON $input FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'role')::text = 'admin');
```

---

## Phase 4 — Migration ausführen & Typen generieren

```bash
# Migration lokal testen
npx supabase db reset

# TypeScript-Typen neu generieren (wichtig!)
npx supabase gen types typescript --local > shared/contracts/database.types.ts
```

Prüfe: `shared/contracts/database.types.ts` enthält die neue Tabelle.

---

## Phase 5 — Tests prüfen

```bash
npx vitest run
# Alle bestehenden Tests müssen weiterhin grün sein
```

---

## Checkliste

- [ ] Migration-Datei in `supabase/migrations/` (Timestamp-Name)
- [ ] RLS mit `ENABLE ROW LEVEL SECURITY`
- [ ] Policies für SELECT / INSERT / UPDATE / DELETE
- [ ] `shared/contracts/database.types.ts` aktuell
- [ ] Alle bestehenden Tests grün
- [ ] Kein direktes DB-Edit im Dashboard

## Commit

```bash
git commit -m "feat(supabase): add migration for $input table with RLS policies"
```
