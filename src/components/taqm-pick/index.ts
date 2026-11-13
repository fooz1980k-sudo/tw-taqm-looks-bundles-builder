import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, t, smart, money, type Prod } from '../../shared/salla';
import { addAll } from '../../shared/bundle';
import { rank } from '../../shared/memory';

/** «Any N for X»: the shopper fills N slots from a pool; the real saving versus the items' own prices is shown live. */
export default class TaqmPick extends Smart {
  @state() private pool: Prod[] = [];
  @state() private picked: number[] = [];
  private seq = 0;
  static styles = [Smart.base, css`
    .top { display: flex; gap: 18px; align-items: center; justify-content: space-between; flex-wrap: wrap; margin-bottom: 18px; position: sticky; top: 0; z-index: 2; }
    .slots { display: flex; gap: 8px; } .sl { width: 64px; height: 64px; border-radius: 16px; border: 2px dashed var(--LINE); overflow: hidden; display: grid; place-items: center; font-size: 22px; opacity: .8; background: var(--CARD); }
    .sl img { width: 100%; height: 100%; object-fit: cover; animation: pop .35s; } @keyframes pop { from { transform: scale(.4); } }
    .deal b { font-size: 22px; color: var(--A); } .deal s { opacity: .55; margin-inline-start: 6px; } .deal small { display: block; color: #16a34a; font-weight: 700; }
    .p { all: unset; cursor: pointer; border-radius: var(--r); overflow: hidden; background: var(--CARD); box-shadow: var(--sh); position: relative; border: 2px solid transparent; transition: all .25s; }
    .p.on { border-color: var(--A); } .p img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; } .p div { padding: 10px 12px; font-size: 14px; } .p b { color: var(--A); display: block; }
    .p .n { position: absolute; top: 10px; inset-inline-end: 10px; width: 30px; height: 30px; border-radius: 50%; background: var(--CARD); display: grid; place-items: center; font-weight: 800; box-shadow: 0 4px 10px #0003; } .p.on .n { background: var(--A); color: #fff; }
    .p[aria-disabled=true] { opacity: .45; cursor: not-allowed; }
  `];
  willUpdate(ch: Map<string, unknown>) { if (ch.has('config')) { const n = ++this.seq; smart(this.c.products, opt(this.c.auto_source, 'best_selling'), num(this.c.limit, 12)).then((r) => { if (n === this.seq) { this.pool = rank(r.items, bool(this.c.personalize, true)); this.picked = []; } }); } }
  render() {
    const c = this.c; const N = num(c.count, 3); const price = num(c.price, 0); const pct = num(c.percent, 0);
    const chosen = this.picked.map((id) => this.pool.find((p) => p.id === id)).filter((p): p is Prod => !!p);
    const sum = chosen.reduce((s, p) => s + p.price, 0); const full = chosen.length === N;
    const deal = full ? (price > 0 ? Math.min(price, sum) : pct ? sum * (1 - pct / 100) : sum) : sum; const save = sum - deal;
    const label = L(c.offer_label, price > 0 ? t(`أي ${N} بـ ${money(price)}`, `Any ${N} for ${money(price)}`) : t(`اختر ${N} وخذ خصم ${pct}%`, `Pick ${N}, get ${pct}% off`));
    return this.shell(html`${this.hints([!c.coupon && t('أنشئ عرضاً في سلة يطابق هذا العرض وضع كوده هنا ليتطبق عند الدفع.', 'Create a matching Salla offer and put its code here.'),
        price > 0 && this.pool.length >= N && price >= [...this.pool].sort((a, b) => a.price - b.price).slice(0, N).reduce((s, p) => s + p.price, 0) && t('تنبيه: سعر العرض أعلى من مجموع أرخص القطع؛ قد لا يوفّر للعميل.', 'Warning: the offer price is above the cheapest combination.')])}
      <div class="top panel"><div><b style="font-size:20px">${label}</b><div class="muted" style="font-size:14px">${full ? t('اكتمل اختيارك 🎉', 'All picked 🎉') : t(`اختر ${N - chosen.length} بعد`, `${N - chosen.length} more to pick`)}</div></div>
        <div class="slots">${Array.from({ length: N }, (_, i) => html`<div class="sl">${chosen[i] ? html`<img src=${chosen[i].image} alt="" />` : i + 1}</div>`)}</div>
        <div class="deal"><b>${money(deal)}</b>${save > 0 ? html`<s>${money(sum)}</s><small>${t('توفّر', 'You save')} ${money(save)}</small>` : ''}</div>
        <button class="btn" ?disabled=${!full} @click=${() => addAll(chosen.map((p) => ({ p })), String(c.coupon || ''))}>${L(c.button, t('أضف العرض للسلة', 'Add the offer'))}</button></div>
      <div class="grid" style=${`--cols:${num(c.cols, 4)};--mcols:${num(c.mcols, 2)}`}>${this.pool.map((p) => { const k = this.picked.indexOf(p.id); return html`<button class="p ${k >= 0 ? 'on' : ''}" aria-disabled=${!p.available}
        @click=${() => { if (!p.available) return; this.picked = k >= 0 ? this.picked.filter((x) => x !== p.id) : this.picked.length < N ? [...this.picked, p.id] : this.picked; }}>
        <span class="n">${k >= 0 ? k + 1 : '+'}</span><img src=${p.image} alt="" loading="lazy" /><div>${p.name}<b>${money(p.price)}</b></div></button>`; })}</div>`,
      { eyebrow: t('عرض الاختيار الحر', 'Mix & match'), title: '' });
  }
}
