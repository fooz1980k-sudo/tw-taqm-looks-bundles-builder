import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, list, t, ids, byIds, smart, money, type Prod } from '../../shared/salla';
import { parseTiers, tierFor, nextTier, addAll } from '../../shared/bundle';
import { rank, seen } from '../../shared/memory';

type R = Record<string, unknown>;
interface Slot { name: string; emoji: string; req: boolean; items: Prod[] }
/** Build-your-set: one pick per slot (e.g. perfume, incense, gift box), a live «look board» of the chosen pieces, live total, tiered set discount and one-tap add-all with the merchant's coupon. */
export default class TaqmBuilder extends Smart {
  @state() private slots: Slot[] = [];
  @state() private pick: (number | null)[] = [];
  @state() private auto = false;
  private seq = 0;
  static styles = [Smart.base, css`
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
  willUpdate(ch: Map<string, unknown>) { if (ch.has('config')) this.load(); }
  private async load() {
    const n = ++this.seq; const c = this.c; let slots: Slot[] = []; let auto = false;
    const raw = list<R>(c.slots).filter((s) => ids(s.products).length);
    if (raw.length) slots = await Promise.all(raw.map(async (s) => ({ name: L(s.name), emoji: L(s.emoji, '✨'), req: bool(s.required, true), items: rank(await byIds(ids(s.products)), bool(c.personalize, true)) })));
    else { auto = true; const pool = (await smart(c.products, opt(c.auto_source, 'best_selling'), 30)).items; const cats = [...new Set(pool.map((p) => p.category).filter(Boolean))].slice(0, num(c.auto_slots, 3));
      slots = cats.map((cat) => ({ name: cat, emoji: '✨', req: false, items: pool.filter((p) => p.category === cat) })); }
    if (n !== this.seq) return;
    this.slots = slots; this.auto = auto;
    this.pick = slots.map((s) => (bool(c.preselect, true) ? s.items.find((p) => p.available)?.id ?? null : null));
  }
  render() {
    const c = this.c; const tiers = parseTiers(c.tiers); const chosen = this.slots.map((s, i) => s.items.find((p) => p.id === this.pick[i])).filter((p): p is Prod => !!p);
    const sub = chosen.reduce((s, p) => s + p.price, 0); const tier = tierFor(chosen.length, tiers); const nxt = nextTier(chosen.length, tiers);
    const disc = tier ? Math.round(sub * tier.pct) / 100 : 0; const missing = this.slots.some((s, i) => s.req && !this.pick[i]);
    const coupon = String(c.coupon || ''); const pos = [[4, 6, '-8deg'], [50, 2, '6deg'], [26, 40, '-2deg'], [2, 52, '10deg'], [52, 50, '-6deg']];
    return this.shell(html`${this.hints([this.auto && t('لم تضف خانات؛ الخانات الآن أقسام متجرك تلقائياً. أضف خانات (عطر، بخور، تغليف...) واربطها بمنتجات.', 'No slots yet: using your categories automatically.'),
        tiers.length > 0 && !coupon && t('أنشئ كوبون أو عرض في سلة بنفس نسبة الخصم وضع الكود هنا ليتطبق تلقائياً.', 'Create a matching coupon in Salla and add it here to apply it automatically.')])}
      ${!this.slots.length ? html`<div class="skel"></div>` : html`<div class="g"><div>${this.slots.map((s, i) => html`<div class="slot">
        <div class="sh"><span class="k">${i + 1}</span>${s.emoji} ${s.name} <small>${s.req ? t('مطلوب', 'required') : t('اختياري', 'optional')}</small>${this.pick[i] ? html`<span class="ok">✓</span>` : ''}</div>
        <div class="opts">${s.items.map((p) => html`<button class="o ${this.pick[i] === p.id ? 'on' : ''}" aria-disabled=${!p.available} @click=${() => { if (!p.available) return; seen(p); this.pick = Object.assign([...this.pick], { [i]: this.pick[i] === p.id && !s.req ? null : p.id }); }}>
          <img src=${p.image} alt="" loading="lazy" /><div>${p.name}<b>${money(p.price)}</b></div></button>`)}</div></div>`)}</div>
      <div class="panel sum"><b>${L(c.summary_title, t('طقمك', 'Your set'))}</b>
        ${bool(c.board, true) ? html`<div class="board">${chosen.length ? chosen.slice(0, 5).map((p, k) => html`<img src=${p.image} alt=${p.name} style=${`left:${pos[k][0]}%;top:${pos[k][1]}%;--r0:${pos[k][2]};transform:rotate(${pos[k][2]})`} />`) : html`<div class="ph">${t('اختر قطعك وشوفها تتجمع هنا', 'Pick your pieces and watch them come together')}</div>`}</div>` : ''}
        ${chosen.map((p) => html`<div class="ln"><span>${p.name}</span><span>${money(p.price)}</span></div>`)}
        ${disc ? html`<div class="ln"><span>${t('خصم الطقم', 'Set discount')} ${tier!.pct}%</span><span class="d">- ${money(disc)}</span></div>` : ''}
        <div class="ln t"><span>${t('الإجمالي', 'Total')}</span><span>${money(sub - disc)}</span></div>
        ${nxt && bool(c.nudge, true) ? html`<div class="tip">💡 ${t(`أضف ${nxt.min - chosen.length} قطعة وخذ خصم ${nxt.pct}%`, `Add ${nxt.min - chosen.length} more for ${nxt.pct}% off`)}</div>` : ''}
        <button class="btn w" ?disabled=${!chosen.length || missing} @click=${() => addAll(chosen.map((p) => ({ p })), coupon)}>${missing ? t('كمّل الخانات المطلوبة', 'Complete required slots') : L(c.button, t('أضف الطقم للسلة', 'Add the set to cart'))}</button>
        ${coupon && disc ? html`<div class="code">${t('الخصم يُطبّق بالكود', 'Applied with code')} <b>${coupon}</b></div>` : ''}</div></div>`}`,
      { eyebrow: t('ركّب طقمك', 'Build your set'), title: t('اختر قطعة من كل خانة… والباقي علينا', 'One piece per slot, we do the rest') });
  }
}
