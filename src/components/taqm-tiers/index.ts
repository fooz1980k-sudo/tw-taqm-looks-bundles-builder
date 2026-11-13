import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, t, ids, byIds, smart, money, addToCart, addCoupon, toast, type Prod } from '../../shared/salla';
import { parseTiers, tierFor, nextTier } from '../../shared/bundle';

/** «The more you take, the more you save»: quantity tiers on a real product, with live unit price, total, saving and a nudge to the next tier. */
export default class TaqmTiers extends Smart {
  @state() private p: Prod | null = null;
  @state() private q = 1;
  static styles = [Smart.base, css`
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
  willUpdate(ch: Map<string, unknown>) { if (ch.has('config')) (ids(this.c.product).length ? byIds(ids(this.c.product)) : smart(null, opt(this.c.auto_source, 'best_selling'), 1).then((r) => r.items)).then((l) => { this.p = l[0] ?? null; this.q = num(this.c.start_qty, 1); }); }
  render() {
    const c = this.c; const p = this.p; if (!p) return this.shell(html`<div class="skel"></div>`);
    const tiers = parseTiers(c.tiers).sort((a, b) => a.min - b.min); const tr = tierFor(this.q, tiers); const nx = nextTier(this.q, tiers);
    const unit = p.price * (1 - (tr?.pct ?? 0) / 100); const total = unit * this.q; const save = p.price * this.q - total; const max = Math.min(num(c.max_qty, 20), p.qty ?? 999);
    const go = async () => { if (await addToCart(p.id, this.q)) { if (tr && c.coupon) await addCoupon(String(c.coupon)); toast(t('تمت الإضافة للسلة', 'Added to cart')); } else location.href = p.url; };
    return this.shell(html`${this.hints([tiers.length > 0 && !c.coupon && t('ضع كود الكوبون/العرض الذي أنشأته في سلة ليتطبق الخصم فعلياً.', 'Add the Salla coupon code so the tier discount really applies.')])}
      <div class="g"><a class="img" href=${p.url}><img src=${p.image} alt=${p.name} /></a><div>
        <h3>${p.name}</h3><div class="pr"><b>${money(p.price)}</b>${p.regular > p.price ? html`<s>${money(p.regular)}</s>` : ''} <span class="muted">${t('للقطعة', 'each')}</span></div>
        <div class="tiers">${tiers.map((x) => html`<button class="tr ${tr === x ? 'on' : ''}" @click=${() => (this.q = Math.min(max, x.min))}><small>${t(`${x.min}+ قطع`, `${x.min}+ pcs`)}</small><b>-${x.pct}%</b><small>${money(p.price * (1 - x.pct / 100))} ${t('للقطعة', 'each')}</small></button>`)}</div>
        <div class="acts"><div class="qty"><button @click=${() => (this.q = Math.max(1, this.q - 1))}>−</button><span>${this.q}</span><button @click=${() => (this.q = Math.min(max, this.q + 1))}>+</button></div>
          ${p.qty != null && bool(c.show_stock, true) ? html`<span class="muted">${t(`متوفر ${p.qty}`, `${p.qty} in stock`)}</span>` : ''}</div>
        <div class="calc"><div><span>${t('سعر القطعة', 'Unit price')}</span><b>${money(unit)}</b></div>${save > 0 ? html`<div><span>${t('توفيرك', 'You save')}</span><span class="save">${money(save)}</span></div>` : ''}<div><span>${t('الإجمالي', 'Total')}</span><span class="big">${money(total)}</span></div></div>
        ${nx && bool(c.nudge, true) && nx.min <= max ? html`<div class="nudge">💡 ${t(`أضف ${nx.min - this.q} وينزل سعر القطعة إلى ${money(p.price * (1 - nx.pct / 100))}`, `Add ${nx.min - this.q} more and pay ${money(p.price * (1 - nx.pct / 100))} each`)}</div>` : ''}
        <button class="btn" ?disabled=${!p.available} @click=${go}>${L(c.button, t('أضف للسلة', 'Add to cart'))}</button></div></div>`,
      { eyebrow: t('كل ما زدت وفّرت', 'Buy more, save more'), title: '' });
  }
}
