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

export interface LockerItem {
  number: number;
  tech: string;
  role: string;
  level: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'DevOps & Cloud';
  description: string;
  footballAnalogy: string;
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
    name: "Vivian D'costa",
    tagline: "Software Developer • Full-Stack • AI/ML",
    subtitle: "From the Stadium to the Code Editor: Building high-performance web systems, AI pipelines, and scalable software architectures.",
    heroQuotes: [
      "DISCIPLINE BUILDS CONSISTENCY.",
      "WORK. IMPROVE. REPEAT.",
      "THE NEXT LEVEL IS BUILT.",
      "STAY HUNGRY.",
      "PRECISION OVER EXCUSES.",
      "PLAY TO WIN.",
      "KEEP MOVING FORWARD."
    ],
    location: "Belagavi, Karnataka, India",
    phone: "+91 6360209255",
    email: "dcostavivian08@gmail.com",
    github: "https://github.com/vivian-dcosta",
    linkedin: "https://linkedin.com/in/vivian-dcosta-a92548231",
    portfolioUrl: "https://viviandcosta.dev",
    status: "AVAILABLE FOR THE NEXT CHALLENGE",
    foot: "RIGHT",
  },

  scoutingReport: {
    player: "VIVIAN D'COSTA",
    position: "SOFTWARE DEVELOPER",
    role: "FULL-STACK • AI/ML",
    foot: "RIGHT",
    status: "AVAILABLE FOR THE NEXT CHALLENGE",
    nationality: "INDIAN",
    location: "BELAGAVI, INDIA",
    technicalAttributes: [
      { name: "FULL-STACK", tag: "CORE MASTERY", proficiency: "Expert", description: "Seamless end-to-end web architecture from reactive UI to scalable microservices." },
      { name: "AI / ML", tag: "INTELLIGENCE", proficiency: "Advanced", description: "Predictive model training, data extraction pipelines, and automated intelligence." },
      { name: "BACKEND", tag: "SYSTEM ENGINE", proficiency: "Expert", description: "High-throughput RESTful APIs, async worker queues, and robust data schemas." },
      { name: "FRONTEND", tag: "PRECISION CRAFT", proficiency: "Expert", description: "Ultra-responsive component systems, modern UI engineering, and state management." },
      { name: "AUTOMATION", tag: "WORKFLOWS", proficiency: "Advanced", description: "Automated business scrapers, CI/CD pipelines, and asynchronous cron jobs." },
      { name: "PROBLEM SOLVING", tag: "ELITE MENTALITY", proficiency: "Expert", description: "Algorithmic thinking, clean architecture patterns, and relentless optimization." },
    ],
    scoutingNotes: "Elite software engineer built with high discipline and performance focus. Combines full-stack development with AI/ML automation, scalable backend microservices, and modern UI engineering."
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
      trophyTitle: "Premier Software Development Trophy",
      trophyColor: "#D4AF37",
      summary: "Spearheading full-stack web applications, business operations platforms, automated workflows, and robust REST API integrations.",
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
      trophyTitle: "Championship Cup for Machine Learning",
      trophyColor: "#F5C542",
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
      trophyTitle: "Golden Trophy for Web Craftsmanship",
      trophyColor: "#D4AF37",
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
      stationName: "AI SCOUTING STATION #01",
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
      stationName: "TACTICAL OPERATIONS HUB #02",
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
      stationName: "STADIUM CONTROL ROOM #03",
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

  // 10 Numbered Lockers
  techLockers: [
    {
      number: 7,
      tech: "PYTHON",
      role: "STRIKER / CORE ENGINE",
      level: "Advanced",
      category: "Languages",
      description: "AI/ML algorithms, FastAPI microservices, automated web scraping, data modeling, and performance automation scripts.",
      footballAnalogy: "Iconic #07: Precision finish, high output, and match-winning versatility."
    },
    {
      number: 8,
      tech: "JAVASCRIPT",
      role: "PLAYMAKER / WINGER",
      level: "Advanced",
      category: "Languages",
      description: "Modern ES6+, asynchronous event loops, DOM interactivity, and full-stack runtime fluency.",
      footballAnalogy: "Creative playmaking: dynamic control and rapid pace down the flanks."
    },
    {
      number: 9,
      tech: "REACT.JS",
      role: "ATTACKING MIDFIELD",
      level: "Expert",
      category: "Frontend",
      description: "State orchestration, component modularity, custom hooks, and high-framerate interactive client interfaces.",
      footballAnalogy: "Controlling the tempo: connecting tactical architecture with front-of-house execution."
    },
    {
      number: 10,
      tech: "NODE.JS",
      role: "CENTRAL MIDFIELD",
      level: "Advanced",
      category: "Backend",
      description: "High-throughput asynchronous backend APIs, microservices, token authentication, and stream handling.",
      footballAnalogy: "Midfield maestro: distributing requests and managing high-volume operations."
    },
    {
      number: 11,
      tech: "FASTAPI",
      role: "WING FORWARD",
      level: "Proficient",
      category: "Backend",
      description: "High-speed asynchronous Python REST endpoints, Pydantic data validation, and OpenAPI contracts.",
      footballAnalogy: "Blistering counter-attacks: sub-50ms latency and high-speed data flow."
    },
    {
      number: 12,
      tech: "MONGODB",
      role: "CENTER BACK",
      level: "Advanced",
      category: "Database",
      description: "NoSQL document persistence, aggregation pipelines, indexed lookups, and flexible data modeling.",
      footballAnalogy: "Defensive wall: resilient schema flexibility and dependable data storage."
    },
    {
      number: 13,
      tech: "MYSQL",
      role: "TACTICAL SWEEPER",
      level: "Advanced",
      category: "Database",
      description: "ACID compliance, relational normalization, complex SQL joins, indexing, and transactional integrity.",
      footballAnalogy: "Defensive discipline: strict rules, structural order, and zero data leakage."
    },
    {
      number: 14,
      tech: "AWS",
      role: "GOALKEEPER / ANCHOR",
      level: "Certified",
      category: "DevOps & Cloud",
      description: "Cloud computing infrastructure, EC2 instances, S3 object storage, Lambda serverless, and CloudWatch telemetry.",
      footballAnalogy: "Last line of defense: 99.99% uptime, global scale, and rock-solid cloud reliability."
    },
    {
      number: 15,
      tech: "DOCKER",
      role: "PHYSICAL CONDITIONING",
      level: "Proficient",
      category: "DevOps & Cloud",
      description: "Multi-stage containerization, reproducible build environments, Docker Compose, and image optimization.",
      footballAnalogy: "Peak fitness: consistent performance across any field, environment, or machine."
    },
    {
      number: 16,
      tech: "GIT & GITHUB",
      role: "CLUB CAPTAIN",
      level: "Expert",
      category: "DevOps & Cloud",
      description: "Branching strategies, pull request workflows, CI/CD automated actions, and code review governance.",
      footballAnalogy: "Team leadership: collaborative harmony, version control, and championship deployment standards."
    }
  ] as LockerItem[],

  // Grouped Lockers for modal compatibility
  lockers: [
    {
      id: "languages",
      name: "PROGRAMMING LANGUAGES",
      iconName: "Terminal",
      lockerNumber: 7,
      skills: [
        { name: "Python", level: "Advanced", description: "Backend development, AI/ML pipelines, automated scrapers, and FastAPI microservices." },
        { name: "JavaScript (ES6+)", level: "Advanced", description: "Modern async/await, DOM architectures, full-stack integration, and event systems." },
        { name: "TypeScript", level: "Proficient", description: "Type-safe interfaces, generic abstractions, and scalable enterprise architecture." },
        { name: "SQL", level: "Advanced", description: "Complex relational queries, indexing, joins, and schema optimization across MySQL and PostgreSQL." }
      ]
    },
    {
      id: "frontend",
      name: "FRONTEND CRAFT",
      iconName: "Layout",
      lockerNumber: 9,
      skills: [
        { name: "React.js", level: "Expert", description: "Hooks, state management, custom context, memoization, and component composition." },
        { name: "Next.js", level: "Proficient", description: "App router, SSR, SSG, edge API routes, and bundle optimization." },
        { name: "HTML5 & CSS3", level: "Expert", description: "Semantic markup, CSS Grid, Flexbox, responsive layouts, and animations." },
        { name: "Tailwind CSS", level: "Expert", description: "Utility-first design systems, responsive variants, and custom design tokens." }
      ]
    },
    {
      id: "backend",
      name: "BACKEND ARCHITECTURE",
      iconName: "Server",
      lockerNumber: 10,
      skills: [
        { name: "Node.js", level: "Advanced", description: "Event-driven runtime, stream handling, async I/O, and microservices." },
        { name: "Express.js", level: "Advanced", description: "RESTful API routing, middleware auth, error handling, and request validation." },
        { name: "FastAPI", level: "Proficient", description: "High-performance Python APIs, Pydantic validation, and OpenAPI documentation." },
        { name: "REST APIs", level: "Expert", description: "Stateless architecture, secure headers, pagination, and webhook integration." }
      ]
    },
    {
      id: "databases",
      name: "DATABASES & STORAGE",
      iconName: "Database",
      lockerNumber: 12,
      skills: [
        { name: "MongoDB", level: "Advanced", description: "Document schemas, aggregation pipelines, replica sets, and indexing." },
        { name: "MySQL", level: "Advanced", description: "Relational normalization, foreign keys, transaction handling, and ACID compliance." },
        { name: "PostgreSQL", level: "Proficient", description: "Complex joins, JSONB storage, triggers, and query performance tuning." },
        { name: "SQLite", level: "Proficient", description: "Lightweight embedded databases for rapid local persistence." }
      ]
    },
    {
      id: "cloud-tools",
      name: "CLOUD & DEVOPS",
      iconName: "Cloud",
      lockerNumber: 14,
      skills: [
        { name: "AWS", level: "Certified", description: "EC2 instances, S3 buckets, Lambda serverless, and CloudWatch." },
        { name: "Docker", level: "Proficient", description: "Multi-stage containerization, Docker Compose, and environment replication." },
        { name: "Git & GitHub", level: "Expert", description: "Branching strategies, pull request workflows, merge resolution, and CI/CD actions." },
        { name: "Postman & Linux", level: "Advanced", description: "API contract verification, bash scripting, and Linux server management." }
      ]
    }
  ] as SkillCategory[],

  // Football Formation Positions for Tactical Board
  tacticalFormation: [
    {
      positionId: "ST",
      roleName: "STRIKER / MATCH WINNER",
      technology: "AI / ML",
      coordinates: { x: 50, y: 15 },
      description: "Clinical execution: Machine learning models, predictive pipelines, and automated intelligence converting data into real value.",
      badge: "AI INFERENCE"
    },
    {
      positionId: "LW",
      roleName: "LEFT WINGER / PACE",
      technology: "React.js",
      coordinates: { x: 20, y: 35 },
      description: "Dynamic frontend interfaces, reactive component composition, and responsive user experience.",
      badge: "UI CLIENT"
    },
    {
      positionId: "RW",
      roleName: "RIGHT WINGER / DISTRIBUTION",
      technology: "Node.js",
      coordinates: { x: 80, y: 35 },
      description: "High-throughput asynchronous event management, REST APIs, and microservices distribution.",
      badge: "SYSTEM ENGINE"
    },
    {
      positionId: "LCM",
      roleName: "CENTRAL MIDFIELD / CONTROL",
      technology: "FastAPI",
      coordinates: { x: 35, y: 55 },
      description: "High-speed asynchronous Python endpoints connecting models to production clients with sub-50ms latency.",
      badge: "API BRIDGE"
    },
    {
      positionId: "RCM",
      roleName: "CENTRAL MIDFIELD / VISION",
      technology: "Python",
      coordinates: { x: 65, y: 55 },
      description: "Core algorithms, data analysis, automated scraping routines, and backend business logic.",
      badge: "DATA PIPELINE"
    },
    {
      positionId: "LCB",
      roleName: "CENTER BACK / DEFENSE",
      technology: "MongoDB",
      coordinates: { x: 30, y: 75 },
      description: "Flexible document store, aggregation pipelines, and high-volume entity schemas.",
      badge: "NO-SQL STORAGE"
    },
    {
      positionId: "RCB",
      roleName: "CENTER BACK / STRUCTURE",
      technology: "MySQL",
      coordinates: { x: 70, y: 75 },
      description: "Relational data integrity, ACID transactional security, and structured query optimization.",
      badge: "RELATIONAL DB"
    },
    {
      positionId: "GK",
      roleName: "GOALKEEPER / INFRASTRUCTURE",
      technology: "AWS & Docker",
      coordinates: { x: 50, y: 90 },
      description: "Cloud deployment reliability, containerized environments, zero downtime, and global uptime.",
      badge: "CLOUD DEPLOYMENT"
    }
  ],

  // Data Passing Pipeline Architecture
  tacticalPipeline: [
    {
      step: 1,
      name: "USER & CLIENT REQUEST",
      footballRole: "THE KICK-OFF",
      node: "USER",
      description: "User interacts with the client interface, triggering authenticated actions and live search requests.",
      output: "Authenticated client payload.",
      badge: "CLIENT REQUEST"
    },
    {
      step: 2,
      name: "REACT FRONTEND COMPONENT",
      footballRole: "THE FIRST TOUCH",
      node: "REACT",
      description: "Dynamic React.js UI state management, form validation, and reactive telemetry rendering.",
      output: "Optimized client-side state.",
      badge: "REACT UI"
    },
    {
      step: 3,
      name: "NODE.JS / FASTAPI BACKEND",
      footballRole: "THE MIDFIELD PASS",
      node: "NODE / FASTAPI",
      description: "High-throughput asynchronous REST microservices processing requests, validating tokens, and triggering AI models.",
      output: "Validated API responses.",
      badge: "BACKEND ENGINE"
    },
    {
      step: 4,
      name: "REST API & MODEL PIPELINES",
      footballRole: "THE THROUGH BALL",
      node: "REST / AI PIPELINE",
      description: "Machine learning inference, domain crawlers, email verification routines, and structured data serialization.",
      output: "Enriched intelligence dossier.",
      badge: "AI INFERENCE"
    },
    {
      step: 5,
      name: "MONGODB / MYSQL PERSISTENCE",
      footballRole: "THE CLINICAL FINISH",
      node: "MONGODB / SQL",
      description: "Indexed database writes, relational ACID transactions, and cached fast-read models.",
      output: "Persisted production data.",
      badge: "DATA STORAGE"
    },
    {
      step: 6,
      name: "AWS & DOCKER DEPLOYMENT",
      footballRole: "APPLICATION DEPLOYED (GOAL)",
      node: "AWS / DOCKER",
      description: "Containerized deployment on AWS with automated CI/CD pipelines, SSL certificates, and edge caching.",
      output: "Production live application.",
      badge: "APPLICATION DEPLOYED"
    }
  ],

  certifications: [
    {
      title: "Database Specialist Certification",
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
    teamHome: "VIVIAN D'COSTA",
    scoreHome: 99,
    teamAway: "BUGS & COMPLEXITY",
    scoreAway: 0,
    minute: "90+5'",
    stadiumName: "MADRID NIGHT DEVELOPER ARENA",
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
