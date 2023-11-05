'use server';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { nextCacheKeys, nextCacheTags } from '@/utils/nextCacheTags';
import { ServerActionState } from '@/utils/server-actions/types';
import { revalidateTag, unstable_cache } from 'next/cache';
import { z } from 'zod';

export const deleteBlogPost = async (
  initialState: ServerActionState,
  formData: FormData,
): Promise<ServerActionState> => {
  'use server';
  const postIdPayload = formData.get('blog_post_id');
  const postId = z.string().parse(postIdPayload);

  const { error } = await supabaseAdminClient
    .from('internal_blog_posts')
    .delete()
    .eq('id', postId);

  if (error) {
    return {
      ...initialState,
      serverActionCount: initialState.serverActionCount + 1,
      status: 'error',
      message: error.message,
    };
  }

  revalidateTag(nextCacheTags.internalBlogPosts);
  return {
    ...initialState,
    serverActionCount: initialState.serverActionCount + 1,
    status: 'success',
    message: 'Successfully deleted blog post',
    payload: undefined,
  };
};

export const getAllBlogPosts = unstable_cache(
  async () => {
    'use server';
    const { data, error } = await supabaseAdminClient
      .from('internal_blog_posts')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  },
  [nextCacheKeys.appAdminInternalBlogList()],
  {
    tags: [nextCacheTags.internalBlogPosts],
  },
);
