import { ReactNode } from 'react';
import { OrganizationClientLayout } from './OrganizationClientLayout';
import { notFound } from 'next/navigation';
import { AppSupabaseClient } from '@/types';
import { z } from 'zod';
import createClient from '@/utils/supabase-server';
import { getUserOrganizationRole } from '@/utils/supabase/organizations';

const paramsSchema = z.object({
  organizationId: z.string(),
});

type ParamsType = z.infer<typeof paramsSchema>;

async function fetchData(supabase: AppSupabaseClient, organizationId: string) {
  const { data: sessionResponse, error: userError } =
    await supabase.auth.getSession();
  if (!sessionResponse || !sessionResponse.session?.user) {
    throw new Error('User not found');
  }
  if (userError) {
    throw userError;
  }

  const organizationRole = await getUserOrganizationRole(
    supabase,
    sessionResponse.session.user.id,
    organizationId
  );

  return organizationRole;
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: ParamsType;
}) {
  try {
    const { organizationId } = paramsSchema.parse(params);
    const supabase = createClient();
    const organizationRole = await fetchData(supabase, organizationId);
    return (
      <OrganizationClientLayout
        organizationRole={organizationRole}
        organizationId={organizationId}
      >
        {children}
      </OrganizationClientLayout>
    );
  } catch (error) {
    return notFound();
  }
}
