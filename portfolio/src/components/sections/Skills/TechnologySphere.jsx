import { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiNodedotjs, 
  SiExpress, SiMongodb, SiTailwindcss, SiGreensock, SiFramer, 
  SiGit, SiGithub, SiHtml5, SiCss, SiCplusplus, SiPython
} from 'react-icons/si';

import { SKILLS } from '../../../constants/config';
import { GlassCard } from '../../ui';

// Map icon names to components
const iconMap = {
  'React': SiReact, 'Next.js': SiNextdotjs, 'JavaScript': SiJavascript,
  'TypeScript': SiTypescript, 'Node.js': SiNodedotjs, 'Express.js': SiExpress,
  'MongoDB': SiMongodb, 'Tailwind CSS': SiTailwindcss, 'GSAP': SiGreensock,
  'Framer Motion': SiFramer, 'Git': SiGit, 'GitHub': SiGithub,
  'HTML5': SiHtml5, 'CSS3': SiCss, 'C++': SiCplusplus, 'Python': SiPython
};

// Generate random points on a sphere using Fibonacci lattice for even distribution
function generateSpherePoints(count, radius) {
  const points = new Float32Array(count * 3);
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const r = Math.sqrt(1 - y * y); // radius at y

    const theta = phi * i; // golden angle increment

    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    points[i * 3] = x * radius;
    points[i * 3 + 1] = y * radius;
    points[i * 3 + 2] = z * radius;
  }
  return points;
}

function ParticleGlobe({ radius = 2.5 }) {
  const points = useMemo(() => generateSpherePoints(1000, radius), [radius]);
  const ref = useRef();
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.2;
    }
  });

  return (
    <group ref={ref}>
      <Points positions={points} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#00E5FF" 
          size={0.03} 
          sizeAttenuation={true} 
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

function TechNode({ skill, index, total, radius, hoveredTech, setHoveredTech, onNodeClick }) {
  // Fibonacci lattice for tech nodes
  const phi = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (total - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const theta = phi * index;

  const x = Math.cos(theta) * r * radius;
  const z = Math.sin(theta) * r * radius;
  const yPos = y * radius;

  const Icon = iconMap[skill.name] || SiJavascript; // fallback
  const isHovered = hoveredTech === skill.id;
  const isAnotherHovered = hoveredTech !== null && hoveredTech !== skill.id;

  return (
    <group position={[x, yPos, z]}>
      <Html center zIndexRange={isHovered ? [100, 0] : [10, 0]}>
        <div
          className={`relative transition-all duration-300 ease-out flex items-center justify-center
            ${isHovered ? 'scale-125 z-50' : 'scale-100 z-10'}
            ${isAnotherHovered ? 'opacity-20' : 'opacity-100'}
          `}
          onPointerOver={(e) => { e.stopPropagation(); setHoveredTech(skill.id); }}
          onPointerOut={(e) => { e.stopPropagation(); setHoveredTech(null); }}
          onClick={(e) => { e.stopPropagation(); onNodeClick({x, y: yPos, z}); }}
        >
          {/* Node Circle */}
          <div className={`
            w-12 h-12 rounded-full border backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300
            ${isHovered 
              ? 'bg-surface-alt border-primary shadow-[0_0_25px_rgba(0,229,255,0.8)]' 
              : 'bg-surface/50 border-border-primary/30 hover:border-primary/50 hover:bg-surface/80'
            }
          `}>
            <Icon className="text-xl transition-colors duration-300" style={{ color: isHovered ? '#00E5FF' : '#94A3B8' }} />
          </div>

          {/* HUD Card */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 40, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="absolute left-full top-1/2 -translate-y-1/2 w-72 pointer-events-none"
              >
                <GlassCard variant="default" className="p-5 border-primary/40 shadow-[0_0_30px_rgba(0,229,255,0.15)] bg-surface/95 backdrop-blur-2xl">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-display font-bold text-primary text-base tracking-wider uppercase">{skill.name}</h5>
                    <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 uppercase">
                      {skill.level}
                    </span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-surface-alt rounded-full overflow-hidden mb-4 border border-border-primary/20">
                    <div 
                      className="h-full bg-primary rounded-full relative"
                      style={{ width: `${skill.proficiency * 20}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 blur-[2px]" />
                    </div>
                  </div>
                  
                  {skill.description && (
                    <p className="text-xs text-text-secondary leading-relaxed mb-4 font-body">
                      {skill.description}
                    </p>
                  )}
                  
                  {skill.projects && (
                    <div className="pt-3 border-t border-border-primary/30">
                      <span className="block text-[9px] text-text-disabled uppercase tracking-widest mb-1.5 flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                        Active Systems
                      </span>
                      <p className="text-xs font-mono text-text-primary/90 leading-relaxed">{skill.projects}</p>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Html>
    </group>
  );
}

function SphereContent({ hoveredTech, setHoveredTech }) {
  const groupRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });
  const isRotatingToTarget = useRef(false);
  
  // Select top technologies for the sphere (limit to 16 for even distribution and performance)
  const displaySkills = useMemo(() => {
    return SKILLS.filter(s => iconMap[s.name] || s.name === 'C++' || s.name === 'Python').slice(0, 16);
  }, []);

  const handleNodeClick = (position) => {
    // Calculate rotation needed to bring point to front (z-axis)
    const currentRotY = groupRef.current.rotation.y % (Math.PI * 2);
    
    // Convert target position to angles
    const targetY = Math.atan2(position.x, position.z);
    const targetX = Math.atan2(position.y, Math.sqrt(position.x * position.x + position.z * position.z));
    
    // Ensure we rotate the shortest distance
    targetRotation.current.y = groupRef.current.rotation.y - targetY;
    targetRotation.current.x = targetX;
    
    isRotatingToTarget.current = true;
  };

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (isRotatingToTarget.current) {
        // Smoothly rotate to clicked item
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.current.y, 4 * delta);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.current.x, 4 * delta);
        
        // Stop if close enough
        if (Math.abs(groupRef.current.rotation.y - targetRotation.current.y) < 0.01 && 
            Math.abs(groupRef.current.rotation.x - targetRotation.current.x) < 0.01) {
          isRotatingToTarget.current = false;
        }
      } else {
        // Base rotation speed
        const targetSpeed = hoveredTech ? 0.02 : 0.15; // Slow down when hovered
        
        // Initialize speed ref if not exists
        if (groupRef.current.userData.speed === undefined) {
          groupRef.current.userData.speed = 0.15;
        }
        
        // Smoothly interpolate speed
        groupRef.current.userData.speed = THREE.MathUtils.lerp(groupRef.current.userData.speed, targetSpeed, 5 * delta);
        
        groupRef.current.rotation.y += delta * groupRef.current.userData.speed;
        
        // Very slow idle x-axis rotation, returning to 0 if previously clicked
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05, delta);
      }
    }
  });

  return (
    <>
      <ParticleGlobe radius={2.4} />
      
      <group ref={groupRef}>
        {displaySkills.map((skill, i) => (
          <TechNode 
            key={skill.id} 
            skill={skill} 
            index={i} 
            total={displaySkills.length} 
            radius={2.7} 
            hoveredTech={hoveredTech}
            setHoveredTech={setHoveredTech}
            onNodeClick={handleNodeClick}
          />
        ))}
      </group>
      
      {/* AI CORE */}
      <Html center zIndexRange={[50, 0]}>
        <div className="relative group pointer-events-none">
          {/* Outer rotating dashed rings */}
          <div className="absolute inset-[-20px] rounded-full border border-dashed border-primary/30 animate-spin-[20s_linear_infinite]" />
          <div className="absolute inset-[-40px] rounded-full border border-primary/10 animate-spin-[30s_linear_infinite_reverse]" />
          
          <div className="w-24 h-24 rounded-full bg-surface/80 backdrop-blur-md border border-primary/50 shadow-[0_0_30px_rgba(0,229,255,0.5)] flex items-center justify-center animate-pulse-slow">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg pointer-events-none" />
            <span className="font-display font-bold text-sm text-primary tracking-widest text-center leading-tight">
              AI<br/>CORE
            </span>
          </div>
        </div>
      </Html>
    </>
  );
}

function MobileFallback({ displaySkills, setHoveredTech }) {
  // A premium list/carousel for mobile devices
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="relative w-24 h-24 mb-12 rounded-full bg-surface-alt border border-primary/50 shadow-[0_0_30px_rgba(0,229,255,0.4)] flex items-center justify-center animate-pulse-slow">
        <div className="absolute inset-[-20px] rounded-full border border-dashed border-primary/30 animate-spin-[20s_linear_infinite]" />
        <span className="font-display font-bold text-sm text-primary tracking-widest text-center leading-tight">
          AI<br/>CORE
        </span>
      </div>
      
      <div className="w-full max-w-sm px-4 grid grid-cols-4 gap-4 relative z-10">
        {displaySkills.map((skill) => {
          const Icon = iconMap[skill.name] || SiJavascript;
          return (
            <div 
              key={skill.id}
              className="aspect-square rounded-full border border-border-primary/50 bg-surface/60 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/20"
              onClick={() => {
                // We can add a modal here if needed, but for now we'll just display a simple toast or do nothing since mobile hover is tap
                setHoveredTech(skill.id);
                setTimeout(() => setHoveredTech(null), 3000); // clear after 3s
              }}
            >
              <Icon className="text-xl text-primary/80" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TechnologySphere() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displaySkills = useMemo(() => {
    return SKILLS.filter(s => iconMap[s.name] || s.name === 'C++' || s.name === 'Python').slice(0, 16);
  }, []);

  if (isMobile) {
    return <MobileFallback displaySkills={displaySkills} setHoveredTech={setHoveredTech} />;
  }

  return (
    <div className="w-full h-[600px] relative flex items-center justify-center">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08)_0%,transparent_60%)] pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.8} />
        <SphereContent hoveredTech={hoveredTech} setHoveredTech={setHoveredTech} />
      </Canvas>
    </div>
  );
}
