import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SERVICES_MENU } from "@/config/servicesMenu";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { DepthReveal } from "@/components/shared/DepthReveal";
import { AsciiText } from "./AsciiText";
import { TextType } from "./TextType";

export function ServicesCoreCapabilities({
  eyebrow = "Core Capabilities",
  title = "Explore Our",
  highlight = "Service Domains",
  subtitle = "Hover over each domain (or tap on mobile) to reveal specialized capabilities and launch dedicated service blueprints.",
}) {
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (index) => {
    setActiveCard((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative py-14 sm:py-24 bg-[#FAF9F6]">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">
        <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-3 text-lg sm:text-2xl uppercase tracking-[0.22em] text-[#D6A35B] font-bold mb-4 sm:mb-5">
            <span className="h-px w-8 sm:w-10 bg-[#D6A35B]/60" />
            <AsciiText text={eyebrow} />
            <span className="h-px w-8 sm:w-10 bg-[#D6A35B]/60" />
          </span>
          <KineticHeading
            as="h2"
            className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-black leading-tight"
          >
            {title} <span className="text-gradient">{highlight}</span>
          </KineticHeading>
          {subtitle && (
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-[#4F789E] font-light max-w-2xl mx-auto px-2 min-h-[3.2em]">
              <TextType
                text={subtitle}
                typingSpeed={18}
                initialDelay={250}
                startOnView={true}
              />
            </p>
          )}
        </Reveal>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {SERVICES_MENU.map((col, i) => {
            const isOpen = activeCard === i;

            return (
              <DepthReveal key={col.title} delay={i * 0.1}>
                <div
                  className="group relative rounded-[1.75rem] overflow-hidden border border-[rgba(16,29,43,0.12)] bg-white shadow-soft hover:shadow-2xl hover:border-primary/50 transition-all duration-500 flex flex-col cursor-pointer select-none"
                  onClick={() => toggleCard(i)}
                >
                  {/* STATIC HEADING: Always visible at top with clean white background and black text */}
                  <div className="h-[105px] sm:h-[110px] p-5 sm:p-6 bg-white flex flex-col justify-center border-b border-[rgba(16,29,43,0.06)] shrink-0 z-10">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] uppercase tracking-widest text-[#4F789E] font-semibold">
                        {col.eyebrow}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FAF9F6] text-[#4F789E] font-medium border border-[rgba(16,29,43,0.08)]">
                          {col.items.length} Domains
                        </span>
                        {/* Mobile tap toggle pill indicator */}
                        <button
                          type="button"
                          className="md:hidden text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#167D8D] text-white flex items-center gap-0.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCard(i);
                          }}
                          aria-label={isOpen ? "Hide domains" : "Show domains"}
                        >
                          {isOpen ? "Hide" : "Tap"}
                          <ChevronDown
                            size={11}
                            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-black tracking-tight leading-tight">
                      {col.title}
                    </h3>
                  </div>

                  {/* DOWN OF HEADING: Square type image with hover on desktop & tap on mobile */}
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img
                      src={col.image}
                      alt={col.title}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        isOpen ? "scale-105" : "group-hover:scale-105"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Mobile Hint Pill (fades out when opened) */}
                    {!isOpen && (
                      <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                        <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#101D2B]/90 backdrop-blur-md text-white/90 border border-white/15 shadow-md flex items-center gap-1.5">
                          Tap to view {col.items.length} domains{" "}
                          <ArrowRight size={11} className="text-[#D6A35B]" />
                        </span>
                      </div>
                    )}

                    {/* Blue Layer: Active on tap (mobile) and on hover (desktop) */}
                    <div
                      className={`absolute inset-0 bg-[#101D2B] text-white p-4 sm:p-6 flex flex-col justify-between transition-all duration-500 ease-out z-20 overflow-hidden ${
                        isOpen
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                      }`}
                    >
                      <div className="w-full flex-1 flex flex-col justify-center overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10 shrink-0">
                          <span className="text-xs uppercase tracking-wider text-[#D6A35B] font-semibold">
                            Specialized Domains
                          </span>
                        </div>
                        <ul className="space-y-1.5 w-full">
                          {col.items.map((item) => (
                            <li
                              key={item.slug}
                              className="flex items-center gap-2.5 py-1.5 px-3 rounded-xl text-xs sm:text-sm text-white/90 font-medium"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[#D6A35B] shrink-0" />
                              <span>{item.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </DepthReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
