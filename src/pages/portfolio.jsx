import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { PageShell, PageHero, CTASection } from "@/components/layout/PageShell";
import { DepthReveal } from "@/components/shared/DepthReveal";
import { ServiceMarquee } from "@/components/sections/ServiceMarquee";
import { dataService } from "@/services/dataService";

import dashboard from "@/assets/images/hero-dashboard.jpg";
import aboutHero from "@/assets/images/about_hero.jpg";
import galleryHero from "@/assets/images/gallery_hero.jpg";
import servicesHero from "@/assets/images/services_hero_bg.jpg";
import empowerment from "@/assets/images/empowerment.jpg";

// Only assets that already ship with the site; captions reuse their existing alt text.
const MOMENTS = [
  { src: dashboard, title: "Sherize workspace", span: "md:col-span-2 md:row-span-2" },
  { src: galleryHero, title: "Sherize Culture", span: "" },
  { src: servicesHero, title: "Digital Services", span: "" },
  { src: empowerment, title: "Empowerment at Sherize", span: "" },
  { src: aboutHero, title: "About Sherize", span: "md:col-span-2" },
];

export default function PortfolioPage() {
  const [services, setServices] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const load = () => setServices(dataService.getServices() || []);
    load();
    window.addEventListener("sherize_data_updated", load);
    return () => window.removeEventListener("sherize_data_updated", load);
  }, []);

  const list = useMemo(() => services.filter((s) => s && s.img && s.title), [services]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Portfolio"
        title="Our work,"
        highlight="at a glance"
        subtitle="The services we deliver and the spaces we build them in."
      />

      <ServiceMarquee single />

      <section className="relative pb-24 bg-[#FAF9F6] pt-16">
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s, i) => {
              const isOpen = activeCard === i;
              return (
              <DepthReveal key={s.title} delay={(i % 3) * 0.08}>
                <div
                  className="group relative rounded-[1.75rem] overflow-hidden border border-[rgba(16,29,43,0.12)] bg-white shadow-soft hover:shadow-2xl hover:border-primary/50 transition-all duration-500 flex flex-col cursor-pointer select-none"
                  onClick={() => setActiveCard((prev) => (prev === i ? null : i))}
                >
                  {/* STATIC HEADING: Clean white background and black text */}
                  <div className="h-[105px] p-5 sm:p-6 bg-white flex flex-col justify-center border-b border-[rgba(16,29,43,0.06)] shrink-0 z-10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] uppercase tracking-widest text-[#4F789E] font-semibold">
                        Digital Solution
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FAF9F6] text-[#4F789E] font-medium border border-[rgba(16,29,43,0.08)]">
                          Production
                        </span>
                        <span className="md:hidden text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#167D8D] text-white">
                          {isOpen ? "Hide" : "Tap"}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-bold text-black tracking-tight leading-tight line-clamp-1">
                      {s.title}
                    </h3>
                  </div>

                  {/* DOWN OF HEADING: Square type image with hover reveal */}
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        isOpen ? "scale-105" : "group-hover:scale-105"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Hover & Tap Blue Layer: Displays content right below the static heading with no scrollbars */}
                    <div
                      className={`absolute inset-0 bg-[#101D2B] text-white p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 ease-out z-20 overflow-hidden ${
                        isOpen
                          ? "opacity-100 pointer-events-auto"
                          : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                      }`}
                    >
                      <div className="my-auto">
                        <p className="text-xs sm:text-base text-white/85 leading-relaxed font-light mb-4">
                          {s.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/15 flex items-center justify-between shrink-0">
                        <span className="text-xs text-white/60">Ready to build?</span>
                        <Link
                          to="/contact"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold bg-[#D6A35B] text-[#101D2B] hover:bg-white transition-all shadow-md"
                        >
                          Inquire Now <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
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

      <section className="relative py-20 sm:py-28 bg-[#FAF9F6] border-t border-[rgba(16,29,43,0.06)]">
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[240px] md:grid-cols-3 md:gap-5">
            {MOMENTS.map((m, i) => (
              <DepthReveal key={m.title} delay={i * 0.06} className={m.span}>
                <figure className="group relative h-full w-full overflow-hidden rounded-2xl border border-[rgba(16,29,43,0.1)] shadow-md">
                  <img
                    src={m.src}
                    alt={m.title}
                    loading="lazy"
                    decoding="async"
                    className="mf-img h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B]/85 via-transparent to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 font-display text-base text-white sm:text-lg">
                    {m.title}
                  </figcaption>
                </figure>
              </DepthReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Let's collaborate"
        title="Let's Build Something"
        highlight="Great Together"
        text="Whether you need a website, app, design support, digital marketing, telecalling, or BPO solutions, Sherize helps your business grow with creativity, technology, and reliable support."
        actions={
          <>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm btn-glow">
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium btn-ghost-glass">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        }
      />
    </PageShell>
  );
}
