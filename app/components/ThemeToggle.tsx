'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { MouseEvent } from 'react';
import { flushSync } from 'react-dom';

const RIPPLE_MS = 700;
const RIPPLE_EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Rendered client-only via `ThemeToggleClient`, so `resolvedTheme` is safe to read.
  const isDark = (resolvedTheme ?? theme) === 'dark';

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? 'light' : 'dark';
    const root = document.documentElement;

    // The view transition snapshots the DOM right after this callback, so the
    // class has to flip synchronously instead of waiting for next-themes' effect.
    const apply = () => {
      root.classList.remove('light', 'dark');
      root.classList.add(next);
      root.style.colorScheme = next;
      flushSync(() => setTheme(next));
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('startViewTransition' in document)) {
      apply();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    root.classList.add('theme-switching');
    const transition = document.startViewTransition(apply);
    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
          },
          { duration: RIPPLE_MS, easing: RIPPLE_EASE, pseudoElement: '::view-transition-new(root)' }
        );
      })
      .catch(() => {});
    transition.finished.finally(() => root.classList.remove('theme-switching'));
  };

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className='grid h-9 w-9 cursor-pointer place-items-center rounded-full opacity-60 transition hover:bg-dock-foreground/10 hover:opacity-100'
    >
      {isDark ? (
        <Sun key='sun' className='icon-in h-4 w-4' aria-hidden='true' />
      ) : (
        <Moon key='moon' className='icon-in h-4 w-4' aria-hidden='true' />
      )}
    </button>
  );
}
