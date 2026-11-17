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

// ---------- Deformate critiche di un reticolo di travi (solo nella home) ----------
// Modi di Bloch-Floquet di un reticolo quadrato di travi flessibili (Eulero-Bernoulli, nodi rigidi),
// compressione biassiale uguale, calcolati con elementi di trave. Ogni trave e' descritta da 9 punti
// (spostamenti x e y, parte reale e immaginaria, in unita' di cella). Il modo nella cella (i,j)
// e' la parte reale di  ampiezza * exp(i (kx*i + ky*j)).
//  macro: onda lunga (kx~0, ky=0.8, circa 8 celle): tutto il reticolo si inflette come un'unica struttura
//  micro: onda corta  (kx=ky=pi, 2 celle): ogni trave si inflette in una semionda, a scala della cella
const MODES = {"macro":{"kx":0.002,"ky":0.8,"h":[[1.0,-0.0,-0.0,-0.0],[1.0,0.0002,-0.0,-0.0325],[1.0,0.0005,-0.0,-0.038],[1.0,0.0007,-0.0001,-0.0241],[1.0,0.001,-0.0001,-0.0],[1.0,0.0012,-0.0001,0.0241],[1.0,0.0015,-0.0001,0.038],[1.0,0.0017,-0.0001,0.0325],[1.0,0.002,-0.0,-0.0]],"v":[[1.0,-0.0,-0.0,-0.0],[0.9921,0.0631,-0.0,-0.0],[0.9692,0.1524,-0.0,-0.0],[0.9333,0.2597,-0.0,-0.0],[0.8877,0.3753,-0.0,-0.0],[0.8365,0.4885,-0.0,-0.0],[0.7846,0.5891,-0.0,-0.0],[0.7365,0.6677,-0.0,-0.0],[0.6967,0.7174,-0.0,-0.0]]},"micro":{"kx":3.1416,"ky":3.1416,"h":[[-0.0,-0.0,0.0,-0.0],[-0.0,-0.0,0.3827,0.0024],[-0.0,-0.0,0.7071,0.0044],[-0.0,-0.0,0.9239,0.0058],[0.0,-0.0,1.0,0.0062],[0.0,0.0,0.9239,0.0058],[0.0,0.0,0.7071,0.0044],[0.0,0.0,0.3827,0.0024],[0.0,0.0,-0.0,0.0]],"v":[[-0.0,-0.0,0.0,-0.0],[-0.3827,-0.0024,0.0,0.0],[-0.7071,-0.0044,0.0,0.0],[-0.9239,-0.0058,0.0,0.0],[-1.0,-0.0062,0.0,0.0],[-0.9239,-0.0058,-0.0,-0.0],[-0.7071,-0.0044,-0.0,-0.0],[-0.3827,-0.0024,-0.0,-0.0],[0.0,0.0,-0.0,0.0]]}};
const AMP = { macro: 0.42, micro: 0.30 };   // ampiezza massima, in frazione della cella
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
  const draw = t => {
    const M = MODES[mode], a = (reduce ? 1 : Math.sin(t / 1100)) * AMP[mode];
    const s = Math.min(W / (NX + 1), H / (NY + 1));
    const x0 = (W - (NX - 1) * s) / 2, y0 = (H - (NY - 1) * s) / 2;
    const px = X => x0 + X * s, py = Y => y0 + (NY - 1 - Y) * s;     // y verso l'alto
    const css = getComputedStyle(document.documentElement);
    ctx.clearRect(0, 0, W, H);
    ctx.lineJoin = "round";
    ctx.strokeStyle = css.getPropertyValue("--line").trim(); ctx.lineWidth = 1;     // reticolo indeformato
    ctx.beginPath();
    for (let j = 0; j < NY; j++) { ctx.moveTo(px(0), py(j)); ctx.lineTo(px(NX - 1), py(j)); }
    for (let i = 0; i < NX; i++) { ctx.moveTo(px(i), py(0)); ctx.lineTo(px(i), py(NY - 1)); }
    ctx.stroke();
    ctx.strokeStyle = css.getPropertyValue("--" + mode).trim(); ctx.lineWidth = 2;  // travi deformate
    ctx.beginPath();
    const beam = (i, j, S, horizontal) => {
      const c = Math.cos(M.kx * i + M.ky * j), n = Math.sin(M.kx * i + M.ky * j);
      S.forEach((p, m) => {
        const X = i + (horizontal ? m / 8 : 0) + a * (p[0] * c - p[1] * n);
        const Y = j + (horizontal ? 0 : m / 8) + a * (p[2] * c - p[3] * n);
        m ? ctx.lineTo(px(X), py(Y)) : ctx.moveTo(px(X), py(Y));
      });
    };
    for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
      if (i < NX - 1) beam(i, j, M.h, true);
      if (j < NY - 1) beam(i, j, M.v, false);
    }
    ctx.stroke();
    ctx.fillStyle = css.getPropertyValue("--ink").trim();                            // nodi rigidi
    for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
      const c = Math.cos(M.kx * i + M.ky * j), n = Math.sin(M.kx * i + M.ky * j), p = M.h[0];
      ctx.beginPath(); ctx.arc(px(i + a * (p[0] * c - p[1] * n)), py(j + a * (p[2] * c - p[3] * n)), 2.6, 0, 7); ctx.fill();
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
