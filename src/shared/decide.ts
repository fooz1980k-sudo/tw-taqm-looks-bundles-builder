import { t, money, type Prod } from './salla';
/** Decision maths for فيصل: every metric comes from real product data and is normalised across the products being compared. */
export type Metric = 'price' | 'rating' | 'discount' | 'stock' | 'popular' | 'reviews';
export const METRICS: Metric[] = ['price', 'rating', 'discount', 'popular', 'reviews', 'stock'];
export const mLabel = (m: Metric) => ({ price: t('السعر', 'Price'), rating: t('التقييم', 'Rating'), discount: t('الخصم', 'Discount'), stock: t('التوفر', 'Availability'), popular: t('الطلب عليه', 'Popularity'), reviews: t('عدد المراجعات', 'Reviews') })[m];
const raw = (p: Prod, m: Metric): number | null => m === 'price' ? p.price : m === 'rating' ? (p.rating || null) : m === 'discount' ? p.discount : m === 'stock' ? (p.available ? (p.qty == null ? 100 : Math.min(100, p.qty)) : 0) : m === 'popular' ? p.sold : p.ratingCount || null;
/** 0..1 per metric (1 = best in this set); null when the store has no data for that metric. */
export function norm(list: Prod[], m: Metric): (number | null)[] {
  const v = list.map((p) => raw(p, m)); const xs = v.filter((x): x is number => x != null); if (xs.length < 2) return v.map((x) => (x == null ? null : 1));
  const lo = Math.min(...xs), hi = Math.max(...xs); if (hi === lo) return v.map((x) => (x == null ? null : 1));
  return v.map((x) => (x == null ? null : m === 'price' ? (hi - x) / (hi - lo) : (x - lo) / (hi - lo)));
}
export interface Scored { p: Prod; score: number; parts: Record<Metric, number | null> }
export function score(list: Prod[], w: Partial<Record<Metric, number>>): Scored[] {
  const ns = Object.fromEntries(METRICS.map((m) => [m, norm(list, m)])) as Record<Metric, (number | null)[]>;
  return list.map((p, i) => { let s = 0, tw = 0; const parts = {} as Record<Metric, number | null>;
    for (const m of METRICS) { const x = ns[m][i]; parts[m] = x; const wt = w[m] ?? 0; if (x != null && wt > 0) { s += x * wt; tw += wt; } }
    return { p, score: tw ? Math.round((s / tw) * 100) : 0, parts }; }).sort((a, b) => b.score - a.score);
}
/** Plain-language reason built only from real differences. */
export function reason(win: Scored, rest: Scored[], w: Partial<Record<Metric, number>>): string {
  const lead = METRICS.filter((m) => (w[m] ?? 0) > 0 && win.parts[m] != null).map((m) => ({ m, d: (win.parts[m] ?? 0) - Math.max(0, ...rest.map((r) => r.parts[m] ?? 0)), wt: w[m] ?? 0 }))
    .filter((x) => x.d >= 0).sort((a, b) => b.d * b.wt - a.d * a.wt).slice(0, 2);
  const p = win.p; const bits = lead.map(({ m }) => m === 'price' ? t(`الأقل سعراً (${money(p.price)})`, `lowest price (${money(p.price)})`) : m === 'rating' ? t(`الأعلى تقييماً (${p.rating.toFixed(1)}★)`, `highest rated (${p.rating.toFixed(1)}★)`)
    : m === 'discount' ? t(`أكبر خصم (${p.discount}%)`, `biggest discount (${p.discount}%)`) : m === 'popular' ? t('الأكثر طلباً', 'most ordered') : m === 'reviews' ? t(`الأكثر مراجعات (${p.ratingCount})`, `most reviewed (${p.ratingCount})`) : t('متوفر بكمية أكبر', 'better availability'));
  return bits.length ? t(`لأنه ${bits.join(' و')} حسب أولوياتك`, `Because it has the ${bits.join(' and ')} for your priorities`) : t('الأقرب لأولوياتك', 'Closest to your priorities');
}
