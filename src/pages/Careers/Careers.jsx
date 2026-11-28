import { WaveDivider } from "@/components/shared/WaveDivider";
import { Link } from "react-router-dom";
import { ArrowRight, Instagram } from "lucide-react";
import { PageShell, CTASection } from "@/components/layout/PageShell";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { Parallax } from "@/components/shared/Parallax";
import { CareersBenefits } from "@/components/sections/CareersBenefits";
import { BackButton } from "@/components/layout/BackButton";
import empowerment from "@/assets/images/empowerment.jpg";
import { dataService } from "@/services/dataService";
import { useState, useEffect } from "react";

import { CareersLogoIntro } from "./components/CareersLogoIntro";
import { CareersLifeSection } from "./components/CareersLifeSection";
import { CareersOpportunitiesSection } from "./components/CareersOpportunitiesSection";
import "./Careers.css";

function SectionDivider() {
  return <WaveDivider />;
}

export default function Careers() {
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    const loadData = () => {
      setSocialLinks(dataService.getSocial());
    };
    loadData();

    window.addEventListener("sherize_data_updated", loadData);
    return () => window.removeEventListener("sherize_data_updated", loadData);
  }, []);

  return (
    <div className="careers-page-container">
      {/* Opening Leaves-to-Center Logo Animation */}
      <CareersLogoIntro />

      <PageShell>
        <BackButton />

        {/* Massive Cinematic Hero */}
        <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-32 overflow-hidden bg-[#0D1B28]">
          <Parallax className="absolute inset-0 z-0" amount={6}>
            <img
              src={empowerment}
              alt="Career at Sherize"
              className="w-full h-full object-cover opacity-60 scale-105"
            />
            <div className="absolute inset-0 bg-[#0D1B28]/75" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B] via-[#0D1B28]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B28]/80 via-transparent to-transparent" />
          </Parallax>

          <div className="w-full max-w-[1280px] mx-auto px-6 max-w-5xl text-center relative z-10">
            <Reveal>
              <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-[#D6A35B] font-semibold mb-6">
                <span className="h-px w-12 bg-[#D6A35B]/50" />
                Careers
                <span className="h-px w-12 bg-[#D6A35B]/50" />
              </span>
              <KineticHeading
                as="h1"
                delay={0.2}
                className="text-3xl sm:text-6xl lg:text-[5.5rem] font-display font-semibold tracking-tight leading-[1.05] mb-6 sm:mb-8 text-white"
              >
                Work with us. <br className="hidden md:block" /> Grow with{" "}
                <span className="text-gradient">Sherize</span>.
              </KineticHeading>
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed font-light max-w-3xl mx-auto">
                Join Sherize and become part of a growing women-first platform creating flexible
                career opportunities through technology, digital services, telecalling, and business
                support.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Life at Sherize Section (Static ShinyText Heading + Hover-Only Matter) */}
        <CareersLifeSection />

        {/* Explore Career Opportunities Section */}
        <CareersOpportunitiesSection />

        {/* Cinematic "Why Join Us" Experience */}
        <CareersBenefits />

        <SectionDivider />

        {/* Final CTA Section */}
        <CTASection
          eyebrow="Careers at Sherize"
          title="Your Next Chapter"
          highlight="Starts Here."
          text="Have the passion to create, innovate, and grow? We'd love to hear from you. Take the next step in your career journey with Sherize."
          actions={
            <>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-glow shine"
              >
                Send Your Resume <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={socialLinks?.instagram || "https://www.instagram.com/sherize.solutions"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-ghost-glass group hover:border-pink-500/50 hover:bg-pink-500/10 transition-colors"
              >
                <Instagram className="h-4 w-4 text-pink-500 group-hover:scale-110 transition-transform" />
                <span className="text-white/80 group-hover:text-white transition-colors">
                  Join for more updates
                </span>
              </a>
            </>
          }
        />
      </PageShell>
    </div>
  );
}
