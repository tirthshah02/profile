/* script.js — Tirth Shah Portfolio */

(function () {
  'use strict';

  // ── Active nav link ──
  const links = document.querySelectorAll('.nav-links a');
  const current = (window.location.pathname.split('/').pop() || 'index').replace(/\.html$/, '');

  links.forEach(link => {
    const href = link.getAttribute('href').replace(/\.html$/, '');
    if (href === current || (current === '' && href === 'index')) {
      link.classList.add('active');
    }
  });

  // ── Mobile nav toggle ──
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.site-nav');
  const backdrop = document.querySelector('.nav-backdrop');

  function closeNav() {
    nav.classList.remove('open');
    backdrop && backdrop.classList.remove('open');
    toggle.textContent = 'Menu';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      backdrop && backdrop.classList.toggle('open', open);
      toggle.textContent = open ? 'Close' : 'Menu';
    });

    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeNav);
    });

    backdrop && backdrop.addEventListener('click', closeNav);
  }

  // ── Scroll-reveal ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });

  // ── Cursor subtle trail on desktop ──
  if (window.innerWidth > 900) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: rgba(200,240,74,0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transition: transform 0.08s ease;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(cursor);

    let cx = 0, cy = 0;
    document.addEventListener('mousemove', (e) => {
      cx = e.clientX;
      cy = e.clientY;
      cursor.style.left = cx - 3 + 'px';
      cursor.style.top = cy - 3 + 'px';
    });

    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'scale(2.5)';
    });
    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'scale(1)';
    });
  }
})();
