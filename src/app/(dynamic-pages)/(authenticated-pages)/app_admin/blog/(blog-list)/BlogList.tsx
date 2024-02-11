import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import { getAllBlogPosts } from '@/data/admin/internal-blog';
import { ExternalLink } from 'lucide-react';
import CalendarIcon from 'lucide-react/dist/esm/icons/calendar';
import PencilIcon from 'lucide-react/dist/esm/icons/pencil';
import moment from 'moment';
import Link from 'next/link';
import { DeleteBlogPost } from './DeleteBlogPost';

export async function BlogList() {
  const blogs = await getAllBlogPosts();
  if (!blogs.length) {
    return <T.Subtle>No blog posts yet!</T.Subtle>;
  }
  return (
    <div className="space-y-6 w-full ">
      {blogs.map((blog) => (
        <div key={blog.id}>
          <div className="flex justify-between items-start ">
            <div className="max-w-[720px]">
              {/* <div className="inline-flex space-x-2 mb-2.5 items-center">
                <Badge size="sm" variant="default">
                  Category 1
                </Badge>
              </div> */}
              <T.H4 className="mt-0 mb-2 font-bold">{blog.title}</T.H4>
              <T.P className="leading-6 text-muted-foreground max-w-[480px] mb-4">
                {blog.summary.slice(0, 100)}
                {blog.summary.length > 100 && '...'}
              </T.P>
              <div className="inline-flex space-x-4 items-center">
                <T.Small className="inline-flex font-semibold text-muted-foreground items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  {moment(blog.created_at).format('MMMM Do, YYYY')}
                </T.Small>
              </div>
            </div>
            <div className="inline-flex space-x-2">
              <Link href={`/blog/${blog.slug}`} className="p-0 inline-flex ">
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-6 w-6" />
                </Button>
              </Link>
              <Link
                href={`/app_admin/blog/post/${blog.id}/edit`}
                className="p-0 inline-flex "
              >
                <Button variant="ghost" size="icon">
                  <PencilIcon className="h-6 w-6" />
                </Button>
              </Link>
              <DeleteBlogPost blogPostId={blog.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
