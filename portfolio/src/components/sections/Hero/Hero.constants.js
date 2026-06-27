/**
 * Hero.constants.js — Project NOVA
 *
 * Hero-specific constants that supplement config.js for animation control.
 * DS Reference: DESIGN_SYSTEM.md §28 — Folder Convention
 * PRD Reference: PRD.md §11 — Hero Animation Timeline
 */

/**
 * Terminal sequence lines that appear during the initialization phase.
 * These appear BEFORE the Loader exits (coordinated with Loader timing).
 * In the Hero, they replay briefly then collapse when ACCESS GRANTED is shown.
 */
export const HERO_SEQUENCE = [
  { id: 'init',       text: 'INITIALIZING...',                 delay: 0.3 },
  { id: 'connecting', text: 'CONNECTING TO DIGITAL NETWORK...', delay: 1.8 },
  { id: 'granted',    text: 'ACCESS GRANTED',                   delay: 3.2, primary: true },
];

/**
 * Rotating subtitle roles (typed one after another).
 * PRD §11 — Subtitle: Frontend Developer | CSE Student | Problem Solver
 */
export const HERO_ROLES = [
  'Frontend Developer',
  'CSE Student',
  'Problem Solver',
];

/**
 * Hero tagline — appears after name reveal.
 * PRD §11 — "Building Digital Experiences Through Code"
 */
export const HERO_TAGLINE = 'Building Digital Experiences Through Code';

/**
 * Mouse parallax sensitivity — DS: "subtle depth, no dramatic parallax"
 * Max offset in px from center at full mouse-to-edge movement.
 */
export const PARALLAX_STRENGTH = 8;

/**
 * CTA buttons — PRD: primary "View Projects", secondary "Get In Touch"
 */
export const HERO_CTAS = [
  { id: 'projects', label: 'View Projects', href: '#projects', variant: 'primary' },
  { id: 'contact',  label: 'Get In Touch',  href: '#contact',  variant: 'secondary' },
];
