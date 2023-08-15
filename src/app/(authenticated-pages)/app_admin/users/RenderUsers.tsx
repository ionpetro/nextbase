'use client';
import { AppAdminCreateUserDialog } from '@/components/presentational/tailwind/AppAdminCreateUserDialog';
import { ConfirmSendLoginLinkDialog } from '@/components/presentational/tailwind/ConfirmSendLoginLinkDialog';
import { DBFunction, UnwrapPromise, View } from '@/types';
import moment from 'moment';
import { useRef, useState } from 'react';
import LoginIcon from 'lucide-react/dist/esm/icons/log-in';
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
      }
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
    }
  );

  return (
    <TableRow key={user.id}>
      <TableCell> {user.full_name ?? '-'} </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell> {user.is_app_admin ? '✅' : '❌'}</TableCell>
      <TableCell> {moment(user.created_at).format('DD MMM YYYY')}</TableCell>
      <TableCell> {user.is_confirmed ? '✅' : '❌'}</TableCell>
      <TableCell>
        <span className="flex items-center space-x-4">
          <a
            title="Contact User by email"
            className=" text-base flex items-center space-x-1 "
            href={`mailto:${user.email}`}
            target="_blank"
          >
            <MailIcon /> <span>Contact User by email</span>
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
        <button
          title="Impersonate User"
          className="inline-flex text-base font-[600] items-center space-x-2 rounded group-hover:underline text-blue-500
            hover:text-blue-700"
          onClick={() => {
            if (!user.id) {
              throw new Error('user.id is undefined');
            }
            getImpersonationLink();
          }}
          disabled={isImpersonating}
        >
          <LoginIcon /> <span>Login as User </span>
        </button>
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
    }
  );
  const router = useRouter();
  const createUserToastRef = useRef<string | null>(null);
  const { mutate: createUser, isLoading: isCreatingUser } = useMutation(
    async (email: string) => {
      return createUserAction(email);
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Creating user...');
        createUserToastRef.current = toastId;
      },
      onSuccess: () => {
        toast.success('User created', {
          id: createUserToastRef.current ?? undefined,
        });
        createUserToastRef.current = null;
        queryClient.invalidateQueries(['getAdminUsersPaginated', search]);
        router.refresh();
      },
      onError: (error) => {
        let message = `Failed to create user`;
        if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: createUserToastRef.current ?? undefined,
        });
        createUserToastRef.current = null;
      },
    }
  );

  if (isLoadingNextPage || !data) {
    return <div>Loading...</div>;
  }
  const { pages } = data;

  const users2DArray = pages.map((page) => page[1]);
  const users = users2DArray.flat();

  return (
    <div className="space-y-4">
      <div className="space-x-2 flex items-end gap-2 ">
        <div className="max-w-xs flex-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="block px-3 py-2 appearance-none  w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search users"
            />
          </div>
        </div>
        <AppAdminCreateUserDialog
          onSubmit={createUser}
          isLoading={isCreatingUser}
        />
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
        {hasNextPage ? (
          <button
            className="underline text-blue-500 text-sm"
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
