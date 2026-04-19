---
applyTo: "frontend/src/services/**/*.ts,supabase/**/*.sql,supabase/**/*.ts,shared/contracts/**/*.ts"
---

# Supabase Patterns — DA Hotel CRM

Diese Regeln gelten für alle Supabase-Aufrufe und SQL-Dateien im Projekt.

---

## Client Setup

**Einziger Client im Projekt** — immer aus `lib/supabase-client.ts` importieren:

```typescript
// lib/supabase-client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../shared/contracts/database.types';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) throw new Error('Supabase env vars missing');

export const supabase = createClient<Database>(url, key);
```

**Verboten:** eigenen `createClient()` in Service-Dateien aufrufen.

---

## Query-Patterns

### SELECT — alle Einträge

```typescript
const { data, error } = await supabase
  .from('hotels')
  .select('*')
  .order('name');

if (error) throw new Error(error.message);
return data;
```

### SELECT — mit Relation (Join)

```typescript
const { data, error } = await supabase
  .from('bookings')
  .select(`
    *,
    hotel:hotels(id, name),
    customer:customers(id, first_name, last_name)
  `)
  .eq('id', id)
  .single();

if (error) throw new Error(error.message);
return data;
```

### INSERT

```typescript
const { data, error } = await supabase
  .from('hotels')
  .insert(dto)
  .select()
  .single();

if (error) throw new Error(error.message);
return data;
```

### UPDATE

```typescript
const { data, error } = await supabase
  .from('hotels')
  .update(dto)
  .eq('id', id)
  .select()
  .single();

if (error) throw new Error(error.message);
return data;
```

### DELETE (nur Admin)

```typescript
const { error } = await supabase
  .from('hotels')
  .delete()
  .eq('id', id);

if (error) throw new Error(error.message);
```

---

## Fehlerbehandlung

- Immer `if (error) throw new Error(error.message)` direkt nach dem Aufruf
- Kein stilles `return null` bei Fehler
- Kein `try/catch` im Service — der View/Aufrufer behandelt den Fehler
- `error.message` gibt eine verständliche Meldung für `console.error` im View

---

## TypeScript-Typen

Generierte Typen aus `shared/contracts/database.types.ts` nutzen:

```typescript
import type { Database } from '../../../shared/contracts/database.types';
import type { Hotel, CreateHotelDto } from '../../../shared/types/hotel.types';

// Für Insert/Update: generierte Insert-Typen für interne Konsistenz
type HotelInsert = Database['public']['Tables']['hotels']['Insert'];
```

Typen neu generieren nach jeder Migration:
```bash
npx supabase gen types typescript --local > shared/contracts/database.types.ts
```

---

## RLS Policy-Vorlage

Jede neue Tabelle braucht diese vier Policies:

```sql
ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;

-- Alle authentifizierten User dürfen lesen
CREATE POLICY "<table>_select"
  ON <table> FOR SELECT TO authenticated
  USING (true);

-- Nur manager/admin dürfen schreiben
CREATE POLICY "<table>_insert"
  ON <table> FOR INSERT TO authenticated
  WITH CHECK ((auth.jwt() ->> 'role')::text IN ('admin', 'manager'));

CREATE POLICY "<table>_update"
  ON <table> FOR UPDATE TO authenticated
  USING ((auth.jwt() ->> 'role')::text IN ('admin', 'manager'));

-- Nur admin darf löschen
CREATE POLICY "<table>_delete"
  ON <table> FOR DELETE TO authenticated
  USING ((auth.jwt() ->> 'role')::text = 'admin');
```

---

## Auth-Hilfsfunktionen

```typescript
// aktuelle Session prüfen
const { data: { session } } = await supabase.auth.getSession();
if (!session) throw new Error('Nicht authentifiziert');

// Rolle aus JWT
const role = session.user.user_metadata['role'] as string | undefined;
```

---

## Was vermeiden

- ❌ `.select('*')` in Production mit großen Tabellen — explizite Spalten angeben
- ❌ N+1 Queries — Relations via `.select()` mit Join holen, nicht in Loop
- ❌ Supabase direkt im View-Layer aufrufen — immer über Service-Klasse
- ❌ `userauthtoken` oder anon key im Code — nur in `.env`-Datei
