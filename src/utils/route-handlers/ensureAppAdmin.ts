import { createSupabaseUserRouteHandlerClient } from '@/supabase-clients/user/createSupabaseUserRouteHandlerClient';
import { getIsAppAdmin } from '../supabase-queries';

export const ensureAppAdmin = async () => {
  const supabaseClient = createSupabaseUserRouteHandlerClient();
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session || !session.user) {
    throw new Error(
      'The user does not have an active session or is not authenticated'
    );
  }

  const isAppAdmin = await getIsAppAdmin(supabaseClient, session.user);

  if (!isAppAdmin) {
    throw new Error('The user is not allowed to perform this action');
  }
};
