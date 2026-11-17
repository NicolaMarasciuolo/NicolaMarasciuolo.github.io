// ---------- Menu del sito (uguale in tutte le pagine) ----------
// Per aggiungere una pagina: crea il file .html e aggiungi qui una riga.
const NAV = [
  { label: "About", href: "index.html#about" },
  { label: "Research", href: "index.html#research" },
  { label: "Publications", href: "publications.html" },
  { label: "Talks", href: "talks.html" },
  { label: "Contact", href: "index.html#contact" }
];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const page = location.pathname.split("/").pop() || "index.html";
let redraw = null;

// ---------- Intestazione e piè di pagina ----------
document.getElementById("site-header").innerHTML =
  `<a class="brand" href="index.html#top"><b>Nicola</b> Marasciuolo</a><nav>` +
  NAV.map(n => `<a href="${n.href}"${n.href === page ? ' class="active"' : ""}>${n.label}</a>`).join("") +
  `<button id="theme" type="button" aria-label="Switch between light and dark theme"><span class="ico"></span><span id="theme-label">Dark</span></button></nav>`;
document.getElementById("site-footer").innerHTML = `© ${new Date().getFullYear()} Nicola Marasciuolo`;

// ---------- Elenchi raggruppati per anno ----------
function groupByYear(list, renderItem) {
  const by = {};
  [...list].sort((x, y) => y.year - x.year).forEach(p => (by[p.year] = by[p.year] || []).push(p));
  return Object.keys(by).sort((x, y) => y - x).map(y =>
    `<h3 class="year">${y}</h3><ol class="bib">` + by[y].map(renderItem).join("") + `</ol>`).join("");
}
function badge(t) { return `<div class="abbr">${t ? `<span class="badge">${esc(t)}</span>` : ""}</div>`; }
const own = "N. Marasciuolo";

const newsEl = document.getElementById("news-list");
if (newsEl && typeof NEWS !== "undefined") newsEl.innerHTML = NEWS.map(n =>
  `<li><time>${esc(n.date)}</time><span>${esc(n.text)}</span></li>`).join("");

const pubEl = document.getElementById("pub-list");
if (pubEl && typeof PUBLICATIONS !== "undefined") {
  const limit = +pubEl.dataset.limit || PUBLICATIONS.length;
  const shown = [...PUBLICATIONS].sort((x, y) => y.year - x.year).slice(0, limit);
  pubEl.innerHTML = groupByYear(shown, p => {
    const btns = [p.abstract && `<button type="button" class="abs">Abs</button>`,
      p.doi && `<a href="${esc(p.doi)}">DOI</a>`, p.pdf && `<a href="${esc(p.pdf)}">PDF</a>`].filter(Boolean).join("");
    return `<li>${badge(p.abbr)}<div class="entry">
      <div class="pub-title">${esc(p.title)}</div>
      <div class="pub-meta">${esc(p.authors).replace(own, `<b class="me">${own}</b>`)}</div>
      <div class="pub-meta"><em>${esc(p.venue)}</em>${p.details ? ", " + esc(p.details) : ""}, ${esc(p.year)}</div>
      ${btns ? `<div class="pub-links">${btns}</div>` : ""}
      ${p.abstract ? `<div class="abstract" hidden>${esc(p.abstract)}</div>` : ""}</div></li>`;
  });
}

const talkEl = document.getElementById("talk-list");
if (talkEl) {
  talkEl.innerHTML = (typeof TALKS !== "undefined" && TALKS.length) ? groupByYear(TALKS, t => {
    const btns = [t.slides && `<a href="${esc(t.slides)}">Slides</a>`, t.link && `<a href="${esc(t.link)}">Link</a>`].filter(Boolean).join("");
    return `<li>${badge(t.type)}<div class="entry">
      <div class="pub-title">${esc(t.title)}</div>
      <div class="pub-meta"><em>${esc(t.event)}</em>${t.place ? ", " + esc(t.place) : ""}</div>
      <div class="pub-meta">${esc(t.date || t.year)}</div>
      ${btns ? `<div class="pub-links">${btns}</div>` : ""}</div></li>`;
  }) : `<p class="empty">Talks will appear here soon.</p>`;
}
document.addEventListener("click", e => {
  const b = e.target.closest(".abs"); if (!b) return;
  const box = b.closest(".entry").querySelector(".abstract"); box.hidden = !box.hidden;
});

// ---------- Reticolo animato (solo nella home) ----------
const cv = document.getElementById("lattice");
if (cv) {
  const ctx = cv.getContext("2d"), NX = 14, NY = 9;
  let mode = "macro", W, H;
  const resize = () => {
    const dpr = devicePixelRatio || 1;
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const node = (i, j, a) => {          // a = ampiezza istantanea tra -1 e 1
    const s = Math.min(W / (NX + 1), H / (NY + 1));
    let x = (W - (NX - 1) * s) / 2 + i * s, y = (H - (NY - 1) * s) / 2 + j * s;
    if (mode === "macro") {            // onda lunga: tutta la struttura si inflette
      y += a * s * 0.9 * Math.sin(Math.PI * i / (NX - 1));
      x += a * s * 0.25 * Math.sin(Math.PI * j / (NY - 1)) * Math.cos(Math.PI * i / (NX - 1));
    } else {                           // modo di cella: i nodi ruotano a segni alterni
      x += a * s * 0.2 * (j % 2 ? 1 : -1);
      y += a * s * 0.2 * (i % 2 ? 1 : -1);
    }
    return [x, y];
  };
  const draw = t => {
    const a = reduce ? 1 : Math.sin(t / 900);
    const css = getComputedStyle(document.documentElement);
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = css.getPropertyValue("--" + mode).trim();
    ctx.fillStyle = css.getPropertyValue("--ink").trim();
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
      const [x, y] = node(i, j, a);
      if (i < NX - 1) { const [x2, y2] = node(i + 1, j, a); ctx.moveTo(x, y); ctx.lineTo(x2, y2); }
      if (j < NY - 1) { const [x2, y2] = node(i, j + 1, a); ctx.moveTo(x, y); ctx.lineTo(x2, y2); }
    }
    ctx.stroke();
    for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
      const [x, y] = node(i, j, a);
      ctx.beginPath(); ctx.arc(x, y, 2.6, 0, 7); ctx.fill();
    }
    if (!reduce) requestAnimationFrame(draw);
  };
  redraw = () => draw(0);
  document.querySelectorAll(".mode").forEach(b => b.addEventListener("click", () => {
    mode = b.dataset.mode;
    document.querySelectorAll(".mode").forEach(x => x.setAttribute("aria-pressed", x === b));
    if (reduce) draw(0);
  }));
  addEventListener("resize", () => { resize(); if (reduce) draw(0); });
  resize(); reduce ? draw(0) : requestAnimationFrame(draw);
}

// ---------- Interruttore tema chiaro/scuro ----------
const themeBtn = document.getElementById("theme"), themeLbl = document.getElementById("theme-label");
const showThemeLabel = () => { themeLbl.textContent = document.documentElement.dataset.theme === "dark" ? "Light" : "Dark"; };
themeBtn.addEventListener("click", () => {
  const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem("tema", t); } catch (e) {}
  showThemeLabel();
  if (reduce && redraw) redraw();
});
showThemeLabel();
