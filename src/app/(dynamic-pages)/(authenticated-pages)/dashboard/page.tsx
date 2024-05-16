import {
  fetchSlimOrganizations,
  getDefaultOrganization,
  getOrganizationSlugByOrganizationId,
} from '@/data/user/organizations';
import { notFound, redirect } from 'next/navigation';

async function getOrganizationToRedirectTo(): Promise<string> {
  const [slimOrganizations, defaultOrganizationId] = await Promise.all([
    fetchSlimOrganizations(),
    getDefaultOrganization(),
  ]);

  const firstOrganization = slimOrganizations[0];

  if (defaultOrganizationId) {
    return await getOrganizationSlugByOrganizationId(defaultOrganizationId);
  }

  // this condition is unreachable as the parent ../layout component ensures at least
  // one organization exists
  if (!firstOrganization) {
    return notFound();
  }


  return firstOrganization.slug;
}

async function RedirectToDefaultOrg() {
  const firstOrganizationId = await getOrganizationToRedirectTo();
  return redirect(`/${firstOrganizationId}`);
}

export default async function DashboardPage() {
  return (
    <RedirectToDefaultOrg />

  );
}
