/* ═══════════════════════════════════════════════
   ANIMATIONS — ScrollTrigger definitions
   All scroll-driven animations live here
   ═══════════════════════════════════════════════ */

import gsap from 'gsap';

export function initScrollAnimations(ScrollTrigger) {
  // ── Story Section ──
  storyAnimations(ScrollTrigger);

  // ── Menu Section ──
  menuAnimations(ScrollTrigger);

  // ── Experience Section ──
  experienceAnimations(ScrollTrigger);

  // ── Location Section ──
  locationAnimations(ScrollTrigger);

  // ── Footer ──
  footerAnimations(ScrollTrigger);

  // ── Generic Image Reveals ──
  gsap.utils.toArray('.img-reveal').forEach((img) => {
    ScrollTrigger.create({
      trigger: img,
      start: 'top 85%',
      onEnter: () => img.classList.add('revealed'),
      once: true,
    });
  });
}

function storyAnimations(ScrollTrigger) {
  // Label
  gsap.to('.story-label', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.story',
      start: 'top 75%',
    },
  });
  gsap.set('.story-label', { y: 20 });

  // Title lines
  gsap.to('.story-title .line-inner', {
    y: 0,
    duration: 1.2,
    ease: 'expo.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.story-title',
      start: 'top 80%',
    },
  });

  // Accent line
  gsap.to('.story-accent', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.story-accent',
      start: 'top 85%',
    },
  });

  // Body paragraphs
  gsap.utils.toArray('.story-body p').forEach((p, i) => {
    gsap.to(p, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: i * 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: p,
        start: 'top 85%',
      },
    });
  });

  // Quote
  gsap.to('.story-quote', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.story-quote',
      start: 'top 85%',
    },
  });

  // Image parallax
  gsap.to('.story-image-wrap img', {
    y: '-15%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.story-image-wrap',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
  gsap.set('.story-image-wrap img', { y: '10%' });
}

function menuAnimations(ScrollTrigger) {
  // Label
  gsap.to('.menu-label', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.menu-header',
      start: 'top 75%',
    },
  });
  gsap.set('.menu-label', { y: 20 });

  // Title lines
  gsap.to('.menu-title .line-inner', {
    y: 0,
    duration: 1.2,
    ease: 'expo.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.menu-title',
      start: 'top 80%',
    },
  });

  // Subtitle
  gsap.to('.menu-subtitle', {
    opacity: 1,
    duration: 0.8,
    delay: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.menu-subtitle',
      start: 'top 85%',
    },
  });

  // Cards staggered
  ScrollTrigger.batch('.menu-card', {
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
      }),
    start: 'top 88%',
  });

  gsap.set('.menu-card', { scale: 0.95 });
}

function experienceAnimations(ScrollTrigger) {
  // Parallax on experience image 1
  if (document.querySelector('.exp-parallax .exp-image-wrap img')) {
    gsap.to('.exp-parallax .exp-image-wrap img', {
      y: '10%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.exp-parallax',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    gsap.set('.exp-parallax .exp-image-wrap img', { y: '-10%' });
  }

  // Quote Card
  gsap.to('.exp-quote-card', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.exp-parallax',
      start: 'top 80%',
    },
  });
  gsap.set('.exp-quote-card', { y: 40, opacity: 0 });

  // Quote text inside card
  gsap.to('.exp-quote', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.exp-quote',
      start: 'top 80%',
    },
  });
  gsap.set('.exp-quote', { opacity: 0 });

  gsap.to('.exp-quote-author', {
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.exp-quote-author',
      start: 'top 85%',
    },
  });
  gsap.set('.exp-quote-author', { opacity: 0 });

  // Counter numbers — animate from 0
  gsap.utils.toArray('.stat-number').forEach((el) => {
    const target = parseInt(el.dataset.value, 10);
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        el.querySelector('.stat-value').textContent = Math.round(
          obj.val
        ).toLocaleString();
      },
    });
  });

  // Latte parallax
  if (document.querySelector('.exp-latte .exp-image-wrap img')) {
    gsap.to('.exp-latte .exp-image-wrap img', {
      y: '10%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.exp-latte',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    gsap.set('.exp-latte .exp-image-wrap img', { y: '-10%' });
  }

  // Latte text card
  gsap.to('.exp-latte-text', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.exp-latte',
      start: 'top 80%',
    },
  });
  gsap.set('.exp-latte-text', { y: 40, opacity: 0 });

  // Latte text elements
  gsap.to('.exp-latte-text .t-label', {
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
    scrollTrigger: {
      trigger: '.exp-latte-text',
      start: 'top 80%',
    },
  });
  gsap.set('.exp-latte-text .t-label', { opacity: 0 });

  gsap.to('.exp-latte-title', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.exp-latte-title',
      start: 'top 80%',
    },
  });
  gsap.set('.exp-latte-title', { y: 15, opacity: 0 });
}

function locationAnimations(ScrollTrigger) {
  // Label
  gsap.to('.location-label', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.location',
      start: 'top 75%',
    },
  });
  gsap.set('.location-label', { y: 20 });

  // Title lines
  gsap.to('.location-title .line-inner', {
    y: 0,
    duration: 1.2,
    ease: 'expo.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.location-title',
      start: 'top 80%',
    },
  });

  // Image
  gsap.to('.location-image-wrap', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.location-image-wrap',
      start: 'top 80%',
    },
  });

  // Detail items
  gsap.utils.toArray('.location-detail-item').forEach((item, i) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
      },
    });
  });

  // Image parallax
  if (document.querySelector('.location-image-wrap img')) {
    gsap.to('.location-image-wrap img', {
      y: '-10%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.location-image-wrap',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    gsap.set('.location-image-wrap img', { y: '5%' });
  }
}

function footerAnimations(ScrollTrigger) {
  gsap.from('.footer-logo', {
    opacity: 0,
    scale: 0.7,
    rotation: -15,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 85%',
    },
  });

  gsap.from('.footer-tagline', {
    opacity: 0,
    y: 15,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 85%',
    },
  });

  gsap.from('.footer-link', {
    opacity: 0,
    y: 10,
    duration: 0.6,
    stagger: 0.06,
    delay: 0.4,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.footer-links',
      start: 'top 90%',
    },
  });
}
