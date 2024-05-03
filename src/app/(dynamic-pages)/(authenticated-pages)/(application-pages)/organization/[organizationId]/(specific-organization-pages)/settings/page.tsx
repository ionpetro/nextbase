import { Skeleton } from '@/components/ui/skeleton';
import {
  getLoggedInUserOrganizationRole,
  getOrganizationTitle,
} from '@/data/user/organizations';
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

async function DeleteOrganizationIfAdmin({
  organizationId,
}: {
  organizationId: string;
}) {
  const [organizationTitle, organizationRole] = await Promise.all([
    getOrganizationTitle(organizationId),
    getLoggedInUserOrganizationRole(organizationId),
  ]);
  const isOrganizationAdmin =
    organizationRole === 'admin' || organizationRole === 'owner';
  if (!isOrganizationAdmin) {
    return null;
  }
  return (
    <DeleteOrganization
      organizationId={organizationId}
      organizationTitle={organizationTitle}
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
    <div className="space-y-4">
      <Suspense fallback={<Skeleton className="w-2/3 h-8" />}>
        <EditOrganization organizationId={organizationId} />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-2/3 h-8" />}>
        <SetDefaultOrganizationPreference organizationId={organizationId} />
      </Suspense>
      <Suspense fallback={null}>
        <DeleteOrganizationIfAdmin organizationId={organizationId} />
      </Suspense>
    </div>
  );
}
