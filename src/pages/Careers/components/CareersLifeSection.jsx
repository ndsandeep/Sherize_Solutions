import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { ShinyText } from "./ShinyText";

import imgPlanning from "../assets/life-planning.jpg";
import imgTeamwork from "../assets/life-teamwork.jpg";
import imgArchitecture from "../assets/life-architecture.jpg";
import imgDevelopment from "../assets/life-development.jpg";
import imgCulture from "../assets/life-culture.jpg";

const LIFE_ITEMS = [
  {
    eyebrow: "01 • PLANNING & STRATEGY",
    title: "Plan & Ideate Together",
    desc: "Every project begins with collaborative brainstorming where every voice matters. We align product goals, user flows, and sprint milestones before writing a single line of code.",
    img: imgPlanning,
    theme: "white",
    align: "left",
  },
  {
    eyebrow: "02 • TEAMWORK & SYNERGY",
    title: "Collaborate Without Limits",
    desc: "Designers, engineers, and strategists work side by side in a supportive environment. We celebrate shared wins, mentor one another, and grow stronger together.",
    img: imgTeamwork,
    theme: "teal",
    align: "right",
  },
  {
    eyebrow: "03 • ARCHITECTURE & DESIGN",
    title: "Craft Scalable Blueprints",
    desc: "From wireframes to distributed cloud systems, we focus on clarity, security, and long-term scalability so our solutions perform effortlessly at every stage.",
    img: imgArchitecture,
    theme: "white",
    align: "left",
  },
  {
    eyebrow: "04 • AGILE DEVELOPMENT",
    title: "Build With Modern Tech",
    desc: "We embrace modern frameworks, AI-assisted workflows, and continuous code reviews to ship reliable products fast while maintaining exceptional engineering quality.",
    img: imgDevelopment,
    theme: "teal",
    align: "right",
  },
  {
    eyebrow: "05 • CULTURE & ENJOYMENT",
    title: "Grow, Share & Enjoy",
    desc: "Work-life harmony is at the heart of Sherize. Enjoy flexible remote collaboration, creative team sessions, and a culture where your growth is genuinely valued.",
    img: imgCulture,
    theme: "white",
    align: "left",
  },
];

export function CareersLifeSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="careers-life-section">
      <div className="careers-life-header-wrap">
        <Reveal className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-[#D6A35B] font-semibold mb-3">
            <span className="h-px w-8 bg-[#D6A35B]/60" />
            Life at Sherize
            <span className="h-px w-8 bg-[#D6A35B]/60" />
          </span>
          <KineticHeading
            as="h2"
            className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-[#101D2B] leading-tight"
          >
            Experience Life at <span className="text-gradient">Sherize</span>.
          </KineticHeading>
          <p className="mt-3 text-base sm:text-lg text-[#4F789E] leading-relaxed max-w-2xl mx-auto">
            Be part of a collaborative environment where creativity meets technology. We encourage
            teamwork, knowledge sharing, and continuous improvement.
          </p>
        </Reveal>
      </div>

      {/* Seamless Alternating White (#FFFFFF) & Teal (#157A88) Bands — Zero Gaps */}
      <div className="careers-life-bands">
        {LIFE_ITEMS.map((item, idx) => {
          const isLeft = item.align === "left";
          const isTeal = item.theme === "teal";
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={item.title}
              className={`careers-life-band ${isTeal ? "theme-teal" : "theme-white"}`}
            >
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setHoveredIdx(isHovered ? null : idx)}
                className={`careers-life-pair ${isLeft ? "align-left" : "align-right"} ${
                  isHovered ? "is-hovered" : ""
                }`}
              >
                {/* Standalone Clean Square Image */}
                <div className="careers-life-img-wrap">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="careers-life-img"
                  />
                </div>

                {/* Static ShinyText Main Heading + Hover-Only Description Beside Image */}
                <div className="careers-life-beside-matter">
                  <span className="careers-life-desc-eyebrow">{item.eyebrow}</span>
                  <h3 className="careers-life-desc-title">
                    <ShinyText
                      text={item.title}
                      className={isTeal ? "is-light-shiny" : "is-dark-shiny"}
                    />
                  </h3>
                  <div className="careers-life-desc-reveal">
                    <p className="careers-life-desc-text">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
