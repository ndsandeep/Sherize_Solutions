import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { DepthReveal } from "@/components/shared/DepthReveal";
import { dataService } from "@/services/dataService";

const WHY_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
];

const WHY_LABELS = [
  "COST EFFICIENCY",
  "REMOTE TALENT",
  "AGILE DELIVERY",
  "MODERN TECH",
  "CLIENT SUCCESS",
  "SCALABILITY",
];

export function ServicesWhyChoose() {
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const loadData = () => setItems(dataService.getWhyChoose());
    loadData();

    window.addEventListener("sherize_data_updated", loadData);
    return () => window.removeEventListener("sherize_data_updated", loadData);
  }, []);

  return (
    <section className="services-why-section">
      <div className="services-why-container">
        <Reveal className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-[#D6A35B] font-semibold mb-4">
            <span className="h-px w-8 bg-[#D6A35B]/60" />
            Why choose Sherize
            <span className="h-px w-8 bg-[#D6A35B]/60" />
          </span>
          <KineticHeading
            as="h2"
            className="text-3xl sm:text-5xl font-display font-semibold tracking-tight leading-[1.1] text-[#101D2B]"
          >
            Crafted for ambitious teams <br className="hidden md:block" />
            who want <span className="text-gradient">more than vendors</span>.
          </KineticHeading>
        </Reveal>

        <div className="services-why-grid">
          {items.map((it, i) => {
            const bgImg = it.img || WHY_IMAGES[i % WHY_IMAGES.length];
            const label = WHY_LABELS[i % WHY_LABELS.length];
            const isActive = activeIndex === i;

            return (
              <DepthReveal key={it.title} delay={(i % 3) * 0.08}>
                <article
                  onClick={() => setActiveIndex(isActive ? null : i)}
                  className={`services-why-card ${isActive ? "is-active" : ""}`}
                >
                  {/* Full Background Image */}
                  <img
                    src={bgImg}
                    alt={it.title}
                    loading="lazy"
                    decoding="async"
                    className="services-why-card-img"
                  />

                  {/* Bottom-half overlay by default -> expands to full blurred overlay on hover */}
                  <div className="services-why-card-overlay">
                    <div className="services-why-card-inner">
                      <span className="services-why-card-label">
                        0{i + 1} • {label}
                      </span>
                      <span className="services-why-card-line" aria-hidden="true" />

                      <h3 className="services-why-card-title">
                        <span>{it.title}</span>
                        <Play className="services-why-card-play" />
                      </h3>

                      <p className="services-why-card-desc">{it.desc}</p>
                    </div>
                  </div>
                </article>
              </DepthReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
