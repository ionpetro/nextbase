"use client"

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const OrganizationGraphs = dynamic(() => import('./OrganizationGraphs').then(m => m.OrganizationGraphs), {
  ssr: false
});

export function GraphContainer({
  organizationId,
  children,
}: {
  organizationId: string;
  children: React.ReactNode;
}) {
  return <Suspense>
    <OrganizationGraphs
      organizationId={organizationId}
      children={children}
    />
  </Suspense>;
}
