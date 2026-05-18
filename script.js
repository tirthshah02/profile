/* script.js — Tirth Shah Portfolio */

(function () {
  'use strict';

  // ── Active nav link ──
  const links = document.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === current ||
      (current === '' && href === 'index.html') ||
      (current === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  // ── Mobile nav toggle ──
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.textContent = open ? 'Close' : 'Menu';
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.textContent = 'Menu';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.textContent = 'Menu';
      }
    });
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
