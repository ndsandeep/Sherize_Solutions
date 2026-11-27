import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * React Bits style TrueFocus component.
 * Cycles focus across words with animated corner brackets and blur-to-sharp transitions.
 */
export function TrueFocus({
  sentence = "OUR PROCESS",
  manualMode = false,
  blurAmount = 4,
  borderColor = "#D6A35B",
  glowColor = "rgba(214, 163, 91, 0.55)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.4,
  className = "",
}) {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (manualMode) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    const updateRect = () => {
      if (currentIndex === null || currentIndex === -1) return;
      const activeEl = wordRefs.current[currentIndex];
      const containerEl = containerRef.current;
      if (!activeEl || !containerEl) return;

      const parentRect = containerEl.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      setFocusRect({
        x: activeRect.left - parentRect.left,
        y: activeRect.top - parentRect.top,
        width: activeRect.width,
        height: activeRect.height,
      });
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index) => {
    if (manualMode) {
      setLastActiveIndex(index);
    }
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`services-truefocus-container ${className}`}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={`${word}-${index}`}
            ref={(el) => (wordRefs.current[index] = el)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={`services-truefocus-word ${isActive ? "is-active" : ""}`}
            style={{
              filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease, color ${animationDuration}s ease`,
            }}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="services-truefocus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          "--tf-border": borderColor,
          "--tf-glow": glowColor,
        }}
      >
        <span className="services-truefocus-corner top-left" />
        <span className="services-truefocus-corner top-right" />
        <span className="services-truefocus-corner bottom-left" />
        <span className="services-truefocus-corner bottom-right" />
      </motion.div>
    </div>
  );
}
