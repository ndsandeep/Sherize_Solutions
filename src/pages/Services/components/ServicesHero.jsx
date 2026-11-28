import { motion } from "framer-motion";
import { SplitText } from "./SplitText";
import { SplitFlapText } from "./SplitFlapText";
import { TextType } from "./TextType";
import { SpecularButton } from "./SpecularButton";
import heroTeamBg from "../assets/services-hero-team.jpg";

export function ServicesHero() {
  return (
    <section className="services-hero-section">
      <div className="services-hero-wrapper">
        <div className="services-hero-card">
          {/* Full-bleed Team Background Image */}
          <img
            src={heroTeamBg}
            alt="Sherize Solutions Team"
            loading="eager"
            className="services-hero-bg-img"
          />

          {/* Left-side progressive blur over the background image */}
          <div className="services-hero-left-blur" aria-hidden="true" />

          {/* Softer Curved #D6A35B shade sweeping from bottom-left */}
          <div className="services-hero-curved-shade" aria-hidden="true">
            <svg
              viewBox="0 0 1200 620"
              preserveAspectRatio="none"
              className="services-hero-curve-svg"
            >
              <defs>
                <linearGradient id="servicesGoldCurve" x1="0%" y1="100%" x2="85%" y2="15%">
                  <stop offset="0%" stopColor="#D6A35B" stopOpacity="0.34" />
                  <stop offset="45%" stopColor="#D6A35B" stopOpacity="0.22" />
                  <stop offset="80%" stopColor="#D6A35B" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#D6A35B" stopOpacity="0" />
                </linearGradient>
                <filter id="servicesCurveBlur" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="24" />
                </filter>
              </defs>
              {/* Soft feathered curved backdrop */}
              <path
                d="M -40 160 C 180 180, 310 340, 560 410 C 780 470, 990 485, 1240 530 L 1240 660 L -40 660 Z"
                fill="url(#servicesGoldCurve)"
                filter="url(#servicesCurveBlur)"
              />
              {/* Secondary soft curve */}
              <path
                d="M -20 220 C 170 245, 290 380, 520 445 C 720 500, 940 520, 1220 560 L 1220 640 L -20 640 Z"
                fill="url(#servicesGoldCurve)"
              />
            </svg>
          </div>

          {/* Subtle bottom-left radial vignette */}
          <div className="services-hero-vignette" aria-hidden="true" />

          {/* Bottom-Left Content Block (Heading -> Tagline -> Description -> CTA) */}
          <div className="services-hero-content">
            {/* 1. Main Heading with React Bits SplitText */}
            <SplitText
              text="Turning Ideas Into Digital Excellence."
              as="h1"
              className="services-hero-title"
              accentWords={["Digital", "Excellence."]}
              accentClass="text-[#FFB703]"
              delay={0.025}
            />

            {/* 2. Tagline with React Bits SplitFlapText */}
            <p className="services-hero-tagline">
              <SplitFlapText
                text="Your Vision. Our Expertise. Limitless Possibilities."
                delay={28}
                initialDelay={450}
              />
            </p>

            {/* 3. Description with React Bits TextType */}
            <p className="services-hero-desc">
              <TextType
                text="We deliver innovative digital solutions that help businesses streamline operations, strengthen their online presence, and accelerate growth. From strategy to execution, we turn your vision into impactful digital experiences."
                typingSpeed={18}
                initialDelay={900}
              />
            </p>

            {/* 4. Specular Button CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpecularButton to="/contact" label="Book a Call" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
