import { useEffect } from "react";

/**
 * Light 3D hover for a few chosen cards only: add `data-tilt` to opt in.
 * Disabled on touch devices and for reduced motion. Max 6deg.
 */
const MAX = 6;

export function TiltEffect() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let current = null;
    const reset = (el) => {
      if (!el) return;
      el.classList.add("tilt-rest");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const onMove = (e) => {
      const el = e.target instanceof Element ? e.target.closest("[data-tilt]") : null;
      if (el !== current) {
        reset(current);
        current = el;
      }
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.classList.add("tilt-live");
      el.classList.remove("tilt-rest");
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", `${(px - 0.5) * 2 * MAX}deg`);
      el.style.setProperty("--rx", `${(0.5 - py) * 2 * MAX}deg`);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
