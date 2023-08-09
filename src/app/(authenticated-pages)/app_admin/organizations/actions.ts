'use server';
import { ADMIN_ORGANIZATION_LIST_VIEW_PAGE_SIZE } from '@/constants';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { DBFunction } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getOrganizationsPaginatedAction({
  pageNumber,
  search,
}: {
  pageNumber: number;
  search: string | undefined;
}): Promise<[number, DBFunction<'app_admin_get_all_organizations'>]> {
  const effectivePageNumber = pageNumber + 1;
  const { data, error } = await supabaseAdminClient.rpc(
    'app_admin_get_all_organizations',
    {
      page: effectivePageNumber,
      search_query: search,
      page_size: ADMIN_ORGANIZATION_LIST_VIEW_PAGE_SIZE,
    }
  );
  if (error) throw error;
  if (!data) {
    return [pageNumber, []];
  }
  revalidatePath('/');
  return [pageNumber, data];
}
