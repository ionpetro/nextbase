import { CURRENT_ORGANIZATION_ID_COOKIE_KEY } from '@/constants';
import { RedirectType } from 'next/dist/client/components/redirect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function getCurrentOrganizationId(): string | undefined {
  const cookieStore = cookies();
  const currentOrganizationId = cookieStore.get(
    CURRENT_ORGANIZATION_ID_COOKIE_KEY,
  )?.value;

  return currentOrganizationId;
}

export default async function DashboardPage() {
  const currentOrganizationId = getCurrentOrganizationId();

  if (currentOrganizationId) {
    return redirect(
      `/organization/${currentOrganizationId}`,
      RedirectType.push,
    );
  } else {
    return redirect(`/all-organizations`, RedirectType.push);
  }
}
