'use client';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MobileNavigation } from './MobileNavigation';
import { LucideTwitter } from 'lucide-react';

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex flex-wrap border-b border-gray-200 items-center justify-between bg-white py-4 h-[57px] transition duration-500 dark:shadow-none sm:px-4 lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent'
      )}
    >
      <div className="mr-6 flex lg:hidden space-x-2">
        <MobileNavigation />
        <div className={cn('block lg:hidden ', 'relative ')}>
          <Link href="/" className="block" aria-label="Home page">
            <img
              src="/logos/nextbase_navlogo_small.svg"
              className="h-9 block sm:h-9"
              alt="Nextbase Logo"
            />
          </Link>
        </div>
      </div>

      <div
        className={cn(
          'h-full flex mx-auto  max-w-8xl w-full justify-center items-center sm:px-2 lg:px-8 xl:px-12'
        )}
      >
        <div className={cn('hidden lg:block', 'relative ')}>
          <Link href="/" className="block" aria-label="Home page">
            <img
              src="/logos/nextbase_navlogo.svg"
              className="h-5 block sm:h-5"
              alt="Nextbase Logo"
            />
          </Link>
        </div>
        <div className="relative flex basis-0 items-center justify-end gap-3 sm:gap-3 md:flex-grow">
          <div className='flex space-x-1'>
            <Link
              href="/docs"
              className="inline-flex px-4 py-1.5 text-zinc-900 hover:text-zinc-700 text-[13px] font-[600] leading-tight"
              aria-label="Docs"
            >
              Docs
            </Link>
            <Link
              href="/blog"
              className="inline-flex px-4 py-1.5 text-zinc-500 hover:text-zinc-900 text-[13px] font-[500] leading-tight"
              aria-label="Blog"
            >
              Blog
            </Link>
          </div>
          <div className="w-px h-5 mx-4 bg-zinc-300" />
          <Link
            href="https://twitter.com/@usenextbase"
            target="_blank"
            className="group p-[5px] bg-gradient-to-b from-white to-zinc-50 hover:bg-gradient-to-b hover:from-zinc-100 hover:to-zinc-100 transition rounded-[8px] border border-zinc-900 border-opacity-20 "
            aria-label="Twitter"
          >
            <LucideTwitter className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header >
  );
}