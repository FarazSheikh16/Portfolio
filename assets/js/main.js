(() => {
  "use strict";
  const S = window.SITE;
  const P = S.person;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const put = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; return el; };
  const ext = 'target="_blank" rel="noopener noreferrer"';
  const tags = (arr) => `<ul class="tags" aria-label="Technologies">${arr.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
  const byId = Object.fromEntries(S.projects.map((p) => [p.id, p]));

  const root = document.documentElement;

  /* colour themes: the second button in the top bar */
  const THEME_COLOR = { navy: "#0f1b33", forest: "#11261c", mono: "#0a0a0b" };
  const palBtn = $("#palBtn"), palMenu = $("#palMenu");
  const setPalette = (id, save) => {
    if (!THEME_COLOR[id]) id = "forest";
    root.dataset.palette = id;
    $('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[id]);
    $$("[data-pal]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.pal === id)));
    if (save) { try { localStorage.setItem("palette", id); } catch (e) {} }
    window.Field?.refresh?.();
  };
  setPalette(root.dataset.palette || "forest");
  if (palBtn && palMenu) {
    const openMenu = (open) => {
      palMenu.hidden = !open;
      palBtn.setAttribute("aria-expanded", String(open));
      if (open) (palMenu.querySelector('[aria-checked="true"]') || palMenu.querySelector("button"))?.focus();
    };
    palBtn.addEventListener("click", () => openMenu(palMenu.hidden));
    palMenu.addEventListener("click", (e) => {
      const b = e.target.closest("[data-pal]");
      if (b) { setPalette(b.dataset.pal, true); openMenu(false); palBtn.focus(); }
    });
    palMenu.addEventListener("keydown", (e) => {
      const items = $$("[data-pal]", palMenu), i = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    });
    document.addEventListener("click", (e) => { if (!palMenu.hidden && !e.target.closest(".tb-theme")) openMenu(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !palMenu.hidden) { openMenu(false); palBtn.focus(); } });
  }

  /* cursor spotlight */
  const spot = $(".spot");
  if (spot && matchMedia("(hover:hover)").matches) {
    addEventListener("pointermove", (e) => {
      spot.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, var(--spot), transparent 80%)`;
    }, { passive: true });
  }

  /* socials (Simple Icons paths, CC0) */
  const SI = {
    GitHub: "M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3",
    LinkedIn: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
    Medium: "M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
    Email: null
  };
  const mailIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/></svg>';
  const cvIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>';
  put("socials", [["GitHub", P.github], ["LinkedIn", P.linkedin], ["Medium", P.medium], ["Email", "mailto:" + P.email], ["CV", P.cv]].map(([n, h]) => {
    const svg = n === "Email" ? mailIcon : n === "CV" ? cvIcon : `<svg viewBox="0 0 24 24" fill="currentColor"><path d="${SI[n]}"/></svg>`;
    const attrs = h.startsWith("http") ? ext : n === "CV" ? "download" : "";
    return `<li><a href="${h}" ${attrs} aria-label="${n === "CV" ? "Download CV (PDF)" : n}" title="${n === "CV" ? "Download CV" : n}">${svg}</a></li>`;
  }).join(""));

  /* about */
  put("aboutText", S.about.map((p) => `<p>${p}</p>`).join(""));

  /* experience */
  put("experienceList", S.experience.map((e) => {
    const stack = e.projects ? [...new Set(e.projects.flatMap((id) => byId[id].stack))].slice(0, 9) : ["Python", "PyTorch", "OpenCV", "Object detection"];
    return `<li class="item">
      <div class="when">${esc(e.when.replace(" – ", " — "))}</div>
      <div class="body">
        <h3><span class="t">${esc(e.role)}</span> <span class="co">· ${esc(e.org)}</span></h3>
        <p class="desc">${esc(e.text)}</p>
        ${e.projects ? `<ul class="bul">${e.projects.map((id) => `<li><button type="button" data-open="${id}">${esc(byId[id].short)}</button>: ${esc((/^[A-Z][a-z]/.test(byId[id].title) ? byId[id].title.charAt(0).toLowerCase() + byId[id].title.slice(1) : byId[id].title))}</li>`).join("")}</ul>` : ""}
        ${tags(stack)}
      </div>
    </li>`;
  }).join(""));
  const cvLink = $("#cvLink");
  if (cvLink) cvLink.href = P.cv;
  const tbCv = $("#tbCv");
  if (tbCv) tbCv.href = P.cv;

  /* projects */
  put("projectList", S.projects.filter((p) => p.featured).map((p) => `<li class="item">
    <div class="metric" aria-hidden="true"><b>${esc(p.stats[0][0])}</b><span>${esc(p.stats[0][1])}</span></div>
    <div class="body">
      <h3><button class="stretch" type="button" data-open="${p.id}" aria-label="Open case study: ${esc(p.title)}"></button><span class="t">${esc(p.title)}</span><span class="ar" aria-hidden="true">↗</span></h3>
      <div class="sub">${esc(p.client)}</div>
      <p class="desc">${esc(p.summary)}</p>
      ${tags(p.stack.slice(0, 6))}
    </div>
  </li>`).join(""));

  /* writing */
  put("writingList", S.writing.map((w) => `<li class="item">
    <div class="when">${esc(w.date)}</div>
    <div class="body">
      <h3><a class="stretch" href="${w.url}" ${ext} aria-label="${esc(w.title)} (opens Medium)"></a><span class="t">${esc(w.title)}</span><span class="ar" aria-hidden="true">↗</span></h3>
      <p class="desc">${esc(w.text)}</p>
    </div>
  </li>`).join(""));

  /* footer */
  const fm = $("#footMail");
  if (fm) { fm.href = "mailto:" + P.email; fm.textContent = P.email; }

  /* archive */
  const rows = [
    ...S.projects.map((p) => ({ yr: p.when, name: `<button type="button" data-open="${p.id}">${esc(p.title)}</button>`, at: "Redbuffer · " + esc(p.short), stack: p.stack.slice(0, 5), link: `<button type="button" data-open="${p.id}">Case study ↗</button>` })),
    ...S.university.map((u) => ({ yr: "2023–24", name: `<a href="${u.repo}" ${ext}>${esc(u.title)}</a>`, at: "PIEAS", stack: u.stats, link: `<a href="${u.repo}" ${ext}>GitHub ↗</a>` })),
    ...S.repos.map((r) => ({ yr: r.year || "—", name: `<a href="${P.github}/${r.name}" ${ext}>${esc(r.name)}</a>`, at: "Personal", stack: [r.lang], link: `<a href="${P.github}/${r.name}" ${ext}>GitHub ↗</a>` }))
  ];
  put("archiveRows", rows.map((r) => `<tr><td class="yr">${r.yr}</td><td class="nm">${r.name}</td><td class="at hide-sm">${r.at}</td><td class="hide-md">${tags(r.stack)}</td><td class="ln hide-sm">${r.link}</td></tr>`).join(""));

  /* case study modal */
  const modal = $("#modal");
  const openProject = (id) => {
    const p = byId[id];
    if (!p || !modal) return;
    const flow = (f) => `<div class="flow">${f.map((s) => `<span>${esc(s[0])}<small>${esc(s[1])}</small></span>`).join("<em>→</em>")}</div>`;
    $("#modalBody").innerHTML = `<div class="m-in">
      <div class="m-top"><span class="k">Case study · ${esc(p.client)} · ${esc(p.when)}</span><button class="m-x" type="button" data-close aria-label="Close">✕</button></div>
      <h2 id="mTitle">${esc(p.title)}</h2>
      <p class="lead">${esc(p.summary)}</p>
      <div class="m-stats">${p.stats.map(([b, s]) => `<div><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join("")}</div>
      <h4>The problem</h4><p>${esc(p.context)}</p>
      <h4>What I built</h4><ul class="bul">${p.built.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      <h4>Architecture</h4>${flow(p.flow)}${p.eval ? `<h4>Evaluation loop</h4>${flow(p.eval)}` : ""}
      <h4>Stack</h4>${tags(p.stack)}
      <div class="m-links"><a href="mailto:${P.email}?subject=${encodeURIComponent("About " + p.short)}">Talk to me about this <span aria-hidden="true">→</span></a>${(p.links || []).map(([l, h]) => `<a href="${h}" ${ext}>${esc(l)} ↗</a>`).join("")}</div>
    </div>`;
    if (!modal.open) modal.showModal();
    const box = $("#modalBody .m-in");
    if (box) { box.tabIndex = -1; box.focus({ preventScroll: true }); }
    modal.scrollTop = 0;
    history.replaceState(null, "", "#" + id);
  };
  modal?.addEventListener("close", () => { if (byId[location.hash.slice(1)]) history.replaceState(null, "", secs.length ? "#" + current : location.pathname); });
  modal?.addEventListener("click", (e) => { if (e.target === modal || e.target.closest("[data-close]")) modal.close(); });
  document.addEventListener("click", (e) => { const t = e.target.closest("[data-open]"); if (t) openProject(t.dataset.open); });
  /* section pages: one panel at a time, the left column stays put */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const secs = $$(".content .sec");
  const order = secs.map((s) => s.id);
  let current = order[0];
  const show = (id, push) => {
    if (!order.includes(id)) return;
    current = id;
    root.dataset.sec = id;
    window.Field?.set(id);
    secs.forEach((s) => { const on = s.id === id; s.classList.toggle("on", on); s.toggleAttribute("inert", !on); if (on) s.scrollTop = 0; });
    $$("[data-sec]").forEach((a) => a.classList.toggle("active", a.dataset.sec === id && !a.classList.contains("pg")));
    if (push) history.pushState(null, "", "#" + id);
    const nav = $(".tb-nav");
    const at = $(".tb-nav a.active");
    if (nav && at && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: at.offsetLeft - nav.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
    if (push && !matchMedia("(min-width: 1024px)").matches) {
      // phones: jump to the top of the new page, just under the bar
      const main = $("#main"), bar = $(".topbar");
      const y = main.getBoundingClientRect().top + scrollY - (bar ? bar.offsetHeight : 0) - 8;
      if (scrollY > y) scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    }
  };
  if (secs.length) {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-sec]");
      if (!a) return;
      e.preventDefault();
      if (a.dataset.sec !== current) show(a.dataset.sec, true);
    });
    const route = () => {
      const h = location.hash.slice(1);
      if (order.includes(h)) { if (modal?.open) modal.close(); show(h); }
      else if (byId[h]) { show("projects"); openProject(h); }
      else show(current);
    };
    addEventListener("popstate", route);
    /* hovering a row lights up its cluster in the embedding space */
    secs.forEach((s) => $$(".list > .item", s).forEach((it, i) => {
      it.addEventListener("pointerenter", () => window.Field?.focus(i));
      it.addEventListener("pointerleave", () => window.Field?.focus(-1));
      it.addEventListener("focusin", () => window.Field?.focus(i));
      it.addEventListener("focusout", () => window.Field?.focus(-1));
    }));
    addEventListener("keydown", (e) => {
      if (modal?.open || (palMenu && !palMenu.hidden) || e.altKey || e.metaKey || e.ctrlKey || /INPUT|TEXTAREA/.test(document.activeElement?.tagName || "")) return;
      const k = order.indexOf(current);
      if (e.key === "ArrowRight" && k < order.length - 1) show(order[k + 1], true);
      if (e.key === "ArrowLeft" && k > 0) show(order[k - 1], true);
    });
    route();
  } else if (byId[location.hash.slice(1)]) openProject(location.hash.slice(1));

  /* typed line: cycles through the services */
  const typed = $("#typed");
  if (typed) {
    const words = P.typed || S.services.map((s) => s.title);
    typed.textContent = words[0];
    if (!reduce) {
      let wi = 0, ci = words[0].length, del = true;
      const loop = () => {
        const w = words[wi];
        if (!del) { typed.textContent = w.slice(0, ++ci); if (ci === w.length) { del = true; return setTimeout(loop, 1900); } return setTimeout(loop, 55); }
        typed.textContent = w.slice(0, --ci);
        if (ci === 0) { del = false; wi = (wi + 1) % words.length; return setTimeout(loop, 300); }
        setTimeout(loop, 26);
      };
      setTimeout(loop, 2200);
    }
  }
})();
