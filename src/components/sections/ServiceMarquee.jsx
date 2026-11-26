import { Marquee } from "@/components/shared/Marquee";
import { SERVICES_MENU } from "@/config/servicesMenu";

const ALL = SERVICES_MENU.flatMap((col) =>
  col.items.map((item) =>
    typeof item === "string" ? item : item.name
  )
);

const HALF = Math.ceil(ALL.length / 2);

export function ServiceMarquee({ single = false }) {
  return (
    <section
      aria-label="Sherize services"
      className="home-service-marquee relative overflow-hidden py-5 sm:py-7 bg-[#FAF9F6] border-y border-[rgba(16,29,43,0.06)]"
    >
      <style>{`
        .home-service-marquee .marquee-outline {
          color: #D6A35B !important;
          -webkit-text-fill-color: #D6A35B !important;
          -webkit-text-stroke: 0 !important;
        }
      `}</style>

      <Marquee
        items={single ? ALL : ALL.slice(0, HALF)}
        direction={1}
        duration={single ? 110 : 85}
      />

      {!single && (
        <Marquee
          items={ALL.slice(HALF)}
          direction={-1}
          duration={95}
          className="mt-2.5 sm:mt-3"
        />
      )}
    </section>
  );
}