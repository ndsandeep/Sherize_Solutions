import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const EXTENDED_SERVICE_DETAILS = {
  "bpo-call-center": {
    eyebrow: "Customer Operations & Growth",
    title: "BPO / Call Center",
    tagline:
      "Reliable inbound/outbound telecalling, lead generation, and 24/7 customer support handled by trained professionals.",
    overview:
      "Sherize provides dedicated BPO and contact center operations designed to elevate customer satisfaction, accelerate outbound lead conversion, and keep your business responsive around the clock.",
    capabilities: [
      {
        title: "Inbound Customer Support",
        desc: "Empathetic, multi-channel query resolution, order tracking, and technical helpdesk assistance.",
      },
      {
        title: "Outbound Telecalling & Lead Gen",
        desc: "Targeted prospect outreach, appointment setting, and qualification pipelines with CRM logging.",
      },
      {
        title: "Quality Monitoring & Reporting",
        desc: "Call audits, CSAT tracking, and weekly performance analytics for continuous improvement.",
      },
      {
        title: "Flexible Dedicated Teams",
        desc: "Scale agent capacity effortlessly to match seasonal demand and campaign launches.",
      },
    ],
    deliverables: [
      "Trained Dedicated Agents",
      "Custom Call Scripts & Playbooks",
      "CRM Integration & Lead Tracking",
      "Daily & Weekly KPI Dashboards",
      "QA & Call Recording Audits",
    ],
  },
  "virtual-assistance": {
    eyebrow: "Operational Excellence",
    title: "Virtual Assistance",
    tagline:
      "Dedicated administrative support, data entry, email management, and operational assistance for your day-to-day business needs.",
    overview:
      "Free up your leadership and core teams by delegating recurring administrative, scheduling, research, and back-office workflows to trained Sherize virtual assistants.",
    capabilities: [
      {
        title: "Executive & Inbox Management",
        desc: "Calendar coordination, inbox triage, meeting prep, and timely client follow-ups.",
      },
      {
        title: "Data Entry & CRM Hygiene",
        desc: "Accurate spreadsheet management, database updates, and structured document organization.",
      },
      {
        title: "Research & Reporting",
        desc: "Market research, competitor benchmarking, and concise executive summaries.",
      },
      {
        title: "Back-Office Operations",
        desc: "Invoice tracking, vendor coordination, and day-to-day workflow administration.",
      },
    ],
    deliverables: [
      "Dedicated Virtual Assistant",
      "Structured Daily Task Reporting",
      "Clean & Updated CRM/Spreadsheets",
      "Standard Operating Procedures (SOPs)",
      "Seamless Time-Zone Coverage",
    ],
  },
};

export function ServicesDetailView({ service, slug }) {
  const preset = EXTENDED_SERVICE_DETAILS[slug];
  const title = preset?.title || service?.title || "Service Overview";
  const eyebrow = preset?.eyebrow || "Sherize Specialized Service";
  const tagline =
    preset?.tagline ||
    service?.desc ||
    "End-to-end digital and operational solutions tailored for your business growth.";
  const overview =
    preset?.overview ||
    `${service?.desc || ""} Our team combines domain expertise, agile execution, and transparent communication to deliver measurable results.`;
  const capabilities = preset?.capabilities || [
    {
      title: "Tailored Strategy & Discovery",
      desc: "Aligning workflows, goals, and technical requirements to your exact business objectives.",
    },
    {
      title: "Dedicated Execution Team",
      desc: "Experienced specialists working seamlessly as an extension of your organization.",
    },
    {
      title: "Quality & Performance Focus",
      desc: "Continuous optimization, testing, and clear reporting at every milestone.",
    },
    {
      title: "Ongoing Support & Scaling",
      desc: "Reliable post-launch maintenance and flexible scaling as your business grows.",
    },
  ];
  const deliverables = preset?.deliverables || [
    "Custom Execution Roadmap",
    "Dedicated Project Support",
    "Transparent Milestone Updates",
    "Quality Assurance & Review",
  ];
  const heroImage =
    service?.img ||
    "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="services-detail-page">
      {/* Detail Hero */}
      <section className="services-detail-hero">
        <img src={heroImage} alt={title} className="services-detail-hero-img" />
        <div className="services-detail-hero-overlay" />
        <div className="services-detail-hero-inner">
          <Link to="/services" className="services-detail-back">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="services-detail-eyebrow">{eyebrow}</span>
            <h1 className="services-detail-title">{title}</h1>
            <p className="services-detail-tagline">{tagline}</p>
            <div className="services-detail-hero-actions">
              <Link to="/contact" className="services-detail-cta-primary">
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview & Capabilities */}
      <section className="services-detail-body">
        <div className="services-detail-container">
          <div className="services-detail-overview-card">
            <span className="services-detail-section-label">
              <Sparkles className="w-4 h-4 text-[#D6A35B]" /> Overview
            </span>
            <p className="services-detail-overview-text">{overview}</p>
          </div>

          <div className="services-detail-grid">
            <div className="services-detail-capabilities">
              <h2 className="services-detail-h2">Key Capabilities</h2>
              <div className="services-detail-cap-grid">
                {capabilities.map((cap) => (
                  <div key={cap.title} className="services-detail-cap-card">
                    <h3>{cap.title}</h3>
                    <p>{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="services-detail-deliverables">
              <h2 className="services-detail-h2">What You Get</h2>
              <ul className="services-detail-deliv-list">
                {deliverables.map((item) => (
                  <li key={item}>
                    <CheckCircle2 className="w-4 h-4 text-[#D6A35B] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="services-detail-cta-secondary">
                <span>Get Started with {title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
