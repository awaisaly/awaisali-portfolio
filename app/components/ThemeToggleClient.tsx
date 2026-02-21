"use client";

import dynamic from "next/dynamic";

export const ThemeToggleClient = dynamic(
  () => import("./ThemeToggle").then((m) => m.ThemeToggle),
  {
    ssr: false,
    loading: () => (
      // Visible skeleton with the same sizing as the real toggle (mobile + desktop),
      // so there’s no layout shift/jitter when the client component loads.
      <div
        aria-hidden="true"
        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card px-0 text-sm shadow-sm backdrop-blur"
      >
        <span className="h-4 w-4 rounded bg-foreground/10 animate-pulse" />
      </div>
    ),
  },
);

