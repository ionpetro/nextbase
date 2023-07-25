import 'server-only';
import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import 'react-tooltip/dist/react-tooltip.css';
import AppProviders from './AppProviders';
import { errors } from '@/utils/errors';
import { AppSupabaseClient } from '@/types';
import { getIsAppInMaintenanceMode } from '@/utils/supabase-queries';
import localFont from 'next/font/local';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';

const satoshiFont = localFont({
  src: '../fonts/satoshi/Satoshi-Variable.woff2',
  display: 'swap',
  variable: '--font-satoshi',
});

async function fetchSession(supabaseClient: AppSupabaseClient) {
  // This is a server-side call, so it will not trigger a revalidation
  const {
    data: { session },
    error,
  } = await supabaseClient.auth.getSession();

  if (error) {
    errors.add(error);
  }

  return session;
}

async function fetchIsAppInMaintenanceMode(supabaseClient: AppSupabaseClient) {
  try {
    const isAppInMaintenanceMode = await getIsAppInMaintenanceMode(
      supabaseClient
    );

    return isAppInMaintenanceMode;
  } catch (error) {
    if (error instanceof Error) {
      errors.add(error);
    } else {
      errors.add(new Error(error));
    }
  }
  return false;
}

export const metadata = {
  icons: {
    icon: '/images/logo-black-main.ico',
  },
  title: 'Nextbase Ultimate',
  description: 'Nextbase Ultimate',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const [session, isAppInMaintenanceMode] = await Promise.all([
    fetchSession(supabaseClient),
    fetchIsAppInMaintenanceMode(supabaseClient),
  ]);
  return (
    <html lang="en" className={satoshiFont.variable}>
      <head></head>
      <body>
        <AppProviders
          initialSession={session}
          initialIsAppInMaintenanceMode={isAppInMaintenanceMode}
        >
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
