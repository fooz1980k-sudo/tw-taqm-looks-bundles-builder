import { LitElement as U, nothing as R, html as d, css as O } from "lit";
import { property as K, state as P } from "lit/decorators.js";
const b = () => window.salla ?? window.Salla, D = async () => {
  var t, e;
  try {
    await ((e = (t = b()) == null ? void 0 : t.onReady) == null ? void 0 : e.call(t));
  } catch {
  }
}, W = () => {
  var t, e, r, a, i;
  try {
    const n = ((e = (t = b()) == null ? void 0 : t.lang) == null ? void 0 : e.locale) ?? ((i = (a = (r = b()) == null ? void 0 : r.config) == null ? void 0 : a.get) == null ? void 0 : i.call(a, "user.language_code"));
    if (typeof n == "string" && n) return n.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, X = () => W() === "en", u = (t, e) => X() ? e : t, $ = (t, e = "") => {
  if (t == null) return e;
  if (typeof t == "string") {
    const r = t.trim();
    if (r.startsWith("{") && r.endsWith("}"))
      try {
        return $(JSON.parse(r), e);
      } catch {
      }
    return r || e;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const r = t, a = r[W()] ?? r.ar ?? r.en ?? Object.values(r).find((i) => typeof i == "string" && i);
    return typeof a == "string" && a.trim() ? a : e;
  }
  return e;
}, x = (t, e = "") => {
  const r = Array.isArray(t) ? t[0] : t, a = typeof r == "object" && r ? r.value : r;
  return a == null || a === "" ? e : String(a);
}, g = (t, e = 0) => {
  const r = Number(t);
  return t === "" || t == null || !Number.isFinite(r) ? e : r;
}, y = (t, e = !1) => t == null || t === "" ? e : t === !0 || t === "true" || t === 1 || t === "1", m = (t) => {
  const e = typeof t == "object" && t ? t.amount : t, r = Number(e);
  return Number.isFinite(r) ? r : 0;
}, Q = (t) => {
  if (!t) return null;
  const e = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(e) && e > Date.now() ? e : null;
};
function T(t) {
  var c, f, h, p, o, l, w, I, F;
  const e = m(t == null ? void 0 : t.sale_price), r = m((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), a = e && e < r ? e : m(t == null ? void 0 : t.price) || r, i = Math.max(m(t == null ? void 0 : t.regular_price), m(t == null ? void 0 : t.price), a), n = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((S) => String((S == null ? void 0 : S.url) ?? S ?? "")).filter(Boolean), s = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((c = t == null ? void 0 : t.image) == null ? void 0 : c.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? n[0] ?? ""),
    images: n,
    price: a,
    regular: i,
    discount: i > a ? Math.round((1 - a / i) * 100) : 0,
    rating: m(((f = t == null ? void 0 : t.rating) == null ? void 0 : f.stars) ?? ((h = t == null ? void 0 : t.rating) == null ? void 0 : h.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: m((p = t == null ? void 0 : t.rating) == null ? void 0 : p.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : m(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: s == null || s === "" || !Number.isFinite(Number(s)) ? null : Number(s),
    endsAt: Q((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((o = t == null ? void 0 : t.category) == null ? void 0 : o.name) ?? ((w = (l = t == null ? void 0 : t.categories) == null ? void 0 : l[0]) == null ? void 0 : w.name) ?? ""),
    brand: String(((I = t == null ? void 0 : t.brand) == null ? void 0 : I.name) ?? ""),
    promo: String(((F = t == null ? void 0 : t.promotion) == null ? void 0 : F.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const V = (t) => (Array.isArray(t) ? t : []).map((e) => Number(typeof e == "object" && e ? e.value : e)).filter((e) => Number.isFinite(e) && e > 0), k = /* @__PURE__ */ new Map();
async function Z(t) {
  var a, i, n;
  const e = (a = b()) == null ? void 0 : a.product;
  if (!e) return null;
  const r = e.getDetails ? e.getDetails.bind(e) : (n = (i = e.api) == null ? void 0 : i.getDetails) == null ? void 0 : n.bind(e.api);
  if (!r) return null;
  try {
    const s = await r(t, ["images", "sold_quantity", "category"]), c = T((s == null ? void 0 : s.data) ?? s);
    return c.name ? c : null;
  } catch {
    return null;
  }
}
async function tt(t) {
  await D();
  const e = "ids:" + t.join(",");
  return k.has(e) || k.set(e, Promise.all(t.map(Z)).then((r) => r.filter((a) => !!a))), k.get(e);
}
async function B(t, e = [], r = 12) {
  await D();
  const a = `src:${t}:${e.join(",")}:${r}`;
  return k.has(a) || k.set(a, (async () => {
    var s, c, f, h;
    const i = (s = b()) == null ? void 0 : s.product, n = i != null && i.fetch ? i.fetch.bind(i) : (f = (c = i == null ? void 0 : i.api) == null ? void 0 : c.fetch) == null ? void 0 : f.bind(i.api);
    if (!n) return [];
    try {
      const p = { source: t, per_page: r };
      e.length && (p.source_value = e);
      const o = await n(p);
      return (Array.isArray(o == null ? void 0 : o.data) ? o.data : Array.isArray(o) ? o : ((h = o == null ? void 0 : o.data) == null ? void 0 : h.products) ?? []).map(T).filter((w) => w.name).slice(0, r);
    } catch {
      return [];
    }
  })()), k.get(a);
}
async function et(t, e = "best_selling", r = 12) {
  const a = V(t);
  if (a.length) return { items: (await tt(a)).slice(0, r), auto: !1 };
  let i = await B(e, [], r);
  return !i.length && e !== "latest" && (i = await B("latest", [], r)), { items: i, auto: !0 };
}
const v = (t) => {
  var e, r;
  try {
    const a = (r = (e = b()) == null ? void 0 : e.money) == null ? void 0 : r.call(e, t);
    if (a) return String(a);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${u("ر.س", "SAR")}`;
};
async function Y(t, e = 1, r) {
  var a, i, n;
  await D();
  try {
    return await ((n = (i = (a = b()) == null ? void 0 : a.cart) == null ? void 0 : i.addItem) == null ? void 0 : n.call(i, r ? { id: t, quantity: e, notes: r } : { id: t, quantity: e })), !0;
  } catch {
    return !1;
  }
}
async function rt(t) {
  var e, r, a;
  if (!t) return !1;
  try {
    return await ((a = (r = (e = b()) == null ? void 0 : e.cart) == null ? void 0 : r.addCoupon) == null ? void 0 : a.call(r, t)), !0;
  } catch {
    return !1;
  }
}
function H(t, e = !0) {
  var r, a, i;
  try {
    (i = e ? (r = b()) == null ? void 0 : r.success : (a = b()) == null ? void 0 : a.error) == null || i(t);
  } catch {
  }
}
const at = (t, e) => {
  var r, a, i;
  try {
    (i = (a = (r = b()) == null ? void 0 : r.event) == null ? void 0 : a.on) == null || i.call(a, t, e);
  } catch {
  }
}, z = "tw_smart_mem_v1", M = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function C() {
  try {
    return { ...M(), ...JSON.parse(localStorage.getItem(z) || "{}") };
  } catch {
    return M();
  }
}
function it(t) {
  try {
    localStorage.setItem(z, JSON.stringify(t));
  } catch {
  }
}
function G(t) {
  const e = C();
  return t(e), it(e), e;
}
function nt() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(z), sessionStorage.setItem(z, "1");
  } catch {
  }
  return t ? G((e) => {
    e.visits += 1, e.last = Date.now();
  }) : C();
}
const N = (t, e = 1) => G((r) => {
  r.seen[t.id] = (r.seen[t.id] || 0) + e, r.prices = [...r.prices.slice(-29), t.price], t.category && (r.tags[t.category] = (r.tags[t.category] || 0) + e);
});
function ot() {
  const t = [...C().prices].sort((e, r) => e - r);
  return t.length >= 3 ? t[Math.floor(t.length / 2)] : 0;
}
function st(t, e = C()) {
  let r = (e.seen[t.id] || 0) * 2 + (e.carted.includes(t.id) ? 4 : 0) + (t.category && e.tags[t.category] || 0);
  const a = ot();
  return a && (r += Math.max(0, 2 - Math.abs(t.price - a) / a * 2)), r;
}
const ct = (t, e = !0) => {
  if (!e) return t;
  const r = C();
  return t.map((a, i) => ({ p: a, i, s: st(a, r) })).sort((a, i) => i.s - a.s || a.i - i.i).map((a) => a.p);
};
let q = !1;
function lt() {
  q || (q = !0, at("cart::item.added", (t) => {
    var r;
    const e = Number(((r = t == null ? void 0 : t.data) == null ? void 0 : r.product_id) ?? 0);
    e && G((a) => {
      a.carted.includes(e) || (a.carted = [...a.carted.slice(-40), e]);
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
var gt = Object.defineProperty, ft = (t, e, r, a) => {
  for (var i = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (i = s(e, r, i) || i);
  return i && gt(e, r, i), i;
};
const ht = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, L = /* @__PURE__ */ new Set();
function bt(t) {
  const e = ht[t];
  if (!e || L.has(e)) return e;
  L.add(e);
  const r = document.createElement("link");
  return r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e)}:wght@400;500;700;800&display=swap`, document.head.appendChild(r), e;
}
const pt = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, mt = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], j = class j extends U {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), lt(), nt();
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
    const n = dt();
    return !!(y(e.s_hide_mobile) && n === "mobile" || y(e.s_hide_desktop) && n !== "mobile");
  }
  vars(e = "") {
    const r = this.c, a = [], i = (s, c) => {
      c !== "" && c != null && a.push(`${s}:${c}`);
    };
    i("--a", r.s_accent || ""), i("--a2", r.s_accent2 || ""), i("--bgc", r.s_bg || ""), i("--fgc", r.s_text || ""), i("--cardc", r.s_card || ""), i("--r", `${g(r.s_radius, 22)}px`), i("--gap", `${g(r.s_gap, 18)}px`), i("--ts", `${g(r.s_title_size, 38)}px`), i("--fs", `${g(r.s_text_size, 16)}px`), i("--pt", `${g(r.s_pad_top, 56)}px`), i("--pb", `${g(r.s_pad_bottom, 56)}px`), i("--maxw", pt[x(r.s_width, "normal")] ?? "1240px"), i("--sh", mt[Math.max(0, Math.min(5, g(r.s_shadow, 2)))]), i("--ms", `${g(r.s_anim_ms, 700)}ms`), i("--ov", String(g(r.s_overlay, 45) / 100)), r.s_bg_image && i("--bgimg", `url("${String(r.s_bg_image)}")`);
    const n = bt(x(r.s_font, "inherit"));
    return n && i("font-family", `'${n}', inherit`), a.join(";") + (e ? ";" + e : "");
  }
  cls() {
    const e = this.c;
    return [
      "sec",
      `th-${x(e.s_theme, "auto")}`,
      `al-${x(e.s_align, "start")}`,
      `an-${x(e.s_anim, "rise")}`,
      `pt-${x(e.s_pattern, "none")}`,
      `bs-${x(e.s_btn_style, "pill")}`,
      y(e.s_border) ? "bordered" : "",
      y(e.s_stagger, !0) ? "stagger" : "",
      e.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(e, r = {}, a = "", i = "", n = !0) {
    if (this.hiddenNow()) return R;
    const s = this.c, c = $(s.eyebrow, r.eyebrow ?? ""), f = $(s.title, r.title ?? ""), h = $(s.subtitle, r.sub ?? ""), p = n && y(s.s_show_head, !0) && (c || f || h);
    return d`<section class="${this.cls()} ${a}" style=${this.vars(i)} id=${String(s.s_anchor || "") || R}>
      <div class="wrap">${p ? d`<header class="head">${c ? d`<span class="eyebrow">${c}</span>` : ""}${f ? d`<h2 class="title">${f}</h2>` : ""}${h ? d`<p class="sub">${h}</p>` : ""}</header>` : ""}
      ${e}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(e) {
    const r = e.filter(Boolean);
    return !r.length || !ut() || !y(this.c.s_hints, !0) ? "" : d`<aside class="hints" role="note"><b>💡 ${u("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${r.map((a) => d`<li>${a}</li>`)}</ul></aside>`;
  }
  card(e, r = {}) {
    var a;
    return d`<article class="pc ${e.available ? "" : "oos"}">
      <a class="ph" href=${e.url} @click=${() => N(e)}><img src=${e.image} alt=${e.name} loading="lazy" />${(a = r.badges) != null && a.length ? d`<span class="badges">${r.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e.url} @click=${() => N(e)}>${e.name}</a>
        <div class="pr"><b>${v(e.price)}</b>${e.regular > e.price ? d`<s>${v(e.regular)}</s>` : ""}</div>
        ${r.rating !== !1 && e.rating > 0 ? d`<div class="rt">★ ${e.rating.toFixed(1)}${e.ratingCount ? d` <small>(${e.ratingCount})</small>` : ""}</div>` : ""}
        ${r.extra ?? ""}
        ${r.quick !== !1 ? d`<button class="btn sm" ?disabled=${!e.available} @click=${() => this.add(e)}>${e.available ? u("أضف للسلة", "Add to cart") : u("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(e, r = 1, a) {
    N(e, 3), await Y(e.id, r, a) ? H(u("تمت الإضافة للسلة", "Added to cart")) : location.href = e.url;
  }
};
j.base = O`
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
let A = j;
ft([
  K({ type: Object })
], A.prototype, "config");
async function xt(t, e = "") {
  let r = 0;
  for (const { p: a, q: i } of t) a.available && await Y(a.id, i ?? 1) && r++;
  return e && await rt(e), H(r ? u(`أضفنا ${r} منتج للسلة${e ? " وطبّقنا الكود" : ""}`, `Added ${r} items${e ? " and applied the code" : ""}`) : u("تعذّرت الإضافة", "Could not add"), !!r), r;
}
var vt = Object.defineProperty, J = (t, e, r, a) => {
  for (var i = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (i = s(e, r, i) || i);
  return i && vt(e, r, i), i;
};
const E = class E extends A {
  constructor() {
    super(...arguments), this.pool = [], this.picked = [], this.seq = 0;
  }
  willUpdate(e) {
    if (e.has("config")) {
      const r = ++this.seq;
      et(this.c.products, x(this.c.auto_source, "best_selling"), g(this.c.limit, 12)).then((a) => {
        r === this.seq && (this.pool = ct(a.items, y(this.c.personalize, !0)), this.picked = []);
      });
    }
  }
  render() {
    const e = this.c, r = g(e.count, 3), a = g(e.price, 0), i = g(e.percent, 0), n = this.picked.map((o) => this.pool.find((l) => l.id === o)).filter((o) => !!o), s = n.reduce((o, l) => o + l.price, 0), c = n.length === r, f = c ? a > 0 ? Math.min(a, s) : i ? s * (1 - i / 100) : s : s, h = s - f, p = $(e.offer_label, a > 0 ? u(`أي ${r} بـ ${v(a)}`, `Any ${r} for ${v(a)}`) : u(`اختر ${r} وخذ خصم ${i}%`, `Pick ${r}, get ${i}% off`));
    return this.shell(
      d`${this.hints([
        !e.coupon && u("أنشئ عرضاً في سلة يطابق هذا العرض وضع كوده هنا ليتطبق عند الدفع.", "Create a matching Salla offer and put its code here."),
        a > 0 && this.pool.length >= r && a >= [...this.pool].sort((o, l) => o.price - l.price).slice(0, r).reduce((o, l) => o + l.price, 0) && u("تنبيه: سعر العرض أعلى من مجموع أرخص القطع؛ قد لا يوفّر للعميل.", "Warning: the offer price is above the cheapest combination.")
      ])}
      <div class="top panel"><div><b style="font-size:20px">${p}</b><div class="muted" style="font-size:14px">${c ? u("اكتمل اختيارك 🎉", "All picked 🎉") : u(`اختر ${r - n.length} بعد`, `${r - n.length} more to pick`)}</div></div>
        <div class="slots">${Array.from({ length: r }, (o, l) => d`<div class="sl">${n[l] ? d`<img src=${n[l].image} alt="" />` : l + 1}</div>`)}</div>
        <div class="deal"><b>${v(f)}</b>${h > 0 ? d`<s>${v(s)}</s><small>${u("توفّر", "You save")} ${v(h)}</small>` : ""}</div>
        <button class="btn" ?disabled=${!c} @click=${() => xt(n.map((o) => ({ p: o })), String(e.coupon || ""))}>${$(e.button, u("أضف العرض للسلة", "Add the offer"))}</button></div>
      <div class="grid" style=${`--cols:${g(e.cols, 4)};--mcols:${g(e.mcols, 2)}`}>${this.pool.map((o) => {
        const l = this.picked.indexOf(o.id);
        return d`<button class="p ${l >= 0 ? "on" : ""}" aria-disabled=${!o.available}
        @click=${() => {
          o.available && (this.picked = l >= 0 ? this.picked.filter((w) => w !== o.id) : this.picked.length < r ? [...this.picked, o.id] : this.picked);
        }}>
        <span class="n">${l >= 0 ? l + 1 : "+"}</span><img src=${o.image} alt="" loading="lazy" /><div>${o.name}<b>${v(o.price)}</b></div></button>`;
      })}</div>`,
      { eyebrow: u("عرض الاختيار الحر", "Mix & match"), title: "" }
    );
  }
};
E.styles = [A.base, O`
    .top { display: flex; gap: 18px; align-items: center; justify-content: space-between; flex-wrap: wrap; margin-bottom: 18px; position: sticky; top: 0; z-index: 2; }
    .slots { display: flex; gap: 8px; } .sl { width: 64px; height: 64px; border-radius: 16px; border: 2px dashed var(--LINE); overflow: hidden; display: grid; place-items: center; font-size: 22px; opacity: .8; background: var(--CARD); }
    .sl img { width: 100%; height: 100%; object-fit: cover; animation: pop .35s; } @keyframes pop { from { transform: scale(.4); } }
    .deal b { font-size: 22px; color: var(--A); } .deal s { opacity: .55; margin-inline-start: 6px; } .deal small { display: block; color: #16a34a; font-weight: 700; }
    .p { all: unset; cursor: pointer; border-radius: var(--r); overflow: hidden; background: var(--CARD); box-shadow: var(--sh); position: relative; border: 2px solid transparent; transition: all .25s; }
    .p.on { border-color: var(--A); } .p img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; } .p div { padding: 10px 12px; font-size: 14px; } .p b { color: var(--A); display: block; }
    .p .n { position: absolute; top: 10px; inset-inline-end: 10px; width: 30px; height: 30px; border-radius: 50%; background: var(--CARD); display: grid; place-items: center; font-weight: 800; box-shadow: 0 4px 10px #0003; } .p.on .n { background: var(--A); color: #fff; }
    .p[aria-disabled=true] { opacity: .45; cursor: not-allowed; }
  `];
let _ = E;
J([
  P()
], _.prototype, "pool");
J([
  P()
], _.prototype, "picked");
typeof _ < "u" && _.registerSallaComponent("salla-taqm-pick");
export {
  _ as default
};
