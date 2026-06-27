/**
 * Footer.jsx — Project NOVA Layout Component
 *
 * Minimal, elegant footer marking the end of the narrative.
 * Displays "MISSION COMPLETE".
 */

import { Container } from '../../ui';
import { SOCIAL_LINKS } from '../../../constants/socials';
import { SITE_CONFIG } from '../../../constants/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full py-16 border-t border-border-primary/30 bg-[#020617]/80 backdrop-blur-md mt-auto">
      <Container size="default">
        <div className="flex flex-col items-center text-center gap-6">
          
          <div className="font-mono text-sm text-primary tracking-[0.3em] uppercase font-bold mb-4">
            Mission Complete
          </div>

          <h2 className="font-display text-2xl md:text-3xl text-text-primary font-bold">
            Thank you for visiting.
          </h2>
          
          <p className="font-body text-text-secondary text-sm md:text-base max-w-md mx-auto">
            See you on the next project.
          </p>

          <div className="flex items-center gap-6 mt-6">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.ariaLabel}
                  className="text-text-disabled hover:text-primary transition-colors text-lg"
                >
                  <Icon />
                </a>
              );
            })}
          </div>

          <div className="w-24 h-px bg-border-primary/50 my-4" />

          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-2xl font-mono text-[10px] text-text-disabled uppercase tracking-widest gap-4">
            <span>&copy; {currentYear} {SITE_CONFIG.name}.</span>
            
            <span className="flex items-center gap-2">
              Powered by <span className="text-text-primary font-bold">NOVA</span>
            </span>
          </div>

        </div>
      </Container>
    </footer>
  );
}
