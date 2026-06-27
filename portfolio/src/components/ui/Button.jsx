/**
 * Button.jsx — Project NOVA UI Component
 *
 * A fully accessible, design-system-compliant button component.
 *
 * DS Reference: DESIGN_SYSTEM.md §18 — Button System
 *
 * Variants : 'primary' | 'secondary' | 'ghost' | 'icon'
 * Sizes    : 'sm' | 'md' | 'lg'
 *
 * Usage:
 *   <Button variant="primary" size="md" onClick={handleClick}>
 *     View Projects
 *   </Button>
 *
 *   <Button variant="secondary" href="#contact">
 *     Get In Touch
 *   </Button>
 *
 *   <Button variant="icon" ariaLabel="Visit GitHub">
 *     <FiGithub />
 *   </Button>
 *
 *   <Button variant="primary" loading>
 *     Sending...
 *   </Button>
 */

import { motion } from 'framer-motion';
import { MOTION } from '../../constants/theme';

/* ── VARIANT STYLE MAPS ─────────────────────────────────────────── */

const BASE = [
  'btn-base',                /* shared base from utilities.css */
  'relative overflow-hidden',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
].join(' ');

const VARIANTS = {
  primary: [
    'btn-primary',
    /* DS: on hover — glow increases, moves upward 2px, 300ms transition */
    'hover:-translate-y-0.5 hover:shadow-glow-primary hover:brightness-110',
    'active:translate-y-0 active:brightness-100',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100',
  ].join(' '),

  secondary: [
    'btn-secondary',
    'hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-glow-primary',
    'active:translate-y-0',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0',
  ].join(' '),

  ghost: [
    'btn-ghost',
    'hover:-translate-y-0.5 hover:text-primary hover:border hover:border-primary/30',
    'active:translate-y-0',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),

  icon: [
    'btn-icon',
    'hover:-translate-y-0.5 hover:border-primary hover:shadow-glow-primary hover:text-primary',
    'active:translate-y-0',
    'disabled:opacity-40 disabled:cursor-not-allowed',
  ].join(' '),
};

const SIZES = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

/* ── LOADING SPINNER ────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

/* ── COMPONENT ──────────────────────────────────────────────────── */

/**
 * @param {object}          props
 * @param {'primary'|'secondary'|'ghost'|'icon'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'}  [props.size='md']
 * @param {string}          [props.href]         - Renders as <a> when provided
 * @param {boolean}         [props.disabled]
 * @param {boolean}         [props.loading]      - Shows spinner, disables interaction
 * @param {string}          [props.ariaLabel]    - Required for icon variant
 * @param {string}          [props.className]    - Additional classes
 * @param {React.ReactNode} [props.leftIcon]     - Icon before label
 * @param {React.ReactNode} [props.rightIcon]    - Icon after label
 * @param {React.ReactNode} props.children
 * @param {object}          [props.motionProps]  - Extra Framer Motion props
 */
export default function Button({
  variant    = 'primary',
  size       = 'md',
  href,
  disabled   = false,
  loading    = false,
  ariaLabel,
  className  = '',
  leftIcon,
  rightIcon,
  children,
  motionProps,
  ...rest
}) {
  const isDisabled = disabled || loading;

  const classes = [
    BASE,
    VARIANTS[variant] ?? VARIANTS.primary,
    /* Don't apply size classes to icon — icon has fixed dimensions */
    variant !== 'icon' ? (SIZES[size] ?? SIZES.md) : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && <Spinner />}
      {!loading && leftIcon && (
        <span className="shrink-0" aria-hidden="true">{leftIcon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && rightIcon && (
        <span className="shrink-0" aria-hidden="true">{rightIcon}</span>
      )}
    </>
  );

  /* Framer Motion wrapper props */
  const motionDefaults = {
    whileTap: { scale: isDisabled ? 1 : 0.97 },
    transition: { duration: MOTION.duration.fast, ease: MOTION.ease.out },
    ...motionProps,
  };

  /* Render as <a> when href is provided (external links, anchor scrolls) */
  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <motion.a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={isDisabled}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...motionDefaults}
        {...rest}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={classes}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...motionDefaults}
      {...rest}
    >
      {content}
    </motion.button>
  );
}
