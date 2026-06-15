/* script.js — Hillary Uzoka portfolio */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Footer year ─────────────────────────────── */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ── Hamburger toggle ────────────────────────── */
    var hamburger = document.getElementById('hamburger');
    var nav       = document.getElementById('main-nav');

    if (hamburger && nav) {
      hamburger.addEventListener('click', function () {
        var isOpen = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!isOpen));
        nav.classList.toggle('mobile-open');
        document.body.style.overflow = isOpen ? '' : 'hidden';
      });

      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          hamburger.setAttribute('aria-expanded', 'false');
          nav.classList.remove('mobile-open');
          document.body.style.overflow = '';
        });
      });
    }

    /* ── Smooth scroll ───────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.getElementById(href.slice(1));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    /* ── WhatsApp contact form ───────────────────── */
    var waForm  = document.getElementById('wa-form');
    var waError = document.getElementById('wa-error');
    var PHONE   = '2349069440134';

    if (waForm) {
      waForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var name    = document.getElementById('wa-name').value.trim();
        var email   = document.getElementById('wa-email').value.trim();
        var message = document.getElementById('wa-message').value.trim();

        if (!name || !email || !message) {
          if (waError) {
            waError.hidden = false;
            waError.textContent = 'Please fill in all fields before sending.';
          }
          return;
        }

        if (waError) waError.hidden = true;

        var text = [
          'Hi Hillary, my name is ' + name + '.',
          'My email: ' + email + '.',
          '',
          message
        ].join('\n');

        var url = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(text);
        window.open(url, '_blank', 'noopener,noreferrer');
      });

      waForm.querySelectorAll('input, textarea').forEach(function (field) {
        field.addEventListener('input', function () {
          if (waError) waError.hidden = true;
        });
      });
    }

    /* ═══════════════════════════════════════════════
       SCROLL REVEAL SYSTEM
    ═══════════════════════════════════════════════ */
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      /* Accessibility: skip all animations */
      document.querySelectorAll('[data-anim]').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    /* ── Assign stagger delays within [data-anim-group] containers ── */
    document.querySelectorAll('[data-anim-group]').forEach(function (group) {
      var step = parseFloat(group.dataset.stagger || 0.055);
      group.querySelectorAll('[data-anim]').forEach(function (el, i) {
        el.style.setProperty('--anim-delay', (i * step).toFixed(3) + 's');
      });
    });

    /* ── IntersectionObserver ── */
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px'
    });

    document.querySelectorAll('[data-anim]').forEach(function (el) {
      revealObs.observe(el);
    });

    /* ═══════════════════════════════════════════════
       METRIC COUNT-UP
    ═══════════════════════════════════════════════ */
    var countEls = document.querySelectorAll('[data-count]');

    if (countEls.length) {
      var countObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.7 });

      countEls.forEach(function (el) {
        /* Set initial display value to 0 so there's no flash of final value */
        el.textContent = '0' + (el.dataset.suffix || '');
        countObs.observe(el);
      });
    }

    function animateCount(el) {
      var target   = parseInt(el.dataset.count, 10);
      var suffix   = el.dataset.suffix || '';
      var duration = 1600;
      var startTs  = null;

      function tick(ts) {
        if (!startTs) startTs = ts;
        var p     = Math.min((ts - startTs) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 4); /* quartic ease-out */
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

  });
}());
