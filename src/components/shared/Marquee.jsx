import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

/**
 * Kinetic type row (inspired by the reference reel). Loops forever, speeds up with the
 * page's scroll velocity, and pauses while off-screen. Alternate words are outlined.
 * direction: 1 moves left, -1 moves right.
 */
export function Marquee({ items, direction = 1, duration = 60, className = "" }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        track,
        { xPercent: direction > 0 ? 0 : -50 },
        { xPercent: direction > 0 ? -50 : 0, duration, ease: "none", repeat: -1 },
      );

      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 220, 5);
          gsap.to(tween, {
            timeScale: boost,
            duration: 0.25,
            overwrite: true,
            onComplete: () => gsap.to(tween, { timeScale: 1, duration: 1.2 }),
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [direction, duration]);

  const row = (copy) => (
    <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 ? "true" : undefined}>
      {items.map((item, i) => {
        const text = typeof item === "string" ? item : item?.name || "";
        return (
          <span key={`${copy}-${i}`} className="flex items-center">
            <span className={`marquee-word ${i % 2 ? "marquee-outline" : ""}`}>{text}</span>
            <span className="marquee-dot" aria-hidden="true" />
          </span>
        );
      })}
    </div>
  );

  return (
    <div ref={rootRef} className={`marquee overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[0, 1].map(row)}
      </div>
    </div>
  );
}
