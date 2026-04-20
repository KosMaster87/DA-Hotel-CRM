# Branch Protection

Diese Dokumente beschreiben den Branch-Schutz fuer main im Projekt.

## Aktueller Projektstatus

- Aktives Ruleset: Protect main strict
- Ruleset-ID: 15294137
- Ziel-Branch: main
- Enforcement: active

## Aktiv gesetzte Regeln (Ist-Stand)

- Restrict deletions
- Block force pushes (non-fast-forward)
- Require linear history
- Require a pull request before merging
- Dismiss stale pull request approvals when new commits are pushed
- Require conversation resolution before merging
- Require status checks to pass
- Require signed commits
- Automatically request Copilot code review

## Status Checks

- Required: quality-checks
- Nicht required: coverage-soft-gate (soft gate)

## Bypass

- Aktuell nur Admin/Owner Rolle (RepositoryRole)

## Dateien in diesem Ordner

- main-branch-protection-baseline.md: Referenz fuer die reduzierte Baseline-Variante
- main-branch-protection-strict.md: Dokumentation der aktuell aktiven Strict-Konfiguration

## Pflegehinweise

- Bei Aenderungen am Ruleset immer zuerst die Strict-Datei aktualisieren
- Danach den Abschnitt Aktueller Projektstatus in dieser README anpassen
- Bei neuen CI-Jobs pruefen, ob sie als required_status_checks aufgenommen werden sollen
