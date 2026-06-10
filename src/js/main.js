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

// ── Cloud Chroma Key Logic ──
// Separates the white clouds from the blue sky in cloud.png and sets the clouds as a foreground layer.
function initCloudChromaKey() {
  const img = new Image();
  img.src = '/images/cloud.png';
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Loop through pixels and make the blue sky transparent
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Difference between blue and red channels helps identify blue sky vs white clouds.
      const diff = b - r;

      if (diff >= 30) {
        // High blue dominance: check if it's not a bright white cloud pixel
        if (r > 235 && g > 235 && b > 235) {
          // Keep cloud pixel opaque
        } else {
          // Sky pixel: fully transparent
          data[i + 3] = 0;
        }
      } else if (diff > 15) {
        // Transition region: check if not white cloud
        if (r > 235 && g > 235 && b > 235) {
          // Keep cloud
        } else {
          // Smoothly interpolate alpha to avoid pixelated/jagged edges
          const factor = (30 - diff) / 15;
          data[i + 3] = Math.round(data[i + 3] * factor);
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Apply the canvas as a background image to the foreground container
    const foreground = document.getElementById('cloud-foreground');
    if (foreground) {
      foreground.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
    }
  };
}

// ── Boot ──
function init() {
  // Render dynamic content
  renderMenuCards();

  // Load cloud layers and apply chroma key
  initCloudChromaKey();

  // Hero initial state setup (hides elements)
  initHeroSetup();

  // Start preloader and custom cursor
  initInteractions();

  // Wait for preloader to finish before starting the hero animation
  window.addEventListener('preloaderComplete', () => {
    playHeroAnimation();

    // Set logo z-index below clouds (101) and section content (102) after loading
    gsap.set('.hero-logo', { zIndex: 100 });

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
