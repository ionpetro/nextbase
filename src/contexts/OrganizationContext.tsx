'use client';
import { Enum } from '@/types';
import { userGetUserOrganizationRole } from '@/utils/react-queries/organizations';
import { createContext, useContext } from 'react';

type OrganizationContextType = {
  organizationId: string;
  organizationRole: Enum<'organization_member_role'>;
};
export const OrganizationContext = createContext<OrganizationContextType>({
  organizationId: '',
  organizationRole: 'readonly',
});

export function useOrganizationContext() {
  return useContext(OrganizationContext);
}

export function OrganizationContextProvider({
  children,
  organizationId,
  organizationRole: initialOrganizationRole,
}: {
  children: React.ReactNode;
  organizationId: string;
  organizationRole: Enum<'organization_member_role'> | null;
}) {
  console.log('OrganizationContextProvider rendering');
  const { data: organizationRole } = userGetUserOrganizationRole(
    organizationId,
    {
      initialData: initialOrganizationRole,
    }
  );
  if (!organizationRole) {
    return <p>Not authorized</p>;
  }
  return (
    <OrganizationContext.Provider value={{ organizationId, organizationRole }}>
      {children}
    </OrganizationContext.Provider>
  );
}
