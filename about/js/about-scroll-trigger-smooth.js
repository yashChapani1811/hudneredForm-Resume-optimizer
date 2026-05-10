/**
 * HundredForm — ScrollTrigger Smooth Scroll Integration
 * Uses GSAP ScrollTrigger + ScrollToPlugin for enhanced smooth scrolling,
 * active link highlighting, scroll progress, and parallax effects.
 */
(function () {
  'use strict';

  /* ─── Guards ───────────────────────────────────────────────────────── */
  if (
    typeof gsap === 'undefined' ||
    typeof ScrollTrigger === 'undefined' ||
    typeof ScrollToPlugin === 'undefined'
  ) {
    console.warn('ScrollTriggerSmooth: GSAP, ScrollTrigger, or ScrollToPlugin missing.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /* ─── Disable native smooth-scroll + fix parallax seam ─────────────── */
  var smoothStyles = document.createElement('style');
  smoothStyles.textContent =
    'html { scroll-behavior: auto !important; background: #0c1222; }';
  document.head.appendChild(smoothStyles);

  /* ─── Config ───────────────────────────────────────────────────────── */
  var CONFIG = {
    scrollDuration: 1.2,
    scrollEase: 'power3.inOut',
    navbarOffsetExtra: 20,
  };

  function getNavbarHeight() {
    var navbar = document.getElementById('navbar');
    return navbar ? navbar.offsetHeight : 0;
  }

  /* ─── 1. Unified smooth-scroll helper ──────────────────────────────── */
  function smoothScrollTo(target, offsetY) {
    var offset =
      offsetY !== undefined
        ? offsetY
        : getNavbarHeight() + CONFIG.navbarOffsetExtra;

    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(target, { duration: CONFIG.scrollDuration });
    } else {
      gsap.to(window, {
        duration: CONFIG.scrollDuration,
        scrollTo: { y: target, offsetY: offset },
        ease: CONFIG.scrollEase,
      });
    }
  }

  /* Override global scrollToElement so main.min.js uses GSAP fallback */
  window.scrollToElement = function (id, extraOffset) {
    var el = document.getElementById(id);
    if (!el) return;
    var offset = getNavbarHeight() + (extraOffset || 0) + CONFIG.navbarOffsetExtra;
    smoothScrollTo(el, offset);
  };

  /* ─── 2. Active nav-link highlighting via ScrollTrigger ────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('a[href^="#"]');

  if (sections.length && navLinks.length) {
    sections.forEach(function (section) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top ' + (getNavbarHeight() + 40) + 'px',
        end: 'bottom ' + (getNavbarHeight() + 40) + 'px',
        onToggle: function (self) {
          if (self.isActive) {
            var id = section.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
              }
            });
          }
        },
      });
    });
  }

  /* ─── 3. Scroll progress bar powered by ScrollTrigger ──────────────── */
  var progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: function (self) {
        progressBar.style.width = (self.progress * 100).toFixed(2) + '%';
      },
    });
  }

  /* ─── 4. Scroll-to-top enhancement ─────────────────────────────────── */
  var scrollToTopBtn = document.getElementById('scroll-to-top');
  if (scrollToTopBtn) {
    var newBtn = scrollToTopBtn.cloneNode(true);
    scrollToTopBtn.parentNode.replaceChild(newBtn, scrollToTopBtn);
    newBtn.addEventListener('click', function () {
      smoothScrollTo(0, 0);
    });
  }

  /* ─── 5. Refresh ScrollTrigger on resize ───────────────────────────── */
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      ScrollTrigger.refresh();
    }, 250);
  });

  console.log('ScrollTrigger smooth scroll integration active');
})();

