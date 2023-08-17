import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { AppSupabaseClient } from '@/types';
import { getOrganizationById } from '@/utils/supabase-queries';
import { EditOrganizationForm } from './EditOrganizationForm';

async function fetchData(
  supabaseClient: AppSupabaseClient,
  organizationId: string
) {
  return await getOrganizationById(supabaseClient, organizationId);
}

export default async function EditOrganizationPage({
  params,
}: {
  params: {
    organizationId: string;
  };
}) {
  const { organizationId } = params;
  const organization = await fetchData(
    createSupabaseUserServerComponentClient(),
    organizationId
  );
  return <EditOrganizationForm initialTitle={organization.title} />;
}
