import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "../SceneCanvas";
import { COLORS } from "../palette";
import { usePointer } from "@/hooks/usePointer";
import { useCapabilities } from "@/hooks/useCapabilities";

const { damp } = THREE.MathUtils;

/** Lemniscate (figure-eight) with a depth twist so the two strands cross in 3D. */
function buildCurve(a = 3.1) {
  const pts = [];
  const n = 260;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const s = Math.sin(t);
    const c = Math.cos(t);
    const d = 1 + s * s;
    pts.push(new THREE.Vector3((a * c) / d, ((a * s * c) / d) * 1.15, 0.45 * Math.sin(t)));
  }
  return new THREE.CatmullRomCurve3(pts, true, "centripetal");
}

function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(22,125,141,0.9)");
  g.addColorStop(0.65, "rgba(22,125,141,0.3)");
  g.addColorStop(1, "rgba(22,125,141,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** A glowing head with a fading comet trail that loops along the infinity path forever. */
function Traveler({ curve, texture, phase, color, speedRef, trail, headScale }) {
  const sprites = useRef([]);
  const lamp = useRef();
  const u = useRef(phase);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    u.current = (u.current + dt * 0.07 * (speedRef?.current ?? 1)) % 1;
    for (let i = 0; i < trail; i++) {
      const sp = sprites.current[i];
      if (!sp) continue;
      const uu = (((u.current - i * 0.0062) % 1) + 1) % 1;
      curve.getPointAt(uu, tmp);
      sp.position.copy(tmp);
      if (i === 0 && lamp.current) lamp.current.position.copy(tmp);
    }
  });

  return (
    <group>
      <pointLight ref={lamp} color={color} intensity={16} distance={5.5} decay={2} />
      {Array.from({ length: trail }).map((_, i) => {
        const k = 1 - i / trail;
        return (
          <sprite
            key={i}
            ref={(el) => {
              sprites.current[i] = el;
            }}
            scale={i === 0 ? headScale : headScale * (0.12 + 0.5 * k)}
          >
            <spriteMaterial
              map={texture}
              color={i === 0 ? "#ffffff" : color}
              transparent
              opacity={i === 0 ? 1 : Math.pow(k, 1.6) * 0.9}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </sprite>
        );
      })}
    </group>
  );
}

function Infinity({ progressRef, subtle, light }) {
  const group = useRef();
  const speed = useRef(1);
  const pointer = usePointer();
  const { viewport } = useThree();
  const curve = useMemo(() => buildCurve(), []);
  const texture = useMemo(() => makeGlowTexture(), []);
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 420, 0.075, 18, true), [curve]);
  const halo = useMemo(() => new THREE.TubeGeometry(curve, 220, 0.2, 10, true), [curve]);

  // Three.js resources created by hand must be released manually.
  useEffect(
    () => () => {
      tube.dispose();
      halo.dispose();
      texture.dispose();
    },
    [tube, halo, texture],
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const p = progressRef?.current ?? 0;
    const t = state.clock.elapsedTime;
    const s = Math.min(1.15, viewport.width / 7.4) * (subtle ? 0.92 : 1);
    g.scale.setScalar(damp(g.scale.x || s, s, 4, dt));
    g.rotation.y = damp(g.rotation.y, Math.sin(t * 0.25) * 0.35 + pointer.current.x * 0.3 + p * 1.1, 3, dt);
    g.rotation.x = damp(g.rotation.x, -0.12 + pointer.current.y * 0.18 + p * 0.25, 3, dt);
    g.rotation.z = Math.sin(t * 0.18) * 0.06;
    speed.current = damp(speed.current, 1 + p * 2.2, 2, dt);
  });

  return (
    <group ref={group}>
      <mesh geometry={tube}>
        <meshStandardMaterial
          color="#2a1b19"
          emissive={COLORS.vermilion}
          emissiveIntensity={subtle ? 0.35 : 0.55}
          metalness={0.65}
          roughness={0.28}
          transparent
          opacity={subtle ? 0.7 : 1}
        />
      </mesh>
      <mesh geometry={halo}>
        <meshBasicMaterial
          color={COLORS.vermilion}
          transparent
          opacity={subtle ? 0.05 : 0.09}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <Traveler
        curve={curve}
        texture={texture}
        phase={0}
        color={COLORS.amber}
        speedRef={speed}
        trail={light ? 18 : 34}
        headScale={1.15}
      />
      <Traveler
        curve={curve}
        texture={texture}
        phase={0.5}
        color={COLORS.violet}
        speedRef={speed}
        trail={light ? 12 : 22}
        headScale={0.8}
      />
    </group>
  );
}

export default function InfinityScene({ progressRef, subtle, onReady }) {
  const { light } = useCapabilities();
  return (
    <SceneCanvas camera={{ position: [0, 0, 7], fov: 45 }} onReady={onReady}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color={COLORS.warm} />
      <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.35}>
        <Infinity progressRef={progressRef} subtle={subtle} light={light} />
      </Float>
      <Sparkles
        count={light ? 30 : subtle ? 50 : 90}
        scale={[11, 6, 5]}
        size={light ? 2.6 : 2.2}
        speed={0.3}
        opacity={0.8}
        color={COLORS.amber}
      />
    </SceneCanvas>
  );
}
