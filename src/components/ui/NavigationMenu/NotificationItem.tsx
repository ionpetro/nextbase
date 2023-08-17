import { Anchor } from '@/components/Anchor';
import { supabaseUserClientComponentClient } from '@/supabase-clients/user/supabaseUserClientComponentClient';
import { cn } from '@/utils/cn';
import { readNotification } from '@/utils/supabase/notifications';
import { useEffect } from 'react';
import { useInViewRef } from 'rooks';

type NotificationItemProps = {
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
  image: string;
  isRead: boolean;
  createdAt: string;
  isNew: boolean;
  notificationId: string;
  onHover: () => void;
};

export function NotificationItem({
  title,
  description,
  href,
  image,
  isRead,
  isNew,
  onClick,
  createdAt,
  notificationId,
  onHover,
}: NotificationItemProps) {
  const content = (
    <div
      onMouseOver={onHover}
      className={cn(
        ' flex justify-between items-center w-full text-neutral-900 dark:text-white px-6 border-b border-neutral-300/75 dark:border-neutral-700/75',
        isRead
          ? 'bg-neutral-100 dark:bg-neutral-800'
          : 'bg-white dark:bg-neutral-900'
      )}
    >
      <div className="flex justify-between items-start w-full  pt-1 ">
        <div className="flex py-2 pb-3 items-start w-full">
          <img
            src={image}
            alt={title}
            className="h-14 w-14 rounded-2xl border-2 mr-4 border-neutral-400 dark:border-neutral-600"
          />
          <div className="mr-3 mt-1">
            <p className="text-base font-bold dark:text-white mb-0.5 leading-none">
              {title}
            </p>
            <p className="text-sm font-medium dark:text-neutral-700 text-neutral-500">
              {description}
            </p>
            <p className="text-xs mt-1 text-neutral-400 dark:text-neutral-800 font-medium tracking-wide">
              {createdAt}
            </p>
          </div>
        </div>

        {isNew && (
          <div className="flex items-center justify-center h-3 w-3 mt-4 rounded-full bg-red-500"></div>
        )}
      </div>
    </div>
  );
  if (href) {
    return (
      <Anchor
        onClick={() => {
          readNotification(supabaseUserClientComponentClient, notificationId);
        }}
        href={href}
        className="w-full flex flex-col items-center"
      >
        {content}
      </Anchor>
    );
  } else {
    return (
      <div className="w-full flex flex-col items-center" onClick={onClick}>
        {content}
      </div>
    );
  }
}
