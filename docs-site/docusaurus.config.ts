import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Hotel CRM",
  tagline: "API-Dokumentation für das Hotel CRM",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://dev2k.org",
  baseUrl: "/",

  organizationName: "KosMaster87",
  projectName: "Dev2K-Hotel-CRM",

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "de",
    locales: ["de"],
  },

  plugins: [
    [
      "docusaurus-plugin-typedoc",
      {
        entryPointStrategy: "expand",
        entryPoints: ["../frontend/src"],
        tsconfig: "../frontend/tsconfig.json",
        exclude: ["**/*.test.ts", "**/*.spec.ts"],
        out: "docs/api",
        name: "Hotel CRM — API Docs",
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Hotel CRM",
      logo: {
        alt: "Hotel CRM Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        {
          to: "/docs/api/",
          label: "API",
          position: "left",
        },
        {
          href: "https://github.com/KosMaster87/Dev2K-Hotel-CRM",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Einführung",
              to: "/docs/intro",
            },
            {
              label: "API Referenz",
              to: "/docs/api/",
            },
          ],
        },
        {
          title: "Projekt",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/KosMaster87/Dev2K-Hotel-CRM",
            },
            {
              label: "dev2k.org",
              href: "https://dev2k.org",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Dev2K. Erstellt mit Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
