import { addToCart, addCoupon, t, toast, money, num, type Prod } from './salla';
/** Bundle maths shared by طقم components. The discount shown is the merchant's own setting; it is applied at checkout only through the coupon/offer the merchant created in Salla. */
export interface Tier { min: number; pct: number }
export const tierFor = (n: number, tiers: Tier[]) => tiers.filter((x) => n >= x.min).sort((a, b) => b.pct - a.pct)[0] ?? null;
export const nextTier = (n: number, tiers: Tier[]) => tiers.filter((x) => n < x.min).sort((a, b) => a.min - b.min)[0] ?? null;
export const parseTiers = (v: unknown): Tier[] => (Array.isArray(v) ? v : []).map((x) => ({ min: num((x as Record<string, unknown>).min, 0), pct: num((x as Record<string, unknown>).pct, 0) })).filter((x) => x.min > 0 && x.pct > 0);
export async function addAll(items: { p: Prod; q?: number }[], coupon = '') {
  let ok = 0; for (const { p, q } of items) if (p.available && (await addToCart(p.id, q ?? 1))) ok++;
  if (coupon) await addCoupon(coupon);
  toast(ok ? t(`أضفنا ${ok} منتج للسلة${coupon ? ' وطبّقنا الكود' : ''}`, `Added ${ok} items${coupon ? ' and applied the code' : ''}`) : t('تعذّرت الإضافة', 'Could not add'), !!ok);
  return ok;
}
export const fmtSave = (amount: number) => (amount > 0 ? t(`وفّرت ${money(amount)}`, `You save ${money(amount)}`) : '');
