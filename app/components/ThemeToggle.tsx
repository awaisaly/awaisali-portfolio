'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggle = () => {
    const current = (resolvedTheme ?? theme) === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  };

  // This component is rendered client-only (no SSR) via dynamic import in `app/page.tsx`,
  // so we can safely rely on `resolvedTheme` without risking hydration mismatches.
  const active = (resolvedTheme ?? theme) === 'dark' ? 'dark' : 'light';

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label='Toggle theme'
      className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card px-0 text-sm text-foreground shadow-sm backdrop-blur transition hover:bg-card-solid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 sm:w-24 sm:justify-between sm:px-3'
    >
      <span
        key={active}
        className='hidden w-10 text-left text-muted sm:inline-block animate-theme-pop'
      >
        {active === 'dark' ? 'Dark' : 'Light'}
      </span>
      <span
        key={`icon-${active}`}
        className={[
          'relative animate-theme-pop',
          active === 'dark' ? 'animate-theme-moon' : 'animate-theme-sun',
        ].join(' ')}
      >
        {active === 'dark' ? (
          <span className='theme-twinkle' />
        ) : (
          <span className='theme-halo' />
        )}
        {active === 'dark' ? (
          <Moon
            className='h-4 w-4 text-white animate-icon-spin'
            aria-hidden='true'
          />
        ) : (
          <Sun
            className='h-4 w-4 text-amber-400 animate-icon-spin'
            aria-hidden='true'
          />
        )}
      </span>
    </button>
  );
}
