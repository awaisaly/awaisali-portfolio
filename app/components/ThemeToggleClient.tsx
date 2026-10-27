'use client';

import dynamic from 'next/dynamic';

export const ThemeToggleClient = dynamic(
  () => import('./ThemeToggle').then((m) => m.ThemeToggle),
  {
    ssr: false,
    // Same footprint as the real toggle so the dock doesn't shift when it loads.
    loading: () => <span aria-hidden='true' className='block h-9 w-9' />,
  }
);
