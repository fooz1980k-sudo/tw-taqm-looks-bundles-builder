import { on, type Prod } from './salla';
/**
 * On-device shopper memory. Everything here is what THIS visitor really did in this browser
 * (visits, products they opened or added from our components, answers they gave). Nothing is
 * sent anywhere and nothing is invented; components use it only to re-order real products.
 */
const K = 'tw_smart_mem_v1';
export interface Mem { first: number; last: number; visits: number; srcFirst: string; srcLast: string; seen: Record<string, number>; carted: number[]; prices: number[]; tags: Record<string, number>; answers: Record<string, string>; avail: Record<string, boolean>; dismissed: Record<string, number> }
const blank = (): Mem => ({ first: Date.now(), last: 0, visits: 0, srcFirst: '', srcLast: '', seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
export function mem(): Mem { try { return { ...blank(), ...JSON.parse(localStorage.getItem(K) || '{}') }; } catch { return blank(); } }
export function save(m: Mem) { try { localStorage.setItem(K, JSON.stringify(m)); } catch { /* private mode */ } }
export function update(f: (m: Mem) => void) { const m = mem(); f(m); save(m); return m; }
/** Counts one visit per browser session; returns the visitor's memory. */
export function visit(): Mem {
  let fresh = false; try { fresh = !sessionStorage.getItem(K); sessionStorage.setItem(K, '1'); } catch { /* ignore */ }
  return fresh ? update((m) => { m.visits += 1; m.last = Date.now(); }) : mem();
}
export const seen = (p: Prod, w = 1) => update((m) => { m.seen[p.id] = (m.seen[p.id] || 0) + w; m.prices = [...m.prices.slice(-29), p.price]; if (p.category) m.tags[p.category] = (m.tags[p.category] || 0) + w; });
export const tag = (t: string, w = 1) => t && update((m) => { m.tags[t] = (m.tags[t] || 0) + w; });
export const answer = (k: string, v: string) => update((m) => { m.answers[k] = v; });
/** The visitor's typical price (median of what they opened), or 0 when we know nothing. */
export function priceBand(): number { const p = [...mem().prices].sort((a, b) => a - b); return p.length >= 3 ? p[Math.floor(p.length / 2)] : 0; }
export function affinity(p: Prod, m = mem()): number {
  let s = (m.seen[p.id] || 0) * 2 + (m.carted.includes(p.id) ? 4 : 0) + (p.category ? (m.tags[p.category] || 0) : 0);
  const band = priceBand(); if (band) s += Math.max(0, 2 - Math.abs(p.price - band) / band * 2);
  return s;
}
/** Stable re-rank: products this visitor showed interest in float up; untouched order otherwise. */
export const rank = (l: Prod[], on_ = true) => { if (!on_) return l; const m = mem(); return l.map((p, i) => ({ p, i, s: affinity(p, m) })).sort((a, b) => b.s - a.s || a.i - b.i).map((x) => x.p); };
let wired = false;
export function wire() { if (wired) return; wired = true; on('cart::item.added', (r: unknown) => { const id = Number((r as { data?: { product_id?: unknown } })?.data?.product_id ?? 0); if (id) update((m) => { if (!m.carted.includes(id)) m.carted = [...m.carted.slice(-40), id]; }); }); }
