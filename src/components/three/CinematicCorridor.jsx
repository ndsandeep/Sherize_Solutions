import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useReducedMotion, useTransform, motion } from 'framer-motion';
import * as THREE from 'three';

const TEAL = '#167D8D';
const WALL = '#101D2B';

function CorridorScene({ progress }) {
  const cameraTarget = useRef(11);
  const doors = useRef([]);
  const lights = useRef([]);
  const floorMaterial = useRef();
  useFrame(({ camera, clock }, delta) => {
    const p = progress.get();
    const eased = p * p * (3 - 2 * p);
    cameraTarget.current = 11 - 40 * eased;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraTarget.current, 5.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.12 + Math.sin(clock.elapsedTime * 0.55) * 0.035, 3, delta);
    camera.lookAt(0, 0, camera.position.z - 8);
    const opening = THREE.MathUtils.smoothstep(p, 0.49, 0.77);
    if (doors.current[0]) doors.current[0].position.x = -1.65 - opening * 3.5;
    if (doors.current[1]) doors.current[1].position.x = 1.65 + opening * 3.5;
    lights.current.forEach((mat, i) => {
      if (mat) mat.emissiveIntensity = 0.7 + 1.8 * Math.max(0, 1 - Math.abs((p * 40) - i * 5) / 8);
    });
    if (floorMaterial.current) floorMaterial.current.roughness = 0.28;
  });
  return <>
    <color attach="background" args={['#0D1B28']} />
    <fog attach="fog" args={['#0D1B28', 18, 51]} />
    <ambientLight intensity={0.48} color="#b2a58b" />
    <pointLight position={[0, 2, 7]} intensity={18} distance={18} color={TEAL} />
    <pointLight position={[0, 1, -25]} intensity={50} distance={25} color="#fff0d4" />
    <mesh position={[0, -3.03, -12]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[12, 100]} />
      <meshStandardMaterial ref={floorMaterial} color="#282b29" metalness={0.6} roughness={0.28} />
    </mesh>
    <mesh position={[0, 3.05, -12]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[12, 100]} />
      <meshStandardMaterial color="#181c1b" metalness={0.3} roughness={0.65} />
    </mesh>
    {[-5.9, 5.9].map((x) => <mesh key={x} position={[x, 0, -12]} rotation={[0, Math.PI / 2, 0]}>
      <planeGeometry args={[100, 6.1]} />
      <meshStandardMaterial color={WALL} metalness={0.48} roughness={0.62} side={THREE.DoubleSide} />
    </mesh>)}
    {Array.from({ length: 10 }, (_, i) => {
      const z = 7 - i * 4.2;
      return <group key={i} position={[0, 0, z]}>
        {[-5.35, 5.35].map((x) => <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.22, 6.05, 0.28]} />
          <meshStandardMaterial color="#4d4b43" metalness={0.75} roughness={0.32} />
        </mesh>)}
        <mesh position={[0, 2.88, 0]}>
          <boxGeometry args={[10.8, 0.2, 0.3]} />
          <meshStandardMaterial color="#555045" metalness={0.7} roughness={0.4} />
        </mesh>
        {[-5.12, 5.12].map((x, j) => <mesh key={j} position={[x, 0, 0.12]}>
          <boxGeometry args={[0.045, 5.6, 0.08]} />
          <meshStandardMaterial ref={(el) => { lights.current[i * 2 + j] = el; }} color="#e6c99b" emissive={TEAL} emissiveIntensity={1.2} toneMapped={false} />
        </mesh>)}
        <mesh position={[0, 2.77, 0.12]}>
          <boxGeometry args={[9.9, 0.055, 0.08]} />
          <meshStandardMaterial color="#f1d9ac" emissive={TEAL} emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
      </group>;
    })}
    <group position={[0, 0, -31.5]}>
      {[-1, 1].map((side, i) => <mesh key={side} ref={(el) => { doors.current[i] = el; }} position={[side * 1.65, 0, 0]}>
        <boxGeometry args={[3.3, 6, 0.28]} />
        <meshStandardMaterial color="#31352f" metalness={0.8} roughness={0.28} />
      </mesh>)}
      <mesh position={[0, 3.04, 0.12]}><boxGeometry args={[7.2, 0.16, 0.22]} /><meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={0.7} /></mesh>
    </group>
  </>;
}

export default function CinematicCorridor({ children }) {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [webgl, setWebgl] = useState(true);

  // Check if user has already seen the opening corridor animation in this session
  const [alreadyViewed] = useState(() => {
    try {
      return sessionStorage.getItem('sherize_corridor_viewed') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('sherize_corridor_viewed', 'true');
    } catch {}
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  // Only one title appears, timed to the approach to the golden doors.
  const welcomeOpacity = useTransform(scrollYProgress, [0, 0.25, 0.34, 0.52, 0.67, 1], [0, 0, 1, 1, 0, 0]);
  const welcomeScale = useTransform(scrollYProgress, [0.25, 0.52, 0.67], [0.88, 1, 1.16]);
  const welcomeY = useTransform(scrollYProgress, [0.25, 0.52, 0.67], [35, 0, -24]);
  // Fade the entire sticky corridor, including its opaque background, so the
  // ONE real hero underneath is visible at the end of the scroll journey.
  // Open a transparent aperture through the actual WebGL corridor layer.
  // The one real homepage hero is already behind the doors, so it is visible
  // through the opening immediately, not after another scroll or a black frame.
  const doorwayWidth = useTransform(scrollYProgress, [0, 0.49, 0.69, 0.82, 0.91], [0, 0, 24, 100, 160]);
  const doorwayHeight = useTransform(scrollYProgress, [0, 0.49, 0.69, 0.82, 0.91], [0, 0, 55, 110, 170]);
  const corridorMask = useTransform([doorwayWidth, doorwayHeight], ([w, h]) =>
    `radial-gradient(ellipse ${w}% ${h}% at 50% 50%, transparent 98%, black 100%)`
  );
  const corridorOpacity = useTransform(scrollYProgress, [0.84, 0.94], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12, 0.25], [1, 1, 0]);
  useEffect(() => {
    try { const canvas = document.createElement('canvas'); setWebgl(Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))); }
    catch { setWebgl(false); }
  }, []);
  if (alreadyViewed || reduceMotion || !webgl) return <div className="corridor-motion-fallback">{children}</div>;
  return <section ref={sectionRef} className="corridor-intro" aria-label="Cinematic entrance to Sherize">
    <div className="corridor-sticky">
      <div className="corridor-home-behind">{children}</div>
      <motion.div className="corridor-3d-layer" style={{ opacity: corridorOpacity, WebkitMaskImage: corridorMask, maskImage: corridorMask }}>
      <Suspense fallback={<div className="corridor-loading" />}>
        <Canvas dpr={[1, 1.65]} camera={{ position: [0, 0.12, 11], fov: 65, near: 0.1, far: 110 }} gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}>
          <CorridorScene progress={scrollYProgress} />
        </Canvas>
      </Suspense>
      <motion.div className="corridor-vignette" aria-hidden="true"  />
      <motion.div className="corridor-cue" style={{ opacity: cueOpacity }}>
        <span className="corridor-cue-line" />
        <span>SCROLL TO ENTER</span>
      </motion.div>
      <motion.div className="corridor-welcome" style={{ opacity: welcomeOpacity, scale: welcomeScale, y: welcomeY }} aria-label="Welcome to Sherize">
        <span className="corridor-welcome-eyebrow">WELCOME TO</span>
        <span className="corridor-welcome-title">SHERIZE<span className="corridor-welcome-period">.</span></span>
      </motion.div>
      </motion.div>
    </div>
  </section>;
}
