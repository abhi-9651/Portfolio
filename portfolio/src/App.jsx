/**
 * App.jsx — Project NOVA
 * Root application component.
 *
 * Orchestrates:
 *   1. Lenis smooth scroll (initialized at root)
 *   2. Loader sequence — shown on first render, unmounted after exit
 *   3. VideoBackground — fixed cinematic backdrop synced to sections
 *   4. Navbar — fixed, always rendered (hidden under Loader z-index)
 *   5. Sections: Hero → About → Skills → Projects → Achievements → Contact
 *   6. Footer
 *
 * PRD Reference: PRD.md §9 — User Journey, §10 — Information Architecture
 * DS Reference: DESIGN_SYSTEM.md §28 — Code Standards
 */

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Loader, Navbar, Footer, GlobalBackground } from './components/layout';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Achievements } from './components/sections/Achievements';
import { Contact } from './components/sections/Contact';
import { Cursor } from './components/ui';
import useLenis from './hooks/useLenis';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  /* Initialize Lenis smooth scroll at root */
  useLenis();

  return (
    <>
      {/* ── Loader (fullscreen, z-[400], exits after 5s) ── */}
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <Loader key="loader" onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      {/* Unified cinematic background system */}
      <GlobalBackground />
      
      {/* Custom Mouse Cursor */}
      <Cursor />

      {/* ── Site layout ── */}
      <div className="bg-transparent min-h-screen font-body text-text-primary">

        {/* Navbar — transparent at Hero, glass after scroll */}
        <Navbar />

        {/* Main content area */}
        <main id="main-content" tabIndex={-1} className="outline-none">

          {/* Chapter One — System Initialization */}
          <Hero isLoaded={isLoaded} />

          {/* Chapter Two — Identity Chamber */}
          <About />

          {/* Chapter Three — Technology Laboratory */}
          <Skills />

          {/* Chapter Four — Mission Archive */}
          <Projects />

          {/* Mission Records — Achievements */}
          <Achievements />

          {/* Chapter Five — Mission Control */}
          <Contact />

        </main>

        <Footer />

      </div>
    </>
  );
}
