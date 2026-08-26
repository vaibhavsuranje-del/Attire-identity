/* ==================================================================
   ATTIRE IDENTITY — script.js
   Vanilla JS only. No dependencies.
================================================================== */
(() => {
  'use strict';

  /* ---------------- Page loader ---------------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => loader.classList.add('is-hidden'), 350);
    }
  });

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Sticky header ---------------- */
  const header = document.getElementById('siteHeader');
  const onScrollHeader = () => {
    if (window.scrollY > 40) header.classList.add('is-solid');
    else header.classList.remove('is-solid');
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- Scroll progress bar ---------------- */
  const progressBar = document.getElementById('progressBar');
  const onScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  };
  window.addEventListener('scroll', onScrollProgress, { passive: true });

  /* ---------------- Back to top ---------------- */
  const backToTop = document.getElementById('backToTop');
  const onScrollBackToTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScrollBackToTop, { passive: true });
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Custom cursor (desktop only) ---------------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (!isTouch && cursorDot && cursorRing) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();
    document.querySelectorAll('a, button, .why-card, .sol-card, .ind-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('is-active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-active'));
    });
  } else {
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorRing) cursorRing.style.display = 'none';
  }

  /* ---------------- Reveal on scroll (Intersection Observer) ---------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = (i % 4) * 80;
          setTimeout(() => el.classList.add('is-visible'), delay);
          revealObserver.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------------- Counter animation ---------------- */
  const counters = document.querySelectorAll('.counter');
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => counterObserver.observe(c));
  }

  /* ---------------- Testimonial slider ---------------- */
  const track = document.getElementById('sliderTrack');
  const dotsWrap = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  if (track && dotsWrap) {
    const slides = track.querySelectorAll('.slide');
    let current = 0;
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap.querySelectorAll('button');

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach(d => d.classList.remove('is-active'));
      dots[current].classList.add('is-active');
    }
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    let autoplay = setInterval(() => goTo(current + 1), 6000);
    const sliderSection = track.closest('.slider');
    if (sliderSection) {
      sliderSection.addEventListener('mouseenter', () => clearInterval(autoplay));
      sliderSection.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => goTo(current + 1), 6000);
      });
    }
  }

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.acc-trigger').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------------- Quote form toggle + fake submit ---------------- */
  const openQuoteBtn = document.getElementById('openQuoteForm');
  const quoteForm = document.getElementById('quoteForm');
  if (openQuoteBtn && quoteForm) {
    openQuoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      quoteForm.classList.toggle('is-open');
      if (quoteForm.classList.contains('is-open')) {
        quoteForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
  const quoteNote = document.getElementById('quoteFormNote');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('qName').value.trim();
      const org = document.getElementById('qOrg').value.trim();
      const phone = document.getElementById('qPhone').value.trim();
      const qty = document.getElementById('qQty').value.trim();
      const msg = document.getElementById('qMsg').value.trim();

      const text = encodeURIComponent(
        `Hello ATTIRE IDENTITY, I'd like a quote.\nName: ${name}\nInstitution: ${org}\nPhone: ${phone}\nQuantity: ${qty}\nRequirement: ${msg}`
      );
      window.open(`https://wa.me/910000000000?text=${text}`, '_blank', 'noopener');
      if (quoteNote) quoteNote.textContent = 'Opening WhatsApp with your details prefilled…';
      quoteForm.reset();
    });
  }

  /* ---------------- Lazy loading fallback for older browsers ---------------- */
  if (!('loading' in HTMLImageElement.prototype)) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => { img.src = img.src; });
  }

})();
