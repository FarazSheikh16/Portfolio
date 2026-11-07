/* Living embedding space: points that re-cluster into a new shape for each section.
   Draws into <canvas id="field">; the shape sits inside the .viz box in the left column.
   main.js calls Field.set(sectionId) and Field.focus(index | -1). */
(() => {
  "use strict";
  const cv = document.getElementById("field");
  const viz = document.querySelector(".viz");
  if (!cv || !viz || !cv.getContext) return;
  const S = window.SITE;
  const ctx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || /[?&]still\b/.test(location.search);
  const desk = matchMedia("(min-width: 1024px)");
  const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

  let W = 0, H = 0, dpr = 1, N = 0, SHAPE = 0;
  let P = [];                    // points
  let labels = [];               // {x, y, text, g, align}
  let section = "about", focus = -1, setAt = 0;
  let mx = -9999, my = -9999, mouseIn = false;
  let accent = "#e2c58f", dim = "#7f8c7d", head = "#efe6d2", electric = "#a77bff";
  const rnd = (a, b) => a + Math.random() * (b - a);
  const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    accent = cs.getPropertyValue("--accent").trim() || accent;
    dim = cs.getPropertyValue("--dim").trim() || dim;
    head = cs.getPropertyValue("--head").trim() || head;
    electric = cs.getPropertyValue("--electric").trim() || electric;
  };

  /* the box the shape lives in, in canvas coordinates */
  const stage = () => {
    const r = viz.getBoundingClientRect();
    const oy = desk.matches ? 0 : scrollY;
    return { x: r.left, y: r.top + oy, w: r.width, h: r.height };
  };

  /* ---------- shapes: each returns S targets {x,y,g} and sets labels ---------- */
  const shapes = {
    about(n, b) {
      // the initials, sampled from text drawn off-screen
      const off = document.createElement("canvas");
      off.width = Math.max(1, b.w | 0); off.height = Math.max(1, b.h | 0);
      const o = off.getContext("2d");
      let fs = b.h * 0.95;
      o.font = `800 ${fs}px Inter, system-ui, sans-serif`;
      const tw = o.measureText("AF").width;
      if (tw > b.w * 0.9) { fs *= (b.w * 0.9) / tw; o.font = `800 ${fs}px Inter, system-ui, sans-serif`; }
      o.textBaseline = "middle"; o.textAlign = "left";
      o.fillText("AF", 0, b.h / 2);
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const pts = [];
      const step = Math.max(2, Math.round(Math.sqrt((b.w * b.h) / 5000)));
      for (let y = 0; y < off.height; y += step) for (let x = 0; x < off.width; x += step) if (data[(y * off.width + x) * 4 + 3] > 128) pts.push([x, y]);
      labels = [{ x: b.x, y: b.y + b.h + 4, text: "embedding(\"Ahmad Faraz Sheikh\")", g: -1, align: "left" }];
      if (!pts.length) return Array.from({ length: n }, () => ({ x: b.x + rnd(0, b.w), y: b.y + rnd(0, b.h), g: -1 }));
      return Array.from({ length: n }, () => { const p = pts[(Math.random() * pts.length) | 0]; return { x: b.x + p[0] + rnd(-1, 1), y: b.y + p[1] + rnd(-1, 1), g: -1 }; });
    },

    experience(n, b) {
      // a timeline: one dense cluster per role, joined by a thin trail. Index order matches the list (newest first).
      const roles = [{ at: 0.86, l: "L4 · 2026→" }, { at: 0.5, l: "L3 · 2024–26" }, { at: 0.12, l: "Intern · 2023" }];
      const y = b.y + b.h * 0.5;
      labels = roles.map((r, g) => ({ x: b.x + b.w * r.at, y: y + b.h * 0.3, text: r.l, g, align: "center" }));
      labels.push({ x: b.x, y: b.y + b.h + 4, text: "career.timeline()", g: -1, align: "left" });
      const sizes = [0.3, 0.4, 0.14];
      return Array.from({ length: n }, (_, i) => {
        const f = i / n;
        if (f > 0.84) return { x: b.x + rnd(0.04, 0.96) * b.w, y: y + gauss() * 1.2, g: -1 };
        const g = f < sizes[0] * 1.0 ? 0 : f < (sizes[0] + sizes[1]) ? 1 : 2;
        const sp = [0.07, 0.1, 0.045][g] * b.w;
        return { x: b.x + roles[g].at * b.w + gauss() * sp * 0.6, y: y + gauss() * b.h * 0.13, g };
      });
    },

    projects(n, b) {
      // a t-SNE style plot: one cluster per featured project
      const feat = S.projects.filter((p) => p.featured);
      const spots = [[0.2, 0.3], [0.68, 0.24], [0.36, 0.74], [0.84, 0.7]];
      labels = feat.map((p, g) => ({ x: b.x + spots[g][0] * b.w, y: b.y + spots[g][1] * b.h - b.h * 0.27, text: p.short, g, align: "center" }));
      labels.push({ x: b.x, y: b.y + b.h + 4, text: "tsne(projects, k=" + feat.length + ")", g: -1, align: "left" });
      return Array.from({ length: n }, (_, i) => {
        if (i % 9 === 0) return { x: b.x + rnd(0, b.w), y: b.y + rnd(0, b.h), g: -1 };
        const g = i % feat.length;
        const r = Math.min(b.w, b.h) * 0.09;
        return { x: b.x + spots[g][0] * b.w + gauss() * r, y: b.y + spots[g][1] * b.h + gauss() * r * 0.8, g };
      });
    },

    writing(n, b) {
      // documents split into chunks: each article is a row of "words"
      const docs = S.writing.slice(0, 4);
      const rows = docs.length;
      const words = docs.map(() => { const ws = []; let x = 0.14; while (x < 0.98) { const w = rnd(0.04, 0.13); if (x + w > 0.98) break; ws.push([x, w]); x += w + 0.025; } return ws; });
      labels = docs.map((d, g) => ({ x: b.x, y: b.y + ((g + 0.5) / rows) * b.h - 6, text: d.date.slice(0, 3) + " '" + d.date.slice(-2), g, align: "left", mid: true }));
      labels.push({ x: b.x, y: b.y + b.h + 4, text: "chunk(articles, size=512)", g: -1, align: "left" });
      return Array.from({ length: n }, (_, i) => {
        const g = i % rows;
        const ws = words[g];
        const w = ws[(Math.random() * ws.length) | 0];
        return { x: b.x + (w[0] + Math.random() * w[1]) * b.w, y: b.y + ((g + 0.5) / rows) * b.h + gauss() * b.h * 0.025, g };
      });
    }
  };

  const ambientTarget = (p) => { p.bx = rnd(0, W); p.by = rnd(0, H); };

  const build = () => {
    const small = !desk.matches;
    N = small ? 420 : 900;
    SHAPE = small ? 320 : 620;
    P = Array.from({ length: N }, (_, i) => {
      const p = { x: rnd(0, W), y: rnd(0, H), vx: 0, vy: 0, tx: 0, ty: 0, g: -1, d: 0, amb: i >= SHAPE, ph: rnd(0, 6.28), sp: rnd(0.2, 0.6), s: rnd(0.8, 1.6) };
      if (p.amb) ambientTarget(p);
      return p;
    });
  };

  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    if (desk.matches) { W = Math.ceil(document.querySelector(".side").getBoundingClientRect().right); H = innerHeight; cv.style.height = ""; cv.style.width = W + "px"; }
    else { cv.style.width = ""; const r = viz.getBoundingClientRect(); W = innerWidth; H = Math.ceil(r.bottom + scrollY + 30); cv.style.height = H + "px"; }
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const want = desk.matches ? 900 : 420;
    if (N !== want) build(); else P.forEach((p) => p.amb && ambientTarget(p));
    retarget(false);
  };

  const retarget = (stagger) => {
    const b = stage();
    if (b.w < 20 || b.h < 20) return;
    const t = (shapes[section] || shapes.about)(SHAPE, b);
    const now = performance.now();
    setAt = now;
    // shuffle which point goes where so the flow looks organic
    const order = P.slice(0, SHAPE).sort(() => Math.random() - 0.5);
    order.forEach((p, i) => { p.tx = t[i].x; p.ty = t[i].y; p.g = t[i].g; p.d = stagger ? now + Math.random() * 420 : 0; });
    if (reduce) { P.forEach((p) => { if (!p.amb) { p.x = p.tx; p.y = p.ty; } else { p.x = p.bx; p.y = p.by; } }); draw(now); }
  };

  /* ---------- frame ---------- */
  const near = [];
  const draw = (now) => {
    ctx.clearRect(0, 0, W, H);
    const t = now / 1000;
    const settle = reduce ? 1 : Math.min(1, Math.max(0, (now - setAt - 700) / 600));
    const R = 110;
    near.length = 0;

    for (const p of P) {
      if (!reduce) {
        let tx, ty;
        if (p.amb) { tx = p.bx + Math.sin(t * p.sp + p.ph) * 24; ty = p.by + Math.cos(t * p.sp * 0.8 + p.ph) * 18; }
        else if (now < p.d) { tx = p.x; ty = p.y; }
        else { tx = p.tx + Math.sin(t * 1.3 + p.ph) * 0.8; ty = p.ty + Math.cos(t * 1.1 + p.ph) * 0.8; }
        p.vx = (p.vx + (tx - p.x) * (p.amb ? 0.004 : 0.05)) * 0.84;
        p.vy = (p.vy + (ty - p.y) * (p.amb ? 0.004 : 0.05)) * 0.84;
        if (mouseIn) {
          const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
          if (d < R && d > 0.1) { const f = (1 - d / R) * 1.1; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
        }
        p.x += p.vx; p.y += p.vy;
      }
      if (mouseIn) { const d = Math.hypot(p.x - mx, p.y - my); if (d < 170) near.push([d, p]); }
    }

    // ambient field
    ctx.fillStyle = dim;
    const base = desk.matches ? 0.45 : 0.3;
    for (const p of P) if (p.amb) {
      // fade out where the green shades into sand
      ctx.globalAlpha = base * Math.max(0, Math.min(1, desk.matches ? (W - p.x) / 220 : (H - 60 - p.y) / 200));
      ctx.fillRect(p.x, p.y, p.s, p.s);
    }

    // accent glow behind the shape (the 10%: glow, highlight, query)
    const sb = stage();
    if (sb.w > 20) {
      const cx = sb.x + sb.w * 0.5, cy = sb.y + sb.h * 0.55;
      const r = Math.max(10, Math.min(Math.max(sb.w, sb.h) * 0.7, H - cy - 2, cy - 2)); // stay inside the canvas so no hard edge
      const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gr.addColorStop(0, accent); gr.addColorStop(1, "transparent");
      ctx.globalAlpha = 0.13; ctx.fillStyle = gr;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    }

    // the shape, in the light colour; a hovered cluster lights up in the accent
    for (const p of P) {
      if (p.amb) continue;
      const lit = focus >= 0 && p.g === focus;
      const faded = focus >= 0 && p.g !== focus;
      ctx.fillStyle = lit ? accent : head;
      ctx.globalAlpha = faded ? 0.16 : lit ? 1 : p.g === -1 && section !== "about" ? 0.3 : 0.72;
      const s = lit ? 2.6 : 1.9;
      ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
    }

    // labels
    if (settle > 0) {
      ctx.font = `500 11px ${MONO}`;
      ctx.textBaseline = "top";
      for (const l of labels) {
        const lit = l.g >= 0 && l.g === focus;
        ctx.globalAlpha = settle * (l.g === -1 ? 0.55 : focus >= 0 && !lit ? 0.3 : 0.9);
        ctx.fillStyle = l.g === -1 ? dim : lit ? accent : head;
        ctx.textAlign = l.align;
        ctx.fillText(l.text, l.x, l.y);
      }
    }

    // cursor = a query vector: draw lines to its k nearest neighbours
    if (mouseIn && near.length) {
      near.sort((a, b) => a[0] - b[0]);
      const k = Math.min(6, near.length);
      ctx.strokeStyle = electric; ctx.lineWidth = 1;
      for (let i = 0; i < k; i++) {
        const [d, p] = near[i];
        ctx.globalAlpha = 0.5 * (1 - d / 170);
        ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(p.x, p.y); ctx.stroke();
      }
      ctx.globalAlpha = 0.95; ctx.fillStyle = electric;
      ctx.beginPath(); ctx.arc(mx, my, 2.5, 0, 6.28); ctx.fill();
      ctx.globalAlpha = 0.6; ctx.fillStyle = dim; ctx.font = `500 10px ${MONO}`; ctx.textAlign = "left"; ctx.textBaseline = "top";
      ctx.fillText("query · k=" + k, mx + 10, my + 8);
    }
    ctx.globalAlpha = 1;
  };

  let frame = 0;
  const loop = (now) => {
    if (++frame % 30 === 0) readColors();
    if (!document.hidden) draw(now);
    requestAnimationFrame(loop);
  };

  /* ---------- wiring ---------- */
  const side = document.querySelector(".side");
  addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = side.getBoundingClientRect();
    mouseIn = e.clientX < r.right + 24 && e.clientY > r.top && e.clientY < r.bottom;
    mx = e.clientX; my = e.clientY + (desk.matches ? 0 : scrollY);
  }, { passive: true });
  document.addEventListener("pointerleave", () => { mouseIn = false; });
  let rt;
  addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 120); });
  desk.addEventListener?.("change", resize);

  window.Field = {
    set(id) { if (id === section && P.length) return; section = id; focus = -1; readColors(); retarget(true); },
    refresh() { readColors(); if (reduce) draw(performance.now()); },
    focus(i) { focus = i; if (reduce) draw(performance.now()); }
  };

  readColors();
  resize();
  const start = () => { retarget(true); if (!reduce) requestAnimationFrame(loop); };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(start);
})();
