import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, t, ids, byIds, smart, money, type Prod } from '../../shared/salla';
import { addAll } from '../../shared/bundle';
import { rank } from '../../shared/memory';

/** Frequently-paired set: a main product plus add-ons the shopper ticks; the add-ons auto-rank by price harmony with the main product and by the shopper's interest. */
export default class TaqmTogether extends Smart {
  @state() private main: Prod | null = null;
  @state() private adds: Prod[] = [];
  @state() private on: number[] = [];
  private seq = 0;
  static styles = [Smart.base, css`
    .row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; justify-content: center; margin-bottom: 22px; }
    .it { width: clamp(120px, 15vw, 170px); text-align: center; position: relative; transition: opacity .3s; } .it.off { opacity: .35; }
    .it img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 20px; box-shadow: var(--sh); } .it .main-b { position: absolute; top: 8px; inset-inline-start: 8px; }
    .plus { font-size: 26px; opacity: .45; font-weight: 300; }
    .lst { display: grid; gap: 8px; max-width: 640px; margin: 0 auto; } label.l { display: flex; gap: 12px; align-items: center; padding: 10px 14px; border-radius: 14px; background: var(--CARD); cursor: pointer; box-shadow: var(--sh); }
    label.l input { width: 20px; height: 20px; accent-color: var(--A); } label.l span { flex: 1; } label.l s { opacity: .5; font-size: 13px; margin-inline-end: 6px; }
    .tot { display: flex; justify-content: space-between; align-items: center; gap: 12px; max-width: 640px; margin: 16px auto 0; flex-wrap: wrap; } .tot b { font-size: 24px; color: var(--A); }
    .save { color: #16a34a; font-weight: 700; font-size: 14px; }
  `];
  willUpdate(ch: Map<string, unknown>) { if (ch.has('config')) this.load(); }
  private async load() {
    const n = ++this.seq; const c = this.c;
    const main = ids(c.main).length ? (await byIds(ids(c.main)))[0] : (await smart(null, opt(c.auto_source, 'best_selling'), 1)).items[0];
    let adds = ids(c.addons).length ? await byIds(ids(c.addons)) : (await smart(null, opt(c.addon_source, 'best_selling'), 20)).items.filter((p) => p.id !== main?.id && p.available);
    if (main && bool(c.harmony, true) && !ids(c.addons).length) adds = adds.filter((p) => p.price <= main.price * num(c.harmony_ratio, 60) / 100 + 1).concat(adds.filter((p) => p.price > main.price * num(c.harmony_ratio, 60) / 100 + 1));
    adds = rank(adds, bool(c.personalize, true)).slice(0, num(c.limit, 3));
    if (n === this.seq) { this.main = main ?? null; this.adds = adds; this.on = bool(c.preselect, true) ? adds.filter((p) => p.available).map((p) => p.id) : []; }
  }
  render() {
    const c = this.c; const m = this.main; if (!m) return this.shell(html`<div class="skel"></div>`);
    const sel = [m, ...this.adds.filter((p) => this.on.includes(p.id))]; const total = sel.reduce((s, p) => s + p.price, 0); const reg = sel.reduce((s, p) => s + p.regular, 0);
    const pct = num(c.discount, 0); const disc = sel.length > 1 && pct ? Math.round(total * pct) / 100 : 0;
    return this.shell(html`<div class="row">${[m, ...this.adds].map((p, i) => html`${i ? html`<span class="plus">+</span>` : ''}<a class="it ${i && !this.on.includes(p.id) ? 'off' : ''}" href=${p.url}><img src=${p.image} alt=${p.name} loading="lazy" />${i === 0 ? html`<span class="bdg main-b">${t('الأساسي', 'Main')}</span>` : ''}</a>`)}</div>
      <div class="lst">${[m, ...this.adds].map((p, i) => html`<label class="l"><input type="checkbox" ?checked=${i === 0 || this.on.includes(p.id)} ?disabled=${i === 0 || !p.available} @change=${() => (this.on = this.on.includes(p.id) ? this.on.filter((x) => x !== p.id) : [...this.on, p.id])} />
        <span>${i === 0 ? html`<b>${t('هذا المنتج:', 'This item:')}</b> ` : ''}${p.name}</span>${p.regular > p.price ? html`<s>${money(p.regular)}</s>` : ''}<b>${money(p.price)}</b></label>`)}</div>
      <div class="tot"><div>${t('السعر الإجمالي', 'Total price')}: <b>${money(total - disc)}</b> ${reg - total + disc > 0 ? html`<span class="save">· ${t('توفّر', 'save')} ${money(reg - total + disc)}</span>` : ''}</div>
        <button class="btn" @click=${() => addAll(sel.map((p) => ({ p })), disc ? String(c.coupon || '') : '')}>${L(c.button, t(`أضف ${sel.length} للسلة`, `Add ${sel.length} to cart`))}</button></div>`,
      { eyebrow: t('يُشترى معاً', 'Bought together'), title: t('كمّلها صح', 'Complete it right'), sub: '' }, '', '', true);
  }
}
