import { mem, update } from './memory';
/** Who is looking right now: real signals only (URL, referrer, user agent, clock, this browser's memory). */
export type Src = 'snapchat' | 'tiktok' | 'instagram' | 'facebook' | 'google' | 'x' | 'whatsapp' | 'youtube' | 'email' | 'direct' | 'other';
const MAP: [RegExp, Src][] = [[/snap/, 'snapchat'], [/tiktok/, 'tiktok'], [/insta/, 'instagram'], [/(facebook|fb\.|^fb$|meta)/, 'facebook'], [/(google|gclid|bing|yahoo|duckduckgo)/, 'google'],
  [/(^x$|twitter|t\.co$|x\.com)/, 'x'], [/(whatsapp|wa\.me)/, 'whatsapp'], [/(youtube|youtu\.be)/, 'youtube'], [/(mail|newsletter|klaviyo)/, 'email']];
export function detectSource(): { src: Src; raw: string; campaign: string } {
  const q = new URLSearchParams(location.search);
  let raw = (q.get('utm_source') || q.get('source') || q.get('ref') || '').toLowerCase();
  if (!raw) { if (q.get('ScCid') || q.get('sccid')) raw = 'snapchat'; else if (q.get('ttclid')) raw = 'tiktok'; else if (q.get('gclid')) raw = 'google'; else if (q.get('fbclid')) raw = 'facebook'; else if (q.get('twclid')) raw = 'x'; }
  const ua = navigator.userAgent;
  if (!raw) { if (/Snapchat/i.test(ua)) raw = 'snapchat'; else if (/musical_ly|TikTok|BytedanceWebview/i.test(ua)) raw = 'tiktok'; else if (/Instagram/i.test(ua)) raw = 'instagram'; else if (/FBAN|FBAV/i.test(ua)) raw = 'facebook'; else if (/Twitter/i.test(ua)) raw = 'x'; }
  if (!raw && document.referrer) { try { const h = new URL(document.referrer).hostname; if (h !== location.hostname) raw = h; } catch { /* bad referrer */ } }
  const hit = MAP.find(([r]) => r.test(raw));
  return { src: raw ? (hit ? hit[1] : 'other') : 'direct', raw, campaign: (q.get('utm_campaign') || '').toLowerCase() };
}
/** Remembers the first and latest real traffic source for `days` days so a visitor from Snap still sees "their" page later. */
export function source(stickyDays = 7): { src: Src; raw: string; campaign: string; first: Src } {
  const now = detectSource(); const m = mem();
  const fresh = Date.now() - (m.last || 0) > stickyDays * 864e5;
  if (now.src !== 'direct') update((x) => { x.srcLast = now.src; if (!x.srcFirst || fresh) x.srcFirst = now.src; });
  const remembered = stickyDays > 0 && !fresh ? (m.srcLast as Src) : '';
  return { ...now, src: now.src !== 'direct' ? now.src : (remembered || 'direct'), first: ((m.srcFirst || now.src) as Src) };
}
export type Device = 'mobile' | 'tablet' | 'desktop';
export const device = (): Device => { const w = innerWidth; const ua = navigator.userAgent; return /iPad|Tablet/i.test(ua) || (w >= 700 && w < 1024 && 'ontouchstart' in window) ? 'tablet' : (/Mobi|Android|iPhone/i.test(ua) || w < 700 ? 'mobile' : 'desktop'); };
export const os = (): 'ios' | 'android' | 'other' => (/iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'ios' : /Android/i.test(navigator.userAgent) ? 'android' : 'other');
/** True inside Snapchat/TikTok/Instagram/Facebook in-app browsers, where checkout and wallets often struggle. */
export const inApp = (): string => { const ua = navigator.userAgent; return /Snapchat/i.test(ua) ? 'Snapchat' : /musical_ly|TikTok|Bytedance/i.test(ua) ? 'TikTok' : /Instagram/i.test(ua) ? 'Instagram' : /FBAN|FBAV/i.test(ua) ? 'Facebook' : /Twitter/i.test(ua) ? 'X' : ''; };
export type Daypart = 'morning' | 'noon' | 'evening' | 'night' | 'late';
export const daypart = (d = new Date()): Daypart => { const h = d.getHours(); return h >= 5 && h < 11 ? 'morning' : h >= 11 && h < 15 ? 'noon' : h >= 15 && h < 19 ? 'evening' : h >= 19 ? 'night' : 'late'; };
export const weekend = (d = new Date()) => d.getDay() === 5 || d.getDay() === 6; // Saudi weekend: Friday + Saturday
export type Visitor = 'new' | 'returning' | 'loyal';
export const visitor = (loyalAt = 4): Visitor => { const v = mem().visits; return v <= 1 ? 'new' : v >= loyalAt ? 'loyal' : 'returning'; };
/** Merchant-side preview: Salla's theme editor shows the store inside an iframe. */
export const inEditor = () => { try { return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search); } catch { return true; } };
/** `?tw_date=2027-03-01` lets the merchant preview any day (only in the editor or when they add it themselves). */
export const today = (): Date => { const v = new URLSearchParams(location.search).get('tw_date'); const d = v ? new Date(v + 'T12:00:00') : null; return d && !isNaN(+d) ? d : new Date(); };
