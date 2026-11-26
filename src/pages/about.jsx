import { WaveDivider } from "@/components/shared/WaveDivider";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { PageShell, CTASection } from "@/components/layout/PageShell";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutStory } from "@/components/sections/AboutStory";
import { InfinityStory } from "@/components/sections/InfinityStory";
import { LeadershipCards } from "@/components/sections/LeadershipCards";
import { BackButton } from "@/components/layout/BackButton";

function SectionDivider() {
  return <WaveDivider />;
}

export default function AboutPage() {
  return (
    <PageShell>
      <BackButton />

      {/* Massive Cinematic Hero */}
      <AboutHero />

      {/* Pinned, scroll-driven storytelling with the 3D infinity symbol */}
      <InfinityStory />

      <SectionDivider />

      {/* Interactive Our Story Section */}
      <AboutStory />

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
