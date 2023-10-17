import { DynamicLayoutProviders } from './DynamicLayoutProviders';
import { errors } from '@/utils/errors';
import { AppSupabaseClient } from '@/types';
import { getIsAppInMaintenanceMode } from '@/utils/supabase-queries';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';

// do not cache this layout
export const dynamic = 'force-dynamic';
export const fetchCache = 'only-no-store';
export const revalidate = 0;

async function fetchIsAppInMaintenanceMode(supabaseClient: AppSupabaseClient) {
  const isAppInMaintenanceMode =
    await getIsAppInMaintenanceMode(supabaseClient);

  return isAppInMaintenanceMode;
}

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
  const supabaseClient = createSupabaseUserServerComponentClient();
  const [isAppInMaintenanceMode] = await Promise.all([
    fetchIsAppInMaintenanceMode(supabaseClient),
  ]);
  return (
    <DynamicLayoutProviders isAppInMaintenanceMode={isAppInMaintenanceMode}>
      {children}
    </DynamicLayoutProviders>
  );
}
