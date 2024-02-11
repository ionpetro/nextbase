import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import { AppAdminChangelogList } from './AppAdminChangelogList';

export default function Page() {
  return (
    <div className="space-y-10">
      <div className="space-y-6  max-w-5xl ">
        <PageHeading
          title="Changelog"
          subTitle="This is the changelog for the application. It will be updated as new features are added and bugs are fixed."
          actions={
            <Link href="/app_admin/changelog/create">
              <Button variant="default" className="mt-2">
                Create Changelog
              </Button>
            </Link>
          }
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <AppAdminChangelogList />
      </Suspense>
    </div>
  );
}
