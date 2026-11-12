/**
 * Single source of truth for profile facts that both the page sections and the AI chat assistant use.
 * Update here and the site and the chatbot stay in sync.
 * Tech stack: names and grouping live here; only icons and colours are kept in components/sections/tech-stack.tsx.
 */

export const journey = [
  {
    year: '2015',
    title: 'HSE in the field',
    description: 'Environmental engineer on the BP LNG Tangguh project in Papua, delivering Zero LTI.',
  },
  {
    year: '2019',
    title: 'Carbon & compliance',
    description: 'Pupuk Kaltim: CDP climate disclosure, CEMS monitoring and National GOLD PROPER.',
  },
  {
    year: '2022',
    title: 'Sustainability lead',
    description: 'Pertamina Hulu Mahakam: ESG and ISO 14001 EMS, earning Green and GOLD PROPER.',
  },
  {
    year: '2025',
    title: 'Engineering software',
    description: 'Hacktiv8 full-stack program, now Fullstack Engineer building telecom systems.',
  },
];

export const certifications = [
  {
    title: 'Full Stack JavaScript Immersive Program',
    issuer: 'Hacktiv8',
    logo: '/hacktiv8-logo.jpg',
    earnedOn: 'April 2026',
    featured: true,
    link: 'https://drive.google.com/file/d/1Bl10C-ROPCSAk6DMyp31EVEP_DJDshs4/view?usp=drive_link',
  },
  {
    title: 'SQL (Advanced)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'May 2026',
    link: 'https://www.hackerrank.com/certificates/6ecace69865f',
  },
  {
    title: 'Rest API (Intermediate)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'May 2026',
    link: 'https://www.hackerrank.com/certificates/b67cbaf726cb',
  },
  {
    title: 'JavaScript (Intermediate)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'May 2026',
    link: 'https://www.hackerrank.com/certificates/c0e95b30ffc1',
  },
  {
    title: 'Problem Solving (Intermediate)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'May 2026',
    link: 'https://www.hackerrank.com/certificates/5cac421a558f',
  },
  {
    title: 'Node.js (Intermediate)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'May 2026',
    link: 'https://www.hackerrank.com/certificates/4a29ef02a7f6',
  },
  {
    title: 'SQL (Intermediate)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'May 2026',
    link: 'https://www.hackerrank.com/certificates/8c62e336524a',
  },
  {
    title: 'SQL (Basic)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'May 2026',
    link: 'https://www.hackerrank.com/certificates/a4780dc2fe53',
  },
  {
    title: 'Frontend Developer (React)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'May 2026',
    link: 'https://www.hackerrank.com/certificates/eb1747524342',
  },
  {
    title: 'Software Engineer',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'May 2026',
    link: 'https://www.hackerrank.com/certificates/9c865a0b35ff',
  },
  {
    title: 'Software Engineer Intern',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'March 2026',
    link: 'https://www.hackerrank.com/certificates/00e98616eead',
  },
  {
    title: 'JavaScript (Basic)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'March 2026',
    link: 'https://www.hackerrank.com/certificates/818911bb4e26',
  },
  {
    title: 'React (Basic)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'March 2026',
    link: 'https://www.hackerrank.com/certificates/ebbcb4f5b143',
  },
  {
    title: 'CSS (Basic)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'March 2026',
    link: 'https://www.hackerrank.com/certificates/40d50e92e728',
  },
  {
    title: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    logo: '/hackerrank-logo.png',
    earnedOn: 'March 2026',
    link: 'https://www.hackerrank.com/certificates/50443addb6f4',
  },
];

export const TECH_STACK: {
  category: string;
  description: string;
  featured?: boolean;
  items: string[];
}[] = [
  {
    category: 'Languages',
    description: 'Core programming languages used across frontend and backend development.',
    items: ['JavaScript', 'TypeScript', 'Go (Golang)'],
  },
  {
    category: 'Frontend',
    description: 'Modern UI frameworks and styling technologies for responsive applications.',
    items: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend & APIs',
    description: 'Server-side technologies, APIs, and scalable architecture.',
    items: ['Node.js', 'Express', 'GraphQL', 'Apollo Client'],
  },
  {
    category: 'Databases & ORM',
    description: 'Database technologies and data management tools.',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Sequelize'],
  },
  {
    category: 'Authentication & Security',
    description: 'Authentication systems and application security practices.',
    items: ['bcryptjs', 'Express Session', 'JsonWebToken'],
  },
  {
    category: 'Mobile Development',
    description: 'Cross-platform mobile development and deployment tools.',
    items: ['React Native', 'Expo', 'React Navigation', 'Expo Secure Store', 'EAS Build'],
  },
  {
    category: 'Engineering & Sustainability',
    description: '8+ years of engineering, HSE, and procurement experience across oil & gas and industrial sectors.',
    items: [
      'ISO 14001 EMS',
      'CEMS Monitoring',
      'Environmental Risk Assessment',
      'ESG Compliance & Reporting',
      'HSE Inspection & Auditing',
      'Procurement & Vendor Management',
      'MRP & Inventory Optimization',
      'Supplier Negotiation & Contracts',
      'Purchasing & Cost Analysis',
      'SAP',
    ],
  },
  {
    category: 'AI & LLM Integration',
    featured: true,
    description: 'Tools and workflows used to build AI-powered applications and intelligent systems.',
    items: [
      'Gemini API',
      'OpenAI API',
      'Vercel AI SDK',
      'LangChain',
      'Prompt Engineering',
      'RAG Systems',
      'AI Chat Interfaces',
      'Semantic Search',
      'Context Management',
    ],
  },
];

export const PROFILE = {
  name: 'Indra Sanjaya',
  headline: 'Fullstack Engineer with an engineering background',
  currentRole: 'Fullstack Engineer building telecommunications systems (since September 2026)',
  background:
    '8+ years of environmental and HSE engineering experience across oil & gas and industrial sectors in Indonesia, including BP Tangguh LNG, PT Pupuk Kalimantan Timur, and PT Pertamina Hulu Mahakam. Completed the Hacktiv8 full-stack software development program, then moved into software engineering.',
  alongside: 'He also builds his own full-stack and AI-powered projects and writes technical articles.',
  openTo:
    'Open to software engineering / AI-adjacent roles and HSE / environmental engineering roles. Open to placement anywhere in Indonesia.',
  location: 'Jakarta, Indonesia',
};

export const CONTACT_LINKS = [
  { label: 'Email', href: 'mailto:indrasanjaya.ind@gmail.com', value: 'indrasanjaya.ind@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/indra-sanjaya-dev', value: 'Connect' },
  { label: 'Instagram', href: 'https://www.instagram.com/indra_isanjaya', value: 'Follow' },
  { label: 'GitHub', href: 'https://github.com/indra-sanjaya', value: 'Follow' },
];

/** Cards of the Impact section. `headline` is the short form the chat assistant quotes. */
export const IMPACT_METRICS = [
  {
    id: 'emissions',
    label: 'Emissions Reduction Impact',
    description:
      'Contributed to large-scale sustainability initiatives in industrial operations, focusing on measurable carbon footprint reduction.',
    targetValue: 700000,
    suffix: '+',
    unit: 'tons CO2e',
    headline: '700K+ tons CO2e emissions reduction impact from industrial sustainability initiatives',
  },
  {
    id: 'safety',
    label: 'Safety Performance Record',
    description:
      'Maintained zero lost-time incidents across high-risk LNG construction environments with strict safety compliance execution.',
    targetValue: 0,
    unit: 'LTI',
    headline: 'Zero Lost Time Incidents (LTI) across high-risk LNG construction environments',
  },
  {
    id: 'proper',
    label: 'PROPER',
    description:
      'Achieved top-tier PROPER certification recognition for environmental management and regulatory compliance performance.',
    targetValue: 0,
    headline: 'GOLD PROPER certification, top-tier environmental compliance recognition',
  },
  {
    id: 'systems',
    label: 'Production Systems',
    description: 'End-to-end applications with auth, databases, APIs, and deployment',
    targetValue: 4,
    unit: 'Full-stack Apps',
    headline: '4 full-stack production applications shipped (auth, databases, APIs, deployment)',
  },
  {
    id: 'ai',
    label: 'Gemini-powered Features',
    description: 'AI storyboards, itinerary generation, and content automation pipelines',
    targetValue: 3,
    unit: 'AI Integrations',
    headline:
      '3 AI integrations built using Gemini-powered features (storyboarding, itinerary generation, content automation)',
  },
  {
    id: 'tests',
    label: 'Backend Reliability',
    description: 'Jest + Supertest coverage across controllers and API layers',
    targetValue: 90,
    suffix: '%',
    unit: 'Test Coverage',
    headline: '~90% test coverage (Jest + Supertest) on backend systems',
  },
] as const;
