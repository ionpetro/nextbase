'use server';
import { supabaseAnonClient } from '@/supabase-clients/anon/supabaseAnonClient';

export async function anonGetAllChangelogItems() {
  const changelogItemsResponse = await supabaseAnonClient
    .from('internal_changelog')
    .select('*');

  if (changelogItemsResponse.error) {
    throw changelogItemsResponse.error;
  }

  if (!changelogItemsResponse.data) {
    throw new Error('No data found');
  }

  return changelogItemsResponse.data;
}
