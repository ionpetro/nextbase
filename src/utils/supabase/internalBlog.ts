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

export const getPublishedBlogPostsByTagSlug = async (
  supabaseClient: AppSupabaseClient,
  tagSlug: string
) => {
  const { data: tag, error: tagError } = await supabaseClient
    .from('internal_blog_post_tags')
    .select('*')
    .eq('slug', tagSlug)
    .single();

  if (tagError) {
    throw tagError;
  }

  const {
    data: blogPostTagRelationships,
    error: blogPostTagRelationshipsError,
  } = await supabaseClient
    .from('internal_blog_post_tags_relationship')
    .select('*')
    .eq('tag_id', tag.id);

  if (blogPostTagRelationshipsError) {
    throw blogPostTagRelationshipsError;
  }

  const postIds = blogPostTagRelationships.map(
    (relationship) => relationship.blog_post_id
  );

  const { data, error } = await supabaseClient
    .from('internal_blog_posts')
    .select(
      '*, internal_blog_author_posts(*, internal_blog_author_profiles(*))'
    )
    .in('id', postIds)
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

export const getTagBySlug = async (
  supabaseClient: AppSupabaseClient,
  slug: string
) => {
  const { data, error } = await supabaseClient
    .from('internal_blog_post_tags')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
export const getAllBlogTags = async (supabaseClient: AppSupabaseClient) => {
  const { data, error } = await supabaseClient
    .from('internal_blog_post_tags')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};
