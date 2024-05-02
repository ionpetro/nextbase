import { Skeleton } from '@/components/ui/skeleton';
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
      <Suspense fallback={
        <div className="space-y-4 p-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      }>
        <RedirectToDefaultOrg />
      </Suspense>
    </>
  );
}
