import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/** Thin vermilion reading-progress line at the very top of the viewport. */
export function ScrollProgress() {
  const bar = useRef(null);

  useEffect(() => {
    if (!bar.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(bar.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return <div ref={bar} aria-hidden="true" className="scroll-progress" />;
}
