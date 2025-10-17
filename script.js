
/* script.js - minimal JS for menu, smooth scroll, and reveal */
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const hamb = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');

    // Hamburger toggle
    hamb.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('mobile-open');
    });

    // Close mobile nav when clicking a link
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (hamb.getAttribute('aria-expanded') === 'true'){
          hamb.setAttribute('aria-expanded','false');
          nav.classList.remove('mobile-open');
        }
      })
    });

    // Smooth scroll for internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (target){
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Reveal sections on scroll
    const sections = document.querySelectorAll('.section, .hero');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      })
    }, { threshold: 0.12 });
    sections.forEach(s => io.observe(s));

    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
