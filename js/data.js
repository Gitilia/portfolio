/* Portfolio hub content — edit here, not in markup. */
window.PORTFOLIO = {
  person: {
    name: "Ilia Dobkin",
    role: "Senior SDET · automation · self-hosted systems",
    location: "Remote (ET) · Canadian citizen",
    email: "idobkin@gmail.com",
    linkedin: "https://www.linkedin.com/in/ilia-dobkin-8263343/",
    github: "https://github.com/Gitilia",
    resume: "/resume.pdf",
    blurb:
      "I build test systems that survive flaky networks, and side projects that stay online. Playwright and CI for work; Proxmox and Caddy at home; public code on GitHub.",
  },

  /**
   * Featured projects. Prefer PUBLIC repos + live demos.
   * Private work (Hermes, Atlas, …): set href/repo to null and put a short
   * README-style description in `summary` / `readme`.
   * Public source: github.com/Gitilia (Gitea remains the write/CI forge).
   */
  projects: [
    {
      id: "sdet",
      title: "portfolio.spec.ts",
      tag: "SDET",
      summary:
        "Career portfolio styled as a Playwright test runner — filters, trace view, network tab, keyboard shortcuts.",
      href: "https://sdet.levkin.ca",
      repo: "https://github.com/Gitilia/sdetProfile",
      stack: ["Playwright UX", "vanilla JS", "a11y"],
    },
    {
      id: "punimtag",
      title: "punimtag",
      tag: "App",
      summary:
        "Photo face recognition (DeepFace / ArcFace) with viewer + admin — self-hosted, Authentik SSO.",
      href: null,
      repo: null,
      readme:
        "Private / self-hosted app. Face recognition stack stays on the homelab; not mirrored to public GitHub yet.",
      stack: ["TypeScript", "Python", "Docker"],
    },
    {
      id: "playkit",
      title: "@levkin/playkit",
      tag: "Library",
      summary:
        "Shared Playwright + API test kit — UI helpers, API client, timings, metrics. Used by punimtag and other apps.",
      href: null,
      repo: "https://github.com/Gitilia/playkit",
      stack: ["Playwright", "TypeScript", "npm"],
    },
    {
      id: "context-extractor",
      title: "context-extractor",
      tag: "Tooling",
      summary:
        "Browser extension + Playwright/Camoufox package that dumps AI-ready page markdown, console, and network noise.",
      href: null,
      repo: "https://github.com/Gitilia/context-extractor",
      stack: ["JS", "Python", "Playwright"],
    },
    {
      id: "swipeanything",
      title: "SwipeAnything",
      tag: "UI",
      summary:
        "Local-first swipe-to-triage UI with pluggable adapters — same gestures for a photo folder, inbox, or approval queue.",
      href: null,
      repo: "https://github.com/Gitilia/SwipeAnything",
      stack: ["TypeScript", "adapters", "a11y"],
    },
    {
      id: "paperpod",
      title: "PaperPod",
      tag: "CV",
      summary:
        "Privacy-first overhead video → named PDFs for Paperless. Motion windows, perspective crop, hands-free frame pick.",
      href: null,
      repo: "https://github.com/Gitilia/PaperPod",
      stack: ["Python", "OCR", "CV"],
    },
    {
      id: "macopy",
      title: "maCopy",
      tag: "macOS",
      summary:
        "Native menu-bar clipboard manager — Tauri 2, React, SQLite FTS5, pin, multi-select, paste-and-return.",
      href: null,
      repo: "https://github.com/Gitilia/maCopy",
      stack: ["Tauri", "React", "SQLite"],
    },
    {
      id: "slack-sieve",
      title: "slack-sieve",
      tag: "Tooling",
      summary:
        "Sieve a Slack workspace export before Mattermost import — triage channels, cherry-pick messages, preview attachments.",
      href: null,
      repo: "https://github.com/Gitilia/slack-sieve",
      stack: ["Python", "Mattermost", "review UI"],
    },
    {
      id: "hearth",
      title: "Hearth",
      tag: "Email",
      summary:
        "Consent-only email warmup for levkine.ca — hard allow-list, send/reply only with opted-in mailboxes, no cold outreach.",
      href: null,
      repo: null,
      readme:
        "Private / self-hosted. Consent-only warmup tooling stays off the public GitHub mirror.",
      stack: ["Python", "SMTP/IMAP", "allow-list"],
    },
    {
      id: "mirror-match",
      title: "MirrorMatch",
      tag: "App",
      summary:
        "Photo guessing game — upload photos, others guess who is in the picture for points. Next.js, Postgres, NextAuth.",
      href: null,
      repo: "https://github.com/Gitilia/mirror_match",
      stack: ["Next.js", "PostgreSQL", "NextAuth"],
    },
    {
      id: "hermes",
      title: "Hermes",
      tag: "Agents",
      summary:
        "Self-hosted multi-agent platform: messaging bridges (Telegram/Slack/Mattermost/…), workers, Ollama/OpenRouter, skills and MCP.",
      href: null,
      repo: null,
      readme:
        "Private repo. Messaging gateway + agent workers on a dedicated VM; config and skills live under ilia/hermes.",
      stack: ["Python", "Mattermost", "MCP"],
    },
    {
      id: "atlas",
      title: "Atlas",
      tag: "Voice",
      summary:
        "Local privacy-focused voice agent — ASR/TTS, MCP tools, Ollama. Nothing leaves the LAN unless you say so.",
      href: null,
      repo: null,
      readme:
        "Private repo. Homelab voice stack with on-device speech and tool use; integrations stay on the private network.",
      stack: ["Python", "ASR/TTS", "Ollama"],
    },
    {
      id: "solid",
      title: "Solid Plumbing concepts",
      tag: "Client",
      summary:
        "Ten static HTML/CSS concept sites for a GTA plumbing & gas company — gallery with live previews.",
      href: "https://solid.levkin.ca/",
      repo: null,
      stack: ["HTML", "CSS", "vanilla JS"],
    },
    {
      id: "stork",
      title: "Stork",
      tag: "App",
      summary:
        "Shareable baby-name boards — votes, en/ru/he notes, optional voice. Start a board, share the /b/… link.",
      href: "https://stork.levkin.ca/b/b_gS0LlZHm-lk",
      repo: "https://github.com/Gitilia/stork",
      stack: ["Python", "FastAPI", "SQLite", "Docker"],
    },
    {
      id: "atanyrate",
      title: "AtAnyRate",
      tag: "Automation",
      summary:
        "Toronto event signals for short-term rental demand — scrape, score, alert, optional price bumps.",
      href: null,
      repo: null,
      readme:
        "Private / business ops tooling — not published on public GitHub.",
      stack: ["Python", "Playwright", "Telegram"],
    },
  ],

  /** Only demos you own / wrote. Third-party apps you host stay off this list. */
  demos: [
    {
      title: "Stork",
      href: "https://stork.levkin.ca/b/b_gS0LlZHm-lk",
      note: "Baby-name board demo (Mira / Noa / Lior / Elena / Ezra)",
    },
    {
      title: "Compare",
      href: "https://compare.levkin.ca",
      note: "Before/after image slider",
    },
    {
      title: "Solid concepts",
      href: "https://solid.levkin.ca/",
      note: "Client website concept gallery",
    },
    {
      title: "Northbound GDP",
      href: "https://iliadobkin.com/demos/gdp/",
      note: "Canada GDP MoM chart + PDF export",
    },
  ],

  lanes: [
    {
      title: "AutoBank",
      href: "https://auto.levkin.ca",
      note: "Automation consulting for SMBs",
    },
    {
      title: "CaseWare",
      href: "https://caseware.levkin.ca",
      note: "CaseWare / CaseView development",
    },
    {
      title: "SDET portfolio",
      href: "https://sdet.levkin.ca",
      note: "Playwright-runner career site",
    },
    {
      title: "Levkin",
      href: "https://levkin.ca",
      note: "Homelab brand + stack map",
    },
  ],
};
