/** Defensive wrappers over the storefront `salla` SDK (shapes differ slightly between themes and versions). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const S = (): any => (window as any).salla ?? (window as any).Salla;
export const ready = async () => { try { await S()?.onReady?.(); } catch { /* preview without SDK */ } };

/** The store language: Salla's own setting first, then the page lang attribute. */
export const storeLocale = (): string => {
  try { const l = S()?.lang?.locale ?? S()?.config?.get?.('user.language_code'); if (typeof l === 'string' && l) return l.slice(0, 2); } catch { /* no SDK */ }
  return (document.documentElement.lang || 'ar').slice(0, 2);
};
export const isEn = () => storeLocale() === 'en';
export const t = (ar: string, en: string) => (isEn() ? en : ar);
export const cfg = (path: string): unknown => { try { return S()?.config?.get?.(path); } catch { return undefined; } };

/** Every merchant text field goes through this: `{ar,en}` (or its JSON string) or a plain string -> one string in the store language. */
export const L = (v: unknown, fallback = ''): string => {
  if (v == null) return fallback;
  if (typeof v === 'string') {
    const s = v.trim();
    if (s.startsWith('{') && s.endsWith('}')) { try { return L(JSON.parse(s), fallback); } catch { /* plain text */ } }
    return s || fallback;
  }
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (typeof v === 'object') {
    const o = v as Record<string, unknown>;
    const pick = o[storeLocale()] ?? o.ar ?? o.en ?? Object.values(o).find((x) => typeof x === 'string' && x);
    return typeof pick === 'string' && pick.trim() ? pick : fallback;
  }
  return fallback;
};
/** Value of a radio-list / dropdown field (arrives as [{value}], {value} or a raw value). */
export const opt = (v: unknown, def = ''): string => {
  const x = Array.isArray(v) ? v[0] : v;
  const val = typeof x === 'object' && x ? (x as { value?: unknown }).value : x;
  return val == null || val === '' ? def : String(val);
};
export const num = (v: unknown, def = 0): number => { const n = Number(v); return v === '' || v == null || !Number.isFinite(n) ? def : n; };
export const bool = (v: unknown, def = false): boolean => (v == null || v === '' ? def : v === true || v === 'true' || v === 1 || v === '1');
export const list = <T = Record<string, unknown>>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
export const csv = (v: unknown): string[] => L(v).split(/[,،\n]/).map((s) => s.trim()).filter(Boolean);

export interface Prod {
  id: number; name: string; url: string; image: string; images: string[]; price: number; regular: number; discount: number;
  rating: number; ratingCount: number; qty: number | null; available: boolean; sold: number | null; endsAt: number | null;
  category: string; brand: string; promo: string;
}
const money0 = (v: unknown): number => { const x = typeof v === 'object' && v ? (v as { amount?: unknown }).amount : v; const n = Number(x); return Number.isFinite(n) ? n : 0; };
const when = (v: unknown): number | null => { if (!v) return null; const n = typeof v === 'number' ? (v < 1e12 ? v * 1000 : v) : Date.parse(String(v).replace(' ', 'T')); return Number.isFinite(n) && n > Date.now() ? n : null; };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalize(p: any): Prod {
  const sale = money0(p?.sale_price); const base = money0(p?.regular_price ?? p?.price);
  const price = sale && sale < base ? sale : money0(p?.price) || base;
  const regular = Math.max(money0(p?.regular_price), money0(p?.price), price);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imgs = (Array.isArray(p?.images) ? p.images : []).map((i: any) => String(i?.url ?? i ?? '')).filter(Boolean);
  const sold = p?.sold_quantity ?? p?.sold;
  return {
    id: Number(p?.id), name: String(p?.name ?? ''), url: String(p?.url ?? '#'),
    image: String(p?.image?.url ?? p?.main_image ?? p?.thumbnail ?? imgs[0] ?? ''), images: imgs,
    price, regular, discount: regular > price ? Math.round((1 - price / regular) * 100) : 0,
    rating: money0(p?.rating?.stars ?? p?.rating?.rate ?? p?.rating), ratingCount: money0(p?.rating?.count),
    qty: p?.quantity == null || p?.unlimited_quantity ? null : money0(p?.quantity),
    available: p?.is_available !== false && p?.status !== 'out' && !(p?.quantity === 0 && !p?.unlimited_quantity),
    sold: sold == null || sold === '' || !Number.isFinite(Number(sold)) ? null : Number(sold),
    endsAt: when(p?.discount_ends ?? p?.sale_end ?? p?.discount_end),
    category: String(p?.category?.name ?? p?.categories?.[0]?.name ?? ''), brand: String(p?.brand?.name ?? ''),
    promo: String(p?.promotion?.title ?? p?.promotion_title ?? ''),
  };
}
/** Ids from a products field (value is [{value,label}] or plain ids). */
export const ids = (sel: unknown): number[] => (Array.isArray(sel) ? sel : []).map((x) => Number(typeof x === 'object' && x ? (x as { value?: unknown }).value : x)).filter((n) => Number.isFinite(n) && n > 0);
const cache = new Map<string, Promise<Prod[]>>();
async function details(id: number): Promise<Prod | null> {
  const p = S()?.product; if (!p) return null;
  const f = p.getDetails ? p.getDetails.bind(p) : p.api?.getDetails?.bind(p.api);
  if (!f) return null;
  try { const r = await f(id, ['images', 'sold_quantity', 'category']); const n = normalize(r?.data ?? r); return n.name ? n : null; } catch { return null; }
}
export async function byIds(list: number[]): Promise<Prod[]> {
  await ready();
  const key = 'ids:' + list.join(',');
  if (!cache.has(key)) cache.set(key, Promise.all(list.map(details)).then((o) => o.filter((x): x is Prod => !!x)));
  return cache.get(key)!;
}
/** A Salla product source: best_selling, latest, offers, top-rated, sales, categories (with values). */
export async function fromSource(source: string, values: number[] = [], limit = 12): Promise<Prod[]> {
  await ready();
  const key = `src:${source}:${values.join(',')}:${limit}`;
  if (!cache.has(key)) {
    cache.set(key, (async () => {
      const p = S()?.product; const f = p?.fetch ? p.fetch.bind(p) : p?.api?.fetch?.bind(p.api);
      if (!f) return [];
      try {
        const q: Record<string, unknown> = { source, per_page: limit }; if (values.length) q.source_value = values;
        const r = await f(q); const arr = Array.isArray(r?.data) ? r.data : Array.isArray(r) ? r : r?.data?.products ?? [];
        return arr.map(normalize).filter((x: Prod) => x.name).slice(0, limit);
      } catch { return []; }
    })());
  }
  return cache.get(key)!;
}
/** Merchant picks win; when the merchant picked nothing the component sets itself up from the store's own data. */
export async function smart(sel: unknown, auto = 'best_selling', limit = 12): Promise<{ items: Prod[]; auto: boolean }> {
  const chosen = ids(sel);
  if (chosen.length) return { items: (await byIds(chosen)).slice(0, limit), auto: false };
  let items = await fromSource(auto, [], limit);
  if (!items.length && auto !== 'latest') items = await fromSource('latest', [], limit);
  return { items, auto: true };
}
export const search = async (q: string): Promise<Prod[]> => {
  await ready();
  try { const r = await S()?.product?.search?.({ query: q }); const arr = Array.isArray(r?.data) ? r.data : r?.data?.products ?? []; return arr.map(normalize).filter((x: Prod) => x.name); } catch { return []; }
};
export const money = (n: number) => { try { const m = S()?.money?.(n); if (m) return String(m); } catch { /* no SDK */ } return `${Math.round(n * 100) / 100} ${t('ر.س', 'SAR')}`; };
export async function addToCart(id: number, quantity = 1, notes?: string) {
  await ready();
  try { await S()?.cart?.addItem?.(notes ? { id, quantity, notes } : { id, quantity }); return true; } catch { return false; }
}
export async function addCoupon(code: string) { if (!code) return false; try { await S()?.cart?.addCoupon?.(code); return true; } catch { return false; } }
export function toast(msg: string, ok = true) { try { (ok ? S()?.success : S()?.error)?.(msg); } catch { /* no SDK */ } }
export interface Cart { total: number; count: number; ids: number[] }
export async function cart(): Promise<Cart | null> {
  await ready();
  try {
    const r = await (S()?.cart?.details ?? S()?.cart?.api?.details)?.call(S()?.cart, null);
    const c = r?.data?.cart ?? r?.data ?? r; if (!c) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = Array.isArray(c.items) ? c.items : [];
    return { total: money0(c.sub_total ?? c.total), count: items.reduce((s, i) => s + money0(i.quantity || 1), 0), ids: items.map((i) => Number(i.product_id ?? i.id)) };
  } catch { return null; }
}
export const on = (ev: string, cb: (...a: unknown[]) => void) => { try { S()?.event?.on?.(ev, cb); } catch { /* no SDK */ } };
export const storeName = () => String(cfg('store.name') ?? '');
export const customerName = () => String(cfg('user.first_name') ?? '').trim();
export const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
/** Arabic text normaliser for matching (diacritics, alef/ya/ta-marbuta variants). */
export const norm = (s: string) => s.toLowerCase().replace(/[\u064B-\u065F\u0670\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي');
export const pct = (n: number) => `${Math.round(n)}٪`.replace('٪', isEn() ? '%' : '٪');
