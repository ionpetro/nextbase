import { ReactNode, Suspense } from 'react';
import { InternalNavbar } from '@/components/ui/NavigationMenu/InternalNavbar';
import { Anchor } from '@/components/Anchor';
import { Badge } from '@/components/ui/Badge';
import { unstable_noStore } from 'next/cache';
import { ApplicationLayoutShell } from '@/components/ApplicationLayoutShell';
import { UserSidebar } from '../(application-pages)/_sidebar/UserSidebar';

export default async function Layout({
  children,
  navbar,
}: {
  children: ReactNode;
  navbar: ReactNode;
}) {
  unstable_noStore();
  return (
    <ApplicationLayoutShell sidebar={<UserSidebar />}>
      <div>
        <InternalNavbar>
          <Suspense>{navbar}</Suspense>
        </InternalNavbar>
        <div className="relative flex-1 h-auto mt-8 w-full overflow-auto">
          <div className="px-6  pr-12 space-y-6 pb-10">{children}</div>
        </div>
      </div>
    </ApplicationLayoutShell>
  );
}
