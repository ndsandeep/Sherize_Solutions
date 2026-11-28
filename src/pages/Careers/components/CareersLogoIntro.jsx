import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sherizeIcon from "../assets/sherize-icon.png";

const LEAF_PETALS = [
  { angle: 0, startX: 0, startY: -220, color: "#D6A35B" },
  { angle: 45, startX: 155, startY: -155, color: "#1B8898" },
  { angle: 90, startX: 220, startY: 0, color: "#FFB703" },
  { angle: 135, startX: 155, startY: 155, color: "#D6A35B" },
  { angle: 180, startX: 0, startY: 220, color: "#1B8898" },
  { angle: 225, startX: -155, startY: 155, color: "#FFB703" },
  { angle: 270, startX: -220, startY: 0, color: "#D6A35B" },
  { angle: 315, startX: -155, startY: -155, color: "#1B8898" },
];

/**
 * Opening logo animation for the Careers page:
 * All leaves converge smoothly to the center to reveal the official Sherize logo.
 */
export function CareersLogoIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
          className="careers-intro-overlay"
          aria-hidden="true"
        >
          <div className="careers-intro-stage">
            {/* Converging Botanical Leaves */}
            {LEAF_PETALS.map((leaf, idx) => (
              <motion.svg
                key={idx}
                viewBox="0 0 40 64"
                className="careers-intro-leaf"
                initial={{
                  x: leaf.startX,
                  y: leaf.startY,
                  scale: 0.5,
                  opacity: 0,
                  rotate: leaf.angle - 35,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  scale: [0.65, 1.1, 0.35],
                  opacity: [0, 1, 0],
                  rotate: leaf.angle,
                }}
                transition={{
                  duration: 1.2,
                  delay: idx * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <path
                  d="M20 2 C32 18, 36 38, 20 62 C4 38, 8 18, 20 2 Z"
                  fill={leaf.color}
                />
              </motion.svg>
            ))}

            {/* Official Sherize Brand Emblem (Larger & Clearer) */}
            <motion.div
              initial={{ scale: 0.55, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="careers-intro-logo-wrap"
            >
              <div className="careers-intro-circle">
                <img
                  src={sherizeIcon}
                  alt="Sherize Official Logo"
                  className="careers-intro-logo-img"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
