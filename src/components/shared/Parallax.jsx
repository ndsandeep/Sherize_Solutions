import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Scroll-linked depth for hero images. The inner layer is 120% tall and drifts
 * `amount`% while the section scrolls past. Use in place of an absolute background div.
 */
export function Parallax({ children, className = "", amount = 6 }) {
  const rootRef = useRef(null);
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={rootRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="absolute inset-x-0 -inset-y-[10%]">
        {children}
      </div>
    </div>
  );
}
