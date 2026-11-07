#!/usr/bin/env python3
"""Generates index.html and projects.html. Run: python3 tools/pages.py
Don't edit the .html files by hand; this script overwrites them.
Bump ASSET_VERSION after changing CSS or JS so returning visitors get the new files."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSET_VERSION = "21"
NAME = "Ahmad Faraz Sheikh"
EMAIL = "faraz.sheikh2001@gmail.com"


SECTIONS = [
    ("about", "About", "How I think about ML in production"),
    ("experience", "Experience", "Where I have shipped"),
    ("projects", "Projects", "Selected client work"),
    ("writing", "Writing", "Notes on Medium"),
]


def sec(i, inner):
    sid, label, kicker = SECTIONS[i]
    prev = SECTIONS[i - 1] if i > 0 else None
    nxt = SECTIONS[i + 1] if i + 1 < len(SECTIONS) else None
    pager = '<nav class="pager" aria-label="Section pages">'
    pager += f'<a class="pg prev" href="#{prev[0]}" data-sec="{prev[0]}"><small>Previous</small><span>← {prev[1]}</span></a>' if prev else '<span></span>'
    pager += f'<a class="pg next" href="#{nxt[0]}" data-sec="{nxt[0]}"><small>Next</small><span>{nxt[1]} →</span></a>' if nxt else '<a class="pg next" href="#about" data-sec="about"><small>Back to start</small><span>About ↺</span></a>'
    pager += '</nav>'
    return f'''      <section id="{sid}" class="sec" aria-label="{label}" data-num="0{i + 1}">
        <header class="sec-head"><span class="num">0{i + 1}</span><div><h2>{label}</h2><p class="kicker">{kicker}</p></div></header>
{inner}
        {pager}
      </section>
'''


TOC = "\n".join(f'        <a href="#{sid}" data-sec="{sid}"><i></i><b>0{n + 1}</b><span>{label}</span></a>' for n, (sid, label, _) in enumerate(SECTIONS))
TABS = "".join(f'<a href="#{sid}" data-sec="{sid}"><b>0{n + 1}</b>{label}</a>' for n, (sid, label, _) in enumerate(SECTIONS))
PALETTES = [  # id, name, accent note, dark, light, accent (keep in sync with style.css)
    ("navy", "Navy & Cream", "with a hint of coral", "#0f1b33", "#f3ead8", "#ff7a66"),
    ("forest", "Forest & Sand", "with a hint of electric purple", "#11261c", "#ece3d0", "#b08cff"),
    ("mono", "Midnight & White", "with a hint of lime", "#0a0a0b", "#ffffff", "#c6ff3d"),
]
PAL_MENU = "".join(
    f'<li role="none"><button type="button" role="menuitemradio" aria-checked="false" data-pal="{pid}">'
    f'<span class="sw" style="--d:{d};--l:{l};--s:{s}"><i></i><i></i><i></i></span><span>{name}<small>{note}</small></span></button></li>'
    for pid, name, note, d, l, s in PALETTES)


def topbar(home):
    if home:
        links, brand = TABS, '<a class="brand" href="#about" data-sec="about" aria-label="Ahmad Faraz Sheikh, back to start"><span>AF</span></a>'
    else:
        links = "".join(f'<a href="index.html#{sid}"><b>0{n + 1}</b>{label}</a>' for n, (sid, label, _) in enumerate(SECTIONS))
        brand = '<a class="brand" href="index.html" aria-label="Ahmad Faraz Sheikh, home"><span>AF</span></a>'
    return f'''<div class="topbar" role="banner">
  <div class="tb-in">
    {brand}
    <nav class="tb-nav" aria-label="Sections">{links}</nav>
    <a class="tb-cv" id="tbCv" download>Resume <span aria-hidden="true">↓</span></a>
    <div class="tb-theme">
      <button class="tb-pal" id="palBtn" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="palMenu" aria-label="Change colour theme"><span class="sw"><i></i><i></i><i></i></span><span class="lbl">Theme</span></button>
      <ul class="pal-menu" id="palMenu" role="menu" aria-label="Colour themes" hidden>{PAL_MENU}</ul>
    </div>
  </div>
</div>
'''


HOME = '''<canvas id="field" aria-hidden="true"></canvas>
''' + topbar(True) + '''<div class="layout">
  <header class="side">
    <div>
      <h1><a href="index.html">Ahmad Faraz Sheikh</a></h1>
      <h2 class="role">Machine Learning Engineer at Redbuffer</h2>
      <p class="typed" aria-label="What I work on"><span class="k">I build</span> <span id="typed"></span><span class="caret" aria-hidden="true"></span></p>
      <p class="pitch">Retrieval, agents and data pipelines that make LLM products work in production.</p>
      <nav class="toc" aria-label="Sections">
''' + TOC + '''
      </nav>
    </div>
    <div class="viz" aria-hidden="true"></div>
    <div class="side-foot">
      <ul class="socials" id="socials" aria-label="Social media"></ul>
    </div>
  </header>

  <main id="main" class="content sand">
''' + sec(0, '''        <div class="about" id="aboutText"></div>''') \
    + sec(1, '''        <ol class="list" id="experienceList"></ol>
        <a class="arrow-link" id="cvLink" download>Download full CV <span aria-hidden="true">→</span></a>''') \
    + sec(2, '''        <ol class="list" id="projectList"></ol>
        <a class="arrow-link" href="projects.html">View full project archive <span aria-hidden="true">→</span></a>''') \
    + sec(3, '''        <ol class="list" id="writingList"></ol>
        <footer class="foot">
          <p>Want to talk about RAG, agents or an ML role? Email <a id="footMail"></a>.</p>
          <p class="small">Hand-built with plain HTML, CSS and JavaScript. Hosted on GitHub Pages.</p>
        </footer>''') + '''  </main>
</div>
'''

ARCHIVE = topbar(False) + '''<main id="main" class="archive">
  <header class="arch-head"><div class="arch-in">
    <a class="back" href="index.html"><span aria-hidden="true">←</span> Ahmad Faraz Sheikh</a>
    <h1>All projects</h1>
    <p class="lead">Client systems from Redbuffer, university projects from PIEAS, and other code on GitHub.</p>
  </div></header>
  <div class="arch-body sand fade"><div class="arch-in">
    <table class="arch-table">
      <thead><tr><th>Year</th><th>Project</th><th class="hide-sm">Made at</th><th class="hide-md">Built with</th><th class="hide-sm">Link</th></tr></thead>
      <tbody id="archiveRows"></tbody>
    </table>
  </div></div>
</main>
'''

PAGES = {
    "index.html": {
        "title": f"{NAME} | Machine Learning Engineer",
        "desc": "Ahmad Faraz Sheikh is a machine learning engineer at Redbuffer building RAG systems, agentic AI, data pipelines and LLM evaluation, deployed on AWS and on-prem with vLLM.",
        "body": HOME,
    },
    "projects.html": {
        "title": f"Project archive | {NAME}",
        "desc": "Every project by Ahmad Faraz Sheikh: legal RAG, market data ingestion, agent guardrails, worksite safety AI, email automation, GNN survey matching, on-prem LLMs for EDI, and university work.",
        "body": ARCHIVE,
    },
}


def page(fname, cfg):
    v = ASSET_VERSION
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{cfg["title"]}</title>
<meta name="description" content="{cfg["desc"]}">
<meta name="author" content="{NAME}">
<meta property="og:type" content="website">
<meta property="og:title" content="{cfg["title"]}">
<meta property="og:description" content="{cfg["desc"]}">
<meta property="og:image" content="assets/img/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#11261c">
<script>try{{var m=location.search.match(/[?&]palette=([a-z]+)/),p=m?m[1]:localStorage.getItem("palette");if(p)document.documentElement.dataset.palette=p}}catch(e){{}}</script>
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css?v={v}">
</head>
<body data-page="{fname.split(".")[0]}">
<div class="spot" aria-hidden="true"></div>
<a class="skip" href="#main">Skip to content</a>
{cfg["body"]}
<dialog id="modal" class="sand" aria-labelledby="mTitle"><div id="modalBody"></div></dialog>
<noscript><p style="text-align:center;padding:2rem">This site needs JavaScript to show its content. Email <a href="mailto:{EMAIL}">{EMAIL}</a>.</p></noscript>
<script src="assets/js/content.js?v={v}" defer></script>
<script src="assets/js/field.js?v={v}" defer></script>
<script src="assets/js/main.js?v={v}" defer></script>
</body>
</html>
'''


for fname, cfg in PAGES.items():
    (ROOT / fname).write_text(page(fname, cfg), encoding="utf-8")
    print("wrote", fname)
