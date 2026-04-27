# Repository Policy

## Positionierung

Dieses Repository ist öffentlich, Open Source und kommerziell nutzbar.

## Ziele

- Transparente Produktentwicklung
- Wiederverwendbarer, qualitativ hochwertiger Code
- Klare Trennung zwischen öffentlichem Produktkern und privaten Betriebsdaten

## Verbindliche Regeln

1. Keine Secrets, Tokens oder Zugangsdaten im Repository.
2. Keine Kundendaten oder personenbezogenen Produktionsdaten im Repository.
3. Architekturentscheidungen und Scope-Änderungen nachvollziehbar dokumentieren.
4. Nur reviewbare Commits mit Conventional Commits.
5. TDD-first für neue Features und Fixes.

## Public vs. Private Grenze

Öffentlich:

- Quellcode, Architektur, Tests, Dokumentation
- Beispielkonfigurationen ohne Werte

Privat:

- Produktive .env-Werte
- Infrastruktur-Zugangsdaten
- Interne Kunden- und Betriebsdaten
- Nicht öffentliche Business-Entscheidungen

## Marken- und Namensnutzung

Der Code ist Open Source. Markenname, Logo und Branding bleiben markenrechtlich
getrennt und dürfen nicht automatisch für abgeleitete Produkte verwendet werden.

## Governance-Dateien

- LICENSE
- CONTRIBUTING.md
- .github/SECURITY.md
