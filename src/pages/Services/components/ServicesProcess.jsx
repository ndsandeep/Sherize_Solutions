import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  ClipboardList,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { TrueFocus } from "./TrueFocus";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover",
    short: "Research, goals & technical audit",
    desc: "We immerse ourselves in your business objectives, target audience, and market landscape to uncover high-impact opportunities.",
    icon: Compass,
    tag: "Phase 01 • Discovery",
    deliverables: ["Stakeholder Alignment", "Market & UX Research", "Technical Audit"],
  },
  {
    num: "02",
    title: "Plan",
    short: "Architecture, roadmap & milestones",
    desc: "We translate insights into a crystal-clear execution blueprint, sprint schedule, and scalable system architecture.",
    icon: ClipboardList,
    tag: "Phase 02 • Strategy",
    deliverables: ["System Blueprint", "Sprint Roadmap", "Resource Planning"],
  },
  {
    num: "03",
    title: "Design",
    short: "UI/UX, design systems & prototypes",
    desc: "Our designers craft intuitive user journeys, modern visual systems, and interactive prototypes built to convert.",
    icon: Palette,
    tag: "Phase 03 • Experience",
    deliverables: ["Wireframes & Flows", "Brand Design System", "Interactive Prototype"],
  },
  {
    num: "04",
    title: "Develop",
    short: "Clean code, APIs & integrations",
    desc: "Our engineers build fast, modular, production-ready applications with modern frameworks and seamless integrations.",
    icon: Code2,
    tag: "Phase 04 • Engineering",
    deliverables: ["Frontend & Backend", "API Integrations", "CI/CD Automation"],
  },
  {
    num: "05",
    title: "Test",
    short: "QA, security & speed optimization",
    desc: "Every feature undergoes rigorous automated and manual testing across devices for zero defects and peak performance.",
    icon: ShieldCheck,
    tag: "Phase 05 • Quality",
    deliverables: ["Cross-Device QA", "Security Hardening", "Speed Benchmarks"],
  },
  {
    num: "06",
    title: "Launch & Support",
    short: "Deployment, monitoring & scaling",
    desc: "We execute a smooth zero-downtime launch and provide proactive monitoring, updates, and dedicated ongoing support.",
    icon: Rocket,
    tag: "Phase 06 • Growth",
    deliverables: ["Zero-Downtime Launch", "Live Telemetry", "24/7 Dedicated Support"],
  },
];

const STEP_DURATION_MS = 3200;

export function ServicesProcess() {
  const [activeStep, setActiveStep] = useState(0);

  // Automatic continuous progression
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, STEP_DURATION_MS);
    return () => clearInterval(timer);
  }, []);

  const current = PROCESS_STEPS[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section className="services-process-section">
      {/* Subtle Ambient Glows */}
      <div className="services-process-bg-glow services-process-glow-left" aria-hidden="true" />
      <div className="services-process-bg-glow services-process-glow-right" aria-hidden="true" />

      <div className="services-process-container">
        {/* Header with TrueFocus */}
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
            A streamlined, transparent workflow that automatically guides every project from initial vision to scalable launch.
          </p>
        </motion.div>

        {/* Best-UI Split Showcase: Left Step Rail + Right Glass Detail Stage */}
        <div className="services-ui-layout">
          {/* Left: Clean Editorial Step List with Stagger & Active Motion */}
          <div className="services-ui-rail">
            {PROCESS_STEPS.map((step, index) => {
              const isActive = activeStep === index;
              const isDone = index < activeStep;

              return (
                <motion.button
                  key={step.num}
                  type="button"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  animate={{
                    x: isActive ? 8 : 0,
                    scale: isActive ? 1.015 : 1,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setActiveStep(index)}
                  className={`services-ui-step-row ${isActive ? "is-active" : ""} ${
                    isDone ? "is-done" : ""
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="servicesUiActivePill"
                      className="services-ui-step-bg"
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    />
                  )}

                  <div className="services-ui-step-content">
                    <span className="services-ui-step-num">{step.num}</span>
                    <div className="services-ui-step-meta">
                      <span className="services-ui-step-title">{step.title}</span>
                      <span className="services-ui-step-short">{step.short}</span>
                    </div>
                    <span className="services-ui-step-indicator">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-[#4ad4e8]" />
                      ) : isActive ? (
                        <span className="services-ui-live-dot" />
                      ) : null}
                    </span>
                  </div>

                  {/* Thin auto-progress bar on the active row */}
                  {isActive && (
                    <motion.div
                      key={`rail-bar-${step.num}`}
                      className="services-ui-step-progress"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: STEP_DURATION_MS / 1000, ease: "linear" }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right: High-Craft Glass Showcase Card */}
          <div className="services-ui-stage-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.num}
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.985 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="services-ui-stage-card"
              >
                {/* Giant Subtle Watermark Number */}
                <span className="services-ui-watermark" aria-hidden="true">
                  {current.num}
                </span>

                <div className="services-ui-stage-top">
                  <div className="services-ui-icon-badge">
                    <CurrentIcon className="w-6 h-6 text-[#D6A35B]" />
                  </div>
                </div>

                <h3 className="services-ui-stage-title">
                  {current.num}. {current.title}
                </h3>

                <p className="services-ui-stage-desc">{current.desc}</p>

                <div className="services-ui-deliverables-block">
                  <span className="services-ui-deliverables-label">Key Deliverables</span>
                  <div className="services-ui-deliverables-list">
                    {current.deliverables.map((item, idx) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + idx * 0.08, duration: 0.3 }}
                        className="services-ui-deliverable-chip"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A35B] shrink-0" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom Step Dots */}
                <div className="services-ui-stage-footer">
                  <span className="services-ui-step-counter">
                    Step {activeStep + 1} of {PROCESS_STEPS.length}
                  </span>
                  <div className="services-ui-dots">
                    {PROCESS_STEPS.map((s, idx) => (
                      <span
                        key={s.num}
                        className={`services-ui-dot ${idx === activeStep ? "is-active" : ""}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
