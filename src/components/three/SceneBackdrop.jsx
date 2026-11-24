import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { useCapabilities } from "@/hooks/useCapabilities";

// Heavy 3D code (three + react-three-fiber + drei) is only fetched when a scene is near the viewport.
const HeroScene = lazy(() => import("./scenes/HeroScene"));
const InfinityScene = lazy(() => import("./scenes/InfinityScene"));
const AmbientScene = lazy(() => import("./scenes/AmbientScene"));

const SCENES = { hero: HeroScene, infinity: InfinityScene, ambient: AmbientScene };

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    console.warn("[Sherize] 3D scene disabled:", error?.message || error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Drop-in cinematic background. Always renders a lightweight CSS glow (also the
 * no-WebGL / reduced-motion fallback) and mounts the WebGL scene on top of it
 * only when the device supports it and the section is close to the viewport.
 *
 * scene:   "hero" | "infinity" | "ambient"
 * variant: preset name for the scene (see AmbientScene presets)
 */
export function SceneBackdrop({ scene = "ambient", variant = "services", progressRef, subtle = false, desktopOnly = false, onReady, className = "" }) {
  const { webgl, reduced, light } = useCapabilities();
  const wrapRef = useRef(null);
  const [near, setNear] = useState(false);
  const allow3D = webgl && !reduced && !(desktopOnly && light);

  useEffect(() => {
    if (!allow3D) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [allow3D]);

  const Scene = SCENES[scene] || AmbientScene;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}
    >
      <div className="scene-fallback" data-variant={variant} />
      {allow3D && near && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <Scene variant={variant} progressRef={progressRef} subtle={subtle} onReady={onReady} />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
