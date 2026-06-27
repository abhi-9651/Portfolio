/**
 * Loader.jsx — Project NOVA Layout Component
 *
 * Full-screen AI initialization loader shown on first visit.
 * Now powered by a smooth GSAP timeline for maximum cinematic effect.
 *
 * Sequence:
 *   SYSTEM INITIALIZING...
 *   Loading Neural Interface...
 *   Scanning Identity...
 *   Connecting NOVA...
 *   [██████████████]
 *   ACCESS GRANTED
 *   Welcome Commander.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const textRef4 = useRef(null);
  const progressRef = useRef(null);
  const grantedRef = useRef(null);
  const welcomeRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      onComplete?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out and slide up
        gsap.to(containerRef.current, {
          y: '-100%',
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: onComplete
        });
      }
    });

    const stepDuration = 0.25;

    // Set initial states
    gsap.set([textRef1.current, textRef2.current, textRef3.current, textRef4.current, progressRef.current, grantedRef.current, welcomeRef.current], {
      opacity: 0,
      y: 10
    });
    
    // The inner text container for the progress bar starts at 0 width
    const progressTextContainer = progressRef.current.querySelector('.progress-text');
    gsap.set(progressTextContainer, { width: '0%' });

    tl.to(textRef1.current, { opacity: 1, y: 0, duration: stepDuration })
      .to(textRef2.current, { opacity: 1, y: 0, duration: stepDuration }, `+=${0.1}`)
      .to(textRef3.current, { opacity: 1, y: 0, duration: stepDuration }, `+=${0.1}`)
      .to(textRef4.current, { opacity: 1, y: 0, duration: stepDuration }, `+=${0.1}`)
      // Reveal the progress bar container
      .to(progressRef.current, { opacity: 1, y: 0, duration: 0.1 }, `+=${0.1}`)
      // Animate the text width simulating loading
      .to(progressTextContainer, { width: '100%', duration: 0.6, ease: 'steps(14)' })
      // Access Granted (Primary Color)
      .to(grantedRef.current, { opacity: 1, y: 0, duration: stepDuration }, `+=${0.2}`)
      // Welcome
      .to(welcomeRef.current, { opacity: 1, y: 0, duration: stepDuration }, `+=${0.2}`)
      // Hold briefly before exit
      .to({}, { duration: 0.5 });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-background overflow-hidden"
      aria-live="polite"
      aria-label="Loading Project NOVA"
      role="status"
    >
      {/* Corner Brackets */}
      <div className="absolute w-6 h-6 border-primary/60 opacity-60 top-8 left-8 border-t-2 border-l-2" />
      <div className="absolute w-6 h-6 border-primary/60 opacity-60 top-8 right-8 border-t-2 border-r-2" />
      <div className="absolute w-6 h-6 border-primary/60 opacity-60 bottom-8 left-8 border-b-2 border-l-2" />
      <div className="absolute w-6 h-6 border-primary/60 opacity-60 bottom-8 right-8 border-b-2 border-r-2" />

      {/* Scan line overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 opacity-30">
        <div className="animate-scan absolute left-0 right-0 h-px bg-primary/50 blur-[1px]" />
      </div>

      <div className="z-10 flex flex-col items-start gap-3 min-w-[280px]">
        
        <div ref={textRef1} className="flex items-center gap-3">
          <span className="font-mono text-primary/50 text-xs shrink-0 select-none">&gt;</span>
          <span className="font-mono text-sm tracking-[0.08em] text-text-secondary">SYSTEM INITIALIZING...</span>
        </div>

        <div ref={textRef2} className="flex items-center gap-3">
          <span className="font-mono text-primary/50 text-xs shrink-0 select-none">&gt;</span>
          <span className="font-mono text-sm tracking-[0.08em] text-text-secondary">Loading Neural Interface...</span>
        </div>

        <div ref={textRef3} className="flex items-center gap-3">
          <span className="font-mono text-primary/50 text-xs shrink-0 select-none">&gt;</span>
          <span className="font-mono text-sm tracking-[0.08em] text-text-secondary">Scanning Identity...</span>
        </div>

        <div ref={textRef4} className="flex items-center gap-3">
          <span className="font-mono text-primary/50 text-xs shrink-0 select-none">&gt;</span>
          <span className="font-mono text-sm tracking-[0.08em] text-text-secondary">Connecting NOVA...</span>
        </div>

        <div ref={progressRef} className="flex items-center gap-3 w-full my-2">
          <span className="font-mono text-primary/50 text-xs shrink-0 select-none">&gt;</span>
          {/* Animated terminal bar */}
          <div className="progress-text font-mono text-sm tracking-[0.2em] text-primary overflow-hidden whitespace-nowrap inline-block">
            ██████████████
          </div>
        </div>

        <div ref={grantedRef} className="flex items-center gap-3 mt-2">
          <span className="font-mono text-primary/50 text-xs shrink-0 select-none">&gt;</span>
          <span className="font-mono text-lg font-bold tracking-[0.1em] text-primary drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">ACCESS GRANTED</span>
        </div>

        <div ref={welcomeRef} className="flex items-center gap-3 mt-1">
          <span className="font-mono text-primary/50 text-xs shrink-0 select-none">&gt;</span>
          <span className="font-mono text-sm tracking-[0.08em] text-text-primary">Welcome Commander.</span>
          <span className="inline-block w-2 h-4 bg-primary/70 animate-pulse ml-1" />
        </div>

      </div>
    </div>
  );
}
