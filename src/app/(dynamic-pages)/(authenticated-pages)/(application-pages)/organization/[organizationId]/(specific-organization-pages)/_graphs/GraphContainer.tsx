"use client"

import dynamic from 'next/dynamic';

const OrganizationGraphs = dynamic(() => import('./OrganizationGraphs').then(m => m.OrganizationGraphs));

export function GraphContainer({
  organizationId,
  children,
}: {
  organizationId: string;
  children: React.ReactNode;
}) {
  return <OrganizationGraphs
    organizationId={organizationId}
    children={children}
  />;
}
