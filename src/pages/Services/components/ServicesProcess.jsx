import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Compass, ClipboardList, Palette, Code2, ShieldCheck, Rocket } from "lucide-react";
import { TrueFocus } from "./TrueFocus";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "Deep-dive into your business goals, user needs, market landscape, and technical requirements.",
    icon: Compass,
    tag: "Research & Audit",
  },
  {
    num: "02",
    title: "Plan",
    desc: "Architecting a clear roadmap, milestones, resource strategy, and scalable system blueprint.",
    icon: ClipboardList,
    tag: "Strategy & Roadmap",
  },
  {
    num: "03",
    title: "Design",
    desc: "Crafting intuitive interfaces, interactive prototypes, and cohesive brand experiences.",
    icon: Palette,
    tag: "UI/UX & Prototyping",
  },
  {
    num: "04",
    title: "Develop",
    desc: "Engineering clean, high-performance code with agile sprints and modular architecture.",
    icon: Code2,
    tag: "Build & Integrate",
  },
  {
    num: "05",
    title: "Test",
    desc: "Rigorous automated and manual QA across devices for security, speed, and zero defects.",
    icon: ShieldCheck,
    tag: "Quality Assurance",
  },
  {
    num: "06",
    title: "Launch & Support",
    desc: "Seamless deployment, performance monitoring, and dedicated ongoing optimization.",
    icon: Rocket,
    tag: "Deploy & Scale",
  },
];

export function ServicesProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isPaused]);

  const progressPercent = (activeStep / (PROCESS_STEPS.length - 1)) * 100;

  return (
    <section
      className="services-process-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Ambient Background Glows */}
      <div className="services-process-bg-glow services-process-glow-left" aria-hidden="true" />
      <div className="services-process-bg-glow services-process-glow-right" aria-hidden="true" />

      <div className="services-process-container">
        {/* Heading with React Bits TrueFocus */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="services-process-header"
        >
          <span className="services-process-eyebrow">How We Deliver Excellence</span>
          <TrueFocus
            sentence="OUR PROCESS"
            borderColor="#D6A35B"
            glowColor="rgba(214, 163, 91, 0.55)"
            blurAmount={3.5}
            animationDuration={0.5}
            pauseBetweenAnimations={1.3}
          />
          <p className="services-process-subtitle">
            A structured, transparent workflow engineered to take your idea from initial concept to scalable launch.
          </p>
        </motion.div>

        {/* Animated Progress Track (Desktop) */}
        <div className="services-process-track-wrap" aria-hidden="true">
          <div className="services-process-track-bg" />
          <motion.div
            className="services-process-track-fill"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* 6 Animated Step Cards */}
        <div className="services-process-grid">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            const isCompleted = index < activeStep;

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setActiveStep(index)}
                onMouseEnter={() => setActiveStep(index)}
                className={`services-process-card ${isActive ? "is-active" : ""} ${
                  isCompleted ? "is-completed" : ""
                }`}
              >
                {/* Animated active border glow */}
                {isActive && (
                  <motion.div
                    layoutId="servicesProcessActiveGlow"
                    className="services-process-card-glow"
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  />
                )}

                <div className="services-process-card-inner">
                  {/* Top Row: Step Number + Animated Icon */}
                  <div className="services-process-card-top">
                    <span className="services-process-step-num">{step.num}.</span>
                    <motion.div
                      animate={
                        isActive
                          ? { scale: [1, 1.12, 1], rotate: [0, 6, -6, 0] }
                          : { scale: 1, rotate: 0 }
                      }
                      transition={{
                        duration: 1.8,
                        repeat: isActive ? Infinity : 0,
                        repeatDelay: 0.8,
                      }}
                      className="services-process-icon-box"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Step Tag */}
                  <span className="services-process-step-tag">{step.tag}</span>

                  {/* Step Title */}
                  <h3 className="services-process-step-title">{step.title}</h3>

                  {/* Step Description */}
                  <p className="services-process-step-desc">{step.desc}</p>

                  {/* Bottom Animated Progress Bar inside card */}
                  <div className="services-process-card-bar">
                    <motion.div
                      className="services-process-card-bar-fill"
                      initial={false}
                      animate={{ width: isActive ? "100%" : isCompleted ? "100%" : "0%" }}
                      transition={{ duration: isActive && !isPaused ? 3.1 : 0.4, ease: "linear" }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
