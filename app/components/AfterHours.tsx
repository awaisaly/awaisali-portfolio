'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Line = { kind: 'in' | 'out'; text: string };
type WindowId = 'term' | 'notes' | 'web';

const STATUS: Line[] = [
  { kind: 'in', text: 'git status' },
  { kind: 'out', text: 'On branch main' },
  { kind: 'out', text: 'nothing to commit, working tree clean' },
];

function wait(ms: number, timers: number[]) {
  return new Promise<void>((resolve) => {
    timers.push(window.setTimeout(resolve, ms));
  });
}

export function AfterHours() {
  const deskRef = useRef<HTMLElement>(null);
  const started = useRef(false);
  const [run, setRun] = useState(0);
  const [front, setFront] = useState<WindowId>('term');
  const [lines, setLines] = useState<Line[]>([]);
  const [draft, setDraft] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const desk = deskRef.current;
    if (!desk) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setRun(1);
        }
      },
      { threshold: 0.45 }
    );
    observer.observe(desk);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (run === 0) return;
    let cancel = false;
    const timers: number[] = [];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const typeIn = async (text: string) => {
      for (let i = 1; i <= text.length; i++) {
        if (cancel) return;
        setDraft(text.slice(0, i));
        await wait(text === 'git push' ? 78 : 46, timers);
      }
    };

    const play = async () => {
      setLines([]);
      setDraft('');
      setDone(false);
      if (reduce) {
        setLines(STATUS);
        setDone(true);
        return;
      }
      await wait(360, timers);
      await typeIn('git status');
      if (cancel) return;
      setLines([{ kind: 'in', text: 'git status' }]);
      setDraft('');
      await wait(220, timers);
      for (const line of STATUS.slice(1)) {
        if (cancel) return;
        setLines((prev) => [...prev, line]);
        await wait(160, timers);
      }
      await wait(720, timers);
      await typeIn('git push');
      if (cancel) return;
      await wait(480, timers);
      for (let i = 'git push'.length; i >= 0; i--) {
        if (cancel) return;
        setDraft('git push'.slice(0, i));
        await wait(42, timers);
      }
      if (!cancel) setDone(true);
    };

    const kickoff = window.setTimeout(() => {
      void play();
    }, 0);
    timers.push(kickoff);

    return () => {
      cancel = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [run]);

  const focus = (id: WindowId) => {
    setFront(id);
    if (id === 'term' && done) setRun((n) => n + 1);
  };

  return (
    <section ref={deskRef} className='reveal mt-24' aria-labelledby='after-hours-heading'>
      <h2 id='after-hours-heading' className='font-serif text-[26px] leading-none'>
        Still open
      </h2>
      <p className='mt-3 max-w-md text-[15px] leading-7 text-muted'>
        The work is done. A few windows stayed up anyway.
      </p>

      <div className='relative mt-8 sm:h-[420px]'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-8 top-4 h-72 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,186,110,0.28),transparent_68%)] blur-2xl dark:bg-[radial-gradient(ellipse_at_center,rgba(255,176,96,0.16),transparent_70%)]'
        />

        <DeskWindow
          title='Notes'
          active={front === 'notes'}
          onFocus={() => focus('notes')}
          className='bg-[#f6f1e6] text-[#2b261f] sm:absolute sm:left-0 sm:top-0 sm:w-[52%] sm:-rotate-2'
        >
          <p className='font-serif text-[22px] leading-none'>Tomorrow</p>
          <ul className='mt-3 space-y-1.5 text-[13.5px] leading-5 text-[#2b261f]/75'>
            <li>the name of that function</li>
            <li>a quieter empty state</li>
            <li>then close the laptop</li>
          </ul>
        </DeskWindow>

        <DeskWindow
          title='localhost:3000'
          active={front === 'web'}
          onFocus={() => focus('web')}
          className='bg-surface text-foreground sm:absolute sm:right-0 sm:top-10 sm:w-[50%] sm:rotate-1'
        >
          <div className='overflow-hidden rounded-lg bg-[#07070d] ring-1 ring-white/10'>
            <div
              aria-hidden='true'
              className='relative h-14 bg-[radial-gradient(90%_120%_at_78%_120%,#3b36c7_0%,transparent_58%),radial-gradient(70%_90%_at_12%_0%,#1aa898_0%,transparent_52%),linear-gradient(160deg,#0b0a16,#14102a)]'
            >
              <svg viewBox='0 0 200 56' className='absolute inset-0 h-full w-full'>
                <line x1='44' y1='28' x2='98' y2='16' stroke='white' strokeOpacity='0.35' />
                <line x1='98' y1='16' x2='146' y2='34' stroke='white' strokeOpacity='0.28' />
                <circle cx='44' cy='28' r='2.4' fill='white' />
                <circle cx='98' cy='16' r='1.8' fill='white' fillOpacity='0.75' />
                <circle cx='146' cy='34' r='2.2' fill='white' fillOpacity='0.9' />
              </svg>
            </div>
            <div className='px-3 py-2.5'>
              <p className='font-serif text-[15px] leading-none text-white'>Awais Ali</p>
              <p className='mt-1 text-[11px] leading-4 text-white/50'>Software Engineer building with GenAI</p>
            </div>
          </div>
          <p className='mt-2.5 text-[12.5px] leading-5 text-muted'>Saved. The rest can wait.</p>
        </DeskWindow>

        <DeskWindow
          title='zsh'
          label={done ? 'Terminal. Click to play it again.' : 'Terminal'}
          active={front === 'term'}
          onFocus={() => focus('term')}
          className='bg-[#12141c] text-[#d5dbe8] sm:absolute sm:bottom-0 sm:left-[12%] sm:w-[76%] sm:rotate-[0.4deg]'
        >
          <div className='min-h-[7.5rem] font-mono text-[12.5px] leading-6'>
            {lines.map((line) => (
              <p key={`${line.kind}-${line.text}`} className={line.kind === 'out' ? 'text-white/45' : ''}>
                {line.kind === 'in' ? <Prompt /> : null}
                {line.text}
              </p>
            ))}
            {(draft || done || lines.length === 0) && (
              <p>
                <Prompt />
                {draft}
                <span className='after-caret ml-0.5 inline-block h-[0.95em] w-[0.45ch] translate-y-[1px] bg-current' />
              </p>
            )}
          </div>
        </DeskWindow>
      </div>
      <p
        className={`mt-4 text-[13px] text-muted transition-opacity duration-500 ${done ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden={!done}
      >
        The push can wait until morning.
      </p>
    </section>
  );
}

function Prompt() {
  return <span className='text-[#8fd0a8]'>$ </span>;
}

function DeskWindow({
  title,
  label,
  active,
  onFocus,
  className,
  children,
}: {
  title: string;
  label?: string;
  active: boolean;
  onFocus: () => void;
  className: string;
  children: ReactNode;
}) {
  return (
    <button
      type='button'
      onClick={onFocus}
      aria-label={label}
      aria-pressed={active}
      className={[
        'mb-3 block w-full cursor-pointer rounded-2xl p-3.5 text-left ring-1 ring-black/10 transition duration-300 last:mb-0',
        active
          ? 'z-30 shadow-[0_30px_60px_-28px_rgba(0,0,0,0.7)] sm:scale-[1.02] sm:rotate-0'
          : 'z-10 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.55)] sm:opacity-90',
        className,
      ].join(' ')}
    >
      <span className='mb-3 flex items-center gap-2'>
        <span className='flex gap-1.5' aria-hidden='true'>
          <i className='h-2 w-2 rounded-full bg-[#ff5f57]' />
          <i className='h-2 w-2 rounded-full bg-[#febc2e]' />
          <i className='h-2 w-2 rounded-full bg-[#28c840]' />
        </span>
        <span className='text-[11px] tracking-wide opacity-55'>{title}</span>
      </span>
      {children}
    </button>
  );
}
