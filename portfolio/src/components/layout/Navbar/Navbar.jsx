/**
 * Navbar.jsx — Project NOVA Layout Component
 *
 * Fixed glass navigation bar with:
 *   - Transparent at top → glass on scroll (DS §20)
 *   - Active section indicator with underline + glow (DS §20)
 *   - Animated hamburger menu for mobile (DS §20)
 *   - Full keyboard navigation & ARIA compliance (DS §27)
 *   - Smooth scroll on link click via Lenis
 *   - Staggered entrance animation on load
 *
 * DS Reference: DESIGN_SYSTEM.md §20 — Navigation System
 * PRD Reference: PRD.md §10 — Navigation Strategy
 *
 * Props: none — fully self-contained via constants.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { NAV_ITEMS, NAV_CONFIG, SECTION_IDS } from '../../../constants/navigations';
import { SITE_CONFIG } from '../../../constants/config';
import { MOTION } from '../../../constants/theme';
import useActiveSection from '../../../hooks/useActiveSection';

/* ── LOGO MARK ─────────────────────────────────────────────────── */
function NavLogo({ onClick }) {
  return (
    <a
      href={`#${SECTION_IDS.home}`}
      onClick={onClick}
      className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
      aria-label="Project NOVA — Back to top"
    >
      {/* Geometric mark */}
      <div className="relative w-8 h-8 flex items-center justify-center" aria-hidden="true">
        <div className="absolute inset-0 border border-primary/60 rotate-45 group-hover:border-primary group-hover:shadow-glow-primary transition-all duration-300" />
        <div className="absolute inset-1.5 bg-primary/20 rotate-45 group-hover:bg-primary/30 transition-all duration-300" />
        <span className="relative z-10 font-display font-bold text-xs text-primary leading-none">A</span>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span className="font-display font-bold text-sm text-text-primary tracking-wider group-hover:text-primary transition-colors duration-300">
          {SITE_CONFIG.name.split(' ')[0].toUpperCase()}
        </span>
        <span className="font-body text-[9px] text-primary/70 tracking-[0.2em] uppercase mt-0.5">
          Portfolio
        </span>
      </div>
    </a>
  );
}

/* ── DESKTOP NAV ITEM ───────────────────────────────────────────── */
function NavItem({ item, isActive, onClick }) {
  return (
    <a
      href={item.href}
      onClick={onClick}
      className={[
        'relative px-1 py-2 font-body text-sm font-medium tracking-wide',
        'transition-colors duration-200',
        'focus-visible:outline-none rounded-sm',
        isActive
          ? 'text-primary'
          : 'text-text-secondary hover:text-text-primary',
      ].join(' ')}
      aria-current={isActive ? 'page' : undefined}
    >
      {item.label}

      {/* Active underline indicator — DS §20: underline + glow + color transition */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            layoutId="nav-active-indicator"
            className="absolute bottom-0 left-0 right-0 h-px bg-primary"
            style={{ boxShadow: '0 0 6px rgba(0, 229, 255, 0.8)' }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{ duration: MOTION.duration.fast, ease: MOTION.ease.out }}
          />
        )}
      </AnimatePresence>
    </a>
  );
}

/* ── HAMBURGER BUTTON ───────────────────────────────────────────── */
function HamburgerButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-nav-menu"
      className={[
        'relative flex flex-col justify-center items-center w-10 h-10',
        'rounded-md border border-border-primary',
        'hover:border-primary/50 hover:bg-primary/5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'transition-all duration-200',
      ].join(' ')}
    >
      {/* Three bar lines — animate to X when open */}
      <span aria-hidden="true" className="flex flex-col gap-1.5 w-5">
        <motion.span
          className="block h-px bg-text-primary origin-center rounded-full"
          animate={isOpen
            ? { rotate: 45, y: 7, backgroundColor: 'var(--color-primary)' }
            : { rotate: 0, y: 0 }
          }
          transition={{ duration: MOTION.duration.fast, ease: MOTION.ease.out }}
        />
        <motion.span
          className="block h-px bg-text-primary rounded-full"
          animate={isOpen
            ? { opacity: 0, scaleX: 0 }
            : { opacity: 1, scaleX: 1 }
          }
          transition={{ duration: MOTION.duration.fast }}
        />
        <motion.span
          className="block h-px bg-text-primary origin-center rounded-full"
          animate={isOpen
            ? { rotate: -45, y: -7, backgroundColor: 'var(--color-primary)' }
            : { rotate: 0, y: 0 }
          }
          transition={{ duration: MOTION.duration.fast, ease: MOTION.ease.out }}
        />
      </span>
    </button>
  );
}

/* ── MOBILE MENU OVERLAY ────────────────────────────────────────── */
function MobileMenu({ isOpen, activeId, onNavClick }) {
  /* Trap focus inside menu when open */
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const focusable = menuRef.current?.querySelectorAll('a, button');
    focusable?.[0]?.focus();
  }, [isOpen]);

  /* Close on Escape key */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onNavClick(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onNavClick]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[98] "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: MOTION.duration.fast }}
            onClick={() => onNavClick(null)}
            aria-hidden="true"
          />

          {/* Slide-in panel */}
          <motion.nav
            ref={menuRef}
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className={[
              'fixed top-0 right-0 bottom-0 w-[min(320px,80vw)]',
              'glass-nav border-l border-border-primary',
              'flex flex-col z-[200]',
            ].join(' ')}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: MOTION.duration.slow, ease: MOTION.ease.out }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border-secondary">
              <span className="font-display font-semibold text-sm text-primary tracking-[0.15em] uppercase">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => onNavClick(null)}
                aria-label="Close menu"
                className="w-8 h-8 flex items-center justify-center text-text-tertiary hover:text-primary transition-colors rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <ul className="flex flex-col flex-1 px-6 py-8 gap-1" role="list">
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeId === item.id;
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: MOTION.duration.normal,
                      ease:     MOTION.ease.out,
                      delay:    i * 0.06,
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => onNavClick(item.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'flex items-center gap-3 px-4 py-3.5 rounded-lg',
                        'font-body text-base font-medium',
                        'transition-all duration-200',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                        isActive
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary',
                      ].join(' ')}
                    >
                      {/* Active dot */}
                      <span
                        className={[
                          'w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200',
                          isActive ? 'bg-primary shadow-glow-primary' : 'bg-text-disabled',
                        ].join(' ')}
                        aria-hidden="true"
                      />
                      {item.label}

                      {/* Index number */}
                      <span className="ml-auto font-mono text-xs text-text-disabled" aria-hidden="true">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {/* Footer blurb */}
            <div className="px-6 py-6 border-t border-border-secondary">
              <p className="font-body text-xs text-text-disabled tracking-wide">
                Project NOVA — {SITE_CONFIG.name}
              </p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── MAIN NAVBAR COMPONENT ──────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  const sectionIds  = NAV_ITEMS.map((item) => item.id);
  const activeId    = useActiveSection(sectionIds);

  // --- Scroll Progress Indicator ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  /* Scroll threshold: transparent → glass */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > NAV_CONFIG.scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* Smooth scroll on nav click */
  const handleNavClick = useCallback((href) => {
    setMobileOpen(false);
    if (!href) return;

    /* Small delay lets the mobile menu close animation finish */
    setTimeout(() => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }, []);

  /* Staggered entrance animation (nav items appear after loader) */
  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: { duration: MOTION.duration.normal, ease: MOTION.ease.out } },
  };

  return (
    <>
      <motion.header
        role="banner"
        className={[
          /* Fixed position — floating pill (Dynamic Island) */
          'fixed top-6 left-1/2 -translate-x-1/2 z-[100]',
          'w-[calc(100%-3rem)] md:w-max',
          'rounded-full',

          /* DS §20: transparent at top, glass after scrolling */
          'transition-all duration-500',
          scrolled
            ? 'glass-nav shadow-elevation-2'
            : 'bg-transparent border border-transparent',
        ].join(' ')}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: MOTION.duration.slow, ease: MOTION.ease.out, delay: 0.1 }}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary origin-left shadow-[0_0_10px_rgba(0,229,255,0.8)] z-50 rounded-full"
          style={{ scaleX }}
        />

        {/* Skip to content — accessibility */}
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>

        <div className="px-5 md:px-8">
          <nav
            aria-label="Primary navigation"
            className="flex items-center justify-between gap-8 h-14 md:h-16"
          >
            {/* Logo */}
            <motion.div variants={itemVariants} initial="hidden" animate="visible">
              <NavLogo onClick={() => handleNavClick(`#${SECTION_IDS.home}`)} />
            </motion.div>

            {/* Desktop nav links */}
            <motion.ul
              className="hidden md:flex items-center gap-8"
              role="list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {NAV_ITEMS.map((item) => (
                <motion.li key={item.id} variants={itemVariants}>
                  <NavItem
                    item={item}
                    isActive={activeId === item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                  />
                </motion.li>
              ))}
            </motion.ul>


            {/* Mobile hamburger */}
            <motion.div
              className="flex md:hidden"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <HamburgerButton
                isOpen={mobileOpen}
                onClick={() => setMobileOpen((prev) => !prev)}
              />
            </motion.div>
          </nav>
        </div>
      </motion.header>

      {/* Desktop CTA (Fixed top right, home only) */}
      <AnimatePresence>
        {activeId === 'home' && (
          <motion.div
            className="hidden md:flex items-center fixed top-6 right-6 md:right-8 h-14 md:h-16 z-[100]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: MOTION.duration.normal, delay: 0.1 }}
          >
            <a
              href={SITE_CONFIG.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'btn-base btn-secondary btn-sm glass-nav',
                'hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-glow-primary',
                'transition-all duration-200',
              ].join(' ')}
              aria-label="View resume"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile slide-in menu */}
      <MobileMenu
        isOpen={mobileOpen}
        activeId={activeId}
        onNavClick={handleNavClick}
      />
    </>
  );
}
