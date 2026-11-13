import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, list, t, ids, byIds, smart, money, type Prod } from '../../shared/salla';
import { addAll } from '../../shared/bundle';

type R = Record<string, unknown>;
interface Row { name: string; items: Prod[] }
/** Outfit stylist: stacked rows the shopper swipes like a mannequin (top, middle, accessory…), a budget the «shuffle» respects, and live total of the combination. */
export default class TaqmOutfit extends Smart {
  @state() private rows: Row[] = [];
  @state() private idx: number[] = [];
  @state() private budget = 0;
  @state() private spin = false;
  private seq = 0;
  static styles = [Smart.base, css`
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
  willUpdate(ch: Map<string, unknown>) { if (ch.has('config')) this.load(); }
  private async load() {
    const n = ++this.seq; const c = this.c; let rows: Row[];
    const raw = list<R>(c.rows).filter((r) => ids(r.products).length);
    if (raw.length) rows = await Promise.all(raw.map(async (r) => ({ name: L(r.name), items: (await byIds(ids(r.products))).filter((p) => p.available) })));
    else { const pool = (await smart(c.products, opt(c.auto_source, 'best_selling'), 30)).items.filter((p) => p.available); rows = [...new Set(pool.map((p) => p.category).filter(Boolean))].slice(0, 3).map((cat) => ({ name: cat, items: pool.filter((p) => p.category === cat) })); }
    rows = rows.filter((r) => r.items.length);
    if (n !== this.seq) return;
    this.rows = rows; this.idx = rows.map(() => 0);
    const maxSum = rows.reduce((s, r) => s + Math.max(...r.items.map((p) => p.price)), 0); this.budget = num(c.default_budget, 0) || Math.ceil(maxSum);
  }
  private shuffle() {
    const tries = 200; let best: number[] | null = null;
    for (let k = 0; k < tries; k++) { const pick = this.rows.map((r) => Math.floor(Math.random() * r.items.length)); const s = pick.reduce((a, i, ri) => a + this.rows[ri].items[i].price, 0); if (s <= this.budget) { best = pick; break; } }
    this.spin = true; setTimeout(() => { if (best) this.idx = best; this.spin = false; }, 260);
  }
  render() {
    const c = this.c; if (!this.rows.length) return this.shell(html`<div class="skel"></div>`);
    const cur = this.rows.map((r, i) => r.items[this.idx[i] % r.items.length]); const total = cur.reduce((s, p) => s + p.price, 0);
    const lo = this.rows.reduce((s, r) => s + Math.min(...r.items.map((p) => p.price)), 0); const hi = this.rows.reduce((s, r) => s + Math.max(...r.items.map((p) => p.price)), 0);
    const step = (i: number, d: number) => (this.idx = Object.assign([...this.idx], { [i]: (this.idx[i] + d + this.rows[i].items.length) % this.rows[i].items.length }));
    return this.shell(html`<div class="g"><div class="stage ${this.spin ? 'spin' : ''}" style=${`--rh:${num(c.row_height, 150)}px`}>${this.rows.map((r, i) => html`<div class="r"><div class="rn">${r.name}</div>
        <button class="nav" aria-label="prev" @click=${() => step(i, -1)}>‹</button><a class="pic" href=${cur[i].url}><img src=${cur[i].image} alt=${cur[i].name} /><span>${cur[i].name}<b>${money(cur[i].price)}</b></span></a><button class="nav" aria-label="next" @click=${() => step(i, 1)}>›</button></div>`)}</div>
      <div class="side"><h3>${L(c.side_title, t('نسّقها على ذوقك', 'Style it your way'))}</h3><p class="muted">${L(c.side_text, t('قلّب كل صف، أو خلّ «نسّق لي» يختار تشكيلة ضمن ميزانيتك.', 'Flip each row, or let «Style me» pick within your budget.'))}</p>
        <div class="tot">${money(total)}</div>${total > this.budget ? html`<div class="over">${t('فوق ميزانيتك بـ', 'Over budget by')} ${money(total - this.budget)}</div>` : ''}
        ${bool(c.show_budget, true) ? html`<label class="muted">${t('ميزانيتك', 'Your budget')}: <b>${money(this.budget)}</b></label><input type="range" min=${Math.floor(lo)} max=${Math.ceil(hi)} .value=${String(this.budget)} @input=${(e: Event) => (this.budget = +(e.target as HTMLInputElement).value)} />` : ''}
        <div class="acts"><button class="btn ghost" @click=${this.shuffle}>🎲 ${L(c.shuffle_text, t('نسّق لي', 'Style me'))}</button><button class="btn" @click=${() => addAll(cur.map((p) => ({ p })), String(c.coupon || ''))}>${L(c.button, t('أضف التنسيق للسلة', 'Add this look'))}</button></div></div></div>`,
      { eyebrow: t('منسّق الإطلالة', 'Look stylist'), title: '' });
  }
}
