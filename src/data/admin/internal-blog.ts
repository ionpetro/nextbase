'use server';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { revalidatePath } from 'next/cache';

export const deleteBlogPost = async (blogPostId: string) => {
  'use server';

  const { error } = await supabaseAdminClient
    .from('internal_blog_posts')
    .delete()
    .eq('id', blogPostId);

  if (error) {
    throw error;
  }

  revalidatePath('/blog');
  revalidatePath(`/app_admin`);
};

export const getAllBlogPosts = async () => {
  'use server';
  const { data, error } = await supabaseAdminClient
    .from('internal_blog_posts')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};
