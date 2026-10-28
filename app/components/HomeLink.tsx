import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const ease = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

export function HomeLink() {
  return (
    <Link
      href='/'
      className={`group inline-flex items-center gap-3 rounded-full bg-surface py-1.5 pl-1.5 pr-5 text-foreground ring-1 ring-line shadow-[0_14px_40px_-22px_rgba(0,0,0,0.65)] transition duration-300 ${ease} hover:bg-dock hover:text-dock-foreground hover:ring-transparent active:scale-[0.98]`}
    >
      <span
        className={`relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-dock text-dock-foreground transition duration-300 ${ease} group-hover:bg-dock-foreground group-hover:text-dock`}
      >
        <ArrowLeft
          className={`h-4 w-4 transition duration-500 ${ease} group-hover:-translate-x-6 group-hover:opacity-0`}
          aria-hidden='true'
        />
        <ArrowLeft
          className={`absolute h-4 w-4 translate-x-6 opacity-0 transition duration-500 ${ease} group-hover:translate-x-0 group-hover:opacity-100`}
          aria-hidden='true'
        />
      </span>
      <span className='font-serif text-[22px] leading-none tracking-[-0.02em]'>Home</span>
    </Link>
  );
}
