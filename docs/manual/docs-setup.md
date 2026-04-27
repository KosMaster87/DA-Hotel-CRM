# Dokumentations-Setup — Hotel CRM

Beschreibt wie Doku-Tooling in diesem Projekt konkret eingerichtet ist.

---

## Struktur

```
hotel-app-dev2k/
├── docs/
│   ├── manual/          ← Eigene Guides, ADRs, Runbooks (in Git)
│   │   ├── architecture/
│   │   ├── governance/
│   │   ├── training/
│   │   ├── PROJECT-PLAN.md
│   │   └── docs-setup.md   ← diese Datei
│   └── README.md           ← Übersicht was wohin gehört
│
└── docs-site/           ← Docusaurus-Projekt (in Git, außer build/ + docs/api/)
    ├── docusaurus.config.ts
    ├── docs/
    │   ├── api/         ← TypeDoc-Output via Plugin (.gitignored)
    │   └── intro.mdx
    └── build/           ← Fertiger Static-Site (.gitignored)
```

---

## Tools

| Tool                      | Zweck                                          |
| ------------------------- | ---------------------------------------------- |
| Docusaurus 3              | Statische Doku-Site                            |
| docusaurus-plugin-typedoc | TypeDoc intern beim Docusaurus-Build ausführen |
| typedoc-plugin-markdown   | TypeDoc-Output als Markdown (für Docusaurus)   |

**Kein standalone `typedoc.json`** — TypeDoc-Konfiguration lebt komplett in
`docs-site/docusaurus.config.ts` unter `plugins`.

---

## Quellcode für die API-Doku

TypeDoc liest `frontend/src/` mit `entryPointStrategy: expand` — es findet alle
`.ts`-Dateien automatisch über `frontend/tsconfig.json`.

Test-Dateien (`*.test.ts`, `*.spec.ts`) sind explizit ausgeschlossen.

---

## Commands

Alle Befehle aus `hotel-app-dev2k/`:

| Befehl               | Ergebnis                                       |
| -------------------- | ---------------------------------------------- |
| `npm run docs:dev`   | Docusaurus Dev-Server starten (localhost:3000) |
| `npm run docs:site`  | Produktions-Build in `docs-site/build/`        |
| `npm run docs:serve` | Fertigen Build lokal anzeigen                  |

---

## .gitignore

Folgende Pfade sind ignoriert:

```
docs-site/docs/api/     ← TypeDoc-Output (wird bei jedem Build neu erzeugt)
docs-site/build/        ← Docusaurus Build-Output
docs-site/.docusaurus/  ← Docusaurus Cache
```
