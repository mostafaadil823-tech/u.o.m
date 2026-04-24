// ============================================
//  U.O.M Parfum — Brand Landing Page JS
//  Smooth animations · Responsive interactions
// ============================================

// ---- Intersection Observer: Staggered Card Entry ----
const cards = document.querySelectorAll('.scard');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, _) => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const idx = [...cards].indexOf(card);
      setTimeout(() => {
        card.classList.add('visible');
      }, idx * 90);
      cardObserver.unobserve(card);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => cardObserver.observe(card));

// ---- Smooth Scroll for CTA ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Ripple Effect on Cards ----
cards.forEach(card => {
  card.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      left:${x}px; top:${y}px;
      border-radius:50%;
      background:rgba(255,255,255,0.06);
      transform:scale(0);
      animation:ripple-anim 0.55s ease-out forwards;
      pointer-events:none;
      z-index:10;
    `;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Ripple CSS
const style = document.createElement('style');
style.textContent = `@keyframes ripple-anim { to { transform:scale(2.5); opacity:0; } }`;
document.head.appendChild(style);

// ---- Parallax Orbs on Scroll ----
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const orb1 = document.querySelector('.orb-1');
      const orb2 = document.querySelector('.orb-2');
      if (orb1) orb1.style.transform = `translateY(${y * 0.08}px)`;
      if (orb2) orb2.style.transform = `translateY(${-y * 0.06}px)`;
      ticking = false;
    });
    ticking = true;
  }
});

// ---- Touch: Card active state ----
cards.forEach(card => {
  card.addEventListener('touchstart', () => card.style.transform = 'scale(0.97)', { passive: true });
  card.addEventListener('touchend', () => card.style.transform = '');
});

// ---- Prevent 300ms tap delay ----
document.documentElement.style.touchAction = 'manipulation';