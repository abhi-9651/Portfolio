import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Line, Ring } from '@react-three/drei';
import * as THREE from 'three';

/* ── CONSTANTS & UTILS ───────────────────────────────────────── */
const MAX_SCROLL = 5000; // Approximate max scroll depth for interpolation
const SECTIONS = { HERO: 0, ABOUT: 1, SKILLS: 2, PROJECTS: 3, CONTACT: 4 };

function getScrollProgress() {
  return Math.min(window.scrollY / MAX_SCROLL, 1);
}

/* ── SHADERS ─────────────────────────────────────────────────── */
const starVertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  attribute float aRandom;
  attribute float aSize;
  varying float vAlpha;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    
    // Smooth twinkling based on time and random offset
    float twinkle = (sin(uTime * (aRandom * 2.0 + 1.0) + aRandom * 100.0) * 0.5 + 0.5);
    
    // Mouse proximity brightening
    // Map screen pointer (-1 to 1) to rough world coordinates
    vec2 worldPointer = uPointer * 20.0;
    float distToMouse = distance(position.xy, worldPointer);
    float hoverGlow = smoothstep(15.0, 0.0, distToMouse) * 1.5;
    
    vAlpha = min(twinkle * aRandom + hoverGlow, 1.0);
    
    gl_PointSize = aSize * (30.0 / -mvPosition.z) * (1.0 + hoverGlow * 0.5);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  varying float vAlpha;
  uniform vec3 uColor;
  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if(dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

/* ── LAYER 2: ADVANCED STARS ─────────────────────────────────── */
function AdvancedStars({ count = 3000, color = "#ffffff" }) {
  const materialRef = useRef();
  
  const [positions, randoms, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 10;
      rnd[i] = Math.random();
      sz[i] = Math.random() * 2.0 + 0.5;
    }
    return [pos, rnd, sz];
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(0, 0) },
    uColor: { value: new THREE.Color(color) }
  }), [color]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smooth pointer interpolation
      materialRef.current.uniforms.uPointer.value.lerp(state.pointer, 0.05);
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aRandom" count={count} array={randoms} itemSize={1} />
        <bufferAttribute attach="attributes-aSize" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial 
        ref={materialRef}
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── LAYER 3: COSMIC DUST ────────────────────────────────────── */
function CosmicDust() {
  const pointsRef = useRef();
  const particleCount = 1000;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, [particleCount]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];
      
      // Wrap around bounds
      if (pos[i * 3] > 30) pos[i * 3] = -30;
      else if (pos[i * 3] < -30) pos[i * 3] = 30;
      if (pos[i * 3 + 1] > 30) pos[i * 3 + 1] = -30;
      else if (pos[i * 3 + 1] < -30) pos[i * 3 + 1] = 30;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#00e5ff" transparent opacity={0.4} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ── LAYER 4: MORPHING NEBULA ────────────────────────────────── */
function MorphingNebula() {
  const cloudsRef = useRef();
  const mat1 = useRef();
  const mat2 = useRef();
  
  const c1 = new THREE.Color("#00e5ff");
  const c2 = new THREE.Color("#7c3aed");
  const c3 = new THREE.Color("#0055ff");

  useFrame((state, delta) => {
    if (!cloudsRef.current) return;
    cloudsRef.current.rotation.z -= delta * 0.005;
    cloudsRef.current.rotation.y += delta * 0.002;
    
    // Cycle over ~3 minutes (180s)
    const t = state.clock.elapsedTime * 0.03; 
    
    // Morph colors smoothly
    const mix1 = (Math.sin(t) * 0.5 + 0.5);
    const mix2 = (Math.cos(t * 0.8) * 0.5 + 0.5);
    
    if (mat1.current) mat1.current.color.lerpColors(c1, c2, mix1);
    if (mat2.current) mat2.current.color.lerpColors(c2, c3, mix2);
    
    // Ambient breathing opacity
    const breathing = (Math.sin(state.clock.elapsedTime * 0.3) * 0.5 + 0.5) * 0.015;
    if (mat1.current) mat1.current.opacity = 0.02 + breathing;
    if (mat2.current) mat2.current.opacity = 0.015 + breathing * 0.8;
  });

  return (
    <group ref={cloudsRef} position={[0, 0, -20]}>
      <mesh position={[-15, 10, -10]}>
        <sphereGeometry args={[16, 32, 32]} />
        <meshBasicMaterial ref={mat1} transparent opacity={0.03} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[20, -15, -15]}>
        <sphereGeometry args={[20, 32, 32]} />
        <meshBasicMaterial ref={mat2} transparent opacity={0.02} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

/* ── LAYER 5: ORBITAL RINGS ──────────────────────────────────── */
function OrbitalRings() {
  const ringsRef = useRef();
  
  useFrame((state, delta) => {
    if (!ringsRef.current) return;
    ringsRef.current.rotation.x += delta * 0.02;
    ringsRef.current.rotation.y -= delta * 0.015;
    ringsRef.current.rotation.z += delta * 0.01;
    
    // React to scroll
    const scrollY = getScrollProgress();
    ringsRef.current.position.y = THREE.MathUtils.lerp(ringsRef.current.position.y, scrollY * -10, 0.05);
  });

  return (
    <group ref={ringsRef} position={[0, 0, -15]}>
      <Ring args={[18, 18.02, 64]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.08} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </Ring>
      <Ring args={[24, 24.03, 64]} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.05} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </Ring>
      <Ring args={[30, 30.01, 128]} rotation={[Math.PI / 2, Math.PI / 8, 0]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.03} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </Ring>
    </group>
  );
}

/* ── LAYER 6: ADVANCED AI CONSTELLATION ──────────────────────── */
function DataPacket({ curve }) {
  const packetRef = useRef();
  const progress = useRef(Math.random());
  const speed = useRef(Math.random() * 0.002 + 0.001);

  useFrame(() => {
    if (!packetRef.current || !curve) return;
    progress.current += speed.current;
    if (progress.current > 1) {
      progress.current = 0;
      speed.current = Math.random() * 0.002 + 0.001; // new speed
    }
    const point = curve.getPointAt(progress.current);
    packetRef.current.position.copy(point);
    
    // Fade in/out at edges
    const alpha = Math.sin(progress.current * Math.PI);
    packetRef.current.material.opacity = alpha * 0.8;
  });

  return (
    <mesh ref={packetRef}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color="#00e5ff" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function AIConstellation() {
  const groupRef = useRef();
  
  const points = useMemo(() => [
    new THREE.Vector3(-12, -8, -15),
    new THREE.Vector3(-8, -4, -12),
    new THREE.Vector3(-4, -6, -10),
    new THREE.Vector3(-2, 0, -8),
    new THREE.Vector3(3, -3, -10),
    new THREE.Vector3(8, 2, -12),
    new THREE.Vector3(12, -2, -15),
  ], []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const linePoints = useMemo(() => curve.getPoints(50), [curve]);

  useFrame(() => {
    if (!groupRef.current) return;
    const scrollY = getScrollProgress();
    // Bring constellation forward as user scrolls down
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, scrollY * 10, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollY * 5, 0.05);
  });

  return (
    <group ref={groupRef}>
      {points.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
      <Line points={linePoints} color="#00e5ff" opacity={0.1} transparent lineWidth={1.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      
      {/* Animated Data Packets traveling along the curve */}
      {Array.from({ length: 6 }).map((_, i) => (
        <DataPacket key={i} curve={curve} />
      ))}
    </group>
  );
}

/* ── LAYER 7: FOREGROUND SPACE DUST (FAKE DOF) ───────────────── */
function ForegroundDust() {
  const pointsRef = useRef();
  const particleCount = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() * 5) + 2; // Close to camera (Z > 0)
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.03;
  });

  // Soft circle texture to fake blur
  const tex = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial map={tex} size={0.5} color="#7c3aed" transparent opacity={0.15} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ── RANDOM EVENT SCHEDULER ──────────────────────────────────── */
function EventManager() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly decide which event to spawn every 25s
      const rand = Math.random();
      if (rand < 0.4) {
        // Shooting Star
        const id = Date.now();
        const startY = (Math.random() - 0.5) * 20;
        setEvents((prev) => [...prev, { id, type: 'shooting-star', startY }]);
        setTimeout(() => setEvents((p) => p.filter(e => e.id !== id)), 2000);
      } else if (rand < 0.8) {
        // Satellite Flyby
        const id = Date.now();
        const startY = (Math.random() - 0.5) * 15;
        const speed = Math.random() * 0.02 + 0.01;
        setEvents((prev) => [...prev, { id, type: 'satellite', startY, speed }]);
        setTimeout(() => setEvents((p) => p.filter(e => e.id !== id)), 20000);
      }
    }, 15000); // Check every 15s

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {events.map(ev => {
        if (ev.type === 'shooting-star') return <ShootingStar key={ev.id} startY={ev.startY} />;
        if (ev.type === 'satellite') return <Satellite key={ev.id} startY={ev.startY} speed={ev.speed} />;
        return null;
      })}
    </>
  );
}

function ShootingStar({ startY }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.x += delta * 40;
      ref.current.position.y -= delta * 10;
    }
  });

  return (
    <mesh ref={ref} position={[-30, startY + 10, -10]} rotation={[0, 0, -Math.PI / 8]}>
      <planeGeometry args={[4, 0.02]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

function Satellite({ startY, speed }) {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.x += speed;
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={ref} position={[-25, startY, -15]}>
      <octahedronGeometry args={[0.2, 0]} />
      <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.4} />
      <pointLight color="#00e5ff" intensity={0.5} distance={2} />
    </mesh>
  );
}

/* ── CAMERA PARALLAX & SCROLL TRACKER ────────────────────────── */
function CameraController() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const scrollY = getScrollProgress();
    
    // Mouse Parallax (subtle)
    const targetX = state.pointer.x * 1.5;
    const targetY = state.pointer.y * 1.5;
    
    // Scroll affects base camera angle/position
    const scrollOffsetX = Math.sin(scrollY * Math.PI) * 2;
    const scrollOffsetY = scrollY * -5; // move camera down as we scroll
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + scrollOffsetX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + scrollOffsetY, 0.02);
    
    // Look slightly off center based on scroll to create cinematic sweeping motion
    camera.lookAt(0, scrollOffsetY * 0.5, -5);
  });
  return null;
}

/* ── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function GlobalBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]" aria-hidden="true">
      {/* 1. Deep Space Base (CSS) */}
      <div className="absolute inset-0 bg-[#00020a]" />
      
      {/* 2. Soft Horizon Glow (CSS) */}
      <div className="absolute bottom-[-10%] left-0 w-full h-[30%] bg-gradient-to-t from-primary/10 via-purple-500/5 to-transparent blur-[60px] opacity-40 mix-blend-screen animate-pulse-slow" />

      {/* R3F Canvas */}
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }} 
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={['#00020a', 10, 40]} />
        <ambientLight intensity={0.2} />
        
        {/* Layer 2: Advanced Twinkling Stars with Proximity */}
        <AdvancedStars count={prefersReducedMotion ? 1000 : 3500} color="#ffffff" />
        <AdvancedStars count={prefersReducedMotion ? 500 : 1500} color="#00e5ff" />
        
        {/* Layer 3: Cosmic Dust */}
        {!prefersReducedMotion && <CosmicDust />}
        
        {/* Layer 4: Morphing Nebula Clouds */}
        <MorphingNebula />
        
        {/* Layer 5: Orbital Rings */}
        {!prefersReducedMotion && <OrbitalRings />}
        
        {/* Layer 6: AI Constellation & The Navigator */}
        <AIConstellation />
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[12, 5, -20]}>
            <sphereGeometry args={[4, 24, 24]} />
            <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.05} />
          </mesh>
        </Float>
        
        {/* Layer 7: Foreground Blurred Dust (Fake DoF) */}
        {!prefersReducedMotion && <ForegroundDust />}
        
        {/* Random Event Scheduler */}
        {!prefersReducedMotion && <EventManager />}

        {/* Camera Controller (Parallax + Scroll) */}
        {!prefersReducedMotion && <CameraController />}
      </Canvas>

      {/* 3. Subtle Holographic UI Grid (CSS) */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
        }}
      />
    </div>
  );
}
