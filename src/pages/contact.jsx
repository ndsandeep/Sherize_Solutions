import { useState, useEffect } from "react";
import { Phone, Mail, Instagram, Send, ArrowRight, Sparkles, MessageCircle, MapPin } from "lucide-react";
import { PageShell, PageHero, CTASection } from "@/components/layout/PageShell";
import { toast } from "sonner";
import { BackButton } from "@/components/layout/BackButton";
import { motion } from "framer-motion";
import { Tilt3D } from "@/components/shared/Tilt3D";
import { DepthReveal } from "@/components/shared/DepthReveal";
import contactBg from "@/assets/images/contact-bg.jpg";
import { dataService } from "@/services/dataService";

export default function ContactPage() {
  const [sending, setSending] = useState(false);
  const [contact, setContact] = useState({
    email: "", phone: "", address: "", instagram: "", whatsapp: "", facebook: "", linkedin: ""
  });

  useEffect(() => {
    const loadData = () => setContact({ ...dataService.getContact(), ...dataService.getSocial() });
    loadData();

    window.addEventListener("sherize_data_updated", loadData);
    return () => window.removeEventListener("sherize_data_updated", loadData);
  }, []);

  const contacts = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: contact.phone,
      href: contact.whatsapp,
    },
    {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: MapPin,
      label: "Address",
      value: contact.address || "India",
      href: contact.mapUrl || "https://maps.app.goo.gl/DgGVjhvx31cUVycM9",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@sherize.solutions",
      href: contact.instagram,
    },
  ];

  const onSubmit = (e) => {
    e.preventDefault();

    setSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const subject = formData.get("subject");
    const message = formData.get("message");

    const whatsappMessage = `
🌟 New Contact Form Submission - Sherize

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
📌 Subject: ${subject}

💬 Message:
${message}
`;

    const whatsappUrl = `https://wa.me/917672073746?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      setSending(false);
      window.open(whatsappUrl, "_blank");
      toast.success("Opening WhatsApp...");
      form.reset();
    }, 500);
  };

  return (
    <PageShell>
      {/* Animated Handshake Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <motion.img
          src={contactBg}
          alt="Handshake Partnership"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 0.4 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B28]/20 via-[#0D1B28]/60 to-[#FAF9F6]" />
      </div>

      <div className="relative z-10">
        <BackButton />
        <PageHero
          eyebrow="Get in touch"
          title="Let's Connect With"
          highlight="Sherize"
          subtitle="Have a project, business inquiry, partnership idea, or want to work with us? We'd love to hear from you."
          scene="contact"
        />

        <section className="relative py-16 bg-[#FAF9F6]">
          <div className="w-full max-w-[1280px] mx-auto px-6 grid lg:grid-cols-12 gap-8">
            {/* Contact cards */}
            <div className="lg:col-span-5 space-y-4">
              {contacts.map((c, i) => (
                <DepthReveal key={c.label} delay={i * 0.08} y={40} rotate={6}>
                <Tilt3D max={7} className="rounded-2xl">
                <a
                  href={c.href}
                  target={c.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group block rounded-2xl p-6 bg-white border border-[rgba(16,29,43,0.1)] shadow-soft transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-wider text-[#4F789E]">
                        {c.label}
                      </div>
                      <div className="mt-1 font-semibold text-black truncate">{c.value}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto text-[#4F789E] group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
                </Tilt3D>
                </DepthReveal>
              ))}

              <div className="relative rounded-2xl p-6 overflow-hidden bg-white border border-[rgba(16,29,43,0.1)] shadow-sm">
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                />

                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-black">Remote-first · India</div>
                    <div className="text-xs text-[#4F789E]">
                      We respond within 24 business hours.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              id="form"
              onSubmit={onSubmit}
              className="lg:col-span-7 relative rounded-[2rem] p-8 sm:p-10 overflow-hidden bg-white border border-[rgba(16,29,43,0.1)] shadow-soft"
            >
              <span className="relative inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary font-semibold">
                <span className="h-px w-8 bg-primary" /> Send a message
              </span>
              <h2 className="relative mt-3 text-2xl sm:text-3xl font-semibold text-black">
                Tell us about your <span className="text-gradient">project</span>
              </h2>

              <div className="relative mt-8 grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" name="name" type="text" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone Number" name="phone" type="tel" />
                <Field label="Subject" name="subject" type="text" required />
              </div>

              <div className="relative mt-4 group">
                <label className="block text-xs uppercase tracking-wider text-[#4F789E] mb-2 group-focus-within:text-primary transition-colors">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Share a few details about what you need…"
                  className="w-full bg-[#FAF9F6] border border-[rgba(16,29,43,0.12)] text-[#101D2B] rounded-xl px-4 py-3 text-sm outline-none placeholder:text-[#8C9BA8] focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="relative mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-glow shine disabled:opacity-70"
              >
                {sending ? "Sending…" : "Send Message"} <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>

        {/* Map Embed Box */}
        <section className="relative pb-0 sm:py-4 sm:pb-16 bg-[#FAF9F6]">
          <div className="w-full max-w-[1280px] mx-auto sm:px-6">
            <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-xl border border-[rgba(16,29,43,0.1)] w-full h-[350px] sm:h-[400px]">
              <iframe
                title="Google Maps Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(contact.address || "Hyderabad, Telangana")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 z-0"
              />
            </div>
          </div>
        </section>

        <CTASection
          eyebrow="Together is better"
          title="Let's Build"
          highlight="Together"
          text="Whether you're a business looking for digital solutions or someone looking to grow with Sherize, we're here to connect, collaborate, and create opportunities together."
          actions={
            <>
              <a
                href="mailto:info@sherize.in"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-glow shine"
              >
                Email Us <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:7672073746"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium btn-ghost-glass"
              >
                Call Now <Phone className="h-4 w-4" />
              </a>
            </>
          }
        />
      </div>
    </PageShell>
  );
}

export function Field({ label, name, type, required }) {
  return (
    <div className="group">
      <label className="block text-xs uppercase tracking-wider text-[#4F789E] mb-2 group-focus-within:text-primary transition-colors">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={label}
        className="w-full bg-[#FAF9F6] border border-[rgba(16,29,43,0.12)] text-[#101D2B] rounded-xl px-4 py-3 text-sm outline-none placeholder:text-[#8C9BA8] focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300"
      />
    </div>
  );
}

