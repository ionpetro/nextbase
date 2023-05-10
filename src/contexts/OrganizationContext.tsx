'use client';
import { Enum, Table } from '@/types';
import { useGetUserOrganizationRole } from '@/utils/react-queries/organizations';
import { useGetOrganizationById } from '@/utils/react-query-hooks';
import { createContext, useContext } from 'react';

type OrganizationContextType = {
  organizationId: string;
  organizationRole: Enum<'organization_member_role'>;
  organizationByIdData: Table<'organizations'>;
};
export const OrganizationContext = createContext<OrganizationContextType>({
  organizationId: '',
  organizationRole: 'readonly',
  organizationByIdData: {} as Table<'organizations'>,
});

export function useOrganizationContext() {
  return useContext(OrganizationContext);
}

export function OrganizationContextProvider({
  children,
  organizationId,
  organizationRole: initialOrganizationRole,
  organizationByIdData: initialOrganizationByIdData,
}: {
  children: React.ReactNode;
  organizationId: string;
  organizationRole: Enum<'organization_member_role'>;
  organizationByIdData: Table<'organizations'>;
}) {

  const { data: _organizationData, isLoading: isLoadingOrganization, error: organizationError } = useGetOrganizationById(
    organizationId,
    initialOrganizationByIdData
  );
  // This is a hack to bypass typescript error
  // as _data will never be undefined since we are passing initial data
  const organizationByIdData = _organizationData ?? initialOrganizationByIdData;
  const {
    data: _organizationRole
  } = useGetUserOrganizationRole(organizationId, {
    initialData: initialOrganizationRole
  });
  const organizationRole = _organizationRole ?? initialOrganizationRole;
  if (!organizationRole) {
    return <p>Not authorized</p>;
  }
  return (
    <OrganizationContext.Provider value={{ organizationByIdData, organizationId, organizationRole }}>
      {children}
    </OrganizationContext.Provider>
  );
}
