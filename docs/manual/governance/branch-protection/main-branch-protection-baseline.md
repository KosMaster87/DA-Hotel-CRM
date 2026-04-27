# Main Branch Protection (Baseline)

## Projektbezug

- Repository: KosMaster87/Dev2K-Hotel-CRM
- Ziel-Branch: main
- Referenzprofil: Baseline (Design-Vorlage)
- Ruleset-ID: 15294137
- Stand: 2026-04-20

Hinweis: Im Projekt ist aktuell die Solo-Variante aktiv. Diese Datei dokumentiert die abgespeckte Baseline als Referenz.

## Zweck

Diese Baseline sichert main gegen direkte, riskante Änderungen ab und erzwingt einen PR-basierten Merge-Prozess mit erfolgreicher CI.

## Empfohlene Baseline-Regeln

- Restrict deletions
- Block force pushes (non-fast-forward)
- Require linear history
- Require a pull request before merging
- Dismiss stale pull request approvals when new commits are pushed
- Require conversation resolution before merging
- Require status checks to pass

## Required Status Checks

- quality-checks

Hinweis: coverage-soft-gate ist absichtlich kein Required Check, da dieser Job als Soft Gate ausgelegt ist.

## Branch Targeting

- Include: refs/heads/main
- Exclude: none

## Bypass Strategy (Baseline)

- Standard: keine Bypass-Akteure
- Optional für Notfälle: nur Admin/Owner

## Verifikation

- Ruleset in GitHub unter Settings > Rules > Rulesets prüfen
- CI-Check-Namen mit Workflow abgleichen: .github/workflows/ci.yml

## Wartung

- Bei neuen Pflicht-Checks (z. B. Security/Scan) diese als Required Status Check ergänzen
- Regeln mindestens monatlich im Team-Review validieren
