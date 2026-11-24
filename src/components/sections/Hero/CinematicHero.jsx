import { useRef } from "react";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { ScrollIndicator } from "./ScrollIndicator";

export function CinematicHero() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} id="home" className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0D1B28]">
      <HeroBackground />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center justify-center text-center pt-28 pb-16 sm:pt-36 sm:pb-28">
        <HeroContent />
      </div>

      <ScrollIndicator />
    </section>
  );
}
