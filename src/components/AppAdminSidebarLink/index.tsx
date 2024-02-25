import { isLoggedInUserAppAdmin } from '@/data/admin/security';
import { cn } from '@/utils/cn';
import ServerIcon from 'lucide-react/dist/esm/icons/server';
import Link from 'next/link';

export async function AppAdminSidebarLink() {
  const isUserAppAdmin = await isLoggedInUserAppAdmin();
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
          <ServerIcon className="text-lg" /> Admin Panel
        </Link>
      ) : (
        <Link
          href="/app_admin_preview"
          className={cn(
            'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
            'flex gap-2 items-center py-2 text-sm',
          )}
        >
          <ServerIcon className="text-lg" /> Admin Panel Preview
        </Link>
      )}
    </>
  );
}
