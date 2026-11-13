import { LitElement as X, nothing as B, html as l, css as T } from "lit";
import { property as Q, state as S } from "lit/decorators.js";
const f = () => window.salla ?? window.Salla, G = async () => {
  var t, e;
  try {
    await ((e = (t = f()) == null ? void 0 : t.onReady) == null ? void 0 : e.call(t));
  } catch {
  }
}, Y = () => {
  var t, e, r, a, i;
  try {
    const o = ((e = (t = f()) == null ? void 0 : t.lang) == null ? void 0 : e.locale) ?? ((i = (a = (r = f()) == null ? void 0 : r.config) == null ? void 0 : a.get) == null ? void 0 : i.call(a, "user.language_code"));
    if (typeof o == "string" && o) return o.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, V = () => Y() === "en", d = (t, e) => V() ? e : t, p = (t, e = "") => {
  if (t == null) return e;
  if (typeof t == "string") {
    const r = t.trim();
    if (r.startsWith("{") && r.endsWith("}"))
      try {
        return p(JSON.parse(r), e);
      } catch {
      }
    return r || e;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const r = t, a = r[Y()] ?? r.ar ?? r.en ?? Object.values(r).find((i) => typeof i == "string" && i);
    return typeof a == "string" && a.trim() ? a : e;
  }
  return e;
}, m = (t, e = "") => {
  const r = Array.isArray(t) ? t[0] : t, a = typeof r == "object" && r ? r.value : r;
  return a == null || a === "" ? e : String(a);
}, h = (t, e = 0) => {
  const r = Number(t);
  return t === "" || t == null || !Number.isFinite(r) ? e : r;
}, y = (t, e = !1) => t == null || t === "" ? e : t === !0 || t === "true" || t === 1 || t === "1", Z = (t) => Array.isArray(t) ? t : [], b = (t) => {
  const e = typeof t == "object" && t ? t.amount : t, r = Number(e);
  return Number.isFinite(r) ? r : 0;
}, tt = (t) => {
  if (!t) return null;
  const e = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(e) && e > Date.now() ? e : null;
};
function W(t) {
  var n, c, u, v, g, N, k, I, R;
  const e = b(t == null ? void 0 : t.sale_price), r = b((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), a = e && e < r ? e : b(t == null ? void 0 : t.price) || r, i = Math.max(b(t == null ? void 0 : t.regular_price), b(t == null ? void 0 : t.price), a), o = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((A) => String((A == null ? void 0 : A.url) ?? A ?? "")).filter(Boolean), s = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((n = t == null ? void 0 : t.image) == null ? void 0 : n.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? o[0] ?? ""),
    images: o,
    price: a,
    regular: i,
    discount: i > a ? Math.round((1 - a / i) * 100) : 0,
    rating: b(((c = t == null ? void 0 : t.rating) == null ? void 0 : c.stars) ?? ((u = t == null ? void 0 : t.rating) == null ? void 0 : u.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: b((v = t == null ? void 0 : t.rating) == null ? void 0 : v.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : b(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: s == null || s === "" || !Number.isFinite(Number(s)) ? null : Number(s),
    endsAt: tt((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((g = t == null ? void 0 : t.category) == null ? void 0 : g.name) ?? ((k = (N = t == null ? void 0 : t.categories) == null ? void 0 : N[0]) == null ? void 0 : k.name) ?? ""),
    brand: String(((I = t == null ? void 0 : t.brand) == null ? void 0 : I.name) ?? ""),
    promo: String(((R = t == null ? void 0 : t.promotion) == null ? void 0 : R.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const j = (t) => (Array.isArray(t) ? t : []).map((e) => Number(typeof e == "object" && e ? e.value : e)).filter((e) => Number.isFinite(e) && e > 0), $ = /* @__PURE__ */ new Map();
async function et(t) {
  var a, i, o;
  const e = (a = f()) == null ? void 0 : a.product;
  if (!e) return null;
  const r = e.getDetails ? e.getDetails.bind(e) : (o = (i = e.api) == null ? void 0 : i.getDetails) == null ? void 0 : o.bind(e.api);
  if (!r) return null;
  try {
    const s = await r(t, ["images", "sold_quantity", "category"]), n = W((s == null ? void 0 : s.data) ?? s);
    return n.name ? n : null;
  } catch {
    return null;
  }
}
async function H(t) {
  await G();
  const e = "ids:" + t.join(",");
  return $.has(e) || $.set(e, Promise.all(t.map(et)).then((r) => r.filter((a) => !!a))), $.get(e);
}
async function q(t, e = [], r = 12) {
  await G();
  const a = `src:${t}:${e.join(",")}:${r}`;
  return $.has(a) || $.set(a, (async () => {
    var s, n, c, u;
    const i = (s = f()) == null ? void 0 : s.product, o = i != null && i.fetch ? i.fetch.bind(i) : (c = (n = i == null ? void 0 : i.api) == null ? void 0 : n.fetch) == null ? void 0 : c.bind(i.api);
    if (!o) return [];
    try {
      const v = { source: t, per_page: r };
      e.length && (v.source_value = e);
      const g = await o(v);
      return (Array.isArray(g == null ? void 0 : g.data) ? g.data : Array.isArray(g) ? g : ((u = g == null ? void 0 : g.data) == null ? void 0 : u.products) ?? []).map(W).filter((k) => k.name).slice(0, r);
    } catch {
      return [];
    }
  })()), $.get(a);
}
async function rt(t, e = "best_selling", r = 12) {
  const a = j(t);
  if (a.length) return { items: (await H(a)).slice(0, r), auto: !1 };
  let i = await q(e, [], r);
  return !i.length && e !== "latest" && (i = await q("latest", [], r)), { items: i, auto: !0 };
}
const w = (t) => {
  var e, r;
  try {
    const a = (r = (e = f()) == null ? void 0 : e.money) == null ? void 0 : r.call(e, t);
    if (a) return String(a);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${d("ر.س", "SAR")}`;
};
async function J(t, e = 1, r) {
  var a, i, o;
  await G();
  try {
    return await ((o = (i = (a = f()) == null ? void 0 : a.cart) == null ? void 0 : i.addItem) == null ? void 0 : o.call(i, r ? { id: t, quantity: e, notes: r } : { id: t, quantity: e })), !0;
  } catch {
    return !1;
  }
}
async function at(t) {
  var e, r, a;
  if (!t) return !1;
  try {
    return await ((a = (r = (e = f()) == null ? void 0 : e.cart) == null ? void 0 : r.addCoupon) == null ? void 0 : a.call(r, t)), !0;
  } catch {
    return !1;
  }
}
function U(t, e = !0) {
  var r, a, i;
  try {
    (i = e ? (r = f()) == null ? void 0 : r.success : (a = f()) == null ? void 0 : a.error) == null || i(t);
  } catch {
  }
}
const it = (t, e) => {
  var r, a, i;
  try {
    (i = (a = (r = f()) == null ? void 0 : r.event) == null ? void 0 : a.on) == null || i.call(a, t, e);
  } catch {
  }
}, C = "tw_smart_mem_v1", L = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function K() {
  try {
    return { ...L(), ...JSON.parse(localStorage.getItem(C) || "{}") };
  } catch {
    return L();
  }
}
function nt(t) {
  try {
    localStorage.setItem(C, JSON.stringify(t));
  } catch {
  }
}
function F(t) {
  const e = K();
  return t(e), nt(e), e;
}
function st() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(C), sessionStorage.setItem(C, "1");
  } catch {
  }
  return t ? F((e) => {
    e.visits += 1, e.last = Date.now();
  }) : K();
}
const D = (t, e = 1) => F((r) => {
  r.seen[t.id] = (r.seen[t.id] || 0) + e, r.prices = [...r.prices.slice(-29), t.price], t.category && (r.tags[t.category] = (r.tags[t.category] || 0) + e);
});
let O = !1;
function ot() {
  O || (O = !0, it("cart::item.added", (t) => {
    var r;
    const e = Number(((r = t == null ? void 0 : t.data) == null ? void 0 : r.product_id) ?? 0);
    e && F((a) => {
      a.carted.includes(e) || (a.carted = [...a.carted.slice(-40), e]);
    });
  }));
}
const ct = () => {
  const t = innerWidth, e = navigator.userAgent;
  return /iPad|Tablet/i.test(e) || t >= 700 && t < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e) || t < 700 ? "mobile" : "desktop";
}, lt = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var dt = Object.defineProperty, ut = (t, e, r, a) => {
  for (var i = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = s(e, r, i) || i);
  return i && dt(e, r, i), i;
};
const gt = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, P = /* @__PURE__ */ new Set();
function ht(t) {
  const e = gt[t];
  if (!e || P.has(e)) return e;
  P.add(e);
  const r = document.createElement("link");
  return r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e)}:wght@400;500;700;800&display=swap`, document.head.appendChild(r), e;
}
const ft = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, pt = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], M = class M extends X {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), ot(), st();
  }
  firstUpdated() {
    if (!("IntersectionObserver" in window)) {
      this.setAttribute("in", "");
      return;
    }
    this.io = new IntersectionObserver((e) => {
      var r;
      e.some((a) => a.isIntersecting) && (this.setAttribute("in", ""), (r = this.io) == null || r.disconnect());
    }, { threshold: 0.12 }), this.io.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.io) == null || e.disconnect();
  }
  /** Hidden by the merchant's schedule or device rule? */
  hiddenNow() {
    const e = this.c, r = Date.now(), a = Date.parse(String(e.s_from || "")), i = Date.parse(String(e.s_to || ""));
    if (Number.isFinite(a) && r < a || Number.isFinite(i) && r > i) return !0;
    const o = ct();
    return !!(y(e.s_hide_mobile) && o === "mobile" || y(e.s_hide_desktop) && o !== "mobile");
  }
  vars(e = "") {
    const r = this.c, a = [], i = (s, n) => {
      n !== "" && n != null && a.push(`${s}:${n}`);
    };
    i("--a", r.s_accent || ""), i("--a2", r.s_accent2 || ""), i("--bgc", r.s_bg || ""), i("--fgc", r.s_text || ""), i("--cardc", r.s_card || ""), i("--r", `${h(r.s_radius, 22)}px`), i("--gap", `${h(r.s_gap, 18)}px`), i("--ts", `${h(r.s_title_size, 38)}px`), i("--fs", `${h(r.s_text_size, 16)}px`), i("--pt", `${h(r.s_pad_top, 56)}px`), i("--pb", `${h(r.s_pad_bottom, 56)}px`), i("--maxw", ft[m(r.s_width, "normal")] ?? "1240px"), i("--sh", pt[Math.max(0, Math.min(5, h(r.s_shadow, 2)))]), i("--ms", `${h(r.s_anim_ms, 700)}ms`), i("--ov", String(h(r.s_overlay, 45) / 100)), r.s_bg_image && i("--bgimg", `url("${String(r.s_bg_image)}")`);
    const o = ht(m(r.s_font, "inherit"));
    return o && i("font-family", `'${o}', inherit`), a.join(";") + (e ? ";" + e : "");
  }
  cls() {
    const e = this.c;
    return [
      "sec",
      `th-${m(e.s_theme, "auto")}`,
      `al-${m(e.s_align, "start")}`,
      `an-${m(e.s_anim, "rise")}`,
      `pt-${m(e.s_pattern, "none")}`,
      `bs-${m(e.s_btn_style, "pill")}`,
      y(e.s_border) ? "bordered" : "",
      y(e.s_stagger, !0) ? "stagger" : "",
      e.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(e, r = {}, a = "", i = "", o = !0) {
    if (this.hiddenNow()) return B;
    const s = this.c, n = p(s.eyebrow, r.eyebrow ?? ""), c = p(s.title, r.title ?? ""), u = p(s.subtitle, r.sub ?? ""), v = o && y(s.s_show_head, !0) && (n || c || u);
    return l`<section class="${this.cls()} ${a}" style=${this.vars(i)} id=${String(s.s_anchor || "") || B}>
      <div class="wrap">${v ? l`<header class="head">${n ? l`<span class="eyebrow">${n}</span>` : ""}${c ? l`<h2 class="title">${c}</h2>` : ""}${u ? l`<p class="sub">${u}</p>` : ""}</header>` : ""}
      ${e}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(e) {
    const r = e.filter(Boolean);
    return !r.length || !lt() || !y(this.c.s_hints, !0) ? "" : l`<aside class="hints" role="note"><b>💡 ${d("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${r.map((a) => l`<li>${a}</li>`)}</ul></aside>`;
  }
  card(e, r = {}) {
    var a;
    return l`<article class="pc ${e.available ? "" : "oos"}">
      <a class="ph" href=${e.url} @click=${() => D(e)}><img src=${e.image} alt=${e.name} loading="lazy" />${(a = r.badges) != null && a.length ? l`<span class="badges">${r.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e.url} @click=${() => D(e)}>${e.name}</a>
        <div class="pr"><b>${w(e.price)}</b>${e.regular > e.price ? l`<s>${w(e.regular)}</s>` : ""}</div>
        ${r.rating !== !1 && e.rating > 0 ? l`<div class="rt">★ ${e.rating.toFixed(1)}${e.ratingCount ? l` <small>(${e.ratingCount})</small>` : ""}</div>` : ""}
        ${r.extra ?? ""}
        ${r.quick !== !1 ? l`<button class="btn sm" ?disabled=${!e.available} @click=${() => this.add(e)}>${e.available ? d("أضف للسلة", "Add to cart") : d("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(e, r = 1, a) {
    D(e, 3), await J(e.id, r, a) ? U(d("تمت الإضافة للسلة", "Added to cart")) : location.href = e.url;
  }
};
M.base = T`
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
let _ = M;
ut([
  Q({ type: Object })
], _.prototype, "config");
async function bt(t, e = "") {
  let r = 0;
  for (const { p: a, q: i } of t) a.available && await J(a.id, i ?? 1) && r++;
  return e && await at(e), U(r ? d(`أضفنا ${r} منتج للسلة${e ? " وطبّقنا الكود" : ""}`, `Added ${r} items${e ? " and applied the code" : ""}`) : d("تعذّرت الإضافة", "Could not add"), !!r), r;
}
var mt = Object.defineProperty, z = (t, e, r, a) => {
  for (var i = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = s(e, r, i) || i);
  return i && mt(e, r, i), i;
};
const E = class E extends _ {
  constructor() {
    super(...arguments), this.rows = [], this.idx = [], this.budget = 0, this.spin = !1, this.seq = 0;
  }
  willUpdate(e) {
    e.has("config") && this.load();
  }
  async load() {
    const e = ++this.seq, r = this.c;
    let a;
    const i = Z(r.rows).filter((s) => j(s.products).length);
    if (i.length) a = await Promise.all(i.map(async (s) => ({ name: p(s.name), items: (await H(j(s.products))).filter((n) => n.available) })));
    else {
      const s = (await rt(r.products, m(r.auto_source, "best_selling"), 30)).items.filter((n) => n.available);
      a = [...new Set(s.map((n) => n.category).filter(Boolean))].slice(0, 3).map((n) => ({ name: n, items: s.filter((c) => c.category === n) }));
    }
    if (a = a.filter((s) => s.items.length), e !== this.seq) return;
    this.rows = a, this.idx = a.map(() => 0);
    const o = a.reduce((s, n) => s + Math.max(...n.items.map((c) => c.price)), 0);
    this.budget = h(r.default_budget, 0) || Math.ceil(o);
  }
  shuffle() {
    let r = null;
    for (let a = 0; a < 200; a++) {
      const i = this.rows.map((s) => Math.floor(Math.random() * s.items.length));
      if (i.reduce((s, n, c) => s + this.rows[c].items[n].price, 0) <= this.budget) {
        r = i;
        break;
      }
    }
    this.spin = !0, setTimeout(() => {
      r && (this.idx = r), this.spin = !1;
    }, 260);
  }
  render() {
    const e = this.c;
    if (!this.rows.length) return this.shell(l`<div class="skel"></div>`);
    const r = this.rows.map((n, c) => n.items[this.idx[c] % n.items.length]), a = r.reduce((n, c) => n + c.price, 0), i = this.rows.reduce((n, c) => n + Math.min(...c.items.map((u) => u.price)), 0), o = this.rows.reduce((n, c) => n + Math.max(...c.items.map((u) => u.price)), 0), s = (n, c) => this.idx = Object.assign([...this.idx], { [n]: (this.idx[n] + c + this.rows[n].items.length) % this.rows[n].items.length });
    return this.shell(
      l`<div class="g"><div class="stage ${this.spin ? "spin" : ""}" style=${`--rh:${h(e.row_height, 150)}px`}>${this.rows.map((n, c) => l`<div class="r"><div class="rn">${n.name}</div>
        <button class="nav" aria-label="prev" @click=${() => s(c, -1)}>‹</button><a class="pic" href=${r[c].url}><img src=${r[c].image} alt=${r[c].name} /><span>${r[c].name}<b>${w(r[c].price)}</b></span></a><button class="nav" aria-label="next" @click=${() => s(c, 1)}>›</button></div>`)}</div>
      <div class="side"><h3>${p(e.side_title, d("نسّقها على ذوقك", "Style it your way"))}</h3><p class="muted">${p(e.side_text, d("قلّب كل صف، أو خلّ «نسّق لي» يختار تشكيلة ضمن ميزانيتك.", "Flip each row, or let «Style me» pick within your budget."))}</p>
        <div class="tot">${w(a)}</div>${a > this.budget ? l`<div class="over">${d("فوق ميزانيتك بـ", "Over budget by")} ${w(a - this.budget)}</div>` : ""}
        ${y(e.show_budget, !0) ? l`<label class="muted">${d("ميزانيتك", "Your budget")}: <b>${w(this.budget)}</b></label><input type="range" min=${Math.floor(i)} max=${Math.ceil(o)} .value=${String(this.budget)} @input=${(n) => this.budget = +n.target.value} />` : ""}
        <div class="acts"><button class="btn ghost" @click=${this.shuffle}>🎲 ${p(e.shuffle_text, d("نسّق لي", "Style me"))}</button><button class="btn" @click=${() => bt(r.map((n) => ({ p: n })), String(e.coupon || ""))}>${p(e.button, d("أضف التنسيق للسلة", "Add this look"))}</button></div></div></div>`,
      { eyebrow: d("منسّق الإطلالة", "Look stylist"), title: "" }
    );
  }
};
E.styles = [_.base, T`
    .g { display: grid; grid-template-columns: minmax(0, 520px) 1fr; gap: calc(var(--gap) * 1.6); align-items: center; justify-content: center; } @media (max-width: 860px) { .g { grid-template-columns: 1fr; } }
    .stage { display: grid; gap: 10px; padding: 16px; border-radius: var(--r); background: radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--A) 20%, var(--CARD)), var(--CARD)); box-shadow: var(--sh); }
    .r { display: grid; grid-template-columns: 44px 1fr 44px; align-items: center; gap: 8px; }
    .r button.nav { all: unset; cursor: pointer; width: 44px; height: 44px; border-radius: 50%; background: var(--CARD); display: grid; place-items: center; font-size: 20px; box-shadow: var(--sh); }
    .pic { position: relative; height: var(--rh, 150px); border-radius: 18px; overflow: hidden; } .pic img { width: 100%; height: 100%; object-fit: cover; transition: transform .45s cubic-bezier(.2,.8,.2,1), opacity .3s; }
    .spin .pic img { transform: translateY(-12px) scale(.96); opacity: .4; }
    .pic span { position: absolute; inset: auto 8px 8px 8px; display: flex; justify-content: space-between; padding: 6px 10px; border-radius: 12px; background: #fffe; color: #111; font-size: 12px; font-weight: 700; } .pic span b { color: var(--A); }
    .rn { font-size: 11px; font-weight: 800; letter-spacing: .1em; opacity: .6; text-align: center; grid-column: 1 / -1; margin-bottom: -4px; }
    .side h3 { margin: 0 0 8px; font-size: clamp(22px, 2.6vw, 34px); } .tot { font-size: 30px; font-weight: 900; color: var(--A); margin: 10px 0; }
    input[type=range] { width: 100%; accent-color: var(--A); } .acts { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; } .over { color: #b91c1c; font-weight: 700; font-size: 14px; }
  `];
let x = E;
z([
  S()
], x.prototype, "rows");
z([
  S()
], x.prototype, "idx");
z([
  S()
], x.prototype, "budget");
z([
  S()
], x.prototype, "spin");
typeof x < "u" && x.registerSallaComponent("salla-taqm-outfit");
export {
  x as default
};
