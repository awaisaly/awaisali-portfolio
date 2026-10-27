'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeToggleClient } from './ThemeToggleClient';

const homeSections = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack', wide: true },
] as const;

export function Dock({
  name,
  role,
  email,
}: {
  name: string;
  role: string;
  email: string;
}) {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const onAbout = pathname === '/about';
  const [section, setSection] = useState('');
  const active = onAbout ? 'about' : onHome ? section : '';
  const linksRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const hovering = useRef(false);

  const moveIndicator = useCallback((target: HTMLElement | null) => {
    const indicator = indicatorRef.current;
    if (!indicator) return;
    // Hidden links (e.g. "Stack" on mobile) have no layout to slide to.
    if (!target || target.offsetParent === null) {
      indicator.style.opacity = '0';
      return;
    }
    indicator.style.transform = `translateX(${target.offsetLeft}px)`;
    indicator.style.width = `${target.offsetWidth}px`;
    indicator.style.opacity = '1';
  }, []);

  const moveToActive = useCallback(() => {
    moveIndicator(linksRef.current?.querySelector<HTMLElement>('[aria-current="true"]') ?? null);
  }, [moveIndicator]);

  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setSection(hit.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    for (const { id } of homeSections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!hovering.current) moveToActive();
  }, [active, moveToActive]);

  useEffect(() => {
    const links = linksRef.current;
    if (!links) return;
    const observer = new ResizeObserver(() => {
      if (!hovering.current) moveToActive();
    });
    observer.observe(links);
    return () => observer.disconnect();
  }, [moveToActive]);

  return (
    <div className='pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 sm:bottom-6'>
      <nav
        aria-label='Site'
        className='dock-enter pointer-events-auto flex items-center gap-1 rounded-full bg-dock p-1.5 text-dock-foreground shadow-[0_18px_50px_-12px_rgba(0,0,0,0.55)] ring-1 ring-black/5'
      >
        <Link
          href={pathname === '/' ? '#content' : '/'}
          className='flex items-center gap-2.5 rounded-full pr-1 sm:pr-3'
          aria-label={`${name}, back to top`}
        >
          <Image
            src='/awais.png'
            alt=''
            width={36}
            height={36}
            className='h-9 w-9 rounded-full object-cover'
          />
          <span className='hidden leading-tight sm:block'>
            <span className='block text-[14px] font-medium'>{name}</span>
            <span className='block whitespace-nowrap text-[12px] opacity-60'>{role}</span>
          </span>
        </Link>

        <div
          ref={linksRef}
          className='relative flex items-center gap-1'
          onMouseLeave={() => {
            hovering.current = false;
            moveToActive();
          }}
        >
          <span
            ref={indicatorRef}
            aria-hidden='true'
            className='dock-indicator pointer-events-none absolute inset-y-0 left-0 w-0 rounded-full bg-dock-foreground/10 opacity-0'
          />
          <Link
            href='/about'
            aria-current={active === 'about' ? 'true' : undefined}
            onMouseEnter={(e) => {
              hovering.current = true;
              moveIndicator(e.currentTarget);
            }}
            className={[
              'relative rounded-full px-2.5 py-2 text-[14px] transition-opacity sm:px-3',
              active === 'about' ? 'opacity-100' : 'opacity-60 hover:opacity-100',
            ].join(' ')}
          >
            About
          </Link>
          {homeSections.map((s) => (
            <Link
              key={s.id}
              href={onHome ? `#${s.id}` : `/#${s.id}`}
              aria-current={active === s.id ? 'true' : undefined}
              onMouseEnter={(e) => {
                hovering.current = true;
                moveIndicator(e.currentTarget);
              }}
              className={[
                'relative rounded-full px-2.5 py-2 text-[14px] transition-opacity sm:px-3',
                'wide' in s ? 'hidden sm:block' : '',
                active === s.id ? 'opacity-100' : 'opacity-60 hover:opacity-100',
              ].join(' ')}
            >
              {s.label}
            </Link>
          ))}
        </div>

        <ThemeToggleClient />

        <a
          href={onAbout ? '#connect' : `mailto:${email}`}
          className='flex items-center gap-2 rounded-full bg-dock-foreground py-2.5 pl-2.5 pr-2.5 text-[14px] font-medium text-dock transition hover:opacity-90 sm:pl-3 sm:pr-4'
        >
          <Mail className='h-4 w-4' aria-hidden='true' />
          <span className='sr-only sm:not-sr-only'>Contact</span>
        </a>
      </nav>
    </div>
  );
}
