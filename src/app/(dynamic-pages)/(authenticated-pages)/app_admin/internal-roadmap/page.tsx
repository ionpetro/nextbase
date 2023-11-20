import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { AppAdminRoadmap } from './AppAdminRoadmap';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className=" space-y-10 max-w-[1296px]">
      <PageHeading
        title="Roadmap"
        titleClassName="text-2xl font-semibold tracking-normal"
        subTitle="This is where you see where the application is going"
      />

      <Suspense fallback={<div>Loading...</div>}>
        <AppAdminRoadmap />
      </Suspense>
    </div>
  );
}
