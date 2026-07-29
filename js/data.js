/* Portfolio hub content — edit here, not in markup. */
window.PORTFOLIO = {
  person: {
    name: "Ilia Dobkin",
    role: "Senior SDET · automation · self-hosted systems",
    location: "Remote (ET) · Canadian citizen",
    email: "idobkin@gmail.com",
    linkedin: "https://www.linkedin.com/in/ilia-dobkin-8263343/",
    gitea: "https://git.levkin.ca/explore/repos",
    resume: "/resume.pdf",
    blurb:
      "I build test systems that survive flaky networks, and side projects that stay online. Playwright and CI for work; Proxmox, Caddy, and a private Gitea for everything else.",
  },

  /**
   * Featured projects. Prefer PUBLIC repos + live demos.
   * Private work (Hermes, Atlas, …): set href/repo to null and put a short
   * README-style description in `summary` / `readme`.
   */
  projects: [
    {
      id: "sdet",
      title: "portfolio.spec.ts",
      tag: "SDET",
      summary:
        "Career portfolio styled as a Playwright test runner — filters, trace view, network tab, keyboard shortcuts.",
      href: "https://sdet.levkin.ca",
      repo: "https://git.levkin.ca/ilia/sdetProfile",
      stack: ["Playwright UX", "vanilla JS", "a11y"],
    },
    {
      id: "punimtag",
      title: "punimtag",
      tag: "App",
      summary:
        "Photo face recognition (DeepFace / ArcFace) with viewer + admin — self-hosted, Authentik SSO.",
      href: null,
      repo: "https://git.levkin.ca/ilia/punimtag",
      stack: ["TypeScript", "Python", "Docker"],
    },
    {
      id: "playkit",
      title: "@levkin/playkit",
      tag: "Library",
      summary:
        "Shared Playwright + API test kit — UI helpers, API client, timings, metrics. Used by punimtag and other apps.",
      href: null,
      repo: "https://git.levkin.ca/ilia/playkit",
      stack: ["Playwright", "TypeScript", "npm"],
    },
    {
      id: "context-extractor",
      title: "context-extractor",
      tag: "Tooling",
      summary:
        "Browser extension + Playwright/Camoufox package that dumps AI-ready page markdown, console, and network noise.",
      href: null,
      repo: "https://git.levkin.ca/ilia/context-extractor",
      stack: ["JS", "Python", "Playwright"],
    },
    {
      id: "swipeanything",
      title: "SwipeAnything",
      tag: "UI",
      summary:
        "Local-first swipe-to-triage UI with pluggable adapters — same gestures for a photo folder, inbox, or approval queue.",
      href: null,
      repo: "https://git.levkin.ca/ilia/SwipeAnything",
      stack: ["TypeScript", "adapters", "a11y"],
    },
    {
      id: "paperpod",
      title: "PaperPod",
      tag: "CV",
      summary:
        "Privacy-first overhead video → named PDFs for Paperless. Motion windows, perspective crop, hands-free frame pick.",
      href: null,
      repo: "https://git.levkin.ca/ilia/PaperPod",
      stack: ["Python", "OCR", "CV"],
    },
    {
      id: "macopy",
      title: "maCopy",
      tag: "macOS",
      summary:
        "Native menu-bar clipboard manager — Tauri 2, React, SQLite FTS5, pin, multi-select, paste-and-return.",
      href: null,
      repo: "https://git.levkin.ca/ilia/maCopy",
      stack: ["Tauri", "React", "SQLite"],
    },
    {
      id: "llm-council",
      title: "llm_council",
      tag: "AI",
      summary:
        "Multi-model LLM council — fan answers out to several models and synthesize a combined response.",
      href: null,
      repo: "https://git.levkin.ca/ilia/llm_council",
      stack: ["Python", "Ollama", "OpenRouter"],
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
      id: "atanyrate",
      title: "AtAnyRate",
      tag: "Automation",
      summary:
        "Toronto event signals for short-term rental demand — scrape, score, alert, optional price bumps.",
      href: null,
      repo: "https://git.levkin.ca/ilia/AtAnyRate",
      stack: ["Python", "Playwright", "Telegram"],
    },
  ],

  /** Only demos you own / wrote. Third-party apps (IT-Tools, Pairdrop, Kuma) stay off this list. */
  demos: [
    {
      title: "Compare",
      href: "https://compare.levkin.ca",
      note: "Family before/after image slider (your FastAPI app)",
    },
    {
      title: "Solid concepts",
      href: "https://solid.levkin.ca/",
      note: "Client website concept gallery",
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
