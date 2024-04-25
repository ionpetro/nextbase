import { ApplicationLayoutShell } from '@/components/ApplicationLayoutShell/ApplicationLayoutShell';
import { InternalNavbar } from '@/components/NavigationMenu/InternalNavbar';
import { Suspense, type ReactNode } from 'react';

export default async function Layout({
  children,
  navbar,
  sidebar,
}: {
  children: ReactNode;
  navbar: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <ApplicationLayoutShell sidebar={<Suspense>{sidebar}</Suspense>}>
      <div>
        <InternalNavbar>
          <div className="hidden lg:flex w-full justify-between items-center">
            <Suspense>{navbar}</Suspense>
          </div>
        </InternalNavbar>
        <div className="relative flex-1 h-auto py-6 w-full overflow-auto bg-secondary">
          <div className="px-6 space-y-6 pb-8">{children}</div>
        </div>
      </div>
    </ApplicationLayoutShell>
  );
}
