'use client';
import { classNames } from '@/utils/classNames';
import { Server } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

const matchAppAdmin = match('/app_admin_preview/(.*)?');
export function AppAdminPreviewLink() {
  const pathname = usePathname();
  const isActive = pathname ? matchAppAdmin(pathname) : false;

  return (
    <Link
      data-testid="admin-panel-link"
      href="/app_admin_preview"
      className={classNames(
        `flex px-4 gap-2 w-max cursor-pointer items-center group py-1 rounded-lg transition hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 `,
        isActive ? ' bg-gray-100  dark:bg-slate-800  ' : ' bg-transparent',
      )}
    >
      <span
        className={classNames(
          'text-gray-700 dark:text-slate-300 ',
          isActive
            ? ' text-gray-700 dark:text-slate-300 '
            : ' text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300',
        )}
      >
        <Server className="group-hover:text-gray-700 dark:group-hover:text-slate-300 w-4 h-4 text-gray-500 dark:text-slate-400" />
      </span>

      <span
        className={classNames(
          'transition text-sm font-medium mt-0.5 ',
          isActive
            ? ' text-gray-700 dark:text-slate-300 '
            : ' text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300',
        )}
      >
        Admin Panel Preview
      </span>
    </Link>
  );
}
