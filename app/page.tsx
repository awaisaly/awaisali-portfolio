import Image from 'next/image';
import {
  GitHubMark,
  KnowvioMark,
  LinkedInMark,
  NpmMark,
} from './components/BrandIcons';
import { ThemeToggleClient } from './components/ThemeToggleClient';
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Code2,
  CreditCard,
  Database,
  FileText,
  Gauge,
  GitBranch,
  GraduationCap,
  Layers3,
  Link as LinkIcon,
  Link2Off,
  Mail,
  MapPin,
  Menu,
  MonitorSmartphone,
  Network,
  Phone,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#why', label: 'Why me' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#open-source', label: 'Open Source' },
  { href: '#education', label: 'Education' },
] as const;

type LinkIconName = 'link' | 'github' | 'npm' | 'knowvio';
type Link = { label: string; href: string; icon?: LinkIconName };

type Project = {
  title: string;
  description: string;
  highlights: string[];
  stack: string[];
  links?: Link[];
  tone?: 'violet' | 'emerald' | 'sky' | 'amber' | 'rose';
};

const profile = {
  name: 'Awais Ali',
  role: 'Senior Software Engineer',
  location: 'Islamabad, Pakistan',
  email: 'awaisaly93@gmail.com',
  phone: '+92 332 061 7887',
  linkedin: 'https://www.linkedin.com/in/awaisaly',
  github: 'https://github.com/awaisaly',
};

type Skill = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  note?: string;
};

const skills: Skill[] = [
  { label: 'React', icon: Layers3 },
  { label: 'TypeScript', icon: Code2 },
  { label: 'Next.js', icon: MonitorSmartphone },
  {
    label: 'Node.js',
    icon: Code2,
    note: 'Backend APIs, CLIs, developer tools',
  },
  {
    label: 'GenAI products',
    icon: Network,
    note: 'Grounded AI, context workflows, agent tooling',
  },
  {
    label: 'LLM app patterns',
    icon: Network,
    note: 'Citation-backed answers, semantic recall, prompt flows',
  },
  {
    label: 'RAG pipelines',
    icon: Database,
    note: 'Source ingestion, grounding, citations, retrieval',
  },
  { label: 'REST APIs', icon: Network },
  { label: 'PostgreSQL', icon: Database },
  { label: 'MongoDB', icon: Database },
  { label: 'Redux', icon: Layers3 },
  { label: 'Hooks', icon: Gauge },
  { label: 'Context API', icon: Network },
  {
    label: 'Electron',
    icon: MonitorSmartphone,
    note: 'Familiarity (non-production)',
  },
  {
    label: 'JWT & Auth',
    icon: ShieldCheck,
    note: 'JWT, sessions, secure flows',
  },
  {
    label: 'Payments',
    icon: CreditCard,
    note: 'Stripe, Adyen, POS & payment flows',
  },
  { label: 'Git', icon: GitBranch, note: 'Branching, PR reviews, workflows' },
  { label: 'MySQL / SQL Server', icon: Database },
  { label: 'Firebase', icon: ShieldCheck },
  { label: 'Python Flask', icon: Code2, note: 'Working knowledge' },
  { label: 'ASP.NET', icon: Code2, note: 'Working knowledge' },
];

const experience = [
  {
    role: 'Creator',
    company: 'Knowvio',
    period: 'Mar 2026 – Present',
    tone: 'violet' as const,
    bullets: [
      'Built and launched a GenAI knowledge workspace focused on grounded, citation-backed outputs.',
      'Designed full-stack, context-first workflows that connect URLs, PDFs, images, videos, and text on a single visual board.',
      'Shaped product direction, AI UX, and execution for fast iteration during beta.',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Next Order',
    period: 'Feb 2022 – Present',
    tone: 'emerald' as const,
    bullets: [
      'Built and maintained large-scale customer-facing online ordering platforms and operations tooling.',
      'Implemented complex menu structures, modifiers, vouchers, loyalty programs, and Stripe/Adyen payment flows.',
      'Worked on restaurant POS systems: kiosks, split payments, dine-in layouts, and multi-device workflows.',
      'Enhanced admin panels for order management, reporting, shifts, and operational settings across API-driven workflows.',
      'Collaborated asynchronously with cross-functional remote teams on production systems.',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Emumba',
    period: 'Jan 2020 – Feb 2022',
    tone: 'violet' as const,
    bullets: [
      'Led product development for a Zero Trust Network Access (ZTNA) application (Web + Electron).',
      'Contributed to Polarr (20M+ users) focusing on UI components and performance.',
      'Built enterprise tools including an ETL + analytics platform with complex data-source and reporting workflows.',
      'Mentored engineers and contributed to architecture decisions and coding standards.',
    ],
  },
  {
    role: 'Development Team Lead',
    company: 'Incline Artificial Intelligence',
    period: 'Jun 2018 – Jan 2020',
    tone: 'amber' as const,
    bullets: [
      'Led full-stack delivery with React, Python Flask APIs, MongoDB, and PostgreSQL across enterprise systems.',
      'Delivered surveillance, ERP, LMS, and drone-management platforms with data-heavy operational workflows.',
      'Established scalable architecture and consistent coding standards across projects.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'Burqstream Technologies',
    period: 'Apr 2017 – May 2018',
    tone: 'sky' as const,
    bullets: [
      'Developed desktop and web applications including image-analysis tools for environmental monitoring.',
      'Built reporting portals and dashboards using PHP and .NET technologies.',
    ],
  },
  {
    role: 'Software Developer & SQA Engineer',
    company: 'Early Career Roles',
    period: 'Aug 2015 – Apr 2017',
    tone: 'rose' as const,
    bullets: [
      'SAP / IT Executive — Toyota Garden Motors',
      'Full-Stack Web Developer — Pakistan Testing Service',
      'SQA Engineer — Altair Technologies (Jadoo TV)',
    ],
  },
];

const projects: Project[] = [
  {
    title: 'Knowvio — Premium Knowledge Workspace',
    description:
      'Built and launched Knowvio: a GenAI workspace that helps users ask, cite, and recall knowledge with confidence.',
    tone: 'violet',
    highlights: [
      'Role: Creator of Knowvio',
      'Connects URLs, PDFs, images, videos, and text into a visual knowledge graph',
      'Enables citation-backed chat, semantic recall, and reusable decision outputs',
      'Combines product strategy, AI UX, and full-stack execution',
    ],
    stack: [
      'GenAI product',
      'Full-stack execution',
      'AI knowledge workflows',
      'Grounded answers',
      'Context graph',
    ],
    links: [
      {
        label: 'Knowvio',
        href: 'https://knowvio.awaisali.net/',
        icon: 'knowvio',
      },
    ],
  },
  {
    title: 'Restaurant Ordering & POS Systems',
    description:
      'High-traffic full-stack ordering, payments, POS flows, and admin reporting for restaurant operations.',
    tone: 'emerald',
    highlights: [
      'Complex menu + modifier architecture, vouchers, loyalty programs',
      'Stripe/Adyen payments, split payments, kiosk workflows',
      'API-driven operational tooling: shifts, reports, settings, order management',
    ],
    stack: [
      'React',
      'TypeScript',
      'REST APIs',
      'Stripe',
      'Adyen',
      'POS integrations',
    ],
    links: [
      {
        label: 'Next Order Website',
        href: 'https://nextorder.com/',
        icon: 'link',
      },
    ],
  },
  {
    title: 'Polarr Photo Editor (20M+ users)',
    description:
      'UI components and performance improvements for a high-scale photo editing experience.',
    tone: 'violet',
    highlights: [
      'Component-driven UI architecture with React + Redux',
      'Performance-focused iteration on key interaction flows',
      'Collaboration within a large production codebase',
    ],
    stack: ['React', 'Redux', 'WebGL (basics)'],
    links: [
      {
        label: 'Polarr Website',
        href: 'https://www.polarr.com/',
        icon: 'link',
      },
    ],
  },
  {
    title: 'ZTNA Security Application (Web + Electron)',
    description:
      'Zero Trust Network Access client built with React/TypeScript delivered across web and desktop.',
    tone: 'amber',
    highlights: [
      'Shared UI foundations across Web and Electron Desktop',
      'Security-focused UX for authentication and access workflows',
      'Stable release cadence and production hardening',
    ],
    stack: ['React', 'TypeScript', 'Electron'],
    links: [
      {
        label: 'ZTNA by Extreme Networks',
        href: 'https://www.extremenetworks.com/resources/blogs/what-is-universal-ztna',
        icon: 'link',
      },
    ],
  },
  {
    title: 'COVID-19 Awareness Dashboard (Volunteer)',
    description:
      'A global COVID-19 dashboard focused on clear visualization, accessibility, and guidance.',
    tone: 'sky',
    highlights: [
      'Readable, accessible visualizations for non-technical users',
      'Public health guidelines and statistics presentation',
      'Information architecture optimized for clarity',
    ],
    stack: ['React', 'Data visualization'],
  },
  {
    title: 'Data Workbench for Aera Technologies',
    description:
      'An ETL + analytics tool that extracts, maps, and analyzes data from multiple sources (SAP, Oracle, MSSQL, MySQL) for business teams.',
    tone: 'violet',
    highlights: [
      'Complex data-source configuration and mapping workflows',
      'Reusable UI patterns with React + Redux for large forms and tables',
      'Designed for enterprise-scale datasets and reporting needs',
    ],
    stack: ['React', 'Redux', 'ETL', 'Analytics', 'Enterprise UI'],
    links: [
      {
        label: 'Aera Data Workbench',
        href: 'https://www.aeratechnology.com/data-workbench/',
        icon: 'link',
      },
    ],
  },
  {
    title: 'I-Resource Management System',
    description:
      'Employee management platform with Leave Management plus HR and Finance modules for internal operations.',
    tone: 'emerald',
    highlights: [
      'Role-based workflows for employees, HR, and finance stakeholders',
      'Leave approvals, status tracking, and operational reporting',
      'UI integrated with RESTful APIs for real-time data updates',
    ],
    stack: ['React', 'Redux', 'REST APIs (.NET)', 'PostgreSQL', 'HR/Finance'],
  },
  {
    title: 'Surveillance System',
    description:
      'Security solution for attendance and monitoring using facial detection and recognition for indoor/outdoor environments.',
    tone: 'sky',
    highlights: [
      'Operational dashboards for monitoring and event review',
      'Responsive UI for live feeds and structured metadata',
      'Integrated with Python Flask APIs and MongoDB (NoSQL)',
    ],
    stack: ['React', 'Redux', 'Python Flask', 'MongoDB', 'Security'],
  },
  {
    title: 'Drone Configurator (Smart Self-Flying Drone)',
    description:
      'Web portal to configure and operate an autonomous drone: deliveries, rescue, surveillance, and remote-controlled movement.',
    tone: 'amber',
    highlights: [
      'Mission/task configuration UI with validation and state flows',
      'Real-time operational controls and telemetry-style views',
      'Integrated with Python Flask APIs and MongoDB (NoSQL)',
    ],
    stack: ['React', 'Redux', 'Python Flask', 'MongoDB', 'Autonomy'],
  },
  {
    title: 'ERP for Recruitment',
    description:
      'Recruitment lifecycle management system from registration through exams, trade allocation, and passing out.',
    tone: 'rose',
    highlights: [
      'Multi-step candidate workflows with audit-friendly history',
      'Admin tooling for allocations, schedules, and progress tracking',
      'Integrated with Python Flask APIs and PostgreSQL',
    ],
    stack: ['React', 'Redux', 'Python Flask', 'PostgreSQL', 'ERP'],
  },
  {
    title: 'IntelliSky Studio',
    description:
      'Desktop application to compute vegetation/health indices from sensor imagery (e.g., Parrot Sequoia, SlantRange) to assess greenery.',
    tone: 'sky',
    highlights: [
      'Sensor image processing workflows with results visualization',
      'Desktop UX focused on precision, speed, and repeatability',
      'Built with C# (WPF) for rich desktop tooling',
    ],
    stack: ['C#', 'WPF', 'Desktop', 'Image indices', 'Sensors'],
    links: [
      {
        label: 'IntelliSky Studio Demo Video (YouTube)',
        href: 'https://www.youtube.com/watch?v=CZ2wxPG-uZI',
      },
    ],
  },
  {
    title: 'VASI Web Portal',
    description:
      'Reporting portal for TV advertisement detection pipelines, enabling visualization and analysis of processed broadcast data.',
    tone: 'emerald',
    highlights: [
      'Dashboard-style reporting with filters and exportable views',
      'UI built on a Metronic-based design system',
      'Integrated reporting on top of live-channel processing output',
    ],
    stack: ['PHP (CodeIgniter)', 'HTML', 'CSS', 'JavaScript', 'jQuery'],
  },
  {
    title: 'Reports Tool (Internal)',
    description:
      'An internal utility to manage and view Crystal Reports across departments with role-based permissions.',
    tone: 'amber',
    highlights: [
      'Admin panel for departments, reports, and user access control',
      'Multiple permission levels (admin, manager, end-user)',
      'Desktop-friendly UX for fast report retrieval',
    ],
    stack: ['C#', 'WPF', 'SQL', 'Crystal Reports', 'PowerPoint'],
  },
  {
    title: 'Maintenance Reminder System (MRS)',
    description:
      'Customer follow-up system for maintenance reminders based on service history, integrated with SAP Business One.',
    tone: 'violet',
    highlights: [
      'Reminder scheduling and customer history-driven workflows',
      'Reporting views for service teams and management',
      'Integrated with SAP DI API and internal databases',
    ],
    stack: ['C#', 'WPF', 'SQL', 'Crystal Reports', 'SAP DI API'],
  },
];

const openSourceContributions: Project[] = [
  {
    title: 'Explain My Error — AI debugging CLI',
    description:
      'A CLI that turns confusing programming errors into clear fixes directly in the terminal, with practical remediation steps and explanations.',
    tone: 'emerald',
    highlights: [
      'Provides plain-English explanations, likely causes, ranked fix plans, and ELI5 output',
      'Supports interactive mode, inline explanations, JSON mode, and piped input',
      'Quick install: npm i -g explain-my-error',
      'Context-aware debugging via stack/code/framework/runtime flags and an Agent Skill integration',
    ],
    stack: [
      'Node.js',
      'TypeScript',
      'CLI',
      'AI tooling',
      'Developer Experience',
    ],
    links: [
      {
        label: 'explain-my-error',
        href: 'https://github.com/awaisaly/explain-my-error',
        icon: 'github',
      },
      {
        label: 'explain-my-error (npm package)',
        href: 'https://www.npmjs.com/package/explain-my-error',
        icon: 'npm',
      },
    ],
  },
  {
    title: 'Mini Coding Agent',
    description:
      'A tiny Node.js CLI that implements the Agent Skills concept: discovers skills, routes prompts, and runs Claude via Anthropic’s API.',
    tone: 'rose',
    highlights: [
      'Discovers local skills and loads only relevant ones into context for each prompt',
      'Supports community skills and auto-synced external skills via sparse git checkouts',
      'Includes interactive mode and practical CLI flags (model, max-steps, verbose)',
    ],
    stack: ['Node.js', 'JavaScript', 'CLI', 'Agent Skills', 'Anthropic API'],
    links: [
      {
        label: 'mini-coding-agent',
        href: 'https://github.com/awaisaly/mini-coding-agent',
        icon: 'github',
      },
    ],
  },
  {
    title: 'lumidot — Dot-grid loading animations for React',
    description:
      'Dot-grid loading animations for React. Tiny, flexible, beautiful. 36 patterns & 20 colors.',
    tone: 'sky',
    highlights: [
      'The library originally focused on a fixed 3×3 grid; I shipped a feature to make it fully configurable as an x×y dot grid (rows/cols).',
      'Introduced a single generic resolver: getPatternFrames(pattern, rows, cols, direction)',
      'Updated the playground with rows/cols controls',
    ],
    stack: ['TypeScript', 'React', 'Animations', 'Open Source', 'npm package'],
    links: [
      {
        label: 'lumidot',
        href: 'https://github.com/awaisaly/lumidot',
        icon: 'github',
      },
      {
        label: 'lumidot (npm package)',
        href: 'https://www.npmjs.com/package/lumidot',
        icon: 'npm',
      },
    ],
  },
];

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground'
    >
      {children}
    </a>
  );
}

function LinkChip({
  href,
  label,
  icon = 'link',
}: {
  href: string;
  label: string;
  icon?: LinkIconName;
}) {
  const Icon =
    icon === 'github'
      ? GitHubMark
      : icon === 'npm'
        ? NpmMark
        : icon === 'knowvio'
          ? KnowvioMark
          : LinkIcon;
  const iconSizeClass = icon === 'npm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='link-chip group inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-card-solid px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 motion-safe:duration-200 sm:backdrop-blur'
    >
      <Icon
        className={`link-chip-icon ${iconSizeClass} flex-none text-muted`}
        aria-hidden='true'
      />
      <span className='truncate'>{label}</span>
      <ArrowUpRight
        className='link-chip-arrow h-4 w-4 flex-none text-muted'
        aria-hidden='true'
      />
    </a>
  );
}

function LinkChipPlaceholder({ label }: { label: string }) {
  return (
    <span className='inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted'>
      <Link2Off className='h-4 w-4 flex-none' aria-hidden='true' />
      <span className='truncate'>{label}</span>
    </span>
  );
}

function ButtonLink({
  href,
  children,
  variant = 'primary',
  download,
  newTab,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  download?: boolean;
  newTab?: boolean;
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition focus-visible:outline-none';
  const styles =
    variant === 'primary'
      ? 'bg-primary text-primary-foreground shadow-sm hover:opacity-95'
      : 'border border-border bg-card text-foreground hover:bg-card-solid';

  return (
    <a
      href={href}
      download={download}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      className={[base, styles].join(' ')}
    >
      {children}
    </a>
  );
}

function Tone({
  tone,
}: {
  tone: 'violet' | 'emerald' | 'sky' | 'amber' | 'rose';
}) {
  const cls =
    tone === 'emerald'
      ? 'bg-emerald-500/65'
      : tone === 'sky'
        ? 'bg-sky-500/65'
        : tone === 'amber'
          ? 'bg-amber-500/65'
          : tone === 'rose'
            ? 'bg-rose-500/65'
            : 'bg-violet-500/65';

  return (
    <span
      aria-hidden='true'
      className={[
        'pointer-events-none absolute inset-x-6 top-0 h-1 rounded-b-full',
        cls,
      ].join(' ')}
    />
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
  description,
  tone = 'violet',
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  description: string;
  tone?: 'violet' | 'emerald' | 'sky' | 'amber' | 'rose';
}) {
  const ring =
    tone === 'emerald'
      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
      : tone === 'sky'
        ? 'bg-sky-500/10 text-sky-600 dark:text-sky-300'
        : tone === 'amber'
          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
          : tone === 'rose'
            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-300'
            : 'bg-violet-500/10 text-violet-600 dark:text-violet-300';

  return (
    <div className='group signature-surface relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md motion-safe:duration-200 sm:p-6 sm:backdrop-blur'>
      <Tone tone={tone} />
      <div className='relative'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wide text-muted'>
              {title}
            </p>
            <p className='mt-2 text-3xl font-semibold tracking-tight'>
              {value}
            </p>
          </div>
          <div
            className={[
              'grid h-11 w-11 place-items-center rounded-2xl border border-border transition motion-safe:duration-200 group-hover:scale-110 group-hover:-rotate-3',
              ring,
            ].join(' ')}
          >
            <Icon className='h-5 w-5' aria-hidden='true' />
          </div>
        </div>
        <p className='mt-3 text-sm leading-6 text-muted'>{description}</p>
      </div>
    </div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <div className='group signature-surface relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md motion-safe:duration-200 sm:p-5 sm:backdrop-blur'>
      <div className='pointer-events-none absolute inset-0 rounded-2xl border border-primary/25 opacity-0 transition group-hover:opacity-100 motion-safe:duration-200' />
      <div className='relative flex items-start gap-3'>
        <div className='grid h-10 w-10 place-items-center rounded-2xl border border-border bg-card-solid'>
          <Icon
            className='h-5 w-5 text-muted transition group-hover:text-foreground motion-safe:duration-200'
            aria-hidden='true'
          />
        </div>
        <div className='min-w-0'>
          <p className='text-sm font-semibold tracking-tight'>{skill.label}</p>
          {skill.note ? (
            <p className='mt-1 text-xs leading-5 text-muted'>{skill.note}</p>
          ) : (
            <p className='mt-1 text-xs leading-5 text-muted'>
              Production experience
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className='scroll-mt-24'>
      <div className='sticky top-16 z-30 -mx-3 mb-5 border-b border-border/60 bg-background/85 px-3 py-2 sm:-mx-6 sm:px-6 sm:backdrop-blur'>
        <div className='flex items-center gap-3'>
          <span aria-hidden='true' className='h-px flex-1 bg-border/70' />
          <div className='pointer-events-auto inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 shadow-sm sm:backdrop-blur'>
            <span
              aria-hidden='true'
              className='section-dot h-2 w-2 flex-none rounded-full bg-primary/60'
            />
            <h2 className='truncate text-sm font-semibold tracking-tight sm:text-base'>
              {title}
            </h2>
          </div>
          <span aria-hidden='true' className='h-px flex-1 bg-border/70' />
        </div>
      </div>

      {subtitle ? (
        <p className='mb-6 max-w-2xl text-sm leading-6 text-muted'>
          {subtitle}
        </p>
      ) : null}
      {children}
    </section>
  );
}

export default function Home() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.awaisali.net';

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: profile.name,
    givenName: 'Awais',
    familyName: 'Ali',
    jobTitle: profile.role,
    description:
      'Senior Software Engineer with 10+ years of experience building scalable web applications, API-driven platforms, payments/POS systems, and AI-powered developer and knowledge tools.',
    url: `${siteUrl}/`,
    image: `${siteUrl}/Awais-Ali.png`,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Bahria University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Islamabad',
        addressCountry: 'PK',
      },
    },
    knowsLanguage: ['English', 'Urdu'],
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: [
      'Remote work',
      'Distributed teams',
      'React',
      'TypeScript',
      'Next.js',
      'Full-stack architecture',
      'Node.js',
      'Backend development',
      'Full-stack development',
      'Generative AI',
      'LLM applications',
      'AI developer tools',
      'Semantic search',
      'Citation-backed AI',
      'POS systems',
      'Payment integrations',
    ],
    hasOccupation: [
      { '@type': 'Occupation', name: 'Creator' },
      {
        '@type': 'Occupation',
        name: 'Senior Software Engineer',
        occupationLocation: {
          '@type': 'City',
          name: 'Islamabad',
          address: { '@type': 'PostalAddress', addressCountry: 'PK' },
        },
      },
      { '@type': 'Occupation', name: 'Senior Frontend Engineer' },
      { '@type': 'Occupation', name: 'Senior React Developer' },
      { '@type': 'Occupation', name: 'Node.js Developer' },
      { '@type': 'Occupation', name: 'Full Stack Developer' },
      { '@type': 'Occupation', name: 'GenAI Developer' },
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Awais Ali — Portfolio',
    url: `${siteUrl}/`,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
    },
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/#webpage`,
    name: 'Awais Ali — Senior Full Stack & GenAI Developer',
    url: `${siteUrl}/`,
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#person` },
    inLanguage: 'en',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${siteUrl}/Awais-Ali.png`,
    },
  };

  const openSourceJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      '@id': 'https://github.com/awaisaly/explain-my-error',
      name: 'explain-my-error',
      description:
        'An AI debugging CLI that explains programming errors in plain English and provides ranked remediation steps.',
      codeRepository: 'https://github.com/awaisaly/explain-my-error',
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'Node.js',
      author: { '@id': `${siteUrl}/#person` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      '@id': 'https://github.com/awaisaly/mini-coding-agent',
      name: 'mini-coding-agent',
      description:
        'A tiny AI coding-agent CLI implementing the Agent Skills concept: discovers skills, routes prompts, and runs Claude via Anthropic’s API.',
      codeRepository: 'https://github.com/awaisaly/mini-coding-agent',
      programmingLanguage: 'JavaScript',
      runtimePlatform: 'Node.js',
      author: { '@id': `${siteUrl}/#person` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      '@id': 'https://github.com/awaisaly/lumidot',
      name: 'lumidot (contribution)',
      description:
        'Contribution: upgraded dot-grid loading animations from fixed 3×3 to configurable x×y (rows/cols).',
      codeRepository: 'https://github.com/awaisaly/lumidot',
      programmingLanguage: 'TypeScript',
      author: { '@id': `${siteUrl}/#person` },
    },
  ];

  const knowvioJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Knowvio',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://knowvio.awaisali.net/',
    creator: { '@id': `${siteUrl}/#person` },
    description:
      'GenAI knowledge workspace for connecting sources, generating citation-backed answers, and improving semantic recall.',
  };

  return (
    <div
      id='intro'
      className='relative min-h-screen bg-background text-foreground'
    >
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            personJsonLd,
            websiteJsonLd,
            webPageJsonLd,
            knowvioJsonLd,
            ...openSourceJsonLd,
          ]),
        }}
      />
      <a
        href='#content'
        className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-sm sm:backdrop-blur'
      >
        Skip to content
      </a>

      <header className='fixed left-0 top-0 z-40 w-full border-b border-border bg-card/90 backdrop-blur-none md:sticky md:top-0 md:bg-card/70 md:backdrop-blur'>
        <div className='mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-3 sm:px-6'>
          <a
            href='#intro'
            className='group flex min-w-0 items-center gap-3 rounded-2xl px-1.5 py-1 transition hover:bg-card-solid'
            aria-label='Go to intro section'
          >
            <span className='relative h-9 w-9 flex-none overflow-hidden rounded-2xl border border-border bg-card-solid shadow-sm'>
              <Image
                src='/Awais-Ali.png'
                alt='Awais Ali'
                width={72}
                height={72}
                className='relative h-full w-full object-cover'
              />
            </span>

            <span className='min-w-0'>
              <span className='flex items-center gap-2'>
                <span className='truncate text-sm font-semibold tracking-tight'>
                  {profile.name}
                </span>
              </span>
              <span className='block truncate text-xs text-muted'>
                {profile.role}
              </span>
            </span>
          </a>

          <nav className='hidden items-center gap-5 text-sm text-muted md:flex'>
            {navItems.map((item) => (
              <a
                key={item.href}
                className='relative transition-colors motion-safe:duration-200 hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-200 hover:after:w-full'
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className='flex items-center gap-3'>
            <a
              href='/CV-Awais-Ali.pdf'
              className='hidden items-center justify-center gap-2 rounded-full border border-border bg-card px-2.5 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur transition hover:bg-card-solid sm:px-5 sm:py-2.5 md:inline-flex'
              aria-label='View resume (PDF)'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FileText className='h-4 w-4' aria-hidden='true' />
              <span className='hidden sm:inline'>Resume</span>
            </a>
            <ThemeToggleClient />

            {/* JS-free mobile nav (reduces shipped JS on mobile for better PageSpeed). */}
            <a
              href='#mobile-menu'
              aria-label='Open menu'
              className='inline-flex items-center justify-center rounded-full border border-border bg-card p-2 shadow-sm transition hover:bg-card-solid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:hidden'
            >
              <Menu className='h-4 w-4' aria-hidden='true' />
            </a>
          </div>
        </div>
      </header>
      <div className='h-16 md:hidden' aria-hidden='true' />

      {/* :target-driven mobile menu overlay (no React state/effects needed). */}
      <div
        id='mobile-menu'
        className='fixed inset-0 z-50 hidden md:hidden target:block'
      >
        <a
          href='#'
          aria-label='Close menu'
          className='absolute inset-0 bg-black/40'
        />
        <div className='absolute left-1/2 top-3 w-[min(92vw,420px)] -translate-x-1/2 overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-xl sm:backdrop-blur'>
          <div className='flex items-center justify-between gap-3 px-1'>
            <p className='text-sm font-semibold tracking-tight'>Menu</p>
            <a
              href='#'
              aria-label='Close menu'
              className='inline-flex items-center justify-center rounded-full border border-border bg-card-solid p-2 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60'
            >
              <X className='h-4 w-4' aria-hidden='true' />
            </a>
          </div>

          <div className='mt-3 grid gap-1'>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className='rounded-2xl border border-transparent px-3 py-3 text-sm font-medium text-foreground transition hover:border-border hover:bg-card-solid'
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className='mt-3 border-t border-border pt-3'>
            <a
              href='/CV-Awais-Ali.pdf'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-95'
            >
              <FileText className='h-4 w-4' aria-hidden='true' />
              Resume (PDF)
            </a>
          </div>
        </div>
      </div>

      <main
        id='content'
        className='mx-auto w-full max-w-6xl px-3 py-10 sm:px-6 sm:py-16'
      >
        <div className='signature-surface relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-12 sm:backdrop-blur'>
          <div className='pointer-events-none absolute inset-x-8 top-0 h-px bg-border/80' />

          <div className='relative'>
            <div className='flex flex-col gap-8 md:flex-row md:items-end md:justify-between'>
              <div className='max-w-2xl'>
                <div className='mt-1 flex items-center gap-4 animate-enter-2'>
                  <div className='relative h-14 w-14 overflow-hidden rounded-2xl border border-border bg-card-solid shadow-sm'>
                    <Image
                      src='/Awais-Ali.png'
                      alt='Awais Ali'
                      width={112}
                      height={112}
                      fetchPriority='high'
                      loading='eager'
                      sizes='112px'
                      className='relative h-full w-full object-cover'
                      priority
                    />
                  </div>
                  <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl'>
                    <span>{profile.name}</span>
                  </h1>
                </div>
                <p className='mt-3 text-lg text-muted animate-enter-3'>
                  {profile.role}
                </p>
                <div className='mt-3 animate-enter-4'>
                  <span className='interactive-pill inline-flex items-center gap-2 rounded-full border border-border bg-card-solid px-3 py-1.5 text-sm text-muted'>
                    <MapPin className='h-4 w-4' aria-hidden='true' />
                    <span className='truncate font-medium text-foreground'>
                      {profile.location}
                    </span>
                  </span>
                </div>
                <p className='mt-6 max-w-xl text-sm leading-7 text-muted animate-enter-5'>
                  Senior Software Engineer with 10+ years of experience building
                  scalable web apps, API-driven platforms, payment/POS systems,
                  and AI-powered developer tools. I bring strong
                  React/TypeScript depth, practical backend experience, and a
                  product mindset for shipping useful AI workflows.
                </p>
                <div className='mt-7 flex flex-col gap-3 sm:flex-row animate-enter-5'>
                  <ButtonLink href={`mailto:${profile.email}`}>
                    <Mail className='h-4 w-4' aria-hidden='true' />
                    Let’s talk
                    <ArrowUpRight className='h-4 w-4' aria-hidden='true' />
                  </ButtonLink>
                  <ButtonLink href='/CV-Awais-Ali.pdf' variant='ghost' newTab>
                    <FileText className='h-4 w-4' aria-hidden='true' />
                    View Resume (PDF)
                  </ButtonLink>
                </div>
              </div>

              <div className='w-full max-w-md rounded-2xl border border-border bg-card-solid p-4 shadow-sm animate-enter-3 sm:p-5'>
                <p className='text-xs font-semibold uppercase tracking-wide text-muted'>
                  Contact
                </p>
                <div className='mt-4 grid gap-2 text-sm'>
                  <a
                    className='flex min-w-0 flex-col items-start gap-1 rounded-xl border border-border bg-background px-3 py-2.5 transition hover:bg-card-solid sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4 sm:py-3'
                    href={`mailto:${profile.email}`}
                  >
                    <span className='flex items-center gap-2 text-muted shrink-0'>
                      <Mail className='h-4 w-4' aria-hidden='true' />
                      Email
                    </span>
                    <span className='min-w-0 max-w-full truncate font-medium sm:text-right'>
                      {profile.email}
                    </span>
                  </a>
                  <a
                    className='flex min-w-0 flex-col items-start gap-1 rounded-xl border border-border bg-background px-3 py-2.5 transition hover:bg-card-solid sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4 sm:py-3'
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  >
                    <span className='flex items-center gap-2 text-muted shrink-0'>
                      <Phone className='h-4 w-4' aria-hidden='true' />
                      Phone
                    </span>
                    <span className='min-w-0 max-w-full truncate font-medium sm:text-right'>
                      {profile.phone}
                    </span>
                  </a>
                  <div className='grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2'>
                    <a
                      className='inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium transition hover:bg-card-solid sm:px-4 sm:py-3'
                      href={profile.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <LinkedInMark className='h-4 w-4' />
                      LinkedIn
                    </a>
                    <a
                      className='inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium transition hover:bg-card-solid sm:px-4 sm:py-3'
                      href={profile.github}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <GitHubMark className='h-4 w-4' />
                      GitHub
                    </a>
                    <a
                      className='col-span-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-95 sm:col-span-2 sm:px-4 sm:py-3'
                      href='/CV-Awais-Ali.pdf'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <FileText className='h-4 w-4' aria-hidden='true' />
                      View Resume (PDF)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-14 grid gap-14'>
          <Section
            id='about'
            title='About'
            subtitle='A quick snapshot of how I work and what I optimize for.'
          >
            <div className='grid gap-4 rounded-2xl border border-border bg-card p-4 sm:p-6'>
              <p className='text-sm leading-7 text-muted'>
                I build full-stack products that stay maintainable under real
                product pressure: clear interfaces, predictable state, reliable
                APIs, and performance that holds up as features grow. Recently,
                my focus has expanded into GenAI products, grounded knowledge
                workflows, and developer tools that turn AI into practical user
                value.
              </p>
              <div className='flex flex-wrap gap-2'>
                <span className='rounded-full border border-border bg-card-solid px-3 py-1 text-xs text-muted'>
                  Full-stack product engineering
                </span>
                <span className='rounded-full border border-border bg-card-solid px-3 py-1 text-xs text-muted'>
                  GenAI apps & agent tooling
                </span>
                <span className='rounded-full border border-border bg-card-solid px-3 py-1 text-xs text-muted'>
                  React, Node.js, APIs & data
                </span>
              </div>
            </div>
          </Section>

          <Section
            id='why'
            title='Why me'
            subtitle='Proof points that show how I deliver across product, backend, frontend, data, and AI workflows.'
          >
            <div className='stats-grid grid gap-4 md:grid-cols-2'>
              <StatCard
                tone='violet'
                icon={Users}
                title='Experience'
                value='10+ years'
                description='Building scalable customer products, internal platforms, and data-heavy business workflows.'
              />
              <StatCard
                tone='emerald'
                icon={Building2}
                title='Full-stack ownership'
                value='End-to-end'
                description='Comfortable owning features across UI, APIs, data flows, integrations, and production feedback.'
              />
              <StatCard
                tone='sky'
                icon={GraduationCap}
                title='GenAI direction'
                value='AI products'
                description='Built AI knowledge and developer tools around grounded outputs, semantic recall, and useful workflows.'
              />
              <StatCard
                tone='violet'
                icon={Layers3}
                title='Architecture'
                value='Scalable systems'
                description='Strong focus on clean boundaries, maintainable components, predictable state, and practical API contracts.'
              />
              <StatCard
                tone='amber'
                icon={ShieldCheck}
                title='Security & stability'
                value='Production ready'
                description='ZTNA, auth flows, secure product UX, and real-world hardening for stable systems.'
              />
              <StatCard
                tone='emerald'
                icon={CreditCard}
                title='Payments & POS'
                value='Stripe + Adyen + POS'
                description='Complex ordering flows, split payments, kiosks, and operational tooling for restaurant workflows.'
              />
              <StatCard
                tone='rose'
                icon={Gauge}
                title='Performance mindset'
                value='Fast UX'
                description='Smooth interactions and reliable product behavior through profiling, architecture, and iterative refinement.'
              />
              <StatCard
                tone='amber'
                icon={MonitorSmartphone}
                title='Multi-platform'
                value='Web + Desktop'
                description='Built web apps, admin systems, CLIs, desktop tooling, and API-backed operational platforms.'
              />
            </div>
          </Section>

          <Section
            id='skills'
            title='Core skills'
            subtitle='Tools, frameworks, and practices I use in production.'
          >
            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {skills.map((s, idx) => (
                <div
                  key={s.label}
                  className='animate-enter'
                  style={{ animationDelay: `${Math.min(idx, 8) * 55}ms` }}
                >
                  <SkillCard skill={s} />
                </div>
              ))}
            </div>
          </Section>

          <Section
            id='experience'
            title='Professional experience'
            subtitle='Recent roles, responsibilities, and outcomes.'
          >
            <div className='experience-grid grid gap-4'>
              {experience.map((job, idx) => (
                <article
                  key={[job.role, job.company, job.period]
                    .filter(Boolean)
                    .join(' | ')}
                  className='animate-enter signature-surface relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md motion-safe:duration-200 sm:p-6 sm:backdrop-blur'
                  style={{ animationDelay: `${Math.min(idx, 8) * 55}ms` }}
                >
                  <Tone tone={job.tone} />
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                    <div className='flex min-w-0 items-start gap-3'>
                      <span className='mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-border bg-card-solid text-muted'>
                        <Briefcase className='h-4 w-4' aria-hidden='true' />
                      </span>
                      <div className='min-w-0'>
                        <h3 className='text-base font-semibold leading-snug tracking-tight wrap-break-word'>
                          {job.role}
                          {job.company ? (
                            <span className='font-medium text-muted'>
                              {' '}
                              — {job.company}
                            </span>
                          ) : null}
                        </h3>

                        <p className='mt-1 text-xs text-muted sm:hidden'>
                          {job.period}
                        </p>
                      </div>
                    </div>

                    <p className='hidden text-sm text-muted sm:block sm:pt-1'>
                      {job.period}
                    </p>
                  </div>
                  <ul className='mt-4 grid gap-2 text-sm leading-6 text-muted'>
                    {job.bullets.map((b) => (
                      <li key={b} className='flex gap-2'>
                        <span className='mt-2 h-1.5 w-1.5 flex-none rounded-full bg-foreground/70' />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id='projects'
            title='Projects'
            subtitle='A curated selection across full-stack products, AI tooling, enterprise systems, and high-traffic platforms.'
          >
            <div className='project-grid grid gap-4 md:grid-cols-2'>
              {projects.map((p, idx) => (
                <article
                  key={p.title}
                  className='group animate-enter signature-surface relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:bg-card-solid hover:-translate-y-1 hover:shadow-md motion-safe:duration-200 sm:p-6 sm:backdrop-blur'
                  style={{ animationDelay: `${Math.min(idx, 10) * 55}ms` }}
                >
                  <Tone tone={p.tone ?? 'violet'} />

                  <div>
                    <h3 className='text-base font-semibold tracking-tight'>
                      {p.title}
                    </h3>
                    <p className='mt-2 text-sm leading-6 text-muted'>
                      {p.description}
                    </p>

                    <ul className='mt-4 grid gap-2 text-sm leading-6 text-muted'>
                      {p.highlights.map((h) => (
                        <li key={h} className='flex gap-2'>
                          <span className='mt-2 h-1.5 w-1.5 flex-none rounded-full bg-foreground/70' />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='mt-auto pt-6'>
                    <div className='flex flex-wrap gap-2'>
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className='rounded-full border border-border bg-background px-3 py-1 text-xs text-muted'
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className='mt-4 flex flex-wrap gap-2'>
                      {p.links?.length ? (
                        p.links.map((l) => (
                          <LinkChip
                            key={l.href}
                            href={l.href}
                            label={l.label}
                            icon={l.icon}
                          />
                        ))
                      ) : (
                        <LinkChipPlaceholder label='No public link yet' />
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id='open-source'
            title='Open source contributions'
            subtitle='Public contributions and improvements shipped to open source projects.'
          >
            <div className='open-source-grid grid gap-4 md:grid-cols-2'>
              {openSourceContributions.map((p, idx) => (
                <article
                  key={p.title}
                  className='group animate-enter signature-surface relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:bg-card-solid hover:-translate-y-1 hover:shadow-md motion-safe:duration-200 sm:p-6 sm:backdrop-blur'
                  style={{ animationDelay: `${Math.min(idx, 8) * 55}ms` }}
                >
                  <Tone tone={p.tone ?? 'violet'} />

                  <div>
                    <h3 className='text-base font-semibold tracking-tight'>
                      {p.title}
                    </h3>
                    <p className='mt-2 text-sm leading-6 text-muted'>
                      {p.description}
                    </p>

                    <ul className='mt-4 grid gap-2 text-sm leading-6 text-muted'>
                      {p.highlights.map((h) => (
                        <li key={h} className='flex gap-2'>
                          <span className='mt-2 h-1.5 w-1.5 flex-none rounded-full bg-foreground/70' />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='mt-auto pt-6'>
                    <div className='flex flex-wrap gap-2'>
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className='rounded-full border border-border bg-background px-3 py-1 text-xs text-muted'
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className='mt-4 flex flex-wrap gap-2'>
                      {p.links?.length ? (
                        p.links.map((l) => (
                          <LinkChip
                            key={l.href}
                            href={l.href}
                            label={l.label}
                            icon={l.icon}
                          />
                        ))
                      ) : (
                        <LinkChipPlaceholder label='No public link yet' />
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id='education' title='Education'>
            <div className='rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6 sm:backdrop-blur'>
              <h3 className='flex items-center gap-2 text-base font-semibold tracking-tight'>
                <GraduationCap
                  className='h-4 w-4 text-muted'
                  aria-hidden='true'
                />
                Bachelor of Software Engineering
              </h3>
              <p className='mt-1 text-sm text-muted'>
                Bahria University, Islamabad • 2011 – 2015
              </p>
            </div>
          </Section>

          <section className='signature-surface relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10 sm:backdrop-blur'>
            <div className='pointer-events-none absolute inset-x-10 top-0 h-px bg-border/80' />
            <div className='relative'>
              <h2 className='text-2xl font-semibold tracking-tight'>
                Let’s build something great.
              </h2>
              <p className='mt-3 max-w-2xl text-sm leading-7 text-muted'>
                If you’re hiring for a full-stack developer who can own product
                features end-to-end, build practical GenAI workflows, and ship
                reliably in remote teams, I’d love to talk.
              </p>
              <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
                <ButtonLink href={`mailto:${profile.email}`}>
                  <Mail className='h-4 w-4' aria-hidden='true' />
                  Email me
                  <ArrowUpRight className='h-4 w-4' aria-hidden='true' />
                </ButtonLink>
                <ButtonLink href={profile.linkedin} variant='ghost' newTab>
                  <LinkedInMark className='h-4 w-4' />
                  Connect on LinkedIn
                  <ArrowUpRight className='h-4 w-4' aria-hidden='true' />
                </ButtonLink>
              </div>
            </div>
          </section>
        </div>

        <footer className='mt-14 border-t border-border pt-8 text-sm text-muted'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-sm'>
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            <div className='flex flex-wrap items-center gap-3'>
              <ExternalLink href={profile.linkedin}>
                <span className='inline-flex items-center gap-1.5'>
                  <LinkedInMark className='h-4 w-4' />
                  LinkedIn
                </span>
              </ExternalLink>
              <ExternalLink href={profile.github}>
                <span className='inline-flex items-center gap-1.5'>
                  <GitHubMark className='h-4 w-4' />
                  GitHub
                </span>
              </ExternalLink>
              <a
                className='font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground'
                href='/CV-Awais-Ali.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                <span className='inline-flex items-center gap-1.5'>
                  <FileText className='h-4 w-4' aria-hidden='true' />
                  Resume
                </span>
              </a>
              <a
                className='font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground'
                href={`mailto:${profile.email}`}
              >
                <span className='inline-flex items-center gap-1.5'>
                  <Mail className='h-4 w-4' aria-hidden='true' />
                  Email
                </span>
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
