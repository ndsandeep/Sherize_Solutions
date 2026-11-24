import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Scroll-triggered entrance with real depth: the element rises out of the page while
 * tilting up from a slight rotateX. Plays once. Use in place of <Reveal> on cards.
 */
export function DepthReveal({ children, className = "", delay = 0, y = 64, rotate = 9 }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y, rotateX: rotate, scale: 0.95, transformPerspective: 900, transformOrigin: "50% 100%" },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1,
          delay,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, rotate]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
