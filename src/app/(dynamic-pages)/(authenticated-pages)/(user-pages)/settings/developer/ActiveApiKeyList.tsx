import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { T } from '@/components/ui/Typography';
import { getActiveDeveloperKeys } from '@/data/user/unkey';
import moment from 'moment';
import { ConfirmRevokeTokenDialog } from './ConfirmRevokeTokenDialog';

export async function ActiveApiKeyList() {
  const activeDeveloperKeys = await getActiveDeveloperKeys();
  const heading = (
    <PageHeading title="Active API Keys" titleClassName="text-lg" />
  );

  if (activeDeveloperKeys.length) {
    return (
      <div className="space-y-8 max-w-sm">
        {heading}
        <div className="space-y-2">
          {activeDeveloperKeys.map((key) => {
            return (
              <div className="space-y-1">
                <div className="flex justify-between">
                  <T.P className="mt-0">{key.masked_key}</T.P>
                  <ConfirmRevokeTokenDialog keyId={key.key_id} />
                </div>
                <T.Subtle>
                  {key.expires_at
                    ? moment(key.expires_at).format('LL')
                    : 'No expiry'}
                </T.Subtle>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className=" max-w-sm">
        {heading}
        <T.Subtle>No active API keys.</T.Subtle>
      </div>
    );
  }
}
