import { html, svg } from 'lit';
import { bool, num, opt } from './salla';
import { inEditor, today } from './context';
import { OCC, detect, type Occ, type Window_, type Opts } from './seasons';

export const ALL: Occ[] = ['ramadan', 'eid_fitr', 'hajj', 'arafah', 'eid_adha', 'hijri_new_year', 'founding', 'national', 'white_friday', 'payday', 'citizen', 'mothers', 'back_to_school', 'summer', 'winter'];
export const OFF_BY_DEFAULT: Occ[] = ['citizen', 'summer', 'winter', 'hijri_new_year'];
/** Occasions the merchant switched on (o_<id> switches). */
export const enabled = (c: Record<string, unknown>): Occ[] => ALL.filter((id) => bool(c[`o_${id}`], !OFF_BY_DEFAULT.includes(id)));
export const opts = (c: Record<string, unknown>): Opts => ({ payDay: num(c.pay_day, 27), payShift: opt(c.pay_shift, 'before') as Opts['payShift'], school: String(c.school_date || '').slice(0, 10), whiteFridayDays: num(c.wf_days, 7) });
/** The date the engine uses: a preview date set by the merchant (editor only) or ?tw_date=, else today. */
export const now = (c: Record<string, unknown>): Date => { const p = String(c.preview_date || '').slice(0, 10); if (p && (inEditor() || (window as unknown as { __twDemo?: boolean }).__twDemo)) { const d = new Date(p + 'T12:00:00'); if (!isNaN(+d)) return d; } return today(); };
/** Current occasion (or the next one within `lead` days, as «soon»), honouring a manual override. */
export function current(c: Record<string, unknown>): { w: Window_ | null; phase: 'soon' | 'on' | 'last'; day: number; left: number; at: Date } {
  const at = now(c); const en = enabled(c); const o = opts(c); const d = detect(at, en, o);
  const forced = opt(c.override, 'auto') as Occ | 'auto' | 'none';
  if (forced === 'none') return { w: null, phase: 'on', day: 0, left: 0, at };
  if (forced !== 'auto') { const all = detect(at, [forced], o); const w = all.active[0] ?? all.next[0] ?? null; return { w, phase: w ? all.phase(w) : 'on', day: w ? all.dayOf(w) : 0, left: w ? Math.ceil((+w.start - +at) / 864e5) : 0, at }; }
  if (d.active[0]) return { w: d.active[0], phase: d.phase(d.active[0]), day: d.dayOf(d.active[0]), left: 0, at };
  const lead = num(c.lead_days, 14); const nx = d.next.find((x) => (+x.start - +at) / 864e5 <= (OCC[x.id].pri >= 8 ? lead : Math.min(lead, 5)));
  return nx ? { w: nx, phase: 'soon', day: 0, left: Math.ceil((+nx.start - +at) / 864e5), at } : { w: null, phase: 'on', day: 0, left: 0, at };
}
/** Hand-made SVG decorations per occasion (no images to load). */
export function decor(id: Occ | undefined, cls = 'deco') {
  const gold = 'var(--o2, #d9b25f)';
  if (id === 'ramadan' || id === 'hajj' || id === 'arafah' || id === 'hijri_new_year')
    return html`<svg class=${cls} viewBox="0 0 400 220" aria-hidden="true">${[40, 110, 300, 360].map((x, i) => svg`<g transform=${`translate(${x} 0)`} class="sw" style=${`animation-delay:${i * .4}s`}><line x1="0" y1="0" x2="0" y2=${50 + i * 18} stroke=${gold} stroke-width="1.5"/><g transform=${`translate(0 ${50 + i * 18})`}><path d="M-12 0h24l-4 8h-16z" fill=${gold}/><rect x="-10" y="8" width="20" height="30" rx="6" fill=${gold} opacity=".9"/><rect x="-6" y="12" width="12" height="22" rx="4" fill="#fff6d8" opacity=".85"/><path d="M-10 38h20l-4 6h-12z" fill=${gold}/></g></g>`)}
      <path d="M215 40a38 38 0 1 0 30 62 32 32 0 1 1-30-62z" fill=${gold}/><circle cx="262" cy="52" r="3" fill=${gold}/><circle cx="180" cy="30" r="2" fill=${gold}/></svg>`;
  if (id === 'eid_fitr' || id === 'eid_adha' || id === 'mothers')
    return html`<svg class=${cls} viewBox="0 0 400 220" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => svg`<path class="tw" style=${`animation-delay:${(i % 5) * .3}s`} transform=${`translate(${(i * 53) % 390} ${(i * 37) % 200}) scale(${0.5 + (i % 3) * .3})`} d="M0-10l2.6 7.4L10 0l-7.4 2.6L0 10l-2.6-7.4L-10 0l7.4-2.6z" fill=${gold}/>`)}
      ${[60, 330].map((x, i) => svg`<g class="sw" style=${`animation-delay:${i}s`}><line x1=${x} y1="0" x2=${x} y2="70" stroke=${gold}/><circle cx=${x} cy="86" r="16" fill=${i ? '#f28fad' : gold}/></g>`)}</svg>`;
  if (id === 'national' || id === 'founding')
    return html`<svg class=${cls} viewBox="0 0 400 220" aria-hidden="true"><path d="M0 0h400v14c-30 10-50 10-80 0s-50-10-80 0-50 10-80 0-50-10-80 0-50 10-80 0z" fill=${id === 'national' ? '#0b6b43' : '#7a4a22'}/>
      ${Array.from({ length: 9 }, (_, i) => svg`<path class="sw" style=${`animation-delay:${i * .2}s`} transform=${`translate(${20 + i * 45} 14)`} d="M0 0h26l-13 22z" fill=${i % 2 ? (id === 'national' ? '#fff' : '#c8a165') : (id === 'national' ? '#0b6b43' : '#4a2c17')}/>`)}</svg>`;
  if (id === 'white_friday' || id === 'payday' || id === 'citizen')
    return html`<svg class=${cls} viewBox="0 0 400 220" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => svg`<g class="fall" style=${`animation-delay:${i * .5}s;transform-origin:${30 + i * 38}px 0`}><rect x=${20 + i * 38} y=${10 + (i % 4) * 30} width="26" height="16" rx="4" fill=${i % 2 ? gold : 'currentColor'} opacity=".7" transform=${`rotate(${(i % 5) * 12 - 24} ${30 + i * 38} ${18 + (i % 4) * 30})`}/></g>`)}</svg>`;
  return html``;
}
export { OCC };
