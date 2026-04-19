# DA Hotel CRM — 8-Wochen Ausbildungsplan

**Format:** Bootcamp-Stil | Mentor + Schüler-Team
**Ziel:** Junior-Entwickler von Null zu einem produktionsreifen CRM-Beitrag

---

## Rollen im Projekt

| Rolle                  | Verantwortung                                                                |
| ---------------------- | ---------------------------------------------------------------------------- |
| **Mentor (Tech Lead)** | Architektur vorgeben, PRs reviewen, Refactoring erklären, Standards schützen |
| **Schüler (Dev Team)** | Features bauen, Tests schreiben, PRs erstellen, Reviews lernen               |

---

## Woche 1 — Grundlagen & Setup

**Lernziele:**

- Git Workflow verstehen und anwenden
- Monorepo-Struktur navigieren
- Entwicklungsumgebung vollständig einrichten
- Ersten Commit erstellen

**Mentor-Aufgaben:**

- Phase -1 Engineering Setup abschließen (Architekturdiagramm, Coding Guidelines)
- Offene Tech-Entscheidungen finalisieren (Auth, Router)
- Kick-off-Session: Architektur erklären, SOLID vorstellen

**Schüler-Aufgaben:**

- Repo klonen, Setup nach README durchführen
- ESLint + Prettier zum Laufen bringen
- Ersten eigenen Feature Branch erstellen: `docs/my-first-branch`
- Eine leere Datei in `shared/types/` anlegen, PR erstellen
- Git-Workflow üben: Branch → Commit → Push → PR → Review → Merge

**Deliverable:** Alle Schüler haben einen gemergten PR.

---

## Woche 2 — TypeScript Grundlagen im Projekt

**Lernziele:**

- TypeScript Interfaces und Types im echten Projekt einsetzen
- Shared Types verstehen und nutzen
- Ersten Unit Test schreiben (Vitest)

**Mentor-Aufgaben:**

- Datenmodell-Session: Hotel, Customer, Booking, Invoice als Diagramm erklären
- TypeScript-Review: Interfaces vs. Types, `readonly`, optionale Felder

**Schüler-Aufgaben:**

- Shared Types für `Hotel` und `HotelChain` vollständig implementieren
- Shared Types für `Customer` implementieren
- Erste Unit Tests für Validator-Funktionen schreiben
- PR erstellen — Mentor reviewed auf TypeScript-Qualität

**Deliverable:** `shared/types/` mit Hotel- und Customer-Typen, alle Tests grün.

---

## Woche 3 — Auth Feature

**Lernziele:**

- Auth-Flow verstehen (Login, Session, Token)
- Route Guards implementieren
- Rollen und Berechtigungen im Frontend durchsetzen
- Supabase Auth (oder JWT) in der Praxis

**Mentor-Aufgaben:**

- Auth-Architektur vorstellen: wie Session-Management funktioniert
- RLS Policies für Auth-Tabelle gemeinsam schreiben
- Code Review: Rollenlogik prüfen

**Schüler-Aufgaben:**

- `auth.service.ts` implementieren (Login, Logout, Session lesen)
- Login-UI bauen (Form + Validierung)
- Route Guard implementieren (nicht eingeloggte User weiterleiten)
- Unit Tests für Rollenprüfungslogik
- Integration Test für Login Flow

**Definition of Done:** Eingeloggte User sehen Dashboard, ausgeloggte werden zum Login weitergeleitet.

---

## Woche 4 — Hotel-Stammdaten (CRUD)

**Lernziele:**

- CRUD-Pattern in TypeScript Services
- Supabase Queries typisiert einsetzen
- Service-Layer sauber von UI trennen
- Formulare mit Validierung bauen

**Mentor-Aufgaben:**

- SOLID S-Prinzip live demonstrieren: `HotelService` vs. `HotelChainService`
- Supabase Query-Patterns zeigen (select, insert, update, soft delete)
- Architekturgrenze einhalten: kein direkter Supabase-Call im View

**Schüler-Aufgaben:**

- `hotel.service.ts` mit CRUD-Methoden implementieren
- Hotel-Liste View bauen
- Hotel anlegen / bearbeiten Form bauen
- Soft Delete (Status `archived`) implementieren
- Unit Tests für `hotel.service.ts`
- RLS Policy: Manager darf Hotels lesen/schreiben, Viewer nur lesen

**Definition of Done:** Hotels anlegen, bearbeiten, archivieren — alles mit RLS abgesichert.

---

## Woche 5 — Kunden / Kontakte (CRM-Kern)

**Lernziele:**

- Relationen in PostgreSQL (Customer → Hotels)
- Supabase Joins in Queries
- Komponenten wiederverwenden (aus Woche 4 lernen)

**Mentor-Aufgaben:**

- Datenbankrelationen erklären: Customer → HotelChain → Hotel
- Code Review: Duplikate aus Woche 4 erkennen und refactoren

**Schüler-Aufgaben:**

- `customer.service.ts` implementieren
- Kunden-Liste und Detail-View bauen
- Ansprechpartner-Zuordnung implementieren
- Notizen zu Kunden speichern
- Unit Tests für Customer-Service

**Definition of Done:** Kunden anlegen, mit Hotels verknüpfen, Ansprechpartner verwalten.

---

## Woche 6 — Buchungen / Termine

**Lernziele:**

- Komplexere State-Übergänge (pending → confirmed → cancelled)
- Datums- und Zeitlogik
- Business Rules in Services (keine Doppelbuchungen)

**Mentor-Aufgaben:**

- State Machine Pattern vorstellen (Buchungsstatus)
- Business Rule: keine überlappenden Buchungen — gemeinsam als Unit Test zuerst

**Schüler-Aufgaben:**

- `booking.service.ts` mit Statuslogik implementieren
- Buchung anlegen: Kunde + Hotel + Zeitraum
- Statuswechsel-Logik implementieren
- Unit Tests für alle Statusübergänge (TDD-first!)
- Kalenderansicht (einfache Monatsübersicht)

**Definition of Done:** Buchungen anlegen, Status wechseln, keine Doppelbuchungen möglich.

---

## Woche 7 — Lieferanten & Rechnungen

**Lernziele:**

- Zusammengesetzte Features (Invoice = Booking + Supplier + Status)
- Open/Closed Prinzip: neue Rechnungsarten ohne bestehende Klassen ändern
- PDF-Export als Edge Case

**Mentor-Aufgaben:**

- SOLID O-Prinzip live zeigen: Rechnungstypen erweiterbar machen
- Edge Function vs. clientseitiges PDF erklären

**Schüler-Aufgaben:**

- `supplier.service.ts` implementieren
- Lieferanten-Liste und CRUD bauen
- `invoice.service.ts` implementieren
- Rechnungsstatus-Flow: `draft` → `sent` → `paid` / `overdue`
- Unit Tests für Statusübergänge und Preisberechnung
- (Optional) PDF-Export mit jsPDF clientseitig

**Definition of Done:** Rechnungen anlegen, Status verwalten, Bezug zu Buchungen und Lieferanten klar.

---

## Woche 8 — Dashboard, Abschluss & Präsentation

**Lernziele:**

- Daten aggregieren und visualisieren
- Gesamten Code reviewen und bereinigen
- Präsentation eines echten Software-Projekts

**Mentor-Aufgaben:**

- Finales Code Review: Architekturregeln eingehalten?
- Refactoring-Session: gemeinsam Code verbessern
- Abschlusspräsentation moderieren

**Schüler-Aufgaben:**

- Dashboard implementieren: aktive Buchungen, offene Rechnungen, Lieferantenanzahl
- Filter nach Hotel / Hotelkette bauen
- Codebase aufräumen: keine `any`, keine toten Imports, ESLint fehlerfrei
- Eigenen Beitrag präsentieren: "Was habe ich gebaut, was habe ich gelernt?"

**Definition of Done:** Dashboard zeigt Echtzahlen, alle Features funktionieren, kein ESLint-Fehler.

---

## Wöchentlicher Rhythmus (Vorschlag)

| Tag     | Aktivität                                                                   |
| ------- | --------------------------------------------------------------------------- |
| Montag  | Sprint Planning: Aufgaben besprechen, Branches anlegen                      |
| Mi / Do | Code Review vom Mentor (PRs reviewen)                                       |
| Freitag | Demo: Schüler zeigen was fertig ist, kurze Retro (was lief gut / was nicht) |

---

## Lernprogression

```
Woche 1-2   Fundament      → Git, TypeScript, Shared Types
Woche 3     Auth           → Security Grundlage
Woche 4-5   Core CRUD      → Hotel, Customer — Pattern lernen
Woche 6     Business Logic → Buchungen, State, Validierung
Woche 7     Komplexität    → Relationen, Invoice, Supplier
Woche 8     Integration    → Dashboard, Cleanup, Präsentation
```

---

## Beurteilungskriterien für Schüler

| Kriterium                                     | Gewichtung |
| --------------------------------------------- | ---------- |
| Code-Qualität (TypeScript, kein `any`, SOLID) | 30%        |
| Tests vorhanden und grün                      | 25%        |
| Git Workflow (Branches, Commits, PRs)         | 20%        |
| Architekturregeln eingehalten                 | 15%        |
| Abschlusspräsentation                         | 10%        |
