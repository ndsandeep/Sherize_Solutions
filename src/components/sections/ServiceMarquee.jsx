import { Marquee } from "@/components/shared/Marquee";
import { SERVICES_MENU } from "@/config/servicesMenu";

const ALL = SERVICES_MENU.flatMap((col) =>
  col.items.map((item) => (typeof item === "string" ? item : item.name))
);
const HALF = Math.ceil(ALL.length / 2);

/** Sleek kinetic marquee rows with compact, refined text size */
export function ServiceMarquee({ single = false }) {
  return (
    <section aria-label="Sherize services" className="relative overflow-hidden py-5 sm:py-7 bg-[#FAF9F6] border-y border-[rgba(16,29,43,0.06)]">
      <Marquee items={single ? ALL : ALL.slice(0, HALF)} direction={1} duration={single ? 110 : 85} />
      {!single && (
        <Marquee items={ALL.slice(HALF)} direction={-1} duration={95} className="mt-2.5 sm:mt-3" />
      )}
    </section>
  );
}
