import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import {
  Activity,
  ArrowUpRight,
  Bot,
  CalendarDays,
  ClipboardList,
  Drone,
  FileText,
  Grid3x3,
  Mail,
  ScanFace,
  Terminal,
  Tv,
  Wrench,
} from 'lucide-react';
import { ArchiveSection, type ArchiveItem } from './components/ArchiveSection';
import { Banner } from './components/Banner';
import { ConnectLinks } from './components/ConnectLinks';
import { GitHubMark, LinkedInMark } from './components/BrandIcons';
import { Dock } from './components/Dock';
import { AfterHours } from './components/AfterHours';
import { ProjectCard, type Project } from './components/ProjectCard';
import { ProjectCarousel } from './components/ProjectCarousel';
import { DotGridPreview, KnowvioPreview, TerminalPreview } from './components/ProjectPreviews';
import { profile } from './profile';

const projects: Project[] = [
  {
    name: 'Knowvio',
    kind: 'GenAI SaaS',
    description:
      'A visual canvas that turns URLs, PDFs, videos and notes into citation-backed answers you can trace and reuse.',
    accent: '#6366f1',
    icon: (
      <Image src='/icons/knowvio.svg' alt='' width={44} height={44} className='h-11 w-11' />
    ),
    preview: <KnowvioPreview />,
    links: [{ label: 'Website', href: 'https://knowvio.awaisali.net/' }],
  },
  {
    name: 'Explain My Error',
    kind: 'AI CLI',
    description:
      'Pipe any error into it and get a plain-English explanation with a ranked fix plan, right in your terminal.',
    accent: '#f97316',
    icon: <AppIcon className='bg-gradient-to-br from-rose-500 to-orange-400'><Terminal className='h-5 w-5' /></AppIcon>,
    preview: (
      <TerminalPreview
        title='~/app — zsh'
        lines={[
          { kind: 'command', text: 'npm test 2>&1 | explain-my-error' },
          { kind: 'output', text: "✖ TypeError: Cannot read properties of undefined (reading 'map')", tone: 'error' },
          { kind: 'output', text: '' },
          { kind: 'output', text: 'What happened', tone: 'heading' },
          { kind: 'output', text: '  `users` is undefined on first render, so .map() fails.' },
          { kind: 'output', text: 'Fix plan', tone: 'heading' },
          { kind: 'output', text: '  1. const users = data?.users ?? []', tone: 'ok' },
          { kind: 'output', text: '  2. Render a loading state until data resolves', tone: 'ok' },
        ]}
      />
    ),
    links: [
      { label: 'npm', href: 'https://www.npmjs.com/package/explain-my-error' },
      { label: 'GitHub', href: 'https://github.com/awaisaly/explain-my-error' },
    ],
  },
  {
    name: 'Mini Coding Agent',
    kind: 'AI agent',
    description:
      'A tiny coding agent that discovers Agent Skills, loads only the ones a prompt needs, and runs them on Claude.',
    accent: '#8b5cf6',
    icon: <AppIcon className='bg-gradient-to-br from-violet-500 to-indigo-500'><Bot className='h-5 w-5' /></AppIcon>,
    preview: (
      <TerminalPreview
        title='mini-coding-agent'
        lines={[
          { kind: 'command', text: 'mini-coding-agent "add dark mode to the navbar"' },
          { kind: 'output', text: '◇ discovered 14 skills' },
          { kind: 'output', text: '◇ routing → frontend-ui, tailwind', tone: 'accent' },
          { kind: 'output', text: '◇ loaded 2 skills into context' },
          { kind: 'output', text: '● claude  editing src/components/Navbar.tsx', tone: 'heading' },
          { kind: 'output', text: '● claude  editing src/styles/theme.css', tone: 'heading' },
          { kind: 'output', text: '✓ done in 6 steps', tone: 'ok' },
        ]}
      />
    ),
    links: [{ label: 'GitHub', href: 'https://github.com/awaisaly/mini-coding-agent' }],
  },
  {
    name: 'Lumidot',
    kind: 'Open-source contribution',
    description:
      'Rebuilt the dot-grid loader around one generic pattern resolver, so it renders any rows × cols grid, not just 3 × 3.',
    accent: '#06b6d4',
    icon: <AppIcon className='bg-gradient-to-br from-cyan-500 to-emerald-400'><Grid3x3 className='h-5 w-5' /></AppIcon>,
    preview: <DotGridPreview />,
    links: [
      { label: 'npm', href: 'https://www.npmjs.com/package/lumidot' },
      { label: 'GitHub', href: 'https://github.com/awaisaly/lumidot' },
    ],
  },
];

// Alternating wide/narrow columns on desktop: 7+5, then 5+7.
const bentoSpans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];

type Role = {
  period: string;
  role: string;
  company: string;
  href: string;
  summary: string;
  logo?: string;
};

const experience: Role[] = [
  {
    period: '2026 — Now',
    role: 'Software Engineer',
    company: 'HATO',
    href: 'https://www.hato.lighting/',
    logo: '/logos/hato.svg',
    summary:
      'Building HLM Pro, an Electron app for intelligent lighting in poultry, dairy and fish farms, plus its real-time customer dashboard and GIS-powered sales tools.',
  },
  {
    period: '2026 — Now',
    role: 'Creator',
    company: 'Knowvio',
    href: 'https://knowvio.awaisali.net/',
    logo: '/icons/knowvio.svg',
    summary:
      'Designed, built and shipped a full-stack GenAI product: RAG pipeline, LLM orchestration, Postgres and a visual canvas.',
  },
  {
    period: '2022 — 2026',
    role: 'Senior Software Engineer',
    company: 'Next Order',
    href: 'https://nextorder.com/',
    logo: '/logos/nextorder.svg',
    summary:
      'Online ordering, POS and Stripe/Adyen payments for restaurants, plus a KYC onboarding portal and an AI-assisted installments portal.',
  },
  {
    period: '2020 — 2022',
    role: 'Senior Software Engineer',
    company: 'Emumba',
    href: 'https://emumba.com/',
    logo: '/logos/emumba.jpg',
    summary:
      'Led the ZTNA security client on web and Electron, and worked on Polarr (20M+ users) and Aera’s data workbench.',
  },
  {
    period: '2018 — 2020',
    role: 'Development Team Lead',
    company: 'Incline AI',
    href: 'https://www.linkedin.com/company/incline-artificial-intelligence',
    logo: '/logos/incline.jpg',
    summary:
      'Led delivery of surveillance, ERP, LMS and drone platforms on React with Flask and .NET APIs.',
  },
  {
    period: '2017 — 2018',
    role: 'Software Developer',
    company: 'Burqstream',
    href: 'https://www.linkedin.com/company/burqstream-technologies/',
    logo: '/logos/burqstream.jpg',
    summary: 'Desktop image-analysis tools in C# and WPF, and reporting portals in PHP.',
  },
];

const earlyCareer: Role[] = [
  {
    period: '2015 — 2017',
    role: 'SAP / IT Executive',
    company: 'Toyota Garden Motors',
    href: 'https://toyotagarden.com/',
    logo: '/logos/toyota-garden.jpg',
    summary:
      'Ran SAP Business One for the dealership and built a C# service-reminder app on top of it.',
  },
  {
    period: '2015 — 2017',
    role: 'Full-Stack Web Developer',
    company: 'Pakistan Testing Service',
    href: 'https://www.pts.org.pk/',
    logo: '/logos/pts.jpg',
    summary: 'Built and maintained web applications for one of Pakistan’s national testing services.',
  },
  {
    period: '2015 — 2017',
    role: 'SQA Engineer',
    company: 'Altair Technologies (Jadoo TV)',
    href: 'https://www.linkedin.com/company/jadootv-inc/',
    summary: 'Tested releases of the JadooTV streaming apps and set-top boxes.',
  },
];

const archive: ArchiveItem[] = [
  {
    name: 'Restaurant Ordering & POS',
    kind: 'Next Order',
    description: 'Online ordering, kiosks, split payments and admin reporting for live restaurants.',
    link: { label: 'Website', href: 'https://nextorder.com/' },
    image: '/archive/nextorder.jpg',
    hue: '#3b82f6',
  },
  {
    name: 'Polarr',
    kind: 'Photo editor',
    description: 'UI components and performance work for an editor used by 20M+ people.',
    link: { label: 'Website', href: 'https://www.polarr.com/' },
    image: '/archive/polarr.jpg',
    hue: '#a78bfa',
  },
  {
    name: 'ZTNA Client',
    kind: 'Security',
    description: 'Zero Trust access client shipped on the web and as an Electron desktop app.',
    link: {
      label: 'Website',
      href: 'https://www.extremenetworks.com/resources/blogs/what-is-universal-ztna',
    },
    image: '/archive/ztna.jpg',
    hue: '#2563eb',
  },
  {
    name: 'Aera Data Workbench',
    kind: 'ETL platform',
    description: 'Pulls data from SAP, Oracle, MSSQL and MySQL into one place for business analytics.',
    link: { label: 'Website', href: 'https://www.aeratechnology.com/data-workbench/' },
    image: '/archive/aera.jpg',
    hue: '#0ea5e9',
  },
  {
    name: 'Surveillance System',
    kind: 'Computer vision',
    description: 'Attendance and monitoring dashboards powered by facial detection and recognition.',
    icon: <ScanFace aria-hidden='true' />,
    hue: '#10b981',
  },
  {
    name: 'Drone Configurator',
    kind: 'Autonomy',
    description: 'Plan missions and control a self-flying drone for delivery, rescue and surveillance.',
    icon: <Drone aria-hidden='true' />,
    hue: '#f59e0b',
  },
  {
    name: 'IntelliSky Studio',
    kind: 'Desktop app',
    description: 'Computes vegetation health indices from multispectral drone sensor imagery.',
    link: { label: 'Demo', href: 'https://www.youtube.com/watch?v=CZ2wxPG-uZI' },
    image: '/archive/intellisky.jpg',
    hue: '#f97316',
  },
  {
    name: 'Recruitment ERP',
    kind: 'Enterprise',
    description: 'Runs the full recruit lifecycle, from registration and exams to trade allocation.',
    icon: <ClipboardList aria-hidden='true' />,
    hue: '#6366f1',
  },
  {
    name: 'I-Resource',
    kind: 'HR platform',
    description: 'Leave management with HR and finance modules for internal operations.',
    icon: <CalendarDays aria-hidden='true' />,
    hue: '#ec4899',
  },
  {
    name: 'VASI Portal',
    kind: 'Reporting',
    description: 'Reports on TV advertisements detected live across broadcast channels.',
    icon: <Tv aria-hidden='true' />,
    hue: '#8b5cf6',
  },
  {
    name: 'COVID-19 Dashboard',
    kind: 'Volunteer',
    description: 'Global case trends and health guidance, designed for non-technical readers.',
    icon: <Activity aria-hidden='true' />,
    hue: '#ef4444',
  },
  {
    name: 'Maintenance Reminders',
    kind: 'SAP integration',
    description: 'Service follow-ups driven by customer history, integrated with SAP Business One.',
    icon: <Wrench aria-hidden='true' />,
    hue: '#14b8a6',
  },
];

const stack: { group: string; core: string[]; also?: string[] }[] = [
  {
    group: 'Frontend',
    core: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux'],
    also: ['GIS maps', 'WebGL'],
  },
  {
    group: 'Backend',
    core: ['Node.js', 'PostgreSQL', 'MongoDB', 'REST APIs'],
    also: ['Python Flask', 'ASP.NET', 'MySQL', 'SQL Server'],
  },
  { group: 'AI', core: ['Claude API', 'OpenAI API', 'RAG pipelines', 'Agent Skills'] },
  { group: 'Desktop', core: ['Electron'], also: ['C# / WPF'] },
  { group: 'Payments', core: ['Stripe', 'Adyen'] },
  { group: 'Tooling', core: ['Git', 'Firebase', 'JWT auth'], also: ['Jira'] },
];

function delay(ms: number) {
  return { '--delay': `${ms}ms` } as CSSProperties;
}

function AppIcon({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span
      className={`grid h-11 w-11 place-items-center rounded-[12px] text-white shadow-inner ring-1 ring-white/10 ${className}`}
    >
      {children}
    </span>
  );
}

function Logo({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <Image
        src={src}
        alt=''
        width={22}
        height={22}
        className='h-[22px] w-[22px] shrink-0 rounded-[6px] bg-white object-contain ring-1 ring-black/5 dark:ring-white/10'
      />
    );
  }
  return (
    <span
      aria-hidden='true'
      className='grid h-[22px] w-[22px] shrink-0 place-items-center rounded-[6px] border border-line bg-surface-2 text-[11px] font-semibold text-muted'>
      {name[0]}
    </span>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <>
      <h2 className='font-serif text-[26px] leading-none'>{title}</h2>
      {subtitle ? <p className='mt-3 text-[15px] leading-7 text-muted'>{subtitle}</p> : null}
    </>
  );
}

function RoleDetails({ role }: { role: Role }) {
  return (
    <div>
      <h3 className='flex items-center gap-3 text-[15px] leading-6'>
        <Logo name={role.company} src={role.logo} />
        <span>
          {role.role} at{' '}
          <a
            href={role.href}
            target='_blank'
            rel='noopener noreferrer'
            className='underline decoration-foreground/25 underline-offset-[5px] transition hover:decoration-foreground'
          >
            {role.company}
          </a>
          <ArrowUpRight className='ml-0.5 inline h-3.5 w-3.5 text-subtle' aria-hidden='true' />
        </span>
      </h3>
      <p className='mt-1.5 text-[14px] leading-6 text-muted sm:pl-[34px]'>
        {role.summary}
      </p>
    </div>
  );
}

function RoleRow({ role }: { role: Role }) {
  return (
    <li className='grid gap-1.5 sm:grid-cols-[124px_1fr] sm:gap-6'>
      <span className='text-[15px] tabular-nums text-muted'>{role.period}</span>
      <RoleDetails role={role} />
    </li>
  );
}

function EarlyCareer({ roles }: { roles: Role[] }) {
  return (
    <li className='grid gap-1.5 sm:grid-cols-[124px_1fr] sm:gap-6'>
      <span className='text-[15px] tabular-nums text-muted'>2015 — 2017</span>
      <div>
        <p className='text-[15px] leading-6'>Early career roles</p>
        <ul className='mt-4 space-y-5'>
          {roles.map((role) => (
            <li key={role.company}>
              <RoleDetails role={role} />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.awaisali.net';

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: profile.name,
    givenName: 'Awais',
    familyName: 'Ali',
    jobTitle: profile.role,
    description:
      'Software Engineer & GenAI Developer with 10+ years of experience building scalable web applications, API-driven platforms, payments/POS systems, and AI-powered developer and knowledge tools.',
    url: `${siteUrl}/`,
    image: `${siteUrl}/awais.png`,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'HATO',
      url: 'https://www.hato.lighting/',
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
    knowsLanguage: ['English', 'Urdu', 'Saraiki'],
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
      'Electron',
      'Generative AI',
      'LLM applications',
      'RAG pipelines',
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
    author: { '@type': 'Person', '@id': `${siteUrl}/#person` },
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/#webpage`,
    name: `Awais Ali — ${profile.role}`,
    url: `${siteUrl}/`,
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#person` },
    inLanguage: 'en',
    primaryImageOfPage: { '@type': 'ImageObject', url: `${siteUrl}/awais.png` },
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
    <>
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
      <main className='mx-auto w-full max-w-[640px] px-5 pb-40 pt-6 sm:pt-12'>
        <Banner className='enter' />

        <header id='content' className='mt-10 scroll-mt-8'>
          <div className='flex items-center justify-between gap-6'>
            <div>
              <h1 className='enter-blur font-serif text-[42px] leading-none sm:text-[48px]' style={delay(120)}>
                {profile.name}
              </h1>
              <p className='enter-blur mt-3 text-[15px] text-muted' style={delay(240)}>
                {profile.role}
              </p>
            </div>
            <a
              href={profile.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Awais Ali on LinkedIn'
              className='enter group relative shrink-0'
              style={delay(200)}
            >
              <Image
                src='/awais.png'
                alt='Portrait of Awais Ali'
                width={176}
                height={176}
                priority
                className='h-[76px] w-[76px] rounded-full object-cover transition duration-500 group-hover:scale-[1.04] sm:h-[88px] sm:w-[88px]'
              />
              <span className='absolute -bottom-0.5 -right-0.5 grid h-7 w-7 place-items-center rounded-full bg-dock text-dock-foreground ring-4 ring-background transition-transform duration-300 group-hover:rotate-45'>
                <ArrowUpRight className='h-3.5 w-3.5' aria-hidden='true' />
              </span>
            </a>
          </div>

          <div className='enter mt-10 space-y-4 text-[17px] leading-[1.7]' style={delay(360)}>
            <p>
              I build products end to end: the interface, the APIs behind it, and the AI that makes
              it useful.
            </p>
            <p className='text-muted'>
              I&apos;m Awais, a software engineer from {profile.location} with 10+ years of shipping
              web, desktop and AI products. Currently at{' '}
              <InlineBrand href='https://www.hato.lighting/' label='HATO' logo='/logos/hato.svg' />{' '}
              building intelligent
              lighting systems, and growing{' '}
              <InlineBrand
                href='https://knowvio.awaisali.net/'
                label='Knowvio'
                logo='/icons/knowvio.svg'
              />{' '}
              on the side.
            </p>
          </div>

          <div className='enter mt-10' style={delay(480)}>
            <Link href='/about' className='group inline-flex items-center gap-3'>
              <span className='font-serif text-[28px] leading-none tracking-[-0.02em]'>
                More about me
              </span>
              <ArrowUpRight
                className='h-[18px] w-[18px] shrink-0 text-muted transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground'
                aria-hidden='true'
              />
            </Link>
            <div className='mt-4 flex flex-wrap items-center gap-x-5 gap-y-2.5'>
              <ReachLink href={profile.github} label='GitHub'>
                <GitHubMark className='h-3.5 w-3.5' />
              </ReachLink>
              <ReachLink href={profile.linkedin} label='LinkedIn'>
                <LinkedInMark className='h-3.5 w-3.5' />
              </ReachLink>
              <ReachLink href={`mailto:${profile.email}`} label='Email'>
                <Mail className='h-3.5 w-3.5' aria-hidden='true' />
              </ReachLink>
              <ReachLink href={profile.resume} label='Resume' ariaLabel='Resume (PDF)'>
                <FileText className='h-3.5 w-3.5' aria-hidden='true' />
              </ReachLink>
            </div>
            <div className='mt-4 h-px bg-line' aria-hidden='true' />
          </div>
        </header>

        <section id='work' aria-label="Things I've built" className='mt-24 scroll-mt-24'>
          <div className='reveal md:hidden'>
            <ProjectCarousel title="Things I've built">
              {projects.map((p) => (
                <ProjectCard
                  key={p.name}
                  project={p}
                  className='w-[min(85vw,460px)] shrink-0 snap-start'
                  previewClassName='aspect-[16/10]'
                />
              ))}
            </ProjectCarousel>
          </div>

          {/* Breaks out of the reading column so the bento has room for real previews. */}
          <div className='hidden md:mx-[calc(50%_-_min(530px,_50vw_-_32px))] md:block'>
            <h2 className='reveal font-serif text-[26px] leading-none'>Things I&apos;ve built</h2>
            <div className='mt-8 grid grid-cols-2 gap-4 lg:grid-cols-12'>
              {projects.map((p, i) => (
                <ProjectCard
                  key={p.name}
                  project={p}
                  className={`reveal ${bentoSpans[i % bentoSpans.length]}`}
                  previewClassName='h-[250px] lg:h-[290px]'
                />
              ))}
            </div>
          </div>
        </section>

        <section id='experience' className='reveal mt-24 scroll-mt-24'>
          <SectionHeading title='Experience' />
          <ol className='mt-8 space-y-7'>
            {experience.map((r) => (
              <RoleRow key={r.company} role={r} />
            ))}
            <EarlyCareer roles={earlyCareer} />
          </ol>
        </section>

        <section id='archive' className='reveal mt-24 scroll-mt-24'>
          <ArchiveSection
            title='Earlier work'
            subtitle='A decade of client and product work. Most of it is private, all of it shipped.'
            items={archive}
          />
        </section>

        <section id='stack' className='reveal mt-24 scroll-mt-24'>
          <SectionHeading
            title='Stack'
            subtitle='Brighter is what I reach for every day. Dimmer is what I’ve shipped with before.'
          />
          <dl className='mt-8 space-y-6'>
            {stack.map((s) => (
              <div key={s.group} className='grid gap-2 sm:grid-cols-[124px_1fr] sm:gap-6'>
                <dt className='text-[15px] text-muted'>{s.group}</dt>
                <dd className='flex flex-wrap gap-x-4 gap-y-1.5 text-[15px]'>
                  {s.core.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                  {s.also?.map((t) => (
                    <span key={t} className='text-subtle'>
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <AfterHours />

        <footer className='reveal mt-28'>
          <h2 className='font-serif text-[32px] leading-tight'>Have something in mind?</h2>
          <p className='mt-3 max-w-md text-[15px] leading-7 text-muted'>
            I&apos;m open to full-stack and GenAI roles, remote or hybrid. Email is the fastest way to
            reach me.
          </p>
          <ConnectLinks />
          <div className='mt-14 flex flex-wrap items-center justify-between gap-3 text-[13px] text-subtle'>
            <span>
              © {new Date().getFullYear()} {profile.name} · {profile.location}
            </span>
            <span className='flex items-center gap-4'>
              <Link href='/about' className='transition-colors hover:text-foreground'>
                About
              </Link>
              <Link href='/uses' className='transition-colors hover:text-foreground'>
                Uses
              </Link>
              <a
                href={profile.resume}
                target='_blank'
                rel='noopener noreferrer'
                className='transition-colors hover:text-foreground'
              >
                Resume (PDF)
              </a>
            </span>
          </div>
        </footer>
      </main>

      <Dock name={profile.name} role={profile.role} email={profile.email} />
    </>
  );
}

function InlineBrand({ href, label, logo }: { href: string; label: string; logo?: string }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='inline-flex items-baseline gap-1.5 text-foreground underline decoration-foreground/25 underline-offset-[5px] transition hover:decoration-foreground'
    >
      <span className='translate-y-[3px] self-center'>
        <Logo name={label} src={logo} />
      </span>
      {label}
    </a>
  );
}

function ReachLink({
  href,
  label,
  ariaLabel,
  children,
}: {
  href: string;
  label: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith('http') || href.endsWith('.pdf');
  return (
    <a
      href={href}
      aria-label={ariaLabel ?? label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className='group inline-flex items-center gap-1.5 text-[13.5px] text-muted transition-colors hover:text-foreground'
    >
      <span className='text-subtle transition-colors group-hover:text-foreground'>{children}</span>
      <span className='border-b border-transparent pb-px transition-colors group-hover:border-current'>
        {label}
      </span>
    </a>
  );
}
