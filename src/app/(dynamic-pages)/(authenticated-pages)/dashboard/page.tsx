import { T } from '@/components/ui/Typography';
import {
  fetchSlimOrganizations,
  getDefaultOrganization,
} from '@/data/user/organizations';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

async function getOrganizationToRedirectTo(): Promise<string> {
  const [slimOrganizations, defaultOrganizationId] = await Promise.all([
    fetchSlimOrganizations(),
    getDefaultOrganization(),
  ]);
  const firstOrganization = slimOrganizations[0];

  if (defaultOrganizationId) {
    return defaultOrganizationId;
  }

  // this condition is unreachable as the parent ../layout component ensures at least
  // one organization exists
  if (!firstOrganization) {
    return notFound();
  }

  return firstOrganization.id;
}

async function RedirectToDefaultOrg() {
  const firstOrganizationId = await getOrganizationToRedirectTo();
  return redirect(`/organization/${firstOrganizationId}`);
}

export default async function DashboardPage() {
  return (
    <>
      <Suspense fallback={<T.Subtle className="m-0 px-4">Fetching details...</T.Subtle>}>
        <RedirectToDefaultOrg />
      </Suspense>
    </>
  );
}
