import { motion } from "framer-motion";

/**
 * React Bits style SplitText component.
 * Splits text into words and individual characters, animating each character
 * smoothly on mount so hero headlines always animate reliably.
 */
export function SplitText({
  text = "",
  className = "",
  delay = 0.028,
  duration = 0.55,
  ease = [0.22, 1, 0.36, 1],
  as = "h1",
  accentWords = [],
  accentClass = "text-[#FAF9F6]",
  initialDelay = 0.1,
}) {
  const words = text.split(" ");
  const MotionTag = motion[as] || motion.div;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
        delayChildren: initialDelay,
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 26,
      rotateX: -35,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration,
        ease,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, wordIndex) => {
        const isAccent = accentWords.some(
          (acc) => acc.toLowerCase() === word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
        );

        return (
          <span
            key={`${word}-${wordIndex}`}
            className={`inline-block whitespace-nowrap mr-[0.26em] overflow-hidden align-bottom ${
              isAccent ? accentClass : ""
            }`}
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                variants={charVariants}
                className="inline-block will-change-transform"
                aria-hidden="true"
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </MotionTag>
  );
}
