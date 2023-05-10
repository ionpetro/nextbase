'use client';
import { ReactNode } from 'react';
import { OrganizationContextProvider } from '@/contexts/OrganizationContext';
import { Enum } from '@/types';

export function OrganizationClientLayout({
  children,
  organizationId,
  organizationRole,
}: {
  children: ReactNode;
  organizationId: string;
  organizationRole: Enum<'organization_member_role'> | null;
}) {
  return (
    <OrganizationContextProvider
      organizationRole={organizationRole}
      organizationId={organizationId}
    >
      <div className="h-full">{children}</div>
    </OrganizationContextProvider>
  );
}
