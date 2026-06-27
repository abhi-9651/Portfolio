/**
 * SectionTitle.jsx — Project NOVA UI Component
 *
 * Consistent heading block for every section.
 * Renders the section label (chapter context), title, and subtitle.
 *
 * DS Reference: DESIGN_SYSTEM.md §8 — Typography, §21 — Hero System
 * PRD Reference: PRD.md §8 — Story Narrative (chapter labels)
 *
 * Visual Structure:
 *   [CHAPTER LABEL]     ← small caps, cyan, tracking-widest
 *   Section Title       ← display font, display-md (48px), bold
 *   Optional subtitle   ← body-lg (18px), text-secondary
 *   [── glow divider ──] ← decorative line below title
 *
 * Usage:
 *   <SectionTitle
 *     label="Technology Laboratory"
 *     title="Technical Skills"
 *     subtitle="Tools and technologies I use to build digital experiences."
 *   />
 *
 *   <SectionTitle
 *     label="Mission Archive"
 *     title="Selected Projects"
 *     align="left"
 *   />
 */

import { motion } from 'framer-motion';
import { MOTION } from '../../constants/theme';

/* ── ALIGNMENT MAP ──────────────────────────────────────────────── */
const ALIGN = {
  center: 'text-center items-center mx-auto',
  left:   'text-left items-start',
  right:  'text-right items-end',
};

/* ── ANIMATION VARIANTS ─────────────────────────────────────────── */
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: MOTION.duration.text, ease: MOTION.ease.out },
  },
};

/* ── COMPONENT ──────────────────────────────────────────────────── */

/**
 * @param {object}  props
 * @param {string}  [props.label]       - Small chapter label above the title
 * @param {string}  props.title         - Main section heading
 * @param {string}  [props.subtitle]    - Supporting text below title
 * @param {'center'|'left'|'right'} [props.align='center']
 * @param {boolean} [props.animate=true] - Scroll-triggered entrance animation
 * @param {boolean} [props.showLine=true] - Show glowing divider line below title
 * @param {string}  [props.className]
 * @param {string}  [props.titleAs='h2'] - Heading element ('h1'–'h6')
 */
export default function SectionTitle({
  label,
  title,
  subtitle,
  align      = 'center',
  animate    = true,
  showLine   = true,
  className  = '',
  titleAs    = 'h2',
}) {
  const alignClasses = ALIGN[align] ?? ALIGN.center;
  const Heading      = titleAs;

  const content = (
    <div
      className={[
        'flex flex-col gap-4',
        alignClasses,
        'max-w-3xl',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Chapter label — small caps, primary color */}
      {label && (
        <motion.span
          variants={animate ? itemVariants : undefined}
          className={[
            'inline-flex items-center gap-2',
            'font-body text-primary text-sm font-semibold tracking-[0.2em] uppercase',
          ].join(' ')}
        >
          {/* Decorative line before label */}
          <span
            className="h-px w-8 bg-primary opacity-60"
            aria-hidden="true"
          />
          {label}
          <span
            className="h-px w-8 bg-primary opacity-60"
            aria-hidden="true"
          />
        </motion.span>
      )}

      {/* Main section title */}
      <motion.div variants={animate ? itemVariants : undefined}>
        <Heading
          className={[
            'font-display font-bold text-text-primary',
            /* DS §8 — display-md: 48px, line-height 1.1 */
            'text-4xl sm:text-5xl md:text-5xl leading-[1.1]',
          ].join(' ')}
        >
          {title}
        </Heading>
      </motion.div>

      {/* Optional subtitle — body-lg, text-secondary */}
      {subtitle && (
        <motion.p
          variants={animate ? itemVariants : undefined}
          className="font-body text-lg text-text-secondary leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Glowing divider line */}
      {showLine && (
        <motion.div
          variants={animate ? itemVariants : undefined}
          className={[
            'divider-glow mt-2',
            align === 'center' ? 'w-24 mx-auto' : 'w-24',
          ].join(' ')}
          aria-hidden="true"
        />
      )}
    </div>
  );

  if (!animate) {
    return content;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
    >
      {content}
    </motion.div>
  );
}
