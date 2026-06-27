/**
 * VideoBackground.jsx — Project NOVA Layout Component
 *
 * Implements a global, fixed-position background video player that maps
 * section scrolling events to dedicated videos with smooth crossfade transitions.
 *
 * Requirements Met:
 *   - Background videos fixed behind UI (§23)
 *   - 800ms crossfade transitions (§23)
 *   - Overlay support: Always 65% Dark (except Home which delegates to GSAP) (§7, §23)
 *   - Responsive & Mobile friendly (connection check, autoplay error fallback)
 *   - Performance optimized (pauses off-screen players, Visibility API sync)
 *   - Accessibility (respects prefers-reduced-motion) (§27)
 *
 * DS Reference: DESIGN_SYSTEM.md §23 — Video System
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useActiveSection from '../../../hooks/useActiveSection';
import { SECTION_TO_VIDEO, FALLBACK_BACKDROP_STYLE } from './VideoBackground.constants';

export default function VideoBackground() {
  const activeSection = useActiveSection(['home', 'about', 'skills', 'projects', 'contact']);
  const targetSrc = SECTION_TO_VIDEO[activeSection] || SECTION_TO_VIDEO.home;

  /* Media capability states */
  const [shouldPlayVideo, setShouldPlayVideo] = useState(true);

  /* Dual video player states to support crossfade */
  const [srcA, setSrcA] = useState(targetSrc);
  const [srcB, setSrcB] = useState('');
  const [activePlayer, setActivePlayer] = useState('A');

  const videoARef = useRef(null);
  const videoBRef = useRef(null);

  /* ── 1. INITIAL PERFORMANCE / ACCESSIBILITY CHECKS ── */
  useEffect(() => {
    // Respect system settings for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldPlayVideo(false);
      return;
    }

    // Respect user bandwidth limits (Network Information API)
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      if (connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType)) {
        setShouldPlayVideo(false);
        return;
      }
    }
  }, []);

  /* ── 2. HANDLE SCROLL SECTION CHANGE ── */
  useEffect(() => {
    if (!shouldPlayVideo || !targetSrc) return;

    if (activePlayer === 'A') {
      if (srcA === targetSrc) return;
      // Load next video in B and transition focus to B
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSrcB(targetSrc);
      setActivePlayer('B');
    } else {
      if (srcB === targetSrc) return;
      // Load next video in A and transition focus to A
      setSrcA(targetSrc);
      setActivePlayer('A');
    }
  }, [targetSrc, shouldPlayVideo, activePlayer, srcA, srcB]);

  /* ── 3. PLAYBACK MANAGEMENT & GPU OPTIMIZATION ── */
  useEffect(() => {
    if (!shouldPlayVideo) return;

    const activeVideo = activePlayer === 'A' ? videoARef.current : videoBRef.current;
    const inactiveVideo = activePlayer === 'A' ? videoBRef.current : videoARef.current;

    // Direct playback invocation with safety catch blocks
    if (activeVideo) {
      activeVideo.play().catch((err) => {
        console.warn('VideoBackground: Autoplay was blocked or interrupted:', err);
      });
    }

    // GPU Optimization: Pause the inactive video player once the 800ms fade transition ends
    const timer = setTimeout(() => {
      if (inactiveVideo) {
        inactiveVideo.pause();
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [activePlayer, shouldPlayVideo]);

  /* ── 4. VISIBILITY API SYNC (Tab Backgrounding) ── */
  useEffect(() => {
    if (!shouldPlayVideo) return;

    const handleVisibilityChange = () => {
      const activeVideo = activePlayer === 'A' ? videoARef.current : videoBRef.current;
      if (!activeVideo) return;

      if (document.hidden) {
        activeVideo.pause();
      } else {
        activeVideo.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [activePlayer, shouldPlayVideo]);

  const isHome = activeSection === 'home';

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-[-10]"
      aria-hidden="true"
    >
      {/* ── Layer 1: Global Space Nebula CSS Fallback (Always present behind video) ── */}
      <div
        className="absolute inset-0 bg-background z-0"
        style={FALLBACK_BACKDROP_STYLE}
      />

      {/* ── Layer 2: Crossfading Video Layers ── */}
      {shouldPlayVideo && (
        <>
          {srcA && (
            <motion.video
              ref={videoARef}
              src={srcA}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ pointerEvents: 'none' }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              animate={{ opacity: activePlayer === 'A' ? 1 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          )}

          {srcB && (
            <motion.video
              ref={videoBRef}
              src={srcB}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ pointerEvents: 'none' }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              animate={{ opacity: activePlayer === 'B' ? 1 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          )}
        </>
      )}

      {/* ── Layer 3: Dark Overlay (rgba(2, 6, 23, 0.65)) ── */}
      {/* Home section overlay opacity is 0 because the Hero handles its initialization GSAP fade-in */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHome ? 0 : 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{ backgroundColor: 'rgba(2, 6, 23, 0.65)' }}
      />
    </div>
  );
}
