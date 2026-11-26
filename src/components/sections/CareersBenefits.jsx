import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import freedomImg from "@/assets/images/careers-benefits/freedom.jpg";
import earningsImg from "@/assets/images/careers-benefits/earnings.jpg";
import growthImg from "@/assets/images/careers-benefits/growth.jpg";
import balanceImg from "@/assets/images/careers-benefits/balance.jpg";
import { gsap, ScrollTrigger, lenisRef, prefersReducedMotion } from "@/lib/motion";
import { dataService } from "@/services/dataService";

const DEFAULT_EXPERIENCES = [
  {
    key: "freedom",
    tabLabel: "Freedom",
    title: "Work on your own terms.",
    desc: "No commutes, complete freedom.",
    image: freedomImg,
    objectPosition: "52% 14%",
    alt: "Young Indian professional woman working remotely on a laptop from a bright modern home office",
  },
  {
    key: "earnings",
    tabLabel: "Earnings",
    title: "Your talent deserves more.",
    desc: "Earn what you deserve, globally.",
    image: earningsImg,
    objectPosition: "34% 8%",
    alt: "Confident young Indian businesswoman in a premium corporate workspace",
  },
  {
    key: "growth",
    tabLabel: "Growth",
    title: "Learn today. Lead tomorrow.",
    desc: "Learn from the best in the industry.",
    image: growthImg,
    objectPosition: "48% 4%",
    alt: "Young female professionals collaborating and learning together in a modern technology office",
  },
  {
    key: "balance",
    tabLabel: "Balance",
    title: "Build a career that fits your life.",
    desc: "Support for a balanced lifestyle.",
    image: balanceImg,
    objectPosition: "42% 8%",
    alt: "Young professional woman enjoying a relaxed, balanced work-from-home environment with coffee and laptop",
  },
];

function resolveExperience(perk, index) {
  const fallback = DEFAULT_EXPERIENCES[index % DEFAULT_EXPERIENCES.length];
  return {
    id: perk?.id || fallback.key,
    tabLabel: fallback.tabLabel,
    title: perk?.title || fallback.title,
    desc: perk?.desc || fallback.desc,
    image: fallback.image,
    objectPosition: fallback.objectPosition,
    alt: fallback.alt,
  };
}

export function CareersBenefits() {
  const [perks, setPerks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [decodedMap, setDecodedMap] = useState({});
  const [sectionInView, setSectionInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => prefersReducedMotion());
  const [isDesktopScroll, setIsDesktopScroll] = useState(
    () =>
      typeof window !== "undefined" &&
      !prefersReducedMotion() &&
      window.innerWidth >= 1024,
  );

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const manualOverrideUntilRef = useRef(0);

  // Dynamic data integration
  useEffect(() => {
    const loadData = () => {
      const data = dataService.getCareerPerks();
      setPerks(Array.isArray(data) && data.length > 0 ? data : DEFAULT_EXPERIENCES);
    };
    loadData();

    window.addEventListener("sherize_data_updated", loadData);
    return () => window.removeEventListener("sherize_data_updated", loadData);
  }, []);

  // Responsive & reduced-motion capabilities
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const rmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const rm = rmQuery.matches;
      setReducedMotion(rm);
      setIsDesktopScroll(!rm && window.innerWidth >= 1024);
    };

    update();
    rmQuery.addEventListener("change", update);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      rmQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const experiences = useMemo(
    () =>
      DEFAULT_EXPERIENCES.map((_, idx) => resolveExperience(perks[idx], idx)),
    [perks],
  );

  // Preload and decode all four images to avoid blank frames or flicker
  useEffect(() => {
    let cancelled = false;
    experiences.forEach((exp) => {
      const img = new Image();
      img.src = exp.image;
      const markReady = () => {
        if (!cancelled) {
          setDecodedMap((prev) => (prev[exp.id] ? prev : { ...prev, [exp.id]: true }));
        }
      };
      if (typeof img.decode === "function") {
        img.decode().then(markReady).catch(markReady);
      } else {
        img.onload = markReady;
      }
    });
    return () => {
      cancelled = true;
    };
  }, [experiences]);

  // Entrance visibility for image & heading reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) {
      setSectionInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Scroll Reveal on heading words (React Bits Scroll Reveal inspired)
  useLayoutEffect(() => {
    const el = headingRef.current;
    if (!el || reducedMotion) return undefined;

    const words = el.querySelectorAll(".cb-word");
    if (!words.length) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.18, y: 10, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.68,
          stagger: 0.04,
          ease: "power3.out",
          clearProps: "filter,transform",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Temporarily pin section on desktop (>= 1024px) while scrolling smoothly through the 4 experiences
  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || experiences.length === 0) {
      scrollTriggerRef.current = null;
      return undefined;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const st = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top 72px",
        end: "+=180%",
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (Date.now() < manualOverrideUntilRef.current) return;
          const p = Math.max(0, Math.min(1, self.progress));
          setScrollProgress(p);
          const nextIdx = Math.min(
            experiences.length - 1,
            Math.floor(p * experiences.length),
          );
          setActiveIndex((prev) => (prev === nextIdx ? prev : nextIdx));
        },
      });
      scrollTriggerRef.current = st;

      return () => {
        scrollTriggerRef.current = null;
      };
    });

    return () => {
      scrollTriggerRef.current = null;
      mm.revert();
    };
  }, [experiences.length]);

  const handleSelectExperience = useCallback(
    (index) => {
      setActiveIndex(index);
      const count = experiences.length;
      const targetProgress = (index + 0.5) / count;
      setScrollProgress(targetProgress);

      const st = scrollTriggerRef.current;
      if (isDesktopScroll && st) {
        const targetY = st.start + (st.end - st.start) * ((index + 0.22) / count);
        manualOverrideUntilRef.current = Date.now() + 750;
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetY, { duration: 0.65 });
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    },
    [experiences.length, isDesktopScroll],
  );

  const handleIndicatorKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleSelectExperience((activeIndex + 1) % experiences.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleSelectExperience((activeIndex - 1 + experiences.length) % experiences.length);
      } else if (e.key === "Home") {
        e.preventDefault();
        handleSelectExperience(0);
      } else if (e.key === "End") {
        e.preventDefault();
        handleSelectExperience(experiences.length - 1);
      }
    },
    [activeIndex, experiences.length, handleSelectExperience],
  );

  const safeIndex = activeIndex % experiences.length;
  const activeExp = experiences[safeIndex];

  // Keep previous image visible until the target image has finished decoding
  useEffect(() => {
    const target = experiences[safeIndex];
    if (!target) return;
    if (safeIndex === 0 || decodedMap[target.id]) {
      setDisplayedIndex(safeIndex);
    }
  }, [decodedMap, experiences, safeIndex]);

  const visualIndex = displayedIndex % experiences.length;

  return (
    <section
      ref={sectionRef}
      aria-label="Why join Sherize"
      className="relative py-14 sm:py-16 lg:py-0 lg:h-[calc(100svh-72px)] lg:min-h-[560px] lg:flex lg:items-center bg-gradient-to-b from-[#167D8D] to-[#126875] text-white overflow-x-clip"
    >
      {/* Subtle ambient glow (constrained within viewport) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-full max-w-[640px] rounded-full bg-[#101D2B]/25 blur-[110px]"
      />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 lg:py-4">
        {/* Compact Stationary Heading (Single-line on desktop) */}
        <div className="text-center mb-5 sm:mb-6">
          <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#D6A35B] font-semibold mb-2.5">
            <span className="h-px w-8 sm:w-10 bg-[#D6A35B]/60" />
            WHY JOIN US
            <span className="h-px w-8 sm:w-10 bg-[#D6A35B]/60" />
          </span>

          <h2
            ref={headingRef}
            aria-label="More than just a job."
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-semibold tracking-tight text-white leading-[1.12] lg:whitespace-nowrap"
          >
            <span aria-hidden="true">
              <span className="cb-word inline-block">More</span>{" "}
              <span className="cb-word inline-block">than</span>{" "}
              <span className="cb-word inline-block">just</span>{" "}
              <span className="cb-word inline-block text-[#D6A35B] underline decoration-[#D6A35B]/40">
                a
              </span>{" "}
              <span className="cb-word inline-block text-[#D6A35B] underline decoration-[#D6A35B]/40">
                job
              </span>
              <span className="cb-word inline-block">.</span>
            </span>
          </h2>
        </div>

        {/* Full-Width Cinematic Image Area (Responsive 300-340px height on standard desktop) */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.985 }}
          animate={
            sectionInView || reducedMotion
              ? { opacity: 1, y: 0, scale: 1 }
              : undefined
          }
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
          }
          className="relative w-full max-w-[1060px] mx-auto aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[clamp(250px,41vh,340px)] rounded-[1.25rem] sm:rounded-[1.75rem] overflow-hidden bg-[#101D2B] border border-white/15 shadow-[0_24px_60px_-18px_rgba(16,29,43,0.65)]"
        >
          {experiences.map((exp, idx) => {
            const isActive = idx === visualIndex;

            return (
              <motion.div
                key={exp.id}
                aria-hidden={!isActive}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: reducedMotion ? 1 : isActive ? 1 : 1.03,
                }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : {
                        opacity: { duration: 0.5, ease: "easeInOut" },
                        scale: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
                      }
                }
                style={{ transformOrigin: exp.objectPosition }}
                className={`absolute inset-0 w-full h-full ${
                  isActive ? "z-10" : "z-0 pointer-events-none"
                }`}
              >
                <img
                  src={exp.image}
                  alt={exp.alt}
                  loading="eager"
                  decoding="async"
                  style={{ objectPosition: exp.objectPosition }}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}

          {/* Subtle cinematic bottom & top vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#101D2B]/65 via-transparent to-[#101D2B]/15"
          />

          {/* Subtle floating index & label tag inside top-left of cinematic frame */}
          <div className="pointer-events-none absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-30 inline-flex items-center gap-2 rounded-full bg-[#101D2B]/65 backdrop-blur-md border border-white/15 px-3 py-1">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#D6A35B]">
              {String(safeIndex + 1).padStart(2, "0")}
            </span>
            <span className="h-3 w-px bg-white/25" aria-hidden="true" />
            <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-white/95">
              {activeExp.tabLabel}
            </span>
          </div>
        </motion.div>

        {/* Animated Title & Description Underneath Image */}
        <div className="mt-4 sm:mt-5 max-w-2xl mx-auto text-center min-h-[68px] sm:min-h-[74px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp.id}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                reducedMotion
                  ? { opacity: 0, transition: { duration: 0 } }
                  : { opacity: 0, y: -8, transition: { duration: 0.18 } }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.34, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-display font-semibold tracking-tight text-white leading-tight">
                {activeExp.title}
              </h3>
              <p className="mt-1.5 text-sm sm:text-base text-white/85 font-light leading-relaxed">
                {activeExp.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Four Horizontal Progress Indicators */}
        <div
          role="tablist"
          aria-label="Career benefit experiences"
          onKeyDown={handleIndicatorKeyDown}
          className="mt-4 sm:mt-5 max-w-3xl mx-auto grid grid-cols-4 gap-2 sm:gap-6"
        >
          {experiences.map((exp, idx) => {
            const isActive = idx === safeIndex;
            const count = experiences.length;
            const segStart = idx / count;
            const segSize = 1 / count;
            const fillRatio = isDesktopScroll
              ? isActive
                ? Math.max(0.22, Math.min(1, (scrollProgress - segStart) / segSize))
                : idx < safeIndex
                  ? 1
                  : 0
              : isActive
                ? 1
                : 0;

            return (
              <button
                key={exp.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectExperience(idx)}
                className="group flex flex-col items-start text-left py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A35B] rounded-sm"
              >
                {/* Animated Progress Line */}
                <div className="relative h-[2px] w-full bg-white/25 overflow-hidden rounded-full">
                  <motion.div
                    className="absolute inset-y-0 left-0 w-full origin-left bg-[#D6A35B]"
                    initial={false}
                    animate={{ scaleX: fillRatio }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                    }
                  />
                </div>

                {/* Label */}
                <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2 w-full">
                  <span
                    className={`hidden sm:inline text-[11px] font-semibold tracking-[0.18em] transition-colors duration-300 ${
                      isActive ? "text-[#D6A35B]" : "text-white/45 group-hover:text-white/75"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className={`text-[11px] sm:text-sm font-medium tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-[#D6A35B] font-semibold"
                        : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    {exp.tabLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
