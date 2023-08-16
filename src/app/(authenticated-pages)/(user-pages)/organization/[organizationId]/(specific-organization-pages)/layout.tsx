import { ReactNode } from 'react';
import { createProjectAction, createTeamAction } from './actions';
import { SpecificOrganizationClientLayout } from './SpecificOrganizationClientLayout';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SpecificOrganizationClientLayout
      createTeamAction={createTeamAction}
      createProjectAction={createProjectAction}
    >
      {children}
    </SpecificOrganizationClientLayout>
  );
}
