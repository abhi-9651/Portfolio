import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  
  // Mouse position for the spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax for the image
  const imageX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const imageY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const isHireHub = project.id === 'hirehub';

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Spotlight position
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    
    // Image parallax calculation (-5 to 5 pixels)
    const x = ((clientX - left) / width - 0.5) * -10;
    const y = ((clientY - top) / height - 0.5) * -10;
    imageX.set(x);
    imageY.set(y);
  }

  function handleMouseLeave() {
    // Reset parallax on leave
    imageX.set(0);
    imageY.set(0);
  }

  // Spotlight background template
  const background = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    ${isHireHub ? 'rgba(0, 229, 255, 0.15)' : 'rgba(0, 229, 255, 0.08)'},
    transparent 80%
  )`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Idle floating animation
      animate={{ y: [0, -3, 0] }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: index * 0.2 // Stagger the floating slightly
      }}
      className={`
        relative flex flex-col group overflow-hidden rounded-[24px] cursor-pointer h-full
        bg-gradient-to-b from-surface/80 to-surface-alt/80 backdrop-blur-xl
        border border-border-primary/30 
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]
        ${isHireHub ? 'hover:border-primary/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]' : 'hover:border-primary/40'}
      `}
    >
      {/* Spotlight Effect (Visible on hover) */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background }}
      />
      
      {/* Sweeping Light Animation on Hover */}
      <div className="absolute inset-0 z-10 -translate-x-full group-hover:animate-light-sweep bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* TOP SECTION: 16:9 Image Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-black/50 border-b border-border-primary/20 z-10">
        
        {/* Holographic / Grid Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(0, 229, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 229, 255, 0.1) 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-20 pointer-events-none" />

        {/* Project Image with Parallax and Zoom */}
        <motion.div
          style={{ x: imageX, y: imageY }}
          className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] z-10"
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />
        </motion.div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-30 pointer-events-none">
          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1 bg-surface/80 backdrop-blur-md rounded-full border border-border-primary/50">
            <span className={`w-2 h-2 rounded-full animate-pulse ${project.status === 'FEATURED' ? 'bg-primary' : 'bg-success'}`} />
            <span className="text-[10px] font-mono text-text-primary uppercase tracking-widest">
              {project.status}
            </span>
          </div>

          {/* Project Number */}
          <div className="font-display font-bold text-2xl text-white/20 group-hover:text-primary/40 transition-colors duration-500">
            0{index + 1}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Content */}
      <div className="relative p-6 flex flex-col flex-grow z-10">
        
        {/* Title and Stars */}
        <div className="flex justify-between items-center mb-3">
          <h3 className={`font-display font-bold text-2xl text-text-primary transition-colors duration-300 ${isHireHub ? 'group-hover:text-primary' : 'group-hover:text-white'}`}>
            {project.title}
          </h3>
          {project.stars && (
            <div className="flex items-center gap-1.5 text-text-secondary group-hover:text-warning transition-colors duration-300">
              <FiStar className="text-sm" />
              <span className="text-xs font-mono">{project.stars}</span>
            </div>
          )}
        </div>

        {/* Description (2-3 lines fixed height for alignment) */}
        <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-3 min-h-[60px] mb-6">
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <span 
              key={t} 
              className="px-2.5 py-1 bg-surface-alt/50 border border-border-primary/30 rounded-md font-mono text-[10px] text-text-tertiary group-hover:border-primary/30 group-hover:text-primary/80 transition-colors duration-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons (Aligned to bottom) */}
        <div className="mt-auto grid grid-cols-2 gap-3 relative z-20">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 py-2.5 bg-surface-alt/50 border border-border-primary/50 text-text-secondary rounded-lg hover:bg-surface-alt hover:text-white hover:border-text-secondary transition-all duration-300 font-mono text-xs uppercase tracking-wider"
          >
            <FiGithub /> Source
          </a>
          
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 py-2.5 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary hover:text-surface hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all duration-300 font-mono text-xs uppercase tracking-wider overflow-hidden relative group/btn"
            >
              {/* Ripple / Shine effect on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <FiExternalLink /> Live Demo
            </a>
          ) : (
            <button
              disabled
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 py-2.5 bg-surface-alt/20 border border-border-primary/20 text-text-disabled rounded-lg cursor-not-allowed font-mono text-xs uppercase tracking-wider"
            >
              Offline
            </button>
          )}
        </div>
      </div>
      
      {/* Subtle Glow beneath card (Pseudo element) */}
      <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-10 blur-2xl rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${isHireHub ? 'bg-primary/30' : 'bg-primary/10'}`} />
    </motion.div>
  );
}
