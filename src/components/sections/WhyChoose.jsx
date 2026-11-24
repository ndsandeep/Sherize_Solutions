import { useState, useEffect } from "react";
import { Wallet, UserCheck, Rocket, Cpu, Headphones, Workflow } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { DepthReveal } from "@/components/shared/DepthReveal";
import { Tilt3D } from "@/components/shared/Tilt3D";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { SpotlightCard } from "@/components/shared/SpotlightCard";
import { dataService } from "@/services/dataService";

const iconsMap = [Wallet, UserCheck, Rocket, Cpu, Headphones, Workflow];

export function WhyChoose() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadData = () => setItems(dataService.getWhyChoose());
    loadData();

    window.addEventListener("sherize_data_updated", loadData);
    return () => window.removeEventListener("sherize_data_updated", loadData);
  }, []);

  return (
    <section id="services" className="relative py-20 sm:py-24 bg-gradient-to-b from-[#167D8D] to-[#126875] text-white overflow-hidden">
      {/* Subtle ambient accent glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-white/[0.08] blur-[100px] pointer-events-none"
      />

      <div className="w-full max-w-[1280px] mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-[#D6A35B] font-semibold mb-5">
            <span className="h-px w-8 bg-[#D6A35B]/60" />
            Why choose Sherize
            <span className="h-px w-8 bg-[#D6A35B]/60" />
          </span>
          <KineticHeading
            as="h2"
            className="text-4xl sm:text-5xl font-display font-semibold tracking-tight leading-[1.1] text-white"
          >
            Crafted for ambitious teams <br className="hidden md:block" />
            who want <span className="text-white underline decoration-white/40">more than vendors</span>.
          </KineticHeading>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = iconsMap[i % iconsMap.length];
            return (
              <DepthReveal key={it.title} delay={(i % 3) * 0.08}>
                <Tilt3D className="h-full rounded-2xl">
                <SpotlightCard
                  as="article"
                  className="h-full rounded-2xl p-7 transition-all duration-300 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/50 shadow-lg backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-semibold tracking-widest text-white/80">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-display font-semibold text-white">{it.title}</h3>
                  <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed">{it.desc}</p>
                </SpotlightCard>
                </Tilt3D>
              </DepthReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
