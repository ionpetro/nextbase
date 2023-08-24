'use client';

import { cn } from '@/utils/cn';
import Link from 'next/link';
import Home from 'lucide-react/dist/esm/icons/home';
import { usePathname } from 'next/navigation';
import LightIcon from 'lucide-react/dist/esm/icons/sun';
import InfoIcon from 'lucide-react/dist/esm/icons/info';
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
    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300';
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
        'h-full flex mx-auto px-12 border-b border-neutral-200/50 py-3 w-full mb-8 justify-center items-center'
      )}
    >
      <div className={cn('hidden lg:block', 'relative ')}>
        <Link
          href="/dashboard"
          className="inline-flex items-center font-medium text-neutral-500 hover:text-neutral-800"
          aria-label="Home page"
        >
          <Home className="h-5 w-5 mr-2" /> Dashboard
        </Link>
      </div>
      <div className="relative flex basis-0 items-center justify-end gap-3 sm:gap-3 md:flex-grow">
        <FeatureViewModal />
        <div className="group p-[5px] bg-gradient-to-b from-white to-neutral-50 hover:bg-gradient-to-b hover:from-neutral-50 hover:to-neutral-100/50 transition rounded-[8px] border cursor-pointer border-neutral-900 border-opacity-20 ">
          <LightIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-700" />
        </div>
        <Notifications />
      </div>
    </div>
  );
}
