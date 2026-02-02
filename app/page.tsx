import Image from 'next/image';
import { GitHubMark, LinkedInMark } from './components/BrandIcons';
import { MobileNav } from './components/MobileNav';
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
  Mail,
  MapPin,
  MonitorSmartphone,
  Network,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#why', label: 'Why me' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
] as const;

type Link = { label: string; href: string };

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
  { label: 'Redux', icon: Layers3 },
  { label: 'Hooks', icon: Gauge },
  { label: 'Context API', icon: Network },
  { label: 'REST APIs', icon: Network },
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
  { label: 'PostgreSQL', icon: Database },
  { label: 'MongoDB', icon: Database },
  { label: 'MySQL / SQL Server', icon: Database },
  { label: 'Firebase', icon: ShieldCheck },
  { label: 'Node.js', icon: Code2, note: 'Working knowledge' },
  { label: 'Python Flask', icon: Code2, note: 'Working knowledge' },
  { label: 'ASP.NET', icon: Code2, note: 'Working knowledge' },
];

const experience = [
  {
    title: 'Software Engineer — Next Order (Australia, Remote)',
    period: 'Feb 2022 – Present',
    tone: 'emerald' as const,
    bullets: [
      'Built and maintained large-scale customer-facing online ordering platforms using React.',
      'Implemented complex menu structures, modifiers, vouchers, loyalty programs, and Stripe/Adyen payments.',
      'Worked on restaurant POS systems: kiosks, split payments, dine-in layouts, and multi-device workflows.',
      'Enhanced admin panels for order management, reporting, shifts, and operational settings.',
      'Collaborated asynchronously with cross-functional remote teams on production systems.',
    ],
  },
  {
    title: 'Senior Software Engineer — Emumba (Islamabad)',
    period: 'Jan 2020 – Feb 2022',
    tone: 'violet' as const,
    bullets: [
      'Led frontend development for a Zero Trust Network Access (ZTNA) application (Web + Electron).',
      'Contributed to Polarr (20M+ users) focusing on UI components and performance.',
      'Built enterprise tools including an ETL + analytics platform (Aera Developer Workbench).',
      'Mentored engineers and contributed to architecture decisions and coding standards.',
    ],
  },
  {
    title: 'Development Team Lead — Incline Artificial Intelligence',
    period: 'Jun 2018 – Jan 2020',
    tone: 'amber' as const,
    bullets: [
      'Led frontend development and coordinated with backend teams on enterprise systems.',
      'Delivered surveillance, ERP, LMS, and drone-management platforms.',
      'Established scalable UI architecture and consistent coding standards across projects.',
    ],
  },
  {
    title: 'Software Developer — Burqstream Technologies',
    period: 'Apr 2017 – May 2018',
    tone: 'sky' as const,
    bullets: [
      'Developed desktop and web applications including image-analysis tools for environmental monitoring.',
      'Built reporting portals and dashboards using PHP and .NET technologies.',
    ],
  },
];

const projects: Project[] = [
  {
    title: 'Restaurant Ordering & POS Systems',
    description:
      'High-traffic online ordering, payments, POS flows, and admin reporting for restaurant operations.',
    tone: 'emerald',
    highlights: [
      'Complex menu + modifier architecture, vouchers, loyalty programs',
      'Stripe/Adyen payments, split payments, kiosk workflows',
      'Operational tooling: shifts, reports, settings, order management',
    ],
    stack: ['React', 'TypeScript', 'Stripe', 'Adyen', 'POS integrations'],
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
      ? 'from-emerald-500/20 via-emerald-500/5 to-transparent'
      : tone === 'sky'
        ? 'from-sky-500/20 via-sky-500/5 to-transparent'
        : tone === 'amber'
          ? 'from-amber-500/20 via-amber-500/5 to-transparent'
          : tone === 'rose'
            ? 'from-rose-500/20 via-rose-500/5 to-transparent'
            : 'from-violet-500/20 via-violet-500/5 to-transparent';

  return (
    <span
      aria-hidden='true'
      className={[
        'pointer-events-none absolute inset-x-0 top-0 h-24 rounded-2xl bg-linear-to-b',
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
    <div className='relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md motion-safe:duration-300'>
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
              'grid h-11 w-11 place-items-center rounded-2xl border border-border',
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
    <div className='group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md motion-safe:duration-300'>
      <div className='pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 motion-safe:duration-300 [background:radial-gradient(600px_circle_at_20%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_55%),radial-gradient(550px_circle_at_80%_60%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_60%)]' />
      <div className='relative flex items-start gap-3'>
        <div className='grid h-10 w-10 place-items-center rounded-2xl border border-border bg-card-solid'>
          <Icon
            className='h-5 w-5 text-muted transition group-hover:text-foreground motion-safe:duration-300'
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
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold tracking-tight'>{title}</h2>
        {subtitle ? (
          <p className='mt-2 max-w-2xl text-sm leading-6 text-muted'>
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    description:
      'Senior Software Engineer with 8+ years of experience. Remote-first with extensive experience collaborating with distributed teams to build scalable web applications using React, TypeScript, and modern frontend architecture.',
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: [
      'Remote work',
      'Distributed teams',
      'React',
      'TypeScript',
      'Next.js',
      'Frontend architecture',
      'POS systems',
      'Payment integrations',
    ],
  };

  return (
    <div
      id='intro'
      className='relative min-h-screen bg-background text-foreground'
    >
      <div className='pointer-events-none absolute inset-0 -z-10 opacity-70 [background:radial-gradient(1200px_circle_at_20%_0%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_55%),radial-gradient(1000px_circle_at_90%_20%,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_52%)]' />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <a
        href='#content'
        className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 rounded-full border border-border bg-card px-4 py-2 text-sm shadow-sm backdrop-blur'
      >
        Skip to content
      </a>

      <header className='fixed left-0 top-0 z-40 w-full border-b border-border bg-card/90 backdrop-blur-none md:sticky md:top-0 md:bg-card/70 md:backdrop-blur'>
        <div className='mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6'>
          <a
            href='#intro'
            className='group flex min-w-0 items-center gap-3 rounded-2xl px-1.5 py-1 transition hover:bg-card-solid'
            aria-label='Go to intro section'
          >
            <span className='relative h-9 w-9 flex-none overflow-hidden rounded-2xl border border-border bg-card-solid shadow-sm'>
              <div className='pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(40px_circle_at_20%_0%,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_60%),radial-gradient(45px_circle_at_90%_90%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_60%)]' />
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
            {navItems.map(item => (
              <a key={item.href} className='hover:text-foreground' href={item.href}>
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
            <MobileNav items={[...navItems]} resumeHref='/CV-Awais-Ali.pdf' />
          </div>
        </div>
      </header>
      <div className='h-16 md:hidden' aria-hidden='true' />

      <main
        id='content'
        className='mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16'
      >
        <div className='relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm backdrop-blur sm:p-12'>
          <div className='pointer-events-none absolute inset-0 opacity-70 bg-aurora' />

          <div className='relative'>
            <div className='flex flex-col gap-8 md:flex-row md:items-end md:justify-between'>
              <div className='max-w-2xl'>
                <div
                  className='flex max-w-full flex-wrap items-center gap-2 text-xs text-muted animate-enter-1'
                  aria-label='Availability and location'
                >
                  <span className='inline-flex items-center gap-2 rounded-full border border-border bg-card-solid px-3 py-1.5'>
                    <Sparkles className='h-3.5 w-3.5' aria-hidden='true' />
                    <span className='font-medium text-foreground'>
                      Remote-first
                    </span>
                  </span>
                  <span className='inline-flex items-center gap-2 rounded-full border border-border bg-card-solid px-3 py-1.5'>
                    <span className='font-medium text-foreground'>
                      Open to remote opportunities
                    </span>
                  </span>
                  <span className='inline-flex items-center gap-2 rounded-full border border-border bg-card-solid px-3 py-1.5'>
                    <MapPin className='h-3.5 w-3.5' aria-hidden='true' />
                    <span className='truncate'>{profile.location}</span>
                  </span>
                </div>
                <div className='mt-5 flex items-center gap-4 animate-enter-2'>
                  <div className='relative h-14 w-14 overflow-hidden rounded-2xl border border-border bg-card-solid shadow-sm'>
                    <div className='pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(80px_circle_at_20%_0%,color-mix(in_oklab,var(--primary)_35%,transparent),transparent_60%),radial-gradient(90px_circle_at_90%_90%,color-mix(in_oklab,var(--accent)_30%,transparent),transparent_60%)]' />
                    <Image
                      src='/Awais-Ali.png'
                      alt='Awais Ali'
                      width={112}
                      height={112}
                      className='relative h-full w-full object-cover'
                      priority
                    />
                  </div>
                  <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl'>
                    <span className='gradient-text'>{profile.name}</span>
                  </h1>
                </div>
                <p className='mt-3 text-lg text-muted animate-enter-3'>
                  {profile.role}
                </p>
                <p className='mt-6 max-w-xl text-sm leading-7 text-muted animate-enter-4'>
                  Senior Software Engineer with 8+ years of experience building
                  scalable, user-centric web applications. Strong expertise in
                  React, TypeScript, and modern frontend architecture, with
                  hands-on experience delivering high-traffic customer-facing
                  platforms, POS systems, and admin dashboards.
                </p>
                <div className='mt-7 flex flex-col gap-3 sm:flex-row animate-enter-5'>
                  <ButtonLink href={`mailto:${profile.email}`}>
                    <Mail className='h-4 w-4' aria-hidden='true' />
                    Let’s talk
                    <ArrowUpRight className='h-4 w-4' aria-hidden='true' />
                  </ButtonLink>
                  <ButtonLink href='/CV-Awais-Ali.pdf' variant='ghost'>
                    <FileText className='h-4 w-4' aria-hidden='true' />
                    View Resume (PDF)
                  </ButtonLink>
                </div>
              </div>

              <div className='w-full max-w-md rounded-2xl border border-border bg-card-solid p-5 shadow-sm animate-enter-3'>
                <p className='text-xs font-semibold uppercase tracking-wide text-muted'>
                  Contact
                </p>
                <div className='mt-4 grid gap-2 text-sm'>
                  <a
                    className='flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 transition hover:bg-card-solid'
                    href={`mailto:${profile.email}`}
                  >
                    <span className='flex items-center gap-2 text-muted'>
                      <Mail className='h-4 w-4' aria-hidden='true' />
                      Email
                    </span>
                    <span className='truncate font-medium'>
                      {profile.email}
                    </span>
                  </a>
                  <a
                    className='flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 transition hover:bg-card-solid'
                    href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  >
                    <span className='flex items-center gap-2 text-muted'>
                      <Phone className='h-4 w-4' aria-hidden='true' />
                      Phone
                    </span>
                    <span className='truncate font-medium'>
                      {profile.phone}
                    </span>
                  </a>
                  <div className='grid grid-cols-2 gap-2 pt-2'>
                    <a
                      className='inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium transition hover:bg-card-solid'
                      href={profile.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <LinkedInMark className='h-4 w-4' />
                      LinkedIn
                    </a>
                    <a
                      className='inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium transition hover:bg-card-solid'
                      href={profile.github}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <GitHubMark className='h-4 w-4' />
                      GitHub
                    </a>
                    <a
                      className='col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-95'
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
            <div className='grid gap-4 rounded-2xl border border-border bg-card p-6'>
              <p className='text-sm leading-7 text-muted'>
                I build frontends that stay maintainable under real product
                pressure: clear component boundaries, predictable state, and
                performance that holds up as features grow. I’m comfortable
                owning features end-to-end in remote setups and collaborating
                with product, design, and backend teams across time zones.
              </p>
              <div className='flex flex-wrap gap-2'>
                <span className='rounded-full border border-border bg-card-solid px-3 py-1 text-xs text-muted'>
                  React + TypeScript expert
                </span>
                <span className='rounded-full border border-border bg-card-solid px-3 py-1 text-xs text-muted'>
                  Architecture & scalability
                </span>
                <span className='rounded-full border border-border bg-card-solid px-3 py-1 text-xs text-muted'>
                  Remote-first collaboration
                </span>
              </div>
            </div>
          </Section>

          <Section
            id='why'
            title='Why me'
            subtitle='Proof points that show how I deliver in remote, high-impact roles.'
          >
            <div className='grid gap-4 md:grid-cols-2'>
              <StatCard
                tone='violet'
                icon={Users}
                title='Experience'
                value='8+ years'
                description='Building scalable, user-centric products and internal platforms for startups and enterprise.'
              />
              <StatCard
                tone='emerald'
                icon={Building2}
                title='Remote-first'
                value='4+ years'
                description='Extensive experience shipping reliably with distributed teams across time zones (async-friendly).'
              />
              <StatCard
                tone='sky'
                icon={GraduationCap}
                title='Mentorship'
                value='Team growth'
                description='Mentored junior engineers, reviewed PRs, and helped shape coding standards and architecture decisions.'
              />
              <StatCard
                tone='violet'
                icon={Layers3}
                title='Architecture'
                value='Scalable UI'
                description='Strong focus on maintainable component systems, predictable state, and clean patterns that scale.'
              />
              <StatCard
                tone='amber'
                icon={ShieldCheck}
                title='Security & stability'
                value='Production ready'
                description='ZTNA, auth flows, and real-world hardening for stable, maintainable UI systems.'
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
                description='Smooth interactions via architecture decisions, profiling, and iterative refinement.'
              />
              <StatCard
                tone='amber'
                icon={MonitorSmartphone}
                title='Multi-platform'
                value='Web + Desktop'
                description='Built shared UI foundations across web apps and an Electron desktop client (non-production).'
              />
            </div>
          </Section>

          <Section
            id='skills'
            title='Core skills'
            subtitle='Tools, frameworks, and practices I use in production.'
          >
            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {skills.map((s) => (
                <SkillCard key={s.label} skill={s} />
              ))}
            </div>
          </Section>

          <Section
            id='experience'
            title='Professional experience'
            subtitle='Recent roles, responsibilities, and outcomes.'
          >
            <div className='grid gap-4'>
              {experience.map((job) => (
                <article
                  key={job.title}
                  className='relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md motion-safe:duration-300'
                >
                  <Tone tone={job.tone} />
                  <div className='flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between'>
                    <h3 className='flex items-center gap-2 text-base font-semibold tracking-tight'>
                      <Briefcase
                        className='h-4 w-4 text-muted'
                        aria-hidden='true'
                      />
                      {job.title}
                    </h3>
                    <p className='text-sm text-muted'>{job.period}</p>
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
            title='Selected projects'
            subtitle='A curated selection. Some projects are private; I can share details on request.'
          >
            <div className='grid gap-4 md:grid-cols-2'>
              {projects.map((p) => (
                <article
                  key={p.title}
                  className='group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm backdrop-blur transition hover:bg-card-solid hover:-translate-y-0.5 hover:shadow-md motion-safe:duration-300'
                >
                  <Tone tone={p.tone ?? 'violet'} />
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

                  <div className='mt-5 flex flex-wrap gap-2'>
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className='rounded-full border border-border bg-background px-3 py-1 text-xs text-muted'
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {p.links?.length ? (
                    <div className='mt-5 flex flex-wrap gap-3 text-sm'>
                      {p.links.map((l) => (
                        <ExternalLink key={l.href} href={l.href}>
                          {l.label}
                        </ExternalLink>
                      ))}
                    </div>
                  ) : (
                    <p className='mt-5 text-xs text-muted'>
                      Links coming soon (add deployed URLs when available).
                    </p>
                  )}
                </article>
              ))}
            </div>
          </Section>

          <Section id='education' title='Education'>
            <div className='rounded-2xl border border-border bg-card p-6 shadow-sm backdrop-blur'>
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

          <section className='relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm backdrop-blur sm:p-10'>
            <div className='pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(850px_circle_at_0%_0%,color-mix(in_oklab,var(--primary)_30%,transparent),transparent_55%),radial-gradient(850px_circle_at_100%_0%,color-mix(in_oklab,var(--accent)_25%,transparent),transparent_55%)]' />
            <div className='relative'>
              <h2 className='text-2xl font-semibold tracking-tight'>
                Let’s build something great.
              </h2>
              <p className='mt-3 max-w-2xl text-sm leading-7 text-muted'>
                If you’re hiring for a Senior Software Engineer who can own
                complex UI systems, ship reliably in remote teams, and keep
                quality high as the product scales, I’d love to talk.
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
