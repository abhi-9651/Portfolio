/**
 * Container.jsx — Project NOVA UI Component
 *
 * Responsive content container with configurable max-width.
 * Wraps section content within the layout grid.
 *
 * DS Reference: DESIGN_SYSTEM.md §10 — Layout System
 *   Content Width : 1280px
 *   Reading Width : 760px
 *   Margin        : auto
 *   Padding       : 24px horizontal
 *
 * Usage:
 *   <Container>
 *     <h2>Section content</h2>
 *   </Container>
 *
 *   <Container size="reading">
 *     <p>Long form text content</p>
 *   </Container>
 *
 *   <Container as="section" id="about">
 *     <AboutContent />
 *   </Container>
 */

/* ── VARIANT STYLE MAP ──────────────────────────────────────────── */

const SIZES = {
  /** Default — 1280px content width */
  default: 'container-nova',
  /** Narrow — 760px reading width for text-heavy sections */
  reading: 'container-reading',
  /** Full — no max-width constraint */
  full: 'w-full px-6',
};

/* ── COMPONENT ──────────────────────────────────────────────────── */

/**
 * @param {object}           props
 * @param {'default'|'reading'|'full'} [props.size='default']
 * @param {string}           [props.as='div']     - HTML element to render
 * @param {string}           [props.className]
 * @param {React.ReactNode}  props.children
 */
export default function Container({
  size      = 'default',
  as: Tag   = 'div',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    SIZES[size] ?? SIZES.default,
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
