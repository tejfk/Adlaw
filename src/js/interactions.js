import gsap from 'gsap';

export function initInteractions() {
  initCursor();
  initPreloader();
}

function initCursor() {
  const cursorGlow = document.getElementById('cursor-glow');
  const cursorDot = document.getElementById('cursor-dot');
  
  if (!cursorGlow || !cursorDot) return;

  // Move cursor elements
  window.addEventListener('mousemove', (e) => {
    // Reveal cursor on first move
    if (cursorGlow.style.opacity === '') {
      cursorGlow.style.opacity = '1';
      cursorDot.style.opacity = '1';
    }

    // Smooth glow follow
    gsap.to(cursorGlow, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Snappy dot follow
    gsap.to(cursorDot, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15,
      ease: 'power2.out',
    });
  });

  // Add hover state for interactive elements
  const interactives = document.querySelectorAll('a, button, .interactive');
  
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hovering');
    });
  });
}

function initPreloader() {
  const tl = gsap.timeline();
  
  // 1. Fade in preloader text (logo is already visible at scale 0.2)
  tl.to('.preloader-welcome', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '+=0.3')
    .to('.preloader-brand', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');

  // 2. Fade out text
  tl.to(['.preloader-text'], {
    opacity: 0,
    y: -20,
    duration: 0.6,
    ease: 'power2.in',
  }, '+=0.8');

  // 3. Preloader background disappears, logo moves up to make room
  tl.to('.preloader', { 
      opacity: 0, 
      duration: 0.8,
      ease: 'power2.inOut',
    })
    .to('.hero-logo', {
      top: '22vh', // Glides upwards to rest perfectly just above the hero text
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.set('.hero-logo', { zIndex: 10 }); // Keep above the white background
        gsap.set('.preloader', { display: 'none' });
        document.body.style.overflow = ''; // Restore native scrolling
        window.dispatchEvent(new CustomEvent('preloaderComplete'));
      }
    }, '<'); // Play simultaneously with the preloader fade
}
