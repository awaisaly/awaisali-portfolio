import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { ArrowUpRight, FileText, Mail, Phone } from 'lucide-react';
import { Banner } from '../components/Banner';
import { ConnectLinks } from '../components/ConnectLinks';
import { GitHubMark, LinkedInMark } from '../components/BrandIcons';
import { Dock } from '../components/Dock';
import { HomeLink } from '../components/HomeLink';
import { profile } from '../profile';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Awais Ali is a Software Engineer & GenAI Developer in Islamabad. Ten years of shipping web, desktop, and AI products, and the ways to get in touch.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Awais Ali',
    description:
      'Software Engineer & GenAI Developer in Islamabad. What I work on, and how to reach me.',
    url: '/about',
  },
};

const facts = [
  { label: 'Based in', value: profile.location },
  { label: 'Languages', value: 'English, Urdu, Saraiki (native)' },
  { label: 'Studied', value: 'Bahria University, Islamabad' },
  { label: 'Open to', value: 'Senior full-stack and GenAI roles, remote or hybrid' },
];

const connect: { label: string; detail: string; href: string; icon: ReactNode }[] = [
  {
    label: 'Email',
    detail: profile.email,
    href: `mailto:${profile.email}`,
    icon: <Mail className='h-[18px] w-[18px]' aria-hidden='true' />,
  },
  {
    label: 'LinkedIn',
    detail: 'linkedin.com/in/awaisaly',
    href: profile.linkedin,
    icon: <LinkedInMark className='h-[18px] w-[18px]' />,
  },
  {
    label: 'GitHub',
    detail: 'github.com/awaisaly',
    href: profile.github,
    icon: <GitHubMark className='h-[18px] w-[18px]' />,
  },
  {
    label: 'Phone',
    detail: profile.phone,
    href: profile.phoneHref,
    icon: <Phone className='h-[18px] w-[18px]' aria-hidden='true' />,
  },
  {
    label: 'Resume',
    detail: 'Download the PDF',
    href: profile.resume,
    icon: <FileText className='h-[18px] w-[18px]' aria-hidden='true' />,
  },
];

function delay(ms: number) {
  return { '--delay': `${ms}ms` } as CSSProperties;
}

export default function AboutPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.awaisali.net';
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${siteUrl}/about`,
    name: 'About Awais Ali',
    description:
      'Software Engineer & GenAI Developer in Islamabad, with ten years of shipping web, desktop, and AI products.',
    mainEntity: { '@id': `${siteUrl}/#person` },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <main className='mx-auto w-full max-w-[640px] px-5 pb-40 pt-6 sm:pt-12'>
        <Banner className='enter' />

        <header className='mt-10'>
          <div className='enter' style={delay(40)}>
            <HomeLink />
          </div>
          <div className='mt-8 flex items-center justify-between gap-6'>
            <div>
              <p className='enter-blur text-[13px] tracking-wide text-muted' style={delay(80)}>
                About
              </p>
              <h1
                className='enter-blur mt-3 font-serif text-[42px] leading-none sm:text-[48px]'
                style={delay(140)}
              >
                {profile.name}
              </h1>
              <p className='enter-blur mt-3 text-[15px] text-muted' style={delay(220)}>
                {profile.role}
              </p>
            </div>
            <a
              href={profile.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Awais Ali on LinkedIn'
              className='enter group relative shrink-0'
              style={delay(180)}
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
        </header>

        <section className='enter mt-12' style={delay(300)} aria-labelledby='summary-heading'>
          <h2 id='summary-heading' className='font-serif text-[26px] leading-none'>
            Summary
          </h2>
          <div className='mt-8 space-y-4 text-[17px] leading-[1.7]'>
            <p>
              I build products end to end: the interface, the APIs behind it, and the AI that makes
              it useful. I&apos;ve been doing that for a little over ten years, from Islamabad,
              mostly with teams spread across time zones.
            </p>
            <p className='text-muted'>
              The work has ranged from restaurant ordering, POS, and Stripe and Adyen payments, to
              a zero-trust access client on the web and Electron, to Polarr, a photo editor used by
              more than 20 million people. Right now I&apos;m at HATO, building HLM Pro for
              intelligent lighting in poultry, dairy, and fish farms, plus the customer dashboard
              and the map tools the sales team uses.
            </p>
            <p className='text-muted'>
              On the side I ship GenAI products. Knowvio is a visual canvas that turns URLs, PDFs,
              videos, and notes into answers you can trace back to the source. Explain My Error and
              Mini Coding Agent are small command-line tools: one explains a failing test, the
              other loads only the agent skills a prompt actually needs.
            </p>
            <p className='text-muted'>
              I like owning a feature from the first screen through the data it writes. I&apos;m
              open to senior full-stack and GenAI roles, remote or hybrid.
            </p>
          </div>

          <dl className='mt-10 space-y-4'>
            {facts.map((fact) => (
              <div key={fact.label} className='grid gap-1 sm:grid-cols-[124px_1fr] sm:gap-6'>
                <dt className='text-[15px] text-muted'>{fact.label}</dt>
                <dd className='text-[15px] leading-6'>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id='connect' className='enter mt-20 scroll-mt-24' style={delay(420)}>
          <h2 className='font-serif text-[26px] leading-none'>Connect</h2>
          <p className='mt-3 max-w-md text-[15px] leading-7 text-muted'>
            Email is the fastest way to reach me. Use whichever of these you prefer.
          </p>
          <ul className='mt-6 divide-y divide-line border-t border-line'>
            {connect.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') || item.href.endsWith('.pdf') ? '_blank' : undefined}
                  rel={
                    item.href.startsWith('http') || item.href.endsWith('.pdf')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className='group flex items-center gap-4 py-4 transition-colors hover:text-foreground'
                >
                  <span className='grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-2 text-muted transition-colors group-hover:text-foreground'>
                    {item.icon}
                  </span>
                  <span className='min-w-0 flex-1'>
                    <span className='block text-[15px]'>{item.label}</span>
                    <span className='block truncate text-[14px] text-muted'>{item.detail}</span>
                  </span>
                  <ArrowUpRight
                    className='h-4 w-4 shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
                    aria-hidden='true'
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className='enter mt-16' style={delay(500)}>
          <ConnectLinks />
          <div className='mt-10 flex flex-wrap items-center justify-between gap-3 text-[13px] text-subtle'>
            <span>
              © {new Date().getFullYear()} {profile.name} · {profile.location}
            </span>
            <span className='flex items-center gap-4'>
              <Link href='/' className='transition-colors hover:text-foreground'>
                Home
              </Link>
              <Link href='/uses' className='transition-colors hover:text-foreground'>
                Uses
              </Link>
            </span>
          </div>
        </footer>
      </main>

      <Dock name={profile.name} role={profile.role} email={profile.email} />
    </>
  );
}
