// Demo-only stand-in for Salla's storefront SDK. SAMPLE products for local screenshots; never shipped (demo/ is export-ignored).
const D = (n) => new Date(Date.now() + n * 864e5).toISOString();
window.__P = {
  101: { id: 101, name: 'عطر عود ملكي 100 مل', image: { url: 'img/perfume-featured.webp' }, price: 450, sale_price: 380, regular_price: 450, rating: { stars: 4.9, count: 180 }, quantity: 4, sold_quantity: 312, discount_ends: D(3), category: { name: 'عطور' } },
  102: { id: 102, name: 'عطر الذهب الشرقي', image: { url: 'img/perfume-bestsellers.webp' }, price: 320, regular_price: 320, rating: { stars: 4.7, count: 241 }, quantity: 25, sold_quantity: 540, category: { name: 'عطور' } },
  103: { id: 103, name: 'مبخرة مع بخور فاخر', image: { url: 'img/perfume-bundle.webp' }, price: 190, sale_price: 150, regular_price: 190, rating: { stars: 4.6, count: 77 }, quantity: 0, is_available: false, sold_quantity: 128, category: { name: 'بخور' } },
  104: { id: 104, name: 'باليت ظلال الغروب', image: { url: 'img/c1.jpg' }, price: 145, regular_price: 145, rating: { stars: 4.4, count: 33 }, quantity: 12, sold_quantity: 96, category: { name: 'مكياج' } },
  105: { id: 105, name: 'زيت الشعر الطبيعي', image: { url: 'img/c2.jpg' }, price: 89, regular_price: 89, rating: { stars: 4.6, count: 98 }, quantity: 60, sold_quantity: 410, category: { name: 'عناية' } },
  106: { id: 106, name: 'طقم الحلاقة الكلاسيكي', image: { url: 'img/c3.jpg' }, price: 260, regular_price: 260, rating: { stars: 4.8, count: 52 }, quantity: 7, sold_quantity: 64, category: { name: 'رجال' } },
  107: { id: 107, name: 'مجموعة العناية الخشبية', image: { url: 'img/c4.jpg' }, price: 210, sale_price: 175, regular_price: 210, rating: { stars: 4.5, count: 61 }, quantity: 3, sold_quantity: 88, discount_ends: D(1.4), category: { name: 'عناية' } },
  108: { id: 108, name: 'صندوق هدية مغلّف', image: { url: 'img/c5.jpg' }, price: 120, regular_price: 120, rating: { stars: 4.3, count: 20 }, unlimited_quantity: true, quantity: null, sold_quantity: 205, category: { name: 'هدايا' } },
  109: { id: 109, name: 'سيروم النضارة', image: { url: 'img/hero2.jpg' }, price: 165, regular_price: 165, rating: { stars: 4.5, count: 140 }, quantity: 18, sold_quantity: 276, category: { name: 'عناية' } },
  110: { id: 110, name: 'طقم الهدية الوردي', image: { url: 'img/gifts-featured.webp' }, price: 340, sale_price: 289, regular_price: 340, rating: { stars: 4.9, count: 66 }, quantity: 9, sold_quantity: 150, category: { name: 'هدايا' } },
  111: { id: 111, name: 'باليت المساء', image: { url: 'img/makeup-featured.webp' }, price: 175, regular_price: 175, rating: { stars: 4.2, count: 18 }, quantity: 2, sold_quantity: 41, category: { name: 'مكياج' } },
  112: { id: 112, name: 'مجموعة البشرة اليومية', image: { url: 'img/skincare-featured.webp' }, price: 230, regular_price: 230, rating: { stars: 4.7, count: 88 }, quantity: 30, sold_quantity: 199, category: { name: 'عناية' } },
};
for (const p of Object.values(__P)) { p.url = '#p' + p.id; if (p.is_available === undefined) p.is_available = true; }
const all = () => Object.values(__P);
const bus = {}; const cartState = { items: [] };
const cartData = () => { const items = cartState.items.map((i) => ({ product_id: i.id, quantity: i.quantity })); const total = cartState.items.reduce((s, i) => s + (__P[i.id]?.sale_price || __P[i.id]?.price || 0) * i.quantity, 0); return { data: { cart: { items, sub_total: total, total } } }; };
window.salla = {
  onReady: async () => {}, lang: { get locale() { return document.documentElement.lang || 'ar'; } },
  config: { get: (k) => ({ 'store.name': 'دار الريحان', 'user.first_name': window.__user || '' })[k] },
  money: (n) => `${Number(n).toLocaleString('en')} ${document.documentElement.lang === 'en' ? 'SAR' : 'ر.س'}`,
  success: (m) => console.log('toast', m), error: (m) => console.log('err', m),
  event: { on: (e, f) => ((bus[e] ||= []).push(f)), emit: (e, d) => (bus[e] || []).forEach((f) => f(d)) },
  product: {
    getDetails: async (id) => ({ data: __P[id] }),
    fetch: async ({ source, per_page = 12 }) => {
      let l = all();
      if (source === 'best_selling') l = l.sort((a, b) => b.sold_quantity - a.sold_quantity);
      else if (source === 'offers') l = l.filter((p) => p.sale_price);
      else if (source === 'top-rated') l = l.sort((a, b) => b.rating.stars - a.rating.stars);
      else if (source === 'latest') l = l.slice().reverse();
      return { data: l.slice(0, per_page) };
    },
    search: async ({ query }) => ({ data: all().filter((p) => p.name.includes(query) || p.category.name.includes(query)) }),
    availabilitySubscribe: async () => ({}),
  },
  cart: {
    details: async () => cartData(),
    addItem: async ({ id, quantity = 1 }) => { const f = cartState.items.find((i) => i.id === id); f ? (f.quantity += quantity) : cartState.items.push({ id, quantity }); salla.event.emit('cart::item.added', { data: { product_id: id } }); salla.event.emit('cart::updated', cartData().data.cart); return {}; },
    addCoupon: async () => ({}),
  },
};
