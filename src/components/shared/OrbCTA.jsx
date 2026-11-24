import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { Magnetic } from "@/components/shared/Magnetic";
import { Tilt3D } from "@/components/shared/Tilt3D";

export function OrbCTA() {
  return (
    <section className="relative py-20 bg-[#FAF9F6]">
      <div className="w-full max-w-[1100px] mx-auto px-6">
        <Reveal>
          <Tilt3D max={3} lift={1.005} className="rounded-[1.75rem]">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-[rgba(16,29,43,0.1)] bg-[#FAF9F6] px-6 py-16 sm:py-20 text-center shadow-soft">
              {/* Clean background without floating 3D objects */}
              <div className="relative z-10 flex flex-col items-center">
                <KineticHeading as="h2" className="text-4xl sm:text-6xl font-display font-semibold tracking-tight leading-tight text-black">
                  Let's Build <span className="text-gradient">Together</span>
                </KineticHeading>

                <p className="mt-4 text-base sm:text-lg text-[#4F789E] font-light max-w-xl mx-auto">
                  Partner with Sherize for modern software development, design, and dedicated business support.
                </p>

                <Magnetic className="mt-8">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-sm sm:text-base btn-glow shadow-lg"
                  >
                    Start a Project <ArrowRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </Tilt3D>
        </Reveal>
      </div>
    </section>
  );
}
