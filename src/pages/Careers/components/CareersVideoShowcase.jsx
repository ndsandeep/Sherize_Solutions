import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import logoVid from "../assets/logovid.mp4";

export function CareersVideoShowcase() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="careers-video-section">
      <div className="careers-video-container">
        {/* Top Row: ~80% Very Big Video + ~20% Intro Text Beside It */}
        <div className="careers-video-top-grid">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="careers-video-frame"
          >
            <video
              ref={videoRef}
              src={logoVid}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="careers-video-player"
            />
            <div className="careers-video-overlay-gradient" aria-hidden="true" />
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="careers-video-sound-btn"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isMuted ? "Unmute" : "Sound On"}</span>
            </button>
          </motion.div>

          {/* Beside Video (~20% width): Concise Intro */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="careers-video-beside"
          >
            <span className="careers-story-eyebrow">About Sherize Solutions Pvt. Ltd.</span>
            <h2 className="careers-story-title">
              Empowering Women.{" "}
              <span className="careers-story-highlight">Engineering Growth.</span>
            </h2>
            <p className="careers-story-beside-text">
              Sherize Solutions Private Limited is a Hyderabad-based IT, digital solutions, and BPO
              company founded in June 2026 by Vijayalakshmi Maddiboyina and Datti Madhuri.
              Operating with a dual mission, Sherize delivers end-to-end digital services to
              businesses while providing flexible, remote-first career opportunities specifically
              designed to empower women.
            </p>
          </motion.div>
        </div>

        {/* Below Video: Full Content Displayed Normally (No Cards, Thick & Bold) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="careers-story-full-body"
        >
          <div className="careers-story-block">
            <h3 className="careers-story-section-heading">
              1. Founding &amp; Incorporation (June 2026)
            </h3>
            <p className="careers-story-paragraph">
              <strong className="careers-story-bold-lead">Origins &amp; Vision:</strong> After
              completing a BTech in Computer Science with Artificial Intelligence (2021–2025) and a
              technical internship, Vijayalakshmi Maddiboyina established the company in June 2026.
              She envisioned a platform where geography or personal circumstances would not limit
              female professionals from building strong technology and operational careers.
            </p>
            <p className="careers-story-paragraph">
              <strong className="careers-story-bold-lead">Corporate Registration:</strong> Legally
              incorporated on June 27, 2026, under the Registrar of Companies (ROC) in Hyderabad,
              the company was registered with an authorized share capital of ₹10 lakh and a paid-up
              capital of ₹1 lakh.
            </p>
            <p className="careers-story-paragraph">
              <strong className="careers-story-bold-lead">Leadership Team:</strong> Alongside CEO
              &amp; Founder Vijayalakshmi Maddiboyina, the founding leadership team includes Datti
              Madhuri (Co-Founder &amp; Director), Veda Samhitha Telaganeni (HR), and Indhu Katari
              (Operations Manager).
            </p>
          </div>

          <div className="careers-story-block">
            <h3 className="careers-story-section-heading">
              2. Business Model &amp; Service Expansion
            </h3>
            <p className="careers-story-paragraph">
              Operating across both B2B and B2C segments, Sherize Solutions structured its business
              to bridge startup-friendly digital delivery with a vetted remote workforce.
            </p>
            <p className="careers-story-paragraph">
              <strong className="careers-story-bold-lead">Technology &amp; Design:</strong> The
              company expanded its portfolio to include custom website development, scalable SaaS
              web applications, native and cross-platform (Flutter) mobile app development,
              e-commerce solutions, and UI/UX design.
            </p>
            <p className="careers-story-paragraph">
              <strong className="careers-story-bold-lead">Growth &amp; Operations:</strong> Beyond
              software, Sherize built out digital marketing, branding, inbound/outbound BPO call
              center support, and virtual assistance services.
            </p>
            <p className="careers-story-paragraph">
              <strong className="careers-story-bold-lead">Industry Reach:</strong> Its solutions
              serve businesses across e-commerce, healthcare, education, fintech, and on-demand
              service sectors.
            </p>
          </div>

          <div className="careers-story-block">
            <h3 className="careers-story-section-heading">
              3. Platform &amp; Community Growth (Mid-to-Late 2026)
            </h3>
            <p className="careers-story-paragraph">
              <strong className="careers-story-bold-lead">Digital Ecosystem:</strong> To manage its
              distributed workforce and client projects seamlessly, the company launched dedicated
              portals for admins, clients, employees, and team leaders alongside the Sherize mobile
              app on the Google Play Store.
            </p>
            <p className="careers-story-paragraph">
              <strong className="careers-story-bold-lead">Footprint in Hyderabad:</strong> While
              initially registered in Bandlaguda / Nagole, the company established an operational
              office presence in Hitech City (Kothaguda), Hyderabad.
            </p>
            <p className="careers-story-paragraph">
              <strong className="careers-story-bold-lead">Workforce Recruitment:</strong> Throughout
              the second half of 2026, Sherize actively scaled its remote talent pool, recruiting
              women across India for work-from-home customer care, telecalling, and digital roles.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
