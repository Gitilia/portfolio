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
      href: "https://git.levkin.ca/ilia/punimtag",
      repo: "https://git.levkin.ca/ilia/punimtag",
      stack: ["TypeScript", "Python", "Docker"],
    },
    {
      id: "hermes",
      title: "Hermes",
      tag: "Agents",
      summary:
        "Self-hosted multi-agent platform: Mattermost gateway, workers, Ollama / OpenRouter, skills and MCP.",
      href: "https://git.levkin.ca/ilia/hermes",
      repo: "https://git.levkin.ca/ilia/hermes",
      stack: ["Python", "Mattermost", "MCP"],
    },
    {
      id: "atlas",
      title: "Atlas",
      tag: "Voice",
      summary:
        "Local privacy-focused voice agent — ASR/TTS, MCP tools, Ollama — nothing leaves the LAN unless you say so.",
      href: "https://git.levkin.ca/ilia/atlas",
      repo: "https://git.levkin.ca/ilia/atlas",
      stack: ["Python", "ASR/TTS", "Ollama"],
    },
    {
      id: "paperpod",
      title: "PaperPod",
      tag: "CV",
      summary:
        "Offline video → PDF pipeline with computer vision and OCR for lecture / whiteboard capture.",
      href: "https://git.levkin.ca/ilia/PaperPod",
      repo: "https://git.levkin.ca/ilia/PaperPod",
      stack: ["Python", "OCR", "CV"],
    },
    {
      id: "playkit",
      title: "playkit",
      tag: "Library",
      summary:
        "Shared Playwright helpers (@levkin/playkit) for resilient SPA automation and app e2e.",
      href: "https://git.levkin.ca/ilia/playkit",
      repo: "https://git.levkin.ca/ilia/playkit",
      stack: ["Playwright", "TypeScript"],
    },
  ],

  demos: [
    {
      title: "Compare",
      href: "https://compare.levkin.ca",
      note: "Before / after image slider",
    },
    {
      title: "IT-Tools",
      href: "https://tools.levkin.ca",
      note: "Client-side utilities",
    },
    {
      title: "Pairdrop",
      href: "https://pair.levkin.ca",
      note: "LAN / WebRTC file drop",
    },
    {
      title: "Status",
      href: "https://status.levkin.ca",
      note: "Public uptime board",
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
