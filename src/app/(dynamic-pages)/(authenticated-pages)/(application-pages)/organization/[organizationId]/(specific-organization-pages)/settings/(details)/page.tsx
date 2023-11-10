import { Suspense } from 'react';
import { EditOrganizationForm } from './EditOrganizationForm';
import { getOrganizationTitle } from '@/data/user/organizations';

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
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EditOrganization organizationId={organizationId} />
    </Suspense>
  );
}
