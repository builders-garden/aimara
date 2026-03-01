/* ============================================================
   aimara.coach — Scroll Animations & Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll reveal ──────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));

  /* ── Nav scroll state ───────────────────────────────────── */
  const nav = document.querySelector('.nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── Smooth anchor scroll ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Staggered phone reveal ─────────────────────────────── */
  const phones = document.querySelectorAll('.phone');
  const positionTransforms = {
    'phone--pos-1': { hidden: 'translateY(40px) rotate(-2.5deg)' },
    'phone--pos-2': { hidden: 'translateY(0px) rotate(-0.5deg)' },
    'phone--pos-3': { hidden: 'translateY(60px) rotate(0.5deg)' },
    'phone--pos-4': { hidden: 'translateY(36px) rotate(-0.5deg)' },
    'phone--pos-5': { hidden: 'translateY(56px) rotate(0.5deg)' },
    'phone--pos-6': { hidden: 'translateY(72px) rotate(1.5deg)' },
    'phone--pos-7': { hidden: 'translateY(48px) rotate(3deg)' },
  };

  const phoneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(phones).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('phone--revealed');
        }, idx * 120);
        phoneObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  phones.forEach(phone => {
    // Find which position class this phone has
    const posClass = Array.from(phone.classList).find(c => c.startsWith('phone--pos-'));
    const transforms = positionTransforms[posClass];
    if (transforms) {
      phone.style.opacity = '0';
      phone.style.transform = transforms.hidden;
      phone.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    phoneObserver.observe(phone);
  });

  // Inject revealed state styles
  const style = document.createElement('style');
  style.textContent = `
    .phone--pos-1.phone--revealed { opacity: 1 !important; transform: translateY(-16px) rotate(-2.5deg) !important; }
    .phone--pos-2.phone--revealed { opacity: 1 !important; transform: translateY(-56px) rotate(-0.5deg) !important; }
    .phone--pos-3.phone--revealed { opacity: 1 !important; transform: translateY(0px) rotate(0.5deg) !important; }
    .phone--pos-4.phone--revealed { opacity: 1 !important; transform: translateY(-20px) rotate(-0.5deg) !important; }
    .phone--pos-5.phone--revealed { opacity: 1 !important; transform: translateY(-4px) rotate(0.5deg) !important; }
    .phone--pos-6.phone--revealed { opacity: 1 !important; transform: translateY(14px) rotate(1.5deg) !important; }
    .phone--pos-7.phone--revealed { opacity: 1 !important; transform: translateY(-12px) rotate(3deg) !important; }
    @media (max-width: 768px) {
      .phone--pos-1.phone--revealed,
      .phone--pos-2.phone--revealed,
      .phone--pos-3.phone--revealed,
      .phone--pos-4.phone--revealed,
      .phone--pos-5.phone--revealed,
      .phone--pos-6.phone--revealed,
      .phone--pos-7.phone--revealed { transform: none !important; }
    }
  `;
  document.head.appendChild(style);

});
