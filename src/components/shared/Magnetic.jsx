import { motion, useMotionValue, useSpring } from "framer-motion";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/** Wraps a button/link so it leans toward the cursor. No-op on touch and reduced motion. */
export function Magnetic({ children, strength = 0.28, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });
  const enabled = hasFinePointer() && !prefersReducedMotion();

  if (!enabled) return <span className={`inline-block ${className}`}>{children}</span>;

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
