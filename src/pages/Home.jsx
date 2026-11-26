import { CinematicHero } from "@/components/sections/Hero/CinematicHero";
import CinematicCorridor from "@/components/three/CinematicCorridor";
import "@/components/three/CinematicCorridor.css";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { HomeEmpowerment } from "@/components/sections/HomeEmpowerment";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { HomeWhyChoose } from "@/components/sections/HomeWhyChoose";
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
        <HomeEmpowerment />
        <SectionDivider />
        <HomeWhyChoose />
        <SectionDivider />
        <OrbCTA />
      </PageShell>
    </>
  );
}
