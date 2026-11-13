import { LitElement as Q, nothing as L, html as c, css as J } from "lit";
import { property as V, state as j } from "lit/decorators.js";
const h = () => window.salla ?? window.Salla, E = async () => {
  var t, e;
  try {
    await ((e = (t = h()) == null ? void 0 : t.onReady) == null ? void 0 : e.call(t));
  } catch {
  }
}, U = () => {
  var t, e, a, r, n;
  try {
    const i = ((e = (t = h()) == null ? void 0 : t.lang) == null ? void 0 : e.locale) ?? ((n = (r = (a = h()) == null ? void 0 : a.config) == null ? void 0 : r.get) == null ? void 0 : n.call(r, "user.language_code"));
    if (typeof i == "string" && i) return i.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, Z = () => U() === "en", u = (t, e) => Z() ? e : t, _ = (t, e = "") => {
  if (t == null) return e;
  if (typeof t == "string") {
    const a = t.trim();
    if (a.startsWith("{") && a.endsWith("}"))
      try {
        return _(JSON.parse(a), e);
      } catch {
      }
    return a || e;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const a = t, r = a[U()] ?? a.ar ?? a.en ?? Object.values(a).find((n) => typeof n == "string" && n);
    return typeof r == "string" && r.trim() ? r : e;
  }
  return e;
}, m = (t, e = "") => {
  const a = Array.isArray(t) ? t[0] : t, r = typeof a == "object" && a ? a.value : a;
  return r == null || r === "" ? e : String(r);
}, g = (t, e = 0) => {
  const a = Number(t);
  return t === "" || t == null || !Number.isFinite(a) ? e : a;
}, p = (t, e = !1) => t == null || t === "" ? e : t === !0 || t === "true" || t === 1 || t === "1", x = (t) => {
  const e = typeof t == "object" && t ? t.amount : t, a = Number(e);
  return Number.isFinite(a) ? a : 0;
}, tt = (t) => {
  if (!t) return null;
  const e = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(e) && e > Date.now() ? e : null;
};
function Y(t) {
  var l, s, d, b, f, N, C, R, q;
  const e = x(t == null ? void 0 : t.sale_price), a = x((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), r = e && e < a ? e : x(t == null ? void 0 : t.price) || a, n = Math.max(x(t == null ? void 0 : t.regular_price), x(t == null ? void 0 : t.price), r), i = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((S) => String((S == null ? void 0 : S.url) ?? S ?? "")).filter(Boolean), o = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((l = t == null ? void 0 : t.image) == null ? void 0 : l.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? i[0] ?? ""),
    images: i,
    price: r,
    regular: n,
    discount: n > r ? Math.round((1 - r / n) * 100) : 0,
    rating: x(((s = t == null ? void 0 : t.rating) == null ? void 0 : s.stars) ?? ((d = t == null ? void 0 : t.rating) == null ? void 0 : d.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: x((b = t == null ? void 0 : t.rating) == null ? void 0 : b.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : x(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: o == null || o === "" || !Number.isFinite(Number(o)) ? null : Number(o),
    endsAt: tt((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((f = t == null ? void 0 : t.category) == null ? void 0 : f.name) ?? ((C = (N = t == null ? void 0 : t.categories) == null ? void 0 : N[0]) == null ? void 0 : C.name) ?? ""),
    brand: String(((R = t == null ? void 0 : t.brand) == null ? void 0 : R.name) ?? ""),
    promo: String(((q = t == null ? void 0 : t.promotion) == null ? void 0 : q.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const y = (t) => (Array.isArray(t) ? t : []).map((e) => Number(typeof e == "object" && e ? e.value : e)).filter((e) => Number.isFinite(e) && e > 0), $ = /* @__PURE__ */ new Map();
async function et(t) {
  var r, n, i;
  const e = (r = h()) == null ? void 0 : r.product;
  if (!e) return null;
  const a = e.getDetails ? e.getDetails.bind(e) : (i = (n = e.api) == null ? void 0 : n.getDetails) == null ? void 0 : i.bind(e.api);
  if (!a) return null;
  try {
    const o = await a(t, ["images", "sold_quantity", "category"]), l = Y((o == null ? void 0 : o.data) ?? o);
    return l.name ? l : null;
  } catch {
    return null;
  }
}
async function G(t) {
  await E();
  const e = "ids:" + t.join(",");
  return $.has(e) || $.set(e, Promise.all(t.map(et)).then((a) => a.filter((r) => !!r))), $.get(e);
}
async function O(t, e = [], a = 12) {
  await E();
  const r = `src:${t}:${e.join(",")}:${a}`;
  return $.has(r) || $.set(r, (async () => {
    var o, l, s, d;
    const n = (o = h()) == null ? void 0 : o.product, i = n != null && n.fetch ? n.fetch.bind(n) : (s = (l = n == null ? void 0 : n.api) == null ? void 0 : l.fetch) == null ? void 0 : s.bind(n.api);
    if (!i) return [];
    try {
      const b = { source: t, per_page: a };
      e.length && (b.source_value = e);
      const f = await i(b);
      return (Array.isArray(f == null ? void 0 : f.data) ? f.data : Array.isArray(f) ? f : ((d = f == null ? void 0 : f.data) == null ? void 0 : d.products) ?? []).map(Y).filter((C) => C.name).slice(0, a);
    } catch {
      return [];
    }
  })()), $.get(r);
}
async function P(t, e = "best_selling", a = 12) {
  const r = y(t);
  if (r.length) return { items: (await G(r)).slice(0, a), auto: !1 };
  let n = await O(e, [], a);
  return !n.length && e !== "latest" && (n = await O("latest", [], a)), { items: n, auto: !0 };
}
const w = (t) => {
  var e, a;
  try {
    const r = (a = (e = h()) == null ? void 0 : e.money) == null ? void 0 : a.call(e, t);
    if (r) return String(r);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${u("ر.س", "SAR")}`;
};
async function K(t, e = 1, a) {
  var r, n, i;
  await E();
  try {
    return await ((i = (n = (r = h()) == null ? void 0 : r.cart) == null ? void 0 : n.addItem) == null ? void 0 : i.call(n, a ? { id: t, quantity: e, notes: a } : { id: t, quantity: e })), !0;
  } catch {
    return !1;
  }
}
async function at(t) {
  var e, a, r;
  if (!t) return !1;
  try {
    return await ((r = (a = (e = h()) == null ? void 0 : e.cart) == null ? void 0 : a.addCoupon) == null ? void 0 : r.call(a, t)), !0;
  } catch {
    return !1;
  }
}
function X(t, e = !0) {
  var a, r, n;
  try {
    (n = e ? (a = h()) == null ? void 0 : a.success : (r = h()) == null ? void 0 : r.error) == null || n(t);
  } catch {
  }
}
const rt = (t, e) => {
  var a, r, n;
  try {
    (n = (r = (a = h()) == null ? void 0 : a.event) == null ? void 0 : r.on) == null || n.call(r, t, e);
  } catch {
  }
}, z = "tw_smart_mem_v1", T = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function A() {
  try {
    return { ...T(), ...JSON.parse(localStorage.getItem(z) || "{}") };
  } catch {
    return T();
  }
}
function nt(t) {
  try {
    localStorage.setItem(z, JSON.stringify(t));
  } catch {
  }
}
function F(t) {
  const e = A();
  return t(e), nt(e), e;
}
function it() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(z), sessionStorage.setItem(z, "1");
  } catch {
  }
  return t ? F((e) => {
    e.visits += 1, e.last = Date.now();
  }) : A();
}
const D = (t, e = 1) => F((a) => {
  a.seen[t.id] = (a.seen[t.id] || 0) + e, a.prices = [...a.prices.slice(-29), t.price], t.category && (a.tags[t.category] = (a.tags[t.category] || 0) + e);
});
function st() {
  const t = [...A().prices].sort((e, a) => e - a);
  return t.length >= 3 ? t[Math.floor(t.length / 2)] : 0;
}
function ot(t, e = A()) {
  let a = (e.seen[t.id] || 0) * 2 + (e.carted.includes(t.id) ? 4 : 0) + (t.category && e.tags[t.category] || 0);
  const r = st();
  return r && (a += Math.max(0, 2 - Math.abs(t.price - r) / r * 2)), a;
}
const ct = (t, e = !0) => {
  if (!e) return t;
  const a = A();
  return t.map((r, n) => ({ p: r, i: n, s: ot(r, a) })).sort((r, n) => n.s - r.s || r.i - n.i).map((r) => r.p);
};
let W = !1;
function lt() {
  W || (W = !0, rt("cart::item.added", (t) => {
    var a;
    const e = Number(((a = t == null ? void 0 : t.data) == null ? void 0 : a.product_id) ?? 0);
    e && F((r) => {
      r.carted.includes(e) || (r.carted = [...r.carted.slice(-40), e]);
    });
  }));
}
const dt = () => {
  const t = innerWidth, e = navigator.userAgent;
  return /iPad|Tablet/i.test(e) || t >= 700 && t < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e) || t < 700 ? "mobile" : "desktop";
}, ut = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var gt = Object.defineProperty, ft = (t, e, a, r) => {
  for (var n = void 0, i = t.length - 1, o; i >= 0; i--)
    (o = t[i]) && (n = o(e, a, n) || n);
  return n && gt(e, a, n), n;
};
const ht = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, H = /* @__PURE__ */ new Set();
function bt(t) {
  const e = ht[t];
  if (!e || H.has(e)) return e;
  H.add(e);
  const a = document.createElement("link");
  return a.rel = "stylesheet", a.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e)}:wght@400;500;700;800&display=swap`, document.head.appendChild(a), e;
}
const mt = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, pt = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], B = class B extends Q {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), lt(), it();
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
    const e = this.c, a = Date.now(), r = Date.parse(String(e.s_from || "")), n = Date.parse(String(e.s_to || ""));
    if (Number.isFinite(r) && a < r || Number.isFinite(n) && a > n) return !0;
    const i = dt();
    return !!(p(e.s_hide_mobile) && i === "mobile" || p(e.s_hide_desktop) && i !== "mobile");
  }
  vars(e = "") {
    const a = this.c, r = [], n = (o, l) => {
      l !== "" && l != null && r.push(`${o}:${l}`);
    };
    n("--a", a.s_accent || ""), n("--a2", a.s_accent2 || ""), n("--bgc", a.s_bg || ""), n("--fgc", a.s_text || ""), n("--cardc", a.s_card || ""), n("--r", `${g(a.s_radius, 22)}px`), n("--gap", `${g(a.s_gap, 18)}px`), n("--ts", `${g(a.s_title_size, 38)}px`), n("--fs", `${g(a.s_text_size, 16)}px`), n("--pt", `${g(a.s_pad_top, 56)}px`), n("--pb", `${g(a.s_pad_bottom, 56)}px`), n("--maxw", mt[m(a.s_width, "normal")] ?? "1240px"), n("--sh", pt[Math.max(0, Math.min(5, g(a.s_shadow, 2)))]), n("--ms", `${g(a.s_anim_ms, 700)}ms`), n("--ov", String(g(a.s_overlay, 45) / 100)), a.s_bg_image && n("--bgimg", `url("${String(a.s_bg_image)}")`);
    const i = bt(m(a.s_font, "inherit"));
    return i && n("font-family", `'${i}', inherit`), r.join(";") + (e ? ";" + e : "");
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
      p(e.s_border) ? "bordered" : "",
      p(e.s_stagger, !0) ? "stagger" : "",
      e.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(e, a = {}, r = "", n = "", i = !0) {
    if (this.hiddenNow()) return L;
    const o = this.c, l = _(o.eyebrow, a.eyebrow ?? ""), s = _(o.title, a.title ?? ""), d = _(o.subtitle, a.sub ?? ""), b = i && p(o.s_show_head, !0) && (l || s || d);
    return c`<section class="${this.cls()} ${r}" style=${this.vars(n)} id=${String(o.s_anchor || "") || L}>
      <div class="wrap">${b ? c`<header class="head">${l ? c`<span class="eyebrow">${l}</span>` : ""}${s ? c`<h2 class="title">${s}</h2>` : ""}${d ? c`<p class="sub">${d}</p>` : ""}</header>` : ""}
      ${e}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(e) {
    const a = e.filter(Boolean);
    return !a.length || !ut() || !p(this.c.s_hints, !0) ? "" : c`<aside class="hints" role="note"><b>💡 ${u("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${a.map((r) => c`<li>${r}</li>`)}</ul></aside>`;
  }
  card(e, a = {}) {
    var r;
    return c`<article class="pc ${e.available ? "" : "oos"}">
      <a class="ph" href=${e.url} @click=${() => D(e)}><img src=${e.image} alt=${e.name} loading="lazy" />${(r = a.badges) != null && r.length ? c`<span class="badges">${a.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e.url} @click=${() => D(e)}>${e.name}</a>
        <div class="pr"><b>${w(e.price)}</b>${e.regular > e.price ? c`<s>${w(e.regular)}</s>` : ""}</div>
        ${a.rating !== !1 && e.rating > 0 ? c`<div class="rt">★ ${e.rating.toFixed(1)}${e.ratingCount ? c` <small>(${e.ratingCount})</small>` : ""}</div>` : ""}
        ${a.extra ?? ""}
        ${a.quick !== !1 ? c`<button class="btn sm" ?disabled=${!e.available} @click=${() => this.add(e)}>${e.available ? u("أضف للسلة", "Add to cart") : u("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(e, a = 1, r) {
    D(e, 3), await K(e.id, a, r) ? X(u("تمت الإضافة للسلة", "Added to cart")) : location.href = e.url;
  }
};
B.base = J`
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
let k = B;
ft([
  V({ type: Object })
], k.prototype, "config");
async function xt(t, e = "") {
  let a = 0;
  for (const { p: r, q: n } of t) r.available && await K(r.id, n ?? 1) && a++;
  return e && await at(e), X(a ? u(`أضفنا ${a} منتج للسلة${e ? " وطبّقنا الكود" : ""}`, `Added ${a} items${e ? " and applied the code" : ""}`) : u("تعذّرت الإضافة", "Could not add"), !!a), a;
}
var vt = Object.defineProperty, I = (t, e, a, r) => {
  for (var n = void 0, i = t.length - 1, o; i >= 0; i--)
    (o = t[i]) && (n = o(e, a, n) || n);
  return n && vt(e, a, n), n;
};
const M = class M extends k {
  constructor() {
    super(...arguments), this.main = null, this.adds = [], this.on = [], this.seq = 0;
  }
  willUpdate(e) {
    e.has("config") && this.load();
  }
  async load() {
    const e = ++this.seq, a = this.c, r = y(a.main).length ? (await G(y(a.main)))[0] : (await P(null, m(a.auto_source, "best_selling"), 1)).items[0];
    let n = y(a.addons).length ? await G(y(a.addons)) : (await P(null, m(a.addon_source, "best_selling"), 20)).items.filter((i) => i.id !== (r == null ? void 0 : r.id) && i.available);
    r && p(a.harmony, !0) && !y(a.addons).length && (n = n.filter((i) => i.price <= r.price * g(a.harmony_ratio, 60) / 100 + 1).concat(n.filter((i) => i.price > r.price * g(a.harmony_ratio, 60) / 100 + 1))), n = ct(n, p(a.personalize, !0)).slice(0, g(a.limit, 3)), e === this.seq && (this.main = r ?? null, this.adds = n, this.on = p(a.preselect, !0) ? n.filter((i) => i.available).map((i) => i.id) : []);
  }
  render() {
    const e = this.c, a = this.main;
    if (!a) return this.shell(c`<div class="skel"></div>`);
    const r = [a, ...this.adds.filter((s) => this.on.includes(s.id))], n = r.reduce((s, d) => s + d.price, 0), i = r.reduce((s, d) => s + d.regular, 0), o = g(e.discount, 0), l = r.length > 1 && o ? Math.round(n * o) / 100 : 0;
    return this.shell(
      c`<div class="row">${[a, ...this.adds].map((s, d) => c`${d ? c`<span class="plus">+</span>` : ""}<a class="it ${d && !this.on.includes(s.id) ? "off" : ""}" href=${s.url}><img src=${s.image} alt=${s.name} loading="lazy" />${d === 0 ? c`<span class="bdg main-b">${u("الأساسي", "Main")}</span>` : ""}</a>`)}</div>
      <div class="lst">${[a, ...this.adds].map((s, d) => c`<label class="l"><input type="checkbox" ?checked=${d === 0 || this.on.includes(s.id)} ?disabled=${d === 0 || !s.available} @change=${() => this.on = this.on.includes(s.id) ? this.on.filter((b) => b !== s.id) : [...this.on, s.id]} />
        <span>${d === 0 ? c`<b>${u("هذا المنتج:", "This item:")}</b> ` : ""}${s.name}</span>${s.regular > s.price ? c`<s>${w(s.regular)}</s>` : ""}<b>${w(s.price)}</b></label>`)}</div>
      <div class="tot"><div>${u("السعر الإجمالي", "Total price")}: <b>${w(n - l)}</b> ${i - n + l > 0 ? c`<span class="save">· ${u("توفّر", "save")} ${w(i - n + l)}</span>` : ""}</div>
        <button class="btn" @click=${() => xt(r.map((s) => ({ p: s })), l ? String(e.coupon || "") : "")}>${_(e.button, u(`أضف ${r.length} للسلة`, `Add ${r.length} to cart`))}</button></div>`,
      { eyebrow: u("يُشترى معاً", "Bought together"), title: u("كمّلها صح", "Complete it right"), sub: "" },
      "",
      "",
      !0
    );
  }
};
M.styles = [k.base, J`
    .row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; justify-content: center; margin-bottom: 22px; }
    .it { width: clamp(120px, 15vw, 170px); text-align: center; position: relative; transition: opacity .3s; } .it.off { opacity: .35; }
    .it img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 20px; box-shadow: var(--sh); } .it .main-b { position: absolute; top: 8px; inset-inline-start: 8px; }
    .plus { font-size: 26px; opacity: .45; font-weight: 300; }
    .lst { display: grid; gap: 8px; max-width: 640px; margin: 0 auto; } label.l { display: flex; gap: 12px; align-items: center; padding: 10px 14px; border-radius: 14px; background: var(--CARD); cursor: pointer; box-shadow: var(--sh); }
    label.l input { width: 20px; height: 20px; accent-color: var(--A); } label.l span { flex: 1; } label.l s { opacity: .5; font-size: 13px; margin-inline-end: 6px; }
    .tot { display: flex; justify-content: space-between; align-items: center; gap: 12px; max-width: 640px; margin: 16px auto 0; flex-wrap: wrap; } .tot b { font-size: 24px; color: var(--A); }
    .save { color: #16a34a; font-weight: 700; font-size: 14px; }
  `];
let v = M;
I([
  j()
], v.prototype, "main");
I([
  j()
], v.prototype, "adds");
I([
  j()
], v.prototype, "on");
typeof v < "u" && v.registerSallaComponent("salla-taqm-together");
export {
  v as default
};
