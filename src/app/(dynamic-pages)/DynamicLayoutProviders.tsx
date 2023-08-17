'use client';
import React from 'react';
import {
  SessionContextProvider,
  SessionContextProviderProps,
} from '@supabase/auth-helpers-react';
import { Toaster as HotToaster } from 'react-hot-toast';
import ReactNoSSR from 'react-no-ssr';
import { MaintenanceModeContextProvider } from '@/contexts/MaintenanceModeContext';
import { supabaseUserClientComponentClient } from '@/supabase-clients/user/supabaseUserClientComponentClient';
import { Toaster as SonnerToaster } from 'sonner';

/**
 * This is a wrapper for the app that provides the supabase client, the router event wrapper
 * the react-query client, supabase listener, and the navigation progress bar.
 *
 * The listener is used to listen for changes to the user's session and update the UI accordingly.
 */
export function DynamicLayoutProviders({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  initialSession,
  isAppInMaintenanceMode,
}: {
  children: React.ReactNode;
  initialSession: Pick<
    SessionContextProviderProps,
    'initialSession'
  >['initialSession'];
  isAppInMaintenanceMode: boolean;
}) {
  return (
    <>
      <SessionContextProvider
        supabaseClient={supabaseUserClientComponentClient}
        initialSession={initialSession}
      >
        <MaintenanceModeContextProvider
          isAppInMaintenanceMode={isAppInMaintenanceMode}
        >
          {children}
        </MaintenanceModeContextProvider>
        <ReactNoSSR>
          <SonnerToaster theme={'light'} />
          <HotToaster />
        </ReactNoSSR>
      </SessionContextProvider>
    </>
  );
}
