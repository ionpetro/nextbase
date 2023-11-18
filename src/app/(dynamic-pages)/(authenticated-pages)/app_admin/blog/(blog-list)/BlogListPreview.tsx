'use client';
import React from 'react';
import moment from 'moment';
import { Anchor } from '@/components/Anchor';
import CalendarIcon from 'lucide-react/dist/esm/icons/calendar';
import PencilIcon from 'lucide-react/dist/esm/icons/pencil';
import ArrowUpRightIcon from 'lucide-react/dist/esm/icons/arrow-up-right';
import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import TrashIcon from 'lucide-react/dist/esm/icons/trash-2';
import { useToastMutation } from '@/hooks/useToastMutation';

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
      variant="infoLink"
      aria-disabled={isLoading}
      className="text-red-500 dark:text-red-500 hover:text-red-600 hover:dark:text-red-400 p-0"
    >
      {<TrashIcon className="mr-2 h-5 w-5" />}
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
          <div className="shadow-md flex justify-between items-start bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <div className="max-w-[720px]">
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
              <Anchor href={`#`} className="p-0 inline-flex m-1 mt-2">
                {' '}
                <ArrowUpRightIcon className="mr-2 h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-600 hover:dark:text-gray-400" />
              </Anchor>
              <Anchor
                href={`/app_admin/blog/post/${blog.id}/edit`}
                className="p-0 inline-flex m-1 mt-2"
              >
                <PencilIcon className="mr-2 h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-600 hover:dark:text-gray-400" />
              </Anchor>
              <DeleteBlogPostPreview blogPostId={blog.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
