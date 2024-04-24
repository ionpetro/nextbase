import { ApplicationLayoutShell } from '@/components/ApplicationLayoutShell';
import { InternalNavbar } from '@/components/NavigationMenu/InternalNavbar';
import { Alert } from '@/components/ui/alert';
import { getIsAppAdmin } from '@/data/user/user';
import { errors } from '@/utils/errors';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const revalidate = 0;

async function fetchData() {
  const [isUserAppAdmin] = await Promise.all([getIsAppAdmin()]);

  return { isUserAppAdmin };
}

export default async function Layout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  try {
    const { isUserAppAdmin } = await fetchData();

    if (!isUserAppAdmin) {
      return redirect('/dashboard');
    }
    return (
      <ApplicationLayoutShell sidebar={<Suspense>{sidebar}</Suspense>}>
        <div className="h-full overflow-y-auto">
          <InternalNavbar>
            <div className="flex items-center justify-start w-full">
              Admin panel
            </div>
          </InternalNavbar>
          <div className="relative flex-1 h-auto mt-8 w-full">
            <div className="pl-6 pr-12 space-y-6 pb-10">
              <Alert
                variant="default"
                className="hover:bg-gray-50 dark:hover:bg-slate-800/50 bg-gray-50 dark:bg-slate-800/50 text-gray-600 dark:text-slate-400"
              >
                All sections of this area are protected and only accessible by
                Application Admins.
              </Alert>
              {children}
            </div>
          </div>
        </div>
      </ApplicationLayoutShell>
    );
  } catch (fetchDataError) {
    // console.log(new Error().stack);
    errors.add(fetchDataError);
    return <p>Error: An error occurred.</p>;
  }
}
