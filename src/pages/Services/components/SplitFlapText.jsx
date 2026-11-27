import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FLAP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * React Bits style SplitFlapText component.
 * Mechanically flips/cycles characters before locking onto the final letter.
 */
export function SplitFlapText({
  text = "",
  className = "",
  delay = 35,
  initialDelay = 400,
  flipDuration = 420,
}) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setRevealedCount(0);
    let intervalId;
    let scrambleId;

    const startTimeout = setTimeout(() => {
      scrambleId = setInterval(() => {
        setTick((t) => t + 1);
      }, 45);

      intervalId = setInterval(() => {
        setRevealedCount((prev) => {
          if (prev >= text.length) {
            clearInterval(intervalId);
            clearInterval(scrambleId);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    }, initialDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
      if (scrambleId) clearInterval(scrambleId);
    };
  }, [text, delay, initialDelay]);

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((char, index) => {
        if (char === " ") {
          return <span key={index}> </span>;
        }

        const isRevealed = index < revealedCount;
        const isFlipping = index >= revealedCount && index < revealedCount + 4;

        let displayChar = char;
        if (!isRevealed && isFlipping) {
          displayChar = FLAP_CHARS[(index + tick) % FLAP_CHARS.length];
        } else if (!isRevealed) {
          displayChar = " ";
        }

        return (
          <motion.span
            key={index}
            aria-hidden="true"
            initial={false}
            animate={
              isRevealed
                ? { rotateX: [75, 0], opacity: 1 }
                : isFlipping
                  ? { rotateX: [0, -60, 0], opacity: 0.75 }
                  : { opacity: 0 }
            }
            transition={{ duration: flipDuration / 1000, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block will-change-transform"
            style={{ transformOrigin: "50% 50%" }}
          >
            {displayChar}
          </motion.span>
        );
      })}
    </span>
  );
}
