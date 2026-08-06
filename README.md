# portfolio

Personal hub at **[iliadobkin.com](https://iliadobkin.com)** — selected projects,
live demos, and links to consulting / SDET lanes.

The Playwright-runner career site lives at **[sdet.levkin.ca](https://sdet.levkin.ca)**
(`ilia/sdetProfile`).

## Local preview

```bash
npm install
npm run check
npm run preview   # http://localhost:8765
```

## Stack

Plain HTML / CSS / JS. Content in `js/data.js`. Ideas backlog in `IDEAS.md`.

## Deploy

Homelab static site LXC (ansible `sites` / `portfolio`). Source checkout stays
out of the public web root; see the ansible `site-lxc-git` guide.

## License

MIT — see [LICENSE](LICENSE).
