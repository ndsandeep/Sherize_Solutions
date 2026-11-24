import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { FaGooglePlay } from "react-icons/fa";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { Magnetic } from "@/components/shared/Magnetic";

export function HeroContent() {
  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
        className="flex flex-col items-center text-center mx-auto"
      >
        <KineticHeading
          as="h1"
          delay={0.15}
          className="font-display font-semibold text-3xl sm:text-5xl lg:text-[4.75rem] leading-[1.1] tracking-tight text-white mb-4 sm:mb-6 text-center"
        >
          We Build <span className="text-gradient">What's Next.</span>
        </KineticHeading>

        <motion.p variants={item} className="text-sm sm:text-xl text-white/80 max-w-2xl mb-3 sm:mb-4 leading-relaxed text-center px-2">
          From intelligent software to immersive digital experiences, Sherize transforms ideas into
          scalable technology.
        </motion.p>

        <motion.p variants={item} className="text-xs sm:text-base text-[#D6A35B] font-medium max-w-xl mb-8 sm:mb-10 leading-relaxed text-center px-2">
          Empowering businesses. Empowering women. Everywhere.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Magnetic>
            <Link
              to="/services"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm sm:text-base font-semibold bg-[#167D8D] text-white hover:bg-[#126875] shadow-[0_10px_25px_-5px_rgba(22,125,141,0.5)] transition-all duration-300"
            >
              Explore Our Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>

          <Link
            to="/contact"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm sm:text-base font-medium border border-[#D6A35B]/70 text-[#D6A35B] hover:bg-[#D6A35B] hover:text-[#101D2B] transition-all duration-300 shadow-sm"
          >
            Start a Project
            <ChevronRight className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>

          <a
            href="https://play.google.com/store/apps/details?id=in.sherize.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm sm:text-base font-semibold bg-[#167D8D] text-white hover:bg-[#126875] transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(22,125,141,0.5)] border border-[#167D8D]"
          >
            <FaGooglePlay className="h-4 w-4 text-[#00E676]" />
            Sherize BPO App
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
