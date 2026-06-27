/**
 * HeroAnimations.js — Project NOVA
 *
 * GSAP timeline factory for the Hero section.
 * Returns a fully-configured timeline that drives the entire Hero reveal sequence.
 */

import gsap from 'gsap';

export function createHeroTimeline(refs, onRolesStart) {
  const {
    nameEl,
    taglineEl,
    rolesEl,
    ctaEl,
    scrollEl,
    portraitEl,
    hudEls,
    coreEls,
  } = refs;

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  });

  // Fade in the AI Core behind the portrait
  if (coreEls?.length) {
    tl.fromTo(coreEls, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.5, stagger: 0.1 }, 0.2);
  }

  // Name Reveal
  if (nameEl) {
    tl.fromTo(
      nameEl,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0, y: 32 },
      { clipPath: 'inset(0 0% 0 0)', opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' },
      0.4
    );
  }

  // Tagline fade up
  if (taglineEl) {
    tl.fromTo(
      taglineEl,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9 },
      0.7
    );
  }

  // Role area fade in, trigger rotation
  if (rolesEl) {
    tl.fromTo(
      rolesEl,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, onComplete: onRolesStart },
      1.0
    );
  }

  // Portrait fade-in
  if (portraitEl) {
    tl.fromTo(
      portraitEl,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2 },
      0.8
    );
  }

  // Floating HUD Panels fade-in
  if (hudEls?.length) {
    tl.fromTo(
      hudEls,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.0, stagger: 0.15 },
      1.2
    );
  }

  // CTA buttons
  if (ctaEl) {
    const buttons = ctaEl.querySelectorAll(':scope > *');
    if (buttons.length) {
      tl.fromTo(buttons, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, 1.5);
    }
  }

  // Scroll Indicator
  if (scrollEl) {
    tl.fromTo(scrollEl, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 2.0);
  }

  return tl;
}

export function addParallaxEffect(targetEl) {
  if (!targetEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  let rafId = null;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;
  const strength = 10;

  function handleMouseMove(e) {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    targetRotateX = -y * strength;
    targetRotateY = x * strength;
  }

  function handleMouseLeave() {
    targetRotateX = 0;
    targetRotateY = 0;
  }

  function animate() {
    currentRotateX += (targetRotateX - currentRotateX) * 0.05;
    currentRotateY += (targetRotateY - currentRotateY) * 0.05;
    targetEl.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    rafId = requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseleave', handleMouseLeave);
  animate();

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseleave', handleMouseLeave);
    cancelAnimationFrame(rafId);
  };
}

export function addScrollExitEffect(heroEl, contentEl) {
  if (!heroEl || !contentEl) return () => {};

  let ticking = false;
  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - scrollY / 600);
        const yOffset = scrollY * 0.3;
        contentEl.style.opacity = opacity;
        contentEl.style.transform = `translateY(${yOffset}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}
