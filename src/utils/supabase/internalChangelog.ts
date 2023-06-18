import { AppSupabaseClient } from '@/types';

export const createChangelog = async (
  supabaseClient: AppSupabaseClient,
  { title, changes, userId }: { title: string; changes: string; userId: string }
) => {
  console.log({
    title,
    changes,
    userId,
  });
  const { error } = await supabaseClient.from('internal_changelog').insert({
    title,
    changes,
    user_id: userId,
  });
  if (error) {
    throw error;
  }
};
