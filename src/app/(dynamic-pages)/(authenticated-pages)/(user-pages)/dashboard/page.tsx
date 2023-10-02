import { RedirectType } from 'next/dist/client/components/redirect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const cookieStore = cookies();
  const currentOrganizationId = cookieStore.get('current_organization_id')
    ?.value;

  if (currentOrganizationId) {
    return redirect(
      `/organization/${currentOrganizationId}`,
      RedirectType.push,
    );
  } else {
    return redirect(`/all-organizations`, RedirectType.push);
  }
}
