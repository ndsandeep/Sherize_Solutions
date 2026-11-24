import { Suspense, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, useTexture } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "../SceneCanvas";
import { COLORS } from "../palette";
import { usePointer } from "@/hooks/usePointer";
import { useCapabilities } from "@/hooks/useCapabilities";

import dashboard from "@/assets/images/hero-dashboard.jpg";
import logo from "@/assets/images/logo.png";

const { damp } = THREE.MathUtils;
const PLANE_ASPECT = 4 / 3;

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 6]} intensity={1.5} color={COLORS.warm} />
      <pointLight position={[-5, -2, 3]} intensity={32} distance={16} decay={2} color={COLORS.vermilion} />
      <pointLight position={[5, 3, -2]} intensity={26} distance={16} decay={2} color={COLORS.violet} />
    </>
  );
}

/** The existing hero dashboard image, now a floating framed screen in 3D space. */
function Screen() {
  const [map, logoMap] = useTexture([dashboard, logo]);

  useMemo(() => {
    const img = map.image;
    if (!img?.width) return;
    const imgAspect = img.width / img.height;
    if (imgAspect > PLANE_ASPECT) {
      map.repeat.set(PLANE_ASPECT / imgAspect, 1);
      map.offset.set((1 - PLANE_ASPECT / imgAspect) / 2, 0);
    } else {
      map.repeat.set(1, imgAspect / PLANE_ASPECT);
      map.offset.set(0, (1 - imgAspect / PLANE_ASPECT) / 2);
    }
    map.needsUpdate = true;
  }, [map]);

  return (
    <group>
      {/* glow halo */}
      <mesh position={[0, 0, -0.12]}>
        <planeGeometry args={[3.9, 3.0]} />
        <meshBasicMaterial color={COLORS.vermilion} transparent opacity={0.16} />
      </mesh>
      {/* slab */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[3.5, 2.65, 0.08]} />
        <meshStandardMaterial color="#17181b" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* screen */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[3.4, 3.4 / PLANE_ASPECT]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
      {/* logo chip, floats in front */}
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.5}>
        <group position={[-1.55, -1.45, 0.9]}>
          <mesh position={[0, 0, -0.01]}>
            <boxGeometry args={[1.45, 0.58, 0.04]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[1.35, 0.48]} />
            <meshBasicMaterial map={logoMap} transparent toneMapped={false} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

/** Abstract branded sculpture behind the screen: faceted core + two orbit rings + gems. */
function Sculpture({ light }) {
  const core = useRef();
  const wire = useRef();
  const ringA = useRef();
  const ringB = useRef();

  useFrame((_, dt) => {
    core.current.rotation.x += dt * 0.14;
    core.current.rotation.y += dt * 0.21;
    wire.current.rotation.x -= dt * 0.08;
    wire.current.rotation.y += dt * 0.11;
    ringA.current.rotation.z += dt * 0.25;
    ringB.current.rotation.x += dt * 0.18;
  });

  const gems = light
    ? [[-2.3, 1.2, -0.4, 0.2]]
    : [
        [-2.4, 1.3, -0.4, 0.2],
        [2.5, -1.0, -0.2, 0.17],
        [2.2, 1.7, -0.8, 0.14],
        [-2.0, -1.7, -0.6, 0.15],
      ];

  return (
    <group position={[0, 0, -1.5]}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshPhysicalMaterial
          color="#2b1d1b"
          metalness={0.85}
          roughness={0.22}
          flatShading
          emissive={COLORS.vermilion}
          emissiveIntensity={0.2}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color={COLORS.vermilion} wireframe transparent opacity={0.3} />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.15, 0.016, 12, 220]} />
        <meshBasicMaterial color={COLORS.amber} />
      </mesh>
      <mesh ref={ringB} rotation={[0.4, 0.9, 0]}>
        <torusGeometry args={[2.7, 0.011, 12, 220]} />
        <meshBasicMaterial color={COLORS.violet} />
      </mesh>
      {gems.map(([x, y, z, s], i) => (
        <Float key={i} speed={1.2 + i * 0.3} rotationIntensity={1.2} floatIntensity={1.1}>
          <mesh position={[x, y, z]} scale={s * 3}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={i % 2 ? COLORS.violet : COLORS.amber}
              emissive={i % 2 ? COLORS.violet : COLORS.amber}
              emissiveIntensity={0.5}
              metalness={0.6}
              roughness={0.25}
              flatShading
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/** Moves the whole composition: pointer parallax, scroll-driven camera and responsive placement. */
function Rig({ progressRef, light }) {
  const group = useRef();
  const intro = useRef(0);
  const pointer = usePointer();
  const { viewport, size } = useThree();
  const wide = size.width >= 1024;

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const p = progressRef?.current ?? 0;

    intro.current = Math.min(1, intro.current + dt * 0.7);
    const e = 1 - Math.pow(1 - intro.current, 3);

    const baseScale = wide ? Math.min(0.92, viewport.height / 6) : 0.46;
    const targetX = wide ? viewport.width * 0.235 : viewport.width * 0.24;
    const targetY = wide ? 0 : viewport.height * 0.3;

    g.scale.setScalar(baseScale * (0.65 + 0.35 * e) * (1 - p * 0.15));
    g.position.x = damp(g.position.x, targetX, 4, dt);
    g.position.y = damp(g.position.y, targetY + p * 1.4, 4, dt);
    g.position.z = damp(g.position.z, -p * 3.2, 4, dt);
    g.rotation.y = damp(g.rotation.y, -0.28 + pointer.current.x * 0.38 + p * 1.2, 3, dt);
    g.rotation.x = damp(g.rotation.x, 0.08 - pointer.current.y * 0.22 + p * 0.35, 3, dt);

    // scroll-driven camera dolly
    state.camera.position.z = damp(state.camera.position.z, 8 + p * 2.4, 3, dt);
    state.camera.position.x = damp(state.camera.position.x, pointer.current.x * 0.25, 2.5, dt);
    state.camera.position.y = damp(state.camera.position.y, pointer.current.y * 0.18, 2.5, dt);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <Suspense fallback={null}>
        <Screen />
      </Suspense>
      <Sculpture light={light} />
    </group>
  );
}

export default function HeroScene({ progressRef, onReady }) {
  const { light } = useCapabilities();
  return (
    <SceneCanvas camera={{ position: [0, 0, 8], fov: 40 }} onReady={onReady}>
      <Lights />
      <Rig progressRef={progressRef} light={light} />
      <Sparkles
        count={light ? 40 : 110}
        scale={[14, 8, 6]}
        size={light ? 3 : 2.4}
        speed={0.35}
        opacity={0.85}
        color={COLORS.amber}
      />
    </SceneCanvas>
  );
}
