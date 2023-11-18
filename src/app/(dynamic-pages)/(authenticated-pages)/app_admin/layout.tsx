import { errors } from '@/utils/errors';
import { redirect } from 'next/navigation';
import { AppAdminNavigation } from './AppAdminNavigation';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { Suspense } from 'react';
import { ApplicationAdminSidebar } from '../(application-pages)/_sidebar/ApplicationAdminSidebar';
import { getIsAppAdmin } from '@/data/user/user';
import { InternalNavbar } from '@/components/ui/NavigationMenu/InternalNavbar';
import { ApplicationLayoutShell } from '@/components/ApplicationLayoutShell';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { cn } from '@/utils/cn';
import { T } from '@/components/ui/Typography';

async function fetchData() {
  const user = await serverGetLoggedInUser();
  const [isUserAppAdmin] = await Promise.all([getIsAppAdmin(user)]);

  return { isUserAppAdmin };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { isUserAppAdmin } = await fetchData();

    if (!isUserAppAdmin) {
      return redirect('/dashboard');
    }
    return (
      <ApplicationLayoutShell
        sidebar={
          <Suspense fallback={<p>Loading ...</p>}>
            <ApplicationAdminSidebar />
          </Suspense>
        }
      >
        <div className="h-full overflow-y-auto">
          <InternalNavbar>Admin panel</InternalNavbar>
          <div className="relative flex-1 h-auto mt-8 w-full">
            <div className="pl-6 pr-12 space-y-6 pb-10">
              <T.P className={cn('text-muted-foreground leading-6')}>
                All sections of this area are protected and only accessible by
                Application Admins
              </T.P>
              {children}
            </div>
          </div>
        </div>
      </ApplicationLayoutShell>
    );
  } catch (fetchDataError) {
    errors.add(fetchDataError);
    return <p>Error: An error occurred.</p>;
  }
}
