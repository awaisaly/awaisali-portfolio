'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import { useEffect } from 'react';

function SystemThemeFallback() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // If the user hasn't chosen a theme (theme === "system") but the runtime can't
    // detect system preference, default to light as a safe fallback.
    const canDetectSystem =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function';

    if (theme === 'system' && !canDetectSystem) {
      setTheme('light');
    }
  }, [theme, setTheme]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      enableColorScheme
      disableTransitionOnChange
    >
      <SystemThemeFallback />
      {children}
    </ThemeProvider>
  );
}
