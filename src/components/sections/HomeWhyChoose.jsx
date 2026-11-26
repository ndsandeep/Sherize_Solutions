import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  ArrowUpRight,
  Cpu,
  Headphones,
  Minimize2,
  Rocket,
  UserCheck,
  Wallet,
  Workflow,
} from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { dataService } from "@/services/dataService";

const iconsMap = [Wallet, UserCheck, Rocket, Cpu, Headphones, Workflow];

const BENTO_PARTICLES = [
  { top: "18%", left: "82%", size: 4, delay: "0s", dur: "4.8s" },
  { top: "74%", left: "88%", size: 3, delay: "1.1s", dur: "5.4s" },
  { top: "28%", left: "66%", size: 2.5, delay: "0.6s", dur: "4.2s" },
  { top: "82%", left: "24%", size: 3.5, delay: "1.7s", dur: "5.8s" },
  { top: "48%", left: "92%", size: 3, delay: "2.2s", dur: "4.6s" },
];

function getGridSpanClass(index, expandedIndex) {
  if (expandedIndex === null) {
    return "md:col-span-6";
  }
  if (expandedIndex === index) {
    return "md:col-span-8";
  }
  // Keep row partner smoothly adjusted so each 2-card row always totals 12 columns
  const expandedRow = Math.floor(expandedIndex / 2);
  const currentRow = Math.floor(index / 2);
  if (expandedRow === currentRow) {
    return "md:col-span-4";
  }
  return "md:col-span-6";
}

function MagicBentoExpandableCard({
  item,
  index,
  Icon,
  isExpanded,
  onToggle,
  spanClass,
  desktopEffects,
  reducedMotion,
  registerCard,
}) {
  const cardRef = useRef(null);
  const particleRefs = useRef([]);

  useEffect(() => {
    const el = cardRef.current;
    registerCard(index, el);
    return () => registerCard(index, null);
  }, [index, registerCard]);

  // Reset any active tilt transform cleanly when expansion state changes or desktopEffects disables
  useEffect(() => {
    if (!cardRef.current) return;
    if (!desktopEffects) {
      gsap.set(cardRef.current, { clearProps: "transform" });
    }
  }, [desktopEffects, isExpanded]);

  const handlePointerMove = useCallback(
    (e) => {
      if (!desktopEffects || e.pointerType !== "mouse" || !cardRef.current) return;
      const el = cardRef.current;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      const magX = ((x - centerX) / centerX) * 3.5;
      const magY = ((y - centerY) / centerY) * 3.5;

      gsap.to(el, {
        rotateX,
        rotateY,
        x: magX,
        y: magY,
        transformPerspective: 900,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    [desktopEffects],
  );

  const handlePointerEnter = useCallback(() => {
    if (!desktopEffects) return;
    particleRefs.current.forEach((p, i) => {
      if (!p) return;
      gsap.to(p, {
        opacity: 0.85,
        scale: 1.35,
        duration: 0.35,
        delay: i * 0.04,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [desktopEffects]);

  const handlePointerLeave = useCallback(() => {
    if (!cardRef.current || !desktopEffects) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
    particleRefs.current.forEach((p) => {
      if (!p) return;
      gsap.to(p, {
        opacity: isExpanded ? 0.45 : 0.28,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [desktopEffects, isExpanded]);

  const layoutTransition = reducedMotion
    ? { duration: 0 }
    : {
        layout: {
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        },
      };

  return (
    <motion.div
      layout
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 0.55, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 0.55, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] },
              layout: layoutTransition.layout,
            }
      }
      className={`h-full ${spanClass}`}
    >
      <article
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={`magic-bento-card group relative h-full rounded-[1.5rem] overflow-hidden transition-colors duration-300 ${
          isExpanded
            ? "magic-bento-card--expanded bg-[#101D2B] border border-[#D6A35B]/70 shadow-[0_24px_55px_-18px_rgba(16,29,43,0.7)]"
            : "magic-bento-card--teal bg-[#101D2B]/32 backdrop-blur-md border border-white/20 shadow-[0_18px_40px_-20px_rgba(16,29,43,0.45)]"
        }`}
      >
        {/* Subtle Navy Sheen When Expanded */}
        {isExpanded && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,163,91,0.16),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(22,125,141,0.22),transparent_60%)]"
          />
        )}

        {/* Subtle Floating Particles (static when reducedMotion is enabled) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {BENTO_PARTICLES.map((pt, idx) => (
            <span
              key={idx}
              ref={(el) => {
                particleRefs.current[idx] = el;
              }}
              className={`absolute rounded-full ${
                idx % 2 === 0 ? "bg-[#D6A35B]" : "bg-white"
              } ${reducedMotion ? "" : "magic-bento-particle"}`}
              style={{
                top: pt.top,
                left: pt.left,
                width: `${pt.size}px`,
                height: `${pt.size}px`,
                opacity: isExpanded ? 0.45 : 0.28,
                animationDelay: pt.delay,
                animationDuration: pt.dur,
                boxShadow:
                  idx % 2 === 0
                    ? "0 0 8px rgba(214, 163, 91, 0.75)"
                    : "0 0 6px rgba(255, 255, 255, 0.5)",
              }}
            />
          ))}
        </div>

        {/* Mouse-Following Inner Spotlight (Desktop Only) */}
        {desktopEffects && (
          <div aria-hidden="true" className="magic-bento-spotlight pointer-events-none absolute inset-0" />
        )}

        {/* Animated Golden Border Glow (Desktop Only) */}
        {desktopEffects && (
          <div aria-hidden="true" className="magic-bento-border pointer-events-none absolute inset-0 rounded-[inherit]" />
        )}

        <button
          type="button"
          onClick={() => onToggle(index)}
          aria-expanded={isExpanded}
          aria-label={`${item.title}, ${isExpanded ? "collapse" : "expand"} details`}
          className="relative z-10 flex h-full w-full min-h-[152px] sm:min-h-[168px] flex-col justify-between gap-6 p-6 sm:p-7 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D6A35B] rounded-[inherit]"
        >
          {/* Top Row: Icon + Card Number + Expand/Collapse Indicator */}
          <motion.div layout="position" className="flex w-full items-center justify-between gap-3">
            <span
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border transition-all duration-300 ${
                desktopEffects ? "group-hover:scale-105" : ""
              } ${
                isExpanded
                  ? "bg-[#D6A35B]/15 text-[#D6A35B] border-[#D6A35B]/55 shadow-[0_0_20px_rgba(214,163,91,0.2)]"
                  : "bg-white/15 text-white border-white/20"
              }`}
            >
              <Icon className="h-6 w-6" />
            </span>

            <div className="flex items-center gap-2.5 shrink-0">
              <span
                className={`text-xs sm:text-sm font-semibold tracking-[0.2em] transition-colors duration-300 ${
                  isExpanded ? "text-[#D6A35B]" : "text-white/75"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                aria-hidden="true"
                className={`grid h-8 w-8 place-items-center rounded-full border transition-all duration-300 ${
                  isExpanded
                    ? "bg-[#D6A35B]/20 border-[#D6A35B]/60 text-[#D6A35B]"
                    : "bg-white/10 border-white/20 text-white/80 group-hover:border-[#D6A35B]/50 group-hover:text-[#D6A35B]"
                }`}
              >
                {isExpanded ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
              </span>
            </div>
          </motion.div>

          {/* Bottom Content: Title + Expandable Description */}
          <div className="w-full">
            <motion.span
              layout="position"
              role="heading"
              aria-level={3}
              className={`block font-display font-semibold tracking-tight text-white leading-snug ${
                isExpanded ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
              }`}
            >
              {item.title}
            </motion.span>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  key="expanded-desc"
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 6 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                  className="overflow-hidden"
                >
                  <span className="block h-0.5 w-10 rounded-full bg-[#D6A35B] mt-3.5 mb-3" />
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal max-w-2xl">
                    {item.desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </article>
    </motion.div>
  );
}

export function HomeWhyChoose() {
  const [items, setItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(() => prefersReducedMotion());
  const [desktopEffects, setDesktopEffects] = useState(
    () =>
      typeof window !== "undefined" &&
      hasFinePointer() &&
      !prefersReducedMotion() &&
      window.innerWidth >= 768,
  );

  const gridRef = useRef(null);
  const cardRefs = useRef(new Map());

  useEffect(() => {
    const loadData = () => {
      const data = dataService.getWhyChoose();
      setItems(Array.isArray(data) ? data : []);
    };
    loadData();

    window.addEventListener("sherize_data_updated", loadData);
    return () => window.removeEventListener("sherize_data_updated", loadData);
  }, []);

  useEffect(() => {
    if (expandedIndex !== null && expandedIndex >= items.length) {
      setExpandedIndex(null);
    }
  }, [expandedIndex, items.length]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const rmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fpQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateCapabilities = () => {
      const rm = rmQuery.matches;
      setReducedMotion(rm);
      setDesktopEffects(!rm && fpQuery.matches && window.innerWidth >= 768);
    };

    updateCapabilities();
    rmQuery.addEventListener("change", updateCapabilities);
    fpQuery.addEventListener("change", updateCapabilities);
    window.addEventListener("resize", updateCapabilities, { passive: true });

    return () => {
      rmQuery.removeEventListener("change", updateCapabilities);
      fpQuery.removeEventListener("change", updateCapabilities);
      window.removeEventListener("resize", updateCapabilities);
    };
  }, []);

  const registerCard = useCallback((idx, el) => {
    if (el) {
      cardRefs.current.set(idx, el);
    } else {
      cardRefs.current.delete(idx);
    }
  }, []);

  const handleToggleCard = useCallback((index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  // Grid-wide Magic Bento proximity glow (active on fine-pointer desktop only)
  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl || !desktopEffects) return undefined;

    const proximity = 320;

    const handleMouseMove = (e) => {
      const gridRect = gridEl.getBoundingClientRect();
      const inside =
        e.clientX >= gridRect.left - 40 &&
        e.clientX <= gridRect.right + 40 &&
        e.clientY >= gridRect.top - 40 &&
        e.clientY <= gridRect.bottom + 40;

      cardRefs.current.forEach((card) => {
        if (!card) return;
        if (!inside) {
          card.style.setProperty("--glow-intensity", "0");
          return;
        }

        const rect = card.getBoundingClientRect();
        const relX = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
        const relY = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 100;

        const clampedX = Math.max(rect.left, Math.min(e.clientX, rect.right));
        const clampedY = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
        const dist = Math.hypot(e.clientX - clampedX, e.clientY - clampedY);

        const intensity = dist === 0 ? 1 : Math.max(0, 1 - dist / proximity);

        card.style.setProperty("--glow-x", `${relX.toFixed(2)}%`);
        card.style.setProperty("--glow-y", `${relY.toFixed(2)}%`);
        card.style.setProperty("--glow-intensity", intensity.toFixed(3));
      });
    };

    const handleMouseLeave = () => {
      cardRefs.current.forEach((card) => {
        if (card) card.style.setProperty("--glow-intensity", "0");
      });
    };

    gridEl.addEventListener("mousemove", handleMouseMove, { passive: true });
    gridEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      gridEl.removeEventListener("mousemove", handleMouseMove);
      gridEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [desktopEffects, items.length]);

  if (!items || items.length === 0) return null;

  return (
    <section
      id="services"
      className="relative py-20 sm:py-24 bg-gradient-to-b from-[#167D8D] to-[#126875] text-white overflow-x-clip"
    >
      <style>{`
        .magic-bento-card {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 340px;
          will-change: transform;
        }
        .magic-bento-spotlight {
          opacity: var(--glow-intensity);
          transition: opacity 0.25s ease;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(214, 163, 91, 0.2),
            rgba(22, 125, 141, 0.08) 45%,
            transparent 75%
          );
        }
        .magic-bento-card--teal .magic-bento-spotlight {
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(214, 163, 91, 0.24),
            rgba(255, 255, 255, 0.08) 45%,
            transparent 75%
          );
        }
        .magic-bento-border {
          padding: 1.5px;
          opacity: var(--glow-intensity);
          transition: opacity 0.25s ease;
          background: radial-gradient(
            280px circle at var(--glow-x) var(--glow-y),
            rgba(214, 163, 91, 0.95) 0%,
            rgba(214, 163, 91, 0.45) 38%,
            transparent 70%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
        }
        @keyframes magic-bento-float {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(4px, -9px, 0);
          }
        }
        .magic-bento-particle {
          animation: magic-bento-float 5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .magic-bento-particle {
            animation: none !important;
          }
          .magic-bento-spotlight,
          .magic-bento-border {
            display: none !important;
          }
        }
      `}</style>

      {/* Subtle ambient accent glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-full max-w-[500px] rounded-full bg-white/[0.08] blur-[100px] pointer-events-none"
      />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <Reveal className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-[#D6A35B] font-semibold mb-5">
            <span className="h-px w-8 bg-[#D6A35B]/60" />
            Why choose Sherize
            <span className="h-px w-8 bg-[#D6A35B]/60" />
          </span>
          <KineticHeading
            as="h2"
            className="text-3xl sm:text-5xl font-display font-semibold tracking-tight leading-[1.1] text-white"
          >
            Crafted for ambitious teams <br className="hidden md:block" />
            who want <span className="text-white underline decoration-white/40">more than vendors</span>.
          </KineticHeading>
        </Reveal>

        {/* Balanced 2x3 Expandable Magic Bento Grid */}
        <LayoutGroup id="home-why-choose-bento">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch"
          >
            {items.map((item, i) => {
              const Icon = iconsMap[i % iconsMap.length];
              const isExpanded = expandedIndex === i;
              const spanClass = getGridSpanClass(i, expandedIndex);

              return (
                <MagicBentoExpandableCard
                  key={item.id || item.title || i}
                  item={item}
                  index={i}
                  Icon={Icon}
                  isExpanded={isExpanded}
                  onToggle={handleToggleCard}
                  spanClass={spanClass}
                  desktopEffects={desktopEffects}
                  reducedMotion={reducedMotion}
                  registerCard={registerCard}
                />
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
