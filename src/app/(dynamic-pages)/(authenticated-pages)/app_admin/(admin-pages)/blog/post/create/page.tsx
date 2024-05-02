import { LucideIcon } from '@/components/LucideIcon';
import Overline from '@/components/Text/Overline';
import { T } from '@/components/ui/Typography';
import {
  getAllAuthors,
  getAllBlogTags
} from '@/data/admin/internal-blog';
import Link from 'next/link';
import { Suspense } from 'react';
import { BlogForm } from '../../BlogForm';

async function BlogFormWrapper() {
  const [authors, tags] = await Promise.all([
    getAllAuthors(),
    getAllBlogTags(),
  ]);
  return (
    <BlogForm
      tags={tags}
      authors={authors}
      mode="create"
    />
  );
}

export default async function CreateBlogPostPage() {
  return (
    <div className="space-y-4">
      <Link href="/app_admin/blog">
        <div className="flex items-center space-x-2 group">
          <LucideIcon name="ChevronLeft" className="group-hover:text-gray-800 group-hover:dark:text-gray-400 relative w-4 h-4 text-gray-500 dark:text-gray-600 hover:-translate-x-10" />
          <Overline className="group-hover:text-gray-800 group-hover:dark:text-gray-400 text-gray-500 dark:text-gray-600">
            Back to blog
          </Overline>
        </div>
      </Link>
      <T.H3>Create Blog Post</T.H3>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogFormWrapper />
      </Suspense>
    </div>
  );
}
