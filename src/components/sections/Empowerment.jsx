import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Clock, GraduationCap, TrendingUp, HeartHandshake, Sparkles } from "lucide-react";
import empowerment from "@/assets/images/empowerment.jpg";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { Tilt3D } from "@/components/shared/Tilt3D";
import { dataService } from "@/services/dataService";

const iconsMap = [Home, Clock, GraduationCap, TrendingUp, HeartHandshake, Sparkles];

export function Empowerment() {
  const [activeFeature, setActiveFeature] = useState(null);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const loadData = () => {
      const data = dataService.getEmpowerment();
      setFeatures(data);
    };
    loadData();

    window.addEventListener("sherize_data_updated", loadData);
    return () => window.removeEventListener("sherize_data_updated", loadData);
  }, []);

  if (!features || features.length === 0) return null;

  return (
    <section id="opportunities" className="relative py-20 sm:py-24 overflow-hidden bg-[#FAF9F6] border-y border-[rgba(16,29,43,0.06)]">
      {/* Background ambient glow */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none"
      />

      <div className="w-full max-w-[1280px] mx-auto px-6 max-w-7xl relative z-10">
        {/* Centered Heading */}
        <Reveal className="text-center mb-16">
          <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-[#D6A35B] font-semibold mb-6">
            <span className="h-px w-12 bg-[#D6A35B]/50" />
            Empowerment
            <span className="h-px w-12 bg-[#D6A35B]/50" />
          </span>
          <KineticHeading
            as="h2"
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tighter leading-[1.05] text-black"
          >
            Empowering <span className="text-gradient">Women</span> Through Sherize
          </KineticHeading>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 relative items-start">
          {/* Left Column: Interactive List (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative border-l border-[rgba(16,29,43,0.15)] pl-6 sm:pl-12 py-4 space-y-2" onMouseLeave={() => setActiveFeature(null)}>
              {features.map((f, i) => {
                const isActive = activeFeature === i;
                const Icon = iconsMap[i % iconsMap.length];

                return (
                  <div
                    key={f.title}
                    className={`relative cursor-pointer group py-6 sm:py-8 border-b border-[rgba(16,29,43,0.08)] last:border-0 transition-all duration-500`}
                    onMouseEnter={() => setActiveFeature(i)}
                    onClick={() => setActiveFeature(i)}
                  >
                    <div className="flex justify-between items-center pr-4 sm:pr-8">
                      <h3
                        className={`text-xl sm:text-2xl lg:text-3xl font-display font-semibold tracking-tight transition-all duration-500 ${isActive ? "text-gradient translate-x-2" : "text-[#4F789E] group-hover:text-black"}`}
                      >
                        {f.title}
                      </h3>
                      <Icon
                        className={`h-6 w-6 sm:h-8 sm:w-8 transition-all duration-500 ${isActive ? "text-primary scale-110 drop-shadow-[0_0_15px_rgba(22,125,141,0.4)]" : "text-[rgba(16,29,43,0.2)]"}`}
                      />
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 sm:pt-6 pb-2 text-base sm:text-lg text-[#101D2B] leading-relaxed max-w-lg font-light pl-2 line-clamp-3">
                            {f.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Cinematic Image (5 cols) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32 h-[80vh] w-full">
            <Reveal delay={200} className="w-full h-full">
              <Tilt3D max={5} lift={1.01} className="h-full w-full rounded-[1.5rem]">
              <motion.div
                className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-[rgba(16,29,43,0.12)] shadow-xl"
              >
                <img
                  src={empowerment}
                  alt="Empowerment at Sherize"
                  className="mf-img w-full h-full object-cover"
                />

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B]/80 via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#101D2B]/30 via-transparent to-transparent" />

                <div className="absolute bottom-10 left-10 right-10">
                  <div className="bg-white/95 rounded-2xl p-6 border border-[rgba(16,29,43,0.08)] shadow-lg backdrop-blur-xl flex flex-col gap-2">
                    <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                      Join The Movement
                    </div>
                    <div className="text-xl font-display text-foreground font-semibold">
                      Women-led, world-class community.
                    </div>
                  </div>
                </div>
              </motion.div>
              </Tilt3D>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
