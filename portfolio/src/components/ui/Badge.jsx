/**
 * Badge.jsx — Project NOVA UI Component
 *
 * Small status/label pill used for:
 *   - Project status ('Featured', 'In Progress', 'Completed')
 *   - Skill category labels
 *   - Technology stack tags on project cards
 *
 * DS Reference: DESIGN_SYSTEM.md §17 — Component Library (Badge, Tag)
 *
 * Usage:
 *   <Badge>Featured</Badge>
 *   <Badge variant="success">Completed</Badge>
 *   <Badge variant="warning">In Progress</Badge>
 *   <Badge variant="outline">React</Badge>
 *   <Badge variant="primary" size="sm">Frontend</Badge>
 *   <Badge dot>Live</Badge>
 */

/* ── VARIANT STYLE MAP ──────────────────────────────────────────── */

const VARIANTS = {
  /** Default — subtle glass surface, white text */
  default: [
    'bg-surface-alt/80 text-text-secondary',
    'border border-border-primary',
  ].join(' '),

  /** Primary — cyan accent */
  primary: [
    'bg-primary/10 text-primary',
    'border border-primary/30',
  ].join(' '),

  /** Secondary — violet accent */
  secondary: [
    'bg-secondary/10 text-secondary',
    'border border-secondary/30',
  ].join(' '),

  /** Success — green (used for 'Completed', 'Live') */
  success: [
    'bg-success/10 text-success',
    'border border-success/30',
  ].join(' '),

  /** Warning — yellow (used for 'In Progress') */
  warning: [
    'bg-warning/10 text-warning',
    'border border-warning/30',
  ].join(' '),

  /** Error — red */
  error: [
    'bg-error/10 text-error',
    'border border-error/30',
  ].join(' '),

  /** Outline — transparent with glass border */
  outline: [
    'bg-transparent text-text-tertiary',
    'border border-border-primary',
  ].join(' '),

  /** Ghost — no border, dimmer color */
  ghost: 'bg-transparent text-text-disabled',
};

const SIZES = {
  xs: 'text-[10px] font-semibold px-2 py-0.5 tracking-[0.12em]',
  sm: 'text-xs font-medium px-2.5 py-1 tracking-[0.08em]',
  md: 'text-xs font-semibold px-3 py-1.5 tracking-[0.1em]',
};

/* ── COMPONENT ──────────────────────────────────────────────────── */

/**
 * @param {object}           props
 * @param {'default'|'primary'|'secondary'|'success'|'warning'|'error'|'outline'|'ghost'} [props.variant='default']
 * @param {'xs'|'sm'|'md'}   [props.size='sm']
 * @param {boolean}          [props.dot=false]    - Show a pulsing dot before text
 * @param {boolean}          [props.uppercase=true]
 * @param {string}           [props.className]
 * @param {React.ReactNode}  props.children
 */
export default function Badge({
  variant   = 'default',
  size      = 'sm',
  dot       = false,
  uppercase = true,
  className = '',
  children,
  ...rest
}) {
  /* Dot color matches variant */
  const dotColors = {
    default:   'bg-text-tertiary',
    primary:   'bg-primary',
    secondary: 'bg-secondary',
    success:   'bg-success',
    warning:   'bg-warning',
    error:     'bg-error',
    outline:   'bg-text-tertiary',
    ghost:     'bg-text-disabled',
  };

  const classes = [
    'inline-flex items-center gap-1.5',
    'rounded-full font-body',
    'whitespace-nowrap select-none',
    uppercase ? 'uppercase' : '',
    VARIANTS[variant] ?? VARIANTS.default,
    SIZES[size] ?? SIZES.sm,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...rest}>
      {dot && (
        <span
          className={[
            'inline-block w-1.5 h-1.5 rounded-full shrink-0',
            dotColors[variant] ?? dotColors.default,
            /* Pulsing animation for 'live' status */
            variant === 'success' ? 'animate-pulse' : '',
          ].filter(Boolean).join(' ')}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
