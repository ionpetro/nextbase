'use client';
import { Anchor } from '@/components/Anchor';
import { classNames } from '@/utils/classNames';
import ServerIcon from 'lucide-react/dist/esm/icons/server';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

const matchAppAdmin = match('/app_admin_preview/(.*)?');
export function AppAdminPreviewLink() {
  const pathname = usePathname();
  const isActive = pathname ? matchAppAdmin(pathname) : false;

  return (
    <Anchor
      href="/app_admin_preview"
      className={classNames(
        `flex gap-2.5 px-4 w-max cursor-pointer w-max items-center group py-2 mb-1 rounded-lg transition hover:cursor-pointer hover:bg-gray-200/50 dark:hover:bg-slate-700/50 `,
        isActive ? ' bg-gray-300/50  dark:bg-slate-800  ' : ' bg-transparent',
      )}
    >
      <span
        className={classNames(
          'text-gray-700 dark:text-slate-300 ',
          isActive
            ? ' text-gray-900 dark:text-slate-100 '
            : ' text-gray-700 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-slate-300',
        )}
      >
        <ServerIcon className="h-5 w-5" />
      </span>

      <span
        className={classNames(
          'transition text-sm font-medium mt-0.5 ',
          isActive
            ? ' text-gray-900 dark:text-slate-100 '
            : ' text-gray-700 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-slate-300',
        )}
      >
        Admin Panel Preview
      </span>
    </Anchor>
  );
}
