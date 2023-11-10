'use client';

import { supabaseUserClientComponentClient } from '@/supabase-clients/user/supabaseUserClientComponentClient';
import {
  getPaginatedNotifications,
  getUnseenNotificationIds,
  readAllNotifications,
  seeNotification,
} from '@/utils/supabase/notifications';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import CheckIcon from 'lucide-react/dist/esm/icons/check';
import { NotificationItem } from '@/components/ui/NavigationMenu/NotificationItem';
import NotificationIcon from 'lucide-react/dist/esm/icons/bell';
import { useDidMount } from 'rooks';
import { T } from '../Typography';
import { Table } from '@/types';
import { parseNotification } from '@/utils/parseNotification';
import moment from 'moment';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '../Button';

const NOTIFICATIONS_PAGE_SIZE = 10;
const useUnseenNotificationIds = (userId: string) => {
  const { data, refetch } = useQuery(
    ['unseen-notification-ids', userId],
    async () => {
      return getUnseenNotificationIds(
        supabaseUserClientComponentClient,
        userId,
      );
    },
    {
      initialData: [],
    },
  );
  useEffect(() => {
    const channelId = `user-notifications:${userId}`;
    const channel = supabaseUserClientComponentClient
      .channel(channelId)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_notifications',
          filter: 'user_id=eq.' + userId,
        },
        () => {
          refetch();
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_notifications',
          filter: 'user_id=eq.' + userId,
        },
        (payload) => {
          console.log(payload);
          refetch();
        },
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [refetch, userId]);

  return data ?? 0;
};

export const useNotifications = (userId: string) => {
  const { data, isFetchingNextPage, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ['paginatedNotifications', userId],
      async ({ pageParam }) => {
        return getPaginatedNotifications(
          supabaseUserClientComponentClient,
          userId,
          pageParam ?? 0,
          NOTIFICATIONS_PAGE_SIZE,
        );
      },
      {
        getNextPageParam: (lastPage, _pages) => {
          const pageNumber = lastPage[0];
          const rows = lastPage[1];

          if (rows.length < NOTIFICATIONS_PAGE_SIZE) return undefined;
          return pageNumber + 1;
        },
        initialData: {
          pageParams: [0],
          pages: [[0, []]],
        },
      },
    );

  const notifications = data?.pages.flatMap((page) => page[1]) ?? [];
  return {
    notifications,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
};

function NextPageLoader({ onMount }: { onMount: () => void }) {
  useDidMount(() => {
    onMount();
  });
  return <div className="h-4"></div>;
}

function Notification({
  notification,
  isSeen,
}: {
  notification: Table<'user_notifications'>;
  isSeen: boolean;
}) {
  const router = useRouter();
  const notificationPayload = parseNotification(notification.payload);
  const handleNotificationClick = useCallback(() => {
    if (notificationPayload.type === 'welcome') {
      toast('Welcome to Nextbase');
    }
  }, [notificationPayload]);

  return (
    <NotificationItem
      key={notification.id}
      title={notificationPayload.title}
      description={notificationPayload.description}
      createdAt={moment(notification.created_at).fromNow()}
      href={
        notificationPayload.actionType === 'link'
          ? notificationPayload.href
          : undefined
      }
      onClick={
        notificationPayload.actionType === 'button'
          ? () => {
            handleNotificationClick();
          }
          : undefined
      }
      image={notificationPayload.image}
      isRead={notification.is_read}
      isNew={!isSeen}
      notificationId={notification.id}
      onHover={() => {
        if (!isSeen) {
          seeNotification(supabaseUserClientComponentClient, notification.id);
          router.refresh();
        }
      }}
    />
  );
}

export const useReadAllNotifications = (userId: string) => {
  const router = useRouter();
  return useMutation(
    async () => {
      return readAllNotifications(supabaseUserClientComponentClient, userId);
    },
    {
      onSuccess: () => {
        router.refresh();
        toast.success('All notifications marked as read');
      },
    },
  );
};

export const Notifications = ({ userId }: { userId: string }) => {
  const unseenNotificationIds = useUnseenNotificationIds(userId);
  const unseenNotificationCount = unseenNotificationIds.length;
  const {
    notifications,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useNotifications(userId);
  const { mutate: readAllNotifications } = useReadAllNotifications(userId);
  return (
    <Popover>
      <PopoverTrigger className="focus:ring-none">
        <NotificationIcon className="h-5 w-5 px-0 text-muted-foreground hover:text-black dark:hover:text-white" />
        {unseenNotificationCount > 0 && (
          <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full">
            {unseenNotificationCount}
          </span>
        )}
      </PopoverTrigger>

      {notifications.length ? (
        <PopoverContent className="mr-12 w-[560px] p-0 rounded-xl overflow-hidden bg-white dark:bg-slate-950">
          <div className="border-b-2 px-6 pb-2 shadow-lg">
            <div className="mt-7 mb-3 flex justify-between">
              <T.H3 className="leading-7 mt-0 dark:text-white ">
                Notifications
              </T.H3>
              <div className="flex text-sm mt-2 space-x-1 group cursor-pointer font-medium">
                {unseenNotificationCount ? (
                  <>
                    <CheckIcon className="h-5 w-5 text-muted-foreground dark:group-hover:text-gray-400" />{' '}
                    <span
                      onClick={() => {
                        readAllNotifications();
                      }}
                      className="underline underline-offset-4 text-muted-foreground dark:group-hover:text-gray-400 "
                    >
                      Mark as all read
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mx-auto">
            {isLoading ? (
              <T.Small className="py-4">Loading...</T.Small>
            ) : (
              notifications.map((notification) => {
                return (
                  <Notification
                    key={notification.id}
                    notification={notification}
                    isSeen={unseenNotificationIds.every(
                      (n) => n.id !== notification.id,
                    )}
                  />
                );
              })
            )}
            {hasNextPage ? (
              isFetchingNextPage ? (
                <T.Subtle className="py-4">Loading...</T.Subtle>
              ) : (
                <NextPageLoader onMount={fetchNextPage} />
              )
            ) : (
              <T.Subtle className="py-3 text-muted-foreground">
                No more notifications
              </T.Subtle>
            )}
          </div>
        </PopoverContent>
      ) : (
        <PopoverContent className="mr-12 p-0 rounded-xl overflow-hidden">
          <div className="px-6 py-4 shadow-lg">
            <T.P className="text-muted-foreground">No notifications yet.</T.P>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};
