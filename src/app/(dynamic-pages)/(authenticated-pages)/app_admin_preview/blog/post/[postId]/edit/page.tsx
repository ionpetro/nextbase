import { Anchor } from '@/components/Anchor';
import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Typography';
import LeftArrowIcon from 'lucide-react/dist/esm/icons/arrow-left';
import { BlogForm, EditBlogFormProps } from '../../../BlogForm';
import {
  createBlogPost,
  getAllAuthors,
  getAllBlogTags,
  getBlogPostById,
  getBlogPostBySlug,
  getBlogTagRelationships,
  updateBlogPost,
} from '../../../actions';
import { z } from 'zod';
import { notFound } from 'next/navigation';
import { ComponentProps } from 'react';
import Link from 'next/link';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import Overline from '@/components/presentational/tailwind/Text/Overline';

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
    const [authors, tags, blogTagRelationships] = await Promise.all([
      getAllAuthors(),
      getAllBlogTags(),
      getBlogTagRelationships(postId),
    ]);
    let postAuthorId: string | undefined = undefined;
    const authorBlogPosts = Array.isArray(post.internal_blog_author_posts)
      ? post.internal_blog_author_posts[0]
      : post.internal_blog_author_posts;
    if (!authorBlogPosts) {
      console.log('Linked author not found');
    } else {
      postAuthorId = authorBlogPosts?.author_id ?? undefined;
    }

    const initialBlogPost: EditBlogFormProps['initialBlogPost'] = {
      author_id: postAuthorId,
      content: post.content,
      cover_image: post.cover_image ?? undefined,
      is_featured: post.is_featured,
      slug: post.slug,
      summary: post.summary,
      title: post.title,
      status: post.status,
      tag_ids: blogTagRelationships.map((relationship) => relationship.tag_id),
    };
    return (
      <div className="space-y-4">
        <Link href="/app_admin/blog">
          <div className="flex space-x-2 items-center group">
            <ChevronLeft className="relative text-gray-500 h-4 w-4 hover:-translate-x-10 group-hover:text-gray-800 group-hover:dark:text-gray-400 dark:text-gray-600" />
            <Overline className="text-gray-500 group-hover:text-gray-800 dark:text-gray-600 group-hover:dark:text-gray-400">
              Back to blog
            </Overline>
          </div>
        </Link>
        <T.H3>Edit Blog Post</T.H3>
        <BlogForm
          tags={tags}
          authors={authors}
          mode="update"
          initialBlogPost={initialBlogPost}
          onSubmit={updateBlogPost}
          postId={post.id}
        />
      </div>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
