/**
 * Skills.jsx — Project NOVA Section Component
 *
 * Chapter Three: Technology Laboratory.
 * Phase 5 Redesign: Interactive Technology Network.
 * Top: Interactive Constellation (AI CORE at center).
 * Bottom: Premium organized technology cards.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiNodedotjs, 
  SiExpress, SiMongodb, SiTailwindcss, SiGreensock, SiFramer, 
  SiGit, SiGithub 
} from 'react-icons/si';

import { Container, SectionTitle, GlassCard } from '../../ui';
import { SKILL_CATEGORIES, SKILLS } from '../../../constants/config';
import { MOTION } from '../../../constants/theme';

import TechnologySphere from './TechnologySphere';

/* ── SKILLS COMPONENT ───────────────────────────────────────────── */
export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const groupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: MOTION.duration.normal, ease: MOTION.ease.out },
    },
  };

  // Find simple icons if available, otherwise just use a default bullet.
  const getTechIcon = (name) => {
    const map = {
      'React': SiReact, 'Next.js': SiNextdotjs, 'JavaScript': SiJavascript,
      'TypeScript': SiTypescript, 'Node.js': SiNodedotjs, 'Express': SiExpress,
      'MongoDB': SiMongodb, 'Tailwind CSS': SiTailwindcss, 'GSAP': SiGreensock,
      'Framer Motion': SiFramer, 'Git': SiGit, 'GitHub': SiGithub,
    };
    return map[name] || null;
  };

  return (
    <section
      id="skills"
      className="section-wrapper relative overflow-hidden pt-20 pb-32"
      aria-label="Skills — Chapter Three: Technology Laboratory"
    >
      <Container size="default">
        <SectionTitle
          label="Chapter Three"
          title="Technology Laboratory"
          subtitle="Interactive system mapping the architectural stack and core competencies."
          align="center"
          showLine={true}
        />

        {/* TOP: Interactive Network */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16"
        >
          <TechnologySphere />
        </motion.div>

        {/* BOTTOM: Organized Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {SKILL_CATEGORIES.map((category) => {
            const categorySkills = SKILLS.filter(s => s.category === category);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div key={category} variants={groupVariants} className="flex flex-col h-full">
                <GlassCard
                  variant="default"
                  className="p-6 border-glass bg-surface/30 backdrop-blur-xl flex flex-col h-full group"
                >
                  <h4 className="font-display font-bold text-lg text-text-primary tracking-wide uppercase mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-primary/50" />
                    {category}
                  </h4>

                  <div className="flex flex-col gap-4">
                    {categorySkills.map((skill) => {
                      const Icon = getTechIcon(skill.name);
                      return (
                        <div
                          key={skill.id}
                          className="p-4 rounded-lg bg-surface-light/10 border border-border-primary/20 hover:border-primary/50 hover:bg-surface-light/30 transition-all duration-300 group/card relative overflow-hidden"
                        >
                          {/* Light sweep */}
                          <div className="absolute inset-0 -translate-x-full group-hover/card:animate-light-sweep bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                          
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-surface-alt border border-border-primary/50 flex items-center justify-center text-text-secondary group-hover/card:text-primary transition-colors">
                              {Icon ? <Icon className="text-xl" /> : <div className="w-2 h-2 bg-primary rounded-full" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-body font-semibold text-text-primary text-sm">
                                  {skill.name}
                                </span>
                                <span className="font-mono text-[10px] text-text-disabled uppercase">
                                  {skill.proficiency * 20}%
                                </span>
                              </div>
                              {/* Progress bar instead of dots for premium feel */}
                              <div className="w-full h-1 bg-surface-alt rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${skill.proficiency * 20}%`, boxShadow: '0 0 5px rgba(0,229,255,0.5)' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
