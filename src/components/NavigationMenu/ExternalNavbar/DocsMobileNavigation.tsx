'use client';
import { LucideIcon } from '@/components/LucideIcon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import lightLogo from '@public/logos/acme-logo-dark.png';
import darkLogo from '@public/logos/acme-logo-light.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentProps, useState } from 'react';
import { DocsNavigation } from './DocsNavigation';

function MenuIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M5 5l14 14M19 5l-14 14" />
    </svg>
  );
}

export function DocsMobileNavigation() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isDocs = pathname ? pathname.startsWith('/docs') : false;

  if (!isDocs) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative md:hidden"
          aria-label="Open navigation"
        >
          <LucideIcon name="PanelLeft" className="w-6 h-6 stroke-muted-foreground" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-white dark:bg-gray-900 px-6 sm:px-6 pt-5 pb-12 w-full max-w-xs min-h-full"
      >
        <div className="flex items-center">
          <Link href={'/'} className="font-bold text-xl">
            <div className="relative flex items-center space-x-2 dark:-ml-4 text-black dark:text-white">
              <Image
                src={lightLogo}
                alt="logo"
                className="block dark:hidden w-10 h-10"
              />
              <Image
                src={darkLogo}
                alt="logo"
                className="dark:block hidden w-10 h-10"
              />
              <span className="sm:inline-block hidden font-bold">nextbase</span>
            </div>
          </Link>
        </div>
        <ScrollArea className="h-screen overflow-y-auto">
          <DocsNavigation setIsOpen={setIsOpen} className="mt-5 px-1 pb-40" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
