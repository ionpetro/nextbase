import { getOrganizationById } from '@/utils/supabase-queries';
import createClient from '@/utils/supabase-server';
import { ReactNode } from 'react';
import { OrganizationLayoutContextProvider } from './OrganizationLayoutContextProvider';
import { z } from 'zod';
import { AppSupabaseClient } from '@/types';
import { getUserOrganizationRole } from '@/utils/supabase/organizations';
import { notFound } from 'next/navigation';

const paramsSchema = z.object({
  organizationId: z.string(),
});



async function fetchData(supabase: AppSupabaseClient, organizationId: string) {
  const { data: sessionResponse, error: userError } =
    await supabase.auth.getSession();
  if (!sessionResponse || !sessionResponse.session?.user) {
    throw new Error('User not found');
  }
  if (userError) {
    throw userError;
  }

  const [
    organizationByIdData,
    organizationRole,
  ] = await Promise.all([
    getOrganizationById(supabase, organizationId),
    getUserOrganizationRole(
      supabase,
      sessionResponse.session.user.id,
      organizationId
    ),
  ]);

  return {
    organizationByIdData,
    organizationRole
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: any;
}) {
  try {
    const { organizationId } = paramsSchema.parse(params);
    const supabase = createClient();
    const {
      organizationByIdData,
      organizationRole
    } = await fetchData(
      supabase,
      organizationId
    );
    return (
      <OrganizationLayoutContextProvider
        organizationId={organizationId}
        organizationByIdData={organizationByIdData}
        organizationRole={organizationRole}
      >
        {children}
      </OrganizationLayoutContextProvider>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }

}
