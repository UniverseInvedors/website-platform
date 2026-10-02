/**
 * main.js — Project Template
 * Minimal vanilla JS. No frameworks required.
 * Copy and extend per project as needed.
 */

'use strict';

/* ------------------------------------------------------------------ */
/* Utility                                                              */
/* ------------------------------------------------------------------ */
const $ = (sel, root = document) => root.querySelector(sel);

/* ------------------------------------------------------------------ */
/* Current year in footer copyright                                     */
/* ------------------------------------------------------------------ */
(function setYear() {
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ------------------------------------------------------------------ */
/* Screen-reader live region                                            */
/* ------------------------------------------------------------------ */
(function srAnnounce() {
  const live = document.getElementById('sr-live');
  if (live) {
    live.textContent = 'Page loaded.';
    setTimeout(() => { live.textContent = ''; }, 3000);
  }
})();

/* ------------------------------------------------------------------ */
/* Smooth-scroll for same-page anchors                                  */
/* ------------------------------------------------------------------ */
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const id = anchor.getAttribute('href').slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
});

/* ------------------------------------------------------------------ */
/* Mobile nav toggle (optional — uncomment if you add a burger button) */
/* ------------------------------------------------------------------ */
/*
(function mobileNav() {
  const btn = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    menu.hidden = expanded;
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      btn.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      btn.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      btn.focus();
    }
  });
})();
*/

/* ------------------------------------------------------------------ */
/* AdSense initialisation — UNCOMMENT ONLY after AdSense approval       */
/* ------------------------------------------------------------------ */
/*
(function initAds() {
  // adsbygoogle is pushed by the inline script in each ad slot.
  // Nothing extra needed here unless you want lazy-load ads.
})();
*/
