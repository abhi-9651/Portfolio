/**
 * GlowText.jsx — Project NOVA UI Component
 *
 * Renders text with the design system's glow and gradient effects.
 * Used for: Hero heading, section accent words, CTA emphasis.
 *
 * DS Reference:
 *   §15 — Glow System: "Never apply glow to body text"
 *   §7  — Color System: primary #00E5FF, secondary #7C3AED
 *   §8  — Typography scale
 *
 * Usage:
 *   <GlowText>ABHIJEET KUSHWAHA</GlowText>
 *
 *   <GlowText variant="gradient" as="span">
 *     Frontend Developer
 *   </GlowText>
 *
 *   <GlowText variant="secondary" size="lg" as="h3">
 *     Technology Laboratory
 *   </GlowText>
 *
 *   <GlowText variant="gradient" animate>
 *     Building Digital Experiences
 *   </GlowText>
 */

import { motion } from 'framer-motion';
import { MOTION } from '../../constants/theme';

/* ── VARIANT STYLE MAP ──────────────────────────────────────────── */

const VARIANTS = {
  /** Primary — solid cyan with text-shadow glow */
  primary: 'text-primary glow-text',

  /** Secondary — solid violet with glow */
  secondary: 'text-secondary [text-shadow:0_0_20px_rgba(124,58,237,0.55)]',

  /** Gradient — animated cyan → violet gradient */
  gradient: 'gradient-text',

  /** Gradient animated — slowly shifting gradient */
  'gradient-animated': 'gradient-text-animated',

  /** White — pure white with subtle primary glow */
  white: 'text-text-primary glow-text',

  /** Muted — secondary text, no glow */
  muted: 'text-text-secondary',
};

/* ── SIZE MAP (mirrors DS §8 typography scale) ──────────────────── */
const SIZES = {
  xs:   'text-xs',
  sm:   'text-sm',
  base: 'text-base',
  lg:   'text-lg',
  xl:   'text-xl',
  '2xl':'text-2xl',
  '3xl':'text-3xl',
  '4xl':'text-4xl',
  '5xl':'text-5xl',
  '6xl':'text-6xl',   /* display-md: ~48px */
  '7xl':'text-7xl',   /* display-lg: ~60px */
  '8xl':'text-8xl',   /* display-xl: ~72px */
};

/* ── COMPONENT ──────────────────────────────────────────────────── */

/**
 * @param {object}    props
 * @param {'primary'|'secondary'|'gradient'|'gradient-animated'|'white'|'muted'} [props.variant='primary']
 * @param {string}    [props.size]           - Tailwind text-* size (e.g. '5xl')
 * @param {string}    [props.as='span']      - HTML element to render
 * @param {boolean}   [props.bold=false]     - font-bold
 * @param {boolean}   [props.display=false]  - Use display font (Space Grotesk) instead of body
 * @param {boolean}   [props.animate=false]  - Fade-in entrance animation
 * @param {number}    [props.delay=0]        - Entrance animation delay (seconds)
 * @param {string}    [props.className]
 * @param {React.ReactNode} props.children
 */
export default function GlowText({
  variant  = 'primary',
  size,
  as       = 'span',
  bold     = false,
  display  = false,
  animate  = false,
  delay    = 0,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    VARIANTS[variant] ?? VARIANTS.primary,
    size ? (SIZES[size] ?? '') : '',
    bold ? 'font-bold' : '',
    display ? 'font-display' : 'font-body',
    className,
  ].filter(Boolean).join(' ');

  const Tag = animate ? motion[as] ?? motion.span : as;

  const motionProps = animate
    ? {
        initial:    { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport:   { once: true },
        transition: {
          duration: MOTION.duration.text,
          ease:     MOTION.ease.out,
          delay,
        },
      }
    : {};

  return (
    <Tag className={classes} {...motionProps} {...rest}>
      {children}
    </Tag>
  );
}
