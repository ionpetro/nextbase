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
        `flex px-4 gap-2 w-max cursor-pointer items-center group py-1 rounded-lg transition hover:cursor-pointer hover:bg-neutral-100`,
        isActive ? 'bg-neutral-100' : 'bg-transparent',
      )}
    >
      <span
        className={classNames(
          'text-neutral-700',
          isActive
            ? 'text-neutral-700'
            : 'text-neutral-500 group-hover:text-neutral-700',
        )}
      >
        <Server className="group-hover:text-neutral-700 w-4 h-4 text-neutral-500" />
      </span>

      <span
        className={classNames(
          'transition text-sm font-medium mt-0.5',
          isActive
            ? 'text-neutral-700'
            : 'text-neutral-500 group-hover:text-neutral-700',
        )}
      >
        Admin Panel Preview
      </span>
    </Link>
  );
}
