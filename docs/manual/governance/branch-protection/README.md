# Branch Protection

Diese Dokumente beschreiben den Branch-Schutz für main im Projekt.

## Aktueller Projektstatus

- Aktives Ruleset: Protect main solo
- Ruleset-ID: 15294137
- Ziel-Branch: main
- Enforcement: active

## Aktiv gesetzte Regeln (Ist-Stand)

- Restrict deletions
- Block force pushes (non-fast-forward)
- Require linear history
- Require a pull request before merging
- Dismiss stale pull request approvals when new commits are pushed
- Require status checks to pass

## Status Checks

- Required: quality-checks
- Nicht required: coverage-soft-gate (soft gate)

## Bypass

- Aktuell nur RepositoryRole Admin

## Dateien in diesem Ordner

- main-branch-protection-baseline.md: Referenz für die reduzierte Baseline-Variante
- main-branch-protection-strict.md: Referenz für eine frühere, strengere Konfiguration

## Pflegehinweise

- Bei Änderungen am Ruleset zuerst den Abschnitt Aktueller Projektstatus in dieser README anpassen
- Danach die betroffene Profil-Datei (Baseline/Strict) auf den neuen Stand bringen
- Bei neuen CI-Jobs prüfen, ob sie als required_status_checks aufgenommen werden sollen
