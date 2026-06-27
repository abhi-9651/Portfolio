import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMapPin, FiMail, FiCheckCircle, FiTerminal, FiRadio, FiClock, FiFileText } from 'react-icons/fi';
import { Container, SectionTitle } from '../../ui';
import { SOCIAL_LINKS } from '../../../constants/socials';
import { SITE_CONFIG } from '../../../constants/config';

/* ── BACKGROUND NEURAL NETWORK ANIMATION ─────────────────────── */
function NeuralNetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let nodes = [];
    
    const init = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      const numNodes = Math.floor((canvas.width * canvas.height) / 15000);
      nodes = Array.from({ length: numNodes }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.3)';
        ctx.fill();
        
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = node.x - nodes[j].x;
          const dy = node.y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 - dist / 1000})`;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);
    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen" />;
}

/* ── TYPING ANIMATION COMPONENT ──────────────────────────────── */
function TypingText({ text }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{displayed}<span className="animate-pulse">_</span></span>;
}

/* ── LOCAL TIME WIDGET ───────────────────────────────────────── */
function LocalTimeWidget() {
  const [time, setTime] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000); // update every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      <span className="font-mono text-[10px] text-text-disabled uppercase tracking-widest mb-1">Local Time</span>
      <div className="flex items-center gap-2">
        <FiClock className="text-primary" />
        <span className="font-mono text-sm text-text-primary">{time} IST (India)</span>
      </div>
    </div>
  );
}

/* ── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section id="contact" className="section-wrapper relative overflow-hidden pt-24 pb-40">
      <NeuralNetworkBackground />
      <Container size="default" className="relative z-10">
        <SectionTitle
          label="Chapter Five"
          title="MISSION CONTROL"
          subtitle="Establish secure connection to initiate technical discussions or collaborations."
          align="center"
          showLine={true}
        />

        <motion.div
          className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* ── LEFT COLUMN (45%): COMMUNICATION PANEL ── */}
          <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col items-start gap-10">
            
            {/* Live Status & Local Time */}
            <div className="flex flex-col gap-6 w-full p-6 bg-surface/30 backdrop-blur-xl border border-border-primary/30 rounded-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                    </div>
                    <span className="font-mono text-xs text-success tracking-widest uppercase font-bold">Currently Available</span>
                  </div>
                  <p className="font-body text-xs text-text-secondary">Usually replies within 24 hours</p>
                </div>
                <LocalTimeWidget />
              </div>
            </div>
            
            <div>
              <h3 className="font-display text-4xl sm:text-5xl font-bold text-text-primary leading-[1.1] tracking-tight mb-4 flex items-center gap-3">
                <FiRadio className="text-primary animate-pulse" />
                Initialize Link.
              </h3>
              <p className="font-body text-base text-text-secondary leading-relaxed max-w-sm">
                Whether you have a mission proposal, technical inquiry, or simply want to connect—my communication channel is always open.
              </p>
            </div>

            {/* Premium Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {[
                { icon: FiMail, label: "Email", value: "abhijeet@example.com" },
                { icon: FiMapPin, label: "Location", value: "Remote / India" },
                { icon: FiCheckCircle, label: "Availability", value: "Open to Work" },
                { icon: FiTerminal, label: "Response", value: "< 24 Hours" }
              ].map((card, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface/20 border border-border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group cursor-default">
                  <card.icon className="text-xl text-primary/70 group-hover:text-primary mb-3" />
                  <div className="font-mono text-[10px] text-text-disabled uppercase tracking-widest mb-1">{card.label}</div>
                  <div className="font-display text-sm font-bold text-text-primary">{card.value}</div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="w-full flex items-center gap-4 pt-4 border-t border-border-primary/30">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="relative w-12 h-12 rounded-full border border-border-primary/50 bg-surface/50 backdrop-blur-md flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-300 group"
                  >
                    {/* Holographic Ripple */}
                    <span className="absolute inset-0 rounded-full bg-primary/20 scale-50 opacity-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700 ease-out" />
                    <Icon className="text-xl relative z-10 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
              <a
                href={SITE_CONFIG.resume}
                target="_blank"
                rel="noreferrer"
                className="ml-auto flex items-center gap-2 px-6 h-12 rounded-full bg-surface-alt/50 border border-border-primary/50 text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300 font-mono text-xs uppercase tracking-widest"
              >
                <FiFileText /> Resume
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN (55%): AI TRANSMISSION TERMINAL ── */}
          <motion.div variants={fadeUp} className="lg:col-span-7 relative w-full h-full lg:min-h-[600px] mt-10 lg:mt-0 group/terminal">
            {/* Ambient terminal glow */}
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none z-0 group-hover/terminal:bg-primary/20 transition-colors duration-700" />
            
            <div className="w-full h-full border border-border-primary/40 rounded-2xl relative flex flex-col z-10 bg-[#020617]/80 backdrop-blur-3xl overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.05)]">
              
              {/* Terminal Header */}
              <div className="bg-surface/50 px-6 py-4 border-b border-border-primary/40 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
                <div className="flex items-center gap-3">
                  <FiTerminal className="text-primary" />
                  <span className="font-mono text-xs text-primary uppercase tracking-widest">
                    <TypingText text="TRANSMIT PROTOCOL" />
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-error/60 border border-error/20" />
                  <div className="w-3 h-3 rounded-full bg-warning/60 border border-warning/20" />
                  <div className="w-3 h-3 rounded-full bg-success/60 border border-success/20" />
                </div>
              </div>

              {/* Form Container */}
              <div className="p-8 md:p-10 flex-1 flex flex-col justify-center relative">
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('/grid.svg')] bg-center mix-blend-overlay" />

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6 font-mono text-sm relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2 relative">
                          <label htmlFor="name" className="text-[10px] text-primary/70 tracking-widest uppercase">
                            Identity Name <span className="text-primary">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-transparent border-b border-border-primary/50 py-3 text-text-primary focus:border-primary focus:outline-none transition-all w-full placeholder:text-text-disabled/30"
                          />
                        </div>

                        <div className="flex flex-col gap-2 relative">
                          <label htmlFor="email" className="text-[10px] text-primary/70 tracking-widest uppercase">
                            Transmission Endpoint <span className="text-primary">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            placeholder="name@domain.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-transparent border-b border-border-primary/50 py-3 text-text-primary focus:border-primary focus:outline-none transition-all w-full placeholder:text-text-disabled/30"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 relative mt-4">
                        <label htmlFor="subject" className="text-[10px] text-primary/70 tracking-widest uppercase">
                          Mission Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          placeholder="Project Inquiry"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-border-primary/50 py-3 text-text-primary focus:border-primary focus:outline-none transition-all w-full placeholder:text-text-disabled/30"
                        />
                      </div>

                      <div className="flex flex-col gap-2 relative mt-4">
                        <label htmlFor="message" className="text-[10px] text-primary/70 tracking-widest uppercase">
                          Payload Message <span className="text-primary">*</span>
                        </label>
                        <textarea
                          id="message"
                          required
                          rows="4"
                          placeholder="Enter transmission data..."
                          value={formData.message}
                          onChange={handleInputChange}
                          className="bg-surface/30 border border-border-primary/30 rounded-lg p-4 text-text-primary focus:border-primary focus:bg-surface/50 focus:outline-none transition-all w-full resize-none placeholder:text-text-disabled/30 mt-2"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-6 flex items-center justify-center gap-3 w-full sm:w-fit px-10 py-4 bg-primary/10 border border-primary text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-[#020617] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            Encrypting...
                          </>
                        ) : (
                          <>
                            Execute Transmission
                            <FiSend className="text-sm group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-form"
                      className="flex flex-col items-center text-center justify-center gap-6 p-8 relative z-10 h-full min-h-[300px]"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      <div className="w-24 h-24 rounded-full bg-success/10 border border-success/50 flex items-center justify-center text-success text-4xl shadow-[0_0_50px_rgba(20,241,149,0.2)]">
                        <FiCheckCircle className="animate-[pulse_2s_infinite]" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-mono text-xl font-bold text-success uppercase tracking-widest">
                          Transmission Complete
                        </h4>
                        <div className="font-mono text-xs text-text-secondary flex flex-col gap-1">
                          <span>{'>'} MESSAGE ENCRYPTED</span>
                          <span>{'>'} DELIVERED SUCCESSFULLY</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-8 px-8 py-3 bg-transparent border border-border-primary/50 text-text-secondary font-mono text-[10px] uppercase tracking-widest hover:border-primary hover:text-primary rounded-lg transition-all"
                      >
                        Initiate New Link
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
