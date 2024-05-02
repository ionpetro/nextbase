'use client';
import { LucideIcon } from '@/components/LucideIcon';
import { Button } from '@/components/ui/button';
import { T } from '@/components/ui/Typography';
import { useToastMutation } from '@/hooks/useToastMutation';
import moment from 'moment';
import Link from 'next/link';

function DeleteBlogPostPreview({ blogPostId }: { blogPostId: string }) {
  const { mutate, isLoading } = useToastMutation(
    async () => {
      // Simulate a delay to mimic the deletion process
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    {
      loadingMessage: 'Deleting blog post...',
      successMessage: 'Blog post deleted!',
      errorMessage: 'Failed to delete blog post',
    },
  );

  return (
    <Button
      type="button"
      onClick={() => {
        mutate();
      }}
      aria-disabled={isLoading}
      className="p-0 text-red-500 hover:text-red-600 hover:dark:text-red-400 dark:text-red-500"
    >
      {<LucideIcon name='Trash' className="mr-2 w-5 h-5" />}
    </Button>
  );
}

// Fake data
const blogs = [
  {
    id: '1',
    title: 'Blog Post 1',
    summary: 'This is a summary of the  blog post 1...',
    created_at: new Date(),
    slug: 'blog-post-1',
  },
  {
    id: '2',
    title: 'Blog Post 2',
    summary: 'This is a summary of the  blog post 2...',
    created_at: new Date(),
    slug: 'blog-post-2',
  },
  {
    id: '3',
    title: 'Blog Post 3',
    summary: 'This is a summary of the  blog post 3...',
    created_at: new Date(),
    slug: 'blog-post-3',
  },
  {
    id: '4',
    title: 'Blog Post 4',
    summary: 'This is a summary of the  blog post 4...',
    created_at: new Date(),
    slug: 'blog-post-4',
  },
  {
    id: '5',
    title: 'Blog Post 5',
    summary: 'This is a summary of the  blog post 5...',
    created_at: new Date(),
    slug: 'blog-post-5',
  },
  {
    id: '6',
    title: 'Blog Post 6',
    summary: 'This is a summary of the  blog post 6...',
    created_at: new Date(),
    slug: 'blog-post-6',
  },
  {
    id: '7',
    title: 'Blog Post 7',
    summary: 'This is a summary of the  blog post 7...',
    created_at: new Date(),
    slug: 'blog-post-7',
  },
  {
    id: '8',
    title: 'Blog Post 8',
    summary: 'This is a summary of the  blog post 8...',
    created_at: new Date(),
    slug: 'blog-post-8',
  },
  {
    id: '9',
    title: 'Blog Post 9',
    summary: 'This is a summary of the  blog post 9...',
    created_at: new Date(),
    slug: 'blog-post-9',
  },
  {
    id: '10',
    title: 'Blog Post 10',
    summary: 'This is a summary of the  blog post 10...',
    created_at: new Date(),
    slug: 'blog-post-10',
  },
];

export function BlogListPreview() {
  return (
    <div className="space-y-6 w-full [&_a]:pointer-events-none">
      {blogs.map((blog) => (
        <div key={blog.id}>
          <div className="flex justify-between items-start shadow-md p-6 border rounded-xl">
            <div className="max-w-[720px]">
              <T.H4 className="mt-0 mb-2 font-bold">{blog.title}</T.H4>
              <T.P className="mb-4 max-w-[480px] text-muted-foreground leading-6">
                {blog.summary.slice(0, 100)}
                {blog.summary.length > 100 && '...'}
              </T.P>
              <div className="inline-flex items-center space-x-4">
                <T.Small className="inline-flex items-center font-semibold text-muted-foreground">
                  <LucideIcon name="Calendar" className="mr-2 w-5 h-5" />
                  {moment(blog.created_at).format('MMMM Do, YYYY')}
                </T.Small>
              </div>
            </div>
            <div className="inline-flex space-x-2">
              <Link href={`#`} className="inline-flex m-1 mt-2 p-0">
                {' '}
                <LucideIcon name="ArrowUpRight" className="mr-2 w-6 h-6 text-gray-500 hover:text-gray-700 hover:dark:text-gray-400 dark:text-gray-600" />
              </Link>
              <Link
                href={`/app_admin/blog/post/${blog.id}/edit`}
                className="inline-flex m-1 mt-2 p-0"
              >
                <LucideIcon name="Pencil" className="mr-2 w-5 h-5 text-gray-500 hover:text-gray-700 hover:dark:text-gray-400 dark:text-gray-600" />
              </Link>
              <DeleteBlogPostPreview blogPostId={blog.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
