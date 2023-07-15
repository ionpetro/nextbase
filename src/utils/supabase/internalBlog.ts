import { AppSupabaseClient } from '@/types';

export const getBlogPostById = async (
  supabaseClient: AppSupabaseClient,
  postId: string
) => {
  const { data, error } = await supabaseClient
    .from('internal_blog_posts')
    .select(
      '*, internal_blog_author_posts(*, internal_blog_author_profiles(*))'
    )
    .eq('id', postId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getBlogPostBySlug = async (
  supabaseClient: AppSupabaseClient,
  slug: string
) => {
  const { data, error } = await supabaseClient
    .from('internal_blog_posts')
    .select(
      '*, internal_blog_author_posts(*, internal_blog_author_profiles(*))'
    )
    .eq('slug', slug)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getPublishedBlogPostBySlug = async (
  supabaseClient: AppSupabaseClient,
  slug: string
) => {
  const { data, error } = await supabaseClient
    .from('internal_blog_posts')
    .select(
      '*, internal_blog_author_posts(*, internal_blog_author_profiles(*))'
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getPublishedBlogPosts = async (
  supabaseClient: AppSupabaseClient
) => {
  const { data, error } = await supabaseClient
    .from('internal_blog_posts')
    .select(
      '*, internal_blog_author_posts(*, internal_blog_author_profiles(*))'
    )
    .eq('status', 'published');

  if (error) {
    throw error;
  }

  return data;
};

export const getBlogPostsByAuthorId = async (
  supabaseClient: AppSupabaseClient,
  authorId: string
) => {
  const { data, error } = await supabaseClient
    .from('internal_blog_author_posts')
    .select('*, internal_blog_posts(*)')
    .eq('author_id', authorId);

  if (error) {
    throw error;
  }

  return data;
};

export const assignBlogPostToAuthor = async (
  supabaseClient: AppSupabaseClient,

  authorId: string,
  postId: string
) => {
  const { data, error } = await supabaseClient
    .from('internal_blog_author_posts')
    .insert({
      author_id: authorId,
      post_id: postId,
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getAllBlogPosts = async (supabaseClient: AppSupabaseClient) => {
  const { data, error } = await supabaseClient
    .from('internal_blog_posts')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const getAllAuthors = async (supabaseClient: AppSupabaseClient) => {
  const { data, error } = await supabaseClient
    .from('internal_blog_author_profiles')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};
