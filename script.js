/* =========================================================
   Matt Gresock — Portfolio Script
   ========================================================= */

// ── Footer year ──────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Scroll reveal ────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Nav toggle (mobile) ──────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open', !expanded);
    navToggle.classList.toggle('open', !expanded);
  });
}

// ── Text scramble ────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

function scramble(el, finalText, duration = 1200) {
  const frames = Math.round(duration / 16);
  let frame = 0;
  const len = finalText.length;

  function tick() {
    if (frame >= frames) { el.textContent = finalText; return; }
    const progress  = frame / frames;
    const revealed  = Math.floor(progress * len);
    let result = '';
    for (let i = 0; i < len; i++) {
      if (finalText[i] === ' ') { result += ' '; continue; }
      if (i < revealed)          { result += finalText[i]; continue; }
      result += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    el.textContent = result;
    frame++;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const scrambleEl = document.querySelector('.scramble');
if (scrambleEl) {
  const text = scrambleEl.dataset.text || scrambleEl.textContent.trim();
  scrambleEl.dataset.text = text;
  setTimeout(() => scramble(scrambleEl, text, 1200), 300);
}

// ── Magnetic buttons ─────────────────────────────────────
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) * 0.32;
    const dy = (e.clientY - (rect.top  + rect.height / 2)) * 0.32;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ── Contact form ─────────────────────────────────────────
document.querySelectorAll('[data-contact-form]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data    = new FormData(form);
    const name    = String(data.get('name')    || '').trim();
    const email   = String(data.get('email')   || '').trim();
    const company = String(data.get('company') || '').trim();
    const message = String(data.get('message') || '').trim();

    const subject = `Portfolio inquiry from ${name || 'Website visitor'}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company / Organization: ${company || 'N/A'}`,
      '',
      'Message:',
      message,
    ].join('\n');

    window.location.href =
      `mailto:mcgresock@gmail.com?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  });
});
