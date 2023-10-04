import { UserNav } from './UserNav';
import { Badge } from '../Badge';
import { cn } from '@/utils/cn';
import { AppAdminLink } from './AppAdminLink/AppAdminLink';

export async function InternalNavbar() {
  return (
    <header className="sticky top-0 w-full z-10 dark:bg-slate-900/50 bg-white/90 backdrop-blur">
      <div
        className={cn(
          'h-full text-sm font-medium flex mx-auto px-12 border-b dark:border-gray-700/50 py-2.5 w-full mb-8 justify-center items-center',
        )}
      >
        <div className={cn('hidden lg:block', 'relative ')}>
          Organization Name
          <Badge variant="discussion" size="xxs" className="ml-3 py-1">
            Organization
          </Badge>
        </div>
        <div className="relative flex basis-0 items-center justify-end space-x-2 sm:gap-3 md:flex-grow">
          <AppAdminLink />
          <div className="w-px h-5 mx-4 bg-muted-foreground" />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
