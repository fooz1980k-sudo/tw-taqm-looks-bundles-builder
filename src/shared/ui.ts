import { css, html, LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { L, opt, num, bool, money, t, type Prod, addToCart, toast } from './salla';
import { inEditor, device } from './context';
import { seen, wire, visit } from './memory';

type C = Record<string, unknown>;
const FONTS: Record<string, string> = { tajawal: 'Tajawal', cairo: 'Cairo', almarai: 'Almarai', plex: 'IBM Plex Sans Arabic', messiri: 'El Messiri', readex: 'Readex Pro', kufi: 'Noto Kufi Arabic', amiri: 'Amiri', rubik: 'Rubik' };
const loaded = new Set<string>();
function font(k: string) {
  const f = FONTS[k]; if (!f || loaded.has(f)) return f; loaded.add(f);
  const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f)}:wght@400;500;700;800&display=swap`; document.head.appendChild(l);
  return f;
}
const WIDTH: Record<string, string> = { narrow: '960px', normal: '1240px', wide: '1440px', full: '100%' };
const SH = ['none', '0 6px 18px -12px #0003', '0 14px 34px -20px #0004', '0 22px 50px -26px #0005', '0 30px 70px -30px #0007', '0 40px 90px -30px #0009'];

/**
 * Base element for every smart component: reads the shared design settings (theme, colours, font,
 * spacing, motion, schedule, device visibility) and renders the section shell and header.
 */
export class Smart extends LitElement {
  @property({ type: Object }) config?: C;
  protected get c(): C { return this.config ?? {}; }
  connectedCallback() { super.connectedCallback(); wire(); visit(); }
  private io?: IntersectionObserver;
  firstUpdated() {
    if (!('IntersectionObserver' in window)) { this.setAttribute('in', ''); return; }
    this.io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { this.setAttribute('in', ''); this.io?.disconnect(); } }, { threshold: 0.12 });
    this.io.observe(this);
  }
  disconnectedCallback() { super.disconnectedCallback(); this.io?.disconnect(); }
  /** Hidden by the merchant's schedule or device rule? */
  protected hiddenNow(): boolean {
    const c = this.c; const now = Date.now();
    const from = Date.parse(String(c.s_from || '')); const to = Date.parse(String(c.s_to || ''));
    if (Number.isFinite(from) && now < from) return true; if (Number.isFinite(to) && now > to) return true;
    const d = device(); if (bool(c.s_hide_mobile) && d === 'mobile') return true; if (bool(c.s_hide_desktop) && d !== 'mobile') return true;
    return false;
  }
  protected vars(extra = ''): string {
    const c = this.c; const v: string[] = [];
    const set = (k: string, val: unknown) => { if (val !== '' && val != null) v.push(`${k}:${val}`); };
    set('--a', c.s_accent || ''); set('--a2', c.s_accent2 || ''); set('--bgc', c.s_bg || ''); set('--fgc', c.s_text || ''); set('--cardc', c.s_card || '');
    set('--r', `${num(c.s_radius, 22)}px`); set('--gap', `${num(c.s_gap, 18)}px`); set('--ts', `${num(c.s_title_size, 38)}px`); set('--fs', `${num(c.s_text_size, 16)}px`);
    set('--pt', `${num(c.s_pad_top, 56)}px`); set('--pb', `${num(c.s_pad_bottom, 56)}px`); set('--maxw', WIDTH[opt(c.s_width, 'normal')] ?? '1240px');
    set('--sh', SH[Math.max(0, Math.min(5, num(c.s_shadow, 2)))]); set('--ms', `${num(c.s_anim_ms, 700)}ms`); set('--ov', String(num(c.s_overlay, 45) / 100));
    if (c.s_bg_image) set('--bgimg', `url("${String(c.s_bg_image)}")`);
    const f = font(opt(c.s_font, 'inherit')); if (f) set('font-family', `'${f}', inherit`);
    return v.join(';') + (extra ? ';' + extra : '');
  }
  protected cls(): string {
    const c = this.c;
    return ['sec', `th-${opt(c.s_theme, 'auto')}`, `al-${opt(c.s_align, 'start')}`, `an-${opt(c.s_anim, 'rise')}`, `pt-${opt(c.s_pattern, 'none')}`, `bs-${opt(c.s_btn_style, 'pill')}`,
      bool(c.s_border) ? 'bordered' : '', bool(c.s_stagger, true) ? 'stagger' : '', c.s_bg_image ? 'has-img' : ''].join(' ');
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  protected shell(body: TemplateResult | typeof nothing, d: { eyebrow?: string; title?: string; sub?: string } = {}, extraCls = '', extraVars = '', head = true): TemplateResult | typeof nothing {
    if (this.hiddenNow()) return nothing;
    const c = this.c; const eb = L(c.eyebrow, d.eyebrow ?? ''); const ti = L(c.title, d.title ?? ''); const su = L(c.subtitle, d.sub ?? '');
    const showHead = head && bool(c.s_show_head, true) && (eb || ti || su);
    return html`<section class="${this.cls()} ${extraCls}" style=${this.vars(extraVars)} id=${String(c.s_anchor || '') || nothing}>
      <div class="wrap">${showHead ? html`<header class="head">${eb ? html`<span class="eyebrow">${eb}</span>` : ''}${ti ? html`<h2 class="title">${ti}</h2>` : ''}${su ? html`<p class="sub">${su}</p>` : ''}</header>` : ''}
      ${body}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  protected hints(items: (string | false | null | undefined)[]): TemplateResult | string {
    const list = items.filter(Boolean) as string[];
    if (!list.length || !inEditor() || !bool(this.c.s_hints, true)) return '';
    return html`<aside class="hints" role="note"><b>💡 ${t('مساعد الإعداد (يظهر لك فقط)', 'Setup assistant (only you see this)')}</b><ul>${list.map((x) => html`<li>${x}</li>`)}</ul></aside>`;
  }
  protected card(p: Prod, o: { badges?: TemplateResult[]; quick?: boolean; rating?: boolean; extra?: TemplateResult | string } = {}) {
    return html`<article class="pc ${p.available ? '' : 'oos'}">
      <a class="ph" href=${p.url} @click=${() => seen(p)}><img src=${p.image} alt=${p.name} loading="lazy" />${o.badges?.length ? html`<span class="badges">${o.badges}</span>` : ''}</a>
      <div class="pb"><a class="pn" href=${p.url} @click=${() => seen(p)}>${p.name}</a>
        <div class="pr"><b>${money(p.price)}</b>${p.regular > p.price ? html`<s>${money(p.regular)}</s>` : ''}</div>
        ${o.rating !== false && p.rating > 0 ? html`<div class="rt">★ ${p.rating.toFixed(1)}${p.ratingCount ? html` <small>(${p.ratingCount})</small>` : ''}</div>` : ''}
        ${o.extra ?? ''}
        ${o.quick !== false ? html`<button class="btn sm" ?disabled=${!p.available} @click=${() => this.add(p)}>${p.available ? t('أضف للسلة', 'Add to cart') : t('نفدت الكمية', 'Sold out')}</button>` : ''}
      </div></article>`;
  }
  protected async add(p: Prod, q = 1, notes?: string) { seen(p, 3); const ok = await addToCart(p.id, q, notes); if (ok) toast(t('تمت الإضافة للسلة', 'Added to cart')); else location.href = p.url; }
  static base = css`
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
}
