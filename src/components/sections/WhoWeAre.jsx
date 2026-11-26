
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { dataService } from "@/services/dataService";

/* Split Text Animation */
function SplitDescription() {
  const textRef = useRef(null);

  const companyName = "Sherize Solutions Private Limited";

  const description =
    "combines technology and human support services to help businesses scale efficiently while creating flexible earning opportunities for women worldwide.";

  useEffect(() => {
    const el = textRef.current;

    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll(".who-we-are-char");

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.025,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const renderText = (text) =>
    text.split(" ").map((word, wordIndex, words) => (
      <span key={wordIndex}>
        <span
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          {Array.from(word).map((char, charIndex) => (
            <span
              key={charIndex}
              className="who-we-are-char"
              style={{ display: "inline-block" }}
            >
              {char}
            </span>
          ))}
        </span>
        {wordIndex < words.length - 1 ? " " : ""}
      </span>
    ));

  return (
    <p
      ref={textRef}
      aria-label={`${companyName} ${description}`}
      className="text-xl sm:text-2xl text-[#4F789E] leading-relaxed font-light"
    >
      <span aria-hidden="true">
        <span className="text-[#101D2B] font-medium">
          {renderText(companyName)}
        </span>
        {" "}
        {renderText(description)}
      </span>
    </p>
  );
}

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now();
            const dur = 1600;

            const tick = (t) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);

              setN(Math.round(eased * to));

              if (p < 1) {
                rafId = requestAnimationFrame(tick);
              }
            };

            rafId = requestAnimationFrame(tick);
          } else {
            cancelAnimationFrame(rafId);
            setN(0);
          }
        });
      },
      { threshold: 0.4 }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function WhoWeAre() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const loadStats = () => setStats(dataService.getStats());

    loadStats();

    window.addEventListener(
      "sherize_data_updated",
      loadStats
    );

    return () =>
      window.removeEventListener(
        "sherize_data_updated",
        loadStats
      );
  }, []);

  return (
    <section
      id="about"
      className="relative py-20 sm:py-24 overflow-x-clip bg-[#FAF9F6]"
    >
      {/* Subtle Background Glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-full max-w-[600px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none"
      />

      <div className="w-full max-w-[1280px] mx-auto px-6 relative z-10">
        <Reveal className="text-center max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-[#D6A35B] font-semibold">
            <span className="h-px w-12 bg-[#D6A35B]/50" />
            Who we are
            <span className="h-px w-12 bg-[#D6A35B]/50" />
          </span>

          <KineticHeading
            as="h2"
            className="mt-8 text-5xl sm:text-7xl lg:text-[4rem] font-display font-semibold tracking-tighter leading-[0.95] text-black"
          >
            Technology with a <br className="hidden md:block" />
            <span className="text-gradient">
              human heartbeat.
            </span>
          </KineticHeading>
        </Reveal>

        <Reveal
          delay={150}
          className="text-center mt-12 max-w-3xl mx-auto"
        >
          {/* Split Text Animation */}
          <SplitDescription />

          <p className="mt-5 text-sm font-semibold text-[#D6A35B] tracking-widest uppercase">
            Women-first · Remote-ready · Impact-driven
          </p>
        </Reveal>

        <div className="mt-20 max-w-6xl mx-auto border-t border-[rgba(16,29,43,0.1)] pt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-6 text-center">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div className="px-2 group">
                  <div className="text-5xl sm:text-6xl font-display font-semibold text-[#D6A35B] transition-colors duration-300 group-hover:text-primary">
                    <Counter to={stat.v} suffix={stat.s} />
                  </div>

                  <div className="mt-4 text-sm sm:text-base uppercase tracking-widest font-medium text-[#4F789E]">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
