/**
 * theme.js — Project NOVA Design Token Mirror
 *
 * Purpose:
 *   JavaScript mirror of the Design System tokens defined in index.css (@theme)
 *   and globals.css (:root). Used wherever CSS classes are not applicable:
 *     - GSAP timelines (color, duration, easing values)
 *     - Framer Motion variants (duration, ease arrays)
 *     - Programmatic style calculation
 *     - Canvas / WebGL contexts
 *
 * Rule: If a value changes in index.css, update this file to match.
 *
 * Design System Reference: DESIGN_SYSTEM.md §6–§25
 */


/* ── COLOR TOKENS ─────────────────────────────────────────────── */
export const COLORS = {
  // Backgrounds
  background:  '#020617',
  surface:     '#0F172A',
  surfaceAlt:  '#1E293B',

  // Brand Accents
  primary:   '#00E5FF',
  secondary: '#7C3AED',
  success:   '#14F195',
  warning:   '#FACC15',
  error:     '#EF4444',

  // Text Scale (DS §7 — Typography Colors)
  text: {
    primary:  '#F8FAFC',
    secondary:'#CBD5E1',
    tertiary: '#94A3B8',
    disabled: '#64748B',
  },

  // Border Colors
  border: {
    primary:  'rgba(255, 255, 255, 0.08)',
    secondary:'rgba(255, 255, 255, 0.05)',
    active:   '#00E5FF',
  },

  // Overlay (Hero video dim)
  overlay: 'rgba(2, 6, 23, 0.65)',
};


/* ── TYPOGRAPHY TOKENS ────────────────────────────────────────── */
export const TYPOGRAPHY = {
  font: {
    display: "'Space Grotesk', sans-serif",
    body:    "'Inter', sans-serif",
  },

  // DS §8 — Font Scale
  size: {
    displayXl: '4.5rem',    /* 72px */
    displayLg: '3.75rem',   /* 60px */
    displayMd: '3rem',      /* 48px */
    headingXl: '2.5rem',    /* 40px */
    headingLg: '2rem',      /* 32px */
    headingMd: '1.5rem',    /* 24px */
    bodyLg:    '1.125rem',  /* 18px */
    bodyMd:    '1rem',      /* 16px */
    bodySm:    '0.875rem',  /* 14px */
    caption:   '0.75rem',   /* 12px */
  },

  weight: {
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
  },

  // DS §8 — Line Heights
  lineHeight: {
    display: 1.1,
    heading: 1.2,
    body:    1.6,
    caption: 1.5,
  },
};


/* ── SPACING TOKENS ───────────────────────────────────────────── */
/**
 * DS §9 — 8-point grid spacing system.
 * Keys match the DS token names (space.1, space.2, etc.)
 * Values are strings for direct use in GSAP / inline styles.
 */
export const SPACING = {
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  8:  '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',

  // Named section spacing
  section: {
    desktop: '120px',
    tablet:  '96px',
    mobile:  '72px',
  },
};


/* ── RADIUS TOKENS ────────────────────────────────────────────── */
export const RADIUS = {
  sm:   '8px',
  md:   '16px',
  lg:   '24px',
  xl:   '32px',
  full: '9999px',
};


/* ── SHADOW TOKENS ────────────────────────────────────────────── */
export const SHADOWS = {
  // Elevation levels (DS §13)
  elevation1: '0 4px 20px rgba(0, 0, 0, 0.15)',
  elevation2: '0 10px 40px rgba(0, 0, 0, 0.25)',
  elevation3: '0 20px 60px rgba(0, 0, 0, 0.35)',

  // Glow shadows (DS §15)
  glowPrimary:   '0 0 20px rgba(0, 229, 255, 0.35)',
  glowSecondary: '0 0 24px rgba(124, 58, 237, 0.30)',
  glowPrimaryLg: '0 0 40px rgba(0, 229, 255, 0.50)',
};


/* ── GLASS TOKENS ─────────────────────────────────────────────── */
export const GLASS = {
  // DS §14 — Glass Card: 5% opacity, 16px blur
  card: {
    background: 'rgba(15, 23, 42, 0.05)',
    blur:       '16px',
    border:     'rgba(255, 255, 255, 0.08)',
  },
  // DS §14 — Navigation Glass: 10% opacity, 24px blur
  nav: {
    background: 'rgba(15, 23, 42, 0.10)',
    blur:       '24px',
  },
};


/* ── MOTION TOKENS ────────────────────────────────────────────── */
/**
 * DS §25 — Animation System
 * duration values are in SECONDS for Framer Motion and GSAP.
 * CSS uses the --duration-* vars in milliseconds.
 */
export const MOTION = {
  duration: {
    fast:   0.2,    /* 200ms — hover transitions  */
    normal: 0.4,    /* 400ms — standard           */
    slow:   0.8,    /* 800ms — cards, video       */
    hero:   1.2,    /* 1200ms — hero reveal       */
    text:   0.6,    /* 600ms — text animations    */
    cards:  0.8,    /* 800ms — card reveals       */
    section:1.0,    /* 1000ms — section entrance  */
  },

  /**
   * Framer Motion easing arrays (cubic-bezier format).
   * Reference GSAP equivalent in comments.
   */
  ease: {
    out:       [0.16, 1, 0.3, 1],       /* custom expo (matches --ease-nova-out) */
    strongOut: [0.22, 1, 0.36, 1],      /* power3.out */
    inOut:     [0.76, 0, 0.24, 1],      /* power2.inOut */
    smooth:    [0.25, 0.1, 0.25, 1],    /* ease       */
  },

  /**
   * GSAP easing strings — use with gsap.to(el, { ease: MOTION.gsap.out })
   */
  gsap: {
    out:       'power2.out',
    strongOut: 'power3.out',
    expoOut:   'expo.out',
    inOut:     'power2.inOut',
    linear:    'none',
  },

  /**
   * Standard Framer Motion transition presets.
   * Use in component variants: transition: MOTION.transition.default
   */
  transition: {
    default: { duration: 0.6,  ease: [0.16, 1, 0.3, 1] },
    fast:    { duration: 0.2,  ease: [0.16, 1, 0.3, 1] },
    slow:    { duration: 1.0,  ease: [0.16, 1, 0.3, 1] },
    spring:  { type: 'spring', stiffness: 80, damping: 20 },
  },
};


/* ── BREAKPOINTS ──────────────────────────────────────────────── */
/**
 * DS §26 — Responsive system breakpoints (in px, as numbers).
 * Use with window.innerWidth comparisons in JS.
 * Mirrors the @theme --breakpoint-* values in index.css.
 */
export const BREAKPOINTS = {
  sm:  360,   /* Mobile  */
  md:  768,   /* Tablet  */
  lg:  1024,  /* Laptop  */
  xl:  1280,  /* Desktop */
  xxl: 1440,  /* Wide    */
};


/* ── Z-INDEX SCALE ────────────────────────────────────────────── */
/**
 * Predictable stacking context.
 * Mirrors --z-* CSS variables in globals.css :root.
 */
export const Z_INDEX = {
  below:   -1,
  base:     0,
  above:    10,
  nav:      100,
  overlay:  200,
  modal:    300,
  loader:   400,
  toast:    500,
};


/* ── CONVENIENCE: CSS VARIABLE ACCESSOR ───────────────────────── */
/**
 * Reads a computed CSS variable from :root at runtime.
 * Useful for GSAP when you need the current token value.
 *
 * @param {string} name - variable name without '--' (e.g. 'color-primary')
 * @returns {string}
 *
 * Example:
 *   const cyan = getCSSVar('color-primary'); // '#00E5FF'
 */
export const getCSSVar = (name) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim();
