import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Perspective tilt card with a soft light glare. It also publishes the pointer offset as
 * CSS variables (--mx / --my, in px) so an inner image can drift against the cursor
 * (see the .mf-img utility). Falls back to a plain wrapper on touch / reduced motion.
 */
export function Tilt3D({ children, className = "", max = 9, glare = true, lift = 1.015 }) {
  const ref = useRef(null);
  const enabled = hasFinePointer() && !prefersReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const glareOpacity = useMotionValue(0);
  const spring = { stiffness: 170, damping: 20, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const gx = useTransform(sx, [0, 1], [0, 100]);
  const gy = useTransform(sy, [0, 1], [0, 100]);
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.11), transparent 60%)`;

  const onMove = (e) => {
    if (!enabled || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    px.set(x);
    py.set(y);
    glareOpacity.set(1);
    ref.current.style.setProperty("--mx", ((x - 0.5) * 36).toFixed(1));
    ref.current.style.setProperty("--my", ((y - 0.5) * 36).toFixed(1));
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
    if (ref.current) {
      ref.current.style.setProperty("--mx", "0");
      ref.current.style.setProperty("--my", "0");
    }
  };

  if (!enabled) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      whileHover={{ scale: lift }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
          style={{ background: glareBg, opacity: glareOpacity }}
        />
      )}
    </motion.div>
  );
}
