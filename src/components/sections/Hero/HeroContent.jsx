import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { Magnetic } from "@/components/shared/Magnetic";

const description =
  "From intelligent software to immersive digital experiences, Sherize transforms ideas into scalable technology.";

export function HeroContent() {
  const headingRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const corridor = headingRef.current?.closest(".corridor-intro");

    if (!corridor) {
      setHasEntered(true);
      return;
    }

    const checkReveal = () => {
      const bounds = corridor.getBoundingClientRect();
      const scrollableDistance =
        corridor.offsetHeight - window.innerHeight;

      const progress =
        scrollableDistance > 0
          ? -bounds.top / scrollableDistance
          : 1;

      if (progress >= 0.69) {
        setHasEntered(true);
        window.removeEventListener("scroll", checkReveal);
      }
    };

    window.addEventListener("scroll", checkReveal, {
      passive: true,
    });

    checkReveal();

    return () =>
      window.removeEventListener("scroll", checkReveal);
  }, []);

  // Text Type animation
  useEffect(() => {
    if (reduceMotion) {
      setTypedText(description);
      setIsTyping(false);
      return;
    }

    if (!hasEntered) return;

    let index = 0;
    let typingInterval;

    const startDelay = setTimeout(() => {
      setIsTyping(true);

      typingInterval = setInterval(() => {
        index += 1;

        setTypedText(description.slice(0, index));

        if (index >= description.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30);
    }, 1100);

    return () => {
      clearTimeout(startDelay);
      clearInterval(typingInterval);
    };
  }, [hasEntered, reduceMotion]);

  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3,
            },
          },
        }}
        className="flex flex-col items-center text-center mx-auto"
      >
        <h1
          ref={headingRef}
          aria-label="We Build What's Next."
          className="font-display font-semibold text-3xl sm:text-5xl lg:text-[4.75rem] leading-[1.1] tracking-tight text-white mb-4 sm:mb-6 text-center"
          style={{ perspective: "900px" }}
        >
          <span aria-hidden="true">
            {["We", "Build", "What's", "Next."].map(
              (word, index) => (
                <motion.span
                  key={word}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, rotateX: -88, y: 12 }
                  }
                  animate={
                    reduceMotion
                      ? undefined
                      : hasEntered
                        ? { opacity: 1, rotateX: 0, y: 0 }
                        : undefined
                  }
                  transition={{
                    duration: 0.62,
                    delay: index * 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block origin-bottom${
                    index >= 2 ? " text-gradient" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {word}
                  {index < 3 ? "\u00A0" : ""}
                </motion.span>
              )
            )}
          </span>
        </h1>

        {/* Text Type Description */}
        <motion.p
          variants={item}
          aria-label={description}
          className="relative text-sm sm:text-xl text-white/80 max-w-2xl mb-3 sm:mb-4 leading-relaxed text-center px-2"
        >
          {/* Reserve original text height */}
          <span
            aria-hidden="true"
            className="invisible block"
          >
            {description}
          </span>

          {/* Animated typing text */}
          <span
            aria-hidden="true"
            className="absolute inset-0 px-2"
          >
            {reduceMotion ? description : typedText}

            {isTyping && !reduceMotion && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="inline-block ml-0.5 text-[#167D8D]"
              >
                |
              </motion.span>
            )}
          </span>
        </motion.p>

        <motion.p
          variants={item}
          className="text-xs sm:text-base text-[#D6A35B] font-medium max-w-xl mb-8 sm:mb-10 leading-relaxed text-center px-2"
        >
          Empowering businesses. Empowering women. Everywhere.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <Magnetic>
            <Link
              to="/services"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm sm:text-base font-semibold bg-[#167D8D] text-white hover:bg-[#126875] shadow-[0_10px_25px_-5px_rgba(22,125,141,0.5)] transition-all duration-300"
            >
              Explore Our Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>

          <Link
            to="/contact"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm sm:text-base font-medium border border-[#D6A35B]/70 text-[#D6A35B] hover:bg-[#D6A35B] hover:text-[#101D2B] transition-all duration-300 shadow-sm"
          >
            Start a Project
            <ChevronRight className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>

          <a
            href="https://play.google.com/store/apps/details?id=in.sherize.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm sm:text-base font-semibold bg-[#167D8D] text-white hover:bg-[#126875] transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(22,125,141,0.5)] border border-[#167D8D]"
          >
            <FaGooglePlay className="h-4 w-4 text-[#00E676]" />
            Sherize BPO App
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}