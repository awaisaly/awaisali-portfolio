"use client";

import { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";

type NavItem = { href: string; label: string };

export function MobileNav({
  items,
  resumeHref,
}: {
  items: NavItem[];
  resumeHref: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="inline-flex items-center justify-center rounded-full border border-border bg-card p-2 shadow-sm backdrop-blur transition hover:bg-card-solid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:hidden"
      >
        <Menu className="h-4 w-4" aria-hidden="true" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-1/2 top-3 w-[min(92vw,420px)] -translate-x-1/2 overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between gap-3 px-1">
              <p className="text-sm font-semibold tracking-tight">Menu</p>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-border bg-card-solid p-2 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-3 grid gap-1">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-transparent px-3 py-3 text-sm font-medium text-foreground transition hover:border-border hover:bg-card-solid"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-3 border-t border-border pt-3">
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-95"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

