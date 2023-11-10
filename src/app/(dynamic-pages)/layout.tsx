import { DynamicLayoutProviders } from './DynamicLayoutProviders';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { getIsAppInMaintenanceMode } from '@/data/global';
import { unstable_noStore } from 'next/cache';

// do not cache this layout
export const dynamic = 'force-dynamic';
export const fetchCache = 'only-no-store';
export const revalidate = 0;

export const metadata = {
  icons: {
    icon: '/images/logo-black-main.ico',
  },
  title: 'Nextbase Ultimate',
  description: 'Nextbase Ultimate',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  unstable_noStore();
  const isAppInMaintenanceMode = await getIsAppInMaintenanceMode();
  return (
    <DynamicLayoutProviders isAppInMaintenanceMode={isAppInMaintenanceMode}>
      {children}
    </DynamicLayoutProviders>
  );
}
