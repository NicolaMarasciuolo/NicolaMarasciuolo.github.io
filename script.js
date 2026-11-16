// ---------- Novità e pubblicazioni (letti da dati.js) ----------
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
document.getElementById("news-list").innerHTML = NEWS.map(n =>
  `<li><time>${esc(n.date)}</time><span>${esc(n.text)}</span></li>`).join("");
document.getElementById("pub-list").innerHTML = PUBLICATIONS.map(p => {
  const links = [p.doi && `<a href="${esc(p.doi)}">DOI</a>`, p.pdf && `<a href="${esc(p.pdf)}">PDF</a>`].filter(Boolean).join("");
  return `<li><div class="pub-title">${esc(p.title)}</div>
    <div class="pub-meta">${esc(p.authors)}</div>
    <div class="pub-meta"><em>${esc(p.venue)}</em>, ${esc(p.year)}</div>
    ${links ? `<div class="pub-links">${links}</div>` : ""}
    ${p.abstract ? `<details><summary>Abstract</summary><p>${esc(p.abstract)}</p></details>` : ""}</li>`;
}).join("");
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Reticolo animato nell'intestazione ----------
const cv = document.getElementById("lattice"), ctx = cv.getContext("2d");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const NX = 14, NY = 9;
let mode = "macro", W, H;

function resize() {
  const dpr = devicePixelRatio || 1;
  W = cv.clientWidth; H = cv.clientHeight;
  cv.width = W * dpr; cv.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function node(i, j, a) {            // a = ampiezza istantanea tra -1 e 1
  const s = Math.min(W / (NX + 1), H / (NY + 1));
  let x = (W - (NX - 1) * s) / 2 + i * s, y = (H - (NY - 1) * s) / 2 + j * s;
  if (mode === "macro") {           // onda lunga: tutta la struttura si inflette
    y += a * s * 0.9 * Math.sin(Math.PI * i / (NX - 1));
    x += a * s * 0.25 * Math.sin(Math.PI * j / (NY - 1)) * Math.cos(Math.PI * i / (NX - 1));
  } else {                          // modo di cella: i nodi ruotano a segni alterni
    x += a * s * 0.2 * (j % 2 ? 1 : -1);
    y += a * s * 0.2 * (i % 2 ? 1 : -1);
  }
  return [x, y];
}
function draw(t) {
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
}
document.querySelectorAll(".mode").forEach(b => b.addEventListener("click", () => {
  mode = b.dataset.mode;
  document.querySelectorAll(".mode").forEach(x => x.setAttribute("aria-pressed", x === b));
  if (reduce) draw(0);
}));
addEventListener("resize", () => { resize(); if (reduce) draw(0); });
resize(); reduce ? draw(0) : requestAnimationFrame(draw);
