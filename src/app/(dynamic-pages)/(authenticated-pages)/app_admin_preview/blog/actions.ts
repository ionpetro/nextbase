'use server';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { TableInsertPayload, TableUpdatePayload } from '@/types';
import { revalidatePath } from 'next/cache';

export const createAuthorProfile = async (
  payload: TableInsertPayload<'internal_blog_author_profiles'>,
) => {
  const { error } = await supabaseAdminClient
    .from('internal_blog_author_profiles')
    .insert(payload);

  if (error) {
    throw error;
  }

  revalidatePath('/');
};

export const createBlogPost = async (
  authorId: string,
  payload: TableInsertPayload<'internal_blog_posts'>,
  tagIds: number[],
) => {
  const { data, error } = await supabaseAdminClient
    .from('internal_blog_posts')
    .insert(payload)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  // assign to author
  await supabaseAdminClient.from('internal_blog_author_posts').insert({
    author_id: authorId,
    post_id: data.id,
  });

  await updateBlogTagRelationships(data.id, tagIds);

  revalidatePath('/');
};

export const getBlogPostById = async (postId: string) => {
  const { data, error } = await supabaseAdminClient
    .from('internal_blog_posts')
    .select(
      '*, internal_blog_author_posts(*, internal_blog_author_profiles(*))',
    )
    .eq('id', postId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getBlogPostBySlug = async (slug: string) => {
  const { data, error } = await supabaseAdminClient
    .from('internal_blog_posts')
    .select(
      '*, internal_blog_author_posts(*, internal_blog_author_profiles(*))',
    )
    .eq('slug', slug)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getBlogPostsByAuthorId = async (authorId: string) => {
  const { data, error } = await supabaseAdminClient
    .from('internal_blog_author_posts')
    .select('*, internal_blog_posts(*)')
    .eq('author_id', authorId);

  if (error) {
    throw error;
  }

  return data;
};

export const updateAuthorProfile = async (
  userId: string,
  payload: Partial<TableUpdatePayload<'internal_blog_author_profiles'>>,
) => {
  const { data, error } = await supabaseAdminClient
    .from('internal_blog_author_profiles')
    .update(payload)
    .eq('user_id', userId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  revalidatePath('/');
};

export const updateBlogPost = async (
  authorId: string,
  postId: string,
  payload: Partial<TableUpdatePayload<'internal_blog_posts'>>,
  tagIds: number[],
) => {
  const { data, error } = await supabaseAdminClient
    .from('internal_blog_posts')
    .update(payload)
    .eq('id', postId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  const { data: oldAuthors, error: oldAuthorsError } = await supabaseAdminClient
    .from('internal_blog_author_posts')
    .select('*')
    .eq('post_id', postId);
  if (oldAuthorsError) {
    throw oldAuthorsError;
  }

  for (const oldAuthor of oldAuthors) {
    const { error: deleteError } = await supabaseAdminClient
      .from('internal_blog_author_posts')
      .delete()
      .eq('author_id', oldAuthor.author_id)
      .eq('post_id', postId);
    if (deleteError) {
      throw deleteError;
    }
  }

  // assign new author to the post
  await assignBlogPostToAuthor(authorId, postId);
  await updateBlogTagRelationships(data.id, tagIds);

  revalidatePath('/');
};

export const assignBlogPostToAuthor = async (
  authorId: string,
  postId: string,
) => {
  const { data, error } = await supabaseAdminClient
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

export const getAllBlogPosts = async () => {
  const { data, error } = await supabaseAdminClient
    .from('internal_blog_posts')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const getAllAuthors = async () => {
  const { data, error } = await supabaseAdminClient
    .from('internal_blog_author_profiles')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const getAllAppAdmins = async () => {
  const { data: userIds, error } =
    await supabaseAdminClient.rpc('get_all_app_admins');

  if (error) {
    throw error;
  }

  // get user profiles from user ids
  const { data: userProfiles, error: error2 } = await supabaseAdminClient
    .from('user_profiles')
    .select('*')
    .in(
      'id',
      userIds.map((userId) => userId.user_id),
    );

  if (error2) {
    throw error2;
  }

  return userProfiles;
};

export const deleteAuthorProfile = async (userId: string) => {
  const { error } = await supabaseAdminClient
    .from('internal_blog_author_profiles')
    .delete()
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  revalidatePath('/');
};

export const deleteBlogPost = async (postId: string) => {
  const { error } = await supabaseAdminClient
    .from('internal_blog_posts')
    .delete()
    .eq('id', postId);

  if (error) {
    throw error;
  }

  revalidatePath('/');
};

export const createBlogTag = async (
  payload: TableInsertPayload<'internal_blog_post_tags'>,
) => {
  const { error } = await supabaseAdminClient
    .from('internal_blog_post_tags')
    .insert(payload);

  if (error) {
    throw error;
  }

  revalidatePath('/');
};

export const updateBlogTag = async (
  id: number,
  payload: Partial<TableUpdatePayload<'internal_blog_post_tags'>>,
) => {
  const { data, error } = await supabaseAdminClient
    .from('internal_blog_post_tags')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  revalidatePath('/');
};

export const deleteBlogTag = async (id: number) => {
  const { error } = await supabaseAdminClient
    .from('internal_blog_post_tags')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  revalidatePath('/');
};

export const getAllBlogTags = async () => {
  const { data, error } = await supabaseAdminClient
    .from('internal_blog_post_tags')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const getBlogTagRelationships = async (blogPostId: string) => {
  const { data, error } = await supabaseAdminClient
    .from('internal_blog_post_tags_relationship')
    .select('*')
    .eq('blog_post_id', blogPostId);

  if (error) {
    throw error;
  }

  return data;
};

export const updateBlogTagRelationships = async (
  blogPostId: string,
  tagIds: number[],
) => {
  const { data, error } = await supabaseAdminClient
    .from('internal_blog_post_tags_relationship')
    .delete()
    .eq('blog_post_id', blogPostId);

  if (error) {
    throw error;
  }

  for (const tagId of tagIds) {
    const { error: error2 } = await supabaseAdminClient
      .from('internal_blog_post_tags_relationship')
      .insert({
        blog_post_id: blogPostId,
        tag_id: tagId,
      });

    if (error2) {
      throw error2;
    }
  }

  revalidatePath('/');
};
