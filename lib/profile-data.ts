/**
 * Single source of truth for profile facts that both the page sections and the AI chat assistant use.
 * Update here and the site and the chatbot stay in sync.
 * Tech stack: the icons live in components/sections/tech-stack.tsx, keep the names there in step with TECH_STACK below.
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
