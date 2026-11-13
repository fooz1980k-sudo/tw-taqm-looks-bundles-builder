import { LitElement as X, nothing as j, html as c, css as O } from "lit";
import { property as Q, state as P } from "lit/decorators.js";
const h = () => window.salla ?? window.Salla, N = async () => {
  var t, r;
  try {
    await ((r = (t = h()) == null ? void 0 : t.onReady) == null ? void 0 : r.call(t));
  } catch {
  }
}, T = () => {
  var t, r, a, n, e;
  try {
    const i = ((r = (t = h()) == null ? void 0 : t.lang) == null ? void 0 : r.locale) ?? ((e = (n = (a = h()) == null ? void 0 : a.config) == null ? void 0 : n.get) == null ? void 0 : e.call(n, "user.language_code"));
    if (typeof i == "string" && i) return i.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, V = () => T() === "en", d = (t, r) => V() ? r : t, _ = (t, r = "") => {
  if (t == null) return r;
  if (typeof t == "string") {
    const a = t.trim();
    if (a.startsWith("{") && a.endsWith("}"))
      try {
        return _(JSON.parse(a), r);
      } catch {
      }
    return a || r;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const a = t, n = a[T()] ?? a.ar ?? a.en ?? Object.values(a).find((e) => typeof e == "string" && e);
    return typeof n == "string" && n.trim() ? n : r;
  }
  return r;
}, x = (t, r = "") => {
  const a = Array.isArray(t) ? t[0] : t, n = typeof a == "object" && a ? a.value : a;
  return n == null || n === "" ? r : String(n);
}, g = (t, r = 0) => {
  const a = Number(t);
  return t === "" || t == null || !Number.isFinite(a) ? r : a;
}, v = (t, r = !1) => t == null || t === "" ? r : t === !0 || t === "true" || t === 1 || t === "1", b = (t) => {
  const r = typeof t == "object" && t ? t.amount : t, a = Number(r);
  return Number.isFinite(a) ? a : 0;
}, Z = (t) => {
  if (!t) return null;
  const r = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(r) && r > Date.now() ? r : null;
};
function Y(t) {
  var l, p, u, f, o, $, A, I, F;
  const r = b(t == null ? void 0 : t.sale_price), a = b((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), n = r && r < a ? r : b(t == null ? void 0 : t.price) || a, e = Math.max(b(t == null ? void 0 : t.regular_price), b(t == null ? void 0 : t.price), n), i = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((C) => String((C == null ? void 0 : C.url) ?? C ?? "")).filter(Boolean), s = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((l = t == null ? void 0 : t.image) == null ? void 0 : l.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? i[0] ?? ""),
    images: i,
    price: n,
    regular: e,
    discount: e > n ? Math.round((1 - n / e) * 100) : 0,
    rating: b(((p = t == null ? void 0 : t.rating) == null ? void 0 : p.stars) ?? ((u = t == null ? void 0 : t.rating) == null ? void 0 : u.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: b((f = t == null ? void 0 : t.rating) == null ? void 0 : f.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : b(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: s == null || s === "" || !Number.isFinite(Number(s)) ? null : Number(s),
    endsAt: Z((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((o = t == null ? void 0 : t.category) == null ? void 0 : o.name) ?? ((A = ($ = t == null ? void 0 : t.categories) == null ? void 0 : $[0]) == null ? void 0 : A.name) ?? ""),
    brand: String(((I = t == null ? void 0 : t.brand) == null ? void 0 : I.name) ?? ""),
    promo: String(((F = t == null ? void 0 : t.promotion) == null ? void 0 : F.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const z = (t) => (Array.isArray(t) ? t : []).map((r) => Number(typeof r == "object" && r ? r.value : r)).filter((r) => Number.isFinite(r) && r > 0), y = /* @__PURE__ */ new Map();
async function tt(t) {
  var n, e, i;
  const r = (n = h()) == null ? void 0 : n.product;
  if (!r) return null;
  const a = r.getDetails ? r.getDetails.bind(r) : (i = (e = r.api) == null ? void 0 : e.getDetails) == null ? void 0 : i.bind(r.api);
  if (!a) return null;
  try {
    const s = await a(t, ["images", "sold_quantity", "category"]), l = Y((s == null ? void 0 : s.data) ?? s);
    return l.name ? l : null;
  } catch {
    return null;
  }
}
async function U(t) {
  await N();
  const r = "ids:" + t.join(",");
  return y.has(r) || y.set(r, Promise.all(t.map(tt)).then((a) => a.filter((n) => !!n))), y.get(r);
}
async function R(t, r = [], a = 12) {
  await N();
  const n = `src:${t}:${r.join(",")}:${a}`;
  return y.has(n) || y.set(n, (async () => {
    var s, l, p, u;
    const e = (s = h()) == null ? void 0 : s.product, i = e != null && e.fetch ? e.fetch.bind(e) : (p = (l = e == null ? void 0 : e.api) == null ? void 0 : l.fetch) == null ? void 0 : p.bind(e.api);
    if (!i) return [];
    try {
      const f = { source: t, per_page: a };
      r.length && (f.source_value = r);
      const o = await i(f);
      return (Array.isArray(o == null ? void 0 : o.data) ? o.data : Array.isArray(o) ? o : ((u = o == null ? void 0 : o.data) == null ? void 0 : u.products) ?? []).map(Y).filter((A) => A.name).slice(0, a);
    } catch {
      return [];
    }
  })()), y.get(n);
}
async function rt(t, r = "best_selling", a = 12) {
  const n = z(t);
  if (n.length) return { items: (await U(n)).slice(0, a), auto: !1 };
  let e = await R(r, [], a);
  return !e.length && r !== "latest" && (e = await R("latest", [], a)), { items: e, auto: !0 };
}
const m = (t) => {
  var r, a;
  try {
    const n = (a = (r = h()) == null ? void 0 : r.money) == null ? void 0 : a.call(r, t);
    if (n) return String(n);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${d("ر.س", "SAR")}`;
};
async function W(t, r = 1, a) {
  var n, e, i;
  await N();
  try {
    return await ((i = (e = (n = h()) == null ? void 0 : n.cart) == null ? void 0 : e.addItem) == null ? void 0 : i.call(e, a ? { id: t, quantity: r, notes: a } : { id: t, quantity: r })), !0;
  } catch {
    return !1;
  }
}
async function at(t) {
  var r, a, n;
  if (!t) return !1;
  try {
    return await ((n = (a = (r = h()) == null ? void 0 : r.cart) == null ? void 0 : a.addCoupon) == null ? void 0 : n.call(a, t)), !0;
  } catch {
    return !1;
  }
}
function H(t, r = !0) {
  var a, n, e;
  try {
    (e = r ? (a = h()) == null ? void 0 : a.success : (n = h()) == null ? void 0 : n.error) == null || e(t);
  } catch {
  }
}
const et = (t, r) => {
  var a, n, e;
  try {
    (e = (n = (a = h()) == null ? void 0 : a.event) == null ? void 0 : n.on) == null || e.call(n, t, r);
  } catch {
  }
}, q = "tw_smart_mem_v1", B = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function J() {
  try {
    return { ...B(), ...JSON.parse(localStorage.getItem(q) || "{}") };
  } catch {
    return B();
  }
}
function nt(t) {
  try {
    localStorage.setItem(q, JSON.stringify(t));
  } catch {
  }
}
function D(t) {
  const r = J();
  return t(r), nt(r), r;
}
function it() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(q), sessionStorage.setItem(q, "1");
  } catch {
  }
  return t ? D((r) => {
    r.visits += 1, r.last = Date.now();
  }) : J();
}
const S = (t, r = 1) => D((a) => {
  a.seen[t.id] = (a.seen[t.id] || 0) + r, a.prices = [...a.prices.slice(-29), t.price], t.category && (a.tags[t.category] = (a.tags[t.category] || 0) + r);
});
let M = !1;
function st() {
  M || (M = !0, et("cart::item.added", (t) => {
    var a;
    const r = Number(((a = t == null ? void 0 : t.data) == null ? void 0 : a.product_id) ?? 0);
    r && D((n) => {
      n.carted.includes(r) || (n.carted = [...n.carted.slice(-40), r]);
    });
  }));
}
const ot = () => {
  const t = innerWidth, r = navigator.userAgent;
  return /iPad|Tablet/i.test(r) || t >= 700 && t < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(r) || t < 700 ? "mobile" : "desktop";
}, ct = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var lt = Object.defineProperty, dt = (t, r, a, n) => {
  for (var e = void 0, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (e = s(r, a, e) || e);
  return e && lt(r, a, e), e;
};
const ut = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, L = /* @__PURE__ */ new Set();
function gt(t) {
  const r = ut[t];
  if (!r || L.has(r)) return r;
  L.add(r);
  const a = document.createElement("link");
  return a.rel = "stylesheet", a.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(r)}:wght@400;500;700;800&display=swap`, document.head.appendChild(a), r;
}
const pt = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, ht = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], E = class E extends X {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), st(), it();
  }
  firstUpdated() {
    if (!("IntersectionObserver" in window)) {
      this.setAttribute("in", "");
      return;
    }
    this.io = new IntersectionObserver((r) => {
      var a;
      r.some((n) => n.isIntersecting) && (this.setAttribute("in", ""), (a = this.io) == null || a.disconnect());
    }, { threshold: 0.12 }), this.io.observe(this);
  }
  disconnectedCallback() {
    var r;
    super.disconnectedCallback(), (r = this.io) == null || r.disconnect();
  }
  /** Hidden by the merchant's schedule or device rule? */
  hiddenNow() {
    const r = this.c, a = Date.now(), n = Date.parse(String(r.s_from || "")), e = Date.parse(String(r.s_to || ""));
    if (Number.isFinite(n) && a < n || Number.isFinite(e) && a > e) return !0;
    const i = ot();
    return !!(v(r.s_hide_mobile) && i === "mobile" || v(r.s_hide_desktop) && i !== "mobile");
  }
  vars(r = "") {
    const a = this.c, n = [], e = (s, l) => {
      l !== "" && l != null && n.push(`${s}:${l}`);
    };
    e("--a", a.s_accent || ""), e("--a2", a.s_accent2 || ""), e("--bgc", a.s_bg || ""), e("--fgc", a.s_text || ""), e("--cardc", a.s_card || ""), e("--r", `${g(a.s_radius, 22)}px`), e("--gap", `${g(a.s_gap, 18)}px`), e("--ts", `${g(a.s_title_size, 38)}px`), e("--fs", `${g(a.s_text_size, 16)}px`), e("--pt", `${g(a.s_pad_top, 56)}px`), e("--pb", `${g(a.s_pad_bottom, 56)}px`), e("--maxw", pt[x(a.s_width, "normal")] ?? "1240px"), e("--sh", ht[Math.max(0, Math.min(5, g(a.s_shadow, 2)))]), e("--ms", `${g(a.s_anim_ms, 700)}ms`), e("--ov", String(g(a.s_overlay, 45) / 100)), a.s_bg_image && e("--bgimg", `url("${String(a.s_bg_image)}")`);
    const i = gt(x(a.s_font, "inherit"));
    return i && e("font-family", `'${i}', inherit`), n.join(";") + (r ? ";" + r : "");
  }
  cls() {
    const r = this.c;
    return [
      "sec",
      `th-${x(r.s_theme, "auto")}`,
      `al-${x(r.s_align, "start")}`,
      `an-${x(r.s_anim, "rise")}`,
      `pt-${x(r.s_pattern, "none")}`,
      `bs-${x(r.s_btn_style, "pill")}`,
      v(r.s_border) ? "bordered" : "",
      v(r.s_stagger, !0) ? "stagger" : "",
      r.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(r, a = {}, n = "", e = "", i = !0) {
    if (this.hiddenNow()) return j;
    const s = this.c, l = _(s.eyebrow, a.eyebrow ?? ""), p = _(s.title, a.title ?? ""), u = _(s.subtitle, a.sub ?? ""), f = i && v(s.s_show_head, !0) && (l || p || u);
    return c`<section class="${this.cls()} ${n}" style=${this.vars(e)} id=${String(s.s_anchor || "") || j}>
      <div class="wrap">${f ? c`<header class="head">${l ? c`<span class="eyebrow">${l}</span>` : ""}${p ? c`<h2 class="title">${p}</h2>` : ""}${u ? c`<p class="sub">${u}</p>` : ""}</header>` : ""}
      ${r}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(r) {
    const a = r.filter(Boolean);
    return !a.length || !ct() || !v(this.c.s_hints, !0) ? "" : c`<aside class="hints" role="note"><b>💡 ${d("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${a.map((n) => c`<li>${n}</li>`)}</ul></aside>`;
  }
  card(r, a = {}) {
    var n;
    return c`<article class="pc ${r.available ? "" : "oos"}">
      <a class="ph" href=${r.url} @click=${() => S(r)}><img src=${r.image} alt=${r.name} loading="lazy" />${(n = a.badges) != null && n.length ? c`<span class="badges">${a.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${r.url} @click=${() => S(r)}>${r.name}</a>
        <div class="pr"><b>${m(r.price)}</b>${r.regular > r.price ? c`<s>${m(r.regular)}</s>` : ""}</div>
        ${a.rating !== !1 && r.rating > 0 ? c`<div class="rt">★ ${r.rating.toFixed(1)}${r.ratingCount ? c` <small>(${r.ratingCount})</small>` : ""}</div>` : ""}
        ${a.extra ?? ""}
        ${a.quick !== !1 ? c`<button class="btn sm" ?disabled=${!r.available} @click=${() => this.add(r)}>${r.available ? d("أضف للسلة", "Add to cart") : d("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(r, a = 1, n) {
    S(r, 3), await W(r.id, a, n) ? H(d("تمت الإضافة للسلة", "Added to cart")) : location.href = r.url;
  }
};
E.base = O`
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
let k = E;
dt([
  Q({ type: Object })
], k.prototype, "config");
const mt = (t, r) => r.filter((a) => t >= a.min).sort((a, n) => n.pct - a.pct)[0] ?? null, ft = (t, r) => r.filter((a) => t < a.min).sort((a, n) => a.min - n.min)[0] ?? null, bt = (t) => (Array.isArray(t) ? t : []).map((r) => ({ min: g(r.min, 0), pct: g(r.pct, 0) })).filter((r) => r.min > 0 && r.pct > 0);
var xt = Object.defineProperty, K = (t, r, a, n) => {
  for (var e = void 0, i = t.length - 1, s; i >= 0; i--)
    (s = t[i]) && (e = s(r, a, e) || e);
  return e && xt(r, a, e), e;
};
const G = class G extends k {
  constructor() {
    super(...arguments), this.p = null, this.q = 1;
  }
  willUpdate(r) {
    r.has("config") && (z(this.c.product).length ? U(z(this.c.product)) : rt(null, x(this.c.auto_source, "best_selling"), 1).then((a) => a.items)).then((a) => {
      this.p = a[0] ?? null, this.q = g(this.c.start_qty, 1);
    });
  }
  render() {
    const r = this.c, a = this.p;
    if (!a) return this.shell(c`<div class="skel"></div>`);
    const n = bt(r.tiers).sort((o, $) => o.min - $.min), e = mt(this.q, n), i = ft(this.q, n), s = a.price * (1 - ((e == null ? void 0 : e.pct) ?? 0) / 100), l = s * this.q, p = a.price * this.q - l, u = Math.min(g(r.max_qty, 20), a.qty ?? 999), f = async () => {
      await W(a.id, this.q) ? (e && r.coupon && await at(String(r.coupon)), H(d("تمت الإضافة للسلة", "Added to cart"))) : location.href = a.url;
    };
    return this.shell(
      c`${this.hints([n.length > 0 && !r.coupon && d("ضع كود الكوبون/العرض الذي أنشأته في سلة ليتطبق الخصم فعلياً.", "Add the Salla coupon code so the tier discount really applies.")])}
      <div class="g"><a class="img" href=${a.url}><img src=${a.image} alt=${a.name} /></a><div>
        <h3>${a.name}</h3><div class="pr"><b>${m(a.price)}</b>${a.regular > a.price ? c`<s>${m(a.regular)}</s>` : ""} <span class="muted">${d("للقطعة", "each")}</span></div>
        <div class="tiers">${n.map((o) => c`<button class="tr ${e === o ? "on" : ""}" @click=${() => this.q = Math.min(u, o.min)}><small>${d(`${o.min}+ قطع`, `${o.min}+ pcs`)}</small><b>-${o.pct}%</b><small>${m(a.price * (1 - o.pct / 100))} ${d("للقطعة", "each")}</small></button>`)}</div>
        <div class="acts"><div class="qty"><button @click=${() => this.q = Math.max(1, this.q - 1)}>−</button><span>${this.q}</span><button @click=${() => this.q = Math.min(u, this.q + 1)}>+</button></div>
          ${a.qty != null && v(r.show_stock, !0) ? c`<span class="muted">${d(`متوفر ${a.qty}`, `${a.qty} in stock`)}</span>` : ""}</div>
        <div class="calc"><div><span>${d("سعر القطعة", "Unit price")}</span><b>${m(s)}</b></div>${p > 0 ? c`<div><span>${d("توفيرك", "You save")}</span><span class="save">${m(p)}</span></div>` : ""}<div><span>${d("الإجمالي", "Total")}</span><span class="big">${m(l)}</span></div></div>
        ${i && v(r.nudge, !0) && i.min <= u ? c`<div class="nudge">💡 ${d(`أضف ${i.min - this.q} وينزل سعر القطعة إلى ${m(a.price * (1 - i.pct / 100))}`, `Add ${i.min - this.q} more and pay ${m(a.price * (1 - i.pct / 100))} each`)}</div>` : ""}
        <button class="btn" ?disabled=${!a.available} @click=${f}>${_(r.button, d("أضف للسلة", "Add to cart"))}</button></div></div>`,
      { eyebrow: d("كل ما زدت وفّرت", "Buy more, save more"), title: "" }
    );
  }
};
G.styles = [k.base, O`
    .g { display: grid; grid-template-columns: 1fr 1.1fr; gap: calc(var(--gap) * 1.6); align-items: center; } @media (max-width: 860px) { .g { grid-template-columns: 1fr; } }
    .img { border-radius: var(--r); overflow: hidden; box-shadow: var(--sh); } .img img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
    h3 { margin: 0 0 6px; font-size: clamp(22px, 2.6vw, 32px); }
    .tiers { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; margin: 18px 0; }
    .tr { all: unset; cursor: pointer; text-align: center; padding: 14px 8px; border-radius: 16px; border: 2px solid var(--LINE); background: var(--CARD); transition: all .25s; }
    .tr.on { border-color: var(--A); background: color-mix(in srgb, var(--A) 12%, var(--CARD)); transform: translateY(-3px); } .tr b { display: block; font-size: 22px; color: var(--A); } .tr small { opacity: .7; }
    .qty { display: inline-flex; align-items: center; border: 2px solid var(--LINE); border-radius: 999px; overflow: hidden; } .qty button { all: unset; cursor: pointer; width: 46px; height: 46px; display: grid; place-items: center; font-size: 22px; } .qty span { min-width: 44px; text-align: center; font-weight: 800; font-size: 18px; }
    .calc { display: grid; gap: 6px; margin: 18px 0; } .calc div { display: flex; justify-content: space-between; } .calc .big { font-size: 26px; font-weight: 900; color: var(--A); } .save { color: #16a34a; font-weight: 800; }
    .nudge { padding: 10px 14px; border-radius: 12px; background: color-mix(in srgb, var(--A) 10%, transparent); font-size: 14px; margin-bottom: 14px; }
    .acts { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
  `];
let w = G;
K([
  P()
], w.prototype, "p");
K([
  P()
], w.prototype, "q");
typeof w < "u" && w.registerSallaComponent("salla-taqm-tiers");
export {
  w as default
};
