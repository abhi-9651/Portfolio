/**
 * navigations.js — Project NOVA
 *
 * Navigation constants: items, section IDs, and nav behavior config.
 * Used by: Navbar component, mobile menu, scroll-spy hooks.
 *
 * DS Reference: DESIGN_SYSTEM.md §20 — Navigation System
 * PRD Reference: PRD.md §10 — Information Architecture
 */


/**
 * Primary navigation items.
 * Order matches the user journey defined in PRD §9.
 *
 * @property {string} id     - Matches the section's HTML id attribute
 * @property {string} label  - Display text in the nav
 * @property {string} href   - Anchor link for smooth scroll
 */
export const NAV_ITEMS = [
  {
    id:    'home',
    label: 'Home',
    href:  '#home',
  },
  {
    id:    'about',
    label: 'About',
    href:  '#about',
  },
  {
    id:    'skills',
    label: 'Skills',
    href:  '#skills',
  },
  {
    id:    'projects',
    label: 'Projects',
    href:  '#projects',
  },
  {
    id:    'contact',
    label: 'Contact',
    href:  '#contact',
  },
];


/**
 * Navigation behavior configuration.
 *
 * scrollThreshold : px scrolled before nav transitions from transparent → glass
 * mobileBreakpoint: px below which the hamburger menu replaces desktop nav
 * animationDelay  : stagger delay (ms) between nav item reveal animations
 */
export const NAV_CONFIG = {
  scrollThreshold:  50,
  mobileBreakpoint: 768,
  animationDelay:   80,     /* ms stagger per item */
};


/**
 * Section IDs — canonical reference for all section anchors.
 * Use these instead of string literals to prevent typos.
 *
 * @example
 *   document.getElementById(SECTION_IDS.about)
 *   href={`#${SECTION_IDS.projects}`}
 */
export const SECTION_IDS = {
  home:         'home',
  about:        'about',
  skills:       'skills',
  projects:     'projects',
  achievements: 'achievements',
  contact:      'contact',
  footer:       'footer',
};
