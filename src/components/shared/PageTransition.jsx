import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Cinematic route change: a dark curtain with a vermilion edge retracts upward every time
 * the pathname changes. The curtain matches the site background, so there is never a
 * white flash, and it is skipped on the first load and for reduced-motion users.
 */
export function PageTransition() {
  const { pathname } = useLocation();
  const first = useRef(true);
  const reduce =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    first.current = false;
  }, []);

  if (reduce) return null;

  return (
    <motion.div
      key={pathname}
      aria-hidden="true"
      className="page-curtain"
      initial={first.current ? false : { scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
      style={{ transformOrigin: "top" }}
    />
  );
}
