(() => {
  const AUDIO_CANDIDATES = [
    "./audio/answer.m4a",
    "./audio/answer.mp3",
    "./audio/answer.webm",
  ];

  // Cue times match audio/answer.vtt (Brian pass).
  const CHAPTERS = [
    {
      id: "open",
      label: "00 Open",
      at: 0,
      move: "signal",
      stage: "intake",
      levers: [],
    },
    {
      id: "lead",
      label: "01 Lead",
      at: 23,
      move: "signal",
      stage: "intake",
      levers: ["trust"],
    },
    {
      id: "process",
      label: "02 Process",
      at: 82,
      move: "left",
      stage: "contract",
      levers: ["trust", "feedback"],
    },
    {
      id: "levers",
      label: "03 Levers",
      at: 107,
      move: "path",
      stage: "ci",
      levers: ["trust", "feedback", "safety", "celebrate"],
    },
    {
      id: "close",
      label: "04 Close",
      at: 132,
      move: "path",
      stage: "release",
      levers: ["trust", "feedback", "safety", "easy", "celebrate", "shared"],
    },
  ];

  const moves = {
    signal: {
      title: "Own the signal",
      body:
        "If the suite is flaky, I fix that before I ask for more coverage. A red build nobody trusts just teaches people to ship around quality. At NiyaSoft we held daily CI above 90% by killing brittle waits so a failure meant something again.",
      bullets: [
        "Clean up noise first. Don’t pile on more tests.",
        "Treat flake rate like a team health number, not a private QA shame.",
      ],
    },
    left: {
      title: "Show up earlier",
      body:
        "I get in the room while ambiguity is still cheap to kill: co-writing acceptance criteria, pairing on scenarios, negotiating gates instead of dumping process over the wall after code is “done.”",
      bullets: [
        "Vague stories are where bugs are born. I push for criteria you can actually check.",
        "Left-shift isn’t a poster. It’s sitting with product and eng before the PR.",
      ],
    },
    path: {
      title: "Make good work easy",
      body:
        "People take the fastest path. I ship fixtures, shared helpers, and gap checks so solid tests beat ad-hoc clicking. Shared tooling beats nagging in review.",
      bullets: [
        "If the “right” way is slower, you lose that fight.",
        "Cover real risk first, not whatever is easiest to automate.",
      ],
    },
  };

  const stages = [
    {
      id: "intake",
      name: "Intake / AC",
      influence:
        "Biggest lever. Write criteria you can observe, ranked by risk: what must not break on a peak Saturday vs nice-to-have.",
      how: "Join refinement. Draft examples with the team. Call missing edges while change is still cheap.",
    },
    {
      id: "contract",
      name: "API contracts",
      influence:
        "Tickets, POS, partners, payments. Breakage shows up at boundaries. Contracts catch it before UI theatre does.",
      how: "Treat OpenAPI as a gate. Check consumers of flows that touch money and admissions.",
    },
    {
      id: "build",
      name: "Build / design",
      influence:
        "Testability is a design choice: seams, fixtures, deterministic data, flags that let us prove a path safely.",
      how: "Pair early on hard flows. Coach for testable shape instead of bolting E2E on at the end.",
    },
    {
      id: "pr",
      name: "Pull request",
      influence:
        "Ask “what risk did we add?” not “did QA tick a box.”",
      how: "Risk notes on the PR. Targeted checks in the same change. No “QA later” parking lot.",
    },
    {
      id: "ci",
      name: "CI gate",
      influence:
        "CI is the shared conscience. Fast, steady, trusted, or people ignore it.",
      how: "Every-commit suites that earn their minutes. Quarantine with owners. Fail on flake policy, not vibes.",
    },
    {
      id: "release",
      name: "Release / learn",
      influence:
        "Production closes the loop. Watch what happened; skip the blame ceremony.",
      how: "Follow real guest and operator paths after ship. Feed incidents back into AC and automation priorities.",
    },
  ];

  const levers = [
    {
      id: "trust",
      title: "Trusted signal",
      copy: "Green means green. Flake tax kills urgency.",
      weight: 22,
    },
    {
      id: "feedback",
      title: "Fast feedback",
      copy: "Minutes in CI beat days in a “QA sprint.”",
      weight: 18,
    },
    {
      id: "safety",
      title: "Room to speak up",
      copy: "People raise risk early when they won’t get punished for it.",
      weight: 20,
    },
    {
      id: "easy",
      title: "Easy right path",
      copy: "Fixtures and shared libs make quality the default shortcut.",
      weight: 16,
    },
    {
      id: "celebrate",
      title: "Praise prevention",
      copy: "Cheer the bug that never shipped louder than the overnight hero.",
      weight: 14,
    },
    {
      id: "shared",
      title: "Shared ownership",
      copy: "You change it, you test it. Quality isn’t a department.",
      weight: 12,
    },
  ];

  const els = {
    moveDetail: document.getElementById("move-detail"),
    stageDetail: document.getElementById("stage-detail"),
    stages: document.getElementById("stages"),
    levers: document.getElementById("levers"),
    meterFill: document.getElementById("meter-fill"),
    meterValue: document.getElementById("meter-value"),
    meterLabel: document.getElementById("meter-label"),
    queueHealth: document.getElementById("queue-health"),
    defectTiming: document.getElementById("defect-timing"),
    teamPosture: document.getElementById("team-posture"),
    queueCaption: document.getElementById("queue-caption"),
    tickets: document.getElementById("tickets"),
    timer: document.getElementById("timer"),
    audio: document.getElementById("answer-audio"),
    audioSlot: document.getElementById("audio-slot"),
    audioEmpty: document.getElementById("audio-empty"),
    audioStatus: document.getElementById("audio-status"),
    btnPlay: document.getElementById("btn-play"),
    btnAuto: document.getElementById("btn-auto"),
    btnPause: document.getElementById("btn-pause"),
    btnStop: document.getElementById("btn-stop"),
    btnTranscript: document.getElementById("btn-transcript"),
    transcript: document.getElementById("transcript"),
    transcriptBody: document.getElementById("transcript-body"),
    chapters: document.getElementById("chapters"),
    cursor: document.getElementById("auto-cursor"),
    runner: document.getElementById("runner"),
    runnerLog: document.getElementById("runner-log"),
    runnerState: document.getElementById("runner-state"),
  };

  let activeStage = "intake";
  let audioReady = false;
  let autoRunning = false;
  let autoAbort = false;
  let autoPaused = false;
  let activeChapter = "open";
  const leverState = Object.fromEntries(levers.map((l) => [l.id, false]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setMove(id) {
    document.querySelectorAll(".move").forEach((b) => {
      const on = b.dataset.move === id;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    const m = moves[id];
    els.moveDetail.innerHTML = `
      <h4>${m.title}</h4>
      <p>${m.body}</p>
      <ul>${m.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
    `;
  }

  function setStage(id) {
    activeStage = id;
    const s = stages.find((x) => x.id === id);
    els.stageDetail.innerHTML = `
      <h4>${s.name}</h4>
      <p><strong>Why:</strong> ${s.influence}</p>
      <p style="margin-top:0.55rem"><strong>How:</strong> ${s.how}</p>
    `;
    els.stages.querySelectorAll(".stage").forEach((btn) => {
      const on = btn.dataset.stage === id;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    updateQueue();
  }

  function setLevers(ids) {
    const wanted = new Set(ids);
    levers.forEach((l) => {
      leverState[l.id] = wanted.has(l.id);
    });
    els.levers.querySelectorAll(".lever").forEach((row) => {
      const on = leverState[row.dataset.lever];
      row.classList.toggle("is-on", on);
      const sw = row.querySelector(".switch");
      if (sw) sw.setAttribute("aria-checked", on ? "true" : "false");
    });
    updateMeter();
  }

  function toggleLever(id, on) {
    leverState[id] = on;
    const row = els.levers.querySelector(`[data-lever="${id}"]`);
    if (row) {
      row.classList.toggle("is-on", on);
      row.querySelector(".switch")?.setAttribute("aria-checked", on ? "true" : "false");
    }
    updateMeter();
  }

  function leverScore() {
    return levers.reduce((sum, l) => sum + (leverState[l.id] ? l.weight : 0), 0);
  }

  function updateMeter() {
    const score = Math.min(100, 22 + leverScore());
    els.meterFill.style.width = `${score}%`;
    els.meterValue.textContent = `${score}%`;

    if (score < 40) {
      els.meterLabel.textContent = "Fragile";
      els.queueHealth.textContent = "Fragile";
      els.defectTiming.textContent = "Late · costly";
      els.teamPosture.textContent = "Heroics over prevention";
      els.queueCaption.textContent =
        "Signal is noisy. Stories jam near the gate as late defects.";
    } else if (score < 70) {
      els.meterLabel.textContent = "Getting better";
      els.queueHealth.textContent = "Stabilizing";
      els.defectTiming.textContent = "Earlier · cheaper";
      els.teamPosture.textContent = "Shared caution";
      els.queueCaption.textContent =
        "Trust is climbing. More stories clear; fewer pile up late.";
    } else {
      els.meterLabel.textContent = "Trusted";
      els.queueHealth.textContent = "Flowing";
      els.defectTiming.textContent = "Caught upstream";
      els.teamPosture.textContent = "Prevention over heroics";
      els.queueCaption.textContent =
        "Trusted signal + early push. Queue clears the gate.";
    }
    updateQueue();
  }

  function updateQueue() {
    const score = 22 + leverScore();
    const stageBoost = ["intake", "contract", "build"].includes(activeStage) ? 8 : 0;
    const clear = score + stageBoost >= 55;
    els.tickets.querySelectorAll(".ticket").forEach((t, i) => {
      t.classList.toggle("is-clear", clear && i < 4);
      t.classList.toggle("is-jam", !clear && i >= 3);
      const base = 12 + i * 14;
      t.style.left = clear ? `${Math.min(88, base + 12)}%` : `${base}%`;
    });
  }

  function applyChapter(chapter, { scroll = false } = {}) {
    activeChapter = chapter.id;
    setMove(chapter.move);
    setStage(chapter.stage);
    setLevers(chapter.levers);
    els.chapters.querySelectorAll(".chapter").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.chapter === chapter.id);
    });
    if (scroll) {
      const target =
        chapter.id === "close"
          ? document.getElementById("close")
          : document.getElementById("console");
      softScrollInto(target, "start");
    }
  }

  function chapterForTime(t) {
    let current = CHAPTERS[0];
    for (const c of CHAPTERS) {
      if (t >= c.at) current = c;
    }
    return current;
  }

  function buildTickets() {
    const labels = ["STORY", "PAY", "GATE", "POS", "API", "MEMBER"];
    els.tickets.innerHTML = "";
    labels.forEach((label, i) => {
      const el = document.createElement("div");
      el.className = "ticket";
      el.textContent = label;
      el.style.left = `${12 + i * 14}%`;
      els.tickets.appendChild(el);
    });
  }

  function buildStages() {
    els.stages.innerHTML = stages
      .map(
        (s, i) => `
      <li>
        <button class="stage" type="button" data-stage="${s.id}" aria-pressed="false">
          <span class="stage__idx">${String(i + 1).padStart(2, "0")}</span>
          <span class="stage__name">${s.name}</span>
        </button>
      </li>`
      )
      .join("");

    els.stages.addEventListener("click", (e) => {
      const btn = e.target.closest(".stage");
      if (!btn) return;
      setStage(btn.dataset.stage);
    });
  }

  function buildLevers() {
    els.levers.innerHTML = levers
      .map(
        (l) => `
      <li class="lever" data-lever="${l.id}">
        <button class="switch" type="button" role="switch" aria-checked="false" aria-label="${l.title}"></button>
        <div>
          <p class="lever__title">${l.title}</p>
          <p class="lever__copy">${l.copy}</p>
        </div>
      </li>`
      )
      .join("");

    els.levers.addEventListener("click", (e) => {
      const btn = e.target.closest(".switch");
      if (!btn) return;
      const row = btn.closest(".lever");
      const id = row.dataset.lever;
      toggleLever(id, !leverState[id]);
    });
  }

  function buildChapters() {
    els.chapters.innerHTML = CHAPTERS.map(
      (c) =>
        `<button type="button" class="chapter" role="listitem" data-chapter="${c.id}">${c.label}</button>`
    ).join("");

    els.chapters.addEventListener("click", (e) => {
      const btn = e.target.closest(".chapter");
      if (!btn) return;
      const chapter = CHAPTERS.find((c) => c.id === btn.dataset.chapter);
      // Avoid jump-scrolling while automation is driving.
      applyChapter(chapter, { scroll: !autoRunning });
      if (audioReady && !autoRunning) {
        els.audio.currentTime = chapter.at;
        els.audio.play().catch(() => {});
        syncPlayButton();
      }
    });
  }

  function markAudioReady(src) {
    audioReady = true;
    els.audio.src = src;
    els.audioSlot.dataset.state = "ready";
    els.audioEmpty.hidden = true;
    els.btnPlay.disabled = false;
    els.audioStatus.textContent = "Ready. Play audio, or Automate from the top bar.";
  }

  function markAudioEmpty() {
    audioReady = false;
    els.audioSlot.dataset.state = "empty";
    els.audioEmpty.hidden = false;
    els.btnPlay.disabled = true;
    els.audioStatus.textContent = "No audio file. Automate from the top bar still works.";
  }

  async function detectAudio() {
    const configured =
      typeof window.QUALITY_OPS_AUDIO === "string" && window.QUALITY_OPS_AUDIO
        ? [window.QUALITY_OPS_AUDIO]
        : AUDIO_CANDIDATES;

    if (window.QUALITY_OPS_AUDIO === null) {
      markAudioEmpty();
      return;
    }

    for (const src of configured) {
      try {
        const res = await fetch(src, { method: "GET", cache: "no-store" });
        if (!res.ok) continue;
        const type = res.headers.get("content-type") || "";
        if (type.includes("text/html")) continue;
        await res.arrayBuffer();
        markAudioReady(src);
        return;
      } catch {
        /* next */
      }
    }
    markAudioEmpty();
  }

  function syncPlayButton() {
    els.btnPlay.textContent = els.audio.paused ? "Play" : "Pause";
  }

  function formatTime(total) {
    const m = Math.floor(total / 60);
    const s = String(Math.floor(total % 60)).padStart(2, "0");
    return `${m}:${s}`;
  }

  function sleep(ms) {
    return new Promise((resolve) => {
      const total = reduceMotion ? Math.min(ms, 120) : ms;
      const start = performance.now();
      const tick = () => {
        if (autoAbort) {
          resolve();
          return;
        }
        if (autoPaused) {
          window.setTimeout(tick, 50);
          return;
        }
        if (performance.now() - start >= total) {
          resolve();
          return;
        }
        window.setTimeout(tick, 40);
      };
      tick();
    });
  }

  function syncAutoControls() {
    const active = autoRunning && !autoAbort;
    els.btnAuto.disabled = active;
    els.btnPause.disabled = !active;
    els.btnStop.disabled = !active;
    els.btnAuto.classList.toggle("is-running", active && !autoPaused);
    els.btnPause.classList.toggle("is-paused", active && autoPaused);
    els.btnPause.textContent = autoPaused ? "Resume" : "Pause";
    if (!active) {
      els.btnAuto.textContent = "Automate";
      els.runnerState && (els.runnerState.textContent = els.runnerState.textContent || "idle");
    } else {
      els.btnAuto.textContent = autoPaused ? "Paused" : "Running…";
      if (els.runnerState) els.runnerState.textContent = autoPaused ? "paused" : "running";
    }
  }

  function softScrollInto(el, block = "nearest") {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const header = document.querySelector(".top");
    const topPad = (header?.offsetHeight || 64) + 12;
    const viewH = window.innerHeight;
    const fullyVisible = rect.top >= topPad && rect.bottom <= viewH - 12;
    if (fullyVisible) return false;
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: block === "center" ? "nearest" : block,
      inline: "nearest",
    });
    return true;
  }

  function logStep(text, status = "run") {
    const li = document.createElement("li");
    li.className = `runner__step is-${status}`;
    li.innerHTML = `<span class="runner__icon" aria-hidden="true"></span><code>${text}</code>`;
    els.runnerLog.appendChild(li);
    els.runnerLog.scrollTop = els.runnerLog.scrollHeight;
    return li;
  }

  function passStep(li) {
    li.classList.remove("is-run");
    li.classList.add("is-pass");
  }

  async function moveCursorTo(el) {
    if (!el || autoAbort) return;
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + Math.min(rect.height / 2, 28);
    els.cursor.style.setProperty("--cx", `${x}px`);
    els.cursor.style.setProperty("--cy", `${y}px`);
    els.cursor.classList.add("is-on");
    els.cursor.style.transform = `translate(${x}px, ${y}px) scale(1)`;
    await sleep(reduceMotion ? 80 : 320);
    if (autoAbort) return;
    els.cursor.classList.add("is-click");
    els.cursor.style.transform = `translate(${x}px, ${y}px) scale(0.72)`;
    el.classList.add("is-auto-hit");
    await sleep(reduceMotion ? 40 : 120);
    if (autoAbort) return;
    els.cursor.classList.remove("is-click");
    els.cursor.style.transform = `translate(${x}px, ${y}px) scale(1)`;
    await sleep(reduceMotion ? 40 : 100);
    el.classList.remove("is-auto-hit");
  }

  async function autoClick(selector, note, { dwell = 360 } = {}) {
    if (autoAbort) return false;
    const el = document.querySelector(selector);
    const step = logStep(note);
    if (!el) {
      step.classList.add("is-fail");
      return false;
    }
    softScrollInto(el, "nearest");
    await sleep(180);
    if (autoAbort) return false;
    await moveCursorTo(el);
    if (autoAbort) return false;
    el.click();
    passStep(step);
    await sleep(dwell);
    return !autoAbort;
  }

  async function autoExpect(textRe, note) {
    if (autoAbort) return false;
    const step = logStep(note);
    await sleep(160);
    if (autoAbort) return false;
    const ok = textRe.test(document.body.innerText);
    if (ok) passStep(step);
    else step.classList.add("is-fail");
    return ok;
  }

  function stopAutomation({ keepAudio = false } = {}) {
    autoAbort = true;
    autoPaused = false;
    autoRunning = false;
    els.cursor.classList.remove("is-on", "is-click");
    document.querySelectorAll(".is-auto-hit").forEach((n) => n.classList.remove("is-auto-hit"));
    if (els.runnerState) els.runnerState.textContent = "stopped";
    if (!keepAudio && audioReady && !els.audio.paused) {
      els.audio.pause();
      syncPlayButton();
    }
    syncAutoControls();
  }

  function togglePause() {
    if (!autoRunning || autoAbort) return;
    autoPaused = !autoPaused;
    if (autoPaused && audioReady && !els.audio.paused) {
      els.audio.pause();
      syncPlayButton();
    }
    syncAutoControls();
  }

  async function runAutomation() {
    if (autoRunning) return;

    autoAbort = false;
    autoPaused = false;
    autoRunning = true;
    let passed = 0;
    let failed = 0;
    els.runner.hidden = false;
    els.runnerLog.innerHTML = "";
    syncAutoControls();

    // Fresh run without jumping the viewport hard.
    setLevers([]);
    setMove("signal");
    setStage("intake");
    els.transcript.hidden = true;
    els.btnTranscript.setAttribute("aria-expanded", "false");
    softScrollInto(document.getElementById("audio-dock"), "start");

    const track = async (fn) => {
      if (autoAbort) return;
      const before = els.runnerLog.querySelectorAll(".is-fail").length;
      await fn();
      if (autoAbort) return;
      const after = els.runnerLog.querySelectorAll(".is-fail").length;
      if (after > before) failed += 1;
      else passed += 1;
    };

    // 1) Script panel
    await track(() =>
      autoClick("#btn-transcript", "await page.getByRole('button', { name: /Script/i }).click()", {
        dwell: 700,
      })
    );
    await track(async () => {
      for (let i = 0; i < 20 && !autoAbort; i++) {
        if (/Here's how I think about it|Quality isn't a phase/i.test(els.transcriptBody?.textContent || "")) {
          break;
        }
        await sleep(100);
      }
      await autoExpect(
        /Here's how I think about it|Quality isn't a phase/i,
        "await expect(page.locator('#transcript-body')).toContainText(/Quality isn't/i)"
      );
    });

    // 2) Chapters (no page jump — stay near dock)
    softScrollInto(document.getElementById("chapters"), "nearest");
    for (const c of CHAPTERS) {
      await track(() =>
        autoClick(`[data-chapter="${c.id}"]`, `await page.getByRole('button', { name: '${c.label}' }).click()`, {
          dwell: 320,
        })
      );
    }

    // 3) Lead moves
    softScrollInto(document.getElementById("console"), "start");
    await track(() =>
      autoClick('[data-move="signal"]', "await page.getByRole('button', { name: /Own the signal/i }).click()", {
        dwell: 560,
      })
    );
    await track(() =>
      autoExpect(/If the suite is flaky/i, "await expect(page.getByText(/suite is flaky/i)).toBeVisible()")
    );
    await track(() =>
      autoClick('[data-move="left"]', "await page.getByRole('button', { name: /Show up earlier/i }).click()", {
        dwell: 560,
      })
    );
    await track(() =>
      autoClick('[data-move="path"]', "await page.getByRole('button', { name: /Make good work easy/i }).click()", {
        dwell: 560,
      })
    );

    // 4) Process stages (all six)
    for (const s of stages) {
      await track(() =>
        autoClick(`[data-stage="${s.id}"]`, `await page.getByRole('button', { name: /${s.name.split(" ")[0]}/i }).click()`, {
          dwell: 480,
        })
      );
    }

    // 5) Levers
    setLevers([]);
    softScrollInto(document.querySelector(".panel--levers"), "nearest");
    for (const l of levers) {
      await track(() =>
        autoClick(
          `[data-lever="${l.id}"] .switch`,
          `await page.getByRole('switch', { name: /${l.title}/i }).click()`,
          { dwell: 400 }
        )
      );
    }
    await track(() =>
      autoExpect(/Trusted|Flowing|Caught upstream/i, "await expect(page.getByText(/Trusted|Flowing/i)).toBeVisible()")
    );
    await track(() =>
      autoExpect(/Queue clears the gate|Trusted signal/i, "await expect(page.locator('#queue-caption')).toContainText(/clear|Trusted/i)")
    );

    // 6) Close + play
    await track(async () => {
      const step = logStep("await page.locator('#close').scrollIntoViewIfNeeded()");
      softScrollInto(document.getElementById("close"), "start");
      await sleep(360);
      if (!autoAbort) passStep(step);
    });

    if (!autoAbort && audioReady) {
      softScrollInto(document.getElementById("audio-dock"), "start");
      await track(() =>
        autoClick("#btn-play", "await page.getByRole('button', { name: /^Play$/i }).click()", {
          dwell: 500,
        })
      );
      await track(() =>
        autoExpect(/Pause/i, "await expect(page.getByRole('button', { name: /Pause/i })).toBeVisible()")
      );
    }

    if (!autoAbort) {
      if (els.runnerState) els.runnerState.textContent = failed ? "failed" : "passed";
      logStep(
        failed
          ? `✗ ${passed} passed, ${failed} failed`
          : `✓ ${passed} passed (full UI automation)`,
        failed ? "fail" : "pass"
      );
    }

    autoRunning = false;
    autoPaused = false;
    els.cursor.classList.remove("is-on", "is-click");
    syncAutoControls();
  }

  function bindAudioUi() {
    els.btnPlay.addEventListener("click", () => {
      if (!audioReady) return;
      if (els.audio.paused) els.audio.play().catch(() => {});
      else els.audio.pause();
      syncPlayButton();
    });

    els.audio.addEventListener("play", syncPlayButton);
    els.audio.addEventListener("pause", syncPlayButton);
    els.audio.addEventListener("loadedmetadata", () => {
      els.timer.textContent = formatTime(els.audio.duration || 0);
    });
    els.audio.addEventListener("timeupdate", () => {
      const chapter = chapterForTime(els.audio.currentTime);
      if (chapter.id !== activeChapter) applyChapter(chapter);
      const remaining = Math.max(0, (els.audio.duration || 0) - els.audio.currentTime);
      els.timer.textContent = formatTime(remaining);
    });
  }

  document.querySelectorAll(".move").forEach((btn) => {
    btn.addEventListener("click", () => {
      setMove(btn.dataset.move);
    });
  });

  els.btnAuto.addEventListener("click", () => {
    runAutomation();
  });
  els.btnPause.addEventListener("click", () => {
    togglePause();
  });
  els.btnStop.addEventListener("click", () => {
    stopAutomation();
  });

  els.btnTranscript.addEventListener("click", async () => {
    const open = els.transcript.hidden;
    els.transcript.hidden = !open;
    els.btnTranscript.setAttribute("aria-expanded", open ? "true" : "false");
    if (open && !els.transcriptBody.textContent) {
      try {
        const res = await fetch("./audio/script.txt", { cache: "no-store" });
        els.transcriptBody.textContent = res.ok
          ? await res.text()
          : "Script file missing.";
      } catch {
        els.transcriptBody.textContent = "Could not load script.";
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea, audio")) return;
    if (e.code === "Space") {
      e.preventDefault();
      if (audioReady) els.btnPlay.click();
    }
    if (e.key === "a" || e.key === "A") {
      e.preventDefault();
      if (!autoRunning) els.btnAuto.click();
    }
    if (e.key === "p" || e.key === "P") {
      e.preventDefault();
      togglePause();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      stopAutomation();
    }
    if (e.key === "1") setMove("signal");
    if (e.key === "2") setMove("left");
    if (e.key === "3") setMove("path");
  });

  buildTickets();
  buildStages();
  buildLevers();
  buildChapters();
  bindAudioUi();
  applyChapter(CHAPTERS[0]);
  syncAutoControls();
  detectAudio();
})();
