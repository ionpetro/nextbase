'use client';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DocsMobileNavigation } from './DocsMobileNavigation';
import TwitterLightMode from '@public/logos/x-logo-black.png';
import TwitterDarkMode from '@public/logos/x-logo-white.png';
import lightLogo from '@public/logos/nextbase-light-logo.png';
import darkLogo from '@public/logos/nextbase-dark-logo.png';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { classNames } from '@/utils/classNames';
import { ThemeToggle } from '@/components/presentational/tailwind/ThemeToggle';

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isDocs = pathname ? pathname.startsWith('/docs') : false;
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
    <header className="inset-x-0 top-0 bg-white/80 dark:bg-slate-900 sticky z-50 border-b border-gray-200/20 dark:border-gray-700/40 md:container backdrop-blur">
      {/* <div className="mr-6 flex lg:hidden space-x-2">
        <MobileNavigation />
        <div className={cn('block lg:hidden ', 'relative ')}>
          <Link href={'/'} className={classNames('font-bold text-xl ')}>
            <div className="relative flex space-x-2 items-center text-black dark:text-white dark:-ml-4">
              <Image
                src={lightLogo}
                alt="logo"
                className="dark:hidden block h-10 w-10"
              />
              <Image
                src={darkLogo}
                alt="logo"
                className="hidden dark:block h-10 w-10"
              />
              <span className="hidden font-bold sm:inline-block">nextbase</span>
            </div>
          </Link>
        </div>
      </div> */}

      <nav className={`flex items-center h-[57px] justify-between w-full`}>
        <div className=" flex items-center">
          <Link href={'/'} className={classNames('font-bold text-xl ')}>
            <div className="relative flex space-x-2 items-center text-black dark:text-white dark:-ml-4">
              <Image
                src={lightLogo}
                alt="logo"
                className="dark:hidden block h-10 w-10"
              />
              <Image
                src={darkLogo}
                alt="logo"
                className="hidden dark:block h-10 w-10"
              />
              <span className="hidden font-bold sm:inline-block">nextbase</span>
            </div>
          </Link>
        </div>
        <div className="flex space-x-1">
          <Link
            href="/docs"
            className="inline-flex px-4 py-1.5 text-muted-foreground hover:text-gray-900 dark:hover:text-slate-300 text-base font-[500] leading-tight"
            aria-label="Docs"
          >
            Docs
          </Link>
          <Link
            href="/blog"
            className="inline-flex px-4 py-1.5 text-muted-foreground hover:text-gray-900 dark:hover:text-slate-300 text-base font-[500] leading-tight"
            aria-label="Blog"
          >
            Blog
          </Link>
        </div>
        <div className=" flex items-center gap-3 sm:gap-3 md:flex-grow">
          <div className="w-px h-5 mx-4 bg-muted-foreground" />
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="https://twitter.com/@usenextbase"
              target="_blank"
              aria-label="Twitter"
            >
              <Image
                src={TwitterLightMode}
                alt="Twitter"
                className="h-4 w-4 dark:hidden block text-muted-foreground"
              />
              <Image
                src={TwitterDarkMode}
                alt="Twitter"
                className="h-4 w-4 hidden dark:block text-muted-foreground"
              />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
