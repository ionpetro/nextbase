'use client';

import { cn } from '@/utils/cn';
import Link from 'next/link';
import Home from 'lucide-react/dist/esm/icons/home';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/presentational/tailwind/ThemeToggle';
import { useMemo } from 'react';
import { FeatureViewModal } from '@/components/presentational/tailwind/FeatureViewModal';
import { Notifications } from './Notifications';

export default function InternalNavbar() {
  const pathname = usePathname();
  const href = '/all';
  const isActive = pathname === href;
  const baseClassNames =
    'whitespace-nowrap py-2 border-b-2 px-3 font-medium text-base flex items-center space-x-2';
  const modifierClasses = isActive
    ? 'border-blue-500 text-blue-600'
    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
  const className = `${baseClassNames} ${modifierClasses}`;
  const notificationTabs = useMemo(() => {
    return [
      {
        label: 'All',
        href: `/all`,
      },
      {
        label: 'Read',
        href: `/read`,
      },
    ];
  }, []);

  return (
    <div
      className={cn(
        'h-full flex mx-auto px-12 border-b dark:border-gray-700/50 py-5 w-full mb-8 justify-center items-center'
      )}
    >
      <div className={cn('hidden lg:block', 'relative ')}>
        <Link
          href="/dashboard"
          className="flex items-center text-lg font-medium transition-colors hover:text-foreground/60 sm:text-sm"
          aria-label="Home page"
        >
          <Home className="h-5 w-5 mr-2" /> Dashboard
        </Link>
      </div>
      <div className="relative flex basis-0 items-center justify-end space-x-2 sm:gap-3 md:flex-grow">
        <ThemeToggle />
        <div className="w-px h-5 mx-4 bg-muted-foreground" />
        <FeatureViewModal />
        <Notifications />
      </div>
    </div>
  );
}
