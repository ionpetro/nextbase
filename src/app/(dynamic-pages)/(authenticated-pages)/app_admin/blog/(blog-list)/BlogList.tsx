'use client';
import React from 'react';
import moment from 'moment';
import { Table } from '@/types';
import { Anchor } from '@/components/Anchor';
import CalendarIcon from 'lucide-react/dist/esm/icons/calendar';
import PencilIcon from 'lucide-react/dist/esm/icons/pencil';
import TrashIcon from 'lucide-react/dist/esm/icons/trash-2';
import ArrowUpRightIcon from 'lucide-react/dist/esm/icons/arrow-up-right';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

function BlogList({
  blogs,
  deleteBlogPost,
}: {
  blogs: Table<'internal_blog_posts'>[];
  deleteBlogPost: (id: string) => Promise<void>;
}) {
  const { mutate: deleteBlogPostMutation, isLoading: isDeletingBlogPost } =
    useMutation<void, unknown, string>(
      async (id) => {
        return deleteBlogPost(id);
      },
      {
        onSuccess: () => {
          toast.success('Successfully deleted blog post');
        },
        onError: () => {
          toast.error('Failed to delete blog post');
        },
      }
    );
  return (
    <div className="space-y-6 w-full ">
      {blogs.map((blog) => (
        <div key={blog.id}>
          <div className="shadow-md flex justify-between items-start bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
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
              <Anchor
                href={`/blog/${blog.slug}`}
                className="p-0 inline-flex m-1 mt-2"
              >
                {' '}
                <ArrowUpRightIcon className="mr-2 h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-600 hover:dark:text-gray-400" />
              </Anchor>
              <Anchor
                href={`/app_admin/blog/post/${blog.id}/edit`}
                className="p-0 inline-flex m-1 mt-2"
              >
                <PencilIcon className="mr-2 h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-600 hover:dark:text-gray-400" />
              </Anchor>
              <Button
                variant="infoLink"
                disabled={isDeletingBlogPost}
                className="text-red-500 dark:text-red-500 hover:text-red-600 hover:dark:text-red-400 p-0"
                onClick={() => {
                  deleteBlogPostMutation(blog.id);
                }}
              >
                <TrashIcon className="mr-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
