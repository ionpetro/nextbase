'use client';
import {
  OrganizationByIdData,
} from '@/utils/react-query-hooks';
import { match } from 'path-to-regexp';
import { ReactNode } from 'react';
import { OrganizationContextProvider } from '@/contexts/OrganizationContext';
import { Enum } from '@/types';

export function OrganizationLayoutContextProvider({
  children,
  organizationByIdData,
  organizationRole,
  organizationId
}: {
  children: ReactNode;
  organizationId: string;
  organizationByIdData: OrganizationByIdData;
  organizationRole: Enum<'organization_member_role'>
}) {


  return (
    <OrganizationContextProvider
      organizationRole={organizationRole}
      organizationId={organizationId}
      organizationByIdData={organizationByIdData}
    >
      <div>{children}</div>
    </OrganizationContextProvider>

  );
}
