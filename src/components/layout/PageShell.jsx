import { Footer } from "./Footer";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { Tilt3D } from "@/components/shared/Tilt3D";
import { motion } from "framer-motion";

export function PageShell({ children }) {
  return (
    <div className="cinematic-page relative min-h-screen">
      {/* Content rises in just after the route curtain starts to lift (see PageTransition). */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-screen flex flex-col"
      >
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </motion.div>
    </div>
  );
}

/** PageHero header without distracting floating 3D objects */
export function PageHero({ eyebrow, title, highlight, subtitle }) {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden bg-[#0D1B28] border-b border-[rgba(22,125,141,0.2)]">
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 text-center max-w-4xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-[#D6A35B] uppercase tracking-[0.15em] font-medium border border-[#D6A35B]/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D6A35B] animate-pulse-glow" />
            {eyebrow}
          </span>
        </Reveal>
        <KineticHeading
          as="h1"
          delay={0.15}
          className="mt-6 font-display font-semibold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tighter text-white"
        >
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </KineticHeading>
        <Reveal delay={240}>
          <p className="mt-6 text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function CTASection({ eyebrow, title, highlight, text, actions }) {
  return (
    <section className="relative py-28 bg-[#FAF9F6]">
      <div className="w-full max-w-[1280px] mx-auto px-6">
        <Reveal>
          <Tilt3D max={3} lift={1.005} className="rounded-[1.5rem]">
            <div className="relative rounded-[1.5rem] p-10 sm:p-16 text-center overflow-hidden bg-gradient-to-br from-[#167D8D] to-[#101D2B] text-white shadow-xl">
              {/* Backside 3D animation removed cleanly for all pages */}
              {eyebrow && (
                <span className="relative z-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#D6A35B] font-semibold">
                  <span className="h-px w-8 bg-white/60" /> {eyebrow}
                </span>
              )}
              <KineticHeading
                as="h2"
                className="relative z-10 mt-4 text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tighter text-white"
              >
                {title} {highlight && <span className="text-[#D6A35B] font-bold">{highlight}</span>}
              </KineticHeading>
              <p className="relative z-10 mt-5 text-white/85 max-w-2xl mx-auto">{text}</p>
              <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">{actions}</div>
            </div>
          </Tilt3D>
        </Reveal>
      </div>
    </section>
  );
}
