// Interest measurement for visitors arriving from a prospecting email.
//
// The email links to /?id=<n>&v=<version>#demos. Without a valid id AND
// version nothing is ever sent: a visitor who did not come from an email is
// not measured at all. No cookie, no fingerprint, no third-party library —
// only "this numbered link looked at this element", sent once per session.

const ENDPOINT = 'https://n7n.automatisationboost.com/webhook/track-dirigeants';

const EVENTS = new Set([
  'page_vue', 'demo_ouverte', 'demo_lue', 'demo_fin', 'scroll_50', 'scroll_90',
  'temps_30s', 'temps_90s', 'cta_whatsapp', 'cta_audit', 'audit_formulaire_vu',
]);

let lead: { id: string; v: string } | null = null;
const sentInMemory = new Set<string>();

function readLead(): { id: string; v: string } | null {
  try {
    if (navigator.webdriver) return null;
    const q = new URLSearchParams(window.location.search);
    const id = q.get('id') || '';
    const v = q.get('v') || '';
    if (!/^[0-9]{1,3}$/.test(id) || !/^[a-z]{3,12}$/.test(v)) return null;
    return { id, v };
  } catch {
    return null;
  }
}

function once(key: string): boolean {
  if (sentInMemory.has(key)) return false;
  sentInMemory.add(key);
  try {
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, '1');
  } catch { /* private mode: the in-memory set still dedupes this page view */ }
  return true;
}

function cleanElement(el: string): string {
  return String(el || 'page').toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 40) || 'page';
}

/** Send one interest event. Silently does nothing for unmeasured visitors. */
export function signaler(event: string, element = 'page'): void {
  if (!lead || !EVENTS.has(event)) return;
  const el = cleanElement(element);
  if (!once(`interet:${event}:${el}`)) return;
  const url = `${ENDPOINT}?event=${event}&id=${lead.id}&secteur=${encodeURIComponent(`${lead.v}|${el}`)}`;
  try {
    if (navigator.sendBeacon && navigator.sendBeacon(url)) return;
  } catch { /* fall through to fetch */ }
  try {
    fetch(url, { method: 'GET', mode: 'no-cors', keepalive: true, credentials: 'omit' }).catch(() => {});
  } catch { /* never break the page for a measurement */ }
}

function sectionOf(node: Element): string {
  const own = node.closest('[data-interet]') as HTMLElement | null;
  if (own?.dataset.interet) return own.dataset.interet;
  const s = node.closest('section[id], footer[id]');
  return s ? s.id : 'page';
}

let started = false;

/** Called once after the first render, so the React sections exist. */
export function demarrerMesure(): void {
  if (started) return;
  started = true;
  lead = readLead();

  // The email lands on #demos, but the section only exists once React has
  // rendered: the browser's own jump to the anchor happened before that.
  if (window.location.hash === '#demos') {
    const go = () => document.getElementById('demos')?.scrollIntoView({ block: 'start' });
    requestAnimationFrame(go);
    setTimeout(go, 700);
  }

  if (!lead) return;

  signaler('page_vue', 'page');

  // Reading depth.
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const r = window.scrollY / max;
    if (r >= 0.5) signaler('scroll_50', 'page');
    if (r >= 0.9) { signaler('scroll_90', 'page'); window.removeEventListener('scroll', onScroll); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Time actually spent on the page: only seconds where the tab is visible count.
  let seconds = 0;
  const timer = window.setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    seconds += 1;
    if (seconds === 30) signaler('temps_30s', 'page');
    if (seconds >= 90) { signaler('temps_90s', 'page'); window.clearInterval(timer); }
  }, 1000);

  // Calls to action, wherever they are on the page.
  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (/wa\.me\//.test(href)) signaler('cta_whatsapp', sectionOf(a));
    else if (/#(audit|contact)$/.test(href)) signaler('cta_audit', sectionOf(a));
  }, true);

  // The audit form scrolled into view.
  const audit = document.getElementById('audit');
  if (audit && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((x) => x.isIntersecting)) { signaler('audit_formulaire_vu', 'audit'); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(audit);
  }
}
