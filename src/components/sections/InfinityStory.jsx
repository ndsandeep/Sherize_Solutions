import { useEffect, useRef } from "react";
import { SceneBackdrop } from "@/components/three/SceneBackdrop";
import { useCapabilities } from "@/hooks/useCapabilities";
import { gsap } from "@/lib/motion";

// Copy below is lifted from the existing About page text; nothing new is claimed.
const CHAPTERS = [
  {
    title: "Technology",
    text: "Sherize Solutions Private Limited is an IT and digital solutions company that empowers businesses with innovative technology.",
  },
  {
    title: "Opportunity",
    text: "We create flexible work opportunities for women to earn, learn, and lead.",
  },
  {
    title: "Anywhere in the world",
    text: "Our mission is to help businesses scale with smart digital solutions while women learn, earn, and grow professionally anywhere in the world.",
  },
];

/**
 * Scroll-driven storytelling. The section pins while the 3D infinity symbol (a light
 * travelling its path forever) turns and speeds up with scroll, and three chapters
 * cross-fade over it. Reduced-motion users get the chapters as a normal stacked list.
 */
export function InfinityStory() {
  const rootRef = useRef(null);
  const progress = useRef(0);
  const chapterRefs = useRef([]);
  const dotRefs = useRef([]);
  const { reduced, mobile } = useCapabilities();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      const chapters = chapterRefs.current;
      const dots = dotRefs.current;
      gsap.set(chapters, { autoAlpha: 0, y: 40 });
      gsap.set(dots, { opacity: 0.25, scaleX: 0.5 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${mobile ? 220 : 280}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      });

      chapters.forEach((ch, i) => {
        tl.to(ch, { autoAlpha: 1, y: 0, duration: 0.6 }, i === 0 ? 0 : ">")
          .to(dots[i], { opacity: 1, scaleX: 1, duration: 0.3 }, "<")
          .to({}, { duration: 0.9 });
        if (i < chapters.length - 1) {
          tl.to(ch, { autoAlpha: 0, y: -40, duration: 0.5 }, ">").to(dots[i], { opacity: 0.25, scaleX: 0.5, duration: 0.3 }, "<");
        }
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, mobile]);

  if (reduced) {
    return (
      <section className="relative py-24">
        <SceneBackdrop scene="infinity" subtle className="opacity-60" />
        <div className="relative z-10 mx-auto w-full max-w-3xl space-y-14 px-6">
          {CHAPTERS.map((c) => (
            <div key={c.title}>
              <h2 className="font-display text-4xl font-semibold text-white sm:text-5xl">{c.title}</h2>
              <p className="mt-4 text-lg font-light leading-relaxed text-white/70">{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={rootRef} className="relative h-[100svh] w-full overflow-hidden bg-[#0D1B28]">
      <SceneBackdrop scene="infinity" progressRef={progress} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[2] h-2/3 bg-gradient-to-t from-[#0D1B28] via-[#0D1B28]/70 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[1280px] px-6 pb-14 sm:pb-20">
        <div className="grid max-w-2xl">
          {CHAPTERS.map((c, i) => (
            <div
              key={c.title}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
              className="col-start-1 row-start-1"
            >
              <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">{c.title}</h2>
              <p className="mt-4 text-base font-light leading-relaxed text-white/75 sm:text-xl">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-2" aria-hidden="true">
          {CHAPTERS.map((c, i) => (
            <span
              key={c.title}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="h-1 w-10 origin-left rounded-full bg-primary"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
