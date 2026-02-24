/* ═══════════════════════════════════════════════════
   WOLA — Shared JavaScript
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Nav scroll effect ──────────────────────────────────────
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Active nav link ────────────────────────────────────────
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path || (path === 'index.html' && href === '../index.html')) {
      a.classList.add('active');
    }
  });

  // ── Mobile drawer ──────────────────────────────────────────
  const burger = document.querySelector('.nav-burger');
  const drawer = document.getElementById('nav-drawer');
  const drawerClose = document.querySelector('.nav-drawer-close');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    const closeDrawer = () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    };
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  }

  // ── Scroll reveal ──────────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => revealObserver.observe(el));
  }

  // ── Smooth anchor scroll ───────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  // ── Form handling (Formspree) ──────────────────────────────
  document.querySelectorAll('form[data-formspree]').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const msg = form.querySelector('.form-msg');
      const original = btn.textContent;

      btn.disabled = true;
      btn.textContent = 'Sending…';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          if (msg) { msg.className = 'form-msg success'; msg.style.display = 'block'; msg.textContent = '✓  Thank you! We\'ll be in touch soon.'; }
          form.reset();
        } else {
          throw new Error('Server error');
        }
      } catch {
        if (msg) { msg.className = 'form-msg error'; msg.style.display = 'block'; msg.textContent = '✕  Something went wrong. Please email us directly at wolaafrika@gmail.com'; }
      } finally {
        btn.disabled = false;
        btn.textContent = original;
      }
    });
  });

  // ── Gallery lightbox ──────────────────────────────────────
  const galleryItems = document.querySelectorAll('.gallery-item img');
  if (galleryItems.length) {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `<div class="lb-overlay"></div><div class="lb-content"><img class="lb-img" /><button class="lb-close">✕</button><p class="lb-caption"></p></div>`;
    document.body.appendChild(lb);

    const lbImg = lb.querySelector('.lb-img');
    const lbCap = lb.querySelector('.lb-caption');
    const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };

    galleryItems.forEach(img => {
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lbCap.textContent = img.alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    lb.querySelector('.lb-overlay').addEventListener('click', closeLb);
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
  }

  // ── Events tab filter ─────────────────────────────────────
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.event-card').forEach(card => {
          const show = filter === 'all' || card.dataset.type === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // ── Donation amount selector ──────────────────────────────
  const amountBtns = document.querySelectorAll('.amount-btn');
  const customInput = document.getElementById('custom-amount');
  if (amountBtns.length) {
    amountBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        amountBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (customInput) customInput.value = '';
      });
    });
    if (customInput) {
      customInput.addEventListener('input', () => {
        amountBtns.forEach(b => b.classList.remove('active'));
      });
    }
  }

  // ── Counter animation ─────────────────────────────────────
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current.toLocaleString() + suffix;
            if (current >= target) clearInterval(timer);
          }, 25);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }

});
