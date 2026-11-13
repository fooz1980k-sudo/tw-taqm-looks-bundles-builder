import { LitElement as X, nothing as M, html as c, css as Y } from "lit";
import { property as Q, state as q } from "lit/decorators.js";
const x = () => window.salla ?? window.Salla, D = async () => {
  var t, e;
  try {
    await ((e = (t = x()) == null ? void 0 : t.onReady) == null ? void 0 : e.call(t));
  } catch {
  }
}, W = () => {
  var t, e, a, r, i;
  try {
    const s = ((e = (t = x()) == null ? void 0 : t.lang) == null ? void 0 : e.locale) ?? ((i = (r = (a = x()) == null ? void 0 : a.config) == null ? void 0 : r.get) == null ? void 0 : i.call(r, "user.language_code"));
    if (typeof s == "string" && s) return s.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, V = () => W() === "en", d = (t, e) => V() ? e : t, w = (t, e = "") => {
  if (t == null) return e;
  if (typeof t == "string") {
    const a = t.trim();
    if (a.startsWith("{") && a.endsWith("}"))
      try {
        return w(JSON.parse(a), e);
      } catch {
      }
    return a || e;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const a = t, r = a[W()] ?? a.ar ?? a.en ?? Object.values(a).find((i) => typeof i == "string" && i);
    return typeof r == "string" && r.trim() ? r : e;
  }
  return e;
}, y = (t, e = "") => {
  const a = Array.isArray(t) ? t[0] : t, r = typeof a == "object" && a ? a.value : a;
  return r == null || r === "" ? e : String(r);
}, h = (t, e = 0) => {
  const a = Number(t);
  return t === "" || t == null || !Number.isFinite(a) ? e : a;
}, b = (t, e = !1) => t == null || t === "" ? e : t === !0 || t === "true" || t === 1 || t === "1", Z = (t) => Array.isArray(t) ? t : [], v = (t) => {
  const e = typeof t == "object" && t ? t.amount : t, a = Number(e);
  return Number.isFinite(a) ? a : 0;
}, tt = (t) => {
  if (!t) return null;
  const e = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(e) && e > Date.now() ? e : null;
};
function H(t) {
  var l, g, p, m, o, u, f, R, B;
  const e = v(t == null ? void 0 : t.sale_price), a = v((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), r = e && e < a ? e : v(t == null ? void 0 : t.price) || a, i = Math.max(v(t == null ? void 0 : t.regular_price), v(t == null ? void 0 : t.price), r), s = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((S) => String((S == null ? void 0 : S.url) ?? S ?? "")).filter(Boolean), n = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((l = t == null ? void 0 : t.image) == null ? void 0 : l.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? s[0] ?? ""),
    images: s,
    price: r,
    regular: i,
    discount: i > r ? Math.round((1 - r / i) * 100) : 0,
    rating: v(((g = t == null ? void 0 : t.rating) == null ? void 0 : g.stars) ?? ((p = t == null ? void 0 : t.rating) == null ? void 0 : p.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: v((m = t == null ? void 0 : t.rating) == null ? void 0 : m.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : v(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: n == null || n === "" || !Number.isFinite(Number(n)) ? null : Number(n),
    endsAt: tt((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((o = t == null ? void 0 : t.category) == null ? void 0 : o.name) ?? ((f = (u = t == null ? void 0 : t.categories) == null ? void 0 : u[0]) == null ? void 0 : f.name) ?? ""),
    brand: String(((R = t == null ? void 0 : t.brand) == null ? void 0 : R.name) ?? ""),
    promo: String(((B = t == null ? void 0 : t.promotion) == null ? void 0 : B.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const j = (t) => (Array.isArray(t) ? t : []).map((e) => Number(typeof e == "object" && e ? e.value : e)).filter((e) => Number.isFinite(e) && e > 0), _ = /* @__PURE__ */ new Map();
async function et(t) {
  var r, i, s;
  const e = (r = x()) == null ? void 0 : r.product;
  if (!e) return null;
  const a = e.getDetails ? e.getDetails.bind(e) : (s = (i = e.api) == null ? void 0 : i.getDetails) == null ? void 0 : s.bind(e.api);
  if (!a) return null;
  try {
    const n = await a(t, ["images", "sold_quantity", "category"]), l = H((n == null ? void 0 : n.data) ?? n);
    return l.name ? l : null;
  } catch {
    return null;
  }
}
async function J(t) {
  await D();
  const e = "ids:" + t.join(",");
  return _.has(e) || _.set(e, Promise.all(t.map(et)).then((a) => a.filter((r) => !!r))), _.get(e);
}
async function O(t, e = [], a = 12) {
  await D();
  const r = `src:${t}:${e.join(",")}:${a}`;
  return _.has(r) || _.set(r, (async () => {
    var n, l, g, p;
    const i = (n = x()) == null ? void 0 : n.product, s = i != null && i.fetch ? i.fetch.bind(i) : (g = (l = i == null ? void 0 : i.api) == null ? void 0 : l.fetch) == null ? void 0 : g.bind(i.api);
    if (!s) return [];
    try {
      const m = { source: t, per_page: a };
      e.length && (m.source_value = e);
      const o = await s(m);
      return (Array.isArray(o == null ? void 0 : o.data) ? o.data : Array.isArray(o) ? o : ((p = o == null ? void 0 : o.data) == null ? void 0 : p.products) ?? []).map(H).filter((f) => f.name).slice(0, a);
    } catch {
      return [];
    }
  })()), _.get(r);
}
async function at(t, e = "best_selling", a = 12) {
  const r = j(t);
  if (r.length) return { items: (await J(r)).slice(0, a), auto: !1 };
  let i = await O(e, [], a);
  return !i.length && e !== "latest" && (i = await O("latest", [], a)), { items: i, auto: !0 };
}
const k = (t) => {
  var e, a;
  try {
    const r = (a = (e = x()) == null ? void 0 : e.money) == null ? void 0 : a.call(e, t);
    if (r) return String(r);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${d("ر.س", "SAR")}`;
};
async function U(t, e = 1, a) {
  var r, i, s;
  await D();
  try {
    return await ((s = (i = (r = x()) == null ? void 0 : r.cart) == null ? void 0 : i.addItem) == null ? void 0 : s.call(i, a ? { id: t, quantity: e, notes: a } : { id: t, quantity: e })), !0;
  } catch {
    return !1;
  }
}
async function rt(t) {
  var e, a, r;
  if (!t) return !1;
  try {
    return await ((r = (a = (e = x()) == null ? void 0 : e.cart) == null ? void 0 : a.addCoupon) == null ? void 0 : r.call(a, t)), !0;
  } catch {
    return !1;
  }
}
function K(t, e = !0) {
  var a, r, i;
  try {
    (i = e ? (a = x()) == null ? void 0 : a.success : (r = x()) == null ? void 0 : r.error) == null || i(t);
  } catch {
  }
}
const it = (t, e) => {
  var a, r, i;
  try {
    (i = (r = (a = x()) == null ? void 0 : a.event) == null ? void 0 : r.on) == null || i.call(r, t, e);
  } catch {
  }
}, N = "tw_smart_mem_v1", L = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function C() {
  try {
    return { ...L(), ...JSON.parse(localStorage.getItem(N) || "{}") };
  } catch {
    return L();
  }
}
function nt(t) {
  try {
    localStorage.setItem(N, JSON.stringify(t));
  } catch {
  }
}
function G(t) {
  const e = C();
  return t(e), nt(e), e;
}
function st() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(N), sessionStorage.setItem(N, "1");
  } catch {
  }
  return t ? G((e) => {
    e.visits += 1, e.last = Date.now();
  }) : C();
}
const z = (t, e = 1) => G((a) => {
  a.seen[t.id] = (a.seen[t.id] || 0) + e, a.prices = [...a.prices.slice(-29), t.price], t.category && (a.tags[t.category] = (a.tags[t.category] || 0) + e);
});
function ot() {
  const t = [...C().prices].sort((e, a) => e - a);
  return t.length >= 3 ? t[Math.floor(t.length / 2)] : 0;
}
function ct(t, e = C()) {
  let a = (e.seen[t.id] || 0) * 2 + (e.carted.includes(t.id) ? 4 : 0) + (t.category && e.tags[t.category] || 0);
  const r = ot();
  return r && (a += Math.max(0, 2 - Math.abs(t.price - r) / r * 2)), a;
}
const lt = (t, e = !0) => {
  if (!e) return t;
  const a = C();
  return t.map((r, i) => ({ p: r, i, s: ct(r, a) })).sort((r, i) => i.s - r.s || r.i - i.i).map((r) => r.p);
};
let P = !1;
function dt() {
  P || (P = !0, it("cart::item.added", (t) => {
    var a;
    const e = Number(((a = t == null ? void 0 : t.data) == null ? void 0 : a.product_id) ?? 0);
    e && G((r) => {
      r.carted.includes(e) || (r.carted = [...r.carted.slice(-40), e]);
    });
  }));
}
const ut = () => {
  const t = innerWidth, e = navigator.userAgent;
  return /iPad|Tablet/i.test(e) || t >= 700 && t < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e) || t < 700 ? "mobile" : "desktop";
}, gt = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var pt = Object.defineProperty, ft = (t, e, a, r) => {
  for (var i = void 0, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (i = n(e, a, i) || i);
  return i && pt(e, a, i), i;
};
const mt = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, T = /* @__PURE__ */ new Set();
function ht(t) {
  const e = mt[t];
  if (!e || T.has(e)) return e;
  T.add(e);
  const a = document.createElement("link");
  return a.rel = "stylesheet", a.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e)}:wght@400;500;700;800&display=swap`, document.head.appendChild(a), e;
}
const bt = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, xt = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], F = class F extends X {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), dt(), st();
  }
  firstUpdated() {
    if (!("IntersectionObserver" in window)) {
      this.setAttribute("in", "");
      return;
    }
    this.io = new IntersectionObserver((e) => {
      var a;
      e.some((r) => r.isIntersecting) && (this.setAttribute("in", ""), (a = this.io) == null || a.disconnect());
    }, { threshold: 0.12 }), this.io.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.io) == null || e.disconnect();
  }
  /** Hidden by the merchant's schedule or device rule? */
  hiddenNow() {
    const e = this.c, a = Date.now(), r = Date.parse(String(e.s_from || "")), i = Date.parse(String(e.s_to || ""));
    if (Number.isFinite(r) && a < r || Number.isFinite(i) && a > i) return !0;
    const s = ut();
    return !!(b(e.s_hide_mobile) && s === "mobile" || b(e.s_hide_desktop) && s !== "mobile");
  }
  vars(e = "") {
    const a = this.c, r = [], i = (n, l) => {
      l !== "" && l != null && r.push(`${n}:${l}`);
    };
    i("--a", a.s_accent || ""), i("--a2", a.s_accent2 || ""), i("--bgc", a.s_bg || ""), i("--fgc", a.s_text || ""), i("--cardc", a.s_card || ""), i("--r", `${h(a.s_radius, 22)}px`), i("--gap", `${h(a.s_gap, 18)}px`), i("--ts", `${h(a.s_title_size, 38)}px`), i("--fs", `${h(a.s_text_size, 16)}px`), i("--pt", `${h(a.s_pad_top, 56)}px`), i("--pb", `${h(a.s_pad_bottom, 56)}px`), i("--maxw", bt[y(a.s_width, "normal")] ?? "1240px"), i("--sh", xt[Math.max(0, Math.min(5, h(a.s_shadow, 2)))]), i("--ms", `${h(a.s_anim_ms, 700)}ms`), i("--ov", String(h(a.s_overlay, 45) / 100)), a.s_bg_image && i("--bgimg", `url("${String(a.s_bg_image)}")`);
    const s = ht(y(a.s_font, "inherit"));
    return s && i("font-family", `'${s}', inherit`), r.join(";") + (e ? ";" + e : "");
  }
  cls() {
    const e = this.c;
    return [
      "sec",
      `th-${y(e.s_theme, "auto")}`,
      `al-${y(e.s_align, "start")}`,
      `an-${y(e.s_anim, "rise")}`,
      `pt-${y(e.s_pattern, "none")}`,
      `bs-${y(e.s_btn_style, "pill")}`,
      b(e.s_border) ? "bordered" : "",
      b(e.s_stagger, !0) ? "stagger" : "",
      e.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(e, a = {}, r = "", i = "", s = !0) {
    if (this.hiddenNow()) return M;
    const n = this.c, l = w(n.eyebrow, a.eyebrow ?? ""), g = w(n.title, a.title ?? ""), p = w(n.subtitle, a.sub ?? ""), m = s && b(n.s_show_head, !0) && (l || g || p);
    return c`<section class="${this.cls()} ${r}" style=${this.vars(i)} id=${String(n.s_anchor || "") || M}>
      <div class="wrap">${m ? c`<header class="head">${l ? c`<span class="eyebrow">${l}</span>` : ""}${g ? c`<h2 class="title">${g}</h2>` : ""}${p ? c`<p class="sub">${p}</p>` : ""}</header>` : ""}
      ${e}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(e) {
    const a = e.filter(Boolean);
    return !a.length || !gt() || !b(this.c.s_hints, !0) ? "" : c`<aside class="hints" role="note"><b>💡 ${d("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${a.map((r) => c`<li>${r}</li>`)}</ul></aside>`;
  }
  card(e, a = {}) {
    var r;
    return c`<article class="pc ${e.available ? "" : "oos"}">
      <a class="ph" href=${e.url} @click=${() => z(e)}><img src=${e.image} alt=${e.name} loading="lazy" />${(r = a.badges) != null && r.length ? c`<span class="badges">${a.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e.url} @click=${() => z(e)}>${e.name}</a>
        <div class="pr"><b>${k(e.price)}</b>${e.regular > e.price ? c`<s>${k(e.regular)}</s>` : ""}</div>
        ${a.rating !== !1 && e.rating > 0 ? c`<div class="rt">★ ${e.rating.toFixed(1)}${e.ratingCount ? c` <small>(${e.ratingCount})</small>` : ""}</div>` : ""}
        ${a.extra ?? ""}
        ${a.quick !== !1 ? c`<button class="btn sm" ?disabled=${!e.available} @click=${() => this.add(e)}>${e.available ? d("أضف للسلة", "Add to cart") : d("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(e, a = 1, r) {
    z(e, 3), await U(e.id, a, r) ? K(d("تمت الإضافة للسلة", "Added to cart")) : location.href = e.url;
  }
};
F.base = Y`
  :host { display: block; font-family: inherit; direction: inherit;
    --A: var(--a, var(--color-primary, #b88a44)); --A2: var(--a2, color-mix(in srgb, var(--A) 55%, #000)); --BG: var(--bgc, transparent); --FG: var(--fgc, inherit); --CARD: var(--cardc, #fff); --LINE: color-mix(in srgb, currentColor 14%, transparent); }
  :host([hidden]) { display: none; }
  *, *::before, *::after { box-sizing: border-box; }
  .sec { position: relative; background: var(--BG); color: var(--FG); font-size: var(--fs, 16px); overflow: hidden; isolation: isolate; }
  .sec.has-img::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--bgimg) center/cover no-repeat; }
  .sec.has-img::after { content: ''; position: absolute; inset: 0; z-index: -1; background: #000; opacity: var(--ov, .45); }
  .th-light { --BG: var(--bgc, #fff); --FG: var(--fgc, #17140f); --CARD: var(--cardc, #faf8f4); }
  .th-ivory { --BG: var(--bgc, #f7f2e9); --FG: var(--fgc, #1d160c); --CARD: var(--cardc, #fffdf8); }
  .th-dark { --BG: var(--bgc, #111014); --FG: var(--fgc, #f4efe6); --CARD: var(--cardc, #1c1b22); }
  .th-midnight { --BG: var(--bgc, radial-gradient(900px 500px at 85% -10%, #2c1d55 0, transparent 60%), #0f0c18); --FG: var(--fgc, #f6f1e7); --CARD: var(--cardc, #19142d); }
  .th-glass { --BG: var(--bgc, linear-gradient(135deg, color-mix(in srgb, var(--A) 14%, #fff), #fff 60%)); --FG: var(--fgc, #15130f); --CARD: var(--cardc, rgba(255,255,255,.6)); }
  .th-glass .pc, .th-glass .panel { backdrop-filter: blur(14px); }
  .th-accent { --BG: var(--bgc, linear-gradient(135deg, var(--A), var(--A2))); --FG: var(--fgc, #fff); --CARD: var(--cardc, rgba(255,255,255,.12)); }
  .th-dark, .th-midnight, .th-accent { --LINE: rgba(255,255,255,.14); }
  .pt-dots { background-image: radial-gradient(color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1.4px), var(--BG); background-size: 18px 18px, auto; }
  .pt-grid { background-image: linear-gradient(var(--LINE) 1px, transparent 1px), linear-gradient(90deg, var(--LINE) 1px, transparent 1px), var(--BG); background-size: 36px 36px, 36px 36px, auto; }
  .pt-arabesque { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z' fill='none' stroke='%23999' stroke-opacity='.18'/%3E%3C/svg%3E"), var(--BG); }
  .pt-waves { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20'%3E%3Cpath d='M0 10q20-10 40 0t40 0' fill='none' stroke='%23999' stroke-opacity='.2'/%3E%3C/svg%3E"), var(--BG); }
  .wrap { max-width: var(--maxw, 1240px); margin: 0 auto; padding: var(--pt, 56px) clamp(16px, 4vw, 32px) var(--pb, 56px); }
  .head { margin-bottom: calc(var(--gap, 18px) * 1.4); }
  .al-center .head { text-align: center; } .al-center .head .sub { margin-inline: auto; } .al-end .head { text-align: end; }
  .eyebrow { display: inline-block; letter-spacing: .2em; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--A); margin-bottom: 10px; }
  .th-accent .eyebrow { color: inherit; opacity: .85; }
  h2.title { margin: 0 0 8px; font-size: clamp(22px, calc(var(--ts, 38px) * .62 + 1.2vw), var(--ts, 38px)); line-height: 1.25; font-weight: 800; }
  .sub { margin: 0; opacity: .72; line-height: 1.8; max-width: 720px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; text-decoration: none; font: inherit; font-weight: 700;
    padding: 13px 24px; border-radius: 999px; background: var(--A); color: #fff; transition: transform .25s, box-shadow .25s, opacity .2s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px var(--A); } .btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn.ghost { background: transparent; color: inherit; border: 1.5px solid currentColor; } .btn.sm { padding: 9px 16px; font-size: 14px; }
  .th-accent .btn:not(.ghost) { background: #fff; color: var(--A2); }
  .bs-rounded .btn { border-radius: 12px; } .bs-square .btn { border-radius: 0; } .bs-outline .btn:not(.ghost) { background: transparent; color: var(--A); border: 1.5px solid var(--A); }
  .bs-underline .btn { background: none; color: var(--A); padding-inline: 0; border-radius: 0; border-bottom: 2px solid var(--A); }
  .bordered .pc, .bordered .panel { border: 1px solid var(--LINE); }
  .panel { background: var(--CARD); border-radius: var(--r, 22px); box-shadow: var(--sh); padding: clamp(16px, 2.4vw, 28px); }
  .grid { display: grid; gap: var(--gap, 18px); grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); }
  @media (max-width: 860px) { .grid { grid-template-columns: repeat(var(--mcols, 2), minmax(0, 1fr)); } }
  .rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(220px, calc((100% - var(--gap) * (var(--cols, 4) - 1)) / var(--cols, 4))); gap: var(--gap, 18px); overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; }
  @media (max-width: 860px) { .rail { grid-auto-columns: calc((100% - var(--gap)) / var(--mcols, 2) - 8px); } }
  .rail > * { scroll-snap-align: start; }
  .pc { position: relative; display: flex; flex-direction: column; background: var(--CARD); border-radius: var(--r, 22px); overflow: hidden; box-shadow: var(--sh); transition: transform .35s; color: inherit; }
  .pc:hover { transform: translateY(-4px); } .pc.oos { opacity: .55; }
  .ph { position: relative; display: block; aspect-ratio: var(--ratio, 1); background: color-mix(in srgb, currentColor 6%, transparent); }
  .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .badges { position: absolute; inset: 10px 10px auto 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .bdg { font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 999px; background: var(--A); color: #fff; line-height: 1.4; }
  .bdg.alt { background: #111; } .bdg.ok { background: #15803d; } .bdg.warn { background: #b45309; } .bdg.soft { background: #fff; color: #111; }
  .pb { padding: 12px 14px 14px; display: grid; gap: 6px; flex: 1; align-content: start; }
  .pn { color: inherit; text-decoration: none; font-weight: 700; line-height: 1.5; font-size: .95em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pr { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; } .pr b { color: var(--A); } .th-accent .pr b { color: inherit; } .pr s { opacity: .5; font-size: .85em; }
  .rt { font-size: 13px; color: #d4a017; } .rt small { opacity: .7; color: inherit; }
  .pb .btn { margin-top: auto; width: 100%; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--LINE); background: var(--CARD); color: inherit; font: inherit; font-size: 14px; cursor: pointer; transition: all .25s; }
  .chip:hover { border-color: var(--A); } .chip.on { background: var(--A); border-color: var(--A); color: #fff; }
  .muted { opacity: .65; } .center { text-align: center; }
  .skel { background: linear-gradient(90deg, #8881 0, #8882 50%, #8881 100%); background-size: 200% 100%; animation: sk 1.4s infinite; border-radius: var(--r, 22px); min-height: 220px; }
  @keyframes sk { to { background-position: -200% 0; } }
  .hints { margin: 0 0 18px; padding: 14px 18px; border-radius: 14px; background: #fff8e1; color: #5b4300; border: 1px dashed #e0b84a; font-size: 13px; line-height: 1.8; }
  .hints ul { margin: 6px 0 0; padding-inline-start: 18px; }
  /* reveal motion */
  .sec .wrap > * { transition: opacity var(--ms, .7s) ease, transform var(--ms, .7s) cubic-bezier(.2,.7,.2,1), filter var(--ms, .7s); }
  :host(:not([in])) .an-fade .wrap > * { opacity: 0; }
  :host(:not([in])) .an-rise .wrap > * { opacity: 0; transform: translateY(28px); }
  :host(:not([in])) .an-zoom .wrap > * { opacity: 0; transform: scale(.94); }
  :host(:not([in])) .an-blur .wrap > * { opacity: 0; filter: blur(12px); }
  :host(:not([in])) .an-slide .wrap > * { opacity: 0; transform: translateX(40px); }
  .stagger .wrap > *:nth-child(2) { transition-delay: .08s; } .stagger .wrap > *:nth-child(3) { transition-delay: .16s; } .stagger .wrap > *:nth-child(4) { transition-delay: .24s; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } :host .sec .wrap > * { opacity: 1 !important; transform: none !important; filter: none !important; } }
  `;
let A = F;
ft([
  Q({ type: Object })
], A.prototype, "config");
const vt = (t, e) => e.filter((a) => t >= a.min).sort((a, r) => r.pct - a.pct)[0] ?? null, yt = (t, e) => e.filter((a) => t < a.min).sort((a, r) => a.min - r.min)[0] ?? null, wt = (t) => (Array.isArray(t) ? t : []).map((e) => ({ min: h(e.min, 0), pct: h(e.pct, 0) })).filter((e) => e.min > 0 && e.pct > 0);
async function $t(t, e = "") {
  let a = 0;
  for (const { p: r, q: i } of t) r.available && await U(r.id, i ?? 1) && a++;
  return e && await rt(e), K(a ? d(`أضفنا ${a} منتج للسلة${e ? " وطبّقنا الكود" : ""}`, `Added ${a} items${e ? " and applied the code" : ""}`) : d("تعذّرت الإضافة", "Could not add"), !!a), a;
}
var kt = Object.defineProperty, E = (t, e, a, r) => {
  for (var i = void 0, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (i = n(e, a, i) || i);
  return i && kt(e, a, i), i;
};
const I = class I extends A {
  constructor() {
    super(...arguments), this.slots = [], this.pick = [], this.auto = !1, this.seq = 0;
  }
  willUpdate(e) {
    e.has("config") && this.load();
  }
  async load() {
    const e = ++this.seq, a = this.c;
    let r = [], i = !1;
    const s = Z(a.slots).filter((n) => j(n.products).length);
    if (s.length) r = await Promise.all(s.map(async (n) => ({ name: w(n.name), emoji: w(n.emoji, "✨"), req: b(n.required, !0), items: lt(await J(j(n.products)), b(a.personalize, !0)) })));
    else {
      i = !0;
      const n = (await at(a.products, y(a.auto_source, "best_selling"), 30)).items;
      r = [...new Set(n.map((g) => g.category).filter(Boolean))].slice(0, h(a.auto_slots, 3)).map((g) => ({ name: g, emoji: "✨", req: !1, items: n.filter((p) => p.category === g) }));
    }
    e === this.seq && (this.slots = r, this.auto = i, this.pick = r.map((n) => {
      var l;
      return b(a.preselect, !0) ? ((l = n.items.find((g) => g.available)) == null ? void 0 : l.id) ?? null : null;
    }));
  }
  render() {
    const e = this.c, a = wt(e.tiers), r = this.slots.map((o, u) => o.items.find((f) => f.id === this.pick[u])).filter((o) => !!o), i = r.reduce((o, u) => o + u.price, 0), s = vt(r.length, a), n = yt(r.length, a), l = s ? Math.round(i * s.pct) / 100 : 0, g = this.slots.some((o, u) => o.req && !this.pick[u]), p = String(e.coupon || ""), m = [[4, 6, "-8deg"], [50, 2, "6deg"], [26, 40, "-2deg"], [2, 52, "10deg"], [52, 50, "-6deg"]];
    return this.shell(
      c`${this.hints([
        this.auto && d("لم تضف خانات؛ الخانات الآن أقسام متجرك تلقائياً. أضف خانات (عطر، بخور، تغليف...) واربطها بمنتجات.", "No slots yet: using your categories automatically."),
        a.length > 0 && !p && d("أنشئ كوبون أو عرض في سلة بنفس نسبة الخصم وضع الكود هنا ليتطبق تلقائياً.", "Create a matching coupon in Salla and add it here to apply it automatically.")
      ])}
      ${this.slots.length ? c`<div class="g"><div>${this.slots.map((o, u) => c`<div class="slot">
        <div class="sh"><span class="k">${u + 1}</span>${o.emoji} ${o.name} <small>${o.req ? d("مطلوب", "required") : d("اختياري", "optional")}</small>${this.pick[u] ? c`<span class="ok">✓</span>` : ""}</div>
        <div class="opts">${o.items.map((f) => c`<button class="o ${this.pick[u] === f.id ? "on" : ""}" aria-disabled=${!f.available} @click=${() => {
        f.available && (z(f), this.pick = Object.assign([...this.pick], { [u]: this.pick[u] === f.id && !o.req ? null : f.id }));
      }}>
          <img src=${f.image} alt="" loading="lazy" /><div>${f.name}<b>${k(f.price)}</b></div></button>`)}</div></div>`)}</div>
      <div class="panel sum"><b>${w(e.summary_title, d("طقمك", "Your set"))}</b>
        ${b(e.board, !0) ? c`<div class="board">${r.length ? r.slice(0, 5).map((o, u) => c`<img src=${o.image} alt=${o.name} style=${`left:${m[u][0]}%;top:${m[u][1]}%;--r0:${m[u][2]};transform:rotate(${m[u][2]})`} />`) : c`<div class="ph">${d("اختر قطعك وشوفها تتجمع هنا", "Pick your pieces and watch them come together")}</div>`}</div>` : ""}
        ${r.map((o) => c`<div class="ln"><span>${o.name}</span><span>${k(o.price)}</span></div>`)}
        ${l ? c`<div class="ln"><span>${d("خصم الطقم", "Set discount")} ${s.pct}%</span><span class="d">- ${k(l)}</span></div>` : ""}
        <div class="ln t"><span>${d("الإجمالي", "Total")}</span><span>${k(i - l)}</span></div>
        ${n && b(e.nudge, !0) ? c`<div class="tip">💡 ${d(`أضف ${n.min - r.length} قطعة وخذ خصم ${n.pct}%`, `Add ${n.min - r.length} more for ${n.pct}% off`)}</div>` : ""}
        <button class="btn w" ?disabled=${!r.length || g} @click=${() => $t(r.map((o) => ({ p: o })), p)}>${g ? d("كمّل الخانات المطلوبة", "Complete required slots") : w(e.button, d("أضف الطقم للسلة", "Add the set to cart"))}</button>
        ${p && l ? c`<div class="code">${d("الخصم يُطبّق بالكود", "Applied with code")} <b>${p}</b></div>` : ""}</div></div>` : c`<div class="skel"></div>`}`,
      { eyebrow: d("ركّب طقمك", "Build your set"), title: d("اختر قطعة من كل خانة… والباقي علينا", "One piece per slot, we do the rest") }
    );
  }
};
I.styles = [A.base, Y`
    .g { display: grid; grid-template-columns: 1fr 360px; gap: calc(var(--gap) * 1.4); align-items: start; } @media (max-width: 960px) { .g { grid-template-columns: 1fr; } .sum { position: static !important; } }
    .slot { margin-bottom: 20px; } .sh { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-weight: 800; } .sh .k { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; background: var(--A); color: #fff; font-size: 14px; }
    .sh small { font-weight: 500; opacity: .6; } .sh .ok { color: #16a34a; }
    .opts { display: grid; grid-auto-flow: column; grid-auto-columns: 150px; gap: 10px; overflow-x: auto; padding-bottom: 6px; scroll-snap-type: x mandatory; }
    .o { all: unset; cursor: pointer; scroll-snap-align: start; border-radius: 16px; overflow: hidden; background: var(--CARD); border: 2px solid transparent; box-shadow: var(--sh); transition: all .25s; position: relative; }
    .o.on { border-color: var(--A); transform: translateY(-3px); } .o[aria-disabled=true] { opacity: .4; cursor: not-allowed; }
    .o img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; } .o div { padding: 8px 10px; font-size: 13px; } .o b { color: var(--A); display: block; }
    .o.on::after { content: '✓'; position: absolute; top: 8px; inset-inline-end: 8px; width: 26px; height: 26px; border-radius: 50%; background: var(--A); color: #fff; display: grid; place-items: center; font-weight: 800; }
    .sum { position: sticky; top: 90px; }
    .board { position: relative; height: 230px; margin: 4px 0 18px; border-radius: 18px; background: radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--A) 18%, transparent), transparent 70%); }
    .board img { position: absolute; width: 46%; aspect-ratio: 1; object-fit: cover; border-radius: 18px; box-shadow: 0 18px 40px -18px #0009; border: 4px solid var(--CARD); animation: drop .5s cubic-bezier(.2,.9,.3,1.3); }
    @keyframes drop { from { transform: translateY(-30px) scale(.7) rotate(var(--r0)); opacity: 0; } }
    .board .ph { position: absolute; inset: 0; display: grid; place-items: center; opacity: .5; text-align: center; padding: 20px; }
    .ln { display: flex; justify-content: space-between; padding: 7px 0; font-size: 14px; border-bottom: 1px dashed var(--LINE); } .ln.t { font-size: 18px; font-weight: 800; border: 0; } .ln .d { color: #16a34a; }
    .tip { font-size: 13px; padding: 10px 12px; border-radius: 12px; background: color-mix(in srgb, var(--A) 10%, transparent); margin: 12px 0; } .btn.w { width: 100%; }
    .code { font-size: 12px; opacity: .7; margin-top: 8px; text-align: center; }
  `];
let $ = I;
E([
  q()
], $.prototype, "slots");
E([
  q()
], $.prototype, "pick");
E([
  q()
], $.prototype, "auto");
typeof $ < "u" && $.registerSallaComponent("salla-taqm-builder");
export {
  $ as default
};
