/**
 * ScrollIndicator.jsx — Project NOVA UI Component
 *
 * Animated "scroll to explore" indicator displayed at the bottom
 * of the Hero section. Draws the visitor's attention downward.
 *
 * DS Reference:
 *   §15 — Glow System: "Scroll indicator" is a valid glow target
 *   §25 — Animation System: scrollBounce keyframe (1.8s ease-in-out)
 *   §21 — Hero System: includes Scroll Indicator in the layout stack
 * PRD Reference: PRD.md §11 — Hero Section: "Animated glowing arrow"
 *
 * Visual Structure:
 *   [SCROLL TO EXPLORE] ← small caps label (optional)
 *         ↑
 *       [ | ]           ← scroll wheel mouse icon with animated dot
 *         ↓
 *         ↓             ← bouncing chevron arrows
 *
 * Usage:
 *   <ScrollIndicator />
 *
 *   <ScrollIndicator label="Scroll to Explore" />
 *
 *   <ScrollIndicator href="#about" label="Explore" />
 */

import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { MOTION } from '../../constants/theme';

/* ── SCROLL WHEEL ICON ──────────────────────────────────────────── */
function ScrollWheel() {
  return (
    <div
      className={[
        /* Outer mouse body */
        'w-6 h-9 rounded-full',
        'border-2 border-primary/60',
        'flex items-start justify-center pt-2',
        'relative',
      ].join(' ')}
      aria-hidden="true"
    >
      {/* Animated scroll dot */}
      <motion.div
        className="w-1 h-1.5 rounded-full bg-primary"
        animate={{
          y:       [0, 10, 0],
          opacity: [1, 0.3, 1],
        }}
        transition={{
          duration: 1.8,
          ease:     'easeInOut',
          repeat:   Infinity,
          repeatType: 'loop',
        }}
      />
    </div>
  );
}

/* ── COMPONENT ──────────────────────────────────────────────────── */

/**
 * @param {string}  [props.label='Scroll to Explore'] - Text label
 * @param {boolean} [props.showLabel=true]
 * @param {boolean} [props.showWheel=true]  - Show scroll wheel icon
 * @param {boolean} [props.showArrow=true]  - Show bouncing chevrons
 * @param {string}  [props.href='#about']   - Scroll target
 * @param {string}  [props.className]
 */
export default function ScrollIndicator({
  label     = 'Scroll to Explore',
  showLabel = true,
  showWheel = true,
  showArrow = true,
  href      = '#about',
  className = '',
}) {
  /* Staggered chevron variants */
  const arrowVariants = {
    animate: (i) => ({
      y:       [0, 6, 0],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration:   1.6,
        ease:       'easeInOut',
        repeat:     Infinity,
        delay:      i * 0.2,
        repeatType: 'loop',
      },
    }),
  };

  return (
    <motion.a
      href={href}
      className={[
        'flex flex-col items-center gap-3',
        'text-text-tertiary hover:text-primary',
        'transition-colors duration-200',
        'group cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4',
        className,
      ].filter(Boolean).join(' ')}
      aria-label={`${label} — click to scroll down`}
      /* Entrance animation — appears after hero sequence completes */
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: MOTION.duration.normal,
        ease:     MOTION.ease.out,
        delay:    6.0,   /* PRD: CTA at 6s, indicator follows */
      }}
    >
      {/* Label */}
      {showLabel && (
        <span
          className={[
            'font-body text-xs font-semibold tracking-[0.2em] uppercase',
            'group-hover:text-primary transition-colors duration-200',
          ].join(' ')}
        >
          {label}
        </span>
      )}

      {/* Scroll wheel */}
      {showWheel && (
        <div className="group-hover:[--primary-opacity:1]">
          <ScrollWheel />
        </div>
      )}

      {/* Stacked bouncing chevron arrows */}
      {showArrow && (
        <div
          className="flex flex-col items-center -gap-1"
          aria-hidden="true"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={arrowVariants}
              animate="animate"
              className="-mt-2 first:mt-0"
            >
              <FiChevronDown
                size={16}
                className="text-primary/60 group-hover:text-primary transition-colors duration-200"
                strokeWidth={2.5}
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.a>
  );
}
