'use client';

import Image from 'next/image';
import { ArrowUpRight, GalleryHorizontal, LayoutGrid } from 'lucide-react';
import { useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export type ArchiveItem = {
  name: string;
  kind: string;
  description: string;
  link?: { label: string; href: string };
  image?: string;
  // Private work has no screenshot, so it gets an icon on a tinted cover instead.
  icon?: ReactNode;
  hue: string;
};

function Cover({ item, hidden }: { item: ArchiveItem; hidden?: boolean }) {
  if (item.image) {
    return (
      <Image
        src={item.image}
        alt={hidden ? '' : `${item.name} preview`}
        fill
        sizes='(min-width: 1024px) 340px, (min-width: 640px) 45vw, 290px'
        className='object-cover object-top transition duration-700 group-hover:scale-[1.04]'
      />
    );
  }
  return (
    <div
      className='absolute inset-0 transition duration-700 group-hover:scale-[1.04]'
      style={{
        background: `radial-gradient(90% 120% at 15% 10%, color-mix(in oklab, ${item.hue} 55%, transparent), transparent 65%), radial-gradient(80% 100% at 100% 100%, color-mix(in oklab, ${item.hue} 30%, transparent), transparent 60%), #0e0e12`,
      }}
    >
      <div className='absolute inset-0 opacity-40 [background-image:radial-gradient(rgb(255_255_255/0.22)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]' />
      <span className='absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-white/10 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/15 [&_svg]:h-6 [&_svg]:w-6'>
        {item.icon}
      </span>
    </div>
  );
}

function ArchiveCard({
  item,
  hidden,
  className = '',
  style,
}: {
  item: ArchiveItem;
  hidden?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <article
      aria-hidden={hidden || undefined}
      style={style}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-foreground/15 ${className}`}
    >
      <div className='relative aspect-[16/9] overflow-hidden border-b border-line bg-surface-2'>
        <Cover item={item} hidden={hidden} />
      </div>
      <div className='flex flex-1 flex-col p-4'>
        <div className='flex items-baseline gap-2'>
          <h3 className='truncate text-[15px] font-medium'>{item.name}</h3>
          <span className='truncate text-[13px] text-muted'>{item.kind}</span>
        </div>
        <p className='mt-2 line-clamp-2 text-[14px] leading-6 text-muted'>{item.description}</p>
        <div className='mt-auto pt-3 text-[13px]'>
          {item.link ? (
            <a
              href={item.link.href}
              target='_blank'
              rel='noopener noreferrer'
              tabIndex={hidden ? -1 : undefined}
              className='inline-flex items-center gap-0.5 text-muted transition-colors hover:text-foreground'
            >
              {item.link.label}
              <ArrowUpRight className='h-3.5 w-3.5' aria-hidden='true' />
            </a>
          ) : (
            <span className='text-subtle'>Private</span>
          )}
        </div>
      </div>
    </article>
  );
}

function Marquee({
  items,
  reverse,
  duration,
}: {
  items: ArchiveItem[];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div className='marquee overflow-hidden'>
      <div
        className='marquee-track flex w-max gap-3 pr-3'
        data-reverse={reverse || undefined}
        style={{ '--marquee-duration': duration } as CSSProperties}
      >
        {[...items, ...items].map((item, i) => (
          <ArchiveCard
            key={`${item.name}-${i}`}
            item={item}
            hidden={i >= items.length}
            className='w-[290px] shrink-0'
          />
        ))}
      </div>
    </div>
  );
}

export function ArchiveSection({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: ArchiveItem[];
}) {
  const [showAll, setShowAll] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyId = useId();
  const half = Math.ceil(items.length / 2);

  const toggle = () => {
    const next = !showAll;
    setShowAll(next);
    // Collapsing a tall grid would otherwise leave the reader far below the section.
    if (!next && headerRef.current && headerRef.current.getBoundingClientRect().top < 0) {
      headerRef.current.scrollIntoView({ block: 'start' });
    }
  };

  return (
    <>
      <div ref={headerRef} className='flex scroll-mt-24 items-end justify-between gap-6'>
        <div>
          <h2 className='font-serif text-[26px] leading-none'>{title}</h2>
          <p className='mt-3 text-[15px] leading-7 text-muted'>{subtitle}</p>
        </div>
        <button
          type='button'
          onClick={toggle}
          aria-expanded={showAll}
          aria-controls={bodyId}
          className='flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-line px-4 text-[14px] text-foreground transition hover:bg-surface-2'
        >
          {showAll ? (
            <GalleryHorizontal key='rows' className='icon-in h-4 w-4' aria-hidden='true' />
          ) : (
            <LayoutGrid key='grid' className='icon-in h-4 w-4' aria-hidden='true' />
          )}
          {showAll ? 'Scroll view' : `View all ${items.length}`}
        </button>
      </div>

      <div id={bodyId} className='mt-8'>
        {showAll ? (
          <div className='grid gap-4 sm:grid-cols-2 md:mx-[calc(50%_-_min(530px,_50vw_-_32px))] lg:grid-cols-3'>
            {items.map((item, i) => (
              <ArchiveCard
                key={item.name}
                item={item}
                className='enter'
                style={{ '--delay': `${Math.min(i, 8) * 45}ms` } as CSSProperties}
              />
            ))}
          </div>
        ) : (
          <div className='space-y-3' style={{ marginInline: 'calc(50% - 50vw)' }}>
            <Marquee items={items.slice(0, half)} duration='70s' />
            <Marquee items={items.slice(half)} duration='80s' reverse />
          </div>
        )}
      </div>
    </>
  );
}
