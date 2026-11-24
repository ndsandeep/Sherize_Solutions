import { useEffect, useState } from "react";
import { dataService } from "@/services/dataService";
import { DepthReveal } from "@/components/shared/DepthReveal";
import { Tilt3D } from "@/components/shared/Tilt3D";
import { KineticHeading } from "@/components/shared/KineticHeading";

/**
 * Interactive leadership cards. Uses the same people already on the site
 * (CEO & Founder, Cofounder & Director, HR, Operations Manager) from dataService.
 */
export function LeadershipCards() {
  const [people, setPeople] = useState([]);
  const [activeLeader, setActiveLeader] = useState(null);

  useEffect(() => {
    const load = () => setPeople(dataService.getTestimonials() || []);
    load();
    window.addEventListener("sherize_data_updated", load);
    return () => window.removeEventListener("sherize_data_updated", load);
  }, []);

  if (!people.length) return null;

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAF9F6]">
      <div className="mx-auto w-full max-w-[1280px] px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <KineticHeading
            as="h2"
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-black sm:text-5xl"
          >
            The people leading <span className="text-gradient">Sherize</span>
          </KineticHeading>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p, i) => (
            <DepthReveal key={p.id || i} delay={(i % 4) * 0.08}>
              <Tilt3D className="h-full rounded-3xl">
                <article
                  className="group relative h-full overflow-hidden rounded-3xl border border-[rgba(16,29,43,0.1)] bg-white shadow-soft transition-all duration-300 hover:border-primary/50 hover:shadow-xl cursor-pointer"
                  onClick={() => setActiveLeader((prev) => (prev === i ? null : i))}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.author}
                      loading="lazy"
                      decoding="async"
                      className="mf-img h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B] via-[#101D2B]/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="font-display text-lg font-semibold text-white">{p.author}</div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#D6A35B]">{p.role}</div>
                    <p className={`mt-3 text-sm font-light leading-relaxed text-white/90 transition-all duration-300 ${activeLeader === i ? "max-h-48 opacity-100" : "lead-quote"}`}>
                      {p.quote}
                    </p>
                  </div>
                </article>
              </Tilt3D>
            </DepthReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
