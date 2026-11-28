import { ArrowRight, Briefcase, Clock } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { DepthReveal } from "@/components/shared/DepthReveal";

const FEATURED_JOBS = [
  {
    title: "Frontend Developer",
    tags: ["Full-time", "React.js", "Frontend"],
    desc: "Develop responsive and interactive web applications using modern frontend technologies.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    title: "UI/UX Designer",
    tags: ["Full-time", "Design"],
    desc: "Create intuitive digital experiences through creative designs and user-focused interfaces.",
    skills: ["Figma", "Wireframing", "Prototyping"],
  },
  {
    title: "Digital Marketing Executive",
    tags: ["Full-time", "Marketing"],
    desc: "Help brands grow through digital campaigns, content strategies, and online engagement.",
    skills: ["SEO", "Social Media", "Content Marketing"],
  },
];

function buildApplyUrl(roleTitle) {
  const subject = encodeURIComponent(`Application for ${roleTitle}`);
  const body = encodeURIComponent(`Dear Hiring Manager,

I am writing to express my interest in the ${roleTitle} position at Sherize Solutions.

Name: [Your Name]
Phone: [Your Phone Number]
Email: [Your Email Address]
Portfolio / LinkedIn: [Optional Link]

Please find my resume attached for your review.

Sincerely,
[Your Name]`);

  return `https://mail.google.com/mail/?view=cm&fs=1&to=hr@sherize.com&su=${subject}&body=${body}`;
}

export function CareersOpportunitiesSection() {
  return (
    <section className="careers-jobs-section">
      <div className="careers-jobs-container">
        <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-[#D6A35B] font-semibold mb-4">
            <span className="h-px w-8 bg-[#D6A35B]/60" />
            Explore Career Opportunities
            <span className="h-px w-8 bg-[#D6A35B]/60" />
          </span>
          <KineticHeading
            as="h2"
            className="text-3xl sm:text-5xl font-display font-semibold tracking-tight text-[#101D2B] leading-tight"
          >
            Find Your Next <span className="text-gradient">Opportunity</span>.
          </KineticHeading>
          <p className="mt-4 text-base sm:text-lg text-[#4F789E] leading-relaxed max-w-2xl mx-auto">
            Explore exciting opportunities to work on innovative projects, develop your skills, and
            make an impact with our growing team.
          </p>
        </Reveal>

        <div className="careers-jobs-grid">
          {FEATURED_JOBS.map((job, idx) => (
            <DepthReveal key={job.title} delay={idx * 0.1}>
              <article className="careers-job-card">
                <div className="careers-job-card-top">
                  <div className="careers-job-icon">
                    <Briefcase className="w-5 h-5 text-[#1B8898]" />
                  </div>
                  <div className="careers-job-tags">
                    {job.tags.map((tag) => (
                      <span key={tag} className="careers-job-tag">
                        {tag === "Full-time" && <Clock className="w-3 h-3" />}
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="careers-job-title">{job.title}</h3>
                <p className="careers-job-desc">{job.desc}</p>

                <div className="careers-job-skills-wrap">
                  <span className="careers-job-skills-label">Skills:</span>
                  <div className="careers-job-skills">
                    {job.skills.map((skill) => (
                      <span key={skill} className="careers-job-skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={buildApplyUrl(job.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="careers-job-apply-btn"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </article>
            </DepthReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
