import { SIDEBAR_VISIBILITY_COOKIE_KEY } from '@/constants';
import { LoggedInUserProvider } from '@/contexts/LoggedInUserContext';
import { SidebarVisibilityProvider } from '@/contexts/SidebarVisibilityContext';
import {
  fetchSlimOrganizations,
  getDefaultOrganization,
  setDefaultOrganization,
} from '@/data/user/organizations';
import { getAcceptedTermsOfService, getUserProfile } from '@/data/user/user';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { errors } from '@/utils/errors';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { ClientLayout } from './ClientLayout';

function getSidebarVisibility() {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get(SIDEBAR_VISIBILITY_COOKIE_KEY)?.value;
  if (cookieValue) {
    return cookieValue === 'true';
  }
  return true;
}

async function getDefaultOrganizationOrSet(): Promise<string | null> {
  const [slimOrganizations, defaultOrganizationId] = await Promise.all([
    fetchSlimOrganizations(),
    getDefaultOrganization(),
  ]);
  const firstOrganization = slimOrganizations[0];

  if (defaultOrganizationId) {
    return defaultOrganizationId;
  }

  if (!firstOrganization) {
    return null;
  }

  await setDefaultOrganization(firstOrganization.id);

  return firstOrganization.id;
}

const getOnboardingConditions = async (userId: string) => {
  const userProfile = await getUserProfile(userId);
  const defaultOrganizationId = await getDefaultOrganizationOrSet();
  const acceptedTerms = await getAcceptedTermsOfService(userId);

  return {
    userProfile,
    defaultOrganizationId,
    terms: acceptedTerms,
  };
};

export default async function Layout({ children }: { children: ReactNode }) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient.auth.getUser(); // this will cause memory leak in client side
  const { user } = data;

  if (!user) {
    // This is unreachable because the user is authenticated
    // But we need to check for it anyway for TypeScript.
    return redirect('/login');
  }
  if (error) {
    return <p>Error: An error occurred.</p>;
  }

  try {
    const sidebarVisibility = getSidebarVisibility();

    const onboardingConditions = await getOnboardingConditions(user.id);

    return (
      <SidebarVisibilityProvider initialValue={sidebarVisibility}>
        <LoggedInUserProvider user={user}>
          <ClientLayout onboardingConditions={onboardingConditions}>
            {children}
          </ClientLayout>
        </LoggedInUserProvider>
      </SidebarVisibilityProvider>
    );
  } catch (fetchDataError) {
    errors.add(fetchDataError);
    return <p>Error: An error occurred.</p>;
  }
}
