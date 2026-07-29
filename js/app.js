(() => {
  const data = window.PORTFOLIO;
  if (!data) return;

  const $ = (sel) => document.querySelector(sel);

  const lede = $("#hero-lede");
  if (lede) lede.textContent = data.person.blurb;

  const projectList = $("#project-list");
  if (projectList) {
    projectList.innerHTML = data.projects
      .map(
        (p) => `
      <li class="plate">
        <span class="plate__tag">${escapeHtml(p.tag)}</span>
        <h3 class="plate__title"><a href="${escapeAttr(p.href)}">${escapeHtml(p.title)}</a></h3>
        <p class="plate__summary">${escapeHtml(p.summary)}</p>
        <ul class="plate__stack">${p.stack
          .map((s) => `<li>${escapeHtml(s)}</li>`)
          .join("")}</ul>
        <div class="plate__links">
          <a href="${escapeAttr(p.href)}">Open</a>
          ${
            p.repo
              ? `<a href="${escapeAttr(p.repo)}">Source</a>`
              : ""
          }
        </div>
      </li>`
      )
      .join("");
  }

  const demoList = $("#demo-list");
  if (demoList) {
    demoList.innerHTML = data.demos
      .map(
        (d) => `
      <li>
        <a class="chip" href="${escapeAttr(d.href)}">
          <p class="chip__title">${escapeHtml(d.title)}</p>
          <p class="chip__note">${escapeHtml(d.note)}</p>
        </a>
      </li>`
      )
      .join("");
  }

  const laneList = $("#lane-list");
  if (laneList) {
    laneList.innerHTML = data.lanes
      .map(
        (l) => `
      <li class="lane">
        <a href="${escapeAttr(l.href)}">${escapeHtml(l.title)}</a>
        <p>${escapeHtml(l.note)}</p>
      </li>`
      )
      .join("");
  }

  const contactBlurb = $("#contact-blurb");
  if (contactBlurb) {
    contactBlurb.textContent = `${data.person.role}. ${data.person.location}.`;
  }

  const contactList = $("#contact-list");
  if (contactList) {
    const items = [
      { label: "Email", href: `mailto:${data.person.email}` },
      { label: "LinkedIn", href: data.person.linkedin },
      { label: "Gitea", href: data.person.gitea },
      { label: "SDET site", href: "https://sdet.levkin.ca" },
    ];
    contactList.innerHTML = items
      .map(
        (i) =>
          `<li><a href="${escapeAttr(i.href)}">${escapeHtml(i.label)}</a></li>`
      )
      .join("");
  }

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replaceAll("'", "&#39;");
  }
})();
