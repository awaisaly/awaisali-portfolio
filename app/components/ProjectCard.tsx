'use client';

import { ArrowUpRight } from 'lucide-react';
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from 'react';

export type Project = {
  name: string;
  kind: string;
  description: string;
  accent: string;
  icon: ReactNode;
  preview: ReactNode;
  links: { label: string; href: string }[];
};

export function ProjectCard({
  project,
  className = '',
  previewClassName = '',
}: {
  project: Project;
  className?: string;
  previewClassName?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  // Bumped each time the card scrolls back into view, remounting the preview so it replays.
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) setRun((r) => r + 1);
        visible = entry.isIntersecting;
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <article
      ref={ref}
      onPointerMove={trackPointer}
      style={{ '--accent': project.accent } as CSSProperties}
      className={`project-card group relative flex flex-col rounded-[22px] border border-line bg-surface p-2.5 transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--accent)_60%,transparent)] ${className}`}
    >
      <span aria-hidden='true' className='card-spotlight' />
      <span aria-hidden='true' className='card-border-glow' />

      <div
        className={`relative overflow-hidden rounded-[14px] bg-[#0c0c10] ring-1 ring-white/5 ${previewClassName}`}
      >
        <Fragment key={run}>{project.preview}</Fragment>
      </div>

      <div className='relative flex flex-1 flex-col px-2.5 pb-3 pt-5'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h3 className='font-serif text-[24px] leading-none'>{project.name}</h3>
            <p className='mt-2 text-[14px] text-muted'>{project.kind}</p>
          </div>
          <span className='transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105'>
            {project.icon}
          </span>
        </div>
        <p className='mt-4 text-[15px] leading-6 text-foreground/80'>{project.description}</p>
        <div className='mt-auto flex gap-4 pt-4 text-[14px]'>
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target='_blank'
              rel='noopener noreferrer'
              className='group/link inline-flex items-center gap-0.5 text-muted transition-colors hover:text-foreground'
            >
              {l.label}
              <ArrowUpRight
                className='h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-px group-hover/link:translate-x-px'
                aria-hidden='true'
              />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
