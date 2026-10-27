import Image from 'next/image';
import { FileText, Lock, CirclePlay, Sparkles, StickyNote } from 'lucide-react';
import type { CSSProperties } from 'react';

type TerminalLine =
  | { kind: 'command'; text: string }
  | { kind: 'output'; text: string; tone?: 'muted' | 'error' | 'ok' | 'accent' | 'heading' };

const toneClass = {
  muted: 'text-white/45',
  error: 'text-rose-300',
  ok: 'text-emerald-300',
  accent: 'text-violet-300',
  heading: 'text-white/90',
} as const;

const TYPE_START = 500;
const CHAR_MS = 45;
const LINE_GAP = 320;

function duration(line: TerminalLine) {
  return line.kind === 'command' ? line.text.length * CHAR_MS + LINE_GAP : LINE_GAP;
}

export function TerminalPreview({
  title,
  lines,
}: {
  title: string;
  lines: TerminalLine[];
}) {
  const delays = lines.reduce<number[]>((acc, line, i) => {
    const prev = i === 0 ? TYPE_START : acc[i - 1] + duration(lines[i - 1]);
    acc.push(prev);
    return acc;
  }, []);
  const caretDelay =
    lines.length === 0
      ? TYPE_START
      : delays[lines.length - 1] + duration(lines[lines.length - 1]);

  return (
    <div className='flex h-full flex-col bg-[#0c0c10] font-mono text-[11.5px] leading-[1.7] text-white/80'>
      <div className='flex items-center gap-1.5 border-b border-white/[0.06] px-3.5 py-2.5'>
        <span className='h-2.5 w-2.5 rounded-full bg-white/15' />
        <span className='h-2.5 w-2.5 rounded-full bg-white/15' />
        <span className='h-2.5 w-2.5 rounded-full bg-white/15' />
        <span className='ml-2 truncate text-[11px] text-white/35'>{title}</span>
      </div>
      <div className='flex-1 space-y-0.5 overflow-hidden px-4 py-3.5'>
        {lines.map((line, i) => {
          const delay = delays[i];
          if (line.kind === 'command') {
            return (
              <p key={i} className='flex whitespace-nowrap'>
                <span className='mr-2 text-emerald-300'>$</span>
                <span
                  className='term-type'
                  style={{ '--chars': line.text.length, '--delay': `${delay}ms` } as CSSProperties}
                >
                  {line.text}
                </span>
              </p>
            );
          }
          return (
            <p
              key={i}
              className={`term-line truncate ${toneClass[line.tone ?? 'muted']}`}
              style={{ '--delay': `${delay}ms` } as CSSProperties}
            >
              {line.text || '\u00a0'}
            </p>
          );
        })}
        <p
          className='term-line'
          style={{ '--delay': `${caretDelay}ms` } as CSSProperties}
        >
          <span className='text-emerald-300'>$</span>{' '}
          <span className='term-caret inline-block h-3.5 w-[7px] translate-y-[2px] bg-white/70' />
        </p>
      </div>
    </div>
  );
}

const delayStyle = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties;

function Cite({ n }: { n: number }) {
  return (
    <span className='ml-1 inline-grid h-[15px] min-w-[15px] place-items-center rounded-[4px] bg-indigo-400/20 px-1 align-[1px] text-[9px] font-semibold text-indigo-200'>
      {n}
    </span>
  );
}

const sources = [
  { icon: FileText, label: 'q3-report.pdf' },
  { icon: CirclePlay, label: 'Board call · 14:32' },
  { icon: StickyNote, label: 'Retention notes' },
];

export function KnowvioPreview() {
  return (
    <div className='@container flex h-full flex-col bg-[#0c0c10]'>
      <div className='flex items-center gap-1.5 border-b border-white/[0.06] px-3.5 py-2'>
        <span className='h-2.5 w-2.5 rounded-full bg-white/15' />
        <span className='h-2.5 w-2.5 rounded-full bg-white/15' />
        <span className='h-2.5 w-2.5 rounded-full bg-white/15' />
        <span className='mx-auto flex items-center gap-1.5 rounded-md bg-white/[0.06] px-2.5 py-0.5 font-mono text-[10.5px] text-white/45'>
          <Lock className='h-2.5 w-2.5' aria-hidden='true' />
          knowvio.awaisali.net
        </span>
        <span className='w-[38px]' aria-hidden='true' />
      </div>

      <div className='relative flex-1 overflow-hidden'>
        <Image
          src='/projects/knowvio.png'
          alt='Knowvio landing page'
          fill
          sizes='(min-width: 1024px) 600px, (min-width: 640px) 460px, 85vw'
          className='object-cover object-left-top transition duration-700 group-hover:scale-[1.03]'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent' />

        <div
          className='pop-in absolute bottom-3 right-3 w-[68%] max-w-[260px] @[480px]:w-[52%] rounded-xl bg-[#131318]/95 p-3 text-[11px] leading-[1.55] text-white/85 shadow-2xl ring-1 ring-white/10'
          style={delayStyle(600)}
        >
          <p className='term-line flex items-center gap-1.5 text-white/50' style={delayStyle(900)}>
            <Sparkles className='h-3 w-3 text-indigo-300' aria-hidden='true' />
            What brought churn down in Q3?
          </p>
          <p className='term-line mt-1.5' style={delayStyle(1500)}>
            Onboarding emails cut first-month churn by{' '}
            <span className='whitespace-nowrap'>
              12%
              <Cite n={1} />,
            </span>{' '}
            mostly on annual{' '}
            <span className='whitespace-nowrap'>
              plans
              <Cite n={2} />.
            </span>
          </p>
          <div className='mt-2 hidden flex-wrap gap-1 @[420px]:flex'>
            {sources.map(({ icon: Icon, label }, i) => (
              <span
                key={label}
                className='term-line flex items-center gap-1 rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[9.5px] text-white/55'
                style={delayStyle(2200 + i * 180)}
              >
                <Icon className='h-2.5 w-2.5' aria-hidden='true' />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ROWS = 5;
const COLS = 9;
const dotColors = ['#8b5cf6', '#6366f1', '#22d3ee', '#34d399', '#fbbf24'];

export function DotGridPreview() {
  return (
    <div className='relative flex h-full items-center justify-center gap-10 bg-[radial-gradient(circle_at_50%_40%,#1b1830_0%,#0c0c10_70%)] px-6'>
      <div className='flex flex-col items-center gap-3'>
        <div className='grid grid-cols-3 gap-1.5'>
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className='h-2 w-2 rounded-full bg-white/25' />
          ))}
        </div>
        <span className='font-mono text-[10px] tracking-wider text-white/40'>3 × 3</span>
      </div>

      <span className='font-mono text-white/30'>→</span>

      <div className='flex flex-col items-center gap-3'>
        <div
          className='grid gap-2'
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: ROWS * COLS }, (_, i) => {
            const row = Math.floor(i / COLS);
            const col = i % COLS;
            return (
              <span
                key={i}
                className='dot-wave h-2.5 w-2.5 rounded-full'
                style={
                  {
                    background: dotColors[(row + col) % dotColors.length],
                    '--delay': `${(row + col) * 90}ms`,
                  } as CSSProperties
                }
              />
            );
          })}
        </div>
        <span className='font-mono text-[10px] tracking-wider text-white/60'>
          rows × cols
        </span>
      </div>
    </div>
  );
}
