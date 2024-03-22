import { T } from '@/components/ui/Typography';
import { getOrganizationTitle } from '@/data/user/organizations';
import { Suspense } from 'react';
import { DeleteOrganization } from './DeleteOrganization';
import { EditOrganizationForm } from './EditOrganizationForm';
import { SetDefaultOrganizationPreference } from './SetDefaultOrganizationPreference';

async function EditOrganization({
  organizationId,
}: {
  organizationId: string;
}) {
  const organizationTitle = await getOrganizationTitle(organizationId);
  return (
    <EditOrganizationForm
      organizationId={organizationId}
      initialTitle={organizationTitle}
    />
  );
}

export default async function EditOrganizationPage({
  params,
}: {
  params: {
    organizationId: string;
  };
}) {
  const { organizationId } = params;

  const organizationTitle = await getOrganizationTitle(organizationId);
  return (
    <div className="space-y-4">
      <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
        <EditOrganization organizationId={organizationId} />
      </Suspense>
      <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
        <SetDefaultOrganizationPreference organizationId={organizationId} />
      </Suspense>
      <DeleteOrganization
        organizationId={organizationId}
        organizationTitle={organizationTitle}
      />
    </div>
  );
}
