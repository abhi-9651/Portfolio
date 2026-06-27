import { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { FiCode, FiCpu, FiTarget, FiZap, FiTerminal } from 'react-icons/fi';
import { Container, SectionTitle } from '../../ui';

/* ── ANIMATED COUNTER COMPONENT ────────────────────────────── */
function AnimatedCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 40, damping: 20 });
  const display = useTransform(spring, (current) => Math.floor(current) + suffix);

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, count, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ── STORY CARD COMPONENT ──────────────────────────────────── */
function StoryCard({ num, title, text, icon: Icon }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="relative p-6 rounded-2xl bg-surface/40 backdrop-blur-md border border-border-primary/30 hover:border-primary/50 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-start gap-4 relative z-10">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 border border-primary/20">
          <Icon />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-[10px] text-primary/70">{num}</span>
            <h4 className="font-display font-bold text-lg text-text-primary group-hover:text-primary transition-colors">{title}</h4>
          </div>
          <p className="font-body text-sm text-text-secondary leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function About() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="about"
      className="section-wrapper relative overflow-hidden pt-24 pb-32"
      aria-label="About — Chapter Two: Identity Chamber"
    >
      <Container size="default">
        {/* Section Title */}
        <div className="mb-16">
          <SectionTitle
            label="CHAPTER TWO"
            title="WHO AM I"
            subtitle="Building software with curiosity, creativity, and continuous learning."
            align="left"
            showLine={true}
          />
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* ── LEFT COLUMN (55%): STORY TIMELINE ── */}
          <motion.div variants={fadeUp} className="lg:col-span-7 flex flex-col gap-6">
            <StoryCard 
              num="01" 
              title="Beginning" 
              icon={FiCode}
              text="B.Tech CSE student at MMMUT. Started with C++, drawn by the elegant logic of problem solving and an endless curiosity for how systems work beneath the surface." 
            />
            <StoryCard 
              num="02" 
              title="Learning Journey" 
              icon={FiCpu}
              text="Transitioned from terminal scripts to visual interfaces. Mastered the MERN stack (React, Node, Express, MongoDB) and embraced GSAP for modern, fluid UI development." 
            />
            <StoryCard 
              num="03" 
              title="Builder Mindset" 
              icon={FiTarget}
              text="Forged through competitive programming, rapid hackathons, and relentless project building. I believe the best way to learn a tool is to push it to its absolute limits." 
            />
            <StoryCard 
              num="04" 
              title="Future Vision" 
              icon={FiZap}
              text="Aspiring Full Stack Engineer aiming to architect scalable products, contribute to impactful open source, and integrate AI seamlessly into human-centric interfaces." 
            />
          </motion.div>

          {/* ── RIGHT COLUMN (45%): INTERACTIVE PANEL ── */}
          <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col gap-8">
            
            {/* 1. Horizontal Journey Timeline */}
            <div className="p-6 rounded-2xl bg-surface-alt/30 border border-border-primary/30">
              <h4 className="font-mono text-[10px] text-text-disabled uppercase tracking-widest mb-6">Evolution Path</h4>
              <div className="flex justify-between items-center relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-border-primary/50 -translate-y-1/2 z-0" />
                
                {['C++', 'DSA', 'MERN', 'AI'].map((step, i) => (
                  <motion.div 
                    key={step}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, type: "spring" }}
                    className="relative z-10 flex flex-col items-center gap-2 bg-surface p-2 rounded-lg border border-border-primary/50"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
                    <span className="font-mono text-[10px] text-text-secondary">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 2. Interactive Statistics */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Projects Built', value: 15, suffix: '+' },
                { label: 'DSA Problems', value: 300, suffix: '+' },
                { label: 'Tech Stack', value: 12, suffix: '' },
                { label: 'Hackathons', value: 3, suffix: '' },
              ].map((stat, i) => (
                <div key={stat.label} className="p-5 rounded-2xl bg-surface/40 border border-border-primary/20 flex flex-col items-center justify-center text-center group hover:bg-surface-alt/50 transition-colors">
                  <div className="font-display font-bold text-3xl text-primary mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 3. Current Focus Terminal */}
            <motion.div 
              animate={{ boxShadow: ['0 0 0px rgba(0,229,255,0)', '0 0 20px rgba(0,229,255,0.1)', '0 0 0px rgba(0,229,255,0)'] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="p-6 rounded-2xl bg-[#0a0a0a] border border-primary/20 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
              <div className="flex items-center gap-2 mb-4 text-primary">
                <FiTerminal />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">CURRENT MISSION</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-[10px] text-text-disabled uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Learning</div>
                  <ul className="font-mono text-xs text-text-secondary space-y-1">
                    <li className="flex items-center gap-2"><span className="text-primary">{'>'}</span> Next.js</li>
                    <li className="flex items-center gap-2"><span className="text-primary">{'>'}</span> TypeScript</li>
                    <li className="flex items-center gap-2"><span className="text-primary">{'>'}</span> System Design</li>
                  </ul>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-text-disabled uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Building</div>
                  <ul className="font-mono text-xs text-text-secondary space-y-1">
                    <li className="flex items-center gap-2"><span className="text-primary">{'>'}</span> HireHub</li>
                    <li className="flex items-center gap-2"><span className="text-primary">{'>'}</span> Project NOVA</li>
                    <li className="flex items-center gap-2"><span className="text-primary">{'>'}</span> LeetCode</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* 4. Philosophy Quote */}
            <div className="mt-auto pt-6 text-right">
              <p className="font-display text-lg text-text-primary italic leading-relaxed">
                "I don't just build interfaces—<br/>
                <span className="text-primary">I build experiences that solve real problems.</span>"
              </p>
            </div>

          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
