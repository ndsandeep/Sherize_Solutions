import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Code2, Smartphone, Palette, Megaphone, PhoneCall, Headphones } from "lucide-react";
import { PageShell, CTASection } from "@/components/layout/PageShell";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { ServiceMarquee } from "@/components/sections/ServiceMarquee";
import { BackButton } from "@/components/layout/BackButton";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { dataService } from "@/services/dataService";

import { ServicesHero } from "./components/ServicesHero";
import { ServicesCoreCapabilities } from "./components/ServicesCoreCapabilities";
import { ServicesProcess } from "./components/ServicesProcess";
import "./Services.css";

const iconsMap = [Globe, Code2, Smartphone, Palette, Megaphone, PhoneCall, Headphones];

function SectionDivider() {
  return <WaveDivider />;
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(0);

  // Swipe logic for interactive services accordion
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setActiveService((prev) => Math.min(prev + 1, services.length - 1));
    } else if (isRightSwipe) {
      setActiveService((prev) => Math.max(prev - 1, 0));
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const [mouseStart, setMouseStart] = useState(null);
  const onMouseDown = (e) => setMouseStart(e.clientX);
  const onMouseUp = (e) => {
    if (mouseStart === null) return;
    const distance = mouseStart - e.clientX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setActiveService((prev) => Math.min(prev + 1, services.length - 1));
    } else if (isRightSwipe) {
      setActiveService((prev) => Math.max(prev - 1, 0));
    }
    setMouseStart(null);
  };

  useEffect(() => {
    const loadServices = () => setServices(dataService.getServices());
    loadServices();

    window.addEventListener("sherize_data_updated", loadServices);
    return () => window.removeEventListener("sherize_data_updated", loadServices);
  }, []);

  return (
    <div className="services-page-container">
      <PageShell>
        <BackButton />

        {/* Brand New Hero with 80-85% Card, Team Image Background & #D6A35B Tone */}
        <ServicesHero />

        <ServiceMarquee single />

        <SectionDivider />

        {/* Core Capabilities Cards */}
        <ServicesCoreCapabilities />

        <SectionDivider />

        {/* Expanding Image Accordion */}
        <section className="relative py-12 sm:py-20 bg-[#FAF9F6] overflow-hidden border-y border-[rgba(16,29,43,0.06)]">
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 max-w-[1400px]">
            <Reveal className="mb-12 text-center">
              <KineticHeading
                as="h2"
                className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-black"
              >
                Explore <span className="text-gradient">Services</span>
              </KineticHeading>
            </Reveal>

            <div
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              className="flex w-full h-[320px] sm:h-[400px] gap-2 sm:gap-4 overflow-hidden rounded-[2rem] select-none touch-pan-y"
            >
              {services.map((s, i) => {
                const Icon = iconsMap[i % iconsMap.length];
                const isActive = activeService === i;

                return (
                  <div
                    key={s.title}
                    onClick={() => setActiveService(i)}
                    onMouseEnter={() => {
                      if (window.innerWidth >= 640) setActiveService(i);
                    }}
                    className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden cursor-pointer rounded-[2rem] bg-white/5 border border-white/10 ${
                      isActive ? "grow-[20] sm:grow-[12]" : "flex-1"
                    }`}
                  >
                    {/* Background Image */}
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ${
                        isActive
                          ? "grayscale-0 opacity-100 scale-100"
                          : "grayscale opacity-40 scale-125"
                      }`}
                    />

                    {/* Cinematic Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#0f1012] via-[#0f1012]/60 to-transparent transition-opacity duration-700 ${
                        isActive ? "opacity-90" : "opacity-80"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-[#0f1012]/50 to-transparent transition-opacity duration-700 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-end">
                      {/* Compressed State (Vertical Title) */}
                      <div
                        className={`flex flex-col items-center justify-end h-full gap-4 transition-all duration-500 absolute inset-0 pb-8 pointer-events-none ${
                          isActive ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
                        }`}
                      >
                        <Icon className="h-6 w-6 text-white/50" />
                        <div
                          style={{ writingMode: "vertical-rl" }}
                          className="rotate-180 text-lg sm:text-xl font-display font-medium tracking-wider text-white/70 whitespace-nowrap overflow-hidden text-ellipsis h-2/3 text-center"
                        >
                          {s.title}
                        </div>
                      </div>

                      {/* Expanded State Content */}
                      <div
                        className={`transition-all duration-700 delay-100 relative z-10 w-[240px] sm:w-[400px] lg:w-[450px] flex flex-col ${
                          isActive
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-8 pointer-events-none"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <span
                            className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl transition-all duration-500 ${
                              isActive
                                ? "bg-primary text-primary-foreground scale-110"
                                : "bg-primary/10 text-primary scale-100"
                            } ${isActive ? `svc-fx-${i % 7}` : ""}`}
                          >
                            <Icon className="h-6 w-6" />
                          </span>
                          <h3 className="text-xl sm:text-3xl font-display font-semibold text-white drop-shadow-md">
                            {s.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed mb-4 w-full max-w-[320px] drop-shadow line-clamp-3">
                          {s.desc}
                        </p>

                        <div>
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
                          >
                            Inquire Now <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Animated Our Process Section */}
        <ServicesProcess />

        <SectionDivider />

        {/* Unified Why Choose Us Section */}
        <WhyChoose />

        <SectionDivider />

        <CTASection
          eyebrow="Let's collaborate"
          title="Let's Build Something"
          highlight="Great Together"
          text="Whether you need a website, app, design support, digital marketing, telecalling, or BPO solutions, Sherize helps your business grow with creativity, technology, and reliable support."
          actions={
            <>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-glow shine"
              >
                Start Your Project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-ghost-glass"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          }
        />
      </PageShell>
    </div>
  );
}
