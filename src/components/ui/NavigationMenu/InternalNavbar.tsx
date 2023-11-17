import { UserNav } from './UserNav';
import { Badge } from '../Badge';
import { cn } from '@/utils/cn';
import { AppAdminLink } from './AppAdminLink/AppAdminLink';
import { ReactNode, Suspense } from 'react';
import { PendingInvitationCounter } from './PendingInvitationCounter';

export async function InternalNavbar({ children }: { children: ReactNode }) {
  return (
    <header className="sticky top-0 w-full z-10 dark:bg-slate-900/50 bg-white/90 backdrop-blur">
      <div
        className={cn(
          'h-full text-sm font-medium flex mx-auto pr-12 border-b dark:border-gray-700/50 py-2.5 w-full mb-8 justify-between items-center',
        )}
      >
        <Suspense>{children}</Suspense>
        <div className="relative w-max flex items-center space-x-1">
          <div className="w-px h-5 mx-4 bg-muted-foreground" />
          <PendingInvitationCounter />
          <AppAdminLink />
          <div className="relative w-max flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
}
