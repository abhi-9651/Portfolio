/**
 * Achievements.jsx — Project NOVA Section Component
 *
 * Mission Records.
 * Implements a vertical scroll-linked timeline with glowing node indicators
 * and milestones.
 *
 * DS Reference: DESIGN_SYSTEM.md §17 — Component Library, §19 — Card System, §15 — Glow System
 * PRD Reference: PRD.md §11 — Achievements Section
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiAward, FiCpu, FiTarget } from 'react-icons/fi';

import { Container, SectionTitle, GlassCard, Badge } from '../../ui';
import { ACHIEVEMENTS } from '../../../constants/config';

/* ── ACHIEVEMENT ICON MAP ───────────────────────────────────────── */
const ICON_MAP = {
  hackathon:     FiCpu,
  certification: FiAward,
  contest:       FiTarget,
  award:         FiAward,
};

/* ── TIMELINE ROW SUB-COMPONENT ──────────────────────────────────── */
function TimelineRow({ item, index }) {
  const IconComponent = ICON_MAP[item.type] || FiTarget;
  const isEven = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full items-center min-h-[160px] select-none">
      {/* ── Timeline Center node (glowing connector dot) ── */}
      <div
        className={[
          'absolute z-10 w-14 h-14 rounded-full bg-surface border-2 flex items-center justify-center shrink-0 shadow-elevation-1',
          'left-[-6px] md:left-1/2 md:-translate-x-1/2',
          'border-border-primary hover:border-primary hover:shadow-[0_0_25px_rgba(0,229,255,0.8)] transition-all duration-300 group',
        ].join(' ')}
        aria-hidden="true"
      >
        <div className="absolute inset-2 rounded-full border border-primary/30 animate-[spin_4s_linear_infinite]" />
        <IconComponent className="text-base text-primary group-hover:scale-110 transition-transform duration-300" />
      </div>

      {/* ── Desktop Left Side ── */}
      <div className={`pl-16 md:pl-0 order-2 md:order-1 ${isEven ? 'md:text-right' : 'md:opacity-0 md:pointer-events-none'}`}>
        {isEven && (
          <GlassCard
            variant="mission"
            hover={true}
            animate={true}
            className="border-glass hover:border-primary/30 p-8"
          >
            <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
              <Badge variant="outline" size="sm" className="w-fit">
                {item.year}
              </Badge>
              <h3 className="font-display text-2xl font-bold text-text-primary mt-4">
                {item.title}
              </h3>
              <span className="font-mono text-[11px] text-primary/80 uppercase tracking-wider mt-2">
                {item.org}
              </span>
              <p className="font-body text-base text-text-secondary leading-relaxed mt-5">
                {item.description}
              </p>
            </div>
          </GlassCard>
        )}
      </div>

      {/* ── Desktop Right Side ── */}
      <div className={`pl-16 md:pl-0 order-3 md:order-2 ${!isEven ? 'md:text-left' : 'md:opacity-0 md:pointer-events-none'}`}>
        {!isEven && (
          <GlassCard
            variant="mission"
            hover={true}
            animate={true}
            className="border-glass hover:border-primary/30 p-8"
          >
            <div className="flex flex-col items-start">
              <Badge variant="outline" size="sm" className="w-fit">
                {item.year}
              </Badge>
              <h3 className="font-display text-2xl font-bold text-text-primary mt-4">
                {item.title}
              </h3>
              <span className="font-mono text-[11px] text-primary/80 uppercase tracking-wider mt-2">
                {item.org}
              </span>
              <p className="font-body text-base text-text-secondary leading-relaxed mt-5">
                {item.description}
              </p>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}

/* ── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function Achievements() {
  const containerRef = useRef(null);

  // Scroll tracking to draw connector line on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="section-wrapper section-padding relative overflow-hidden"
      aria-label="Achievements — Mission Records"
    >
      <Container size="default">
        {/* Section Heading */}
        <SectionTitle
          label="Mission Records"
          title="Achievements & Milestones"
          subtitle="Explore key certifications, hackathon selections, and competitive programming highlights."
          align="center"
          showLine={true}
        />

        {/* ── Timeline Track Wrapper ── */}
        <div className="relative mt-16 md:mt-24 max-w-4xl mx-auto flex flex-col gap-12 md:gap-16">
          {/* Static gray connector track */}
          <div
            className="absolute top-0 bottom-0 left-[21px] md:left-1/2 w-px bg-border-primary/50 z-0 md:-translate-x-1/2"
            aria-hidden="true"
          />

          {/* Active SVG dynamic drawing track (scroll linked) */}
          <motion.div
            className="absolute top-0 bottom-0 left-[21px] md:left-1/2 w-1 bg-primary z-0 md:-translate-x-1/2 origin-top shadow-[0_0_15px_rgba(0,229,255,0.6)]"
            style={{ scaleY, transformOrigin: 'top' }}
            aria-hidden="true"
          />

          {/* Timeline Rows */}
          {ACHIEVEMENTS.map((item, idx) => (
            <TimelineRow key={item.id} item={item} index={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}
