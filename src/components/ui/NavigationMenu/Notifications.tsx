'use client';

import { useLoggedInUser } from '@/hooks/useLoggedInUser';
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

const NOTIFICATIONS_PAGE_SIZE = 10;
const useUnseenNotificationIds = () => {
  const user = useLoggedInUser();

  const { data, refetch } = useQuery(
    ['unseen-notification-ids', user.id],
    async () => {
      return getUnseenNotificationIds(
        supabaseUserClientComponentClient,
        user.id
      );
    },
    {
      initialData: [],
    }
  );
  useEffect(() => {
    const channelId = `user-notifications:${user.id}`;
    const channel = supabaseUserClientComponentClient
      .channel(channelId)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_notifications',
          filter: 'user_id=eq.' + user.id,
        },
        () => {
          refetch();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_notifications',
          filter: 'user_id=eq.' + user.id,
        },
        (payload) => {
          console.log(payload);
          refetch();
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [supabaseUserClientComponentClient]);

  return data ?? 0;
};

export const useNotifications = () => {
  const user = useLoggedInUser();

  const { data, isFetchingNextPage, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ['paginatedNotifications', user.id],
      async ({ pageParam }) => {
        return getPaginatedNotifications(
          supabaseUserClientComponentClient,
          user.id,
          pageParam ?? 0,
          NOTIFICATIONS_PAGE_SIZE
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
      }
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
        }
      }}
    />
  );
}

export const useReadAllNotifications = () => {
  const user = useLoggedInUser();
  return useMutation(
    async () => {
      return readAllNotifications(supabaseUserClientComponentClient, user.id);
    },
    {
      onSuccess: () => {
        toast.success('All notifications marked as read');
      },
    }
  );
};

export const Notifications = () => {
  const unseenNotificationIds = useUnseenNotificationIds();
  const unseenNotificationCount = unseenNotificationIds.length;
  const {
    notifications,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useNotifications();
  const { mutate: readAllNotifications } = useReadAllNotifications();
  return (
    <Popover>
      <PopoverTrigger className="group p-[5px] bg-gradient-to-b from-white to-neutral-50 hover:bg-gradient-to-b hover:from-neutral-100 hover:to-neutral-100 transition rounded-[8px] border border-neutral-900 border-opacity-20 relative">
        <NotificationIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-700" />
        {unseenNotificationCount > 0 && (
          <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full">
            {unseenNotificationCount}
          </span>
        )}
      </PopoverTrigger>

      {notifications.length ? (
        <PopoverContent className="mr-12 w-[560px] p-0 rounded-xl overflow-hidden">
          <div className="border-b-2 border-neutral-300 dark:border-neutral-600 px-6 pb-2 shadow-lg">
            <div className="mt-7 mb-3 flex justify-between">
              <p className="text-2xl font-bold dark:text-white">
                Notifications
              </p>
              <div className="flex text-sm mt-1.5 space-x-1 text-neutral-600 hover:text-neutral-700 cursor-pointer font-medium">
                {unseenNotificationCount ? (
                  <>
                    <CheckIcon className="h-5 w-5" />{' '}
                    <span
                      onClick={() => {
                        readAllNotifications();
                      }}
                      className="underline underline-offset-4 dark:text-neutral-600"
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
              <T.Subtle>Loading...</T.Subtle>
            ) : (
              notifications.map((notification) => {
                return (
                  <Notification
                    key={notification.id}
                    notification={notification}
                    isSeen={unseenNotificationIds.every(
                      (n) => n.id !== notification.id
                    )}
                  />
                );
              })
            )}
            {hasNextPage ? (
              isFetchingNextPage ? (
                <T.Subtle>Loading...</T.Subtle>
              ) : (
                <NextPageLoader onMount={fetchNextPage} />
              )
            ) : (
              <T.Subtle className="py-1 opacity-50">
                No more notifications
              </T.Subtle>
            )}
          </div>
        </PopoverContent>
      ) : (
        <PopoverContent className="mr-12 p-0 rounded-xl overflow-hidden">
          <div className="px-6 py-4 shadow-lg">
            <T.P>No notifications yet.</T.P>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};
