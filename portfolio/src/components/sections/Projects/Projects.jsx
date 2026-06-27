import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, SectionTitle } from '../../ui';
import { PROJECTS } from '../../../constants/config';
import ProjectCard from './ProjectCard';

/* ── ANIMATED STARFIELD BACKGROUND ────────────────────────────── */
function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set initial size
    const setSize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Create stars
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random(),
      speed: (Math.random() * 0.2) + 0.05
    }));

    let animationFrameId;

    // Animate stars moving slightly upwards (like falling through space)
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.y -= star.speed;
        
        // Reset star to bottom if it goes off top
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
    />
  );
}

/* ── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function Projects() {
  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger reveal
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } 
    },
  };

  return (
    <section
      id="projects"
      className="section-wrapper relative overflow-hidden pt-24 pb-40"
      aria-label="Projects — Featured Projects"
    >
      {/* Background Starfield specifically for this section */}
      <Starfield />

      <Container size="default" className="relative z-10">
        
        {/* Section Header */}
        <div className="mb-20">
          <SectionTitle
            label="Chapter Four"
            title="FEATURED PROJECTS"
            subtitle="A curated collection of projects showcasing my engineering, design, and problem-solving skills."
            align="center"
            showLine={true}
          />
        </div>

        {/* Premium Bento Grid Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          // CSS Grid: 1 column mobile, 3 columns on large screens to fit all 3 projects in one row
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
        >
          {PROJECTS.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants} className="h-full">
              {/* Wrapping link if we want the whole card clickable, though buttons inside need stopPropagation (handled in ProjectCard) */}
              <div 
                className="h-full"
                onClick={() => {
                  // If entire card is clicked, navigate to live or github
                  window.open(project.live || project.github, '_blank');
                }}
              >
                <ProjectCard project={project} index={index} />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </Container>
    </section>
  );
}
