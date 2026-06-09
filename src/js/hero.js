/* ═══════════════════════════════════════════════
   HERO — Logo entrance + text reveal animations
   ═══════════════════════════════════════════════ */

import gsap from 'gsap';

export function initHeroSetup() {
  // Set initial states before anything renders
  gsap.set('.hero-logo', { opacity: 1, rotation: 0, xPercent: -50, yPercent: -50, zIndex: 100000 });
  gsap.set('.hero-tagline', { y: 20, opacity: 0 });
  gsap.set('.hero-divider', { width: 0, opacity: 0 });
  gsap.set('.hero-greeting', { opacity: 0 });
  gsap.set('.hero-title .word-inner', { y: '110%' });
}

export function playHeroAnimation() {
  const tl = gsap.timeline({ delay: 0.1 });

  // Sun glow expands
  tl.to('.hero-glow', {
    scale: 1,
    duration: 2,
    ease: 'expo.out',
  }, 0);

  // Logo already handled by preloader transition, so we don't fade it in here.

  // Greeting label fades in
  tl.to('.hero-greeting', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  }, 0.8);

  // Divider line
  tl.to('.hero-divider', {
    opacity: 1,
    width: 60,
    duration: 0.8,
    ease: 'power2.out',
  }, 0.9);

  // Title words reveal
  tl.to('.hero-title .word-inner', {
    y: 0,
    duration: 1.2,
    ease: 'expo.out',
    stagger: 0.08,
  }, 1.0);

  // Tagline fades in
  tl.to('.hero-tagline', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
  }, 1.6);
}

/**
 * Parallax effect on hero background on scroll
 */
export function heroScrollParallax(ScrollTrigger) {
  // Fade out hero text content on scroll
  gsap.to('.hero-content', {
    opacity: 0,
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: '60% top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // ── PLAYFUL LOGO FOLLOWER ──
  // The logo gracefully wanders and bobs as you scroll down the page.
  gsap.to('.hero-logo', {
    keyframes: {
      y: [0, '15vh', '25vh', '40vh'], // Gradually sinks down the viewport to rest above the footer
      xPercent: [-50, -35, -65, -50], // Playful swaying motion
      rotation: [0, 90, 180, 270],
    },
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2, // Smooth physics lag
    },
  });
}
