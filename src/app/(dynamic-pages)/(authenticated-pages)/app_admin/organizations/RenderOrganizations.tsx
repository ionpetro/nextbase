'use client';

import { DBFunction } from '@/types';
import moment from 'moment';
import { useState } from 'react';
import MailIcon from 'lucide-react/dist/esm/icons/mail';
import { useDebouncedValue } from 'rooks';
import {
  ADMIN_ORGANIZATION_LIST_VIEW_PAGE_SIZE,
  ADMIN_USER_LIST_VIEW_PAGE_SIZE,
} from '@/constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';
import { Anchor } from '@/components/Anchor';

function RenderOrganization({
  organization,
}: {
  organization: DBFunction<'app_admin_get_all_organizations'>[number];
}) {
  return (
    <TableRow key={organization.id}>
      <TableCell>{organization.title ?? '-'}</TableCell>
      <TableCell>
        {moment(organization.created_at).format('DD MMM YYYY')}
      </TableCell>
      <TableCell>{organization.team_members_count ?? '-'}</TableCell>
      <TableCell>{organization.owner_full_name}</TableCell>

      <TableCell>
        <span className="flex items-center space-x-2">
          <Anchor
            title="Send email"
            href={`mailto:${organization.owner_email}`}
            target="_blank"
          >
            <MailIcon className="w-5 h-5" />
          </Anchor>
        </span>
      </TableCell>
    </TableRow>
  );
}

export function RenderOrganizations({
  organizationsData,
  getOrganizationsPaginatedAction,
}: {
  organizationsData: [number, DBFunction<'app_admin_get_all_organizations'>];
  getOrganizationsPaginatedAction: ({
    pageNumber,
    search,
  }: {
    pageNumber: number;
    search: string | undefined;
  }) => Promise<[number, DBFunction<'app_admin_get_all_organizations'>]>;
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
  } = useInfiniteQuery(
    ['getAdminOrganizationsPaginated', search],
    async ({ pageParam }) => {
      return getOrganizationsPaginatedAction({
        pageNumber: pageParam ?? 0,
        search,
      });
    },
    {
      getNextPageParam: (lastPage, _pages) => {
        const pageNumber = lastPage[0];
        const rows = lastPage[1];

        if (rows.length < ADMIN_ORGANIZATION_LIST_VIEW_PAGE_SIZE)
          return undefined;
        return pageNumber + 1;
      },
      initialData: {
        pageParams: [0],
        pages: [organizationsData],
      },
    }
  );

  if (isLoadingNextPage || !data) {
    return <div>Loading...</div>;
  }
  const { pages } = data;
  const users2DArray = pages.map((page) => page[1]);
  const organizations = users2DArray.flat();
  return (
    <div className="space-y-4 mb-6">
      <div className="max-w-sm">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Title
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="title"
            id="title"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="block px-3 py-2 appearance-none w-full rounded-md bg-gray-200/50 dark:bg-gray-700/50 h-10 shadow-sm text-gray-600"
            placeholder="Search Organizations"
          />
        </div>
      </div>
      <div className="rounded-lg overflow-hidden border">
        <ShadcnTable>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Team Member Count</TableHead>

              <TableHead>Owner Name</TableHead>

              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((organization) => (
              <RenderOrganization
                key={organization.id}
                organization={organization}
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
