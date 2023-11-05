'use client';
import { AppAdminCreateUserDialog } from '@/components/presentational/tailwind/AppAdminCreateUserDialog';
import { ConfirmSendLoginLinkDialog } from '@/components/presentational/tailwind/ConfirmSendLoginLinkDialog';
import { DBFunction, UnwrapPromise, View } from '@/types';
import moment from 'moment';
import { useRef, useState } from 'react';
import LoginIcon from 'lucide-react/dist/esm/icons/log-in';
import CheckIcon from 'lucide-react/dist/esm/icons/check';
import CloseIcon from 'lucide-react/dist/esm/icons/x';
import MailIcon from 'lucide-react/dist/esm/icons/mail';
import { useDebouncedValue } from 'rooks';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { ADMIN_USER_LIST_VIEW_PAGE_SIZE } from '@/constants';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';
import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SearchUsersByEmail } from './SearchUsersByEmail';
import { CreateUser } from './CreateUser';

function RenderUser({
  user,
  sendLoginLinkAction,
  getUserImpersonationUrlAction,
}: {
  user: DBFunction<'app_admin_get_all_users'>[number];
  sendLoginLinkAction: (email: string) => Promise<void>;
  getUserImpersonationUrlAction: (userId: string) => Promise<URL>;
}) {
  const sendLoginLinkToastRef = useRef<string | null>(null);
  const userImpersonationToastRef = useRef<string | null>(null);
  const { mutate: getImpersonationLink, isLoading: isImpersonating } =
    useMutation(
      async () => {
        return getUserImpersonationUrlAction(user.id);
      },
      {
        // don't cache
        cacheTime: 0,
        onMutate: () => {
          const toastId = toast.loading('Fetching login url...');
          userImpersonationToastRef.current = toastId;
        },
        onSuccess: (url) => {
          // You can optionally use a toast
          window.navigator.clipboard.writeText(url.toString()).then(() => {
            toast.success('Copied login url to clipboard', {
              id: userImpersonationToastRef.current ?? undefined,
            });
            userImpersonationToastRef.current = null;
          });
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'Failed to fetch login url';
          toast.error('Failed to fetch login url ' + errorMessage, {
            id: userImpersonationToastRef.current ?? undefined,
          });
          userImpersonationToastRef.current = null;
        },
      },
    );

  const { mutate: sendLoginLink, isLoading: isSendingLoginLink } = useMutation(
    async (email: string) => {
      return await sendLoginLinkAction(email);
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Sending login link...');
        sendLoginLinkToastRef.current = toastId;
      },
      onSuccess: () => {
        toast.success('Login link sent', {
          id: sendLoginLinkToastRef.current ?? undefined,
        });
        sendLoginLinkToastRef.current = null;
      },
      onError: (error) => {
        let message = `Failed to invite user`;
        if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: sendLoginLinkToastRef.current ?? undefined,
        });
        sendLoginLinkToastRef.current = null;
      },
    },
  );

  return (
    <TableRow key={user.id}>
      <TableCell> {user.full_name ?? '-'} </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        {' '}
        {user.is_app_admin ? (
          <CheckIcon className="text-green-500 dark:text-green-400" />
        ) : (
          <CloseIcon className="text-red-500 dark:text-red-400" />
        )}
      </TableCell>
      <TableCell> {moment(user.created_at).format('DD MMM YYYY')}</TableCell>
      <TableCell>
        {' '}
        {user.is_confirmed ? (
          <CheckIcon className="text-green-500 dark:text-green-400" />
        ) : (
          <CloseIcon className="text-red-500 dark:text-red-400" />
        )}
      </TableCell>
      <TableCell>
        <span className="flex items-center space-x-4">
          <a
            title="Contact User by email"
            className="flex items-center "
            href={`mailto:${user.email}`}
            target="_blank"
          >
            <MailIcon className="h-5 w-5 mr-2 " />{' '}
            <T.Small className=" font-medium underline underline-offset-4 ">
              Contact User by email
            </T.Small>
          </a>
        </span>
      </TableCell>

      <TableCell>
        <ConfirmSendLoginLinkDialog
          onConfirm={() => {
            if (!user.email) {
              throw new Error('user.email is undefined');
            }
            sendLoginLink(user.email);
          }}
        />
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="sm"
          title="Impersonate User"
          className=" font-medium text-sm underline underline-offset-4 shadow-none "
          onClick={() => {
            if (!user.id) {
              throw new Error('user.id is undefined');
            }
            getImpersonationLink();
          }}
          disabled={isImpersonating}
        >
          <LoginIcon className="h-5 w-5 mr-2" /> Login as User
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function RenderUsers({
  userData,
  sendLoginLinkAction,
  getUsersPaginatedAction,
  createUserAction,
  getUserImpersonationUrlAction,
}: {
  createUserAction: (email: string) => Promise<User>;
  userData: [number, DBFunction<'app_admin_get_all_users'>];
  sendLoginLinkAction: (email: string) => Promise<void>;
  getUsersPaginatedAction: (params: {
    pageNumber: number;
    search: string | undefined;
  }) => Promise<[number, DBFunction<'app_admin_get_all_users'>]>;
  getUserImpersonationUrlAction: (userId: string) => Promise<URL>;
}) {
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState<string>('');
  const [debouncedSearchText] = useDebouncedValue(searchText, 500);
  const search =
    debouncedSearchText.length > 0 ? debouncedSearchText : undefined;
  // TODO: add pagination support here
  const {
    data,
    isFetchingNextPage,
    isLoading: isLoadingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['getAdminUsersPaginated', search],
    async ({ pageParam }) => {
      return getUsersPaginatedAction({
        pageNumber: pageParam ?? 0,
        search,
      });
    },
    {
      getNextPageParam: (lastPage, _pages) => {
        const pageNumber = lastPage[0];
        const rows = lastPage[1];

        if (rows.length < ADMIN_USER_LIST_VIEW_PAGE_SIZE) return undefined;
        return pageNumber + 1;
      },
      initialData: {
        pageParams: [0],
        pages: [userData],
      },
    },
  );

  if (isLoadingNextPage || !data) {
    return <div>Loading...</div>;
  }
  const { pages } = data;

  const users2DArray = pages.map((page) => page[1]);
  const users = users2DArray.flat();

  return (
    <div className="space-y-4">
      <div className="space-x-2 flex items-end gap-2 mb-4 ">
        <SearchUsersByEmail />
        <CreateUser />
      </div>
      <div
        className="space-y-2 rounded-lg border"
        style={{ overflowX: 'auto' }}
      >
        <ShadcnTable>
          <TableHeader>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Confirmed</TableCell>
              <TableCell>Contact User</TableCell>
              <TableCell>Send Login Link</TableCell>
              <TableCell>Debug</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <RenderUser
                getUserImpersonationUrlAction={getUserImpersonationUrlAction}
                sendLoginLinkAction={sendLoginLinkAction}
                key={user.id}
                user={user}
              />
            ))}
          </TableBody>
        </ShadcnTable>
      </div>
      <div className="flex w-full justify-center">
        {hasNextPage ? (
          <button
            className="underline underline-offset-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 hover:dark:text-gray-300 font-bold text-sm"
            onClick={() => {
              fetchNextPage();
            }}
            disabled={isLoadingNextPage || isFetchingNextPage}
          >
            Load More
          </button>
        ) : null}
      </div>
    </div>
  );
}
