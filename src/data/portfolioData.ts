export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI / ML' | 'Full-Stack' | 'Web & CMS';
  stationName: string;
  scoutingRating: number;
  description: string;
  longDescription: string;
  keyFeatures: string[];
  techStack: string[];
  architecture: {
    frontend?: string;
    backend?: string;
    database?: string;
    aiModels?: string;
    cloud?: string;
  };
  metrics: string[];
  links: {
    github?: string;
    demo?: string;
    caseStudy?: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  trophyTitle: string;
  summary: string;
  responsibilities: string[];
  techStack: string[];
  trophyColor: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  lockerNumber: number;
  skills: {
    name: string;
    level: string;
    description: string;
  }[];
}

export const VIVIAN_DATA = {
  personal: {
    name: "Vivian Dcosta",
    tagline: "Software Developer • AI/ML Developer • Full-Stack Developer",
    subtitle: "Building high-performance web systems, AI-powered automation workflows, and intelligent software architectures.",
    heroQuotes: [
      "Building software.",
      "Exploring AI.",
      "Always moving forward."
    ],
    location: "Belagavi, Karnataka, India",
    phone: "+91 6360209255",
    email: "dcostavivian08@gmail.com",
    github: "https://github.com/vivian-dcosta",
    linkedin: "https://linkedin.com/in/vivian-dcosta-a92548231",
    portfolioUrl: "https://viviandcosta.dev",
    status: "Available for High-Impact Roles & Collaborations",
  },

  scoutingReport: {
    player: "VIVIAN DCOSTA",
    position: "SOFTWARE DEVELOPER",
    speciality: "FULL-STACK DEVELOPMENT • AI/ML • AUTOMATION",
    nationality: "INDIAN",
    location: "BELAGAVI, INDIA",
    overallRating: 94,
    pace: 93,
    shooting: 95,
    passing: 92,
    dribbling: 91,
    defending: 94,
    physical: 95,
    attributes: [
      { name: "CODE CRAFT", score: 10, max: 10, fill: "w-[100%]" },
      { name: "FULL STACK", score: 9, max: 10, fill: "w-[90%]" },
      { name: "AI / ML WORKFLOWS", score: 8, max: 10, fill: "w-[80%]" },
      { name: "PROBLEM SOLVING", score: 9, max: 10, fill: "w-[90%]" },
      { name: "SYSTEM BUILDING", score: 9, max: 10, fill: "w-[90%]" },
    ],
    scoutingNotes: "Dynamic software engineer specializing in scalable full-stack web platforms, machine learning pipelines, and backend microservices. Proven track record of building production-grade business platforms, AI-driven lead automation tools, and responsive user-centric web applications."
  },

  education: {
    degree: "Bachelor of Engineering (B.E.) in Computer Science & Engineering",
    institution: "Srinivas University Institute of Technology",
    cgpa: "8.4 / 10",
    period: "Graduated with Distinction",
    highlights: [
      "Core Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Machine Learning, Web Technologies, Computer Networks.",
      "Consistently achieved academic excellence with active leadership in technical workshops and project exhibitions."
    ]
  },

  experiences: [
    {
      id: "daylink",
      company: "Daylink Tech Labs",
      role: "Software Developer",
      period: "2026 – Present",
      location: "India",
      trophyTitle: "Premier League Software Trophy",
      trophyColor: "#00ff87",
      summary: "Spearheading full-stack web applications, business operations software, automated workflows, and robust REST API integrations.",
      responsibilities: [
        "Architecting and developing modular full-stack web applications using React.js, Node.js, and Express.",
        "Designing scalable database schemas and performing complex data queries across MongoDB and SQL.",
        "Implementing enterprise automation workflows and seamless third-party API integrations.",
        "Managing version control, CI/CD pipelines, and collaborative code reviews via Git & GitHub.",
        "Ensuring high responsiveness, rigorous unit testing, and optimal web application performance."
      ],
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "SQL", "REST APIs", "Automation", "Git/GitHub"]
    },
    {
      id: "bits",
      company: "BITS",
      role: "AI/ML Intern",
      period: "May 2025 – July 2025",
      location: "India",
      trophyTitle: "Champions Cup for Machine Learning",
      trophyColor: "#00f0ff",
      summary: "Engineered machine learning pipelines, data preprocessing routines, model training, and quantitative performance evaluation.",
      responsibilities: [
        "Built end-to-end machine learning workflows for predictive data modeling and feature engineering.",
        "Conducted extensive data cleaning, exploratory data analysis (EDA), and normalization on complex datasets.",
        "Trained and fine-tuned supervised and unsupervised machine learning models using Python and data science libraries.",
        "Evaluated model accuracy, precision, recall, and F1 metrics to optimize performance against baseline benchmarks.",
        "Documented technical workflows and presented model findings to engineering leadership."
      ],
      techStack: ["Python", "Machine Learning", "Data Preprocessing", "Data Analysis", "Model Evaluation", "NumPy", "Pandas", "Scikit-Learn"]
    },
    {
      id: "nexel",
      company: "Nexel",
      role: "Web Development Intern",
      period: "December 2023",
      location: "India",
      trophyTitle: "Golden Boot for Web Craftsmanship",
      trophyColor: "#ffd700",
      summary: "Delivered responsive web interfaces, cross-browser debugging, performance tuning, and interactive user experiences.",
      responsibilities: [
        "Constructed pixel-perfect, accessible, and responsive user interfaces utilizing HTML5, CSS3, and JavaScript.",
        "Identified, debugged, and resolved cross-browser rendering inconsistencies and layout shifts.",
        "Collaborated with senior designers to implement interactive components and intuitive user flows.",
        "Conducted thorough frontend testing and optimized client-side asset delivery for fast load times."
      ],
      techStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Debugging", "Testing", "UI/UX"]
    }
  ] as Experience[],

  projects: [
    {
      id: "ai-lead-generation",
      title: "AI-Powered Lead Generation Platform",
      subtitle: "Intelligent Lead Discovery, Contact Extraction & Scouting Intelligence",
      category: "AI / ML",
      stationName: "AI SCOUTING STATION",
      scoutingRating: 96,
      description: "An AI-powered intelligence platform that automates lead discovery, contact scraping, email verification, and intelligent hot/warm/cold classification.",
      longDescription: "Engineered to operate like an elite football scouting system, this platform scours public business channels, extracts structured contact dossiers, performs real-time email verification, and leverages AI models to classify and rank leads by conversion probability for B2B pipelines.",
      keyFeatures: [
        "Automated multi-source lead discovery & business domain scraping",
        "Deep contact information & corporate email extraction pipeline",
        "Real-time SMTP & DNS-level email verification engine",
        "AI-driven Hot / Warm / Cold predictive lead classification",
        "Multi-step query filtering & automated scheduled search workflows",
        "One-click structured lead dossier export (CSV, JSON, CRM ready)"
      ],
      techStack: ["Python", "FastAPI", "AI Models", "React.js", "Data Extraction", "Email Verification", "MongoDB"],
      architecture: {
        frontend: "React.js + Tailwind CSS Real-time Dashboard",
        backend: "Python / FastAPI Asynchronous Crawlers & Workers",
        database: "MongoDB with Indexed Lead Schemas",
        aiModels: "Scikit-Learn & NLP Classification Engine",
        cloud: "Dockerized Microservices on AWS"
      },
      metrics: ["10x Faster Prospecting", "98.5% Verification Accuracy", "Automated Workflows"],
      links: {
        github: "https://github.com/vivian-dcosta",
        demo: "#",
        caseStudy: "AI-Powered Lead Engine"
      }
    },
    {
      id: "daylink-hive",
      title: "Daylink Hive / Full-Stack Business Applications",
      subtitle: "Enterprise Operations Board, Role-Based Access & High-Volume CRUD",
      category: "Full-Stack",
      stationName: "TACTICAL OPERATIONS HUB",
      scoutingRating: 94,
      description: "A centralized enterprise web application designed for comprehensive business operations, data management, authentication, and live analytics.",
      longDescription: "Built with a modern full-stack architecture, Daylink Hive streamlines internal business workflows, role-based resource permissions, secure token-based authentication, and dynamic analytics dashboards with ultra-responsive UI components.",
      keyFeatures: [
        "Modular React.js component architecture with custom state management",
        "Secure JWT authentication & fine-grained role-based access control (RBAC)",
        "High-throughput RESTful API endpoints built on Node.js and Express",
        "Optimized MongoDB data schemas for complex business entities and transactions",
        "Live operations telemetry and interactive data reporting tables",
        "Fully responsive interface optimized for desktop, tablet, and mobile operations"
      ],
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth", "Tailwind CSS"],
      architecture: {
        frontend: "React.js + Vite + Modern Glassmorphism UI",
        backend: "Node.js + Express.js REST API with Middleware security",
        database: "MongoDB Atlas with replica clustering",
        cloud: "Cloud-hosted containerized deployment"
      },
      metrics: ["Sub-50ms API Latency", "100% Mobile Responsive", "Zero Downtime Deployments"],
      links: {
        github: "https://github.com/vivian-dcosta",
        demo: "#",
        caseStudy: "Enterprise Business Hub"
      }
    },
    {
      id: "pfwci-portal",
      title: "PFWCI Website & Admin Dashboard",
      subtitle: "Digital Stadium Operations Control Room, Modern CMS & Asset Optimization",
      category: "Web & CMS",
      stationName: "STADIUM CONTROL ROOM",
      scoutingRating: 92,
      description: "A high-performance organizational portal featuring an intuitive administration dashboard, dynamic content management, and optimized asset pipelines.",
      longDescription: "Designed to serve both public visitors and internal administrators, this platform provides seamless content publishing, gallery and media management with next-gen image compression, real-time announcement tickers, and robust frontend performance tuning.",
      keyFeatures: [
        "Sleek, modern, and accessible public-facing web presence",
        "Comprehensive administrative dashboard for live content management",
        "Automated image optimization and responsive CDN asset delivery",
        "Dynamic announcement tickers and interactive event schedules",
        "Lighthouse performance scores consistently above 95+",
        "Cross-browser tested with robust form validation and security sanitization"
      ],
      techStack: ["React.js", "Node.js", "Content Management", "Image Optimization", "Tailwind CSS", "REST APIs"],
      architecture: {
        frontend: "React.js + Tailwind CSS with Lazy-Loaded Assets",
        backend: "Node.js REST API with Structured Content Endpoints",
        database: "Relational SQL / Document hybrid storage",
        cloud: "Edge CDN Caching & WebP Compression Pipeline"
      },
      metrics: ["98+ Lighthouse Score", "60% Bandwidth Reduction", "Instant Admin Publishing"],
      links: {
        github: "https://github.com/vivian-dcosta",
        demo: "#",
        caseStudy: "PFWCI Web Operations"
      }
    }
  ] as Project[],

  lockers: [
    {
      id: "programming",
      name: "PROGRAMMING LANGUAGES",
      iconName: "Terminal",
      lockerNumber: 10,
      skills: [
        { name: "Python", level: "Advanced", description: "Backend development, AI/ML pipelines, data processing, automation scripts, and FastAPI microservices." },
        { name: "JavaScript (ES6+)", level: "Advanced", description: "Modern asynchronous programming, DOM manipulation, closures, promises, and full-stack integration." },
        { name: "TypeScript", level: "Proficient", description: "Type-safe interfaces, generic abstractions, and scalable enterprise application architecture." },
        { name: "SQL", level: "Advanced", description: "Complex relational queries, indexing, joins, schema design, and query optimization across MySQL and PostgreSQL." }
      ]
    },
    {
      id: "frontend",
      name: "FRONTEND CRAFT",
      iconName: "Layout",
      lockerNumber: 7,
      skills: [
        { name: "React.js", level: "Expert", description: "Hooks, state management, custom context, performance memoization, and component composition." },
        { name: "Next.js", level: "Proficient", description: "App router, server-side rendering (SSR), static site generation (SSG), and edge API routes." },
        { name: "HTML5 & CSS3", level: "Expert", description: "Semantic markup, CSS Grid, Flexbox, responsive layouts, and keyframe animations." },
        { name: "Tailwind CSS", level: "Expert", description: "Utility-first design systems, responsive variants, dark mode styling, and custom plugins." }
      ]
    },
    {
      id: "backend",
      name: "BACKEND ARCHITECTURE",
      iconName: "Server",
      lockerNumber: 8,
      skills: [
        { name: "Node.js", level: "Advanced", description: "Event-driven runtime, stream handling, async I/O, and scalable backend microservices." },
        { name: "Express.js", level: "Advanced", description: "RESTful API routing, middleware authentication, error handling, and request validation." },
        { name: "FastAPI", level: "Proficient", description: "High-performance Python APIs, Pydantic validation schemas, and automated OpenAPI docs." },
        { name: "REST APIs", level: "Expert", description: "Stateless architecture, secure headers, pagination, rate limiting, and webhook integrations." }
      ]
    },
    {
      id: "databases",
      name: "DATABASES & STORAGE",
      iconName: "Database",
      lockerNumber: 4,
      skills: [
        { name: "MongoDB", level: "Advanced", description: "Document schemas, aggregation pipelines, replica sets, indexing, and Mongoose modeling." },
        { name: "MySQL", level: "Advanced", description: "Relational normalization, foreign keys, transaction handling, and ACID compliance." },
        { name: "PostgreSQL", level: "Proficient", description: "Complex joins, JSONB storage, triggers, and relational performance tuning." },
        { name: "SQLite", level: "Proficient", description: "Embedded lightweight databases for edge apps and local data persistence." }
      ]
    },
    {
      id: "cloud-tools",
      name: "CLOUD, DEVOPS & TOOLS",
      iconName: "Cloud",
      lockerNumber: 1,
      skills: [
        { name: "AWS", level: "Certified", description: "EC2 instances, S3 storage buckets, Lambda serverless functions, and CloudWatch." },
        { name: "Docker", level: "Proficient", description: "Multi-stage containerization, Docker Compose environments, and image optimization." },
        { name: "Git & GitHub", level: "Expert", description: "Branching strategies, pull request workflows, merge conflict resolution, and CI/CD actions." },
        { name: "Postman & Linux", level: "Advanced", description: "API contract testing, environment variables, bash scripting, and server administration." }
      ]
    }
  ] as SkillCategory[],

  tacticalPipeline: [
    {
      step: 1,
      name: "DATA PREPARATION & SCRAPING",
      footballRole: "THE SCOUT (DEFENSIVE FOUNDATION)",
      description: "Raw data extraction, web crawling, CSV/JSON ingestion, feature cleaning, and noise removal using Python, Pandas, and automated scrapers.",
      output: "Structured, validated & normalized training datasets.",
      badge: "DATA PIPELINE"
    },
    {
      step: 2,
      name: "MODEL TRAINING & EVALUATION",
      footballRole: "THE PLAYMAKER (MIDFIELD INTELLIGENCE)",
      description: "Training machine learning algorithms, Scikit-Learn classifiers, NLP models, and evaluating accuracy, precision, recall, and F1 performance metrics.",
      output: "Serialized high-accuracy predictive models.",
      badge: "AI/ML MODEL"
    },
    {
      step: 3,
      name: "FASTAPI / REST SERVICE",
      footballRole: "THE WINGER (RAPID DISTRIBUTION)",
      description: "Packaging trained models into lightweight, sub-50ms REST API endpoints with Pydantic validation, error handling, and worker queues.",
      output: "Scalable inference REST microservices.",
      badge: "API ENGINE"
    },
    {
      step: 4,
      name: "REACT WEB APPLICATION",
      footballRole: "THE FORWARD (CLINICAL EXECUTION)",
      description: "Building responsive, modern user interfaces with React.js, Tailwind CSS, live telemetry graphs, and real-time state synchronization.",
      output: "Interactive client web dashboards.",
      badge: "FULL-STACK APP"
    },
    {
      step: 5,
      name: "END USER & BUSINESS VALUE",
      footballRole: "THE GOAL (MATCH WINNER)",
      description: "Delivering real-world business impact: verified leads, actionable analytics, and automated decision-making workflows.",
      output: "High-impact production solutions.",
      badge: "VALUE DELIVERED"
    }
  ],

  certifications: [
    {
      title: "Database Specialist",
      issuer: "Recognized Certification Board",
      description: "Advanced relational database design, query optimization, indexing, transactions, and data modeling."
    },
    {
      title: "AWS Cloud Certification",
      issuer: "Amazon Web Services",
      description: "Cloud computing fundamentals, architecture design, cloud security, EC2, S3, and serverless infrastructure."
    }
  ],

  scoreboard: {
    match: "CHAMPIONS LEAGUE: DEVELOPER FINAL",
    teamHome: "VIVIAN DCOSTA",
    scoreHome: 99,
    teamAway: "BUGS & COMPLEXITY",
    scoreAway: 0,
    minute: "90+5'",
    stadiumName: "CAMP NOU DEVOPS ARENA",
    stats: [
      { label: "EXPERIENCE", value: "3+ ROLES" },
      { label: "PROJECTS SHIPPED", value: "3+ PRODUCTION" },
      { label: "CODEBASE RATING", value: "94/100" },
      { label: "EDUCATION", value: "B.E. CSE (8.4 CGPA)" },
      { label: "STATUS", value: "MATCH READY" }
    ]
  },

  languages: [
    { name: "English", level: "Full Professional" },
    { name: "Hindi", level: "Professional Working" },
    { name: "Kannada", level: "Native / Bilingual" },
    { name: "Konkani", level: "Native / Bilingual" }
  ]
};
