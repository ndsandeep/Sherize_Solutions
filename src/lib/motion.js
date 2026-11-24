import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single place where GSAP is configured, so every component shares one
 * registered ScrollTrigger and one smooth-scroll (Lenis) reference.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Set by <SmoothScroll /> while Lenis is active; null on touch devices / reduced motion. */
export const lenisRef = { current: null };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export { gsap, ScrollTrigger };
