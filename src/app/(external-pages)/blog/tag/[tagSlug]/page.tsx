import { T } from '@/components/ui/Typography';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import {
  getAllBlogTags,
  getPublishedBlogPostsByTagSlug,
  getTagBySlug,
} from '@/utils/supabase/internalBlog';
import { Metadata } from 'next';
import { z } from 'zod';
import { PublicBlogList } from '../../PublicBlogList';
import { TagsNav } from '../../TagsNav';

const BlogListByTagPageParamsSchema = z.object({
  tagSlug: z.string(),
});

export async function generateMetadata({
  params,
}: {
  params: unknown;
}): Promise<Metadata> {
  // read route params
  const { tagSlug } = BlogListByTagPageParamsSchema.parse(params);
  const tag = await getTagBySlug(supabaseAdminClient, tagSlug);

  return {
    title: `${tag.name} | Blog | Nextbase Ultimate`,
    description: tag.description,
  };
}

export default async function BlogListByTagPage({
  params,
}: {
  params: unknown;
}) {
  const { tagSlug } = BlogListByTagPageParamsSchema.parse(params);
  const [tag, blogPosts, allTags] = await Promise.all([
    getTagBySlug(supabaseAdminClient, tagSlug),
    getPublishedBlogPostsByTagSlug(supabaseAdminClient, tagSlug),
    getAllBlogTags(supabaseAdminClient),
  ]);

  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center flex-col space-y-4">
        <div className="space-y-3 text-center">
          <T.Subtle>Blog</T.Subtle>
          <T.H1>{tag.name}</T.H1>
          <T.Subtle>{tag.description}</T.Subtle>
        </div>
        <TagsNav tags={allTags} />
      </div>
      <PublicBlogList blogPosts={blogPosts} />
    </div>
  );
}
