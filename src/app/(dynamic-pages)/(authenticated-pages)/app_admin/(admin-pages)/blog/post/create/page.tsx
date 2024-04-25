import Overline from '@/components/Text/Overline';
import { T } from '@/components/ui/Typography';
import {
  getAllAuthors,
  getAllBlogTags
} from '@/data/admin/internal-blog';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
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
        <div className="flex space-x-2 items-center group">
          <ChevronLeft className="relative text-gray-500 h-4 w-4 hover:-translate-x-10 group-hover:text-gray-800 group-hover:dark:text-gray-400 dark:text-gray-600" />
          <Overline className="text-gray-500 group-hover:text-gray-800 dark:text-gray-600 group-hover:dark:text-gray-400">
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
