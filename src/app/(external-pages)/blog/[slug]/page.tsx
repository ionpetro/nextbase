import { supabaseUserServerComponentClient } from '@/supabase-clients/user/supabaseUserServerComponentClient';
import { getPublishedBlogPostBySlug } from '@/utils/supabase/internalBlog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { z } from 'zod';
import turndown from 'turndown';

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
    console.log(post.content);
    return (
      <div className="prose prose-lg prose-slate  dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
