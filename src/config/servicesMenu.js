// Single source of truth for the Services mega menu (navbar), category cards, and individual service detail pages.

export const SERVICES_MENU = [
  {
    title: "Software Development",
    slug: "software-development",
    tagline: "High-performance code, scalable architectures, and modern digital engineering.",
    eyebrow: "CORE ENGINEERING",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    items: [
      { name: "Enterprise Software Development", slug: "enterprise-software-development" },
      { name: "Website Development", slug: "website-development" },
      { name: "Mobile App Development", slug: "mobile-app-development" },
      { name: "Application Development", slug: "application-development" },
      { name: "E-commerce", slug: "e-commerce" },
      { name: "Testing & QA", slug: "testing-qa" },
    ],
  },
  {
    title: "Design & Digital",
    slug: "design-digital",
    tagline: "Human-centric experience design, user research, and intuitive product aesthetics.",
    eyebrow: "EXPERIENCE ARCHITECTURE",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    items: [
      { name: "CX & DX Solutions", slug: "cx-dx-solutions" },
      { name: "UI/UX Design Company", slug: "ui-ux-design-company" },
      { name: "Web Design Services", slug: "web-design-services" },
    ],
  },
  {
    title: "Digital & Branding",
    slug: "digital-branding",
    tagline: "Data-driven marketing, brand equity acceleration, and multi-channel engagement.",
    eyebrow: "GROWTH & IDENTITY",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    items: [
      { name: "Digital Marketing Services", slug: "digital-marketing-services" },
      { name: "SEO Services", slug: "seo-services" },
      { name: "Pay-Per-Click Advertising", slug: "pay-per-click-advertising" },
      { name: "Content Marketing Services", slug: "content-marketing-services" },
      { name: "Email Marketing Services", slug: "email-marketing-services" },
      { name: "Influencer Partnerships", slug: "influencer-partnerships" },
      { name: "Social Media Marketing", slug: "social-media-marketing" },
    ],
  },
];

export const SERVICE_ROUTE = "/services";

export const SERVICES_DATA = {
  // 1. Enterprise Software Development
  "enterprise-software-development": {
    title: "Enterprise Software Development",
    slug: "enterprise-software-development",
    category: "Software Development",
    categorySlug: "software-development",
    eyebrow: "Enterprise Engineering",
    tagline: "Mission-critical architectures engineered for security, high throughput, and organizational scale.",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    overview: "Sherize delivers custom enterprise software systems that modernize legacy workflows, eliminate operational bottlenecks, and unify disparate enterprise platforms. We build resilient, fault-tolerant solutions tailored to institutional requirements.",
    capabilities: [
      { title: "Distributed System Architecture", desc: "Microservices and cloud-native backends engineered to support hundreds of thousands of concurrent transactions." },
      { title: "Legacy System Modernization", desc: "Seamless migration of dated monoliths to modular, API-driven architectures with zero downtime." },
      { title: "Enterprise Integrations", desc: "Custom connectors for ERPs, CRMs (SAP, Salesforce), payment gateways, and custom third-party APIs." },
      { title: "Enterprise Grade Security", desc: "Role-based access control (RBAC), end-to-end data encryption, audit trails, and strict compliance alignment." },
    ],
    deliverables: ["Custom Software Blueprint", "Scalable Microservices Backends", "Enterprise API Gateways", "Automated CI/CD Pipelines", "Comprehensive System Documentation"],
    process: [
      { step: "01", title: "Enterprise Audit", desc: "Evaluating current software ecosystem, data flows, and security constraints." },
      { step: "02", title: "Architecture Design", desc: "Defining service boundaries, database schemas, and microservice topologies." },
      { step: "03", title: "Agile Development", desc: "Iterative sprint execution with continuous code reviews and test coverage." },
      { step: "04", title: "Deployment & SLAs", desc: "Zero-downtime release accompanied by 24/7 enterprise maintenance SLAs." },
    ],
    benefits: [
      "99.99% operational uptime guarantee with resilient failover nodes.",
      "Reduced operational overhead by automating complex manual workflows.",
      "Complete code ownership and modular intellectual property.",
      "Strict data privacy and ISO/SOC-aligned architecture standards."
    ],
    technologies: ["Node.js", "Python / Django", "Go", "Java Spring Boot", "PostgreSQL", "Docker", "Kubernetes", "AWS"]
  },

  // 2. Website Development
  "website-development": {
    title: "Website Development",
    slug: "website-development",
    category: "Software Development",
    categorySlug: "software-development",
    eyebrow: "Digital Engineering",
    tagline: "Ultra-fast, responsive, and conversion-optimized websites built for high-growth modern brands.",
    heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    overview: "We engineer lightning-fast digital storefronts and corporate websites that merge captivating visual aesthetics with top-tier performance metrics. Every site is designed to engage visitors, reflect your brand authority, and turn traffic into qualified pipeline.",
    capabilities: [
      { title: "Modern Jamstack & SSR", desc: "Harnessing React, Next.js, and Vite for blazing fast load times and superior Core Web Vitals." },
      { title: "Headless CMS Integration", desc: "Empowering content teams with intuitive, headless publishing tools like Strapi, Sanity, and WordPress REST." },
      { title: "SEO-First Codebase", desc: "Structured semantic HTML, dynamic OpenGraph meta protocols, and rapid indexing architecture." },
      { title: "Responsive Cross-Platform UI", desc: "Pixel-perfect visual harmony across smartphones, tablets, laptops, and ultra-wide displays." },
    ],
    deliverables: ["Custom Responsive Website", "Headless CMS Admin Setup", "SEO Optimization Suite", "Speed & Performance Audit", "Analytics & Tracking Setup"],
    process: [
      { step: "01", title: "Discovery & Sizing", desc: "Reviewing brand guidelines, competitive landscape, and conversion priorities." },
      { step: "02", title: "Wireframing & Prototype", desc: "Structuring user journeys, key landing templates, and content hierarchy." },
      { step: "03", title: "Code & Optimization", desc: "Developing with clean, maintainable modular components and sub-second asset loaders." },
      { step: "04", title: "Launch & Validation", desc: "Cross-browser regression testing, SSL configuration, and domain handover." },
    ],
    benefits: [
      "Sub-second page load speeds achieving 95+ Google Lighthouse scores.",
      "Seamless content updates without needing ongoing developer assistance.",
      "Mobile-first responsive UX tailored to convert mobile visitors.",
      "Enterprise security headers and hardened SSL encryption."
    ],
    technologies: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "Vite", "Sanity.io", "GraphQL", "Vercel"]
  },

  // 3. Mobile App Development
  "mobile-app-development": {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    category: "Software Development",
    categorySlug: "software-development",
    eyebrow: "Mobile Systems",
    tagline: "Intuitive, high-performance iOS and Android applications crafted for maximum retention.",
    heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    overview: "From concept to App Store and Google Play publication, Sherize builds fluid mobile apps that deliver native-like speeds and tactile responsiveness. We engineer apps that users love opening every day.",
    capabilities: [
      { title: "Cross-Platform Frameworks", desc: "Single codebase efficiency using React Native and Flutter without sacrificing 60fps animations." },
      { title: "Native iOS & Android", desc: "Swift, Kotlin, and platform-specific capabilities such as Biometrics, Bluetooth, and Geofencing." },
      { title: "Real-time Sync & Offline Mode", desc: "Instant data synchronization, push notifications, and resilient offline local storage." },
      { title: "Store Submission & Compliance", desc: "Complete handling of Apple App Store Review guidelines and Google Play compliance." },
    ],
    deliverables: ["iOS & Android Build Binaries", "Backend Cloud APIs", "Push Notification Gateway", "Store Listing Optimization", "Source Code & Keys Handover"],
    process: [
      { step: "01", title: "Product Blueprint", desc: "Feature roadmapping, UX interaction wireframes, and tech stack validation." },
      { step: "02", title: "Interactive Prototype", desc: "High-fidelity clickable designs capturing micro-interactions and user flows." },
      { step: "03", title: "App Engineering", desc: "Continuous integration builds tested across multiple real device viewports." },
      { step: "04", title: "Store Deployment", desc: "Guaranteed publication approval on Google Play Store and Apple App Store." },
    ],
    benefits: [
      "Up to 40% cost and time reduction via modern cross-platform development.",
      "Flawless 60 FPS user interface with delightful micro-animations.",
      "Deep integration with push notifications for 3x higher user retention.",
      "Guaranteed store approval and post-launch versioning support."
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Redux Toolkit", "REST / GraphQL"]
  },

  // 4. Application Development
  "application-development": {
    title: "Application Development",
    slug: "application-development",
    category: "Software Development",
    categorySlug: "software-development",
    eyebrow: "Cloud & Web Apps",
    tagline: "Custom SaaS platforms, internal business tools, and customer-facing web applications.",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    overview: "Sherize engineers sophisticated web applications with complex business logic, multi-tenant databases, real-time analytics, and role-based access. Whether building an MVP or a scalable SaaS product, we accelerate your time-to-market.",
    capabilities: [
      { title: "Custom SaaS Engineering", desc: "Multi-tenant cloud platforms with subscription billing, team invites, and tiered permissioning." },
      { title: "Interactive Dashboards", desc: "Data visualization suites with dynamic filtering, live chart rendering, and automated reporting." },
      { title: "Workflow Automation Tools", desc: "Internal software tailored to replace manual spreadsheets and error-prone procedures." },
      { title: "Real-time WebSockets", desc: "Collaborative multi-user experiences, live updates, messaging, and event broadcasting." },
    ],
    deliverables: ["Full-Stack Web Application", "Relational / NoSQL Database", "Authentication & Billing Layer", "Admin Dashboard & Control Panel", "API Documentation"],
    process: [
      { step: "01", title: "Architecture Mapping", desc: "Mapping entity models, state management pipelines, and cloud hosting design." },
      { step: "02", title: "Rapid MVP Sprint", desc: "Delivering core functional features for early stakeholder validation." },
      { step: "03", title: "Hardening & Scale", desc: "Optimizing database queries, caching layers, and security audits." },
      { step: "04", title: "Deployment & Training", desc: "Production cloud provisioning and team onboarding walkthroughs." },
    ],
    benefits: [
      "Accelerated time-to-market with modular, production-tested components.",
      "Seamless horizontal scaling handling traffic spikes gracefully.",
      "Automated subscription billing and customer tier management.",
      "Intuitive UI that cuts employee training time in half."
    ],
    technologies: ["React", "Node.js", "Express", "Next.js", "PostgreSQL", "MongoDB", "Redis", "Stripe API"]
  },

  // 5. E-commerce
  "e-commerce": {
    title: "E-commerce Solutions",
    slug: "e-commerce",
    category: "Software Development",
    categorySlug: "software-development",
    eyebrow: "Digital Commerce",
    tagline: "Scalable digital storefronts engineered for smooth checkout, high conversion, and inventory agility.",
    heroImage: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=2070&auto=format&fit=crop",
    overview: "We design and build online stores that turn casual browsers into repeat buyers. From high-converting headless Shopify setups to custom multi-vendor marketplaces, we handle product catalogs, secure payment gateways, and logistics integrations.",
    capabilities: [
      { title: "Custom Checkout & Payments", desc: "Frictionless one-click checkouts supporting Stripe, PayPal, Razorpay, Apple Pay, and COD." },
      { title: "Inventory & ERP Sync", desc: "Real-time stock level synchronization, automated re-ordering alerts, and warehouse hooks." },
      { title: "Conversion Optimization", desc: "Intelligent product recommendations, abandoned cart recovery, and upsell funnels." },
      { title: "Omnichannel Architecture", desc: "Unified catalog management across web, mobile apps, Instagram Shop, and marketplaces." },
    ],
    deliverables: ["Fully Configured Storefront", "Payment Gateway Integration", "Inventory & Order Management", "Mobile-Optimized Checkout", "Marketing Pixels & Tracking"],
    process: [
      { step: "01", title: "Catalog & Logic Analysis", desc: "Determining product variants, shipping rules, tax calculations, and localized currencies." },
      { step: "02", title: "Store UX Design", desc: "Creating immersive product detail pages, clear filtering, and frictionless cart flows." },
      { step: "03", title: "Integration & Testing", desc: "Connecting payment providers, webhook listeners, and testing end-to-end transactions." },
      { step: "04", title: "Launch & Monitoring", desc: "Going live with active analytics monitoring and conversion tracking." },
    ],
    benefits: [
      "Reduced checkout abandonment rates with frictionless 3-step checkout flows.",
      "Instant synchronization across inventories to avoid overselling.",
      "Rock-solid security ensuring PCI-DSS compliance and buyer protection.",
      "Automated customer retention sequences for higher lifetime value."
    ],
    technologies: ["Shopify / Liquid", "WooCommerce", "Next.js Commerce", "Stripe", "Razorpay", "Tailwind CSS"]
  },

  // 6. Testing & QA
  "testing-qa": {
    title: "Testing & QA Services",
    slug: "testing-qa",
    category: "Software Development",
    categorySlug: "software-development",
    eyebrow: "Quality Engineering",
    tagline: "Rigorous automated and manual quality assurance ensuring zero defect releases.",
    heroImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop",
    overview: "Never let bugs degrade your brand reputation. Sherize offers end-to-end quality assurance services spanning automated regression suites, load testing, security vulnerability audits, and multi-device manual testing.",
    capabilities: [
      { title: "Automated Regression Suites", desc: "Continuous end-to-end automated testing with Cypress, Playwright, and Selenium." },
      { title: "Performance & Stress Testing", desc: "Simulating heavy traffic spikes to verify server resilience and database indexing." },
      { title: "Cross-Device Verification", desc: "Validating visual fidelity and functionality across 50+ real device and browser configurations." },
      { title: "Security Vulnerability Audits", desc: "Detecting SQL injections, XSS vulnerabilities, broken authentication, and exposed endpoints." },
    ],
    deliverables: ["QA Strategy & Test Matrix", "Automated Test Scripts", "Defect Tracking Reports", "Performance Load Test Benchmarks", "Security Compliance Sign-off"],
    process: [
      { step: "01", title: "Test Plan Definition", desc: "Drafting user test cases, boundary scenarios, and critical paths." },
      { step: "02", title: "Automation Scripting", desc: "Writing resilient, self-healing automated test scripts tied into CI/CD." },
      { step: "03", title: "Execution & Bug Triage", desc: "Executing tests, documenting reproduction steps, and verifying fixes." },
      { step: "04", title: "Release Certification", desc: "Final regression pass and green-light deployment approval." },
    ],
    benefits: [
      "90% reduction in production regressions and post-release hotfixes.",
      "Rapid deployment confidence with automated tests running on every pull request.",
      "Verified cross-browser and cross-device consistency.",
      "Protection against security vulnerabilities before malicious exploitation."
    ],
    technologies: ["Playwright", "Cypress", "Selenium", "Jest", "Postman", "JMeter", "GitHub Actions"]
  },

  // 7. CX & DX Solutions
  "cx-dx-solutions": {
    title: "CX & DX Solutions",
    slug: "cx-dx-solutions",
    category: "Design & Digital",
    categorySlug: "design-digital",
    eyebrow: "Customer Experience",
    tagline: "Unifying customer and digital touchpoints into seamless, delight-driven brand journeys.",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    overview: "Customer Experience (CX) and Digital Experience (DX) are the true differentiators in today's crowded market. Sherize audits and orchestrates every interaction your customers have with your brand, removing friction and building long-term emotional loyalty.",
    capabilities: [
      { title: "End-to-End Journey Mapping", desc: "Identifying every customer touchpoint from first discovery to post-purchase support." },
      { title: "Digital Touchpoint Modernization", desc: "Redesigning portals, mobile touchpoints, and self-service knowledge centers." },
      { title: "Omnichannel Personalization", desc: "Delivering contextual messaging and tailored user experiences across platforms." },
      { title: "Customer Voice & Feedback Loops", desc: "Real-time NPS, CSAT tracking, and sentiment analysis to iterate rapidly." },
    ],
    deliverables: ["Customer Journey Maps", "Digital Experience Blueprint", "Touchpoint Friction Audit", "Personalization Strategy Guide", "CX Metric Tracking Framework"],
    process: [
      { step: "01", title: "Experience Audit", desc: "Evaluating current customer drop-offs, pain points, and support inquiries." },
      { step: "02", title: "Journey Architecture", desc: "Redesigning ideal paths to satisfaction with minimal friction." },
      { step: "03", title: "Implementation Support", desc: "Aligning product, design, and customer care workflows." },
      { step: "04", title: "Metric Review", desc: "Tracking Net Promoter Score (NPS) and customer lifetime value improvements." },
    ],
    benefits: [
      "Significant boost in customer satisfaction (CSAT) and lifetime brand loyalty.",
      "Lower support ticket volumes via intuitive self-service touchpoints.",
      "Consistent, recognizable brand tone across every digital channel.",
      "Clear visibility into where customer churn occurs and how to fix it."
    ],
    technologies: ["Figma", "Miro", "Hotjar", "Google Analytics 4", "Zendesk", "HubSpot"]
  },

  // 8. UI/UX Design Company
  "ui-ux-design-company": {
    title: "UI/UX Design Services",
    slug: "ui-ux-design-company",
    category: "Design & Digital",
    categorySlug: "design-digital",
    eyebrow: "Product Design",
    tagline: "World-class interface design that transforms complex software into effortless user experiences.",
    heroImage: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
    overview: "Great design is not just how something looks—it is how it works. Our UI/UX design team crafts bespoke design systems, wireframes, and interactive prototypes backed by cognitive user research and aesthetic precision.",
    capabilities: [
      { title: "User Research & Personas", desc: "Deep qualitative interviews and usability heuristics to clarify core user motivations." },
      { title: "Design System Architecture", desc: "Reusable component libraries with typography, tokenized colors, and interactive states in Figma." },
      { title: "Interactive High-Fi Prototypes", desc: "Clickable prototypes simulating exact animations, transitions, and product feel." },
      { title: "Accessibility (WCAG) Compliance", desc: "Designing for contrast, keyboard navigation, and inclusivity across all abilities." },
    ],
    deliverables: ["Figma Design System", "Interactive Clickable Prototypes", "User Persona & Heuristic Report", "Developer Handover Specs", "Iconography & Vector Assets"],
    process: [
      { step: "01", title: "User Discovery", desc: "Interviews, competitor analysis, and establishing user journey goals." },
      { step: "02", title: "Low-Fi Wireframes", desc: "Structuring screen layouts, interaction flows, and spatial relationships." },
      { step: "03", title: "Visual Design & Tokens", desc: "Applying brand color schemes, micro-interactions, and responsive layouts." },
      { step: "04", title: "Dev Handoff", desc: "Pixel-perfect specifications, inspectable tokens, and asset exports." },
    ],
    benefits: [
      "Up to 200% improvement in user task completion rates and conversion.",
      "Streamlined developer velocity with unified Figma design tokens.",
      "Modern, polished visual identity that creates immediate user trust.",
      "Future-proof design system that grows effortlessly with your product."
    ],
    technologies: ["Figma", "Adobe XD", "Tokens Studio", "Principle", "Lottie", "FigJam"]
  },

  // 9. Web Design Services
  "web-design-services": {
    title: "Web Design Services",
    slug: "web-design-services",
    category: "Design & Digital",
    categorySlug: "design-digital",
    eyebrow: "Creative Web Design",
    tagline: "Stunning, brand-aligned visual designs that captivate attention and drive engagement.",
    heroImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    overview: "Your website is your company's virtual headquarters. We create bespoke visual designs that convey premium brand equity, tell your narrative with elegance, and make an unforgettable first impression on prospective clients.",
    capabilities: [
      { title: "Bespoke Visual Concepting", desc: "Tailored visual directions that avoid generic templates and set your brand apart." },
      { title: "Responsive Layout Crafting", desc: "Harmonious visual scaling from ultra-high-definition screens down to handheld devices." },
      { title: "Micro-Interactions & Motion", desc: "Subtle hover states, page transition cues, and tactile responsiveness." },
      { title: "Landing Page Optimization", desc: "High-impact conversion layouts designed specifically for ad campaigns and launches." },
    ],
    deliverables: ["Full Visual Web Design Files", "Mobile & Tablet Mockups", "Interactive Prototype Link", "Brand Style Guide Documentation", "Exported High-Res Graphic Assets"],
    process: [
      { step: "01", title: "Creative Brief", desc: "Aligning on mood boards, typographic hierarchy, and visual inspirations." },
      { step: "02", title: "Concept Exploration", desc: "Presenting distinct visual styles for key hero and narrative sections." },
      { step: "03", title: "Full Page System", desc: "Designing all internal templates, headers, footers, and state changes." },
      { step: "04", title: "Design Sign-off", desc: "Final polish, responsive checks, and preparation for frontend developers." },
    ],
    benefits: [
      "Standout visual presence that positions your company as an industry leader.",
      "Significantly reduced bounce rates with engaging above-the-fold design.",
      "Clean visual hierarchy guiding visitors effortlessly toward conversion.",
      "Seamless alignment with your offline and corporate brand materials."
    ],
    technologies: ["Figma", "Illustrator", "Photoshop", "After Effects", "Spline 3D"]
  },

  // 10. Digital Marketing Services
  "digital-marketing-services": {
    title: "Digital Marketing Services",
    slug: "digital-marketing-services",
    category: "Digital & Branding",
    categorySlug: "digital-branding",
    eyebrow: "Growth Marketing",
    tagline: "Full-funnel digital marketing strategies that generate qualified demand and measurable ROI.",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    overview: "Sherize connects your solutions with high-intent audiences. Combining technical analytics with creative campaigns, we build sustainable customer acquisition funnels that scale your business predictably.",
    capabilities: [
      { title: "Full-Funnel Strategy", desc: "Integrating awareness, consideration, acquisition, and retention campaigns." },
      { title: "Audience Segmentation", desc: "Pinpointing high-value target demographics and tailoring resonant messaging." },
      { title: "Multi-Channel Orchestration", desc: "Synchronizing paid search, social media, email, and content distribution." },
      { title: "Performance Analytics & ROI", desc: "Transparent real-time dashboards tracking customer acquisition cost (CAC) and LTV." },
    ],
    deliverables: ["Comprehensive Marketing Strategy", "Custom Performance Dashboard", "Multi-Channel Campaign Calendar", "A/B Testing Framework", "Bi-weekly ROI Reports"],
    process: [
      { step: "01", title: "Market & Data Audit", desc: "Analyzing historical marketing performance, competitors, and customer persona data." },
      { step: "02", title: "Growth Architecture", desc: "Selecting high-yield channels, defining budgets, and setting key metric goals." },
      { step: "03", title: "Campaign Execution", desc: "Launching creative assets, optimizing copy, and deploying conversion tracking." },
      { step: "04", title: "Scale & Refine", desc: "Iterating based on live conversion data to maximize return on ad spend." },
    ],
    benefits: [
      "Predictable pipeline generation and transparent cost-per-lead tracking.",
      "Lower acquisition costs through rigorous multivariate ad testing.",
      "Holistic cross-channel presence reaching prospects wherever they spend time.",
      "Dedicated marketing team delivering proactive optimization insights."
    ],
    technologies: ["Google Ads", "Meta Ads Manager", "LinkedIn Campaign Manager", "HubSpot", "Google Analytics 4", "Looker Studio"]
  },

  // 11. SEO Services
  "seo-services": {
    title: "Search Engine Optimization (SEO)",
    slug: "seo-services",
    category: "Digital & Branding",
    categorySlug: "digital-branding",
    eyebrow: "Organic Visibility",
    tagline: "Dominate Google search results and attract sustainable, high-converting organic traffic.",
    heroImage: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?q=80&w=2080&auto=format&fit=crop",
    overview: "Organic search is the most valuable long-term customer acquisition channel. Sherize provides holistic technical, on-page, and authority SEO that elevates your domain authority, secures top rankings, and drives qualified inbound leads.",
    capabilities: [
      { title: "Technical SEO Audits", desc: "Fixing crawl errors, schema markup, site speed, canonical tags, and indexation issues." },
      { title: "Keyword Intelligence", desc: "Uncovering commercial-intent search terms with high conversion likelihood." },
      { title: "High-Authority Link Building", desc: "Securing white-hat backlinks from reputable industry publications to build domain rating." },
      { title: "On-Page Content Optimization", desc: "Restructuring headings, internal links, and semantic depth to outrank competitors." },
    ],
    deliverables: ["Technical SEO Health Audit", "Keyword Strategy Matrix", "On-Page Optimization Blueprint", "Monthly Backlink Report", "Rank Tracking Dashboard"],
    process: [
      { step: "01", title: "Technical Audit", desc: "Identifying site architecture flaws, speed bottlenecks, and crawling obstacles." },
      { step: "02", title: "Keyword Architecture", desc: "Mapping primary and secondary target keywords to specific site landing pages." },
      { step: "03", title: "On-Page & Content Push", desc: "Optimizing content depth, metadata, schema markup, and internal linking." },
      { step: "04", title: "Authority Growth", desc: "Executing ethical digital PR campaigns to secure authoritative editorial backlinks." },
    ],
    benefits: [
      "Sustainable organic traffic that reduces reliance on expensive paid advertising.",
      "Top Google rankings for high-intent, industry-defining search queries.",
      "Enhanced site speed and mobile usability that boosts overall user engagement.",
      "Measurable month-over-month growth in organic impressions and conversions."
    ],
    technologies: ["Ahrefs", "Semrush", "Google Search Console", "Screaming Frog", "Schema.org", "Yoast / RankMath"]
  },

  // 12. Pay-Per-Click Advertising
  "pay-per-click-advertising": {
    title: "Pay-Per-Click Advertising (PPC)",
    slug: "pay-per-click-advertising",
    category: "Digital & Branding",
    categorySlug: "digital-branding",
    eyebrow: "Paid Media",
    tagline: "Laser-targeted paid search and display campaigns designed to maximize return on ad spend.",
    heroImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
    overview: "Generate immediate revenue and high-value leads with meticulously managed paid media campaigns. We optimize Google Search, Display, LinkedIn Ads, and YouTube Ads to ensure every marketing dollar spent generates tangible returns.",
    capabilities: [
      { title: "Google Search & Shopping Ads", desc: "Bidding on high-intent transactional search queries to capture active buyers." },
      { title: "Retargeting & Remarketing", desc: "Re-engaging visitors who showed interest with persuasive personalized ad creatives." },
      { title: "Ad Copy & Creative Testing", desc: "Continuous split-testing of headlines, descriptions, extensions, and visuals." },
      { title: "Conversion Rate Optimization (CRO)", desc: "Aligning dedicated landing pages with ad copy to maximize form fills and sales." },
    ],
    deliverables: ["PPC Account Architecture", "Custom Negative Keyword Library", "High-Converting Ad Copy Variations", "Pixel & Server-Side Tracking Setup", "Weekly ROAS Reporting"],
    process: [
      { step: "01", title: "Audience & Competitor Research", desc: "Analyzing competitor bids, ad spend, and high-conversion target keywords." },
      { step: "02", title: "Campaign Structuring", desc: "Setting up single-theme ad groups, geo-targeting, and bid caps." },
      { step: "03", title: "Launch & Monitoring", desc: "Deploying campaigns with active dayparting and bid adjustments." },
      { step: "04", title: "Continuous Optimization", desc: "Pruning underperforming terms, testing new ad variants, and scaling winners." },
    ],
    benefits: [
      "Immediate surge in qualified leads and revenue upon campaign launch.",
      "Total control over daily budget, geographical radius, and cost-per-click.",
      "Comprehensive attribution tracking showing exact revenue generated per ad.",
      "Higher Quality Scores that lower your cost-per-click compared to competitors."
    ],
    technologies: ["Google Ads", "Google Tag Manager", "Microsoft Advertising", "LinkedIn Ads", "Unbounce"]
  },

  // 13. Content Marketing Services
  "content-marketing-services": {
    title: "Content Marketing Services",
    slug: "content-marketing-services",
    category: "Digital & Branding",
    categorySlug: "digital-branding",
    eyebrow: "Editorial & Strategy",
    tagline: "Thought leadership, high-value editorial content, and storytelling that turns readers into advocates.",
    heroImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073&auto=format&fit=crop",
    overview: "Authority is built through consistent, insightful content. Sherize crafts comprehensive articles, whitepapers, case studies, and corporate guides that establish your executive leadership, nurture prospects, and fuel your organic growth.",
    capabilities: [
      { title: "Content Strategy & Editorial Calendar", desc: "Aligning content themes with customer journey stages and key business priorities." },
      { title: "In-Depth Thought Leadership", desc: "Original research, industry analysis, and opinion pieces that get shared across networks." },
      { title: "Case Studies & Social Proof", desc: "Transforming client success stories into persuasive narrative assets that close deals." },
      { title: "Multi-Format Repurposing", desc: "Turning cornerstone articles into infographics, carousel slides, and newsletter bites." },
    ],
    deliverables: ["Quarterly Editorial Calendar", "Long-Form Thought Leadership Articles", "Downloadable Whitepapers & Guides", "Client Case Studies", "Content Distribution Playbook"],
    process: [
      { step: "01", title: "Topic Ideation", desc: "Interviewing subject matter experts and mining customer questions for topics." },
      { step: "02", title: "Research & Drafting", desc: "Crafting articulate, data-backed drafts with actionable takeaways." },
      { step: "03", title: "Design & Formatting", desc: "Enhancing written content with custom diagrams, quote callouts, and visuals." },
      { step: "04", title: "Distribution & Amplification", desc: "Sharing across email newsletters, LinkedIn, and syndication partners." },
    ],
    benefits: [
      "Positions your founders and executives as trusted authorities in your space.",
      "Generates continuous organic backlinks and social shares.",
      "Nurtures prospects through long sales cycles with educational assets.",
      "Creates evergreen marketing collateral usable by your sales team."
    ],
    technologies: ["Notion", "Grammarly Business", "WordPress", "Medium", "Canva", "Google Docs"]
  },

  // 14. Email Marketing Services
  "email-marketing-services": {
    title: "Email Marketing & Automation",
    slug: "email-marketing-services",
    category: "Digital & Branding",
    categorySlug: "digital-branding",
    eyebrow: "Retention & Lifecycle",
    tagline: "Automated nurture sequences, personalized newsletters, and retention workflows that drive revenue.",
    heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    overview: "Email remains the highest-ROI digital marketing channel. We design automated customer journeys, welcome series, cart abandonment nudges, and editorial newsletters that engage your subscribers and reliably trigger purchases.",
    capabilities: [
      { title: "Automated Lifecycle Flows", desc: "Welcome sequences, onboarding drip campaigns, re-engagement nudges, and win-back emails." },
      { title: "Audience Segmentation & Tags", desc: "Targeting messages based on user behavior, past purchases, and engagement history." },
      { title: "Bespoke Responsive Templates", desc: "Custom-designed HTML email templates verified across all desktop and mobile email clients." },
      { title: "Deliverability Optimization", desc: "Configuring SPF, DKIM, and DMARC records to protect domain reputation and inbox placement." },
    ],
    deliverables: ["Automated Flow Blueprints", "Custom Branded Email Templates", "Segmented Subscriber Database", "A/B Subject Line Test Reports", "Deliverability Health Check"],
    process: [
      { step: "01", title: "Deliverability Audit", desc: "Verifying domain authentication, bounce rates, and spam score health." },
      { step: "02", title: "Sequence Architecture", desc: "Mapping trigger conditions, delays, and conversion goals for each email flow." },
      { step: "03", title: "Copywriting & Template Build", desc: "Writing compelling copy and assembling modular, responsive email components." },
      { step: "04", title: "Testing & Send", desc: "Testing inbox rendering across Apple Mail, Gmail, and Outlook before broadcast." },
    ],
    benefits: [
      "Industry-leading 38:1 average return on investment for retention campaigns.",
      "Predictable recurring revenue from automated sequences that run on autopilot.",
      "Stronger brand affinity through regular, value-packed newsletter dispatches.",
      "Clean inbox placement avoiding the dreaded promotions or spam tabs."
    ],
    technologies: ["Klaviyo", "Mailchimp", "ActiveCampaign", "HubSpot", "Brevo", "SendGrid"]
  },

  // 15. Influencer Partnerships
  "influencer-partnerships": {
    title: "Influencer Partnerships",
    slug: "influencer-partnerships",
    category: "Digital & Branding",
    categorySlug: "digital-branding",
    eyebrow: "Advocacy & PR",
    tagline: "Authentic creator partnerships that amplify brand credibility, reach, and social proof.",
    heroImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
    overview: "Modern consumers trust people over logos. Sherize manages end-to-end influencer campaigns—from creator vetting and negotiation to creative brief alignment and tracking—connecting your brand with genuine creators who command audience trust.",
    capabilities: [
      { title: "Creator Discovery & Vetting", desc: "Auditing audience demographics, fake follower ratios, and engagement authenticity." },
      { title: "Contract Negotiation & Rights", desc: "Managing talent agreements, usage rights, deliverable timelines, and FTC compliance." },
      { title: "Creative Campaign Briefs", desc: "Providing clear creative parameters while preserving the creator's authentic tone." },
      { title: "Attribution & Affiliate Tracking", desc: "Deploying unique UTM links, promo codes, and landing pages to measure campaign ROI." },
    ],
    deliverables: ["Vetted Creator Roster", "Campaign Creative Briefs", "Executed Talent Agreements", "High-Resolution Sponsored Content", "Post-Campaign Performance Analysis"],
    process: [
      { step: "01", title: "Persona Matchmaking", desc: "Identifying creators whose audience perfectly matches your ideal customer profile." },
      { step: "02", title: "Outreach & Terms", desc: "Securing talent partnerships with transparent deliverables and timeline agreements." },
      { step: "03", title: "Review & Publication", desc: "Reviewing drafts for brand guidelines before coordinated public release." },
      { step: "04", title: "Amplification & Reporting", desc: "Whitelisting top creator posts with paid ads and measuring conversion results." },
    ],
    benefits: [
      "Instant social proof and credibility through respected third-party voices.",
      "High-engagement content assets that can be repurposed across your own marketing.",
      "Direct reach into niche, engaged communities that traditional ads struggle to access.",
      "Transparent conversion tracking identifying your most profitable creator partners."
    ],
    technologies: ["Modash", "GRIN", "Instagram", "YouTube", "TikTok", "LinkedIn", "Trackonomics"]
  },

  // 16. Social Media Marketing
  "social-media-marketing": {
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    category: "Digital & Branding",
    categorySlug: "digital-branding",
    eyebrow: "Social Growth",
    tagline: "Engaging social content, community management, and brand momentum across major platforms.",
    heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop",
    overview: "Build an active, loyal community around your brand. We manage your presence across LinkedIn, Instagram, X (Twitter), and Facebook with scroll-stopping creative visuals, trend-conscious copywriting, and proactive community engagement.",
    capabilities: [
      { title: "Channel Strategy & Positioning", desc: "Defining tone of voice, visual pillars, and platform-specific content cadence." },
      { title: "Creative Production & Design", desc: "Crafting custom graphics, video reels, carousel guides, and compelling captions." },
      { title: "Active Community Management", desc: "Replying to comments, initiating discussions, and monitoring brand mentions in real time." },
      { title: "Social Listening & Trends", desc: "Tracking industry conversations and capitalizing on relevant cultural moments." },
    ],
    deliverables: ["Monthly Social Content Calendar", "Bespoke Graphics & Short-Form Videos", "Community Engagement Playbook", "Hashtag & Tagging Strategy", "Monthly Engagement Analytics Report"],
    process: [
      { step: "01", title: "Brand Voice Audit", desc: "Defining brand persona, visual aesthetic rules, and community guidelines." },
      { step: "02", title: "Content Batching", desc: "Producing high-impact graphics, carousels, and copy for monthly scheduling." },
      { step: "03", title: "Scheduled Publishing", desc: "Deploying posts at peak audience engagement windows." },
      { step: "04", title: "Community Conversation", desc: "Actively engaging with followers to transform audiences into brand advocates." },
    ],
    benefits: [
      "Vibrant social channels that reassure prospective buyers that your company is thriving.",
      "Increased organic reach and viral potential with timely short-form content.",
      "Direct channel for customer feedback, support, and community building.",
      "Consistent professional aesthetic that reinforces your brand identity."
    ],
    technologies: ["Buffer", "Later", "Hootsuite", "Canva Pro", "Figma", "CapCut", "LinkedIn"]
  },
};

export const getServiceBySlug = (slug) => {
  return SERVICES_DATA[slug] || null;
};

export const getAllServices = () => {
  return Object.values(SERVICES_DATA);
};

export const getRelatedServices = (slug, limit = 3) => {
  const current = SERVICES_DATA[slug];
  if (!current) return [];
  return Object.values(SERVICES_DATA)
    .filter((s) => s.categorySlug === current.categorySlug && s.slug !== slug)
    .slice(0, limit);
};
