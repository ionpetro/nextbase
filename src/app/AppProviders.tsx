<<<<<<< HEAD
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import type React from "react";
import { Suspense } from "react";
import ReactNoSSR from "react-no-ssr";
import { Toaster as SonnerToaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";
import { useMyReportWebVitals } from "./reportWebVitals";
=======
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import React, { Suspense } from 'react';
import { Toaster as SonnerToaster } from 'sonner';
import { ThemeProvider } from './ThemeProvider';
import { useMyReportWebVitals } from './reportWebVitals';
>>>>>>> 3ab6d7d (Remove ReactNoSSR and import Confetti dynamically)

// Create a client
const queryClient = new QueryClient();

/**
 * This is a wrapper for the app that provides the supabase client, the router event wrapper
 * the react-query client, supabase listener, and the navigation progress bar.
 *
 * The listener is used to listen for changes to the user's session and update the UI accordingly.
 */
export function AppProviders({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  useMyReportWebVitals();
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          {children}
<<<<<<< HEAD
          <ReactNoSSR>
            <SonnerToaster theme={"light"} />
          </ReactNoSSR>
=======
          <SonnerToaster theme={'light'} />
>>>>>>> 3ab6d7d (Remove ReactNoSSR and import Confetti dynamically)
          <Suspense>
            <ProgressBar
              height="4px"
              color="#0047ab"
              options={{ showSpinner: false }}
              shallowRouting
            />
          </Suspense>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
