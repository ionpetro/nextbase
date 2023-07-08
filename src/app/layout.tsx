import 'server-only';
import './globals.css';
import 'react-tooltip/dist/react-tooltip.css';
import AppProviders from './AppProviders';
import { errors } from '@/utils/errors';
import { AppSupabaseClient } from '@/types';
import { getIsAppInMaintenanceMode } from '@/utils/supabase-queries';
import localFont from 'next/font/local';
import { supabaseUserServerComponentClient } from '@/supabase-clients/user/supabaseUserServerComponentClient';

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, isAppInMaintenanceMode] = await Promise.all([
    fetchSession(supabaseUserServerComponentClient),
    fetchIsAppInMaintenanceMode(supabaseUserServerComponentClient),
  ]);
  return (
    <html lang="en" className={satoshiFont.variable}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
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
