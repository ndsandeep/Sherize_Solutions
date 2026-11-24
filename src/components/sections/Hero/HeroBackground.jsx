import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import bg1 from "@/assets/hero/background-image1.avif";
import bg2 from "@/assets/hero/background-image2.avif";
import bg3 from "@/assets/hero/background-image3.avif";

const BACKGROUNDS = [bg1, bg2, bg3, bg1];

const INTERVAL_MS = 7500; // 7.5s per scene (30s loop for 4 scenes)

export function HeroBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0D1B28]">
      {/* Slow crossfade only — no zoom, no sweep */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.28 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img src={BACKGROUNDS[index]} alt="Cinematic Background" className="w-full h-full object-cover grayscale" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0D1B28 18%, rgba(13,27,40,0.55) 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(to top, #0D1B28, transparent)" }} />
    </div>
  );
}
