'use client';
import { AppAdminCreateUserDialog } from '@/components/presentational/tailwind/AppAdminCreateUserDialog';
import { ConfirmSendLoginLinkDialog } from '@/components/presentational/tailwind/ConfirmSendLoginLinkDialog';
import { DBFunction, View } from '@/types';
import {
  useCreateUserMutation,
  useFetchUserImpersonationUrl,
  useGetUsersInfiniteQuery,
  useSendLoginLinkMutation,
} from '@/utils/react-query-hooks-app-admin';
import TableCell from '@/components/ui/Table/TableCell';
import TableHeader from '@/components/ui/Table/TableHeader';
import moment from 'moment';
import { useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { useDebouncedValue } from 'rooks';

function RenderUser({
  user,
}: {
  user: DBFunction<'app_admin_get_all_users'>[number];
}) {
  const { mutate: getImpersonationLink, isLoading: isImpersonating } =
    useFetchUserImpersonationUrl();
  const { mutate: sendLoginLink, isLoading: isSendingLoginLink } =
    useSendLoginLinkMutation();
  return (
    <tr key={user.id} >
      <td className="p-0">
        <TableCell classname="px-6 py-4 truncate"> {user.full_name ?? '-'} </TableCell>
      </td>
      <td className="p-0">
        <TableCell classname="px-6 py-4 truncate">{user.email}</TableCell>
      </td>
      <td className="p-0">
        <TableCell classname="px-6 py-4 truncate"> {user.is_app_admin ? '✅' : '❌'}</TableCell>
      </td>
      <td className="p-0">
        <TableCell classname="px-6 py-4 truncate"> {moment(user.created_at).format('DD MMM YYYY')}</TableCell>
      </td>
      <td className="p-0">
        <TableCell classname="px-6 py-4 truncate"> {user.is_confirmed ? '✅' : '❌'}</TableCell>
      </td>
      <td className="p-0">
        <TableCell classname="px-6 py-4 truncate">
          <span className="flex items-center space-x-4">
            <a
              title="Contact User by email"
              className=" text-base flex items-center space-x-1 "
              href={`mailto:${user.email}`}
              target="_blank"
            >
              <FiMail /> <span>Contact User by email</span>
            </a>
          </span>
        </TableCell>
      </td>

      <td className="p-0">
        <TableCell classname="px-6 py-2 truncate">
          <ConfirmSendLoginLinkDialog
            onConfirm={() => {
              if (!user.email) {
                throw new Error('user.email is undefined');
              }
              sendLoginLink({
                email: user.email,
              });
            }}
          />
        </TableCell>
      </td>
      <td className="p-0">
        <TableCell classname="px-6 py-4 group truncate">
          <button
            title="Impersonate User"
            className="inline-flex text-base font-[600] items-center space-x-2 rounded group-hover:underline text-blue-500
            hover:text-blue-700"
            onClick={() => {
              if (!user.id) {
                throw new Error('user.id is undefined');
              }
              getImpersonationLink(user.id);
            }}
            disabled={isImpersonating}
          >
            <FiLogIn /> <span>Login as User </span>
          </button>
        </TableCell>
      </td>
    </tr>
  );
}

export function RenderUsers({
  userData,
}: {
  userData: [number, DBFunction<'app_admin_get_all_users'>];
}) {
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
  } = useGetUsersInfiniteQuery(userData, search);

  const { mutate: createUser, isLoading: isCreatingUser } =
    useCreateUserMutation({});

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
          onSubmit={(email) => {
            createUser({ email });
          }}
          isLoading={isCreatingUser}
        />
      </div>
      <div className="space-y-2" style={{ overflowX: 'auto' }}>
        <table className="min-w-full shadow rounded-lg overflow-hidden" >
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="p-0"
              >
                <TableHeader>Full Name</TableHeader>
              </th>
              <th
                scope="col"
                className="p-0"
              >
                <TableHeader>Email</TableHeader>
              </th>
              <th
                scope="col"
                className="p-0"
              >
                <TableHeader>Admin</TableHeader>
              </th>
              <th
                scope="col"
                className="p-0"
              >
                <TableHeader>Created At</TableHeader>
              </th>
              <th
                scope="col"
                className="p-0"
              >
                <TableHeader>Confirmed</TableHeader>
              </th>
              <th
                scope="col"
                className="p-0"
              >
                <TableHeader>Contact User</TableHeader>
              </th>

              <th
                scope="col"
                className="p-0"
              >
                <TableHeader>Send Login Link</TableHeader>
              </th>

              <th
                scope="col"
                className="p-0"
              >
                <TableHeader>Debug</TableHeader>
              </th>
            </tr>
          </thead>
          <tbody >
            {users.map((user) => (
              <RenderUser key={user.id} user={user} />
            ))}
          </tbody>
        </table>
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
