---
agent: "ask"
description: "Use when: preparing a PR merge or production deployment — runs through the full hotel CRM quality gate"
---

# Deploy-Check — Dev2K Hotel CRM

Führe alle Punkte durch, bevor ein Branch gemergt oder ein Build deployt wird.

---

## 1. Code-Qualität

```bash
# TypeScript — keine Fehler
npx tsc --noEmit

# ESLint — keine Warnings oder Errors
npx eslint frontend/src shared/

# Tests — alle grün
npx vitest run

# Coverage-Grenze prüfen (min. 80% für Services)
npx vitest run --coverage
```

- [ ] `tsc --noEmit` fehlerfrei
- [ ] ESLint fehlerfrei (kein `any`, keine ungenutzten Imports)
- [ ] Alle Tests grün
- [ ] Neue Features haben Tests

---

## 2. Code-Hygiene

- [ ] Keine `console.log` im Produktionscode
- [ ] Keine auskommentierten Code-Blöcke
- [ ] Keine `TODO` / `FIXME` ohne zugehöriges GitHub Issue
- [ ] Keine `debugger`-Statements
- [ ] Keine Magic Strings — Konstanten aus `shared/constants/`

---

## 3. Datenbank & Supabase

- [ ] Neue Tabellen haben Migrations-Datei in `supabase/migrations/`
- [ ] RLS ist für jede neue Tabelle aktiviert (`ENABLE ROW LEVEL SECURITY`)
- [ ] Policies für SELECT / INSERT / UPDATE / DELETE vorhanden
- [ ] `shared/contracts/database.types.ts` ist aktuell (`supabase gen types` wurde ausgeführt)
- [ ] Keine direkten Supabase-Calls im View-Layer (`features/`)

---

## 4. Security

- [ ] Keine API-Keys, Secrets oder Tokens im Code
- [ ] `.env` nicht committed (steht in `.gitignore`)
- [ ] `.env.example` vollständig (alle benötigten Keys mit leerem Wert)
- [ ] CORS korrekt konfiguriert (kein Wildcard in Production)
- [ ] Rollenprüfung im Frontend konsistent mit RLS Policies

---

## 5. PR-Qualität

- [ ] PR-Beschreibung erklärt: Was wurde geändert? Warum?
- [ ] Kein Feature-Creep (PR macht nur, was der Branch-Name verspricht)
- [ ] Breaking Changes dokumentiert
- [ ] Screenshots / GIF bei UI-Änderungen

---

## 6. Build prüfen

```bash
npm run build
npm run preview
```

- [ ] Build läuft ohne Fehler durch
- [ ] Preview zeigt die App korrekt an (kein weißer Bildschirm)
- [ ] Routing funktioniert (direkte URLs)

---

## Freigabe

Alle Punkte grün → PR kann gemergt werden.

Bei offenen Punkten: erst fixen, dann neu prüfen — kein "wird schon passen".
