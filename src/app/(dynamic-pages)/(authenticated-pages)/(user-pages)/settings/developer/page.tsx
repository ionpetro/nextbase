import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { T } from '@/components/ui/Typography';
import { getActiveDeveloperKeyCount } from '@/data/user/unkey';
import { Suspense } from 'react';
import { ActiveApiKeyList } from './ActiveApiKeyList';
import { GenerateApiKey } from './GenerateApiKey';
import { RevokedApiKeyList } from './RevokedApiKeyList';

export default async function DeveloperSettings() {
  const activeDeveloperKeyCount = await getActiveDeveloperKeyCount();
  return (
    <div className="space-y-8 max-w-sm">
      <PageHeading
        title="Developer Settings"
        titleClassName="text-xl"
        subTitleClassName="text-base -mt-1"
        subTitle="Manage your developer settings here."
      />

      {activeDeveloperKeyCount < 3 ? (
        <GenerateApiKey key={activeDeveloperKeyCount} />
      ) : (
        <T.Subtle>You have reached the maximum number of API keys.</T.Subtle>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <ActiveApiKeyList />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <RevokedApiKeyList />
      </Suspense>
    </div>
  );
}
