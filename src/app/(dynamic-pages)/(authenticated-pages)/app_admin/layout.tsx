import { errors } from '@/utils/errors';
import { redirect } from 'next/navigation';
import { AppAdminNavigation } from './AppAdminNavigation';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { Suspense } from 'react';
import { ApplicationAdminSidebar } from './_sidebar/ApplicationAdminSidebar';
import { getIsAppAdmin } from '@/data/user/user';

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
      <div
        className="h-screen w-full grid overflow-hidden"
        style={{
          gridTemplateColumns: 'auto 1fr',
        }}
      >
        <Suspense fallback={<p>Loading ...</p>}>
          <ApplicationAdminSidebar />
        </Suspense>
        <div className="flex-1 pb-10 relative h-auto max-h-screen w-full overflow-auto">
          <div className="px-12 space-y-6">
            <AppAdminNavigation />
            {children}
          </div>
        </div>
      </div>
    );
  } catch (fetchDataError) {
    errors.add(fetchDataError);
    return <p>Error: An error occurred.</p>;
  }
}
