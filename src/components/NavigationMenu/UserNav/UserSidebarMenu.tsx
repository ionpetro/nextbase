import { cn } from '@/utils/cn';
import ComputerIcon from 'lucide-react/dist/esm/icons/computer';
import SecurityIcon from 'lucide-react/dist/esm/icons/lock';
import LogoutIcon from 'lucide-react/dist/esm/icons/log-out';
import MailIcon from 'lucide-react/dist/esm/icons/mail';
import AccountsIcon from 'lucide-react/dist/esm/icons/user';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FeatureViewModal } from './FeatureViewModal';

export function UserSidebarMenu({
  userEmail,
  userFullName,
  userAvatarUrl,
  appAdminSidebarLink,
}: {
  userEmail: string;
  userFullName: string;
  userAvatarUrl: string;
  appAdminSidebarLink: ReactNode;
}) {
  return (
    <div className="dark:bg-black ">
      <div
        className="grid items-start mt-1 gap-2 mb-2 overflow-hidden"
        style={{
          gridTemplateColumns: 'min-content 1fr',
        }}
      >
        <div className="h-[28px] mt-1 w-[28px] rounded-full border">
          <Image
            src={userAvatarUrl}
            width={28}
            height={28}
            placeholder="blur"
            blurDataURL={userAvatarUrl}
            quality={100}
            sizes="100vw"
            alt="User avatar"
            className="h-full w-full"
            objectFit="cover"
            style={{
              borderRadius: '50%',
            }}
          />
        </div>
        <div className="mb-1 overflow-hidden">
          <div className="text-sm font-medium text-gray-900 dark:text-white truncate w-full text-ellipsis">
            {userFullName}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 truncate w-full text-ellipsis">
            {userEmail}
          </div>
        </div>
      </div>
      <div className="h-px bg-gray-200 dark:bg-gray-700  my-2" />
      <Link
        href="/settings"
        className={cn(
          'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
          'flex gap-2 items-center py-2 text-sm',
        )}
      >
        <AccountsIcon className="text-lg" /> Account settings
      </Link>
      <Link
        href="/settings/developer"
        className={cn(
          'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
          'flex gap-2 items-center py-2 text-sm',
        )}
      >
        <ComputerIcon className="text-lg" /> Developer Settings
      </Link>
      <Link
        href="/settings/security"
        className={cn(
          'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
          'flex gap-2 items-center py-2 text-sm',
        )}
      >
        <SecurityIcon className="text-lg" /> Security Settings
      </Link>

      {appAdminSidebarLink}
      <div className="h-px bg-gray-200 dark:bg-gray-700  my-2" />
      <FeatureViewModal />
      <Link
        href="/feedback"
        prefetch={false}
        className={cn(
          'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
          'flex gap-2 items-center py-2 text-sm',
        )}
      >
        <MailIcon className="text-lg" />
        Feedback
      </Link>
      <div className="h-px bg-gray-200 dark:bg-gray-700  my-2" />
      <Link
        href="/logout"
        prefetch={false}
        className={cn(
          'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
          'flex gap-2 items-center py-2 text-sm',
        )}
      >
        <LogoutIcon className="text-lg" />
        Log out
      </Link>
    </div>
  );
}
