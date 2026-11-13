/**
 * Saudi seasons engine. Hijri dates come from the browser's own Umm al-Qura calendar
 * (Intl `islamic-umalqura`, the official Saudi calendar), so Ramadan and the Eids move every
 * year without the merchant typing a date. Gregorian occasions use their fixed rules.
 */
export type Occ = 'ramadan' | 'eid_fitr' | 'hajj' | 'arafah' | 'eid_adha' | 'hijri_new_year' | 'founding' | 'national' | 'white_friday' | 'payday' | 'citizen' | 'mothers' | 'back_to_school' | 'summer' | 'winter';
export interface Window_ { id: Occ; start: Date; end: Date }
export const OCC: Record<Occ, { ar: string; en: string; emoji: string; pal: [string, string, string]; pri: number }> = {
  ramadan: { ar: 'رمضان', en: 'Ramadan', emoji: '🌙', pal: ['#0f2a3f', '#d9b25f', '#f7efd9'], pri: 9 },
  eid_fitr: { ar: 'عيد الفطر', en: 'Eid al-Fitr', emoji: '🎉', pal: ['#3b1f5e', '#f2c14e', '#fff6e0'], pri: 10 },
  hajj: { ar: 'عشر ذي الحجة', en: 'First ten of Dhul-Hijjah', emoji: '🕋', pal: ['#1d2b24', '#c9a45c', '#f4efe2'], pri: 6 },
  arafah: { ar: 'يوم عرفة', en: 'Day of Arafah', emoji: '🤲', pal: ['#1d2b24', '#e7c873', '#f6f1e2'], pri: 8 },
  eid_adha: { ar: 'عيد الأضحى', en: 'Eid al-Adha', emoji: '🐑', pal: ['#14361f', '#e2b857', '#fbf5e4'], pri: 10 },
  hijri_new_year: { ar: 'رأس السنة الهجرية', en: 'Hijri New Year', emoji: '✨', pal: ['#1c1c2e', '#b9a26a', '#f3eee0'], pri: 4 },
  founding: { ar: 'يوم التأسيس', en: 'Founding Day', emoji: '🏰', pal: ['#4a2c17', '#c8a165', '#f7ecd9'], pri: 8 },
  national: { ar: 'اليوم الوطني', en: 'Saudi National Day', emoji: '🇸🇦', pal: ['#0b5d3b', '#ffffff', '#e8f5ee'], pri: 9 },
  white_friday: { ar: 'الجمعة البيضاء', en: 'White Friday', emoji: '🏷️', pal: ['#0d0d0f', '#ffffff', '#f2f2f2'], pri: 9 },
  payday: { ar: 'موسم الرواتب', en: 'Payday', emoji: '💸', pal: ['#103b2c', '#3ddc97', '#ecfff6'], pri: 5 },
  citizen: { ar: 'حساب المواطن', en: 'Citizen Account day', emoji: '🏦', pal: ['#0e3a4a', '#58c4dd', '#eaf8fc'], pri: 3 },
  mothers: { ar: 'يوم الأم', en: "Mother's Day", emoji: '💐', pal: ['#5a1f3a', '#f2a7c3', '#fff0f6'], pri: 6 },
  back_to_school: { ar: 'العودة للمدارس', en: 'Back to school', emoji: '🎒', pal: ['#1e2f6b', '#ffcc33', '#eef2ff'], pri: 6 },
  summer: { ar: 'الصيف', en: 'Summer', emoji: '☀️', pal: ['#0f4c5c', '#ffb703', '#fff8e6'], pri: 1 },
  winter: { ar: 'الشتاء', en: 'Winter', emoji: '❄️', pal: ['#1b263b', '#9ad1ff', '#eef6ff'], pri: 1 },
};
const day = 864e5;
const at = (y: number, m: number, d: number) => new Date(y, m - 1, d, 0, 0, 0);
const addD = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
let fmt: Intl.DateTimeFormat | null = null;
export function hijri(d: Date): { y: number; m: number; d: number } {
  try {
    fmt ??= new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', { day: 'numeric', month: 'numeric', year: 'numeric' });
    const p = Object.fromEntries(fmt.formatToParts(d).map((x) => [x.type, x.value]));
    return { y: parseInt(p.year), m: parseInt(p.month), d: parseInt(p.day) };
  } catch { return { y: 0, m: 0, d: 0 }; }
}
export const hijriLabel = (d: Date, en = false) => { try { return new Intl.DateTimeFormat(en ? 'en-u-ca-islamic-umalqura' : 'ar-SA-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' }).format(d); } catch { return ''; } };
export const gregLabel = (d: Date, en = false) => new Intl.DateTimeFormat(en ? 'en-GB' : 'ar-SA-u-ca-gregory-nu-latn', { day: 'numeric', month: 'long' }).format(d);
/** Gregorian dates of Hijri (month, day) within [from, from+span]. */
function findHijri(m: number, d: number, from: Date, span: number): Date[] {
  const out: Date[] = [];
  for (let i = 0; i <= span; i++) { const g = addD(from, i); const h = hijri(g); if (h.m === m && h.d === d) { out.push(g); i += 300; } }
  return out;
}
function lastFridayOfNov(y: number) { const d = at(y, 11, 30); while (d.getDay() !== 5) d.setDate(d.getDate() - 1); return d; }
/** Salary day: the given day of the month, moved off the Saudi weekend (Fri/Sat) per the merchant's rule. */
export function payDate(y: number, m: number, dom = 27, shift: 'before' | 'after' | 'none' = 'before') {
  const d = at(y, m, Math.min(dom, new Date(y, m, 0).getDate()));
  if (shift !== 'none') while (d.getDay() === 5 || d.getDay() === 6) d.setDate(d.getDate() + (shift === 'before' ? -1 : 1));
  return d;
}
export interface Opts { payDay?: number; payShift?: 'before' | 'after' | 'none'; school?: string; whiteFridayDays?: number; leadDays?: number }
/** Every occasion window from 40 days ago to ~13 months ahead, sorted by start date. */
export function windows(now: Date, o: Opts = {}): Window_[] {
  const from = addD(now, -40); const span = 440; const w: Window_[] = [];
  const hij = (id: Occ, m: number, d: number, len: number) => findHijri(m, d, from, span).forEach((s) => w.push({ id, start: s, end: addD(s, len) }));
  hij('ramadan', 9, 1, 29); hij('eid_fitr', 10, 1, 3); hij('hajj', 12, 1, 7); hij('arafah', 12, 9, 0); hij('eid_adha', 12, 10, 3); hij('hijri_new_year', 1, 1, 0);
  for (const y of [now.getFullYear() - 1, now.getFullYear(), now.getFullYear() + 1]) {
    w.push({ id: 'founding', start: at(y, 2, 22), end: at(y, 2, 22) });
    w.push({ id: 'national', start: at(y, 9, 23), end: at(y, 9, 23) });
    w.push({ id: 'mothers', start: at(y, 3, 21), end: at(y, 3, 21) });
    const wf = lastFridayOfNov(y); w.push({ id: 'white_friday', start: addD(wf, -(o.whiteFridayDays ?? 7)), end: addD(wf, 3) });
    w.push({ id: 'summer', start: at(y, 6, 15), end: at(y, 8, 31) });
    w.push({ id: 'winter', start: at(y, 12, 1), end: at(y + 1, 2, 28) });
    for (let m = 1; m <= 12; m++) {
      const p = payDate(y, m, o.payDay ?? 27, o.payShift ?? 'before'); w.push({ id: 'payday', start: p, end: addD(p, 3) });
      const c = at(y, m, 10); w.push({ id: 'citizen', start: c, end: addD(c, 1) });
    }
  }
  if (o.school) { const s = new Date(o.school + 'T00:00:00'); if (!isNaN(+s)) w.push({ id: 'back_to_school', start: addD(s, -14), end: s }); }
  // Ramadan ends the day before Eid al-Fitr (29 or 30 days, as the Umm al-Qura calendar says).
  for (const r of w.filter((x) => x.id === 'ramadan')) { const e = w.find((x) => x.id === 'eid_fitr' && +x.start > +r.start && +x.start - +r.start < 32 * day); if (e) r.end = addD(e.start, -1); }
  const lo = +from, hi = +from + span * day;
  return w.filter((x) => +x.end >= lo && +x.start <= hi).sort((a, b) => +a.start - +b.start);
}
const endOf = (d: Date) => +d + day - 1;
export interface Now { active: Window_[]; next: Window_[]; phase: (x: Window_) => 'soon' | 'on' | 'last'; dayOf: (x: Window_) => number }
/** What is on now (highest priority first) and what is coming, limited to the occasions the merchant enabled. */
export function detect(now: Date, enabled: Occ[] | null, o: Opts = {}): Now {
  const w = windows(now, o).filter((x) => !enabled || enabled.includes(x.id));
  const t = +now;
  const active = w.filter((x) => t >= +x.start && t <= endOf(x.end)).sort((a, b) => OCC[b.id].pri - OCC[a.id].pri);
  const next = w.filter((x) => +x.start > t);
  return { active, next,
    phase: (x) => (t < +x.start ? 'soon' : (endOf(x.end) - t) < 2 * day && +x.end > +x.start ? 'last' : 'on'),
    dayOf: (x) => Math.floor((t - +x.start) / day) + 1 };
}
export const daysUntil = (d: Date, now = new Date()) => Math.max(0, Math.ceil((+d - +now) / day));
