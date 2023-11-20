import { Anchor } from '@/components/Anchor';
import { cn } from '@/utils/cn';

import { T } from '../Typography';
import { readNotification } from './fetchClientNotifications';

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
        ' flex justify-between items-center w-full text-gray-900 dark:text-white px-6 border-b border-gray-300/75 dark:border-gray-700/75',
        isRead
          ? 'bg-gray-100/50 dark:bg-gray-800/50'
          : 'bg-white dark:bg-gray-900',
      )}
    >
      <div className="flex justify-between items-start w-full  pt-1 ">
        <div className="flex py-2 pb-3 items-start w-full">
          <img
            src={image}
            alt={title}
            className="h-14 w-14 rounded-2xl border-2 mr-4"
          />
          <div className="mr-3 mt-1">
            <T.P className=" font-bold dark:text-white mb-0.5 leading-none">
              {title}
            </T.P>
            <T.Small className=" font-medium text-muted-foreground">
              {description}
            </T.Small>
            <T.Subtle className="text-xs mt-0.5 text-gray-400 dark:text-gray-600 font-medium tracking-wide">
              {createdAt}
            </T.Subtle>
          </div>
        </div>

        {isNew && (
          <div className="flex items-center justify-center h-3 w-3 mt-4 rounded-full bg-red-500 dark:bg-red-500"></div>
        )}
      </div>
    </div>
  );
  if (href) {
    return (
      <Anchor
        onClick={() => {
          readNotification(notificationId);
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
