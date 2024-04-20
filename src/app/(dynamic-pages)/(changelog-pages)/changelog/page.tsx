import { PageHeading } from '@/components/PageHeading';
import { Button } from '@/components/ui/button';
import { userRoles } from '@/config/userTypes';
import { getChangelogList } from '@/data/admin/internal-changelog';
import { serverGetUserType } from '@/utils/server/serverGetUserType';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { AppAdminChangelog } from './AppAdminChangelog';

export default async function Page() {
  const userRoleType = await serverGetUserType();
  const changelogs = await getChangelogList();
  return (
    <div className="space-y-10 max-w-[1296px] py-8">
      <div className="flex w-full justify-between items-center">
        <PageHeading
          title="Changelog List"
          titleClassName="text-2xl font-semibold tracking-normal"
          subTitle="This is the changelog for the application. It will be updated as new
              features are added and bugs are fixed."
        />
        {userRoleType === userRoles.ADMIN && (
          <Button asChild>
            <Link href="/changelog/create">
              <Plus className="mr-2 size-4" />
              Create Changelog
            </Link>
          </Button>
        )}
      </div>
      {userRoleType === userRoles.ADMIN ? (
        <Suspense fallback={<div>Loading...</div>}>
          {changelogs.map((changelog, index) => (
            <AppAdminChangelog
              key={changelog.id}
              changelog={changelog}
              isLastAdded={index === 0}
            />
          ))}
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-col w-full justify-between items-center">
            {changelogs.map((changelog, index) => (
              <AppAdminChangelog
                key={changelog.id}
                changelog={changelog}
                isLastAdded={index === 0}
              />
            ))}
          </div>
        </Suspense>
      )}
    </div>
  );
}
