"use client"

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const OrganizationGraphs = dynamic(() => import('./OrganizationGraphs').then(m => m.OrganizationGraphs), {
  ssr: false
});

export async function GraphContainer({
  children,
  organizationSlug
}: {
  children: React.ReactNode;
  organizationSlug: string;
}) {

  return <Suspense>
    <OrganizationGraphs
      organizationSlug={organizationSlug}
    >{children}</OrganizationGraphs>
  </Suspense>;
}
