import type { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Banner } from '../components/Banner';
import { ConnectLinks } from '../components/ConnectLinks';
import { Dock } from '../components/Dock';
import { HomeLink } from '../components/HomeLink';
import { profile } from '../profile';

export const metadata: Metadata = {
  title: 'Uses',
  description:
    'The Mac, mouse, editor, and everyday apps Awais Ali uses to build software.',
  alternates: { canonical: '/uses' },
  openGraph: {
    title: 'Uses — Awais Ali',
    description: 'The hardware and software Awais Ali works with every day.',
    url: '/uses',
  },
};

const groups: { title: string; items: { name: string; detail: string }[] }[] = [
  {
    title: 'Workstation',
    items: [
      {
        name: '16" MacBook Pro, M1 Pro',
        detail:
          '16 GB of memory and the built-in Liquid Retina XDR display. This is the machine I write on.',
      },
      {
        name: 'Samsung curved screen',
        detail: 'The display on the desk, next to the MacBook.',
      },
      {
        name: 'Logitech MX Master 3',
        detail: 'The mouse that stays on the desk.',
      },
    ],
  },
  {
    title: 'Development',
    items: [
      {
        name: 'Cursor',
        detail: 'The editor I keep open.',
      },
      {
        name: 'Terminal',
        detail: 'zsh, the shell that ships with the Mac.',
      },
      {
        name: 'Node.js and pnpm',
        detail: 'How I install and run the projects on this machine.',
      },
      {
        name: 'Git',
        detail: 'Every change I ship goes through it.',
      },
      {
        name: 'Docker',
        detail: 'Local containers when a project needs its own database or service.',
      },
      {
        name: 'Postman',
        detail: 'Where I try an API before it lands in the product.',
      },
    ],
  },
  {
    title: 'Everyday',
    items: [
      {
        name: 'Chrome, Safari, Edge, and Firefox',
        detail: 'All four sit in the dock. I switch between them while I build.',
      },
      {
        name: 'MS Teams, Slack, Google Meet, and Zoom',
        detail: 'Calls and conversation with people who are not in the room.',
      },
      {
        name: 'Notes',
        detail: 'Apple Notes, for the scratch thoughts that are not a ticket yet.',
      },
    ],
  },
];

function delay(ms: number) {
  return { '--delay': `${ms}ms` } as CSSProperties;
}

export default function UsesPage() {
  return (
    <>
      <main className='mx-auto w-full max-w-[640px] px-5 pb-40 pt-6 sm:pt-12'>
        <Banner className='enter' />

        <header className='mt-10'>
          <div className='enter' style={delay(40)}>
            <HomeLink />
          </div>
          <p className='enter-blur mt-8 text-[13px] tracking-wide text-muted' style={delay(80)}>
            Uses
          </p>
          <h1
            className='enter-blur mt-3 font-serif text-[42px] leading-none sm:text-[48px]'
            style={delay(140)}
          >
            What I work with
          </h1>
          <p className='enter-blur mt-4 max-w-md text-[17px] leading-7 text-muted' style={delay(220)}>
            The hardware on the desk, and the software I open to build.
          </p>
        </header>

        {groups.map((group, index) => (
          <section key={group.title} className='enter mt-16' style={delay(280 + index * 80)}>
            <h2 className='font-serif text-[26px] leading-none'>{group.title}</h2>
            <ul className='mt-8 space-y-7'>
              {group.items.map((item) => (
                <li key={item.name}>
                  <p className='text-[15px]'>{item.name}</p>
                  <p className='mt-1 text-[15px] leading-7 text-muted'>{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <footer className='enter mt-16' style={delay(560)}>
          <ConnectLinks />
          <div className='mt-10 flex flex-wrap items-center justify-between gap-3 text-[13px] text-subtle'>
            <span>
              © {new Date().getFullYear()} {profile.name} · {profile.location}
            </span>
            <span className='flex items-center gap-4'>
              <Link href='/' className='transition-colors hover:text-foreground'>
                Home
              </Link>
              <Link href='/about' className='transition-colors hover:text-foreground'>
                About
              </Link>
            </span>
          </div>
        </footer>
      </main>

      <Dock name={profile.name} role={profile.role} email={profile.email} />
    </>
  );
}
