import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useCapabilities } from "@/hooks/useCapabilities";

/**
 * Shared <Canvas> wrapper for every Sherize 3D scene.
 *  - caps device pixel ratio (lower on mobile / low-power devices)
 *  - stops rendering while off-screen or while the tab is hidden
 *  - fades in once the WebGL context exists (the CSS fallback shows until then)
 *  - ignores pointer events so page links and forms are never blocked
 */
export default function SceneCanvas({
  children,
  camera = { position: [0, 0, 8], fov: 40 },
  onReady,
}) {
  const wrapRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const { light } = useCapabilities();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
      rootMargin: "80px",
    });
    io.observe(el);
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 transition-opacity duration-1000"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <Canvas
        frameloop={inView && tabVisible ? "always" : "never"}
        dpr={[1, light ? 1.25 : 1.75]}
        camera={camera}
        gl={{ antialias: !light, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener("webglcontextlost", (e) => e.preventDefault());
          setReady(true);
          onReady?.();
        }}
      >
        {children}
      </Canvas>
    </div>
  );
}
