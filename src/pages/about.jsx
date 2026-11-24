import { WaveDivider } from "@/components/shared/WaveDivider";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  Briefcase,
  Globe,
  Smartphone,
  Palette,
  Megaphone,
  PhoneCall,
  Headphones,
  Code2,
  Sparkles,
} from "lucide-react";
import { PageShell, CTASection } from "@/components/layout/PageShell";
import aboutHero from "@/assets/images/about_hero.jpg";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { Parallax } from "@/components/shared/Parallax";
import { Tilt3D } from "@/components/shared/Tilt3D";
import { SceneBackdrop } from "@/components/three/SceneBackdrop";
import { InfinityStory } from "@/components/sections/InfinityStory";
import { LeadershipCards } from "@/components/sections/LeadershipCards";
import aboutTeam from "@/assets/images/about_team_collaborating.jpg";
import { Empowerment } from "@/components/sections/Empowerment";
import { BackButton } from "@/components/layout/BackButton";
import { dataService } from "@/services/dataService";
import { useState, useEffect } from "react";

const iconsMap = [Briefcase, Globe, Code2, Smartphone, Palette, Megaphone, PhoneCall, Headphones];

function SectionDivider() {
  return <WaveDivider />;
}

export default function AboutPage() {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const loadData = () => setSpecialties(dataService.getAboutSpecialties());
    loadData();

    window.addEventListener("sherize_data_updated", loadData);
    return () => window.removeEventListener("sherize_data_updated", loadData);
  }, []);

  return (
    <PageShell>
      <BackButton />

      {/* Massive Cinematic Hero */}
      <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-32 overflow-hidden min-h-[90vh] flex items-center bg-[#0D1B28]">
        {/* Background Image */}
        <Parallax className="absolute inset-0 z-0" amount={6}>
          <img
            src={aboutHero}
            alt="About Sherize"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-[#0D1B28]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B] via-[#0D1B28]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B28]/80 via-transparent to-transparent" />
        </Parallax>
        {/* SceneBackdrop removed — 3D shapes look out of place over a photo hero */}

        <div className="w-full max-w-[1280px] mx-auto px-6 max-w-5xl text-center relative z-10 mt-12">
          <Reveal>
            <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-[#D6A35B] font-semibold mb-6 drop-shadow-md">
              <span className="h-px w-12 bg-[#D6A35B]/50" />
              ABOUT SHERIZE
              <span className="h-px w-12 bg-[#D6A35B]/50" />
            </span>
            <KineticHeading
              as="h1"
              delay={0.2}
              className="text-3xl sm:text-5xl lg:text-[3.25rem] font-display font-semibold tracking-tight leading-[1.1] mb-6 text-white drop-shadow-2xl"
            >
              Where Women Grow, <br className="hidden md:block" /> Work & Build the{" "}
              <span className="text-gradient drop-shadow-2xl">Future Digitally</span>
            </KineticHeading>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto drop-shadow-lg">
              Sherize Solutions Private Limited is an IT and digital solutions company that empowers
              businesses with innovative technology, while creating flexible work opportunities for
              women to earn, learn, and lead.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pinned, scroll-driven storytelling with the 3D infinity symbol */}
      <InfinityStory />

      <SectionDivider />

      {/* Our Story - Bento Layout */}
      <section className="relative py-20 sm:py-24 bg-[#FAF9F6]">
        <div className="w-full max-w-[1280px] mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-6 flex flex-col gap-8">
              <div>
                <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-primary font-medium mb-4">
                  <span className="h-px w-8 bg-primary/50" />
                  Our Story
                </span>
                <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight leading-[1.05] text-black">
                  A women-first platform built on{" "}
                  <span className="text-gradient">technology & opportunity</span>.
                </h2>
                <p className="mt-6 text-lg text-[#101D2B] font-light leading-relaxed">
                  Our mission is to help businesses scale with smart digital solutions while
                  creating flexible work opportunities for women to learn, earn, and grow
                  professionally anywhere in the world.
                </p>
              </div>

              {/* Bento Specialties */}
              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                {specialties.map((s, i) => {
                  const Icon = iconsMap[i % iconsMap.length];
                  return (
                    <div
                      key={s.label}
                      className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-[rgba(16,29,43,0.1)] shadow-sm transition-transform hover:-translate-y-1 hover:border-primary/40"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-medium text-[#101D2B]">{s.label}</span>
                    </div>
                  )
                })}
              </div>
            </Reveal>

            <Reveal delay={150} className="lg:col-span-6 flex justify-center">
              <Tilt3D max={6} lift={1.01} className="w-full max-w-[500px] aspect-square rounded-[2.5rem]">
                <div className="relative w-full aspect-square">
                  <div className="absolute -inset-6 rounded-[3rem] ring-conic opacity-20 blur-2xl" />
                  <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden border border-[rgba(16,29,43,0.1)] bg-white shadow-xl">
                    <img
                      src={aboutTeam}
                      alt="Sherize Team Collaboration"
                      className="mf-img w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B]/80 via-[#101D2B]/15 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 flex items-center gap-4 border border-[rgba(16,29,43,0.08)] shadow-lg">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                        <Sparkles className="h-6 w-6" />
                      </span>
                      <div>
                        <div className="text-base font-semibold text-[#101D2B]">
                          Collaborative culture
                        </div>
                        <div className="text-sm text-[#4F789E]">
                          Driven by talent, united by shared ambition.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt3D>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Unified Empowerment Section */}
      <Empowerment />

      <SectionDivider />

      <LeadershipCards />

      <SectionDivider />

      <CTASection
        eyebrow="Your future, your terms"
        title="Build Your Future With"
        highlight="Sherize"
        text="Join a growing platform where technology meets opportunity. Work flexibly, earn confidently, and grow with purpose."
        actions={
          <>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-glow shine"
            >
              <Download className="h-4 w-4" /> Download App
            </a>
            <Link
              to="/opportunities"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-ghost-glass"
            >
              Explore Careers <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        }
      />
    </PageShell>
  );
}
