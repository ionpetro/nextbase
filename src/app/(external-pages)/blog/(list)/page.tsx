import { T } from '@/components/ui/Typography';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { Table } from '@/types';
import { getAllBlogTags, getPublishedBlogPosts } from '@/utils/supabase/internalBlog';
import moment from 'moment';
import { PublicBlogList } from '../PublicBlogList';
import { TagsNav } from '../TagsNav';

export default async function BlogListPage() {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const [blogPosts, tags] = await Promise.all([
    getPublishedBlogPosts(supabaseClient),
    getAllBlogTags(supabaseClient)
  ]);

  console.log(tags);
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


