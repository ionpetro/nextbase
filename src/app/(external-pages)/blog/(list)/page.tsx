import { Anchor } from '@/components/Anchor';
import { T } from '@/components/ui/Typography';
import { supabaseUserServerComponentClient } from '@/supabase-clients/user/supabaseUserServerComponentClient';
import moment from 'moment';

const getAllBlogPosts = async () => {
  const { data, error } = await supabaseUserServerComponentClient
    .from('internal_blog_posts')
    .select('*')
    .eq('status', 'published');

  if (error) {
    throw error;
  }

  return data;
};

export default async function BlogListPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <div className="space-y-4">
      <T.H1>Blog</T.H1>
      {blogPosts.length ? (
        <div className="space-y-4">
          {blogPosts.map((blog) => (
            <div key={blog.id} className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-2">
                {blog.summary.slice(0, 100)}
                {blog.summary.length > 100 && '...'}
              </p>
              <p className="text-gray-400 text-sm">
                Published: {moment(blog.created_at).format('MMMM Do, YYYY')}
              </p>
              <div className="flex items-center justify-between">
                <Anchor href={`/blog/${blog.slug}`}>Read more</Anchor>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <T.Subtle>No blog posts yet.</T.Subtle>
      )}
    </div>
  );
}
