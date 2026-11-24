import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "../SceneCanvas";
import { COLORS } from "../palette";
import { usePointer } from "@/hooks/usePointer";
import { useCapabilities } from "@/hooks/useCapabilities";

const { damp } = THREE.MathUtils;

/**
 * One scene, five personalities. Each inner page gets its own set of floating shapes
 * so pages feel related but never identical. Positions are [x, y, z] at a reference
 * 16:9 viewport and are scaled down automatically on narrow screens.
 * Tuple: [kind, position, size, speed]
 */
const PRESETS = {
  // Services: crisp, technical solids
  services: {
    color: COLORS.teal,
    accent: COLORS.steel,
    shapes: [
      ["octa", [-4.4, 1.7, -1], 0.5, 1.2],
      ["box", [4.5, -1.3, -2], 0.6, 1.0],
      ["ico", [3.7, 2.3, -1.5], 0.45, 1.4],
      ["torus", [-3.8, -1.9, -1], 0.5, 1.1],
      ["octa", [0.6, 2.7, -3], 0.35, 1.5],
      ["box", [-1.3, -2.8, -2], 0.35, 1.2],
    ],
  },
  // Portfolio: floating "frames", like project cards drifting in depth
  portfolio: {
    color: COLORS.teal,
    accent: COLORS.steel,
    shapes: [
      ["frame", [-4.3, 1.5, -1.5], 0.8, 1.1],
      ["frame", [4.4, -1.2, -2.5], 0.85, 0.9],
      ["frame", [3.9, 2.2, -3], 0.6, 1.2],
      ["frame", [-3.6, -2.1, -2], 0.65, 1.0],
      ["ring", [0.3, 2.6, -3], 0.7, 1.4],
      ["frame", [-0.8, -2.9, -3.5], 0.5, 1.2],
    ],
  },
  // Gallery: soft orbs and rings
  gallery: {
    color: COLORS.teal,
    accent: COLORS.steel,
    shapes: [
      ["sphere", [-4.3, 1.4, -1.5], 0.5, 1.0],
      ["ring", [4.3, -1.2, -2], 0.9, 1.2],
      ["sphere", [3.9, 2.3, -2.5], 0.35, 1.4],
      ["torus", [-3.7, -2.0, -1.5], 0.45, 1.1],
      ["sphere", [0.2, 2.7, -3.5], 0.28, 1.6],
      ["ring", [-1.2, -2.8, -2.5], 0.7, 1.1],
    ],
  },
  // Careers: shapes that rise, a quiet nod to growth
  careers: {
    color: COLORS.teal,
    accent: COLORS.steel,
    shapes: [
      ["ico", [-4.2, -0.4, -1.5], 0.5, 1.4],
      ["ico", [-3.2, 2.2, -2.5], 0.35, 1.6],
      ["octa", [4.2, 0.8, -2], 0.45, 1.2],
      ["ico", [3.5, -2.3, -1.5], 0.38, 1.5],
      ["octa", [0.8, 2.8, -3.5], 0.3, 1.7],
      ["ring", [-0.5, -2.9, -2.5], 0.75, 1.1],
    ],
  },
  // Contact: a single calm knot plus orbit rings
  contact: {
    color: COLORS.teal,
    accent: COLORS.steel,
    shapes: [
      ["knot", [4.2, 0.6, -2], 0.7, 1.0],
      ["ring", [-4.2, 1.6, -2.5], 0.9, 1.2],
      ["sphere", [-3.7, -2.0, -1.5], 0.35, 1.4],
      ["octa", [3.4, 2.5, -2.5], 0.3, 1.5],
      ["ring", [3.6, -2.4, -3], 0.6, 1.1],
    ],
  },
  // Small call-to-action accent
  cta: {
    color: COLORS.teal,
    accent: COLORS.steel,
    shapes: [
      ["torus", [-4.2, 0.4, -1], 0.55, 1.2],
      ["ico", [4.1, -0.6, -1], 0.5, 1.3],
      ["octa", [-2.2, 2.4, -2], 0.3, 1.5],
      ["octa", [2.4, -2.3, -2], 0.3, 1.4],
    ],
  },
};

function geometryFor(kind) {
  switch (kind) {
    case "octa":
      return <octahedronGeometry args={[1, 0]} />;
    case "box":
      return <boxGeometry args={[1.1, 1.1, 1.1]} />;
    case "ico":
      return <icosahedronGeometry args={[1, 0]} />;
    case "torus":
      return <torusGeometry args={[0.8, 0.28, 24, 56]} />;
    case "sphere":
      return <sphereGeometry args={[0.85, 32, 32]} />;
    case "frame":
      return <boxGeometry args={[1.7, 1.1, 0.05]} />;
    case "ring":
      return <torusGeometry args={[1, 0.035, 12, 96]} />;
    case "knot":
      return <torusKnotGeometry args={[0.65, 0.2, 120, 14]} />;
    default:
      return <octahedronGeometry args={[1, 0]} />;
  }
}

function Shape({ kind, position, size, speed, color, accent, index, k }) {
  const mesh = useRef();
  const solid = kind !== "ring";
  const flat = kind === "octa" || kind === "ico" || kind === "box";

  useFrame((_, dt) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += dt * 0.12 * speed;
    mesh.current.rotation.y += dt * 0.18 * speed;
  });

  const tint = index % 2 ? accent : color;

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.1}>
      <group position={[position[0] * k, position[1], position[2]]} scale={size * Math.max(k, 0.55)}>
        <mesh ref={mesh}>
          {geometryFor(kind)}
          {solid ? (
            <meshPhysicalMaterial
              color="#241a19"
              emissive={tint}
              emissiveIntensity={0.16}
              metalness={0.75}
              roughness={0.28}
              flatShading={flat}
              transparent
              opacity={0.88}
              clearcoat={0.8}
            />
          ) : (
            <meshBasicMaterial color={tint} transparent opacity={0.8} />
          )}
        </mesh>
        {solid && (
          <mesh scale={1.04}>
            {geometryFor(kind)}
            <meshBasicMaterial color={tint} wireframe transparent opacity={0.22} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

function Rig({ preset, light }) {
  const group = useRef();
  const pointer = usePointer();
  const { viewport } = useThree();
  const k = Math.min(1.1, Math.max(0.3, viewport.width / 10));
  const shapes = light ? preset.shapes.slice(0, 4) : preset.shapes;

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    // gentle mouse parallax + slow scroll drift
    const scrollDrift = Math.min(window.scrollY, 1200) * 0.0016;
    g.rotation.y = damp(g.rotation.y, pointer.current.x * 0.22, 2.5, dt);
    g.rotation.x = damp(g.rotation.x, -pointer.current.y * 0.12, 2.5, dt);
    g.position.y = damp(g.position.y, scrollDrift, 3, dt);
  });

  return (
    <group ref={group}>
      {shapes.map(([kind, position, size, speed], i) => (
        <Shape
          key={`${kind}-${i}`}
          kind={kind}
          position={position}
          size={size}
          speed={speed}
          color={preset.color}
          accent={preset.accent}
          index={i}
          k={k}
        />
      ))}
    </group>
  );
}

export default function AmbientScene({ variant = "services", onReady }) {
  const { light } = useCapabilities();
  const preset = PRESETS[variant] || PRESETS.services;
  return (
    <SceneCanvas camera={{ position: [0, 0, 8], fov: 40 }} onReady={onReady}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color={COLORS.warm} />
      <pointLight position={[-5, -2, 3]} intensity={26} distance={16} decay={2} color={preset.color} />
      <pointLight position={[5, 3, -1]} intensity={20} distance={16} decay={2} color={preset.accent} />
      <Rig preset={preset} light={light} />
      <Sparkles
        count={light ? 22 : 55}
        scale={[14, 8, 6]}
        size={light ? 2.6 : 2.2}
        speed={0.25}
        opacity={0.7}
        color={preset.accent}
      />
    </SceneCanvas>
  );
}
