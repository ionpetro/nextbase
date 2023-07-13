import { supabaseUserServerComponentClient } from '@/supabase-clients/user/supabaseUserServerComponentClient';
import { getPublishedBlogPostBySlug } from '@/utils/supabase/internalBlog';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const paramsSchema = z.object({
  slug: z.string(),
});

export default async function BlogPostPage({ params }: { params: unknown }) {
  try {
    const { slug } = paramsSchema.parse(params);
    const post = await getPublishedBlogPostBySlug(
      supabaseUserServerComponentClient,
      slug
    );
    return (
      <div>
        <h1>{post.title}</h1>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
