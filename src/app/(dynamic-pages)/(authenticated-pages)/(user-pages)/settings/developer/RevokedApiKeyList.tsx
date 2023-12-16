import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { T } from '@/components/ui/Typography';
import { getRevokedApiKeyList } from '@/data/user/unkey';

export async function RevokedApiKeyList() {
  const revokedApiKeyList = await getRevokedApiKeyList();

  if (!revokedApiKeyList.length) {
    return <p>No revoked keys</p>;
  }

  const heading = (
    <PageHeading title="Revoked API Keys" titleClassName="text-lg" />
  );

  return (
    <div className="space-y-8 max-w-sm">
      {heading}
      <div className="space-y-2">
        {revokedApiKeyList.map((key) => {
          return (
            <div className="space-y-1">
              <div className="flex justify-between">
                <T.P className="mt-0">{key.masked_key}</T.P>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
