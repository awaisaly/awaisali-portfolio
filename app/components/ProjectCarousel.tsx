'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export function ProjectCarousel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  const step = (direction: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  const buttonClass =
    'grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line text-foreground transition hover:bg-surface-2 disabled:cursor-default disabled:text-subtle disabled:hover:bg-transparent';

  return (
    <div>
      <div className='flex items-center justify-between gap-4'>
        <h2 className='font-serif text-[26px] leading-none'>{title}</h2>
        <div className='flex gap-2'>
          <button
            type='button'
            aria-label='Previous project'
            className={buttonClass}
            disabled={edges.start}
            onClick={() => step(-1)}
          >
            <ArrowLeft className='h-4 w-4' aria-hidden='true' />
          </button>
          <button
            type='button'
            aria-label='Next project'
            className={buttonClass}
            disabled={edges.end}
            onClick={() => step(1)}
          >
            <ArrowRight className='h-4 w-4' aria-hidden='true' />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={sync}
        className='no-scrollbar mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2'
        style={{ marginRight: 'calc(50% - 50vw)' }}
      >
        {children}
        <div aria-hidden='true' className='w-1 shrink-0' />
      </div>
    </div>
  );
}
