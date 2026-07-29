# Portfolio ideas — iliadobkin.com

Curated backlog for the personal hub. Mix of industry patterns (2025–26) and
ideas tailored to this stack.

## From current portfolio guidance (web)

1. **3–5 featured projects only** — quality over a wall of repos; each with
   live URL + source when public.
2. **CASE write-ups** — Challenge / Action / Solution / Evidence (one metric)
   per flagship project.
3. **Hero above the fold** — name, one-line pitch, clear contact; no long bio.
4. **Live demos beat screenshots** — recruiters click; keep demos fast & public.
5. **Ship v1, iterate** — don't spend months polishing chrome before content.
6. **Mobile + LCP under ~2.5s** — static HTML helps; watch font weight.
7. **Person schema + OG tags** — already in `index.html`; add `og:image` later.

## Original ideas for *this* hub

1. **Demo lab strip** — only demos you wrote. Today: Compare, Solid concepts,
   Northbound GDP (`/demos/gdp/`). Add more when you ship a small public toy.
2. **Lane map** — auto / caseware / sdet / levkin stay sibling sites; hub only
   deep-links (no copy-paste of those landings).
3. **Private projects as README cards** — Hermes, Atlas, apply-bot, etc.: short
   description + “private repo” note; no dead Gitea links for anonymous visitors.
4. **“Open a plate” motion** — project cards lift on hover (shipped); add
   keyboard `1–6` jump to featured plates.
5. **Printable one-pager** — `@media print` that collapses to contact + top 3
   projects.
6. **Availability chip** — “open to roles / consulting” toggled from
   `js/data.js` only (no CMS).
7. **Case study pages** — `/work/punimtag/` etc. when a project needs depth;
   keep the index scannable.
8. **Screenshot contact sheet** — real UI stills (punimtag, Hermes, SDET runner)
   once you have assets.
9. **Homelab “proof without topology”** — link public status + a roles diagram
   (edge, identity, git) with **no LAN IPs**.
10. **Resume PDF drop** — place `resume.pdf` in the web root at deploy time from
    `ilia/resume` (don’t commit the PDF if it has personal phone/address you
    don’t want crawled).

## Explicitly out of scope on the public hub

- Third-party apps you merely host (IT-Tools, Pairdrop, Uptime Kuma status page).
- Private apps (vault, budget, screening, recon, landlord).
- Root SSH / LAN inventory dumps.
- Duplicate AutoBank or CaseWare sales pages.
