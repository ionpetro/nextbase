import { supabaseUserRouteHandlerClient } from '@/supabase-clients/user/supabaseUserRouteHandlerClient';
import { getIsAppAdmin } from '../supabase-queries';

export const ensureAppAdmin = async () => {
  const {
    data: { session },
  } = await supabaseUserRouteHandlerClient.auth.getSession();

  if (!session || !session.user) {
    throw new Error(
      'The user does not have an active session or is not authenticated'
    );
  }

  const isAppAdmin = await getIsAppAdmin(
    supabaseUserRouteHandlerClient,
    session.user
  );

  if (!isAppAdmin) {
    throw new Error('The user is not allowed to perform this action');
  }
};
