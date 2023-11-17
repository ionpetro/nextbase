import { Search } from '@/components/Search';
import { appAdminUserFiltersSchema } from './schema';
import { Suspense } from 'react';
import { UserList } from './UsersList';
import Pagination from '@/components/Pagination/Pagination';
import { getUsersTotalPages } from '@/data/admin/user';
import { AppAdminCreateUserDialog } from './AppAdminCreateUserDialog';
import { unstable_noStore } from 'next/cache';

export const runtime = 'edge';
export const metadata = {
  title: 'User List | Admin Panel | Nextbase',
};

export default async function AdminUsersListPage({
  searchParams,
}: {
  searchParams: unknown;
}) {
  unstable_noStore();
  const validatedSearchParams = appAdminUserFiltersSchema.parse(searchParams);
  const suspenseKey = JSON.stringify(validatedSearchParams);
  const totalPages = await getUsersTotalPages(validatedSearchParams);
  return (
    <div className="space-y-4 max-w-[1296px]">
      <div className="flex space-x-3  justify-between">
        <Search placeholder="Search Users... " />
        <AppAdminCreateUserDialog />
      </div>
      <Suspense key={suspenseKey} fallback={<div>Loading...</div>}>
        <UserList filters={validatedSearchParams} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
