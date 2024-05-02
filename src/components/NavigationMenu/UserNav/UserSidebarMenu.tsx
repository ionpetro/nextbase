import { GiveFeedbackDialog } from '@/app/(dynamic-pages)/(feedback-pages)/feedback/[feedbackId]/GiveFeedbackDialog';
import { LucideIcon } from '@/components/LucideIcon';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
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
    <div className="dark:bg-black">
      <div
        className="items-start gap-2 grid mt-1 mb-2 overflow-hidden"
        style={{
          gridTemplateColumns: 'min-content 1fr',
        }}
      >
        <div className="mt-1 border rounded-full w-[28px] h-[28px]">
          <Image
            src={userAvatarUrl}
            width={28}
            height={28}
            placeholder="blur"
            blurDataURL={userAvatarUrl}
            quality={100}
            sizes="100vw"
            alt="User avatar"
            className="w-full h-full"
            objectFit="cover"
            style={{
              borderRadius: '50%',
            }}
          />
        </div>
        <div className="mb-1 overflow-hidden">
          <div className="w-full font-medium text-ellipsis text-gray-900 text-sm dark:text-white truncate">
            {userFullName}
          </div>
          <div className="w-full text-ellipsis text-gray-500 text-xs dark:text-gray-400 truncate">
            {userEmail}
          </div>
        </div>
      </div>
      <div className="bg-gray-200 dark:bg-gray-700 my-2 h-px" />
      <Link
        href="/settings"
        className={cn(
          'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
          'flex gap-2 items-center py-2 text-sm',
        )}
      >
        <LucideIcon name="User" className="text-lg" />Account settings
      </Link>
      <Link
        href="/settings/developer"
        className={cn(
          'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
          'flex gap-2 items-center py-2 text-sm',
        )}
      >
        <LucideIcon name="Computer" className="text-lg" /> Developer Settings
      </Link>
      <Link
        href="/settings/security"
        className={cn(
          'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
          'flex gap-2 items-center py-2 text-sm',
        )}
      >
        <LucideIcon name="Lock" className="text-lg" /> Security Settings
      </Link>

      {appAdminSidebarLink}
      <div className="bg-gray-200 dark:bg-gray-700 my-2 h-px" />
      <FeatureViewModal />
      <GiveFeedbackDialog isExpanded={false}>
        <div
          data-testid="feedback-link"
          className={cn(
            'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50 w-full',
            'flex gap-2 items-center py-2 text-sm cursor-pointer',
          )}
        >
          <LucideIcon name="Mail" className="text-lg" />
          Feedback
        </div>
      </GiveFeedbackDialog>

      <div className="bg-gray-200 dark:bg-gray-700 my-2 h-px" />
      <Link
        href="/logout"
        prefetch={false}
        className={cn(
          'hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50',
          'flex gap-2 items-center py-2 text-sm',
        )}
      >
        <LucideIcon name="LogOut" className="text-lg" />
        Log out
      </Link>
    </div>
  );
}
