import { Anchor } from '@/components/Anchor';
import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Typography';
import LeftArrowIcon from 'lucide-react/dist/esm/icons/arrow-left';
import { BlogForm } from '../../../BlogForm';
import {
  createBlogPost,
  getAllAuthors,
  getBlogPostById,
  getBlogPostBySlug,
  updateBlogPost,
} from '../../../actions';
import { z } from 'zod';
import { notFound } from 'next/navigation';
import { ComponentProps } from 'react';
import Link from 'next/link';

const paramsSchema = z.object({
  postId: z.string(),
});

export default async function CreateBlogPostPage({
  params,
}: {
  params: unknown;
}) {
  try {
    const { postId } = paramsSchema.parse(params);
    const post = await getBlogPostById(postId);
    const [authors] = await Promise.all([getAllAuthors()]);
    const authorBlogPosts = Array.isArray(post.internal_blog_author_posts)
      ? post.internal_blog_author_posts[0]
      : post.internal_blog_author_posts;
    if (!authorBlogPosts) {
      throw new Error('Linked author not found');
    }
    const postAuthorId = authorBlogPosts?.author_id;
    const initialBlogPost: ComponentProps<typeof BlogForm>['initialBlogPost'] =
    {
      author_id: postAuthorId,
      content: post.content,
      cover_image: post.cover_image ?? undefined,
      is_featured: post.is_featured,
      slug: post.slug,
      summary: post.summary,
      title: post.title,
      status: post.status,
    };
    return (
      <div className="space-y-4">
        <Link href="/app_admin/blog">
          <Button
            variant="infoLink"
            className="flex items-center justify-center"
          >
            <LeftArrowIcon /> <span>Back to blog</span>
          </Button>
        </Link>
        <T.H3>Edit Blog Post</T.H3>
        <BlogForm
          authors={authors}
          mode="update"
          initialBlogPost={initialBlogPost}
          onSubmit={updateBlogPost}
          postId={post.id}
        />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
