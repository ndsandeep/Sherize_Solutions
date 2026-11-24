import { motion } from "framer-motion";

/**
 * Word-by-word blur-in headline (React Bits "BlurText" style) using Framer Motion.
 * Plays once. Words listed in `accent` get the gradient treatment.
 */
export function BlurText({ text, className = "", accent = [], delay = 0.05, as = "span" }) {
  const Comp = motion[as] || motion.span;
  const words = text.split(" ");
  return (
    <Comp
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: delay, delayChildren: 0.1 } } }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`inline-block mr-[0.28em] ${accent.includes(i) ? "text-gradient" : ""}`}
          variants={{
            hidden: { opacity: 0, filter: "blur(8px)", y: 14 },
            visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {w}
        </motion.span>
      ))}
    </Comp>
  );
}
