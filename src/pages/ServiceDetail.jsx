import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  Code2,
  Compass,
  TrendingUp,
} from "lucide-react";
import { PageShell, CTASection } from "@/components/layout/PageShell";
import { BackButton } from "@/components/layout/BackButton";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { DepthReveal } from "@/components/shared/DepthReveal";
import { Tilt3D } from "@/components/shared/Tilt3D";
import { Parallax } from "@/components/shared/Parallax";
import { getServiceBySlug, getRelatedServices } from "@/config/servicesMenu";

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = getServiceBySlug(slug);
  const related = getRelatedServices(slug, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <PageShell>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-[#0D1B28] text-white">
          <h1 className="text-4xl font-display font-semibold mb-4">Service Not Found</h1>
          <p className="text-white/70 mb-8 max-w-md">
            The service you are looking for doesn't exist or has moved. Explore all our services below.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Helmet>
        <title>{`${service.title} | Sherize Solutions`}</title>
        <meta name="description" content={service.overview} />
        <link rel="canonical" href={`https://sherize.in/services/${service.slug}`} />
      </Helmet>

      <BackButton />

      {/* Cinematic Hero */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden bg-[#0D1B28]">
        <Parallax className="absolute inset-0 z-0" amount={6}>
          <img
            src={service.heroImage}
            alt={service.title}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-[#0D1B28]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B] via-[#0D1B28]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B28]/90 via-transparent to-transparent" />
        </Parallax>

        <div className="w-full max-w-[1280px] mx-auto px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-white/60 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/40" />
            <Link to="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/40" />
            <span className="text-[#D6A35B]">{service.category}</span>
          </div>

          <Reveal>
            <span className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.25em] text-[#D6A35B] font-semibold mb-6">
              <span className="h-px w-8 sm:w-12 bg-[#D6A35B]/50" />
              {service.eyebrow}
              <span className="h-px w-8 sm:w-12 bg-[#D6A35B]/50" />
            </span>

            <KineticHeading
              as="h1"
              delay={0.15}
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold tracking-tighter leading-[1.02] mb-6 text-white max-w-4xl"
            >
              {service.title}
            </KineticHeading>

            <p className="text-lg sm:text-xl text-white/85 leading-relaxed font-light max-w-2xl mb-8">
              {service.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact#form"
                className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold btn-glow text-white shadow-xl"
              >
                Start Your Project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium border border-white/20 text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Back to All Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview & Key Deliverables */}
      <section className="relative py-20 sm:py-28 bg-[#FAF9F6]">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7">
              <Reveal>
                <span className="text-xs uppercase tracking-[0.2em] text-[#D6A35B] font-semibold block mb-3">
                  Capabilities & Scope
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-black tracking-tight leading-tight mb-6">
                  Engineered for excellence in{" "}
                  <span className="text-gradient">{service.title}</span>
                </h2>
                <p className="text-base sm:text-lg text-[#101D2B] leading-relaxed mb-6 font-normal">
                  {service.overview}
                </p>
              </Reveal>

              {/* Deliverables Checklist */}
              <div className="mt-8 pt-8 border-t border-[rgba(16,29,43,0.1)]">
                <h3 className="text-sm uppercase tracking-widest text-[#4F789E] font-semibold mb-5">
                  Key Deliverables
                </h3>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  {service.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[rgba(16,29,43,0.08)] shadow-sm"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-[#101D2B]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Capabilities Cards */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm uppercase tracking-widest text-[#4F789E] font-semibold mb-2">
                Core Competencies
              </h3>
              {service.capabilities.map((cap, i) => (
                <DepthReveal key={cap.title} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl bg-white border border-[rgba(16,29,43,0.09)] shadow-soft hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <h4 className="font-display text-base font-semibold text-black">
                        {cap.title}
                      </h4>
                    </div>
                    <p className="text-sm text-[#4F789E] leading-relaxed font-light pl-5">
                      {cap.desc}
                    </p>
                  </div>
                </DepthReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Delivery Process */}
      <section className="relative py-20 sm:py-28 bg-[#101D2B] text-white">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D6A35B] font-semibold mb-4">
              <span className="h-px w-8 bg-[#D6A35B]/60" />
              Our Methodology
              <span className="h-px w-8 bg-[#D6A35B]/60" />
            </span>
            <KineticHeading
              as="h2"
              className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-white leading-tight"
            >
              How We Deliver <span className="text-gradient">Measurable Results</span>
            </KineticHeading>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <DepthReveal key={step.step} delay={idx * 0.1}>
                <div className="h-full p-7 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-primary/50 hover:bg-white/[0.07] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <span className="font-display text-3xl font-bold text-[#D6A35B] mb-4 block">
                      {step.step}
                    </span>
                    <h4 className="font-display text-lg font-semibold text-white mb-2.5">
                      {step.title}
                    </h4>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </DepthReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack & Business Benefits */}
      <section className="relative py-20 sm:py-28 bg-[#FAF9F6]">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Benefits */}
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D6A35B] font-semibold block mb-3">
                Strategic Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-semibold text-black tracking-tight leading-tight mb-8">
                Why partner with Sherize for {service.title}?
              </h2>
              <div className="space-y-4">
                {service.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[rgba(16,29,43,0.08)] shadow-sm"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-0.5">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <p className="text-sm sm:text-base text-[#101D2B] leading-relaxed font-normal">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-[rgba(16,29,43,0.1)] shadow-soft">
              <span className="text-xs uppercase tracking-widest text-[#4F789E] font-semibold block mb-3">
                Modern Tooling & Stack
              </span>
              <h3 className="font-display text-2xl font-semibold text-black mb-6">
                Technologies We Leverage
              </h3>
              <p className="text-sm text-[#4F789E] leading-relaxed mb-6">
                We utilize battle-tested, modern enterprise frameworks and toolkits to guarantee stability, security, and scalability.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF9F6] text-[#101D2B] border border-[rgba(16,29,43,0.12)] hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services in Category */}
      {related.length > 0 && (
        <section className="relative py-16 sm:py-24 bg-[#FAF9F6] border-t border-[rgba(16,29,43,0.08)]">
          <div className="w-full max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#D6A35B] font-semibold block mb-2">
                  Explore More
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-semibold text-black tracking-tight">
                  Related in {service.category}
                </h2>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Tilt3D key={rel.slug} className="h-full rounded-2xl">
                  <div className="h-full p-6 rounded-2xl bg-white border border-[rgba(16,29,43,0.1)] shadow-soft hover:border-primary/50 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#D6A35B] font-semibold mb-2 block">
                        {rel.eyebrow}
                      </span>
                      <h4 className="font-display text-lg font-semibold text-black mb-2">
                        {rel.title}
                      </h4>
                      <p className="text-sm text-[#4F789E] leading-relaxed line-clamp-3 mb-6">
                        {rel.tagline}
                      </p>
                    </div>
                    <Link
                      to={`/services/${rel.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                    >
                      View Service Details <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </Tilt3D>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTASection
        eyebrow="Start Today"
        title="Ready to Scale With"
        highlight={service.title}
        text={`Partner with Sherize Solutions to accelerate your ${service.title.toLowerCase()} goals with vetted talent, modern technology, and reliable delivery.`}
        actions={
          <>
            <Link
              to="/contact#form"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold btn-glow text-white shadow-xl"
            >
              Consult With Our Experts <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              Browse Other Services
            </Link>
          </>
        }
      />
    </PageShell>
  );
}
