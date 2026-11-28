import { motion } from "framer-motion";

/**
 * React Bits style StrokeText component.
 * Renders an outlined stroke heading that animates in and fills smoothly on hover.
 */
export function StrokeText({
  text = "Explore Services",
  className = "",
  strokeColor = "#101D2B",
  fillColor = "#D6A35B",
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`services-stroke-heading ${className}`}
      style={{
        "--stroke-color": strokeColor,
        "--fill-color": fillColor,
      }}
      data-text={text}
    >
      <span className="services-stroke-base">{text}</span>
      <span className="services-stroke-fill" aria-hidden="true">
        {text}
      </span>
    </motion.h2>
  );
}
