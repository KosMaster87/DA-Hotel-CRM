# Main Branch Protection (Strict)

## Projektbezug

- Repository: KosMaster87/Dev2K-Hotel-CRM
- Ziel-Branch: main
- Ruleset-Name: Protect main strict
- Ruleset-ID: 15294137
- Stand: 2026-04-20

Hinweis: Diese Datei ist eine Referenz für die frühere Strict-Konfiguration. Aktuell ist im Projekt die Solo-Konfiguration aktiv.

## Ziel

Die Strict-Variante erweitert die Baseline um stärkere Identitäts- und Review-Absicherung.

## Aktiv gesetzte Strict-Erweiterungen

- Require signed commits (required_signatures)
- Bypass-Liste auf RepositoryRole Admin begrenzt
- Automatically request Copilot code review (copilot_code_review)

## Vollständige aktive Regeln

- deletion
- non_fast_forward
- required_linear_history
- pull_request
- required_status_checks
- required_signatures
- copilot_code_review

## Pull Request Parameter

- required_approving_review_count: 1
- dismiss_stale_reviews_on_push: true
- required_review_thread_resolution: true
- require_code_owner_review: false
- require_last_push_approval: false

## Status Check Parameter

- strict_required_status_checks_policy: true
- required_status_checks:
  - quality-checks

## Bypass-Konfiguration

- actor_type: RepositoryRole
- actor_id: 5
- bypass_mode: always

Hinweis: In der GitHub-UI entspricht dies der Admin-Rolle. Bei Rollenmodell-Änderungen einmal in der UI gegenprüfen.

## Operative Hinweise

- Signed Commits erfordern eingerichtete Signaturen bei allen Mitwirkenden.
- Copilot Review wird nur automatisch angefordert, wenn Autor Zugriff und verfügbares Kontingent hat.
- Für Hotfixes weiterhin PR-Flow nutzen; Admin-Bypass nur als Ausnahme dokumentiert einsetzen.

## Änderungsprotokoll

- 2026-04-20: Strict-Regeln auf dem bestehenden Ruleset aktiviert.
