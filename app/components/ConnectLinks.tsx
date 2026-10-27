import { ArrowUpRight, FileText, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { GitHubMark, LinkedInMark } from './BrandIcons';
import { profile } from '../profile';

const links: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: 'GitHub',
    href: profile.github,
    icon: <GitHubMark className='h-[18px] w-[18px]' />,
  },
  {
    label: 'LinkedIn',
    href: profile.linkedin,
    icon: <LinkedInMark className='h-[18px] w-[18px]' />,
  },
  {
    label: 'Phone',
    href: profile.phoneHref,
    icon: <Phone className='h-[18px] w-[18px]' aria-hidden='true' />,
  },
  {
    label: 'Resume (PDF)',
    href: profile.resume,
    icon: <FileText className='h-[18px] w-[18px]' aria-hidden='true' />,
  },
];

export function ConnectLinks() {
  return (
    <div className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-4'>
      <a
        href={`mailto:${profile.email}`}
        className='group inline-flex items-center gap-1.5 text-[18px] underline decoration-foreground/25 underline-offset-[6px] transition hover:decoration-foreground'
      >
        {profile.email}
        <ArrowUpRight
          className='h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
          aria-hidden='true'
        />
      </a>
      <div className='flex items-center gap-4 text-muted'>
        {links.map((link) => {
          const external = link.href.startsWith('http') || link.href.endsWith('.pdf');
          return (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              title={link.label}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className='transition-colors hover:text-foreground'
            >
              {link.icon}
            </a>
          );
        })}
      </div>
    </div>
  );
}
