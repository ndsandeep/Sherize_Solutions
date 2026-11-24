import { useEffect, useState } from "react";

function detectWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

function detectLowPower() {
  if (typeof navigator === "undefined") return false;
  const cores = navigator.hardwareConcurrency || 8;
  const mem = navigator.deviceMemory || 8;
  return cores <= 4 || mem <= 4;
}

const webglSupported = detectWebGL();
const lowPower = detectLowPower();

/**
 * One hook for every "should I render the heavy thing?" decision.
 * - webgl:   the device can create a WebGL context
 * - reduced: user prefers reduced motion (3D scenes are skipped entirely)
 * - mobile:  narrow viewport (fewer particles / lower DPR)
 * - lowPower: few CPU cores or little memory (treated like mobile)
 */
export function useCapabilities() {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const rq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = (e) => setMobile(e.matches);
    const onRq = (e) => setReduced(e.matches);
    mq.addEventListener("change", onMq);
    rq.addEventListener("change", onRq);
    return () => {
      mq.removeEventListener("change", onMq);
      rq.removeEventListener("change", onRq);
    };
  }, []);

  return { webgl: webglSupported, reduced, mobile, lowPower, light: mobile || lowPower };
}
