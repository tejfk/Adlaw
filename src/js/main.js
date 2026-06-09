/* ═══════════════════════════════════════════════
   MAIN — Entry point
   Lenis smooth scroll + GSAP registration + init
   ═══════════════════════════════════════════════ */

// CSS imports
import '../css/main.css';
import '../css/hero.css';
import '../css/story.css';
import '../css/menu.css';
import '../css/experience.css';
import '../css/footer.css';

// Libraries
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Modules
import { initHeroSetup, playHeroAnimation, heroScrollParallax } from './hero.js';
import { initScrollAnimations } from './animations.js';
import { renderMenuCards } from './menu.js';
import { initInteractions } from './interactions.js';

// ── Register GSAP plugins ──
gsap.registerPlugin(ScrollTrigger);

// ── Initialize Lenis smooth scroll ──
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
  orientation: 'vertical',
  smoothWheel: true,
});

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ── Boot ──
function init() {
  // Render dynamic content
  renderMenuCards();

  // Hero initial state setup (hides elements)
  initHeroSetup();

  // Start preloader and custom cursor
  initInteractions();

  // Wait for preloader to finish before starting the hero animation
  window.addEventListener('preloaderComplete', () => {
    playHeroAnimation();

    // Start scroll-triggered animations
    requestAnimationFrame(() => {
      heroScrollParallax(ScrollTrigger);
      initScrollAnimations(ScrollTrigger);
      ScrollTrigger.refresh();
    });
  });
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
