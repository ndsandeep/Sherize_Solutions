import { CinematicHero } from "@/components/sections/Hero/CinematicHero";
import CinematicCorridor from "@/components/three/CinematicCorridor";
import "@/components/three/CinematicCorridor.css";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { Empowerment } from "@/components/sections/Empowerment";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { CoreCapabilitiesCards } from "@/components/sections/CoreCapabilitiesCards";
import { OrbCTA } from "@/components/shared/OrbCTA";
import { ServiceMarquee } from "@/components/sections/ServiceMarquee";
import { PageShell } from "@/components/layout/PageShell";

function SectionDivider() {
  return <WaveDivider />;
}

export default function Index() {
  return (
    <>
      <CinematicCorridor>
        <CinematicHero />
      </CinematicCorridor>
      <PageShell>
        <ServiceMarquee />
        <SectionDivider />
        <WhoWeAre />
        <SectionDivider />
        <CoreCapabilitiesCards />
        <SectionDivider />
        <Empowerment />
        <SectionDivider />
        <WhyChoose />
        <SectionDivider />
        <OrbCTA />
      </PageShell>
    </>
  );
}
