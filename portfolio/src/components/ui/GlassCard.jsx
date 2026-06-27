/**
 * GlassCard.jsx — Project NOVA UI Component
 *
 * A glassmorphism card component. The primary surface for
 * displaying grouped information in Project NOVA.
 *
 * DS Reference: DESIGN_SYSTEM.md §14 — Glassmorphism, §19 — Card System
 *
 * Variants:
 *   'default'  — 5% opacity, 16px blur (glass card)
 *   'surface'  — 15% opacity, 20px blur (elevated glass)
 *   'skill'    — Skill card with hover glow + border animation
 *   'project'  — Project card with image area
 *   'mission'  — Timeline/achievement card (mission card)
 *
 * Usage:
 *   <GlassCard>
 *     <p>Content here</p>
 *   </GlassCard>
 *
 *   <GlassCard variant="skill" hover>
 *     <SkillContent />
 *   </GlassCard>
 *
 *   <GlassCard
 *     variant="project"
 *     hover
 *     className="col-span-2"
 *   >
 *     <ProjectContent />
 *   </GlassCard>
 */

import { motion } from 'framer-motion';
import { MOTION } from '../../constants/theme';

/* ── VARIANT STYLE MAPS ─────────────────────────────────────────── */

const VARIANTS = {
  default: 'glass-card rounded-lg',
  surface: 'glass-surface rounded-lg',
  skill:   'glass-card rounded-lg',
  project: 'glass-card rounded-xl overflow-hidden',
  mission: 'glass-card rounded-lg',
};

/* Hover state styles per variant */
const HOVER_CLASSES = {
  default: 'hover:border-primary/30 hover:shadow-elevation-2',
  surface: 'hover:border-primary/30 hover:shadow-elevation-2',
  skill:   'hover:border-primary/50 hover:shadow-glow-primary hover:-translate-y-0.5 hover:scale-[1.02]',
  project: 'hover:border-primary/40 hover:shadow-elevation-3 hover:-translate-y-1',
  mission: 'hover:border-primary/30 hover:shadow-elevation-2 hover:-translate-y-0.5',
};

/* Padding per variant (can be overridden via className) */
const PADDING = {
  default: 'p-6',
  surface: 'p-6',
  skill:   'p-5',
  project: 'p-0',    /* Project cards control their own padding internally */
  mission: 'p-6',
};

/* ── COMPONENT ──────────────────────────────────────────────────── */

/**
 * @param {object}           props
 * @param {'default'|'surface'|'skill'|'project'|'mission'} [props.variant='default']
 * @param {boolean}          [props.hover=false]     - Enable hover animations
 * @param {boolean}          [props.animate=false]   - Enable entrance animation (fade-in-up)
 * @param {number}           [props.delay=0]         - Entrance animation delay (seconds)
 * @param {boolean}          [props.noPadding=false] - Remove default padding
 * @param {string}           [props.className]
 * @param {string}           [props.as='div']        - HTML element to render
 * @param {React.ReactNode}  props.children
 */
export default function GlassCard({
  variant   = 'default',
  hover     = false,
  animate   = false,
  delay     = 0,
  noPadding = false,
  className = '',
  as        = 'div',
  children,
  ...rest
}) {
  const baseClasses = [
    VARIANTS[variant]  ?? VARIANTS.default,
    !noPadding ? (PADDING[variant] ?? PADDING.default) : '',
    hover ? [
      HOVER_CLASSES[variant] ?? HOVER_CLASSES.default,
      'transition-all duration-400',   /* DS: normal 400ms */
    ].join(' ') : '',
    'relative',
    className,
  ].filter(Boolean).join(' ');

  /* Entrance animation variants for Framer Motion */
  const entranceVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y:       0,
      transition: {
        duration: MOTION.duration.cards,   /* 0.8s per DS */
        ease:     MOTION.ease.out,
        delay,
      },
    },
  };

  const Tag = motion[as] ?? motion.div;

  if (animate) {
    return (
      <Tag
        className={baseClasses}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-64px' }}
        variants={entranceVariants}
        {...rest}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag className={baseClasses} {...rest}>
      {children}
    </Tag>
  );
}
