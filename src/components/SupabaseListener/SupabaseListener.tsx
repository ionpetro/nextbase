'use client';

import { supabaseUserClientComponentClient } from '@/supabase-clients/user/supabaseUserClientComponentClient';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { useEffect } from 'react';
import { useWhyDidYouUpdate } from 'rooks';

// These route segments don't need to be checked for authentication
const externalPagesSegment = '(external-pages)';
const authenticatedPagesSegment = '(authenticated-pages)';

/**
 * This component listens for changes to the user's session and refreshes the page when it changes.
 * This is used to update the UI when the user logs in or out for security reasons.
 */
export function SupabaseListener({ accessToken }: { accessToken?: string }) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  // BUG - https://github.com/supabase/auth-ui/issues/44

  useWhyDidYouUpdate('SupabaseListener', {
    accessToken,
    segments,
  });
  useEffect(() => {
    const { data: authListener } =
      supabaseUserClientComponentClient.auth.onAuthStateChange((event) => {
        console.log(event);
        if (event === 'SIGNED_OUT') {
          router.push('/login');
        } else if (event === 'SIGNED_IN') {
          // the SIGNED_IN event gets fired even when the user is already signed in if the window gets focused after losing focus.
          // so we only want to redirect user to check-auth page if they are not within authenticated-pages segment
          if (segments.includes(externalPagesSegment)) {
            // we are not interested in auth events when the user is on an external page
            return;
          }
          if (segments.includes(authenticatedPagesSegment)) {
            // User is already signed in and is on an authenticated page
            // so we don't need to redirect them to check-auth page
            return null;
          }
          router.push('/check-auth');
        } else if (event === 'TOKEN_REFRESHED') {
          // router.refresh();
        } else if (event === 'PASSWORD_RECOVERY') {
          router.push('/update-password');
        }
      });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [accessToken, segments]);

  return null;
}
