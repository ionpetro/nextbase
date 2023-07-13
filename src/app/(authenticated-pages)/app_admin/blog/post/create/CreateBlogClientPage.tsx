'use client';
import { z } from 'zod';
import { Table } from '@/types';
import { useRouter } from 'next/navigation';
import { internalBlogPostSchema } from '@/utils/zod-schemas/internalBlog';
import { useCreateBlogPost } from '@/utils/react-query-hooks-app-admin';
import { BlogForm } from '../../BlogForm';

type BlogPostFormType = z.infer<typeof internalBlogPostSchema>;

export const CreateBlogClientPage = ({
  authors,
}: {
  authors: Table<'internal_blog_author_profiles'>[];
}) => {
  const router = useRouter();

  const { mutate: submitPostMutation, isLoading: isSubmittingPost } =
    useCreateBlogPost({
      onSuccess: () => {
        router.push('/app_admin/blog');
      },
    });

  const onSubmit = (data: BlogPostFormType) => {
    submitPostMutation({
      authorId: data.author_id,
      payload: {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: data.content,
        is_featured: data.is_featured,
        status: data.status,
        author_id: data.author_id,
        cover_image: data.cover_image,
      },
    });
  };

  return (
    <BlogForm
      authors={authors}
      isSubmittingPost={isSubmittingPost}
      onSubmit={onSubmit}
    />
  );
};
