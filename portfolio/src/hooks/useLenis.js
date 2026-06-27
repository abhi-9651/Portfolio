/**
 * useLenis.js — Project NOVA Custom Hook
 *
 * Initializes Lenis smooth scroll and integrates it with Framer Motion's
 * useAnimationFrame for synchronized animation updates.
 *
 * PRD Reference: PRD.md §13 — Scroll Behaviour
 *   "Smooth scrolling powered by Lenis"
 *   "No sudden jumps."
 *
 * @returns {import('lenis').default | null} lenis instance (for programmatic scroll)
 *
 * Usage (in App.jsx root):
 *   useLenis();
 *
 * Programmatic scroll:
 *   const lenis = useLenis();
 *   lenis?.scrollTo('#about', { duration: 1.2 });
 */

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    /* Initialize Lenis with Project NOVA tuning */
    const lenis = new Lenis({
      duration:  1.2,          /* Feel: heavy and smooth per DS §24 */
      easing:    (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), /* expo-out */
      direction: 'vertical',
      smooth:    true,
      touchMultiplier: 2,
      infinite:  false,
    });

    lenisRef.current = lenis;

    /* RAF loop — drives Lenis scroll updates */
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    /* Disable Lenis when user prefers reduced motion */
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      lenis.destroy();
      lenisRef.current = null;
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
