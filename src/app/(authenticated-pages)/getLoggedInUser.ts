import { AppSupabaseClient } from "@/types";
import { User } from "@supabase/supabase-js";

export async function getLoggedInUser(supabaseClient: AppSupabaseClient): Promise<User> {
  const userResponse = await supabaseClient.auth.getUser();
  const user = userResponse.data.user;
  if (!user) {
    throw new Error('User not logged in');
  }

  return user;
}
