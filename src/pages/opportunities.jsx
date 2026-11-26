import { WaveDivider } from "@/components/shared/WaveDivider";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  Instagram,
  Home,
  Briefcase,
  PhoneCall,
  Palette,
  GraduationCap,
  TrendingUp,
  Clock,
  Wallet,
  Sparkles,
  Users,
  CheckCircle2,
  HeartHandshake,
} from "lucide-react";
import { PageShell, CTASection } from "@/components/layout/PageShell";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { Parallax } from "@/components/shared/Parallax";
import { CareersBenefits } from "@/components/sections/CareersBenefits";
import { SceneBackdrop } from "@/components/three/SceneBackdrop";
import { BackButton } from "@/components/layout/BackButton";
import empowerment from "@/assets/images/empowerment.jpg";
import aboutHero from "@/assets/images/about_hero.jpg";
import { dataService } from "@/services/dataService";
import { useState, useEffect } from "react";

function SectionDivider() {
  return <WaveDivider />;
}

const iconsMap = [Home, Briefcase, PhoneCall, Palette, GraduationCap, TrendingUp];

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [activeRole, setActiveRole] = useState(null);
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    const loadData = () => {
      setOpportunities(dataService.getRoles());
      setSocialLinks(dataService.getSocial());
    };
    loadData();

    window.addEventListener("sherize_data_updated", loadData);
    return () => window.removeEventListener("sherize_data_updated", loadData);
  }, []);
  return (
    <PageShell>
      <BackButton />

      {/* Massive Cinematic Hero */}
      <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-32 overflow-hidden bg-[#0D1B28]">
        {/* Cinematic Background Image */}
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
        {/* SceneBackdrop removed — 3D shapes look out of place over a photo hero */}

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

      <SectionDivider />

      {/* Sleek Agency Directory (Open Roles) - Split Interactive Layout */}
      <section className="relative py-20 sm:py-32 bg-[#FAF9F6]">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Side: Sticky Image */}
            <div className="lg:sticky lg:top-32 relative h-[400px] lg:h-[700px] w-full rounded-[2.5rem] overflow-hidden group shadow-2xl border border-[rgba(16,29,43,0.1)]">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#101D2B]/90 via-[#101D2B]/20 to-transparent pointer-events-none" />

              <img
                src={aboutHero}
                alt="Sherize Workspace"
                className="w-full h-full object-cover transition-transform duration-[15000ms] group-hover:scale-110 ease-linear"
              />

              {/* Overlay Content */}
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <Reveal>
                  <h2 className="text-4xl sm:text-5xl font-display font-semibold tracking-tight text-white mb-4 leading-[1.1]">
                    Find Your <br />
                    <span className="text-gradient">Calling</span>.
                  </h2>
                  <p className="text-white/85 text-lg font-light leading-relaxed max-w-sm">
                    Join a team of driven, remote professionals building the future of digital services.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Right Side: Interactive List */}
            <div className="flex flex-col">
              <Reveal className="mb-10 lg:mb-12">
                <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-primary font-medium mb-4">
                  <span className="h-px w-8 bg-primary/50" />
                  Positions
                </span>
                <h3 className="text-3xl sm:text-4xl font-display font-semibold text-black tracking-tight">
                  Open Roles
                </h3>
              </Reveal>

              <div className="flex flex-col border-t border-[rgba(16,29,43,0.1)]">
                {opportunities.map((o, i) => {
                  const isActive = activeRole === i;
                  return (
                    <div
                      key={o.id || i}
                      onClick={() => setActiveRole(isActive ? null : i)}
                      onMouseEnter={() => setActiveRole(i)}
                      onMouseLeave={() => setActiveRole(null)}
                      className="group border-b border-[rgba(16,29,43,0.1)] transition-colors duration-500 hover:bg-white/60 cursor-pointer"
                    >
                      <Reveal delay={i * 50}>
                        <div className="px-2 sm:px-6 py-6 sm:py-8 flex flex-col justify-center">
                          {/* Persistent Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4 sm:gap-0">
                            <div className="flex items-center gap-4 sm:gap-6">
                              <span className={`text-sm font-medium tracking-widest transition-colors duration-500 ${isActive ? "text-primary" : "text-primary/70 group-hover:text-primary"}`}>
                                0{i + 1}
                              </span>
                              <h3 className={`text-xl sm:text-3xl font-display font-semibold transition-all duration-500 tracking-tight ${isActive ? "text-primary translate-x-2" : "text-black group-hover:text-primary group-hover:translate-x-2"}`}>
                                {o.title}
                              </h3>
                            </div>

                            <div className={`flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full transition-transform duration-500 self-start sm:self-auto shrink-0 ${isActive ? "scale-105" : "group-hover:scale-105"}`}>
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                              </span>
                              <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">
                                Hiring
                              </span>
                            </div>
                          </div>

                          {/* Expandable Content Area */}
                          <div className={`grid transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] w-full ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                            <div className="overflow-hidden">
                              <div className="pt-6 flex flex-col gap-6 items-start border-t border-[rgba(16,29,43,0.06)] mt-6">
                                <div className="flex items-start gap-4 w-full">
                                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary border border-primary/20 shadow-inner transition-all duration-700 delay-100 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                                    {(() => {
                                      const Icon = iconsMap[i % iconsMap.length];
                                      return <Icon className="h-5 w-5" />;
                                    })()}
                                  </span>
                                  <div className="flex flex-col flex-1">
                                    <p className={`whitespace-pre-wrap text-base text-[#101D2B] font-light leading-relaxed transition-all duration-700 delay-150 pt-1 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                                      {o.desc}
                                    </p>
                                  </div>
                                </div>

                                <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-200 shrink-0 self-start sm:self-end mt-4 ${isActive ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                                  <a
                                    href={(() => {
                                      const subject = encodeURIComponent(`Application for ${o.title}`);
                                      const body = encodeURIComponent(`Dear Hiring Manager,

I am writing to express my interest in the ${o.title} position at Sherize Solutions. 

Please find my contact information below and my resume attached for your review.

Name: [Your Name]
Phone: [Your Phone Number]
Email: [Your Email Address]
LinkedIn/Portfolio: [Optional Link]

Thank you for your time and consideration. I look forward to the possibility of discussing this exciting opportunity with you.

Sincerely,
[Your Name]`);
                                      
                                      if (!o.applyLink) return `https://mail.google.com/mail/?view=cm&fs=1&to=hr@sherize.com&su=${subject}&body=${body}`;
                                      
                                      const link = o.applyLink.trim();
                                      if (link.includes('@') && !link.startsWith('http')) {
                                        const cleanEmail = link.replace('mailto:', '');
                                        return `mailto:${cleanEmail}?subject=${subject}&body=${body}`;
                                      }
                                      
                                      if (!link.startsWith('http://') && !link.startsWith('https://')) return `https://${link}`;
                                      return link;
                                    })()}
                                    target={(!o.applyLink || (o.applyLink && !o.applyLink.includes('@') && !o.applyLink.startsWith('mailto:'))) ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
                                  >
                                    Apply Now <ArrowRight className="h-4 w-4" />
                                  </a>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    </Reveal>
            </div>
            );
                })}
          </div>
        </div>
      </div>
    </div>
      </section >

      <SectionDivider />

      {/* Cinematic "Why Join Us" Experience */}
      <CareersBenefits />

      <SectionDivider />

      <CTASection
        eyebrow="You belong here"
        title="Be Part of"
        highlight="Sherize"
        text="Your skills have value. Your talent deserves opportunity. Join Sherize to work from home, earn independently, build confidence, and grow with a supportive women-led community."
        actions={
          <>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-glow shine"
            >
              Join With Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-ghost-glass"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={socialLinks?.instagram || "https://www.instagram.com/sherize.solutions"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-ghost-glass group hover:border-pink-500/50 hover:bg-pink-500/10 transition-colors"
            >
              <Instagram className="h-4 w-4 text-pink-500 group-hover:scale-110 transition-transform" />
              <span className="text-white/80 group-hover:text-white transition-colors">Join for more updates</span>
            </a>
          </>
        }
      />
    </PageShell >
  );
}
