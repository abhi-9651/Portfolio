/**
 * Hero.jsx — Project NOVA Section Component
 *
 * Cinematic AI Operating System Hero Section.
 * Redesigned for maximum Awwwards-level visual impact and usability.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { FiArrowRight, FiCheckCircle, FiActivity, FiDatabase, FiShield } from 'react-icons/fi';

import { SITE_CONFIG } from '../../../constants/config';
import { HERO_ROLES, HERO_TAGLINE } from './Hero.constants';
import {
  createHeroTimeline,
  addParallaxEffect,
  addScrollExitEffect,
} from './HeroAnimations';

/* ── ROLE ROTATOR ────────────────────────────────────────────────── */
function RoleRotator({ active }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (active) setTyping(true);
  }, [active]);

  useEffect(() => {
    if (!typing) return;
    const role = HERO_ROLES[currentIndex];
    let charIdx = 0;
    let timeoutId;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayed('');

    function typeChar() {
      if (charIdx < role.length) {
        setDisplayed(role.slice(0, charIdx + 1));
        charIdx++;
        timeoutId = setTimeout(typeChar, 55);
      } else {
        timeoutId = setTimeout(eraseChar, 2200);
      }
    }

    function eraseChar() {
      if (charIdx > 0) {
        setDisplayed(role.slice(0, charIdx - 1));
        charIdx--;
        timeoutId = setTimeout(eraseChar, 30);
      } else {
        setCurrentIndex((prev) => (prev + 1) % HERO_ROLES.length);
      }
    }

    timeoutId = setTimeout(typeChar, 80);
    return () => clearTimeout(timeoutId);
  }, [currentIndex, typing]);

  return (
    <span className="inline-flex items-center text-primary font-semibold">
      <span>{displayed}</span>
      {active && (
        <span
          className="inline-block w-0.5 h-[0.9em] bg-primary ml-0.5 align-middle animate-cursor-blink"
          aria-hidden="true"
        />
      )}
      {!active && <span>{HERO_ROLES[0]}</span>}
    </span>
  );
}

/* ── MAGNETIC BUTTON ─────────────────────────────────────────────── */
function MagneticButton({ children, href, primary }) {
  return (
    <a
      href={href}
      className={`
        group relative overflow-hidden flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-bold tracking-wide transition-all duration-200
        ${primary 
          ? 'bg-primary text-surface hover:bg-white shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] hover:-translate-y-1' 
          : 'bg-surface-light/30 backdrop-blur-md border border-border-primary/50 text-text-primary hover:bg-surface-light/50 hover:border-primary/50 hover:text-primary hover:shadow-glow-primary hover:-translate-y-1'
        }
      `}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <div className="absolute inset-0 -translate-x-full group-hover:animate-light-sweep bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {children}
    </a>
  );
}

/* ── FUTURISTIC SCROLL INDICATOR ─────────────────────────────────── */
function FuturisticScrollIndicator() {
  return (
    <a
      href="#about"
      className="group flex flex-col items-center gap-3 focus-visible:outline-none"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <span className="font-mono text-[10px] tracking-widest uppercase text-text-disabled group-hover:text-primary transition-colors">
        Scroll to Explore
      </span>
      <div className="w-5 h-10 rounded-full border border-border-primary/50 flex justify-center p-1 relative overflow-hidden group-hover:border-primary/50 transition-colors bg-surface-light/10 backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.1)]">
        <div className="w-1.5 h-3 bg-primary rounded-full animate-scroll-pill shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
      </div>
    </a>
  );
}

/* ── LEFT COLUMN: TYPOGRAPHY ─────────────────────────────────────── */
function HeroContent({
  nameRef,
  taglineRef,
  rolesRef,
  ctaRef,
  scrollRef,
  rolesActive,
}) {
  return (
    <div className="flex flex-col items-start justify-center h-full text-left pt-20 lg:pt-0 relative z-20 w-full pr-0 lg:pr-12">
      <div ref={rolesRef} className="opacity-0 font-mono text-xs md:text-sm text-primary tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
        <span className="w-12 h-px bg-primary/50" />
        System Initialized
      </div>

      <h1
        ref={nameRef}
        className="opacity-0 font-display font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[120px] leading-[0.95] tracking-tighter text-text-primary will-change-transform drop-shadow-2xl mb-8"
      >
        {SITE_CONFIG.name.split(' ').map((word, i) => (
          <span key={i} className="block">{word}</span>
        ))}
      </h1>

      <div
        className="opacity-0 font-mono text-lg md:text-xl lg:text-2xl tracking-wider text-text-secondary h-8 flex items-center gap-3 mb-6"
        style={{ opacity: rolesActive ? 1 : 0, transition: 'opacity 0.5s ease' }}
      >
        <span className="text-text-disabled">I am a</span>
        <RoleRotator active={rolesActive} />
      </div>

      <p
        ref={taglineRef}
        className="opacity-0 font-body text-base md:text-xl text-text-secondary leading-relaxed max-w-xl"
      >
        {HERO_TAGLINE}
      </p>

      <div
        ref={ctaRef}
        className="opacity-0 mt-12 flex flex-wrap items-center gap-6"
      >
        <MagneticButton href="#projects" primary={true}>
          View Projects <FiArrowRight />
        </MagneticButton>
        <MagneticButton href="#contact" primary={false}>
          Get In Touch
        </MagneticButton>
      </div>

      <div
        ref={scrollRef}
        className="opacity-0 absolute bottom-12 left-0"
      >
        <FuturisticScrollIndicator />
      </div>
    </div>
  );
}

/* ── RIGHT COLUMN: AI CONTAINMENT CHAMBER & PORTRAIT ─────────────── */
function HeroPortrait({ portraitRef, portraitWrapperRef, hudRefs, coreRefs }) {
  const registerHud = (i) => (el) => { if (hudRefs.current) hudRefs.current[i] = el; };
  const registerCore = (i) => (el) => { if (coreRefs.current) coreRefs.current[i] = el; };

  return (
    <div className="relative w-full h-[600px] lg:h-[800px] flex items-center justify-center pointer-events-none perspective-1000 z-10">
      
      <div
        ref={portraitWrapperRef}
        className="relative w-full h-full max-w-[600px] will-change-transform transform-style-3d flex items-center justify-center"
      >
        {/* ── AI CORE (Behind Portrait) ── */}
        <div className="absolute inset-0 flex items-center justify-center -translate-z-[100px]">
          {/* Orbital Rings */}
          <div ref={registerCore(0)} className="absolute w-[80%] aspect-square rounded-full border border-primary/20 bg-primary/5 blur-[2px] animate-spin-slow-reverse" />
          <div ref={registerCore(1)} className="absolute w-[100%] aspect-square rounded-full border-[1px] border-dashed border-primary/30 animate-spin-slow" />
          <div ref={registerCore(2)} className="absolute w-[120%] aspect-square rounded-full border border-purple-500/10 bg-purple-500/5 blur-[10px] animate-spin-slow-reverse" />
          {/* Glowing Stars / Particles */}
          <div ref={registerCore(3)} className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,229,255,0.4)_1px,transparent_1px)] bg-[length:40px_40px] opacity-20 animate-float-particles rounded-full mask-radial" />
          {/* Central Energy Pulse */}
          <div ref={registerCore(4)} className="absolute w-[40%] aspect-square rounded-full bg-primary/10 blur-[50px] animate-pulse-slow" />
        </div>

        {/* ── AI CONTAINMENT CHAMBER (Hero Card) ── */}
        <div
          ref={portraitRef}
          className="relative w-[80%] h-[75%] translate-z-[0px] flex items-center justify-center"
        >
          {/* Glass Card Background - Separated so image can extend beyond borders */}
          <div className="absolute inset-0 rounded-[40px] border border-primary/30 bg-[#020617]/40 backdrop-blur-xl shadow-[inset_0_0_40px_rgba(0,229,255,0.1),0_0_40px_rgba(0,229,255,0.15)] overflow-hidden">
            {/* Chamber Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none mix-blend-screen" />
            {/* Scanline Texture inside chamber */}
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)' }} />
            {/* Chamber Top Reflection */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent blur-[1px]" />
          </div>

          {/* PORTRAIT IMAGE */}
          <img
            src="/assets/images/portrait.png"
            alt="Abhijeet Kushwaha"
            className="relative w-[125%] h-[115%] max-w-none object-contain drop-shadow-[0_-10px_30px_rgba(0,229,255,0.2)] pointer-events-none z-10 -mt-8"
            style={{ 
              objectPosition: '50% 25%', 
              filter: 'contrast(1.05) brightness(1.1) saturate(1.1)' 
            }}
          />
        </div>

        {/* ── FLOATING HUD PANELS (Around Portrait, translating in Z) ── */}
        <div ref={registerHud(0)} className="absolute top-[15%] right-[-5%] px-4 py-2 bg-surface/40 backdrop-blur-md border border-border-primary/50 rounded-lg translate-z-[80px] shadow-[0_0_20px_rgba(0,229,255,0.15)] flex items-center gap-2 animate-[float_10s_ease-in-out_infinite]">
          <FiCheckCircle className="text-success text-sm" />
          <span className="font-mono text-[10px] text-text-primary uppercase tracking-widest">Identity Verified</span>
        </div>

        <div ref={registerHud(1)} className="absolute top-[40%] left-[-10%] px-4 py-2 bg-surface/40 backdrop-blur-md border border-border-primary/50 rounded-lg translate-z-[120px] shadow-[0_0_20px_rgba(0,229,255,0.15)] flex items-center gap-2 animate-[float_12s_ease-in-out_infinite_reverse]">
          <FiActivity className="text-primary text-sm" />
          <span className="font-mono text-[10px] text-text-primary uppercase tracking-widest">Frontend Systems Online</span>
        </div>

        <div ref={registerHud(2)} className="absolute bottom-[25%] right-[-10%] px-4 py-2 bg-surface/40 backdrop-blur-md border border-border-primary/50 rounded-lg translate-z-[60px] shadow-[0_0_20px_rgba(0,229,255,0.15)] flex items-center gap-2 animate-[float_8s_ease-in-out_infinite]">
          <FiDatabase className="text-secondary text-sm" />
          <span className="font-mono text-[10px] text-text-primary uppercase tracking-widest">MMMUT Database Linked</span>
        </div>

        <div ref={registerHud(3)} className="absolute bottom-[10%] left-[0%] px-4 py-2 bg-surface/40 backdrop-blur-md border border-border-primary/50 rounded-lg translate-z-[100px] shadow-[0_0_20px_rgba(0,229,255,0.15)] flex items-center gap-2 animate-[float_11s_ease-in-out_infinite]">
          <FiShield className="text-warning text-sm" />
          <span className="font-mono text-[10px] text-text-primary uppercase tracking-widest">Mission Ready</span>
        </div>

      </div>
    </div>
  );
}

/* ── HERO SECTION (MAIN EXPORT) ──────────────────────────────────── */
export default function Hero({ isLoaded = false }) {
  const [rolesActive, setRolesActive] = useState(false);

  const heroRef            = useRef(null);
  const contentRef         = useRef(null);
  const portraitWrapperRef = useRef(null);
  const portraitRef        = useRef(null);
  
  const nameRef            = useRef(null);
  const taglineRef         = useRef(null);
  const rolesRef           = useRef(null);
  const ctaRef             = useRef(null);
  const scrollRef          = useRef(null);
  const timelineRef        = useRef(null);

  const hudRefs = useRef([]);
  const coreRefs = useRef([]);

  const handleRolesStart = useCallback(() => {
    setRolesActive(true);
  }, []);

  /* GSAP Timeline */
  useEffect(() => {
    if (!isLoaded) return;
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      [nameRef, taglineRef, rolesRef, ctaRef, scrollRef, portraitRef].forEach(ref => {
        if (ref.current) ref.current.style.opacity = '1';
      });
      hudRefs.current.forEach(el => { if (el) el.style.opacity = '1'; });
      coreRefs.current.forEach(el => { if (el) el.style.opacity = '1'; });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRolesActive(true);
      return;
    }

    const tl = createHeroTimeline({
      nameEl: nameRef.current,
      taglineEl: taglineRef.current,
      rolesEl: rolesRef.current,
      ctaEl: ctaRef.current,
      scrollEl: scrollRef.current,
      portraitEl: portraitRef.current,
      hudEls: hudRefs.current.filter(Boolean),
      coreEls: coreRefs.current.filter(Boolean),
    }, handleRolesStart);

    timelineRef.current = tl;
    tl.play();

    return () => tl.kill();
  }, [isLoaded, handleRolesStart]);

  /* 3D Mouse Parallax */
  useEffect(() => {
    if (!isLoaded || !portraitWrapperRef.current) return;
    const cleanup = addParallaxEffect(portraitWrapperRef.current);
    return cleanup;
  }, [isLoaded]);

  /* Scroll Exit Effect */
  useEffect(() => {
    if (!isLoaded) return;
    const cleanup = addScrollExitEffect(heroRef.current, contentRef.current);
    return cleanup;
  }, [isLoaded]);

  return (
    <section
      id="home"
      ref={heroRef}
      aria-label="Hero — Chapter One: System Initialization"
      className="relative w-full min-h-screen h-[100vh] flex items-center justify-center overflow-hidden bg-transparent"
    >
      <div className="container-nova relative z-10 w-full h-full flex items-center pt-12 md:pt-0 px-6">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full h-full items-center">
          
          {/* Left Column (55%) */}
          <div className="lg:col-span-7 xl:col-span-6 h-full flex items-center justify-start">
            <HeroContent
              nameRef={nameRef}
              taglineRef={taglineRef}
              rolesRef={rolesRef}
              ctaRef={ctaRef}
              scrollRef={scrollRef}
              rolesActive={rolesActive}
            />
          </div>

          {/* Right Column (45%) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 h-full items-center justify-center lg:justify-end">
            <HeroPortrait
              portraitRef={portraitRef}
              portraitWrapperRef={portraitWrapperRef}
              hudRefs={hudRefs}
              coreRefs={coreRefs}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
