import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageShell, CTASection } from "@/components/layout/PageShell";
import { Reveal } from "@/components/shared/Reveal";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { ServiceMarquee } from "@/components/sections/ServiceMarquee";
import { BackButton } from "@/components/layout/BackButton";
import { dataService } from "@/services/dataService";

import { ServicesHero } from "./components/ServicesHero";
import { ServicesCoreCapabilities } from "./components/ServicesCoreCapabilities";
import { CircularGallery } from "./components/CircularGallery";
import { SplitText } from "./components/SplitText";
import { ServicesProcess } from "./components/ServicesProcess";
import { ServicesWhyChoose } from "./components/ServicesWhyChoose";
import { ServicesDetailView } from "./components/ServicesDetailView";
import "./Services.css";

function SectionDivider() {
  return <WaveDivider />;
}

function toSlug(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [searchParams] = useSearchParams();
  const activeSlug = searchParams.get("service");

  useEffect(() => {
    const loadServices = () => setServices(dataService.getServices());
    loadServices();

    window.addEventListener("sherize_data_updated", loadServices);
    return () => window.removeEventListener("sherize_data_updated", loadServices);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSlug]);

  if (activeSlug) {
    const matchedService = services.find((s) => toSlug(s.title) === activeSlug);
    return (
      <div className="services-page-container">
        <PageShell>
          <BackButton />
          <ServicesDetailView service={matchedService} slug={activeSlug} />
        </PageShell>
      </div>
    );
  }

  return (
    <div className="services-page-container">
      <PageShell>
        <BackButton />

        {/* Full-Window Hero */}
        <ServicesHero />

        <ServiceMarquee single />

        <SectionDivider />

        {/* Core Capabilities Cards (Domains only, no redirect) */}
        <ServicesCoreCapabilities />

        <SectionDivider />

        {/* Explore Services — SplitText + Subtitle + Circular Gallery */}
        <section className="relative py-14 sm:py-20 bg-[#FAF9F6] overflow-hidden border-y border-[rgba(16,29,43,0.06)]">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
            <Reveal className="mb-10 text-center max-w-3xl mx-auto">
              <SplitText
                text="Explore Services"
                as="h2"
                className="services-explore-heading"
                accentWords={["Services"]}
                accentClass="text-[#D6A35B]"
                delay={0.03}
                startOnView={true}
              />
              <p className="services-explore-subtitle">
                Discover our wide range of digital services designed to empower your
                business and accelerate growth. From innovative technology to creative
                solutions, we turn your ideas into impactful digital experiences.
              </p>
            </Reveal>

            <CircularGallery items={services} bend={2.4} autoPlay={true} />
          </div>
        </section>

        <SectionDivider />

        {/* Real-Time Animated Our Process Section */}
        <ServicesProcess />

        <SectionDivider />

        {/* Why Choose Sherize Section */}
        <ServicesWhyChoose />

        <SectionDivider />

        <CTASection
          eyebrow="Let's collaborate"
          title="Let's Build Something"
          highlight="Great Together"
          text="Whether you need a website, app, design support, digital marketing, telecalling, or BPO solutions, Sherize helps your business grow with creativity, technology, and reliable support."
          actions={
            <>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-glow shine"
              >
                Start Your Project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-ghost-glass"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          }
        />
      </PageShell>
    </div>
  );
}
