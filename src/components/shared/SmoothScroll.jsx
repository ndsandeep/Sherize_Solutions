import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, lenisRef, hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Inertial smooth scrolling (Lenis) wired into GSAP's ticker so ScrollTrigger stays in sync.
 * Only on desktop-class pointers; touch devices keep native momentum scrolling.
 */
export function SmoothScroll({ disabled = false }) {
  useEffect(() => {
    if (disabled || !hasFinePointer() || prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [disabled]);

  return null;
}
