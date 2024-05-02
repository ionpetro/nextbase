import { getIsAppAdmin } from '@/data/user/user';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { LucideIcon } from '../LucideIcon';

export async function AppAdminSidebarLink() {
  const isUserAppAdmin = await getIsAppAdmin();
  return (
    <>
      {isUserAppAdmin ? (
        <Link
          href="/app_admin"
          className={cn(
            'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
            'flex gap-2 items-center py-2 text-sm',
          )}
        >
          <LucideIcon name="Server" className="text-lg" />Admin Panel
        </Link>
      ) : (
        <Link
          href="/app_admin_preview"
          className={cn(
            'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
            'flex gap-2 items-center py-2 text-sm',
          )}
        >
          <LucideIcon name="Server" className="text-lg" />Admin Panel Preview
        </Link>
      )}
    </>
  );
}
