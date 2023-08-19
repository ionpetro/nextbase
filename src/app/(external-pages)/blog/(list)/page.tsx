import { T } from '@/components/ui/Typography';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import {
  getAllBlogTags,
  getPublishedBlogPosts,
} from '@/utils/supabase/internalBlog';
import { PublicBlogList } from '../PublicBlogList';
import { TagsNav } from '../TagsNav';

export const metadata = {
  title: 'Blog List | Nextbase',
  description: 'Collection of the latest blog posts from the team at Nextbase',
  icons: {
    icon: '/images/logo-black-main.ico',
  },
};

export default async function BlogListPage() {
  const [blogPosts, tags] = await Promise.all([
    getPublishedBlogPosts(supabaseAdminClient),
    getAllBlogTags(supabaseAdminClient),
  ]);

  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center flex-col space-y-4">
        <div className="space-y-3 text-center">
          <T.Subtle>Blog</T.Subtle>
          <T.H1>All Posts</T.H1>
          <T.Subtle>
            Here is a collection of the latest blog posts from the team at
            Nextbase.
          </T.Subtle>
        </div>
        <TagsNav tags={tags} />
      </div>
      <PublicBlogList blogPosts={blogPosts} />
    </div>
  );
}
