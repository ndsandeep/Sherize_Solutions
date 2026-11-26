import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Globe,
  Headphones,
  Megaphone,
  Palette,
  PhoneCall,
  Smartphone,
} from "lucide-react";
import womenEmpowermentImg from "@/assets/images/about-story/women-empowerment.jpg";
import globalOpportunitiesImg from "@/assets/images/about-story/global-opportunities.jpg";
import remoteFlexibilityImg from "@/assets/images/about-story/remote-flexibility.jpg";
import skillDevelopmentImg from "@/assets/images/about-story/skill-development.jpg";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { dataService } from "@/services/dataService";

const iconsMap = [Briefcase, Globe, Code2, Smartphone, Palette, Megaphone, PhoneCall, Headphones];

const STORY_MEDIA_LIST = [
  {
    key: "women",
    label: "Women Empowerment",
    desc: "Empowering women to build meaningful careers, achieve financial independence, and grow with confidence.",
    image: womenEmpowermentImg,
    alt: "Confident young Indian professional women collaborating around a laptop in a modern office",
  },
  {
    key: "global",
    label: "Global Opportunities",
    desc: "Connecting talented women with professional opportunities and businesses across the world.",
    image: globalOpportunitiesImg,
    alt: "Young professional woman wearing headphones communicating on an international video conference",
  },
  {
    key: "remote",
    label: "Remote Flexibility",
    desc: "Creating flexible work opportunities that help women balance their personal and professional lives.",
    image: remoteFlexibilityImg,
    alt: "Young professional woman working comfortably on a laptop in a modern home office",
  },
  {
    key: "skill",
    label: "Skill Development",
    desc: "Helping women develop modern digital skills through continuous learning and professional growth.",
    image: skillDevelopmentImg,
    alt: "Young female professionals learning digital and technical skills together on a laptop",
  },
];

function resolveStoryFeature(specialty, index) {
  const rawLabel = (specialty?.label || "").trim();
  const normalized = rawLabel.toLowerCase();

  const matched =
    STORY_MEDIA_LIST.find((entry) => normalized.includes(entry.key)) ||
    STORY_MEDIA_LIST[index % STORY_MEDIA_LIST.length];

  return {
    id: specialty?.id || matched.key || String(index),
    label: rawLabel || matched.label,
    desc: specialty?.desc || matched.desc,
    image: matched.image,
    alt: matched.alt,
    Icon: iconsMap[index % iconsMap.length],
  };
}

/**
 * React Bits–inspired Scroll Reveal: softly clears blur and fades words into focus
 * once as the heading/mission copy enters the viewport. Honors prefers-reduced-motion.
 */
function ScrollRevealWords({ text, gradientWords = new Set(), className = "", as: Tag = "p", delay = 0 }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;

    const words = el.querySelectorAll(".sr-word");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          opacity: 0.16,
          y: 10,
          filter: "blur(5px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.72,
          stagger: 0.032,
          delay,
          ease: "power3.out",
          clearProps: "filter,transform",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, text]);

  const tokens = text.split(" ");

  return (
    <Tag ref={rootRef} className={className} aria-label={text}>
      <span aria-hidden="true">
        {tokens.map((word, idx) => {
          const isGradient = gradientWords.has(word.replace(/[.,]/g, "").toLowerCase());
          return (
            <span key={`${word}-${idx}`}>
              <span
                className={`sr-word inline-block will-change-[opacity,transform,filter]${
                  isGradient ? " text-gradient" : ""
                }`}
              >
                {word}
              </span>
              {idx < tokens.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}

export function AboutStory() {
  const [specialties, setSpecialties] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => prefersReducedMotion());
  const [isDesktopPointer, setIsDesktopPointer] = useState(
    () =>
      typeof window !== "undefined" &&
      hasFinePointer() &&
      !prefersReducedMotion() &&
      window.innerWidth >= 1024,
  );

  useEffect(() => {
    const loadData = () => {
      const data = dataService.getAboutSpecialties();
      setSpecialties(Array.isArray(data) && data.length > 0 ? data : STORY_MEDIA_LIST);
    };
    loadData();

    window.addEventListener("sherize_data_updated", loadData);
    return () => window.removeEventListener("sherize_data_updated", loadData);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const rmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fpQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => {
      const rm = rmQuery.matches;
      setReducedMotion(rm);
      setIsDesktopPointer(!rm && fpQuery.matches && window.innerWidth >= 1024);
    };

    update();
    rmQuery.addEventListener("change", update);
    fpQuery.addEventListener("change", update);
    window.addEventListener("resize", update, { passive: true });

    return () => {
      rmQuery.removeEventListener("change", update);
      fpQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const features = useMemo(
    () => specialties.map((s, idx) => resolveStoryFeature(s, idx)),
    [specialties],
  );

  useEffect(() => {
    if (features.length > 0 && activeIndex >= features.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, features.length]);

  const handleSelect = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const handleTabListKeyDown = useCallback(
    (e) => {
      if (!features.length) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % features.length);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveIndex(features.length - 1);
      }
    },
    [features.length],
  );

  if (!features.length) return null;

  const safeIndex = activeIndex % features.length;
  const activeFeature = features[safeIndex];
  const ActiveIcon = activeFeature.Icon;

  return (
    <section className="relative py-20 sm:py-24 bg-[#FAF9F6] overflow-x-clip">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Preserved Story Copy + Interactive Feature Buttons */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div>
              <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#167D8D] font-semibold mb-4">
                <span className="h-px w-8 bg-[#167D8D]/50" />
                OUR STORY
              </span>

              <ScrollRevealWords
                as="h2"
                text="A women-first platform built on technology & opportunity."
                gradientWords={new Set(["technology", "&", "opportunity"])}
                className="text-3xl sm:text-5xl font-display font-semibold tracking-tight leading-[1.06] text-[#101D2B]"
              />

              <ScrollRevealWords
                as="p"
                delay={0.14}
                text="Our mission is to help businesses scale with smart digital solutions while creating flexible work opportunities for women to learn, earn, and grow professionally anywhere in the world."
                className="mt-5 sm:mt-6 text-base sm:text-lg text-[#4F789E] font-light leading-relaxed"
              />
            </div>

            {/* Interactive Feature Buttons */}
            <div
              role="tablist"
              aria-label="Sherize story pillars"
              onKeyDown={handleTabListKeyDown}
              className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3"
            >
              {features.map((feature, i) => {
                const isSelected = i === safeIndex;
                const Icon = feature.Icon;

                return (
                  <motion.button
                    key={feature.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls="about-story-panel"
                    onClick={() => handleSelect(i)}
                    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.48,
                            delay: i * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                          }
                    }
                    whileHover={
                      isDesktopPointer && !isSelected ? { x: 4 } : undefined
                    }
                    className={`group relative flex items-center justify-between gap-2.5 sm:gap-3 w-full rounded-2xl px-3.5 py-3 sm:px-5 sm:py-4 text-left border transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D8D] ${
                      isSelected
                        ? "bg-[#101D2B] border-[#D6A35B] text-white shadow-[0_18px_38px_-16px_rgba(16,29,43,0.45)]"
                        : "bg-white border-[rgba(16,29,43,0.1)] text-[#101D2B] shadow-sm hover:border-[#167D8D]/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                      <span
                        className={`grid h-9 w-9 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-xl border transition-colors duration-300 ${
                          isSelected
                            ? "bg-[#D6A35B]/15 border-[#D6A35B]/45 text-[#D6A35B]"
                            : "bg-[#167D8D]/10 border-[#167D8D]/15 text-[#167D8D]"
                        }`}
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>

                      <span
                        className={`text-xs min-[380px]:text-[13px] sm:text-base font-medium leading-snug transition-colors duration-300 ${
                          isSelected ? "text-white" : "text-[#101D2B]"
                        }`}
                      >
                        {feature.label}
                      </span>
                    </div>

                    <ArrowRight
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform duration-300 ${
                        isSelected
                          ? "text-[#D6A35B] translate-x-0.5"
                          : "text-[#4F789E] group-hover:text-[#167D8D] group-hover:translate-x-0.5"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Consistent Interactive Image & Dark Navy Description Card */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div
              id="about-story-panel"
              role="tabpanel"
              aria-label={activeFeature.label}
              className="w-full max-w-[560px] rounded-[1.75rem] overflow-hidden border border-[rgba(16,29,43,0.12)] bg-[#101D2B] shadow-[0_26px_60px_-20px_rgba(16,29,43,0.32)]"
            >
              {/* Fixed-Aspect Image Container */}
              <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#0D1B28]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activeFeature.id}
                    initial={
                      reducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, filter: "blur(10px)", scale: 1.08 }
                    }
                    animate={
                      reducedMotion
                        ? { opacity: 1 }
                        : { opacity: 1, filter: "blur(0px)", scale: 1.03 }
                    }
                    exit={
                      reducedMotion
                        ? { opacity: 0, transition: { duration: 0 } }
                        : {
                            opacity: 0,
                            filter: "blur(6px)",
                            transition: { duration: 0.25, ease: "easeOut" },
                          }
                    }
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : {
                            opacity: { duration: 0.4, ease: "easeOut" },
                            filter: { duration: 0.45, ease: "easeOut" },
                            scale: { duration: 4.5, ease: [0.22, 1, 0.36, 1] },
                          }
                    }
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={activeFeature.image}
                      alt={activeFeature.alt}
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Soft bottom transition into the dark navy panel */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#101D2B] via-[#101D2B]/40 to-transparent"
                />
              </div>

              {/* Dark Navy Content Panel */}
              <div className="relative bg-[#101D2B] px-6 py-6 sm:px-8 sm:py-7 min-h-[188px] sm:min-h-[196px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${activeFeature.id}`}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 0.36, ease: [0.16, 1, 0.3, 1] }
                    }
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#D6A35B]/15 border border-[#D6A35B]/35 text-[#D6A35B]">
                          <ActiveIcon className="h-5 w-5" />
                        </span>
                        <span className="h-0.5 w-10 rounded-full bg-[#D6A35B]" />
                      </div>

                      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D6A35B]">
                        {String(safeIndex + 1).padStart(2, "0")} /{" "}
                        {String(features.length).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-white">
                      {activeFeature.label}
                    </h3>

                    <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
                      {activeFeature.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Pagination Indicators */}
            <div
              className="mt-5 flex items-center justify-center gap-2.5"
              role="group"
              aria-label="Story feature indicators"
            >
              {features.map((feature, i) => {
                const isSelected = i === safeIndex;
                return (
                  <button
                    key={`dot-${feature.id}`}
                    type="button"
                    onClick={() => handleSelect(i)}
                    aria-label={`Select ${feature.label}`}
                    aria-pressed={isSelected}
                    className="py-2 px-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D8D] rounded-full"
                  >
                    <motion.span
                      layout
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }
                      }
                      className={`block h-2 rounded-full transition-colors duration-300 ${
                        isSelected
                          ? "w-8 bg-[#101D2B] ring-1 ring-[#D6A35B]"
                          : "w-2.5 bg-[#4F789E]/35 hover:bg-[#167D8D]/70"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
