# Workflow-Backlog — Moderner Entwicklungsprozess

Dieses Dokument listet alle offenen Workflow-Verbesserungen für Dev2K Hotel CRM.
Jeder Eintrag hat eine Priorität, einen Aufwand (S/M/L) und einen klaren Mehrwert.

**Aufwand-Skala:**

- S — unter 2 Stunden
- M — halber Tag
- L — 1 bis 2 Tage

**Status-Legende:**

- `[ ]` — offen
- `[x]` — erledigt
- `[~]` — in Arbeit

---

## Phase 1 — Team-Ready Basis

> Ziel: Neue Teammitglieder können ohne Rückfragen loslegen. Standards sind schriftlich und durchsetzbar.

| #   | Aufgabe                                         | Aufwand | Warum                                                                                  |
| --- | ----------------------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| 1.1 | `CODEOWNERS` anlegen                            | S       | Klare Zuständigkeiten pro Ordner; GitHub fordert automatisch den richtigen Reviewer an |
| 1.2 | Definition of Done (DoD) schriftlich festhalten | S       | Team spricht dieselbe Sprache, wann etwas wirklich fertig ist                          |
| 1.3 | Review-SLA definieren (z.B. 24h Erstreaktion)   | S       | Verhindert blockierte PRs und Frustration im Team                                      |
| 1.4 | Naming Conventions dokumentieren                | S       | Dateien, Funktionen, DB-Tabellen einheitlich benennen                                  |
| 1.5 | Branch-Namenskonvention durchsetzen             | S       | `feat/`, `fix/`, `chore/`, `docs/` — verhindert kryptische Branch-Namen                |

### 1.1 CODEOWNERS anlegen

Datei: `.github/CODEOWNERS`

Beispiel-Inhalt:

```
# Globale Fallback-Zuständigkeit
*                          @KosMaster87

# Supabase-Migrations immer vom Backend-Owner reviewed
supabase/migrations/       @KosMaster87

# Frontend-Komponenten
frontend/src/              @KosMaster87
```

Wirkung in GitHub: Bei jedem PR auf Dateien in `frontend/src/` wird der Owner automatisch als Reviewer eingetragen.

---

### 1.2 Definition of Done

Datei: `docs/governance/definition-of-done.md` (noch anzulegen)

Empfohlene Checkliste:

```
- [ ] Code ist gegen main gerebased oder gemerged
- [ ] Alle Lint-Fehler behoben (kein --force)
- [ ] Neue Logik hat mindestens 1 Unit-Test
- [ ] Kein `console.log` im finalen Code
- [ ] PR-Template vollständig ausgefüllt
- [ ] Kein Secret / API Key committed
- [ ] Bei DB-Änderung: Migration vorhanden + RLS geprüft
- [ ] Bei UI-Änderung: Screenshot im PR
- [ ] Reviewer hat approved
```

---

## Phase 2 — Qualität + Sicherheit

> Ziel: Fehler und Sicherheitsprobleme werden automatisch erkannt, bevor sie main erreichen.

| #   | Aufgabe                                          | Aufwand | Warum                                                             |
| --- | ------------------------------------------------ | ------- | ----------------------------------------------------------------- |
| 2.1 | Coverage-Schwelle aktivieren (zuerst weich)      | S       | Verhindert schleichenden Testabbau                                |
| 2.2 | Dependabot oder Renovate konfigurieren           | M       | Dependency-Updates kommen automatisch als PRs mit CI-Check        |
| 2.3 | CodeQL oder Trivy in CI integrieren              | M       | SAST-Scan findet bekannte Schwachstellen im Code und Dependencies |
| 2.4 | Secret Scanning lokal einrichten (gitleaks)      | S       | Verhindert, dass Secrets überhaupt ins Repo gelangen              |
| 2.5 | 1 Playwright Smoke-Test für kritischen User Flow | L       | E2E-Absicherung für Login + Kernfunktion                          |

### 2.1 Coverage-Schwelle (Schritt für Schritt)

Aktuell in `ci.yml`: `coverage-soft-gate` läuft mit `continue-on-error: true`.

Empfohlener Stufenplan:

1. Jetzt: Coverage-Report läuft, warnt, blockiert nicht (aktueller Stand ✓)
2. In 4 Wochen: Schwelle auf 30 % setzen, dann hart machen
3. In 8 Wochen: Schwelle auf 60 % erhöhen

In `frontend/vitest.config.ts`:

```ts
coverage: {
  thresholds: {
    lines: 60,
    functions: 60,
  }
}
```

---

### 2.2 Dependabot konfigurieren

Datei: `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    open-pull-requests-limit: 5
    labels:
      - dependencies

  - package-ecosystem: npm
    directory: /frontend
    schedule:
      interval: weekly
    open-pull-requests-limit: 5
    labels:
      - dependencies
```

Wirkung: Jede Woche kommen automatisch PRs für veraltete oder unsichere Pakete.
Die CI läuft dagegen — kaputte Updates werden sofort erkannt.

---

### 2.4 Secret Scanning lokal (gitleaks)

Installation:

```bash
brew install gitleaks
# oder
apt install gitleaks
```

Als pre-commit Hook ergänzen in `.husky/pre-commit`:

```sh
gitleaks protect --staged --redact
npx lint-staged
```

Wirkung: Versehentlich gestagte Secrets (API Keys, Passwörter) werden vor dem Commit geblockt.

---

## Phase 3 — Release-Workflow

> Ziel: Releases sind reproduzierbar, dokumentiert und rückrollbar.

| #   | Aufgabe                                                  | Aufwand | Warum                                                          |
| --- | -------------------------------------------------------- | ------- | -------------------------------------------------------------- |
| 3.1 | Changelog-Automation einrichten (conventional-changelog) | M       | Aus Commit-History wird automatisch ein CHANGELOG.md generiert |
| 3.2 | SemVer-Strategie dokumentieren                           | S       | Team weiß, was MAJOR/MINOR/PATCH bedeutet für dieses Projekt   |
| 3.3 | Rollback-Plan dokumentieren                              | S       | Im Notfall weiß jeder in 2 Minuten, was zu tun ist             |
| 3.4 | Staging-Umgebung einrichten                              | L       | Änderungen werden vor Production sichtbar getestet             |

### 3.1 Changelog-Automation

```bash
npm install --save-dev @commitlint/cli conventional-changelog-cli
```

Script in `package.json`:

```json
"changelog": "conventional-changelog -p conventionalcommits -i CHANGELOG.md -s"
```

Aufruf vor einem Release:

```bash
npm run changelog
git add CHANGELOG.md
git commit -m "chore(release): update changelog for v1.2.0"
```

---

### 3.3 Rollback-Plan

Datei: `docs/governance/rollback-playbook.md` (noch anzulegen)

Inhalt sollte abdecken:

- Wer entscheidet über Rollback?
- Wie wird ein fehlerhafter Merge auf main rückgängig gemacht? (`git revert` vs. `git reset`)
- Wie wird eine fehlerhafte DB-Migration zurückgerollt?
- Kommunikation an Team: Welcher Channel, welche Info?

---

## Phase 4 — Betrieb + Observability

> Ziel: Probleme in Production werden aktiv gemeldet, nicht reaktiv entdeckt.

| #   | Aufgabe                                         | Aufwand | Warum                                                                  |
| --- | ----------------------------------------------- | ------- | ---------------------------------------------------------------------- |
| 4.1 | Sentry einrichten (Frontend + Backend)          | M       | Unerwartete Fehler werden sofort gemeldet, mit Stack Trace             |
| 4.2 | Healthcheck-Endpoint implementieren             | S       | Load Balancer und Monitoring-Tools prüfen, ob die App läuft            |
| 4.3 | Uptime-Monitoring einrichten (z.B. UptimeRobot) | S       | Alert bei Ausfall, auch wenn niemand gerade hinschaut                  |
| 4.4 | Performance-Budget definieren                   | S       | Bundle-Größe, LCP — ab welchem Wert gibt es eine Warnung?              |
| 4.5 | Incident-Playbook anlegen                       | M       | Klarer Ablauf bei Production-Problem: wer, was, in welcher Reihenfolge |

---

## Sofort-Startliste (diese Woche)

Die 3 Dinge mit dem höchsten Nutzen und geringstem Aufwand:

1. **`CODEOWNERS` anlegen** (S) — 15 Minuten, sofortiger Effekt bei PRs
2. **Dependabot konfigurieren** (M) — hält Dependencies automatisch sauber
3. **Definition of Done schreiben** (S) — verhindert endlose "ist es fertig?"-Diskussionen

---

## Team-Rituale

Diese Routinen halten den Workflow gesund ohne viel Overhead:

| Rhythmus    | Ritual                                                       | Dauer  |
| ----------- | ------------------------------------------------------------ | ------ |
| Wöchentlich | Tech Debt Triage: offene TODOs und flaky Tests besprechen    | 20 min |
| 14-tägig    | Workflow-Retro: was funktioniert, was nervt?                 | 30 min |
| Monatlich   | Security/Dependency Check: Dependabot-PRs reviewen, CVE-Scan | 45 min |
| Pro Release | Rollback-Plan durchgehen, Changelog prüfen                   | 15 min |
