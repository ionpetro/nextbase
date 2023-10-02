import { ReactNode } from 'react';
import { z } from 'zod';
import { createProjectAction, createTeamAction } from './actions';
import { SpecificOrganizationClientLayout } from './SpecificOrganizationClientLayout';
import setCurrentOrganizationIdAction from '@/app/(dynamic-pages)/(authenticated-pages)/actions';
import { cookies } from 'next/headers';

const paramsSchema = z.object({
  organizationId: z.string(),
});

type ParamsType = z.infer<typeof paramsSchema>;

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: ParamsType;
}) {
  const { organizationId } = paramsSchema.parse(params);
  const currentOrganizationId = cookies().get('current_organization_id')?.value;
  return (
    <SpecificOrganizationClientLayout
      createTeamAction={createTeamAction}
      createProjectAction={createProjectAction}
      currentOrganizationId={currentOrganizationId}
      setCurrentOrganizationId={setCurrentOrganizationIdAction}
    >
      {children}
    </SpecificOrganizationClientLayout>
  );
}
