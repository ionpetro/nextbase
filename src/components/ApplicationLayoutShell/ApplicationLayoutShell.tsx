'use server';
import { ReactNode, Suspense } from 'react';
import { ClientShell } from './ClientShell';

export async function ApplicationLayoutShell({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <ClientShell
      sidebar={
        <Suspense fallback={<div>Loading sidebar</div>}> {sidebar}</Suspense>
      }
    >
      {children}
    </ClientShell>
  );
}
