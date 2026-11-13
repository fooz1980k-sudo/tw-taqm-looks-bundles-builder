// Sample data only.
localStorage.removeItem('tw_smart_mem_v1'); sessionStorage.clear();
const P = (...a) => a.map((value) => ({ value }));
const sr = (el) => el.shadowRoot; const wait = (ms) => new Promise((r) => setTimeout(r, ms));
window.__cfg = {
  'taqm-builder': { config: { slots: [{ emoji: '🌹', name: 'العطر', required: true, products: P(101, 102) }, { emoji: '🔥', name: 'البخور', required: false, products: P(103, 107) }, { emoji: '🎁', name: 'التغليف', required: false, products: P(108, 110) }],
    tiers: [{ min: 2, pct: 5 }, { min: 3, pct: 10 }], coupon: 'SET10' }, },
  'taqm-together': { config: { main: P(101), addons: P(108, 105, 103), discount: 5, coupon: 'TOGETHER5' } },
  'taqm-pick': { config: { products: P(104, 105, 109, 111, 112, 107, 106, 102), count: 3, price: 399, coupon: 'ANY3' }, act: async (el) => { const b = sr(el).querySelectorAll('.p'); b[0].click(); await wait(80); b[2].click(); } },
  'taqm-tiers': { config: { product: P(105), tiers: [{ min: 2, pct: 5 }, { min: 3, pct: 10 }, { min: 5, pct: 15 }], coupon: 'MORE', start_qty: 3 } },
  'taqm-outfit': { config: { rows: [{ name: 'العطر', products: P(101, 102) }, { name: 'العناية', products: P(109, 112, 107) }, { name: 'اللمسة الأخيرة', products: P(104, 111, 105) }], row_height: 140 } },
};
